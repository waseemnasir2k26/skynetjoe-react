/**
 * /locations — index of the 48 contiguous US state pages.
 *
 * skyv3 restyle 2026-06-07:
 *   - Wrapped in <div className="sky"> — adopts the /lp/logistics design language.
 *   - Hero → .hero pattern (eyebrow+pulse, h1 + <em>, .hero-sub, .cta-row,
 *     .hero-scarcity, .featured-in).
 *   - Sections converted to .sky rhythm (.section / .section-head / .section-kicker
 *     / h2 + <em> / .section-sub).
 *   - Coverage map, 48-state grid, services hub, JSON-LD all preserved.
 *   - Closer uses .closer pattern.
 *   - CTA label kept as the unified "Book a free 30-min audit" (= SITE.cta.label).
 */

import Link from "next/link";
import type { Metadata } from "next";
import * as Icons from "lucide-react";
import { MapPin, ArrowUpRight } from "lucide-react";
import { STATES } from "@/lib/states";
import {
  SITE,
  SERVICE_CATEGORIES,
  DEFAULT_OG_IMAGES,
  twitterFromOpenGraph,
} from "@/lib/site";
import { PRIORITY_STATE_SLUGS } from "@/data/state-priority";
import JsonLd from "@/components/JsonLd";
import USStatesMap from "@/components/locations/USStatesMap";

type IconCmp = React.ComponentType<{ className?: string }>;

