import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import HtmlCreamWrap from "@/components/HtmlCreamWrap";

const html = fs.readFileSync(
  path.join(process.cwd(), "content", "author-waseem-nasir.html"),
  "utf8",
);

export const metadata: Metadata = {
  title: { absolute: "Waseem Nasir — Founder, SkynetLabs" },
  description:
    "I build automation that doesn't need me to babysit it. Lahore → Singapore → Bangkok → KL → Bali. Dozens of automation builds, dozens of sites, clients across several countries.",
  alternates: { canonical: `${SITE.url}/author/waseem-nasir` },
  openGraph: {
    title: "Waseem Nasir — Founder, SkynetLabs",
    description:
      "Founder of SkynetLabs. n8n automation, AI chatbots and conversion-tuned websites — built from Bali.",
    url: `${SITE.url}/author/waseem-nasir`,
    type: "profile",
    images: [
      {
        url: "/waseem-portrait.jpg",
        width: 1200,
        height: 1200,
        alt: "Waseem Nasir, founder of SkynetLabs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Waseem Nasir — Founder, SkynetLabs",
    description:
      "I build automation that doesn't need me to babysit it. Dozens of automation builds, dozens of sites, clients across several countries.",
    creator: "@skynetlabs",
    images: ["/waseem-portrait.jpg"],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${SITE.url}/author/waseem-nasir#profilepage`,
      url: `${SITE.url}/author/waseem-nasir`,
      name: `${SITE.founder} — Founder, ${SITE.brand}`,
      mainEntity: { "@id": `${SITE.url}/#person` },
      inLanguage: "en",
    },
    {
      "@type": "Person",
      "@id": `${SITE.url}/#person`,
      name: SITE.founder,
      givenName: "Waseem",
      familyName: "Nasir",
      url: SITE.founderUrl,
      image: `${SITE.assetsUrl}/waseem-portrait.jpg`,
      jobTitle: "Founder",
      worksFor: { "@id": `${SITE.url}/#organization` },
      nationality: { "@type": "Country", name: "Pakistan" },
      birthPlace: { "@type": "Place", name: "Lahore, Pakistan" },
      homeLocation: { "@type": "Place", name: "Bali, Indonesia" },
      description:
        "Founder of SkynetLabs. Builds n8n automation, AI chatbots and conversion-tuned websites for service businesses across several countries.",
      knowsAbout: [
        "n8n workflow automation",
        "Zapier and Make integrations",
        "AI chatbot development",
        "Anthropic Claude API",
        "OpenAI GPT API",
        "Google Gemini API",
        "WordPress development",
        "Next.js development",
        "Answer Engine Optimization (AEO)",
        "Generative Engine Optimization (GEO)",
        "Schema.org structured data",
        "Conversational APIs (WhatsApp Cloud, Telegram)",
        "GoHighLevel CRM",
        "Shopify e-commerce automation",
        "Retrieval-Augmented Generation (RAG)",
        "Vector databases (Qdrant, pgvector)",
        "Headless CMS (Sanity, Contentful)",
      ],
      hasOccupation: {
        "@type": "Occupation",
        name: "AI Automation Agency Founder",
        occupationLocation: { "@type": "City", name: "Bali, Indonesia" },
        skills:
          "n8n, OpenAI, Anthropic Claude, Next.js, WordPress, AEO, schema markup, RAG, chatbot development",
      },
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Self-taught — dozens of shipped automation builds and dozens of websites since 2022",
      },
      award: [
        "Dozens of n8n workflows shipped (2022–2026)",
        "Dozens of websites delivered across several countries",
        "Top Rated Plus on Upwork",
        "Top Rated on Fiverr",
      ],
      sameAs: [
        "https://www.linkedin.com/in/waseemnasir",
        SITE.social.linkedin,
        "https://x.com/skynetlabs",
        SITE.social.twitter,
        SITE.social.github,
        SITE.social.fiverr,
        "https://www.upwork.com/freelancers/waseemnasir",
        SITE.social.youtube,
        SITE.url,
        SITE.founderUrl,
      ],
    },
  ],
};

export default function AuthorPage() {
  return (
    <>
      <JsonLd data={schema} />
      <HtmlCreamWrap html={html} />
    </>
  );
}
