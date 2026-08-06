import { NextResponse } from "next/server";
import { upsertGhlContact } from "@/lib/ghl";
import { sendLeadFallbackEmail } from "@/lib/lead-notify";
import { appendLeadToSink } from "@/lib/lead-sink";
import { sendCapiLead } from "@/lib/meta-capi";
import { checkRateLimit, readCappedJson } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ============================================================
// /api/lead-capture — LP audit-form + tool-gate email capture endpoint.
//
// POST shape:
//   { email: string, source: string, capturedAt: string, _honeypot?: string }
//
// Behavior:
//   - Rate-limited per IP (in-process, best-effort — see lib/rate-limit).
//   - Payload capped at 8KB before JSON.parse.
//   - Honeypot (`_honeypot` filled) → fake-success 200, no CRM/email writes.
//   - Server-side email regex validation. Reject 400 if invalid.
//   - If GHL env (GHL_API_TOKEN) is set, upsert contact tagged with
//     [source, "tool-lead"] via the shared upsertGhlContact helper.
//   - CRITICAL: a lead must never vanish with zero trace. If the GHL write
//     doesn't CONFIRM (env unset, upsert throws, or returns dev-skip), we
//     fall back to emailing the lead to Waseem via Resend (same pattern as
//     /api/discovery). If Resend is ALSO unconfigured, we log an unmissable
//     console.error with the full lead so it's at least recoverable from
//     server/deploy logs.
// ============================================================

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_BODY_BYTES = 8 * 1024;

type Payload = {
  email?: string;
  source?: string;
  capturedAt?: string;
  /** Browser-generated UUID shared with the client-side fbq Lead event so
      Meta deduplicates the pixel/CAPI pair. Optional — older callers omit it. */
  eventId?: string;
  _honeypot?: string;
};

function isValidEmail(s: string | undefined): s is string {
  if (!s || typeof s !== "string") return false;
  if (s.length > 254) return false;
  return EMAIL_RE.test(s);
}

export async function POST(req: Request) {
  const rl = checkRateLimit(req, {
    limit: 8,
    windowMs: 60_000,
    keyPrefix: "lead-capture",
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

  // Honeypot: filled = bot → fake-success, do nothing further.
  if (payload._honeypot) {
    console.warn("[lead-capture] honeypot tripped — submission dropped", {
      source: payload.source,
      email: payload.email,
    });
    return NextResponse.json({ ok: true });
  }

  const email = payload.email?.trim();
  const source = payload.source?.trim() || "unknown-tool";
  const capturedAt = payload.capturedAt || new Date().toISOString();

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  // Server-side CAPI Lead, deduped against the browser pixel via eventId.
  // Fail-soft by design: no token (pre-Gate-1) or Graph error never blocks
  // the lead paths below. Fire-and-forget would risk the runtime freezing
  // the promise on some hosts, so we await but ignore the result.
  if (payload.eventId) {
    await sendCapiLead({
      email,
      eventId: payload.eventId,
      source,
      sourceUrl: req.headers.get("referer") || undefined,
      ip:
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        req.headers.get("x-real-ip") ||
        undefined,
      userAgent: req.headers.get("user-agent") || undefined,
      fbp: req.headers.get("cookie")?.match(/(?:^|;\s*)_fbp=([^;]+)/)?.[1],
      fbc: req.headers.get("cookie")?.match(/(?:^|;\s*)_fbc=([^;]+)/)?.[1],
    });
  }

  const ghlConfigured = Boolean(process.env.GHL_API_TOKEN);
  let ghlConfirmed = false;
  let contactId: string | undefined;

  if (ghlConfigured) {
    try {
      const result = await upsertGhlContact(
        { email, source: `tool-gate:${source}` },
        null,
        [source, "tool-lead"],
      );
      if (result.contactId && result.contactId !== "dev-skip") {
        ghlConfirmed = true;
        contactId = result.contactId;
      }
    } catch (err) {
      console.error("[lead-capture] GHL upsert threw (falling back)", err);
    }
  } else {
    console.warn("[lead-capture] GHL_API_TOKEN unset — falling back to email");
  }

  let emailFallbackSent = false;
  if (!ghlConfirmed) {
    const reason = ghlConfigured
      ? "GHL upsert did not confirm a contact id"
      : "GHL_API_TOKEN is not configured";
    const fallback = await sendLeadFallbackEmail(
      { email, source, capturedAt },
      reason,
    );
    emailFallbackSent = fallback.ok;

    if (!fallback.ok) {
      // Last resort before failing: durable on-disk append. See lead-sink.ts.
      const sink = await appendLeadToSink({
        email,
        source,
        capturedAt,
        reason,
      });
      if (sink.written && sink.durable) {
        console.warn(
          "[lead-capture] CRM and email both unavailable — lead persisted to the on-disk sink. Read it with: cat .data/leads.jsonl",
          { email, source, reason, file: sink.file },
        );
        return NextResponse.json({ ok: true, sink: true });
      }
    }

    if (!fallback.ok) {
      // Neither the CRM write nor the email fallback confirmed. This is the
      // failure mode the whole route exists to prevent — make it loud.
      console.error(
        "[lead-capture] LEAD AT RISK — no CRM write confirmed and no email fallback sent. Check RESEND_API_KEY.",
        { email, source, capturedAt, reason },
      );
    }
  }

  if (!ghlConfirmed && !emailFallbackSent) {
    // Both delivery paths failed to confirm — tell the truth instead of
    // showing a fake success screen. The client renders this as a real
    // error state so the visitor knows to email directly.
    return NextResponse.json(
      {
        error:
          "Couldn't confirm delivery. Please email info@skynetjoe.com directly so nothing gets lost.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    contactId,
    ghl: ghlConfirmed,
    emailFallback: emailFallbackSent,
  });
}
