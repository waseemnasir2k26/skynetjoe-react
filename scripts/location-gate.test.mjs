/**
 * Negative tests for the /locations/[state] index gate.
 *
 * Why this file exists: the previous gate could never return false for any
 * enriched state, so the documented "noindex thin/templated states" behaviour
 * was decorative. These tests ASSERT (not print) that each of the three hard
 * prerequisites actually rejects, and that the live corpus is graded by the
 * same function the site uses.
 *
 *   npm test
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import {
  gradeLocation,
  jaccard,
  locationIndexReport,
  evaluateLocation,
  LOCATION_INDEX_THRESHOLD,
  LOCATION_MIN_ENRICHMENT_CHARS,
  LOCATION_MAX_PAIRWISE_SIMILARITY,
  LOCATION_MIN_OWN_CITIES,
} from "../src/lib/location-index-gate.ts";

const ok = { enrichmentChars: 1200, ownCitiesNamed: 4, industriesCount: 3, maxSimilarity: 0.01 };
let n = 0;
const t = (name, fn) => { fn(); n++; console.log(`  ok ${name}`); };

t("a fully-qualified state indexes at 100", () => {
  const r = gradeLocation(ok);
  assert.equal(r.indexable, true);
  assert.equal(r.score, 100);
  assert.ok(r.score >= LOCATION_INDEX_THRESHOLD);
});

t("GATE RETURNS FALSE: no enrichment paragraph", () => {
  const r = gradeLocation({ ...ok, enrichmentChars: 0 });
  assert.equal(r.indexable, false);
  assert.equal(r.score, 0);
  assert.match(r.reason, /no enrichment/);
});

t("GATE RETURNS FALSE: enrichment below the char floor", () => {
  const r = gradeLocation({ ...ok, enrichmentChars: LOCATION_MIN_ENRICHMENT_CHARS - 1 });
  assert.equal(r.indexable, false);
  assert.equal(r.score, 0);
});

t("GATE RETURNS FALSE: paragraph does not name the state's own cities", () => {
  const r = gradeLocation({ ...ok, ownCitiesNamed: LOCATION_MIN_OWN_CITIES - 1 });
  assert.equal(r.indexable, false);
  assert.equal(r.score, 0);
  assert.match(r.reason, /own cities/);
});

t("GATE RETURNS FALSE: near-duplicate of another state (doorway shape)", () => {
  const r = gradeLocation({ ...ok, maxSimilarity: LOCATION_MAX_PAIRWISE_SIMILARITY + 0.01 });
  assert.equal(r.indexable, false);
  assert.equal(r.score, 0);
  assert.match(r.reason, /Jaccard/);
});

t("similarity ceiling is at or below the measured live baseline headroom", () => {
  // 8-gram Jaccard measured on the live site 2026-09-05 (Oregon vs Vermont)
  // was 0.161 for whole pages. The ceiling must stay tight enough to bite.
  assert.ok(LOCATION_MAX_PAIRWISE_SIMILARITY <= 0.2);
});

t("jaccard is 1 for identical text and 0 for disjoint text", () => {
  const a = new Set(["a b", "b c"]);
  assert.equal(jaccard(a, new Set(["a b", "b c"])), 1);
  assert.equal(jaccard(a, new Set(["x y"])), 0);
  assert.equal(jaccard(a, new Set()), 0);
});

t("unknown slug is never indexable", () => {
  assert.equal(evaluateLocation("not-a-state").indexable, false);
});

t("live corpus: every indexable state clears all three prerequisites", () => {
  const rows = locationIndexReport();
  assert.equal(rows.length, 48, "expected 48 states");
  for (const r of rows.filter((x) => x.indexable)) {
    assert.ok(r.enrichmentChars >= LOCATION_MIN_ENRICHMENT_CHARS, r.slug);
    assert.ok(r.ownCitiesNamed >= LOCATION_MIN_OWN_CITIES, r.slug);
    assert.ok(r.maxSimilarity <= LOCATION_MAX_PAIRWISE_SIMILARITY, r.slug);
  }
});

t("live corpus: no state page still ships the doorway sentence", () => {
  // guards the §5 #3 cleanup from silently regressing
  const page = fs.readFileSync("src/app/(skynet)/locations/[state]/page.tsx", "utf8");
  assert.ok(!/Whatever exact phrase brought you here/.test(page), "doorway sentence back");
  assert.ok(!/buildKeywordPhrases/.test(page), "keyword-phrase generator back");
});

console.log(`\n${n} assertions groups passed`);
