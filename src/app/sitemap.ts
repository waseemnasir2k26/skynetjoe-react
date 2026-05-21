import type { MetadataRoute } from "next";
import { SITE, SERVICE_CATEGORIES } from "@/lib/site";
import { STATES } from "@/lib/states";
import { POSTS } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = SITE.url;

  const staticRoutes = [
    "",
    "/services",
    "/case-studies",
    "/tools",
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

  const PROTOTYPE_STATE_MATRIX = ["california"];
  const serviceStateRoutes = SERVICE_CATEGORIES.flatMap((cat) =>
    cat.services.flatMap((svc) =>
      STATES.filter((s) => PROTOTYPE_STATE_MATRIX.includes(s.slug)).map(
        (s) => ({
          url: `${base}/services/${svc.slug}/in/${s.slug}`,
          lastModified: now,
          changeFrequency: "monthly" as const,
          priority: 0.6,
        })
      )
    )
  );

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...stateRoutes,
    ...blogRoutes,
    ...serviceStateRoutes,
  ];
}
