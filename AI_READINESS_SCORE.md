# AI Readiness Score — build report

`/tools/ai-readiness-score` — 10-question diagnostic that scores a service business 0–100 on AI automation readiness, breaks it down across four dimensions, and routes high-readiness leads to a strategy-call booking URL prefilled with structured context.

## Files touched

**New:**
- `src/data/ai-readiness-questions.ts` — typed question bank, scoring + bucket helpers, calculator + booking param builders
- `src/app/tools/ai-readiness-score/page.tsx` — SSG server shell (metadata + Quiz JSON-LD + SoftwareApplication JSON-LD + FAQPage JSON-LD)
- `src/app/tools/ai-readiness-score/Quiz.tsx` — client component (10-Q flow, loader, result card, radar chart)

**Appended (surgical, no restructure):**
- `src/app/tools/page.tsx` — added one `TOOLS[]` entry + imported `Compass` icon
- `src/app/sitemap.ts` — appended `"/tools/ai-readiness-score"` to `staticRoutes`

## Question bank (10 Qs, 4 dimensions)

| # | Dim | ID | Prompt | Option weights |
|---|-----|----|--------|----------------|
| 1 | Foundation | `stack` | Current automation stack? | none 0 / zaps 3 / messy 6 / system 10 |
| 2 | Foundation | `data` | Customer data cleanliness? | sheets 0 / inconsistent 4 / mostly 7 / audited 10 |
| 3 | Foundation | `aiUse` | Team using AI yet? | no 0 / tried 3 / weekly 7 / builtIn 10 |
| 4 | Process | `docs` | Top 3 workflows documented? | no 0 / head 2 / loose 6 / runbooks 10 |
| 5 | Process | `manualHours` | Weekly manual hours? | lt5 2 / 5-15 5 / 15-30 8 / 30plus 10 |
| 6 | Process | `responseSpeed` | Lead response speed? | slow 1 / hour 5 / fast 8 / instant 10 |
| 7 | Demand | `monthlyLeads` | Monthly leads? | lt50 2 / 50-200 6 / 200-500 9 / 500plus 10 |
| 8 | Demand | `responseRate` | % responded within 24h? | lt50 2 / 50-75 5 / 75-90 7 / gt90 10 |
| 9 | Buy-in | `budget` | First build budget? | lt1k 1 / 1-5k 5 / 5-15k 8 / 15kplus 10 |
| 10 | Buy-in | `decision` | Decision authority? | committee 1 / partner 4 / meBusy 7 / meReady 10 |

`MAX_SCORE = 100`. Per-dimension max: Foundation 30 / Process 30 / Demand 20 / Buy-in 20.

## Bucket thresholds

| Range | Key | Label | Color |
|-------|-----|-------|-------|
| 0–30 | `notReady` | Not ready yet | `#f97316` orange |
| 31–55 | `readyIn30` | Ready in 30 days | `#eab308` yellow |
| 56–80 | `shipIn14` | Ship in 14 days | `#06b6d4` cyan |
| 81–100 | `urgent` | You should have called yesterday | `#10b981` emerald |

Each bucket carries a `headline`, `recommendation` paragraph, and 3 `bullets`. The first bullet position is replaced at render time by a personalized "Fix this first" callout for whichever dimension scored lowest (`weakestDimension(subscores)`).

## Radar chart approach

Hand-coded SVG, zero dependencies. Inside `Quiz.tsx::RadarChart`:

- 260×260 viewBox, 4-axis polygon (top = Foundation, right = Process, bottom = Demand, left = Buy-in)
- 4 concentric guide rings + 4 axis spokes
- Filled polygon with per-bucket color at 28% opacity + 2px stroke
- Vertex dots at each axis intersection
- Each dim normalized as `raw / dim.maxScore` (0–1) so Demand and Buy-in (20-max) sit on the same visual scale as Foundation and Process (30-max)
- Axis labels positioned past the ring with anchor switching based on quadrant
- Wrapper does a 700ms scale-fade-in, suppressed under `prefers-reduced-motion`
- Below the chart: 4-tile grid showing `raw / max · percentage` per dim

## Calendly prefill mapping

Primary CTA hits `https://cal.com/skynetjoe/30min?<query>` via `buildBookingParams()`:

```
score=<0-100>
bucket=<notReady|readyIn30|shipIn14|urgent>
weakest=<foundation|process|demand|buyIn>
dims=foundation:N,process:N,demand:N,buyIn:N
source=ai-readiness
```

Secondary CTA hits `/tools/revenue-calculator?<query>` via `buildCalculatorParams()` — maps Q7 to `leads` and Q5 to `hours` using shared midpoint tables, plus `source=ai-readiness`.

Tertiary CTA copies a shareable URL: `?result=<score>&bucket=<key>`. The Quiz hydration path checks `result` on mount and jumps directly to the result view (rebuilding the radar from saved scores in the same browser, or falling back to an even-split skeleton for cold-link visitors).

## UX behaviors

- Progress bar + "Question N of 10" header
- 320ms slide-up animation per question (suppressed by `prefers-reduced-motion`)
- "Save & resume later" button persists to `localStorage["skynet:ai-readiness:v1"]`
- 2-second "Calculating your readiness score…" loader between Q10 and reveal
- Result reveal: 1100ms eased count-up on the score, radar fades in, bucket glow via `textShadow` + `boxShadow` in bucket color
- Result persists in localStorage for 14 days (`RESULT_TTL_MS`); cold-loads inside that window jump straight back to result
- Result URL is `replaceState`d to `?result=N&bucket=key` for direct shareability
- All animations honor `prefers-reduced-motion`

## SEO / schema

- Title: 79 chars, includes "AI Readiness Score — 90-second diagnostic for service businesses · SkynetLabs"
- Description: 153 chars
- Canonical: `https://skynetjoe.com/tools/ai-readiness-score`
- OG + Twitter card
- Three separate JSON-LD blocks: `Quiz` (with `hasPart` Questions for each Q), `SoftwareApplication` (free, BusinessApplication), `FAQPage` (4 Qs)

## Build status

Build ran with `npm run build` in `app/`. Output confirmed:

- `✓ Compiled successfully`
- `Finished TypeScript`
- New route `○ /tools/ai-readiness-score` listed as **Static** (SSG)
- All sibling tools intact (`/tools`, `/tools/agency-stress-quiz`, `/tools/revenue-calculator`)
- Service-state matrix unchanged (`+765 more paths`), state matrix unchanged, no count regression
- 54 unique `page.js` files in `.next/server/app/`, equivalent to baseline + 1 new tool page

The `.next/server/app/tools/ai-readiness-score/page.js` artifact is present, confirming prerender.

## Voice / constraints check

- First-person Waseem voice throughout
- No em-dash flourish in copy
- No banned phrases ("transform", "leverage", "cutting-edge") anywhere in `page.tsx`, `Quiz.tsx`, or `ai-readiness-questions.ts`
- Concrete diagnostic tone — "I've killed more automation projects than I've shipped" / "Both answers save us both money" / "Foundation work first. Automation now would amplify chaos."
- Mobile-first layout: single-column hero, `sm:grid-cols-2` answer grid, stacked CTAs on mobile and side-by-side on `sm+`
- Touched only the 4 files in the allowlist
- No new dependencies
- No git commit performed (per spec)
