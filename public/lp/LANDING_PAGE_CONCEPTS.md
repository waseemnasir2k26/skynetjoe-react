# SkynetLabs Landing Page Concepts — 5 Distinct Designs for Meta Ads

**Use case:** Meta ads → standalone landing pages at `/lp/<slug>.html`
**Built v1:** `logistics-v1.html` — Yasir-clone (teal + Bricolage Grotesque + dispatch-card hero)
**This doc:** 5 ADDITIONAL design directions, each tuned to a different niche/buyer archetype.

Each concept = ready-to-build spec: palette, fonts, hero composition, section list, copy hook, CTAs, JSON-LD plan. Pick which to build first.

---

## Concept 2 — "AURORA EDITORIAL" (Wellness / Dental / Aesthetics)

**Vibe:** Apple-grade editorial. Magazine spreads. Slow & confident.
**Niche fit:** Dental clinics, med-spas, aesthetic clinics, high-ticket wellness ($3K-15K patient LTV)
**Buyer:** Clinic owner, female-skewed, design-sensitive, mistrusts "marketing agency" feel

**Palette:**
- Primary cream: `#FAF8F3`
- Ink dark: `#1A1814`
- Accent rose: `#D4838B`
- Accent sage: `#7C9885`
- Gold thread: `#C4A661`

**Fonts:**
- Display: **Fraunces** (variable, opsz, soft serif w/ optical sizing — Apple-style)
- Body: **Inter** 400/500
- Accent script: **Pinyon Script** for one signature flourish (eyebrow only)

**Hero:**
```
┌─────────────────────────────────────────────────────────────┐
│  [Cream bg, soft grain texture]                             │
│                                                             │
│   ─── Built for clinics with full chairs                   │
│                                                             │
│   Your no-show rate                                         │
│   is a CRM problem,                                         │
│   not a patient problem.                                    │
│   ───────────────                                           │
│   We rebuild it in 14 days.                                 │
│                                                             │
│   [ Book audit ]  [ See dental case study ]                │
│                                                             │
│                              [Big polaroid-style photo:     │
│                               clinic interior w/ patient    │
│                               + iPad showing GHL pipeline]  │
└─────────────────────────────────────────────────────────────┘
```

**Sections (in order):**
1. Hero (above)
2. "Read in 90 seconds" bio bar — 3 stats, editorial font
3. Pull-quote testimonial (Pinyon Script accent on author name)
4. "The system" — 3 cream cards w/ sage ribbons + tiny gold serial numbers (CASE 001 / 002 / 003)
5. Case-study magazine spread (full-bleed photo + 2-column body type)
6. Pricing — 3 stacked rows (not 3 columns), feels like a typeset menu
7. FAQ — editorial accordion w/ italic Fraunces questions
8. Final CTA on cream w/ rose underline accent + 1 button only

**Conversion psychology:** under-design beats over-design for high-trust health buyers. Cream + serif + lots of whitespace = "premium clinic" not "marketing bro."

**Schema:** Service + Article + FAQPage + LocalBusiness (if geo-targeted)

---

## Concept 3 — "BRUTALIST GRID" (B2B SaaS / Dev tools / Tech founders)

**Vibe:** Vercel × Linear × Stripe. Pure information density. No marketing fluff.
**Niche fit:** SaaS founders, dev tool buyers, ops-heavy founders ($1K-10K MRR-tier)
**Buyer:** Technical, skims, hates "Schedule a discovery call to learn more"

**Palette:**
- Pure white `#FFFFFF`
- Pure black `#000000`
- Hot lime `#84CC16` (single accent, used for 1 stat + 1 button only)
- Cool gray scale: `#FAFAFA #F4F4F5 #E4E4E7 #71717A #18181B`

**Fonts:**
- Display: **Geist** (or **JetBrains Mono** for one hero word)
- Body: **Geist Sans** 400/500
- Mono: **Geist Mono** for code blocks + stat numbers

**Hero:**
```
┌─────────────────────────────────────────────────────────────┐
│ [Pure white, 1px borders, no shadow, no orb]               │
│                                                             │
│  Replace 4 SaaS tools.                                      │
│  Cancel 4 subscriptions.                                    │
│  Own the stack.                                             │
│                                                             │
│  $0 install. From $1,500 build.                            │
│                                                             │
│  ┌──────────────────────────────┐                          │
│  │  [black] Start a brief →     │                          │
│  └──────────────────────────────┘                          │
│                                                             │
│ ─────────────────────────────────────────────────────────  │
│  $4,200 saved/yr · 14 days to live · 9 countries shipped   │
│  ─── stat row in JetBrains Mono ───                        │
└─────────────────────────────────────────────────────────────┘
```

