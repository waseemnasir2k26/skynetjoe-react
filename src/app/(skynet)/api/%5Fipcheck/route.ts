import { createHash, timingSafeEqual } from "node:crypto";
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
    headers: {
      "X-Robots-Tag": "noindex, nofollow",
      "Cache-Control": "no-store",
    },
  });
}

// SHA-256 of a one-off verification token (the token itself is never
// committed). Lets the post-deploy check run without touching Hostinger env,
// whose MCP API replaces every variable at once. Remove after verification.
const TOKEN_SHA256 =
  "34476828d75ea3a713611f1bed6d47a11cbee2fdafc8a83defc7b601f7ce7161";

function tokenOk(token: string): boolean {
  const secret = process.env.IPCHECK_TOKEN;
  if (secret && safeEqual(token, secret)) return true;
  return safeEqual(
    createHash("sha256").update(token).digest("hex"),
    TOKEN_SHA256,
  );
}

export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("token");
  if (!token || !tokenOk(token)) return notFound();

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
    {
      headers: {
        "Cache-Control": "no-store",
        "X-Robots-Tag": "noindex, nofollow",
      },
    },
  );
}
