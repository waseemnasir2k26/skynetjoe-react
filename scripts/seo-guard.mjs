#!/usr/bin/env node
/**
 * SEO guard — fails CI/build if an edit would silently disrupt SEO.
 *
 * Why this exists: content lives in code (git = CMS). That's SEO-stable, but
 * the failure mode is a careless edit that ships a page with no metadata, a
 * broken canonical, mojibake in a title, or a missing robots/sitemap. This
 * script asserts the invariants that protect rankings so the BUILD breaks
 * before Google ever sees the damage.
 *
 * Run: `npm run seo:check`  (also wire into prebuild / CI if desired)
 *
 * Checks (FAIL = non-zero exit):
 *   1. Mojibake — no double-encoded UTF-8 (â€, Ã—, â†) in src/ or content/.
 *   2. Metadata coverage — every public page.tsx exports `metadata` or
 *      `generateMetadata` (lab/noindex pages allowlisted).
 *   3. Required SEO files exist (robots.ts, sitemap.ts, llms.txt, ai.txt, og).
 * Checks (WARN only):
 *   4. `index: false` outside the allowlist (could be an accidental noindex).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fails = [];
const warns = [];

/** Recursively collect files under dir matching predicate. */
function walk(dir, pred, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === ".next") continue;
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, pred, out);
    else if (pred(full)) out.push(full);
  }
  return out;
}

const rel = (p) => path.relative(ROOT, p).replace(/\\/g, "/");

// ── 1. Mojibake regression guard ───────────────────────────────────────────
// Byte-level signatures of double-encoded UTF-8 that broke titles/SERP before.
const MOJIBAKE = [
  "â€",           // â€…  (em/en dash, curly quotes family)
  "â†",           // â†   (arrow family)
  "Ã—",           // Ã—   (multiply / mis-encoded latin)
  "â‰",           // â‰   (≤ ≥ family)
  "�",                 // replacement char
];
{
  const codeFiles = walk(path.join(ROOT, "src"), (f) => /\.(ts|tsx|mjs|css|scss)$/.test(f));
  const contentDir = path.join(ROOT, "content");
  const contentFiles = walk(contentDir, (f) => /\.(html|md|mdx|json)$/.test(f));
  for (const f of [...codeFiles, ...contentFiles]) {
    const txt = fs.readFileSync(f, "utf8");
    for (const sig of MOJIBAKE) {
      if (txt.includes(sig)) {
        fails.push(`MOJIBAKE in ${rel(f)} — re-save as clean UTF-8 (found bad byte sequence).`);
        break;
      }
    }
  }
}

// ── 2. Metadata coverage on public pages ─────────────────────────────────────
// Pages intentionally without public metadata (noindex labs etc.).
const META_ALLOWLIST = [/gradient-lab/, /hero-lab/];
{
  const pageFiles = walk(path.join(ROOT, "src", "app"), (f) => /[/\\]page\.tsx$/.test(f));
  for (const f of pageFiles) {
    const r = rel(f);
    if (r.includes("(payload)")) continue; // removed, but stay safe
    if (META_ALLOWLIST.some((re) => re.test(r))) continue;
    const txt = fs.readFileSync(f, "utf8");
    const hasMeta = /export\s+const\s+metadata\b/.test(txt) || /export\s+(async\s+)?function\s+generateMetadata\b/.test(txt) || /generateMetadata\s*[:=]/.test(txt);
    if (!hasMeta) fails.push(`NO METADATA in ${r} — public page must export metadata or generateMetadata.`);
  }
}

// ── 3. Required SEO files exist ──────────────────────────────────────────────
{
  const required = [
    "src/app/robots.ts",
    "src/app/sitemap.ts",
    "public/llms.txt",
    "public/ai.txt",
    "public/og-default.png",
  ];
  for (const r of required) {
    if (!fs.existsSync(path.join(ROOT, r))) fails.push(`MISSING required SEO file: ${r}`);
  }
}

// ── 4. Accidental noindex (warn) ─────────────────────────────────────────────
const NOINDEX_ALLOWLIST = [/gradient-lab/, /hero-lab/, /not-found/, /\bin\b.*\[state\]/];
{
  const pageFiles = walk(path.join(ROOT, "src", "app"), (f) => /\.tsx$/.test(f));
  for (const f of pageFiles) {
    const r = rel(f);
    if (NOINDEX_ALLOWLIST.some((re) => re.test(r))) continue;
    const txt = fs.readFileSync(f, "utf8");
    if (/index:\s*false/.test(txt)) warns.push(`index:false in ${r} — confirm this page SHOULD be noindex.`);
  }
}

// ── Report ───────────────────────────────────────────────────────────────────
for (const w of warns) console.warn("⚠ " + w);
if (fails.length) {
  console.error("\n✗ SEO guard FAILED — " + fails.length + " issue(s):");
  for (const x of fails) console.error("  ✗ " + x);
  console.error("\nFix the above before shipping — these disrupt search rankings.\n");
  process.exit(1);
}
console.log(`✓ SEO guard passed (${warns.length} warning(s)). Metadata, encoding, and SEO files intact.`);
