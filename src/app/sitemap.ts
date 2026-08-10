import type { MetadataRoute } from "next";
import { SITE, SERVICE_CATEGORIES } from "@/lib/site";
import { STATES } from "@/lib/states";
import { POSTS } from "@/lib/posts";
import { NEWS } from "@/lib/news";
import { INDUSTRIES } from "@/data/industries";
import { CASE_STUDIES } from "@/lib/case-studies";
import { TOOLS_REGISTRY } from "@/data/tools-registry";
import { WORK_BUILDS } from "@/lib/work-builds";
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
    ...TOOLS_REGISTRY.map((t) => `/tools/${t.slug}`),
    "/vibe-coding",
    "/pricing",
    "/about",
    "/contact",
    "/discovery-call",
    "/aeo-guide",
    "/glossary",
    "/faqs",
    "/n8n-vs-zapier",
    "/boring-automations-small-businesses-pay-for",
    "/edit-videos-with-claude",
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

  // Services carrying an `href` (e.g. freightops-logistics -> /lp/logistics)
  // are deliberately excluded from /services/[slug]'s generateStaticParams
  // (dynamicParams=false there), so /services/<that-slug> is a guaranteed
  // 404. Never advertise it in the sitemap. Its funnel LP itself is under
  // robots.ts DISALLOW (/lp/) and self-sets noindex — it isn't a sitemap
  // candidate either, so the fix is simply: emit nothing for it.
  const serviceRoutes = SERVICE_CATEGORIES.flatMap((cat) =>
    cat.services
      .filter(
        (svc): svc is (typeof cat.services)[number] & { href?: undefined } =>
          !("href" in svc) || !svc.href,
      )
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

  // Work showcase detail pages — drives /work/[slug] dynamic route (47 builds).
  const workRoutes = WORK_BUILDS.map((b) => ({
    url: `${base}/work/${b.slug}`,
    lastModified: STATIC_LASTMOD,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...stateRoutes,
    ...blogRoutes,
    ...newsRoutes,
    ...caseStudyRoutes,
    ...industryRoutes,
    ...workRoutes,
  ];
}
