import type { NextConfig } from "next";
// Relative import: Next's config loader does not resolve the `@/` alias.
import {
  SIMPLIFY_REDIRECTS,
  KILLED_SERVICES,
} from "./src/lib/simplify-redirects";

/**
 * Security headers applied site-wide.
 * Moved here from vercel.json (2026-05-20) so they're picked up consistently
 * across `next dev`, `next start`, and Vercel/standalone deploys.
 */
/**
 * Content-Security-Policy — shipped as REPORT-ONLY (2026-05-29).
 *
 * Why report-only: the site loads inline GTM/GA4/Meta-Pixel bootstrap scripts
 * plus third-party widgets (Calendly, Payload admin, YouTube embeds). A strict
 * blocking CSP with nonces is high-risk to ship blind — one missed origin and
 * analytics or the Calendly booking widget silently breaks. `*-Report-Only`
 * does NOT block anything; it only emits violation reports, so we can observe
 * what the policy WOULD break in prod before enforcing.
 *
 * Path to enforcement (do NOT skip the report-only soak):
 *   1. Watch browser console / report-uri for violations for a few days.
 *   2. Replace 'unsafe-inline' in script-src with per-request nonces:
 *      generate a nonce in middleware, thread it through <Script nonce=...>
 *      and the GTM/GA/Pixel inline bootstraps, add `'strict-dynamic'`.
 *   3. Once violations are clean, rename this header from
 *      `Content-Security-Policy-Report-Only` → `Content-Security-Policy`.
 *
 * Allowed dependencies baked in below:
 *   - self
 *   - Google Tag Manager / GA4: www.googletagmanager.com,
 *     www.google-analytics.com, *.google-analytics.com
 *   - Meta Pixel: connect.facebook.net, www.facebook.com
 *   - Calendly: assets.calendly.com, calendly.com (script + frame + connect)
 *   - Payload admin: same-origin (covered by 'self')
 *   - Fonts: fonts.gstatic.com (+ fonts.googleapis.com stylesheet)
 *   - Images: data:, https: (broad on purpose for CDN/analytics pixels)
 *   - Frames: Calendly + YouTube (youtube.com, youtube-nocookie.com)
 */
const cspReportOnly = [
  "default-src 'self'",
  // 'unsafe-inline' kept for now because GTM/GA4/Pixel bootstraps are inline.
  // Report-only, so acceptable until nonces land (see header comment above).
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://connect.facebook.net https://assets.calendly.com",
  "style-src 'self' 'unsafe-inline' https://assets.calendly.com https://fonts.googleapis.com",
  "img-src 'self' data: https:",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://connect.facebook.net https://www.facebook.com https://calendly.com https://*.calendly.com https://n8n.skynetjoe.com",
  "frame-src 'self' https://calendly.com https://*.calendly.com https://www.youtube.com https://www.youtube-nocookie.com",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Report-only CSP — observes violations without blocking. See cspReportOnly
  // comment above for the enforcement path (nonces → rename to enforcing).
  { key: "Content-Security-Policy-Report-Only", value: cspReportOnly },
];

/**
 * WordPress → Next.js 301 redirects.
 *
 * Built from the canonical WP sitemap inventory:
 *   - https://skynetjoe.com/sitemap_index.xml
 *   - page-sitemap.xml, post-sitemap.xml, service-sitemap.xml,
 *     category-sitemap.xml
 *
 * Every legacy WP URL with measurable equity or branded-link presence is
 * mapped to its closest semantic Next.js equivalent. Slug-matched pages
 * (about, contact, pricing, blog, etc.) don't need a rule — Next serves them
 * directly. WP trailing-slash URLs (/about/) are 301'd by Next automatically
 * to /about — no per-route work needed.
 *
 * Pages with no Next.js equivalent and zero meaningful equity are routed
 * to the closest topical landing (e.g. AEO-variant pages → /aeo-guide).
 */
