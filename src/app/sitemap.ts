import type { MetadataRoute } from "next";
import { SITE, SERVICE_CATEGORIES } from "@/lib/site";
import { STATES } from "@/lib/states";
import { POSTS } from "@/lib/posts";
import { NEWS } from "@/lib/news";
import { INDUSTRIES } from "@/data/industries";
import { CASE_STUDIES } from "@/lib/case-studies";
import {
  isCaseStudyIndexable,
  isIndustryIndexable,
  isPostIndexable,
  isNewsIndexable,
  isLocationIndexable,
} from "@/lib/sitemap-quality";

// Stable lastModified for routes with no per-page content date (static pages,
// service/location/case-study/industry landers). Previously these used
// `new Date()`, so every regeneration stamped unchanged pages as freshly
// modified — a weak/noisy freshness signal to crawlers. Bump this constant only
// when these routes' content actually changes. Dynamic blog/news routes below
// keep their real p.updatedAt || p.publishedAt dates.
const STATIC_LASTMOD = new Date("2026-06-01");

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;

  const staticRoutes = [
    "",
    "/services",
    "/case-studies",
    "/tools",
    "/tools/agency-stress-quiz",
    "/tools/revenue-calculator",
    "/tools/ai-readiness-score",
    "/tools/before-after-slider",
    "/tools/voice-persona-builder",
    "/tools/executive-summary-generator",
    "/tools/content-calendar",
    "/tools/automation-gap-analyzer",
    "/tools/prompt-library",
    "/tools/video-prompt-generator",
    "/vibe-coding",
    "/pricing",
    "/about",
    "/contact",
    "/discovery-call",
    "/aeo-guide",
    "/glossary",
    "/faqs",
    "/n8n-vs-zapier",
    "/author/waseem-nasir",
    "/blog",
    "/news",
    "/portfolio",
    "/privacy-policy",
    "/terms-of-service",
    "/locations",
    "/industries/freight-logistics/texas",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: STATIC_LASTMOD,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  // Only services WITHOUT an `href` are real /services/[slug] detail pages.
  // Items WITH an `href` (e.g. freightops-logistics → /lp/logistics) are
  // excluded from generateStaticParams in /services/[slug], so emitting
  // /services/<slug> for them 404s. Mirror the same guard the /services
  // index page uses (.filter((svc) => !svc.href)) so no 404 URL ships in
  // sitemap.xml.
  const serviceRoutes = SERVICE_CATEGORIES.flatMap((cat) =>
    cat.services
      .filter((svc) => !(svc as { href?: string }).href)
      .map((svc) => ({
        url: `${base}/services/${svc.slug}`,
        lastModified: STATIC_LASTMOD,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
  );

  // Location pages — quality-gated by isLocationIndexable (state-enrichment.ts).
  // States without an enrichment paragraph stay SSG'd but emit noindex, follow.
  const stateRoutes = STATES.filter((s) => isLocationIndexable(s.slug)).map(
    (s) => ({
      url: `${base}/locations/${s.slug}`,
      lastModified: STATIC_LASTMOD,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }),
  );

  const blogRoutes = POSTS.filter((p) => isPostIndexable(p.slug)).map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.updatedAt || p.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const newsRoutes = NEWS.filter((n) => isNewsIndexable(n.slug)).map((n) => ({
    url: `${base}/news/${n.slug}`,
    lastModified: new Date(n.updatedAt || n.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  // svc×state matrix consolidated into hub accordion sections (2026-05-28).
  // Old /services/[slug]/in/[state] URLs now 308-redirect to
  // /services/[slug]#state-[state]. Sitemap no longer emits those URLs.
  // See src/app/(skynet)/services/[slug]/in/[state]/page.tsx for redirect.

  // Case study detail pages — drives /case-studies/[slug] dynamic route.
  const caseStudyRoutes = CASE_STUDIES.filter((c) =>
    isCaseStudyIndexable(c.slug),
  ).map((c) => ({
    url: `${base}/case-studies/${c.slug}`,
    lastModified: STATIC_LASTMOD,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Industry vertical landers — drives /industries/[slug] dynamic route.
  const industryRoutes = INDUSTRIES.filter((i) =>
    isIndustryIndexable(i.slug),
  ).map((i) => ({
    url: `${base}/industries/${i.slug}`,
    lastModified: STATIC_LASTMOD,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...stateRoutes,
    ...blogRoutes,
    ...newsRoutes,
    ...caseStudyRoutes,
    ...industryRoutes,
  ];
}
