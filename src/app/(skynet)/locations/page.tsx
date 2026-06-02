/**
 * /locations — index of the 48 contiguous US state pages.
 *
 * Cream-pivot port 2026-05-25:
 *   - Hero: cream-3 bg, Fraunces H1 with terracotta <em>, mono eyebrow
 *   - Service hub: cream cards with 1px ink border, terracotta icon wash
 *   - 48-state grid: cream-2 cards with state abbr in terracotta mono
 *   - CTA strip: ink panel (was cyan→teal gradient)
 *   - State cards demoted h2 → h3 to fix heading-level skip
 *     (H1 hero → H2 section headers → H3 state cards).
 */

import Link from "next/link";
import type { Metadata } from "next";
import * as Icons from "lucide-react";
import { MapPin, ArrowUpRight, ArrowRight, MessageCircle, Calendar, CheckCircle2 } from "lucide-react";
import { STATES } from "@/lib/states";
import { SITE, SERVICE_CATEGORIES, DEFAULT_OG_IMAGES } from "@/lib/site";
import { PRIORITY_STATE_SLUGS } from "@/data/state-priority";
import JsonLd from "@/components/JsonLd";
import USStatesMap from "@/components/locations/USStatesMap";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

type IconCmp = React.ComponentType<{ className?: string }>;

export const metadata: Metadata = {
  title: "AI Automation Services Across All 48 US States | SkynetLabs",
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
};

