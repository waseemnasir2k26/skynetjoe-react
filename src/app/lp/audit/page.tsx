import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import AuditFunnel from "./AuditFunnel";

export const metadata: Metadata = {
  title:
    "Free 30-Min Automation Audit — Plug Your Biggest Revenue Leak | SkynetLabs",
  description:
    "Cold-traffic landing page. 30-min free audit. 3 concrete plays to plug revenue leaks. Fixed-price scope in 48 hours. No SDR, no pitch deck, no fake urgency.",
  alternates: { canonical: `${SITE.url}/lp/audit` },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Free 30-Min Automation Audit — SkynetLabs",
    description:
      "Find the leak. Plug it in 14 days. Free audit + 3 concrete plays + fixed scope in 48h.",
    url: `${SITE.url}/lp/audit`,
    type: "website",
    images: [`${SITE.url}/portraits/waseem-builder-hero.jpg`],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "AI Automation Audit",
  name: "Free 30-Minute Automation Audit",
  description:
    "30-minute free strategy audit with SkynetLabs founder Waseem Nasir. Top 3 fixable leaks + fixed-price scope in 48 hours.",
  url: `${SITE.url}/lp/audit`,
  provider: {
    "@type": "Organization",
    name: SITE.brand,
    url: SITE.url,
  },
  areaServed: "Worldwide",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
};

export default function AuditLandingPage() {
  return (
    <>
      <JsonLd data={schema} />
      <AuditFunnel />
    </>
  );
}
