/**
 * AI Readiness Score — 10-question diagnostic for service businesses.
 *
 * 4 dimensions × 10 questions, each option weighted 0–10.
 * Sum → 0–100 → bucket (notReady / readyIn30 / shipIn14 / urgent).
 * Per-dimension subscores power the radar chart and "weakest dim" callout.
 * Q5 (manualHours) → calculator `hours` param.
 * Q7 (monthlyLeads) → calculator `leads` param.
 */

export type Dimension = "foundation" | "process" | "demand" | "buyIn";

export type ReadinessOption = {
  label: string;
  /** 0–10 weight added to running score */
  score: number;
  /** machine value persisted in URL / localStorage */
  value: string;
};

export type ReadinessQuestion = {
  id: string;
  /** 1-indexed sequence for progress */
  step: number;
  dimension: Dimension;
  icon: string;
  prompt: string;
  hint?: string;
  options: ReadinessOption[];
};

export const QUESTIONS: ReadinessQuestion[] = [
  // ─────────── Foundation (3) ───────────
  {
    id: "stack",
    step: 1,
    dimension: "foundation",
    icon: "🧱",
    prompt: "What's your current automation stack?",
    hint: "Count what's actually running today, not what's on the roadmap.",
    options: [
      { label: "Nothing automated yet", value: "none", score: 0 },
      { label: "One or two Zapier zaps", value: "zaps", score: 3 },
      { label: "Multiple tools but it's messy", value: "messy", score: 6 },
      { label: "Documented integrated system", value: "system", score: 10 },
    ],
  },
  {
    id: "data",
    step: 2,
    dimension: "foundation",
    icon: "🗂️",
    prompt: "How clean is your customer data?",
    hint: "Where does a new lead actually live within 24 hours of arriving?",
    options: [
      { label: "Spreadsheets everywhere", value: "sheets", score: 0 },
      { label: "CRM but inconsistent", value: "inconsistent", score: 4 },
      { label: "Single source, mostly clean", value: "mostly", score: 7 },
      { label: "Audited regularly", value: "audited", score: 10 },
    ],
  },
  {
    id: "aiUse",
    step: 3,
    dimension: "foundation",
    icon: "🤖",
    prompt: "Does your team use AI tools at all yet?",
    options: [
      { label: "No, not at all", value: "no", score: 0 },
      { label: "Tried ChatGPT once", value: "tried", score: 3 },
      { label: "Use it weekly", value: "weekly", score: 7 },
      { label: "Built it into our workflow", value: "builtIn", score: 10 },
    ],
  },

  // ─────────── Process (3) ───────────
  {
    id: "docs",
    step: 4,
    dimension: "process",
    icon: "📋",
    prompt: "Are your top 3 workflows documented?",
    hint: "Onboarding, lead handoff, delivery. Could a new hire run them on day one?",
    options: [
      { label: "No, nothing written", value: "no", score: 0 },
      { label: "In my head", value: "head", score: 2 },
      { label: "Loose SOP docs", value: "loose", score: 6 },
      { label: "Detailed runbooks", value: "runbooks", score: 10 },
    ],
  },
  {
    id: "manualHours",
    step: 5,
    dimension: "process",
    icon: "🔁",
    prompt:
      "How many hours per week does your team spend on manual repetitive work?",
    hint: "Copy-paste, reminders, status updates, data entry. Real number.",
    options: [
      { label: "Under 5", value: "lt5", score: 2 },
      { label: "5 to 15", value: "5-15", score: 5 },
      { label: "15 to 30", value: "15-30", score: 8 },
      { label: "30 or more", value: "30plus", score: 10 },
    ],
  },
  {
    id: "responseSpeed",
    step: 6,
    dimension: "process",
    icon: "⚡",
    prompt: "How fast can you respond to a new lead right now?",
    options: [
      { label: "Hours to days", value: "slow", score: 1 },
      { label: "Under 1 hour", value: "hour", score: 5 },
      { label: "Under 15 minutes", value: "fast", score: 8 },
      { label: "Instant", value: "instant", score: 10 },
    ],
  },

  // ─────────── Demand (2) ───────────
  {
    id: "monthlyLeads",
    step: 7,
    dimension: "demand",
    icon: "📥",
    prompt: "Monthly inbound leads or inquiries?",
    hint: "Forms, DMs, referrals, repeat asks. All channels.",
    options: [
      { label: "Under 50", value: "lt50", score: 2 },
      { label: "50 to 200", value: "50-200", score: 6 },
      { label: "200 to 500", value: "200-500", score: 9 },
      { label: "500 or more", value: "500plus", score: 10 },
    ],
  },
  {
    id: "responseRate",
    step: 8,
    dimension: "demand",
    icon: "📞",
    prompt: "What percent of leads do you respond to within 24 hours?",
    hint: "Real number. Not the one you wish were true.",
    options: [
      { label: "Under 50%", value: "lt50", score: 2 },
      { label: "50 to 75%", value: "50-75", score: 5 },
      { label: "75 to 90%", value: "75-90", score: 7 },
      { label: "Over 90%", value: "gt90", score: 10 },
    ],
  },

  // ─────────── Buy-in (2) ───────────
  {
    id: "budget",
    step: 9,
    dimension: "buyIn",
    icon: "💰",
    prompt: "Budget range for your first automation build?",
    hint: "Total project, not monthly retainer.",
    options: [
      { label: "Under $1k", value: "lt1k", score: 1 },
      { label: "$1k to $5k", value: "1-5k", score: 5 },
      { label: "$5k to $15k", value: "5-15k", score: 8 },
      { label: "$15k or more", value: "15kplus", score: 10 },
    ],
  },
  {
    id: "decision",
    step: 10,
    dimension: "buyIn",
    icon: "🗝️",
    prompt: "Who owns the go / no-go on tools?",
    options: [
      { label: "Need a committee", value: "committee", score: 1 },
      { label: "Need a partner's sign-off", value: "partner", score: 4 },
      { label: "Just me but I'm busy", value: "meBusy", score: 7 },
      { label: "Just me, ready to move", value: "meReady", score: 10 },
    ],
  },
];

