export type PostCategory =
  | "automation"
  | "aeo"
  | "case-study"
  | "playbook"
  | "operations"
  | "pricing"
  | "tools"
  | "stack"
  | "field-notes";

export type Post = {
  slug: string;
  title: string;
  /** Optional SERP-tuned title (≤55 chars) for <title>/metadata only. */
  seoTitle?: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  category: PostCategory;
  tags: string[];
  coverImage?: string;
  author?: string;
  /**
   * How the body is rendered.
   *  - "html" (default): /blog/[slug] reads content/blog/posts/<slug>.html
   *  - "page": the post ships its own src/app/(skynet)/blog/<slug>/page.tsx
   *    (letter-design essays promoted from /news on 2026-09-21). The dynamic
   *    route skips these in generateStaticParams.
   */
  layout?: "html" | "page";
  /** Letter-design fields (only on layout: "page" posts). */
  eyebrow?: string;
  deck?: string;
  heroImage?: string;
  heroCaption?: string;
  cta?: { label: string; href: string; tagline: string; serviceLabel: string };
};

const CATEGORY_LABEL: Record<PostCategory, string> = {
  automation: "Automation",
  aeo: "AEO",
  "case-study": "Case study",
  playbook: "Playbook",
  operations: "Operations",
  pricing: "Pricing",
  tools: "Tools",
  stack: "Stack",
  "field-notes": "Field notes",
};

export function categoryLabel(c: PostCategory): string {
  return CATEGORY_LABEL[c] ?? c;
}

