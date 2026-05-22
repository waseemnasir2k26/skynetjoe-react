import type { MetadataRoute } from "next";
import { SITE, SERVICE_CATEGORIES } from "@/lib/site";
import { STATES } from "@/lib/states";
import { POSTS } from "@/lib/posts";
import { INDUSTRIES } from "@/data/industries";
import { CASE_STUDIES } from "@/lib/case-studies";

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

  const stateRoutes = STATES.map((s) => ({
    url: `${base}/locations/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const blogRoutes = POSTS.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.updatedAt || p.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Full 16 services × 48 states programmatic matrix = 768 long-tail URLs.
  // Restored 2026-05-22 after earlier agent collision reverted this to CA-only.
  const serviceStateRoutes = SERVICE_CATEGORIES.flatMap((cat) =>
    cat.services.flatMap((svc) =>
      STATES.map((s) => ({
        url: `${base}/services/${svc.slug}/in/${s.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }))
    )
  );

  // Case study detail pages — drives /case-studies/[slug] dynamic route.
  // Restored 2026-05-22 after collision wiped the original append.
  const caseStudyRoutes = CASE_STUDIES.map((c) => ({
    url: `${base}/case-studies/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // ─── INDUSTRY VERTICAL LANDERS (appended 2026-05-22 — dedicated block) ────
  // Added by industry-landers build. APPEND-ONLY; do not refactor with the
  // other route blocks above. Drives /industries/[slug] dynamic route.
  const industryRoutes = INDUSTRIES.map((i) => ({
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
    ...serviceStateRoutes,
    ...caseStudyRoutes,
    ...industryRoutes,
  ];
}
