/**
 * Skynetjoe site config — single source of truth for nav, services, footer, social.
 * Ported from v5.5 WP theme (front-page.php + header.php + footer.php).
 */

/**
 * Asset host used for og:image / twitter:image resolution.
 *
 * Why split from SITE.url:
 *   SITE.url stays "https://skynetjoe.com" so canonicals + structured data
 *   point at the production domain (SEO contract).
 *   But og/twitter images live in /public and only exist at the host that
 *   actually serves them. Until the apex domain is cut over, social
 *   crawlers (Slack, X, LinkedIn) hit the vercel preview host instead.
 *
 * Precedence:
 *   1. NEXT_PUBLIC_SITE_ASSETS_URL (explicit override)
 *   2. NEXT_PUBLIC_VERCEL_URL (auto-set by Vercel — preview + prod)
 *   3. https://skynetjoe.com (final fallback for local dev/build)
 */
function resolveAssetsUrl(): string {
  const override = process.env.NEXT_PUBLIC_SITE_ASSETS_URL;
  if (override) return override.replace(/\/+$/, "");
  const vercel = process.env.NEXT_PUBLIC_VERCEL_URL;
  if (vercel) return `https://${vercel.replace(/\/+$/, "")}`;
  return "https://skynetjoe.com";
}

/**
 * Default Open Graph / Twitter image used by every page that doesn't
 * specify its own. Per Next.js docs, page-level openGraph blocks
 * SHALLOWLY OVERWRITE the root layout's openGraph — so without
 * re-including `images:`, social shares from /pricing, /services,
 * /case-studies, /tools etc. render with no thumbnail. Spread these
 * into the page's openGraph.images (and twitter.images) to inherit.
 *
 * Path is relative; metadataBase in layout.tsx resolves it against
 * SITE.assetsUrl at build time so the final absolute URL is correct.
 */
/**
 * Canonical booking URL — Calendly.
 * Single source of truth. Per-tool UTM appended at call site:
 *   `${CAL_URL}?utm_source=<tool-slug>`
 *   `${CAL_URL}?${bookingQuery}`
 */
export const CAL_URL =
  "https://calendly.com/skynetlabs/schedule-a-free-consultation";

export const DEFAULT_OG_IMAGE_URL = "/og-default.png";
export const DEFAULT_OG_IMAGES = [
  {
    url: DEFAULT_OG_IMAGE_URL,
    width: 1200,
    height: 630,
    alt: "SkynetLabs — AI Automation Agency for Founders Who Refuse to Be Average",
  },
] as const;

/**
 * Build a Twitter Card block that mirrors a page's Open Graph values.
 *
 * Why this exists (M2): page-level `openGraph` blocks SHALLOWLY OVERWRITE the
 * root layout's metadata, but `twitter` is a SEPARATE field. A page that sets
 * `openGraph` but omits `twitter` inherits the root layout's homepage twitter
 * tags — so every subpage shared to X/LinkedIn rendered as the agency homepage.
 * Pass each page's own og title/description (and images) so the X card matches
 * the page. Always `summary_large_image`; images default to DEFAULT_OG_IMAGES
 * so the card always resolves a thumbnail.
 */
export function twitterFromOpenGraph(opts: {
  title: string;
  description: string;
  images?: readonly (string | { url: string })[];
}) {
  const images =
    opts.images && opts.images.length > 0
      ? opts.images.map((img) => (typeof img === "string" ? img : img.url))
      : [DEFAULT_OG_IMAGE_URL];
  return {
    card: "summary_large_image" as const,
    title: opts.title,
    description: opts.description,
    site: "@skynetlabs",
    creator: "@skynetlabs",
    images,
  };
}

export const SITE = {
  name: "SkynetLabs",
  brand: "SkynetLabs",
  // Env-parameterized so Hostinger / future apex flips (waseemnasir.com etc.)
  // can override at build time without code edits. Falls back to skynetjoe.com
  // so local dev + existing Vercel deploys continue to work unchanged.
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN ?? "skynetjoe.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://skynetjoe.com",
  // Asset host for og:image / twitter:image — see resolveAssetsUrl() above.
  assetsUrl: resolveAssetsUrl(),
  founder: "Waseem Nasir",
  founderUrl: "https://www.waseemnasir.com",
  tagline: "AI Automation Agency for Founders Who Refuse to Be Average",
  description:
    "SkynetLabs builds n8n + AI automation, AEO-optimized websites, and chat-first CRM systems for service businesses. Run by Waseem Nasir from Bali.",
  email: "info@skynetjoe.com",
  emailFounder: "info@skynetjoe.com",
  // Single source of truth for the primary conversion CTA. Use SITE.cta.label
  // everywhere a "book" button renders so the funnel speaks ONE verb (was 5
  // competing labels: check-up / audit / apply for a call / book free audit).
  cta: { label: "Book a free 30-min audit", href: "/discovery-call" },
  social: {
    linkedin: "https://www.linkedin.com/in/waseemnasir2k26",
    twitter: "https://x.com/skynetlabs",
    github: "https://github.com/waseemnasir2k26",
    youtube: "https://www.youtube.com/@vibecodewithWASEEMNASIR",
    fiverr: "https://www.fiverr.com/skynetjoellc",
  },
} as const;

