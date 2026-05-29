/**
 * /locations/[state] — programmatic SEO landing for each of 48 US states.
 *
 * Cream-pivot port 2026-05-25:
 *   - Hero: cream-3 bg, Fraunces H1 with terracotta <em>, mono eyebrow
 *   - Stats cards: cream-2 with 1px ink border, Fraunces large numbers
 *   - Service hub: cream cards, terracotta icon wash, no cyan glow
 *   - CTA strip: ink panel with terracotta button (was cyan→teal gradient)
 *   - Keyword chips: cream-2 with terracotta hover (was cyan-50/200)
 *   - Cities + industries panel: cream-2 with 1px ink border (was dark gradient)
 *   - Nearby states: cream chips with terracotta hover.
 * Schema, copy, generateStaticParams, generateMetadata all unchanged.
 */

import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import * as Icons from "lucide-react";
import { ArrowRight, MessageCircle, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { STATES, getStateBySlug, type StateEntry } from "@/lib/states";
import { SERVICE_CATEGORIES, SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { getStateEnrichment } from "@/data/state-enrichment";
import { isLocationIndexable } from "@/lib/sitemap-quality";

type IconCmp = React.ComponentType<{ className?: string }>;
type SvcItem = { slug: string; label: string; icon: string; desc: string };

export const dynamicParams = false;

export function generateStaticParams() {
  return STATES.map((s) => ({ state: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state } = await params;
  const s = getStateBySlug(state);
  if (!s) return {};
  const title = `AI Automation Expert in ${s.name} — n8n, GoHighLevel & AEO | ${SITE.brand}`;
  const description = `Hire an AI automation expert serving ${s.name} founders. n8n workflows, GoHighLevel CRM, AEO websites and live-chat agents delivered to ${s.cities.slice(0, 3).join(", ")} and surrounding ${s.abbr} businesses. Fixed scope, 5–14 day ship.`;
  const indexable = isLocationIndexable(state);
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/locations/${s.slug}` },
    robots: indexable ? undefined : { index: false, follow: true },
    openGraph: {
      title,
      description,
      url: `${SITE.url}/locations/${s.slug}`,
      type: "website",
      images: [...DEFAULT_OG_IMAGES],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@Skynetjoe1",
    },
  };
}

// Local SEO keyword variants per service × state
function buildKeywordPhrases(svc: SvcItem, s: StateEntry): string[] {
  const label = svc.label;
  return [
    `${label} expert in ${s.name}`,
    `${label} services for ${s.name} founders`,
    `${label} consultant near ${s.cities[0]}`,
    `${label} agency in ${s.abbr}`,
    `Hire ${label} freelancer in ${s.name}`,
    `Best ${label} provider near ${s.cities[1]}`,
  ];
}

// Shared cream-pivot inline styles
const eyebrow = {
  fontFamily: "var(--font-mono)",
  fontSize: 11 as const,
  textTransform: "uppercase" as const,
  letterSpacing: "0.16em",
  color: "var(--terracotta)",
  display: "inline-flex" as const,
  alignItems: "center" as const,
  gap: 12,
};
const eyebrowRule = {
  width: 28,
  height: 1,
  background: "var(--terracotta)",
  display: "inline-block" as const,
};
const h2Style = {
  fontFamily: "var(--font-display)",
  fontWeight: 500,
  letterSpacing: "-0.02em",
  lineHeight: 1.08,
  color: "var(--ink)",
  fontSize: "clamp(28px, 4vw, 44px)",
  marginBottom: 14,
};
const emTerra = {
  fontStyle: "italic" as const,
  color: "var(--terracotta)",
  fontWeight: 500,
};
const cardCream = {
  background: "var(--cream-2)",
  border: "1px solid rgba(26,26,26,0.12)",
  padding: 24,
  borderRadius: 2,
};

export default async function StatePage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const s = getStateBySlug(state);
  if (!s) notFound();

  const allServices: SvcItem[] = SERVICE_CATEGORIES.flatMap(
    (c) => c.services as readonly SvcItem[]
  );

  const enrichment = getStateEnrichment(s.slug);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${SITE.url}/locations/${s.slug}#service`,
        name: `AI Automation in ${s.name}`,
        description: `n8n workflows, AI chatbots, AEO-tuned websites, GoHighLevel CRM and live-chat automation for ${s.name} businesses across ${s.cities.join(", ")}.`,
        provider: {
          "@type": "Organization",
          name: SITE.brand,
          url: SITE.url,
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: s.name,
          containedInPlace: { "@type": "Country", name: "United States" },
        },
        serviceType: "AI Automation",
        offers: allServices.map((svc) => ({
          "@type": "Offer",
          name: `${svc.label} in ${s.name}`,
          url: `${SITE.url}/services/${svc.slug}`,
          description: svc.desc,
        })),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `SkynetLabs services for ${s.name}`,
          itemListElement: allServices.map((svc) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: `${svc.label} expert in ${s.name}`,
              url: `${SITE.url}/services/${svc.slug}`,
            },
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Locations", item: `${SITE.url}/locations` },
          { "@type": "ListItem", position: 3, name: s.name, item: `${SITE.url}/locations/${s.slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={schema} />

      {/* HERO */}
      <section
        className="relative pt-28 md:pt-36 pb-16"
        style={{
          background: "var(--cream-3)",
          borderBottom: "1px solid rgba(26,26,26,0.10)",
        }}
      >
        <div className="container-x px-6">
          <nav
            className="mb-6 flex items-center gap-2"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--ink-faint)",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
            }}
          >
            <Link href="/" style={{ color: "var(--ink-faint)" }}>Home</Link>
            <span>/</span>
            <Link href="/locations" style={{ color: "var(--ink-faint)" }}>Locations</Link>
            <span>/</span>
            <span style={{ color: "var(--terracotta)" }}>{s.name}</span>
          </nav>

          <div className="max-w-4xl">
            <div className="mb-6" style={eyebrow}>
              <span style={eyebrowRule} />
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: "var(--terracotta)", display: "inline-block" }}
              />
              Serving {s.name} · {s.abbr}
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
              AI Automation Expert in{" "}
              <em style={emTerra}>{s.name}</em>
            </h1>
            <p
              style={{
                fontSize: 18,
                color: "var(--ink-2)",
                lineHeight: 1.6,
                maxWidth: "62ch",
                marginBottom: 28,
              }}
            >
              {s.name} founders waste 14+ hours a week on tasks software should
              already be doing. SkynetLabs builds n8n workflows, GoHighLevel CRM
              systems, AI chatbots and AEO-tuned websites for operators across{" "}
              {s.cities.slice(0, 3).join(", ")} and beyond. Fixed scope, public
              pricing, 5–14 day ship window — delivered remotely from Bali.
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
                }}
              >
                <Calendar className="w-4 h-4" />
                Apply from {s.abbr}
              </Link>
              <a
                href="#livechat-open"
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
                <MessageCircle className="w-4 h-4" />
                Live chat
              </a>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2"
                style={{
                  background: "transparent",
                  color: "var(--ink-faint)",
                  border: "1px solid rgba(26,26,26,0.25)",
                  padding: "15px 26px",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: 15,
                  borderRadius: 2,
                }}
              >
                See pricing first
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Texas-specific industry deep-guide callout */}
      {s.slug === "texas" && (
        <section
          className="py-10"
          style={{
            background: "var(--ink)",
            color: "var(--cream-3)",
            borderBottom: "1px solid rgba(26,26,26,0.10)",
          }}
        >
          <div className="container-x px-6">
            <div className="max-w-4xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div
                  className="mb-2"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: "var(--terracotta)",
                  }}
                >
                  Industry deep guide
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    fontSize: "clamp(22px, 3vw, 30px)",
                    color: "var(--cream-3)",
                    margin: 0,
                  }}
                >
                  Building for Texas freight or logistics?
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "rgba(245, 240, 230, 0.78)",
                    margin: "6px 0 0",
                  }}
                >
                  3,000-word deep guide — Houston midstream, DFW wholesale,
                  Austin tech-trucking, Laredo cross-border, Permian oilfield.
                </p>
              </div>
              <Link
                href="/industries/freight-logistics/texas"
                className="inline-flex items-center gap-2 flex-shrink-0"
                style={{
                  background: "var(--terracotta)",
                  color: "var(--cream-3)",
                  padding: "14px 24px",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: 14,
                  borderRadius: 2,
                }}
              >
                Open the TX freight guide →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ENRICHMENT — state-specific 220-280 word block, indexability-gated */}
      {enrichment && (
        <section
          className="py-16 md:py-20"
          style={{
            background: "var(--cream-2)",
            borderBottom: "1px solid rgba(26,26,26,0.10)",
          }}
        >
          <div className="container-x px-6">
            <div className="max-w-3xl">
              <div className="mb-6" style={eyebrow}>
                <span style={eyebrowRule} />
                What we ship in {s.name}
              </div>
              <p
                style={{
                  fontFamily: "var(--font-serif, var(--font-display))",
                  fontSize: 18,
                  lineHeight: 1.72,
                  color: "var(--ink)",
                  margin: 0,
                }}
              >
                {enrichment}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Stats */}
      <section className="py-12" style={{ background: "var(--cream)" }}>
        <div className="container-x px-6">
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { k: "180+", v: "workflows shipped" },
              { k: "9", v: "countries served" },
              { k: "5–14d", v: `ship window into ${s.abbr}` },
            ].map((stat) => (
              <div key={stat.v} style={cardCream}>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    fontSize: 32,
                    color: "var(--terracotta)",
                    letterSpacing: "-0.025em",
                    marginBottom: 4,
                  }}
                >
                  {stat.k}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "var(--ink-2)",
                    lineHeight: 1.5,
                  }}
                >
                  {stat.v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Hub */}
      <section className="py-16 md:py-20" style={{ background: "var(--cream)" }}>
        <div className="container-x px-6">
          <div className="max-w-3xl mb-12">
            <div className="mb-5" style={eyebrow}>
              <span style={eyebrowRule} />
              Every service, available in {s.name}
            </div>
            <h2 style={h2Style}>
              16 builds for {s.name}{" "}
              <em style={emTerra}>operators.</em>
            </h2>
            <p style={{ fontSize: 16, color: "var(--ink-2)", lineHeight: 1.6 }}>
              From {s.industries[0]} practices in {s.cities[0]} to{" "}
              {s.industries[1]} firms in {s.cities[1]} and{" "}
              {s.industries[2]} operations in {s.cities[2]} — these 16 services
              are ready to ship into your stack.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {SERVICE_CATEGORIES.map((cat) => (
              <div key={cat.name}>
                <h3
                  className="flex items-center gap-3 mb-5"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: "var(--terracotta)",
                    fontWeight: 500,
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
                  {cat.name} · {s.name}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {cat.services.map((svc) => {
                    const Icon =
                      ((Icons as unknown) as Record<string, IconCmp>)[svc.icon] ??
                      ((Icons as unknown) as Record<string, IconCmp>).Bot;
                    return (
                      <Link
                        key={svc.slug}
                        href={`/services/${svc.slug}`}
                        className="group relative"
                        style={{
                          ...cardCream,
                          textDecoration: "none",
                          transition: "border-color 0.18s",
                        }}
                      >
                        <div
                          className="flex items-center justify-center mb-3"
                          style={{
                            width: 44,
                            height: 44,
                            background: "rgba(198,107,63,0.10)",
                            border: "1px solid rgba(198,107,63,0.30)",
                            borderRadius: 2,
                          }}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <h4
                          style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 500,
                            fontSize: 16,
                            color: "var(--ink)",
                            marginBottom: 4,
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {svc.label}
                        </h4>
                        <p
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 11,
                            color: "var(--terracotta)",
                            marginBottom: 8,
                          }}
                        >
                          {svc.label} expert in {s.name}
                        </p>
                        <p
                          style={{
                            fontSize: 13,
                            color: "var(--ink-2)",
                            lineHeight: 1.5,
                          }}
                        >
                          {svc.desc}
                        </p>
                        <Icons.ArrowUpRight
                          className="absolute top-5 right-5 w-4 h-4"
                          style={{ color: "var(--terracotta)" }}
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Ink CTA strip */}
          <div
            style={{
              marginTop: 48,
              background: "var(--ink)",
              color: "var(--cream-3)",
              padding: "40px 32px",
              borderRadius: 2,
              textAlign: "center",
            }}
          >
            <CheckCircle2
              className="mx-auto mb-3"
              style={{ color: "var(--terracotta)", width: 36, height: 36 }}
            />
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: "clamp(22px, 3vw, 30px)",
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                marginBottom: 14,
              }}
            >
              Building in {s.name}? Let&apos;s scope it.
            </h3>
            <p
              style={{
                fontSize: 16,
                color: "rgba(242,239,230,0.85)",
                maxWidth: "52ch",
                margin: "0 auto 24px",
                lineHeight: 1.55,
              }}
            >
              Send a brief. If we&apos;re a fit for {s.name}, you&apos;ll get a
              Cal.com link back within 8 hours. Fixed-price scope in 48h.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/discovery-call"
                className="inline-flex items-center gap-2"
                style={{
                  background: "var(--terracotta)",
                  color: "var(--cream-3)",
                  padding: "14px 22px",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: 14,
                  borderRadius: 2,
                  border: "none",
                }}
              >
                <Calendar className="w-4 h-4" />
                Apply from {s.abbr}
              </Link>
              <a
                href="#livechat-open"
                className="inline-flex items-center gap-2"
                style={{
                  background: "transparent",
                  color: "var(--cream-3)",
                  border: "1px solid rgba(242,239,230,0.4)",
                  padding: "13px 21px",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: 14,
                  borderRadius: 2,
                }}
              >
                <MessageCircle className="w-4 h-4" />
                Live chat instead
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2"
                style={{
                  background: "transparent",
                  color: "var(--cream-3)",
                  border: "1px solid rgba(242,239,230,0.4)",
                  padding: "13px 21px",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: 14,
                  borderRadius: 2,
                }}
              >
                All contact options
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Local SEO keyword expansion */}
      <section className="py-16 md:py-20" style={{ background: "var(--cream-3)" }}>
        <div className="container-x px-6">
          <div className="max-w-3xl mb-12">
            <div className="mb-5" style={eyebrow}>
              <span style={eyebrowRule} />
              Local intent · {s.name}
            </div>
            <h2 style={h2Style}>
              Searching in {s.abbr}?{" "}
              <em style={emTerra}>You&apos;re in the right place.</em>
            </h2>
            <p style={{ fontSize: 16, color: "var(--ink-2)", lineHeight: 1.6 }}>
              Whatever exact phrase brought you here — &ldquo;n8n expert near{" "}
              {s.cities[0]}&rdquo;, &ldquo;GoHighLevel agency in {s.abbr}&rdquo;,
              &ldquo;AI chatbot consultant for {s.industries[0]}&rdquo; — these
              are all the same one operator. Click any phrase to scope that
              service for {s.name}.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {allServices.map((svc) => {
              const Icon =
                ((Icons as unknown) as Record<string, IconCmp>)[svc.icon] ??
                ((Icons as unknown) as Record<string, IconCmp>).Bot;
              const phrases = buildKeywordPhrases(svc, s);
              return (
                <div key={svc.slug} style={{ ...cardCream, padding: 24 }}>
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="flex items-center justify-center flex-shrink-0"
                      style={{
                        width: 44,
                        height: 44,
                        background: "rgba(198,107,63,0.10)",
                        border: "1px solid rgba(198,107,63,0.30)",
                        borderRadius: 2,
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 500,
                          fontSize: 18,
                          color: "var(--ink)",
                          marginBottom: 4,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {svc.label} — {s.name}
                      </h3>
                      <p style={{ fontSize: 13, color: "var(--ink-faint)", lineHeight: 1.5 }}>
                        {svc.desc}
                      </p>
                    </div>
                    <Link
                      href={`/services/${svc.slug}`}
                      className="hidden sm:inline-flex items-center gap-1.5"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--terracotta)",
                        textDecoration: "none",
                      }}
                    >
                      Scope it
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {phrases.map((p) => (
                      <Link
                        key={p}
                        href={`/services/${svc.slug}`}
                        style={{
                          padding: "6px 12px",
                          borderRadius: 9999,
                          background: "var(--cream-3)",
                          border: "1px solid rgba(26,26,26,0.12)",
                          color: "var(--ink-2)",
                          fontSize: 12,
                          fontFamily: "var(--font-mono)",
                          fontWeight: 500,
                          textDecoration: "none",
                          transition: "border-color 0.18s",
                        }}
                      >
                        {p}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cities + Industries panel */}
      <section className="py-16 md:py-20" style={{ background: "var(--cream)" }}>
        <div className="container-x px-6">
          <div style={{ ...cardCream, padding: "40px 32px", maxWidth: "920px", margin: "0 auto" }}>
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <div className="mb-3" style={eyebrow}>
                  <span style={eyebrowRule} />
                  Cities served in {s.name}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    fontSize: 24,
                    color: "var(--ink)",
                    letterSpacing: "-0.015em",
                    marginBottom: 16,
                  }}
                >
                  AI automation across {s.abbr}
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
                  {s.cities.map((city) => (
                    <li
                      key={city}
                      className="flex items-center gap-2"
                      style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.5 }}
                    >
                      <MapPin
                        className="w-4 h-4 flex-shrink-0"
                        style={{ color: "var(--terracotta)" }}
                      />
                      <span>AI automation services in {city}, {s.abbr}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="mb-3" style={eyebrow}>
                  <span style={eyebrowRule} />
                  Industries served
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    fontSize: 24,
                    color: "var(--ink)",
                    letterSpacing: "-0.015em",
                    marginBottom: 16,
                  }}
                >
                  Built for {s.name} verticals
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--ink-2)",
                    lineHeight: 1.6,
                    marginBottom: 16,
                  }}
                >
                  Most {s.name} engagements come from{" "}
                  <strong style={{ color: "var(--terracotta)", fontWeight: 600 }}>
                    {s.industries[0]}
                  </strong>
                  ,{" "}
                  <strong style={{ color: "var(--terracotta)", fontWeight: 600 }}>
                    {s.industries[1]}
                  </strong>
                  , and{" "}
                  <strong style={{ color: "var(--terracotta)", fontWeight: 600 }}>
                    {s.industries[2]}
                  </strong>{" "}
                  operators looking to cut admin time and ship lead capture that
                  actually works.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--terracotta)",
                    textDecoration: "none",
                  }}
                >
                  Get a {s.name} engagement scoped
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby states */}
      <section className="py-16 md:py-20" style={{ background: "var(--cream-3)" }}>
        <div className="container-x px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="mb-3" style={eyebrow}>
                <span style={eyebrowRule} />
                Nearby states
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: 26,
                  color: "var(--ink)",
                  letterSpacing: "-0.02em",
                  marginBottom: 14,
                }}
              >
                Also active in
              </h3>
              <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.6 }}>
                SkynetLabs delivers AI automation across all 48 contiguous US
                states. {s.name} engagements run alongside builds for operators
                in every other state.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {STATES.filter((x) => x.slug !== s.slug)
                .slice(0, 12)
                .map((other) => (
                  <Link
                    key={other.slug}
                    href={`/locations/${other.slug}`}
                    style={{
                      padding: "6px 12px",
                      borderRadius: 9999,
                      background: "var(--cream-2)",
                      border: "1px solid rgba(26,26,26,0.12)",
                      color: "var(--ink-2)",
                      fontSize: 12,
                      fontFamily: "var(--font-mono)",
                      fontWeight: 500,
                      textDecoration: "none",
                    }}
                  >
                    {other.name}
                  </Link>
                ))}
              <Link
                href="/locations"
                style={{
                  padding: "6px 12px",
                  borderRadius: 9999,
                  background: "var(--terracotta)",
                  color: "var(--cream-3)",
                  fontSize: 12,
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                  textDecoration: "none",
                  border: "1px solid var(--terracotta)",
                }}
              >
                All 48 states →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
