/**
 * Per-service pricing — drives the tabbed service pricing block + calculator
 * on /pricing. 5 core services × 3 tiers each, plus per-service addons
 * (2026-09-21: trimmed from 16 with the site simplification).
 *
 * Pricing calibrated to existing top-of-page tiers (Starter $1,497 / Flagship
 * $9,500 / Retainer $1,997/mo) and SERVICE_CATEGORIES in @/lib/site.
 */

export type ServiceTier = {
  name: "Starter" | "Pro" | "Custom";
  price: number;
  cadence?: "one-time" | "monthly";
  ship: string;
  tagline: string;
  features: string[];
  badge?: "Most picked" | "Best value";
  ctaLabel: string;
  ctaHref: string;
};

export type ServiceAddon = {
  id: string;
  label: string;
  price: number;
  cadence?: "one-time" | "monthly";
};

export type ServicePricing = {
  slug: string;
  label: string;
  category: "Automation" | "AI Content" | "Development" | "Consulting";
  icon: string;
  tagline: string;
  tiers: ServiceTier[];
  addons: ServiceAddon[];
};

const stdAddons: ServiceAddon[] = [
  { id: "rush", label: "Rush 50% (cut ship in half)", price: 750 },
  { id: "revisions", label: "Extra round of revisions", price: 250 },
  { id: "loom-handover", label: "Recorded Loom team handover", price: 250 },
];

