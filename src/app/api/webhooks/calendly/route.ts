import { NextResponse } from "next/server";

export const runtime = "nodejs";

// ============================================================
// /api/webhooks/calendly — Calendly invitee.created webhook receiver
//
// Calendly POSTs JSON like:
//   {
//     "event": "invitee.created",
//     "created_at": "...",
//     "payload": {
//       "event_type": { "uuid": "...", "name": "..." },
//       "event": { "uuid": "...", "start_time": "...", "end_time": "..." },
//       "invitee": { "uuid": "...", "name": "...", "email": "...",
//                    "timezone": "...", "text_reminder_number": "..." },
//       "questions_and_answers": [ { "question": "...", "answer": "..." } ],
//       "tracking": { "utm_source": "...", "utm_medium": "...",
//                     "utm_campaign": "...", "utm_content": "...",
//                     "utm_term": "...", "salesforce_uuid": "..." }
//     }
//   }
//
// Auth: Calendly signs every request with HMAC-SHA256 over the raw body
// using a secret shared at subscription creation. The signature ships in
// the `Calendly-Webhook-Signature` header in the form:
//   "t=<unix_ts>,v1=<hex_hmac>"
// (Multiple v1=… pairs are possible during key rotation — accept any match.)
// We compute HMAC-SHA256(`${t}.${rawBody}`, secret) and constant-time-compare.
//
// Behavior:
//   1. Read raw body (signature verification requires raw bytes, not JSON).
//   2. Verify Calendly-Webhook-Signature with CALENDLY_WEBHOOK_SECRET.
//      If invalid → 401, no GHL forward.
//   3. Parse JSON, derive lead tags from utm + questions_and_answers.
//   4. Forward enriched payload to GHL_WEBHOOK_URL.
//   5. Return 200 { ok, ghl_forwarded }.
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

// Constant-time string compare for hex hmacs.
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

async function hmacSha256Hex(
  key: string,
  message: string,
): Promise<string> {
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

  // Optional freshness window — 5 min. Skip if t isn't a valid number.
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

// Pull a few well-known qualification answers out of the QA array.
// Keys are matched case-insensitively, substring match.
function extractQA(
  qa: CalendlyQA[] | undefined,
  needles: string[],
): string | undefined {
  if (!qa) return undefined;
  for (const item of qa) {
    const q = (item.question || "").toLowerCase();
    for (const n of needles) {
      if (q.includes(n)) return item.answer || undefined;
    }
  }
  return undefined;
}

function buildGhlBody(parsed: CalendlyPayload) {
  const p = parsed.payload || {};
  const inv = p.invitee || {};
  const ev = p.event || {};
  const evType = p.event_type || {};
  const tracking = p.tracking || {};
  const qa = p.questions_and_answers || [];

  // Sources priority: explicit utm_source > utm_campaign > "discovery-call"
  const source =
    tracking.utm_source ||
    tracking.utm_campaign ||
    "discovery-call";

  const bucket = extractQA(qa, ["bucket", "stress bucket", "stress-bucket"]);
  const readinessScore = extractQA(qa, [
    "readiness score",
    "readiness_score",
    "ai readiness",
  ]);
  const monthlyLeads = extractQA(qa, [
    "monthly leads",
    "leads per month",
    "lead count",
  ]);
  const monthlyRevenue = extractQA(qa, [
    "monthly revenue",
    "revenue range",
    "mrr",
  ]);
  const urgency = extractQA(qa, ["urgency", "timeline", "when do you"]);
  const biggestLeak = extractQA(qa, ["biggest leak", "main pain", "leak"]);

  const tags = [
    `source:${source}`,
    bucket ? `bucket:${bucket}` : null,
    readinessScore ? `readiness:${readinessScore}` : null,
    urgency ? `urgency:${urgency}` : null,
    monthlyRevenue ? `revenue:${monthlyRevenue}` : null,
    "calendly-booked",
    parsed.event === "invitee.canceled" ? "canceled" : null,
  ].filter(Boolean);

  return {
    source,
    event: parsed.event,
    booked_at: parsed.created_at || new Date().toISOString(),
    scheduled_at: ev.start_time,
    scheduled_end: ev.end_time,
    event_type: evType.name,
    event_type_uuid: evType.uuid,
    event_uuid: ev.uuid,
    invitee_uuid: inv.uuid,
    first_name: inv.first_name || (inv.name || "").split(" ")[0] || "",
    last_name:
      inv.last_name || (inv.name || "").split(" ").slice(1).join(" ") || "",
    full_name: inv.name,
    email: inv.email,
    phone: inv.text_reminder_number,
    timezone: inv.timezone,
    qualification: {
      bucket,
      readiness_score: readinessScore,
      monthly_leads: monthlyLeads,
      monthly_revenue: monthlyRevenue,
      urgency,
      biggest_leak: biggestLeak,
    },
    utm: {
      source: tracking.utm_source,
      medium: tracking.utm_medium,
      campaign: tracking.utm_campaign,
      content: tracking.utm_content,
      term: tracking.utm_term,
    },
    raw_qa: qa,
    tags,
  };
}

async function forwardToGhl(body: object) {
  const url = process.env.GHL_WEBHOOK_URL;
  if (!url) {
    console.info("[calendly-webhook] GHL_WEBHOOK_URL not set; payload logged");
    return false;
  }
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      console.warn("[calendly-webhook] GHL non-2xx", res.status);
    }
    return res.ok;
  } catch (err) {
    console.error("[calendly-webhook] GHL forward failed", err);
    return false;
  }
}

export async function POST(req: Request) {
  const secret = process.env.CALENDLY_WEBHOOK_SECRET;

  // Raw body is required for HMAC verification — don't .json() first.
  const rawBody = await req.text();

  // If a secret is configured, signature MUST validate.
  // If no secret is configured (local dev / pre-setup), allow through but log.
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
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const ghlBody = buildGhlBody(parsed);
  const ghlForwarded = await forwardToGhl(ghlBody);

  return NextResponse.json({
    ok: true,
    ghl_forwarded: ghlForwarded,
  });
}

// Calendly does not GET, but a quick health-check is useful for verifying the
// route is live before configuring the webhook subscription.
export async function GET() {
  return NextResponse.json({
    ok: true,
    route: "/api/webhooks/calendly",
    signature_required: Boolean(process.env.CALENDLY_WEBHOOK_SECRET),
    ghl_configured: Boolean(process.env.GHL_WEBHOOK_URL),
  });
}
