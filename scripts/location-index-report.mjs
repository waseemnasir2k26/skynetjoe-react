/**
 * Prints the 48-state /locations/[state] index-eligibility table.
 *
 * Reads the ONE gate implementation (src/lib/location-index-gate.ts) directly
 * via Node's native TypeScript type-stripping (Node >= 22.6). No duplication of
 * the rule, so this report can never drift from what the site actually emits.
 *
 *   npm run seo:locations           # human table
 *   npm run seo:locations -- --json # machine-readable
 */
import { locationIndexReport } from "../src/lib/location-index-gate.ts";

const rows = locationIndexReport();
if (process.argv.includes("--json")) {
  console.log(JSON.stringify(rows, null, 2));
  process.exit(0);
}

const pass = rows.filter((r) => r.indexable);
const pad = (s, n) => String(s).padEnd(n);
console.log(
  `${pad("state", 18)}${pad("index", 7)}${pad("score", 7)}${pad("chars", 7)}${pad("cities", 8)}${pad("maxJaccard", 12)}${pad("nearest", 16)}reason`,
);
console.log("-".repeat(110));
for (const r of rows) {
  console.log(
    `${pad(r.slug, 18)}${pad(r.indexable ? "INDEX" : "noindex", 7)}${pad(r.score, 7)}${pad(r.enrichmentChars, 7)}${pad(r.ownCitiesNamed, 8)}${pad(r.maxSimilarity, 12)}${pad(r.nearestState ?? "-", 16)}${r.reason}`,
  );
}
console.log("-".repeat(110));
console.log(`${pass.length}/${rows.length} states indexable; ${rows.length - pass.length} noindex,follow`);
