import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";

const html = fs.readFileSync(
  path.join(process.cwd(), "content", "pricing.html"),
  "utf8"
);

export const metadata: Metadata = {
  title: "Pricing — Public, honest, no 'request a quote'",
  description:
    "Three transparent tiers from SkynetLabs: Starter $1,497, Flagship $9,500, Retainer from $1,997/mo. Plus six fixed-scope micros. No hidden enterprise tier, no discovery dance.",
  alternates: { canonical: `${SITE.url}/pricing` },
  openGraph: {
    title: "SkynetLabs Pricing — public, honest, no quote form",
    description:
      "Starter $1,497 · Flagship $9,500 · Retainer from $1,997/mo. Public pricing, fixed scopes, 5–14d ship.",
    url: `${SITE.url}/pricing`,
    type: "website",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "PriceSpecification",
  name: `${SITE.brand} Pricing`,
  url: `${SITE.url}/pricing`,
  description:
    "Three transparent tiers: Starter $1,497, Flagship $9,500, Retainer from $1,997/mo, plus six fixed-scope micros.",
  priceCurrency: "USD",
  minPrice: 297,
  maxPrice: 9500,
  provider: { "@id": `${SITE.url}/#organization` },
};

const offerCatalog = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: `${SITE.brand} Service Packages`,
  url: `${SITE.url}/pricing`,
  itemListElement: [
    {
      "@type": "Offer",
      name: "Starter",
      price: 1497,
      priceCurrency: "USD",
      description: "Single-flow automation or starter site, 5-day ship.",
    },
    {
      "@type": "Offer",
      name: "Flagship",
      price: 9500,
      priceCurrency: "USD",
      description:
        "Full Next.js site or multi-system automation build, 10-14 day ship.",
    },
    {
      "@type": "Offer",
      name: "Retainer",
      price: 1997,
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: 1997,
        priceCurrency: "USD",
        unitText: "MONTH",
      },
      description: "Monthly retainer for ongoing automation, content, or QA.",
    },
  ],
};

export default function PricingPage() {
  return (
    <>
      <JsonLd data={schema} />
      <JsonLd data={offerCatalog} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
