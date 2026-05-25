import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";

const html = fs.readFileSync(
  path.join(process.cwd(), "content", "terms-of-service.html"),
  "utf8"
);

export const metadata: Metadata = {
  title: "Terms of Service — SkynetLabs",
  description:
    "Terms governing engagements with SkynetLabs and use of skynetjoe.com. Plain-language contract: 50% deposit, IP transfer on payment, Indonesian jurisdiction. Last updated 2026-05-20.",
  alternates: { canonical: `${SITE.url}/terms-of-service` },
  openGraph: {
    title: "SkynetLabs Terms of Service",
    description:
      "Engagement terms, payment, IP ownership, dispute resolution. Written plainly so both sides know where they stand.",
    url: `${SITE.url}/terms-of-service`,
    type: "article",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Terms of Service — SkynetLabs",
  description:
    "Terms governing engagements with SkynetLabs and use of skynetjoe.com. 50% deposit, IP transfer on payment, Indonesian jurisdiction.",
  url: `${SITE.url}/terms-of-service`,
  inLanguage: "en",
  dateModified: "2026-05-20",
  author: { "@type": "Person", name: SITE.founder, url: SITE.founderUrl },
  publisher: {
    "@type": "Organization",
    name: SITE.brand,
    url: SITE.url,
    logo: { "@type": "ImageObject", url: `${SITE.assetsUrl}/waseem-portrait.jpg` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE.url}/terms-of-service` },
};

export default function TermsOfServicePage() {
  return (
    <>
      <JsonLd data={schema} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
