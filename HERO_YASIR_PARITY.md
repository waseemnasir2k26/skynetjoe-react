# Hero Yasir-Parity Update — 2026-05-22

Single-section change. Homepage hero rebuilt to match the structural pattern of
[yasirbashiraisite.vercel.app](https://yasirbashiraisite.vercel.app/) while keeping
SkynetLabs OCEAN palette and Waseem-first founder copy. No other sections touched.

## 1. Yasir hero recon (extracted from bundled CSS + JS)

The site is a Vite SPA — HTML shell renders client-side. Recon was done by
downloading `/assets/index-*.css` and `/assets/index-*.js` and grep'ing for
font-family, headline strings, CTA labels and class tokens.

- **Fonts:** Bricolage Grotesque (display, 400–800) + Inter (body) + Playfair
  Display **italic** (1, 500/600/700) for emphasis words. Bricolage handles the
  bold sans-serif headline; Playfair italics inject the editorial "punch word".
- **Theme color (PWA + accent):** `#288672` (deep teal). The CTA + heading
  accent tone is teal/green — distinct from our ocean blue family.
- **Headline pattern:** short, declarative, ends with an italic-serif emphasis
  word. Confirmed string in bundle: `"AI Automation Engineer."` with
  surrounding sibling: `"AI Engineer · Builder"` (eyebrow chip above).
- **Subhead:** one sentence, 18–28 words, names *what we build* and *who it's
  for*. Bundle string: `"I build conversion-engineered sites and AI
  automation systems for founders & agencies who want their business to …"`
- **CTA pair:** primary `"Free strategy call"` (solid teal) + secondary
  `" Portfolio"` (ghost outline). Both pulled verbatim from bundle.
- **Layout:** container-bound (not full bleed), asymmetric grid ≈ 1.3:1
  (text left / portrait right), generous vertical padding (~pt-32 / pb-24).
- **Trust signal near hero:** inline single-line chip, NOT a 4-cell stat grid.
  Examples in bundle: `"800+ projects shipped. Most live in 14 days."` —
  numbers + ship-window framing.
- **Image:** real portrait of Yasir, framed card, captioned with name + title
  underlay. Not abstract, not animated mesh.
- **Mobile:** standard stack — portrait hidden / collapsed below text, CTAs
  full-width.
- **No marquee, no parallax, no animated counter, no scroll-cue arrow.**

## 2. Before → After (our hero)

### Before (V3 OCEAN)
- Eyebrow: "Cited by ChatGPT · Claude · Perplexity · Gemini"
- Headline: "Your CRM, calendar, and inbox **never talk to each other.**"
  — single problem-statement framing, no founder presence in copy
- Subhead: 3-clause sentence about n8n + tool replacement
- CTAs: `Wire it up` → /contact, `n8n vs Zapier — honest take` → /n8n-vs-zapier
- Trust: 4-column stat grid INSIDE hero — duplicates the `<Stats>` section
  that renders immediately below it
- Portrait: `waseem-cafe-arch.jpg` (kept the visual pattern)

### After (V4 — Yasir-parity)
- Eyebrow: animated dot + "AI Operator · Built solo from Bali" (live presence)
- Headline: `AI automation, / built by *hand.*` — italic Playfair Display on
  the punch word (the only Yasir-DNA visual import; sits inside our ocean
  gradient palette, no new color)
- Subhead: 1 sentence — "Operator-grade n8n workflows, AEO-ready websites,
  and WhatsApp/CRM stacks — shipped solo in 5–14 days. No SDR, no bot, no
  agency middlemen. Just me at the keyboard." Anti-AI-agency angle locked in.
- CTAs:
  - Primary: **"Book a 30-min strategy call"** → `https://cal.com/waseemnasir/strategy`
    (calendar icon, solid ocean gradient, external link in new tab)
  - Secondary: **"See case studies"** → `/case-studies` (ghost outline, arrow icon)
- Trust chip: single inline line — 5 amber stars + **"Top Rated Plus on
  Upwork"** + **"180+ workflows shipped across 9 countries"**.
  Pulled from `src/app/author/waseem-nasir/page.tsx:101` (`"Top Rated Plus on
  Upwork"`) and `src/lib/site.ts` STATS array. No invented metrics. Wraps to
  two lines on narrow screens.
- Portrait: **`waseem-builder-hero.jpg`** (newly copied — Bali cafe arch
  builder pose, May 6) — fits Yasir's "person at work" composition better
  than the prior cafe-arch headshot.
- **REMOVED:** the 4-stat grid that was duplicated against `<Stats>`
  immediately below. Cleaner. Matches Yasir's single-line-trust pattern.

## 3. Files modified
- `src/components/sections/Hero.tsx` — rewritten (V4 OCEAN, Yasir-parity
  structure, ocean palette retained). Same import surface — page.tsx unchanged.

## 4. Files created
- `public/portraits/waseem-builder-hero.jpg` — copied from
  `C:\Users\info\OneDrive\Desktop\GITHUB\WASEEM IMAGES\PROFESSIONAL\BALI-2026-05-06-cafe-arch-builder-portrait.JPG`.
  2.94 MB, JPG, kebab-case as required.

## 5. Files NOT touched (per constraints)
- `src/app/page.tsx` (only imports Hero — no edit needed; Hero is already extracted)
- `src/app/sitemap.ts`
- `src/app/globals.css` (no new color tokens; ocean palette used as-is)
- `src/lib/site.ts`
- All other sections / routes / metadata / OG / schema

## 6. Build status
`npm run build` — **PASS**
- 870 routes generated (`generateStaticParams` across services / locations /
  case studies / blog all green)
- Only warning is the pre-existing turbopack workspace-root inference
  warning — unrelated to this change
- No TypeScript errors, no lint errors, no missing image / 404 asset warnings

## 7. Mobile mental-model
Under the `md` breakpoint (768px):
- Right column (`.hidden md:block`) collapses — portrait is hidden entirely
  to keep above-the-fold short. (Acceptable on phones; portrait is heavy
  asset, and Yasir's mobile also de-emphasizes it.)
- Left column reflows full-width. Eyebrow → 5xl headline (italic emphasis
  word still renders Playfair) → subhead → CTAs stack vertically with
  `flex-col sm:flex-row` so primary sits on top, secondary below — each
  full-width thanks to `justify-center` + container padding.
- Trust chip wraps to two lines: stars + "Top Rated Plus" on row 1,
  workflows count on row 2. The middle `·` separator is hidden under `sm`.
- Container top/bottom padding scales from `pt-32 pb-24` (mobile) to
  `pt-40 pb-32` (md+) — generous on both.

If we want a mobile portrait later: drop `hidden md:block` and add an
aspect-ratio frame ABOVE the text on small screens. Out of scope for this
ticket.

## 8. What was NOT imported from Yasir (intentional)
- Bricolage Grotesque body font — kept our Lexend system font
- Teal `#288672` brand color — kept ocean `#1E88E5 → #14B8A6` gradient
- "Free strategy call" wording — kept "Book a 30-min strategy call" (more
  specific, matches our cal.com slug)
- Yasir's logistics-tilted positioning — kept our generalist anti-agency
  positioning
- WhatsApp button (Yasir has one) — explicitly excluded per brief

This is structural parity, not visual cloning. Same skeleton, different skin.
