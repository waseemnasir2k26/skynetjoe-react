/**
 * Agency Stress Quiz — question bank, scoring, bucket logic, calculator mapping.
 *
 * 7 questions, each option carries a 0–10 "stress score" weight.
 * Sum across 7 Qs → 0–70 → bucket (chill/manageable/bleeding/chaos).
 * Q1 (leads/mo) and Q4 (manual hours) carry bucket midpoints that we map into
 * URL params on the revenue-calculator route at quiz exit.
 *
 * Mapping contract (locked with parallel agent building /tools/revenue-calculator):
 *   leads        → Q1 midpoint (monthly inbound)
 *   manualHours  → Q4 midpoint (weekly follow-up hours)
 *   missedRate   → derived from Q2 (response rate inverse)
 *   deal         → derived from Q7 revenue band
 *   closeRate    → static sensible default (0.20)
 *   hourlyValue  → static sensible default (75)
 */

export type QuizOption = {
  /** option label rendered to user */
  label: string;
  /** stress weight 0–10 added to running score */
  score: number;
  /** machine value persisted in URL/localStorage */
  value: string;
};

export type QuizQuestion = {
  id: string;
  /** sequence index 1–7 for progress display */
  step: number;
  /** emoji-as-icon, no library cost */
  icon: string;
  /** question copy */
  prompt: string;
  /** brief context line under prompt (optional) */
  hint?: string;
  options: QuizOption[];
};

export const QUIZ: QuizQuestion[] = [
  {
    id: "leads",
    step: 1,
    icon: "📥",
    prompt: "How many leads or inquiries do you get per month?",
    hint: "Count every form fill, DM, referral, repeat ask. Be honest, not aspirational.",
    options: [
      { label: "Under 50", value: "lt50", score: 8 },
      { label: "50 to 200", value: "50-200", score: 4 },
      { label: "200 to 500", value: "200-500", score: 2 },
      { label: "500 or more", value: "500plus", score: 1 },
    ],
  },
  {
    id: "responseRate",
    step: 2,
    icon: "⏱️",
    prompt: "What percent do you actually respond to within 24 hours?",
    hint: "Real number. Not the one you tell yourself on Sunday night.",
    options: [
      { label: "Over 80%", value: "gt80", score: 0 },
      { label: "50 to 80%", value: "50-80", score: 4 },
      { label: "20 to 50%", value: "20-50", score: 7 },
      { label: "Under 20%", value: "lt20", score: 10 },
    ],
  },
  {
    id: "afterHours",
    step: 3,
    icon: "🌙",
    prompt: "How are you handling after-hours calls right now?",
    options: [
      { label: "Answering service or trained VA", value: "service", score: 1 },
      { label: "Voicemail abyss", value: "voicemail", score: 7 },
      { label: "I pick up at 11pm", value: "founder11pm", score: 9 },
      { label: "Nothing. They go dark.", value: "nothing", score: 10 },
    ],
  },
  {
    id: "manualHours",
    step: 4,
    icon: "🔁",
    prompt: "How many hours per week do YOU personally spend on manual follow-ups?",
    hint: "Replies, reminders, no-show chasing, status updates.",
    options: [
      { label: "Under 5", value: "lt5", score: 1 },
      { label: "5 to 15", value: "5-15", score: 4 },
      { label: "15 to 30", value: "15-30", score: 7 },
      { label: "30 or more", value: "30plus", score: 10 },
    ],
  },
  {
    id: "stackSize",
    step: 5,
    icon: "🧰",
    prompt: "How many tools are in your current stack?",
    hint: "CRM, scheduler, SMS, email, ads, finance, helpdesk, analytics. All of them.",
    options: [
      { label: "1 to 3", value: "1-3", score: 2 },
      { label: "4 to 7", value: "4-7", score: 4 },
      { label: "8 to 15", value: "8-15", score: 7 },
      { label: "I've lost count", value: "lost", score: 10 },
    ],
  },
  {
    id: "breakage",
    step: 6,
    icon: "🛠️",
    prompt: "When something breaks, who fixes it?",
    options: [
      { label: "We have a process", value: "process", score: 1 },
      { label: "I do, every time", value: "founder", score: 6 },
      { label: "It just stays broken", value: "broken", score: 9 },
      { label: "What's broken?", value: "unknown", score: 10 },
    ],
  },
  {
    id: "revenue",
    step: 7,
    icon: "💰",
    prompt: "What's your current monthly revenue?",
    hint: "Used to scope the problem. Stays on your device.",
    options: [
      { label: "Under $10k", value: "lt10k", score: 7 },
      { label: "$10k to $30k", value: "10-30k", score: 5 },
      { label: "$30k to $100k", value: "30-100k", score: 3 },
      { label: "$100k or more", value: "100kplus", score: 2 },
    ],
  },
];

export const MAX_SCORE = QUIZ.reduce(
  (acc, q) => acc + Math.max(...q.options.map((o) => o.score)),
  0
);

/* ───────────────────── Bucket logic ───────────────────── */

export type BucketKey = "chill" | "manageable" | "bleeding" | "chaos";

export type Bucket = {
  key: BucketKey;
  label: string;
  /** brand color token (used in inline style + class for variant) */
  color: string;
  /** scale 0–70 inclusive bounds */
  range: [number, number];
  /** Waseem-voice diagnosis */
  headline: string;
  snapshot: string[];
  priorities: string[];
};

