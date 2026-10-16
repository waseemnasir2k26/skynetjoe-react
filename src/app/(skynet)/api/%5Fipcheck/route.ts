import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { getClientIp, IP_HEADER_NAMES, maskIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
// Per-request diagnostics; must never be cached.
export const dynamic = "force-dynamic";

// ============================================================
// GET /api/_ipcheck?token=<IPCHECK_TOKEN>
//
// Hidden diagnostics to verify, after a deploy, which IP the rate limiter
// keys on behind Hostinger's CDN. The folder is named %5Fipcheck because a
// literal "_" prefix makes an App Router folder private (not routable).
//
// 404 if IPCHECK_TOKEN is unset or the token does not match (so the route is
// indistinguishable from a missing one). Returns ONLY the names of IP-related
// headers present and the chosen IP masked to /24 (IPv4) or /48 (IPv6).
// ============================================================

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

function notFound() {
  return new NextResponse("Not Found", {
    status: 404,
    headers: { "X-Robots-Tag": "noindex, nofollow", "Cache-Control": "no-store" },
  });
}

export async function GET(req: Request) {
  const secret = process.env.IPCHECK_TOKEN;
  const token = new URL(req.url).searchParams.get("token");
  if (!secret || !token || !safeEqual(token, secret)) return notFound();

  const present = IP_HEADER_NAMES.filter((h) => req.headers.has(h));
  // Count of X-Forwarded-For entries tells whether the edge appends to it.
  const xff = req.headers.get("x-forwarded-for");
  return NextResponse.json(
    {
      headersPresent: present,
      xffEntryCount: xff ? xff.split(",").length : 0,
      chosenIpMasked: maskIp(getClientIp(req)),
      clientIpHeaderEnv: process.env.CLIENT_IP_HEADER ? "set" : "unset",
    },
    { headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" } },
  );
}
