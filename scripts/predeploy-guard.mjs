#!/usr/bin/env node
// predeploy-guard.mjs — run BEFORE every skynetjoe.com deploy. Exit 1 = do not deploy.
//
// Why: 2026-10-29 a deploy shipped from a branch line that never merged
// feat/digital-products-2026-10-16 or audit-fixes-2026-10-07, so the live site
// lost Digital Products + /aiportfolio. Every deploy must build ON TOP of what
// is live, never beside it.
//
// Checks:
//   1. Clean tree (only tracked, committed code gets archived).
//   2. HEAD contains the `live/skynetjoe.com` tag (= last commit that went live).
//   3. Every route in scripts/must-have-routes.txt still has a page in src/app.
//   4. No /aiportfolio-style regression: a must-have route is not also a redirect source.
//
// After a deploy is verified live:  node scripts/predeploy-guard.mjs --mark-live
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const TAG = "live/skynetjoe.com";
const sh = (c) => execSync(c, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
const root = sh("git rev-parse --show-toplevel");
process.chdir(root);

if (process.argv.includes("--mark-live")) {
  if (sh("git status --porcelain --untracked-files=no")) { console.error("--mark-live refused: uncommitted changes"); process.exit(1); }
  try { sh(`git merge-base --is-ancestor ${TAG} HEAD`); }
  catch (e) { if (sh(`git tag -l ${TAG}`)) { console.error(`--mark-live refused: HEAD does not contain current ${TAG} (would move it backwards)`); process.exit(1); } }
  sh(`git tag -f ${TAG} HEAD`);
  try { sh(`git push -f origin refs/tags/${TAG}`); } catch { console.warn("tag set locally; push failed (push it by hand)"); }
  console.log(`${TAG} -> ${sh("git rev-parse --short HEAD")}`);
  process.exit(0);
}

const fail = [];
const dirty = sh("git status --porcelain --untracked-files=no");
if (dirty && !process.env.GUARD_TEST_ALLOW_DIRTY) fail.push(`uncommitted tracked changes:\n${dirty}`);

try { sh("git fetch -q origin --tags"); } catch {}
let live = "";
try { live = sh(`git rev-parse ${TAG}`); } catch { fail.push(`tag ${TAG} missing — set it on the commit that is live now`); }
if (live) {
  try { sh(`git merge-base --is-ancestor ${live} HEAD`); }
  catch {
    const lost = sh(`git log --format="  %h %s" HEAD..${live}`).split("\n").slice(0, 15).join("\n");
    fail.push(`HEAD does not contain live (${live.slice(0, 7)}). Deploying would DROP:\n${lost}\n  -> merge ${TAG} into this branch first`);
  }
}

const routes = fs.readFileSync(path.join("scripts", "must-have-routes.txt"), "utf8")
  .split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !l.startsWith("#"));
const pages = sh('git ls-files "src/app"').split("\n").filter((f) => /\/page\.(tsx|ts|jsx|js|mdx)$/.test(f));
// Redirect sources live in next.config.ts AND in src/lib/*redirect* helpers (r("/x","/y")).
const cfg = [
  fs.readFileSync("next.config.ts", "utf8"),
  ...sh('git ls-files "src/lib"').split("\n").filter((f) => /redirect/i.test(f)).map((f) => fs.readFileSync(f, "utf8")),
].join("\n");
for (const r of routes) {
  const hit = pages.some((f) => (f.replace(/\([^)]*\)\//g, "").replace(/^src\/app/, "").replace(/\/page\.\w+$/, "") || "/") === r);
  if (!hit) fail.push(`must-have route ${r} has no page`);
  const esc = r.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
  const asSource = new RegExp(`(?:source:\\s*|\\br\\(\\s*)["'\`]${esc}(?:["'\`]|/:\\w+[*?]["'\`])`); // exact, or /:x* /:x? (zero segments = the route itself)
  if (asSource.test(cfg)) fail.push(`must-have route ${r} is a redirect source (next.config.ts / src/lib redirects)`);
}

// 5. --smoke (needs a fresh `npm run build`): start the built app, load every
//    must-have route, and request every same-site src/href it references.
//    2026-10-30: the /aiportfolio port shipped without public/aiportfolio/thumbs
//    -> 99 broken tiles; only a served-page check catches template-built paths.
if (process.argv.includes("--smoke") && !fail.length) {
  const { spawn } = await import("node:child_process");
  const net = await import("node:net");
  const PORT = await new Promise((res, rej) => {
    const t = net.createServer().once("error", rej).listen(0, "127.0.0.1", () => { const p = t.address().port; t.close(() => res(p)); });
  });
  const base = `http://localhost:${PORT}`;
  const srv = spawn(process.execPath, [path.join("node_modules", "next", "dist", "bin", "next"), "start", "-p", String(PORT)], { stdio: "ignore" });
  try {
    let up = false;
    for (let i = 0; i < 60 && !up; i++) {
      try { up = (await fetch(base + "/")).ok; } catch { await new Promise((r) => setTimeout(r, 1000)); }
    }
    if (!up) throw new Error("built app did not start (run npm run build first)");
    const assets = new Set();
    for (const r of routes) {
      const res = await fetch(base + r, { redirect: "manual" });
      if (res.status !== 200) { fail.push(`smoke: ${r} -> ${res.status}`); continue; }
      const html = await res.text();
      for (const m of html.matchAll(/(?:src|href|srcSet|srcset|poster)="(\/[^"#?\s]*)/g)) {
        if (!m[1].startsWith("/_next/") && !m[1].startsWith("//")) assets.add(m[1]);
      }
    }
    const broken = [];
    const list = [...assets];
    for (let i = 0; i < list.length; i += 16) {
      await Promise.all(list.slice(i, i + 16).map(async (u) => {
        const res = await fetch(base + u, { method: "GET", redirect: "follow" });
        if (res.status >= 400) broken.push(`${res.status} ${u}`);
        await res.arrayBuffer();
      }));
    }
    if (!list.length) fail.push("smoke: 0 same-site links/assets found — wrong server answered or pages empty");
    if (broken.length) fail.push(`smoke: ${broken.length} broken same-site link(s)/asset(s):\n    ` + broken.slice(0, 15).join("\n    "));
    else console.log(`smoke: ${routes.length} routes 200, ${list.length} same-site links/assets OK`);
  } catch (e) {
    fail.push(`smoke: ${e.message}`);
  } finally {
    srv.kill();
  }
}

if (fail.length) {
  console.error("PREDEPLOY GUARD: FAIL — do not deploy\n- " + fail.join("\n- "));
  process.exit(1);
}
console.log(`PREDEPLOY GUARD: PASS (HEAD ${sh("git rev-parse --short HEAD")} contains live ${live.slice(0, 7)}, ${routes.length} routes present)`);
