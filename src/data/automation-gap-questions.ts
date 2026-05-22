/**
 * Automation Gap Analyzer — 12-question diagnostic across 4 axes.
 *
 * Each axis has 3 questions, each option weighted 0-10.
 * Total raw score sums to 0-120, normalized to 0-100 = "Automation Gap %"
 * (100 = fully automated, 0 = full manual chaos).
 *
 * Per-axis subscores drive a 4-axis radar + the "biggest leak" callout.
 * Implied manual hours (computed from axis weakness) → Revenue Calculator prefill.
 */

export type Axis = "leadCapture" | "followUp" | "reporting" | "teamProductivity";

export type GapOption = {
  label: string;
  /** 0-10 weight; higher = more automated */
  score: number;
  value: string;
};

export type GapQuestion = {
  id: string;
  step: number;
  axis: Axis;
  icon: string;
  prompt: string;
  hint?: string;
  options: GapOption[];
};

export const QUESTIONS: GapQuestion[] = [
  /* ────────── Lead Capture (3) ────────── */
  {
    id: "lc1",
    step: 1,
    axis: "leadCapture",
    icon: "📥",
    prompt: "How does a new lead reach your team right now?",
    hint: "The most common path. Not the rare one.",
    options: [
      { label: "Phone or walk-in only", value: "phone", score: 0 },
      { label: "Email or social DMs", value: "email", score: 3 },
      { label: "Web form to inbox", value: "form", score: 6 },
      { label: "Form → CRM auto-created", value: "crm", score: 10 },
    ],
  },
  {
    id: "lc2",
    step: 2,
    axis: "leadCapture",
    icon: "⏱️",
    prompt: "How fast does a new lead get a first acknowledgement?",
    options: [
      { label: "Days, sometimes never", value: "days", score: 0 },
      { label: "Within a business day", value: "day", score: 4 },
      { label: "Under an hour", value: "hour", score: 7 },
      { label: "Instant auto-reply", value: "instant", score: 10 },
    ],
  },
  {
    id: "lc3",
    step: 3,
    axis: "leadCapture",
    icon: "🧲",
    prompt: "Where do off-hours and weekend leads go?",
    options: [
      { label: "Voicemail purgatory", value: "voicemail", score: 0 },
      { label: "Email that waits till Monday", value: "wait", score: 3 },
      { label: "On-call human bounces it", value: "human", score: 6 },
      { label: "AI receptionist handles it", value: "ai", score: 10 },
    ],
  },

  /* ────────── Follow-Up (3) ────────── */
  {
    id: "fu1",
    step: 4,
    axis: "followUp",
    icon: "📨",
    prompt: "After first contact, who chases the lead until they decide?",
    options: [
      { label: "Nobody, hope they reply", value: "nobody", score: 0 },
      { label: "Sales rep when they remember", value: "rep", score: 3 },
      { label: "Manual template emails", value: "manual", score: 6 },
      { label: "Automated multi-touch sequence", value: "auto", score: 10 },
    ],
  },
  {
    id: "fu2",
    step: 5,
    axis: "followUp",
    icon: "🔁",
    prompt: "How many follow-ups does a typical lead get before you give up?",
    hint: "Be honest. Most teams stop at 1-2 when 5-7 is the curve.",
    options: [
      { label: "0 or 1", value: "0-1", score: 0 },
      { label: "2 to 3", value: "2-3", score: 4 },
      { label: "4 to 6", value: "4-6", score: 7 },
      { label: "7 or more (sequenced)", value: "7plus", score: 10 },
    ],
  },
  {
    id: "fu3",
    step: 6,
    axis: "followUp",
    icon: "💬",
    prompt: "Are follow-ups personalized to what the lead actually said?",
    options: [
      { label: "Generic blast or none", value: "none", score: 0 },
      { label: "Same template every time", value: "template", score: 3 },
      { label: "Rep tweaks manually", value: "tweak", score: 6 },
      { label: "AI personalizes per lead", value: "ai", score: 10 },
    ],
  },

  /* ────────── Reporting (3) ────────── */
  {
    id: "rp1",
    step: 7,
    axis: "reporting",
    icon: "📊",
    prompt: "How do you currently know what last week's revenue looked like?",
    options: [
      { label: "Ask the bookkeeper", value: "ask", score: 0 },
      { label: "Pull a CSV every Monday", value: "csv", score: 3 },
      { label: "Spreadsheet dashboard", value: "sheet", score: 6 },
      { label: "Live dashboard, auto-refreshed", value: "live", score: 10 },
    ],
  },
  {
    id: "rp2",
    step: 8,
    axis: "reporting",
    icon: "🎯",
    prompt: "Can you see your conversion rate per channel without asking someone?",
    options: [
      { label: "No, I have no idea", value: "no", score: 0 },
      { label: "Only at month-end", value: "monthly", score: 4 },
      { label: "Weekly, manual report", value: "weekly", score: 7 },
      { label: "Live dashboard per channel", value: "live", score: 10 },
    ],
  },
  {
    id: "rp3",
    step: 9,
    axis: "reporting",
    icon: "🚨",
    prompt: "How do you find out when something is broken in the funnel?",
    options: [
      { label: "A customer complains", value: "complaint", score: 0 },
      { label: "I notice eventually", value: "eventually", score: 3 },
      { label: "Weekly review catches it", value: "review", score: 6 },
      { label: "Automated alerts fire", value: "alerts", score: 10 },
    ],
  },

  /* ────────── Team Productivity (3) ────────── */
  {
    id: "tp1",
    step: 10,
    axis: "teamProductivity",
    icon: "📝",
    prompt: "How does your team take meeting notes and action items?",
    options: [
      { label: "Memory and napkins", value: "memory", score: 0 },
      { label: "Manual notes in Notion or Docs", value: "manual", score: 4 },
      { label: "Record + transcribe manually", value: "record", score: 7 },
      { label: "AI auto-transcribes + actions", value: "ai", score: 10 },
    ],
  },
  {
    id: "tp2",
    step: 11,
    axis: "teamProductivity",
    icon: "🔄",
    prompt: "How does work hand off between roles (e.g. sales → ops → delivery)?",
    options: [
      { label: "Slack messages and luck", value: "slack", score: 0 },
      { label: "Email + spreadsheets", value: "email", score: 3 },
      { label: "Project tool with manual updates", value: "tool", score: 6 },
      { label: "Auto-triggered task chains", value: "auto", score: 10 },
    ],
  },
  {
    id: "tp3",
    step: 12,
    axis: "teamProductivity",
    icon: "🧾",
    prompt: "How does data move between your tools (CRM, accounting, calendar, billing)?",
    options: [
      { label: "Copy-paste manually", value: "copy", score: 0 },
      { label: "CSV exports occasionally", value: "csv", score: 3 },
      { label: "1-2 Zaps wired up", value: "zaps", score: 6 },
      { label: "Fully integrated stack", value: "integrated", score: 10 },
    ],
  },
];

