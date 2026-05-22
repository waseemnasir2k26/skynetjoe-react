import { NextResponse } from "next/server";
import {
  handleGhlLead,
  moveContactOpportunityToStage,
  getOrCreateContactByEmail,
} from "@/lib/ghl";

export const runtime = "nodejs";

// ============================================================
// /api/webhooks/calendly — Calendly invitee.created / invitee.canceled
//
// 1. HMAC-SHA256 signature verification (Calendly-Webhook-Signature) —
//    UNCHANGED from previous revision.
// 2. On invitee.created → handleGhlLead w/ stage "appointment-set".
//    handleGhlLead's upsert+findOpportunity logic ensures we MOVE an
//    existing Inbound Lead opportunity rather than creating a duplicate.
// 3. On invitee.canceled → move opportunity to "no-show" + tag.
// ============================================================

type CalendlyQA = { question?: string; answer?: string };

type CalendlyPayload = {
  event?: string;
  created_at?: string;
  payload?: {
    event_type?: { uuid?: string; name?: string; kind?: string };
    event?: { uuid?: string; start_time?: string; end_time?: string };
    invitee?: {
      uuid?: string;
      name?: string;
      first_name?: string;
      last_name?: string;
      email?: string;
      timezone?: string;
      text_reminder_number?: string;
      rescheduled?: boolean;
      old_invitee?: string;
      new_invitee?: string;
    };
    questions_and_answers?: CalendlyQA[];
    tracking?: {
      utm_source?: string;
      utm_medium?: string;
      utm_campaign?: string;
      utm_content?: string;
      utm_term?: string;
      salesforce_uuid?: string;
    };
  };
};

// ─── HMAC verification (unchanged) ─────────────────────────────────────────

function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function toHex(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let out = "";
  for (let i = 0; i < bytes.length; i++) {
    out += bytes[i].toString(16).padStart(2, "0");
  }
  return out;
}

async function hmacSha256Hex(key: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", cryptoKey, enc.encode(message));
  return toHex(sig);
}

type ParsedSig = { t: string; v1List: string[] };

function parseSignatureHeader(header: string | null): ParsedSig | null {
  if (!header) return null;
  const parts = header.split(",").map((p) => p.trim());
  let t: string | null = null;
  const v1List: string[] = [];
  for (const p of parts) {
    const eq = p.indexOf("=");
    if (eq === -1) continue;
    const key = p.slice(0, eq).trim();
    const val = p.slice(eq + 1).trim();
    if (key === "t") t = val;
    else if (key === "v1") v1List.push(val);
  }
  if (!t || v1List.length === 0) return null;
  return { t, v1List };
}

async function verifyCalendlySignature(
  rawBody: string,
  header: string | null,
  secret: string,
): Promise<boolean> {
  const parsed = parseSignatureHeader(header);
  if (!parsed) return false;

  const tsNum = Number(parsed.t);
  if (Number.isFinite(tsNum)) {
    const ageSec = Math.abs(Math.floor(Date.now() / 1000) - tsNum);
    if (ageSec > 300) return false;
  }

  const expected = await hmacSha256Hex(secret, `${parsed.t}.${rawBody}`);
  for (const v1 of parsed.v1List) {
    if (timingSafeEqualHex(expected, v1)) return true;
  }
  return false;
}

// ─── Quiz answer extraction ────────────────────────────────────────────────

function extractQA(
  qa: CalendlyQA[] | undefined,
  needles: string[],
): string | undefined {
  if (!qa) return undefined;
  for (const item of qa) {
    const q = (item.question || "").toLowerCase();
    for (const n of needles) {
      if (q.includes(n)) {
        const a = (item.answer || "").trim();
        if (a) return a;
      }
    }
  }
  return undefined;
}

/**
 * Map Calendly QA → the qualification fields our GHL client wants.
 * Q1-Q7 = the discovery-call quiz answers (sometimes prefilled via custom
 * Calendly form fields a1..a7).
 */
