import fs from "fs";
import path from "path";
import type { Metadata } from "next";

const html = fs.readFileSync(
  path.join(process.cwd(), "content", "blog.html"),
  "utf8"
);

export const metadata: Metadata = {
  title: "Blog — SkynetLabs Journal on AI automation, AEO & shipping",
  description:
    "Long-form writing from SkynetLabs on AI automation, answer-engine optimization, n8n, and what actually ships across nine countries. Featured: AEO Field Guide, n8n vs Zapier, 30 founder FAQs.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "SkynetLabs Journal — long-form on AI automation and AEO",
    description:
      "One essay at a time, drawn from real engagements with real budgets and real failure modes.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogPage() {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
