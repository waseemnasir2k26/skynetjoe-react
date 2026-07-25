export type Post = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  category: "automation" | "aeo" | "case-study" | "playbook";
  tags: string[];
  coverImage?: string;
  author?: string;
};

export const POSTS: Post[] = [
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
      "40 master prompts for Claude Fable 5 — Claude Code, n8n, GHL and agency templates that build reusable assets. Free access ends July 12.",
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
    slug: "n8n-vs-zapier-2026",
    title: "n8n vs Zapier in 2026: When to Use Which (and the Real Cost Math)",
    description:
      "After 180+ shipped workflows, here's the honest breakdown — when n8n wins, when Zapier wins, and the cost numbers nobody puts in writing.",
    publishedAt: "2026-05-18",
    updatedAt: "2026-05-21",
    readingTime: 9,
    category: "automation",
    tags: ["n8n", "zapier", "make", "automation", "tooling"],
  },
  {
    slug: "ghl-no-show-automation-case-study",
    // Canonical dental figures: 32% -> 9% steady-state, ~PKR 345,000 (~$1,235)
    // recovered per WEEK (~PKR 1.49M / ~$5,350 per month at 4.33 weeks),
    // shipped in 11 days. Sourced from the cost-math table
    // in app/(skynet)/news/dental-no-show-n8n-flow/page.tsx. Do not restate
    // these numbers anywhere without matching that table.
    title:
      "Case Study: How We Cut a Dental Practice's No-Show Rate from 32% to 9%",
    description:
      "The GoHighLevel + Signal + n8n stack that took a dental practice from a 32% no-show rate to 9%, recovering around $1,235 a week in booked revenue. Shipped in 11 days.",
    publishedAt: "2026-05-15",
    readingTime: 7,
    category: "case-study",
    tags: ["gohighlevel", "whatsapp", "no-show", "dental", "case-study"],
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
      "Three acronyms, one job. LLMO, GEO and AEO are 80% the same discipline with different emphasis. Here's which term to use when, what overlaps, and where the work actually diverges.",
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
      "AEO targets AI citation rate across four engines. SEO targets blue-link Google ranking. 60% shared foundation, 40% distinct work. Why most service businesses in 2026 need both, sequenced sensibly.",
    publishedAt: "2026-05-13",
    updatedAt: "2026-05-22",
    readingTime: 9,
    category: "aeo",
    tags: ["aeo", "seo", "comparison", "strategy", "citation-rate", "ranking"],
    author: "Waseem Nasir",
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
