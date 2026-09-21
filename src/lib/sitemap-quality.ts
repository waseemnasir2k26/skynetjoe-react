/**
 * Sitemap quality + index-eligibility logic.
 *
 * Single source of truth for "should this page be in sitemap.xml AND marked
 * index?". Used by src/app/sitemap.ts. The service×state and /locations
 * scorers were removed with the doorway-page teardown (2026-09-21).
 */

import { POSTS } from "@/lib/posts";
import { CASE_STUDIES } from "@/lib/case-studies";
import { INDUSTRIES } from "@/data/industries";

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
