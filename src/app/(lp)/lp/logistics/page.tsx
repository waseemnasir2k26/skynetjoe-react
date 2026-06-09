import type { Metadata } from "next";
import { MetaPixel, MetaPixelEvents } from "@/components/MetaPixel";
import { SITE } from "@/lib/site";
import FreightOpsInteractive from "./FreightOpsInteractive";

const PAGE_URL = `${SITE.url.replace(/\/+$/, "")}/lp/logistics`;

export const metadata: Metadata = {
  title: "Interactive FreightOps dispatch system for small-fleet carriers",
  description:
    "SkynetLabs builds a 24/7 dispatch intake, CRM, and FreightOps command center for US small-fleet carriers in 14 days. Interactive audit, public pricing, and ownership handoff.",
  alternates: { canonical: PAGE_URL },
  robots: { index: false, follow: false },
  openGraph: {
    title: "FreightOps command center for small-fleet carriers - SkynetLabs",
    description:
      "Interactive 24/7 dispatch intake, CRM routing, factoring visibility, and Meta-ready funnel for 5-25 truck operators.",
    url: PAGE_URL,
    type: "website",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "SkynetLabs FreightOps",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SkynetLabs FreightOps - interactive dispatch intake",
    description:
      "Explore the dispatch command center, missed-load calculator, and 14-day build plan for small-fleet carriers.",
    images: ["/og-default.png"],
  },
};

// Service JSON-LD — describes the FreightOps build offered on this lander.
// Pairs with the existing FAQPage schema below. Kept factual: provider, what
// it is, who it serves. No fabricated ratings/reviews/prices.
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "FreightOps dispatch command center build",
  serviceType: "Dispatch automation and CRM build for small-fleet carriers",
  description:
    "SkynetLabs builds an interactive FreightOps command center for US small-fleet carriers (5-25 trucks): 24/7 AI call intake, dispatch visibility, factoring status, and a Meta-ready lead funnel, delivered in 14 days.",
  provider: {
    "@type": "Organization",
    name: SITE.brand,
    url: SITE.url,
  },
  areaServed: { "@type": "Country", name: "United States" },
  audience: {
    "@type": "Audience",
    audienceType: "US small-fleet carriers and owner-operators (5-25 trucks)",
  },
  url: PAGE_URL,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Are you a freight broker or motor carrier?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. SkynetLabs provides software, design, and marketing systems. Broker authority stays with the carrier.",
      },
    },
    {
      "@type": "Question",
      name: "What if I already use DAT and a TMS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "That is preferred. FreightOps connects around the tools already in use instead of forcing a full replacement.",
      },
    },
    {
      "@type": "Question",
      name: "How fast does Starter ship?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Starter ships in 14 calendar days from kickoff and includes a site, CRM, inbound inbox, Meta Pixel, and Conversions API.",
      },
    },
  ],
};

export default function LogisticsLP() {
  return (
    <>
      <MetaPixel />
      <MetaPixelEvents />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FreightOpsInteractive />
    </>
  );
}
