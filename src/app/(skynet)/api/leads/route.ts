import { NextResponse } from "next/server";
import { sendCapiLead } from "@/lib/meta-capi";
import { handleGhlLead, type GhlLeadScore } from "@/lib/ghl";
import { sendLeadFallbackEmail } from "@/lib/lead-notify";
import { appendLeadToSink } from "@/lib/lead-sink";
import { checkRateLimit, readCappedJson } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 16 * 1024;

// ============================================================
// /api/leads — discovery-call funnel lead drop
//
// POST shape (legacy shape preserved for the existing client form):
//   {
//     leadId?: string,
//     source?: "discovery-call" | "stress-quiz" | ...,
//     email?: string,        // top-level OR inside qualification
//     firstName?: string,
//     lastName?: string,
//     phone?: string,
//     score?: "HOT" | "WARM" | "COLD",
//     _honeypot?: string,    // anti-bot — silently 200 if filled
//     qualification: {
//       email?, firstName?, lastName?, phone?,
//       businessType?, teamSize?, biggestLeak?, bottleneck?,
//       monthlyLeads?, automateTargets?, automationWishlist?,
//       revenueRange?, urgency?, businessName?, website?,
//       timezone?, customAnswers?
//     },
//     booking?: {
//       event?, invitee?, scheduledAt?, inviteeEmail?, inviteeName?
//     },
//     utm?: { source?, medium?, campaign? },
//     submittedAt?: string,
//   }
//
// Behavior:
//   - Validates body (qualification OR booking + email required)
//   - Honeypot rejection (_honeypot truthy → 200 fake-success, logged)
//   - Calls handleGhlLead — direct GHL REST (no webhook hop)
//   - Confirms the CRM actually took it. If not: emails the lead to Waseem via
//     Resend; if that fails, appends it to the on-disk sink (.data/leads.jsonl,
//     durable on this host); only if ALL THREE fail does it return 502.
//
// It does NOT "always return 200". It used to, which meant every GHL failure
// mode reported success over a discarded lead — handleGhlLead never throws, so
// an unset token, a non-2xx, a 200 with no id and the 8s abort all resolve to
// contactId "dev-skip". A visitor seeing a thank-you page is not evidence that
// anyone received their answers.
// ============================================================

type Qualification = {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  businessType?: string;
  teamSize?: string;
  biggestLeak?: string;
  bottleneck?: string;
  monthlyLeads?: string | number;
  automateTargets?: string[];
  automationWishlist?: string;
  revenueRange?: string;
  urgency?: string;
  businessName?: string;
  website?: string;
  timezone?: string;
  customAnswers?: Record<string, string>;
};

type Booking = {
  event?: string;
  invitee?: string;
  scheduledAt?: string;
  inviteeEmail?: string;
  inviteeName?: string;
};

type Payload = {
  leadId?: string;
  source?: string;
  email?: string;
  eventId?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  score?: string;
  _honeypot?: string;
  qualification?: Qualification;
  booking?: Booking;
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
    content?: string;
  };
  submittedAt?: string;
};

function mintLeadId() {
  const ts = Date.now().toString(36);
  const rnd = Math.random().toString(36).slice(2, 8);
  return `lead_${ts}_${rnd}`;
}

function scoreLead(
  q: Qualification | undefined,
  override: string | undefined,
): GhlLeadScore {
  if (override === "HOT" || override === "WARM" || override === "COLD")
    return override;
  if (!q) return "COLD";
  const hotRev =
    q.revenueRange === "100k-500k" ||
    q.revenueRange === "500k-plus" ||
    /1m|5m|\$1m|\$5m|over/i.test(q.revenueRange || "");
  const hotUrgency =
    q.urgency === "this-month" ||
    q.urgency === "30-60d" ||
    /asap|now|urgent/i.test(q.urgency || "");
  if (hotRev && hotUrgency) return "HOT";
  if (hotRev || hotUrgency) return "WARM";
  return "COLD";
}

