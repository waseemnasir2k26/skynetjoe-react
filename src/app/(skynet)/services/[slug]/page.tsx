import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SERVICE_CATEGORIES, SITE, DEFAULT_OG_IMAGES, pageTitle, pageDescription } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import ServiceFunnel from "@/components/services/ServiceFunnel";
import { SERVICE_FUNNELS } from "@/data/service-funnels";
import { findServicePricing } from "@/lib/service-pricing";

/**
 * 2026-09-21: 5 core services (src/lib/site.ts SERVICE_CATEGORIES), each
 * rendered from src/data/service-funnels/<slug>.ts via <ServiceFunnel/>
 * (FAQPage schema, pricing tiers, comparison section). The state accordion
 * + 48 state pills were removed with the /locations teardown; old
 * /services/<slug>/in/<state> URLs 301 to the hub (simplify-redirects.ts).
 */

type ServiceItem = { slug: string; label: string; icon: string; desc: string };
const SERVICES: ServiceItem[] = SERVICE_CATEGORIES.flatMap(
  (c) => c.services as readonly (ServiceItem & { href?: string })[],
).filter((s): s is ServiceItem => !("href" in s) || !s.href);
const SLUGS = SERVICES.map((s) => s.slug);

// Build a SEO-grade description (≤140 chars) from the short svc.desc tagline
// so meta-description, OG description, and Service schema all pass length floors.
function buildLongDescription(svc: ServiceItem): string {
  return (
    `${svc.label} from ${SITE.brand} — ${svc.desc}. ` +
    `Fixed-price scope returned within 48 hours of brief, ship window 5 to 14 days, ` +
    `delivered remotely from Bali by founder ${SITE.founder}. ` +
    `8-hour weekday reply guarantee, source-controlled deliverables, public pricing — no quote dance.`
  );
}

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const svc = SERVICES.find((s) => s.slug === slug);
  if (!svc) return {};
  const longDesc = buildLongDescription(svc);
  return {
    // No brand suffix here — the (skynet) layout's title.template
    // (`%s | ${SITE.brand}`) already appends it; a hardcoded suffix rendered
    // "... — SkynetLabs | SkynetLabs".
    title: pageTitle(svc.label),
    // buildLongDescription() runs 287-309 chars — great on-page, truncated in
    // the SERP. Clamp for <meta>, keep the long form for og/twitter below.
    description: pageDescription(longDesc),
    alternates: { canonical: `${SITE.url}/services/${svc.slug}` },
    openGraph: {
      title: `${svc.label} — ${SITE.brand}`,
      description: longDesc,
      url: `${SITE.url}/services/${svc.slug}`,
      type: "article",
      images: [...DEFAULT_OG_IMAGES],
    },
    twitter: {
      card: "summary_large_image",
      title: `${svc.label} — ${SITE.brand}`,
      description: longDesc,
      creator: "@Skynetjoe1",
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!SLUGS.includes(slug)) notFound();

  // Git is the CMS — every core service has a funnel data file; the static
  // content/services/*.html fallback went with the 11 killed services.
  const funnel = SERVICE_FUNNELS[slug];
  if (!funnel) notFound();
  const svc = SERVICES.find((s) => s.slug === slug)!;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${SITE.url}/services/${svc.slug}#service`,
        name: svc.label,
        description: buildLongDescription(svc),
        url: `${SITE.url}/services/${svc.slug}`,
        serviceType: svc.label,
        provider: { "@id": `${SITE.url}/#organization` },
        areaServed: [{ "@type": "Country", name: "United States" }],
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "PriceSpecification",
            minPrice: 297,
            maxPrice: 9500,
            priceCurrency: "USD",
          },
          availability: "https://schema.org/InStock",
          url: `${SITE.url}/services/${svc.slug}`,
        },
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
          { label: "Services", href: "/services" },
          { label: svc.label },
        ]}
      />
      <ServiceFunnel content={funnel} pricing={findServicePricing(slug)} />
    </>
  );
}
