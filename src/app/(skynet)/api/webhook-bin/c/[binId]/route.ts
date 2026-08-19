import { NextResponse } from "next/server";
import { getClientIp } from "@/lib/rate-limit";
import { captureRequest, isValidBinId } from "@/lib/tools/webhook-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ============================================================
// ANY /api/webhook-bin/c/[binId] — the actual capture endpoint. Point any
// webhook here and the real request (method, headers, query, body) is
// stored against that bin for the viewer page to poll.
//
// Always responds 200 { ok: true } so the calling service (Stripe, GHL,
// n8n, whatever) never sees a delivery failure and doesn't retry/back off.
// The one exception is capture-rate 429 — still safe, senders just retry.
// ============================================================

const MAX_QUERY_ENTRIES = 50;

function queryToObject(url: URL): Record<string, string> {
  const out: Record<string, string> = {};
  let i = 0;
  for (const [k, v] of url.searchParams) {
    if (i++ >= MAX_QUERY_ENTRIES) break;
    out[k] = v;
  }
  return out;
}

async function handle(
  req: Request,
  { params }: { params: Promise<{ binId: string }> },
) {
  const { binId } = await params;
  const headers = {
    "X-Robots-Tag": "noindex, nofollow",
    "Cache-Control": "no-store",
  };

  if (!isValidBinId(binId)) {
    return NextResponse.json(
      { ok: false, error: "invalid bin id" },
      { status: 404, headers },
    );
  }

  const url = new URL(req.url);
  let rawBody = "";
  try {
    // Body-less methods (GET/HEAD) may still carry no body — .text() is safe on all.
    rawBody = await req.text();
  } catch {
    rawBody = "";
  }

  const result = captureRequest(binId, {
    method: req.method,
    headers: req.headers,
    query: queryToObject(url),
    rawBody,
    contentType: req.headers.get("content-type"),
    sourceIp: getClientIp(req),
  });

  if (!result.ok && result.reason === "not_found") {
    return NextResponse.json(
      { ok: false, error: "bin not found or expired" },
      { status: 404, headers },
    );
  }

  // Rate-limited or captured — both are a safe 200 so senders don't retry-storm.
  return NextResponse.json({ ok: true }, { status: 200, headers });
}

export const GET = handle;
export const POST = handle;
export const PUT = handle;
export const PATCH = handle;
export const DELETE = handle;
export const OPTIONS = handle;
export async function HEAD(
  req: Request,
  ctx: { params: Promise<{ binId: string }> },
) {
  await handle(req, ctx);
  return new NextResponse(null, {
    status: 200,
    headers: {
      "X-Robots-Tag": "noindex, nofollow",
      "Cache-Control": "no-store",
    },
  });
}
