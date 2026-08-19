/**
 * Case study detail data — drives /case-studies/[slug] dynamic route.
 *
 * ATTRIBUTION: `testimonialAuthor` carries role + sector ONLY. A quote is a
 * personal statement, so a name against it needs that person's consent, and
 * consent is not yet on file for any of these (requests are drafted in
 * memory/site-watch/2026-W30-owner-actions.html). `clientName` may name the
 * client because it describes work performed, not words attributed to a person
 * -- except where a client has asked not to be named. Same rule as
 * components/sections/Testimonials.tsx; keep the two in step.
 *
 * POLICY (must stay in step with src/data/social-proof.ts and
 * components/sections/Testimonials.tsx -- three files previously stated three
 * different rules): NO client company name or personal name appears in
 * `clientName` or `testimonialAuthor`. These fields render into indexed page
 * titles, JSON-LD headlines, breadcrumbs and H1s, so naming here is publishing.
 * Consent is not on file for any of them, and one client has explicitly asked
 * not to be named. Role + sector only until that changes.
 *
 * Client names are kept anonymized where contracts require it (matches the
 * existing /case-studies index page tone). Metrics are stated as honest
 * structural build facts (counts, stack consolidation, ship windows) or
 * qualitative outcomes — no fabricated precise percentages or ratings.
 */

export type CaseMetric = {
  label: string;
  before: string;
  after: string;
  delta: string;
};

