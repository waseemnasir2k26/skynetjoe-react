# PAGE-TRACKER — Full-Site Redesign

Status legend: ⬜ not started · 🔍 audited · 🎨 redesigned · ✅ approved
Wave per §4c. All on locked design-system tokens (Wave 0).

## Wave 0 — Design system + homepage (reference pattern)
| Route | Template/Component | Status | Notes |
|---|---|---|---|
| `/` (home) | `page.tsx` + `components/funnel/*` (HeroFunnel, PainPoints, Outcomes, FinalCTA), `sections/Testimonials` | 🔍 | hero portrait `waseem-builder-hero.jpg` (HeroFunnel:255) → remove; "leak" ×4; "Sound familiar?" orphan; 78% stat unsourced |
| design tokens | `src/app/globals.css` `@theme` | 🔍 | body Onest OK; kill italic-serif at body/small; pick legible sans system |

## Wave 1 — Money pages
| Route | Template | Status | Notes |
|---|---|---|---|
| `/services` | `services/page.tsx` | 🔍 | "Sixteen…" schema jargon; founder-first voice |
| `/services/[slug]` (5: n8n, gohighlevel, ai-chatbots, wordpress-seo, vibe-coded-sites) | `services/[slug]/page.tsx` + `*LP.tsx` | 🔍 | each LP embeds a portrait (line ~213); jargon-heavy |
| `/pricing` | `pricing/page.tsx` | 🔍 | 180+/9/40+ stats consistent; founder quote |
| `/discovery-call` | `discovery-call/page.tsx` + DiscoveryFunnel/DiscoveryCallForm | 🔍 | portraits at DiscoveryFunnel:484, Form:1034/1092 |
| `/contact` | `contact/page.tsx` | 🔍 | portrait contact:298 |
| `/thank-you` | `thank-you/page.tsx` | 🔍 | portrait :391 |

## Wave 2 — Trust & proof
| Route | Template | Status | Notes |
|---|---|---|---|
| `/about` | `about/page.tsx` | 🔍 | many portraits (58/59/61/238); bali-trek lifestyle photos — decide keep/cut |
| `/author/waseem-nasir` | `author/waseem-nasir/page.tsx` | 🔍 | orphaned (footer-only); `/waseem-portrait.jpg` |
| `/portfolio` | `portfolio/page.tsx` + WorkShowcase | 🔍 | portrait WorkShowcase:537; 23 work screenshots (keep) |
| `/case-studies` + `/case-studies/[slug]` | `case-studies/[slug]/page.tsx` | 🔍 | jargon reintroduced; anonymized cases; cover images keep |
| `/industries` + `/industries/[slug]` + `/industries/freight-logistics/texas` | `industries/[slug]/page.tsx` | 🔍 | bioPhoto portraits in industries.ts:189/586/587 |
| `/locations` + `/locations/[state]` | `locations/[state]/page.tsx` | 🔍 | quality-gated; no per-page OG |

## Wave 3 — Content / resources / templates / legal
| Route | Template | Status | Notes |
|---|---|---|---|
| `/blog` + `/blog/[slug]` | `blog/[slug]/page.tsx` (posts.ts) | 🔍 | author portrait `/waseem-portrait.jpg` :76 |
| `/news` + `/news/[slug]` (+8 hand-built) | `news/[slug]/page.tsx` (news.ts) | 🔍 | per-article hero images (keep) |
| `/aeo-guide` | `aeo-guide/page.tsx` | 🔍 | |
| `/glossary` | ? | ⬜ | VERIFY exists |
| `/faqs` | ? | ⬜ | VERIFY exists + add FAQPage schema |
| `/n8n-vs-zapier` | `n8n-vs-zapier/page.tsx` | 🔍 | portrait :43 |
| `/tools` + 10 tool pages | `tools/*/page.tsx` | 🔍 | content-calendar Calendar.tsx:472 italic-serif h1; prompt-library italic heads |
| `/vibe-coding` | `vibe-coding/page.tsx` | 🔍 | heaviest portrait user (45/57/155/271/396/494/504/513/874) |
| `/privacy-policy` | `privacy-policy/page.tsx` | 🔍 | portrait :42 |
| `/terms-of-service` | `terms-of-service/page.tsx` | 🔍 | |

## LP funnels (isolated — no header/footer; Header/Footer return null on `/lp/*`)
`/lp/freight`, `/lp/home-services`, `/lp/logistics` — decide: restyle to system or leave as ad-specific. `/lp/logistics` holds the worst readability CSS (testi-quote/obj-q/footer-h5 italic serif).

## Dev pages — gated to 404 in prod via `src/proxy.ts` (leave or delete)
`/gradient-lab`, `/hero-lab`, `/site-stats`

## Removal manifest — founder photos (19)
All `public/portraits/waseem-*.jpg` (18) + `public/waseem-portrait.jpg`. Full file:line map in AUDIT.md §A2. ⚠️ repoint `schema.ts` default OG before deleting.