**Sections (in order):**
1. Hero (above) — no images, type only
2. "Tools you cancel" — actual SaaS logos in 1px grid w/ strikethrough overlay
3. Stack comparison table — your stack (3 rows) vs typical (12 rows) side-by-side
4. Live build dashboard mockup — terminal-style w/ green text on dark bg
5. Pricing — table, not cards, 1px borders, mono prices
6. Testimonial — stark quote in mono w/ avatar circle only
7. FAQ — left-aligned, no accordion, just headers + body
8. Final CTA — 1 lime button on white. That's it.

**Conversion psychology:** Anti-design IS the design. Tech buyers read "premium polish" as "agency overhead I'm paying for."

**Schema:** Service + SoftwareApplication + ComparisonTable (Microdata)

---

## Concept 4 — "DARK MODE OPS" (Logistics v2 / Trucking / Manufacturing)

**Vibe:** Mission control. Bloomberg terminal energy. Real-time data.
**Niche fit:** Logistics, manufacturing ops, trucking fleets, warehouses — ops-floor buyers
**Buyer:** COO / Ops Director, wants to see "the system" not "the brand story"

**Palette:**
- Deep ink: `#0A0E14`
- Panel dark: `#11161E`
- Border subtle: `#1F2937`
- Cyan emissive: `#22D3EE`
- Amber warn: `#FBBF24`
- Green ok: `#4ADE80`
- Red alert: `#F87171`

**Fonts:**
- Display: **Space Grotesk** 600/700 (sharp, ops-floor)
- Body: **Inter** 400
- Mono: **IBM Plex Mono** for data + numbers

**Hero:**
```
┌─────────────────────────────────────────────────────────────┐
│ [Dark #0A0E14, very faint cyan grid bg]                    │
│                                                             │
│  ◉ SYSTEM ONLINE · 2026-05-22 11:42:08 UTC                 │
│                                                             │
│  Your ops floor                                             │
│  shouldn't run on                                           │
│  WhatsApp screenshots.                                      │
│                                                             │
│  [ ▸ Open live demo ]  [ View source ]                     │
│                                                             │
│              ┌──────────────────────────────────────┐      │
│              │ DISPATCH BOARD · LIVE                │      │
│              │ ─────────────────────────────────    │      │
│              │ LOAD 4471 │ DAL→PHX │ $2,840 │ ✓    │      │
│              │ LOAD 4472 │ ATL→MIA │ $1,920 │ ⚠    │      │
│              │ LOAD 4473 │ HOU→NOL │ $1,450 │ ✓    │      │
│              │ LOAD 4474 │ CHI→DEN │ $3,210 │ ⚠    │      │
│              └──────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

**Sections:**
1. Hero w/ live-feeling dispatch panel
2. "Modules online" — 6 metric tiles in 3x2 grid (Bloomberg-style)
3. Architecture diagram — full-bleed schematic of the system
4. Live console feed mockup — scrolling log of system events
5. Pricing — 3 ops-tier panels w/ MTTR/uptime stats per tier
6. SLA panel — your guarantees as a stat table
7. Final CTA — single button: "Open the demo →"

**Conversion psychology:** Ops buyers trust dashboards over slogans. Show the cockpit.

**Schema:** Service + SoftwareApplication + Dataset (per metric)

---

## Concept 5 — "GRADIENT BRUTALIST" (Real Estate / Hospitality / Lifestyle Brands)

**Vibe:** Maven AI × Linear × Stripe Sessions. Loud gradients on white. Confident.
**Niche fit:** Real estate teams, hotel groups, lifestyle DTC, premium consumer services
**Buyer:** Marketing director or founder, design-aware, wants "agency that gets brand"

**Palette:**
- White base `#FFFFFF`
- Hero gradient: `linear-gradient(135deg, #FF6B9D 0%, #FFA07A 30%, #FCD34D 60%, #5EEAD4 100%)` (sunset → mint)
- Ink: `#0F0F1A`
- Soft surfaces: `#FFF1F5`, `#FFFAEC`, `#F0FBF9`

**Fonts:**
- Display: **Migra** or **Tobias** (high-contrast didone-like)
- Body: **Inter** 400
- Accent: **Roboto Mono** for stats only

