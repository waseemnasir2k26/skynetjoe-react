import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Sparkles } from "lucide-react";
import { SITE, SERVICE_CATEGORIES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import PainSolverGrid from "@/components/services/PainSolverGrid";
import ServiceMenuCollapsed from "@/components/services/ServiceMenuCollapsed";

export const metadata: Metadata = {
  title: "Services — I don't sell services. I close pain points.",
  description:
    "Eight founder pains, eight closed-loop fixes. Behind them: 16 production-grade services across automation, AI content, websites and consulting. Fixed scope, public pricing, 5-14 day ship.",
  alternates: { canonical: `${SITE.url}/services` },
  openGraph: {
    title: "SkynetLabs — Pain-solver, not service-seller",
    description:
      "Pick the bleed. We close it. Eight founder pains mapped to 16 production services. Fixed scope, public pricing.",
    url: `${SITE.url}/services`,
    type: "website",
  },
};

type ServiceItem = { slug: string; label: string; icon: string; desc: string };
const allServices: ServiceItem[] = SERVICE_CATEGORIES.flatMap(
  (c) => c.services as readonly ServiceItem[]
);

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE.url}/services#collection`,
      name: `${SITE.brand} Services`,
      description:
        "Eight founder pains, eight closed-loop fixes. Sixteen production-grade services across n8n automation, AI content, Next.js development and operator consulting.",
      url: `${SITE.url}/services`,
      inLanguage: "en",
      isPartOf: { "@id": `${SITE.url}/#website` },
    },
    {
      "@type": "OfferCatalog",
      "@id": `${SITE.url}/services#catalog`,
      name: `${SITE.brand} Service Catalog`,
      url: `${SITE.url}/services`,
      provider: { "@id": `${SITE.url}/#organization` },
      itemListElement: allServices.map((svc, i) => ({
        "@type": "Offer",
        position: i + 1,
        url: `${SITE.url}/services/${svc.slug}`,
        itemOffered: {
          "@type": "Service",
          name: svc.label,
          description: svc.desc,
          url: `${SITE.url}/services/${svc.slug}`,
          provider: { "@id": `${SITE.url}/#organization` },
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        {
          "@type": "ListItem",
          position: 2,
          name: "Services",
          item: `${SITE.url}/services`,
        },
      ],
    },
  ],
};

export default function ServicesIndexPage() {
  return (
    <>
      <JsonLd data={schema} />

      {/* HERO — pain-first reframe */}
      <section
        className="relative overflow-hidden pt-28 md:pt-36 pb-16"
        style={{
          background:
            "linear-gradient(135deg, #061827 0%, #0a2d4a 45%, #073846 100%)",
        }}
      >
        <span
          className="orb"
          style={{
            width: 540,
            height: 540,
            background: "#1E88E5",
            top: -90,
            left: -130,
            opacity: 0.45,
          }}
        />
        <span
          className="orb"
          style={{
            width: 580,
            height: 580,
            background: "#00D4FF",
            top: 80,
            right: -160,
            opacity: 0.35,
            animationDelay: "-7s",
          }}
        />

        <div className="container-x px-6 relative z-10 max-w-4xl">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-300 mb-5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/25">
            <Sparkles className="w-3 h-3" />
            Pain-solver · not service-seller
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.04] mb-6">
            I don&apos;t sell services.{" "}
            <span
              className="italic font-semibold"
              style={{
                fontFamily:
                  '"Playfair Display", Georgia, "Times New Roman", serif',
                background:
                  "linear-gradient(120deg, #00D4FF 0%, #14B8A6 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
              }}
            >
              I close pain points.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mb-7">
            Every founder brief lands in one of eight pains. Pick the one
            bleeding you this week — see the fix, see the metric, see the
            tools. The service menu is just the toolkit.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/discovery-call"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white transition-transform hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
                boxShadow: "0 8px 28px rgba(0, 212, 255, 0.30)",
              }}
            >
              Send a 3-sentence brief
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white border border-white/15 bg-white/[0.04] hover:border-cyan-400/40 transition"
            >
              See real fixes
            </Link>
          </div>
        </div>
      </section>

      {/* 8 PAIN CARDS */}
      <PainSolverGrid />

      {/* COLLAPSED FULL MENU (SEO + power browsers) */}
      <ServiceMenuCollapsed />

      {/* CLOSER */}
      <section className="py-16 md:py-20 border-t border-white/[0.08]">
        <div className="container-x px-6 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
            Every week you wait,{" "}
            <span
              className="italic"
              style={{
                fontFamily:
                  '"Playfair Display", Georgia, "Times New Roman", serif',
                background:
                  "linear-gradient(120deg, #FF6B6B 0%, #FFB547 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
              }}
            >
              the bleed gets bigger.
            </span>
          </h2>
          <p className="text-base text-fg-muted max-w-xl mx-auto mb-7">
            One 30-min call. Honest scope. Fixed price. No discovery dance.
            Yes/no in 8 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/discovery-call"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white transition-transform hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
                boxShadow: "0 8px 28px rgba(0, 212, 255, 0.30)",
              }}
            >
              Book my strategy call
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white border border-white/15 bg-white/[0.04] hover:border-cyan-400/40 transition"
            >
              See pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
