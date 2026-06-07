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
  },
  twitter: {
    card: "summary_large_image",
    title: "SkynetLabs FreightOps - interactive dispatch intake",
    description:
      "Explore the dispatch command center, missed-load calculator, and 14-day build plan for small-fleet carriers.",
  },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <FreightOpsInteractive />
    </>
  );
}
