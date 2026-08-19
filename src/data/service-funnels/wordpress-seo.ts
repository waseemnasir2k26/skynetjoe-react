import type { ServiceFunnelContent } from "./types";

/**
 * WordPress SEO Blog — migrated from the bespoke WordpressSeoLP component
 * (2026-08-19 thin→rich upgrade) onto the shared <ServiceFunnel/> template.
 * Proof metric ("640 thin pages merged/redirected, Spanish learning
 * platform") carried over unchanged from the prior LP — already-live copy,
 * not a new claim. Ship windows reconciled to service-pricing.ts
 * (Starter 7d / Pro 10-14d).
 */
const content: ServiceFunnelContent = {
  slug: "wordpress-seo",
  label: "WordPress SEO Blog",

  hero: {
    eyebrow: "Development · WordPress SEO · 2026",
    h1: "Content that AI answers actually cite.",
    sub: "Search now answers the question on the page — and today the credit goes to the business next door. I rebuild the site's structured data, merge the thin pages dragging you down, and write AEO-tuned content built to get cited by Claude, GPT, and Perplexity, not just ranked by Google.",
    primary: { label: "Book a free 30-min check-up", href: "/discovery-call" },
    secondary: { label: "Run a free AEO audit", href: "/tools/aeo-audit" },
    trust: ["Public pricing", "9 countries", "AEO-tuned", "Ship in 7-14 days"],
  },

  pains: [
    {
      title: "Hundreds of thin pages dragging you down",
      body: "An old playbook left you with a pile of one-paragraph pages that have weighed on crawl budget and rankings for years.",
    },
    {
      title: "The AI answer names a competitor",
      body: "Search now answers your question directly on the results page — and the citation goes to the business next door because your structured data doesn't tell it who you are.",
    },
    {
      title: "Your markup quietly broke",
      body: "No rich results in months. The schema markup has been silently invalid since a past migration, and nobody noticed because nothing throws an error.",
    },
  ],

  comparison: {
    heading: "Me vs a generic SEO agency retainer.",
    cols: ["", "With me", "Typical SEO agency / DIY"],
    rows: [
      {
        dimension: "What gets optimized for",
        us: "Both classic search rankings and AI-answer citation — schema, llms.txt, and AEO structure built in from the start.",
        them: "Classic keyword SEO only; most agencies haven't touched AEO/AI-citation structure yet.",
      },
      {
        dimension: "Thin content",
        us: "Audited and merged or redirected into stronger hub pages instead of left to drag the whole site down.",
        them: "Usually ignored — more content gets published on top of the thin pages instead of consolidating them.",
      },
      {
        dimension: "Pricing",
        us: "Public, fixed tiers. Scope locked in writing within 48 hours of your brief.",
        them: "Open-ended monthly retainer with vague deliverables and no fixed scope.",
      },
      {
        dimension: "Structured data",
        us: "Schema markup validated and monitored, not set once and forgotten.",
        them: "Set up once at onboarding, rarely re-checked after a site migration silently breaks it.",
      },
      {
        dimension: "What you own",
        us: "The content, the schema, and the site structure — no dependency on the agency to keep publishing.",
        them: "Ongoing dependency on the retainer continuing indefinitely for the content pipeline to keep running.",
      },
    ],
  },

  outcomes: [
    {
      title: "Crawl budget back where it belongs",
      body: "Thin pages merged or redirected into stronger hub content, so search engines spend their crawl budget on pages that actually rank instead of the long tail of thin ones.",
      proof: "Thin-page consolidation",
    },
    {
      title: "Structured data that actually validates",
      body: "Schema markup rebuilt and checked, not just set once and left to silently break on the next migration.",
      proof: "Valid schema across templates",
    },
    {
      title: "Content built to get cited, not just ranked",
      body: "Articles structured with the direct-answer format AI engines pull from, plus an llms.txt file so AI crawlers can find and parse the site cleanly.",
      proof: "AEO-tuned article structure",
    },
    {
      title: "A publishing engine, not a one-off project",
      body: "An auto-publishing pipeline and internal linking strategy that keeps producing after the initial rebuild, instead of stalling once the contract ends.",
      proof: "Auto-publishing pipeline",
    },
  ],

  process: [
    {
      title: "Audit",
      body: "I map every thin page, broken schema instance, and content gap against what AI engines are actually citing in your space before touching anything.",
    },
    {
      title: "Build",
      body: "Site rebuild or theme setup, thin-page consolidation, schema markup, and the first batch of AEO-tuned long-form articles.",
    },
    {
      title: "Hand off",
      body: "GSC monitoring setup, internal linking strategy documented, and a fix window so a post-launch indexing issue doesn't catch you alone.",
    },
  ],

  toolStack: {
    label: "Tools we use:",
    items: [
      "WordPress",
      "Schema.org structured data",
      "llms.txt",
      "Google Search Console",
    ],
  },

  proof: {
    metric: "640",
    client: "Spanish learning platform — sitewide rebuild",
    detail:
      "Thin pages merged or redirected to stronger hub pages on a sitewide rebuild — crawl budget recovered, and AI-generated answers began naming the brand instead of a competitor.",
  },

  guarantee: {
    title: "Fixed scope before you pay. Fixed for a window after.",
    body: "Scope gets locked in writing within 48 hours of your brief. Every rebuild carries a post-launch fix window — if an indexing issue or schema error surfaces, I fix it.",
  },

  faqs: [
    {
      q: "What's AEO, and why does it matter now?",
      a: "AEO — answer engine optimization — is structuring content so AI tools like Claude, ChatGPT, and Perplexity can parse and cite it directly, not just index it for a search results list. Traffic increasingly arrives as a citation inside an AI answer rather than a blue link click, and most sites aren't structured for that yet.",
    },
    {
      q: "Do you also do classic SEO, or only AEO?",
      a: "Both — they share the same foundation. Clean schema, fast pages, and genuinely useful long-form content rank in classic search and get cited in AI answers. The AEO layer adds direct-answer structuring and an llms.txt file on top of solid classic SEO, not instead of it.",
    },
    {
      q: "I have hundreds of old thin pages — do you delete them?",
      a: "Rarely deleted outright. Most get merged into a stronger hub page with a 301 redirect, so any existing backlink equity and rankings carry over instead of being lost.",
    },
    {
      q: "How long does a rebuild take?",
      a: "Starter — site rebuild plus 10 long-form articles — ships in 7 days. The full Pro engine with 30 AEO-tuned articles and an auto-publishing pipeline runs 10-14 days.",
    },
    {
      q: "Will this work on my existing WordPress theme, or do I need a rebuild?",
      a: "Depends on the audit. Some sites just need the schema, thin-page consolidation, and content layer fixed; others have a theme so dated it's worth a rebuild. That gets scoped honestly on the call, not upsold by default.",
    },
    {
      q: "What does it cost?",
      a: "Public, fixed pricing — see the tiers above. Starter is a site setup plus 10 articles; Pro is the full 30-article engine with automation; the retainer covers 10 AEO-tuned articles a month on autopilot.",
    },
  ],

  finalCta: {
    h2: "Stop losing the citation to the business next door.",
    body: "A free 30-minute check-up. I'll audit the thin pages, the schema, and the AEO gaps, and have a fixed-scope plan back within 48 hours.",
    ctaLabel: "Book the check-up",
  },

  freeTools: {
    label: "Try it free first:",
    items: [
      { label: "AEO Audit", href: "/tools/aeo-audit" },
      {
        label: "Schema Markup Generator",
        href: "/tools/schema-markup-generator",
      },
      { label: "llms.txt Generator", href: "/tools/llms-txt-generator" },
    ],
  },
};

export default content;
