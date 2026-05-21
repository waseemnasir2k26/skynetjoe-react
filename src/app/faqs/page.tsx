import fs from "fs";
import path from "path";
import type { Metadata } from "next";

const html = fs.readFileSync(
  path.join(process.cwd(), "content", "faqs.html"),
  "utf8"
);

export const metadata: Metadata = {
  title: "AI Automation FAQs — 30 Questions Answered",
  description:
    "Real founder questions about n8n, Zapier, AEO/SEO, chatbots, live chat, and working with SkynetLabs. Honest answers — including when the answer is 'don't hire us.'",
  alternates: { canonical: "/faqs" },
  openGraph: {
    title: "AI Automation FAQs — 30 Questions Answered",
    description:
      "30 real founder questions on n8n, AEO, chatbots, and working with SkynetLabs. Concrete answers, no hedging.",
    url: "/faqs",
    type: "article",
  },
};

export default function FaqsPage() {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
