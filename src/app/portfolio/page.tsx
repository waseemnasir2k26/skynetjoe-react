import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import WorkShowcase from "@/components/sections/WorkShowcase";

const html = fs.readFileSync(
  path.join(process.cwd(), "content", "portfolio.html"),
  "utf8"
);

export const metadata: Metadata = {
  title: "Work — 55+ shipped builds, GitHub-open | SkynetLabs",
  description:
    "Real client gigs from SkynetLabs: dental no-show flow, EU logistics, KSA retail, wellness funnels, AEO engines. Source-controlled. Click any repo. Built solo from Bali + Lahore by Waseem Nasir.",
  alternates: { canonical: `${SITE.url}/portfolio` },
  openGraph: {
    title: "SkynetLabs Work — 55+ builds, repos open",
    description:
      "Visual showcase of shipped builds. GitHub-open, live demos linked. Built solo by Waseem Nasir.",
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
      <WorkShowcase />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