const wpRedirects = [
  // ── External: AI portfolio → Google Drive folder ─────────────────────────
  {
    source: "/aiportfolio",
    destination:
      "https://drive.google.com/drive/folders/1g2JV0LktfCHdEK0BFdQsUKpN0K7llIJQ?usp=sharing",
    permanent: false,
  },

  // ── Service slugs (WP single-page → Next /services/[slug]) ───────────────
  {
    source: "/n8n-automation",
    destination: "/services/n8n-automation",
    permanent: true,
  },
  {
    source: "/gohighlevel",
    destination: "/services/gohighlevel",
    permanent: true,
  },
  {
    source: "/social-media",
    destination: "/services/n8n-automation",
    permanent: true,
  },
  {
    source: "/service-ai-business-systems",
    destination: "/services/ai-chatbots",
    permanent: true,
  },
  {
    source: "/whatsapp-business-bot",
    destination: "/services/ai-chatbots",
    permanent: true,
  },
  {
    source: "/n8n-workflow-automation",
    destination: "/services/n8n-automation",
    permanent: true,
  },
  {
    source: "/ai-chatbot-integration",
    destination: "/services/ai-chatbots",
    permanent: true,
  },
  {
    source: "/wordpress-custom-development",
    destination: "/services/vibe-coded-sites",
    permanent: true,
  },
  {
    source: "/shopify-store-build",
    destination: "/services/vibe-coded-sites",
    permanent: true,
  },
  {
    source: "/aeo-seo-content-engine",
    destination: "/services/wordpress-seo",
    permanent: true,
  },

  // ── AEO-variant service silos (WP) → /aeo-guide hub ──────────────────────
  { source: "/aeo-services", destination: "/aeo-guide", permanent: true },
  {
    source: "/aeo-audit-optimization",
    destination: "/aeo-guide",
    permanent: true,
  },
  { source: "/free-aeo-audit", destination: "/aeo-guide", permanent: true },
  { source: "/chatgpt-visibility", destination: "/aeo-guide", permanent: true },
  {
    source: "/services/chatgpt-visibility",
    destination: "/aeo-guide",
    permanent: true,
  },
  { source: "/claude-seo-agency", destination: "/aeo-guide", permanent: true },
  {
    source: "/services/claude-seo-agency",
    destination: "/aeo-guide",
    permanent: true,
  },
  {
    source: "/gemini-optimization",
    destination: "/aeo-guide",
    permanent: true,
  },
  {
    source: "/services/gemini-optimization",
    destination: "/aeo-guide",
    permanent: true,
  },
  {
    source: "/perplexity-citation",
    destination: "/aeo-guide",
    permanent: true,
  },
  {
    source: "/services/perplexity-citation",
    destination: "/aeo-guide",
    permanent: true,
  },

  // ── AEO blog posts (WP post-sitemap) → /aeo-guide ────────────────────────
  { source: "/aeo-vs-seo", destination: "/aeo-guide", permanent: true },
  { source: "/ai-overviews-seo", destination: "/aeo-guide", permanent: true },
  {
    source: "/appear-in-gemini-answers",
    destination: "/aeo-guide",
    permanent: true,
  },
  {
    source: "/get-cited-by-claude",
    destination: "/aeo-guide",
    permanent: true,
  },
  {
    source: "/how-to-rank-in-chatgpt",
    destination: "/aeo-guide",
    permanent: true,
  },
  { source: "/llmo-vs-geo-vs-aeo", destination: "/aeo-guide", permanent: true },
  { source: "/track-ai-citations", destination: "/aeo-guide", permanent: true },

  // ── Industry-AEO landers → /industries hub ───────────────────────────────
  { source: "/ecommerce-aeo", destination: "/industries", permanent: true },
  {
    source: "/healthcare-aeo",
    destination: "/industries/dental-clinics",
    permanent: true,
  },
  { source: "/law-firm-aeo", destination: "/industries", permanent: true },
  { source: "/real-estate-aeo", destination: "/industries", permanent: true },
  { source: "/saas-aeo", destination: "/industries", permanent: true },

  // ── Vs/comparison silos (WP) → /n8n-vs-zapier or /aeo-guide ──────────────
  { source: "/vs", destination: "/n8n-vs-zapier", permanent: true },
  { source: "/vs/profound", destination: "/n8n-vs-zapier", permanent: true },
  { source: "/vs/athenahq", destination: "/n8n-vs-zapier", permanent: true },
  { source: "/vs/otterly", destination: "/n8n-vs-zapier", permanent: true },
  { source: "/vs-profound", destination: "/n8n-vs-zapier", permanent: true },
  {
    source: "/citelift-vs-llmrefs",
    destination: "/n8n-vs-zapier",
    permanent: true,
  },
  {
    source: "/citelift-vs-otterly",
    destination: "/n8n-vs-zapier",
    permanent: true,
  },

  // ── Portfolio/case-study slugs (WP) → /portfolio or /case-studies ────────
  {
    source: "/supabase-vercel-saas-mvp",
    destination: "/portfolio",
    permanent: true,
  },
  {
    source: "/manychat-funnel-build",
    destination: "/portfolio",
    permanent: true,
  },
  {
    source: "/gohighlevel-setup",
    destination: "/case-studies/us-insurance-gohighlevel-rebuild",
    permanent: true,
  },
  {
    source: "/conversion-landing-pages",
    destination: "/portfolio",
    permanent: true,
  },
  {
    source: "/real-estate-whatsapp-bot",
    destination: "/case-studies/bali-wellness-conversion-funnel",
    permanent: true,
  },
  {
    source: "/dental-practice-website",
    destination: "/case-studies/manhattan-dental-atelier-flagship",
    permanent: true,
  },
  {
    source: "/wellness-funnel-conversion-sites",
    destination: "/case-studies/bali-wellness-conversion-funnel",
    permanent: true,
  },
  {
    source: "/healthcare-website-compliance",
    destination: "/industries/dental-clinics",
    permanent: true,
  },

  // ── Tools / library / variants → /tools or / ─────────────────────────────
  { source: "/ai-tool", destination: "/tools", permanent: true },
  {
    source: "/prompt-library",
    destination: "/tools/prompt-library",
    permanent: true,
  },
  { source: "/skynetlabs-hmp", destination: "/", permanent: true },
  {
    source: "/h4-quiz-funnel",
    destination: "/tools/automation-gap-analyzer",
    permanent: true,
  },
  {
    source: "/h5-comparison-crusher",
    destination: "/tools",
    permanent: true,
  },
  { source: "/all-variations", destination: "/", permanent: true },
  { source: "/skynetlabs", destination: "/", permanent: true },
  { source: "/launch-pack", destination: "/pricing", permanent: true },
  { source: "/landing", destination: "/", permanent: true },

  // ── Author + category (Yoast WP) ─────────────────────────────────────────
  { source: "/author", destination: "/author/waseem-nasir", permanent: true },
  { source: "/category/ai", destination: "/blog", permanent: true },

  // ── Legacy/typed paths that 404 → closest live route ─────────────────────
  { source: "/work", destination: "/portfolio", permanent: true },
  { source: "/community", destination: "/", permanent: true },
];

