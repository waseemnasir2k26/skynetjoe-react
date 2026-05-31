/**
 * /industries/[slug] — dynamic vertical landing page.
 *
 * Routing decision: dynamic [slug] with generateStaticParams + generateMetadata.
 * Rationale: 3 verticals today, more later (med-spa, real-estate, fitness studios).
 * Per-page metadata still controllable via the Industry config (metaTitle,
 * metaDescription) without duplicating page boilerplate.
 *
 * Schema graph emitted per page:
 *   - Service (vertical-specific service offering)
 *   - FAQPage (5-6 industry Qs)
 *   - BreadcrumbList (Home > Industries > <vertical>)
 *   - ItemList (the named integrations / tools the system speaks to —
 *     LocalBusiness-context-aware via @audience targeting the vertical)
 */

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { INDUSTRIES, getIndustry } from "@/data/industries";
import { SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import IndustryLanding from "@/components/sections/IndustryLanding";

export const dynamicParams = false;

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const i = getIndustry(slug);
  if (!i) return { title: "Industry not found" };

  const title = i.metaTitle;
  const description = i.metaDescription;
  const url = `${SITE.url}/industries/${i.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [
        {
          url: i.bioPhoto,
          width: 1200,
          height: 630,
          alt: i.bioPhotoAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@Skynetjoe1",
      images: [i.bioPhoto],
    },
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const i = getIndustry(slug);
  if (!i) notFound();

  const pageUrl = `${SITE.url}/industries/${i.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: i.flagshipProductName,
        description: i.flagshipProductLede,
        url: pageUrl,
        serviceType: i.flagshipProductName,
        provider: {
          "@type": "Organization",
          name: SITE.brand,
          url: SITE.url,
        },
        areaServed: "Worldwide",
        audience: {
          "@type": "BusinessAudience",
          name: i.name,
          audienceType: i.name,
        },
        offers: i.pricingTiers.map((tier) => ({
          "@type": "Offer",
          name: `${tier.tierName} — ${i.flagshipProductName}`,
          price: tier.price.replace(/[^0-9]/g, ""),
          priceCurrency: "USD",
          description: tier.positioning,
          availability: "https://schema.org/InStock",
          url: pageUrl,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: i.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
          },
        })),
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#integrations`,
        name: `${i.name} integrations supported by ${i.flagshipProductName}`,
        numberOfItems: i.integrationsListedForSchema.length,
        itemListElement: i.integrationsListedForSchema.map((tool, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: tool,
        })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={schema} />
      <Breadcrumbs
        offsetTop
        items={[
          { label: "Home", href: "/" },
          { label: "By Industry", href: "/industries" },
          { label: i.name },
        ]}
      />
      <IndustryLanding industry={i} />
    </>
  );
}
