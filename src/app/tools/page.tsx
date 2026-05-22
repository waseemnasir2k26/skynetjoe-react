import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";

const html = fs.readFileSync(
  path.join(process.cwd(), "content", "tools.html"),
  "utf8"
);

export const metadata: Metadata = {
  title: "Free Tools — AEO score, schema builder, citation monitor & more",
  description:
    "Six free utilities from SkynetLabs: AEO Score Check, n8n vs Zapier Quiz, Voice Profile Generator, Meta Messaging Bot Sandbox, Schema Markup Builder, Citation Monitor.",
  alternates: { canonical: `${SITE.url}/tools` },
  openGraph: {
    title: "SkynetLabs Free Tools — six utilities, no email gate",
    description:
      "AEO scoring, schema generation, voice profiling, Meta messaging sandbox, citation tracking. Free, public, dogfood-grade.",
    url: `${SITE.url}/tools`,
    type: "website",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "SkynetLabs Free Tools",
  description:
    "Six free utilities: AEO Score Check, n8n vs Zapier Quiz, Voice Profile Generator, Meta Messaging Bot Sandbox, Schema Markup Builder, Citation Monitor.",
  url: `${SITE.url}/tools`,
  inLanguage: "en",
  publisher: { "@id": `${SITE.url}/#organization` },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: 6,
    itemListElement: [
      "AEO Score Check",
      "n8n vs Zapier Quiz",
      "Voice Profile Generator",
      "Meta Messaging Bot Sandbox",
      "Schema Markup Builder",
      "Citation Monitor",
    ].map((name, i) => ({
      "@type": "SoftwareApplication",
      position: i + 1,
      name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
    })),
  },
};

export default function ToolsPage() {
  return (
    <>
      <JsonLd data={schema} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