/** Flatten automateTargets[] into the single LARGE_TEXT field GHL expects. */
function flattenAutomation(q: Qualification | undefined): string | undefined {
  if (!q) return undefined;
  if (q.automationWishlist) return q.automationWishlist;
  if (q.automateTargets && q.automateTargets.length)
    return q.automateTargets.join(", ");
  return undefined;
}

export async function POST(req: Request) {
  const rl = checkRateLimit(req, {
    limit: 8,
    windowMs: 60_000,
    keyPrefix: "leads",
  });
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Try again in a minute." },
      { status: 429 },
    );
  }

  let payload: Payload;
  try {
    payload = await readCappedJson<Payload>(req, MAX_BODY_BYTES);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: filled = bot → fake-success, do nothing.
  if (payload._honeypot) {
    // Leave a trace. A false positive here (a form-filler extension touching a
    // hidden field) is the one remaining path where a real lead disappears with
    // no record, so it must at least be greppable in the logs.
    console.warn("[leads] honeypot tripped — submission dropped", {
      source: payload.source,
      email:
        payload.email ||
        payload.qualification?.email ||
        payload.booking?.inviteeEmail,
    });
    return NextResponse.json({ ok: true, leadId: mintLeadId() });
  }

  if (!payload.qualification && !payload.booking) {
    return NextResponse.json(
      { error: "Either qualification or booking required" },
      { status: 400 },
    );
  }

  // Resolve email — top-level OR nested
  const email =
    payload.email ||
    payload.qualification?.email ||
    payload.booking?.inviteeEmail ||
    "";

  if (!email) {
    return NextResponse.json(
      { error: "email is required (top-level or in qualification/booking)" },
      { status: 400 },
    );
  }

  const leadId = payload.leadId || mintLeadId();
  const score = scoreLead(payload.qualification, payload.score);
  const source = payload.source || "discovery-call";

  // Parse name out of booking.inviteeName if top-level is empty
  const bookingNameParts = (payload.booking?.inviteeName || "")
    .trim()
    .split(/\s+/);
  const firstNameFromBooking = bookingNameParts[0] || undefined;
  const lastNameFromBooking =
    bookingNameParts.length > 1
      ? bookingNameParts.slice(1).join(" ")
      : undefined;

  const ghl = await handleGhlLead({
    qualification: {
      email,
      firstName:
        payload.firstName ||
        payload.qualification?.firstName ||
        firstNameFromBooking,
      lastName:
        payload.lastName ||
        payload.qualification?.lastName ||
        lastNameFromBooking,
      phone: payload.phone || payload.qualification?.phone,
      businessType: payload.qualification?.businessType,
      teamSize: payload.qualification?.teamSize,
      bottleneck:
        payload.qualification?.bottleneck || payload.qualification?.biggestLeak,
      monthlyLeads: payload.qualification?.monthlyLeads,
      automationWishlist: flattenAutomation(payload.qualification),
      revenueRange: payload.qualification?.revenueRange,
      urgency: payload.qualification?.urgency,
      businessName: payload.qualification?.businessName,
      website: payload.qualification?.website,
      timezone: payload.qualification?.timezone,
      source,
      campaign: payload.utm?.campaign,
    },
    score,
    stage: "inbound",
    source,
    extraTags: [
      "discovery-call",
      payload.booking ? "booked" : "qualified-only",
      // ad-level attribution tag — makes per-ad booking counts queryable in GHL
      payload.utm?.content ? `ad:${payload.utm.content.slice(0, 60)}` : "",
      payload.qualification?.urgency
        ? `urgency:${payload.qualification.urgency}`
        : "",
      payload.qualification?.revenueRange
        ? `revenue:${payload.qualification.revenueRange}`
        : "",
    ].filter(Boolean) as string[],
  });

  // Server-side CAPI mirror of the browser pixel event, deduped via eventId
  // (browser fires fbq('track', <event>, {}, {eventID}) with the same id).
  // Fail-soft by design — never blocks the lead path.
  if (payload.eventId) {
    const capi = await sendCapiLead({
      email,
      eventId: payload.eventId,
      eventName: payload.booking ? "Schedule" : "Lead",
      sourceUrl: req.headers.get("referer") || undefined,
      ip:
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined,
      userAgent: req.headers.get("user-agent") || undefined,
      source,
    });
    if (!capi.sent) console.warn("[leads] CAPI not sent:", capi.reason);
  }

  const { confirmed, emailFallbackSent, sunk } = await confirmOrEscalate(
    ghl.contactId,
    { email, source, capturedAt: new Date().toISOString() },
    payload,
  );

  if (!confirmed && !emailFallbackSent && !sunk) {
    // Nothing took the lead. Tell the truth instead of showing a success state
    // over a discarded submission.
    return NextResponse.json(
      {
        error:
          "Couldn't confirm delivery. Please email info@skynetjoe.com directly so nothing gets lost.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    leadId,
    score,
    // "dev-skip" is the sentinel handleGhlLead returns when nothing was
    // written. Reporting it as `contactId` reads like a real CRM id, so it is
    // omitted and the actual delivery route is stated instead.
    ...(confirmed
      ? { contactId: ghl.contactId, opportunityId: ghl.opportunityId }
      : {}),
    ...(emailFallbackSent ? { emailFallback: true } : {}),
    ...(sunk ? { sink: true } : {}),
  });
}

/**
 * Confirm the CRM actually took the lead, or get it to a human another way.
 *
 * This route previously returned `{ok:true}` unconditionally. `handleGhlLead`
 * never throws by design — every failure mode (token unset, non-2xx, a 200 with
 * no id, the 8s abort) resolves to `contactId: "dev-skip"` — so a lead could be
 * accepted, written nowhere, and reported as success. That was proven live:
 * `POST /api/leads` answered 200 with `contactId:"dev-skip"` while
 * /api/lead-capture correctly answered 502 on the same server and env.
 *
 * This is the higher-value route of the two: it backs the discovery-call
 * qualification funnel, so a silent loss here costs a qualified lead.
 */
async function confirmOrEscalate(
  ghlContactId: string | null | undefined,
  lead: { email: string; source: string; capturedAt: string },
  /**
   * The full submitted body. Without this the sink kept only the email, which
   * on THIS route means throwing away the qualification answers -- revenue
   * band, urgency, bottleneck, business name, phone -- i.e. everything that
   * makes the lead worth having.
   */
  fullPayload?: unknown,
): Promise<{
  confirmed: boolean;
  emailFallbackSent: boolean;
  sunk: boolean;
}> {
  if (ghlContactId && ghlContactId !== "dev-skip") {
    return { confirmed: true, emailFallbackSent: false, sunk: false };
  }
  const reason = ghlContactId
    ? `CRM write unconfirmed (contactId=${ghlContactId})`
    : "CRM write unconfirmed (no contactId returned)";
  const fallback = await sendLeadFallbackEmail(lead, reason);
  if (fallback.ok) {
    return { confirmed: false, emailFallbackSent: true, sunk: false };
  }

  // Last resort: append to disk. Hostinger has a persistent filesystem, so this
  // is a real save. Only counts if it both wrote AND is durable on this host.
  const sink = await appendLeadToSink({
    ...lead,
    reason,
    payload: fullPayload,
  });
  if (sink.written && sink.durable) {
    console.warn(
      "[leads] CRM and email both unavailable — lead persisted to the on-disk sink. Read it with: cat .data/leads.jsonl",
      { ...lead, reason, file: sink.file },
    );
    return { confirmed: false, emailFallbackSent: false, sunk: true };
  }

  console.error(
    "[leads] LEAD AT RISK — no CRM write, no email fallback, no durable sink. Check GHL_API_TOKEN and RESEND_API_KEY.",
    { ...lead, reason },
  );
  return { confirmed: false, emailFallbackSent: false, sunk: false };
}
