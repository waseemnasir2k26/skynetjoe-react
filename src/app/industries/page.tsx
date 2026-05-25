/**
 * /industries — vertical landing index.
 *
 * Why this exists:
 *   /industries/[slug] pages emit a BreadcrumbList that references
 *   ${SITE.url}/industries as position-2. Without an index page that URL
 *   404s — breaking the breadcrumb chain for SEO and any SERP that
 *   surfaces the parent crumb.
 *
 * Cream-pivot styled (2026-05-25):
 *   - Background var(--cream) / var(--cream-3)
 *   - Hero H1 in Fraunces with terracotta <em> accent
 *   - Cards have 1px ink border on cream-2 surface
 *   - CTAs flat terracotta (primary) + ink-outline (secondary)
 *   - No dark gradient, no oxblood — locked to the pivot tokens.
 */

import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { INDUSTRIES } from "@/data/industries";
import { SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Industries — Vertical-Built AI Systems",
  description:
    "Industry-specific AI receptionists, booking agents, and revenue automation for dental clinics, wellness spas, and freight & logistics. Vertical tools, vertical voice, vertical scope.",
  alternates: { canonical: `${SITE.url}/industries` },
  openGraph: {
    title: "SkynetLabs Industries — Vertical-built AI systems",
    description:
      "AI systems built for the vertical, not glued on top of it. Dental, wellness, freight. Each one ships fixed-scope, 5-14 days.",
    url: `${SITE.url}/industries`,
    type: "website",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE.url}/industries#collection`,
      name: `${SITE.brand} Industries`,
      description:
        "Three vertical-specific AI systems: dental clinics, wellness spas, freight & logistics. Each one is a flagship product, not a service line.",
      url: `${SITE.url}/industries`,
      inLanguage: "en",
      isPartOf: { "@id": `${SITE.url}/#website` },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: INDUSTRIES.length,
        itemListElement: INDUSTRIES.map((i, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          url: `${SITE.url}/industries/${i.slug}`,
          name: i.name,
        })),
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE.url}/industries#breadcrumbs`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        {
          "@type": "ListItem",
          position: 2,
          name: "Industries",
          item: `${SITE.url}/industries`,
        },
      ],
    },
  ],
};

export default function IndustriesIndexPage() {
  return (
    <>
      <JsonLd data={schema} />

      {/* HERO — cream editorial */}
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
            Vertical-built · not horizontal-glued
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
            Generic automations break in your vertical.{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--terracotta)",
                fontWeight: 500,
              }}
            >
              I build ones that speak the dialect.
            </em>
          </h1>

          <p
            style={{
              fontSize: 19,
              color: "var(--ink-2)",
              maxWidth: "54ch",
              lineHeight: 1.55,
              marginBottom: 28,
            }}
          >
            Three verticals, three flagship products. Each one trained on the
            vocabulary, the PMS, the dispatch software, the insurance plans,
            the no-show pattern — every detail the off-the-shelf builder
            doesn&apos;t know exists.
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
              Book a vertical-specific audit
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
              See real wins
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

      {/* 3 INDUSTRY CARDS */}
      <section className="py-16 md:py-20" style={{ background: "var(--cream)" }}>
        <div className="container-x px-6">
          <div className="grid gap-6 md:gap-8 md:grid-cols-3 max-w-6xl mx-auto">
            {INDUSTRIES.map((i) => (
              <Link
                key={i.slug}
                href={`/industries/${i.slug}`}
                className="group flex flex-col h-full"
                style={{
                  background: "var(--cream-2)",
                  border: "1px solid rgba(26,26,26,0.12)",
                  padding: 28,
                  borderRadius: 2,
                  textDecoration: "none",
                  transition: "transform 0.18s, border-color 0.18s",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    color: "var(--terracotta)",
                    marginBottom: 14,
                  }}
                >
                  {i.shortName} · vertical
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    fontSize: 26,
                    lineHeight: 1.15,
                    color: "var(--ink)",
                    marginBottom: 12,
                    letterSpacing: "-0.015em",
                  }}
                >
                  {i.name}
                </h3>

                <p
                  style={{
                    fontSize: 14,
                    color: "var(--ink-2)",
                    lineHeight: 1.55,
                    marginBottom: 18,
                    flexGrow: 0,
                  }}
                >
                  {i.eyebrowChip}
                </p>

                <div
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--ink)",
                    marginBottom: 6,
                    letterSpacing: "-0.005em",
                  }}
                >
                  Flagship: {i.flagshipProductName}
                </div>

                <p
                  style={{
                    fontSize: 13,
                    color: "var(--ink-2)",
                    lineHeight: 1.55,
                    marginBottom: 20,
                    flexGrow: 1,
                  }}
                >
                  {i.flagshipProductLede.split(". ")[0]}.
                </p>

                <div
                  className="inline-flex items-center gap-2"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--terracotta)",
                    marginTop: "auto",
                  }}
                >
                  See the {i.shortName} system
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
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
            Not your vertical yet?
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
            New verticals ship every quarter.{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--terracotta)",
                fontWeight: 500,
              }}
            >
              Tell me yours.
            </em>
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "var(--ink-2)",
              maxWidth: "46ch",
              margin: "0 auto 28px",
              lineHeight: 1.6,
            }}
          >
            If you run a med-spa, real-estate brokerage, fitness studio, law
            firm, or anything else with a repeatable front-desk workflow, send
            me the brief. Custom vertical builds quoted within 8 hours.
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
              Pitch my vertical
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/services"
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
              Browse all services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
