/**
 * Durable-enough fallback so a lead is never silently eaten when the CRM
 * write doesn't confirm (GHL_API_TOKEN unset, or the upsert failed/timed
 * out). There is no DB/queue in this repo — see AGENTS.md dependency
 * list — so the fallback is a direct Resend email to Waseem, same
 * hand-rolled pattern already used by /api/discovery.
 *
 * Env contract:
 *   RESEND_API_KEY     — required for the fallback email to actually send.
 *   RESEND_FROM        — defaults to "leads@skynetjoe.com".
 *   LEAD_NOTIFY_EMAIL  — defaults to "info@skynetjoe.com".
 *
 * If RESEND_API_KEY is also unset, this never throws — it returns
 * `{ ok: false, skipped: true }` and the caller is responsible for logging
 * an unmissable line so the lead isn't lost with zero trace.
 */

const RESEND_URL = "https://api.resend.com/emails";

function esc(value?: string): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export type FallbackLead = {
  email: string;
  source: string;
  capturedAt: string;
};

export async function sendLeadFallbackEmail(
  lead: FallbackLead,
  reason: string,
): Promise<{ ok: boolean; skipped?: boolean; status?: number }> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.LEAD_NOTIFY_EMAIL || "info@skynetjoe.com";
  const fromEmail = process.env.RESEND_FROM || "leads@skynetjoe.com";
  if (!apiKey) return { ok: false, skipped: true };

  const subject = `[lead-capture fallback] ${lead.source} — ${lead.email}`;
  const html = `
    <div style="font-family:-apple-system,Segoe UI,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#0a2d4a;color:#fff;">
      <div style="background:linear-gradient(135deg,#1E88E5,#14B8A6);padding:18px 20px;border-radius:12px;margin-bottom:18px;">
        <h1 style="margin:0;font-size:20px;">CRM write did not confirm — fallback delivery</h1>
        <p style="margin:6px 0 0;opacity:0.9;">${esc(reason)}</p>
      </div>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.08);font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#7ee4ff;width:120px;">Email</td>
          <td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.08);">${esc(lead.email)}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.08);font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#7ee4ff;">Source</td>
          <td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.08);">${esc(lead.source)}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#7ee4ff;">Captured at</td>
          <td style="padding:8px 12px;">${esc(lead.capturedAt)}</td>
        </tr>
      </table>
    </div>
  `;

  try {
    const res = await fetch(RESEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: lead.email,
        subject,
        html,
      }),
    });
    return { ok: res.ok, status: res.status };
  } catch (err) {
    console.error("[lead-notify] Resend fetch failed", err);
    return { ok: false };
  }
}
