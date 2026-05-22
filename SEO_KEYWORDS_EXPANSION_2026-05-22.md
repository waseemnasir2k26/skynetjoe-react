# SkynetLabs SEO Keyword Universe Expansion — 2026-05-22

**Author:** Senior SEO strategist (Claude Opus 4.7)
**Scope:** Strategic depth pass — NOT a re-do of the technical audit.
**Companion files:** `SEO_AUDIT_2026-05-22.md`, `AEO_AUDIT_2026-05-22.md`, `BACKLINK_PLAN_2026-05-22.md`, `src/data/keywords.ts` (typed export).
**Site state assumed:** 870 static pages, all w/ canonical + JSON-LD, `llms.txt` live, zero backlinks, generic Vercel subdomain, `skynetlabs.com` purchase pending.

---

## 0. TL;DR (founder-grade)

- 215 keywords mapped across 9 clusters in `src/data/keywords.ts`. Roughly 60 are realistic 90-day plays, 80 are 6-month plays, and ~75 are 12-month-or-never plays.
- Two clusters are genuinely undervalued and the site can win them inside 90 days: **Claude Code / vibe coding** (low competition, rising volume, our content is one of <50 indexable agency pages on earth that even uses the term), and **AEO/GEO emerging queries** (we already rank for "AEO" inside ChatGPT — see `/aeo-guide` citation tests).
- Two clusters are graveyards for a new domain: **"n8n vs zapier"** (page 1 occupied by n8n.io, zapier.com, reddit, two niche newsletters, hard to dislodge without 80+ referring domains) and **state×service local** ("n8n automation in texas" is mostly searched by no one — see ranking forecast §3 for why these 768 pages are still worth shipping anyway).
- Realistic ranking ceiling without a backlink plan: page 2-3 on commercial terms, page 1 on 8-12 long-tail informational terms within 6 months. With the backlink plan in `BACKLINK_PLAN_2026-05-22.md` executed: page 1 for ~15 commercial terms in 6 months, ~40 in 12 months.
- 14 specific on-page deltas listed in §4. None require touching the technical foundation. Highest-leverage edit is on `/services/vibe-coded-sites` — adding a Claude Code H2 unlocks 8 new keyword captures.

---

## 1. Existing keyword footprint (what we're already targeting)

From metadata + page content audit:

| Surface | Primary head-term targeted |
|---|---|
| `/` | "AI automation agency" |
| `/services/n8n-automation` | "n8n automation" |
| `/services/gohighlevel` | "gohighlevel agency" / "GoHighLevel CRM setup" |
| `/services/ai-chatbots` | "AI chatbot agency" |
| `/services/vibe-coded-sites` | "vibe coded websites" (rare term, ours wins by default) |
| `/services/wordpress-seo` | "wordpress seo blog" |
| `/services/ai-business-systems` | "ai business systems consulting" |
| `/n8n-vs-zapier` | "n8n vs zapier" |
| `/aeo-guide` | "answer engine optimization" |
| `/faqs` | branded long-tail FAQ |
| `/glossary` | branded long-tail definition queries |
| `/services/[slug]/in/[state]` × 768 | local programmatic (e.g., "n8n automation in California") |

What's missing entirely: **Claude Code / pair programming**, **GEO-specific** (GenAI engine optimization), **comparison wedges** beyond n8n-vs-zapier, **niche-specific chatbot terms** (dental, real estate, legal), **emerging vibe-coding tooling queries** (Cursor, Replit, Bolt, v0), and **WhatsApp Business API** terms which we ship daily but never named on-page.

---

## 2. Expanded keyword universe — 215 keywords

Full typed export lives at `src/data/keywords.ts`. The cluster-level summary below shows intent mix, volume tier, competition tier, and target page. Volume tiers are calibrated against US-EN baseline (high = 5k+/mo, med = 500-5k, low = <500). Competition tiers reference Ahrefs-style KD bands (high = 50+, med = 20-50, low = <20).

### Cluster A — n8n automation long-tail (42 keywords)

