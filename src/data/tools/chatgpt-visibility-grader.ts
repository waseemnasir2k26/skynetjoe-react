/**
 * ChatGPT Visibility Grader — heuristic questionnaire data + scoring.
 *
 * Self-reported, not a live lookup. LLMs can't be queried live for "does
 * ChatGPT know my brand" in a client-side tool, so this scores the inputs
 * that correlate with LLM training-data and retrieval visibility: third
 * party coverage, structured citations, consistent identity, and expert
 * content depth. No claim is made about actual model recall.
 */

export type Category = "coverage" | "structure" | "identity" | "authority";

export type CategoryMeta = {
  key: Category;
  label: string;
  short: string;
  maxScore: number;
};

export const CATEGORIES: CategoryMeta[] = [
  {
    key: "coverage",
    label: "Third-Party Coverage",
    short: "Mentions on sites LLMs are trained on or retrieve from.",
    maxScore: 25,
  },
  {
    key: "structure",
    label: "Structured Citations",
    short: "Schema, llms.txt, and machine-readable facts about your brand.",
    maxScore: 25,
  },
  {
    key: "identity",
    label: "Consistent Identity",
    short: "Same name, description, and facts everywhere you appear.",
    maxScore: 25,
  },
  {
    key: "authority",
    label: "Expert Content Depth",
    short: "Original, specific content worth referencing over a competitor.",
    maxScore: 25,
  },
];

export const MAX_SCORE = CATEGORIES.reduce((s, c) => s + c.maxScore, 0);

