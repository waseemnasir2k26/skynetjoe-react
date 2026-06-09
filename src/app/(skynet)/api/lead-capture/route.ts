import { NextResponse } from "next/server";
import { upsertGhlContact } from "@/lib/ghl";
import { checkRateLimit, rateLimitedResponse } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ============================================================
// /api/lead-capture — tool-gate email capture endpoint.
//
// POST shape:
//   { email: string, source: string, capturedAt: string }
//
// Behavior:
//   - Server-side email regex validation. Reject 400 if invalid.
//   - If GHL env (GHL_API_TOKEN) is set, upsert contact tagged with
//     [source, "tool-lead"] via the shared upsertGhlContact helper.
//   - If GHL is NOT configured, log to console and still return 200
//     so the client-side unlock proceeds.
//   - All GHL errors are swallowed inside upsertGhlContact (devSkip) —
//     this route never 500s on backend failure. User experience first.
// ============================================================

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Payload = {
  email?: string;
  source?: string;
  capturedAt?: string;
};

function isValidEmail(s: string | undefined): s is string {
  if (!s || typeof s !== "string") return false;
  if (s.length > 254) return false;
  return EMAIL_RE.test(s);
}

export async function POST(req: Request) {
  const rl = checkRateLimit(req, {
    key: "lead-capture",
    limit: 8,
    windowMs: 60_000,
  });
  if (rl.rateLimited) return rateLimitedResponse(rl);

  let payload: Payload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = payload.email?.trim();
  const source = payload.source?.trim() || "unknown-tool";
  const capturedAt = payload.capturedAt || new Date().toISOString();

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  if (!process.env.GHL_API_TOKEN) {
    console.log("[lead-capture] GHL not configured, logging only", {
      email,
      source,
      capturedAt,
    });
    return NextResponse.json({ ok: true, queued: true });
  }

  // Best-effort GHL upsert — helper already wraps fetch in try/catch and
  // returns dev-skip on failure. We never throw out of this route.
  try {
    const result = await upsertGhlContact(
      {
        email,
        source: `tool-gate:${source}`,
      },
      null,
      [source, "tool-lead"],
    );

    return NextResponse.json({
      ok: true,
      contactId: result.contactId,
      isNew: result.isNew,
    });
  } catch (err) {
    console.log("[lead-capture] GHL upsert threw (swallowed)", err);
    return NextResponse.json({ ok: true, queued: true });
  }
}
