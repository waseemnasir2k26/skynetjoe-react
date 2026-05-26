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

export const DEFAULT_OG_IMAGE_URL = "/waseem-portrait.jpg";
export const DEFAULT_OG_IMAGES = [
  {
    url: DEFAULT_OG_IMAGE_URL,
    width: 1200,
    height: 1200,
    alt: "SkynetLabs — AI Automation Agency for Founders Who Refuse to Be Average",
  },
] as const;

export const SITE = {
  name: "SkynetLabs",
  brand: "SkynetLabs",
  domain: "skynetjoe.com",
  url: "https://skynetjoe.com",
  // Asset host for og:image / twitter:image — see resolveAssetsUrl() above.
  assetsUrl: resolveAssetsUrl(),
  founder: "Waseem Nasir",
  founderUrl: "https://www.waseemnasir.com",
  tagline: "AI Automation Agency for Founders Who Refuse to Be Average",
  description:
    "SkynetLabs builds n8n + AI automation, AEO-optimized websites, and chat-first CRM systems for service businesses. Run by Waseem Nasir from Bali.",
  email: "info@skynetjoe.com",
  emailFounder: "waseem@skynetjoe.com",
  social: {
    linkedin: "https://www.linkedin.com/in/waseemnasir2k26",
    twitter: "https://x.com/Skynetjoe1",
    github: "https://github.com/waseemnasir2k26",
    youtube: "https://youtube.com/@skynetlabs",
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
  { label: "AI Readiness Score", href: "/tools/ai-readiness-score", desc: "10 questions, 0-100 score + 4-axis breakdown" },
  { label: "Agency Stress Quiz", href: "/tools/agency-stress-quiz", desc: "60-second diagnostic — chill to chaos" },
  { label: "Automation Gap Analyzer", href: "/tools/automation-gap-analyzer", desc: "Find the biggest leak in your ops" },
  { label: "Before/After Slider", href: "/tools/before-after-slider", desc: "Drag to compare manual vs automated" },
  { label: "Content Calendar", href: "/tools/content-calendar", desc: "30-day cross-platform post engine" },
  { label: "Executive Summary Generator", href: "/tools/executive-summary-generator", desc: "Raw notes → TL;DR, email, deck slide" },
  { label: "Prompt Library", href: "/tools/prompt-library", desc: "50 production-tested AI prompts" },
  { label: "Revenue Calculator", href: "/tools/revenue-calculator", desc: "What your missed leads cost per month" },
  { label: "Video Prompt Generator", href: "/tools/video-prompt-generator", desc: "Runway, Pika, Sora, Veo — side-by-side" },
  { label: "Voice Persona Builder", href: "/tools/voice-persona-builder", desc: "AI system prompt in your brand voice" },
];

export const NAV_PRIMARY: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "Services", href: "/services", hasMega: true },
  {
    label: "Tools",
    href: "/tools",
    subItems: TOOL_LINKS,
  },
  {
    label: "Portfolio",
    href: "/portfolio",
    subItems: [
      { label: "Recent Projects", href: "/portfolio", desc: "Live screenshots of every shipped build" },
      { label: "Case Studies", href: "/case-studies", desc: "Deep dives — problem, fix, numbers" },
      { label: "Locations", href: "/locations", desc: "Service coverage map" },
    ],
  },
  { label: "Latest News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

// 16 services across 4 categories (from THEME-SUMMARY.md)
export const SERVICE_CATEGORIES = [
  {
    name: "Automation",
    services: [
      { slug: "n8n-automation", label: "n8n Automation", icon: "Bot", desc: "Workflow automation that runs while you sleep" },
      { slug: "gohighlevel", label: "GoHighLevel CRM", icon: "Target", desc: "Full CRM + sales pipeline setup" },
      { slug: "zapier-make", label: "Zapier & Make", icon: "Link", desc: "Multi-tool connectivity layer" },
      { slug: "social-automation", label: "Social Automation", icon: "Smartphone", desc: "Auto-post + DM responder stack" },
    ],
  },
  {
    name: "AI Content",
    services: [
      { slug: "ai-video", label: "AI Video Creation", icon: "Clapperboard", desc: "Reels, shorts, talking-head at scale" },
      { slug: "youtube-automation", label: "YouTube Automation", icon: "PlayCircle", desc: "Faceless channel pipeline" },
      { slug: "tiktok-automation", label: "TikTok Automation", icon: "Music", desc: "Daily content engine" },
      { slug: "facebook-automation", label: "Facebook Automation", icon: "Users", desc: "Page + DM + group reach" },
    ],
  },
  {
    name: "Development",
    services: [
      { slug: "wordpress-seo", label: "WordPress SEO Blog", icon: "Globe", desc: "AEO-tuned content engine" },
      { slug: "ecommerce-automation", label: "E-commerce Automation", icon: "ShoppingCart", desc: "Shopify + Stripe + n8n stack" },
      { slug: "vibe-coded-sites", label: "Vibe-Coded Websites", icon: "Zap", desc: "Custom Next.js builds, 7-day ship" },
      { slug: "ai-chatbots", label: "AI Chatbots", icon: "MessageSquare", desc: "Live chat + web + voice agents" },
    ],
  },
  {
    name: "Consulting",
    services: [
      { slug: "ai-business-systems", label: "AI Business Systems", icon: "Building2", desc: "Operator-grade ops blueprint" },
      { slug: "strategy-training", label: "Strategy & Training", icon: "BookOpen", desc: "Team upskilling + playbooks" },
      { slug: "branding-design", label: "Branding & Design", icon: "Palette", desc: "Identity + design system" },
      { slug: "ai-content-creation", label: "AI Content Creation", icon: "PenTool", desc: "Voice-locked content at volume" },
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
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
      { label: "Contact", href: "/contact" },
      { label: "Apply for a call", href: "/discovery-call" },
    ],
  },
] as const;
