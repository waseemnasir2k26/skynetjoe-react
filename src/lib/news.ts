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
    deck: "How SkynetLabs handles four builds a month from a cafe in Bali without missing replies, dropping builds, or burning out. The unsexy WhatsApp-and-Notion stack that actually runs the shop.",
    description:
      "The exact operating rhythm — WhatsApp queue, Notion build board, eight-hour weekday reply window — that lets one operator ship 4 client builds/month from Canggu without slipping.",
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
    deck: "A real Karachi dental flagship was losing PKR 480,000/month to no-shows. The n8n + GoHighLevel + WhatsApp graph I shipped in 11 days — every node, every fallback, every number.",
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
];

export function getArticle(slug: string): NewsArticle | undefined {
  return NEWS.find((n) => n.slug === slug);
}

export function relatedFor(slug: string, count = 3) {
  return NEWS.filter((n) => n.slug !== slug).slice(0, count);
}
