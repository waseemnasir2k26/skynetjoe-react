/**
 * AEO Audit — heuristic questionnaire data + scoring.
 *
 * Not a live crawler. Self-reported answers across 5 weighted categories
 * that mirror what answer engines (ChatGPT, Perplexity, Google AI Overviews)
 * actually need to read and cite a page: structured data, direct-answer
 * content shape, crawlability, entity clarity, and citation-worthiness.
 */

export type Category =
  | "schema"
  | "content"
  | "crawlability"
  | "entity"
  | "citations";

export type CategoryMeta = {
  key: Category;
  label: string;
  short: string;
  maxScore: number;
};

export const CATEGORIES: CategoryMeta[] = [
  {
    key: "schema",
    label: "Structured Data",
    short: "Schema.org / JSON-LD an engine can parse without guessing.",
    maxScore: 25,
  },
  {
    key: "content",
    label: "Direct-Answer Content",
    short: "FAQ blocks, clear headings, front-loaded answers.",
    maxScore: 25,
  },
  {
    key: "crawlability",
    label: "Crawlability",
    short: "robots.txt, llms.txt, sitemap, no JS-only rendering walls.",
    maxScore: 20,
  },
  {
    key: "entity",
    label: "Entity Clarity",
    short:
      "Who you are is unambiguous — Organization/Person markup, About page.",
    maxScore: 15,
  },
  {
    key: "citations",
    label: "Citation-Worthiness",
    short: "Content other sites and answer engines actually reference.",
    maxScore: 15,
  },
];

export const MAX_SCORE = CATEGORIES.reduce((s, c) => s + c.maxScore, 0);

export type Option = {
  value: string;
  label: string;
  score: number; // points awarded toward this question's category
  fix?: string; // shown in the prioritized fix list if NOT the top-scoring pick
};

export type Question = {
  id: string;
  step: number;
  category: Category;
  prompt: string;
  hint?: string;
  options: Option[];
};

