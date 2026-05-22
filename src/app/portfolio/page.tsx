import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";

const html = fs.readFileSync(
  path.join(process.cwd(), "content", "portfolio.html"),
  "utf8"
);

export const metadata: Metadata = {
  title: "Portfolio — 12 visual case studies from SkynetLabs",
  description:
    "Twelve anonymized builds shipped by SkynetLabs across nine countries: EU logistics automation, Manhattan dental atelier, KSA retail, Bali wellness, French translation flow, AEO engines and more.",
  alternates: { canonical: `${SITE.url}/portfolio` },
  openGraph: {
    title: "SkynetLabs Portfolio — 12 shipped builds",
    description:
      "Visual showcase of 12 SkynetLabs builds. Click any tile to see the full case study.",
    url: `${SITE.url}/portfolio`,
    type: "website",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "SkynetLabs Portfolio",
  description:
    "Twelve anonymized builds shipped by SkynetLabs across nine countries.",
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
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
