import { NextResponse } from "next/server";
import { sendCapiLead } from "@/lib/meta-capi";
import { addGhlNote, handleGhlLead, type GhlLeadScore } from "@/lib/ghl";
import { sendLeadFallbackEmail } from "@/lib/lead-notify";
import { postTriageShadow } from "@/lib/jev-triage";
import { appendLeadToSink, type SinkLead } from "@/lib/lead-sink";
import { checkRateLimit, getClientIpOrUndefined, readCappedJson } from "@/lib/rate-limit";
import { pingLeadFirehose } from "@/lib/ma-lead-ping";
import { hqFirstName, hqSourceSlug, pushToHqCapped } from "@/lib/hq-subscriber";

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
  /** Unchecked-by-default "also send me the email list" box. true = HQ newsletter list. */
  newsletterOptIn?: boolean;
  firstName?: string;
  lastName?: string;
  phone?: string;
  score?: string;
  _honeypot?: string;
  qualification?: Qualification;
  booking?: Booking;
  /**
   * Site path the form was submitted from. ExitIntentModal posts this as
   * `path`; other callers omit it and the Referer header is used instead.
   * NOT the prospect's own website (that arrives as qualification.website).
   */
  path?: string;
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

/**
 * Display name from whichever field the submitting form actually filled.
 * Returns undefined rather than an empty string when nothing was collected.
 */
function resolveName(p: Payload): string | undefined {
  const first = (p.firstName || p.qualification?.firstName || "").trim();
  const last = (p.lastName || p.qualification?.lastName || "").trim();
  const joined = [first, last].filter(Boolean).join(" ").trim();
  if (joined) return joined;
  const invitee = (p.booking?.inviteeName || "").trim();
  return invitee || undefined;
}

/**
 * The prospect's own words, for triage context. Ordered most-specific first:
 * the bottleneck they typed beats a checkbox list. Never includes email/phone.
 */
function resolveMessage(p: Payload): string | undefined {
  const q = p.qualification;
  if (!q) return undefined;
  const candidate =
    q.bottleneck?.trim() ||
    q.biggestLeak?.trim() ||
    q.automationWishlist?.trim() ||
    (q.automateTargets?.length ? q.automateTargets.join(", ") : "");
  return candidate || undefined;
}

/**
 * Path-only view of where the lead was submitted. `path` (posted by
 * ExitIntentModal) wins; otherwise the Referer, stripped of its query string
 * so UTM tails and prefilled answers never ride along into the sink or the
 * triage webhook.
 */
