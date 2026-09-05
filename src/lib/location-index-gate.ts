/**
 * /locations/[state] index-eligibility gate — the ONE rule table.
 *
 * Why this file exists separately from sitemap-quality.ts:
 *   1. It must be importable by a plain Node script (scripts/location-index-
 *      report.mjs) so the 48-state pass/fail table can be produced without a
 *      Next build. That rules out `@/` path aliases — everything here is a
 *      relative import, and the only data it touches (states.ts,
 *      state-enrichment.ts) is import-free.
 *   2. sitemap-quality.ts re-exports these symbols, so there is still exactly
 *      one implementation of the gate. Never re-derive it anywhere else
 *      (memory rule: one-view-for-every-safety-predicate).
 *
 * ── What the gate actually tests (2026-09-06 rewrite) ──────────────────────
 * The previous gate only asked "does an enrichment paragraph exist and is it
 * >= 800 chars?". Every one of the 38 enriched states passed that trivially,
 * so the documented "noindex thin/templated states" behaviour could never fire
 * for an enriched state — an existence check, not a threshold.
 *
 * The SEO report (2026-09-05) measured the real risk: Google's doorway /
 * scaled-content policy targets "substantially similar pages" that swap a
 * place name. The measured 8-gram Jaccard between two enriched state pages was
 * 0.161 (Oregon vs Vermont). That is the empirical baseline, so the ceiling is
 * set at 0.20 — above it, a page is close enough to a sibling to read as a
 * template swap and must not be indexed.
 *
 * Three HARD prerequisites (any failure -> score 0 -> noindex, follow):
 *   A. enrichment exists and is >= LOCATION_MIN_ENRICHMENT_CHARS
 *   B. the enrichment names >= LOCATION_MIN_OWN_CITIES of that state's own
 *      cities (proves the prose is about this state, not a find/replace)
 *   C. max 8-gram Jaccard vs every OTHER enriched state <=
 *      LOCATION_MAX_PAIRWISE_SIMILARITY
 *
 * Then additive: 40 (enrichment) + 20 (3+ industries) + 20 (uniqueness) +
 * 20 (page exists / emits area JSON-LD) — threshold 60.
 */

import { STATES } from "./states.ts";
import { STATE_ENRICHMENT, getStateEnrichment } from "../data/state-enrichment.ts";

export const LOCATION_INDEX_THRESHOLD = 60;

/** A hand-written state paragraph runs 220-280 words ~= 1,400+ chars. */
export const LOCATION_MIN_ENRICHMENT_CHARS = 800;

/**
 * Ceiling on 8-gram Jaccard similarity against the most-similar other state.
 * Baseline measured on the live site 2026-09-05: Oregon vs Vermont = 0.161.
 */
export const LOCATION_MAX_PAIRWISE_SIMILARITY = 0.2;

/** Enrichment must name at least this many of the state's own cities. */
export const LOCATION_MIN_OWN_CITIES = 2;

const SHINGLE_N = 8;

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function shingles(text: string): Set<string> {
  const words = tokenize(text);
  const out = new Set<string>();
  for (let i = 0; i + SHINGLE_N <= words.length; i++) {
    out.add(words.slice(i, i + SHINGLE_N).join(" "));
  }
  return out;
}

export function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let inter = 0;
  for (const s of a) if (b.has(s)) inter++;
  const union = a.size + b.size - inter;
  return union === 0 ? 0 : inter / union;
}

let similarityCache: Map<string, { max: number; nearest: string | null }> | null =
  null;

/**
 * Max 8-gram Jaccard of each enriched state against every other enriched
 * state. Computed once per process (38 x 38 set comparisons, ~ms).
 */
function similarityTable(): Map<string, { max: number; nearest: string | null }> {
  if (similarityCache) return similarityCache;
  const slugs = Object.keys(STATE_ENRICHMENT);
  const sets = new Map<string, Set<string>>();
  for (const slug of slugs) sets.set(slug, shingles(STATE_ENRICHMENT[slug]));

  const table = new Map<string, { max: number; nearest: string | null }>();
  for (const a of slugs) {
    let max = 0;
    let nearest: string | null = null;
    for (const b of slugs) {
      if (a === b) continue;
      const j = jaccard(sets.get(a)!, sets.get(b)!);
      if (j > max) {
        max = j;
        nearest = b;
      }
    }
    table.set(a, { max, nearest });
  }
  similarityCache = table;
  return table;
}

