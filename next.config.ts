import type { NextConfig } from "next";

/**
 * Security headers applied site-wide.
 * Moved here from vercel.json (2026-05-20) so they're picked up consistently
 * across `next dev`, `next start`, and Vercel/standalone deploys.
 */
const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
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
  // ── Service slugs (WP single-page → Next /services/[slug]) ───────────────
  { source: "/n8n-automation", destination: "/services/n8n-automation", permanent: true },
  { source: "/gohighlevel", destination: "/services/gohighlevel", permanent: true },
  { source: "/social-media", destination: "/services/social-automation", permanent: true },
  { source: "/service-ai-business-systems", destination: "/services/ai-business-systems", permanent: true },
  { source: "/whatsapp-business-bot", destination: "/services/ai-chatbots", permanent: true },
  { source: "/n8n-workflow-automation", destination: "/services/n8n-automation", permanent: true },
  { source: "/ai-chatbot-integration", destination: "/services/ai-chatbots", permanent: true },
  { source: "/wordpress-custom-development", destination: "/services/vibe-coded-sites", permanent: true },
  { source: "/shopify-store-build", destination: "/services/ecommerce-automation", permanent: true },
  { source: "/aeo-seo-content-engine", destination: "/services/wordpress-seo", permanent: true },

  // ── AEO-variant service silos (WP) → /aeo-guide hub ──────────────────────
  { source: "/aeo-services", destination: "/aeo-guide", permanent: true },
  { source: "/aeo-audit-optimization", destination: "/aeo-guide", permanent: true },
  { source: "/free-aeo-audit", destination: "/aeo-guide", permanent: true },
  { source: "/chatgpt-visibility", destination: "/aeo-guide", permanent: true },
  { source: "/services/chatgpt-visibility", destination: "/aeo-guide", permanent: true },
  { source: "/claude-seo-agency", destination: "/aeo-guide", permanent: true },
  { source: "/services/claude-seo-agency", destination: "/aeo-guide", permanent: true },
  { source: "/gemini-optimization", destination: "/aeo-guide", permanent: true },
  { source: "/services/gemini-optimization", destination: "/aeo-guide", permanent: true },
  { source: "/perplexity-citation", destination: "/aeo-guide", permanent: true },
  { source: "/services/perplexity-citation", destination: "/aeo-guide", permanent: true },

  // ── AEO blog posts (WP post-sitemap) → /aeo-guide ────────────────────────
  { source: "/aeo-vs-seo", destination: "/aeo-guide", permanent: true },
  { source: "/ai-overviews-seo", destination: "/aeo-guide", permanent: true },
  { source: "/appear-in-gemini-answers", destination: "/aeo-guide", permanent: true },
  { source: "/get-cited-by-claude", destination: "/aeo-guide", permanent: true },
  { source: "/how-to-rank-in-chatgpt", destination: "/aeo-guide", permanent: true },
  { source: "/llmo-vs-geo-vs-aeo", destination: "/aeo-guide", permanent: true },
  { source: "/track-ai-citations", destination: "/aeo-guide", permanent: true },

  // ── Industry-AEO landers → /industries hub ───────────────────────────────
  { source: "/ecommerce-aeo", destination: "/industries", permanent: true },
  { source: "/healthcare-aeo", destination: "/industries/dental-clinics", permanent: true },
  { source: "/law-firm-aeo", destination: "/industries", permanent: true },
  { source: "/real-estate-aeo", destination: "/industries", permanent: true },
  { source: "/saas-aeo", destination: "/industries", permanent: true },

  // ── Vs/comparison silos (WP) → /n8n-vs-zapier or /aeo-guide ──────────────
  { source: "/vs", destination: "/n8n-vs-zapier", permanent: true },
  { source: "/vs/profound", destination: "/n8n-vs-zapier", permanent: true },
  { source: "/vs/athenahq", destination: "/n8n-vs-zapier", permanent: true },
  { source: "/vs/otterly", destination: "/n8n-vs-zapier", permanent: true },
  { source: "/vs-profound", destination: "/n8n-vs-zapier", permanent: true },
  { source: "/citelift-vs-llmrefs", destination: "/n8n-vs-zapier", permanent: true },
  { source: "/citelift-vs-otterly", destination: "/n8n-vs-zapier", permanent: true },

  // ── Portfolio/case-study slugs (WP) → /portfolio or /case-studies ────────
  { source: "/supabase-vercel-saas-mvp", destination: "/portfolio", permanent: true },
  { source: "/manychat-funnel-build", destination: "/portfolio", permanent: true },
  { source: "/gohighlevel-setup", destination: "/case-studies/us-insurance-gohighlevel-rebuild", permanent: true },
  { source: "/conversion-landing-pages", destination: "/portfolio", permanent: true },
  { source: "/real-estate-whatsapp-bot", destination: "/case-studies/bali-wellness-conversion-funnel", permanent: true },
  { source: "/dental-practice-website", destination: "/case-studies/manhattan-dental-atelier-flagship", permanent: true },
  { source: "/wellness-funnel-conversion-sites", destination: "/case-studies/bali-wellness-conversion-funnel", permanent: true },
  { source: "/healthcare-website-compliance", destination: "/industries/dental-clinics", permanent: true },

  // ── Tools / library / variants → /tools or / ─────────────────────────────
  { source: "/ai-tool", destination: "/tools", permanent: true },
  { source: "/prompt-library", destination: "/tools", permanent: true },
  { source: "/skynetlabs-hmp", destination: "/", permanent: true },
  { source: "/h4-quiz-funnel", destination: "/tools/agency-stress-quiz", permanent: true },
  { source: "/h5-comparison-crusher", destination: "/tools/revenue-calculator", permanent: true },
  { source: "/all-variations", destination: "/", permanent: true },
  { source: "/skynetlabs", destination: "/", permanent: true },
  { source: "/launch-pack", destination: "/pricing", permanent: true },
  { source: "/landing", destination: "/", permanent: true },

  // ── Author + category (Yoast WP) ─────────────────────────────────────────
  { source: "/author", destination: "/author/waseem-nasir", permanent: true },
  { source: "/category/ai", destination: "/blog", permanent: true },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return wpRedirects;
  },
};

export default nextConfig;
