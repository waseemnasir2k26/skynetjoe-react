#!/usr/bin/env node
/**
 * redirects.test.mjs — 2026-09-21 simplification safety net.
 *
 * Every URL that was in the public sitemap before the cut
 * (scripts/sitemap-2026-09-21-before.txt, 213 URLs) must either:
 *   (a) still exist — it is in KEPT_PATHS below (the plan's target map), or
 *   (b) match a redirect source in src/lib/simplify-redirects.ts
 *       (`:param` segments supported), whose destination is itself a kept
 *       path or a static kept prefix — so no redirect can chain or 404.
 *
 * Runs on plain Node (>= 22.6 type-stripping) — no Next, no build.
 *   node scripts/redirects.test.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const {
  SIMPLIFY_REDIRECTS,
  KEPT_TOOLS,
  KILLED_SERVICES,
  PROMOTED_NEWS,
} = await import(
  pathToFileUrl(path.join(ROOT, "src", "lib", "simplify-redirects.ts"))
);

function pathToFileUrl(p) {
  return "file:///" + p.replace(/\\/g, "/");
}

// ── Kept set (hardcoded from the plan's target map) ─────────────────────────
const CORE_SERVICES = [
  "n8n-automation",
  "ai-chatbots",
  "gohighlevel",
  "vibe-coded-sites",
  "wordpress-seo",
];
const CASE_STUDIES = [
  "eu-logistics-email-triage-n8n",
  "bali-wellness-conversion-funnel",
  "northeast-recovery-brand-intake-rescue",
  "us-insurance-gohighlevel-rebuild",
  "internal-carousel-content-engine-200-asset",
  "premium-auto-dealership-network-demo",
  "ksa-fashion-retailer-shopify-ecommerce",
  "saas-multi-channel-aeo-content-engine",
];
const INDUSTRIES = ["dental-clinics", "wellness-spas", "freight-logistics"];
const BLOG_POSTS = [
  // existing posts (src/lib/posts.ts) minus the /n8n-vs-zapier dupe
  "ai-ops-command-center-never-miss-a-lead",
  "claude-fable-5-prompts-40-master-prompts",
  "ghl-no-show-automation-case-study",
  "aeo-playbook-service-businesses",
  "llmo-vs-geo-vs-aeo",
  "track-ai-citations",
  "how-to-rank-in-chatgpt",
  "get-cited-by-claude",
  "aeo-vs-seo",
  // promoted from /news
  ...PROMOTED_NEWS,
  // moved single
  "edit-videos-with-claude",
];

const KEPT_PATHS = new Set([
  "/",
  "/services",
  ...CORE_SERVICES.map((s) => `/services/${s}`),
  "/portfolio",
  "/case-studies",
  ...CASE_STUDIES.map((s) => `/case-studies/${s}`),
  "/industries",
  ...INDUSTRIES.map((s) => `/industries/${s}`),
  "/tools",
  ...KEPT_TOOLS.map((s) => `/tools/${s}`),
  "/blog",
  ...BLOG_POSTS.map((s) => `/blog/${s}`),
  "/pricing",
  "/about",
  "/contact",
  "/author/waseem-nasir",
  "/aeo-guide",
  "/glossary",
  "/faqs",
  "/n8n-vs-zapier",
  "/boring-automations-small-businesses-pay-for",
  "/privacy-policy",
  "/terms-of-service",
  "/thank-you",
]);

// ── Matcher: Next-style `:param` sources ────────────────────────────────────
function sourceToRegex(source) {
  const re = source
    .split("/")
    .map((seg) =>
      seg.startsWith(":") ? "([^/]+)" : seg.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    )
    .join("/");
  return new RegExp(`^${re}$`);
}

function resolveDestination(rule, url) {
  const m = url.match(sourceToRegex(rule.source));
  if (!m) return null;
  const params = rule.source
    .split("/")
    .filter((s) => s.startsWith(":"))
    .map((s) => s.slice(1));
  let dest = rule.destination;
  params.forEach((p, i) => {
    dest = dest.replace(`:${p}`, m[i + 1]);
  });
  return dest;
}

function findRedirect(url) {
  for (const rule of SIMPLIFY_REDIRECTS) {
    const dest = resolveDestination(rule, url);
    if (dest) return { rule, dest };
  }
  return null;
}

// ── Load the before-snapshot ────────────────────────────────────────────────
const snapshot = fs
  .readFileSync(path.join(__dirname, "sitemap-2026-09-21-before.txt"), "utf8")
  .split(/\r?\n/)
  .map((l) => l.trim())
  .filter(Boolean)
  .map((u) => u.replace(/^https?:\/\/[^/]+/, "") || "/");

const failures = [];
let kept = 0;
let redirected = 0;

for (const url of snapshot) {
  if (KEPT_PATHS.has(url)) {
    kept++;
    continue;
  }
  const hit = findRedirect(url);
  if (!hit) {
    failures.push(`${url} — neither kept nor redirected (would 404)`);
    continue;
  }
  if (!KEPT_PATHS.has(hit.dest)) {
    failures.push(
      `${url} → ${hit.dest} — destination is not a kept path (chain or 404)`,
    );
    continue;
  }
  if (findRedirect(hit.dest)) {
    failures.push(`${url} → ${hit.dest} — destination itself redirects (chain)`);
    continue;
  }
  redirected++;
}

// Every killed service must map to a kept path (no chains).
for (const [slug, dest] of Object.entries(KILLED_SERVICES)) {
  if (!KEPT_PATHS.has(dest)) {
    failures.push(`KILLED_SERVICES[${slug}] → ${dest} is not a kept path`);
  }
}

// Sanity: the snapshot must be the full 213-URL sitemap, not a truncated file.
if (snapshot.length !== 213) {
  failures.push(`snapshot has ${snapshot.length} URLs, expected 213`);
}

console.log(
  `redirects.test: ${snapshot.length} URLs — ${kept} kept, ${redirected} redirected (single hop), ${failures.length} failures`,
);
if (failures.length) {
  for (const f of failures) console.error("  FAIL " + f);
  process.exit(1);
}
console.log("PASS");
