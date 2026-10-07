import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { upsertGhlContact } from "@/lib/ghl";
import { sendLeadFallbackEmail } from "@/lib/lead-notify";
import { postTriageShadow } from "@/lib/jev-triage";
import { appendLeadToSink } from "@/lib/lead-sink";
import { pingLeadFirehose } from "@/lib/ma-lead-ping";
import { pushSubscriberToHq } from "@/lib/hq-subscriber";
import { sendCapiLead } from "@/lib/meta-capi";
import { hasMetaConsent } from "@/lib/request-guard";
import { checkRateLimit, readCappedJson } from "@/lib/rate-limit";
import { guardJsonPost, tooManyRequests } from "@/lib/request-guard";

/**
 * MA-04 refuses any payload without a dedupe key, so the fallback paths — which
 * never get a GHL contact id — would silently never page. Those are the leads
 * most at risk of being lost, so they are exactly the ones that must alert.
 * Derived from email + capture time so a retry dedupes instead of double-paging.
 */
function syntheticLeadKey(email: string, capturedAt: string): string {
  const digest = createHash("sha256")
    .update(`${email}|${capturedAt}`)
    .digest("hex");
  return `lp-${digest.slice(0, 24)}`;
}

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

// Newsletter sign-ups: which site slugs may be mirrored to HQ, and a
// process-wide cap (matches HQ's own 120/min) so a rotating-XFF flood is bounded
// without locking real visitors out at the first burst.
// A same-site path: single leading slash, no protocol-relative or backslash form,
// no control / bidi characters. Used for the popup's page AND the Referer fallback.
const PATH_RE =
  /^\/(?![\/\\])[^\s<>\u0000-\u001f\u007f-\u009f\u200e\u200f\u202a-\u202e]{0,198}$/;
const NEWSLETTER_SITES = new Set(["skynetjoe", "waseemnasir"]);
const NEWSLETTER_PER_MIN = 120;
let nlWindowStart = 0;
let nlWindowCount = 0;
function newsletterAllowed(): boolean {
  const now = Date.now();
  if (now - nlWindowStart > 60_000) {
    nlWindowStart = now;
    nlWindowCount = 0;
  }
  nlWindowCount += 1;
  return nlWindowCount <= NEWSLETTER_PER_MIN;
}

type Payload = {
  email?: string;
  source?: string;
  capturedAt?: string;
  /** Browser-generated UUID shared with the client-side fbq Lead event so
      Meta deduplicates the pixel/CAPI pair. Optional — older callers omit it. */
  eventId?: string;
  /** Optional custom_data mirror — sent by LeadCaptureForm when the caller
      passes metaContentName/metaValue/metaCurrency (e.g. ops-audit's $497
      offer). Older callers omit these; sendCapiLead treats them as optional. */
  contentName?: string;
  value?: number;
  currency?: string;
  _honeypot?: string;
  /** Newsletter popup extras (source "newsletter-<site>"). Mirrored to HQ. */
  newsletter?: {
    firstName?: string;
    interest?: string;
    page?: string;
  };
};

/**
 * Path-only view of the Referer, for the sink + triage `page` field.
 * Query strings are dropped deliberately: UTM tails and tool state can carry
 * an email or a prefilled answer, and neither belongs in a triage webhook.
 * Returns undefined for a missing or unparseable header.
 */
function refererPath(req: Request): string | undefined {
  const raw = req.headers.get("referer");
  if (!raw) return undefined;
  try {
    return new URL(raw).pathname;
  } catch {
    return undefined;
  }
}

function isValidEmail(s: string | undefined): s is string {
  if (!s || typeof s !== "string") return false;
  if (s.length > 254) return false;
  return EMAIL_RE.test(s);
}

