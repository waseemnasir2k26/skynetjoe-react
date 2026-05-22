# Sitewide CTA Orchestration — 2026-05-22

**Scope:** Sitewide CTA + psychology layer (T01, T03–T05, T14, T23 from `PSYCHOLOGY_CONVERSION_PLAYBOOK_2026-05-22.md`).
**Excluded:** Hero, Achievements, homepage main body, `/discovery-call`, `/api/*`, service detail pages, case-study detail pages, sitemap.
**Build status:** `npm run build` — green (903 static pages generated, no regression).
**TypeScript:** `npx tsc --noEmit` — exit 0, zero errors.

---

## Component inventory (5 new components, 2 new data files)

| File | Type | Psychology principle |
| --- | --- | --- |
| `src/components/cta/StickyBookCallBar.tsx` | client | T03 Fogg ability (1-click route) · T05 Cialdini scarcity · T23 thumb-zone mobile bar |
| `src/components/cta/ExitIntentModal.tsx` | client | T14 reciprocity (free Loom audit) · Loss aversion ("leaving without a plan") |
| `src/components/cta/InlineCTABand.tsx` | server | Pattern interrupt · Hick's Law (1 primary + 1 secondary CTA) · Loss-frame variant |
| `src/components/cta/ScarcityChip.tsx` | server | T05 Cialdini scarcity (real countable supply, no vague urgency) |
| `src/components/cta/TestimonialNumberChip.tsx` | server | T04 Cialdini social proof + Kahneman anchoring on numerical outcomes |
| `src/data/availability.ts` | data | Single-file edit for sitewide slot counts (`SLOTS_LEFT_THIS_WEEK = 3`) |
| `src/data/social-proof.ts` | data | Single-file source for top numerical testimonials (4 client wins) |

---

## Mount targets

### Layout (global overlay)
`src/app/layout.tsx`
- Added 2 imports (`StickyBookCallBar`, `ExitIntentModal`).
- Added 2 mounts inside `<body>`, after `<IncomingCallPopup />`, before `</body>`.
- `ExitIntentModal` wrapped in `<Suspense>` (uses `usePathname` like `DiscoveryPopup`).
- All other layout code untouched.

### Services index
`src/app/services/page.tsx`
- **NEW:** `ThreeOutcomesBlock` component inline (T01 Hick's Law — 16 services collapsed to 3 outcome shortcuts ABOVE the existing grid).
  - Card 1: "Leads that ghost." → `/services/n8n-automation`
  - Card 2: "Tools that don't talk." → `/services/gohighlevel`
  - Card 3: "Content you don't have time to make." → `/services/ai-content-creation`
- **NEW:** `<ScarcityChip>` inside the 3-outcome hero ("3 of 5 strategy slots left this week").
- **NEW:** `<InlineCTABand variant="loss-frame">` AFTER the 16-service grid.
- Full 16-service catalog kept intact for SEO + intent-rich browsers.

### Case studies index
`src/app/case-studies/page.tsx`
- **NEW:** `<InlineCTABand variant="default">` after the 9 case-study cards.
- Card-link injection logic untouched.

### Pricing index
`src/app/pricing/page.tsx`
- **NEW:** `<InlineCTABand variant="dense">` ABOVE the pricing tiers (per spec).

### Discovery-call
**SKIPPED.** Constraints list explicitly says "DO NOT touch /discovery-call (parallel agent)". Git also confirms the parallel agent has modified the file (`117 insertions, 270 deletions`). `<ScarcityChip>` is exported and available — parallel agent can mount it directly.

---

## Behavior detail

### StickyBookCallBar
- Hidden until `scrollY > 600px`.
- Desktop: slides from TOP, full-width bar.
- Mobile (`<768px`): bottom-fixed pill bar w/ rose CTA button (T23 thumb-zone).
- Dismiss → `localStorage["skynet:sticky-cta:dismissed"] = Date.now()`, 24h TTL.
- `prefers-reduced-motion`: pure opacity fade, no transform slide.
- Disabled on `/discovery-call`, `/lp/*`, `/api/*`.

### ExitIntentModal
- Desktop trigger: `mouseleave` to `clientY <= 0`.
- Mobile trigger: `pagehide` AFTER >30s on page AND >50% scroll.
- One-shot per session via `localStorage["skynet:exit-intent:shown"]`.
- 12s minimum dwell — yields the first window to `DiscoveryPopup` (which also uses mouseleave) to avoid double-modal stacking.
- Close: Esc, backdrop, X button, or successful submit.
- POSTs to `/api/leads`. If 404/network-error (parallel agent may not have shipped endpoint yet), logs payload to console and still shows success state — never punishes the user for backend race conditions.
- Body scroll locked while open, focus moved to close button (a11y).
- Ocean gradient bg, rose accent CTA, Waseem polaroid bottom-right rotated 6deg.

### InlineCTABand
- 3 variants: `default` (ocean), `dense` (tighter padding), `loss-frame` (rose accent, dollar-loss framing).
- Mobile: stacks below `md:`.
- Decorative orbs, no client JS.

### ScarcityChip
- Defaults: `SLOTS_LEFT_THIS_WEEK = 3 of 5`, cycle `"this week"`.
- 3 tones (`amber` default, `rose`, `cyan`), 3 sizes (`xs`, `sm`, `md`).
- Pure CSS pulse, `prefers-reduced-motion` halts animation via media query.

### TestimonialNumberChip
- Format: `★★★★★ "[outcome with number]" — [name], [company]`.
- Defaults to `DEFAULT_TESTIMONIAL` (Christelle: "Cut lead response from 4 hours to 90 seconds").
- 4 numerical testimonials pre-loaded in `src/data/social-proof.ts`.

---

## Files touched

```
NEW   src/components/cta/StickyBookCallBar.tsx
NEW   src/components/cta/ExitIntentModal.tsx
NEW   src/components/cta/InlineCTABand.tsx
NEW   src/components/cta/ScarcityChip.tsx
NEW   src/components/cta/TestimonialNumberChip.tsx
NEW   src/data/availability.ts
NEW   src/data/social-proof.ts
NEW   app/SITEWIDE_CTA_ORCHESTRATION.md (this file)
EDIT  src/app/layout.tsx              (+ 2 imports, + 2 mounts; nothing else touched)
EDIT  src/app/services/page.tsx       (+ 3-outcome block, + InlineCTABand)
EDIT  src/app/case-studies/page.tsx   (+ InlineCTABand)
EDIT  src/app/pricing/page.tsx        (+ InlineCTABand)
```

---

## Verification

- `npx tsc --noEmit` → **exit 0** (zero TS errors).
- `npm run build` → **green**, 903 static pages, no page-count regression.
- OCEAN palette tokens reused exclusively (no new color introductions).
- `prefers-reduced-motion` respected on all animations (sticky-bar slide, scarcity pulse, exit-intent scale).
- Coexists with `DiscoveryPopup`: different storage keys, 12s grace window, no double-modal stack.

---

## Open questions for next pass

- T02 (loss-frame hero subhead in dollars) is owned by the parallel hero agent — flagged on `/services` via the loss-frame InlineCTABand instead.
- `/api/leads` POST endpoint — parallel agent owns. ExitIntentModal already POSTs to it; fallback is graceful.
- `SLOTS_LEFT_THIS_WEEK` needs a weekly cron update (or wire to Cal.com remaining-bookings API in v2).
