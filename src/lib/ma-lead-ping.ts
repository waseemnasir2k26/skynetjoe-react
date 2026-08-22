/* ============================================================
   MA-04 LEAD FIREHOSE PING

   The "call them within minutes" promise the paid funnel sells has,
   until now, had nothing behind it. An audit of the live n8n estate
   on 2026-08-23 found `MA-04 Lead Firehose` active, correct, and
   with ZERO executions in its entire lifetime — not because it was
   broken (a signed probe against the live URL produced a clean
   execution), but because **nothing in the stack had ever been
   wired to call it.** A grep across the whole GITHUB tree for
   `ma-lead-in` found no caller at all.

   That is the gap this closes. A lead reaching the landing page now
   also pages the phone.

   FAIL-SOFT, ALWAYS. This is an alerting side-channel, never a
   delivery path. The lead has already been written to the CRM by
   the time this runs; if n8n is down, slow, or misconfigured, the
   lead must still succeed. Every failure here is swallowed and
   logged, never thrown, and the whole thing is behind a short
   timeout so a hanging webhook cannot hold a visitor's form open.

   CONFIGURATION (both required, otherwise this no-ops silently):
     MA_LEAD_WEBHOOK_URL     https://n8n.skynetjoe.com/webhook/ma-lead-in
     MA_LEAD_WEBHOOK_SECRET  must equal MA_WEBHOOK_SECRET in the
                             n8n instance's own env, or the workflow
                             rejects the call at its auth gate

   PAYLOAD CONTRACT — read off MA-04's own `Verify + Normalize` node,
   not guessed. It accepts a GHL-webhook-shaped body or a Meta Lead
   Ads `field_data` array, and it **refuses any payload without a
   dedupe key**, returning 400 rather than storing a lead it cannot
   deduplicate. So `contact_id` is mandatory here, and anything not
   in its KNOWN set is preserved verbatim into the `answers` column.
   ============================================================ */

const TIMEOUT_MS = 2500;

export type MaLeadPing = {
  contactId: string;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  source?: string;
  score?: string;
  booked?: boolean;
  /** Free-form qualification answers — preserved verbatim by MA-04. */
  extras?: Record<string, unknown>;
};

export async function pingLeadFirehose(
  lead: MaLeadPing,
): Promise<{ sent: boolean; reason?: string }> {
  const url = process.env.MA_LEAD_WEBHOOK_URL?.trim();
  const secret = process.env.MA_LEAD_WEBHOOK_SECRET?.trim();

  if (!url || !secret) {
    return { sent: false, reason: "not configured" };
  }

  // MA-04 rejects anything it cannot dedupe. Better to skip the call
  // than to spend a request earning a guaranteed 400.
  if (!lead.contactId || lead.contactId === "dev-skip") {
    return { sent: false, reason: "no dedupe key (contactId)" };
  }

  const body = {
    contact_id: lead.contactId,
    created_time: new Date().toISOString(),
    first_name: lead.firstName ?? null,
    last_name: lead.lastName ?? null,
    email: lead.email ?? null,
    phone: lead.phone ?? null,
    // Not in MA-04's KNOWN set, so these land in `answers` untouched —
    // which is what makes the Slack ping useful rather than just a
    // notification that someone, somewhere, did something.
    lead_source: lead.source ?? null,
    lead_score: lead.score ?? null,
    booked: lead.booked ? "yes" : "no",
    ...(lead.extras ?? {}),
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-MA-Secret": secret,
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    if (!res.ok) {
      // 401 here means the two secrets have drifted apart; 400 means
      // the dedupe key never arrived. Both are worth naming in the
      // log rather than collapsing into a generic failure.
      return { sent: false, reason: `HTTP ${res.status}` };
    }
    return { sent: true };
  } catch (err) {
    const reason =
      err instanceof Error && err.name === "AbortError"
        ? `timeout after ${TIMEOUT_MS}ms`
        : err instanceof Error
          ? err.message
          : "unknown error";
    return { sent: false, reason };
  } finally {
    clearTimeout(timer);
  }
}
