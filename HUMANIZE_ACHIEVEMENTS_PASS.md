# Humanize + Achievements Pass — 2026-05-22

Mission: ship the 1,000+ projects ACHIEVEMENTS story strip and make the
SkynetLabs site read less like a faceless AI agency and more like one
operator (Waseem) actually shipping work from Bali.

---

## Part A — Achievements component

**File:** `src/components/sections/Achievements.tsx` (1–270 lines)

- Client component (animation requires `useEffect` + `useState` for
  IntersectionObserver-triggered count-up — pure server component
  couldn't deliver "big animated count" in the brief).
- Headline: **"1,000+ shipped. Most under one keyboard."**
- Subhead: 1 sentence — "Four years, one operator, one AI cofounder. No
  SDR team, no offshore handoff — just one human stacking work, week
  after week, from a Bali cafe."
- 6-card grid (mobile-first → 1 col → 2 col → 3 col on lg):
  - 320+ Marketing campaigns — `Megaphone`
  - 180+ Branding builds — `Palette`
  - 240+ AI automations — `Bot`
  - 110+ Vibe-coded apps & sites — `Code2`
  - 60+ Chrome extensions — `Puzzle`
  - 90+ Custom plugins — `Wrench`
  - **Sum = 1,000 even** as briefed.
- Each card: gradient icon chip + "Shipped" badge + animated tabular-nums
  count + "+" suffix + label + 1-line context blurb.
- Count animation uses requestAnimationFrame + ease-out cubic, triggered
  only when the section enters the viewport (saves render budget on
  pages where the section is below the fold).
- Below the grid: Waseem photo (`/portraits/waseem-builder-portrait.jpg`,
  freshly copied from the BALI trove) + caption ("Waseem Nasir —
  founder, builder, the one who actually ships.").
- No JSON-LD inside the component — `AggregateOffer` semantics don't fit
  6 ungrouped work-type tallies, and `Quotation` is a stretch for a stat
  card. Page-level schema already covers Person/Organization.
- Lucide icons used via direct imports (matches existing pattern in
  Process.tsx + CTA.tsx, not the dynamic Icons-as-record pattern that
  Services.tsx uses since we have fixed icons).
- Visuals: dark ocean gradient matches Hero/Contact for tonal continuity.
- Accessible: section has `aria-labelledby="achievements-heading"`, h2 is
  labelled, decorative orbs are span elements (not announced).

## Part B — Achievements inserted into pages

**Homepage** — `src/app/page.tsx`
- Import added (line 7).
- Placed `<Achievements />` between `<Testimonials />` and `<FAQ />`.
- Rationale: existing flow goes Hero → Stats (4 small stats) → Services
  → Process → LinkedIn → Testimonials → FAQ → CTA. Stats stays as the
  early reinforcement; Achievements is the "big-picture summary" right
  before the FAQ-then-CTA close. Achievements right before CTA stacks
  two dark-gradient backgrounds awkwardly; placing it before FAQ gives
  the user a stat-impact moment, then the FAQ answers the "but is this
  real?" reflex, then CTA closes.

**About page** — `src/app/about/page.tsx`
- Import added.
- Added a NEW React "Working day" 3-photo strip section AFTER the
  existing `about.html` dangerouslySetInnerHTML block (the HTML can't be
  injected mid-content without rewriting the content file).
- `<Achievements />` placed after the photo strip.
- Final order: schema → about HTML → working-day 3-photo strip →
  achievements.

**Services + Contact + other pages** — untouched per brief.

## Part C — Waseem photos site-wide

### Already in place (no edits required)
- **Homepage hero** — `/portraits/waseem-builder-hero.jpg` (parallel
  agent updated Hero.tsx to V4 Yasir-parity layout — already references
  a Waseem builder portrait in a right-column frame with caption
  "Waseem Nasir — Founder · Automation operator". Did not touch.)
- **Contact hero** — `/portraits/waseem-bluepolo.jpg` (already there
  with "Available now" badge + caption).
- **Author page** — `/author/waseem-nasir` already photo-rich via the
  `author-waseem-nasir.html` content (left untouched — out of scope and
  HTML rewrite would be invasive).

### Added
- **About page 3-photo strip** ("A working day"):
  - `/portraits/waseem-cafe-arch.jpg` — "8:14am, Canggu cafe. The third
    coffee of the day, the first deploy."
  - `/portraits/waseem-poolside-laptop.jpg` — "After the n8n migration
    finally goes green. The grin is honest."
  - `/portraits/waseem-rooftop-smile.jpg` — "Rooftop in Pererenan.
    End-of-Friday ship. Phone's on Do Not Disturb."
- **Achievements section photo** — `/portraits/waseem-builder-portrait.jpg`
  (NEW file, copied from `WASEEM IMAGES/PROFESSIONAL/BALI-2026-05-06-cafe-arch-builder-portrait.JPG`).

### Images copied
```
src: C:\Users\info\OneDrive\Desktop\GITHUB\WASEEM IMAGES\PROFESSIONAL\BALI-2026-05-06-cafe-arch-builder-portrait.JPG
dst: app/public/portraits/waseem-builder-portrait.jpg  (2.8 MB)
```
The other photos referenced were already in `public/portraits/`.

## Part D — Anti-AI-agency tone audit

The site copy is already remarkably human. Hero V4, Testimonials,
Process, FAQ, About HTML, Contact all read like Waseem wrote them in a
cafe. Found only one real offender to swap:

| File | Before | After |
| --- | --- | --- |
| `src/components/sections/Brands.tsx` (l. 8) | `Trusted by founders + powered by industry stacks` | `Paid out, deployed on, shipped with — the boring stacks I actually use` |

Other phrases scanned and intentionally LEFT alone because they're already in Waseem's voice (not robot-speak):
- "Operator-grade n8n workflows" (Hero) — operator is a Waseem brand word, kept.
- "Built solo in Bali" — already first-person voice.
- "AEO-tuned content engine" — accurate technical jargon, not marketing fluff.
- "AI Automation Agency for Founders Who Refuse to Be Average"
  (`site.ts` tagline) — site.ts flagged as "DO NOT touch STATS array"
  but tagline is metadata-adjacent and another agent is editing site.ts
  in parallel. Left as-is to avoid collision.

5–10 swap budget not used; the site didn't need it. 1 swap shipped.

## Constraints honored

- Did NOT touch metadata (titles, descriptions, OG) in any page.
- Did NOT touch `src/lib/site.ts` (STATS or otherwise).
- Did NOT touch `src/app/sitemap.ts`.
- Did NOT touch service pages or case-studies pages.
- Did NOT touch Hero.tsx (parallel agent currently editing — detected
  uncommitted changes mid-pass).
- Did NOT commit anything.

## Build status

```
> next build (Next.js 16.2.6 + Turbopack)
✓ Compiled successfully in 5.8s
✓ TypeScript clean (4.4s)
✓ 871 static pages generated
```

Routes affected: `/` and `/about`. Both render the new Achievements
section + (about) the working-day photo strip without errors.

## Files touched

**Created:**
- `src/components/sections/Achievements.tsx`
- `public/portraits/waseem-builder-portrait.jpg`
- `HUMANIZE_ACHIEVEMENTS_PASS.md` (this report)

**Edited:**
- `src/app/page.tsx` (+2 lines: import + insertion)
- `src/app/about/page.tsx` (+2 imports, +1 const block, ~50 lines inline
  photo-strip JSX, +1 Achievements insertion)
- `src/components/sections/Brands.tsx` (1-line copy swap)
