import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { SITE, DEFAULT_OG_IMAGES, pageTitle, pageDescription } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import HtmlCreamWrap from "@/components/HtmlCreamWrap";

const html = fs.readFileSync(
  path.join(process.cwd(), "content", "glossary.html"),
  "utf8"
);

export const metadata: Metadata = {
  title: pageTitle("AI Automation & AEO Glossary — 50+ Terms Defined"),
  description:
    pageDescription("Working reference for the vocabulary that comes up when shipping LLM features, automation workflows, and content that gets cited by answer engines. 50+ terms, plain definitions, no fluff."),
  alternates: { canonical: `${SITE.url}/glossary` },
  openGraph: {
    title: "AI Automation & AEO Glossary — 50+ Terms Defined",
    description:
      "50 definitions covering AEO, SEO, n8n, automation, LLMs, RAG, agents, schema markup. By Waseem Nasir, SkynetLabs.",
    url: `${SITE.url}/glossary`,
    type: "article",
    images: [...DEFAULT_OG_IMAGES],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "AI Automation & AEO Glossary",
  description:
    "50+ working definitions covering AEO, SEO, n8n, automation, LLMs, RAG, agents, and schema markup.",
  url: `${SITE.url}/glossary`,
  inLanguage: "en",
  author: { "@type": "Person", name: SITE.founder, url: SITE.founderUrl },
  publisher: { "@id": `${SITE.url}/#organization` },
};

// BreadcrumbList — hub pages shipped without one (SEO report 2026-09-05 §5 #5).
const hubBreadcrumbSchema = breadcrumbSchema([
  { name: "Home", url: SITE.url },
  { name: "Glossary", url: `${SITE.url}/glossary` },
]);

export default function GlossaryPage() {
  return (
    <>
      <JsonLd data={schema} />
      <JsonLd data={hubBreadcrumbSchema} />
      <HtmlCreamWrap html={html} />
    </>
  );
}
