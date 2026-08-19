import { randomBytes } from "node:crypto";

/**
 * webhook-store.ts — in-memory request-bin store for the Webhook Inspector
 * tool (/tools/webhook-inspector + /api/webhook-bin/**).
 *
 * State is a module-level Map — correct on a single long-lived Node process
 * (Hostinger Node standalone, same pattern as /api/presence and
 * /api/tool-usage). It is intentionally in-memory and ephemeral: bins do
 * NOT survive a process restart. That is stated honestly in the tool's UI —
 * do not build any illusion of durability on top of this.
 *
 * Hard caps (abuse + memory safety, not configurable at runtime):
 *   - MAX_REQUESTS_PER_BIN = 50   (oldest request evicted first)
 *   - MAX_BINS             = 500  (oldest-touched bin evicted, LRU)
 *   - MAX_BODY_BYTES       = 64KB (body truncated before storage)
 *   - MAX_TOTAL_BYTES      = ~10MB approx across all bins combined
 *   - BIN_TTL_MS           = 24h  (swept lazily on every store access)
 */

const BIN_TTL_MS = 24 * 60 * 60 * 1000;
const MAX_REQUESTS_PER_BIN = 50;
const MAX_BINS = 500;
const MAX_BODY_BYTES = 64 * 1024;
const MAX_TOTAL_BYTES = 10 * 1024 * 1024;
const BIN_ID_RE = /^[a-z0-9_-]{10,32}$/i;

export type CapturedRequest = {
  id: string;
  method: string;
  headers: Record<string, string>;
  query: Record<string, string>;
  bodyRaw: string;
  bodyPretty: string | null;
  bodyTruncated: boolean;
  contentType: string | null;
  sourceIp: string;
  receivedAt: number;
  approxBytes: number;
};

export type Bin = {
  id: string;
  createdAt: number;
  expiresAt: number;
  lastTouchedAt: number;
  requests: CapturedRequest[];
};

declare global {
  // eslint-disable-next-line no-var
  var __webhookBins: Map<string, Bin> | undefined;
  // eslint-disable-next-line no-var
  var __webhookBinsTotalBytes: number | undefined;
  // eslint-disable-next-line no-var
  var __webhookCaptureRate:
    | Map<string, { count: number; resetAt: number }>
    | undefined;
}

const bins: Map<string, Bin> = globalThis.__webhookBins ?? new Map();
globalThis.__webhookBins = bins;

let totalBytes: number = globalThis.__webhookBinsTotalBytes ?? 0;
function setTotalBytes(n: number) {
  totalBytes = n;
  globalThis.__webhookBinsTotalBytes = n;
}

const captureRate: Map<string, { count: number; resetAt: number }> =
  globalThis.__webhookCaptureRate ?? new Map();
globalThis.__webhookCaptureRate = captureRate;

/** Remove every expired bin, freeing its tracked byte total. Cheap — run on every access. */
function sweep(now: number) {
  for (const [id, bin] of bins) {
    if (bin.expiresAt <= now) {
      setTotalBytes(Math.max(0, totalBytes - binBytes(bin)));
      bins.delete(id);
    }
  }
}

function binBytes(bin: Bin): number {
  let n = 0;
  for (const r of bin.requests) n += r.approxBytes;
  return n;
}

/** Evict the least-recently-touched bin (Map preserves insertion order; we re-insert on touch). */
function evictOldestBin() {
  const oldestKey = bins.keys().next().value;
  if (!oldestKey) return;
  const oldest = bins.get(oldestKey);
  if (oldest) setTotalBytes(Math.max(0, totalBytes - binBytes(oldest)));
  bins.delete(oldestKey);
}

function touch(bin: Bin) {
  bins.delete(bin.id);
  bins.set(bin.id, bin);
}

export function isValidBinId(id: string): boolean {
  return BIN_ID_RE.test(id);
}

/** nanoid-style unguessable id: 16 URL-safe chars (~96 bits of entropy). */
function generateBinId(): string {
  return randomBytes(12).toString("base64url");
}

export function createBin(): { bin: Bin; isNew: true } {
  const now = Date.now();
  sweep(now);

  while (bins.size >= MAX_BINS) evictOldestBin();

  const id = generateBinId();
  const bin: Bin = {
    id,
    createdAt: now,
    expiresAt: now + BIN_TTL_MS,
    lastTouchedAt: now,
    requests: [],
  };
  bins.set(id, bin);
  return { bin, isNew: true };
}

