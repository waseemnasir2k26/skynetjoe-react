import { NextResponse } from "next/server";
import { upsertGhlContact } from "@/lib/ghl";

export const runtime = "nodejs";
// Debug-only endpoint — keep out of public docs and search.
export const dynamic = "force-dynamic";

// ============================================================
// /api/ghl-test — server-side smoke test for GHL env config.
//
// Hit this after deploying to confirm:
//   - GHL_API_TOKEN is set in the runtime env
//   - GHL_LOCATION_ID is set (or default is in play)
//   - The token has contacts.write scope and the contact actually upserts
//
// Returns: { ok, contactId, env: { tokenSet, locationSet } }
//
// NOT documented publicly. We send X-Robots-Tag: noindex anyway.
// ============================================================

export async function GET() {
  const tokenSet = Boolean(process.env.GHL_API_TOKEN);
  const locationSet = Boolean(process.env.GHL_LOCATION_ID);

  if (!tokenSet) {
    console.warn("[ghl-test] GHL_API_TOKEN missing");
  }
  if (!locationSet) {
    console.warn(
      "[ghl-test] GHL_LOCATION_ID missing — will use hardcoded default",
    );
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
      env: { tokenSet, locationSet },
    },
    {
      headers: {
        "X-Robots-Tag": "noindex, nofollow",
        "Cache-Control": "no-store",
      },
    },
  );
}
