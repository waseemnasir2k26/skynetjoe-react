/**
 * Skynetjoe site config — single source of truth for nav, services, footer, social.
 * Ported from v5.5 WP theme (front-page.php + header.php + footer.php).
 */

// Relative import (not "@/…") — next.config.ts imports SITE/NAV_PRIMARY
// directly and its config loader does NOT resolve the `@/` path alias
// (see next.config.ts comment above the `isIndexableHere` mirror). Using
// "@/data/tools-registry" here would break `next build`/`next dev` config
// loading with "Cannot find module".
import { TOOLS_REGISTRY } from "../data/tools-registry";

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
    alt: "SkynetLabs — AI Automation & AEO Agency for Service Businesses",
  },
] as const;

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
  tagline: "AI Automation & AEO Agency for Service Businesses",
  description:
    "SkynetLabs builds n8n + AI automation, AEO-optimized websites, and chat-first CRM systems for service businesses. Run by Waseem Nasir from Bali.",
  email: "info@skynetjoe.com",
  emailFounder: "info@skynetjoe.com",
  social: {
    linkedin: "https://www.linkedin.com/in/waseemnasir2k26",
    twitter: "https://x.com/Skynetjoe1",
    github: "https://github.com/waseemnasir2k26",
    youtube: "https://www.youtube.com/@vibecodewithWASEEMNASIR",
    fiverr: "https://www.fiverr.com/skynetjoellc",
  },
} as const;

export type NavSubItem = { label: string; href: string; desc?: string };
export type NavItem = { label: string; href: string };
/**
 * Free tools — canonical list mirroring `src/data/tools-registry.ts`
 * (TOOLS_REGISTRY). Consumed by the footer ToolsStrip / tools index.
 * TOOLS_REGISTRY is the source of truth — never hand-edit this list.
 */
export const TOOL_LINKS: NavSubItem[] = TOOLS_REGISTRY.map((t) => ({
  label: t.name,
  href: `/tools/${t.slug}`,
  desc: t.oneLiner,
}));

/**
 * 2026-09-21 simplification: flat six-item nav, no mega menus, no dropdowns.
 * Header CTA ("Book a call" → /contact) lives in Header.tsx.
 */
export const NAV_PRIMARY: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/portfolio" },
  { label: "Tools", href: "/tools" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

/** Header / mobile-drawer CTA. */
export const NAV_CTA = { label: "Book a call", href: "/contact" } as const;
// WhatsApp CTA in the header (Waseem, 2026-09-21). E.164 without "+" for wa.me.
export const WHATSAPP = {
  number: "6281316077185",
  display: "+62 813-1607-7185",
  label: "WhatsApp",
  href: "https://wa.me/6281316077185?text=Hi%20Waseem%2C%20I%27m%20reaching%20out%20from%20skynetjoe.com",
} as const;

// 5 core services, one category (2026-09-21 simplification — the 11
// non-core slugs 301 via src/lib/simplify-redirects.ts).
export const SERVICE_CATEGORIES = [
  {
    name: "Services",
    services: [
      {
        slug: "n8n-automation",
        label: "n8n Automation",
        icon: "Bot",
        desc: "Workflow automation that runs while you sleep",
      },
      {
        slug: "ai-chatbots",
        label: "AI Chatbots",
        icon: "MessageSquare",
        desc: "Live chat + web + voice agents",
      },
      {
        slug: "gohighlevel",
        label: "GoHighLevel CRM",
        icon: "Target",
        desc: "Full CRM + sales pipeline setup",
      },
      {
        slug: "vibe-coded-sites",
        label: "Vibe-Coded Websites",
        icon: "Zap",
        desc: "Custom Next.js builds, 7-day ship",
      },
      {
        slug: "wordpress-seo",
        label: "WordPress SEO Blog",
        icon: "Globe",
        desc: "AEO-tuned content engine",
      },
    ],
  },
] as const;

/** Flat list of the 5 core services. */
export const SERVICES = SERVICE_CATEGORIES.flatMap((c) => c.services);

/**
 * Resolves the click-through href for a service tile. Every core service
 * routes to `/services/[slug]`; an explicit `href` (none today) wins.
 */
export function svcHref(svc: { slug: string; href?: string }): string {
  return svc.href && typeof svc.href === "string"
    ? svc.href
    : `/services/${svc.slug}`;
}

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
      { label: "AI Chatbots", href: "/services/ai-chatbots" },
      { label: "GoHighLevel CRM", href: "/services/gohighlevel" },
      { label: "Vibe-Coded Sites", href: "/services/vibe-coded-sites" },
      { label: "WordPress SEO", href: "/services/wordpress-seo" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "AEO Guide", href: "/aeo-guide" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Blog", href: "/blog" },
      { label: "Free Tools", href: "/tools" },
      { label: "FAQs", href: "/faqs" },
      { label: "Glossary", href: "/glossary" },
      {
        label: "5 Boring Automations",
        href: "/boring-automations-small-businesses-pay-for",
      },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
      { label: "Author", href: "/author/waseem-nasir" },
    ],
  },
] as const;