export type Option = {
  value: string;
  label: string;
  score: number;
  move?: string;
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
    id: "press-coverage",
    step: 1,
    category: "coverage",
    prompt:
      "Has your brand been covered by press, podcasts, or established industry publications?",
    options: [
      {
        value: "none",
        label: "No third-party coverage",
        score: 0,
        move: "Pitch 2-3 relevant podcasts or trade publications for a feature or interview.",
      },
      {
        value: "one-two",
        label: "A mention or two",
        score: 8,
        move: "Turn one existing mention into 3-4 more via guest posts or podcast swaps.",
      },
      {
        value: "several",
        label: "Several pieces of coverage",
        score: 17,
        move: "Keep a steady cadence — one new piece of coverage per quarter compounds.",
      },
      { value: "regular", label: "Regular, ongoing coverage", score: 25 },
    ],
  },
  {
    id: "wikipedia-directory",
    step: 2,
    category: "coverage",
    prompt:
      "Are you listed on any high-authority directories, review sites, or reference platforms relevant to your niche?",
    hint: "Think G2, Clutch, industry association directories — not Wikipedia specifically unless you qualify.",
    options: [
      {
        value: "none",
        label: "Not listed anywhere",
        score: 0,
        move: "Claim your listing on 2-3 directories relevant to your category.",
      },
      {
        value: "few",
        label: "One or two listings",
        score: 6,
        move: "Fill out those listings completely — half-empty profiles carry less signal.",
      },
      { value: "several", label: "Multiple complete listings", score: 12 },
    ],
  },
  {
    id: "schema-facts",
    step: 3,
    category: "structure",
    prompt:
      "Does your site expose machine-readable facts about your business (schema, structured data)?",
    options: [
      {
        value: "none",
        label: "No structured data",
        score: 0,
        move: "Add Organization schema with your core facts — what you do, who for, since when.",
      },
      {
        value: "basic",
        label: "Basic name/logo only",
        score: 8,
        move: "Expand schema to include offers, service areas, and sameAs social links.",
      },
      { value: "detailed", label: "Detailed, current schema", score: 17 },
    ],
  },
  {
    id: "llms-txt-visibility",
    step: 4,
    category: "structure",
    prompt:
      "Do you have an llms.txt file that summarizes what your site/business actually is?",
    options: [
      {
        value: "no",
        label: "No",
        score: 0,
        move: "Generate an llms.txt — it's the clearest single signal you can give an AI crawler.",
      },
      { value: "yes", label: "Yes", score: 8 },
    ],
  },
  {
    id: "faq-answers",
    step: 5,
    category: "structure",
    prompt:
      "Do you publish direct answers to questions people would actually ask an AI about your category?",
    hint: '"What does X cost", "Is X worth it", "X vs Y" — the kind of query that triggers an AI answer, not a search results page.',
    options: [
      {
        value: "no",
        label: "No, mostly generic marketing copy",
        score: 0,
        move: "Write direct-answer content for the 5 questions your prospects actually ask.",
      },
      {
        value: "some",
        label: "A few pieces",
        score: 5,
        move: "Expand direct-answer content to cover comparison and pricing questions specifically.",
      },
      { value: "yes", label: "Yes, systematically", score: 8 },
    ],
  },
  {
    id: "consistent-naming",
    step: 6,
    category: "identity",
    prompt:
      "Is your brand name, tagline, and core description consistent across your website, socials, and directory listings?",
    options: [
      {
        value: "no",
        label: "Different wording in different places",
        score: 0,
        move: "Write one canonical description and paste it everywhere — LinkedIn, directories, About page.",
      },
      {
        value: "mostly",
        label: "Mostly consistent, some drift",
        score: 12,
        move: "Audit your last 5 external listings for wording drift and align them.",
      },
      { value: "yes", label: "Fully consistent everywhere", score: 25 },
    ],
  },
  {
    id: "founder-identity",
    step: 7,
    category: "identity",
    prompt:
      "Is there a clear, named person (founder/expert) associated with the brand across platforms?",
    hint: "AI systems weight named-expert content differently than anonymous brand copy.",
    options: [
      {
        value: "anonymous",
        label: "Brand is anonymous / no named person",
        score: 0,
        move: "Attach a real name and bio to your content — About page, LinkedIn, bylines.",
      },
      {
        value: "partial",
        label: "Named but inconsistent bio/credentials",
        score: 6,
        move: "Standardize your bio and credentials across every platform you publish on.",
      },
      { value: "clear", label: "Clear, consistent named identity", score: 12 },
    ],
  },
  {
    id: "original-data",
    step: 8,
    category: "authority",
    prompt:
      "Do you publish original research, data, or case studies with specific numbers?",
    options: [
      {
        value: "no",
        label: "No, mostly commentary or general advice",
        score: 0,
        move: "Publish one original data point or case study with real, specific numbers.",
      },
      {
        value: "some",
        label: "A few original pieces",
        score: 10,
        move: "Publish original data at least quarterly — recency matters for retrieval.",
      },
      { value: "regular", label: "Regularly, with real numbers", score: 20 },
    ],
  },
  {
    id: "depth-vs-competitors",
    step: 9,
    category: "authority",
    prompt:
      "Compared to your top 3 competitors, is your content noticeably more specific and detailed?",
    options: [
      {
        value: "less",
        label: "Ours is thinner / more generic",
        score: 0,
        move: "Pick your highest-intent page and rewrite it 2x deeper than your best competitor's version.",
      },
      {
        value: "similar",
        label: "About the same",
        score: 3,
        move: "Differentiate at least one flagship page with specificity competitors don't have.",
      },
      { value: "more", label: "Ours is more specific and useful", score: 5 },
    ],
  },
];

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
    key: "invisible",
    range: [0, 24],
    label: "Effectively Invisible",
    color: "#c66b3f",
    headline: "Little to no signal an AI system could pick up on.",
    recommendation:
      "Start with identity: one consistent name, description, and bio across every platform. Then add structured data. Coverage and authority mean nothing if your identity isn't consistent yet.",
  },
  {
    key: "faint",
    range: [25, 49],
    label: "Faint Signal",
    color: "#b8860b",
    headline: "Some pieces exist but they're not reinforcing each other.",
    recommendation:
      "You have fragments — a listing here, a schema block there. Tie them together with consistent naming and one round of structured data across your whole site.",
  },
  {
    key: "emerging",
    range: [50, 74],
    label: "Emerging Visibility",
    color: "#3f7a5c",
    headline: "A real, if inconsistent, footprint an AI system could surface.",
    recommendation:
      "Foundation is solid. Focus now on original, specific content and third-party coverage — that's what pushes you from 'sometimes mentioned' to 'reliably cited.'",
  },
  {
    key: "strong",
    range: [75, 100],
    label: "Strong Visibility",
    color: "#1a1a1a",
    headline: "Consistent identity, structure, and authority signals.",
    recommendation:
      "Keep it current. Structured data and llms.txt need refreshing as your business changes, and one new piece of original content per quarter keeps the authority signal alive.",
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
    coverage: 0,
    structure: 0,
    identity: 0,
    authority: 0,
  };
  for (const q of QUESTIONS) out[q.category] += scores[q.id] ?? 0;
  return out;
}

export function collectRoadmap(
  answers: Record<string, string>,
): { id: string; category: Category; move: string }[] {
  const moves: { id: string; category: Category; move: string }[] = [];
  for (const q of QUESTIONS) {
    const val = answers[q.id];
    if (!val) continue;
    const opt = q.options.find((o) => o.value === val);
    if (opt?.move)
      moves.push({ id: q.id, category: q.category, move: opt.move });
  }
  return moves;
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
