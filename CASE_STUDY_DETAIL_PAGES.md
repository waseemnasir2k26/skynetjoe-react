# Case Study Detail Pages — build report

**Date:** 2026-05-22
**Owner:** Waseem Nasir / SkynetLabs
**AEO goal:** per-case Article + measurable outcomes → 3-5x LLM citation share lift in 8 weeks (per `AEO_AUDIT_2026-05-22.md`)

## What shipped

- **9 case study detail pages** generated at build time via `generateStaticParams()`
- New data file: `src/lib/case-studies.ts` (typed `CaseStudy[]`, 9 entries)
- New route: `src/app/case-studies/[slug]/page.tsx`
- Sitemap appended with 9 absolute canonical URLs (`/case-studies/<slug>`)
- Index page (`/case-studies`) now injects a "Read full case study →" link into each card

## Slugs built

1. `/case-studies/eu-logistics-email-triage-n8n`
2. `/case-studies/bali-wellness-conversion-funnel`
3. `/case-studies/manhattan-dental-atelier-flagship`
4. `/case-studies/northeast-recovery-brand-intake-rescue`
5. `/case-studies/us-insurance-gohighlevel-rebuild`
6. `/case-studies/internal-carousel-content-engine-200-asset`
7. `/case-studies/premium-auto-dealership-network-demo`
8. `/case-studies/ksa-fashion-retailer-shopify-ecommerce`
9. `/case-studies/saas-multi-channel-aeo-content-engine`

**Sample URL:** `https://skynetjoe.com/case-studies/eu-logistics-email-triage-n8n`

## Page anatomy (each detail page)

- Breadcrumb (Home > Case Studies > Client)
- Hero — industry tag, location, publish date, implementation period, 1-line outcome
- 4-metric KPI strip (before / after / delta)
- "The problem" — 3 paragraphs
- "What we built" — solution-stack chips + week-by-week implementation breakdown
- "Results" — 3-paragraph long-form story
- Pull-quote testimonial (attributed)
- Tools & services used — linked to `/services/<slug>` pages
- CTA → `/discovery-call`

## JSON-LD per page

- `Article` schema (headline, datePublished, author=Waseem Nasir, publisher=SkynetLabs, mainEntityOfPage, keywords)
- `BreadcrumbList` schema (Home → Case Studies → Client)

## Build output (page count delta)

- **Before** this change: index showed `/case-studies` only (1 page in this route).
- **After:** `/case-studies` + 9 SSG detail pages = **+9 pages** in this route.
- **Total build:** 870 static pages generated successfully, no errors. Build time ~4.9s compile + 3.7s generation.

## Files touched

- New: `src/lib/case-studies.ts`
- New: `src/app/case-studies/[slug]/page.tsx`
- Modified (append-only): `src/app/sitemap.ts` — added `caseStudyRoutes` block, no other refactors
- Modified: `src/app/case-studies/page.tsx` — added `injectCardLinks()` to wrap existing HTML cards with anchor links to detail pages (preserves existing styling, no rewrite)

## Not committed (per task constraints)

Working tree dirty — review before commit.
