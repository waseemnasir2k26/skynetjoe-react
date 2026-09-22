/**
 * JEV shadow triage hook — a fire-and-forget mirror of inbound leads to an
 * external triage endpoint, for scoring/routing experiments that must NOT be
 * able to affect the live lead path.
 *
 * HARD CONSTRAINTS (do not relax any of these):
 *
 *  1. NO PII THAT IDENTIFIES A PERSON DIRECTLY. The body carries no email and
 *     no phone number, ever. `buildTriageBody` constructs the payload key by
 *     key from an allow-list rather than spreading the caller's object, so a
 *     future field added to SinkLead cannot leak into the webhook by accident.
 *  2. NEVER IN THE RESPONSE PATH. Callers use `postTriageShadow(...)`, which
 *     returns void immediately. Nothing awaits it, so a hanging endpoint can
 *     never hold a visitor's form open.
 *  3. NEVER THROWS. Every failure — unset env, DNS, non-2xx, timeout, a
 *     runtime without fetch — is swallowed and (at most) logged as a warning.
 *     A broken triage webhook must never turn a captured lead into a 500.
 *  4. UNSET ENV = TOTAL NO-OP. With JEV_TRIAGE_WEBHOOK unset (the default,
 *     including production today) this does not even construct a request.
 *
 * Env:
 *   JEV_TRIAGE_WEBHOOK  — absolute https URL. Unset/blank → no-op.
 *   JEV_TRIAGE_SECRET   — sent as the `x-triage-secret` header. Optional; if
 *                         unset the header is omitted entirely rather than
 *                         sent empty (an empty shared secret is worse than no
 *                         header, because it looks authenticated).
 */

/** Hard ceiling on the outbound request, including connect + body. */
const TRIAGE_TIMEOUT_MS = 3000;

/** Trim free text so a long form message can't become a multi-KB webhook. */
const MAX_MESSAGE_CHARS = 2000;
const MAX_FIELD_CHARS = 300;

export type TriageInput = {
  /** Stable id for this lead. Callers pass the route's own id when they have one. */
  leadId?: string;
  source: string;
  /** ISO timestamp of capture. Defaults to now. */
  ts?: string;
  name?: string;
  company?: string;
  message?: string;
  /** Page/path the lead was captured from — NOT the prospect's own website. */
  page?: string;
};

export type TriageBody = {
  lead_id: string;
  source: string;
  ts: string;
  name?: string;
  company?: string;
  message?: string;
  page?: string;
};

function clean(value: unknown, max: number): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return trimmed.length > max ? trimmed.slice(0, max) : trimmed;
}

/** True when a triage endpoint is configured. Exported for tests + logging. */
export function triageIsConfigured(): boolean {
  return Boolean(process.env.JEV_TRIAGE_WEBHOOK?.trim());
}

/**
 * Build the outbound body from an allow-list. Exported so the no-PII contract
 * is testable without a network call.
 */
export function buildTriageBody(input: TriageInput): TriageBody {
  return {
    lead_id: clean(input.leadId, MAX_FIELD_CHARS) ?? crypto.randomUUID(),
    source: clean(input.source, MAX_FIELD_CHARS) ?? "unknown",
    ts: clean(input.ts, MAX_FIELD_CHARS) ?? new Date().toISOString(),
    name: clean(input.name, MAX_FIELD_CHARS),
    company: clean(input.company, MAX_FIELD_CHARS),
    message: clean(input.message, MAX_MESSAGE_CHARS),
    page: clean(input.page, MAX_FIELD_CHARS),
  };
}

async function send(input: TriageInput): Promise<void> {
  const url = process.env.JEV_TRIAGE_WEBHOOK?.trim();
  if (!url) return; // no-op: nothing configured

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TRIAGE_TIMEOUT_MS);
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    const secret = process.env.JEV_TRIAGE_SECRET?.trim();
    if (secret) headers["x-triage-secret"] = secret;

    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(buildTriageBody(input)),
      signal: controller.signal,
      // Never let a caching layer replay or coalesce a lead event.
      cache: "no-store",
    });
    if (!res.ok) {
      console.warn("[jev-triage] non-2xx from triage webhook", {
        status: res.status,
        source: input.source,
      });
    }
  } catch (err) {
    console.warn("[jev-triage] triage post failed (ignored)", {
      source: input.source,
      err: err instanceof Error ? err.message : String(err),
    });
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Fire-and-forget. Returns synchronously; the caller must NOT await it.
 * Swallows every error by construction.
 */
export function postTriageShadow(input: TriageInput): void {
  try {
    void send(input).catch(() => {});
  } catch {
    // send() is async so this is belt-and-braces: even a synchronous throw
    // while constructing the promise must not reach the route.
  }
}
