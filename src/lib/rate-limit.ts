// ============================================================
// In-memory per-IP fixed-window rate limiter.
//
// House pattern (see node_modules/next/dist/docs/01-app/02-guides/
// backend-for-frontend.md "Rate limiting"): public POST routes call
//   const { rateLimited } = await checkRateLimit(req, opts)
// and 429 when rateLimited is true.
//
// CAVEAT — single-instance only:
//   State lives in a module-level Map. It resets on every cold start /
//   redeploy and is NOT shared across instances. On the skynetjoe.com
//   Hostinger deploy (output: standalone, ONE Node process) this is an
//   acceptable basic abuse brake to stop a script spamming the GHL CRM /
//   burning Resend + Meta quota. It is NOT a distributed guarantee — if
//   this ever scales horizontally, swap the Map for a shared store
//   (Redis/Upstash) behind the same checkRateLimit() signature.
// ============================================================

export type RateLimitOptions = {
  /** Unique bucket key per route so routes don't share a window. */
  key: string;
  /** Max allowed requests per window per IP. Default 8. */
  limit?: number;
  /** Window length in milliseconds. Default 60_000 (60s). */
  windowMs?: number;
};

export type RateLimitResult = {
  /** True when the caller has exceeded the window and must be rejected. */
  rateLimited: boolean;
  /** Configured limit for this bucket. */
  limit: number;
  /** Requests remaining in the current window (0 when limited). */
  remaining: number;
  /** Seconds until the window resets — feed straight into Retry-After. */
  retryAfter: number;
};

const DEFAULT_LIMIT = 8;
const DEFAULT_WINDOW_MS = 60_000;

// Hard cap on distinct (bucket|ip) entries so a spray of spoofed IPs can't
// grow the Map unbounded and OOM the single Node process. When tripped we
// prune everything already expired; if still over, we clear the whole Map
// (worst case: one window of limiting is briefly reset — acceptable).
const MAX_ENTRIES = 10_000;

type Bucket = {
  /** Request count in the current window. */
  count: number;
  /** Epoch ms when the current window resets. */
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

/**
 * Resolve the client IP. Trusts the first hop of `x-forwarded-for`, then
 * falls back to headers the Hostinger CDN / proxy layer may set. Returns
 * "unknown" when nothing is present (all such callers share one bucket,
 * which is a safe over-restriction rather than a bypass).
 */
function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  return (
    req.headers.get("x-real-ip") ||
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-client-ip") ||
    "unknown"
  );
}

/** Drop expired entries; if still over the cap, clear the whole Map. */
function prune(now: number): void {
  for (const [k, b] of buckets) {
    if (b.resetAt <= now) buckets.delete(k);
  }
  if (buckets.size > MAX_ENTRIES) buckets.clear();
}

/**
 * Fixed-window per-IP check. Call BEFORE any validation/side effects.
 * Counts the current request; returns rateLimited=true once the window's
 * limit is exceeded.
 */
export function checkRateLimit(
  req: Request,
  opts: RateLimitOptions,
): RateLimitResult {
  const limit = opts.limit ?? DEFAULT_LIMIT;
  const windowMs = opts.windowMs ?? DEFAULT_WINDOW_MS;
  const now = Date.now();

  const ip = getClientIp(req);
  const mapKey = `${opts.key}|${ip}`;

  prune(now);

  let bucket = buckets.get(mapKey);
  if (!bucket || bucket.resetAt <= now) {
    bucket = { count: 0, resetAt: now + windowMs };
    buckets.set(mapKey, bucket);
  }

  bucket.count += 1;

  const retryAfter = Math.max(1, Math.ceil((bucket.resetAt - now) / 1000));

  if (bucket.count > limit) {
    return { rateLimited: true, limit, remaining: 0, retryAfter };
  }

  return {
    rateLimited: false,
    limit,
    remaining: Math.max(0, limit - bucket.count),
    retryAfter,
  };
}

/**
 * Build a standard 429 JSON response with Retry-After. Routes that already
 * import NextResponse can use this for a consistent shape.
 */
export function rateLimitedResponse(result: RateLimitResult): Response {
  return new Response(
    JSON.stringify({
      error: "Too many requests. Slow down and try again shortly.",
      retryAfter: result.retryAfter,
    }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": String(result.retryAfter),
        "X-RateLimit-Limit": String(result.limit),
        "X-RateLimit-Remaining": String(result.remaining),
      },
    },
  );
}