function extractQualification(payload: CalendlyPayload) {
  const p = payload.payload || {};
  const inv = p.invitee || {};
  const qa = p.questions_and_answers || [];

  const fullName = (inv.name || "").trim();
  const splitName = fullName.split(/\s+/);

  return {
    email: inv.email || "",
    firstName: inv.first_name || splitName[0] || undefined,
    lastName:
      inv.last_name ||
      (splitName.length > 1 ? splitName.slice(1).join(" ") : undefined),
    phone: inv.text_reminder_number || undefined,
    timezone: inv.timezone || undefined,
    businessType:
      extractQA(qa, ["business type", "what type of business", "biz model"]) ||
      extractQA(qa, ["a1"]),
    teamSize:
      extractQA(qa, ["team size", "team", "employees"]) ||
      extractQA(qa, ["a2"]),
    bottleneck:
      extractQA(qa, ["bottleneck", "biggest leak", "main pain", "challenge"]) ||
      extractQA(qa, ["a3"]),
    monthlyLeads:
      extractQA(qa, ["monthly leads", "leads per month", "lead count"]) ||
      extractQA(qa, ["a4"]),
    automationWishlist:
      extractQA(qa, ["automation", "automate", "wishlist"]) ||
      extractQA(qa, ["a5"]),
    revenueRange:
      extractQA(qa, ["revenue range", "monthly revenue", "mrr", "revenue"]) ||
      extractQA(qa, ["a6"]),
    urgency:
      extractQA(qa, ["urgency", "timeline", "when do you", "goal"]) ||
      extractQA(qa, ["a7"]),
    businessName:
      extractQA(qa, ["business name", "company name", "company"]) || undefined,
    website: extractQA(qa, ["website", "url", "site"]) || undefined,
  };
}

// ─── Handlers ──────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  const secret = process.env.CALENDLY_WEBHOOK_SECRET;

  // Raw body for HMAC verification (must precede .json()).
  const rawBody = await req.text();

  if (secret) {
    const header = req.headers.get("calendly-webhook-signature");
    const ok = await verifyCalendlySignature(rawBody, header, secret);
    if (!ok) {
      return NextResponse.json(
        { ok: false, error: "Invalid signature" },
        { status: 401 },
      );
    }
  } else {
    console.warn(
      "[calendly-webhook] CALENDLY_WEBHOOK_SECRET not set — skipping signature verification (dev mode)",
    );
  }

  let parsed: CalendlyPayload;
  try {
    parsed = JSON.parse(rawBody);
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 },
    );
  }

  const event = parsed.event || "";
  const qualification = extractQualification(parsed);

  if (!qualification.email) {
    console.warn("[calendly-webhook] payload missing invitee.email");
    return NextResponse.json({ ok: true, skipped: "no-email" });
  }

  const tracking = parsed.payload?.tracking || {};
  const source =
    tracking.utm_source || tracking.utm_campaign || "calendly-booking";

  // ── invitee.created → move/create at Appointment Set ──
  if (event === "invitee.created") {
    const result = await handleGhlLead({
      qualification: {
        ...qualification,
        source,
        campaign: tracking.utm_campaign,
      },
      score: null,
      stage: "appointment-set",
      source,
      extraTags: [
        "calendly-booked",
        "discovery-call",
        tracking.utm_source ? `utm:${tracking.utm_source}` : "",
        tracking.utm_campaign ? `campaign:${tracking.utm_campaign}` : "",
      ].filter(Boolean) as string[],
    });

    return NextResponse.json({
      ok: true,
      event,
      contactId: result.contactId,
      opportunityId: result.opportunityId,
    });
  }

  // ── invitee.canceled → find opp, move to No Show, tag ──
  if (event === "invitee.canceled") {
    const contactId = await getOrCreateContactByEmail(qualification.email, {
      firstName: qualification.firstName,
      lastName: qualification.lastName,
      phone: qualification.phone,
      timezone: qualification.timezone,
    });

    if (!contactId) {
      return NextResponse.json({ ok: true, event, skipped: "no-contact" });
    }

    const moved = await moveContactOpportunityToStage(
      contactId,
      "no-show",
      ["calendly-canceled"],
    );

    return NextResponse.json({
      ok: true,
      event,
      contactId,
      moved,
    });
  }

  // Other events (invitee.rescheduled, etc) — accept but no-op.
  return NextResponse.json({ ok: true, event, skipped: "unhandled-event" });
}

// Health check — useful for confirming the route is live before configuring
// the webhook subscription.
export async function GET() {
  return NextResponse.json({
    ok: true,
    route: "/api/webhooks/calendly",
    signature_required: Boolean(process.env.CALENDLY_WEBHOOK_SECRET),
    ghl_api_configured: Boolean(process.env.GHL_API_TOKEN),
  });
}
