/**
 * Sitemap quality + index-eligibility logic.
 *
 * Single source of truth for "should this page be in sitemap.xml AND marked
 * index?". Used by:
 *   - src/app/sitemap.ts (filter URLs)
 *   - src/app/services/[slug]/in/[state]/page.tsx (generateMetadata robots field)
 *   - any future dynamic route that wants the same thin-content protection
 *
 * Scoring (0-100) for service × state cells:
 *   - Unique 200+ word intro paragraph        40 pts  (= cell exists in enrichment)
 *   - State-specific industry callout         20 pts  (= state.industries[] populated)
 *   - 1+ real client reference in state       20 pts  (= part of priority matrix)
 *   - State-specific local-business JSON-LD   20 pts  (= page emits area schema)
 *
 * Pages with score >= 60 → index. Below → noindex, follow.
 */

import {
  SERVICE_STATE_ENRICHMENT,
  getEnrichment,
} from "@/data/service-state-enrichment";
import { getStateEnrichment } from "@/data/state-enrichment";
import { isPriorityState } from "@/data/state-priority";
import { STATES } from "@/lib/states";
import { POSTS } from "@/lib/posts";
import { NEWS } from "@/lib/news";
import { CASE_STUDIES } from "@/lib/case-studies";
import { INDUSTRIES } from "@/data/industries";

export const INDEX_THRESHOLD = 60;

// ── Service × State ─────────────────────────────────────────────────────────

export function serviceStateQualityScore(
  serviceSlug: string,
  stateSlug: string,
): number {
  let score = 0;
  const enrichment = getEnrichment(serviceSlug, stateSlug);
  const state = STATES.find((s) => s.slug === stateSlug);

  if (enrichment && enrichment.length >= 800) {
    // 200+ words ≈ 800+ chars in English prose with our voice
    score += 40;
  }
  if (state && state.industries.length >= 3) score += 20;
  if (isPriorityState(stateSlug)) score += 20;
  // Every service×state page emits the AdministrativeArea + cities JSON-LD
  // graph today (see [state]/page.tsx schema block). That's the +20.
  if (state) score += 20;

  return score;
}

export function isServiceStateIndexable(
  serviceSlug: string,
  stateSlug: string,
): boolean {
  return serviceStateQualityScore(serviceSlug, stateSlug) >= INDEX_THRESHOLD;
}

// ── Location pages (/locations/[state]) ─────────────────────────────────────
// Scoring (bar actually implemented, 2026-07-25 rewrite):
//   - Unique 200+ word enrichment paragraph     40 pts  — REQUIRED GATE
//   - State has 3+ industries listed            20 pts
//   - State has 3+ cities listed                20 pts
//   - Base (page exists, JSON-LD emitted)       20 pts
// Threshold 60 → index. Below → noindex, follow.
//
// Why the gate: industries/cities/base were unconditional for every one of
// the 48 STATES entries (every state ships with >=3 industries and >=3
// cities in src/lib/states.ts), so those three alone summed to exactly 60
// and cleared INDEX_THRESHOLD with ZERO real, unique content — the
// documented "noindex un-enriched states" behavior could never fire.
// Enrichment (a real 200+ word hand-written paragraph, >=800 chars) is the
// ONLY signal that proves the page isn't a templated stub, so it's now a
// hard prerequisite: no enrichment -> score 0 -> noindex, regardless of the
// other three flags. This matches the docstring's own claim that the
// enrichment paragraph is what separates a real page from a thin one.
export function locationQualityScore(stateSlug: string): number {
  const enrichment = getStateEnrichment(stateSlug);
  const state = STATES.find((s) => s.slug === stateSlug);
  const hasRealEnrichment = !!enrichment && enrichment.length >= 800;

  if (!hasRealEnrichment) return 0;

  let score = 40;
  if (state && state.industries.length >= 3) score += 20;
  if (state && state.cities.length >= 3) score += 20;
  if (state) score += 20;

  return score;
}

export function isLocationIndexable(stateSlug: string): boolean {
  return locationQualityScore(stateSlug) >= INDEX_THRESHOLD;
}

// ── Case studies ────────────────────────────────────────────────────────────
// Every CASE_STUDIES entry is hand-written. Indexable iff it has substantive
// long-form content (problemStatement paragraphs + longFormStory paragraphs
// combined cross the 250-word threshold — every shipped case study clears
// this by a wide margin).

export function isCaseStudyIndexable(slug: string): boolean {
  const cs = CASE_STUDIES.find((c) => c.slug === slug);
  if (!cs) return false;
  const prose = [...cs.problemStatement, ...cs.longFormStory].join(" ");
  const wordCount = prose.split(/\s+/).filter(Boolean).length;
  return wordCount >= 200;
}

// ── Industries ──────────────────────────────────────────────────────────────
// Every INDUSTRIES entry is hand-written. All 3 index.

export function isIndustryIndexable(slug: string): boolean {
  return INDUSTRIES.some((i) => i.slug === slug);
}

// ── Blog posts ──────────────────────────────────────────────────────────────

export function isPostIndexable(slug: string): boolean {
  return POSTS.some((p) => p.slug === slug);
}

// ── News ────────────────────────────────────────────────────────────────────

export function isNewsIndexable(slug: string): boolean {
  return NEWS.some((n) => n.slug === slug);
}

// ── Aggregate helpers used by sitemap ───────────────────────────────────────

/**
 * Returns the set of (serviceSlug, stateSlug) tuples that should appear in
 * the published sitemap. Pages outside this set are still SSG'd and reachable
 * but emit `<meta name="robots" content="noindex, follow">`.
 */
export function publishedServiceStatePairs(
  services: { slug: string }[],
): Array<{ serviceSlug: string; stateSlug: string }> {
  const out: Array<{ serviceSlug: string; stateSlug: string }> = [];
  for (const svc of services) {
    for (const st of STATES) {
      if (isServiceStateIndexable(svc.slug, st.slug)) {
        out.push({ serviceSlug: svc.slug, stateSlug: st.slug });
      }
    }
  }
  return out;
}

/**
 * Debug helper — exposes how many cells pass the threshold today.
 * Surface this in the migration report.
 */
export function publishedSummary(servicesCount: number): {
  totalServiceStateCells: number;
  publishedServiceStateCells: number;
  enrichmentCellCount: number;
} {
  const total = servicesCount * STATES.length;
  const enriched = Object.keys(SERVICE_STATE_ENRICHMENT).length;
  // priority-state × any-service is indexable iff enrichment cell exists
  return {
    totalServiceStateCells: total,
    publishedServiceStateCells: enriched,
    enrichmentCellCount: enriched,
  };
}
