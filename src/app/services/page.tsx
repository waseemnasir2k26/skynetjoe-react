import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { SITE, SERVICE_CATEGORIES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";

const html = fs.readFileSync(
  path.join(process.cwd(), "content", "services-index.html"),
  "utf8"
);

export const metadata: Metadata = {
  title: "Services — 16 builds across automation, AI content, development & consulting",
  description:
    "Sixteen production-grade services from SkynetLabs across n8n automation, AI content, Next.js development and operator consulting. Fixed scope, public pricing, 5–14d ship.",
  alternates: { canonical: `${SITE.url}/services` },
  openGraph: {
    title: "SkynetLabs Services — 16 builds, 4 categories",
    description:
      "Automation, AI content, development, consulting. Sixteen real services, fixed scopes, 5–14 day ship window.",
    url: `${SITE.url}/services`,
    type: "website",
  },
};

type ServiceItem = { slug: string; label: string; icon: string; desc: string };
const allServices: ServiceItem[] = SERVICE_CATEGORIES.flatMap(
  (c) => c.services as readonly ServiceItem[]
);

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE.url}/services#collection`,
      name: `${SITE.brand} Services`,
      description:
        "Sixteen production-grade services across n8n automation, AI content, Next.js development and operator consulting.",
      url: `${SITE.url}/services`,
      inLanguage: "en",
      isPartOf: { "@id": `${SITE.url}/#website` },
    },
    {
      "@type": "OfferCatalog",
      "@id": `${SITE.url}/services#catalog`,
      name: `${SITE.brand} Service Catalog`,
      url: `${SITE.url}/services`,
      provider: { "@id": `${SITE.url}/#organization` },
      itemListElement: allServices.map((svc, i) => ({
        "@type": "Offer",
        position: i + 1,
        url: `${SITE.url}/services/${svc.slug}`,
        itemOffered: {
          "@type": "Service",
          name: svc.label,
          description: svc.desc,
          url: `${SITE.url}/services/${svc.slug}`,
          provider: { "@id": `${SITE.url}/#organization` },
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        {
          "@type": "ListItem",
          position: 2,
          name: "Services",
          item: `${SITE.url}/services`,
        },
      ],
    },
  ],
};

export default function ServicesIndexPage() {
  return (
    <>
      <JsonLd data={schema} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
