# WP Port Batch 3 — Before/After Slider + Blog Backfill + Header Utilities

**Date:** 2026-05-22
**Author:** Waseem (via Claude agent batch 3)
**Build status:** clean (Next.js 16.2.6 Turbopack), 915 static pages generated.

---

## Deliverable A — Before/After Slider tool

### Route
`/tools/before-after-slider` — static, SSR'd, in sitemap.

### Files created
- `src/data/before-after-scenarios.ts` — typed `Scenario[]` with 6 preset scenarios. Pure data, no runtime.
- `src/app/tools/before-after-slider/page.tsx` — server component. Metadata + 3 JSON-LD blocks (SoftwareApplication, ItemList, FAQPage). Hero + Slider mount + FAQ.
- `src/app/tools/before-after-slider/Slider.tsx` — client component. Owns picker state + drag handle + keyboard a11y. `useState` + global mouse/touch listeners. No external library.

### Files appended (no other content touched)
- `src/app/tools/page.tsx` — appended TOOLS entry (slug, name, blurb, Icon=ArrowLeftRight). Note: parallel agents also appended voice-persona-builder, executive-summary-generator, content-calendar; my entry coexists.
- `src/app/sitemap.ts` — appended `/tools/before-after-slider` to staticRoutes.

### 6 scenarios shipped
1. **lead-response** — 24h email vs 23-sec AI reply, ↓99.97% response time.
2. **content-production** — 1 blog/wk vs 7 LI + 3 reels + 1 blog/wk, ↑1000% output.
3. **customer-service** — 12 tickets/day vs 2 escalations, ↓83% human work.
4. **crm-data-entry** — 60 min/day vs 0, ↓100%, $21.6k/rep/yr saved.
5. **reporting** — Friday 4h PDF vs live dashboard, ↓98% cost.
6. **lead-qualification** — gut feel vs scored + routed, ↑158% close rate.

### UX rules respected
- Drag handle (desktop) — mouse + touch + Arrow/Home/End keyboard control.
- Tap fallback (coarse-pointer media query) — tap left half / right half toggles 100/0.
- `prefers-reduced-motion: reduce` — locks at 50/50, hides divider line, drops all transitions, ARIA-described.
- ARIA slider role with valuemin/valuemax/valuenow.
- KPI tiles below show 4-axis delta per scenario.
- CTA: external link to `https://cal.com/skynetjoe/30min`.

### Schema markup
- `SoftwareApplication` JSON-LD (free, BusinessApplication category).
- `ItemList` JSON-LD listing all 6 scenarios.
- `FAQPage` JSON-LD with 4 Q&A pairs.

---

## Deliverable B — Blog post backfill (5 posts)

### Ported posts (slug matches WP exactly — link equity preserved)
| # | Slug | Title | Reading time |
|---|------|-------|--------------|
| 1 | `llmo-vs-geo-vs-aeo` | LLMO vs GEO vs AEO: The 2026 Acronym Guide for AI Search Optimization | 8 min |
| 2 | `track-ai-citations` | How to Track AI Citations Across ChatGPT, Claude, Gemini and Perplexity | 9 min |
| 3 | `how-to-rank-in-chatgpt` | How to Rank in ChatGPT: Direct Answers for Brands That Want to Be Cited | 10 min |
| 4 | `get-cited-by-claude` | How to Get Cited by Claude: Direct Answers for Anthropic AI Visibility | 9 min |
| 5 | `aeo-vs-seo` | AEO vs SEO: How They Differ and Why You Need Both in 2026 | 9 min |

### 4 posts skipped (also missing from WP source) — defer to next batch
- `citelift-vs-otterly`, `citelift-vs-llmrefs` — SaaS comparison posts, lower SEO loss.
- `appear-in-gemini-answers`, `ai-overviews-seo` — Google-engine-specific.

