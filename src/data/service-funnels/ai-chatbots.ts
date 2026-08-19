import type { ServiceFunnelContent } from "./types";

/**
 * AI Chatbots — migrated from the bespoke AiChatbotsLP component
 * (2026-08-19 thin→rich upgrade) onto the shared <ServiceFunnel/> template.
 * No case-studies.ts entry lists ai-chatbots in relatedServices yet, so the
 * primary proof stays the sitewide 8-hour weekday reply guarantee (already
 * live copy, not a per-client metric) rather than inventing a client number.
 * Ship windows reconciled to service-pricing.ts (Starter 5d / Pro 10d).
 */
const content: ServiceFunnelContent = {
  slug: "ai-chatbots",
  label: "AI Chatbots",

  hero: {
    eyebrow: "Development · AI Chatbots · 2026",
    h1: "A chat flow that closes leads instead of losing them.",
    sub: "Stop the flow getting stuck on one branch while the customer rage-types out. I build web, WhatsApp, and voice agents trained on your actual knowledge base, wired straight into your CRM with source and campaign data intact — so sales stops blaming marketing every Monday.",
    primary: { label: "Book a free 30-min check-up", href: "/discovery-call" },
    secondary: { label: "See real builds", href: "/case-studies" },
    trust: [
      "8h weekday reply guarantee",
      "Public pricing",
      "9 countries",
      "Ship in 5-10 days",
    ],
  },

  pains: [
    {
      title: "It answers the wrong thing, six times",
      body: "The flow gets stuck on one branch and can't route around it. The customer rage-types BYE before a human ever picks up the thread.",
    },
    {
      title: "A lead at 11pm, a reply on Tuesday",
      body: "They message on a Wednesday night. You answer days later. By then they've already booked with whoever replied first.",
    },
    {
      title: "The handoff drops the whole story",
      body: "Chat lifts to your CRM with no source, no campaign, no conversation history. Sales blames marketing every Monday because nobody can see what actually happened.",
    },
  ],

  comparison: {
    heading: "A trained agent vs a generic chatbot builder.",
    cols: ["", "With me", "Generic chatbot builder / DIY"],
    rows: [
      {
        dimension: "Knowledge base",
        us: "Trained on your actual docs and past conversations, up to 50+ pages, tuned to your voice.",
        them: "A generic prompt with a handful of FAQ pairs pasted in, drifting off-brand fast.",
      },
      {
        dimension: "Channel coverage",
        us: "Web, WhatsApp, and voice wired to the same knowledge base and the same CRM record.",
        them: "Usually one channel; adding a second means starting over in a different tool.",
      },
      {
        dimension: "Handoff to a human",
        us: "Routes to a real person with full context — source, campaign, conversation history intact.",
        them: "Handoff drops context; the human starts the conversation over from zero.",
      },
      {
        dimension: "Pricing",
        us: "Public, fixed tiers. Scope locked in writing within 48 hours of your brief.",
        them: "Per-seat or per-conversation SaaS pricing that scales against you as volume grows.",
      },
      {
        dimension: "What you own",
        us: "The flow logic and prompt library are yours — documented and handed over, not locked behind a vendor login.",
        them: "Configuration lives inside the vendor's platform; cancel and you start from scratch elsewhere.",
      },
    ],
  },

  outcomes: [
    {
      title: "A flow that routes around dead ends",
      body: "Instead of getting stuck on one branch, the agent recognizes when it's out of its depth and hands off cleanly — no more rage-typed BYE.",
      proof: "Clean handoff on unmatched intents",
    },
    {
      title: "Replies inside hours, not days",
      body: "An 11pm message gets a same-window answer instead of waiting for someone to open their inbox Tuesday morning.",
      proof: "8-hour weekday reply guarantee",
    },
    {
      title: "Full context on every handoff",
      body: "Source, campaign, and conversation history travel with the lead into your CRM — sales sees exactly what marketing saw.",
      proof: "Source-tagged CRM handoff",
    },
    {
      title: "Multi-channel from one knowledge base",
      body: "Web chat, WhatsApp, and voice all pull from the same trained knowledge base, so the answer is consistent no matter where someone reaches out.",
      proof: "1 knowledge base, 3 channels",
    },
  ],

  process: [
    {
      title: "Audit",
      body: "I map the intents your current flow actually gets wrong, and the knowledge gaps causing the wrong-answer loop, before writing a single prompt.",
    },
    {
      title: "Build",
      body: "Agent trained on your real docs, wired into your CRM with source tagging, tested against real conversation transcripts before going live.",
    },
    {
      title: "Hand off",
      body: "Conversation analytics dashboard, documented prompt library, and a fix window so an edge-case intent doesn't catch you alone in week one.",
    },
  ],

  toolStack: {
    label: "Tools we use:",
    items: [
      "WhatsApp Business API",
      "Web chat widget",
      "Voice agents",
      "Your CRM",
    ],
  },

  proof: {
    metric: "8h",
    client: "SkynetLabs weekday reply guarantee",
    detail:
      "Every message that lands gets a human-sounding answer inside 8 business hours — the same guarantee applied to the agents built for clients, not just marketing copy.",
  },

  guarantee: {
    title: "Fixed scope before you pay. Fixed for a window after.",
    body: "Scope gets locked in writing within 48 hours of your brief. Every deployed agent carries a post-launch fix window — if an intent gap surfaces in real traffic, I fix it.",
  },

  faqs: [
    {
      q: "Which channel should I start with — web, WhatsApp, or voice?",
      a: "Whichever channel your leads already use. Most clients start with web chat or WhatsApp since they're the fastest to wire into an existing CRM; voice usually comes second once the knowledge base is proven out on text.",
    },
    {
      q: "How long does a deployment take?",
      a: "Starter — a single channel with knowledge-base training up to 50 pages — ships in 5 days. Pro, covering 3 channels plus human handoff routing and CRM integration, runs 10 days.",
    },
    {
      q: "Will it hallucinate answers about my business?",
      a: "It's scoped to answer only from the trained knowledge base and hands off to a human the moment a question falls outside that scope, rather than guessing. That handoff logic is built and tested before launch, not left to chance.",
    },
    {
      q: "Does it integrate with my existing CRM?",
      a: "Yes — GoHighLevel and most major CRMs connect directly, with source and campaign data carried through on every handoff so your sales team isn't starting the conversation over.",
    },
    {
      q: "What happens after launch if it gets a category of question wrong?",
      a: "Every deployment includes conversation analytics and a fix window, so a recurring wrong-answer pattern gets caught and corrected instead of quietly degrading trust in the channel.",
    },
    {
      q: "What does it cost?",
      a: "Public, fixed pricing — see the tiers above. Starter is one channel; Pro is multi-channel with voice and handoff routing; the retainer covers monthly knowledge updates and conversation tuning.",
    },
  ],

  finalCta: {
    h2: "Stop losing leads to a flow that gets stuck.",
    body: "A free 30-minute check-up. I'll review your current flow, name where it's losing people, and have a fixed-scope build plan back within 48 hours.",
    ctaLabel: "Book the check-up",
  },

  freeTools: {
    label: "Try it free first:",
    items: [
      {
        label: "System Prompt Generator",
        href: "/tools/system-prompt-generator",
      },
      { label: "Voice Persona Builder", href: "/tools/voice-persona-builder" },
    ],
  },
};

export default content;