export type NavSubItem = { label: string; href: string; desc?: string };
export type NavItem = {
  label: string;
  href: string;
  hasMega?: boolean;
  subItems?: NavSubItem[];
};
/**
 * Free tools — canonical list mirroring `src/app/tools/page.tsx`.
 * Keep in sync when a tool is added/removed.
 */
export const TOOL_LINKS: NavSubItem[] = [
  {
    label: "AI Readiness Score",
    href: "/tools/ai-readiness-score",
    desc: "10 questions, 0-100 score + 4-axis breakdown",
  },
  {
    label: "Agency Stress Quiz",
    href: "/tools/agency-stress-quiz",
    desc: "60-second diagnostic — chill to chaos",
  },
  {
    label: "Automation Gap Analyzer",
    href: "/tools/automation-gap-analyzer",
    desc: "Find where your ops lose time and money",
  },
  {
    label: "Before/After Slider",
    href: "/tools/before-after-slider",
    desc: "Drag to compare manual vs automated",
  },
  {
    label: "Content Calendar",
    href: "/tools/content-calendar",
    desc: "30-day cross-platform post engine",
  },
  {
    label: "Executive Summary Generator",
    href: "/tools/executive-summary-generator",
    desc: "Raw notes → TL;DR, email, deck slide",
  },
  {
    label: "Prompt Library",
    href: "/tools/prompt-library",
    desc: "50 production-tested AI prompts",
  },
  {
    label: "Revenue Calculator",
    href: "/tools/revenue-calculator",
    desc: "What your missed leads cost per month",
  },
  {
    label: "Video Prompt Generator",
    href: "/tools/video-prompt-generator",
    desc: "Runway, Pika, Sora, Veo — side-by-side",
  },
  {
    label: "Voice Persona Builder",
    href: "/tools/voice-persona-builder",
    desc: "AI system prompt in your brand voice",
  },
];

// Restructured from 10 flat items → 6 top-level axes (+ Book-audit CTA in Header).
// Two clean axes: WHAT we do (Services mega) × WHO it's for (By Industry).
// Displaced links (News, Contact, Locations, Case Studies) folded into dropdowns
// so every destination stays reachable. "Home" dropped — logo links home.
export const NAV_PRIMARY: NavItem[] = [
  { label: "Services", href: "/services", hasMega: true },
  {
    // WHO-it's-for axis. Parent is the (previously orphaned) /industries hub.
    label: "By Industry",
    href: "/industries",
    subItems: [
      {
        label: "All industries",
        href: "/industries",
        desc: "Vertical-tuned automation playbooks",
      },
      {
        label: "Dental Clinics",
        href: "/industries/dental-clinics",
        desc: "New-patient capture + recall engine",
      },
      {
        label: "Wellness & Medspas",
        href: "/industries/wellness-spas",
        desc: "Booking AI + reputation engine",
      },
      {
        label: "Freight & Logistics",
        href: "/industries/freight-logistics",
        desc: "Voice dispatch + EDI triage",
      },
      {
        label: "Freight LP — quick demo",
        href: "/lp/freight",
        desc: "AI voice agent — never miss a load",
      },
      {
        label: "Home Services LP",
        href: "/lp/home-services",
        desc: "Never miss a call — HVAC / plumbing",
      },
      {
        label: "FreightOps Dispatch",
        href: "/lp/logistics",
        desc: "Dispatch dashboard for small fleets",
      },
    ],
  },
  {
    label: "Work",
    href: "/portfolio",
    subItems: [
      {
        label: "Recent Projects",
        href: "/portfolio",
        desc: "Live screenshots of every shipped build",
      },
      {
        label: "Case Studies",
        href: "/case-studies",
        desc: "Deep dives — problem, fix, numbers",
      },
      { label: "Locations", href: "/locations", desc: "Service coverage map" },
    ],
  },
  {
    label: "Tools",
    href: "/tools",
    subItems: TOOL_LINKS,
  },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Company",
    href: "/about",
    subItems: [
      {
        label: "About",
        href: "/about",
        desc: "Solo studio, Bali-built, 14-day ship",
      },
      { label: "Latest News", href: "/news", desc: "Field notes + playbooks" },
      { label: "Contact", href: "/contact", desc: "Reach us — 8-hour reply" },
    ],
  },
];

