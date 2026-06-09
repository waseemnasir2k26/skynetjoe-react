/**
 * /locations/[state] — programmatic SEO landing for each of 48 US states.
 *
 * skyv3 restyle 2026-06-07:
 *   - Wrapped in <div className="sky"> — adopts the /lp/logistics design language.
 *   - Hero → .hero pattern, copy DRIVEN by per-state data (s.name / s.abbr / s.cities).
 *   - Sections converted to .sky rhythm (.section / .section-head / .section-kicker
 *     / h2 + <em> / .section-sub); service + keyword cards use .feat-card.
 *   - Closer uses .closer pattern.
 *   - Schema, copy, generateStaticParams, generateMetadata, enrichment, Texas
 *     callout, keyword expansion, cities/industries panel, nearby states preserved.
 *   - CTA label kept as the unified "Book a free 30-min audit" (= SITE.cta.label).
 */

import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import * as Icons from "lucide-react";
import { ArrowRight, MapPin } from "lucide-react";
import { STATES, getStateBySlug } from "@/lib/states";
import { SERVICE_CATEGORIES, SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
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
      creator: "@skynetlabs",
    },
  };
}

const cardCream = {
  background: "var(--cream-3)",
  border: "1px solid var(--rule)",
  padding: 24,
  borderRadius: 4,
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
    (c) => c.services as readonly SvcItem[],
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
    ],
  };

  return (
    <div className="sky">
      <JsonLd data={schema} />

      {/* HERO — skyv3 pattern, copy driven by per-state data */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-inner" style={{ textAlign: "left" }}>
            <Breadcrumbs
              bare
              marginBottom={24}
              items={[
                { label: "Home", href: "/" },
                { label: "Locations", href: "/locations" },
                { label: s.name },
              ]}
            />

            <div className="hero-eyebrow">
              <span className="pulse"></span>
              Serving <strong>{s.name}</strong>&nbsp;· {s.abbr}
            </div>

            <h1 style={{ marginLeft: 0, marginRight: 0, maxWidth: "16ch" }}>
              AI automation expert in <em>{s.name}.</em>
            </h1>

            <p className="hero-sub" style={{ marginLeft: 0, marginRight: 0 }}>
              {s.name} founders waste 14+ hours a week on work software should
              already be doing. SkynetLabs builds the automations, smart
              websites, and chat agents that take it off your plate — for
              operators across{" "}
              <strong>{s.cities.slice(0, 3).join(", ")}</strong> and beyond.
              Fixed scope, public pricing, 5–14 day ship window — delivered
              remotely from Bali.
            </p>

            <div className="cta-row" style={{ justifyContent: "flex-start" }}>
              <Link
                href={SITE.cta.href}
                className="btn-primary"
                data-meta-event="Schedule"
                data-meta-name="state-hero-book-audit"
              >
                {SITE.cta.label} →
              </Link>
              <a href="#livechat-open" className="btn-line">
                Live chat
              </a>
              <Link href="/pricing" className="btn-line">
                See pricing first
              </Link>
            </div>

            <div className="hero-scarcity">
              <strong>Limited monthly builds</strong>&nbsp;· 8-hour reply window
            </div>
          </div>
        </div>
      </section>

      {/* Texas-specific industry deep-guide callout */}
      {s.slug === "texas" && (
        <section className="section dark" style={{ padding: "40px 0" }}>
          <div className="wrap">
            <div className="max-w-4xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <span className="section-kicker">Industry deep guide</span>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "clamp(22px, 3vw, 30px)",
                    color: "var(--cream)",
                    margin: "8px 0 0",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Building for Texas freight or logistics?
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "rgba(242, 239, 230, 0.72)",
                    margin: "6px 0 0",
                  }}
                >
                  3,000-word deep guide — Houston midstream, DFW wholesale,
                  Austin tech-trucking, Laredo cross-border, Permian oilfield.
                </p>
              </div>
              <Link
                href="/industries/freight-logistics/texas"
                className="btn-primary flex-shrink-0"
                style={{ background: "var(--terracotta)" }}
              >
                Open the TX freight guide →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ENRICHMENT — state-specific 220-280 word block, indexability-gated */}
      {enrichment && (
        <section className="section tinted">
          <div className="wrap">
            <div className="section-head" style={{ marginBottom: 0 }}>
              <span className="section-kicker">What we ship in {s.name}</span>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 18,
                  lineHeight: 1.72,
                  color: "var(--ink)",
                  margin: 0,
                  maxWidth: "62ch",
                }}
              >
                {enrichment}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Stats */}
      <section className="section" style={{ padding: "48px 0" }}>
        <div className="wrap">
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
                    fontWeight: 700,
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
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="section-kicker">
              Every service, available in {s.name}
            </span>
            <h2>
              16 builds for {s.name} <em>operators.</em>
            </h2>
            <p className="section-sub">
              From {s.industries[0]} practices in {s.cities[0]} to{" "}
              {s.industries[1]} firms in {s.cities[1]} and {s.industries[2]}{" "}
              operations in {s.cities[2]} — these 16 services are ready to ship
              into your stack.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {SERVICE_CATEGORIES.map((cat) => (
              <div key={cat.name}>
                <h3
                  className="flex items-center gap-3 mb-5"
                  style={{
                    fontFamily: "var(--font-mono-plex), monospace",
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: "var(--terracotta)",
                    fontWeight: 600,
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
                      (Icons as unknown as Record<string, IconCmp>)[svc.icon] ??
                      (Icons as unknown as Record<string, IconCmp>).Bot;
                    return (
                      <Link
                        key={svc.slug}
                        href={`/services/${svc.slug}`}
                        className="feat-card group relative"
                        style={{ display: "block", padding: 24 }}
                      >
                        <div
                          className="flex items-center justify-center mb-3"
                          style={{
                            width: 44,
                            height: 44,
                            background: "var(--terracotta-soft)",
                            border: "1px solid rgba(198,107,63,0.30)",
                            borderRadius: 4,
                            color: "var(--terracotta)",
                          }}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <h4
                          style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 600,
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
                            fontFamily: "var(--font-mono-plex), monospace",
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
        </div>
      </section>

      {/* Popular services in {state} */}
      <section className="section tinted">
        <div className="wrap">
          <div className="section-head">
            <span className="section-kicker">Services · {s.name}</span>
            <h2>
              Popular services in <em>{s.name}</em>.
            </h2>
            <p className="section-sub">
              Every build below is delivered remotely to {s.name} founders —
              fixed scope, public pricing. Pick a service to see what it
              includes and scope it for your business.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allServices.map((svc) => {
              const Icon =
                (Icons as unknown as Record<string, IconCmp>)[svc.icon] ??
                (Icons as unknown as Record<string, IconCmp>).Bot;
              return (
                <Link
                  key={svc.slug}
                  href={`/services/${svc.slug}`}
                  style={{ ...cardCream, textDecoration: "none" }}
                  className="flex items-start gap-3"
                >
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      width: 40,
                      height: 40,
                      background: "var(--terracotta-soft)",
                      border: "1px solid rgba(198,107,63,0.30)",
                      borderRadius: 4,
                      color: "var(--terracotta)",
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 600,
                        fontSize: 16,
                        color: "var(--ink)",
                        marginBottom: 4,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {svc.label}
                    </h3>
                    <p
                      style={{
                        fontSize: 13,
                        color: "var(--ink-faint)",
                        lineHeight: 1.5,
                      }}
                    >
                      {svc.desc}
                    </p>
                  </div>
                  <ArrowRight
                    className="w-4 h-4 flex-shrink-0 mt-1"
                    style={{ color: "var(--terracotta)" }}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cities + Industries panel */}
      <section className="section">
        <div className="wrap">
          <div
            style={{
              ...cardCream,
              padding: "40px 32px",
              maxWidth: 920,
              margin: "0 auto",
            }}
          >
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <span className="section-kicker">
                  Cities served in {s.name}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 24,
                    color: "var(--ink)",
                    letterSpacing: "-0.015em",
                    margin: "8px 0 16px",
                  }}
                >
                  AI automation across {s.abbr}
                </h3>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "grid",
                    gap: 8,
                  }}
                >
                  {s.cities.map((city) => (
                    <li
                      key={city}
                      className="flex items-center gap-2"
                      style={{
                        fontSize: 14,
                        color: "var(--ink-2)",
                        lineHeight: 1.5,
                      }}
                    >
                      <MapPin
                        className="w-4 h-4 flex-shrink-0"
                        style={{ color: "var(--terracotta)" }}
                      />
                      <span>
                        AI automation services in {city}, {s.abbr}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="section-kicker">Industries served</span>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 24,
                    color: "var(--ink)",
                    letterSpacing: "-0.015em",
                    margin: "8px 0 16px",
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
                  <strong
                    style={{ color: "var(--terracotta)", fontWeight: 700 }}
                  >
                    {s.industries[0]}
                  </strong>
                  ,{" "}
                  <strong
                    style={{ color: "var(--terracotta)", fontWeight: 700 }}
                  >
                    {s.industries[1]}
                  </strong>
                  , and{" "}
                  <strong
                    style={{ color: "var(--terracotta)", fontWeight: 700 }}
                  >
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
      <section className="section tinted">
        <div className="wrap">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="section-kicker">Nearby states</span>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 26,
                  color: "var(--ink)",
                  letterSpacing: "-0.02em",
                  margin: "8px 0 14px",
                }}
              >
                Also active in
              </h3>
              <p
                style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.6 }}
              >
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
                      background: "var(--cream-3)",
                      border: "1px solid var(--rule)",
                      color: "var(--ink-2)",
                      fontSize: 12,
                      fontFamily: "var(--font-mono-plex), monospace",
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
                  color: "var(--cream)",
                  fontSize: 12,
                  fontFamily: "var(--font-mono-plex), monospace",
                  fontWeight: 700,
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

      {/* CLOSER — skyv3 pattern */}
      <section className="closer">
        <div className="closer-scarcity">Building in {s.name}?</div>
        <h2>
          Let&apos;s <em>scope it.</em>
        </h2>
        <p>
          Send a brief. If we&apos;re a fit for {s.name}, you&apos;ll get a
          Cal.com link back within 8 hours. Fixed-price scope in 48h.
        </p>
        <div className="cta-row">
          <Link
            href={SITE.cta.href}
            className="btn-primary"
            data-meta-event="Schedule"
            data-meta-name="state-closer-book-audit"
          >
            {SITE.cta.label} →
          </Link>
          <Link href="/contact" className="btn-line">
            All contact options
          </Link>
        </div>
      </section>
    </div>
  );
}