**Hero:**
```
┌─────────────────────────────────────────────────────────────┐
│ [White bg, huge angular gradient blob top-right]           │
│                                                             │
│  ─── Built for brands                                       │
│      that aren't average                                    │
│                                                             │
│  We build the                                               │
│  ▌rare websites    [← gradient sweep on this word]         │
│  that buyers screenshot.                                    │
│                                                             │
│  [ gradient pill: Start a brief → ]                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Sections:**
1. Hero w/ giant gradient blob + 1 standout headline
2. Showcase carousel — 5 client mockups, slide w/ gradient backdrop
3. "What we mean by rare" — 3 cards each w/ a different gradient corner
4. Process — vertical timeline w/ gradient dot connectors
5. Pricing — 3 gradient-edged cards, hover lifts
6. Testimonial — pull-quote w/ gradient underline
7. Final CTA — gradient panel full-bleed, white button center

**Conversion psychology:** Premium consumer-brand buyers buy AESTHETIC first. Gradient says "I get brand."

**Schema:** Service + CreativeWork + Brand

---

## Concept 6 — "TERMINAL HACKER" (DevOps / Indie Hackers / Open-Source Audience)

**Vibe:** GitHub README. Old-school. Bullshit-allergic.
**Niche fit:** Indie hackers, devs, OSS maintainers, self-hosters, "I'll just build it myself" archetype
**Buyer:** Technical solo founder, $0-2K MRR, browses HN, hates marketing copy

**Palette:**
- Cream paper: `#F5F1E6`
- Ink: `#1A1A1A`
- Terminal green: `#00AA55`
- Red alert: `#CC0000`
- Single underline-blue link color: `#0033CC`

**Fonts:**
- Display: **Berkeley Mono** OR **JetBrains Mono** 700
- Body: **JetBrains Mono** 400
- That's it. One font family. Mono everywhere.

**Hero:**
```
┌─────────────────────────────────────────────────────────────┐
│ [Cream bg, all monospace, no images]                       │
│                                                             │
│  $ skynetlabs --help                                       │
│                                                             │
│  USAGE                                                      │
│    skynet ship [target] [--days=N]                         │
│                                                             │
│  DESCRIPTION                                                │
│    Ship the system your team would've built                │
│    if they had 6 more months and 2 more devs.              │
│                                                             │
│  EXAMPLES                                                   │
│    $ skynet ship freight-portal --days=14                  │
│    ✓ shipped at $5,500                                     │
│                                                             │
│    $ skynet ship ai-dispatcher --days=14                   │
│    ✓ shipped at $5,500                                     │
│                                                             │
│  [ run --start-brief ]    [ docs ]                         │
└─────────────────────────────────────────────────────────────┘
```

**Sections:**
1. Hero — terminal-style above
2. "INSTALL" section — pricing as bash install commands w/ comments
3. "MODULES" — 3 ASCII boxes for each module
4. "CHANGELOG" — release-note format for case studies (v0.1.0 → shipped freight portal)
5. "TROUBLESHOOTING" — FAQ as terminal Q&A
6. "EXIT 0" — final CTA, single underlined link "→ brief.sh"

**Conversion psychology:** Indie hackers screenshot this & share. Anti-marketing IS the marketing.

**Schema:** Service + SoftwareApplication + DiscussionForumPosting (for the changelog blocks)

---

## Build Order Recommendation

For Meta ads testing, build in this order to A/B fast:

1. **logistics-v1.html (Yasir-clone)** ✅ DONE — broad market, premium feel
2. **Aurora Editorial** → for dental + wellness + clinic audiences (highest LTV)
3. **Dark Mode Ops** → logistics v2 (test against v1 for freight buyers)
4. **Brutalist Grid** → SaaS founder targeting
5. **Gradient Brutalist** → real estate + lifestyle
6. **Terminal Hacker** → indie hacker / dev tool audiences

Each LP = standalone HTML in `/public/lp/` — share via Meta ad direct URL. Add Meta Pixel + GA4 via UTM param. Test 3 LPs per ad set, kill bottom 2 after 200 clicks.

---

## Shared Conversion Rules Across ALL 6 Concepts

1. **Above-fold CTA** — always visible w/o scroll on mobile
2. **No WhatsApp** — Cal.com or email only (per locked brand decision)
3. **One primary CTA repeated 3-4x** — same wording, never variant per scroll position
4. **Pain → product → proof → price → ask** — never violate this order
5. **Trust strip in hero** — stars + count + geo ("180+ workflows · 9 countries")
6. **Schema must include Service + FAQPage minimum** — every LP
7. **Page weight ≤ 200KB** — Meta ads die on slow LPs
8. **OG image bespoke per LP** — same brand, different hook
9. **Inline critical CSS, no external dep** — single-file deploy
10. **A11y: 4.5:1 contrast minimum, all CTAs ≥44px tap target** — required for Meta ad approval
