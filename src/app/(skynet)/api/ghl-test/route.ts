import { NextResponse } from "next/server";
import { upsertGhlContact } from "@/lib/ghl";

export const runtime = "nodejs";
// Debug-only endpoint — keep out of public docs and search.
export const dynamic = "force-dynamic";

// ============================================================
// /api/ghl-test — server-side smoke test for GHL env config.
//
// Hit this after deploying to confirm the GHL token has contacts.write
// scope and a contact actually upserts.
//
// GATED: requires header `x-debug-key` to exactly match the DEBUG_KEY env.
// Without a matching key the route 404s (indistinguishable from "no route"),
// so it can't be used as an unauthenticated live-write or env-probe surface.
// If DEBUG_KEY is unset the route is effectively disabled (always 404).
//
// Returns: { ok, contactId, isNew }  — no env state is leaked.
// NOT documented publicly. We send X-Robots-Tag: noindex anyway.
// ============================================================

export async function GET(req: Request) {
  const debugKey = process.env.DEBUG_KEY;
  const provided = req.headers.get("x-debug-key");
  // 404 (not 401/403) so the endpoint's existence isn't disclosed.
  if (!debugKey || provided !== debugKey) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const result = await upsertGhlContact(
    {
      email: "test+vercel-ci@skynetjoe.com",
      firstName: "Vercel",
      lastName: "Smoke",
      source: "vercel-smoke-test",
    },
    null,
    ["vercel-smoke-test"],
  );

  return NextResponse.json(
    {
      ok: result.contactId !== "dev-skip",
      contactId: result.contactId,
      isNew: result.isNew,
    },
    {
      headers: {
        "X-Robots-Tag": "noindex, nofollow",
        "Cache-Control": "no-store",
      },
    },
  );
}
