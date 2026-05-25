import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import HtmlCreamWrap from "@/components/HtmlCreamWrap";

const html = fs.readFileSync(
  path.join(process.cwd(), "content", "faqs.html"),
  "utf8"
);

export const metadata: Metadata = {
  title: "AI Automation FAQs — 30 Questions Answered",
  description:
    "Real founder questions about n8n, Zapier, AEO/SEO, chatbots, live chat, and working with SkynetLabs. Honest answers — including when the answer is 'don't hire us.'",
  alternates: { canonical: `${SITE.url}/faqs` },
  openGraph: {
    title: "AI Automation FAQs — 30 Questions Answered",
    description:
      "30 real founder questions on n8n, AEO, chatbots, and working with SkynetLabs. Concrete answers, no hedging.",
    url: `${SITE.url}/faqs`,
    type: "article",
  },
};

// Top-level FAQs surfaced for FAQPage schema. The full 30 live in the HTML
// content; these 6 are the most common and act as the citation surface.
const TOP_FAQS = [
  {
    q: "What's the difference between n8n and Zapier?",
    a: "n8n is open-source, self-hostable, and unmetered (you pay for the server). Zapier is SaaS-only with per-task pricing. For >10k runs/month or self-hosting requirements, n8n wins on cost; for <1k runs/month with non-technical owners, Zapier is faster to deploy.",
  },
  {
    q: "How long does a typical build take?",
    a: "Most SkynetLabs builds ship in 5 to 14 days from kickoff. Starter scopes ($1,497) ship in 5 days; flagship sites and full automation systems ($9,500) ship in 10 to 14 days.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Yes, we sign yours. We don't ask you to sign ours. NDA review takes 24 to 48 hours; we recommend skipping NDAs for sub-$5k engagements to keep velocity up.",
  },
  {
    q: "What does AEO mean?",
    a: "AEO stands for Answer Engine Optimization. It's the practice of structuring content so LLM-powered answer engines (Claude, ChatGPT, Perplexity, Gemini) cite your site as a source when users ask questions in your domain.",
  },
  {
    q: "Do you work with US clients from Bali?",
    a: "Yes. We work async-first with all US time zones. Bali is GMT+8, so US morning meetings land in our afternoon — async handoffs keep velocity high. We've shipped to clients in 9 countries.",
  },
  {
    q: "How much does a WhatsApp chatbot cost?",
    a: "WhatsApp chatbot builds start at $1,497 for a single-flow bot (booking, FAQ, lead capture) and scale to $9,500 for multi-agent voice + WhatsApp systems with CRM integration. WhatsApp Business API hosting is separate (~$5–50/month).",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  url: `${SITE.url}/faqs`,
  inLanguage: "en",
  mainEntity: TOP_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
  publisher: { "@id": `${SITE.url}/#organization` },
};

export default function FaqsPage() {
  return (
    <>
      <JsonLd data={schema} />
      <HtmlCreamWrap html={html} />
    </>
  );
}
