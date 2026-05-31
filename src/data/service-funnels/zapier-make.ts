import type { ServiceFunnelContent } from "./types";

/**
 * Zapier & Make — FULL EXEMPLAR. This is the quality bar Phase B agents match.
 * Mined from content/services/zapier-make.html + SkynetLabs brand voice:
 * founder-first, public pricing, specific, anti-fluff, Bali/9-countries proof,
 * "ship in 14 days".
 */
const content: ServiceFunnelContent = {
  slug: "zapier-make",
  label: "Zapier & Make",

  hero: {
    eyebrow: "Connectivity · Zapier & Make · 2026",
    h1: "You have 47 Zaps. Six of them earn their keep.",
    sub: "Your Zapier bill creeps past $99/mo while half the Zaps fire on dead triggers, three have been paused since last September, and the one that actually mattered silently ate a refund yesterday. I audit, prune, and rebuild your connectivity layer so you stop paying per-task for noise. My first client stack had 41 Zaps and we kept 11 — that prune is the whole job, and it's why you can read the stack on one page after.",
    primary: { label: "Book the audit", href: "/discovery-call" },
    secondary: { label: "See real builds", href: "/case-studies" },
    trust: [
      "180+ flows shipped",
      "9 countries",
      "Public pricing",
      "Audit ships in a week",
    ],
  },

  pains: [
    {
      title: "Per-task bleed on noise",
      body: "Every duplicate trigger and abandoned Zap still burns tasks. A long-running Pro account is usually paying a full tier for work nobody asked for anymore.",
    },
    {
      title: "Nobody owns the stack",
      body: "30 Zaps, zero documentation. The person who built them left. Editing one feels like surgery in the dark, so the broken ones just stay broken.",
    },
    {
      title: "Failures are silent",
      body: "A Zap dies at 2am and the first you hear of it is a refund request three weeks later. No retry, no fallback, no alert. Just leads quietly hitting /dev/null while the dashboard stays green.",
    },
    {
      title: "Wrong tool, wrong job",
      body: "Bulk nightly jobs cost a fortune in Zapier; real-time single events get tangled in a Make scenario nobody can debug. The cost isn't the build — it's choosing wrong and writing nothing down.",
    },
  ],

  outcomes: [
    {
      title: "A stack you can read on one page",
      body: "Every live scenario gets a one-page runbook: trigger, steps, owner, and what breaks if it fails. Not a Notion dump — something your VA can act on at 2am.",
      proof: "1 runbook per live scenario",
    },
    {
      title: "Half the bill, same outputs",
      body: "We log every active Zap's task volume and error rate, then hand you a written kill / keep / rebuild list. Killing the dead triggers usually drops you a billing tier inside 30 days.",
      proof: "Dead triggers pruned, tier dropped",
    },
    {
      title: "AI steps that pay for themselves",
      body: "OpenAI or Claude wired inside the right Zap or scenario — classify tickets, summarise long submissions, translate inbound DMs before they ever reach your team.",
      proof: "1-2 AI nodes per flow",
    },
    {
      title: "Zero silent failures",
      body: "Retry policies, fallback routes, and dead-letter Slack alerts on every critical path. When something breaks, my phone knows before your customer does.",
      proof: "0 silent fails · 9 critical paths",
    },
  ],

  process: [
    {
      title: "Discover",
      body: "Read-only access to your Zapier and Make accounts. I pull task history, errors, and step counts into one audit sheet — so the decisions are made on data, not vibes. (Day 1-2)",
    },
    {
      title: "Decide",
      body: "Kill list, keep list, rebuild list. Each scenario is assigned to the tool it should actually live in, with a webhook gateway pattern proposed for the messy custom-app triggers. (Day 3)",
    },
    {
      title: "Ship",
      body: "Critical scenarios are rebuilt in parallel with the old ones still running. We cut over only after 48 hours of clean execution, then hand off Loom walkthroughs + runbooks. (Day 4-10)",
    },
  ],

  proof: {
    metric: "Pruned, not rebuilt",
    client: "Representative SkynetLabs build",
    detail:
      "Typical audit outcome: dead and duplicate triggers killed, the surviving scenarios documented, and bulk nightly jobs moved off per-task Zapier into Make — same outputs, a lighter bill, and a stack you can read on one page.",
  },

  comparison: {
    heading: "Me vs the Zapier freelancer you almost hired.",
    cols: ["", "With me", "Typical Zapier freelancer / SaaS-DIY"],
    rows: [
      {
        dimension: "Who builds it",
        us: "Me, start to finish. The person who scopes the audit is the person wiring the webhooks.",
        them: "A junior on a marketplace, or you, stitching it together at 11pm between client calls.",
      },
      {
        dimension: "Pricing",
        us: "Public fixed tiers on this page. You know the number before the call.",
        them: "Hourly with no ceiling, or a SaaS seat that quietly bills per-task as you scale.",
      },
      {
        dimension: "Tool choice",
        us: "Zapier vs Make vs n8n picked by team size and load. I'll tell you to drop a tool if it saves you money.",
        them: "Built in whatever the freelancer already knows, even when it's the wrong fit for the job.",
      },
      {
        dimension: "When it breaks",
        us: "Retry policies, fallback routes, and a Slack dead-letter alert. My phone knows before your customer does.",
        them: "It fails silently and you find out from a refund request three weeks later.",
      },
      {
        dimension: "Documentation",
        us: "One-page runbook per live scenario plus a Loom — your VA can act on it at 2am.",
        them: "Zero docs. When the builder leaves, editing one flow is surgery in the dark.",
      },
      {
        dimension: "Ongoing support team",
        us: "It's me. If I'm asleep in Bali, the fix waits till morning.",
        them: "A SaaS vendor with 24/7 chat support — genuinely faster for a 3am platform outage.",
      },
    ],
  },

  toolStack: {
    label: "The connectivity stack I actually build on",
    items: [
      "Zapier",
      "Make",
      "n8n (self-hosted)",
      "Webhooks + custom endpoints",
      "Google Sheets / Apps Script",
      "OpenAI & Claude (in-flow AI steps)",
    ],
  },

  guarantee: {
    title: "Fixed scope in 48 hours. 14-day fix window after ship.",
    body: "Before you pay, you get the scope locked in writing within 48 hours of the brief — exact scenarios, tools, and what 'done' means, no moving target. Every shipped flow comes with a 14-day window where I fix anything that misbehaves in your environment, no extra invoice.",
  },

  faqs: [
    {
      q: "Why not just move everything to n8n and skip Zapier?",
      a: "Sometimes that is the right answer — and I'll say so. But n8n needs hosting, a deploy story, and someone who can read a JSON error. Zapier wins when the team is small, the connectors are exotic, and you'd rather pay a SaaS fee than a DevOps fee. Make sits in the middle. I pick by team and load, not by ideology.",
    },
    {
      q: "Will the audit alone reduce our task burn?",
      a: "Usually yes. In a long-running account, 30-50% of Zaps are firing on triggers nobody uses anymore. Killing those drops the task count without touching the work that matters — I've seen a Pro account fall back to Starter inside 30 days.",
    },
    {
      q: "What's the real difference between Make scenarios and Zapier Zaps?",
      a: "Zapier is per-task billing and one-trigger-one-action thinking. Make charges per operation and assumes you'll branch, iterate, and bulk-process. A 300-row nightly job costs a fortune in Zapier and pennies in Make; real-time single events are cleaner in Zapier.",
    },
    {
      q: "Can you support webhooks from our custom app?",
      a: "Yes. I've wired Laravel apps, Rails monoliths, and Bubble back-ends to both platforms via webhook gateways. Same pattern every time: named endpoint, versioned payload, replay capability, and request logging for audit.",
    },
    {
      q: "How long until we're self-sufficient and you're out?",
      a: "Most teams feel confident editing scenarios in 30-45 days. You get a Loom per scenario and a one-page runbook, so the goal is you owning the stack, not renting me forever. After that the retainer is optional. About a third of clients keep it because they'd rather outsource the monthly review than own it.",
    },
    {
      q: "What does it cost?",
      a: "Public, fixed pricing — see the tiers above. Starter covers a single Zap or scenario; Pro is a connected suite across both tools with error alerting and runbooks; the retainer covers unlimited small tweaks plus one new scenario a month. Fixed scope back within 48 hours of your brief.",
    },
  ],

  finalCta: {
    h2: "Cut the noise. Keep the six that earn.",
    body: "30-min discovery call. I'll rank your top leaks by dollar value and have the audit kill-list in your hands by Friday. Fixed scope back in 48 hours.",
    ctaLabel: "Start the brief",
  },
};

export default content;
