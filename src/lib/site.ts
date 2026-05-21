/**
 * Skynetjoe site config — single source of truth for nav, services, footer, social.
 * Ported from v5.5 WP theme (front-page.php + header.php + footer.php).
 */

export const SITE = {
  name: "SkynetLabs",
  brand: "SkynetLabs",
  domain: "skynetjoe.com",
  url: "https://skynetjoe.com",
  founder: "Waseem Nasir",
  founderUrl: "https://www.waseemnasir.com",
  tagline: "AI Automation Agency for Founders Who Refuse to Be Average",
  description:
    "SkynetLabs builds n8n + AI automation, AEO-optimized websites, and WhatsApp/CRM systems for service businesses. Run by Waseem Nasir from Bali.",
  email: "info@skynetjoe.com",
  emailFounder: "waseem@skynetjoe.com",
  whatsapp: "+923001001957",
  social: {
    linkedin: "https://www.linkedin.com/in/waseemnasir2k26",
    twitter: "https://x.com/Skynetjoe1",
    github: "https://github.com/waseemnasir2k26",
    youtube: "https://youtube.com/@skynetlabs",
    fiverr: "https://www.fiverr.com/skynetjoellc",
  },
} as const;

export type NavItem = { label: string; href: string; hasMega?: boolean };
export const NAV_PRIMARY: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", hasMega: true },
  { label: "Locations", href: "/locations" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
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
      { slug: "ai-chatbots", label: "AI Chatbots", icon: "MessageSquare", desc: "WhatsApp + web + voice agents" },
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
