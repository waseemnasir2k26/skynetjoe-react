import fs from "fs";
import path from "path";
import type { Metadata } from "next";

const html = fs.readFileSync(
  path.join(process.cwd(), "content", "glossary.html"),
  "utf8"
);

export const metadata: Metadata = {
  title: "AI Automation & AEO Glossary — 50+ Terms Defined",
  description:
    "Working reference for the vocabulary that comes up when shipping LLM features, automation workflows, and content that gets cited by answer engines. 50+ terms, plain definitions, no fluff.",
  alternates: { canonical: "/glossary" },
  openGraph: {
    title: "AI Automation & AEO Glossary — 50+ Terms Defined",
    description:
      "50 definitions covering AEO, SEO, n8n, automation, LLMs, RAG, agents, schema markup. By Waseem Nasir, SkynetLabs.",
    url: "/glossary",
    type: "article",
  },
};

export default function GlossaryPage() {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
