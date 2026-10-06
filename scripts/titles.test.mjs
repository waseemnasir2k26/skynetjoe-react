import fs from "node:fs";
import path from "node:path";
/**
 * titles.test.mjs — every title passed through pageTitle() must fit the 47-char
 * budget WITHOUT truncation (pageTitle() throws otherwise). Covers literal
 * pageTitle("...") calls plus the data-driven ones (blog posts, case studies,
 * industries, services, tool counts). Needs Node >= 22.6 type stripping:
 *
 *   npm run test:titles
 */
import { register } from "node:module";
register("./ts-loader-hooks.mjs", import.meta.url);
const R = process.env.REPO || path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\//, "")), "..");
const imp = (p) => import("file:///" + path.join(R, p).split(path.sep).join("/"));
const site = await imp("src/lib/site.ts");
const rows = [];
const add = (where, raw) => {
  const clean = raw.replace(/\s*[|·—–-]\s*SkynetLabs\s*$/i, "").trim();
  let out;
  try { out = site.pageTitle(raw); } catch (e) { out = "THROWS"; }
  rows.push({ where, raw: clean, out, cut: clean !== out, len: clean.length });
};
function walk(d, acc = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (/\.tsx?$/.test(e.name)) acc.push(p);
  }
  return acc;
}
for (const f of walk(path.join(R, "src"))) {
  const s = fs.readFileSync(f, "utf8");
  for (const m of s.matchAll(/pageTitle\(\s*"((?:[^"\\]|\\.)*)"/g))
    add(path.relative(R, f).split(path.sep).join("/"), m[1]);
}
try {
  const posts = await imp("src/lib/posts.ts");
    for (const p of posts.POSTS) add("blog/" + p.slug + (p.seoTitle ? " (seoTitle)" : " (title)"), p.seoTitle ?? p.title);
} catch (e) { console.error("posts:", e.message); process.exit(1); }
try {
  const cs = await imp("src/lib/case-studies.ts");
  const list = cs.CASE_STUDIES ?? cs.caseStudies ?? (cs.getAllCaseStudies ? cs.getAllCaseStudies() : []);
  for (const c of list) add("case-studies/" + c.slug, c.seoTitle ?? `${c.clientName} — ${c.industryTag} case study`);
} catch (e) { console.error("cs:", e.message); process.exit(1); }
try {
  const ind = await imp("src/data/industries.ts");
  for (const i of ind.INDUSTRIES ?? []) add("industries/" + i.slug, i.metaTitle);
} catch (e) { console.error("ind:", e.message); process.exit(1); }
try {
  for (const v of site.SERVICES) add("services/" + v.slug, v.seoTitle);
  const reg = await imp("src/data/tools-registry.ts");
  add("tools", `${reg.TOOLS_REGISTRY.length} Free Tools for Service Businesses`);
  const pl = await imp("src/data/prompts-library.ts");
  add("tools/prompt-library", `Free Prompt Library — ${pl.PROMPT_COUNT} Reusable AI Prompts`);
} catch (e) { console.error("misc:", e.message); process.exit(1); }
const bad = rows.filter((r) => r.cut);
console.log(`titles.test: ${rows.length} titles checked`);
if (bad.length) {
  console.error(`FAIL — ${bad.length} title(s) over budget:`);
  for (const r of bad) console.error(`  [${r.len}] ${r.where}: ${r.raw}`);
  process.exit(1);
}
console.log("PASS — no title needs truncation");
