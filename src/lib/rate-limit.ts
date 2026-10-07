/**
 * Minimal, dependency-free, in-process abuse protection for public POST
 * routes (lead-capture forms). No Redis/DB in this repo — this is a
 * best-effort per-instance guard, not a distributed limiter.
 *
 * Fails OPEN on internal errors (never blocks a real lead because the
 * limiter itself broke) but fails CLOSED once a caller is over its quota
 * (obvious abuse is rejected, not logged-and-allowed).
 *
 * Caveat: in-memory state resets on redeploy/restart and is NOT shared
 * across serverless instances. That's an accepted limitation for a
 * solo-operator site with no queue/DB — see AGENTS.md dependency list.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

// Hard cap so a distributed-IP flood can't grow this Map without bound.
const MAX_TRACKED_KEYS = 5000;

/**
 * Client IP used as the rate-limit key.
 *
 * Reads the FIRST X-Forwarded-For value. That value is client-influenced, so
 * a determined attacker can rotate it to mint fresh buckets: this limiter is
 * a speed bump, and the content-type + origin guard in request-guard.ts is
 * the real abuse control.
 *
 * Why not the last hop: the site sits behind Hostinger's CDN (Server: hcdn)
 * and the proxy chain has not been captured from production. If the last hop
 * is a CDN edge address, keying on it would put every visitor behind that
 * edge in one bucket and a single noisy client could 429 real leads. Switch
 * only after logging a real production X-Forwarded-For and confirming which
 * position carries the visitor address.
 */
export function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) {
    const first = fwd.split(",")[0]?.trim();
    if (first) return first;
  }
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  /** Seconds until the window resets; set when `allowed` is false. */
  retryAfterSec?: number;
};

/**
 * Fixed-window per-IP rate limit. Returns `allowed: false` once the caller
 * has made more than `limit` requests inside `windowMs` for the given
 * `keyPrefix` (lets different routes keep separate quotas for the same IP).
 */
export function checkRateLimit(
  req: Request,
  opts: { limit: number; windowMs: number; keyPrefix: string },
): RateLimitResult {
  try {
    const ip = getClientIp(req);
    const key = `${opts.keyPrefix}:${ip}`;
    const now = Date.now();
    const existing = buckets.get(key);

    if (!existing || existing.resetAt <= now) {
      if (buckets.size >= MAX_TRACKED_KEYS) {
        const oldestKey = buckets.keys().next().value;
        if (oldestKey) buckets.delete(oldestKey);
      }
      buckets.set(key, { count: 1, resetAt: now + opts.windowMs });
      return { allowed: true, remaining: opts.limit - 1 };
    }

    existing.count += 1;
    if (existing.count > opts.limit) {
      return {
        allowed: false,
        remaining: 0,
        retryAfterSec: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
      };
    }
    return { allowed: true, remaining: opts.limit - existing.count };
  } catch (err) {
    // Limiter itself broke — never let that eat a real lead.
    console.error("[rate-limit] check failed, failing open", err);
    return { allowed: true, remaining: -1 };
  }
}

/**
 * Read a request body as JSON with a hard byte cap, applied to the raw
 * text BEFORE JSON.parse — so an oversized payload never even reaches the
 * parser. Throws on oversize or invalid JSON; callers should catch and
 * return 400/413.
 */
export async function readCappedJson<T>(
  req: Request,
  maxBytes: number,
): Promise<T> {
  const text = await req.text();
  if (text.length > maxBytes) {
    throw new Error(`payload too large (${text.length} > ${maxBytes} bytes)`);
  }
  const parsed: unknown = JSON.parse(text);
  // A literal `null`, number, string or array parses fine and then crashes the
  // first property read in the route (`payload._honeypot` on null = 500). Only a
  // plain object is a payload; anything else is an invalid body, same as bad JSON.
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new Error("payload must be a JSON object");
  }
  return parsed as T;
}
