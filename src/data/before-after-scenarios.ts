/**
 * Before/After slider scenarios — 6 preset manual-vs-AI workflow comparisons.
 * Pure data, no runtime. Drives /tools/before-after-slider.
 */

export type KpiTile = {
  label: string;
  before: string;
  after: string;
  delta: string;
};

export type Scenario = {
  slug: string;
  title: string;
  category: string;
  /** Short one-liner shown on the picker card. */
  blurb: string;
  /** Emoji used on the picker card icon. */
  icon: string;
  manual: {
    headline: string;
    sub: string;
    pains: string[];
    timestamp: string;
    cost: string;
    mood: string;
  };
  automated: {
    headline: string;
    sub: string;
    wins: string[];
    metric: string;
    cost: string;
    mood: string;
  };
  kpis: KpiTile[];
};

export const SCENARIOS: Scenario[] = [
  {
    slug: "lead-response",
    title: "Lead response time",
    category: "Sales",
    blurb:
      "24-hour email reply versus a 23-second AI reply that books the call before the lead opens a competitor tab.",
    icon: "⚡",
    manual: {
      headline: "24-hour email reply",
      sub: "Lead form fires. Email sits in the inbox. Someone gets to it tomorrow morning if they remember.",
      pains: [
        "Reply sent next business day",
        "67% of leads ghost inside 1 hour",
        "Hot leads cool to lukewarm",
        "Manual copy-paste from CRM",
        "Forgotten on weekends",
      ],
      timestamp: "Avg first reply: 24 hours",
      cost: "$2,800/mo lost pipeline",
      mood: "🥲",
    },
    automated: {
      headline: "23-second AI reply",
      sub: "Form submit triggers an n8n flow. GPT writes the personalised reply. Calendly link sent before the kettle boils.",
      wins: [
        "Personalised reply in under 30s",
        "Calendly slot prefilled with name",
        "Lead scored and CRM-tagged",
        "Slack ping if score is hot",
        "Works at 3am on a Sunday",
      ],
      metric: "Avg first reply: 23 seconds",
      cost: "$0 marginal cost",
      mood: "😎",
    },
    kpis: [
      { label: "Response time", before: "24h", after: "23s", delta: "↓99.97%" },
      { label: "Hot-lead retention", before: "33%", after: "91%", delta: "↑175%" },
      { label: "Pipeline lift", before: "—", after: "+$2.8k/mo", delta: "↑" },
      { label: "Manual time", before: "45 min/day", after: "0 min/day", delta: "↓100%" },
    ],
  },
  {
    slug: "content-production",
    title: "Content production",
    category: "Marketing",
    blurb:
      "One blog a week versus seven LinkedIn posts, three reels and one long-form blog — same week, one operator.",
    icon: "📝",
    manual: {
      headline: "1 blog per week",
      sub: "Founder writes, edits, schedules, posts. Burns out by week three. Reels and LinkedIn quietly die.",
      pains: [
        "1 blog post weekly, maybe",
        "No reels, no LinkedIn",
        "Founder writes everything",
        "4-6 hours per piece",
        "Sporadic, then silent",
      ],
      timestamp: "~4 pieces of content/month",
      cost: "$1,200/mo founder-hours",
      mood: "🥲",
    },
    automated: {
      headline: "7 LI + 3 reels + 1 blog",
      sub: "n8n pulls topics, Claude drafts, Eleven Labs voices the reels, Buffer schedules. Founder approves on the phone.",
      wins: [
        "7 LinkedIn posts/week",
        "3 short-form reels/week",
        "1 long-form blog/week",
        "Voice cloned, not generic AI",
        "30 mins of approval, that's it",
      ],
      metric: "~44 pieces of content/month",
      cost: "~$60/mo in API tokens",
      mood: "😎",
    },
    kpis: [
      { label: "Output", before: "4/mo", after: "44/mo", delta: "↑1000%" },
      { label: "Founder hours", before: "16h/mo", after: "2h/mo", delta: "↓87%" },
      { label: "Cost per piece", before: "$300", after: "$1.40", delta: "↓99%" },
      { label: "Channels covered", before: "1", after: "3", delta: "↑3x" },
    ],
  },
  {
    slug: "customer-service",
    title: "Customer service queue",
    category: "Ops",
    blurb:
      "12 manual tickets a day versus 2 escalations a day. AI triage handles the other 10 before lunch.",
    icon: "💬",
    manual: {
      headline: "12 tickets a day",
      sub: "Same five questions, every day. Support agent re-types the same answers, gets tired, gets snippy by Friday.",
      pains: [
        "Same questions repeated daily",
        "Manual copy-paste responses",
        "4-hour average first reply",
        "Tone slips when overloaded",
        "Weekends pile up",
      ],
      timestamp: "12 tickets/day to humans",
      cost: "$3,400/mo support salary share",
      mood: "🥲",
    },
    automated: {
      headline: "2 escalated tickets/day",
      sub: "Intercom AI agent reads the docs, answers the FAQ tier, only pings the human when the question is actually new.",
      wins: [
        "Tier-1 questions resolved instantly",
        "Knowledge base auto-updated",
        "Human handles only edge cases",
        "Consistent tone, 24/7",
        "Saturday isn't a backlog",
      ],
      metric: "2 escalations/day to humans",
      cost: "$180/mo Intercom AI",
      mood: "😎",
    },
    kpis: [
      { label: "Human tickets", before: "12/day", after: "2/day", delta: "↓83%" },
      { label: "First reply", before: "4h", after: "instant", delta: "↓100%" },
      { label: "Support cost", before: "$3.4k/mo", after: "$180/mo", delta: "↓95%" },
      { label: "CSAT", before: "72%", after: "94%", delta: "↑31%" },
    ],
  },
  {
    slug: "crm-data-entry",
    title: "CRM data entry",
    category: "Sales Ops",
    blurb:
      "60 minutes a day of copy-paste between Gmail, Calendly and the CRM, versus zero — because it all syncs itself.",
    icon: "🗂️",
    manual: {
      headline: "60 minutes/day of copy-paste",
      sub: "Lead emails, Calendly bookings, call notes — manually keyed into HubSpot every evening. Half of it gets skipped.",
      pains: [
        "Lead data re-typed by hand",
        "Calendly bookings missed in CRM",
        "Call notes never logged",
        "Dirty data inside a week",
        "Reps hate doing it, skip half",
      ],
      timestamp: "60 min/day per rep",
      cost: "$1,800/mo per rep in time",
      mood: "🥲",
    },
    automated: {
      headline: "Zero manual entry",
      sub: "n8n catches Gmail labels, Calendly webhooks, call transcripts. CRM stays clean without anyone touching it.",
      wins: [
        "Gmail → CRM auto-sync",
        "Calendly webhook → contact created",
        "Call transcript auto-summarised",
        "Tags applied from intent rules",
        "Reps just sell, no admin",
      ],
      metric: "0 min/day per rep",
      cost: "$30/mo n8n VPS",
      mood: "😎",
    },
    kpis: [
      { label: "Admin time", before: "60 min/day", after: "0 min/day", delta: "↓100%" },
      { label: "Data quality", before: "62%", after: "98%", delta: "↑58%" },
      { label: "Selling time", before: "5h/day", after: "6h/day", delta: "↑20%" },
      { label: "Annual savings", before: "—", after: "$21.6k/rep", delta: "↑" },
    ],
  },
  {
    slug: "reporting",
    title: "Reporting",
    category: "Leadership",
    blurb:
      "Friday afternoon spent assembling a PDF versus a live dashboard that updates while the team is on the call.",
    icon: "📊",
    manual: {
      headline: "Friday 4-hour PDF",
      sub: "Pull GA, pull HubSpot, pull Stripe. Glue into Google Sheets. Export PDF. Send to board. By Monday, numbers are stale.",
      pains: [
        "4 hours every Friday",
        "Data stale by Monday",
        "Manual chart-by-chart copy",
        "One source breaks, whole report breaks",
        "Founder builds it, founder hates it",
      ],
      timestamp: "1 report/week, 4 hours to build",
      cost: "$2,200/mo founder-hours",
      mood: "🥲",
    },
    automated: {
      headline: "Real-time live dashboard",
      sub: "Lookerstudio or Hex pulls every source via API. Board logs in, sees today's numbers, not last Friday's snapshot.",
      wins: [
        "Refreshes every 15 minutes",
        "Annotated by AI for context",
        "Board self-serves the data",
        "No Friday afternoon admin",
        "Anomaly Slack ping if something breaks",
      ],
      metric: "Live, no manual build",
      cost: "$40/mo Looker",
      mood: "😎",
    },
    kpis: [
      { label: "Report freshness", before: "weekly", after: "15 min", delta: "↑672x" },
      { label: "Founder time", before: "16h/mo", after: "0h/mo", delta: "↓100%" },
      { label: "Anomaly detection", before: "guessed", after: "auto-alerted", delta: "↑" },
      { label: "Cost", before: "$2.2k/mo", after: "$40/mo", delta: "↓98%" },
    ],
  },
  {
    slug: "lead-qualification",
    title: "Lead qualification",
    category: "Sales",
    blurb:
      "Gut-feel inbox triage versus a scored, routed, Slack-pinged pipeline that never lets a high-intent buyer cool.",
    icon: "🎯",
    manual: {
      headline: "Gut feel from the inbox",
      sub: "Look at the form, guess if they're real, maybe book a call, maybe forget. Hot leads slip through, tire-kickers eat the calendar.",
      pains: [
        "No scoring, just vibes",
        "Best leads waste in queue",
        "Tire-kickers booked anyway",
        "No UTM attribution",
        "Calendar fills with bad fits",
      ],
      timestamp: "30 min/day of triage",
      cost: "$5,200/mo wasted calls",
      mood: "🥲",
    },
    automated: {
      headline: "Scored, routed, pinged",
      sub: "n8n + Clearbit enriches every lead. AI scores 0-100 on intent. Above 70 pings Slack. Below 30 routes to nurture.",
      wins: [
        "0-100 intent score on submit",
        "Slack alerts on hot leads",
        "Nurture sequence for cold ones",
        "UTM attribution end-to-end",
        "Calendar fills with real fits",
      ],
      metric: "Auto-scored in 8 seconds",
      cost: "$90/mo Clearbit + n8n",
      mood: "😎",
    },
    kpis: [
      { label: "Wasted calls", before: "8/week", after: "1/week", delta: "↓87%" },
      { label: "Show-up rate", before: "44%", after: "82%", delta: "↑86%" },
      { label: "Close rate", before: "12%", after: "31%", delta: "↑158%" },
      { label: "Time to triage", before: "30 min/day", after: "0", delta: "↓100%" },
    ],
  },
];

export function getScenario(slug: string): Scenario | undefined {
  return SCENARIOS.find((s) => s.slug === slug);
}