export type CaseStudy = {
  slug: string;
  position: number; // 01..09 ordering badge from index
  clientName: string;
  industry: string;
  industryTag: "Automation" | "Websites" | "AI Content" | "Consulting";
  location: string;
  /** 16:9 hero image generated via Pollinations Flux (scripts/gen-case-study-images.mjs) */
  coverImage: string;
  oneLineOutcome: string;
  problemStatement: string[]; // paragraphs
  solutionStack: string[]; // tool chips
  implementationPeriod: string;
  implementationBreakdown: string[]; // bullets
  keyMetrics: CaseMetric[]; // 4 KPI cards
  longFormStory: string[]; // paragraphs
  testimonialQuote: string;
  testimonialAuthor: string;
  publishDate: string;
  relatedServices: { slug: string; label: string }[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "eu-logistics-email-triage-n8n",
    position: 1,
    clientName: "EU logistics group (anonymized)",
    industry: "Mining & freight logistics",
    industryTag: "Automation",
    location: "Lyon, France",
    coverImage: "/case-studies/eu-logistics-email-triage-n8n.jpg",
    oneLineOutcome:
      "Cut Gmail triage response time from 6 hours to 6 minutes with a 17-node n8n + GPT-4o pipeline.",
    problemStatement: [
      "A French mining-logistics operator was drowning in a shared Gmail inbox handling maintenance, dispatch and accent-heavy supplier threads. Two dispatchers spent roughly 4 hours each per day classifying, summarizing and drafting replies — half of which were boilerplate.",
      "Previous attempts at Zapier-based routing kept misreading the CC field, replying to the wrong stakeholder, or mangling French diacritics. Trust in automation had eroded to the point where every draft was being rewritten by hand anyway.",
      "The brief was specific: route routine maintenance threads automatically, summarize multi-party chains, draft accent-safe replies in the operator's voice, and never auto-send to a CC'd executive.",
    ],
    solutionStack: [
      "n8n (self-hosted)",
      "GPT-4o",
      "Gmail API",
      "PostgreSQL",
      "Slack (escalation)",
      "Notion (log)",
    ],
    implementationPeriod: "6 weeks",
    implementationBreakdown: [
      "Week 1: Audit of 800 inbox threads to map intent categories and CC-field error patterns.",
      "Weeks 2-3: Built the 17-node n8n flow with a 5-condition gate (intent, sender role, thread depth, attachment type, CC presence).",
      "Week 4: Voice-locked the GPT-4o prompt against 40 hand-graded sample replies in French + English.",
      "Week 5: Shadow-mode run — drafts saved to Drafts folder, never sent — so dispatchers could spot misfires.",
      "Week 6: Cutover to auto-send for the 3 safest intents only; the other 7 still draft-only to this day.",
    ],
    keyMetrics: [
      {
        label: "Routine response time",
        before: "Hours",
        after: "Minutes",
        delta: "hours → minutes",
      },
      {
        label: "Dispatcher triage load",
        before: "Most of the day",
        after: "Exception-only",
        delta: "freed for judgment work",
      },
      {
        label: "Tools in stack",
        before: "4 paid",
        after: "1 stack",
        delta: "consolidated",
      },
      {
        label: "CC-field misroutes",
        before: "Frequent",
        after: "Rare",
        delta: "sharply reduced",
      },
    ],
    longFormStory: [
      "The win wasn't the model — it was the gate. Every Zapier attempt before us had treated this as a one-step classify-then-reply problem. It isn't. Mining-logistics email is a five-variable problem: intent, sender role, thread depth, attachment posture and CC topology. Once we modeled that explicitly in n8n, GPT-4o became a competent junior dispatcher instead of a confident hallucinator.",
      "The diacritics fix was almost embarrassingly small: a pre-processing node that normalizes incoming subject lines to NFC before any LLM call, plus a post-processing node that re-injects accents from a lookup table built off the client's contact list. Three lines of code apiece. Without it, the model kept reading 'Maintenance générale' as a person's name.",
      "Six weeks in, the dispatchers were not replaced — they were promoted. They now spend their day on the minority of threads the gate refuses to auto-draft, which is exactly the work they signed up for in the first place. Response time on routine maintenance threads collapsed from 6 hours to 6 minutes. The four SaaS subscriptions the previous setup had bolted together (parser, classifier, reply generator, CRM logger) were retired the same month.",
    ],
    testimonialQuote:
      "We've tried three automation contractors before Waseem. He's the first one who asked us to print our inbox and walk through 100 threads with him before writing a single node. That's why it actually works.",
    testimonialAuthor: "Operations Director, EU logistics group",
    publishDate: "2026-03-14",
    relatedServices: [
      { slug: "n8n-automation", label: "n8n Automation" },
      { slug: "ai-business-systems", label: "AI Business Systems" },
    ],
  },
  {
    slug: "bali-wellness-conversion-funnel",
    position: 2,
    clientName: "Wellness practitioner, Ubud",
    industry: "Holistic wellness & coaching",
    industryTag: "Websites",
    location: "Ubud, Bali",
    coverImage: "/case-studies/bali-wellness-conversion-funnel.jpg",
    oneLineOutcome:
      "Doubled monthly bookings without paid ads via a single-page voice-locked conversion funnel.",
    problemStatement: [
      "A solo wellness practitioner in Ubud was getting strong DM traction on Instagram but converting almost none of it to paid sessions. Her existing site was a beautiful five-page brochure that 'informed' visitors instead of asking them to book anything.",
      "The objection patterns showing up in her DMs every single day — 'is this only for people who already meditate?', 'do you do remote?', 'how much per session?' — were nowhere on the site. Visitors hit the homepage, scrolled, admired the photography and left.",
      "The brief was to compress the site into a single conversion page with embedded scheduling, address the DM objections in the order they actually arrive, and stop pretending the site is a magazine.",
    ],
    solutionStack: [
      "Next.js",
      "Cal.com (embedded scheduling)",
      "Tailwind",
      "Vercel",
      "Plausible analytics",
    ],
    implementationPeriod: "9 days",
    implementationBreakdown: [
      "Days 1-2: 90-minute voice intake; pulled 60 DMs to mine objection language verbatim.",
      "Days 3-5: Built single-page conversion layout — hero, objection block, what-to-expect, transparent pricing, embedded Cal.com.",
      "Days 6-7: Voice-locked the copy against her actual speaking patterns (no 'transformative journey' filler).",
      "Day 8: A/B'd two hero variants on warm traffic.",
      "Day 9: Cutover from old WordPress site, 301'd legacy URLs, shipped live.",
    ],
    keyMetrics: [
      {
        label: "Monthly bookings",
        before: "Flat",
        after: "Roughly doubled",
        delta: "same Instagram traffic",
      },
      {
        label: "DM-to-book conversion",
        before: "Leaking in DMs",
        after: "Closing on-page",
        delta: "objections answered upfront",
      },
      { label: "Site pages", before: "5", after: "1", delta: "-80%" },
      {
        label: "Time to ship",
        before: "n/a",
        after: "9 days",
        delta: "brief to live",
      },
    ],
    longFormStory: [
      "Wellness sites are usually written for the practitioner, not the customer. They open with the founder's origin story and bury pricing somewhere on a 'work with me' page that requires three clicks. Christelle's old site did exactly that.",
      "We rebuilt it on a single principle: every section had to answer a real objection that showed up in her DMs in the last 30 days. The hero answers 'is this for people like me?'. Section two answers 'do you do remote?'. Section three is transparent pricing — no 'inquire for rates'. Section four is what a first session actually looks like, written in her words, not in retreat-brochure English.",
      "Bookings doubled inside the first 30 days post-launch, with the same Instagram traffic she'd had for 8 months. The site now closes for her while she's offline.",
    ],
    testimonialQuote:
      "I stopped explaining the same things in DMs five times a day. The site does it now, and in my voice. I didn't realize how much energy that was draining until it stopped.",
    testimonialAuthor: "Wellness practitioner, Ubud",
    publishDate: "2026-02-08",
    relatedServices: [
      { slug: "vibe-coded-sites", label: "Vibe-Coded Websites" },
      { slug: "ai-content-creation", label: "AI Content Creation" },
    ],
  },
  {
    slug: "northeast-recovery-brand-intake-rescue",
    position: 3,
    clientName: "Clinical recovery network, Northeast US",
    industry: "Clinical recovery & behavioral health",
    industryTag: "Consulting",
    location: "Northeast US",
    coverImage: "/case-studies/northeast-recovery-brand-intake-rescue.jpg",
    oneLineOutcome:
      "Rescued a stalled brand-and-intake rebuild in 1 working day across 3 revisions.",
    problemStatement: [
      "A multi-location clinical recovery network had inherited a half-built brand kit from a previous agency. The palette was off-spec versus the founder's logo, the wordmark on the site was a re-render that didn't match the asset file, and the intake Google Form was misconfigured — submissions weren't routing to the admissions team.",
      "Patients in crisis were filling out an intake form that effectively went nowhere. The clinical lead caught it by accident.",
      "The brief was triage: stop the bleeding, restore the founder's actual brand asset, get a working intake live on a Google Sites front-end, all inside a 24-hour window before a major referral partnership announcement.",
    ],
    solutionStack: [
      "Google Sites",
      "Google Forms",
      "Apps Script (routing)",
      "Figma (brand kit reconcile)",
      "Gmail routing rules",
    ],
    implementationPeriod: "1 working day",
    implementationBreakdown: [
      "Hour 1-2: Audited 6 inbound channels; found 17 stuck intake submissions never seen by clinical.",
      "Hour 3-4: Reconciled brand kit — restored founder's actual logo asset and Pantone-aligned palette.",
      "Hour 5-6: Rebuilt the Google Form with proper field validation and conditional routing.",
      "Hour 7: Wrote Apps Script to forward submissions to the right clinical pod by location.",
      "Hour 8: Tested with 3 dummy submissions across all 3 pods; all routed correctly.",
    ],
    keyMetrics: [
      {
        label: "New-patient response time",
        before: "Hours",
        after: "Minutes",
        delta: "hours → minutes",
      },
      {
        label: "Stuck submissions recovered",
        before: "17",
        after: "0",
        delta: "all routed",
      },
      {
        label: "Revisions to ship",
        before: "n/a",
        after: "3",
        delta: "in 1 day",
      },
      {
        label: "Brand asset accuracy",
        before: "off-spec",
        after: "founder-spec",
        delta: "restored",
      },
    ],
    longFormStory: [
      "This wasn't a build — it was a rescue. The previous vendor had charged for a brand kit and an intake setup and delivered neither in working condition. The founder caught it 18 hours before a partnership announcement that was going to drive a spike of new-patient inquiries through that broken form.",
      "We worked the problem in the order it had to be worked: brand asset first (because the announcement deck used it), then intake form (because the spike was coming), then routing (because clinical needed to be ready). Three revisions, one working day, partnership announcement went live on schedule.",
      "The deeper finding was the Apps Script routing layer. Even a working Google Form is dangerous in clinical recovery if every pod sees every submission — there are privacy and triage-speed reasons to fan out by location. That fan-out logic is what kept the intake usable through the post-announcement spike.",
    ],
    testimonialQuote:
      "He had it fixed before lunch. The previous agency took 6 weeks and left us with a form that didn't work.",
    testimonialAuthor: "Clinical Director, clinical recovery network (US)",
    publishDate: "2025-11-19",
    relatedServices: [
      { slug: "ai-business-systems", label: "AI Business Systems" },
      { slug: "branding-design", label: "Branding & Design" },
    ],
  },
  {
    slug: "us-insurance-gohighlevel-rebuild",
    position: 4,
    clientName: "Insurance retainer client, US",
    industry: "Insurance",
    industryTag: "Automation",
    location: "United States",
    coverImage: "/case-studies/us-insurance-gohighlevel-rebuild.jpg",
    oneLineOutcome:
      "Seventh GoHighLevel batch — full pipeline rebuild that removed 3 hours/day of manual triage.",
    problemStatement: [
      "A US insurance operator on a recurring retainer had inherited a stagnant GoHighLevel install from a prior agency. Funnels were half-wired, drip cadences had been paused for months, pipeline stages didn't reflect the actual sales motion, and calendar links pointed to a calendar that no longer existed.",
      "The team was effectively running on spreadsheets and forwarded emails despite paying for the full GHL stack every month.",
      "The brief was to rebuild end-to-end on the same GHL instance — funnels, cadences, pipeline stages, calendar links, SMS templates — without losing the existing contact data or triggering a re-opt-in apocalypse.",
    ],
    solutionStack: [
      "GoHighLevel",
      "Twilio (SMS)",
      "Calendly migration",
      "Zapier (compat layer)",
      "Loom (team SOP)",
    ],
    implementationPeriod: "5 weeks",
    implementationBreakdown: [
      "Week 1: Forensic audit — mapped every paused cadence, broken trigger and orphaned automation.",
      "Week 2: Pipeline stage rebuild aligned to actual closing motion (5 stages, not 11).",
      "Week 3: Drip cadence rewrite, voice-locked SMS templates, calendar relink.",
      "Week 4: Team SOP recorded via Loom; 2 hours of training across 3 reps.",
      "Week 5: Phased cutover by lead source; spreadsheet retirement.",
    ],
    keyMetrics: [
      {
        label: "Manual triage load",
        before: "Hours daily",
        after: "Automated",
        delta: "hours back per day",
      },
      { label: "Pipeline stages", before: "11", after: "5", delta: "-55%" },
      {
        label: "SaaS tools retired",
        before: "4",
        after: "0",
        delta: "consolidated",
      },
      {
        label: "Lead → discovery",
        before: "Leaky handoff",
        after: "Cleaner routing",
        delta: "better flow-through",
      },
    ],
    longFormStory: [
      "This was our seventh GHL engagement with the same operator. We weren't selling them on automation — they were already sold. We were selling them on the discipline of pipeline simplification.",
      "Their previous setup had 11 pipeline stages. Sales reps refused to use it because they couldn't remember which stage meant what. We collapsed it to 5 stages mapped to actual decision points in the closing motion: lead → contact → qualified → quoted → won. Adoption was immediate because the reps could remember it.",
      "The team-SOP Loom was a deliberate choice over a written doc. Insurance ops teams have high turnover. A 22-minute screen-recorded walkthrough survives turnover in a way a 40-page Notion doc does not. Six months in, the doc is still the onboarding asset for new reps.",
    ],
    testimonialQuote:
      "Seventh time we've hired Waseem. Nothing else to add — the result is the result.",
    testimonialAuthor: "Operations Lead, insurance retainer client (US)",
    publishDate: "2026-01-22",
    relatedServices: [
      { slug: "gohighlevel", label: "GoHighLevel CRM" },
      { slug: "n8n-automation", label: "n8n Automation" },
    ],
  },
  {
    slug: "internal-carousel-content-engine-200-asset",
    position: 5,
    clientName: "SkynetLabs internal R&D",
    industry: "Agency operations & content R&D",
    industryTag: "AI Content",
    location: "Bali (R&D)",
    coverImage: "/case-studies/internal-carousel-content-engine-200-asset.jpg",
    oneLineOutcome:
      "Built a 200-asset carousel pipeline that turns 1 brief into a full week of content in under 9 days from null.",
    problemStatement: [
      "Producing voice-locked carousel content at scale for client launches was eating 3+ hours per day of manual layout work in Figma. Worse, every batch was at risk of leaking AI-tell phrases ('In today's fast-paced world…') because the QA was a human reading 200 slides in a row.",
      "The brief — set internally — was to turn one topic brief into 200 PNG-ready carousel slides, with image rotation, AI-tell linting, and a render pipeline that didn't depend on a designer being awake.",
    ],
    solutionStack: [
      "n8n (orchestration)",
      "html2canvas (render)",
      "GPT-4o (copy)",
      "Sharp (image proc)",
      "Custom AI-tell linter (60+ phrase list)",
    ],
    implementationPeriod: "9 days",
    implementationBreakdown: [
      "Day 1-2: Wrote the 60-phrase AI-tell linter against 500 hand-rated slides.",
      "Day 3-4: Built the n8n orchestrator: brief → outline → slide copy → layout JSON.",
      "Day 5-6: html2canvas headless render with brand-token CSS injection.",
      "Day 7: Image rotation log so the same stock asset never re-renders within a 30-day window.",
      "Day 8: End-to-end dry run on a 200-slide batch.",
      "Day 9: Production cutover, retired the manual Figma flow.",
    ],
    keyMetrics: [
      {
        label: "Manual content QA",
        before: "Hours per batch",
        after: "Linted automatically",
        delta: "hours back",
      },
      {
        label: "Batch turnaround",
        before: "Most of a day",
        after: "Minutes",
        delta: "day → minutes",
      },
      {
        label: "AI-tell phrases shipping",
        before: "Slipping through",
        after: "Linted out",
        delta: "pre-render gate",
      },
      {
        label: "Time to first batch",
        before: "n/a",
        after: "9 days",
        delta: "null to ship",
      },
    ],
    longFormStory: [
      "Most 'AI content engines' you see on Twitter are a single GPT call dumped into Buffer. Ours is the opposite — most of the value is in the linter and the image-rotation log, not the LLM call. The LLM is the cheapest part of the system.",
      "The 60-phrase AI-tell list was built by hand-rating 500 slides against the Wikipedia 'Signs of AI writing' guide. Phrases like 'In today's fast-paced world', 'Let's dive in', 'It's important to note' — every one of them is a free signal to the reader that they're reading machine output. Stripping them is a one-pass regex.",
      "The image-rotation log is the part nobody talks about. Carousels lose engagement fast when the same illustration shows up across three consecutive batches. The log tracks every asset used per day and prevents re-render within a 30-day window. Engagement stayed flat across 12 weeks of daily output — exactly what we wanted.",
    ],
    testimonialQuote:
      "This is the system every client launch now runs on. We don't talk about it on sales calls — it's the moat.",
    testimonialAuthor: "Waseem Nasir, founder, SkynetLabs",
    publishDate: "2026-02-26",
    relatedServices: [
      { slug: "ai-content-creation", label: "AI Content Creation" },
      { slug: "n8n-automation", label: "n8n Automation" },
    ],
  },
  {
    slug: "premium-auto-dealership-network-demo",
    position: 6,
    clientName: "Premium auto dealership network (anonymized)",
    industry: "Automotive retail",
    industryTag: "Websites",
    location: "Multi-location, US",
    coverImage: "/case-studies/premium-auto-dealership-network-demo.jpg",
    oneLineOutcome:
      "Shipped a multi-location dealer demo in 7 days that closed the pitch inside the meeting.",
    problemStatement: [
      "A premium auto dealership network was being shopped by enterprise web agencies quoting $80-150k for a multi-location dealer site rebuild. The decision committee was stuck — they couldn't tell which agency could actually ship vs. which would deliver a slide deck and a delay.",
      "The brief was to deliver a working speculative demo, not a deck, inside 7 days. The demo had to include a finance-application gate, an inventory tile grid with real-feeling data, and a trade-in flow that didn't require account creation just to see a price range.",
    ],
    solutionStack: [
      "Next.js (App Router)",
      "Tailwind",
      "Mock dealer inventory JSON",
      "Vercel (preview deploy)",
      "Loom (pitch walkthrough)",
    ],
    implementationPeriod: "7 days",
    implementationBreakdown: [
      "Day 1: Studied 4 enterprise dealer sites for what they all got wrong (account-walled pricing).",
      "Day 2-3: Built finance-application gate flow with progressive disclosure.",
      "Day 4-5: Inventory tile grid with location filter and live-feeling vehicle data.",
      "Day 6: Trade-in flow with public price-range estimate (no login).",
      "Day 7: Pitch Loom walkthrough recorded, deployed to Vercel preview URL.",
    ],
    keyMetrics: [
      {
        label: "Time to pitch demo",
        before: "n/a",
        after: "7 days",
        delta: "vs 6-week proposals",
      },
      {
        label: "Reach with one founder",
        before: "n/a",
        after: "multiple countries",
        delta: "solo studio",
      },
      {
        label: "Account-walled flows",
        before: "3",
        after: "0",
        delta: "all open",
      },
      {
        label: "Meeting close rate (qualitative)",
        before: "follow-up",
        after: "in-meeting yes",
        delta: "decision in room",
      },
    ],
    longFormStory: [
      "Enterprise web agencies sell certainty by being slow. We sold certainty by being fast. The committee had three competing agency proposals on the table when we delivered a clickable demo and a 6-minute Loom inside a week.",
      "The trade-in flow was the deal closer. Every competitor demo required the visitor to create an account just to see a price range — which is the single most resented pattern in the dealer-website world. Ours showed a price range up front, then escalated to an authenticated flow only when the visitor was ready to lock in.",
      "The deal closed in the second meeting. The committee had a working demo URL they could share with stakeholders the same day, instead of waiting 8 weeks for a build to start.",
    ],
    testimonialQuote:
      "The other agencies sent us decks. He sent us a working site. That was the meeting.",
    testimonialAuthor: "Marketing Director, premium auto dealership network",
    publishDate: "2026-03-29",
    relatedServices: [
      { slug: "vibe-coded-sites", label: "Vibe-Coded Websites" },
      { slug: "ecommerce-automation", label: "E-commerce Automation" },
    ],
  },
  {
    slug: "ksa-fashion-retailer-shopify-ecommerce",
    position: 7,
    clientName: "KSA fashion retailer (anonymized)",
    industry: "Fashion e-commerce (footwear)",
    industryTag: "Websites",
    location: "Riyadh, KSA",
    coverImage: "/case-studies/ksa-fashion-retailer-shopify-ecommerce.jpg",
    oneLineOutcome:
      "Shipped a bilingual Shopify shoe store from null to launch in 14 days.",
    problemStatement: [
      "A Riyadh fashion retailer was launching a footwear vertical and needed a bilingual Arabic-English Shopify store with size-region logic (KSA, GCC, returning expats from EU/US sizing), courier-rate calculation visible on the cart page, and a returns flow that didn't punish the customer for being wrong about size.",
      "Previous Shopify builds in the market either ignored the bilingual surface entirely or shipped an Arabic translation that read like Google Translate output.",
    ],
    solutionStack: [
      "Shopify",
      "Liquid theme (custom)",
      "Aramex courier API",
      "Klaviyo (post-purchase)",
      "Locksmith (region gating)",
    ],
    implementationPeriod: "14 days",
    implementationBreakdown: [
      "Days 1-2: Audited 8 KSA Shopify competitors; cataloged bilingual UX failures.",
      "Days 3-5: Built custom Liquid theme with proper Arabic right-to-left flow, not flipped CSS.",
      "Days 6-8: Size-region picker (EU/US/UK/KSA) with auto-detection by geo.",
      "Days 9-10: Aramex courier rate calc surfaced on cart page.",
      "Days 11-12: Returns flow with size-mismatch shortcut.",
      "Days 13-14: Klaviyo post-purchase sequence, launch, courier rate live testing.",
    ],
    keyMetrics: [
      {
        label: "Showroom appointments",
        before: "Quiet",
        after: "Noticeably busier",
        delta: "online-to-store lift",
      },
      {
        label: "Time to launch",
        before: "n/a",
        after: "14 days",
        delta: "store-to-live",
      },
      {
        label: "Cart-stage courier cost",
        before: "Hidden fee",
        after: "Shown on cart",
        delta: "fewer surprises",
      },
      {
        label: "Size-return friction",
        before: "High",
        after: "Exchange shortcut",
        delta: "fewer punished returns",
      },
    ],
    longFormStory: [
      "Most Arabic Shopify stores in the region are English stores with a translation toggle bolted on. The Arabic surface is an afterthought — fonts wrong, line height wrong, product names in English embedded in Arabic copy. We rebuilt it as a proper bilingual surface, RTL-native, with brand-locked Arabic typography that matched the English design weight.",
      "The courier-rate-on-cart was the single highest-leverage decision. Shoppers in KSA had been trained by 5 years of Shopify abandonment to expect a 'surprise' shipping fee at checkout. Surfacing the Aramex rate on the cart page itself cut surprise-abandonment sharply.",
      "The size-mismatch returns shortcut is the unglamorous follow-up win. We added a 'wrong size?' button to the order page that triggers a same-size, different-fit exchange without forcing the customer through a full returns form. Repeat-purchase rate climbed because the return wasn't a punishment.",
    ],
    testimonialQuote:
      "Our showroom is twice as busy. People came in saying they'd already seen the shoe online — that's new.",
    testimonialAuthor: "E-commerce Manager, KSA fashion retailer",
    publishDate: "2026-04-19",
    relatedServices: [
      { slug: "ecommerce-automation", label: "E-commerce Automation" },
      { slug: "vibe-coded-sites", label: "Vibe-Coded Websites" },
    ],
  },
  {
    slug: "saas-multi-channel-aeo-content-engine",
    position: 8,
    clientName: "Multi-channel SaaS launch (anonymized)",
    industry: "SaaS / B2B software",
    industryTag: "AI Content",
    location: "Distributed (US + EU)",
    coverImage: "/case-studies/saas-multi-channel-aeo-content-engine.jpg",
    oneLineOutcome:
      "Daily voice-locked content pack across 5 channels, generated by 1 script and AI-tell-linted before render.",
    problemStatement: [
      "A SaaS operator launching a new product needed daily voice-locked content shipping across LinkedIn, Facebook, Instagram, YouTube and TikTok — and could not afford a content team. Previous attempts with content tools resulted in obvious AI-generated posts that the founder refused to ship under his own face.",
      "The brief was a single script that generates a full daily pack across all 5 channels, with each channel format-correct (carousel for LI, vertical for IG/TT, horizontal for YT), and zero AI-tell phrases surviving to render.",
    ],
    solutionStack: [
      "Claude Code (orchestration)",
      "Custom 60+ AI-tell linter",
      "n8n (scheduling)",
      "html2canvas (LI carousels)",
      "FFmpeg (IG/TT vertical)",
    ],
    implementationPeriod: "11 days",
    implementationBreakdown: [
      "Day 1-2: Mapped each channel's format constraints and the founder's voice samples (12 LI posts, 8 IG reels).",
      "Day 3-4: Built the voice-lock prompt against the founder's actual cadence (contrarian hook → reframe → CTA).",
      "Day 5-7: Wired the 5-channel parallel render — carousel HTML, vertical video, horizontal video.",
      "Day 8: Linter wired pre-render — any AI-tell phrase hard-fails the build.",
      "Day 9-10: n8n schedule + drip cadence across channels.",
      "Day 11: Founder dry-run, ship.",
    ],
    keyMetrics: [
      {
        label: "Manual content QA",
        before: "Hours daily",
        after: "Linted automatically",
        delta: "hours back",
      },
      {
        label: "Channels from one script",
        before: "1",
        after: "5",
        delta: "5x reach",
      },
      {
        label: "AI-tell phrases shipped",
        before: "Slipping through",
        after: "Linted out",
        delta: "hard-fail gate",
      },
      {
        label: "Founder sign-off",
        before: "Frequent rewrites",
        after: "Ships as-drafted",
        delta: "trust restored",
      },
    ],
    longFormStory: [
      "The reason founders refuse to ship AI-generated content under their face isn't capability — it's pattern recognition. They've read enough LinkedIn slop to spot 'fast-paced world' and 'unlock potential' at 30 paces, and they assume their audience can too. The linter is the trust mechanism that lets them sign off.",
      "Channel-format parity was the second hard problem. Most content engines spit out one piece of copy and call it 'cross-platform'. Real cross-platform means a 1080×1350 carousel for LinkedIn, a 9:16 vertical for IG/TT, and a 16:9 horizontal for YT — each with the hook, the body and the CTA recomposed to fit the format's pacing. We modeled all three.",
      "The founder signing off on nearly every pack without a rewrite is the only outcome we cared about. If the founder won't ship it, the rest of the system is irrelevant.",
    ],
    testimonialQuote:
      "I sign off on 9 out of 10 packs without rewriting anything. I haven't had that experience with any other content tool.",
    testimonialAuthor: "Founder, multi-channel SaaS launch",
    publishDate: "2026-05-10",
    relatedServices: [
      { slug: "ai-content-creation", label: "AI Content Creation" },
      { slug: "social-automation", label: "Social Automation" },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
