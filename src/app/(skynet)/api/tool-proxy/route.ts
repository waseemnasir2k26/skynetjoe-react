import { NextResponse } from "next/server";
import { checkRateLimit, readCappedJson } from "@/lib/rate-limit";
import { fetchPageSafely } from "@/lib/tools/fetch-page";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ============================================================
// POST /api/tool-proxy — shared server-side fetch proxy behind every
// URL-analysis tool (automation-readiness-scanner, tech-stack-xray).
//
// Request:  { url: string }
// Response: { ok: true, finalUrl, status, html, truncated, headers } |
//           { ok: false, error }
//
// All the actual SSRF-hardening (scheme allow-list, DNS resolution +
// private-IP blocking, redirect re-validation, timeout, size cap,
// content-type allow-list) lives in src/lib/tools/fetch-page.ts — this
// route is intentionally thin: rate-limit, parse, delegate, respond.
// ============================================================

const MAX_BODY_BYTES = 4 * 1024; // request body itself is just a URL string

type Payload = { url?: unknown };

export async function POST(req: Request) {
  const rl = checkRateLimit(req, {
    limit: 10,
    windowMs: 60_000,
    keyPrefix: "tool-proxy",
  });
  if (!rl.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Try again in a minute." },
      { status: 429 },
    );
  }

  let payload: Payload;
  try {
    payload = await readCappedJson<Payload>(req, MAX_BODY_BYTES);
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const url = typeof payload.url === "string" ? payload.url.trim() : "";
  if (!url) {
    return NextResponse.json(
      { ok: false, error: "url is required." },
      { status: 400 },
    );
  }
  if (url.length > 2048) {
    return NextResponse.json(
      { ok: false, error: "URL too long." },
      { status: 400 },
    );
  }

  const result = await fetchPageSafely(url);
  if (!result.ok) {
    return NextResponse.json(result, { status: result.status ?? 422 });
  }

  return NextResponse.json(result);
}
