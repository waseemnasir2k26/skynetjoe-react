import type { NextConfig } from "next";
import { STATES } from "./src/lib/states";
import { SERVICE_CATEGORIES } from "./src/lib/site";
import { PRIORITY_STATE_SLUGS } from "./src/data/state-priority";

/**
 * Inline mirror of `isServiceStateIndexable` from src/lib/sitemap-quality.ts.
 *
 * Why duplicated: next.config.ts is transpiled by Next's config loader which
 * does NOT resolve the `@/` path alias. Importing sitemap-quality directly
 * would transitively pull in `@/data/service-state-enrichment` and fail at
 * build time with `Cannot find module './src/data/service-state-enrichment'`.
 *
 * The full scorer is generous on purpose (every state earns +20 for existing
 * and +20 for having 3+ industries). With the current data, the score
 * passes the 60 threshold iff the state is a priority state. So inlining
 * `priorityStateSet.has(stateSlug)` gives the same 128 indexable cells
 * (16 services x 8 priority states) as the full scorer.
 *
 * If non-priority cells later get enrichment (and thus +40), update this
 * mirror to also check that enrichment map.
 */
const priorityStateSet = new Set<string>(PRIORITY_STATE_SLUGS);
function isIndexableHere(_serviceSlug: string, stateSlug: string): boolean {
  return priorityStateSet.has(stateSlug);
}

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

/**
 * Programmatic 301s for the 640 killed (svc × state) cells.
 *
 * Background — Option A SEO cleanup (2026-05-26):
 *   We previously built 16 services × 48 states = 768 programmatic pages.
 *   Only the 128 priority-state cells (CA/TX/NY/FL/IL/PA/OH/GA × all 16
 *   services) had hand-written enrichment and qualified as indexable.
 *   The other 640 shipped as `noindex,follow` thin-content templates.
 *
 *   Option A killed the 640 from generateStaticParams (they now 404 instead
 *   of noindex). To avoid leaking real users + lingering Googlebot to a
 *   dead 404, every killed URL now 301-redirects to its parent service
 *   page (which IS indexable and covers the full national audience).
 *
 *   - User UX: lands on real service content instead of "page not found"
 *   - SEO: 301 transfers any earned PageRank to the parent
 *   - Crawl: Google deindexes the 640 child URLs and consolidates on parents
 *
 *   Same source-of-truth as generateStaticParams + sitemap:
 *   src/lib/sitemap-quality.ts `isServiceStateIndexable`. When a cell
 *   gets enrichment added later, it automatically drops out of the
 *   redirect list AND appears in generateStaticParams + sitemap.
 */
const killedServiceStateRedirects = SERVICE_CATEGORIES.flatMap((cat) =>
  cat.services.flatMap((svc) =>
    STATES.filter((s) => !isIndexableHere(svc.slug, s.slug)).map((s) => ({
      source: `/services/${svc.slug}/in/${s.slug}`,
      destination: `/services/${svc.slug}`,
      permanent: true as const,
    })),
  ),
);

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
    return [...wpRedirects, ...killedServiceStateRedirects];
  },
};

export default nextConfig;
