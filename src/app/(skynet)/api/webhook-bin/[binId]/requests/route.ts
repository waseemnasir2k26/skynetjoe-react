import { NextResponse } from "next/server";
import { getBin, isValidBinId } from "@/lib/tools/webhook-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ============================================================
// GET /api/webhook-bin/[binId]/requests — short-poll target for the viewer
// page. Returns the bin's captured requests, newest last. 404 once the bin
// has expired or was never created — the viewer treats that as "gone".
// ============================================================

export async function GET(
  _req: Request,
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

  const bin = getBin(binId);
  if (!bin) {
    return NextResponse.json(
      { ok: false, error: "bin not found or expired" },
      { status: 404, headers },
    );
  }

  return NextResponse.json(
    {
      ok: true,
      binId: bin.id,
      expiresAt: bin.expiresAt,
      requests: bin.requests,
    },
    { headers },
  );
}
