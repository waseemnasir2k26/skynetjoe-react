import type { MetadataRoute } from "next";
import { SITE, SERVICE_CATEGORIES } from "@/lib/site";
import { STATES } from "@/lib/states";
import { POSTS } from "@/lib/posts";
import { NEWS } from "@/lib/news";
import { INDUSTRIES } from "@/data/industries";
import { CASE_STUDIES } from "@/lib/case-studies";
import {
  isServiceStateIndexable,
  isCaseStudyIndexable,
  isIndustryIndexable,
  isPostIndexable,
  isNewsIndexable,
  isLocationIndexable,
} from "@/lib/sitemap-quality";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
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
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const serviceRoutes = SERVICE_CATEGORIES.flatMap((cat) =>
    cat.services.map((svc) => ({
      url: `${base}/services/${svc.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  // Location pages — quality-gated by isLocationIndexable (state-enrichment.ts).
  // States without an enrichment paragraph stay SSG'd but emit noindex, follow.
  const stateRoutes = STATES.filter((s) => isLocationIndexable(s.slug)).map(
    (s) => ({
      url: `${base}/locations/${s.slug}`,
      lastModified: now,
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

  // Full 16 services × 48 states programmatic matrix = 768 long-tail URLs.
  // Filtered by quality score >= 60 (see lib/sitemap-quality.ts). Pages outside
  // the published set are still SSG'd and reachable but emit `noindex, follow`
  // in metadata to avoid Google Helpful Content Update penalties on thin/
  // template-identical cells.
  const serviceStateRoutes = SERVICE_CATEGORIES.flatMap((cat) =>
    cat.services.flatMap((svc) =>
      STATES.filter((s) => isServiceStateIndexable(svc.slug, s.slug)).map(
        (s) => ({
          url: `${base}/services/${svc.slug}/in/${s.slug}`,
          lastModified: now,
          changeFrequency: "monthly" as const,
          priority: 0.6,
        }),
      ),
    ),
  );

  // Case study detail pages — drives /case-studies/[slug] dynamic route.
  const caseStudyRoutes = CASE_STUDIES.filter((c) =>
    isCaseStudyIndexable(c.slug),
  ).map((c) => ({
    url: `${base}/case-studies/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Industry vertical landers — drives /industries/[slug] dynamic route.
  const industryRoutes = INDUSTRIES.filter((i) =>
    isIndustryIndexable(i.slug),
  ).map((i) => ({
    url: `${base}/industries/${i.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...stateRoutes,
    ...blogRoutes,
    ...newsRoutes,
    ...serviceStateRoutes,
    ...caseStudyRoutes,
    ...industryRoutes,
  ];
}
