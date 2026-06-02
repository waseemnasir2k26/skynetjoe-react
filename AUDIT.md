# AUDIT — skynetjoe.com (Phase A, read-only)

Date 2026-06-01 · 5 parallel agents · branch `redesign/full-site`. No edits made.

---

## A1 — Typography diagnosis (TOP PRIORITY)

**Font stack**
| Element | Family | Size | Line-height | Weight | Style |
|---|---|---|---|---|---|
| Body | Onest (sans) | 16–19px | 1.55 | 400 | normal |
| h1 hero | Fraunces (serif) | clamp(32,8vw,72) | 1.05 | 500 | normal |
| h2 section | Fraunces (serif) | clamp(26,3–6vw,48) | 1.1 | 500 | normal |
| h3 tool pages | Fraunces | clamp(20,4.5vw,30) | 1.15 | bold | **italic** |
| Eyebrow | IBM Plex Mono | 10–11px | 1.0 | 600 | normal |
| Testimonial quote | Fraunces | 19px | 1.45 | 500 | **italic** |
| Objection q | Fraunces | 17px | 1.3 | 500 | **italic** |
| Footer h5 | Fraunces | 14px | 1.7 | 500 | **italic** |

**Contrast (against cream)**
| Element | fg | bg | ratio | verdict |
|---|---|---|---|---|
| Body `--ink-2` | #3A3A36 | #F2EFE6 | 9.2:1 | ✅ |
| Body `--ink` | #1A1A1A | #F2EFE6 | 14.8:1 | ✅ |
| Objection q (oxblood) | #6B2C2C | #F2EFE6 | 7.1:1 | ⚠️ marginal for italic serif |
| **Footer h5 (terracotta)** | **#C66B3F** | **#EDE8DC** | **3.9:1** | ❌ **WCAG AA FAIL** |
| ink-faint | #56564F | #F2EFE6 | ~5.1:1 | ✅ edge |

**VERDICT:** Readability complaint = **inappropriate italic serif (Fraunces) at small/body sizes**, NOT contrast. Contrast is largely fine. Culprits:
- `lp/logistics/page.tsx:351` `.testi-quote` italic serif 19px
- `lp/logistics/page.tsx:416` `.obj-q` italic oxblood serif 17px
- `lp/logistics/page.tsx:457` `.lp-footer h5` italic terracotta serif 14px (also the 3.9:1 fail)
- `tools/content-calendar/Calendar.tsx:472` + `tools/prompt-library/*` italic serif display headings
Fix = remove `font-style:italic` from body/small rules; reserve italic for short emphasis; body stays sans. Decide whether Fraunces serif headings stay or move to one clean sans site-wide (Discovery Q).

---

## A2 — Imagery inventory

**~120 assets.** Keep: 23 portfolio screenshots, 9 case-study covers, 23 news heroes, 6 community, icons/SVG. Decide: 10 bali-trek lifestyle photos (About).

**Founder photos to REMOVE (19) — every usage:**
| Image | file:line |
|---|---|
| waseem-builder-hero.jpg | HeroFunnel:255, Achievements:297, DiscoveryFunnel:484, about:238, vibe-coding:45/57/271, schema.ts |
| waseem-builder-portrait.jpg | Achievements:297 |
| waseem-cafe-arch.jpg | DiscoveryCallForm:1034, about:58, vibe-coding:494, industries.ts:587 |
| waseem-cafe-builder.jpg | N8nAutomationLP:218, vibe-coding:45/57/271/396, schema.ts |
| waseem-cafe-postit.jpg | WordpressSeoLP:213 |
| waseem-cafe-side.jpg | vibe-coding:155 |
| waseem-cafe-smile.jpg | ExitIntentModal:497 |
| waseem-cafe-working-side.jpg | Process:244, ProofOfLifeStrip:14, about:59 |
| waseem-poolside-laptop.jpg | VibeCodedSitesLP:213, vibe-coding:513, about:59 |
| waseem-poolside.jpg | WorkShowcase:537 |
| waseem-rooftop.jpg | industries.ts:189, **schema.ts:9/76 (DEFAULT OG — repoint before delete)** |
| waseem-rooftop-coffee.jpg | GoHighLevelLP:213 |
| waseem-rooftop-smile.jpg | thank-you:391, vibe-coding:874, about:61 |
| waseem-veranda-gaze.jpg | vibe-coding:504 |
| waseem-veranda-thinking.jpg | AiChatbotsLP:213, DiscoveryCallForm:1092 |
| waseem-veranda.jpg | industries.ts:586 |
| waseem-airport-lounge.jpg | ProofOfLifeStrip:19 |
| waseem-garden-tropical.jpg | ProofOfLifeStrip:9 |
| waseem-bluepolo.jpg | contact:298 |
| /waseem-portrait.jpg (root) | author:26/39/61, case-studies/[slug]:79, blog/[slug]:76, n8n-vs-zapier:43, privacy-policy:42 |
| (unused) waseem-garden-variant, -flight-transit, -rooftop-thumbsup, -cafe-smile dupes | none |

Founder presence to KEEP per §4-req2 = small avatar/monogram icon only (form TBD in Discovery).

---

## A3 — Information architecture

