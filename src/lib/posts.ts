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
};

export const POSTS: Post[] = [
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
    title: "Case Study: How We Cut a Dental Practice's No-Show Rate from 32% to 7%",
    description:
      "Real client. Real numbers. The GoHighLevel + Signal + n8n stack that recovered $11,400/month in lost revenue inside 14 days.",
    publishedAt: "2026-05-15",
    readingTime: 7,
    category: "case-study",
    tags: ["gohighlevel", "whatsapp", "no-show", "dental", "case-study"],
  },
  {
    slug: "aeo-playbook-service-businesses",
    title: "The AEO Playbook for Service Businesses: Getting Cited by ChatGPT, Claude & Perplexity",
    description:
      "Answer-engine optimization is SEO's bigger, weirder cousin. Here's the practical 7-step playbook we use to get clients cited in LLM answers — without keyword stuffing or fake authority signals.",
    publishedAt: "2026-05-12",
    updatedAt: "2026-05-21",
    readingTime: 11,
    category: "aeo",
    tags: ["aeo", "llm", "chatgpt", "claude", "perplexity", "seo"],
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
