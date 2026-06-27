import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ============================================================
// /api/presence — live concurrent-visitor heartbeat
//
//   POST { id }  → record a heartbeat for this session, return { live }
//   GET          → return current { live } without recording
//
// "live" = number of distinct sessions seen within WINDOW_MS. The browser
// widget heartbeats every ~10s; a session expires 30s after its last beat.
//
// State is a module-level Map — correct on a single long-lived Node process
// (Hostinger Node standalone, `output: "standalone"`). It is intentionally
// in-memory: live presence is ephemeral by nature and resets on restart.
// ============================================================

const WINDOW_MS = 30_000;
const MAX_SESSIONS = 5000; // hard cap so a flood can't grow the map unbounded

declare global {
  // eslint-disable-next-line no-var
  var __presence: Map<string, number> | undefined;
}

const sessions: Map<string, number> = globalThis.__presence ?? new Map();
globalThis.__presence = sessions;

function prune(now: number) {
  for (const [id, ts] of sessions) {
    if (now - ts > WINDOW_MS) sessions.delete(id);
  }
}

function liveCount(now: number): number {
  let n = 0;
  for (const ts of sessions.values()) if (now - ts <= WINDOW_MS) n++;
  return n;
}

export async function GET() {
  const now = Date.now();
  prune(now);
  return NextResponse.json(
    { ok: true, live: liveCount(now) },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(req: Request) {
  const now = Date.now();
  let id = "";
  let leave = false;
  try {
    const body = (await req.json()) as { id?: unknown; leave?: unknown };
    if (typeof body.id === "string" && body.id.length <= 64) id = body.id;
    leave = body.leave === true;
  } catch {
    /* tolerate empty/invalid body */
  }
  if (!id) {
    prune(now);
    return NextResponse.json(
      { ok: false, live: liveCount(now) },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  if (leave) {
    sessions.delete(id);
  } else {
    if (!sessions.has(id) && sessions.size >= MAX_SESSIONS) prune(now);
    sessions.set(id, now);
  }
  prune(now);

  return NextResponse.json(
    { ok: true, live: liveCount(now) },
    { headers: { "Cache-Control": "no-store" } },
  );
}
