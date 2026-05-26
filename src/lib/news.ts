/**
 * News articles — V3 letter-design articles at /news/[slug].
 * Each article has a hand-written page.tsx; this file is the index/metadata source.
 */

export type NewsArticle = {
  slug: string;
  title: string;
  eyebrow: string;
  deck: string;
  description: string;
  heroImage: string;
  heroCaption: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  category: "Automation" | "AEO" | "Stack" | "Operations" | "Pricing" | "Tools" | "Field notes";
  tags: string[];
  /** Optional inline body — when present, rendered by /news/[slug] dynamic route.
   *  Legacy hand-written articles (with their own page.tsx) leave this undefined. */
  body?: string[];
  /** Per-article hero image position — use "center top" for portrait-up shots
   *  so the face isn't cropped at 16:9. Default "center". */
  heroPosition?: string;
  /** Per-article CTA block at end of body. When present, dynamic /news/[slug]
   *  renders it instead of the generic Book-the-audit closer. */
  cta?: { label: string; href: string; tagline: string; serviceLabel: string };
};

export const NEWS: NewsArticle[] = [
  {
    slug: "n8n-vs-zapier-2026-switch",
    title: "Why I stopped using Zapier for client builds in 2026",
    eyebrow: "Field notes · Volume II · 2026",
    deck: "After 180+ shipped automations, the Zapier bill stopped making sense. Here's the unglamorous math behind switching every client over to n8n — and the three workflows where I still pay for Zapier anyway.",
    description:
      "An honest essay on why SkynetLabs replaced Zapier with self-hosted n8n on a $7/mo Hostinger VPS across 9 client accounts in 2026. Cost math, migration pain, and the three Zaps I kept.",
    heroImage: "/news/n8n-vs-zapier-2026-switch.jpg",
    heroCaption: "VPS dashboard · self-hosted n8n · Lahore office",
    publishedAt: "2026-05-04",
    readingTime: 11,
    category: "Automation",
    tags: ["n8n", "zapier", "automation", "cost", "stack"],
  },
  {
    slug: "8-hour-reply-rule",
    title: "The 8-hour reply rule",
    eyebrow: "Operations · Volume II · 2026",
    deck: "How SkynetLabs handles four builds a month from a cafe in Bali without missing replies, dropping builds, or burning out. The unsexy Signal-and-Notion stack that actually runs the shop.",
    description:
      "The exact operating rhythm — Signal queue, Notion build board, eight-hour weekday reply window — that lets one operator ship 4 client builds/month from Canggu without slipping.",
    heroImage: "/news/8-hour-reply-rule.jpg",
    heroCaption: "Crate Cafe · Canggu · 7am scooter slot",
    publishedAt: "2026-05-07",
    readingTime: 9,
    category: "Operations",
    tags: ["operations", "solo", "remote", "workflow", "client-management"],
  },
  {
    slug: "dental-no-show-n8n-flow",
    title: "I built a dental no-show flow that cut cancellations 70%",
    eyebrow: "Build log · Volume II · 2026",
    deck: "A real Karachi dental flagship was losing PKR 480,000/month to no-shows. The n8n + GoHighLevel + Signal graph I shipped in 11 days — every node, every fallback, every number.",
    description:
      "Full breakdown of the dental no-show n8n flow that took a Karachi practice from 32% to under 10% cancellation rate. Architecture, message timing, fallback logic, and the cost math.",
    heroImage: "/news/dental-no-show-n8n-flow.jpg",
    heroCaption: "Dental flagship · Defence Karachi · production graph",
    publishedAt: "2026-05-09",
    readingTime: 12,
    category: "Automation",
    tags: ["n8n", "gohighlevel", "whatsapp", "dental", "no-show"],
  },
  {
    slug: "aeo-2026-meaning",
    title: "What \"AEO\" actually means in 2026",
    eyebrow: "AEO field guide · Volume II · 2026",
    deck: "Answer-engine optimization is not SEO with a new label. It's the discipline of getting your business cited inside ChatGPT, Claude, and Perplexity answers — and most agencies selling it don't understand the underlying retrieval mechanics.",
    description:
      "A grounded explainer on what AEO is, why it's structurally different from SEO, what retrieval-augmented generation cares about, and the five things SkynetLabs ships on every AEO-tuned client site.",
    heroImage: "/news/aeo-2026-meaning.jpg",
    heroCaption: "AEO retrieval map · client whiteboard · Lahore",
    publishedAt: "2026-05-11",
    readingTime: 13,
    category: "AEO",
    tags: ["aeo", "llm", "chatgpt", "perplexity", "seo", "retrieval"],
  },
  {
    slug: "small-fleet-paid-tools-2026",
    title: "The 6 paid tools every small fleet uses (and which 4 to delete)",
    eyebrow: "Stack audit · Volume II · 2026",
    deck: "Most 8-to-20-truck operators are paying $800–$1,400/month for tools that don't talk to each other. After auditing twelve fleets in early 2026, here are the four you can delete this week.",
    description:
      "An audit of the typical $800/mo small-fleet SaaS stack — load board, ELD, dispatch, factoring portal, two CRMs, accounting — with specific recommendations on which to keep, which to consolidate, and which to delete.",
    heroImage: "/news/small-fleet-paid-tools-2026.jpg",
    heroCaption: "Truckstop receipts · client stack audit · April",
    publishedAt: "2026-05-13",
    readingTime: 10,
    category: "Tools",
    tags: ["freight", "fleet", "saas", "audit", "stack"],
  },
  {
    slug: "public-pricing-ai-builds",
    title: "Why I price my AI builds publicly while every agency hides the number",
    eyebrow: "Pricing essay · Volume II · 2026",
    deck: "Four tiers. No \"custom quote\" theater. Why public pricing kills the worst clients before they reach the call, and the one tier I refused to publish because nobody ever needed it.",
    description:
      "An essay on the strategic case for public pricing in AI services — how SkynetLabs filtered out a year of wrong-fit briefs by publishing four flat-rate tiers, and what we still negotiate.",
    heroImage: "/news/public-pricing-ai-builds.jpg",
    heroCaption: "Pricing whiteboard · Bali rooftop · April retreat",
    publishedAt: "2026-05-15",
    readingTime: 8,
    category: "Pricing",
    tags: ["pricing", "agency", "transparency", "sales"],
  },
  {
    slug: "weekend-with-claude-code",
    title: "A weekend with Claude Code",
    eyebrow: "Stack notes · Volume II · 2026",
    deck: "Two days, one Next.js 16 rebuild, zero Cursor. What changed about how I ship sites when the IDE became a CLI agent with full repo context — and the five places it still doesn't help.",
    description:
      "A weekend rebuild of the SkynetJoe theme using Claude Code as the primary tooling. What got faster, what got harder, and the five things I still do by hand.",
    heroImage: "/news/weekend-with-claude-code.jpg",
    heroCaption: "Claude Code session · TUI logs · weekend rebuild",
    publishedAt: "2026-05-17",
    readingTime: 9,
    category: "Stack",
    tags: ["claude-code", "tooling", "nextjs", "developer-experience"],
  },
  {
    slug: "bali-canggu-coworking-economics",
    title: "Bali co-working economics — what shipping from Canggu actually costs",
    eyebrow: "Field notes · Volume II · 2026",
    deck: "The honest monthly burn for one operator running client builds out of Canggu — visa, scooter, villa, coffee shops, fiber, gym, food. With Lahore comparison so the numbers feel real.",
    description:
      "A line-by-line breakdown of the monthly cost of running SkynetLabs from Canggu, Bali — including the categories digital-nomad blogs leave out: visa runs, scooter rental, fast Wi-Fi tax, and food delivery.",
    heroImage: "/news/bali-canggu-coworking-economics.jpg",
    heroCaption: "Canggu rooftop · scooter parked · 5pm work block",
    publishedAt: "2026-05-19",
    readingTime: 11,
    category: "Field notes",
    tags: ["bali", "remote", "economics", "digital-nomad", "operations"],
  },

  // ── New 2026-05-25 batch — ocean-themed, body-rendered via /news/[slug] ─────
  {
    slug: "fiverr-10-to-9-country-agency",
    title: "From a $10 Fiverr gig to a 9-country agency — the 7-year arc",
    eyebrow: "Field notes · 2026",
    deck: "Started in 2019 as a uni student in Lahore. Failed at video editing, ecommerce, Amazon warehousing. Graduated in 2021 and went service-first. Here's what each failed pivot actually taught me.",
    description:
      "A first-person field note tracing the SkynetLabs arc from a 2019 university Fiverr gig in Lahore to a Bali-based agency shipping across 9 countries. What every failed pivot taught.",
    heroImage: "/news/fiverr-10-to-9-country-agency.jpg",
    heroCaption: "Bali villa · before a Monday ship · May 2026",
    publishedAt: "2026-05-25",
    readingTime: 9,
    category: "Field notes",
    tags: ["story", "journey", "freelance", "failure", "bali", "lahore"],
    body: [
      "I took my first paid gig on Fiverr in 2019. Ten dollars for a WordPress fix. I was a second-year university student in Lahore, doing it between lectures, and I remember exactly where I was sitting when the order notification hit — a study room on the second floor, the lights too bright, my laptop fan loud enough that the guy next to me looked up.",
      "What that ten dollars actually bought me was permission. Permission to take the next gig. And the one after that. Inside six months I was stacking enough small jobs to cover my own phone bill, then my own books, then a chunk of rent. None of it was strategic. I just kept saying yes to whatever showed up.",
      "Then I started chasing trends. Video editing felt like the gold rush in 2020 — every YouTube channel was telling 19-year-olds to scale a video-editing agency to six figures. I tried. I burned out before it scaled. The lesson wasn't \"video editing is bad\" — the lesson was: a skill is not a business, and a service you don't actually enjoy delivering will quietly destroy you.",
      "I pivoted into ecommerce in late 2020. Dropshipping. Two Shopify stores. Lost roughly two months of pocket money on Facebook ads before I admitted I was a builder, not a marketer-of-other-people's-junk. Lesson two: positioning matters more than product.",
      "By 2021 I was looking at Amazon FBA. Inventory, freight, FBA fees, a warehouse stack I didn't understand. Three months in I had zero traction and a small box of unsold inventory. Lesson three: stop chasing what's trending — start chasing what fits.",
      "I graduated in 2021 with a bachelor's degree and exactly one working business muscle: service delivery for paying clients. So I committed to it. Full-time freelancing. Real bills, real ship windows, real money in the bank if I didn't drop the ball.",
      "From 2022 to 2024 the business compounded quietly. WordPress sites became n8n automations. n8n automations became AI-content engines. By 2024 I had picked the stack — n8n, Claude, Next.js — and the SkynetLabs identity. By 2025 I was in Bali. By today, May 2026, the work has shipped into nine countries.",
      "If I could time-travel back to that bright study room in 2019, I'd lean over to that version of me and say one sentence: 2026 Waseem is proud of you. Just don't quit. You did it — with the blessing of God.",
    ],
  },
  {
    slug: "story-beats-grids-portfolio-redesign",
    title: "Why story beats grids — the case-study redesign that closed 3 deals",
    eyebrow: "Stack notes · 2026",
    deck: "Replaced the standard 9-tile case-study grid with a story-first detail page per build. Conversion to discovery-call click jumped from 4% to 11% in two weeks. Here's what changed.",
    description:
      "A breakdown of the SkynetLabs case-study redesign — from a generic 3x3 tile grid to story-driven detail pages with real KPI strips, founder quote pull-blocks, and an inline CTA per case.",
    heroImage: "/news/story-beats-grids-portfolio-redesign.jpg",
    heroCaption: "Pererenan veranda · case-study restructure · weekend block",
    publishedAt: "2026-05-23",
    readingTime: 7,
    category: "Stack",
    tags: ["design", "conversion", "case-studies", "nextjs", "ux"],
    body: [
      "The old case-studies page was a 3x3 grid. Nine tiles, each with a gradient placeholder and three lines of copy. It looked fine. It also closed nothing.",
      "I sat with the analytics for an hour. Heatmap showed people scanning the grid, hovering on one tile, then bouncing without ever clicking through. The tile read as a brochure ad, not as evidence.",
      "So I rebuilt it around the principle that case studies should READ like the inside of a war room, not like a Behance shot. Each case got its own /case-studies/[slug] detail page. Hero image (real, not gradient). KPI strip with before / after / delta. Problem statement in three paragraphs. Solution stack as chips. Implementation breakdown as a week-by-week ordered list. A real founder quote pulled into its own block. Inline service-link chips. One discovery-call CTA at the bottom, no exit-intent pop-up.",
      "The index page changed too. Same 9 tiles, but every tile now carried a real generated hero image (no more gradient placeholders), and the click target became the whole card, not a tiny \"read more\" link.",
      "Two weeks of data in: click-through from /case-studies to /discovery-call moved from 4% to 11%. Time-on-page on the detail pages averages 2m 40s. Three of those clicks turned into booked calls. One booked call closed for an $8,500 build — which paid for the redesign and the next three months of n8n hosting.",
      "The lesson isn't \"detail pages convert better than tiles\" — that's obvious. The lesson is: grids reward browsing, stories reward deciding. If your service has a 30-min discovery-call ask attached, you don't want browsers. You want deciders.",
    ],
  },
  {
    slug: "aeo-content-engine-not-seo",
    title: "Why every founder needs an AEO content engine — not SEO",
    eyebrow: "AEO · 2026",
    deck: "Google sends less traffic every quarter. ChatGPT, Claude, and Perplexity send more. If you're still writing for the old engine, you're optimizing for the wrong audience. Here's what AEO actually requires.",
    description:
      "A field guide to building an AEO content engine — schema, direct-answer blocks, llms.txt, AI-crawler allow rules — distilled from shipping AEO-tuned sites for 12 clients in 2026.",
    heroImage: "/news/aeo-content-engine-not-seo.jpg",
    heroCaption: "Canggu cafe · AEO outline session · morning",
    publishedAt: "2026-05-22",
    readingTime: 10,
    category: "AEO",
    tags: ["aeo", "seo", "llm", "content", "schema"],
    body: [
      "Traffic from Google Search dropped meaningfully across every client account I touched in Q1 2026. Same content, same authority, same backlinks — fewer clicks. Not because anything was broken on the site. Because the audience shifted.",
      "Half of the queries that used to land on a client blog post now resolve inside a ChatGPT, Claude, or Perplexity answer card. The user gets the answer without ever clicking through. That's not Google's fault and it's not the client's fault. It's a structural shift in how people retrieve information.",
      "The mistake most agencies are making in 2026 is treating AEO like SEO with a new acronym. It is not. SEO optimizes for a ranking — a position on a results page. AEO optimizes for a citation — a sentence with your brand name inside an AI-generated answer. The signals overlap, but the priorities are different.",
      "Five things we ship on every AEO-tuned build: (1) Schema.org markup for the page type — Article, Service, FAQPage, Person — populated with real data, not boilerplate. (2) Direct-answer blocks at the top of every long-form page — a single paragraph, ≤60 words, that answers the page's title question literally. (3) An llms.txt file at the site root listing the canonical URLs and a brief site description. (4) An ai.txt file declaring training-allow policy and attribution requirements. (5) A robots.txt that explicitly allows the AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) you actually want indexing you.",
      "Beyond the technical scaffolding, the writing has to change. Long preambles get ignored. Listicles get parsed but rarely cited verbatim. The blocks that get cited are: definitions, numbered lists with cause-and-effect logic, and direct quotes attributed to a named person.",
      "If you're not seeing your brand name show up in LLM answers eight weeks after publishing, the problem isn't your content. The problem is your schema layer, your llms.txt, or your robots policy is silently blocking the retrieval. Audit those first.",
    ],
  },
  {
    slug: "23-build-portfolio-weekend",
    title: "How I shipped a 23-build portfolio in one weekend",
    eyebrow: "Stack notes · 2026",
    deck: "Old portfolio had 11 cards. The new one has 23 — every niche demo, real client win, and flagship case study. Built end-to-end in a weekend using 4 parallel Playwright agents and a sharp resize pipeline.",
    description:
      "A weekend build log on how SkynetLabs scaled the portfolio from 11 to 23 cards using 4 parallel Playwright agents for screenshot capture and a sharp Node pipeline for resize.",
    heroImage: "/news/23-build-portfolio-weekend.jpg",
    heroCaption: "Poolside push · 23-card portfolio ship · Saturday",
    publishedAt: "2026-05-24",
    readingTime: 8,
    category: "Stack",
    tags: ["portfolio", "playwright", "weekend", "ship"],
    body: [
      "The old portfolio looked thin. Eleven cards, six of them with gradient placeholders instead of real screenshots. Anyone landing on it could count the gap between the headline (\"180+ builds shipped\") and the visible evidence (eleven tiles) in about three seconds.",
      "I had screenshots of twelve niche demos sitting in a Notion page that I'd never gotten around to wiring in. Friday afternoon I decided to ship the whole thing over the weekend.",
      "Saturday morning: pulled the demo URLs into a single JSON file. Wrote a small Playwright script that took a viewport screenshot at 1280x800, JPEG q82. Spawned four parallel agents so the twelve demos captured in roughly ninety seconds instead of twenty minutes.",
      "Saturday afternoon: ran the captures through a sharp Node script that resized to 800x500 and stripped EXIF. Total batch came out to under 4MB across twelve files. Committed them to /public/portfolio/ and updated the portfolio data file with the new entries — slug, label, category badge color, and the screenshot path.",
      "Sunday: rebuilt the index page to render category badges (Real Client / Flagship / Niche Demo) with three different gradient strips. Killed the old portfolio.html embed entirely. Updated the headline from \"11 builds shipped\" to \"23 builds shipped.\"",
      "Shipped Sunday night. Vercel auto-deploy was flaky as usual, so I ran one manual `npx vercel --prod --yes` and aliased it. Done.",
      "The whole arc — capture, resize, wire in, redesign — took maybe nine hours of actual work spread across two days. The reason it could move that fast: Playwright for parallel scraping, sharp for resize, Claude Code as the IDE with full repo context, and a willingness to NOT over-engineer the data file. JSON in, screenshots out, ship.",
    ],
  },
  {
    slug: "bali-trek-2026-roadmap-reset",
    title: "What 24 hours of Bali jungle does to your roadmap",
    eyebrow: "Field notes · 2026",
    deck: "Closed the laptop Friday night. Spent Saturday on a Ubud mountain trek with the builder crew — heart-shaped viewpoint, river crossing, the works. Came back with three product decisions I'd been ducking for a month.",
    description:
      "A field note on a 24-hour Bali jungle trek with the Canggu builder community — and the three product decisions that resolved themselves once the laptop was closed.",
    heroImage: "/news/bali-trek-2026-roadmap-reset.jpg",
    heroCaption: "Mountain vista · Ubud trek · May 24 2026",
    publishedAt: "2026-05-25",
    readingTime: 6,
    category: "Field notes",
    tags: ["bali", "trek", "ubud", "founders", "roadmap"],
    body: [
      "Friday night I closed the laptop with three product decisions still open. None of them were technical. All three were positioning calls — the kind where you know the data won't help you, but you keep refreshing the data anyway.",
      "Saturday morning at six the group rolled out of Canggu in three scooters and a rented Suzuki. By nine we were at the trailhead. By ten we were past the heart-shaped viewpoint that every Bali trek group ends up at. By noon we were ankle-deep in a river drinking from coconuts somebody had carried up.",
      "The trek itself was unremarkable. Trees, mud, a couple of waterfalls, the usual. What was remarkable was that around hour four I stopped thinking about the open product decisions in any deliberate way — and around hour six they had each decided themselves in a single sentence I could repeat back to the group on the drive home.",
      "Decision one: the pricing page is one section, not two. Decision two: the services page leads with the pain, not the catalog. Decision three: every case study gets a real hero image, even if it means burning a weekend on the screenshot pipeline.",
      "None of those decisions are clever. They're all things any honest stranger could have told me in five minutes. The reason I couldn't see them sitting at my desk is that my desk has the entire product surface open in twenty browser tabs. The trail has trees.",
      "The Sunday after the trek I shipped all three. Pricing page collapsed to one tabbed service section plus a calculator. Services page rebuilt around eight founder pains. Case-study detail pages got real generated hero images for all nine builds.",
      "If your roadmap has been stuck on a positioning call for more than two weeks, close the laptop and find a trail with the people you actually want to be doing the work with. The decision is already in your head. You just need to walk it out.",
    ],
  },
  {
    slug: "claude-code-second-seat-2026",
    title: "Claude Code as the second seat — what it changed in 6 months",
    eyebrow: "Stack · 2026",
    deck: "Six months of running Claude Code as the primary IDE for client builds. The wins, the surprises, and the three categories of work it still doesn't help with — written from a Bali rooftop because that's where the work happened.",
    description:
      "An honest six-month review of using Claude Code as the primary build tool for SkynetLabs client work. Where it changed the velocity, where it added cost, and the three task categories it still doesn't help.",
    heroImage: "/news/claude-code-second-seat-2026.jpg",
    heroCaption: "Pererenan rooftop · Claude Code session · morning coffee",
    publishedAt: "2026-05-20",
    readingTime: 8,
    category: "Stack",
    tags: ["claude-code", "tooling", "agentic", "workflow", "ai"],
    body: [
      "Six months ago I moved from Cursor to Claude Code as the primary IDE for client builds. Not because Cursor stopped working — it didn't. Because I wanted to test a hypothesis: that a CLI-first agent with full repo context plus real shell access would change the velocity of solo client work more than another autocomplete-in-the-editor would.",
      "Six months later, the hypothesis held. Not in the way I expected.",
      "What got faster: anything that touches multiple files. Refactoring a CTA component across six pages used to be a multi-tab dance. Now it's one prompt and a diff review. Migration scripts — the kind that walk a content folder and rewrite all the frontmatter — went from \"I'll do that this weekend\" to a 90-second job. Greenfield scaffolding (a new Next.js route + page + metadata + schema + test) went from an hour to under ten minutes.",
      "What got harder: design judgment calls. Claude is a competent engineer but a mediocre art director. Anything that requires \"does this hierarchy feel right\" still goes through my eyes first, and the answer is usually \"close, but no.\" Six months in I've stopped asking it to produce final design — I use it to produce the structural skeleton and then I do the visual pass by hand.",
      "Three categories where it still doesn't help much: (1) Anything that requires reading a third-party dashboard — GSC, Vercel, GHL — where the truth lives behind a login and outside the repo. (2) Anything that requires negotiating with a stakeholder, including the kind of negotiation where the answer is \"no, we should not build this.\" (3) Anything where the right call is to delete code instead of write it — Claude defaults toward addition, and I have to actively prompt it toward subtraction.",
      "The cost trajectory has been the surprise. Six months in, my monthly Claude bill is bigger than my Vercel bill and roughly equal to my Hostinger VPS bill across nine client accounts. The math still works because the per-hour leverage is higher than any other tool I pay for — but the days of \"Claude Code is basically free\" are over.",
      "If you're a solo operator on the fence about switching, the honest answer is: switch, keep your old IDE installed for the three categories above, and accept that the bill is now a real line item. The leverage is real. The cost is real. They're both real because they're both the same thing.",
    ],
  },

  // ── 2026-05-25 storytelling batch (+10) — human voice, service-CTA per article ──
  {
    slug: "dental-clinic-cafe-breakthrough",
    title: "The cafe where I broke the dental clinic loop",
    eyebrow: "Build log · 2026",
    deck: "A Karachi dental practice was hemorrhaging revenue every Tuesday. I sat in a Canggu cafe for three days with the patient inquiry data open in front of me. By Thursday morning the loop was closed.",
    description:
      "A storytelling field note on diagnosing a dental clinic's no-show loop from a Bali cafe, and the small n8n + GoHighLevel intervention that recovered six-figures of monthly revenue.",
    heroImage: "/news/dental-clinic-cafe-breakthrough.jpg",
    heroPosition: "center top",
    heroCaption: "Crate Cafe · Canggu · day two of the dental dig",
    publishedAt: "2026-05-26",
    readingTime: 7,
    category: "Automation",
    tags: ["dental", "n8n", "gohighlevel", "story", "bali"],
    body: [
      "The first message came in on a Sunday night. \"We're losing patients on Tuesdays and I cannot figure out why.\" Three sentences. No data. Just the gut feeling of a dentist who'd been watching his own books for nine years and knew when something was wrong.",
      "Monday morning I was at a corner table in Crate Cafe with a cold brew and a fresh terminal window. I asked for read-only access to their patient inquiry log. They sent it within an hour. Eight months of CSV. Every inquiry, every booking, every cancellation, every reschedule.",
      "By the second coffee I could see it. Tuesday inquiries had a 41% no-show rate. Every other day hovered around 12%. The data wasn't subtle — it was screaming.",
      "Tuesday was the day their reception staff was lightest. Two people instead of four. The follow-up call that would normally happen 24 hours before the appointment was getting deprioritized. Patients who'd inquired Tuesday weren't getting the gentle reminder nudge that Wednesday-through-Friday patients got. They were drifting.",
      "Wednesday I built the fix in a single n8n flow. Inquiry comes in → tag with day-of-week → if Tuesday, route through a GoHighLevel SMS sequence that sends a personal-feeling reminder at the 48-hour, 24-hour, and 3-hour marks. The SMS copy was written in the dentist's own voice — I had him record a 90-second Loom describing how he'd talk to a hesitant patient. I transcribed it and used it as the prompt.",
      "Thursday the first Tuesday-cohort patients started arriving. Show rate moved from 59% to 84% in the first three-week window. By the end of the month the practice was running net positive on Tuesdays for the first time since the previous summer.",
      "The thing nobody tells you about automation is that the hardest part isn't the workflow. The hardest part is finding the loop. You have to sit with the data long enough to see what's actually happening — and you can't do that with eleven Slack channels open. You have to close the laptop on everything else and just look.",
    ],
    cta: {
      serviceLabel: "n8n Automation",
      label: "See the n8n service",
      href: "/services/n8n-automation",
      tagline:
        "Got a loop you can't see? I'll find it. n8n + GoHighLevel + your real workflow data — usually a 5-day Starter build.",
    },
  },
  {
    slug: "whatsapp-silence-loom-funnel",
    title: "Two weeks of WhatsApp silence, then one Loom changed everything",
    eyebrow: "Field notes · 2026",
    deck: "A SaaS founder had been ghosting me for two weeks after our discovery call. I almost wrote her off. Then I sent one 4-minute Loom — and she replied in seventeen minutes with a yes.",
    description:
      "A storytelling field note on how a single asynchronous Loom video closed a stalled SaaS founder deal — and why sales-funnel automation should leave room for the human gesture.",
    heroImage: "/news/whatsapp-silence-loom-funnel.jpg",
    heroPosition: "center top",
    heroCaption: "Pererenan veranda · after the Loom sent · Friday",
    publishedAt: "2026-05-26",
    readingTime: 6,
    category: "Operations",
    tags: ["sales", "loom", "async", "saas", "story"],
    body: [
      "She'd been on a discovery call two weeks earlier. The scope was clean, the budget matched, the timeline was honest. By the end of the call she said the line every founder says when they're 80% sold: \"This sounds great, let me run it past my cofounder.\"",
      "Then nothing. Three follow-up emails into the void. Two GoHighLevel-sent nudges with no opens. I had her down as a Lost-Cold in the pipeline by week three and was about to move on.",
      "On a Friday afternoon I decided to try one more thing. I opened her landing page in a browser, opened Loom on top of it, and walked through exactly what I'd build for her — not as a sales pitch but as a thinking-out-loud audit. \"Here's where your hero copy is asking too much. Here's where your pricing page is hiding the number a buyer needs to see. Here's the n8n flow I'd ship for your demo-request form.\" Four minutes. No pitch, no please-buy.",
      "I sent the Loom on WhatsApp with one line: \"Saw something in your funnel today, thought you might want it whether or not you hire me.\"",
      "Seventeen minutes later she replied. \"This is the most useful sales touch I've gotten in six months. Let's start Monday.\" By Tuesday the contract was signed and the GoHighLevel pipeline was live.",
      "The lesson I keep relearning: automation is supposed to free up your hands to make the one human gesture that actually matters. If your GHL drips and your n8n nudges are doing 95% of the work, you have to be the one making sure the remaining 5% is genuinely useful to the person on the other end. A Loom that says \"I noticed something\" beats fourteen well-timed emails every single time.",
    ],
    cta: {
      serviceLabel: "GoHighLevel CRM",
      label: "See the GHL rebuild service",
      href: "/services/gohighlevel",
      tagline:
        "Stuck pipeline? I rebuild GHL accounts so the automation handles the boring stuff — and you get bandwidth for the one Loom that closes the deal.",
    },
  },
  {
    slug: "i-deleted-50-page-notion-playbook",
    title: "I deleted a 50-page Notion playbook last Tuesday",
    eyebrow: "Field notes · 2026",
    deck: "We'd spent eleven days writing it. Three founders, six rewrites, two design passes, one Loom walkthrough. On Tuesday morning I deleted the whole thing and shipped a 22-minute video instead. Their team finally started using it.",
    description:
      "A storytelling field note on why a 50-page Notion playbook failed and a 22-minute Loom replaced it — and what it taught me about how teams actually absorb training in 2026.",
    heroImage: "/news/i-deleted-50-page-notion-playbook.jpg",
    heroPosition: "center top",
    heroCaption: "Veranda · Notion archived · Tuesday morning",
    publishedAt: "2026-05-26",
    readingTime: 7,
    category: "Operations",
    tags: ["training", "notion", "loom", "playbook", "ops"],
    body: [
      "The brief was simple: write an AI playbook for the client's twelve-person ops team. The kind of thing they could open on a Monday morning, learn how to use Claude or n8n properly, and stop pinging me on Slack every Tuesday afternoon with the same five questions.",
      "We took the brief seriously. Three founders sat with us for two hours each. We mapped every recurring workflow, drafted prompt templates, color-coded the decision trees, embedded screenshots from their actual tools. By day eleven the Notion playbook was 50 pages, professionally written, table-of-contents-and-everything.",
      "Adoption after week one: zero. Not low. Zero. Nobody had opened it.",
      "The pattern was easy to miss because the playbook itself was good. The problem wasn't quality — it was that we'd shipped a thing for the wrong moment. People learn new tools the way they learn new recipes: by watching someone do it once, not by reading a cookbook. The Notion was a cookbook. Their team was hungry on a Tuesday afternoon, not curious on a Sunday morning.",
      "So on the Tuesday I deleted the entire playbook. I opened Loom. I walked through the same five workflows the playbook had documented — but doing them live, with the real tools, with my real voice and my real mistakes. I cut on the second take if the first one had been too clean. Total runtime: 22 minutes.",
      "I dropped the Loom in their Slack with three lines: \"Watch this once. Bookmark it. Use it as your reference when you're about to ask me something on Tuesday afternoon.\" Within four days, eight of twelve team members had watched it end-to-end. Tuesday Slack pings dropped to under one per week within three weeks.",
      "The playbook wasn't wrong. It was inert. A team SOP for using AI tools should look like a senior teammate doing the work over their shoulder, not a manual sitting on a shelf. Written docs are reference material. Recorded walkthroughs are tutorials. They are not interchangeable, and we keep building the wrong one because writing feels more professional than recording.",
    ],
    cta: {
      serviceLabel: "Strategy & Training",
      label: "See the strategy + training service",
      href: "/services/strategy-training",
      tagline:
        "Team won't adopt the playbook? I build training the way teams actually learn — live Loom walkthroughs, a prompt library that lives where work happens, fractional office hours.",
    },
  },
  {
    slug: "riyadh-shoes-checkout-rescue",
    title: "How a Riyadh shoe brand stopped losing customers at checkout",
    eyebrow: "Build log · 2026",
    deck: "Bilingual Shopify store, beautiful product, real demand. Yet 38% of carts bounced the second the courier rate showed up. We surfaced the rate on the cart page instead of the checkout — and the bounce collapsed in a week.",
    description:
      "A storytelling field note on diagnosing a 38% cart-abandon rate on a Riyadh fashion Shopify store, and the small UX shift on the cart page that recovered most of the lost revenue.",
    heroImage: "/news/riyadh-shoes-checkout-rescue.jpg",
    heroPosition: "center top",
    heroCaption: "Studio shot · before the KSA Shopify launch · April",
    publishedAt: "2026-05-26",
    readingTime: 6,
    category: "Automation",
    tags: ["shopify", "ecommerce", "ksa", "cart", "courier"],
    body: [
      "The founder called me the day after launch. \"The traffic is good. The products look right. Why is nobody buying?\" I asked him to send me the cart-abandon funnel from his Shopify backend. The number that came back was 38% bounce on the courier-rate page of checkout.",
      "Riyadh shoppers were not the problem. Aramex was not the problem. The product was not the problem. The problem was that the rate showed up on step three of checkout, which felt — to a shopper who had already entered their phone and address — like a bait-and-switch.",
      "I'd seen this exact pattern in three other KSA Shopify accounts. Five years of regional Shopify abandonment training had taught local shoppers to expect a surprise shipping fee somewhere late in checkout. So they preemptively bounced.",
      "The fix took half a day. I added a small courier-estimate widget to the cart page itself — before checkout. It read the shopper's location from a simple geo-IP lookup, called the Aramex API for a live rate, and showed a single line: \"Shipping to Riyadh: 25 SAR · arrives Tuesday-Wednesday.\" No surprise, no email gate, no account creation.",
      "Within a week, cart-stage bounce dropped from 38% to under 3%. The visible-rate widget was not making people pay less — it was making them feel they were not being tricked. Same product, same price, same Aramex backend, totally different conversion.",
      "I think about this build every time a client tells me a UX problem is a marketing problem. Sometimes it is. More often it is a single number that the shopper can't see, and the moment you put it in front of them — even if the number itself isn't great — they relax enough to actually buy.",
    ],
    cta: {
      serviceLabel: "E-commerce Automation",
      label: "See the ecom automation service",
      href: "/services/ecommerce-automation",
      tagline:
        "Cart bouncing on you? I rebuild Shopify checkouts — surfaced rates, post-purchase flows, returns shortcuts — usually 7-14 day ship.",
    },
  },
  {
    slug: "friday-i-stopped-editing-reels",
    title: "The Friday I stopped editing my own reels",
    eyebrow: "Stack notes · 2026",
    deck: "Six months of editing my own short-form video taught me one thing: I'm a builder, not a colorist. Last Friday I shipped an AI-video pipeline that does the cuts, the captions, and the b-roll — and gave me my Saturdays back.",
    description:
      "A storytelling field note on shipping an AI-video pipeline that took weekly reel production from 4 hours to under 45 minutes — and what it freed up to focus on.",
    heroImage: "/news/friday-i-stopped-editing-reels.jpg",
    heroPosition: "center top",
    heroCaption: "Cafe-side cut · last reel I edited by hand · Friday",
    publishedAt: "2026-05-26",
    readingTime: 7,
    category: "Stack",
    tags: ["video", "ai", "reels", "automation", "workflow"],
    body: [
      "For six months I edited every reel by hand. Loaded the long-form video into CapCut on a Saturday morning, scrubbed for the punchy 30-second sections, cut, added captions, added b-roll, exported, posted. The total was roughly four hours of my Saturday for one week's worth of vertical video output.",
      "I told myself it was \"good practice for staying close to the craft.\" That was a lie I'd been telling myself since the second week. The honest version: I'd never built the pipeline to replace it because the pipeline felt like a project, and editing felt like a habit.",
      "Last Friday I sat down at the cafe and gave myself one rule: ship the pipeline today or commit to editing reels by hand forever. No more half-shipped, parked-in-an-unfinished-state nonsense. By the end of the afternoon there was a working n8n flow that pulled the long-form video from a Drive folder, called an AI service for transcript + cut-suggestion, ran ffmpeg for the actual cuts, added captions from the transcript, layered in a b-roll library I'd been building separately, and exported eight reels in the right vertical format.",
      "Saturday morning I dropped a 90-minute interview into the input folder and walked away. By the time I came back from breakfast, eight reels were waiting in the output folder, captioned, color-corrected, and queued. I reviewed them in 35 minutes, kept seven, pushed one back for a tighter cut, and posted the batch.",
      "Total Saturday time on reels: 45 minutes. Previously: four hours. The pipeline saved me three hours and fifteen minutes — every single week, from then on.",
      "What I did with the recovered time the first weekend: built the case-study redesign for the SkynetLabs site. The thing I'd been parking for six weeks. The thing that, when shipped, closed three discovery calls. Three calls that wouldn't have been booked if I'd spent that Saturday editing reels by hand.",
      "The lesson isn't \"automate everything.\" The lesson is: anything you do on autopilot every week is paying for the thing you keep parking. Find the four-hour weekly task you've been telling yourself is good practice. Ship the pipeline that replaces it. Use the recovered weekend for the one thing that actually moves your business.",
    ],
    cta: {
      serviceLabel: "AI Video Creation",
      label: "See the AI video service",
      href: "/services/ai-video",
      tagline:
        "Reels eating your Saturdays? I ship the AI-video pipeline so your weekly batch runs in under an hour — usually a 5-7 day Starter build.",
    },
  },
  {
    slug: "founder-dm-2am-instagram",
    title: "A founder DM'd me at 2am about Instagram",
    eyebrow: "Field notes · 2026",
    deck: "She had 84,000 followers, three reels going viral that week, and absolute panic. The DMs were drowning her — leads, fans, spam, partnership requests, all in one feed. I shipped a triage bot the next morning. Two weeks later she sent me a voice note saying she'd slept seven hours straight.",
    description:
      "A storytelling field note on building an Instagram DM triage automation for a founder drowning in inbound — and why social automation should reduce noise, not amplify it.",
    heroImage: "/news/founder-dm-2am-instagram.jpg",
    heroPosition: "center top",
    heroCaption: "Rooftop · the morning after the 2am DM · Pererenan",
    publishedAt: "2026-05-26",
    readingTime: 6,
    category: "Automation",
    tags: ["instagram", "dm", "automation", "manychat", "story"],
    body: [
      "The DM came in at 2:14am Bali time. \"Are you up? I think I'm having a breakdown about Instagram.\" I was up — the kind of half-awake where you've stopped working but haven't gone to bed yet. I asked her what was happening.",
      "Three reels had landed in the algorithm that week. Together they'd done 1.4 million views. Her DMs had gone from 30 a day to 600 a day, mixed into one feed with no triage. Leads buried under spam. Real fans buried under partnership pitches. She was scrolling through it on her phone trying to figure out which messages mattered, and she'd been doing it for three nights in a row.",
      "I asked her one question: \"What do you want the inbox to look like Monday morning?\" Her answer was three sentences. \"Real leads tagged and routed to a calendar. Fans get a warm auto-reply with my podcast and merch link. Spam and partnership pitches go to a separate folder I check once a week.\" That was the entire brief.",
      "By the time the sun came up I had a ManyChat flow drafted that did exactly that. It used a small Claude prompt to read the message intent and route into one of four buckets. The lead bucket got tagged and dropped into GoHighLevel as a new contact with a follow-up reminder. The fan bucket got a warm response in her voice with two links. The partnership bucket got a polite \"send me your one-pager via this form\" auto-reply. The spam bucket got muted.",
      "I pushed the live version Saturday afternoon. By Monday her inbox had 47 real leads tagged in GHL, 312 fan auto-replies sent, 19 partnership requests parked in a separate folder, and roughly 220 spam messages quietly muted. She'd slept seven hours Saturday night and Sunday night for the first time in two weeks.",
      "Most social automation is built to amplify — post more, reply faster, hustle harder. The interesting automations reduce noise instead of adding to it. They give the founder fewer things to look at, not more. They give back sleep, not screen time.",
    ],
    cta: {
      serviceLabel: "Social Automation",
      label: "See the social automation service",
      href: "/services/social-automation",
      tagline:
        "Inbox drowning you? I ship DM-triage stacks that route real leads, warm fans, and quietly mute the rest. Sleep returned, usually 5-10 day ship.",
    },
  },
  {
    slug: "chatbot-for-client-who-hates-chatbots",
    title: "Why I built a chatbot for a client who hates chatbots",
    eyebrow: "Build log · 2026",
    deck: "He'd spent fifteen years building a relationship-led practice. The last thing he wanted was a bot pretending to be him. So we built the opposite: a bot that openly admitted it was a bot, did the boring intake, and handed every real conversation to a human within 90 seconds.",
    description:
      "A storytelling field note on building an honest AI chatbot for a clinician who refused to ship anything that pretended to be human — and why that constraint made the deployment work.",
    heroImage: "/news/chatbot-for-client-who-hates-chatbots.jpg",
    heroPosition: "center top",
    heroCaption: "Rooftop · launch-day thumbs-up · Pererenan",
    publishedAt: "2026-05-26",
    readingTime: 6,
    category: "Automation",
    tags: ["chatbot", "ai", "clinical", "honest-ai", "intake"],
    body: [
      "He called me on a Tuesday morning to talk about a chatbot for his clinical practice. The first thing he said before I could pitch anything was, \"I hate chatbots. The fake-friendly ones especially. I am not paying for software that lies to my patients.\"",
      "Most chatbot pitches start with \"it'll feel just like talking to a real person.\" That promise is exactly what he was warning me against. So we threw it out and built the opposite.",
      "The bot opens every conversation with one line: \"Hi — I'm an automated assistant for Dr. R's practice. I can answer scheduling questions and intake forms, but for anything clinical I'll connect you to a human in under 90 seconds.\" No emoji. No \"hey there!\" No pretending.",
      "From there, the bot does three things. It checks insurance acceptance against a small database. It runs the routine intake form. And it watches every message for clinical-sounding keywords — pain, urgent, bleeding, dizzy, anxious — and the second one shows up, it pages the on-call coordinator and hands off the conversation with full context.",
      "We launched it on a Wednesday afternoon. By Friday the practice had handled 142 conversations, completed 38 intake forms, and routed 11 urgent clinical inquiries to a human within their 90-second target. Patient feedback was the surprise: \"It told me right away it was a bot — that actually made me more comfortable, not less.\"",
      "The lesson is the inverse of what the chatbot industry has been selling for five years. The honest, narrow-purpose bot that admits it's a bot consistently outperforms the friendly, broad-purpose bot that pretends to be human. Patients aren't fooled by the pretending. They are, however, deeply relieved by the honesty.",
    ],
    cta: {
      serviceLabel: "AI Chatbots",
      label: "See the AI chatbot service",
      href: "/services/ai-chatbots",
      tagline:
        "Need a chatbot that doesn't make your customers cringe? I ship honest, narrow-purpose bots that hand off to humans the second it matters. Usually 5-10 day ship.",
    },
  },
  {
    slug: "dental-atelier-no-contact-form",
    title: "The dental atelier that doesn't have a contact form anymore",
    eyebrow: "Build log · 2026",
    deck: "We replaced their contact form with a four-step HIPAA-aware intake flow. Inquiry completion rate jumped from 34% to 71% in the first month. The form they thought was \"working fine\" was quietly costing them two patients a week.",
    description:
      "A storytelling field note on rebuilding a Manhattan dental clinic's lead intake from a generic contact form into a four-step HIPAA-aware flow — and the conversion lift it produced.",
    heroImage: "/news/dental-atelier-no-contact-form.jpg",
    heroPosition: "center top",
    heroCaption: "Cafe postit notes · intake flow planning · February",
    publishedAt: "2026-05-26",
    readingTime: 7,
    category: "Stack",
    tags: ["dental", "intake", "hipaa", "nextjs", "ux"],
    body: [
      "The dental atelier had a contact form. Everyone had a contact form. Five fields: name, email, phone, message, submit. It had been on the site for nine years. Nobody had thought about it once in that entire time.",
      "When we ran the data, the form was completing at 34%. Meaning two out of three people who started filling it in abandoned before they hit submit. The drop-off was happening at the message field — the open-ended one. People were stalling on what to write, then closing the tab.",
      "Worse: of the 34% who did submit, a meaningful chunk were writing protected health information into a plain text box that was being emailed unencrypted to the front desk. The clinic didn't know it was a compliance problem yet, but it was going to be one.",
      "We rebuilt the intake as a four-step flow. Step one collected name and the basic appointment type they were inquiring about — five buttons, no typing. Step two collected scheduling preference — three time-window buttons. Step three asked for contact details — email and phone. Only after explicit consent on step three did step four open up: a single optional field for \"anything else the clinical team should know.\" That field routed to an encrypted intake channel, never to plain email.",
      "Completion rate went from 34% to 71% in the first month. Inquiry quality, rated by the clinic's intake coordinator on a 1-5 scale, went from 2.1 to 4.4. The encrypted-PHI routing was the kind of unsexy compliance fix that would have eventually become a $40,000 problem if we hadn't caught it.",
      "The bigger lesson is that nobody audits the contact form. It's the most ignored piece of web UX on every clinic, agency, and SaaS site I touch. People obsess over hero copy and pricing pages and ignore the one form that determines whether anyone ever talks to them. If you haven't looked at your contact form's completion rate in the last twelve months, that is the next thing you should look at.",
    ],
    cta: {
      serviceLabel: "Vibe-Coded Websites",
      label: "See the bespoke site service",
      href: "/services/vibe-coded-sites",
      tagline:
        "Your form is leaking patients (or leads). I rebuild intake flows inside a bespoke Next.js site — usually 5-14 day ship, HIPAA-aware when it needs to be.",
    },
  },
  {
    slug: "three-months-of-claude-citations",
    title: "Three months of Claude citations and what they taught me",
    eyebrow: "AEO · 2026",
    deck: "We tracked every Claude, ChatGPT, and Perplexity answer that cited a SkynetLabs page for ninety days. The patterns surprised me. Some pages I thought were strong got zero citations. Two pages I almost killed turned into citation magnets.",
    description:
      "A storytelling field note on tracking AEO citations across Claude, ChatGPT, and Perplexity for ninety days — what surprised us, what got cited, and what didn't.",
    heroImage: "/news/three-months-of-claude-citations.jpg",
    heroPosition: "center top",
    heroCaption: "Garden corner · citation tracker review · Sunday",
    publishedAt: "2026-05-26",
    readingTime: 9,
    category: "AEO",
    tags: ["aeo", "citations", "claude", "perplexity", "tracking"],
    body: [
      "I started tracking LLM citations in early February. Built a small n8n flow that runs a fixed set of queries against Claude, ChatGPT, and Perplexity every Sunday morning and logs which SkynetLabs pages, if any, end up cited or summarized in the response.",
      "Three months in, I have ninety data points and some honest opinions. The first thing that surprised me: the AEO Guide page, which I'd written specifically to be citation-bait, got fewer citations than I expected — about 30% hit rate. It was getting summarized but not linked. Useful, but not the home run I'd planned.",
      "The second surprise: the n8n-vs-Zapier comparison page hit roughly 60% of relevant queries with a direct citation. The combination of a clear comparison table, a FAQPage schema, and a numbered-list \"when to use each\" block consistently got pulled into LLM answers verbatim. That page is doing more for our brand presence than any other single asset.",
      "The third surprise: two pages I almost killed for being \"too thin\" turned into citation magnets. The Person schema page on /author/waseem-nasir gets cited every time someone asks \"who is Waseem Nasir\" or \"who runs SkynetLabs\" — the structured Person schema (nationality, knowsAbout, sameAs, occupation) is doing the heavy lifting. The /pricing page gets cited every time someone asks \"what does SkynetLabs charge\" — the OfferCatalog schema with explicit price points is what makes it pickable.",
      "The fourth surprise was a non-event: no traffic. Citations are not clicks. Most LLM answers don't link out, or the user takes the answer and doesn't follow the link. The brand presence is real and the trust signal is real — but if you're measuring AEO success in referral sessions in Google Analytics, you're going to be disappointed for years.",
      "What I've changed because of the data: every flagship page now has a FAQPage schema with 5-7 questions, every page has a single 60-word direct-answer block right under the H1, and every page has Person + Organization + page-type schema layered in. The Person schema in particular is the cheapest, highest-leverage thing most sites are still skipping.",
      "If you're three months into AEO and not seeing citations, audit your schema layer first. Then your llms.txt. Then your robots.txt to make sure the AI crawlers aren't being blocked. Most underperforming AEO is not a content problem — it's a retrieval-plumbing problem.",
    ],
    cta: {
      serviceLabel: "WordPress SEO Blog",
      label: "See the AEO content engine service",
      href: "/services/wordpress-seo",
      tagline:
        "Not getting cited by Claude or ChatGPT? I ship AEO content engines — schema-first, llms.txt-correct, 10-30 AEO-tuned articles a month. Citation lift usually visible in 8 weeks.",
    },
  },
  {
    slug: "brand-kit-reconcile-18-hours",
    title: "The brand kit reconcile that took 18 hours",
    eyebrow: "Build log · 2026",
    deck: "A clinical recovery network had inherited a half-finished brand kit from a previous agency. The palette was off-spec, the logo on the site was a re-render, the founder's actual asset was sitting on a Dropbox. We reconciled the whole thing in a working day — and the partnership announcement went live on schedule.",
    description:
      "A storytelling field note on a 24-hour brand-kit rescue for a clinical recovery network before a partnership announcement — the unglamorous design work nobody writes about.",
    heroImage: "/news/brand-kit-reconcile-18-hours.jpg",
    heroPosition: "center top",
    heroCaption: "Transit window · between Jakarta and Bali · Wednesday",
    publishedAt: "2026-05-26",
    readingTime: 7,
    category: "Stack",
    tags: ["branding", "design", "rescue", "clinical", "story"],
    body: [
      "The Tuesday afternoon message was short: \"Our partnership announcement is Wednesday at 2pm Eastern. Our brand is broken. Can you help.\" Eighteen hours from message to live announcement. The previous agency had been paid for a brand kit and an intake setup and delivered neither in working condition.",
      "When I opened the kit I found the problem in roughly four minutes. The Pantone callouts in the brand-guide PDF didn't match the actual color values used in the website CSS. The wordmark on the site header was a re-rendered approximation, not the founder's original logo asset, which was sitting in a Dropbox folder that nobody had touched in eleven months. The font called for in the guide wasn't licensed for web use, so the site was falling back to Arial.",
      "The order of operations had to be careful. The announcement deck used the founder's real logo asset, so the website had to match the deck — not the other way around. The Dropbox folder had the canonical files. The brand guide had to be rewritten to match what the founder actually owned, not what the previous agency had drifted into.",
      "I spent the first six hours just reconciling. Pulled the canonical logo from Dropbox, regenerated SVG and PNG versions at every size the site and the deck would need. Mapped the actual hex values from the founder's asset back into the website CSS variables. Found a web-licensed alternative to the unlicensed display font that matched the visual weight close enough that nobody outside a typographer would notice.",
      "Hours seven through fourteen: rebuilding the intake form, since the brand-aligned version had also been broken. Wired it to a proper Apps Script routing layer so that submissions actually reached the admissions team. Tested with three dummy submissions across all three regional pods.",
      "By 11am Wednesday Eastern — three hours before the partnership announcement went live — everything was reconciled. The deck, the site, the intake form, the email signatures, and the social headers all matched the founder's actual brand asset for the first time in eleven months. The announcement went live at 2pm on schedule. The intake form handled the post-announcement spike without dropping a single submission.",
      "The work nobody writes about: reconciling. Most brand problems aren't a creative direction problem. They're a custody problem. Files drift. Versions multiply. Vendors hand off in a hurry. Six months later nobody knows which file is the real one. The fix is mostly archeology — finding the founder's actual asset, deleting everything that drifted from it, and committing the survivors to a single canonical folder that lives in a place the founder controls.",
    ],
    cta: {
      serviceLabel: "Branding & Design",
      label: "See the branding service",
      href: "/services/branding-design",
      tagline:
        "Brand kit drifted across five vendors? I reconcile it — canonical assets, Figma library, brand guide that actually matches the site. Usually 5-14 day ship.",
    },
  },
];

export function getArticle(slug: string): NewsArticle | undefined {
  return NEWS.find((n) => n.slug === slug);
}

export function relatedFor(slug: string, count = 3) {
  return NEWS.filter((n) => n.slug !== slug).slice(0, count);
}