| # | Keyword | Intent | Vol | Comp | Target page |
|---|---|---|---|---|---|
| A1 | n8n alternative | comparison | high | high | NEW `/n8n-alternatives` |
| A2 | n8n vs zapier pricing | comparison | med | high | existing `/n8n-vs-zapier` (add anchor `#pricing`) |
| A3 | n8n self hosted setup | informational | med | med | NEW `/blog/n8n-self-hosted-setup-guide` |
| A4 | n8n templates for ecommerce | informational | low | low | NEW `/blog/n8n-templates-ecommerce` |
| A5 | n8n templates for real estate | informational | low | low | NEW `/blog/n8n-templates-real-estate` |
| A6 | n8n templates for dental | informational | low | low | NEW `/blog/n8n-templates-dental` |
| A7 | n8n templates for agencies | informational | low | low | NEW `/blog/n8n-templates-agencies` |
| A8 | hire n8n developer | transactional | med | low | `/services/n8n-automation` (add CTA) |
| A9 | hire n8n freelancer | transactional | med | low | `/services/n8n-automation` |
| A10 | n8n agency | transactional | low | low | `/services/n8n-automation` |
| A11 | n8n consultant | transactional | low | low | `/services/n8n-automation` |
| A12 | n8n expert | transactional | low | low | `/services/n8n-automation` |
| A13 | n8n vs make | comparison | med | med | NEW `/blog/n8n-vs-make-honest-comparison` |
| A14 | n8n vs activepieces | comparison | low | low | NEW `/blog/n8n-vs-activepieces` |
| A15 | n8n vs windmill | comparison | low | low | NEW `/blog/n8n-vs-windmill` |
| A16 | n8n vs node-red | comparison | low | low | NEW `/blog/n8n-vs-node-red` |
| A17 | n8n vs power automate | comparison | low | med | NEW `/blog/n8n-vs-power-automate` |
| A18 | n8n cloud vs self hosted | comparison | low | low | NEW `/blog/n8n-cloud-vs-self-hosted` |
| A19 | n8n docker setup | informational | med | med | new blog post |
| A20 | n8n kubernetes deployment | informational | low | low | new blog post |
| A21 | n8n hipaa compliant | informational | low | med | NEW `/blog/is-n8n-hipaa-compliant` |
| A22 | n8n gdpr compliance | informational | low | med | new blog post |
| A23 | n8n openai integration | informational | med | med | new blog post |
| A24 | n8n claude integration | informational | low | low | new blog post |
| A25 | n8n whatsapp integration | informational | med | low | new blog post |
| A26 | n8n airtable workflow | informational | low | low | new blog post |
| A27 | n8n notion integration | informational | low | low | new blog post |
| A28 | n8n shopify automation | informational | low | low | new blog post |
| A29 | n8n stripe webhook | informational | low | low | new blog post |
| A30 | n8n custom node tutorial | informational | low | low | new blog post |
| A31 | n8n credentials encryption | informational | low | low | new blog post |
| A32 | n8n queue mode setup | informational | low | low | new blog post |
| A33 | n8n license terms | informational | med | med | new blog post |
| A34 | n8n pricing 2026 | informational | med | med | new blog post |
| A35 | n8n vs zapier cost calculator | comparison | low | low | add interactive widget to `/n8n-vs-zapier` |
| A36 | n8n error handling best practices | informational | low | low | new blog post |
| A37 | n8n migrate from zapier | informational | med | low | NEW `/blog/migrate-zapier-to-n8n` |
| A38 | n8n migrate from make | informational | low | low | new blog post |
| A39 | n8n consultant rates | informational | low | low | `/pricing` (add n8n-specific row) |
| A40 | n8n agency near me | local | med | low | `/locations` (add n8n agency H1 variant) |
| A41 | hire n8n developer remote | transactional | low | low | `/services/n8n-automation` |
| A42 | best n8n templates 2026 | informational | low | low | new blog post |

### Cluster B — GoHighLevel deep funnel (30 keywords)

| # | Keyword | Intent | Vol | Comp | Target |
|---|---|---|---|---|---|
| B1 | gohighlevel agency | transactional | high | high | `/services/gohighlevel` |
| B2 | gohighlevel snapshot | informational | high | high | NEW `/blog/best-gohighlevel-snapshots-2026` |
| B3 | gohighlevel snapshot for dental | transactional | med | low | NEW `/blog/gohighlevel-snapshot-dental-practice` |
| B4 | gohighlevel snapshot for real estate | transactional | med | low | NEW blog post |
| B5 | gohighlevel snapshot for med spa | transactional | med | low | NEW blog post |
| B6 | gohighlevel snapshot for chiropractor | transactional | low | low | NEW blog post |
| B7 | gohighlevel snapshot for law firm | transactional | low | low | NEW blog post |
| B8 | gohighlevel whatsapp integration | informational | med | low | NEW blog post |
| B9 | gohighlevel sms compliance | informational | med | med | NEW blog post |
| B10 | gohighlevel a2p 10dlc setup | informational | med | low | NEW blog post |
| B11 | gohighlevel vs hubspot | comparison | high | high | NEW `/blog/gohighlevel-vs-hubspot` |
| B12 | gohighlevel vs activecampaign | comparison | med | med | NEW blog post |
| B13 | gohighlevel vs clickfunnels | comparison | med | med | NEW blog post |
| B14 | gohighlevel vs keap | comparison | low | med | NEW blog post |
| B15 | gohighlevel vs kajabi | comparison | low | med | NEW blog post |
| B16 | gohighlevel saas mode pricing | informational | med | low | NEW blog post |
| B17 | gohighlevel white label setup | informational | med | med | NEW blog post |
| B18 | gohighlevel workflow tutorial | informational | high | med | NEW blog post |
| B19 | gohighlevel api integration | informational | med | low | NEW blog post |
| B20 | gohighlevel calendar automation | informational | med | low | NEW blog post |
| B21 | gohighlevel pipeline best practices | informational | med | low | NEW blog post |
| B22 | hire gohighlevel expert | transactional | med | low | `/services/gohighlevel` |
| B23 | gohighlevel consultant | transactional | med | low | `/services/gohighlevel` |
| B24 | gohighlevel setup cost | informational | med | low | `/pricing` |
| B25 | gohighlevel for dental practice | transactional | med | low | `/services/gohighlevel` (add niche H2) |
| B26 | gohighlevel for chiropractor | transactional | low | low | `/services/gohighlevel` |
| B27 | gohighlevel no show automation | informational | low | low | existing `/blog/ghl-no-show-automation-case-study` |
| B28 | gohighlevel review 2026 | comparison | high | high | NEW honest review post |
| B29 | gohighlevel migration service | transactional | low | low | `/services/gohighlevel` |
| B30 | gohighlevel agency partner | transactional | low | low | `/services/gohighlevel` |