export const BUCKETS: Bucket[] = [
  {
    key: "chill",
    label: "Chill operator",
    color: "#22c55e",
    range: [0, 15],
    headline: "You're running clean. Most operators only dream of this seat.",
    snapshot: [
      "Your inbound is small enough that you can still touch every lead personally.",
      "Process exists or breakages get caught early. The wheels are not on fire.",
      "Biggest risk: complacency. Growth will break the seams you haven't seen yet.",
    ],
    priorities: [
      "Stress-test the funnel at 3x today's lead volume. Find the first crack now.",
      "Document the manual steps you do on autopilot. Future-you will thank you.",
      "Wire one async win like WhatsApp auto-reply. Free 3 hours a week with zero risk.",
    ],
  },
  {
    key: "manageable",
    label: "Manageable burn",
    color: "#eab308",
    range: [16, 30],
    headline: "You're keeping the lights on. But you're also the wick.",
    snapshot: [
      "Volume is real, response is uneven, and you're the bottleneck on the late ones.",
      "Tools exist but they don't talk. Every Monday you patch what Friday broke.",
      "The cost is hidden in lost weekends, not lost revenue. Yet.",
    ],
    priorities: [
      "Connect lead source → CRM → first-touch SMS in 60 seconds. End the lag.",
      "Move after-hours to a trained answering service or AI receptionist. Reclaim sleep.",
      "Audit the stack. Cut 2 tools. Make the remaining 5 fire one workflow.",
    ],
  },
  {
    key: "bleeding",
    label: "Bleeding cash + sleep",
    color: "#f97316",
    range: [31, 50],
    headline: "Your business is losing money on multiple fronts. It's fixable.",
    snapshot: [
      "You're losing leads to slow response, sleep to after-hours, and cash to manual work.",
      "Your stack is bloated and your patches are temporary. Every fix opens a new bug.",
      "You're not lazy. You're just doing the work of 3 hires with no automation behind you.",
    ],
    priorities: [
      "Stop the lead bleed first. 5-minute response window beats any other lever.",
      "Replace 10+ hours of weekly manual follow-up with n8n + WhatsApp template flows.",
      "Set one human-or-AI to own breakages. Stop being the single point of failure.",
    ],
  },
  {
    key: "chaos",
    label: "Full chaos mode",
    color: "#ef4444",
    range: [51, 70],
    headline: "You're at the edge. The good news: the problem is huge, so the fix is fast.",
    snapshot: [
      "Most inbound goes unanswered. Most tools are disconnected. Most issues just persist.",
      "You're running on adrenaline and prayer. The revenue is real but so is the burnout.",
      "Every week you stay in this seat costs you a 5-figure chunk you'll never recover.",
    ],
    priorities: [
      "Stop the bleed in week 1. AI receptionist + auto-reply + CRM pipeline. Nothing fancy.",
      "Kill 50% of the stack in week 2. Consolidate around 1 source of truth.",
      "Hand off breakage triage in week 3. Build a runbook before you build anything new.",
    ],
  },
];

export function bucketForScore(score: number): Bucket {
  const found = BUCKETS.find(
    (b) => score >= b.range[0] && score <= b.range[1]
  );
  return found ?? BUCKETS[BUCKETS.length - 1];
}

/* ───────────────── Calculator pre-fill mapping ───────────────── */

/** Bucket midpoints for Q1 (monthly leads). */
export const LEADS_MIDPOINT: Record<string, number> = {
  lt50: 30,
  "50-200": 125,
  "200-500": 350,
  "500plus": 750,
};

/** Bucket midpoints for Q4 (weekly manual follow-up hours). */
export const HOURS_MIDPOINT: Record<string, number> = {
  lt5: 3,
  "5-15": 10,
  "15-30": 22,
  "30plus": 35,
};

/** Q2 inverse → missed-lead rate (decimal). */
export const MISSED_RATE: Record<string, number> = {
  gt80: 0.1,
  "50-80": 0.35,
  "20-50": 0.65,
  lt20: 0.85,
};

/** Q7 revenue band → assumed avg deal size in USD. */
export const DEAL_MIDPOINT: Record<string, number> = {
  lt10k: 500,
  "10-30k": 1500,
  "30-100k": 4000,
  "100kplus": 10000,
};

/**
 * Build the query string handed to /tools/revenue-calculator on quiz exit.
 * URL param contract is locked with the parallel agent — do not rename.
 */
export function buildCalculatorParams(answers: Record<string, string>): string {
  const params = new URLSearchParams();
  const leads = LEADS_MIDPOINT[answers.leads ?? ""] ?? 100;
  const hours = HOURS_MIDPOINT[answers.manualHours ?? ""] ?? 10;
  const missed = MISSED_RATE[answers.responseRate ?? ""] ?? 0.4;
  const deal = DEAL_MIDPOINT[answers.revenue ?? ""] ?? 1500;
  params.set("leads", String(leads));
  params.set("manualHours", String(hours));
  params.set("missedRate", String(missed));
  params.set("deal", String(deal));
  params.set("closeRate", "0.2");
  params.set("hourlyValue", "75");
  params.set("source", "stress-quiz");
  return params.toString();
}
