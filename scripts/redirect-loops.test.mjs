#!/usr/bin/env node
/**
 * redirect-loops.test.mjs — guards next.config.ts against self-redirect loops.
 *
 * Shipped 2026-10-01: `/portfolio/:slug*` -> `/portfolio`. Next's `*` modifier
 * matches ZERO-or-more segments, so the rule matched `/portfolio` itself and
 * every request to it 308'd to itself — an infinite loop, caught live at 50
 * hops. `redirects.test.mjs` never saw it: that suite only reads
 * src/lib/simplify-redirects.ts, not next.config.ts.
 *
 * Asserts, for every literal redirect declared in next.config.ts: the
 * destination must NOT itself match the source pattern.
 *
 * Reads the file as text rather than importing it — next.config.ts imports
 * "./src/lib/simplify-redirects" extensionless, which plain Node ESM cannot
 * resolve. Consequence: only literal `source:`/`destination:` pairs are
 * covered, not the programmatically generated arrays (those map a kept slug
 * to a different kept path, so they cannot self-match).
 *
 *   node scripts/redirect-loops.test.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = fs.readFileSync(path.join(ROOT, "next.config.ts"), "utf8");

// Pairs written as `source: "...", destination: "..."` in either order.
const pairs = [];
const FORWARD = /source:\s*"([^"]+)"\s*,\s*(?:\n\s*)?destination:\s*"([^"]+)"/g;
const REVERSE = /destination:\s*"([^"]+)"\s*,\s*(?:\n\s*)?source:\s*"([^"]+)"/g;
for (const m of src.matchAll(FORWARD)) pairs.push({ source: m[1], destination: m[2] });
for (const m of src.matchAll(REVERSE)) pairs.push({ source: m[2], destination: m[1] });

if (pairs.length === 0) {
  console.error("FAIL — parsed zero redirect pairs from next.config.ts; the regex is stale.");
  process.exit(1);
}

const ESCAPE_RE = /[.*+?^${}()|[\]\\]/g;

/** Next path-to-regexp subset -> RegExp. `:p*` is zero+, `:p+`/`:p` are one+. */
function toRegExp(source) {
  let re = "";
  for (const seg of source.split("/").filter(Boolean)) {
    const custom = seg.match(/^:[A-Za-z0-9_]+\((.+)\)$/);
    if (custom) {
      re += "/(?:" + custom[1] + ")"; // `:p(regex)` — custom pattern, may span "/"
    } else if (/^:[A-Za-z0-9_]+\*$/.test(seg)) {
      re += "(?:/[^/]+)*"; // zero or more — the trap
    } else if (/^:[A-Za-z0-9_]+\+$/.test(seg)) {
      re += "(?:/[^/]+)+"; // one or more
    } else if (/^:[A-Za-z0-9_]+$/.test(seg)) {
      re += "/[^/]+"; // exactly one
    } else {
      re += "/" + seg.replace(ESCAPE_RE, "\\$&");
    }
  }
  return new RegExp("^" + (re || "/") + "/?$");
}

const loops = [];
for (const r of pairs) {
  if (/^https?:\/\//.test(r.destination)) continue; // external target, cannot loop
  if (r.destination.includes(":")) continue; // param-substituted, out of scope
  if (toRegExp(r.source).test(r.destination)) {
    loops.push(r.source + "  ->  " + r.destination);
  }
}

console.log(`redirect-loops.test: ${pairs.length} literal rules checked`);
if (loops.length) {
  console.error(`\nFAIL — ${loops.length} rule(s) redirect to a path they also match:\n`);
  for (const l of loops) console.error("  " + l);
  console.error("\nA `:param*` source matches zero segments — use `:param+` instead.\n");
  process.exit(1);
}
console.log("PASS — no self-redirect loops");

// Redirects run BEFORE public/ files are served. A source that matches a real
// static file silently breaks it (2026-10-16: `/portfolio/:slug+` swallowed
// every /portfolio/*.jpg screenshot). No rule may match any file in public/.
const PUBLIC = path.join(ROOT, "public");
const files = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full);
    else files.push("/" + path.relative(PUBLIC, full).split(path.sep).join("/"));
  }
})(PUBLIC);
const shadowed = [];
for (const r of pairs) {
  const re = toRegExp(r.source);
  for (const f of files) if (re.test(f)) shadowed.push(`${r.source}  swallows  ${f}`);
}
console.log(`redirect-loops.test: ${files.length} public/ files checked against redirect sources`);
if (shadowed.length) {
  console.error(`
FAIL — ${shadowed.length} public file(s) shadowed by a redirect:
`);
  for (const s of shadowed.slice(0, 20)) console.error("  " + s);
  process.exit(1);
}
console.log("PASS — no redirect shadows a public/ file");