export const TOTAL_QUESTIONS = QUESTIONS.length;
export const MAX_RAW_SCORE = QUESTIONS.length * 10; // 120
export const MAX_SCORE = 100;

/* ────────── Axis metadata ────────── */

export type AxisMeta = {
  key: Axis;
  label: string;
  short: string;
  questionCount: number;
  maxScore: number;
  /** Specific recommendations (2-3) when this axis is weakest */
  recommendations: string[];
  /** Implied manual hours/week leaking when this axis is weak */
  impliedManualHoursWhenWeak: number;
};

export const AXES: AxisMeta[] = [
  {
    key: "leadCapture",
    label: "Lead Capture",
    short: "How leads arrive and get acknowledged",
    questionCount: 3,
    maxScore: 30,
    recommendations: [
      "Wire a web form straight into your CRM. Stop letting email inboxes act as a database.",
      "Add an instant auto-reply with a calendar link. Five-minute response wins over thirty-minute.",
      "Stand up an AI receptionist for off-hours. Every weekend lead that hits voicemail is a lost client.",
    ],
    impliedManualHoursWhenWeak: 8,
  },
  {
    key: "followUp",
    label: "Follow-Up",
    short: "Multi-touch persistence after first contact",
    questionCount: 3,
    maxScore: 30,
    recommendations: [
      "Build a 7-touch follow-up sequence. Most deals close on touch 5-7, not 1-2.",
      "Personalize touches with AI based on the lead's first message. Generic blasts get ignored.",
      "Track who opens and clicks. Stop chasing dead leads, double down on warm ones.",
    ],
    impliedManualHoursWhenWeak: 12,
  },
  {
    key: "reporting",
    label: "Reporting",
    short: "Live visibility into pipeline and breakage",
    questionCount: 3,
    maxScore: 30,
    recommendations: [
      "Build a live dashboard for last 7 days revenue, lead volume, conversion by channel.",
      "Set up automated alerts when conversion drops 20%+ week-over-week.",
      "Replace your Monday-morning CSV pull with an auto-refreshed view your team can read anytime.",
    ],
    impliedManualHoursWhenWeak: 6,
  },
  {
    key: "teamProductivity",
    label: "Team Productivity",
    short: "Hand-offs, notes, and tool-to-tool data flow",
    questionCount: 3,
    maxScore: 30,
    recommendations: [
      "Kill copy-paste between CRM, calendar, and billing. Wire them with n8n or Make.",
      "Add AI meeting transcription with auto-extracted action items into your task tool.",
      "Trigger downstream tasks the moment a deal closes — no more manual handoff Slack messages.",
    ],
    impliedManualHoursWhenWeak: 10,
  },
];

