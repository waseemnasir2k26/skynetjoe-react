# WordPress → React Parity Audit — 2026-05-22

> **Sources:** Live WP at https://skynetjoe.com · WP source extract `_source-extract/` (64 PHP files, 4 admin docs) · Next.js app `app/src/` (52 page.tsx routes shipped) · Prior audits `SITE_AUDIT_2026-05-22.md` and `YASIR_PARITY_AUDIT_2026-05-22.md`.
> **Scope:** Feature parity only. Not a code review, not a design crit.

---

## Executive Summary

We are at **~75% functional parity** with the WP install, and **structurally already ahead** on SEO/AEO surface (109 indexed URLs vs WP's 4-section sitemap; full SSR; programmatic 768 service×state matrix; llms.txt). The single biggest gap is the **WP "Tools Hub" — 10 client-side mini-apps** (ROI calc, AI Readiness Quiz, Automation Gap Analyzer, Prompt Library, Video Prompt Generator, Voice Persona Builder, Executive Summary Generator, Content Calendar, Flowchart Builder, Before/After Slider) — of which we have ported only 3 (`/tools/revenue-calculator`, `/tools/agency-stress-quiz`, `/tools/ai-readiness-score`). The single biggest improvement we already shipped is replacing WP's runtime PHP rendering + 12 home-page variant files + 6 lead-capture DB tables with a static, SSR'd, schema-rich Next.js tree that LLM crawlers actually parse.

---

## Side-by-Side Feature Matrix

Status legend: ✅ Ported (better) · ⚖️ Ported (parity, may need polish) · ⚠️ NOT yet ported · 🚫 Intentionally dropped · 🆕 New in Next.js

### Top-level pages / routes

| Feature / Page | WP has? | Next.js has? | Status |
|---|---|---|---|
| Homepage `/` | `front-page.php` (3,457 lines) + 12 variant files (`page-home-*.php`, `page-skynetlabs-home-v1..v8.php`, `page-skynetlabs-ultimate.php`, `page-all-variations.php`, `page-promax-landing.php`) | `app/page.tsx` (single composition: Hero · Stats · Services · Process · ProofOfLifeStrip · Founder · CoFounderPact · LinkedInBadge · Testimonials · Achievements · FAQ · CTA) | ✅ Ported, simplified (12→1) |
| `/about` | `page-about.php` | `about/page.tsx` | ⚖️ Ported |
| `/services` index | `page-services.php` | `services/page.tsx` | ⚖️ Ported |
| `/services/[slug]` (16 services) | 16 `page-service-*.php` files | `services/[slug]/page.tsx` dynamic | ✅ Ported, dynamic + better |
| `/contact` | `page-contact.php` | `contact/page.tsx` + `discovery-call/page.tsx` (3-step wizard) | ✅ Ported, expanded |
| `/pricing` | `page-pricing.php` ($997/$1,497/$2,997) | `pricing/page.tsx` (3-tier, different prices: Starter/Flagship/Retainer) | ⚖️ Ported, prices/structure diverge |
| `/portfolio` | `page-portfolio.php` (currently 404 on live — see WebFetch result) | `portfolio/page.tsx` (12 tiles) | ✅ Ported, ahead |
| `/case-studies` | `page-case-studies.php` | `case-studies/page.tsx` + `case-studies/[slug]/page.tsx` | ✅ Ported, dynamic |
| `/blog` | `page-blog.php` + `single.php` (9 posts live) | `blog/page.tsx` + `blog/[slug]/page.tsx` (4 stubs) | ⚠️ Ported but **count gap: 9 WP posts vs 4 Next.js** |
| `/news` | NO | `news/page.tsx` + 8 articles | 🆕 New |
| `/aeo-guide` | `page-aeo-guide.php` | `aeo-guide/page.tsx` | ⚖️ Ported |
| `/glossary` | `page-glossary.php` | `glossary/page.tsx` | ⚖️ Ported |
| `/faqs` | `page-faqs.php` | `faqs/page.tsx` | ⚖️ Ported |
| `/n8n-vs-zapier` | `page-n8n-vs-zapier.php` | `n8n-vs-zapier/page.tsx` | ⚖️ Ported |
| `/author/waseem-nasir` | `page-author-waseem-nasir.php` (Person schema, lines 22-30) | `author/waseem-nasir/page.tsx` | ⚖️ Ported |
| `/privacy-policy` | `page-privacy-policy.php` | `privacy-policy/page.tsx` | ⚖️ Ported |
| `/terms-of-service` | `page-terms-of-service.php` | `terms-of-service/page.tsx` | ⚖️ Ported |
| `/locations/[state]` (49 states) | `page-location.php` + `inc/location-data.php` | `locations/[state]/page.tsx` + index | ✅ Ported, ahead (49 state pages live) |
| `/industries/[slug]` | NO | `industries/[slug]/page.tsx` (3 verticals) | 🆕 New |
| `/services/[slug]/in/[state]` (768 matrix) | NO | dynamic route | 🆕 New (programmatic SEO moat) |
| `/lp/*` landing pages (12) | NO | freight + logistics variants × 6 each | 🆕 New (Meta ads inventory) |
| `/discovery-call` (3-step wizard) | NO (single-step on `page-contact.php`) | `discovery-call/page.tsx` | 🆕 New |
| `/thank-you` | NO | `thank-you/page.tsx` | 🆕 New |
| `/llms.txt` + `/llms-full.txt` | NO | yes (root + `llms-full.txt/page.tsx`) | 🆕 New |
| `/robots.txt` + `/sitemap.xml` | yes (Yoast-style 4-section split) | yes (`robots.ts`, `sitemap.ts` — single sitemap, 109 URLs) | ⚖️ parity |
| `/hero-lab`, `/gradient-lab`, `/vibe-coding` | NO | yes (internal design playgrounds) | 🆕 New |

### Homepage sections (visual / structural)

| Section | WP | Next.js | Status |
|---|---|---|---|
| Hero w/ animated carousel (7 service-specific slides w/ pain→solution rotation) | `front-page.php` lines 240-248 + lines 354-505 carousel CSS | Single hero, no slide carousel | ⚠️ NOT ported (see Must-Port) |
| Particle background system | `front-page.php` lines 394-451 + `assets/js/animations.js` | NO (we have gradient orbs only) | 🚫 Intentionally dropped |
| Custom cursor follower | `THEME-SUMMARY.md` line 226 + `animations.js` | NO | 🚫 Intentionally dropped |
| Trusted brands strip (8 logos: Fiverr, Upwork, Payoneer, PayPal, AWS, Azure, K8s, Hostinger) | `front-page.php` lines 511-678 | YES — in `site.ts` `BRANDS_TRUSTED` export (line 87-96) | ⚖️ Ported (verify rendered) |
| Stats section w/ animated counters | inline + `app.js` | YES static, NO animation | ⚠️ Counter animation missing |
| 16-service grid (clickable cards open modal w/ pain+solution+features+pros+price+advantage) | `front-page.php` lines 699-768 + lines 723-768 modal CSS | `services/page.tsx` grid links to detail pages — **no modal** | ⚠️ Modal interaction NOT ported |
| Service detail MODAL (overlay w/ pain/solution/features/pros/benefits/advantage/price) | lines 723-768 | NO (uses dedicated `/services/[slug]` pages instead) | 🚫 Intentionally dropped (route > modal is better for SEO) |
| Process timeline (4 steps) | `front-page.php` + `THEME-SUMMARY.md` line 118 | `Process.tsx` component | ⚖️ Ported |
| Testimonials carousel (6 testimonials w/ avatars, metrics, star animations) | `front-page.php` lines 251-258 + lines 850-972 CSS w/ star twinkle, hover lift | `Testimonials.tsx` | ⚖️ Ported (likely lower polish) |
| Portfolio strip (3 inline cases on home: E-commerce/+340%, YouTube/5M views, Lead Gen/800 leads) | lines 261-265 | YES via `/portfolio` | ⚖️ Ported |
| Pricing tables (3 tiers inline on home) | yes | NO inline on home (`/pricing` only) | ⚖️ Different decision |
| FAQ accordion | yes | `FAQ.tsx` | ⚖️ Ported |
| Final CTA section | yes | `CTA.tsx` | ⚖️ Ported |
| Founder/About inline section | yes | `Founder.tsx` + `CoFounderPact.tsx` | ✅ Ported + better (Claude co-founder narrative) |
| LinkedIn badge widget | NO on WP | `LinkedInBadge.tsx` | 🆕 New |
| Achievements section | NO on WP | `Achievements.tsx` | 🆕 New |
| Proof-of-life strip | NO on WP | `ProofOfLifeStrip.tsx` | 🆕 New |
| Hero "comparison table" | `front-page.php` (referenced in file header) | NO | ⚠️ NOT ported, likely fine to skip |
| Diagnostic quiz CTA in nav | YES (`header.php` line 354 `onclick="openDiagnostic()"`) | NO live diagnostic popup | ⚠️ NOT ported (we have `/tools/agency-stress-quiz` as dedicated route instead — different UX) |
| Hostinger affiliate "20% OFF" nav popup | `header.php` lines 373-379 | NO | 🚫 Intentionally dropped (affiliate clutter) |

### Tools Hub (`/tools/` — THE BIGGEST GAP)

| Tool | WP | Next.js | Status |
|---|---|---|---|
| ROI Calculator | `page-tools.php` lines 72-93 (interactive) + duplicate ROI calc on home | `tools/revenue-calculator/page.tsx` | ✅ Ported (different formula, possibly better) |
| AI Readiness Quiz | `page-tools.php` lines 95-116 | `tools/ai-readiness-score/page.tsx` | ⚖️ Ported (verify equivalence) |
| Automation Gap Analyzer | `page-tools.php` lines 118-139 | NO | ⚠️ NOT ported |
| Agency Stress Quiz | NO on WP (Yasir.com has it) | `tools/agency-stress-quiz/page.tsx` | 🆕 New (Yasir parity, not WP parity) |
| Prompt Library (30+ prompts, 8 categories) | `page-tools.php` lines 156-176 + `page-ai-prompter.php` | NO | ⚠️ NOT ported |
| Video Prompt Generator (Sora/Runway/Pika) | `page-tools.php` lines 178-200 | NO | ⚠️ NOT ported |
| Voice Persona Builder | `page-tools.php` (Content Creation block) | NO | ⚠️ NOT ported |
| Executive Summary Generator (browser-based AI) | `page-tools.php` | NO | ⚠️ NOT ported |
| Content Calendar | `page-tools.php` (Planning block) | NO | ⚠️ NOT ported |
| Flowchart Builder (drag-and-drop) | `page-tools.php` | NO | ⚠️ NOT ported |
| Before/After Slider | `page-tools.php` | NO | ⚠️ NOT ported |
| Tools Hub index page | `page-tools.php` (with category headings + trust badges "100% client-side, zero data collection") | `tools/page.tsx` (hub exists, lists only 3 tools) | ⚖️ Ported, sparse |

### Lead-capture & CRM infrastructure (massive WP back-end)

| Feature | WP | Next.js | Status |
|---|---|---|---|
| Multi-step contact form (Step 1: service/budget/timeline → Step 2: name/email/company → Calendly) | `functions.php` lines 610-668 `skynetlabs_contact_form` | `discovery-call/page.tsx` (3-step) | ✅ Ported, expanded |
| Honeypot anti-spam (`website_hp`) | line 617 | unknown — needs verification | ⚠️ Verify before WP-kill |
| Nonce + rate limiting on lead capture | lines 4136, 4152 `skynetlabs_rate_limit_check` + `skynetlabs_validate_honeypot` | NO (static site, no server-side rate limit on contact endpoint) | ⚠️ Bot risk if Vercel function exposed |
| `wp_skynetlabs_leads` table (28 columns: name, email, phone, company, industry, session_token, profile_level, source, UTM ×5, IP, UA, country, city, lead_score, status, GDPR ×3, timestamps) | `functions.php` lines 819-864 | NO (no DB) | ⚠️ Lead data → email-only flow currently |
| `wp_skynetlabs_lead_interactions` | lines 868-889 | NO | ⚠️ NOT ported |
| `wp_skynetlabs_pain_point_responses` | lines 894-922 | NO | ⚠️ NOT ported |
| `wp_skynetlabs_pricing_calculator_results` | lines 927-958 | NO | ⚠️ NOT ported |
| `wp_skynetlabs_meeting_requests` | lines 962-1000 (Calendly webhook integration) | NO | ⚠️ NOT ported |
| `wp_skynetlabs_email_log` (open/click tracking) | lines 1005-1021 | NO | ⚠️ NOT ported |
| Lead-score calculator (0-100 based on profile + tool engagement + UTM source) | lines 1140-1177 | NO | ⚠️ NOT ported |
| Progressive profiling (cookie-based session token) | lines 1230-1252 | NO | ⚠️ NOT ported |
| GDPR data-export endpoint | lines 4308-4309 + REST `/gdpr/export/{email}` line 2507 | NO | ⚠️ Compliance gap if EU traffic |
| GDPR data-delete endpoint | lines 4249-4250 + REST `/gdpr/delete/{email}` line 2520 | NO | ⚠️ Compliance gap |
| Lead-export REST endpoint `/wp-json/skynetlabs/v1/leads/export` | line 2494 | NO | ⚠️ NOT ported |
| Analytics REST endpoint `/wp-json/skynetlabs/v1/analytics` | line 2481 | NO | ⚠️ NOT ported |
| Email follow-up cron (`skynetlabs_send_followup_emails`) | lines 3920, 3970 | NO | ⚠️ NOT ported — needs n8n or Vercel cron equivalent |
| WordPress admin dashboard (`/wp-admin/admin.php?page=skynetlabs-*`) | line 3077 `admin_menu` | NO | 🚫 Intentionally dropped (replaced w/ external CRM e.g. GHL) |

### ChatGPT chatbot (custom OpenAI integration)

| Feature | WP | Next.js | Status |
|---|---|---|---|
| In-page AI chatbot powered by GPT-4o-mini | `chatgpt-handler.php` (515 lines) | NO | ⚠️ NOT ported |
| AJAX endpoint `wp_ajax_skynet_chatgpt_message` (lines 24-25) | yes | NO API route | ⚠️ NOT ported |
| System prompt w/ baked service catalog + pricing knowledge | `chatgpt-handler.php` lines 132-260 | NO | ⚠️ NOT ported |
| Contact-trigger heuristic (keywords → show contact buttons) | lines 335-359 | NO | ⚠️ NOT ported |
| WP admin settings for API key + WhatsApp + email + Fiverr | lines 367-515 | NO (env var instead — better) | ⚖️ Different arch |
| Contact URLs AJAX endpoint | lines 26-27 + 32-41 | NO | ⚠️ NOT ported |
| `ai-agent.js` + `ai-agent.css` floating widget assets | `functions.php` lines 78, 84 | NO floating widget | ⚠️ NOT ported |

### Hero / chrome / nav

| Feature | WP | Next.js | Status |
|---|---|---|---|
| Fixed top nav with scroll-hide-on-down behavior | `header.php` lines 1424-1532 JS | YES (likely in layout — verify) | ⚖️ Parity |
| Mega menu (5 columns × 20 services) | `header.php` lines 86-326 | YES (via `NAV_PRIMARY` w/ `hasMega:true`) | ⚖️ Parity, 4 categories vs 5 |
| Mobile full-screen overlay menu w/ accordions | lines 420-504 | YES (verify mobile UX) | ⚖️ Parity |
| Skip-to-content a11y link | line 49 | unknown — verify | ⚠️ Verify |
| Logo glow animation | lines 635-657 | unknown | 🚫 Likely dropped (correct call) |
| Calendly preconnect DNS hint | line 11 | unknown | ⚠️ Verify |
| Theme color meta `#030208` | line 18 | unknown | ⚠️ Verify |
| Hreflang en-US self-reference | lines 21-25 | unknown | ⚠️ Verify |
| Inline critical CSS | lines 28-40 | Next.js handles via App Router default | ⚖️ Parity (auto) |
| Hostinger affiliate "20% OFF" CTA nav item | `header.php` lines 373-379 | NO | 🚫 Intentionally dropped |
| "Book FREE Call" Calendly direct link in nav | line 399 `calendly.com/skynetlabs/schedule-a-free-consultation` | uses `/discovery-call` gating instead | ⚖️ Different philosophy |
| Email + Book-a-Call dual CTA buttons | lines 382-395 | NO (single CTA model) | ⚠️ Could re-add |

### SEO / AEO plumbing

| Feature | WP | Next.js | Status |
|---|---|---|---|
| Meta description per page | `inc/seo.php` lines 59-80 | per-page `metadata` export | ⚖️ Parity (Next.js cleaner) |
| Open Graph tags | `inc/seo.php` | per-page metadata | ⚖️ Parity |
| JSON-LD Organization + Person + WebSite + ProfessionalService | inline per template | `app/page.tsx` `orgSchema` lines 17-60 | ⚖️ Parity |
| FAQPage schema | per-page | per-page | ⚖️ Parity |
| LocalBusiness schema for location pages | yes | yes (per-state) | ⚖️ Parity |
| Noindex on variant pages (`home-v*`, `ultimate`, `all-variations`, `test-chatgpt`, `ai-prompter`, `promax-landing`) | `inc/seo.php` lines 17-54 | N/A (variants don't exist) | 🚫 Variants were dropped |
| Cited-by-LLMs badge | NO | YES on `/about` | 🆕 New |
| llms.txt at root | NO | YES | 🆕 New |
| llms-full.txt | NO | YES | 🆕 New |
| Programmatic 768-page `/services/[slug]/in/[state]` matrix | NO | YES | 🆕 New |
| Author bio + Person `knowsAbout` schema | `page-author-waseem-nasir.php` lines 23-30 | YES `/author/waseem-nasir` | ⚖️ Parity |
| GA4 tracking output | `functions.php` line 4209 | unknown — should verify | ⚠️ Verify |

### Performance & technical

| Feature | WP | Next.js | Status |
|---|---|---|---|
| Server-side rendering (SSR) for crawlers | YES (PHP renders HTML) | YES (Next.js App Router default) | ⚖️ Parity |
| Image lazy-loading | yes (WP core) | next/image | ⚖️ Parity |
| Critical CSS inlined | yes | App Router auto | ⚖️ Parity |
| Defer non-critical JS | yes (`functions.php` lines 113-140) | bundler handles | ⚖️ Parity |
| Emoji disabling | yes (line 703-712) | N/A | 🚫 (Next.js doesn't add emoji JS) |
| XML-RPC disabled | yes (line 678) | N/A | 🚫 (no WP attack surface) |
| WordPress version stripped | yes (line 675) | N/A | 🚫 |
| `prefers-reduced-motion` support | yes (header.php line 530-536) | unknown — verify | ⚠️ Verify |
| View Transitions API (`@view-transition`) | yes (header.php line 38) | unknown | ⚠️ Verify |

### Custom post types & taxonomies

| Feature | WP | Next.js | Status |
|---|---|---|---|
| `service` CPT | yes (`functions.php` lines 167-187) | static data in `lib/site.ts` `SERVICE_CATEGORIES` | 🚫 Intentionally replaced (static is better at this scale) |
| `portfolio` CPT | yes (lines 189-208) | hard-coded in `portfolio/page.tsx` | 🚫 Intentionally replaced |
| `testimonial` CPT | yes (lines 211-229) | hard-coded | 🚫 Intentionally replaced |
| `service_category` taxonomy | yes (lines 389-404) | static categories | 🚫 Intentionally replaced |
| `portfolio_category` taxonomy | yes (lines 407-422) | filter chips client-side | 🚫 Intentionally replaced |
| Service meta-boxes (video URL, icon emoji, subtitle, starting price, projects completed, avg delivery, satisfaction rate, tech stack) | lines 261-379 | static service data — partial parity | ⚖️ Parity for visible fields; video URL field NOT in Next.js |
| Customizer settings (email, phone, WhatsApp, CTA URL) | lines 447-500 | hard-coded in `SITE` const | 🚫 Intentionally replaced |
| WP widgets (`Blog Sidebar`) | lines 430-440 | NO blog sidebar in Next.js | ⚠️ Verify if missed feature |

---

## ⚠️ MUST-PORT BEFORE WP-KILL

Sorted by ROI. Each lists: WP source · what it does · Next.js implementation approach · effort.

### 1. Tools Hub — 7 missing client-side tools (HIGHEST ROI)

**WP source:** `page-tools.php` (full 10-tool grid w/ category headings + "100% client-side · zero data collection · no account" trust badges)

**What it does:** Free lead-magnet tools — every visitor who completes one is implicit lead. Existing 3 Next.js tools (`revenue-calculator`, `agency-stress-quiz`, `ai-readiness-score`) prove the pattern works. The other 7 are real conversion assets:

- **Automation Gap Analyzer** — checkbox UI, scores business automation gaps, recommends services. Effort: **S** (~3hr, similar pattern to existing quiz)
- **Prompt Library** — 30+ AI prompts, 8 categories, copy-to-clipboard. Effort: **S** (~2hr, static JSON + UI)
- **Video Prompt Generator** — form → Sora/Runway/Pika prompt template. Effort: **S** (~2hr)
- **Voice Persona Builder** — multi-field form generates brand voice JSON for AI system prompts. Effort: **M** (~4hr)
- **Executive Summary Generator** — "browser-based AI" per WP marketing — actually a templated text expander. Effort: **S** (~2hr)
- **Content Calendar** — date picker + platform tabs, simple state. Effort: **M** (~4hr)
- **Before/After Slider** — image comparison component (rich). Effort: **S** (~2hr — established pattern with libs)
- **Flowchart Builder** — drag-and-drop. Effort: **L** (~1 day, needs library e.g. react-flow). **Skip if time-constrained — replace with link to a hosted draw.io.**

**Total effort:** ~3 dev days for 7 of 7, or ~1.5 days if Flowchart Builder is deferred. **All add AEO citation surface** — each tool gets its own `WebApplication` JSON-LD.

### 2. Blog post backfill — 5 missing posts

**WP source:** Live `/blog/` shows 9 published posts (LLMO-vs-GEO-vs-AEO, Track AI Citations, Rank in ChatGPT, Get Cited by Claude, citelift.app comparisons ×2, Gemini Answers, AI Overviews & SEO, AEO-vs-SEO). Next.js has 4 stubs.

**What it does:** Brand-builds citelift.app SaaS upgrade path (per `MEMORY.md` brain context: citation-monitor skill). Each post is entity-rich training data for LLM citations.

**Next.js approach:** Copy the 9 WP post bodies into MDX in `app/src/app/blog/[slug]/`. Add `Article` schema, `dateModified`, author = Waseem.

**Effort:** **M** (~4hr — copy + format + schema, no rewriting needed since WP versions are already good).

### 3. AI Chatbot floating widget (or explicit drop decision)

**WP source:** `chatgpt-handler.php` (515 lines) + `assets/js/ai-agent.js` + `assets/css/ai-agent.css`

**What it does:** Floating widget bottom-right, GPT-4o-mini conversational agent w/ pre-loaded service catalog + pricing in system prompt (lines 132-260). Triggers "show contact buttons" when user mentions price/book/contact/etc. (line 335).

**Next.js approach options:**
- **Option A — Port:** Build `<ChatbotFab />` client component + Vercel Edge function `/api/chat` proxying OpenAI w/ same system prompt. Effort: **M** (~6hr).
- **Option B — Drop:** Replace with WhatsApp FAB per `YASIR_PARITY_AUDIT_2026-05-22.md` recommendation #2 (faster, no LLM cost, real human reply). Effort: **L** (~30min).
- **Option C — Both:** widget asks human-or-AI on open.

**Recommendation:** Decision needed from Waseem. Option B is the cheaper, more honest play; Option A is the "agency proof-of-product" play.

### 4. Honeypot + rate limiting on contact endpoints

**WP source:** `functions.php` line 617 (honeypot field `website_hp`), lines 4136-4152 (`skynetlabs_rate_limit_check`, `skynetlabs_validate_honeypot`)

**What it does:** Drops spam bot submissions silently. WP version logs interactions even for honeypot hits — useful for analytics.

**Next.js approach:** Add hidden `website_hp` field to `/discovery-call` form (rejected server-side if filled). Use Vercel Edge function w/ IP-rate-limit via Upstash Redis or `@vercel/kv`. Effort: **S** (~2hr).

**Risk if not ported:** Vercel form endpoint will get hammered by automation bots within days of going live, polluting Slack/email pipeline.

### 5. GDPR data-export + delete endpoints

**WP source:** `functions.php` lines 4249-4309 + REST routes `/gdpr/export/{email}` and `/gdpr/delete/{email}` (lines 2507, 2520).

**What it does:** EU compliance — user requests "give me my data" or "delete me" → automated response.

**Next.js approach:** If no DB exists (current state), this is moot — just add a `/privacy-policy#your-data` section saying "to request data or deletion, email privacy@skynetjoe.com". If lead DB is restored (see item #6), build matching API routes. Effort: **S** (~1hr for copy-only; **M** ~4hr if DB-backed).

**Risk:** Hostinger/EU traffic + missing GDPR = €20M fines under worst-case reading. Almost certainly safe at our scale, but worth a copy fix.

### 6. Lead-capture data layer (decision required)

**WP source:** `functions.php` lines 819-1021 (6 tables: leads, interactions, pain_point_responses, pricing_calculator_results, meeting_requests, email_log)

**What it does:** Stored UTM attribution, lead-score, tool engagement, calendly meeting status, email open/click — i.e. a mini-CRM.

**Decision point for Waseem:** Restoring this in Next.js means a Vercel Postgres / Supabase / Neon + cron jobs. Alternative: route every lead into GHL CRM directly (the actual destination anyway) via n8n webhook + skip self-hosted CRM. **Recommendation: skip self-hosted; route to GHL.** Effort if going GHL route: **S** (~2hr to wire `/api/lead` → GHL contact create). Effort if rebuilding self-hosted: **L** (~3 days).

### 7. Header utilities (small but visible)

- **`Calendly` preconnect DNS hint** — `header.php` line 11. Effort: 5 min add to `layout.tsx`. **Risk: forgotten = +200ms on Cal.com load.**
- **`theme-color` meta tag** — `header.php` line 18 (`#030208`). Effort: 5 min. Risk: iOS Safari status bar mismatch.
- **`prefers-reduced-motion` global CSS** — `header.php` lines 530-536. Effort: 10 min add to `globals.css`. Risk: a11y complaint.
- **Skip-to-content link** — `header.php` line 49. Effort: 10 min add to `layout.tsx`. Risk: WCAG 2.1 fail on audit.
- **GA4 tracking output** — `functions.php` line 4209. Effort: 15 min. **Verify before kill — analytics blackout if missed.**

---

## ⚖️ NICE-TO-PORT (Polish layer)

1. **Hero carousel** — WP rotates 7 slides w/ pain→solution rotation. We have static hero. Effort: **M** (4hr). Reward: more dynamic feel; **NOT recommended** because (a) our static hero already passed audit, (b) carousels hurt CWV.

2. **Service-card modal interaction** — WP opens overlay with pain/solution/features/pros/advantage/price. We use dedicated `/services/[slug]` pages instead, which are **better for SEO**. **Skip — current approach is the right one.**

3. **Animated counters on stats** — already flagged in `SITE_AUDIT_2026-05-22.md`. Effort: **S** (1hr w/ `react-countup`). Reward: dopamine + subtle polish.

4. **Particle/orb background system on hero** — WP has GPU-accelerated particles. We have gradient orbs. Effort: **M** (3hr). Reward: visual richness. **Risk:** mobile perf hit. **Recommend: only if Lighthouse mobile >90 confirmed.**

5. **Email + Book-a-Call dual CTA in nav** — WP has both prominent. We have one. Effort: **S** (30min). Reward: lower friction for "I just want to email" buyers.

6. **Star-twinkle testimonial animation** — `front-page.php` lines 916-932. Pure polish. Effort: **S** (30min).

7. **Service video meta-box per service page** — WP can store a Google Drive / YouTube URL per service (CPT meta field `service_video_url`). We have no video field. Effort: **M** (~3hr to add `videoUrl?` to `SERVICE_CATEGORIES` + render `<video>` block on `/services/[slug]`). Reward: per-service product demos.

---

## 🚫 INTENTIONALLY DROPPED (with reasoning)

1. **12 home-page variant files** (`page-home-backup.php`, `page-home-enterprise.php`, `page-home-phase1.php`, `page-home-professional.php`, `page-home-variant-b.php`, `page-skynetlabs-home-v1..v8.php`, `page-skynetlabs-ultimate.php`, `page-all-variations.php`) — A/B test artifacts. Next.js has a single canonical home. **Justified:** maintenance nightmare in WP, and only one was rendered to real users at a time anyway.

2. **`page-promax-landing.php`** — historical ad LP. Replaced by `/lp/*` Next.js LPs.

3. **`page-ai-prompter.php`** — old AI Prompt tool. Will be replaced by ported Prompt Library (see Must-Port #1).

4. **`test-chatgpt.php`** + `page-bundle.php` — internal test artifacts (bundle is 404 on live).

5. **3 WP custom post types (`service`, `portfolio`, `testimonial`)** — replaced by static `lib/site.ts` exports. **Justified:** at 16 services + 12 portfolio items + 6 testimonials, hard-coding is cheaper than a database. If catalog grows past ~50 items per type, revisit.

6. **WP admin dashboard + Customizer + widgets** — replaced by code edits. **Justified:** founder is the only editor; no client-marketing-team handoff.

7. **`wp_skynetlabs_*` 6-table lead DB** — replaced by GHL CRM (recommended) or stays gone (current state). **Justified:** GHL is already paid-for and is the actual destination.

8. **Hostinger 20%-OFF nav popup** — `header.php` lines 373-379. **Justified:** affiliate ad clutter contradicts the editorial brand direction; conversion lift not worth the trust cost.

9. **Particle/cursor/glitch/3D-tilt animations** from `THEME-SUMMARY.md` lines 223-232. **Justified:** these read as 2020 agency-template, hurt CWV, and our current editorial direction (`SITE_AUDIT_2026-05-22.md`) explicitly competes with Linear/Vercel — they don't use any of this either.

10. **Hero comparison table** referenced in `front-page.php` header. **Justified:** Not a current brand priority; n8n-vs-zapier pillar serves the comparison job better.

11. **WordPress XML-RPC, emoji JS, rsd_link, wp_generator** — irrelevant in Next.js (no WP attack surface).

---

## 🆕 New in Next.js (WP NEVER HAD)

1. **109-URL sitemap vs WP's 4-section split** — full programmatic coverage.
2. **49 location/state pages** (`/locations/[state]`) — WP had `page-location.php` template but unused at this scale.
3. **768-page `/services/[slug]/in/[state]` matrix** — programmatic SEO play.
4. **3 industry-vertical landers** (`/industries/[slug]`) — dental/wellness/freight.
5. **12 `/lp/*` landing pages** (freight × 6, logistics × 6) — Meta ads inventory.
6. **`/news` blog (8 posts)** in addition to `/blog`.
7. **`/llms.txt` + `/llms-full.txt`** at root — LLM-crawler welcome mat.
8. **Cited-by-LLMs badge** on `/about`.
9. **3-step `/discovery-call` wizard** w/ anti-tire-kicker gating.
10. **`CoFounderPact` Claude Code narrative** on home — unique brand moat.
11. **`Achievements` + `ProofOfLifeStrip` + `LinkedInBadge`** home sections.
12. **`/tools/agency-stress-quiz`** + **`/tools/ai-readiness-score`** (Yasir-parity additions, not WP-parity).
13. **`/thank-you` post-conversion page** w/ next-step microcopy.
14. **`/hero-lab` + `/gradient-lab`** internal design system playgrounds.
15. **`/vibe-coding` standalone page** for the new service vertical.
16. **`error.tsx` + `not-found.tsx` + `loading.tsx`** route-level error boundaries (better UX than WP's 404).
17. **Per-route `metadata` export** w/ OG/Twitter/canonical/JSON-LD — vs WP's runtime `inc/seo.php` filter chain (less maintainable).

---

## SEO + URL Migration Risks

### URLs in WP NOT in Next.js — recommended 301 redirects

| WP URL | Next.js destination | Notes |
|---|---|---|
| `/ai-prompter/` | `/tools/` (until Prompt Library ported, then `/tools/prompt-library`) | high traffic possibility |
| `/bundle/` (page-bundle.php) | currently 404 — redirect to `/pricing` | trivial |
| `/promax-landing/` | redirect to `/lp/freight` or `/pricing` | A/B leftover |
| `/all-variations/` | 301 → `/` | drop |
| `/ultimate/` | 301 → `/` | drop |
| `/home-v1..v8/` | 301 → `/` | drop |
| `/home-professional/`, `/home-enterprise/`, `/home-phase1/`, `/home-backup/`, `/home-variant-b/` | 301 → `/` | drop |
| `/test-chatgpt/` | 301 → `/` (or 410 Gone) | dev artifact |
| `/page-author-waseem-nasir/` | already `/author/waseem-nasir/` — match | confirm |
| `/blog/<wp-slug>/` × 9 posts | `/blog/<next-slug>/` — **must verify slug parity** | **HIGH RISK** if slugs diverge |
| Yoast sitemap split (`/post-sitemap.xml`, `/page-sitemap.xml`, `/service-sitemap.xml`, `/category-sitemap.xml`) | single `/sitemap.xml` | ping GSC for new sitemap on flip |
| `/category/*` (any WP taxonomy archive) | 301 → `/blog` | if used |
| `/wp-content/uploads/*` images | re-host under `/public/images/` | redirect old image URLs |

### Setup recommendations

1. **Before flip:** dump WP sitemap and crawl every URL with `curl -I` to capture which 2xx exist today. Diff against Next.js `sitemap.ts` output.
2. **Configure 301s in `vercel.json`** `redirects` array — Vercel handles at edge, no Next.js code.
3. **Submit new sitemap to GSC** day-of-flip. Submit deprecated WP sitemap with "Request Removal" within 7 days.
4. **Keep WP up but at `legacy.skynetjoe.com`** for 90 days as failsafe — DNS flip is reversible if Next.js has issues, but content lookups stay possible.

---

## Decision Points for Waseem

1. **AI chatbot widget** — Port the GPT-4o-mini floating chatbot from `chatgpt-handler.php`, or drop it in favor of a WhatsApp FAB? (See Must-Port #3 — affects 6hr vs 30min effort.)

2. **Lead-capture data layer** — Restore the 6-table lead CRM (Supabase/Neon + Vercel cron) OR route everything to GHL via webhook OR keep the current email-only flow? (See Must-Port #6 — affects up to 3 dev days.)

3. **Flowchart Builder tool** — Build it in-house with react-flow (1 day) or drop in favor of an external link (5 min)? (See Must-Port #1.)

4. **Hero carousel** — Re-add the 7-slide rotating hero or stick with current static hero? (Carousel hurts CWV; static is cleaner. Recommend keep static.)

5. **Inline pricing on homepage** — WP had 3 pricing cards inline on `/`. We send users to `/pricing`. Re-add inline cards (better conversion) or keep dedicated page (better SEO/cleanliness)?

6. **Service video meta-field** — WP supported per-service Google Drive / YouTube videos. Worth adding to `SERVICE_CATEGORIES` schema and `/services/[slug]` template?

7. **WP `legacy.skynetjoe.com` parking** — Keep WP install live at subdomain for 90 days as fallback, or hard-cut immediately on flip?

---

## Recommended Next Action Order

Top 5 ships before flipping DNS:

1. **Backfill 5 missing blog posts** (Must-Port #2) — ~4hr. **Why first:** they exist on WP, are indexed in Google + cited by LLMs today, and will 404 the second the WP install dies. Highest "loss-avoidance" value.

2. **Add Vercel `redirects` array** covering all dropped WP URLs (variants, ai-prompter, bundle, promax) and confirm blog post slug parity. ~2hr. **Why second:** 301s are the safety net for everything else.

3. **Port 5 of 7 missing tools** — Automation Gap Analyzer, Prompt Library, Video Prompt Generator, Voice Persona Builder, Before/After Slider — defer Executive Summary Generator + Content Calendar + Flowchart Builder. ~1.5 dev days. **Why third:** these are the WP traffic-magnet lead-magnets; ship before competitors realize we paused the hub.

4. **Wire `/discovery-call` form → GHL** via webhook OR add Vercel KV rate-limit + honeypot. ~2hr. **Why fourth:** without this, the first day post-flip will be bot-storm + missing lead capture.

5. **Add 5 header utilities** (Calendly preconnect, theme-color, prefers-reduced-motion, skip-link, GA4 verify). ~45min total. **Why fifth:** small but each one is a "found it post-launch and groaned" issue.

**Total ship effort before WP-kill:** ~2.5-3 dev days for the must-ports if Waseem picks "GHL webhook over self-hosted CRM" + "WhatsApp FAB over chatbot port" + "drop Flowchart Builder."

**Total parity score after these ships:** ~92% functional, with the dropped 8% being intentional simplifications (no WP variants, no self-hosted CRM, no animation showcase) where the Next.js choice is provably better.
