import crypto from "crypto";

// ============================================================
// meta-capi — server-side Meta Conversions API Lead sender.
//
// Called from /api/lead-capture after a lead is accepted, mirroring the
// browser pixel's Lead event with the SAME event_id so Meta deduplicates
// the pair (browser fires fbq('track','Lead',{},{eventID}) on success;
// see LeadCaptureForm).
//
// Deliberately fail-soft: no META_CAPI_TOKEN (set only after Gate 1) or a
// Graph error must NEVER break lead capture — the lead is already stored.
// Returns a status string for logging, never throws.
// ============================================================

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1040197438955330";
const CAPI_TOKEN = process.env.META_CAPI_TOKEN;
const TEST_EVENT_CODE = process.env.META_CAPI_TEST_EVENT_CODE;

const sha256 = (s: string) =>
  crypto.createHash("sha256").update(s.trim().toLowerCase()).digest("hex");

export type CapiLeadInput = {
  email: string;
  eventId: string;
  // Meta standard event name to send; defaults to "Lead". The ai-audit funnel
  // also sends "Schedule" when a Calendly booking completes.
  eventName?: string;
  sourceUrl?: string;
  ip?: string;
  userAgent?: string;
  fbp?: string;
  fbc?: string;
  source?: string;
};

export async function sendCapiLead(
  input: CapiLeadInput,
): Promise<{ sent: boolean; reason?: string }> {
  if (!CAPI_TOKEN) return { sent: false, reason: "META_CAPI_TOKEN unset" };

  const user_data: Record<string, string> = { em: sha256(input.email) };
  if (input.ip) user_data.client_ip_address = input.ip;
  if (input.userAgent) user_data.client_user_agent = input.userAgent;
  if (input.fbp) user_data.fbp = input.fbp;
  if (input.fbc) user_data.fbc = input.fbc;

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: input.eventName || "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: input.eventId,
        event_source_url: input.sourceUrl,
        action_source: "website",
        user_data,
        custom_data: input.source ? { content_name: input.source } : {},
      },
    ],
    access_token: CAPI_TOKEN,
  };
  if (TEST_EVENT_CODE) payload.test_event_code = TEST_EVENT_CODE;

  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${PIXEL_ID}/events`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error(
        "[meta-capi] Graph error",
        res.status,
        detail.slice(0, 500),
      );
      return { sent: false, reason: `graph ${res.status}` };
    }
    return { sent: true };
  } catch (err) {
    console.error("[meta-capi] network error", err);
    return { sent: false, reason: "network error" };
  }
}