// Shared cream-pivot inline styles
const eyebrow = {
  fontFamily: "var(--font-mono)",
  fontSize: 11 as const,
  textTransform: "uppercase" as const,
  letterSpacing: "0.16em",
  color: "var(--terracotta-aa)",
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
  fontWeight: 600,
  letterSpacing: "-0.02em",
  lineHeight: 1.08,
  color: "var(--ink)",
  fontSize: "clamp(28px, 4vw, 44px)",
  marginBottom: 14,
};
const emTerra = {
  fontStyle: "normal" as const,
  color: "var(--terracotta-aa)",
  fontWeight: 700,
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
        <Reveal className="container-x px-6 max-w-4xl">
          <div className="mb-6" style={eyebrow}>
            <span style={eyebrowRule} />
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "var(--terracotta)", display: "inline-block" }}
            />
            Active in all 48 states
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              letterSpacing: "-0.025em",
              lineHeight: 1.04,
              color: "var(--ink)",
              fontSize: "clamp(40px, 6vw, 68px)",
              margin: "0 0 24px",
            }}
          >
            AI Automation Services,{" "}
            <em style={emTerra}>delivered across the lower 48.</em>
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
            SkynetLabs ships n8n workflows, GoHighLevel CRM systems, AEO-tuned
            websites and live-chat agents to founders in every contiguous US
            state — from{" "}
            <Link
              href="/locations/california"
              style={{
                color: "var(--terracotta-aa)",
                textDecoration: "underline",
                textDecorationColor: "rgba(198,107,63,0.4)",
                textUnderlineOffset: 4,
              }}
            >
              California
            </Link>{" "}
            and{" "}
            <Link
              href="/locations/texas"
              style={{
                color: "var(--terracotta-aa)",
                textDecoration: "underline",
                textDecorationColor: "rgba(198,107,63,0.4)",
                textUnderlineOffset: 4,
              }}
            >
              Texas
            </Link>{" "}
            to{" "}
            <Link
              href="/locations/new-york"
              style={{
                color: "var(--terracotta-aa)",
                textDecoration: "underline",
                textDecorationColor: "rgba(198,107,63,0.4)",
                textUnderlineOffset: 4,
              }}
            >
              New York
            </Link>{" "}
            and{" "}
            <Link
              href="/locations/minnesota"
              style={{
                color: "var(--terracotta-aa)",
                textDecoration: "underline",
                textDecorationColor: "rgba(198,107,63,0.4)",
                textUnderlineOffset: 4,
              }}
            >
              Minnesota
            </Link>
            . All engagements run remote from Bali (GMT+8) with an 8-hour
            weekday reply guarantee.
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
              Apply for a call
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
          </div>
        </Reveal>
      </section>

      {/* Coverage MAP — interactive 48-state SVG */}
      <section
        className="py-20 md:py-24"
        style={{
          background: "var(--cream)",
          borderBottom: "1px solid rgba(26,26,26,0.08)",
        }}
      >
        <div
          className="container-x px-6"
          style={{ maxWidth: 1180, margin: "0 auto", textAlign: "center" }}
        >
          <div
            className="mb-5"
            style={{ ...eyebrow, justifyContent: "center" }}
          >
            <span style={eyebrowRule} />
            Coverage · 2026
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
              color: "var(--ink)",
              fontSize: "clamp(32px, 5vw, 48px)",
              marginBottom: 18,
            }}
          >
            Available in <em style={emTerra}>all 48 states.</em>
          </h2>
          <p
            style={{
              fontSize: 18,
              color: "var(--ink-2)",
              lineHeight: 1.6,
              maxWidth: 720,
              margin: "0 auto 48px",
            }}
          >
            One operator, every state. Click any state to see the work we
            do there and a 5-city map of where we&apos;ve already shipped.
            The 8 highlighted states are our priority markets — covered in
            the most detail.
          </p>

          <USStatesMap />

          {/* Stats grid */}
          <RevealGroup
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            style={{ marginTop: 64 }}
          >
            {[
              { value: "48", label: "Contiguous states served" },
              { value: String(PRIORITY_STATE_SLUGS.length), label: "Priority markets, covered in depth" },
              { value: "180+", label: "Workflows shipped" },
              { value: "9", label: "Countries (US is one)" },
            ].map((stat) => (
              <RevealItem
                key={stat.label}
                style={{
                  background: "var(--cream-2)",
                  border: "1px solid rgba(26,26,26,0.12)",
                  padding: "28px 20px",
                  borderRadius: 2,
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(36px, 5vw, 52px)",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                    color: "var(--terracotta-aa)",
                    marginBottom: 10,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    color: "var(--ink-2)",
                    lineHeight: 1.4,
                  }}
                >
                  {stat.label}
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          {/* CTA */}
          <div style={{ marginTop: 48 }}>
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
                textDecoration: "none",
              }}
            >
              <Calendar className="w-4 h-4" />
              Book a free 30-min call
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* All Services Hub + Book a Call */}
      <section className="py-16 md:py-20" style={{ background: "var(--cream)" }}>
        <div className="container-x px-6">
          <Reveal className="max-w-3xl mb-12">
            <div className="mb-5" style={eyebrow}>
              <span style={eyebrowRule} />
              16 services · 48 states · one operator
            </div>
            <h2 style={h2Style}>
              Every service ships{" "}
              <em style={emTerra}>into every state.</em>
            </h2>
            <p
              style={{
                fontSize: 17,
                color: "var(--ink-2)",
                lineHeight: 1.6,
              }}
            >
              Pick a service to scope it, or pick a state below to see how we
              describe it there plus the cities we cover.
            </p>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: 40, marginBottom: 40 }}>
            {SERVICE_CATEGORIES.map((cat) => (
              <div key={cat.name}>
                <h3
                  className="flex items-center gap-3 mb-5"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: "var(--terracotta-aa)",
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
                  {cat.name}
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
                          background: "var(--cream-2)",
                          border: "1px solid rgba(26,26,26,0.12)",
                          padding: 20,
                          borderRadius: 2,
                          textDecoration: "none",
                          transition: "border-color 0.18s",
                        }}
                      >
                        <div
                          className="flex items-center justify-center mb-3"
                          style={{
                            width: 40,
                            height: 40,
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

          {/* Ink CTA strip — replaces dark blue→teal gradient panel */}
          <div
            style={{
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
              Not sure which service fits your state?
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
              Send a brief through our short application. If we&apos;re a fit,
              you&apos;ll have a Cal.com link in your inbox within 8 hours. No
              funnel, no upsell.
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
                Apply for a call
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
                See all contact options
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 48-state grid */}
      <section className="py-16 md:py-20" style={{ background: "var(--cream-3)" }}>
        <div className="container-x px-6">
          <Reveal className="max-w-3xl mb-10">
            <div className="mb-5" style={eyebrow}>
              <span style={eyebrowRule} />
              Pick your state
            </div>
            <h2 style={h2Style}>
              Every contiguous US state,{" "}
              <em style={emTerra}>ready when you are.</em>
            </h2>
            <p
              style={{
                fontSize: 17,
                color: "var(--ink-2)",
                lineHeight: 1.6,
              }}
            >
              Each state page lists every service in local terms, 5 major-city
              callouts, and the industries we&apos;ve already served there.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {STATES.map((s) => (
              <Link
                key={s.slug}
                href={`/locations/${s.slug}`}
                className="group relative"
                style={{
                  background: "var(--cream-2)",
                  border: "1px solid rgba(26,26,26,0.12)",
                  padding: 20,
                  borderRadius: 2,
                  textDecoration: "none",
                  transition: "border-color 0.18s",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <MapPin
                    className="w-4 h-4"
                    style={{ color: "var(--terracotta)" }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--terracotta-aa)",
                      fontWeight: 600,
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
                    fontWeight: 500,
                    fontSize: 16,
                    color: "var(--ink)",
                    marginBottom: 4,
                    letterSpacing: "-0.01em",
                    lineHeight: 1.2,
                  }}
                >
                  AI Automation in {s.name}
                </h3>
                <p
                  style={{
                    fontSize: 12,
                    color: "var(--ink-faint)",
                  }}
                >
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
    </>
  );
}
