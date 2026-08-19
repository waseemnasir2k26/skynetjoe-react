import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { createBin } from "@/lib/tools/webhook-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ============================================================
// POST /api/webhook-bin/create — mint a new request-bin.
//
//   { ok: true, binId, captureUrl, expiresAt }
//
// binId is the only secret — 96 bits of entropy, unguessable. There is no
// auth; the URL itself is the access control. Rate-limited 5/min/IP so a
// script can't mass-mint bins. Noindex: nothing here should ever be crawled.
// ============================================================

function resolveOrigin(req: Request): string {
  const host = req.headers.get("host") || "skynetjoe.com";
  const forwardedProto = req.headers.get("x-forwarded-proto");
  const proto =
    forwardedProto ||
    (host.startsWith("localhost") || host.startsWith("127.0.0.1")
      ? "http"
      : "https");
  return `${proto}://${host}`;
}

export async function POST(req: Request) {
  const rl = checkRateLimit(req, {
    limit: 5,
    windowMs: 60_000,
    keyPrefix: "webhook-bin-create",
  });
  if (!rl.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many bins created. Try again in a minute." },
      {
        status: 429,
        headers: {
          "X-Robots-Tag": "noindex, nofollow",
          "Cache-Control": "no-store",
        },
      },
    );
  }

  const { bin } = createBin();
  const captureUrl = `${resolveOrigin(req)}/api/webhook-bin/c/${bin.id}`;

  return NextResponse.json(
    { ok: true, binId: bin.id, captureUrl, expiresAt: bin.expiresAt },
    {
      headers: {
        "X-Robots-Tag": "noindex, nofollow",
        "Cache-Control": "no-store",
      },
    },
  );
}
