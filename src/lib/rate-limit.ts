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

import { isIP } from "node:net";

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

// Hard cap so a distributed-IP flood can't grow this Map without bound.
const MAX_TRACKED_KEYS = 5000;

// Shared "unknown IP" bucket gets this multiple of the per-IP limit.
const GLOBAL_BUCKET_FACTOR = 20;

/** Sentinel returned when no usable client IP can be derived. */
export const UNKNOWN_IP = "unknown";

/** IP-related request headers we look at (also reported by /api/_ipcheck). */
export const IP_HEADER_NAMES = [
  "x-forwarded-for",
  "x-real-ip",
  "cf-connecting-ip",
  "true-client-ip",
  "x-client-ip",
  "forwarded",
  "x-hcdn-request-id",
] as const;

function validIp(raw: string | null | undefined): string | null {
  if (!raw) return null;
  let v = raw.trim();
  // strip IPv4 port ("1.2.3.4:5678") and IPv6 brackets ("[::1]:80")
  if (/^\d+\.\d+\.\d+\.\d+:\d+$/.test(v)) v = v.slice(0, v.lastIndexOf(":"));
  const br = v.match(/^\[([^\]]+)\](?::\d+)?$/);
  if (br) v = br[1];
  return isIP(v) ? v.toLowerCase() : null;
}

/**
 * Client IP used as the rate-limit key. X-Forwarded-For is a list that every
 * proxy APPENDS to, so the LEFTMOST entry is whatever the client typed and
 * can be forged; the RIGHTMOST entry is the one written by the nearest
 * proxy (Hostinger's edge). Order:
 *   1. env CLIENT_IP_HEADER (optional) — a header name the edge sets and
 *      overwrites (e.g. a CDN "connecting IP" header), if verified in prod.
 *   2. rightmost valid X-Forwarded-For entry.
 *   3. X-Real-IP, only when there is no X-Forwarded-For at all.
 * Returns UNKNOWN_IP if nothing valid; rate limiting then uses a shared
 * per-route bucket (see checkRateLimit) rather than blocking anyone.
 */
export function getClientIp(req: Request): string {
  const custom = process.env.CLIENT_IP_HEADER?.trim().toLowerCase();
  if (custom) {
    const ip = validIp(req.headers.get(custom));
    if (ip) return ip;
  }
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) {
    const parts = fwd.split(",");
    for (let i = parts.length - 1; i >= 0; i--) {
      const ip = validIp(parts[i]);
      if (ip) return ip;
    }
    return UNKNOWN_IP;
  }
  return validIp(req.headers.get("x-real-ip")) ?? UNKNOWN_IP;
}

/** Same as getClientIp but undefined when unknown (for third-party payloads). */
export function getClientIpOrUndefined(req: Request): string | undefined {
  const ip = getClientIp(req);
  return ip === UNKNOWN_IP ? undefined : ip;
}

/** Mask to /24 (IPv4) or /48 (IPv6) for safe diagnostics output. */
export function maskIp(ip: string): string {
  if (ip === UNKNOWN_IP) return ip;
  if (isIP(ip) === 4) return ip.split(".").slice(0, 3).join(".") + ".0/24";
  return ip.split(":").slice(0, 3).join(":") + "::/48";
}

export type RateLimitResult = { allowed: boolean; remaining: number };

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
    // No usable IP: share one generous per-route bucket instead of
    // blocking everyone behind the "unknown" key at the normal quota.
    const limit = ip === UNKNOWN_IP ? opts.limit * GLOBAL_BUCKET_FACTOR : opts.limit;
    const key = `${opts.keyPrefix}:${ip}`;
    const now = Date.now();
    const existing = buckets.get(key);

    if (!existing || existing.resetAt <= now) {
      if (buckets.size >= MAX_TRACKED_KEYS) {
        const oldestKey = buckets.keys().next().value;
        if (oldestKey) buckets.delete(oldestKey);
      }
      buckets.set(key, { count: 1, resetAt: now + opts.windowMs });
      return { allowed: true, remaining: limit - 1 };
    }

    existing.count += 1;
    if (existing.count > limit) {
      return { allowed: false, remaining: 0 };
    }
    return { allowed: true, remaining: limit - existing.count };
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
  // Reject on the declared length first so an oversized body is never
  // buffered; the post-read check still catches a missing/lying header.
  const declared = Number(req.headers.get("content-length") || 0);
  if (declared > maxBytes) {
    throw new Error(`payload too large (${declared} > ${maxBytes} bytes)`);
  }
  const text = await req.text();
  if (text.length > maxBytes) {
    throw new Error(`payload too large (${text.length} > ${maxBytes} bytes)`);
  }
  return JSON.parse(text) as T;
}
