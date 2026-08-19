import type { ServiceFunnelContent } from "./types";

/**
 * Vibe-Coded Websites — migrated from the bespoke VibeCodedSitesLP component
 * (2026-08-19 thin→rich upgrade) onto the shared <ServiceFunnel/> template.
 * Primary + secondary proof swapped to the two case-studies.ts entries that
 * actually list vibe-coded-sites in relatedServices (bali-wellness-
 * conversion-funnel, premium-auto-dealership-network-demo) — grounded,
 * replacing the prior LP's uncredited "old site to new" claim.
 * Ship windows reconciled to service-pricing.ts (Starter 5-7d / Pro 10-14d).
 */
const content: ServiceFunnelContent = {
  slug: "vibe-coded-sites",
  label: "Vibe-Coded Websites",

  hero: {
    eyebrow: "Development · Bespoke Next.js Builds · 2026",
    h1: "A fast site you own outright, not a template.",
    sub: "Your old site loads slowly on a phone, looks tired, and no developer wants to touch the code. I build bespoke Next.js sites — conversion-tuned, mobile-first, and structured so both search engines and AI answers can actually read them — deployed to Vercel with analytics wired from day one.",
    primary: { label: "Book a free 30-min check-up", href: "/discovery-call" },
    secondary: { label: "See real builds", href: "/case-studies" },
    trust: [
      "Public pricing",
      "9 countries",
      "20+ sites shipped 2025-26",
      "Ship in 5-14 days",
    ],
  },

  pains: [
    {
      title: "A template site from years ago",
      body: "It looks tired and sales are flat. No developer wants to touch the old code, and you don't blame them.",
    },
    {
      title: "The designer vanished mid-rebuild",
      body: "You're left with half a design, a half-finished build, and an invoice from someone who won't reply.",
    },
    {
      title: "It crawls on a phone",
      body: "Pages take seconds to load on mobile. Slow sites get skipped — by buyers, and increasingly by the AI tools summarizing search results too.",
    },
  ],

  comparison: {
    heading: "Me vs the enterprise agency quoting six figures.",
    cols: ["", "With me", "Enterprise agency / template builder"],
    rows: [
      {
        dimension: "Timeline",
        us: "A working demo or flagship site in 5-14 days, deployed to a live preview URL.",
        them: "Six-to-eight week proposal cycles before a build even starts.",
      },
      {
        dimension: "Pricing",
        us: "Public, fixed tiers starting at $2,997. Scope locked in writing within 48 hours of your brief.",
        them: "$80k-150k+ quotes for a comparable multi-page rebuild, often before scope is even fixed.",
      },
      {
        dimension: "Who builds it",
        us: "I design and build every section myself — same person on the brief, the build, and the hand-off call.",
        them: "A sales team scopes it, then a junior team or offshore contractor executes.",
      },
      {
        dimension: "What you own",
        us: "The full Next.js codebase, deployed to your own Vercel account — fork it, extend it, hand it to any developer.",
        them: "Often a proprietary CMS or template license you keep paying to stay on.",
      },
      {
        dimension: "Mobile performance",
        us: "Mobile-first by default — every build is checked on a phone before it's checked on a desktop monitor.",
        them: "Frequently designed desktop-first, with mobile treated as an afterthought.",
      },
    ],
  },

  outcomes: [
    {
      title: "A site built around the objection, not the origin story",
      body: "Every section answers a real question your visitors already ask in DMs or on calls, instead of opening with a founder bio nobody asked for.",
      proof: "Objection-first section structure",
    },
    {
      title: "No account wall on the parts that convert",
      body: "Pricing, availability, or a price-range estimate shown up front — the single most resented pattern on template sites is a forced signup just to see basic information.",
      proof: "Zero forced account walls",
    },
    {
      title: "Fast enough that mobile visitors don't bounce",
      body: "Next.js + Vercel deploy, checked on a phone first, so pages that used to take seconds to load stop losing visitors before they even see the offer.",
      proof: "Mobile-first build discipline",
    },
    {
      title: "A codebase you can hand to any developer",
      body: "No proprietary CMS lock-in — the full Next.js codebase deploys to your own Vercel account, so you're never stuck if I'm unavailable.",
      proof: "Full code ownership",
    },
  ],

  process: [
    {
      title: "Voice intake",
      body: "A short intake session plus real DM/call transcripts to pull the actual objection language your visitors use, before a single section gets designed.",
    },
    {
      title: "Build",
      body: "Bespoke sections built in Next.js, voice-locked copy against how you actually talk, deployed to a live Vercel preview for review as it's built.",
    },
    {
      title: "Cutover",
      body: "301 redirects from the old site's URLs, analytics wired, and a fix window so a launch-week edge case doesn't catch you alone.",
    },
  ],

  toolStack: {
    label: "Tools we use:",
    items: ["Next.js", "Vercel", "Tailwind", "Claude Code"],
  },

  proof: {
    metric: "2x",
    client: "Wellness practitioner, Ubud",
    detail:
      "A five-page brochure site compressed into a single conversion page with embedded scheduling roughly doubled monthly bookings inside 30 days, on the same Instagram traffic she'd had for 8 months. Shipped in 9 days.",
  },

  secondaryProof: {
    metric: "7 days",
    client: "Premium auto dealership network (anonymized)",
    detail:
      "While competing agencies quoted 6-week proposal cycles for a multi-location dealer rebuild, a working speculative demo — no account walls, real-feeling inventory — shipped in 7 days and closed the pitch inside the meeting.",
  },

  guarantee: {
    title: "Fixed scope before you pay. Fixed for a window after.",
    body: "Scope gets locked in writing within 48 hours of your brief. Every build carries a post-launch fix window — if a launch-week edge case breaks, I fix it.",
  },

  faqs: [
    {
      q: "What does 'vibe-coded' actually mean — is this a template?",
      a: "No template. Every section is designed and built for your specific business and objections, using AI-assisted coding tools (Claude Code) to move fast without cutting the bespoke design work. The output is a real, from-scratch Next.js codebase — not a theme with your logo swapped in.",
    },
    {
      q: "How long does a build take?",
      a: "Starter — a 5-section conversion-tuned landing page — ships in 5-7 days. The full flagship build with 10-14 bespoke sections runs 10-14 days.",
    },
    {
      q: "Do I own the code, or does it stay with you?",
      a: "You own it outright. The full Next.js codebase deploys to your own Vercel account under your name, so there's no dependency on me staying available to keep the site running.",
    },
    {
      q: "Can you migrate my existing content and keep my SEO rankings?",
      a: "Yes — existing URLs get 301-redirected to their new equivalents so backlink equity and rankings carry over, rather than resetting to zero on launch day.",
    },
    {
      q: "What if I need a CMS or blog, not just a static landing page?",
      a: "That's a listed add-on — an MDX/CMS blog engine layers on top of the same Next.js build for ongoing content, without needing a separate WordPress install.",
    },
    {
      q: "What does it cost?",
      a: "Public, fixed pricing — see the tiers above. Starter is a 5-section landing page; Pro is the full 10-14 section flagship build; Custom covers multi-page enterprise builds with CRM integration.",
    },
  ],

  finalCta: {
    h2: "Stop paying for a site that loses on a phone.",
    body: "A free 30-minute check-up. I'll review the current site, name what's actually costing you conversions, and have a fixed-scope build plan back within 48 hours.",
    ctaLabel: "Book the check-up",
  },

  freeTools: {
    label: "Try it free first:",
    items: [
      { label: "Before/After Slider", href: "/tools/before-after-slider" },
    ],
  },
};

export default content;
