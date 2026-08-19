/**
 * fetch-page — shared, SSRF-hardened server-side fetch used by
 * /api/tool-proxy and, indirectly, by every URL-analysis tool built on it
 * (automation-readiness-scanner, tech-stack-xray, core-web-vitals-audit).
 *
 * This is the ONLY place in the codebase allowed to make an outbound
 * request to a user-supplied URL. Read this whole file before touching it —
 * it is security-sensitive.
 *
 * Threat model: a visitor pastes an arbitrary URL. Without guards this
 * becomes an SSRF gadget — an attacker could point it at
 * http://169.254.169.254 (cloud metadata), http://127.0.0.1:PORT (internal
 * services), or an internal 10.x/172.16-31.x/192.168.x host and use our
 * server as a proxy to reach it. Defenses implemented below:
 *
 *   1. Scheme allow-list: only http:// and https://.
 *   2. Hostname resolution BEFORE connecting: dns.lookup() every A/AAAA
 *      record for the hostname and reject if ANY resolved address is
 *      private/reserved/loopback/link-local/multicast (see isBlockedIp).
 *      This also blocks literal-IP URLs (http://127.0.0.1/..., decimal /
 *      hex IP tricks resolve through the same dns.lookup path).
 *   3. Redirects are followed MANUALLY (redirect: "manual"), capped at 3
 *      hops, and EVERY hop re-runs the full resolve+validate check before
 *      being followed — a same-origin site can't redirect us into a
 *      private network after the fact.
 *   4. Hard timeout (10s) via AbortController.
 *   5. Response body capped at 2MB — read as a stream and cut off, never
 *      buffered unbounded.
 *   6. Content-Type allow-list: text/html or text/plain (robots.txt) only.
 *      Anything else (binaries, octet-stream, etc.) is rejected without
 *      reading the body.
 *   7. Fixed outbound User-Agent so target sites can identify/block us if
 *      they want, and so we never impersonate a browser.
 *
 * Known residual risk (accepted, documented — not hidden): this uses the
 * platform `fetch` (undici), which re-resolves DNS itself at connect time.
 * Between our dns.lookup() check and undici's own connect, a malicious DNS
 * server could theoretically rebind the name to a different (private) IP
 * (classic DNS-rebinding TOCTOU). Full protection requires pinning the
 * validated IP at the TCP layer (a custom undici Agent `connect` override),
 * which needs the `undici` package as a direct dependency — not currently
 * installed in this repo. Given this tool has no secrets/session to leak
 * and every response is truncated + rendered as inert text (never
 * eval'd/proxied back as HTML), the residual risk is a best-effort
 * mitigation, not a hard guarantee. Flagged here for whoever revisits this.
 */

import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

export const FETCH_TIMEOUT_MS = 10_000;
export const MAX_BODY_BYTES = 2 * 1024 * 1024; // 2MB
export const MAX_REDIRECTS = 3;
export const TOOL_USER_AGENT =
  "SkynetJoeToolBot/1.0 (+https://skynetjoe.com/tools)";

const ALLOWED_CONTENT_TYPES = [
  "text/html",
  "text/plain",
  "application/xhtml+xml",
];

export type FetchPageResult =
  | {
      ok: true;
      finalUrl: string;
      status: number;
      html: string;
      truncated: boolean;
      headers: { contentType: string | null; server: string | null };
    }
  | { ok: false; error: string; status?: number };

/** IPv4 dotted-quad -> 32-bit unsigned int for CIDR range checks. */
function ipv4ToInt(ip: string): number | null {
  const parts = ip.split(".");
  if (parts.length !== 4) return null;
  let n = 0;
  for (const p of parts) {
    const v = Number(p);
    if (!Number.isInteger(v) || v < 0 || v > 255) return null;
    n = (n << 8) | v;
  }
  return n >>> 0;
}

function inCidr(ipInt: number, base: string, bits: number): boolean {
  const baseInt = ipv4ToInt(base);
  if (baseInt === null) return false;
  const mask = bits === 0 ? 0 : (~0 << (32 - bits)) >>> 0;
  return (ipInt & mask) === (baseInt & mask);
}

// Private, reserved, loopback, link-local, CGNAT, multicast, and
// documentation ranges. Includes 169.254.169.254 (cloud metadata) via the
// 169.254.0.0/16 link-local block.
const IPV4_BLOCKED_RANGES: Array<[string, number]> = [
  ["0.0.0.0", 8],
  ["10.0.0.0", 8],
  ["100.64.0.0", 10], // CGNAT
  ["127.0.0.0", 8], // loopback
  ["169.254.0.0", 16], // link-local incl. cloud metadata
  ["172.16.0.0", 12],
  ["192.0.0.0", 24],
  ["192.0.2.0", 24], // TEST-NET-1
  ["192.168.0.0", 16],
  ["198.18.0.0", 15], // benchmarking
  ["198.51.100.0", 24], // TEST-NET-2
  ["203.0.113.0", 24], // TEST-NET-3
  ["224.0.0.0", 4], // multicast
  ["240.0.0.0", 4], // reserved
];

function isBlockedIpv4(ip: string): boolean {
  const n = ipv4ToInt(ip);
  if (n === null) return true; // unparsable -> refuse, fail closed
  if (n === 0xffffffff) return true; // 255.255.255.255
  return IPV4_BLOCKED_RANGES.some(([base, bits]) => inCidr(n, base, bits));
}

