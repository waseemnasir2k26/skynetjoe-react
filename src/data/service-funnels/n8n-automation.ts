import type { ServiceFunnelContent } from "./types";

/**
 * n8n Automation — migrated from the bespoke N8nAutomationLP component
 * (2026-08-19 thin→rich upgrade) onto the shared <ServiceFunnel/> template
 * so this page gets FAQPage schema, the 3 pricing tiers, and the honest
 * comparison section the other 11 funnel pages already have.
 * Copy carried over from the old LP where it was already true; ship windows
 * reconciled to service-pricing.ts (Starter 5d / Pro 10-14d / retainer
 * ongoing) — the old LP's hardcoded "11-day ship" strip is dropped in favor
 * of the per-tier "Ship:" line the pricing cards already render.
 */
const content: ServiceFunnelContent = {
  slug: "n8n-automation",
  label: "n8n Automation",

  hero: {
    eyebrow: "Automation · n8n · 2026",
    h1: "Stop renting your automation. Own it.",
    sub: "Keep the automations your business runs on — without the rising monthly SaaS bill. The same flows you pay hundreds a month for, rebuilt on n8n to run for a few dollars, version-controlled, with auto-retry so they stop failing in silence.",
    primary: { label: "Book a free 30-min check-up", href: "/discovery-call" },
    secondary: { label: "Compare n8n vs Zapier", href: "/n8n-vs-zapier" },
    trust: [
      "180+ flows shipped",
      "9 countries",
      "Public pricing",
      "Self-hosted, you own it",
    ],
  },

  pains: [
    {
      title: "The monthly bill keeps climbing",
      body: "Six flows running on rented SaaS, the bill creeping past $400/mo. Half the tasks fail without a word, and you only find out when someone complains.",
    },
    {
      title: "Only one person knew how it worked",
      body: "They left. Nobody knows how the flows wire together. Every edit feels like surgery in the dark, so nothing gets touched and the workflow slowly rots.",
    },
    {
      title: "A form quietly stopped sending",
      body: "Your contact form dropped leads for three weeks. You found out from a refund request, not a monitoring alert — because there was no monitoring alert.",
    },
  ],

  comparison: {
    heading: "n8n vs Zapier — the honest breakdown.",
    cols: ["", "n8n (what I build)", "Zapier / Make"],
    rows: [
      {
        dimension: "Who owns it",
        us: "Your account or your VPS. Git-versioned, exportable JSON — fork it, extend it, take it anywhere.",
        them: "Locked inside their platform. Cancel the subscription and every Zap stops existing.",
      },
      {
        dimension: "Running cost",
        us: "A few dollars a month self-hosted, flat — no per-task metering.",
        them: "Priced per task/run; the bill climbs as volume grows, often past $200-400/mo for a handful of active flows.",
      },
      {
        dimension: "Failure handling",
        us: "Error branches, auto-retry, and a Slack/email alert built into every flow by default.",
        them: "Failures silently pause the Zap unless you've manually wired a separate error-handling Zap.",
      },
      {
        dimension: "Complex logic",
        us: "Native code nodes (JS/Python), loops, and branching for anything Zapier's linear model can't express.",
        them: "Linear step model — multi-branch logic usually needs Make or a workaround, not native Zapier.",
      },
      {
        dimension: "When it breaks",
        us: "A readable copy of every workflow, plus a fix window after handoff.",
        them: "A support ticket queue; the automation logic itself is opaque to anyone but the original builder.",
      },
      {
        dimension: "See the full comparison",
        us: "→ n8n vs Zapier (2026 switch guide)",
        them: "",
      },
    ],
  },

  outcomes: [
    {
      title: "A system you understand, not a black box",
      body: "Every workflow ships with a readable diagram and a Loom walkthrough, so an edit doesn't require summoning the original developer.",
      proof: "Full handover documentation",
    },
    {
      title: "Failures surface instead of hiding",
      body: "Scheduled runs, auto-retry on transient errors, and an alert the moment something actually needs a human — instead of finding out from a customer complaint.",
      proof: "Error-handling + Slack notifier on every flow",
    },
    {
      title: "Shared building blocks, not one-off scripts",
      body: "Sub-workflows get reused across jobs instead of copy-pasted, so the second and third automation ship faster than the first.",
      proof: "Reusable sub-workflow library",
    },
    {
      title: "You own the infrastructure",
      body: "Runs on your own server or n8n cloud account — a few dollars a month instead of a per-task SaaS bill, fully version-controlled in Git.",
      proof: "No per-task metering",
    },
  ],

  process: [
    {
      title: "Audit",
      body: "I map what's actually breaking or costing you — the rented flows, the silent failures, the manual workarounds — before proposing a single node.",
    },
    {
      title: "Build",
      body: "Flows built in n8n with error branches and retry logic from the start, tested against real data before cutover.",
    },
    {
      title: "Hand off",
      body: "A readable workflow diagram, a Loom walkthrough, and a fix window so an edge case in week one doesn't catch you alone.",
    },
  ],

  toolStack: {
    label: "Tools we use:",
    items: [
      "n8n",
      "Self-hosted VPS or n8n cloud",
      "PostgreSQL",
      "Slack/email alerts",
    ],
  },

  proof: {
    metric: "180+",
    client: "Flows shipped since 2019, 9 countries",
    detail:
      "Workflows shipped from a Canggu cafe since 2019, across 9 countries, with no monthly retainer required to keep them running.",
  },

  secondaryProof: {
    metric: "6h → 6min",
    client: "EU logistics group (anonymized), Lyon, France",
    detail:
      "A self-hosted n8n + GPT-4o email-triage pipeline (17 nodes, 6-week build) cut routine Gmail response time from hours to minutes and retired 4 separate paid tools into 1 stack.",
  },

  guarantee: {
    title: "Fixed scope before you pay. Fixed for a window after.",
    body: "Scope gets locked in writing within 48 hours of your brief, so you know exactly what ships and what it costs before any money moves. Every flow ships with a post-launch fix window — if an edge case breaks in production, I fix it.",
  },

  faqs: [
    {
      q: "n8n vs Zapier — which one do I actually need?",
      a: "If you're running fewer than 3 simple flows, Zapier's fine and I'll tell you that on the call. Past that, n8n's flat self-hosted cost and native code nodes usually win on both price and flexibility. Full breakdown at /n8n-vs-zapier.",
    },
    {
      q: "Do I own the workflows, or am I renting them from you?",
      a: "You own them outright. Every flow is exported as versioned JSON, on your n8n cloud account or your own VPS. No per-task fee, nothing locked behind my login — fork it, extend it, or hand it to another developer whenever you want.",
    },
    {
      q: "What happens when a workflow breaks in production?",
      a: "Every flow ships with error branches and a Slack/email alert, so a failure surfaces immediately instead of failing silently for weeks. Every build also carries a post-launch fix window for exactly this.",
    },
    {
      q: "How long does a build take?",
      a: "Starter — one production workflow, up to 12 nodes — ships in 5 days. A multi-system Pro pipeline replacing a whole stack runs 10-14 days. See the pricing tiers above for exact scope per tier.",
    },
    {
      q: "Can you self-host n8n on my own server?",
      a: "Yes — that's the default recommendation for anyone past 2-3 flows, since it removes n8n cloud's per-execution pricing entirely. Self-host setup and hardening is a listed add-on if you don't already have a VPS.",
    },
    {
      q: "What if my workflow needs custom logic Zapier/Make can't do?",
      a: "That's usually the exact reason clients switch to n8n — native JavaScript/Python code nodes, loops, and branching handle logic a linear Zap model can't express without workarounds.",
    },
  ],

  finalCta: {
    h2: "Tell me what's breaking. I'll build the fix.",
    body: "A free 30-minute check-up. I'll name the fixes that recover the most, sequenced biggest-first, with a fixed-scope plan back within 48 hours.",
    ctaLabel: "Book the check-up",
  },

  freeTools: {
    label: "Try it free first:",
    items: [
      {
        label: "n8n Workflow Generator",
        href: "/tools/n8n-workflow-generator",
      },
      {
        label: "Cron Expression Builder",
        href: "/tools/cron-expression-builder",
      },
      {
        label: "Webhook Payload Builder",
        href: "/tools/webhook-payload-builder",
      },
    ],
  },
};

export default content;