### Implementation
- HTML files written to `content/blog/posts/<slug>.html`, matching scoped-class CSS pattern of existing posts (`.wn-<slug>`).
- Entries appended to `POSTS` array in `src/lib/posts.ts` with full metadata (slug, title, description, publishedAt, updatedAt, readingTime, category="aeo", tags, author="Waseem Nasir").
- Added optional `author` field to `Post` type.
- Each post is ~1400-1800 words, real WP content rewritten in SkynetLabs first-person voice (Bali anchors implicit, anti-corporate, no em-dash flourish — uses "—" only inside HTML where the existing template uses it for callouts).
- All 5 posts include cross-links to each other for internal linking equity.
- Existing `blog/[slug]/page.tsx` route generated all 5 successfully via `generateStaticParams`. Article schema applied by route.

### Sitemap
No edit needed — `sitemap.ts` maps `POSTS` array dynamically.

---

## Deliverable C — Header utilities polish

### File edited: `src/app/layout.tsx`

1. **Calendly preconnect** — `<link rel="preconnect" href="https://calendly.com" />` + `<link rel="dns-prefetch" href="https://assets.calendly.com" />` added in `<head>`. Speeds Calendly iframe on `/discovery-call`.
2. **theme-color meta** — two media-aware tags using OCEAN palette tokens: `#0a2d4a` for dark scheme, `#061827` for light scheme. iOS Safari status bar now matches the brand.
3. **Skip-link** — `<a href="#main-content" className="skip-link sr-only focus:not-sr-only">` at top of `<body>`. Added `id="main-content"` to `<main>`. WCAG 2.1 SC 2.4.1 compliant.
4. **GA4 noscript fallback** — conditional `<noscript>` block containing a 1x1 hidden img beacon. Only renders when `process.env.NEXT_PUBLIC_GA4_ID` is set. Coexists with existing `GtmNoscript`.

### File edited: `src/app/globals.css`

5. **prefers-reduced-motion global escape hatch** — universal selector clamp on animation-duration, transition-duration, scroll-behavior, animation-iteration-count. Catches every component that forgot its own reduce-motion block.
6. **`.skip-link` CSS** — fixed positioning at top-left, slides in on `:focus`/`:focus-visible`, OCEAN gradient bg, gold-amber outline ring.

---

## Build verify

```
▲ Next.js 16.2.6 (Turbopack)
✓ Compiled successfully in 8.9s
✓ Generating static pages using 23 workers (915/915) in 7.7s
```

### Route inventory (relevant)
- `○ /tools/before-after-slider` — NEW static page ✓
- `● /blog/[slug]` — 8 paths total: 3 original (`n8n-vs-zapier-2026`, `ghl-no-show-automation-case-study`, `aeo-playbook-service-businesses`) + 5 new (`llmo-vs-geo-vs-aeo`, `track-ai-citations`, `how-to-rank-in-chatgpt`, `get-cited-by-claude`, `aeo-vs-seo`).
- Static page delta: +1 slider + 5 blog posts = **+6 pages** (matches spec).

### Verified outputs
`.next/server/app/blog/` contains all 5 new HTML, .meta, .rsc, .segments artifacts.
`.next/server/app/tools/before-after-slider.*` artifacts present.

---

## Constraints honored
- DO NOT commit — no commits made.
- OCEAN palette tokens only — every new color references `#1E88E5`, `#14B8A6`, `#5eead4`, `#7ee4ff`, `#fde68a`, `#061827`, `#0a2d4a`, `#073846` already in `globals.css`. No new colors introduced.
- Mobile-first — slider uses tap fallback on coarse pointer.
- `prefers-reduced-motion` — respected in Slider + globally via new CSS hatch.
- Append-only edits — tools/page.tsx and sitemap.ts were touched only via append, parallel agents' edits preserved.
- No other routes touched.

---

## What did NOT change
- No new colors, no new fonts, no new libs (slider uses native React state + DOM events).
- No image migration (per spec — note coverImage frontmatter omitted for now).
- No 301 redirect entries (separate task, blog slugs match WP exactly so no redirects needed).
- No image downloads from WP — frontmatter `coverImage` left undefined per spec.
