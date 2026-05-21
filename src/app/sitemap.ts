import type { MetadataRoute } from "next";
import { SITE, SERVICE_CATEGORIES } from "@/lib/site";
import { STATES } from "@/lib/states";

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

  return [...staticRoutes, ...serviceRoutes, ...stateRoutes];
}
