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
 * Absent Origin (curl, server-to-server, some same-origin GETs) is allowed:
 * the aim is to stop browser-driven cross-site abuse, not to authenticate.
 */
import { NextResponse } from "next/server";

const ALLOWED_HOSTS = new Set(["skynetjoe.com", "www.skynetjoe.com"]);
const DEV_HOSTS = new Set(["localhost", "127.0.0.1"]);

export function guardJsonPost(req: Request): Response | null {
  const ct = (req.headers.get("content-type") || "").toLowerCase();
  if (!/^application\/json\s*(;|$)/.test(ct)) {
    return NextResponse.json(
      { error: "Content-Type must be application/json" },
      { status: 415 },
    );
  }

  const origin = req.headers.get("origin");
  if (origin) {
    let host = "";
    try {
      host = new URL(origin).hostname.toLowerCase();
    } catch {
      /* unparseable (e.g. "null") → refused below */
    }
    const dev = process.env.NODE_ENV !== "production" && DEV_HOSTS.has(host);
    if (!ALLOWED_HOSTS.has(host) && !dev) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  if (req.headers.get("sec-fetch-site")?.toLowerCase() === "cross-site") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return null;
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