export const POSTS: Post[] = [
  {
    slug: "n8n-freight-quote-email-parser",
    title: "The n8n Freight Quote Email Parser: One Email In, Eight Fields Out",
    seoTitle: "n8n Freight Quote Email Parser with Claude",
    description:
      "An n8n workflow read 20 freight quote emails on 2026-09-18, filling 6.75 of 8 fields each with Claude Haiku 4.5 and writing one Postgres row per email.",
    publishedAt: "2026-09-21",
    updatedAt: "2026-09-21",
    readingTime: 12,
    category: "automation",
    tags: [
      "n8n email parser",
      "free n8n template",
      "n8n workflow json",
      "claude api",
      "anthropic claude haiku 4.5",
      "freight quote automation",
      "logistics automation",
      "postgres automation",
      "ai email extraction",
    ],
    author: "Waseem Nasir",
  },
  {
    slug: "n8n-shorts-factory-workflow",
    title:
      "The n8n Shorts Factory Workflow: One Topic In, a Captioned 9:16 Short Out",
    seoTitle: "n8n Shorts Factory: Topic In, Short Out",
    description:
      "The n8n Shorts Factory workflow turns one topic string into a captioned 9:16 MP4: 28 nodes wiring Groq, ElevenLabs and a self-hosted ffmpeg service.",
    publishedAt: "2026-09-21",
    updatedAt: "2026-09-21",
    readingTime: 12,
    category: "automation",
    tags: [
      "n8n",
      "free n8n template",
      "n8n workflow json",
      "youtube shorts automation",
      "ai video automation",
      "elevenlabs",
      "groq",
      "ffmpeg",
      "self hosted n8n",
    ],
    author: "Waseem Nasir",
  },
  {
    slug: "n8n-speed-to-lead-workflow",
    title: "The n8n Speed-to-Lead Workflow: an AI Reply in About Two Seconds",
    seoTitle: "n8n Speed-to-Lead Workflow: 2-Second Reply",
    description:
      "An n8n speed-to-lead workflow answered a web form in 2.4s and 1.9s on 2026-09-17, then qualified the reply and proposed a visit window. MIT JSON.",
    publishedAt: "2026-09-21",
    updatedAt: "2026-09-21",
    readingTime: 12,
    category: "automation",
    tags: [
      "n8n speed to lead",
      "n8n lead generation workflow",
      "free n8n template",
      "n8n claude api",
      "anthropic claude haiku 4.5",
      "postgres automation",
      "webhook automation",
      "home services automation",
    ],
    author: "Waseem Nasir",
  },
  {
    slug: "n8n-clinic-whatsapp-booking-bot",
    title:
      "The n8n Clinic WhatsApp Booking Agent: It Refuses by Code, Not by Prompt",
    seoTitle: "n8n Clinic WhatsApp Booking Agent (Ep05)",
    description:
      "An n8n workflow handed off 10 of 10 medical and price questions by code before the model on 2026-09-22, then booked 4 of 12 simulated WhatsApp patients with 0 double bookings.",
    publishedAt: "2026-09-23",
    updatedAt: "2026-09-23",
    readingTime: 12,
    category: "automation",
    tags: [
      "n8n whatsapp booking bot",
      "free n8n template",
      "n8n workflow json",
      "whatsapp cloud api",
      "postgres chat memory",
      "clinic automation",
      "appointment booking automation",
      "ai agent tool calling",
      "n8n code node",
    ],
    author: "Waseem Nasir",
  },
  {
    slug: "n8n-google-maps-lead-table",
    title:
      "n8n Google Maps Lead Harvest: Trade and City In, a Deduped Lead Table Out",
    seoTitle: "n8n Google Maps Lead Harvest Workflow",
    description:
      "This n8n workflow wrote 100 Denver roofing businesses to Postgres in 31.9 seconds on 2026-09-18, deduped on place_id via the Apify Maps actor.",
    publishedAt: "2026-09-21",
    updatedAt: "2026-09-21",
    readingTime: 12,
    category: "automation",
    tags: [
      "n8n google maps scraper",
      "n8n lead generation workflow",
      "free n8n template",
      "apify",
      "postgres automation",
      "local lead generation",
      "home services leads",
      "n8n code node",
    ],
    author: "Waseem Nasir",
  },
  {
    slug: "ai-ops-command-center-never-miss-a-lead",
    title:
      "The AI Ops Command Center: How Small Businesses Stop Missing Leads Forever",
    description:
      "An AI receptionist that answers, texts back, and books your calendar in under a minute, 24/7 — built in your own GoHighLevel and n8n accounts. How it works, what it costs to run, and who it's actually for.",
    publishedAt: "2026-07-13",
    readingTime: 11,
    category: "automation",
    tags: [
      "ai receptionist",
      "missed call text back",
      "speed to lead",
      "business automation",
      "gohighlevel",
      "n8n",
    ],
    author: "Waseem Nasir",
  },
  {
    slug: "claude-fable-5-prompts-40-master-prompts",
    title: "Claude Fable 5 Prompts: 40 Master Prompts to Run Before July 12",
    description:
      "40 master prompts for Claude Fable 5 — Claude Code, n8n, GHL and agency templates that build reusable assets.",
    publishedAt: "2026-07-11",
    readingTime: 25,
    category: "playbook",
    tags: [
      "claude",
      "fable-5",
      "prompts",
      "claude-code",
      "n8n",
      "gohighlevel",
      "ai",
    ],
    author: "Waseem Nasir",
  },
  {
    slug: "aeo-playbook-service-businesses",
    title:
      "The AEO Playbook for Service Businesses: Getting Cited by ChatGPT, Claude & Perplexity",
    description:
      "Answer-engine optimization is SEO's bigger, weirder cousin. Here's the practical 7-step playbook we use to get clients cited in LLM answers — without keyword stuffing or fake authority signals.",
    publishedAt: "2026-05-12",
    updatedAt: "2026-05-21",
    readingTime: 11,
    category: "aeo",
    tags: ["aeo", "llm", "chatgpt", "claude", "perplexity", "seo"],
  },
  {
    slug: "llmo-vs-geo-vs-aeo",
    title:
      "LLMO vs GEO vs AEO: The 2026 Acronym Guide for AI Search Optimization",
    description:
      "Three acronyms, one job. LLMO, GEO and AEO are largely the same discipline with different emphasis. Here's which term to use when, what overlaps, and where the work actually diverges.",
    publishedAt: "2026-05-13",
    updatedAt: "2026-05-22",
    readingTime: 8,
    category: "aeo",
    tags: ["aeo", "llmo", "geo", "llm", "search", "terminology"],
    author: "Waseem Nasir",
  },
  {
    slug: "track-ai-citations",
    title:
      "How to Track AI Citations Across ChatGPT, Claude, Gemini and Perplexity",
    description:
      "The manual tracking method I use on every AEO engagement before touching a paid tool. 20 prompts, four engines, one spreadsheet, weekly cadence. Costs nothing, works for six months minimum.",
    publishedAt: "2026-05-13",
    updatedAt: "2026-05-22",
    readingTime: 9,
    category: "aeo",
    tags: [
      "aeo",
      "tracking",
      "citation-rate",
      "chatgpt",
      "claude",
      "perplexity",
      "gemini",
    ],
    author: "Waseem Nasir",
  },
  {
    slug: "how-to-rank-in-chatgpt",
    title:
      "How to Rank in ChatGPT: Direct Answers for Brands That Want to Be Cited",
    description:
      "Five schema types, an llms.txt file, FAQ blocks in claim-plus-example pattern, explicit dateModified, and a 20-prompt tracking set. The playbook that actually moves ChatGPT citation rate.",
    publishedAt: "2026-05-13",
    updatedAt: "2026-05-22",
    readingTime: 10,
    category: "aeo",
    tags: ["aeo", "chatgpt", "schema", "llms-txt", "faq", "citation-rate"],
    author: "Waseem Nasir",
  },
  {
    slug: "get-cited-by-claude",
    title:
      "How to Get Cited by Claude: Direct Answers for Anthropic AI Visibility",
    description:
      "Claude is the conservative engine. Marketing copy that gets pulled by ChatGPT gets filtered by Claude. The Wikidata + Crunchbase + claim-with-source playbook that actually lifts Claude citation rate.",
    publishedAt: "2026-05-13",
    updatedAt: "2026-05-22",
    readingTime: 9,
    category: "aeo",
    tags: ["aeo", "claude", "anthropic", "wikidata", "entity", "citation-rate"],
    author: "Waseem Nasir",
  },
  {
    slug: "aeo-vs-seo",
    title: "AEO vs SEO: How They Differ and Why You Need Both in 2026",
    description:
      "AEO targets AI citation rate across four engines. SEO targets blue-link Google ranking. Shared technical foundation, genuinely different surfaces. Why most service businesses in 2026 need both, sequenced sensibly.",
    publishedAt: "2026-05-13",
    updatedAt: "2026-05-22",
    readingTime: 9,
    category: "aeo",
    tags: ["aeo", "seo", "comparison", "strategy", "citation-rate", "ranking"],
    author: "Waseem Nasir",
  },
  {
    slug: "edit-videos-with-claude",
    // Moved from /edit-videos-with-claude on 2026-09-21; page.tsx lives in
    // src/app/(skynet)/blog/edit-videos-with-claude/. Dates = git history.
    title: "Edit Your Videos Using Claude Code",
    description:
      "The video-editing skills behind every SkynetLabs reel, vlog, and promo — each with the full master prompt you can paste into Claude Code and run. Free. One email unlocks the lot.",
    publishedAt: "2026-08-10",
    updatedAt: "2026-09-06",
    readingTime: 12,
    category: "playbook",
    tags: ["claude-code", "video-editing", "prompts", "reels", "ffmpeg"],
    author: "Waseem Nasir",
    layout: "page",
  },
  // ── Promoted from /news on 2026-09-21 (same slugs, 301 /news/<slug> → /blog/<slug>) ──
  {
    slug: "ai-agents-running-the-shop-2026",
    title: "The week AI agents started running my shop while I slept",
    seoTitle: "The Week AI Agents Started Running My Shop",
    description:
      "A mid-2026 field note on running a small AI agency where autonomous agents handle overnight builds, lead triage, and content drafting — what they own, the one mistake that cost a morning, and the guardrails that make it safe.",
    publishedAt: "2026-06-28",
    readingTime: 8,
    category: "stack",
    tags: ["ai-agents", "claude", "automation", "workflow", "2026"],
    author: "Waseem Nasir",
  },
  {
    slug: "bali-canggu-coworking-economics",
    title:
      "Bali co-working economics — what shipping from Canggu actually costs",
    seoTitle: "Bali Co-Working Economics: The Real Monthly Cost",
    description:
      "A line-by-line breakdown of the monthly cost of running SkynetLabs from Canggu, Bali — including the categories digital-nomad blogs leave out: visa runs, scooter rental, fast Wi-Fi tax, and food delivery.",
    publishedAt: "2026-05-19",
    readingTime: 11,
    category: "field-notes",
    tags: ["bali", "remote", "economics", "digital-nomad", "operations"],
    author: "Waseem Nasir",
    layout: "page",
    eyebrow: "Field notes · Volume II · 2026",
    deck: "The honest monthly burn for one operator running client builds out of Canggu — visa, scooter, villa, coffee shops, fiber, gym, food. With Lahore comparison so the numbers feel real.",
    heroImage: "/news/bali-canggu-coworking-economics.jpg",
    heroCaption: "Canggu rooftop · scooter parked · 5pm work block",
    cta: {
      serviceLabel: "Work with SkynetLabs",
      label: "See the services",
      href: "/services",
      tagline:
        "Want a remote operator who ships like a small team? Browse the full menu of builds — automation, AEO, bespoke sites, and the systems that hold them together.",
    },
  },
  {
    slug: "weekend-with-claude-code",
    title: "A weekend with Claude Code",
    description:
      "A weekend rebuild of the SkynetJoe theme using Claude Code as the primary tooling. What got faster, what got harder, and the five things I still do by hand.",
    publishedAt: "2026-05-17",
    readingTime: 9,
    category: "stack",
    tags: ["claude-code", "tooling", "nextjs", "developer-experience"],
    author: "Waseem Nasir",
    layout: "page",
    eyebrow: "Stack notes · Volume II · 2026",
    deck: "Two days, one Next.js 16 rebuild, zero Cursor. What changed about how I ship sites when the IDE became a CLI agent with full repo context — and the five places it still doesn't help.",
    heroImage: "/news/weekend-with-claude-code.jpg",
    heroCaption: "Claude Code session · TUI logs · weekend rebuild",
    cta: {
      serviceLabel: "Vibe-Coded Websites",
      label: "See the bespoke site service",
      href: "/services/vibe-coded-sites",
      tagline:
        "Need a fast, bespoke Next.js build instead of another template? I ship vibe-coded sites with full repo context — usually a 7-day turnaround.",
    },
  },
  {
    slug: "public-pricing-ai-builds",
    title:
      "Why I price my AI builds publicly while every agency hides the number",
    seoTitle: "Why I Price AI Builds Publicly",
    description:
      "An essay on the strategic case for public pricing in AI services — how SkynetLabs filtered out a year of wrong-fit briefs by publishing four flat-rate tiers, and what we still negotiate.",
    publishedAt: "2026-05-15",
    readingTime: 8,
    category: "pricing",
    tags: ["pricing", "agency", "transparency", "sales"],
    author: "Waseem Nasir",
    layout: "page",
    eyebrow: "Pricing essay · Volume II · 2026",
    deck: 'Four tiers. No "custom quote" theater. Why public pricing kills the worst clients before they reach the call, and the one tier I refused to publish because nobody ever needed it.',
    heroImage: "/news/public-pricing-ai-builds.jpg",
    heroCaption: "Pricing whiteboard · Bali rooftop · April retreat",
    cta: {
      serviceLabel: "Pricing",
      label: "See the public pricing",
      href: "/pricing",
      tagline:
        'Tired of "request a quote" theater? The full SkynetLabs price list is public — flat tiers, no custom-quote runaround. See where your build lands before you ever book a call.',
    },
  },
  {
    slug: "small-fleet-paid-tools-2026",
    title: "The 6 paid tools every small fleet uses (and which 4 to delete)",
    seoTitle: "6 Paid Tools Every Small Fleet Uses (Delete 4)",
    description:
      "An audit of the typical $800/mo small-fleet SaaS stack — load board, ELD, dispatch, factoring portal, two CRMs, accounting — with specific recommendations on which to keep, which to consolidate, and which to delete.",
    publishedAt: "2026-05-13",
    readingTime: 10,
    category: "tools",
    tags: ["freight", "fleet", "saas", "audit", "stack"],
    author: "Waseem Nasir",
    layout: "page",
    eyebrow: "Stack audit · Volume II · 2026",
    deck: "Most 8-to-20-truck operators are paying $800–$1,400/month for tools that don't talk to each other. After auditing twelve fleets in early 2026, here are the four you can delete this week.",
    heroImage: "/news/small-fleet-paid-tools-2026.jpg",
    heroCaption: "Truckstop receipts · client stack audit · April",
    cta: {
      serviceLabel: "n8n Automation",
      label: "See the n8n service",
      href: "/services/n8n-automation",
      tagline:
        "Paying for six tools that don't talk to each other? I audit the small-fleet stack, kill the dead subscriptions, and wire the survivors together in n8n.",
    },
  },
  {
    slug: "aeo-2026-meaning",
    title: 'What "AEO" actually means in 2026',
    description:
      "A grounded explainer on what AEO is, why it's structurally different from SEO, what retrieval-augmented generation cares about, and the five things SkynetLabs ships on every AEO-tuned client site.",
    publishedAt: "2026-05-11",
    readingTime: 13,
    category: "aeo",
    tags: ["aeo", "llm", "chatgpt", "perplexity", "seo", "retrieval"],
    author: "Waseem Nasir",
    layout: "page",
    eyebrow: "AEO field guide · Volume II · 2026",
    deck: "Answer-engine optimization is not SEO with a new label. It's the discipline of getting your business cited inside ChatGPT, Claude, and Perplexity answers — and most agencies selling it don't understand the underlying retrieval mechanics.",
    heroImage: "/news/aeo-2026-meaning.jpg",
    heroCaption: "AEO retrieval map · client whiteboard · Lahore",
    cta: {
      serviceLabel: "WordPress SEO Blog",
      label: "See the AEO content engine service",
      href: "/services/wordpress-seo",
      tagline:
        "Want to get cited inside ChatGPT, Claude, and Perplexity? I ship AEO content engines — schema-first, llms.txt-correct, direct-answer blocks on every page.",
    },
  },
  {
    slug: "8-hour-reply-rule",
    title: "The 8-hour reply rule",
    description:
      "The exact operating rhythm — Signal queue, Notion build board, eight-hour weekday reply window — that lets one operator ship 4 client builds/month from Canggu without slipping.",
    publishedAt: "2026-05-07",
    readingTime: 9,
    category: "operations",
    tags: ["operations", "solo", "remote", "workflow", "client-management"],
    author: "Waseem Nasir",
    layout: "page",
    eyebrow: "Operations · Volume II · 2026",
    deck: "How SkynetLabs handles four builds a month from a cafe in Bali without missing replies, dropping builds, or burning out. The unsexy Signal-and-Notion stack that actually runs the shop.",
    heroImage: "/news/8-hour-reply-rule.jpg",
    heroCaption: "Crate Cafe · Canggu · 7am scooter slot",
    cta: {
      serviceLabel: "AI Chatbots & Systems",
      label: "See the AI chatbot service",
      href: "/services/ai-chatbots",
      tagline:
        "Builds slipping through the cracks? I design the operating system behind the shop — intake queue, build board, and a reply window you can actually keep.",
    },
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

/** Newest first — the /blog index order. */
export function postsByDate(): Post[] {
  return [...POSTS].sort(
    (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt),
  );
}

/** Same-category first, then most recent of everything else. */
export function relatedPosts(slug: string, count = 3): Post[] {
  const current = getPost(slug);
  const pool = postsByDate().filter((p) => p.slug !== slug);
  if (!current) return pool.slice(0, count);
  const same = pool.filter((p) => p.category === current.category);
  const rest = pool.filter((p) => p.category !== current.category);
  return [...same, ...rest].slice(0, count);
}