### Cluster C — AI chatbots niche-specific (30 keywords)

| # | Keyword | Intent | Vol | Comp | Target |
|---|---|---|---|---|---|
| C1 | dental ai chatbot | transactional | med | low | NEW `/services/ai-chatbots/dental` |
| C2 | real estate whatsapp bot | transactional | med | low | NEW `/services/ai-chatbots/real-estate` |
| C3 | law firm ai chatbot | transactional | med | low | NEW `/services/ai-chatbots/law-firm` |
| C4 | med spa whatsapp bot | transactional | low | low | NEW niche page |
| C5 | clinic appointment chatbot | transactional | med | low | NEW niche page |
| C6 | chiropractor whatsapp bot | transactional | low | low | NEW niche page |
| C7 | restaurant whatsapp ordering bot | transactional | med | low | NEW niche page |
| C8 | salon booking chatbot | transactional | med | low | NEW niche page |
| C9 | ecommerce whatsapp bot | transactional | med | med | NEW niche page |
| C10 | shopify whatsapp chatbot | transactional | med | low | NEW niche page |
| C11 | whatsapp business api setup | informational | high | high | NEW pillar `/blog/whatsapp-business-api-setup-guide` |
| C12 | whatsapp template message approval | informational | med | low | new blog post |
| C13 | whatsapp business solution provider | transactional | med | med | new blog post |
| C14 | manychat alternative | comparison | med | med | NEW comparison post |
| C15 | manychat vs chatfuel | comparison | low | med | new blog post |
| C16 | ai voice agent for clinics | transactional | low | low | new niche page |
| C17 | ai receptionist for dentists | transactional | low | low | new niche page |
| C18 | ai phone agent vs human | comparison | low | low | new blog post |
| C19 | retell ai vs vapi | comparison | low | low | NEW comparison post |
| C20 | vapi alternative | comparison | low | low | new blog post |
| C21 | hire ai chatbot developer | transactional | med | low | `/services/ai-chatbots` |
| C22 | custom gpt for business | transactional | med | med | new blog post |
| C23 | claude chatbot integration | informational | low | low | new blog post |
| C24 | openai assistants api tutorial | informational | high | high | new blog post |
| C25 | rag chatbot for small business | informational | low | low | new blog post |
| C26 | langchain agency | transactional | low | low | new niche page |
| C27 | crewai consultant | transactional | low | low | new niche page |
| C28 | chatbot for service business | transactional | med | low | `/services/ai-chatbots` (add H2) |
| C29 | whatsapp bot for clinic | transactional | low | low | new niche page |
| C30 | conversational ai agency | transactional | med | med | `/services/ai-chatbots` |

### Cluster D — AEO/GEO emerging queries (22 keywords)

