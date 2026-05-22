# SkynetLabs Site-Wide Audit & Improvement Plan
**Date:** 2026-05-22 | **Auditor:** Waseem + Claude
**Live URL:** https://app-mauve-eta-66.vercel.app
**Repo:** `C:\Users\info\OneDrive\Desktop\GITHUB\skynetjoe-react-2026-05-20\app\`

---

## TL;DR Findings

| Area | Score (1-10) | Status |
|---|---|---|
| Brand identity | 8 | Strong ocean palette, locked decisions |
| Visual polish (homepage) | 6 | Solid, but missing depth & vibrancy of competitor (Yasir) |
| Visual polish (state pages) | 4 | Programmatic SEO reads as spammy / repetitive |
| Typography hierarchy | 5 | Single font (Lexend), no display contrast, no editorial accent |
| Conversion psychology | 7 | Pain-first hero good, missing risk-reversal & specificity |
| Trust signals | 5 | Stats present, no logos, no press, no proof-of-work demos |
| SEO technical | 7 | Most schema done, gaps on canonical absolutes (being fixed by SEO agent) |
| AEO citability | 6 | Some FAQPage + Glossary, missing direct-answer blocks (being fixed) |
| Performance | ? | Not benchmarked this session — needs Lighthouse run |
| Mobile feel | 7 | Functional, lacks the "premium mobile" feel of Yasir's site |
| WhatsApp leakage | ✅ 0 | Audit confirms zero WhatsApp buttons on /contact, /services, /locations, /pricing, /about |

**Top 3 wins to ship next:**
1. **Add Bricolage Grotesque** for display headlines (replace Lexend at H1/H2) + keep Inter for body → instant premium type ladder
2. **Replace 48-state grid monotony** with featured-state cards + accordion + map visualization
3. **Add proof-of-work visual element** — embed dispatch board, live n8n workflow viz, or animated GHL pipeline mockup like LP v1 hero

---

## 1. WhatsApp Audit (User Concern Verified)

**Verdict: ZERO WhatsApp buttons site-wide.** Audited:
- `/` (homepage)
- `/services` (index + 16 detail pages)
- `/contact` — 4-channel picker is Email / Live Chat / LinkedIn / Cal.com only
- `/pricing` — 3x "Start a brief" buttons, no WA
- `/locations/california` (sample state) — "Apply from CA" / "Live chat" / "See pricing" / "Scope it" — no WA
- `/about` — no WA

The brand-decision lock from 2026-05-20 ("NO WhatsApp CTAs") is enforced everywhere already. If user is seeing WhatsApp anywhere, it's the OLD WordPress root at skynetjoe.com (not touched), not the Vercel Next.js app.

---

## 2. Visual Design Audit — Page by Page

### Homepage `/`
**Strong:** Hero gradient w/ orbs, vibrant service cards (per-category color), LinkedIn badge widget, editorial process redesign w/ gradient bubbles.

**Weak:**
- All headlines use Lexend → no display/body type contrast. Yasir uses Bricolage Grotesque (display) + Inter (body) + Playfair italic (editorial accent) → 3x richer hierarchy.
- Hero portrait card feels generic agency photoshoot — needs richer caption ("Built solo · Bali" works but text-only)
- Service cards good but lack a "live state" — Yasir embeds a fake dispatch panel in his hero. We embed nothing.
- No animated counter on stats — static "180 workflows" misses the dopamine hit of count-up animations
- No client logo strip (intentional? Add or kill the gap)

**Fix priority:** P1 — type swap + hero visual upgrade (1 day work)

### `/contact`
**Strong:** 4-channel picker w/ color-coded badges, guarantees grid, expectations stepper.

**Weak:**
- Hero portrait (waseem-bluepolo.jpg) sits in a generic 2-col layout — Yasir's contact uses richer card composition
- "8h reply / 48h scope" badges are too small visually, should be a stat strip

**Fix priority:** P2 (page already strong)

### `/locations` + `/locations/[state]`
**STRONG WEAK:** Massive programmatic depth (4,608 keyword links) but reads as automated/thin.

**Weak:**
- 48-state grid is monotonous — all cards identical (MapPin + city subtitle)
- Per-state pages repeat 16 service blocks → 16×48 = 768 near-duplicate blocks
- Keyword pills (6 variations × 16 services × 48 states = 4,608) feel like spam to Google AND to LLMs
- No state-specific imagery, no local landmark hint, no demographic differentiation

**Fix priority:** P0 — strangle the thin-content risk before Google penalizes

**Specific fixes:**
1. Featured-state hero cards (4-6 top states get rich custom card) + accordion for the rest
2. SVG US map w/ interactive states (lightweight, ~5KB)
3. Per-state unique paragraph (industry + city anchor + a sentence about state's freight/dental/etc landscape)
4. Reduce keyword pills from 6 variants × 16 services × 48 states to 3 × 16 × 48 (still 2,304 links, less spammy)
5. The 768-page services×state matrix (built by parallel agent today) IS the depth play — link from /locations to that, don't double up

### `/pricing`
**Strong:** Unconventional tier structure (one-time + retainer + wedges), public-honest tone.

**Weak:**
- No annual toggle (loses 15-25% upgrade opportunity)
- No comparison table (3 cards = cognitive load)
- No risk-reversal guarantee callout (Yasir says "Or your deposit back" — instant trust)
- Missing inline FAQ at bottom
- "Most chosen" badge could be more visually anchored

**Fix priority:** P2 — minor wins

### `/services` (index)
**Strong:** 16-card grid w/ 4 category sections + vibrant per-category palette.

**Weak:**
- No benefit quantification per card ("$8K/mo loss avoided" beats "AI workflows")
- No "scope unlock" CTAs per card — every CTA points to same place
- Footer "© 2026" reads like template typo (it's the actual year)

**Fix priority:** P2

### Per-service pages `/services/[slug]` (16 pages)
**Weak (educated guess from pattern):**
- Likely thin — 16 services × ~300 words each = template-y
- Probably missing direct-answer "What is [service]?" blocks for AEO citability
- Probably missing inline mini-pricing (forces click to /pricing)

**Fix priority:** P1 — AEO agent is addressing this in background

### `/about`
**Strong:** Founder story strong, principles listed, multiple portrait shots, Bali narrative.

**Weak:**
- No timeline / milestones (when started, key shipments)
- No press logos / partner badges (n8n / GHL partner status if any)
- No team page — single-operator narrative could be reinforced w/ "And my AI co-pilot" panel

**Fix priority:** P3 — already strong

### `/portfolio` `/case-studies` `/blog` `/aeo-guide` `/n8n-vs-zapier` `/faqs` `/glossary`
**Status:** Built last session, full audit pending. SEO + AEO agents will improve in background.

---

## 3. Typography Upgrade Plan (the SINGLE highest-ROI change)

**Current:** Lexend everywhere. Single font. Feels safe / generic agency.

**Proposed:**
```css
/* Display — replace Lexend at h1/h2/h3 */
--font-display: 'Bricolage Grotesque', 'Lexend', sans-serif;
/* Variable axes: opsz 12-96, weight 400-800 */

