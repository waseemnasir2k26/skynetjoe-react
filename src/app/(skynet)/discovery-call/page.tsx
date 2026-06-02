import type { Metadata } from "next";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import DiscoveryFunnel from "./DiscoveryFunnel";

export const metadata: Metadata = {
  title:
    "Free 30-Min Strategy Call — Stop Bleeding Money on Bad Automation | SkynetLabs",
  description:
    "Book a free 30-minute audit with Waseem Nasir. Get 3 concrete plays to recover lost revenue plus a fixed-price scope in 48 hours. No SDR, no pitch deck — just a working roadmap.",
  alternates: { canonical: `${SITE.url}/discovery-call` },
  openGraph: {
    title: "Free 30-Min Strategy Call — SkynetLabs",
    description:
      "Free audit + 3 concrete plays + fixed-price scope back in 48 hours. Bali hours, no SDR.",
    url: `${SITE.url}/discovery-call`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free 30-Min Strategy Call — SkynetLabs",
    description:
      "Free audit + 3 concrete plays + fixed-price scope in 48 hours. No SDR.",
  },
};

// ============================================================
// Structured data — Service + FAQPage + Person performer
// ============================================================

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "AI Automation Strategy Consultation",
  name: "Free 30-Minute Strategy Call",
  description:
    "Free 30-minute strategy call with SkynetLabs founder Waseem Nasir. Audit your current funnel and stack, identify the top 3 automation plays, and receive a fixed-price scope within 48 hours.",
  url: `${SITE.url}/discovery-call`,
  provider: {
    "@type": "Organization",
    name: SITE.brand,
    url: SITE.url,
  },
  areaServed: "Worldwide",
  audience: {
    "@type": "BusinessAudience",
    audienceType:
      "Founders, agency owners, and operators running service, e-commerce, or SaaS businesses",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    validFrom: new Date().toISOString().slice(0, 10),
  },
  performer: {
    "@type": "Person",
    name: SITE.founder,
    url: SITE.founderUrl,
    jobTitle: "Founder & Lead Engineer",
    worksFor: { "@type": "Organization", name: SITE.brand },
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is this a sales pitch?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. I run audits, not pitches. We look at your stack for 30 minutes, I name the 3 fastest fixes, then you decide. If a paid build comes from it — great. If not, you've still got a plan you can hand to anyone.",
      },
    },
    {
      "@type": "Question",
      name: "What if I'm not ready to commit to anything?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most folks on this call aren't. About 60% take the audit, sit on it for 2–6 weeks, then come back when budget clears. I'd rather you book later than buy something you regret.",
      },
    },
    {
      "@type": "Question",
      name: "Can I bring my team?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — up to 3 people. Add them as guests in the Calendly booking. Bring your ops lead or whoever owns the broken thing.",
      },
    },
    {
      "@type": "Question",
      name: "What if I'm in a different timezone?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Calendly auto-converts. My slots are 9am–6pm Bali (GMT+8), which covers Europe mornings, US evenings, Australia mid-day, and all of Asia. If literally nothing fits, email me.",
      },
    },
    {
      "@type": "Question",
      name: "How long until you scope my project?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "48 hours from call end. You get a one-page brief: deliverables, price, ship date, tech stack. 50% deposit unlocks work — fixed price, no hourly creep.",
      },
    },
    {
      "@type": "Question",
      name: "What if my budget is small?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "I'll tell you straight on the call. Builds under $2k I usually point to my Fiverr productized offers or a 30+ vetted-operator referral list. No 'let me put together a custom proposal' theatre.",
      },
    },
  ],
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.founder,
  url: SITE.founderUrl,
  jobTitle: "Founder & Lead Engineer",
  worksFor: {
    "@type": "Organization",
    name: SITE.brand,
    url: SITE.url,
  },
  sameAs: [
    SITE.social.linkedin,
    SITE.social.twitter,
    SITE.social.github,
    SITE.social.youtube,
  ],
};

export default function DiscoveryCallPage() {
  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={personSchema} />
      <DiscoveryFunnel />
    </>
  );
}
