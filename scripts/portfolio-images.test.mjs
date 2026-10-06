#!/usr/bin/env node
/**
 * portfolio-images.test.mjs — every /portfolio tile must have its screenshot.
 *
 * WorkShowcase renders `/portfolio/${slug}.jpg` for each WORK_BUILDS entry.
 * Fails if any referenced file is missing from public/portfolio/.
 * Reads work-builds.ts as text (extensionless TS imports don't load in Node).
 *
 *   node scripts/portfolio-images.test.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = fs.readFileSync(path.join(ROOT, "src/lib/work-builds.ts"), "utf8");
const slugs = [...src.matchAll(/^\s*slug:\s*"([^"]+)"/gm)].map((m) => m[1]);
if (slugs.length === 0) {
  console.error("FAIL — parsed zero slugs from work-builds.ts; the regex is stale.");
  process.exit(1);
}
const missing = slugs.filter(
  (s) => !fs.existsSync(path.join(ROOT, "public", "portfolio", `${s}.jpg`)),
);
console.log(`portfolio-images.test: ${slugs.length} entries checked`);
if (missing.length) {
  console.error("FAIL — missing /public/portfolio images:\n  " + missing.join("\n  "));
  process.exit(1);
}
console.log("PASS — every portfolio entry has its image");