export const SERVICE_PRICING: ServicePricing[] = [
  {
    slug: "n8n-automation",
    label: "n8n Automation",
    category: "Automation",
    icon: "Bot",
    tagline: "Self-hosted workflows that replace 3-5 paid SaaS tools.",
    tiers: [
      {
        name: "Starter",
        price: 1497,
        cadence: "one-time",
        ship: "5 days",
        tagline: "One workflow, one trigger, one outcome.",
        features: [
          "1 production workflow (up to 12 nodes)",
          "n8n cloud or self-hosted setup",
          "Error-handling + Slack notifier",
          "Loom walkthrough",
        ],
        ctaLabel: "Start a flow",
        ctaHref: "/contact",
      },
      {
        name: "Pro",
        price: 5000,
        cadence: "one-time",
        ship: "10-14 days",
        tagline: "Multi-system pipeline replacing a stack.",
        features: [
          "Up to 3 connected workflows",
          "AI nodes (OpenAI / Claude / Gemini) wired in",
          "PostgreSQL log + audit trail",
          "Team SOP + 2 rounds of revisions",
        ],
        badge: "Most picked",
        ctaLabel: "Book Pro build",
        ctaHref: "/contact",
      },
      {
        name: "Custom",
        price: 1997,
        cadence: "monthly",
        ship: "Ongoing",
        tagline: "Retainer for live ops + iteration.",
        features: [
          "Unlimited small flow tweaks",
          "1 new flow / mo (up to 15 nodes)",
          "Monitoring + alerting",
          "Monthly review call",
        ],
        ctaLabel: "Retainer call",
        ctaHref: "/contact",
      },
    ],
    addons: [
      ...stdAddons,
      { id: "self-host-vps", label: "Self-host on your VPS (setup + harden)", price: 750 },
    ],
  },
  {
    slug: "gohighlevel",
    label: "GoHighLevel CRM",
    category: "Automation",
    icon: "Target",
    tagline: "Full GHL rebuilds — pipelines, funnels, automations.",
    tiers: [
      {
        name: "Starter",
        price: 1497,
        cadence: "one-time",
        ship: "5-7 days",
        tagline: "Account setup + 1 funnel + pipeline.",
        features: [
          "GHL onboarding + brand setup",
          "1 funnel (3-5 steps) + thank-you",
          "5-stage sales pipeline",
          "SMS + email template starter pack",
        ],
        ctaLabel: "Get Starter",
        ctaHref: "/contact",
      },
      {
        name: "Pro",
        price: 4500,
        cadence: "one-time",
        ship: "10-14 days",
        tagline: "Full ops rebuild — funnels, cadences, automations.",
        features: [
          "Up to 3 funnels + 5 automations",
          "Pipeline forensic + rebuild",
          "Calendly migration + SMS workflows",
          "Loom team SOP",
        ],
        badge: "Most picked",
        ctaLabel: "Book Pro rebuild",
        ctaHref: "/contact",
      },
      {
        name: "Custom",
        price: 1497,
        cadence: "monthly",
        ship: "Ongoing",
        tagline: "Monthly retainer for live ops.",
        features: [
          "Monthly funnel/automation edits",
          "New campaign + cadence per quarter",
          "Reporting dashboard",
          "Quarterly strategy call",
        ],
        ctaLabel: "Retainer call",
        ctaHref: "/contact",
      },
    ],
    addons: stdAddons,
  },
  {
    slug: "wordpress-seo",
    label: "WordPress SEO Blog",
    category: "Development",
    icon: "Globe",
    tagline: "AEO-tuned content engine that gets cited by Claude/GPT.",
    tiers: [
      {
        name: "Starter",
        price: 1997,
        cadence: "one-time",
        ship: "7 days",
        tagline: "Site rebuild + 10 SEO articles.",
        features: ["WP theme setup or rebuild", "10 long-form articles (1500w+)", "Schema + sitemap + AEO blocks"],
        ctaLabel: "Get Starter",
        ctaHref: "/contact",
      },
      {
        name: "Pro",
        price: 5997,
        cadence: "one-time",
        ship: "10-14 days",
        tagline: "Full engine — 30 posts + automation.",
        features: ["30 AEO-tuned articles", "Auto-publishing pipeline", "Internal linking strategy", "GSC monitoring setup"],
        badge: "Most picked",
        ctaLabel: "Book Pro",
        ctaHref: "/contact",
      },
      {
        name: "Custom",
        price: 1997,
        cadence: "monthly",
        ship: "Ongoing",
        tagline: "10 articles/mo on autopilot.",
        features: ["10 articles/mo (AEO-tuned)", "Keyword research", "Monthly SEO report"],
        ctaLabel: "Retainer call",
        ctaHref: "/contact",
      },
    ],
    addons: stdAddons,
  },
  {
    slug: "vibe-coded-sites",
    label: "Vibe-Coded Websites",
    category: "Development",
    icon: "Zap",
    tagline: "Bespoke Next.js builds — flagship, not template.",
    tiers: [
      {
        name: "Starter",
        price: 2997,
        cadence: "one-time",
        ship: "5-7 days",
        tagline: "5-section landing page, conversion-tuned.",
        features: ["5 bespoke sections", "Mobile-first responsive", "Vercel deploy + analytics"],
        ctaLabel: "Get Starter",
        ctaHref: "/contact",
      },
      {
        name: "Pro",
        price: 9500,
        cadence: "one-time",
        ship: "10-14 days",
        tagline: "Full flagship site (10-14 sections).",
        features: ["10-14 bespoke sections", "SEO + AEO base layer", "CMS or static content", "Conversion funnel wired"],
        badge: "Most picked",
        ctaLabel: "Book Flagship",
        ctaHref: "/contact",
      },
      {
        name: "Custom",
        price: 14500,
        cadence: "one-time",
        ship: "14-21 days",
        tagline: "Multi-page enterprise build.",
        features: ["Unlimited sections", "Custom integrations", "GHL/CRM wired", "Stakeholder review rounds"],
        ctaLabel: "Talk scope",
        ctaHref: "/contact",
      },
    ],
    addons: [
      ...stdAddons,
      { id: "blog-engine", label: "Add MDX/CMS blog engine", price: 1500 },
      { id: "i18n", label: "Bilingual / i18n setup", price: 1200 },
    ],
  },
  {
    slug: "ai-chatbots",
    label: "AI Chatbots",
    category: "Development",
    icon: "MessageSquare",
    tagline: "Live chat + web + voice agents that close leads.",
    tiers: [
      {
        name: "Starter",
        price: 1497,
        cadence: "one-time",
        ship: "5 days",
        tagline: "WhatsApp or web chat — single channel.",
        features: ["1 channel deployment", "Knowledge base training (up to 50 pages)", "Lead capture wired"],
        ctaLabel: "Get Starter",
        ctaHref: "/contact",
      },
      {
        name: "Pro",
        price: 4500,
        cadence: "one-time",
        ship: "10 days",
        tagline: "Multi-channel + voice + handoff.",
        features: ["3 channels (web + WA + voice)", "Human handoff routing", "GHL/CRM integration", "Conversation analytics"],
        badge: "Most picked",
        ctaLabel: "Book Pro",
        ctaHref: "/contact",
      },
      {
        name: "Custom",
        price: 1497,
        cadence: "monthly",
        ship: "Ongoing",
        tagline: "Retainer — training + iteration.",
        features: ["Monthly knowledge updates", "Conversation review + tuning", "New intent flows"],
        ctaLabel: "Retainer call",
        ctaHref: "/contact",
      },
    ],
    addons: stdAddons,
  },
];

// Only categories that still have a service — derived so a pricing tab can
// never point at an empty list.
export const CATEGORIES = Array.from(
  new Set(SERVICE_PRICING.map((s) => s.category)),
) as ServicePricing["category"][];

export function servicesByCategory(category: (typeof CATEGORIES)[number]) {
  return SERVICE_PRICING.filter((s) => s.category === category);
}

export function findServicePricing(slug: string) {
  return SERVICE_PRICING.find((s) => s.slug === slug);
}