/**
 * PURE scoring core — the only place the thresholds are applied.
 * Kept separate from evaluateLocation() so the negative tests in
 * scripts/location-gate.test.mjs can feed it synthetic inputs and PROVE the
 * gate returns false (memory rule: verify-gates-must-assert-not-print; a gate
 * that has never returned false is an existence check, not a threshold).
 */
export type LocationGradeInput = {
  enrichmentChars: number;
  ownCitiesNamed: number;
  industriesCount: number;
  maxSimilarity: number;
};

export function gradeLocation(input: LocationGradeInput): {
  score: number;
  indexable: boolean;
  reason: string;
} {
  const fail = (reason: string) => ({ score: 0, indexable: false, reason });

  if (input.enrichmentChars < LOCATION_MIN_ENRICHMENT_CHARS) {
    return fail(
      input.enrichmentChars === 0
        ? "no enrichment paragraph"
        : `enrichment ${input.enrichmentChars} chars < ${LOCATION_MIN_ENRICHMENT_CHARS}`,
    );
  }
  if (input.ownCitiesNamed < LOCATION_MIN_OWN_CITIES) {
    return fail(
      `names ${input.ownCitiesNamed} own cities < ${LOCATION_MIN_OWN_CITIES}`,
    );
  }
  if (input.maxSimilarity > LOCATION_MAX_PAIRWISE_SIMILARITY) {
    return fail(
      `8-gram Jaccard ${input.maxSimilarity.toFixed(3)} > ${LOCATION_MAX_PAIRWISE_SIMILARITY}`,
    );
  }

  let score = 40; // substantive, hand-written enrichment
  if (input.industriesCount >= 3) score += 20;
  score += 20; // uniqueness prerequisite cleared
  score += 20; // page exists + emits AdministrativeArea JSON-LD
  return {
    score,
    indexable: score >= LOCATION_INDEX_THRESHOLD,
    reason: "pass",
  };
}

export type LocationGateResult = {
  slug: string;
  name: string;
  score: number;
  indexable: boolean;
  enrichmentChars: number;
  ownCitiesNamed: number;
  maxSimilarity: number;
  nearestState: string | null;
  reason: string;
};

export function evaluateLocation(stateSlug: string): LocationGateResult {
  const state = STATES.find((s) => s.slug === stateSlug);
  const enrichment = getStateEnrichment(stateSlug);
  const sim = similarityTable().get(stateSlug) ?? { max: 0, nearest: null };
  const chars = enrichment?.length ?? 0;

  const ownCitiesNamed = state && enrichment
    ? state.cities.filter((c) =>
        enrichment.toLowerCase().includes(c.toLowerCase()),
      ).length
    : 0;

  const base: Omit<LocationGateResult, "score" | "indexable" | "reason"> = {
    slug: stateSlug,
    name: state?.name ?? stateSlug,
    enrichmentChars: chars,
    ownCitiesNamed,
    maxSimilarity: Number(sim.max.toFixed(4)),
    nearestState: sim.nearest,
  };

  if (!state) {
    return { ...base, score: 0, indexable: false, reason: "unknown state slug" };
  }

  const graded = gradeLocation({
    enrichmentChars: chars,
    ownCitiesNamed,
    industriesCount: state.industries.length,
    maxSimilarity: sim.max,
  });
  return { ...base, ...graded };
}

export function locationQualityScore(stateSlug: string): number {
  return evaluateLocation(stateSlug).score;
}

export function isLocationIndexable(stateSlug: string): boolean {
  return evaluateLocation(stateSlug).indexable;
}

/** Every state, evaluated — used by scripts/location-index-report.mjs. */
export function locationIndexReport(): LocationGateResult[] {
  return STATES.map((s) => evaluateLocation(s.slug));
}
