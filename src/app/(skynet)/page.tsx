import HeroFunnel from "@/components/funnel/HeroFunnel";
import Outcomes from "@/components/funnel/Outcomes";
import Proof from "@/components/sections/Proof";
import ToolsTeaser from "@/components/home/ToolsTeaser";
import FAQHome, { HOME_FAQS } from "@/components/sections/FAQHome";
import FinalCTA from "@/components/funnel/FinalCTA";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { SITE, DEFAULT_OG_IMAGES, pageDescription } from "@/lib/site";
import { organization, person } from "@/lib/schema";

// Explicit homepage metadata. `title.absolute` skips the global "%s | SkynetLabs"
// template so the home tab/SERP title is the full brand line, not suffixed.
export const metadata: Metadata = {
  // 62 chars with the full tagline — trimmed to sit under the ~60-char SERP
  // truncation line while keeping the brand + both categories.
  title: { absolute: `${SITE.brand} — AI Automation & AEO for Service Businesses` },
  description: pageDescription(SITE.description),
  alternates: { canonical: SITE.url },
  openGraph: {
    title: `${SITE.brand} — ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.brand} — ${SITE.tagline}`,
    description: SITE.description,
    creator: "@Skynetjoe1",
  },
};

export default function Home() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@graph": [
      // Spread the shared, richer Organization/Person from lib/schema.ts
      // (includes logo/address/email). @id values stay identical so Google
      // merges these nodes with the lean references in WebSite/ProfessionalService.
      { ...organization },
      { ...person },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.brand,
        publisher: { "@id": `${SITE.url}/#organization` },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE.url}/#service`,
        name: SITE.brand,
        url: SITE.url,
        provider: { "@id": `${SITE.url}/#organization` },
        areaServed: "Worldwide",
        // public pricing lives on /pricing — Google-recommended property.
        // Bounds match published figures: n8n builds "From $750" (llms.txt,
        // services) up to $9,500 flagship (faqs, pricing).
        priceRange: "$750-$9,500",
        serviceType: [
          "n8n Automation",
          "AI Chatbots",
          "GoHighLevel CRM",
          "Vibe-Coded Websites",
          "WordPress & SEO",
        ],
      },
      {
        // FAQPage node built from the same HOME_FAQS array FAQHome renders,
        // so the schema text can never drift from what's on the page.
        "@type": "FAQPage",
        "@id": `${SITE.url}/#faq`,
        mainEntity: HOME_FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={orgSchema} />
      {/* 2026-09-21 simplification: 9 sections → 6. PainPoints (repeated
          Outcomes' message), ProofReceipts (untraceable stat wall) and the
          standalone Testimonials were folded into <Proof/>. */}
      <HeroFunnel />
      <Outcomes />
      <Proof />
      <ToolsTeaser />
      <FAQHome />
      <FinalCTA />
    </>
  );
}