export const QUESTIONS: Question[] = [
  {
    id: "schema-present",
    step: 1,
    category: "schema",
    prompt:
      "Do your key pages have JSON-LD structured data (Organization, Article, FAQPage, etc.)?",
    hint: 'Check page source for a <script type="application/ld+json"> block.',
    options: [
      {
        value: "none",
        label: "No schema at all",
        score: 0,
        fix: "Add JSON-LD Organization schema site-wide, then Article/FAQPage on content pages.",
      },
      {
        value: "partial",
        label: "Some pages, not consistent",
        score: 8,
        fix: "Extend schema coverage to every indexable page — templates, not one-offs.",
      },
      {
        value: "most",
        label: "Most pages have it",
        score: 16,
        fix: "Audit for schema errors with Google's Rich Results Test — partial credit isn't full credit.",
      },
      { value: "full", label: "Every page, validated", score: 25 },
    ],
  },
  {
    id: "faq-schema",
    step: 2,
    category: "schema",
    prompt:
      "Do you use FAQPage schema on pages with question-and-answer content?",
    options: [
      {
        value: "no-faq-no-schema",
        label: "No FAQ content anywhere",
        score: 0,
        fix: "Add an FAQ block to your 3 highest-intent pages — answer engines love Q&A pairs.",
      },
      {
        value: "faq-no-schema",
        label: "FAQ content exists, no schema markup",
        score: 6,
        fix: "Wrap existing FAQ content in FAQPage JSON-LD — the content is doing zero AEO work unmarked.",
      },
      { value: "faq-schema", label: "FAQ content is schema-marked", score: 12 },
    ],
  },
  {
    id: "direct-answers",
    step: 3,
    category: "content",
    prompt:
      "Do your important pages answer the core question in the first 1-2 sentences?",
    hint: "Answer engines quote the fastest, clearest answer — not the one buried after 400 words of preamble.",
    options: [
      {
        value: "buried",
        label: "Answer is buried in long intros",
        score: 0,
        fix: "Rewrite openers so the direct answer lands in sentence one, then expand.",
      },
      {
        value: "mixed",
        label: "Some pages do this, most don't",
        score: 8,
        fix: "Standardize a 'direct answer first' opening on every guide/service page.",
      },
      { value: "yes", label: "Yes, consistently", score: 15 },
    ],
  },
  {
    id: "heading-structure",
    step: 4,
    category: "content",
    prompt:
      "Are your headings (H1-H3) phrased as the actual questions people ask?",
    options: [
      {
        value: "generic",
        label: 'Generic labels ("Overview", "Features")',
        score: 0,
        fix: 'Rewrite section headings as real questions — "What does X cost?" beats "Pricing".',
      },
      {
        value: "some",
        label: "Some question-style headings",
        score: 5,
        fix: "Push question-style headings across every service/FAQ page, not just a few.",
      },
      { value: "yes", label: "Consistently question-phrased", score: 10 },
    ],
  },
  {
    id: "llms-txt",
    step: 5,
    category: "crawlability",
    prompt: "Do you have an llms.txt file at your domain root?",
    hint: "A markdown index at /llms.txt that tells AI crawlers what your site is and where the important docs live.",
    options: [
      {
        value: "no",
        label: "Never heard of it / don't have one",
        score: 0,
        fix: "Generate and publish an llms.txt at your domain root.",
      },
      {
        value: "outdated",
        label: "Have one, haven't updated it in months",
        score: 5,
        fix: "Refresh llms.txt sections to match your current site structure.",
      },
      { value: "yes", label: "Yes, current and complete", score: 10 },
    ],
  },
  {
    id: "robots-sitemap",
    step: 6,
    category: "crawlability",
    prompt: "Do you have a clean robots.txt and an up-to-date XML sitemap?",
    options: [
      {
        value: "no",
        label: "Not sure / don't have either",
        score: 0,
        fix: "Publish robots.txt + sitemap.xml and submit the sitemap in Search Console.",
      },
      {
        value: "one",
        label: "Have one, not the other",
        score: 5,
        fix: "Fill the gap — you need both, and they need to agree with each other.",
      },
      { value: "both", label: "Both, and they're current", score: 10 },
    ],
  },
  {
    id: "js-rendering",
    step: 7,
    category: "crawlability",
    prompt: "Does your core content render without executing JavaScript?",
    hint: "View source (not inspect element) — if the answer text isn't there, most crawlers won't see it either.",
    options: [
      {
        value: "client-only",
        label: "Content only appears after JS runs",
        score: 0,
        fix: "Move to server-rendered or statically-generated HTML for content-bearing pages.",
      },
      {
        value: "mixed",
        label: "Mixed — some pages server-rendered, some not",
        score: 4,
        fix: "Standardize server rendering across every content page, not just some.",
      },
      { value: "server", label: "Fully server-rendered / static", score: 10 },
    ],
  },
];

// Second batch keeps under one prompt object array size but split logically —
// appended to QUESTIONS below for a flat single import.
QUESTIONS.push(
  {
    id: "entity-schema",
    step: 8,
    category: "entity",
    prompt:
      "Does your site have Organization or Person schema identifying who runs it?",
    options: [
      {
        value: "no",
        label: "No entity markup",
        score: 0,
        fix: "Add Organization schema (name, logo, sameAs social links) to your homepage.",
      },
      {
        value: "partial",
        label: "Basic name only, no sameAs/social links",
        score: 7,
        fix: "Add sameAs links to LinkedIn, X, and other verified profiles — this is how engines confirm you're a real entity.",
      },
      {
        value: "full",
        label: "Full entity markup with sameAs links",
        score: 15,
      },
    ],
  },
  {
    id: "about-page",
    step: 9,
    category: "entity",
    prompt:
      "Do you have a clear About page stating who you are, what you do, and for whom?",
    options: [
      {
        value: "none",
        label: "No dedicated About page",
        score: 0,
        fix: "Build an About page — entity, offer, and audience in the first paragraph.",
      },
      {
        value: "thin",
        label: "Exists but thin/vague",
        score: 8,
        fix: "Rewrite your About page to state entity, offer, and audience explicitly — no marketing fog.",
      },
      { value: "clear", label: "Clear and specific", score: 15 },
    ],
  },
  {
    id: "citable-content",
    step: 10,
    category: "citations",
    prompt:
      "Do you publish original data, case studies, or specific numbers an engine could cite?",
    hint: "Generic advice gets summarized without attribution. Specific claims with numbers get quoted with a source.",
    options: [
      {
        value: "generic",
        label: "Mostly generic advice, no original data",
        score: 0,
        fix: "Publish one case study or data point per core service — with real, specific numbers.",
      },
      {
        value: "some",
        label: "A few pieces have real numbers",
        score: 8,
        fix: "Expand original data/case content across your top service and industry pages.",
      },
      { value: "yes", label: "Consistently specific and sourced", score: 15 },
    ],
  },
);