function isBlockedIpv6(ip: string): boolean {
  const lower = ip.toLowerCase();
  if (lower === "::1" || lower === "::") return true; // loopback / unspecified
  if (
    lower.startsWith("fe8") ||
    lower.startsWith("fe9") ||
    lower.startsWith("fea") ||
    lower.startsWith("feb")
  ) {
    return true; // fe80::/10 link-local (fe80-febf)
  }
  if (lower.startsWith("fc") || lower.startsWith("fd")) return true; // fc00::/7 unique-local
  if (lower.startsWith("ff")) return true; // ff00::/8 multicast
  // IPv4-mapped IPv6 (::ffff:a.b.c.d) — unwrap and check the embedded v4.
  const mapped = lower.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (mapped) return isBlockedIpv4(mapped[1]);
  return false;
}

function isBlockedIp(ip: string): boolean {
  const family = isIP(ip);
  if (family === 4) return isBlockedIpv4(ip);
  if (family === 6) return isBlockedIpv6(ip);
  return true; // not a valid IP -> fail closed
}

export type UrlCheckResult =
  | { ok: true; url: URL }
  | { ok: false; error: string };

/**
 * Validate a candidate URL is safe to fetch: http(s) scheme only, resolves
 * to at least one address, and NONE of its resolved addresses are
 * private/reserved. Call this for the initial URL AND for every redirect
 * hop before following it.
 */
export async function assertPublicUrl(raw: string): Promise<UrlCheckResult> {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return { ok: false, error: "Not a valid URL." };
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return { ok: false, error: "Only http:// and https:// URLs are allowed." };
  }

  // Strip credentials if present (http://user:pass@host) — never forward.
  url.username = "";
  url.password = "";

  const hostname = url.hostname;
  if (!hostname) return { ok: false, error: "URL has no hostname." };
  if (hostname === "localhost" || hostname.endsWith(".localhost")) {
    return { ok: false, error: "Localhost targets are not allowed." };
  }

  let records: { address: string }[];
  try {
    records = await lookup(hostname, { all: true, verbatim: true });
  } catch {
    return { ok: false, error: "Could not resolve that hostname." };
  }

  if (records.length === 0) {
    return { ok: false, error: "Hostname resolved to no addresses." };
  }

  const blocked = records.find((r) => isBlockedIp(r.address));
  if (blocked) {
    return {
      ok: false,
      error:
        "That host resolves to a private/internal address and cannot be fetched.",
    };
  }

  return { ok: true, url };
}

/**
 * Fetch a page (or robots.txt) through the SSRF-guarded path: validate,
 * fetch with manual redirect handling (each hop re-validated), timeout,
 * size cap, content-type allow-list.
 */
export async function fetchPageSafely(
  rawUrl: string,
): Promise<FetchPageResult> {
  let current = rawUrl;
  let hops = 0;

  while (true) {
    const check = await assertPublicUrl(current);
    if (!check.ok) return { ok: false, error: check.error };

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    let res: Response;
    try {
      res = await fetch(check.url.toString(), {
        method: "GET",
        redirect: "manual",
        signal: controller.signal,
        headers: {
          "User-Agent": TOOL_USER_AGENT,
          Accept: "text/html,application/xhtml+xml,text/plain;q=0.8,*/*;q=0.1",
        },
      });
    } catch (err) {
      clearTimeout(timer);
      const aborted = err instanceof Error && err.name === "AbortError";
      return {
        ok: false,
        error: aborted
          ? "Request timed out after 10s."
          : "Could not reach that URL.",
      };
    }
    clearTimeout(timer);

    // Manual redirect handling — validate the NEW target before following.
    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get("location");
      if (!location)
        return { ok: false, error: "Redirect with no location header." };
      hops += 1;
      if (hops > MAX_REDIRECTS) {
        return { ok: false, error: `Too many redirects (>${MAX_REDIRECTS}).` };
      }
      try {
        current = new URL(location, check.url).toString();
      } catch {
        return { ok: false, error: "Redirect location is not a valid URL." };
      }
      continue; // loop: re-validate + fetch the new hop
    }

    const contentType = res.headers.get("content-type");
    const bareType = (contentType ?? "").split(";")[0].trim().toLowerCase();
    if (contentType && !ALLOWED_CONTENT_TYPES.includes(bareType)) {
      return {
        ok: false,
        error: `Unsupported content-type (${bareType || "unknown"}) — only HTML/text pages are analyzed.`,
        status: res.status,
      };
    }

    // Stream + cap at MAX_BODY_BYTES rather than buffering the whole body.
    const reader = res.body?.getReader();
    let html = "";
    let truncated = false;
    let bytes = 0;
    const decoder = new TextDecoder("utf-8", { fatal: false });

    if (reader) {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          bytes += value.byteLength;
          if (bytes > MAX_BODY_BYTES) {
            truncated = true;
            const remaining = MAX_BODY_BYTES - (bytes - value.byteLength);
            if (remaining > 0)
              html += decoder.decode(value.slice(0, remaining), {
                stream: true,
              });
            await reader.cancel().catch(() => {});
            break;
          }
          html += decoder.decode(value, { stream: true });
        }
      } catch {
        // Partial body on stream error is still useful — fall through with
        // whatever we accumulated.
      }
    } else {
      try {
        html = await res.text();
      } catch {
        html = "";
      }
    }

    return {
      ok: true,
      finalUrl: check.url.toString(),
      status: res.status,
      html,
      truncated,
      headers: {
        contentType,
        server: res.headers.get("server"),
      },
    };
  }
}
