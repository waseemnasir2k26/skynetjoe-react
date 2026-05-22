import { NextResponse } from "next/server";

export const runtime = "nodejs";

// ============================================================
// /api/leads — discovery-call funnel lead drop
//
// POST shape:
//   {
//     leadId?: string,
//     source: "discovery-call",
//     qualification: {
//       businessType?: string,
//       teamSize?: string,
//       biggestLeak?: string,
//       monthlyLeads?: string,
//       automateTargets?: string[],
//       revenueRange?: string,
//       urgency?: string,
//       customAnswers?: Record<string, string>,
//     },
//     booking?: {
//       event?: string,       // calendly invitee_uri
//       invitee?: string,     // calendly event_uri
//       scheduledAt?: string, // ISO
//       inviteeEmail?: string,
//       inviteeName?: string,
//     },
//     utm?: { source?: string; medium?: string; campaign?: string },
//     submittedAt?: string,
//   }
//
// Behavior:
//   - Validates body
//   - Mints a lead id if missing
//   - POSTs to process.env.GHL_WEBHOOK_URL if set, else logs
//   - Always returns 200 with { ok: true, leadId } so the UI can advance
// ============================================================

type Qualification = {
  businessType?: string;
  teamSize?: string;
  biggestLeak?: string;
  monthlyLeads?: string;
  automateTargets?: string[];
  revenueRange?: string;
  urgency?: string;
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

function scoreLead(q?: Qualification): "HOT" | "WARM" | "COLD" {
  if (!q) return "COLD";
  const hotRev =
    q.revenueRange === "100k-500k" || q.revenueRange === "500k-plus";
  const hotUrgency = q.urgency === "this-month" || q.urgency === "30-60d";
  if (hotRev && hotUrgency) return "HOT";
  if (hotRev || hotUrgency) return "WARM";
  return "COLD";
}

async function forwardToGhl(payload: Payload, leadId: string, score: string) {
  const url = process.env.GHL_WEBHOOK_URL;
  if (!url) {
    console.info("[leads] GHL_WEBHOOK_URL not set; payload logged only", {
      leadId,
      score,
    });
    return { ok: false, skipped: true as const };
  }

  const body = {
    lead_id: leadId,
    source: payload.source || "discovery-call",
    score,
    qualification: payload.qualification || {},
    booking: payload.booking || null,
    utm: payload.utm || {},
    submitted_at: payload.submittedAt || new Date().toISOString(),
    tags: [
      "discovery-call",
      `score:${score}`,
      payload.qualification?.urgency
        ? `urgency:${payload.qualification.urgency}`
        : null,
      payload.qualification?.revenueRange
        ? `revenue:${payload.qualification.revenueRange}`
        : null,
      payload.booking ? "booked" : "qualified-only",
    ].filter(Boolean),
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return { ok: res.ok, status: res.status, skipped: false as const };
  } catch (err) {
    console.error("[leads] GHL forward failed", err);
    return { ok: false, error: String(err), skipped: false as const };
  }
}

export async function POST(req: Request) {
  let payload: Payload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Minimal validation — qualifier OR booking must be present
  if (!payload.qualification && !payload.booking) {
    return NextResponse.json(
      { error: "Either qualification or booking required" },
      { status: 400 },
    );
  }

  const leadId = payload.leadId || mintLeadId();
  const score = scoreLead(payload.qualification);

  const ghlResult = await forwardToGhl(payload, leadId, score);

  return NextResponse.json({
    ok: true,
    leadId,
    score,
    ghl: ghlResult,
  });
}