export const TOTAL_QUESTIONS = QUESTIONS.length;
export const MAX_SCORE = QUESTIONS.reduce(
  (acc, q) => acc + Math.max(...q.options.map((o) => o.score)),
  0,
);

/* ───────────────────── Dimension metadata ───────────────────── */

export type DimensionMeta = {
  key: Dimension;
  label: string;
  short: string;
  /** count of questions in this dim — used to normalize subscores */
  questionCount: number;
  /** max raw subscore = questionCount × 10 */
  maxScore: number;
};

export const DIMENSIONS: DimensionMeta[] = [
  {
    key: "foundation",
    label: "Foundation",
    short: "Tools, data, AI literacy",
    questionCount: 3,
    maxScore: 30,
  },
  {
    key: "process",
    label: "Process",
    short: "Docs, manual hours, response speed",
    questionCount: 3,
    maxScore: 30,
  },
  {
    key: "demand",
    label: "Demand",
    short: "Lead volume, response pressure",
    questionCount: 2,
    maxScore: 20,
  },
  {
    key: "buyIn",
    label: "Buy-in",
    short: "Budget, decision power",
    questionCount: 2,
    maxScore: 20,
  },
];

/**
 * Compute subscores per dimension from a scores map (id → 0–10).
 * Returned values are the RAW sums (not normalized).
 */
export function computeSubscores(
  scores: Record<string, number>,
): Record<Dimension, number> {
  const subs: Record<Dimension, number> = {
    foundation: 0,
    process: 0,
    demand: 0,
    buyIn: 0,
  };
  for (const q of QUESTIONS) {
    const s = scores[q.id];
    if (typeof s === "number") subs[q.dimension] += s;
  }
  return subs;
}

/**
 * Return the lowest-scoring dimension, normalized to 0–1.
 * Used to pick the "fix this first" callout.
 */
export function weakestDimension(
  subs: Record<Dimension, number>,
): DimensionMeta {
  let weakest = DIMENSIONS[0];
  let weakestPct = 1.1;
  for (const dim of DIMENSIONS) {
    const pct = subs[dim.key] / dim.maxScore;
    if (pct < weakestPct) {
      weakestPct = pct;
      weakest = dim;
    }
  }
  return weakest;
}

/* ───────────────────── Bucket logic ───────────────────── */

export type BucketKey = "notReady" | "readyIn30" | "shipIn14" | "urgent";

export type Bucket = {
  key: BucketKey;
  label: string;
  /** hex color — also used in dimension overlay */
  color: string;
  range: [number, number];
  headline: string;
  recommendation: string;
  /** 3 generic bullets (one gets replaced by weakest-dim callout at render) */
  bullets: string[];
};