export function getBin(binId: string): Bin | undefined {
  if (!isValidBinId(binId)) return undefined;
  sweep(Date.now());
  return bins.get(binId);
}

/** Per-bin capture rate: 60/min, independent of source IP (senders are external services). */
export function checkCaptureRate(binId: string): boolean {
  const now = Date.now();
  const existing = captureRate.get(binId);
  if (!existing || existing.resetAt <= now) {
    if (captureRate.size >= MAX_BINS * 2) {
      const oldestKey = captureRate.keys().next().value;
      if (oldestKey) captureRate.delete(oldestKey);
    }
    captureRate.set(binId, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  existing.count += 1;
  return existing.count <= 60;
}

const SECRET_HEADER_RE =
  /^(authorization|cookie|set-cookie|proxy-authorization|x-api-key|x-auth-token|x-access-token|api-key|x-secret|x-webhook-secret)$/i;

/** Redact secret-looking header values in place; keys are kept so shape is still visible. */
export function redactHeaders(raw: Headers): Record<string, string> {
  const out: Record<string, string> = {};
  raw.forEach((value, key) => {
    out[key] = SECRET_HEADER_RE.test(key) ? "[redacted]" : value;
  });
  return out;
}

/** Truncate an IPv4 address to its /24 (zero the last octet); anything else → "unknown". */
export function truncateIp(ip: string): string {
  const v4 = ip.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.\d{1,3}$/);
  if (v4) return `${v4[1]}.${v4[2]}.${v4[3]}.0/24`;
  return "unknown";
}

function prettyBody(raw: string): string | null {
  try {
    return JSON.stringify(JSON.parse(raw), null, 2);
  } catch {
    return null;
  }
}

export type CaptureInput = {
  method: string;
  headers: Headers;
  query: Record<string, string>;
  rawBody: string;
  contentType: string | null;
  sourceIp: string;
};

export type CaptureResult =
  | { ok: true; request: CapturedRequest }
  | { ok: false; reason: "not_found" | "rate_limited" };

export function captureRequest(
  binId: string,
  input: CaptureInput,
): CaptureResult {
  const bin = getBin(binId);
  if (!bin) return { ok: false, reason: "not_found" };
  if (!checkCaptureRate(binId)) return { ok: false, reason: "rate_limited" };

  const bodyTruncated = input.rawBody.length > MAX_BODY_BYTES;
  const bodyRaw = bodyTruncated
    ? input.rawBody.slice(0, MAX_BODY_BYTES)
    : input.rawBody;

  const request: CapturedRequest = {
    id: randomBytes(6).toString("base64url"),
    method: input.method.toUpperCase(),
    headers: redactHeaders(input.headers),
    query: input.query,
    bodyRaw,
    bodyPretty: bodyRaw ? prettyBody(bodyRaw) : null,
    bodyTruncated,
    contentType: input.contentType,
    sourceIp: truncateIp(input.sourceIp),
    receivedAt: Date.now(),
    approxBytes: 0,
  };
  request.approxBytes = JSON.stringify(request).length;

  bin.requests.push(request);
  while (bin.requests.length > MAX_REQUESTS_PER_BIN) {
    const evicted = bin.requests.shift();
    if (evicted) setTotalBytes(Math.max(0, totalBytes - evicted.approxBytes));
  }

  setTotalBytes(totalBytes + request.approxBytes);
  while (totalBytes > MAX_TOTAL_BYTES && bins.size > 0) {
    // Global memory ceiling — evict the oldest-touched bin entirely, even if
    // it's not this one. Rare in practice (500 bins x 50 requests x 64KB
    // would be far larger than 10MB, so per-bin/per-request caps do most of
    // the work; this is the last-resort backstop).
    evictOldestBin();
  }

  touch(bin);
  return { ok: true, request };
}

export function listRequests(binId: string): CapturedRequest[] | undefined {
  const bin = getBin(binId);
  return bin?.requests;
}

export const LIMITS = {
  MAX_REQUESTS_PER_BIN,
  MAX_BINS,
  MAX_BODY_BYTES,
  MAX_TOTAL_BYTES,
  BIN_TTL_MS,
};
