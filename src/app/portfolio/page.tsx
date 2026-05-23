import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import WorkShowcase from "@/components/sections/WorkShowcase";

export const metadata: Metadata = {
  title: "Portfolio — Recent Projects | SkynetLabs",
  description:
    "Live screenshots of every shipped SkynetLabs build: dental flagship, real estate, wellness, HVAC, logistics, legal, healthcare. 20+ deployed sites. Built solo from Bali by Waseem Nasir.",
  alternates: { canonical: `${SITE.url}/portfolio` },
  openGraph: {
    title: "SkynetLabs Portfolio — Recent Projects",
    description:
      "Live screenshots of 20+ shipped builds. Click any tile for the deployed site.",
    url: `${SITE.url}/portfolio`,
    type: "website",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "SkynetLabs Portfolio — Recent Projects",
  description:
    "Live screenshots of every shipped build across nine countries.",
  url: `${SITE.url}/portfolio`,
  inLanguage: "en",
  isPartOf: { "@id": `${SITE.url}/#website` },
  publisher: { "@id": `${SITE.url}/#organization` },
  author: { "@type": "Person", name: SITE.founder, url: SITE.founderUrl },
};

export default function PortfolioPage() {
  return (
    <>
      <JsonLd data={schema} />
      <WorkShowcase />
    </>
  );
}