**Nav (`src/lib/site.ts:113`):** Services (mega: All + 5) · By Industry (hub + dental/wellness/freight + 3 lp demos) · Work (portfolio/case-studies/locations) · Tools (10) · Pricing · Company (about/news/contact). Sticky CTA "Book free 30-min leak audit" → `/discovery-call`.
**Footer (4 col):** Services(5) · AEO Resources(aeo-guide/glossary/faqs/n8n-vs-zapier/case-studies) · Company(about/author/pricing/portfolio/news/blog) · Get Started(discovery/contact/tools/privacy/terms). Social: LI/X/GitHub/YT.

**Shared templates:** `services/[slug]`, `blog/[slug]`, `case-studies/[slug]`, `industries/[slug]`, `news/[slug]`, `locations/[state]`. Reused: Breadcrumbs, JsonLd, letter-layout, IndustryLanding.

**Dev pages gated to 404 in prod** via `src/proxy.ts:11-22` (`NODE_ENV==='production'` → rewrite `/_blocked-internal`): gradient-lab, hero-lab, site-stats. ✅ correct.

**IA issues:** author page orphaned (footer-only); blog vs news duplication (both "articles"); `/glossary` `/faqs` in footer — implementations unconfirmed; `/lp/*` strip header+footer (no exit nav); service `/lp/*` vs `/services/[slug]` duplicate-content risk; hubs (`/`, `/services`, `/news`) lack breadcrumbs; schema.ts OG fallback breaks once portraits removed.

---

## A4 — Copy audit

**Jargon:** homepage VISIBLE hero is clean (leak/ghost/rot). Jargon lives in (a) schema markup `page.tsx:62-64` (n8n/AEO/CRM — meta only), (b) `Outcomes.tsx:14` (ElevenLabs+n8n visible), (c) deep service pages + case studies (n8n/AEO/CRM/GPT-4o/RAG/GoHighLevel) — Grade-10+, breaks the plain-English promise set by homepage.

**"Leak" metaphor ×4:** HeroFunnel:95, HeroFunnel:111, Outcomes:74, FinalCTA:47. Vary 2-3 of them.
**Orphans:** PainPoints:55 "Sound familiar?"; PainPoints:71 broken bridge; services:195 redundant eyebrow.
**Unsourced 🔴:** PainPoints:7 "78% of buyers go with the first vendor who replies" — no source. Replace (see REFERENCE-NOTES).
**Numbers consistent** ✅ (180+ workflows, 9 countries, 40+ sites, 16 services). Minor: "5-14 day ship" floor optimistic (cases cluster 9-14d).

**Testimonials (all named, defensible):** Dr Elena Marchetti / Grand Mercer Dental "23%→71% show-rate, 4× ROI" (Testimonials:5); Patrick Mabangu / KODIASIMMO "200+ FR debtor calls/wk" (:10); Christelle Dubois / Christelle Wellness (:15, vague); Esther Kalala / Takycorp "3h→20min triage" (:20). Data-file proofs in `social-proof.ts` ($11K MRR, 47 calls, 18h/wk). ⚠️ several public case studies are **anonymized** ("EU logistics group") → lower trust for layman who wants a reference. **OWNER MUST CONFIRM all are real + approved for public use.**

**Tone:** founder-first/conversational on main pages, product-technical on deep pages — inconsistent for a 5-second layman scan.

---

## A5 — Performance / a11y baseline
NOT yet run (needs build+serve). TODO at Wave 0 start: Lighthouse on home + 1 service + 1 blog + pricing + contact; record LCP/CLS + heaviest assets; check skip-link, focus, alt, heading order, contrast across templates. Quality gate = all ≥90 mobile, WCAG 2.1 AA.

---

## A6 — SEO / meta / deploy

- **Canonical:** ✅ apex `https://skynetjoe.com` (`site.ts:66`), propagated via `layout.tsx:94` + per-route `generateMetadata`. No www mismatch IN CODE. `metadataBase` = `SITE.assetsUrl` (Vercel-aware for OG). Action: verify Hostinger isn't serving www as duplicate; add 301 if so.
- **Generator tag:** ✅ none (Next 16 doesn't emit; no X-Powered-By). Prior-audit claim stale.
- **Meta/OG:** titles consistent `%s | SkynetLabs`. Per-article images on news + case-studies ✅. Generic `/og-default.png` on 16 services + locations + industries (low-pri gap). ⚠️ Twitter `creator:"@Skynetjoe1"` — **violates @skynetlabs handle rule, fix.**
- **robots.ts:** tight, 21 LLM UA rules, allows llms.txt, disallows /admin //api //lp/. ✅
- **sitemap.ts:** ~125 quality-gated URLs (isLocationIndexable/isPostIndexable/etc.), svc×state matrix eliminated (768 → fragment anchors). ✅
- **next.config.ts:** `output:standalone`; 6 security headers + HSTS; CSP **report-only** (path to nonce-enforce documented); 202 redirects (WP legacy + 768 svc×state 301→anchor). No www→apex redirect in code.
- **Structured data:** Organization, Person, WebSite(SearchAction), ProfessionalService, Service (offers 297–9500 USD), Article (blog/news/case-studies), BreadcrumbList ✅. Gaps: no FAQPage on /faqs, no LocalBusiness on case studies, no Review schema (E-E-A-T upside).
