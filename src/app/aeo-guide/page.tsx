import fs from "fs";
import path from "path";
import type { Metadata } from "next";

const html = fs.readFileSync(
  path.join(process.cwd(), "content", "aeo-guide.html"),
  "utf8"
);

export const metadata: Metadata = {
  title:
    "The AEO Field Guide — Get Cited by Claude, ChatGPT, Perplexity & Gemini",
  description:
    "Eight chapters covering what Answer Engine Optimization actually is, the 5-layer stack to ship, llms.txt and the new robots ecosystem, citation-worthy content patterns, measurement, and a 90-day rollout for service businesses.",
  alternates: { canonical: "/aeo-guide" },
  openGraph: {
    title:
      "The AEO Field Guide — Get Cited by Claude, ChatGPT, Perplexity & Gemini",
    description:
      "How to structure content so LLM answer engines cite you. Schema, content, authority, distribution, freshness. 90-day rollout.",
    url: "/aeo-guide",
    type: "article",
  },
};

export default function AeoGuidePage() {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