export type Bucket = {
  key: string;
  range: [number, number];
  label: string;
  color: string;
  headline: string;
  recommendation: string;
};

export const BUCKETS: Bucket[] = [
  {
    key: "not-ready",
    range: [0, 29],
    label: "Not Readable",
    color: "#c66b3f",
    headline: "Answer engines can't parse or trust this site yet.",
    recommendation:
      "Start with the fundamentals: server-rendered content, Organization schema, and a real llms.txt. Nothing else on this list matters until crawlers can read you.",
  },
  {
    key: "partial",
    range: [30, 54],
    label: "Partially Readable",
    color: "#b8860b",
    headline: "The basics exist but coverage is inconsistent.",
    recommendation:
      "Standardize what you already started — schema on every page, not just some. Inconsistency is why engines pick your competitor's page over yours.",
  },
  {
    key: "optimizing",
    range: [55, 79],
    label: "AEO-Optimizing",
    color: "#3f7a5c",
    headline: "Solid foundation — now it's about citation-worthiness.",
    recommendation:
      "Structure is there. Focus on original data and specific claims engines can quote with confidence — that's what separates 'cited' from 'summarized.'",
  },
  {
    key: "ready",
    range: [80, 100],
    label: "AEO-Ready",
    color: "#1a1a1a",
    headline: "This site is built for how AI actually reads the web.",
    recommendation:
      "You're ahead of most competitors. Keep schema and llms.txt current as pages change, and keep publishing citable, specific content.",
  },
];

export function bucketForScore(score: number): Bucket {
  return (
    BUCKETS.find((b) => score >= b.range[0] && score <= b.range[1]) ??
    BUCKETS[0]
  );
}

export function normalizedScore(raw: number): number {
  return Math.round((raw / MAX_SCORE) * 100);
}

export function computeCategoryScores(
  scores: Record<string, number>,
): Record<Category, number> {
  const out: Record<Category, number> = {
    schema: 0,
    content: 0,
    crawlability: 0,
    entity: 0,
    citations: 0,
  };
  for (const q of QUESTIONS) {
    out[q.category] += scores[q.id] ?? 0;
  }
  return out;
}

/** Returns the fix line for every answered question that wasn't the top pick. */
export function collectFixes(
  answers: Record<string, string>,
): { id: string; category: Category; fix: string }[] {
  const fixes: { id: string; category: Category; fix: string }[] = [];
  for (const q of QUESTIONS) {
    const val = answers[q.id];
    if (!val) continue;
    const opt = q.options.find((o) => o.value === val);
    if (opt?.fix) fixes.push({ id: q.id, category: q.category, fix: opt.fix });
  }
  return fixes;
}

export function weakestCategory(cat: Record<Category, number>): CategoryMeta {
  let weakest = CATEGORIES[0];
  let weakestPct = 1;
  for (const c of CATEGORIES) {
    const pct = (cat[c.key] ?? 0) / c.maxScore;
    if (pct < weakestPct) {
      weakestPct = pct;
      weakest = c;
    }
  }
  return weakest;
}