/** Rendered on the footer bottom line, next to the copyright. */
export const FOOTER_LEGAL = [
  { label: "Privacy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms-of-service" },
] as const;

// ── Metadata length helpers (2026-09-06 SEO pass) ────────────────────────────
// Live audit found 166/233 rendered <title> over 60 chars (max 99) and
// 174/233 meta descriptions over 160 (services ran 287-309). Google truncates
// both, so the tail is wasted and the useful words fall off screen.
//
// `title.template` in (skynet)/layout.tsx appends " | SkynetLabs" (13 chars),
// so a PAGE title has 60 - 13 = 47 chars to work with. Anything a page passes
// as `title` should go through pageTitle().
//
// Both helpers cut at a boundary, never mid-word, and never append an
// ellipsis (a truncated marker in a SERP reads worse than a shorter phrase).

export const TITLE_SUFFIX_CHARS = ` | ${"SkynetLabs"}`.length; // 13
export const MAX_TITLE_CHARS = 60;
export const MAX_PAGE_TITLE_CHARS = MAX_TITLE_CHARS - TITLE_SUFFIX_CHARS; // 47
export const MAX_DESCRIPTION_CHARS = 155;

/** Separators we prefer to cut at, longest-first. */
const CUT_POINTS = [" — ", " – ", " · ", " | ", ": ", ", ", " - "];

/** Tidy a truncated fragment: no unclosed bracket, no dangling connector. */
function tidyFragment(fragment: string): string {
  let out = fragment.replace(/[\s.,;:|·—–-]+$/, "");
  const opens = (out.match(/\(/g) ?? []).length;
  const closes = (out.match(/\)/g) ?? []).length;
  if (opens > closes) out = out.slice(0, out.lastIndexOf("(")).trim();
  const dangling =
    /\s+(?:with|and|or|for|to|in|on|of|the|a|an|by|from|at|into|plus|vs|&|\+)$/i;
  while (dangling.test(out)) out = out.replace(dangling, "");
  return out.replace(/[\s.,;:|·—–-]+$/, "");
}

function clampAtBoundary(input: string, max: number): string {
  const text = input.trim().replace(/\s+/g, " ");
  if (text.length <= max) return text;

  // 1. Prefer the last separator that still fits — keeps a whole clause.
  let best = -1;
  for (const sep of CUT_POINTS) {
    let i = text.indexOf(sep);
    while (i !== -1) {
      if (i > 0 && i <= max) best = Math.max(best, i);
      i = text.indexOf(sep, i + 1);
    }
  }
  if (best > max * 0.5) return tidyFragment(text.slice(0, best));

  // 2. Otherwise cut at the last whole word, then tidy the fragment.
  const hard = text.slice(0, max);
  const space = hard.lastIndexOf(" ");
  return tidyFragment(space > 0 ? hard.slice(0, space) : hard);
}

/**
 * Normalise a page title: drop any hardcoded brand suffix (the layout template
 * adds exactly one) and clamp to the per-page budget.
 * `pageTitle("Foo — Bar | SkynetLabs")` -> `"Foo — Bar"`.
 */
export function pageTitle(title: string, max = MAX_PAGE_TITLE_CHARS): string {
  const deBranded = title
    .replace(/\s*[|·—–-]\s*SkynetLabs\s*$/i, "")
    .replace(/\s*[|·—–-]\s*SkynetJoe\s*$/i, "")
    .replace(/\s*[|·—–-]\s*SkynetLabs\s*$/i, "") // handles a doubled suffix
    .trim();
  return clampAtBoundary(deBranded, max);
}

/** Clamp a meta description to what Google will actually render. */
export function pageDescription(
  description: string,
  max = MAX_DESCRIPTION_CHARS,
): string {
  return clampAtBoundary(description, max);
}
