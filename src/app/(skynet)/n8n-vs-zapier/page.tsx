import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import HtmlCreamWrap from "@/components/HtmlCreamWrap";

const html = fs.readFileSync(
  path.join(process.cwd(), "content", "n8n-vs-zapier.html"),
  "utf8"
);

export const metadata: Metadata = {
  title: "n8n vs Zapier in 2026 — When to Pick Which (Honest Engineer's Take)",
  description:
    "Side-by-side n8n vs Zapier comparison from someone who has shipped 180+ workflows across both. 15-row criteria table, 5 real-world scenarios, decision tree, and when to use neither.",
  alternates: { canonical: `${SITE.url}/n8n-vs-zapier` },
  openGraph: {
    title:
      "n8n vs Zapier in 2026 — When to Pick Which (Honest Engineer's Take)",
    description:
      "180+ workflows shipped across both. Pricing, self-hosting, branching, compliance, AI nodes — and 5 scenarios with explicit picks.",
    url: `${SITE.url}/n8n-vs-zapier`,
    type: "article",
    images: [...DEFAULT_OG_IMAGES],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "n8n vs Zapier in 2026 — When to Pick Which (Honest Engineer's Take)",
  description:
    "Side-by-side comparison of n8n and Zapier from 180+ shipped workflows. Pricing, self-hosting, branching, compliance, AI nodes, 5 scenarios with picks.",
  url: `${SITE.url}/n8n-vs-zapier`,
  inLanguage: "en",
  author: { "@type": "Person", name: SITE.founder, url: SITE.founderUrl },
  publisher: {
    "@type": "Organization",
    name: SITE.brand,
    url: SITE.url,
    logo: { "@type": "ImageObject", url: `${SITE.assetsUrl}/waseem-portrait.jpg` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE.url}/n8n-vs-zapier` },
  about: [
    { "@type": "SoftwareApplication", name: "n8n" },
    { "@type": "SoftwareApplication", name: "Zapier" },
  ],
};

export default function N8nVsZapierPage() {
  return (
    <>
      <JsonLd data={schema} />
      <HtmlCreamWrap html={html} />
    </>
  );
}
