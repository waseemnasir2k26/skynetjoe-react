# /vibe-coding Page — Build Report

Date: 2026-05-22
Route: `https://skynetjoe.com/vibe-coding`
File: `src/app/vibe-coding/page.tsx` (server component, fully static)

---

## Sections shipped (10 total)

1. **Hero** — 2-column. Personality headline ("Real human at a real keyboard. Just one that types 12x faster now."), 2 subtitle paragraphs explaining vibe coding in one breath, dual CTA (Cal.com `/skynetjoe/30min` + anchor to `#toolchain`). Hero image: `waseem-cafe-builder.jpg` with `priority`, gradient overlay, "Live from Canggu, Bali" pulse badge.
2. **What is vibe coding?** — Centered 80-word direct-answer block, third-person, decorative pull-quote glyph, glass card.
3. **Human in the loop** — 3-photo collage (`waseem-cafe-arch.jpg` large + `waseem-veranda-gaze.jpg` + `waseem-poolside-laptop.jpg` stacked). Copy references blue polo, brick-arch cafe in Canggu, 2am Bali bug fixes. Anti-AI-agency framing.
4. **The Toolchain** — 5-card grid. Claude Code (Primary), Replit (Speed), Cursor (IDE), Codex (Volume), Gemini (Context). Each card: gradient-icon tile + role line + "When we reach for it" example. Lucide icons (`Brain`, `Rocket`, `Code2`, `FileCode`, `Sparkles`).
5. **The Pipe Coding Flow** — 5-step process. `01 Vibe check` / `02 Pipe it in` / `03 Pair with the agents` / `04 Ship to staging` / `05 Live within the week`. Step 03 inlines `waseem-cafe-side.jpg` photo. Each step: big mono number + lucide icon + 1-line description.
6. **What we vibe-code** — 6-card service grid: Next.js sites, Chrome extensions, n8n custom nodes, AI-agent micro-products, WordPress plugins, internal ops dashboards. Each card has `$X.Xk` price + `5-day ship` badge.
7. **A few we've shipped** — 3 case study cards linked into `/case-studies/{slug}` (manhattan-dental-atelier-flagship, bali-wellness-conversion-funnel, premium-auto-dealership-network-demo). Filtered by `vibe-coded-sites` relatedServices tag.
8. **Real talk / Why human** — Pull-quote block with the "AI doesn't replace the builder, it replaces the typing" copy. Right column: `waseem-rooftop-smile.jpg` portrait. Attribution line under the quote.
9. **FAQ** — 6 `<details>` accordions: bootcamp / who-writes-code / after-delivery / live-build / mid-build-pivot / claude-code-vs-copilot. First-person warm voice. Schema-linked to FAQPage.
10. **Final CTA** — Big ocean-gradient block, "Book a vibe check" headline, Cal.com primary button + mailto:waseem@skynetjoe.com secondary. Bali GMT+8 timezone disclaimer. No WhatsApp anywhere.

---

## Metadata & Schema

- **Title**: "Vibe Coding by SkynetLabs — Ship Real Apps in 5–14 Days with Claude Code + the AI Toolchain"
- **Description**: 158 chars, mentions Waseem Nasir, Bali, Claude Code, 5–14 day ship window, toolchain
- **Canonical**: `${SITE.url}/vibe-coding` (absolute)
- **OpenGraph**: `og:image` → `/portraits/waseem-cafe-builder.jpg`, type `website`
- **Twitter**: `summary_large_image` with same image
- **Schema.org `@graph`**:
  - `Service` w/ embedded `Person` (Waseem as `performer`, homeLocation Bali, knowsAbout array, image)
  - `AggregateOffer` lowPrice $1,800 / highPrice $12,000
  - `FAQPage` with all 6 Q/A pairs

---

## Photos copied to `public/portraits/`

5 new files copied from `WASEEM IMAGES/PROFESSIONAL/`:

| Source                                          | Destination                                |
| ----------------------------------------------- | ------------------------------------------ |
| BALI-2026-05-06-cafe-arch-working-smile.JPG     | `public/portraits/waseem-cafe-builder.jpg` |
| BALI-2026-05-07-rooftop-portrait-smile.JPG      | `public/portraits/waseem-rooftop-smile.jpg`|
| BALI-2026-05-07-veranda-direct-gaze.JPG         | `public/portraits/waseem-veranda-gaze.jpg` |
| BALI-2026-05-12-poolside-nomad-laptop.JPG       | `public/portraits/waseem-poolside-laptop.jpg` |
| BALI-2026-05-06-cafe-arch-working-side.JPG      | `public/portraits/waseem-cafe-side.jpg`    |

All 5 used on the page. Plus 2 existing portraits reused (`waseem-cafe-arch.jpg`, no others).

---

## Sitemap diff

Append-only single-line addition inside the existing `staticRoutes` array:

```diff
     "/privacy-policy",
     "/terms-of-service",
     "/locations",
+    "/vibe-coding",
   ].map((path) => ({
```

No refactor. Other route arrays (`serviceRoutes`, `stateRoutes`, etc.) untouched.

---

## Build output

```
▲ Next.js 16.2.6 (Turbopack)
✓ Compiled successfully in 4.8s
✓ Generating static pages using 23 workers (871/871) in 4.6s
...
└ ○ /vibe-coding
```

`/vibe-coding` listed as `○ (Static)` — fully prerendered at build time. 871 total static pages, no errors, no type-check failures.

---

## Voice / banned-phrase compliance

- Zero em-dash flourishes (commas + periods + parentheses only).
- Zero "transform your business" / "leverage cutting-edge".
- First-person ("I", "me", "we") for Waseem voice; third-person only in the direct-answer block and schema.
- Concrete Bali anchors: Canggu, brick-arch cafe, oat-milk americano, 2am Bali time.
- No WhatsApp link anywhere. Email + Cal.com only.
- Cal.com hardcoded to `https://cal.com/skynetjoe/30min` (no SITE.cal field exists — easy swap later if added).

---

## Files touched (this run only)

- **Created**: `src/app/vibe-coding/page.tsx` (~620 lines)
- **Created**: `public/portraits/waseem-cafe-builder.jpg`, `waseem-rooftop-smile.jpg`, `waseem-veranda-gaze.jpg`, `waseem-poolside-laptop.jpg`, `waseem-cafe-side.jpg`
- **Created**: `VIBE_CODING_PAGE.md` (this file)
- **Edited (append-only, 1 line)**: `src/app/sitemap.ts`

No other files touched.
