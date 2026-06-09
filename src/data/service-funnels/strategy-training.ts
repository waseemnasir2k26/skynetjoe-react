import type { ServiceFunnelContent } from "./types";

/**
 * Strategy & Training — AI advisory + team enablement (not a build).
 * Audits, roadmaps, team enablement, prompt/tool training, fractional AI advisor.
 * Framed around CLARITY + LEVERAGE, not delivery. Process = audit → roadmap → enablement.
 * No canonical case maps to strategy-training → proof is representative (no
 * client metrics, no de-anonymized names). NOTE: the US insurance retainer
 * client is NOT the EU logistics group — do not mislabel it.
 */
const content: ServiceFunnelContent = {
  slug: "strategy-training",
  label: "Strategy & Training",

  hero: {
    eyebrow: "Consulting · Strategy & Training · 2026",
    h1: "A clear plan for where AI pays off — and a team that can actually run it.",
    sub: "Your team has watched the courses, opened the tools, and still works the old way. The problem isn't effort — it's that nobody mapped where AI actually moves your numbers versus where it's a distraction. I audit your workflows, write the roadmap that says do this, not that, and train your people on their real work until it becomes a habit. The kind of enablement that leaves a team running its own AI workflows after I'm gone.",
    primary: { label: "Book the AI audit", href: "/discovery-call" },
    secondary: { label: "See real builds", href: "/case-studies" },
    trust: [
      "180+ flows shipped",
      "9 countries",
      "Public pricing",
      "Audit ships in days",
    ],
  },

  pains: [
    {
      title: "You don't know where AI actually pays off",
      body: "The pressure to \"do something with AI\" is real, but nobody's mapped which of your workflows it moves and which it just decorates. So you guess, buy tools on a hunch, and can't tell six months later whether any of it earned its keep.",
    },
    {
      title: "Tool overwhelm, no shared standard",
      body: "ChatGPT, Claude, Gemini, Copilot, a dozen wrapper apps. Every person picked a different one, prompts differently, and gets a different result. Nothing compounds because there's no shared playbook — just scattered individual habits that fade by Friday.",
    },
    {
      title: "Training that died on Monday",
      body: 'A generic vendor ran a four-hour webinar on "intro to prompting," everyone nodded, and three weeks later the team is back to the old way. Courses teach the tool. They don\'t teach your ops manager how to clear her inbox faster on Tuesday.',
    },
    {
      title: "Shadow AI nobody's watching",
      body: "Someone's already pasting customer data into a free chatbot with no retention controls and no policy. You don't have an AI problem — you have an ungoverned one, and the first you'll hear of it might be a breach, not a memo.",
    },
  ],

  outcomes: [
    {
      title: "A roadmap that says do this, skip that",
      body: "A short, ranked plan: the three workflows where AI pays off now, the ones to wait on, and the ones to never automate. Prioritised by hours saved, not hype. You stop guessing and start with the move that actually returns.",
      proof: "Ranked by dollar impact",
    },
    {
      title: "A team that runs it without you",
      body: "Hands-on sessions tied to your people's real work — their inbox, their contact list, their actual Tuesday — until each person ships a workflow they'll use tomorrow. Enablement, not entertainment. The skill stays after I leave.",
      proof: "Representative: adoption holds past day 30",
    },
    {
      title: "A shared playbook and prompt library",
      body: "One place every role pulls from: role-specific playbooks, a curated prompt library, and voice profiles for company comms. Good prompts get reused instead of reinvented, so output stops depending on who's at the keyboard.",
      proof: "Custom library, yours to keep",
    },
    {
      title: "An AI policy that ends the guesswork",
      body: "A written line on what data can and can't go into which tool, which tiers are sanctioned, and the rules where GDPR or HIPAA apply. Shadow AI becomes governed AI — your team sleeps better, and so does your legal team.",
      proof: "Written policy + data rules",
    },
  ],

  process: [
    {
      title: "Audit",
      body: "I interview your team leads and shadow the key roles for a half-day each, mapping the five tasks per role where AI fits and the five where it doesn't. This is where the clarity comes from — real workflows, not a generic maturity survey. (Week 1)",
    },
    {
      title: "Roadmap",
      body: "You get the plan: ranked priorities by hours saved, the role-specific playbooks, a prompt library, and a written AI policy. Short enough to read in an afternoon, specific enough to act on Monday. (Week 1-2)",
    },
    {
      title: "Enablement",
      body: "Live workshops in small groups on your real work — every session ends with a shipped workflow — then 30 days of office hours and adoption checks so the habit forms. I hold the line past the point where generic training quits. (Week 2-4)",
    },
  ],

  toolStack: {
    label: "// what you actually walk away holding",
    items: [
      "Notion runbook (the ranked roadmap + role playbooks + AI policy, yours to edit)",
      "Loom SOP library (each workflow recorded the way your team will run it)",
      "Claude + ChatGPT (trained on your real data, second model for comparison)",
      "Curated prompt library + company voice profiles (reused, not reinvented)",
      "n8n (when a workflow earns automation — flagged, scoped separately, not padded in here)",
      "Live screen-share workshops + 30 days of office hours (the part webinars skip)",
    ],
  },

  fitCheck: {
    forYou: [
      "You've got a real workflow that's bleeding hours — inbox, ops triage, CRM drafting — and you want it mapped, not theorised about.",
      "You want your own team to own the system after I leave, not rent another advisor forever.",
      "The budget's ready and you'd rather pay once for clarity than keep buying tools on a hunch.",
      "Someone on the team is already pasting customer data into a free chatbot and you'd like that governed before it's a breach.",
    ],
    notForYou: [
      "You want the cheapest hour on the marketplace — a generic webinar vendor will underbid me and you should take it.",
      "You want me to run your AI for you forever. I hand over the roadmap and the trained team; I'm not a managed service.",
      "You want it decided by committee with no one accountable for adoption — without a leader holding the line, the training fades by week three and we both waste the spend.",
    ],
  },

  proof: {
    metric: "Team runs it solo",
    client: "Representative SkynetLabs build",
    detail:
      "After role-specific training, a team runs its own AI workflows internally — sales drafting, ops triage, founder review — without me in the loop. Adoption tends to hold past day 30 because the program is real work plus accountability, where generic vendor webinars stall out in the first few weeks.",
  },

  guarantee: {
    title: "Fixed scope before you pay. Recorded handover when it ships.",
    body: "I send fixed scope back within 48 hours of your brief, so you know exactly what the audit, roadmap, and workshops cover before any money moves. Every engagement ships with a recorded Loom handover and a 14-day window where I fix anything in the playbooks or policy that doesn't match how your team actually works.",
  },

  faqs: [
    {
      q: "Is this a build, or just advice?",
      a: "It's advisory and enablement — clarity and leverage, not delivery. I hand you the roadmap and train your team to run it; I don't build the systems here. When the audit surfaces a workflow worth automating, that's a separate AI Business Systems engagement and I'll say so plainly rather than padding this one. The value here is knowing exactly where to point your effort and having a team that can execute.",
    },
    {
      q: "What does it cost?",
      a: "Public, fixed pricing on the tiers above. Starter is $997 — a 90-minute role workshop plus a custom playbook, in 3 days. Pro is $2,997 — four live sessions, a prompt library, tooling setup, and two weeks of office hours. The fractional AI-advisor retainer ($1,497/mo) keeps me on for monthly office hours and a quarterly strategy review. Fixed scope back within 48 hours of your brief.",
    },
    {
      q: "How long does it take, and how much of my team's time?",
      a: "Starter runs in 3 days, Pro in about 7 plus the 30-day adoption window. Your team's commitment is the workshop blocks plus a short shadowing window during the audit. Sessions are tied to their real work, so the time spent learning is time they'd have spent doing the work anyway — it pays for itself inside the session.",
    },
    {
      q: "Will my team actually adopt it, or fade by week three?",
      a: "Fading is exactly what I'm built to stop. Generic training fails because it teaches the tool and then leaves. This is small groups, real work in the room, a workflow shipped per session, then 30 days of accountability checks. If someone refuses to engage, I don't force it — I make the case once with the numbers and let leadership decide. Adoption holds past day 30 far more often this way than after a one-off webinar.",
    },
    {
      q: "Do you train on specific tools, or just theory?",
      a: "Specific tools, on your team's real data. Claude, ChatGPT, Gemini, Copilot for engineering teams, plus the workflow tools you already pay for. I default to whatever you're already licensed on, then add a second model for comparison so your team learns to pick the right tool per job instead of marrying one. The playbooks use your actual workflows, not toy examples.",
    },
    {
      q: "What do we walk away with?",
      a: "A ranked AI roadmap, role-specific playbooks, a custom prompt library, voice profiles for your comms, and a written AI policy — all yours to keep and edit. Plus a team that's shipped real workflows and knows how to keep going. You leave with clarity on where AI pays off and the capability to run it, not a dependency on me.",
    },
  ],

  finalCta: {
    h2: "Stop paying for AI tools your team doesn't use.",
    body: "30-min discovery call. I'll find where AI actually moves your numbers, tell you straight where it doesn't, and have fixed scope back in 48 hours.",
    ctaLabel: "Start the brief",
  },
};

export default content;