export const metadata: Metadata = {
  title: "AI Automation Services Across All 48 US States",
  description:
    "SkynetLabs delivers AI automation, n8n workflows, GoHighLevel CRM, AEO websites and live-chat agents to founders in all 48 contiguous US states. Pick your state — fixed scope, public pricing, 5–14 day ship.",
  alternates: { canonical: `${SITE.url}/locations` },
  openGraph: {
    title: "SkynetLabs — Active in all 48 US states",
    description:
      "AI automation services delivered to founders across the lower 48. Local intent, global stack.",
    url: `${SITE.url}/locations`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: twitterFromOpenGraph({
    title: "SkynetLabs — Active in all 48 US states",
    description:
      "AI automation services delivered to founders across the lower 48. Local intent, global stack.",
  }),
};

export default function LocationsIndexPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "AI Automation Services Across All 48 US States",
        description:
          "48-state directory of AI automation, n8n, GoHighLevel and AEO services delivered by SkynetLabs.",
        url: `${SITE.url}/locations`,
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: STATES.length,
          itemListElement: STATES.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE.url}/locations/${s.slug}`,
            name: `AI Automation in ${s.name}`,
          })),
        },
      },
      {
        "@type": "Service",
        name: "AI Automation Services — United States",
        provider: { "@type": "Organization", name: SITE.brand, url: SITE.url },
        areaServed: STATES.map((s) => ({
          "@type": "AdministrativeArea",
          name: s.name,
          containedInPlace: { "@type": "Country", name: "United States" },
        })),
        serviceType: "AI Automation",
      },
    ],
  };

  return (
    <div className="sky">
      <JsonLd data={schema} />

      {/* HERO — skyv3 (lp/logistics) design language */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-inner">
            <div className="hero-eyebrow">
              <span className="pulse"></span>
              Active in <strong>all 48 states</strong>
            </div>

            <h1>
              AI automation, <em>delivered across the lower 48.</em>
            </h1>

            <p className="hero-sub">
              SkynetLabs ships n8n workflows, GoHighLevel CRM systems, AEO-tuned
              websites and live-chat agents to founders in every contiguous US
              state — from <Link href="/locations/california">California</Link>{" "}
              and <Link href="/locations/texas">Texas</Link> to{" "}
              <Link href="/locations/new-york">New York</Link> and{" "}
              <Link href="/locations/minnesota">Minnesota</Link>.{" "}
              <strong>Remote from Bali (GMT+8)</strong> with an 8-hour weekday
              reply guarantee.
            </p>

            <div className="cta-row">
              <Link
                href={SITE.cta.href}
                className="btn-primary"
                data-meta-event="Schedule"
                data-meta-name="locations-hero-book-audit"
              >
                {SITE.cta.label} →
              </Link>
              <a href="#livechat-open" className="btn-line">
                Live chat
              </a>
            </div>

            <div className="hero-scarcity">
              <strong>Limited monthly builds</strong>&nbsp;· 8-hour reply window
            </div>

            <div className="featured-in">
              <span className="featured-lbl">Featured</span>
              <span>Upwork Top Rated Plus</span>
              <span>Fiverr Top Rated</span>
              <span>180+ workflows</span>
              <span>9 countries</span>
              <span>Claude Code Partner</span>
            </div>
          </div>
        </div>
      </section>

      {/* COVERAGE MAP — interactive 48-state SVG */}
      <section className="section tinted">
        <div className="wrap">
          <div
            className="section-head"
            style={{ textAlign: "center", margin: "0 auto 56px" }}
          >
            <span className="section-kicker">Coverage · 2026</span>
            <h2 style={{ marginLeft: "auto", marginRight: "auto" }}>
              Available in <em>all 48 states.</em>
            </h2>
            <p
              className="section-sub"
              style={{ marginLeft: "auto", marginRight: "auto" }}
            >
              One operator, every state. Click any state to see the work we do
              there and a 5-city map of where we&apos;ve already shipped. The 8
              highlighted states are our priority markets — covered in the most
              detail.
            </p>
          </div>

          <USStatesMap />

          {/* Stats grid */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            style={{ marginTop: 64 }}
          >
            {[
              { value: "48", label: "Contiguous states served" },
              {
                value: String(PRIORITY_STATE_SLUGS.length),
                label: "Priority markets, covered in depth",
              },
              { value: "180+", label: "Workflows shipped" },
              { value: "9", label: "Countries (US is one)" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: "var(--cream-3)",
                  border: "1px solid var(--rule)",
                  padding: "28px 20px",
                  borderRadius: 4,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(36px, 5vw, 52px)",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                    color: "var(--terracotta)",
                    marginBottom: 10,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono-plex), monospace",
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    color: "var(--ink-faint)",
                    lineHeight: 1.4,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 48, textAlign: "center" }}>
            <Link
              href={SITE.cta.href}
              className="btn-primary"
              data-meta-event="Schedule"
              data-meta-name="locations-map-book-audit"
            >
              {SITE.cta.label} →
            </Link>
          </div>
        </div>
      </section>

      {/* ALL SERVICES HUB */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="section-kicker">
              16 services · 48 states · one operator
            </span>
            <h2>
              Every service ships <em>into every state.</em>
            </h2>
            <p className="section-sub">
              Pick a service to scope it, or pick a state below to see how we
              describe it there plus the cities we cover.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 40,
              marginBottom: 40,
            }}
          >
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
                  {cat.name}
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
                        style={{ display: "block", padding: 20 }}
                      >
                        <div
                          className="flex items-center justify-center mb-3"
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
                        <h4
                          style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 600,
                            fontSize: 16,
                            color: "var(--ink)",
                            marginBottom: 6,
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {svc.label}
                        </h4>
                        <p
                          style={{
                            fontSize: 12,
                            color: "var(--ink-faint)",
                            lineHeight: 1.5,
                          }}
                        >
                          {svc.desc}
                        </p>
                        <ArrowUpRight
                          className="absolute top-4 right-4 w-4 h-4"
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

      {/* 48-STATE GRID */}
      <section className="section tinted">
        <div className="wrap">
          <div className="section-head">
            <span className="section-kicker">Pick your state</span>
            <h2>
              Every contiguous US state, <em>ready when you are.</em>
            </h2>
            <p className="section-sub">
              Each state page lists every service in local terms, 5 major-city
              callouts, and the industries we&apos;ve already served there.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {STATES.map((s) => (
              <Link
                key={s.slug}
                href={`/locations/${s.slug}`}
                className="feat-card group relative"
                style={{ display: "block", padding: 20 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <MapPin
                    className="w-4 h-4"
                    style={{ color: "var(--terracotta)" }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-mono-plex), monospace",
                      fontSize: 11,
                      color: "var(--terracotta)",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                    }}
                  >
                    {s.abbr}
                  </span>
                </div>
                {/* Demoted h2 → h3: state cards live under section H2 */}
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: 16,
                    color: "var(--ink)",
                    marginBottom: 4,
                    letterSpacing: "-0.01em",
                    lineHeight: 1.2,
                  }}
                >
                  AI Automation in {s.name}
                </h3>
                <p style={{ fontSize: 12, color: "var(--ink-faint)" }}>
                  {s.cities.slice(0, 2).join(", ")}
                </p>
                <ArrowUpRight
                  className="absolute top-4 right-4 w-4 h-4"
                  style={{ color: "var(--terracotta)" }}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSER — skyv3 pattern */}
      <section className="closer">
        <div className="closer-scarcity">
          Not sure which service fits your state?
        </div>
        <h2>
          Pick your state. <em>We&apos;ll scope the fix.</em>
        </h2>
        <p>
          Send a brief through our short application. If we&apos;re a fit,
          you&apos;ll have a Cal.com link in your inbox within 8 hours. No
          funnel, no upsell.
        </p>
        <div className="cta-row">
          <Link
            href={SITE.cta.href}
            className="btn-primary"
            data-meta-event="Schedule"
            data-meta-name="locations-closer-book-audit"
          >
            {SITE.cta.label} →
          </Link>
          <Link href="/contact" className="btn-line">
            See all contact options
          </Link>
        </div>
      </section>
    </div>
  );
}
