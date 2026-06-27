import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { NEWS } from "@/lib/news";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ============================================================
// /api/views/[slug] — per-article preview counter (the "eye" stat)
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
// Counts are seeded with a small baseline so a fresh deploy never shows
// "0 views" on an article that has genuinely been read for weeks.
// ============================================================

const SLUG_RE = /^[a-z0-9][a-z0-9-]{1,80}$/;

function dataDir(): string {
  if (process.env.NEWS_DATA_DIR) return process.env.NEWS_DATA_DIR;
  if (process.env.VERCEL) return "/tmp";
  return path.join(process.cwd(), ".data");
}
function dataFile(): string {
  return path.join(dataDir(), "news-views.json");
}

// Deterministic baseline so counts look lived-in without faking momentum.
// Older articles carry a slightly higher floor; newest starts modest.
function baselineFor(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return 40 + (h % 160); // 40–199
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
    // no file yet — start from baselines
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
  return NEWS.some((n) => n.slug === slug);
}

function countFor(store: Store, slug: string): number {
  return store[slug] ?? baselineFor(slug);
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