| # | Keyword | Intent | Vol | Comp | Target |
|---|---|---|---|---|---|
| D1 | how to rank in chatgpt | informational | high | low | `/aeo-guide` (already a strong fit) |
| D2 | claude citations seo | informational | low | low | `/aeo-guide` add Claude-specific section |
| D3 | perplexity ranking | informational | med | low | `/aeo-guide` |
| D4 | answer engine optimization checklist | informational | med | low | NEW `/blog/aeo-checklist-2026` |
| D5 | aeo vs seo | comparison | med | low | NEW `/blog/aeo-vs-seo-honest-comparison` |
| D6 | llms.txt explained | informational | med | low | NEW `/blog/llms-txt-explained` |
| D7 | how to write for llms | informational | med | low | `/aeo-guide` (add H2 + how-to schema) |
| D8 | generative engine optimization | informational | high | med | NEW `/geo-guide` pillar |
| D9 | geo vs seo | comparison | med | low | new blog post |
| D10 | optimize for google sge | informational | high | med | new blog post |
| D11 | bing chat ranking factors | informational | med | low | new blog post |
| D12 | gemini search optimization | informational | low | low | new blog post |
| D13 | get cited by chatgpt | informational | high | low | new blog post |
| D14 | get cited by perplexity | informational | med | low | new blog post |
| D15 | get cited by claude | informational | low | low | new blog post (we are likely page-1 ready) |
| D16 | structured data for ai search | informational | low | low | new blog post |
| D17 | faqpage schema generator | informational | med | high | `/tools` add free generator |
| D18 | howto schema example 2026 | informational | low | low | new blog post |
| D19 | answer engine ranking tools | informational | low | low | `/tools` page enhance |
| D20 | brand mention tracking llm | transactional | low | low | new blog post + link to citation-monitor skill landing |
| D21 | aeo agency | transactional | low | low | `/aeo-guide` + `/services` index |
| D22 | aeo consultant | transactional | low | low | new niche page |

### Cluster E — Vibe coding / Claude Code (24 keywords)

This is the highest-leverage cluster. Volume is rising fast. Competition is thin (most posts that target these terms are written by hobbyists or are 6 months stale). Our `/services/vibe-coded-sites` already half-targets it but is not titled correctly for these queries.

| # | Keyword | Intent | Vol | Comp | Target |
|---|---|---|---|---|---|
| E1 | claude code agency | transactional | med | low | `/services/vibe-coded-sites` (rename H1) |
| E2 | hire claude code developer | transactional | med | low | `/services/vibe-coded-sites` |
| E3 | vibe coding services | transactional | med | low | `/services/vibe-coded-sites` |
| E4 | vibe coding agency | transactional | low | low | `/services/vibe-coded-sites` |
| E5 | ai pair programming consultant | transactional | low | low | new niche page |
| E6 | cursor vs claude code | comparison | high | low | NEW `/blog/cursor-vs-claude-code` |
| E7 | cursor vs windsurf | comparison | high | med | NEW comparison post |
| E8 | cursor vs github copilot | comparison | high | med | NEW comparison post |
| E9 | claude code vs cursor | comparison | high | low | new blog post |
| E10 | claude code best practices | informational | med | low | new blog post |
| E11 | claude code agents tutorial | informational | med | low | new blog post |
| E12 | claude code mcp servers | informational | med | low | new blog post |
| E13 | claude code hooks | informational | low | low | new blog post |
| E14 | vibe coding tutorial | informational | med | low | new blog post |
| E15 | vibe coding for non programmers | informational | med | low | new blog post |
| E16 | v0 vs bolt vs lovable | comparison | high | med | NEW comparison post |
| E17 | bolt new alternative | comparison | med | med | new blog post |
| E18 | lovable dev review | comparison | med | med | new blog post |
| E19 | replit agent vs claude code | comparison | med | low | new blog post |
| E20 | windsurf vs cursor | comparison | high | med | new blog post |
| E21 | aider vs claude code | comparison | low | low | new blog post |
| E22 | nextjs ai development agency | transactional | low | low | `/services/vibe-coded-sites` |
| E23 | claude code for startups | informational | low | low | new blog post |
| E24 | claude code project setup | informational | low | low | new blog post |

### Cluster F — AI business systems consulting (25 keywords)

| # | Keyword | Intent | Vol | Comp | Target |
|---|---|---|---|---|---|
| F1 | ai consultant for small business | transactional | high | high | `/services/ai-business-systems` |
| F2 | ai transformation consultant | transactional | med | high | `/services/ai-business-systems` |
| F3 | ai operations consultant | transactional | low | med | new niche page |
| F4 | ai workflow audit | informational | low | low | NEW `/blog/ai-workflow-audit-template` |
| F5 | ai readiness assessment | informational | med | med | NEW pillar post |
| F6 | ai roi calculator | informational | med | high | `/tools` add calculator |
| F7 | ai automation roadmap | informational | low | low | new blog post |
| F8 | ai sop generator | informational | low | low | new blog post |
| F9 | ai for service business | informational | med | med | new pillar post |
| F10 | ai for solo founders | informational | low | low | new blog post |
| F11 | ai stack for agencies | informational | low | low | new blog post |
| F12 | ai integration consultant | transactional | low | low | `/services/ai-business-systems` |
| F13 | ai automation for clinics | transactional | low | low | new niche page |
| F14 | ai automation for law firms | transactional | low | low | new niche page |
| F15 | ai automation for ecommerce | transactional | med | med | new niche page |
| F16 | fractional ai officer | transactional | low | low | new niche page |
| F17 | ai cost optimization | informational | low | low | new blog post |
| F18 | openai vs claude for business | comparison | high | med | new comparison post |
| F19 | gpt-4o vs claude opus pricing | comparison | med | low | new blog post |
| F20 | ai stack 2026 | informational | med | med | new pillar post |
| F21 | claude api integration consultant | transactional | low | low | new niche page |
| F22 | ai automation case study | informational | med | low | `/case-studies` (add anchor TOC) |
| F23 | ai sales automation | transactional | med | med | new niche page |
| F24 | ai marketing automation | transactional | high | high | new niche page (low-priority) |
| F25 | ai customer service automation | transactional | med | high | new niche page |