/* ────────── Scoring ────────── */

export function computeSubscores(
  scores: Record<string, number>
): Record<Axis, number> {
  const subs: Record<Axis, number> = {
    leadCapture: 0,
    followUp: 0,
    reporting: 0,
    teamProductivity: 0,
  };
  for (const q of QUESTIONS) {
    const s = scores[q.id];
    if (typeof s === "number") subs[q.axis] += s;
  }
  return subs;
}

/** Raw total → 0-100 automation %. */
export function normalizedScore(rawTotal: number): number {
  return Math.round((rawTotal / MAX_RAW_SCORE) * 100);
}

export function weakestAxis(
  subs: Record<Axis, number>
): AxisMeta {
  let weakest = AXES[0];
  let weakestPct = 1.1;
  for (const ax of AXES) {
    const pct = subs[ax.key] / ax.maxScore;
    if (pct < weakestPct) {
      weakestPct = pct;
      weakest = ax;
    }
  }
  return weakest;
}

/** Sum implied manual hours/week across axes scoring below 50%. */
export function impliedManualHours(subs: Record<Axis, number>): number {
  let total = 0;
  for (const ax of AXES) {
    const pct = subs[ax.key] / ax.maxScore;
    if (pct < 0.5) total += ax.impliedManualHoursWhenWeak;
  }
  return Math.max(total, 4);
}

/* ────────── Buckets ────────── */

export type BucketKey = "chaos" | "patchwork" | "running" | "automated";

export type Bucket = {
  key: BucketKey;
  label: string;
  color: string;
  range: [number, number];
  headline: string;
  recommendation: string;
};

export const BUCKETS: Bucket[] = [
  {
    key: "chaos",
    label: "Full manual chaos",
    color: "#f97316",
    range: [0, 30],
    headline: "Almost nothing is automated. Every lead is a tax on your time.",
    recommendation:
      "Pick one axis and fix it this month. Lead Capture is usually the highest-leverage first move because every other axis depends on clean intake.",
  },
  {
    key: "patchwork",
    label: "Patchwork",
    color: "#eab308",
    range: [31, 55],
    headline: "Some duct tape, mostly held together by people.",
    recommendation:
      "You have islands of automation that don't talk to each other. Wire the gaps before adding new tools — the integration layer is where the hours come back.",
  },
  {
    key: "running",
    label: "Running",
    color: "#06b6d4",
    range: [56, 80],
    headline: "Solid base. One or two flows away from leverage.",
    recommendation:
      "You're past the 'do we need this' question. Add one heavy flow (AI follow-up or live dashboarding) and the productivity curve compounds.",
  },
  {
    key: "automated",
    label: "Mostly automated",
    color: "#10b981",
    range: [81, 100],
    headline: "Lean operation. The remaining gaps are edge cases worth scoping.",
    recommendation:
      "You're in the top 10% of service businesses. The last 20% is custom — AI agents, multi-system orchestration, or operator-grade dashboards.",
  },
];

export function bucketForScore(score: number): Bucket {
  const found = BUCKETS.find(
    (b) => score >= b.range[0] && score <= b.range[1]
  );
  return found ?? BUCKETS[BUCKETS.length - 1];
}

/* ────────── URL pre-fill helpers ────────── */

export function buildCalculatorParams(
  subs: Record<Axis, number>
): string {
  const params = new URLSearchParams();
  const hours = impliedManualHours(subs);
  params.set("hours", String(hours));
  params.set("leads", "100");
  params.set("source", "automation-gap");
  return params.toString();
}

export function buildBookingParams(opts: {
  score: number;
  bucket: BucketKey;
  weakestAxis: Axis;
  subs: Record<Axis, number>;
}): string {
  const params = new URLSearchParams();
  params.set("score", String(opts.score));
  params.set("bucket", opts.bucket);
  params.set("weakest", opts.weakestAxis);
  const pains = AXES.map((a) => `${a.key}:${opts.subs[a.key]}`).join(",");
  params.set("axes", pains);
  params.set("source", "automation-gap");
  return params.toString();
}
