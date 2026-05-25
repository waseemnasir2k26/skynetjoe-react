import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import HtmlCreamWrap from "@/components/HtmlCreamWrap";

const html = fs.readFileSync(
  path.join(process.cwd(), "content", "glossary.html"),
  "utf8"
);

export const metadata: Metadata = {
  title: "AI Automation & AEO Glossary — 50+ Terms Defined",
  description:
    "Working reference for the vocabulary that comes up when shipping LLM features, automation workflows, and content that gets cited by answer engines. 50+ terms, plain definitions, no fluff.",
  alternates: { canonical: `${SITE.url}/glossary` },
  openGraph: {
    title: "AI Automation & AEO Glossary — 50+ Terms Defined",
    description:
      "50 definitions covering AEO, SEO, n8n, automation, LLMs, RAG, agents, schema markup. By Waseem Nasir, SkynetLabs.",
    url: `${SITE.url}/glossary`,
    type: "article",
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

export default function GlossaryPage() {
  return (
    <>
      <JsonLd data={schema} />
      <HtmlCreamWrap html={html} />
    </>
  );
}