// 16 services across 4 categories (from THEME-SUMMARY.md)
export const SERVICE_CATEGORIES = [
  {
    name: "Automation",
    services: [
      {
        slug: "freightops-logistics",
        label: "FreightOps — Dispatch Canvas",
        icon: "Truck",
        desc: "Site + dispatch + AI voice agent for US small-fleet carriers, 14 days",
        href: "/lp/logistics",
        badge: "NEW",
      },
      {
        slug: "n8n-automation",
        label: "n8n Automation",
        icon: "Bot",
        desc: "Workflow automation that runs while you sleep",
      },
      {
        slug: "gohighlevel",
        label: "GoHighLevel CRM",
        icon: "Target",
        desc: "Full CRM + sales pipeline setup",
      },
      {
        slug: "zapier-make",
        label: "Zapier & Make",
        icon: "Link",
        desc: "Multi-tool connectivity layer",
      },
      {
        slug: "social-automation",
        label: "Social Automation",
        icon: "Smartphone",
        desc: "Auto-post + DM responder stack",
      },
    ],
  },
  {
    name: "AI Content",
    services: [
      {
        slug: "ai-video",
        label: "AI Video Creation",
        icon: "Clapperboard",
        desc: "Reels, shorts, talking-head at scale",
      },
      {
        slug: "youtube-automation",
        label: "YouTube Automation",
        icon: "PlayCircle",
        desc: "Faceless channel pipeline",
      },
      {
        slug: "tiktok-automation",
        label: "TikTok Automation",
        icon: "Music",
        desc: "Daily content engine",
      },
      {
        slug: "facebook-automation",
        label: "Facebook Automation",
        icon: "Users",
        desc: "Page + DM + group reach",
      },
    ],
  },
  {
    name: "Development",
    services: [
      {
        slug: "wordpress-seo",
        label: "WordPress SEO Blog",
        icon: "Globe",
        desc: "AEO-tuned content engine",
      },
      {
        slug: "ecommerce-automation",
        label: "E-commerce Automation",
        icon: "ShoppingCart",
        desc: "Shopify + Stripe + n8n stack",
      },
      {
        slug: "vibe-coded-sites",
        label: "Vibe-Coded Websites",
        icon: "Zap",
        desc: "Custom Next.js builds, 7-day ship",
      },
      {
        slug: "ai-chatbots",
        label: "AI Chatbots",
        icon: "MessageSquare",
        desc: "Live chat + web + voice agents",
      },
    ],
  },
  {
    name: "Consulting",
    services: [
      {
        slug: "ai-business-systems",
        label: "AI Business Systems",
        icon: "Building2",
        desc: "Operator-grade ops blueprint",
      },
      {
        slug: "strategy-training",
        label: "Strategy & Training",
        icon: "BookOpen",
        desc: "Team upskilling + playbooks",
      },
      {
        slug: "branding-design",
        label: "Branding & Design",
        icon: "Palette",
        desc: "Identity + design system",
      },
      {
        slug: "ai-content-creation",
        label: "AI Content Creation",
        icon: "PenTool",
        desc: "Voice-locked content at volume",
      },
    ],
  },
] as const;

export const STATS = [
  { value: "180+", label: "Workflows shipped" },
  { value: "40+", label: "Websites delivered" },
  { value: "9", label: "Countries served" },
  { value: "5–14d", label: "Ship window" },
] as const;

export const BRANDS_TRUSTED = [
  { name: "Fiverr", logo: "fiverr" },
  { name: "Upwork", logo: "upwork" },
  { name: "Payoneer", logo: "payoneer" },
  { name: "PayPal", logo: "paypal" },
  { name: "AWS", logo: "aws" },
  { name: "Azure", logo: "azure" },
  { name: "Cloud Native", logo: "k8s" },
  { name: "Hostinger", logo: "hostinger" },
] as const;

export const FOOTER_COLUMNS = [
  {
    title: "Services",
    links: [
      { label: "n8n Automation", href: "/services/n8n-automation" },
      { label: "GoHighLevel CRM", href: "/services/gohighlevel" },
      { label: "AI Chatbots", href: "/services/ai-chatbots" },
      { label: "WordPress SEO", href: "/services/wordpress-seo" },
      { label: "Vibe-Coded Sites", href: "/services/vibe-coded-sites" },
    ],
  },
  {
    title: "AEO Resources",
    links: [
      { label: "AEO Guide", href: "/aeo-guide" },
      { label: "Glossary", href: "/glossary" },
      { label: "FAQs", href: "/faqs" },
      { label: "n8n vs Zapier", href: "/n8n-vs-zapier" },
      { label: "Case Studies", href: "/case-studies" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Author", href: "/author/waseem-nasir" },
      { label: "Pricing", href: "/pricing" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Latest News", href: "/news" },
      { label: "Journal", href: "/blog" },
    ],
  },
  {
    // Conversion + product links, split out of the old Legal column.
    title: "Get Started",
    links: [
      { label: "Book a free 30-min audit", href: "/discovery-call" },
      { label: "Contact", href: "/contact" },
      { label: "Free Tools", href: "/tools" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
    ],
  },
] as const;