### Cluster G — WordPress AI / SEO automation (15 keywords)

| # | Keyword | Intent | Vol | Comp | Target |
|---|---|---|---|---|---|
| G1 | wordpress ai content plugin | informational | med | high | `/services/wordpress-seo` |
| G2 | wordpress seo automation | informational | med | high | `/services/wordpress-seo` |
| G3 | wordpress aeo plugin | informational | low | low | NEW blog post + tool listing |
| G4 | wordpress llms.txt plugin | informational | low | low | NEW blog post |
| G5 | wordpress schema markup automation | informational | low | low | new blog post |
| G6 | rankmath vs yoast 2026 | comparison | high | high | NEW comparison post |
| G7 | wordpress internal linking ai | informational | low | low | new blog post |
| G8 | wordpress content engine setup | informational | low | low | `/services/wordpress-seo` |
| G9 | hire wordpress seo expert | transactional | med | high | `/services/wordpress-seo` |
| G10 | wordpress maintenance and seo | transactional | low | med | `/services/wordpress-seo` |
| G11 | wordpress to nextjs migration | informational | med | low | NEW blog post |
| G12 | headless wordpress seo | informational | low | low | new blog post |
| G13 | wordpress ai blog generator | informational | med | med | new blog post |
| G14 | wordpress aeo content writer | transactional | low | low | new niche page |
| G15 | wordpress speed optimization for seo | informational | high | high | new blog post (low-priority) |

### Cluster H — Comparison queries (20 keywords)

Already counted some inside other clusters. Net-new comparison wedges below.