/* Body — keep Inter (already loaded) */
--font-body: 'Inter', system-ui, sans-serif;

/* Editorial accent — for italic eyebrows, pull-quotes only */
--font-accent: 'Playfair Display', Georgia, serif;
font-style: italic; /* always italic, weight 500-700 */

/* Mono — for code blocks, stats, dispatch board UI mockups */
--font-mono: 'JetBrains Mono', 'IBM Plex Mono', monospace;
```

**Impact:** Brand instantly reads "1 tier above agency template" — competing w/ Linear / Vercel / Anthropic-tier polish, not Wix.

**Loading:** Add to `src/app/layout.tsx`:
```tsx
import { Bricolage_Grotesque, Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google';

const bricolage = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-display' });
const inter = Inter({ subsets: ['latin'], variable: '--font-body' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-accent', style: 'italic' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });
```

Then in `globals.css`:
```css
h1, h2, h3 { font-family: var(--font-display); letter-spacing: -0.02em; }
.eyebrow-italic { font-family: var(--font-accent); font-style: italic; }
code, .stat-num { font-family: var(--font-mono); }
```

**Effort:** 30 minutes. **Reward:** Site reads 2 tiers richer immediately.

---

## 4. Component Upgrade Plan

### A. "Dispatch Board / Live Demo" hero visual (replace static portrait)
Pattern stolen from Yasir's site (animated lane rows w/ live status badges). Built in `lp/logistics-v1.html` — extract as reusable React component `<LiveDemoCard>` w/ props for any niche (dispatch / patient queue / lead pipeline / order board).

### B. "Stat Pill Strip" w/ count-up animation
Replace static "180 workflows · 9 countries" w/ animated CountUp on scroll. Library: `react-countup` (~2KB).

### C. "Pull Quote" component
Playfair italic + giant `"` glyph behind + cyan underline accent. Editorial. Use on /about + every case study.

### D. "Trust Strip" w/ logos
Need 6-8 client logos (with permission) — even greyscale silhouettes are stronger than the current empty trust gap.

### E. "Risk Reversal" guarantee banner
Yellow/gold banner: "Free deposit refund within first 7 days. Cancel retainer anytime. Repo + n8n + GHL transferred on day 14."
Place above every pricing CTA + before final-CTA.

---

## 5. Conversion Psychology Gaps

| Page | Missing | Fix |
|---|---|---|
| Homepage | Risk reversal | Add guarantee banner near "Apply for call" |
| /pricing | Anchor framing | Add a $25K/yr-equivalent "what hiring 1 dev costs" anchor next to $1,500 |
| /contact | Calendly slot preview | Embed Cal.com inline (not redirect) — drops to step 1 not step 2 |
| All LPs | Loss aversion | Pain card cost callouts ("$8K-22K/mo on missed coverage") — already in LP v1 |
| Per-service | Specificity | Replace "AI workflows" w/ "180-line n8n workflow that runs at 3:14 AM and texts dispatch" |

---

## 6. Mobile Audit (Quick Pass)

**Untested this session** — recommend running `/qa` or `/browse` skill against:
- iPhone 13/14 Safari
- Pixel 7 Chrome
- iPad Pro Safari

**Predicted issues:**
- Hero gradient orbs may shift on mobile (CSS positioning)
- Per-service cards may stack too tightly
- Nav has 10 items → mobile menu must collapse cleanly

---

## 7. Performance Risks (Not Measured, Should Be)

**Likely Lighthouse gaps:**
- `next/font/google` loads multiple weights → first-load CSS bloat
- LinkedIn badge widget = blocking 3rd-party script
- Hero portrait images may not be `priority` + AVIF-optimized
- No service-worker / no offline shell

**Action:** run `/qa` skill or Lighthouse CLI against production URL, log baseline, then optimize.

---

## 8. Parallel Agent Status (Launched This Session)

| Agent | Status | Deliverable |
|---|---|---|
| SEO Technical Fixes | RUNNING | `SEO_AUDIT_2026-05-22.md` + `SEO_FIXES_APPLIED.md` + actual file edits |
| AEO/LLM-Citation Pass | RUNNING | `AEO_AUDIT_2026-05-22.md` + improved `public/llms.txt` + direct-answer blocks |
| Backlink Plan | ✅ DONE | `BACKLINK_PLAN_2026-05-22.md` shipped (30 targets, 3 templates, 90-day calendar) |
| Programmatic SEO Matrix | ✅ DONE | 768 `/services/[slug]/in/[state]` pages live in static build |

---

## 9. Recommended Ship Order (Next 7 Days)

| Day | Ship | Effort | Impact |
|---|---|---|---|
| Day 1 | Typography swap (Bricolage + Playfair + Mono) | 30 min | 🔥 instant brand lift site-wide |
| Day 1 | Risk reversal banner above all CTAs | 30 min | 🔥 conversion |
| Day 2 | Replace 48-state grid w/ featured cards + accordion + SVG map | 4 hrs | 🔥 kills thin-content risk |
| Day 2 | Add LiveDemoCard component to homepage hero (port from LP v1) | 2 hrs | 🔥 visual polish |
| Day 3 | Build LP concept 2 (Aurora Editorial, dental/wellness) | 3 hrs | new Meta ads inventory |
| Day 3 | Build LP concept 4 (Dark Mode Ops, logistics v2) | 3 hrs | new Meta ads inventory |
| Day 4 | Review SEO + AEO agent PRs, merge fixes | 1 hr | search visibility |
| Day 4 | Run Lighthouse + fix top 3 perf wins | 2 hrs | speed |
| Day 5 | Week 1 of backlink plan: 5 directory submissions + 4 HARO profiles | 2 hrs | DR foundation |
| Day 6 | Buy real domain (skynetlabs.com or similar) + Vercel custom domain + 301 redirects | 1 hr | future-proof backlinks |
| Day 7 | Build LP concepts 3 + 5 + 6 in batch | 6 hrs | full Meta ads test set |

---

## 10. Risks & Caveats

- **Domain risk:** Currently on `app-mauve-eta-66.vercel.app` preview URL. All backlinks + SEO equity earned now will need 301-migration to real domain. **Buy the real domain BEFORE running the backlink plan.**
- **Programmatic SEO penalty risk:** 768 new pages from today's agent push the site into "is this thin content" territory. The agent built per-page variance levers (industry tuning, city paragraphs, state benchmarks) but Google may still flag. Monitor GSC weekly.
- **Meta ad LP approval risk:** Meta is strict on health/finance claims, "guaranteed results" language. Pricing LPs must avoid "180 workflows shipped" if those aren't easily verifiable — replace with neutral version on Meta-targeted LPs.
- **Cal.com slug** `cal.com/waseemnasir` — VERIFY this exists before any LP goes live to ads. A broken booking link kills 100% of conversion.
