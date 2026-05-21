import fs from "fs";
import path from "path";
import type { Metadata } from "next";

const html = fs.readFileSync(
  path.join(process.cwd(), "content", "n8n-vs-zapier.html"),
  "utf8"
);

export const metadata: Metadata = {
  title: "n8n vs Zapier in 2026 — When to Pick Which (Honest Engineer's Take)",
  description:
    "Side-by-side n8n vs Zapier comparison from someone who has shipped 180+ workflows across both. 15-row criteria table, 5 real-world scenarios, decision tree, and when to use neither.",
  alternates: { canonical: "/n8n-vs-zapier" },
  openGraph: {
    title:
      "n8n vs Zapier in 2026 — When to Pick Which (Honest Engineer's Take)",
    description:
      "180+ workflows shipped across both. Pricing, self-hosting, branching, compliance, AI nodes — and 5 scenarios with explicit picks.",
    url: "/n8n-vs-zapier",
    type: "article",
  },
};

export default function N8nVsZapierPage() {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
