import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Bot,
  Globe,
  MessageSquare,
  Target,
  Zap,
} from "lucide-react";
import {
  SITE,
  SERVICES,
  DEFAULT_OG_IMAGES,
  svcHref,
  pageTitle,
  pageDescription,
} from "@/lib/site";
import { findServicePricing } from "@/lib/service-pricing";
import JsonLd from "@/components/JsonLd";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Bot,
  Globe,
  MessageSquare,
  Target,
  Zap,
};

const fmtUSD = (n: number) => `$${n.toLocaleString("en-US")}`;

export const metadata: Metadata = {
  title: pageTitle("Services — five things we build, fixed scope"),
  description:
    pageDescription("Five services: n8n automation, AI chatbots, GoHighLevel CRM, vibe-coded Next.js sites and WordPress SEO. Fixed scope, public pricing, 5-14 day ship."),
  alternates: { canonical: `${SITE.url}/services` },
  openGraph: {
    title: "SkynetLabs — five services, fixed scope, public pricing",
    description:
      "n8n automation, AI chatbots, GoHighLevel CRM, vibe-coded sites and WordPress SEO. Fixed scope, public pricing, 5-14 day ship.",
    url: `${SITE.url}/services`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
};

const allServices = SERVICES;

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE.url}/services#collection`,
      name: `${SITE.brand} Services`,
      description:
        "Five core services from SkynetLabs: n8n workflow automation, AI chatbots, GoHighLevel CRM, vibe-coded Next.js websites and WordPress SEO content engines.",
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
        url: `${SITE.url}${svcHref(svc)}`,
        itemOffered: {
          "@type": "Service",
          name: svc.label,
          description: svc.desc,
          url: `${SITE.url}${svcHref(svc)}`,
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
              color: "var(--terracotta-aa)",
            }}
          >
            <span
              style={{
                width: 28,
                height: 1,
                background: "var(--terracotta-aa)",
                display: "inline-block",
              }}
            />
            Five services · fixed scope · public pricing
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              lineHeight: 1.04,
              color: "var(--ink)",
              fontSize: "clamp(40px, 6vw, 68px)",
              margin: "0 0 24px",
            }}
          >
            Five things we build.{" "}
            <span
              style={{
                color: "var(--terracotta-aa)",
                fontWeight: 700,
              }}
            >
              Nothing we don&apos;t.
            </span>
          </h1>

          <p
            style={{
              fontSize: 19,
              color: "var(--ink-2)",
              maxWidth: "52ch",
              lineHeight: 1.6,
              marginBottom: 28,
            }}
          >
            Automation, chat, CRM, websites and search. Each one ships with a
            written scope, a public price and a 5-14 day window. Pick the one
            that matches your brief, or send the brief and we will tell you
            which it is.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
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

      {/* 5 SERVICE CARDS */}
      <section className="py-16 md:py-24" style={{ background: "var(--cream-2)" }}>
        <div className="container-x px-6">
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 list-none p-0 m-0">
            {allServices.map((svc) => {
              const Icon = ICONS[svc.icon];
              const pricing = findServicePricing(svc.slug);
              const from = pricing?.tiers[0];
              return (
                <li key={svc.slug} className="flex">
                  <Link
                    href={svcHref(svc)}
                    className="group flex flex-col w-full p-7 transition-colors"
                    style={{
                      background: "var(--cream-3)",
                      border: "1px solid rgba(26,26,26,0.10)",
                      borderRadius: 2,
                      color: "var(--ink)",
                    }}
                  >
                    <span
                      className="inline-flex items-center justify-center mb-5"
                      style={{
                        width: 40,
                        height: 40,
                        background: "rgba(198,107,63,0.10)",
                        color: "var(--terracotta-aa)",
                        borderRadius: 2,
                      }}
                    >
                      {Icon && <Icon className="w-5 h-5" />}
                    </span>
                    <h2
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: 22,
                        letterSpacing: "-0.02em",
                        lineHeight: 1.15,
                        margin: "0 0 8px",
                      }}
                    >
                      {svc.label}
                    </h2>
                    <p
                      style={{
                        color: "var(--ink-2)",
                        fontSize: 15,
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {pricing?.tagline ?? svc.desc}
                    </p>
                    <span
                      className="mt-auto pt-6 flex items-center justify-between gap-3"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 12,
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        color: "var(--ink-faint)",
                      }}
                    >
                      {from ? (
                        <span>
                          From {fmtUSD(from.price)}
                          {from.cadence === "monthly" ? "/mo" : ""} · {from.ship}
                        </span>
                      ) : (
                        <span>Fixed scope</span>
                      )}
                      <span
                        className="inline-flex items-center gap-1 transition-transform group-hover:translate-x-1"
                        style={{ color: "var(--terracotta-aa)", fontWeight: 700 }}
                      >
                        See service
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

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
              color: "var(--terracotta-aa)",
            }}
          >
            <span
              style={{
                width: 28,
                height: 1,
                background: "var(--terracotta-aa)",
                display: "inline-block",
              }}
            />
            One last thing
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
              color: "var(--ink)",
              fontSize: "clamp(28px, 4vw, 44px)",
              marginBottom: 14,
            }}
          >
            Every week you wait,{" "}
            <span
              style={{
                color: "var(--terracotta-aa)",
                fontWeight: 700,
              }}
            >
              it costs you more.
            </span>
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
            One 30-min call. Honest scope. Fixed price. No back-and-forth.
            Yes or no in 8 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
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