export const BUCKETS: Bucket[] = [
  {
    key: "notReady",
    label: "Not ready yet",
    color: "#f97316",
    range: [0, 30],
    headline: "Foundation work first. Automation now would amplify chaos.",
    recommendation:
      "Before any AI build, lock the basics. Otherwise you'll automate the wrong thing and pay twice.",
    bullets: [
      "Pick one CRM, move every lead into it this month. Kill the spreadsheet.",
      "Document your top three workflows as plain-English runbooks before any tool decisions.",
      "Get the team using ChatGPT weekly for low-stakes tasks. Build the muscle before the system.",
    ],
  },
  {
    key: "readyIn30",
    label: "Ready in 30 days",
    color: "#eab308",
    range: [31, 55],
    headline: "You can ship one high-ROI flow this month. Just one.",
    recommendation:
      "You have enough foundation to win a single automation. Pick the bottleneck that bleeds the most and build only that.",
    bullets: [
      "Pick the ONE workflow that eats the most manual hours. Build that first, ignore the rest.",
      "Wire your highest-friction handoff (lead → CRM, or quote → contract) as the first automation.",
      "Set a 30-day kill switch. If the flow doesn't save 5+ hours a week by day 30, scrap it and try the next.",
    ],
  },
  {
    key: "shipIn14",
    label: "Ship in 14 days",
    color: "#06b6d4",
    range: [56, 80],
    headline: "Your foundation is solid. We can scope and ship in 2 weeks.",
    recommendation:
      "Book a strategy call. We map the build this week, scope it Friday, ship the first flow by end of week 2.",
    bullets: [
      "Bring your top 3 workflow runbooks to the call. We pick the highest-ROI one in 20 minutes.",
      "Plan for n8n + your existing CRM, no platform migration needed. Build on what works.",
      "Budget for one focused build, not a platform overhaul. Ship narrow, expand after the first win.",
    ],
  },
  {
    key: "urgent",
    label: "You should have called yesterday",
    color: "#10b981",
    range: [81, 100],
    headline: "You're losing money every week you delay. Priority slot.",
    recommendation:
      "Volume, demand, budget, decision power — all green. The cost of waiting is bigger than the cost of building.",
    bullets: [
      "Lock a slot this week. Scope Monday, kickoff Wednesday, first flow shipped end of week 2.",
      "Run AI receptionist + lead-routing as the first build. Highest leverage for your volume tier.",
      "Plan three flows in 90 days, not one. Your foundation can absorb the parallel build.",
    ],
  },
];

export function bucketForScore(score: number): Bucket {
  const found = BUCKETS.find((b) => score >= b.range[0] && score <= b.range[1]);
  return found ?? BUCKETS[BUCKETS.length - 1];
}

/* ───────────── Calculator pre-fill mapping ───────────── */

/** Q7 (monthly leads) → calculator `leads` param midpoint. */
export const LEADS_MIDPOINT: Record<string, number> = {
  lt50: 30,
  "50-200": 125,
  "200-500": 350,
  "500plus": 750,
};

/** Q5 (manual hours/week) → calculator `hours` param midpoint. */
export const HOURS_MIDPOINT: Record<string, number> = {
  lt5: 3,
  "5-15": 10,
  "15-30": 22,
  "30plus": 35,
};

/** Build /tools/revenue-calculator query string from quiz answers. */
export function buildCalculatorParams(answers: Record<string, string>): string {
  const params = new URLSearchParams();
  const leads = LEADS_MIDPOINT[answers.monthlyLeads ?? ""] ?? 100;
  const hours = HOURS_MIDPOINT[answers.manualHours ?? ""] ?? 10;
  params.set("leads", String(leads));
  params.set("hours", String(hours));
  params.set("source", "ai-readiness");
  return params.toString();
}

/* ───────────── Calendly prefill mapping ───────────── */

/**
 * Build query params for the strategy-call URL. Calendly silently drops
 * arbitrary params (score/bucket/weakest/dims), but passes UTM params
 * through to the booking payload — so the context rides in utm_content.
 */
export function buildBookingParams(opts: {
  score: number;
  bucket: BucketKey;
}): string {
  const params = new URLSearchParams();
  params.set("utm_source", "ai-readiness");
  params.set("utm_content", `score-${opts.score}-${opts.bucket}`);
  return params.toString();
}
