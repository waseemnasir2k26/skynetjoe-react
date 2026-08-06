import HeroFunnel from "@/components/funnel/HeroFunnel";
import PainPoints from "@/components/funnel/PainPoints";
import Outcomes from "@/components/funnel/Outcomes";
import Testimonials from "@/components/sections/Testimonials";
import FAQHome, { HOME_FAQS } from "@/components/sections/FAQHome";
import FinalCTA from "@/components/funnel/FinalCTA";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import { organization, person } from "@/lib/schema";

// Explicit homepage metadata. `title.absolute` skips the global "%s | SkynetLabs"
// template so the home tab/SERP title is the full brand line, not suffixed.
export const metadata: Metadata = {
  title: { absolute: `${SITE.brand} — ${SITE.tagline}` },
  description: SITE.description,
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
    creator: "@skynetlabs",
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
        serviceType: [
          "AI Automation",
          "n8n Workflow",
          "WordPress Development",
          "AEO/SEO",
          "Chatbot Development",
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
      <HeroFunnel />
      <PainPoints />
      <Outcomes />
      <Testimonials />
      <FAQHome />
      <FinalCTA />
    </>
  );
}
