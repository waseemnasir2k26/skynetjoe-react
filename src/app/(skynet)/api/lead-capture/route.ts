import { NextResponse } from "next/server";
import { upsertGhlContact } from "@/lib/ghl";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ============================================================
// /api/lead-capture — tool-gate email capture endpoint.
//
// POST shape:
//   { email: string, source: string, capturedAt: string }
//
// Behavior:
//   - Server-side email regex validation. Reject 400 if invalid.
//   - Happy path: GHL_API_TOKEN set → upsertGhlContact tagged
//     [source, "tool-lead"]. If a real contact id comes back → ok:true.
//   - If GHL is NOT configured, dev-skips, or throws, we do NOT pretend
//     success. We attempt a DURABLE fallback (Slack webhook and/or Resend
//     email). Only if something durable actually captured the lead do we
//     return ok:true. Otherwise we 502 so the client knows the lead was lost.
//   - No silent `queued:true` — there is no real queue. A success response
//     here must mean the lead landed somewhere a human will see it.
// ============================================================

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Payload = {
  email?: string;
  source?: string;
  capturedAt?: string;
};

function isValidEmail(s: string | undefined): s is string {
  if (!s || typeof s !== "string") return false;
  if (s.length > 254) return false;
  return EMAIL_RE.test(s);
}

/**
 * Durable fallback #1 — POST the lead to a Slack incoming webhook.
 * Returns true only when Slack accepts the message.
 */
async function notifySlack(args: {
  email: string;
  source: string;
  capturedAt: string;
}): Promise<boolean> {
  const url = process.env.SLACK_FEEDBACK_WEBHOOK;
  if (!url) return false;
  const text =
    `*New tool-gate lead* (GHL unavailable — captured via fallback)\n` +
    `• email: ${args.email}\n` +
    `• source: ${args.source}\n` +
    `• at: ${args.capturedAt}`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    return res.ok;
  } catch (err) {
    console.error("[lead-capture] slack fallback failed", String(err));
    return false;
  }
}

/**
 * Durable fallback #2 — email the lead via Resend (mirrors the pattern in
 * /api/discovery). Returns true only when Resend accepts the message.
 */
async function notifyEmail(args: {
  email: string;
  source: string;
  capturedAt: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.LEAD_NOTIFY_EMAIL;
  if (!apiKey || !toEmail) return false;
  const fromEmail = process.env.RESEND_FROM || "leads@skynetjoe.com";

  const safeEmail = args.email.replace(/</g, "&lt;");
  const safeSource = args.source.replace(/</g, "&lt;");
  const subject = `[tool-lead] ${safeEmail} — ${safeSource}`;
  const html =
    `<div style="font-family:-apple-system,Segoe UI,sans-serif;line-height:1.5;">` +
    `<h2 style="margin:0 0 12px;">New tool-gate lead</h2>` +
    `<p style="margin:0 0 4px;color:#555;font-size:13px;">GHL unavailable — captured via email fallback.</p>` +
    `<p><strong>Email:</strong> ${safeEmail}</p>` +
    `<p><strong>Source:</strong> ${safeSource}</p>` +
    `<p><strong>Captured at:</strong> ${args.capturedAt}</p>` +
    `</div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: args.email,
        subject,
        html,
      }),
    });
    return res.ok;
  } catch (err) {
    console.error("[lead-capture] resend fallback failed", String(err));
    return false;
  }
}

/** Run both durable sinks; succeed if EITHER one captured the lead. */
async function captureDurably(args: {
  email: string;
  source: string;
  capturedAt: string;
}): Promise<boolean> {
  const [slack, email] = await Promise.allSettled([
    notifySlack(args),
    notifyEmail(args),
  ]);
  const slackOk = slack.status === "fulfilled" && slack.value;
  const emailOk = email.status === "fulfilled" && email.value;
  return slackOk || emailOk;
}

export async function POST(req: Request) {
  let payload: Payload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = payload.email?.trim();
  const source = payload.source?.trim() || "unknown-tool";
  const capturedAt = payload.capturedAt || new Date().toISOString();

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const lead = { email, source, capturedAt };

  // Happy path: try the real GHL write first.
  if (process.env.GHL_API_TOKEN) {
    try {
      const result = await upsertGhlContact(
        { email, source: `tool-gate:${source}` },
        null,
        [source, "tool-lead"],
      );

      // A real contact id (not the dev-skip sentinel) = lead is captured.
      if (!result.skipped && result.contactId !== "dev-skip") {
        return NextResponse.json({
          ok: true,
          contactId: result.contactId,
          isNew: result.isNew,
        });
      }
      // GHL dev-skipped or failed despite a token being present — fall through
      // to the durable fallback below instead of faking success.
      console.warn("[lead-capture] GHL upsert did not persist; using fallback");
    } catch (err) {
      console.error("[lead-capture] GHL upsert threw; using fallback", err);
    }
  } else {
    console.warn("[lead-capture] GHL_API_TOKEN unset; using durable fallback");
  }

  // Durable fallback — Slack and/or Resend email.
  const captured = await captureDurably(lead);
  if (captured) {
    return NextResponse.json({ ok: true, fallback: true });
  }

  // Nothing durable captured the lead — do NOT pretend success.
  console.error("[lead-capture] LEAD DROPPED — no durable sink captured it", {
    email,
    source,
    capturedAt,
  });
  return NextResponse.json(
    { error: "Couldn't save your email. Please email info@skynetjoe.com." },
    { status: 502 },
  );
}
