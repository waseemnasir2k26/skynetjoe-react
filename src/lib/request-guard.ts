/**
 * Shared guard for public JSON POST routes (/api/leads, /api/lead-capture,
 * /api/discovery). Returns a Response to send back when the request must be
 * refused, or null when it may proceed.
 *
 *  - 415 unless Content-Type is application/json (blocks form-encoded /
 *    text/plain "simple" cross-site POSTs that skip CORS preflight).
 *  - 403 if an Origin header is present and its host is not skynetjoe.com or
 *    www.skynetjoe.com (localhost allowed outside production).
 *  - 403 if Sec-Fetch-Site is present and is `cross-site`.
 *
 * Absent Origin (curl, server-to-server, some same-origin GETs) is allowed,
 * and so is the literal Origin "null" that some privacy modes send: the JSON
 * content-type rule already forces a CORS preflight on cross-site browser
 * posts, and losing a real lead costs more than admitting an opaque origin.
 * The aim is to stop browser-driven cross-site abuse, not to authenticate.
 * Every refusal is logged so a wrongly blocked visitor shows up in the logs.
 */
import { NextResponse } from "next/server";

const ALLOWED_HOSTS = new Set(["skynetjoe.com", "www.skynetjoe.com"]);
const DEV_HOSTS = new Set(["localhost", "127.0.0.1"]);

export function guardJsonPost(req: Request): Response | null {
  const ct = (req.headers.get("content-type") || "").toLowerCase();
  if (!/^application\/json\s*(;|$)/.test(ct)) {
    logRefusal(req, 415, `content-type=${ct || "(none)"}`);
    return NextResponse.json(
      { error: "Content-Type must be application/json" },
      { status: 415 },
    );
  }

  const origin = req.headers.get("origin");
  if (origin && origin !== "null") {
    let host = "";
    try {
      host = new URL(origin).hostname.toLowerCase();
    } catch {
      /* unparseable → refused below */
    }
    const dev = process.env.NODE_ENV !== "production" && DEV_HOSTS.has(host);
    // Same-origin by the request's own Host header: a production build reached
    // on a preview hostname, staging or a bare IP must not lose every lead form.
    // The browser sets Host and Origin itself, so matching them is a genuine
    // same-origin check, not an allowlist bypass.
    let originHost = "";
    try {
      originHost = new URL(origin).host.toLowerCase(); // host:port as the browser sent it
    } catch {
      /* unparseable → not same-origin */
    }
    const reqHost = (req.headers.get("host") || "").toLowerCase();
    const sameOrigin = reqHost !== "" && originHost === reqHost;
    if (!ALLOWED_HOSTS.has(host) && !dev && !sameOrigin) {
      logRefusal(req, 403, `origin=${origin}`);
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  if (req.headers.get("sec-fetch-site")?.toLowerCase() === "cross-site") {
    logRefusal(req, 403, "sec-fetch-site=cross-site");
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return null;
}

function logRefusal(req: Request, status: number, why: string) {
  let path = "";
  try {
    path = new URL(req.url).pathname;
  } catch {
    /* ignore */
  }
  console.warn(`[request-guard] ${status} ${path} ${why.slice(0, 200)}`);
}

/**
 * True only when the visitor accepted the advertising consent bar (cookie set
 * by MetaPixel.tsx) and sends neither Do-Not-Track nor Global Privacy
 * Control. Gates the server-side Meta Conversions API call, so declining the
 * bar stops the server-side send as well as the browser pixel.
 */
export function hasMetaConsent(req: Request): boolean {
  if (req.headers.get("dnt") === "1" || req.headers.get("sec-gpc") === "1") {
    return false;
  }
  const cookie = req.headers.get("cookie") || "";
  return /(?:^|;\s*)sj_meta_consent=granted(?:;|$)/.test(cookie);
}

/** 429 response with Retry-After. */
export function tooManyRequests(retryAfterSec?: number): Response {
  return NextResponse.json(
    { error: "Too many requests. Try again in a minute." },
    {
      status: 429,
      headers: { "Retry-After": String(retryAfterSec ?? 60) },
    },
  );
}