/**
 * Old `/services/<killed-slug>/in/<state>` URLs jump straight to the kept
 * service (one hop). Must precede SIMPLIFY_REDIRECTS, whose generic
 * `/services/:svc/in/:state` → `/services/:svc` rule would otherwise chain
 * through the killed hub. Next matches redirects in array order.
 */
const killedServiceStateRedirects = Object.entries(KILLED_SERVICES).map(
  ([slug, destination]) => ({
    source: `/services/${slug}/in/:state`,
    destination,
    permanent: true as const,
  }),
);

const removedToolRedirects = [
  {
    source: "/tools/ai-readiness-score",
    destination: "/tools/automation-gap-analyzer",
    permanent: true,
  },
  {
    source: "/tools/agency-stress-quiz",
    destination: "/tools/automation-gap-analyzer",
    permanent: true,
  },
  {
    source: "/tools/revenue-calculator",
    destination: "/tools",
    permanent: true,
  },
  {
    source: "/tools/automation-roi-by-industry",
    destination: "/tools",
    permanent: true,
  },
];

const nextConfig: NextConfig = {
  // Produces .next/standalone/server.js for smaller cold-boot on
  // Hostinger Node.js Web Apps (and any non-Vercel host).
  output: "standalone",
  experimental: {
    // Enables src/app/global-not-found.tsx — the branded 404 for URLs that
    // match no route. Required because the root layout lives in the (skynet)
    // route group, so a root-level not-found.tsx has no layout to render into
    // and unmatched URLs fell through to Next's built-in bare 404.
    globalNotFound: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      ...wpRedirects,
      ...killedServiceStateRedirects,
      ...SIMPLIFY_REDIRECTS,
      ...removedToolRedirects,
    ];
  },
};

// Payload CMS removed 2026-05-29 — site is fully data-file/MDX driven, no DB.
export default nextConfig;
