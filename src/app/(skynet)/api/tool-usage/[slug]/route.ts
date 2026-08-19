import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { TOOL_SLUGS } from "@/data/tools-registry";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ============================================================
// /api/tool-usage/[slug] — per-tool "people used this" counter
//
//   GET  → { slug, count }          read current count
//   POST → { slug, count }          increment by 1, then read
//
// Persistence: JSON file on disk + in-memory cache. Hostinger Node
// standalone wipes the deploy tree on redeploy, so point NEWS_DATA_DIR
// at a persistent path (e.g. /home/<user>/data) to keep counts across
// deploys. Falls back to .data/ locally and /tmp on Vercel. All disk
// failures are swallowed — the in-memory map is the live source of truth.
//
// Counts are REAL increments only — no seeding. The ToolUsage pill hides
// itself below a display threshold, so honest low counts never render.
// ============================================================

const SLUG_RE = /^[a-z0-9][a-z0-9-]{1,80}$/;

function dataDir(): string {
  if (process.env.NEWS_DATA_DIR) return process.env.NEWS_DATA_DIR;
  if (process.env.VERCEL) return "/tmp";
  return path.join(process.cwd(), ".data");
}
function dataFile(): string {
  return path.join(dataDir(), "tool-usage.json");
}

type Store = Record<string, number>;
let CACHE: Store | null = null;
let loaded = false;

async function load(): Promise<Store> {
  if (loaded && CACHE) return CACHE;
  const store: Store = {};
  try {
    const raw = await fs.readFile(dataFile(), "utf8");
    const parsed = JSON.parse(raw) as Store;
    for (const [k, v] of Object.entries(parsed)) {
      if (typeof v === "number" && Number.isFinite(v)) store[k] = Math.floor(v);
    }
  } catch {
    // no file yet — start from zero
  }
  CACHE = store;
  loaded = true;
  return store;
}

async function persist(store: Store): Promise<void> {
  try {
    await fs.mkdir(dataDir(), { recursive: true });
    await fs.writeFile(dataFile(), JSON.stringify(store), "utf8");
  } catch {
    // swallow — in-memory remains authoritative for this process
  }
}

function isKnownSlug(slug: string): boolean {
  return TOOL_SLUGS.includes(slug);
}

function countFor(store: Store, slug: string): number {
  return store[slug] ?? 0;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  if (!SLUG_RE.test(slug) || !isKnownSlug(slug)) {
    return NextResponse.json(
      { ok: false, error: "unknown slug" },
      { status: 404 },
    );
  }
  const store = await load();
  return NextResponse.json(
    { ok: true, slug, count: countFor(store, slug) },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  if (!SLUG_RE.test(slug) || !isKnownSlug(slug)) {
    return NextResponse.json(
      { ok: false, error: "unknown slug" },
      { status: 404 },
    );
  }
  const store = await load();
  const next = countFor(store, slug) + 1;
  store[slug] = next;
  void persist(store);
  return NextResponse.json(
    { ok: true, slug, count: next },
    { headers: { "Cache-Control": "no-store" } },
  );
}