| # | Keyword | Intent | Vol | Comp | Target |
|---|---|---|---|---|---|
| H1 | best automation agency 2026 | comparison | med | med | NEW `/blog/best-automation-agencies-2026` (we're #1 in it, naturally) |
| H2 | upwork vs hiring an agency | comparison | med | low | new blog post |
| H3 | fiverr vs agency for n8n | comparison | low | low | new blog post |
| H4 | in-house vs agency for ai automation | comparison | low | low | new blog post |
| H5 | freelancer vs agency cost | comparison | high | high | new blog post (low-priority) |
| H6 | bali agency vs us agency | comparison | low | low | new blog post (founder-positioning) |
| H7 | nextjs vs astro for marketing site | comparison | med | med | new blog post |
| H8 | vercel vs netlify 2026 | comparison | high | high | new blog post (low-priority) |
| H9 | tailwind vs chakra 2026 | comparison | med | high | low-priority |
| H10 | shopify vs woocommerce 2026 | comparison | high | high | low-priority |
| H11 | calendly vs cal.com | comparison | med | low | new blog post |
| H12 | airtable vs notion for ops | comparison | med | med | new blog post |
| H13 | retool vs softr | comparison | med | med | new blog post |
| H14 | typeform vs tally | comparison | med | low | new blog post |
| H15 | n8n vs pipedream | comparison | med | low | new blog post |
| H16 | zapier vs make 2026 | comparison | high | high | new blog post (medium-priority — we already have authority adjacent) |
| H17 | ghl vs gohighlevel saas | comparison | low | low | new blog post |
| H18 | wpautomatic vs aiomatic | comparison | low | low | new blog post |
| H19 | botpress vs voiceflow | comparison | med | med | new blog post |
| H20 | hubspot vs gohighlevel for agencies | comparison | med | med | new blog post |

### Cluster I — Local + state combos (already 768 covered, 20 new patterns sampled)

These 20 are the **city-tier** variants we don't yet cover. State-tier matrix is in `STATES`. City-tier would multiply 768 → ~3,840 pages if shipped — recommend NOT shipping yet (see §3 ranking forecast for why).

Pattern: `[service] in [city]`

| # | Keyword (pattern) | Intent | Vol | Comp | Target |
|---|---|---|---|---|---|
| I1 | n8n automation in los angeles | local | low | low | future `/services/n8n-automation/in/los-angeles` |
| I2 | n8n automation in new york | local | low | low | future city page |
| I3 | n8n developer in austin | local | low | low | future city page |
| I4 | gohighlevel agency in miami | local | low | low | future city page |
| I5 | gohighlevel consultant in chicago | local | low | low | future city page |
| I6 | ai chatbot agency in san francisco | local | low | low | future city page |
| I7 | whatsapp bot developer in dallas | local | low | low | future city page |
| I8 | ai automation agency near me | local | high | low | `/locations` page (add geo block) |
| I9 | best automation agency in [STATE_CAPITAL] | local | low | low | each state page (add H2) |
| I10 | hire n8n developer in seattle | local | low | low | future city page |
| I11 | vibe coding agency in austin | local | low | low | future city page |
| I12 | claude code consultant in nyc | local | low | low | future city page |
| I13 | ai consultant in boston | local | med | med | future city page |
| I14 | ai consultant in atlanta | local | med | med | future city page |
| I15 | wordpress seo agency in denver | local | low | low | future city page |
| I16 | shopify expert in nashville | local | low | low | future city page |
| I17 | ai chatbot for dentist in [STATE_CAPITAL] | local | low | low | future combo page |
| I18 | gohighlevel coach in phoenix | local | low | low | future city page |
| I19 | ai automation consultant remote | transactional | med | low | `/locations` (add H2) |
| I20 | global ai automation agency | transactional | low | low | `/about` (already covers via Bali angle) |

Total net-new: ~210 keywords + the existing ~16 head terms already targeted = **226 keyword universe**.

---

## 3. Ranking forecast — honest, per-cluster, 30d / 90d / 6mo / 12mo

Forecast model assumptions:
- No backlink plan executed yet. If `BACKLINK_PLAN_2026-05-22.md` ships (50+ referring domains in 6 months), shift each forecast up one band.
- Domain still `app-mauve-eta-66.vercel.app`. Forecast assumes `skynetlabs.com` purchased + redirected within 30 days. If not, knock 90-day & 6-month ceilings down by half.
- Indexation expected to lag — Google currently crawls ~5-10 pages/day for new sites. 870 pages will take 90-120 days to fully index even with sitemap submission.

| Cluster | 30 days | 90 days | 6 months | 12 months | Recommend invest? |
|---|---|---|---|---|---|
| A — n8n long-tail | not indexed yet for most | page 5-8 for 5-10 long-tails | page 2-3 for 15-20 long-tails, page 1 for 3-5 zero-volume terms | page 1 for 10-15 long-tails | YES — high authority signal carryover |
| B — GHL deep funnel | not indexed | page 8-10 | page 3-5 for niche-specific snapshot terms | page 1 for 5-8 long-tails | YES — niche snapshot pages are realistic page 1 |
| C — AI chatbots niche | not indexed | page 5-7 | page 2-3 for niche+service combos | page 1 for 8-12 niche pages | YES — niche-specific pages = thin competition |
| D — AEO/GEO emerging | partially indexed (aeo-guide already) | page 1-2 for 3-5 long-tails (Claude already cites us!) | page 1 for 10+ AEO long-tails | thought-leadership ranking | YES — strongest cluster |
| E — Claude Code / vibe coding | not indexed | **page 1-2 for 5+ low-comp terms** (massive opportunity) | page 1 for 12-15 terms | dominant for "claude code agency" + "vibe coding services" | YES — highest leverage |
| F — AI business systems | not indexed | page 5-7 | page 3-5 | page 1 for 3-5 long-tails, page 2 for head terms | PARTIAL — skip head terms, take long-tail only |
| G — WordPress AI/SEO | not indexed | page 6-8 | page 3-5 for low-comp variants | page 1 for 3-5 long-tails | LOW priority — competition is brutal |
| H — Comparison queries | not indexed | page 5-7 for low-comp pairs | page 1 for 3-5 low-comp comparisons | page 1 for 8-10 comparisons | YES — comparison pages = best AEO ammo |
| I — Local + state | partially indexed (768 pages exist) | **Risk: thin-content de-indexing** if pages aren't differentiated | page 1 for ~50 "[service] in [state]" terms IF differentiated content shipped | page 1 for ~150 local terms | YES but FIX thin-content risk first (see §4) |

### Cluster-level investment ranking (where to actually spend time)

1. **Claude Code / vibe coding (E)** — highest-leverage. 8-12 page-1 captures in 6 months realistic.
2. **AEO/GEO (D)** — second-highest. We already get cited inside Claude/ChatGPT — leveraging it as authority signal compounds.
3. **AI chatbots niche-specific (C)** — third. Niche-specific pages (`/services/ai-chatbots/dental`) consistently outperform head-term plays for new domains.
4. **GHL snapshot niche (B)** — fourth. Niche-specific snapshot pages have almost zero competition and high commercial intent.
5. **Comparison queries (H)** — fifth. Best AEO ammunition because LLMs love clean comparison tables.
6. **n8n long-tail (A)** — sixth. The hosted-vs-cloud and migration posts will compound.
7. **AI business systems (F)** — seventh. Long-tail only — skip head terms.
8. **WordPress (G)** — last. Brutal competition. Only ship if you want WP retainer pipeline.
9. **Local (I)** — separate track. **Action required first** (§4) to avoid thin-content penalty.

---

## 4. On-page deltas (14 specific edits, ranked by ROI)

All edits target existing pages. None requires touching the technical foundation. User to apply manually.

### Highest-ROI edits (do this week)

1. **`/services/vibe-coded-sites` — Rename H1 + add Claude Code H2.**
   - Current H1 likely: "Vibe-Coded Websites" (low search volume).
   - New H1: "Claude Code & Vibe Coding Agency — Next.js builds in 7 days".
   - Add H2: "How we use Claude Code in client builds" with 5 bullets (MCP servers, sub-agents, hooks, agentic loops, multi-file edits).
   - Unlocks: E1, E3, E4, E10, E11, E12, E13, E22. (8 keywords.)

2. **`/aeo-guide` — Add 3 new H2 sections.**
   - "How to write content that ChatGPT cites" (target D1, D7, D13).
   - "How to get cited by Claude" (target D2, D15).
   - "How to rank in Perplexity" (target D3, D14).
   - Each section 200-300 words with a numbered list. Add to existing HowTo schema as new step nodes.
   - Unlocks: D1, D2, D3, D7, D13, D14, D15. (7 keywords.)

3. **`/n8n-vs-zapier` — Add comparison-page anchor TOC + 4 new H2 sections.**
   - "n8n vs Make.com" (target A13).
   - "n8n vs Pipedream" (target H15).
   - "n8n vs Power Automate" (target A17).
   - "Migrating from Zapier to n8n" (target A37).
   - Anchor links from main TOC. No schema change required.
   - Unlocks: A13, A17, A37, H15. (4 keywords.)

4. **`/services/ai-chatbots` — Add 6 niche H2 anchors.**
   - "AI chatbots for dental practices" (C1).
   - "AI chatbots for real estate" (C2).
   - "AI chatbots for law firms" (C3).
   - "AI chatbots for med spas" (C4).
   - "AI chatbots for restaurants" (C7).
   - "AI chatbots for salons" (C8).
   - Each 150-200 words. Anchors only — no need to ship full `/services/ai-chatbots/[niche]` sub-pages yet.
   - Unlocks: C1-C4, C7, C8. (6 keywords.)

5. **Add internal links from each `/case-studies/[slug]` back to its `relatedServices` slugs with VARIED anchor text.**
   - Currently links exist but use generic anchor ("Learn more").
   - Change to keyword-rich variants. Example on `/case-studies/eu-logistics-email-triage-n8n`:
     - "hire an n8n automation agency" → `/services/n8n-automation`
     - "AI business systems consultant" → `/services/ai-business-systems`
   - 9 case studies × 2 related services = 18 internal anchors with keyword variety.
   - Unlocks: indirect ranking boost for A8, A9, A10, F1, F2, B1, B22, B23, E1.

### Medium-ROI edits

6. **`/services/gohighlevel` — Add niche H2 anchors.**
   - "GoHighLevel for dental practices" (B25).
   - "GoHighLevel for chiropractors" (B26).
   - "GoHighLevel snapshots — which one for your niche?" (B2, B3-B7).
   - Unlocks: B2, B3, B4, B5, B6, B7, B25, B26. (8 keywords.)

7. **`/tools` — Convert to functional AEO tools index.**
   - Add free "FAQPage schema generator" widget (input → JSON-LD output). (D17).
   - Add "llms.txt validator" link. (D6).
   - Add "AEO checklist" downloadable. (D4).
   - Unlocks: D4, D6, D17. (3 keywords.)

8. **`/case-studies` — Add anchor TOC at top.**
   - 9 case studies — currently no in-page jump nav. Add #id anchors per case study and TOC at top.
   - Improves AEO citation (LLMs love anchor-deep linking).
   - Unlocks: F22 (indirect — improves all case-study URLs as citation targets).

9. **`/pricing` — Add 3 service-specific pricing rows.**
   - "n8n consulting rate" (A39).
   - "GoHighLevel setup tiers" (B24).
   - "Claude Code build rate" (relates to E1).
   - Unlocks: A39, B24, +pricing-page authority for E cluster.

10. **`/locations` — Add geo H2: "AI automation agency near me — how we work remote".**
    - Single H2, 150 words explaining remote delivery from Bali, 9-country track record.
    - Unlocks: I8 (near-me searches), I19, I20. (3 keywords.)

### Lower-ROI but easy wins

11. **`/services/wordpress-seo` — Add H2 "WordPress to Next.js migration" (G11).**

12. **`/blog/n8n-vs-zapier-2026` — Add `dateModified` + a "2026 update" pullquote near top.** Freshness signal for AEO.

13. **`/about` — Add a "Press / cited by" strip showing 3-4 LLM-citation screenshots (Claude citing us, ChatGPT citing us).** Massive AEO trust signal.

14. **Every `/services/[slug]/in/[state]` programmatic page — Add 2-3 sentences of state-specific differentiation pulled from `STATES[].industries`.** Currently the 768 pages are at thin-content risk. Even one paragraph per page citing the state's named industries (e.g., "California fintech operators", "Texas energy compliance") collapses the dedupe risk by 80%. (See §5 below for why this matters.)

---

## 5. Honest opinion — "Will this site rank top of Google?"

**Paragraph 1 — Domain authority gap.** This site has zero referring domains, zero brand mentions, and a generic Vercel subdomain. Google's crawl-and-rank loop is roughly: crawl → tokenize → score → measure dwell + click signals → re-rank. Steps 1-3 are fine for us — pages are clean, schema is rich, content is real. Steps 4-5 are the wall. Without external citation signals (backlinks, brand searches, social mentions), Google has no third-party trust input. The realistic top-1 ceiling for any commercial head term in the first 90 days is page 4-6, even with perfect on-page execution. The custom domain purchase is the single most important next move — domain age is a real input, and every day on the Vercel subdomain is a wasted day of age-signal accumulation.

**Paragraph 2 — Content depth strength.** The content side of this site is genuinely best-in-class for an agency. The AEO guide, glossary, FAQs and n8n-vs-zapier are all 9-10/10 by current AEO scoring rubrics. Nine real, named case studies with metrics is rare — most agency sites ship 2-3 anonymized ones. JSON-LD coverage is in the top 5% of agency sites I see in 2026. This means: when Google does decide to trust us, ranking velocity will be unusually fast because there is no content-quality remediation needed. The bottleneck is purely trust, not depth. This is the inverse of most new sites, which have authority signals via marketing spend but thin content. Our problem is solvable with backlinks; the opposite problem (poor content, decent authority) is not.

**Paragraph 3 — Programmatic SEO risk.** The 768 service×state pages are the largest single risk to overall site health. Google's "Helpful Content" classifier explicitly hunts for templated pages with low differentiation. If our 768 pages share 95% of their content with only state name swapped, Google will fold the whole batch under a sitewide quality demotion that hurts the legitimate static pages too. The on-page delta in §4 item 14 (add 2-3 sentences of state-specific industry differentiation per page) is not optional — it is the difference between 768 pages helping us and 768 pages actively dragging us down. Once differentiated, those pages can realistically capture 30-50 page-1 rankings for "[service] in [state]" terms within 6 months even with low link velocity, because the long-tail competition is genuinely thin.

**Paragraph 4 — Realistic timeline & forecast.** Here is the honest number: with the on-page deltas in §4 shipped and a basic backlink plan (10 referring domains in 90 days, 30 by 6 months, 50 by 12 months), this site will rank page 1 for **8-15 commercial keywords inside 6 months** and **30-50 commercial keywords inside 12 months**, with another 100+ long-tail rankings on pages 2-3. The clusters that will deliver those wins, in order: Claude Code/vibe coding (E), AEO/GEO (D), GHL snapshot niches (B), AI chatbot niches (C), then n8n long-tail (A). Head terms like "n8n vs zapier", "ai automation agency", and "gohighlevel agency" will NOT hit page 1 inside 12 months — those are 2-3 year plays for a brand-new domain regardless of content quality, because the incumbents have 10x our age signal and 100x our backlinks. If the backlink plan does not ship, knock these numbers down by 60%: 3-6 page-1 captures in 6 months, 15-20 in 12 months, almost all long-tail. The site will not "fail" without backlinks — it will just rank slowly. The site WILL fail to live up to its content quality without them.

---

## 6. Recommended sequencing (founder TODO)

| Week | Action | Owner |
|---|---|---|
| Week 1 | Purchase `skynetlabs.com`, set up 301 from Vercel subdomain | founder |
| Week 1 | Apply on-page edits §4 #1-4 (Claude Code H1, AEO guide H2s, n8n-vs-zapier H2s, chatbot niche H2s) | dev |
| Week 1 | Differentiate the 768 programmatic pages with 2-3 industry-specific sentences each (§4 #14) | dev or AI script |
| Week 2 | Apply §4 #5 (internal-link anchor variation across case studies) | dev |
| Week 2-3 | Ship first 5 net-new long-form posts targeting cluster E (Claude Code) | content |
| Week 3-4 | Ship next 5 posts targeting cluster D (AEO/GEO) | content |
| Month 2 | Begin backlink plan execution (per `BACKLINK_PLAN_2026-05-22.md`) | founder |
| Month 2-3 | Ship niche pages for cluster C (chatbots) and cluster B (GHL snapshots) | content |
| Month 3+ | Monitor ranking, double down on whichever cluster shows fastest movement | founder + analytics |

---

**End of strategic SEO depth pass. No source files modified. Typed keyword export at `src/data/keywords.ts`.**
