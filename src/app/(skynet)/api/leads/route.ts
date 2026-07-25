import { NextResponse } from "next/server";
import { handleGhlLead, type GhlLeadScore } from "@/lib/ghl";
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
//   - Honeypot rejection (_honeypot truthy → silent 200 fake-success)
//   - Calls handleGhlLead — direct GHL REST (no webhook hop)
//   - Always returns 200 so the client UI can advance
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
  firstName?: string;
  lastName?: string;
  phone?: string;
  score?: string;
  _honeypot?: string;
  qualification?: Qualification;
  booking?: Booking;
  utm?: { source?: string; medium?: string; campaign?: string };
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
      payload.qualification?.urgency
        ? `urgency:${payload.qualification.urgency}`
        : "",
      payload.qualification?.revenueRange
        ? `revenue:${payload.qualification.revenueRange}`
        : "",
    ].filter(Boolean) as string[],
  });

  return NextResponse.json({
    ok: true,
    leadId,
    score,
    contactId: ghl.contactId,
    opportunityId: ghl.opportunityId,
  });
}