export async function POST(req: Request) {
  const refused = guardJsonPost(req);
  if (refused) return refused;

  const rl = checkRateLimit(req, {
    limit: 8,
    windowMs: 60_000,
    keyPrefix: "lead-capture",
  });
  if (!rl.allowed) return tooManyRequests(rl.retryAfterSec);

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

  if (
    (payload.email !== undefined && typeof payload.email !== "string") ||
    (payload.source !== undefined && typeof payload.source !== "string")
  ) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const email = payload.email?.trim();
  const source = (payload.source?.trim() || "unknown-tool").slice(0, 64);
  const capturedAt = payload.capturedAt || new Date().toISOString();

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  // Shared across the sink rows and the shadow-triage ping below, so one lead
  // is one id everywhere. This route's callers are email-only gates, so there
  // is no name/company/message to carry — only the capture page.
  const leadId = syntheticLeadKey(email, capturedAt);
  const refPath = refererPath(req);
  const page = refPath && PATH_RE.test(refPath) ? refPath : undefined;

  // Newsletter sign-ups ALSO go to HQ (hq.skynetjoe.com), the one list Waseem
  // reads — but only AFTER a delivery path below confirmed the write, so a
  // visitor retrying a failed submit cannot double-write HQ. The site slug is
  // allowlisted; anything else is a logged miss, never a 500.
  const isNewsletter = source.startsWith("newsletter-");
  if (isNewsletter && !newsletterAllowed()) {
    return tooManyRequests(60);
  }
  const mirrorToHq = async () => {
    if (!isNewsletter) return;
    const n = payload.newsletter ?? {};
    const site = source.slice("newsletter-".length);
    if (!NEWSLETTER_SITES.has(site)) {
      console.warn(
        "[lead-capture] newsletter: unknown site slug, HQ mirror skipped",
        { source },
      );
      return;
    }
    const hqOk = await pushSubscriberToHq({
      email,
      site,
      source: "popup",
      first_name:
        typeof n.firstName === "string"
          ? n.firstName
              .replace(/[\u0000-\u001f\u007f<>]/g, "")
              .trim()
              .slice(0, 80) || null
          : null,
      interest:
        typeof n.interest === "string" && /^[a-z0-9-]{1,32}$/.test(n.interest)
          ? n.interest
          : null,
      page:
        typeof n.page === "string" && PATH_RE.test(n.page)
          ? n.page
          : (page ?? null),
    });
    if (!hqOk)
      console.warn("[lead-capture] newsletter: HQ mirror did not confirm", {
        source,
      });
  };

  /**
   * Shadow triage (JEV_TRIAGE_WEBHOOK). Fire-and-forget, never awaited, never
   * throws, no email and no phone in the body. Unset env = no-op.
   */
  const fireTriage = () =>
    postTriageShadow({ leadId, source, ts: capturedAt, page });

  // Server-side CAPI Lead, deduped against the browser pixel via eventId.
  // Fail-soft by design: no token (pre-Gate-1) or Graph error never blocks
  // the lead paths below. Fire-and-forget would risk the runtime freezing
  // the promise on some hosts, so we await but ignore the result.
  if (payload.eventId && hasMetaConsent(req)) {
    await sendCapiLead({
      email,
      eventId: payload.eventId,
      source,
      contentName: payload.contentName,
      value: typeof payload.value === "number" ? payload.value : undefined,
      currency: payload.currency,
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
        leadId,
        page,
      });
      if (sink.written && sink.durable) {
        console.warn(
          "[lead-capture] CRM and email both unavailable — lead persisted to the on-disk sink. Read it with: cat .data/leads.jsonl",
          { email, source, reason, file: sink.file },
        );
        // Never awaited — alerting side-channel, never a delivery path.
        void pingLeadFirehose({
          contactId: leadId,
          email,
          source,
          extras: { delivery: "disk-sink", ghl_confirmed: false, reason },
        });
        fireTriage();
        await mirrorToHq();
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
          "Couldn't confirm delivery. Please email waseem@skynetjoe.com directly so nothing gets lost.",
      },
      { status: 502 },
    );
  }

  // Never awaited — alerting side-channel, never a delivery path. The lead is
  // already written by this point; if n8n is down the visitor must still succeed.
  void pingLeadFirehose({
    contactId: contactId ?? leadId,
    email,
    source,
    extras: {
      delivery: ghlConfirmed ? "ghl" : "email-fallback",
      ghl_confirmed: ghlConfirmed,
    },
  });

  fireTriage();
  await mirrorToHq();

  return NextResponse.json({
    ok: true,
    contactId,
    ghl: ghlConfirmed,
    emailFallback: emailFallbackSent,
  });
}
