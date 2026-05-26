import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import HtmlCreamWrap from "@/components/HtmlCreamWrap";

const html = fs.readFileSync(
  path.join(process.cwd(), "content", "aeo-guide.html"),
  "utf8"
);

export const metadata: Metadata = {
  title:
    "The AEO Field Guide — Get Cited by Claude, ChatGPT, Perplexity & Gemini",
  description:
    "Eight chapters covering what Answer Engine Optimization actually is, the 5-layer stack to ship, llms.txt and the new robots ecosystem, citation-worthy content patterns, measurement, and a 90-day rollout for service businesses.",
  alternates: { canonical: `${SITE.url}/aeo-guide` },
  openGraph: {
    title:
      "The AEO Field Guide — Get Cited by Claude, ChatGPT, Perplexity & Gemini",
    description:
      "How to structure content so LLM answer engines cite you. Schema, content, authority, distribution, freshness. 90-day rollout.",
    url: `${SITE.url}/aeo-guide`,
    type: "article",
    images: [...DEFAULT_OG_IMAGES],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "The AEO Field Guide — Get Cited by Claude, ChatGPT, Perplexity & Gemini",
  description:
    "8-chapter guide to Answer Engine Optimization: 5-layer stack, llms.txt, citation patterns, measurement, 90-day rollout.",
  url: `${SITE.url}/aeo-guide`,
  inLanguage: "en",
  author: { "@type": "Person", name: SITE.founder, url: SITE.founderUrl },
  publisher: {
    "@type": "Organization",
    name: SITE.brand,
    url: SITE.url,
    logo: { "@type": "ImageObject", url: `${SITE.assetsUrl}/waseem-portrait.jpg` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE.url}/aeo-guide` },
  about: [
    { "@type": "Thing", name: "Answer Engine Optimization" },
    { "@type": "Thing", name: "Large Language Models" },
    { "@type": "Thing", name: "llms.txt" },
  ],
};

export default function AeoGuidePage() {
  return (
    <>
      <JsonLd data={schema} />
      <HtmlCreamWrap html={html} />
    </>
  );
}
