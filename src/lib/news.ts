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
};

export const NEWS: NewsArticle[] = [
  {
    slug: "n8n-vs-zapier-2026-switch",
    title: "Why I stopped using Zapier for client builds in 2026",
    eyebrow: "Field notes · Volume II · 2026",
    deck: "After 180+ shipped automations, the Zapier bill stopped making sense. Here's the unglamorous math behind switching every client over to n8n — and the three workflows where I still pay for Zapier anyway.",
    description:
      "An honest essay on why SkynetLabs replaced Zapier with self-hosted n8n on a $7/mo Hostinger VPS across 9 client accounts in 2026. Cost math, migration pain, and the three Zaps I kept.",
    heroImage: "/news/n8n-zapier-switch.jpg",
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
    heroImage: "/news/8-hour-reply.jpg",
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
    heroImage: "/news/dental-no-show.jpg",
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
    heroImage: "/news/aeo-2026.jpg",
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
    heroImage: "/news/small-fleet-tools.jpg",
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
    heroImage: "/news/public-pricing.jpg",
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
    heroImage: "/news/claude-code-weekend.jpg",
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
    heroImage: "/news/canggu-economics.jpg",
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
    heroImage: "/portraits/waseem-builder-hero.jpg",
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
    heroImage: "/portraits/waseem-veranda-thinking.jpg",
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
    heroImage: "/portraits/waseem-cafe-arch.jpg",
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
    heroImage: "/portraits/waseem-poolside-laptop.jpg",
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
    heroImage: "/bali-trek/mountain-vista.jpg",
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
    heroImage: "/portraits/waseem-rooftop-coffee.jpg",
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
];

export function getArticle(slug: string): NewsArticle | undefined {
  return NEWS.find((n) => n.slug === slug);
}

export function relatedFor(slug: string, count = 3) {
  return NEWS.filter((n) => n.slug !== slug).slice(0, count);
}
