import type { ServiceFunnelContent } from "./types";

/**
 * AI Business Systems — flagship / high-ticket service.
 * Bespoke custom agents, RAG/knowledge bots, internal ops automation,
 * multi-tool orchestration, dashboards. Outcome-anchored, premium.
 * Proof = canonical case "eu-logistics-email-triage-n8n" (EU logistics group,
 * anonymized) — a 17-node n8n + GPT-4o triage pipeline, 6hr → 6min routine
 * response. NOTE: Takycorp is the US insurance retainer client, NOT French
 * logistics — do not mislabel it. KODIASIMMO is the Northeast recovery network.
 */
const content: ServiceFunnelContent = {
  slug: "ai-business-systems",
  label: "AI Business Systems",

  hero: {
    eyebrow: "Consulting · AI Business Systems · 2026",
    h1: "One system that runs a real workflow end to end — shipped, not theorised.",
    sub: "Your team's work is scattered across 14 tools, three of last year's AI pilots never left the demo, and the one person who knows how it all fits together is also the bottleneck. I build one custom system — agent, knowledge bot, or ops pipeline — that owns a workflow start to finish and hands it back to your team running. Like the 17-node triage pipeline that cut a logistics operator's routine email response from six hours to six minutes.",
    primary: { label: "Book the systems audit", href: "/discovery-call" },
    secondary: { label: "See real builds", href: "/case-studies" },
    trust: [
      "180+ flows shipped",
      "9 countries",
      "Public pricing",
      "Ships in 10-30 days",
    ],
  },

  pains: [
    {
      title: "The work lives in 14 tools and nobody's hands",
      body: "Orders land in email, get re-typed into the CRM, copied to a spreadsheet, pinged to Slack. Every step is a human moving data between apps that don't talk. That swivel-chair tax is your whole ops cost, and it doesn't show up on any invoice.",
    },
    {
      title: "AI pilots that never shipped",
      body: "Somebody on the team built a clever GPT prompt. It impressed everyone in the demo and then died in a Notion doc. The gap was never the idea — it was wiring it into a real workflow with real data, error handling, and an owner. Experiments aren't systems.",
    },
    {
      title: "One head holds the whole machine",
      body: "The process runs because you (or your one senior operator) remember the steps. Nothing's documented, nothing's automated, and the day that person is sick or quits, the workflow stops. You don't have a business system — you have a person doing impressions of one.",
    },
    {
      title: "Knowledge buried where nobody can reach it",
      body: "Three years of SOPs, contracts, support tickets, and product docs sitting across Drive, email threads, and people's heads. New hires re-ask the same questions. Customers wait while someone hunts for the answer that already exists somewhere.",
    },
  ],

  outcomes: [
    {
      title: "A workflow that runs without a human babysitting it",
      body: "Inbound hits the system, gets classified, routed, drafted, logged, and escalated only when a human actually needs to decide. The repetitive 80% disappears. Your team is left with the 20% that needs judgement.",
      proof: "EU logistics group: routine reply 6 hrs → 6 min",
    },
    {
      title: "A knowledge bot that answers from your own data",
      body: "A RAG bot grounded in your SOPs, contracts, and product docs — answering in your voice, citing the source doc, and saying \"I don't know\" instead of inventing. New hires and customers get the right answer in seconds, not a queue.",
      proof: "Grounded answers, source-cited",
    },
    {
      title: "Multi-tool orchestration that ends the re-typing",
      body: "Email, CRM, spreadsheet, billing, and Slack wired into one pipeline so data is entered once and flows everywhere. No more copy-paste between apps, no more two versions of the truth.",
      proof: "KODIASIMMO: 17 stuck intakes recovered, auto-routed",
    },
    {
      title: "A dashboard and SOPs so the system is yours",
      body: "One screen showing what the system processed, what it escalated, and what it saved you. Plus Loom walkthroughs and runbooks so your team operates and edits it without me. You own the system, not a dependency on me.",
      proof: "Dashboard + runbook + Loom handover",
    },
  ],

  process: [
    {
      title: "Audit",
      body: "Three working sessions to find the one workflow that's bleeding the most hours, plus read-only access to the tools and data it touches. We pick the system by dollar impact, not by what's shiniest — and I tell you upfront what's realistic for AI today and what isn't. (Week 1)",
    },
    {
      title: "Build",
      body: "The system gets built against your real data, in parallel with how you work now so nothing breaks. Agent logic, RAG retrieval, tool wiring, error handling, escalation rules, and the dashboard — all tested on live cases before anything cuts over. (Weeks 2-3)",
    },
    {
      title: "Hand off",
      body: "Cutover only after the system runs clean on real volume. You get the dashboard, a runbook per workflow, Loom walkthroughs, and 30 days of post-launch support while your team takes the wheel. Built to be edited by your people, not chained to me. (Week 3-4)",
    },
  ],

  proof: {
    metric: "6 hours → 6 minutes",
    client: "EU logistics group (anonymized)",
    detail:
      "A 17-node n8n + GPT-4o pipeline reads a shared logistics inbox, classifies each thread on five variables, drafts accent-safe replies, and never auto-sends to a CC'd executive — collapsing routine response time from six hours to six minutes and dispatcher load from four hours a day to forty-five minutes. The same audit-then-build discipline runs across every system engagement.",
  },

  faqs: [
    {
      q: "Is this strategy or do you actually build the system?",
      a: "Both, and the build is the point. The audit exists to pick the right system; the engagement exists to ship it. You walk away with a working system running a real workflow on your real data — not a 30-page deck of what someone could build. Most \"AI consultants\" stop at the slide. I stop when it's live.",
    },
    {
      q: "Why is this priced higher than your automation services?",
      a: "Because it's bespoke, not a template. A Zapier flow connects two apps you already understand. This is a custom system — agent logic, retrieval grounded in your data, tool orchestration, error handling, and a dashboard — built to own a workflow end to end. Starter is $4,997 for the audit plus one priority system in 10 days. Pro is $12,500 for a full transformation: three systems, team SOPs, and a stack consolidation plan. Public, fixed, on the page above.",
    },
    {
      q: "How long until it's running, and how much of my team's time does it take?",
      a: "Starter ships a system in about 10 days; a full Pro transformation runs 21-30. Your side is three audit sessions up front and sign-off checkpoints along the way — I don't need your team full-time, I need access to the workflow and the people who actually do it today. I build against how you work now so daily operations never stop.",
    },
    {
      q: "Will my team actually use it, or will it sit like the last AI pilot?",
      a: "This is the failure I'm built to prevent. The last pilot died because it was a prompt, not a system with an owner. Yours ships with a dashboard your team checks, runbooks they can act on, Loom walkthroughs per workflow, and 30 days of support while adoption sets. I also tell you honestly which tasks to never automate — forcing AI where it doesn't belong is how adoption dies.",
    },
    {
      q: "Do I own the system, or am I locked into a retainer with you?",
      a: "You own it. Everything lives in your accounts, your data stays yours, and the system is built to be edited by your team — that's what the runbooks and Loom handover are for. The fractional retainer ($2,997/mo) is optional and exists for clients who'd rather I keep iterating and adding systems than hire for it. Roughly a third take it; the rest run solo. No lock-in either way.",
    },
    {
      q: "Can you build on the tools and data we already have?",
      a: "Yes, and I'll consolidate before I add. Most stacks have the right tools wired wrong, not too few tools. I connect what you own — email, CRM, spreadsheets, billing, your docs — and only recommend something new when there's a real gap. Fewer tools doing more, not another subscription.",
    },
  ],

  finalCta: {
    h2: "Stop running the workflow in your head. Ship the system that runs it.",
    body: "30-min discovery call. I'll find the one workflow bleeding the most hours, tell you straight whether AI is the right fix, and have fixed scope back in 48 hours.",
    ctaLabel: "Start the brief",
  },
};

export default content;
