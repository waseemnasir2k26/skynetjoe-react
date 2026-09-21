import type { MetadataRoute } from "next";
import { SITE, SERVICES } from "@/lib/site";
import { POSTS } from "@/lib/posts";
import { INDUSTRIES } from "@/data/industries";
import { CASE_STUDIES } from "@/lib/case-studies";
import { TOOLS_REGISTRY } from "@/data/tools-registry";
import {
  isCaseStudyIndexable,
  isIndustryIndexable,
  isPostIndexable,
} from "@/lib/sitemap-quality";

// Stable lastModified for routes with no per-page content date (static pages,
// service/case-study/industry landers). Previously these used `new Date()`,
// so every regeneration stamped unchanged pages as freshly modified — a
// weak/noisy freshness signal to crawlers. Bump this constant only when these
// routes' content actually changes. Blog routes keep their real dates.
const STATIC_LASTMOD = new Date("2026-08-31");

// Pages actually changed by the 2026-09-21 simplification (nav/footer on
// every page is a layout change; these are the routes whose own content
// moved). A uniform sitewide bump is a discounted freshness signal.
const TOUCHED_LASTMOD = new Date("2026-09-21");
const TOUCHED_PATHS = new Set([
  "",
  "/services",
  "/portfolio",
  "/tools",
  "/pricing",
  "/contact",
  "/blog",
]);
const staticLastMod = (path: string) =>
  TOUCHED_PATHS.has(path) ? TOUCHED_LASTMOD : STATIC_LASTMOD;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;

  const staticRoutes = [
    "",
    "/services",
    "/case-studies",
    "/tools",
    ...TOOLS_REGISTRY.map((t) => `/tools/${t.slug}`),
    "/pricing",
    "/about",
    "/contact",
    "/aeo-guide",
    "/glossary",
    "/faqs",
    "/n8n-vs-zapier",
    "/boring-automations-small-businesses-pay-for",
    "/author/waseem-nasir",
    "/blog",
    "/portfolio",
    "/privacy-policy",
    "/terms-of-service",
    "/industries",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: staticLastMod(path),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const serviceRoutes = SERVICES.map((svc) => ({
    url: `${base}/services/${svc.slug}`,
    lastModified: TOUCHED_LASTMOD,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogRoutes = POSTS.filter((p) => isPostIndexable(p.slug)).map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.updatedAt || p.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

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
    ...blogRoutes,
    ...caseStudyRoutes,
    ...industryRoutes,
  ];
}
