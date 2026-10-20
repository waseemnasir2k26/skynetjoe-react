import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { upsertGhlContact } from "@/lib/ghl";
import { sendLeadFallbackEmail } from "@/lib/lead-notify";
import { postTriageShadow } from "@/lib/jev-triage";
import { appendLeadToSink } from "@/lib/lead-sink";
import { pingLeadFirehose } from "@/lib/ma-lead-ping";
import { hqSourceSlug, pushSubscriberToHq } from "@/lib/hq-subscriber";
import { sendCapiLead } from "@/lib/meta-capi";
import { checkRateLimit, getClientIpOrUndefined, readCappedJson } from "@/lib/rate-limit";

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

// Newsletter popup sign-ups (source "newsletter-<site>") are mirrored to HQ.
// Same-site path: single leading slash, no protocol-relative/backslash, no control/bidi chars.
const PATH_RE =
  /^\/(?![\/\\])[^\s<>\u0000-\u001f\u007f-\u009f\u200e\u200f\u202a-\u202e]{0,198}$/;
const NEWSLETTER_SITES = new Set(["skynetjoe", "waseemnasir"]);
const NEWSLETTER_INTERESTS = new Set(["ai-video", "automation", "websites", "everything"]);
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

// Separate site-wide cap for the non-popup HQ mirror (LP forms, tool gates), so a
// flood there can never lock popup sign-ups out of HQ, and vice versa.
const LEAD_HQ_PER_MIN = 120;
let leadWindowStart = 0;
let leadWindowCount = 0;
function leadHqAllowed(): boolean {
  const now = Date.now();
  if (now - leadWindowStart > 60_000) {
    leadWindowStart = now;
    leadWindowCount = 0;
  }
  leadWindowCount += 1;
  return leadWindowCount <= LEAD_HQ_PER_MIN;
}

type Payload = {
  email?: string;
  /** Unchecked-by-default "also send me the email list" box on the shared forms. */
  newsletterOptIn?: boolean;
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
  newsletter?: { firstName?: string; interest?: string; page?: string };
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
  // `source` becomes a GHL tag (tags can trigger GHL workflows), so clamp it
  // to a slug: lowercase [a-z0-9-_:], max 64 chars. Every real caller already
  // sends a slug ("prompt-library", "lp-freight", tool slugs), so this only
  // affects hand-crafted requests.
  const source =
    (typeof payload.source === "string"
      ? payload.source.trim().toLowerCase().replace(/[^a-z0-9:_-]/g, "").slice(0, 64)
      : "") || "unknown-tool";
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

  // Newsletter popup: GHL and HQ both get the sign-up. HQ runs in parallel
  // with the GHL path, is awaited (4s cap inside pushSubscriberToHq) before
  // every response, and can never throw or change the response.
  const isNewsletter = source.startsWith("newsletter-");
  // Site-wide cap only throttles the HQ mirror (which triggers Brevo emails);
  // the visitor's GHL write still happens, so a distributed flood cannot lock
  // real sign-ups out. The per-IP limit above stays the main guard.
  const nlOverCap = isNewsletter && !newsletterAllowed();
  const nl = isNewsletter && payload.newsletter && typeof payload.newsletter === "object"
    ? payload.newsletter
    : {};
  const nlFirstName =
    typeof nl.firstName === "string"
      ? nl.firstName.replace(/[\u0000-\u001f\u007f<>]/g, "").trim().slice(0, 80) || undefined
      : undefined;
  const nlInterest =
    typeof nl.interest === "string" && NEWSLETTER_INTERESTS.has(nl.interest)
      ? nl.interest
      : undefined;
  const hqMirror: Promise<void> = (async () => {
    if (!isNewsletter) {
      // Every other capture (LP forms, tool gates, prompt library) lands in HQ
      // too — as a lead only unless the visitor ticked the opt-in box.
      if (!leadHqAllowed()) {
        console.warn("[lead-capture] HQ lead mirror site-wide cap hit; skipped", { source });
        return;
      }
      try {
        const ok = await pushSubscriberToHq({
          email,
          site: "skynetjoe",
          source: hqSourceSlug(source, "unknown-tool"),
          first_name: null,
          page: page ?? null,
          consent: payload.newsletterOptIn === true,
        });
        if (!ok) console.warn("[lead-capture] HQ lead mirror did not confirm", { source });
      } catch (err) {
        console.warn("[lead-capture] HQ lead mirror threw", err);
      }
      return;
    }
    if (nlOverCap) {
      console.warn("[lead-capture] newsletter site-wide cap hit; HQ mirror skipped");
      return;
    }
    const site = source.slice("newsletter-".length);
    if (!NEWSLETTER_SITES.has(site)) {
      console.warn("[lead-capture] newsletter: unknown site, HQ mirror skipped", { source });
      return;
    }
    try {
      const ok = await pushSubscriberToHq({
        email,
        site,
        source: "popup",
        consent: true,
        first_name: nlFirstName ?? null,
        interest: nlInterest ?? null,
        page: typeof nl.page === "string" && PATH_RE.test(nl.page) ? nl.page : (page ?? null),
      });
      if (!ok) console.warn("[lead-capture] newsletter: HQ mirror did not confirm", { source });
    } catch (err) {
      console.warn("[lead-capture] newsletter: HQ mirror threw", err);
    }
  })();

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
  if (payload.eventId) {
    await sendCapiLead({
      email,
      eventId: payload.eventId,
      source,
      contentName: payload.contentName,
      value: typeof payload.value === "number" ? payload.value : undefined,
      currency: payload.currency,
      sourceUrl: req.headers.get("referer") || undefined,
      ip:
        getClientIpOrUndefined(req),
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
        { email, source: `tool-gate:${source}`, firstName: nlFirstName },
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
        await hqMirror;
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
    await hqMirror; // HQ is a separate list: the sign-up still lands there.
    return NextResponse.json(
      {
        error:
          "Couldn't confirm delivery. Please email info@skynetjoe.com directly so nothing gets lost.",
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
  await hqMirror;

  return NextResponse.json({
    ok: true,
    contactId,
    ghl: ghlConfirmed,
    emailFallback: emailFallbackSent,
  });
}
