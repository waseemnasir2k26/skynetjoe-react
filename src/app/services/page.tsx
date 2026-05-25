import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { SITE, SERVICE_CATEGORIES, DEFAULT_OG_IMAGES } from "@/lib/site";
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
    images: [...DEFAULT_OG_IMAGES],
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

      {/* HERO — cream editorial · pain-first reframe */}
      <section
        className="relative pt-28 md:pt-36 pb-16"
        style={{
          background: "var(--cream-3)",
          borderBottom: "1px solid rgba(26,26,26,0.10)",
        }}
      >
        <div className="container-x px-6 relative z-10 max-w-4xl">
          <div
            className="inline-flex items-center gap-3 mb-6"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "var(--terracotta)",
            }}
          >
            <span
              style={{
                width: 28,
                height: 1,
                background: "var(--terracotta)",
                display: "inline-block",
              }}
            />
            Pain-solver · not service-seller
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              letterSpacing: "-0.025em",
              lineHeight: 1.04,
              color: "var(--ink)",
              fontSize: "clamp(40px, 6vw, 68px)",
              margin: "0 0 24px",
            }}
          >
            I don&apos;t sell services.{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--terracotta)",
                fontWeight: 500,
              }}
            >
              I close pain points.
            </em>
          </h1>

          <p
            style={{
              fontSize: 19,
              color: "var(--ink-2)",
              maxWidth: "52ch",
              lineHeight: 1.55,
              marginBottom: 28,
            }}
          >
            Every founder brief lands in one of eight pains. Pick the one
            bleeding you this week — see the fix, see the metric, see the
            tools. The service menu is just the toolkit.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/discovery-call"
              className="inline-flex items-center gap-2"
              style={{
                background: "var(--terracotta)",
                color: "var(--cream-3)",
                padding: "16px 28px",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: 15,
                borderRadius: 2,
                border: "none",
                transition: "background 0.18s",
              }}
            >
              Send a 3-sentence brief
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2"
              style={{
                background: "transparent",
                color: "var(--ink)",
                border: "1px solid var(--ink)",
                padding: "15px 26px",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: 15,
                borderRadius: 2,
              }}
            >
              See real fixes
            </Link>
          </div>

          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--ink-faint)",
              marginTop: 20,
            }}
          >
            — Bali hours · GMT+8 · usually books within 48-72 hours
          </div>
        </div>
      </section>

      {/* 8 PAIN CARDS */}
      <PainSolverGrid />

      {/* COLLAPSED FULL MENU (SEO + power browsers) */}
      <ServiceMenuCollapsed />

      {/* CLOSER — cream editorial */}
      <section
        className="py-16 md:py-20"
        style={{
          background: "var(--cream-3)",
          borderTop: "1px solid rgba(26,26,26,0.10)",
        }}
      >
        <div className="container-x px-6 max-w-3xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-3 mb-5"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "var(--terracotta)",
            }}
          >
            <span
              style={{
                width: 28,
                height: 1,
                background: "var(--terracotta)",
                display: "inline-block",
              }}
            />
            One last thing
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
              color: "var(--ink)",
              fontSize: "clamp(28px, 4vw, 44px)",
              marginBottom: 14,
            }}
          >
            Every week you wait,{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--terracotta)",
                fontWeight: 500,
              }}
            >
              the bleed gets bigger.
            </em>
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "var(--ink-2)",
              maxWidth: "44ch",
              margin: "0 auto 28px",
              lineHeight: 1.6,
            }}
          >
            One 30-min call. Honest scope. Fixed price. No discovery dance.
            Yes/no in 8 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/discovery-call"
              className="inline-flex items-center gap-2"
              style={{
                background: "var(--terracotta)",
                color: "var(--cream-3)",
                padding: "16px 28px",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: 15,
                borderRadius: 2,
                border: "none",
              }}
            >
              Book my strategy call
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2"
              style={{
                background: "transparent",
                color: "var(--ink)",
                border: "1px solid var(--ink)",
                padding: "15px 26px",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: 15,
                borderRadius: 2,
              }}
            >
              See pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