function resolvePage(req: Request, p: Payload): string | undefined {
  const posted = p.path?.trim();
  if (posted) return posted.split("?")[0];
  const raw = req.headers.get("referer");
  if (!raw) return undefined;
  try {
    return new URL(raw).pathname;
  } catch {
    return undefined;
  }
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
  const rawEmail =
    payload.email ||
    payload.qualification?.email ||
    payload.booking?.inviteeEmail ||
    "";
  // Type + shape check before this reaches GHL / Resend (same rule as
  // /api/lead-capture).
  const email =
    typeof rawEmail === "string" &&
    rawEmail.trim().length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawEmail.trim())
      ? rawEmail.trim()
      : "";

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

  const optIn = payload.newsletterOptIn === true;

  // Referral: the friend's details ride only to the owner (GHL note on the
  // referrer's record + the n8n firehose ping + the disk sink). They are NEVER
  // sent to HQ/Brevo: the HQ push below carries the submitting (referrer)
  // address alone.
  const isReferral = source === "referral";
  const clip = (v: unknown, n: number): string =>
    typeof v === "string"
      ? Array.from(v)
          .filter((c) => c.charCodeAt(0) >= 32 && c.charCodeAt(0) !== 127)
          .join("")
          .trim()
          .slice(0, n)
      : "";
  const ca = payload.qualification?.customAnswers;
  const referred = isReferral
    ? {
        email: clip(ca?.referred_email, 254),
        name: clip(ca?.referred_name, 100),
        note: clip(ca?.referred_note, 300),
        origin: clip(ca?.referral_origin, 60),
      }
    : null;

  // Mirror to HQ in parallel with the CRM write. Awaited below (4s cap inside
  // pushSubscriberToHq), never throws, never changes the response. Resolves
  // true only when HQ confirmed the row.
  const hqMirror: Promise<boolean> = (async () => {
    if (referred && referred.email.toLowerCase() === email.toLowerCase()) {
      return false; // resolved address is the referred friend's, not the submitter's
    }
    const page = resolvePage(req, payload);
    const ok = await pushToHqCapped(
      {
        email,
        site: source === "lp-speed-to-lead" ? "skynetlabsai" : "skynetjoe",
        source: hqSourceSlug(String(source), "discovery-call"),
        first_name: hqFirstName(
          payload.firstName || payload.qualification?.firstName || firstNameFromBooking,
        ),
        page: page && /^\/(?![\/\\])[^\s<>]{0,198}$/.test(page) ? page : null,
        consent: optIn,
      },
      "leads",
    );
    if (!ok) console.warn("[leads] HQ mirror did not confirm", { source });
    return ok;
  })();

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
      optIn ? "newsletter-optin" : "",
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

  const hqConfirmed = await hqMirror;

  // Referral: park the friend's details on the referrer's GHL contact as a note.
  let referralNoteFailed = false;
  if (referred && referred.email && ghl.contactId !== "dev-skip") {
    try {
      const noteOk = await addGhlNote(
        ghl.contactId,
        `Referral intro requested by ${email}. Friend: ${referred.email}` +
          (referred.name ? ` (${referred.name})` : "") +
          (referred.note ? `. Note: ${referred.note}` : "") +
          ". Reach out within 24 hours; $200 credit applies if they book.",
      );
      referralNoteFailed = !noteOk;
    } catch (err) {
      console.warn("[leads] referral GHL note failed", err);
      referralNoteFailed = true;
    }
  }

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
        getClientIpOrUndefined(req),
      userAgent: req.headers.get("user-agent") || undefined,
      source,
    });
    if (!capi.sent) console.warn("[leads] CAPI not sent:", capi.reason);
  }

  // Page the phone. MA-04 Lead Firehose was found ACTIVE with zero
  // executions in its lifetime on 2026-08-23 — not broken, just never
  // called by anything. Without this hop the "we call you within
  // minutes" promise the paid funnel sells has nothing behind it.
  //
  // Deliberately fire-and-forget and deliberately AFTER the CRM write:
  // this is an alert, not a delivery path, and it must never be able
  // to fail a lead or hold a visitor's form open.
  void pingLeadFirehose({
    // Referral: leadId is unique per submission, so MA-04's contact_id dedupe
    // can never swallow a second referral from the same referrer contact.
    contactId: referred ? `ref-${leadId}` : ghl.contactId,
    email,
    phone: payload.phone || payload.qualification?.phone,
    firstName: payload.firstName || payload.qualification?.firstName,
    lastName: payload.lastName || payload.qualification?.lastName,
    source,
    score,
    booked: Boolean(payload.booking),
    extras: {
      business_name: payload.qualification?.businessName ?? null,
      urgency: payload.qualification?.urgency ?? null,
      revenue_range: payload.qualification?.revenueRange ?? null,
      biggest_leak: payload.qualification?.biggestLeak ?? null,
      utm_campaign: payload.utm?.campaign ?? null,
      utm_content: payload.utm?.content ?? null,
      ...(referred
        ? {
            // Alert only: the friend's email/name/note are deliberately NOT sent
            // here. They live in the GHL note (note_saved) or the disk sink.
            referral: true,
            lead_id: leadId,
            ghl_contact_id: ghl.contactId === "dev-skip" ? null : ghl.contactId,
            note_saved:
              Boolean(referred.email) &&
              ghl.contactId !== "dev-skip" &&
              !referralNoteFailed,
          }
        : {}),
    },
  }).then((r) => {
    if (!r.sent) console.warn("[leads] MA-04 lead ping not sent:", r.reason);
  });

  const capturedAt = new Date().toISOString();
  const name = resolveName(payload);
  const company = payload.qualification?.businessName?.trim() || undefined;
  const message = referred
    ? `Referral intro requested. Friend: ${referred.email || "(none given)"}` +
      (referred.name ? ` (${referred.name})` : "") +
      (referred.note ? `. Note: ${referred.note}` : "")
    : resolveMessage(payload);
  const page = resolvePage(req, payload);

  const escalation = await confirmOrEscalate(
    ghl.contactId,
    {
      email,
      source,
      capturedAt,
      name,
      company,
      message,
      page,
      leadId,
      ...(optIn ? { newsletterOptIn: true } : {}),
    },
    payload,
  );
  const { confirmed, emailFallbackSent, sunk } = escalation;

  // Referral whose GHL note did not land: the friend's details would otherwise
  // exist only in the n8n alert. Keep them in the disk sink (full payload) and
  // email them to us if Resend is configured.
  let referralKept = false;
  if (referred && referralNoteFailed) {
    const reason = "referral: GHL note did not confirm";
    const row = {
      email,
      source,
      capturedAt,
      name,
      company,
      message,
      page,
      leadId,
    };
    await sendLeadFallbackEmail(row, reason);
    const sink = await appendLeadToSink({ ...row, reason, payload });
    referralKept = sink.written && sink.durable;
  }

  /**
   * Shadow triage (JEV_TRIAGE_WEBHOOK). Fire-and-forget, never awaited, never
   * throws, no email and no phone in the body — unset env is a total no-op.
   * Deliberately fired for the unconfirmed case too: a lead the CRM refused is
   * exactly the one a triage lane wants to see. It sits after the delivery
   * attempt so it can never delay or fail the visitor's response.
   */
  // Skipped for referrals: the message carries the friend's name/note, which
  // must not leave for the triage model.
  if (!referred) {
    postTriageShadow({
      leadId,
      source,
      ts: capturedAt,
      name,
      company,
      message,
      page,
    });
  }

  if (!confirmed && !emailFallbackSent && !sunk && !referralKept) {
    // Nothing took the lead. Tell the truth instead of showing a success state
    // over a discarded submission.
    return NextResponse.json(
      {
        error:
          "Couldn't confirm delivery. Please email waseem@skynetjoe.com directly so nothing gets lost.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    ...(optIn ? { newsletter: hqConfirmed ? "confirmed" : "pending" } : {}),
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
  /**
   * Typed as the sink row minus `reason` (which this function decides) and
   * minus `payload` (passed separately below), so adding a field to SinkLead
   * surfaces here at compile time instead of silently not being written.
   */
  lead: Omit<SinkLead, "reason" | "payload">,
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
      // Ids + source only: never log the message/friend/contact fields.
      { leadId: lead.leadId, source: lead.source, reason, file: sink.file },
    );
    return { confirmed: false, emailFallbackSent: false, sunk: true };
  }

  console.error(
    "[leads] LEAD AT RISK — no CRM write, no email fallback, no durable sink. Check GHL_API_TOKEN and RESEND_API_KEY.",
    { leadId: lead.leadId, source: lead.source, reason },
  );
  return { confirmed: false, emailFallbackSent: false, sunk: false };
}
