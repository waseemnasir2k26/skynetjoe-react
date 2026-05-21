#!/usr/bin/env node
/**
 * sync-wp-templates.mjs
 *
 * Copies every file from `content/` into `public/wp-templates/` so that
 * Waseem can right-click → View Source → copy → paste into WordPress.
 *
 * Runs automatically before `next dev` and `next build` via the `predev`
 * and `prebuild` npm hooks. Safe to re-run. Idempotent. Creates the source
 * directory if missing so parallel agents that haven't shipped yet don't
 * break the pipeline.
 */
import { mkdir, cp, stat, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "content");
const DEST = path.join(ROOT, "public", "wp-templates");

async function ensureDir(dir) {
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
}

async function countFiles(dir) {
  if (!existsSync(dir)) return 0;
  let n = 0;
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) n += await countFiles(full);
    else if (e.isFile()) n += 1;
  }
  return n;
}

async function main() {
  await ensureDir(SRC);
  await ensureDir(DEST);

  // Use fs.cp with recursive + force to mirror src → dest. Overwrites.
  // We do NOT delete files in DEST that no longer exist in SRC, since the
  // README.html we ship lives in DEST and must survive.
  await cp(SRC, DEST, {
    recursive: true,
    force: true,
    errorOnExist: false,
    preserveTimestamps: true,
  });

  const n = await countFiles(SRC);
  const relSrc = path.relative(ROOT, SRC);
  const relDest = path.relative(ROOT, DEST);
  console.log(
    `[sync-wp-templates] ${n} file(s) mirrored: ${relSrc} → ${relDest}`,
  );
}

main().catch((err) => {
  console.error("[sync-wp-templates] FAILED:", err);
  process.exit(1);
});
