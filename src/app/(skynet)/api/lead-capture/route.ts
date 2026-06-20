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

/**
 * Newsletter welcome — send the "Build Log" welcome email straight to the
 * SUBSCRIBER via Resend. This replaces a GHL Workflow (GHL has no API to create
 * workflows) so the whole newsletter funnel runs from code with no UI setup.
 * Fire-and-forget: a welcome-send failure must never fail the capture response.
 */
async function sendNewsletterWelcome(email: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[lead-capture] RESEND_API_KEY unset — welcome email skipped");
    return;
  }
  const fromEmail =
    process.env.NEWSLETTER_FROM || "Waseem <waseem@skynetjoe.com>";
  const subject = "You're on the build log.";
  const html =
    `<div style="margin:0;padding:0;background:#FAF7F0;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;">` +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FAF7F0;"><tr><td align="center" style="padding:32px 16px;">` +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#FFFDF7;border:1px solid rgba(26,26,26,0.14);">` +
    `<tr><td style="height:4px;background:#D97757;font-size:0;line-height:0;">&nbsp;</td></tr>` +
    `<tr><td style="padding:36px 32px 8px;"><div style="font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#D97757;">— The build log</div></td></tr>` +
    `<tr><td style="padding:4px 32px 0;">` +
    `<h1 style="margin:0 0 16px;font-family:Georgia,serif;font-size:28px;line-height:1.15;font-weight:500;letter-spacing:-0.02em;color:#1A1A1A;">You&rsquo;re on the list.</h1>` +
    `<p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#3a3a3a;">Quick one, then I&rsquo;ll leave your inbox alone.</p>` +
    `<p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#3a3a3a;">I build AI systems for solo operators and small teams &mdash; mostly with Claude Code, n8n, and GoHighLevel, mostly from a cafe in Bali. When a build actually works &mdash; a prompt, an automation, a funnel piece &mdash; I write up exactly how I did it and send it here.</p>` +
    `<p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#3a3a3a;"><strong style="color:#1A1A1A;">No schedule. No filler.</strong> You only hear from me when there&rsquo;s something worth stealing. Hit reply any time &mdash; I read every one.</p>` +
    `<p style="margin:0 0 28px;font-size:15px;line-height:1.6;color:#3a3a3a;">Got a bottleneck you want gone? Tell me what it is. I might just build it next and put your name on the writeup.</p>` +
    `</td></tr>` +
    `<tr><td style="padding:0 32px 32px;"><a href="https://skynetjoe.com/discovery-call" style="display:inline-block;background:#D97757;color:#FFFDF7;text-decoration:none;font-weight:700;font-size:15px;padding:14px 24px;border-radius:2px;">Book a free strategy call &rarr;</a></td></tr>` +
    `<tr><td style="border-top:1px solid rgba(26,26,26,0.10);padding:20px 32px;"><p style="margin:0;font-family:'IBM Plex Mono',monospace;font-size:11px;line-height:1.6;letter-spacing:0.06em;color:#8a8378;text-transform:uppercase;">Waseem Nasir &middot; SkynetLabs &middot; Built in Bali<br/><a href="mailto:waseem@skynetjoe.com" style="color:#D97757;text-decoration:none;">waseem@skynetjoe.com</a></p></td></tr>` +
    `</table></td></tr></table></div>`;
  const text =
    `You're on the list.\n\n` +
    `Quick one, then I'll leave your inbox alone.\n\n` +
    `I build AI systems for solo operators and small teams — mostly with Claude Code, n8n, and GoHighLevel, mostly from a cafe in Bali. When a build actually works — a prompt, an automation, a funnel piece — I write up exactly how I did it and send it here.\n\n` +
    `No schedule. No filler. You only hear from me when there's something worth stealing. Hit reply any time — I read every one.\n\n` +
    `Got a bottleneck you want gone? Tell me what it is. I might just build it next and put your name on the writeup.\n\n` +
    `Book a free strategy call: https://skynetjoe.com/discovery-call\n\n` +
    `— Waseem Nasir · SkynetLabs · Built in Bali · waseem@skynetjoe.com`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [email],
        subject,
        html,
        text,
      }),
    });
    if (!res.ok) {
      console.error("[lead-capture] welcome email non-OK", res.status);
    }
  } catch (err) {
    console.error("[lead-capture] welcome email failed", String(err));
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

  // Newsletter signups get an extra `build-log` tag (= the subscriber list to
  // segment/broadcast on) and an immediate welcome email — no GHL Workflow
  // needed (GHL exposes no workflow-create API).
  const isNewsletter = source === "newsletter-popup";
  const extraTags = isNewsletter
    ? [source, "tool-lead", "build-log"]
    : [source, "tool-lead"];

  // Happy path: try the real GHL write first.
  if (process.env.GHL_API_TOKEN) {
    try {
      const result = await upsertGhlContact(
        { email, source: `tool-gate:${source}` },
        null,
        extraTags,
      );

      // A real contact id (not the dev-skip sentinel) = lead is captured.
      if (!result.skipped && result.contactId !== "dev-skip") {
        if (isNewsletter) await sendNewsletterWelcome(email);
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
    if (isNewsletter) await sendNewsletterWelcome(email);
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
