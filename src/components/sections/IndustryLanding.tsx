/**
 * IndustryLanding — single reusable React Server Component that renders an
 * 8-section niche vertical landing page from a typed Industry config.
 *
 * Sections (in order):
 *   1. Hero (eyebrow + H1 + subhead + dual CTA)
 *   2. 3-pain block
 *   3. Flagship product section
 *   4. 3-module stack
 *   5. 2-3 niche case study teasers
 *   5.5 Founder mini-bio (Waseem photo + "why I'm right for this niche")
 *   6. Pricing strip (3 tiers)
 *   7. FAQ (5-6 items, plain accordion-style markup with details/summary so it's
 *       readable by AEO crawlers without client-side JS)
 *   8. Final CTA
 *
 * All copy is driven by the Industry config in src/data/industries.ts.
 *
 * Cream-pivot port 2026-05-25 — matches sitewide editorial system:
 *   bg cream/cream-2/cream-3, Fraunces H1+H2 with terracotta <em>,
 *   1px ink border cards, flat terracotta CTAs, no dark gradients.
 *   Data shape (Industry config) intentionally unchanged.
 */

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Boxes,
  TrendingUp,
  MapPin,
  Quote,
} from "lucide-react";
import type { Industry } from "@/data/industries";

type Props = { industry: Industry };

// Shared inline styles for repeated cream-pivot patterns.
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
const h1Style = {
  fontFamily: "var(--font-display)",
  fontWeight: 500,
  letterSpacing: "-0.025em",
  lineHeight: 1.04,
  color: "var(--ink)",
  fontSize: "clamp(40px, 6vw, 68px)",
  margin: "0 0 24px",
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
const cardCream = {
  background: "var(--cream-2)",
  border: "1px solid rgba(26,26,26,0.12)",
  padding: 28,
  borderRadius: 2,
};
const ctaPrimary = {
  background: "var(--terracotta)",
  color: "var(--cream-3)",
  padding: "16px 28px",
  fontFamily: "var(--font-sans)",
  fontWeight: 600,
  fontSize: 15,
  borderRadius: 2,
  border: "none",
};
const ctaSecondary = {
  background: "transparent",
  color: "var(--ink)",
  border: "1px solid var(--ink)",
  padding: "15px 26px",
  fontFamily: "var(--font-sans)",
  fontWeight: 600,
  fontSize: 15,
  borderRadius: 2,
};

export default function IndustryLanding({ industry: i }: Props) {
  return (
    <>
      {/* 1. HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative pt-28 md:pt-36 pb-16"
        style={{
          background: "var(--cream-3)",
          borderBottom: "1px solid rgba(26,26,26,0.10)",
        }}
      >
        <div className="container-x px-6 relative z-10 max-w-4xl">
          <div className="mb-6" style={eyebrow}>
            <span style={eyebrowRule} />
            <Sparkles className="w-3 h-3" /> {i.eyebrowChip}
          </div>
          <h1 style={h1Style}>
            {i.heroH1.split(/(?<=[.!?])\s+/).map((sentence, idx, arr) =>
              idx === arr.length - 1 && arr.length > 1 ? (
                <em
                  key={idx}
                  style={{
                    fontStyle: "normal",
                    color: "var(--terracotta)",
                    fontWeight: 700,
                  }}
                >
                  {sentence}
                </em>
              ) : (
                <span key={idx}>{sentence} </span>
              ),
            )}
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
            {i.heroSubhead}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={i.heroCtaPrimary.href}
              className="inline-flex items-center gap-2"
              style={ctaPrimary}
            >
              {i.heroCtaPrimary.label}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={i.heroCtaSecondary.href}
              className="inline-flex items-center gap-2"
              style={ctaSecondary}
            >
              {i.heroCtaSecondary.label}
            </Link>
          </div>
        </div>
      </section>

      {/* 2. 3-PAIN BLOCK ─────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20" style={{ background: "var(--cream)" }}>
        <div className="container-x px-6">
          <div className="max-w-3xl mb-12">
            <div className="mb-5" style={eyebrow}>
              <span style={eyebrowRule} />
              Where you&apos;re losing customers
            </div>
            <h2 style={h2Style}>
              Three problems every {i.shortName} operator is{" "}
              <em
                style={{
                  fontStyle: "normal",
                  color: "var(--terracotta)",
                  fontWeight: 700,
                }}
              >
                paying for, whether they know it or not.
              </em>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {i.painPoints.map((p, idx) => (
              <div key={idx} style={cardCream}>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    fontSize: 44,
                    color: "var(--terracotta)",
                    opacity: 0.35,
                    lineHeight: 1,
                    marginBottom: 14,
                  }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    fontSize: 20,
                    color: "var(--ink)",
                    lineHeight: 1.2,
                    marginBottom: 12,
                    letterSpacing: "-0.015em",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--ink-2)",
                    lineHeight: 1.6,
                  }}
                >
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FLAGSHIP PRODUCT ────────────────────────────────────────────── */}
      <section className="py-16 md:py-20" style={{ background: "var(--cream-3)" }}>
        <div className="container-x px-6">
          <div
            style={{
              background: "var(--cream-2)",
              border: "1px solid rgba(26,26,26,0.18)",
              padding: "48px 32px",
              borderRadius: 2,
              maxWidth: "880px",
              margin: "0 auto",
            }}
          >
            <div className="mb-5" style={eyebrow}>
              <span style={eyebrowRule} />
              The flagship system
            </div>
            <h2 style={{ ...h2Style, marginBottom: 18 }}>
              {i.flagshipProductName}
            </h2>
            <p
              style={{
                fontSize: 18,
                color: "var(--ink-2)",
                lineHeight: 1.6,
                marginBottom: 28,
              }}
            >
              {i.flagshipProductLede}
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px" }}>
              {i.flagshipProductBullets.map((b, idx) => (
                <li
                  key={idx}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "24px 1fr",
                    gap: 14,
                    alignItems: "start",
                    padding: "12px 0",
                    borderBottom: "1px solid rgba(26,26,26,0.08)",
                    fontSize: 15,
                    color: "var(--ink-2)",
                    lineHeight: 1.55,
                  }}
                >
                  <CheckCircle2
                    className="w-5 h-5"
                    style={{ color: "var(--terracotta)", marginTop: 2 }}
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/discovery-call"
              className="inline-flex items-center gap-2"
              style={ctaPrimary}
            >
              Scope the build
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. 3-MODULE STACK ──────────────────────────────────────────────── */}
      <section className="py-16 md:py-20" style={{ background: "var(--cream)" }}>
        <div className="container-x px-6">
          <div className="max-w-3xl mb-12">
            <div className="mb-5" style={eyebrow}>
              <span style={eyebrowRule} />
              The three modules
            </div>
            <h2 style={h2Style}>
              Built in three layers.{" "}
              <em
                style={{
                  fontStyle: "normal",
                  color: "var(--terracotta)",
                  fontWeight: 700,
                }}
              >
                Buy them together, or ship one at a time.
              </em>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {i.modules.map((m, idx) => (
              <div key={idx} style={{ ...cardCream, display: "flex", flexDirection: "column" }}>
                <div className="flex items-center gap-2 mb-3" style={{ ...eyebrow, fontSize: 10 }}>
                  <Boxes className="w-4 h-4" />
                  Module {idx + 1}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    fontSize: 22,
                    color: "var(--ink)",
                    lineHeight: 1.2,
                    marginBottom: 10,
                    letterSpacing: "-0.015em",
                  }}
                >
                  {m.name}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--ink-2)",
                    lineHeight: 1.55,
                    marginBottom: 18,
                  }}
                >
                  {m.oneLine}
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, marginTop: "auto" }}>
                  {m.bullets.map((b, j) => (
                    <li
                      key={j}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "18px 1fr",
                        gap: 10,
                        alignItems: "start",
                        padding: "8px 0",
                        fontSize: 13,
                        color: "var(--ink-2)",
                        lineHeight: 1.5,
                      }}
                    >
                      <CheckCircle2
                        className="w-4 h-4"
                        style={{ color: "var(--terracotta)", marginTop: 2 }}
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CASE TEASERS ─────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20" style={{ background: "var(--cream-3)" }}>
        <div className="container-x px-6">
          <div className="max-w-3xl mb-12">
            <div className="mb-5" style={eyebrow}>
              <span style={eyebrowRule} />
              Already shipped for {i.shortName} operators
            </div>
            <h2 style={h2Style}>
              Proof,{" "}
              <em
                style={{
                  fontStyle: "normal",
                  color: "var(--terracotta)",
                  fontWeight: 700,
                }}
              >
                not pitch decks.
              </em>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {i.caseTeasers.map((c, idx) => (
              <div key={idx} style={{ ...cardCream, display: "flex", flexDirection: "column" }}>
                <div
                  className="flex items-center gap-2 mb-3"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "var(--ink-faint)",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                  }}
                >
                  <MapPin className="w-3.5 h-3.5" style={{ color: "var(--terracotta)" }} />
                  {c.location}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    fontSize: 18,
                    color: "var(--ink)",
                    marginBottom: 10,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {c.clientName}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--ink-2)",
                    marginBottom: 18,
                    flex: 1,
                    lineHeight: 1.55,
                  }}
                >
                  {c.oneLineOutcome}
                </p>
                <div
                  style={{
                    borderTop: "1px solid rgba(26,26,26,0.10)",
                    paddingTop: 14,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      color: "var(--terracotta)",
                      marginBottom: 6,
                    }}
                  >
                    {c.metricLabel}
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span
                      style={{
                        fontSize: 13,
                        color: "var(--ink-faint)",
                        textDecoration: "line-through",
                      }}
                    >
                      {c.metricBefore}
                    </span>
                    <TrendingUp className="w-4 h-4" style={{ color: "var(--terracotta)" }} />
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 500,
                        fontSize: 22,
                        color: "var(--ink)",
                        letterSpacing: "-0.015em",
                      }}
                    >
                      {c.metricAfter}
                    </span>
                  </div>
                </div>
                {c.caseStudySlug && (
                  <Link
                    href={`/case-studies/${c.caseStudySlug}`}
                    className="inline-flex items-center gap-1.5 mt-4"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--terracotta)",
                      textDecoration: "none",
                    }}
                  >
                    Read full case study
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5.5 FOUNDER MINI-BIO ────────────────────────────────────────────── */}
      <section className="py-16 md:py-20" style={{ background: "var(--cream)" }}>
        <div className="container-x px-6">
          <div
            style={{
              background: "var(--cream-2)",
              border: "1px solid rgba(26,26,26,0.12)",
              padding: 40,
              borderRadius: 2,
              maxWidth: "920px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "260px 1fr",
              gap: 32,
              alignItems: "center",
            }}
            className="md:grid-cols-[260px_1fr]"
          >
            <div
              style={{
                position: "relative",
                width: 240,
                height: 240,
                borderRadius: 2,
                overflow: "hidden",
                border: "1px solid rgba(26,26,26,0.18)",
                margin: "0 auto",
              }}
            >
              <Image
                src={i.bioPhoto}
                alt={i.bioPhotoAlt}
                fill
                sizes="240px"
                className="object-cover"
              />
            </div>
            <div>
              <Quote className="w-6 h-6 mb-3" style={{ color: "var(--terracotta)" }} />
              <h2 style={{ ...h2Style, fontSize: "clamp(24px, 3vw, 32px)", marginBottom: 14 }}>
                {i.bioHeadline}
              </h2>
              <p
                style={{
                  fontSize: 17,
                  color: "var(--ink-2)",
                  lineHeight: 1.6,
                  marginBottom: 14,
                }}
              >
                {i.bioCopy}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--ink-faint)",
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                }}
              >
                Waseem Nasir · founder · SkynetLabs · Bali (GMT+8)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRICING STRIP ───────────────────────────────────────────────── */}
      <section className="py-16 md:py-20" style={{ background: "var(--cream-3)" }}>
        <div className="container-x px-6">
          <div className="max-w-3xl mb-12">
            <div className="mb-5" style={eyebrow}>
              <span style={eyebrowRule} />
              Pricing
            </div>
            <h2 style={h2Style}>
              Three tiers,{" "}
              <em
                style={{
                  fontStyle: "normal",
                  color: "var(--terracotta)",
                  fontWeight: 700,
                }}
              >
                tuned to your {i.shortName} stage.
              </em>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {i.pricingTiers.map((tier, idx) => {
              const featured = tier.featured;
              return (
                <div
                  key={idx}
                  style={{
                    background: featured ? "var(--ink)" : "var(--cream-2)",
                    color: featured ? "var(--cream-3)" : "var(--ink)",
                    border: featured
                      ? "1px solid var(--ink)"
                      : "1px solid rgba(26,26,26,0.12)",
                    padding: 28,
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {featured && (
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        textTransform: "uppercase",
                        letterSpacing: "0.16em",
                        color: "var(--terracotta)",
                        marginBottom: 14,
                        alignSelf: "flex-start",
                      }}
                    >
                      Most picked
                    </div>
                  )}
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 500,
                      fontSize: 24,
                      lineHeight: 1.15,
                      marginBottom: 6,
                      letterSpacing: "-0.015em",
                    }}
                  >
                    {tier.tierName}
                  </h3>
                  <p
                    style={{
                      fontSize: 13,
                      color: featured ? "rgba(242,239,230,0.7)" : "var(--ink-faint)",
                      marginBottom: 18,
                      lineHeight: 1.5,
                    }}
                  >
                    {tier.positioning}
                  </p>
                  <div style={{ marginBottom: 22 }}>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 500,
                        fontSize: 38,
                        letterSpacing: "-0.025em",
                      }}
                    >
                      {tier.price}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 12,
                        color: featured ? "rgba(242,239,230,0.6)" : "var(--ink-faint)",
                        marginLeft: 8,
                      }}
                    >
                      {tier.cadence}
                    </span>
                  </div>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      marginBottom: 22,
                      flex: 1,
                    }}
                  >
                    {tier.includes.map((line, j) => (
                      <li
                        key={j}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "18px 1fr",
                          gap: 10,
                          alignItems: "start",
                          padding: "8px 0",
                          fontSize: 14,
                          color: featured ? "rgba(242,239,230,0.9)" : "var(--ink-2)",
                          lineHeight: 1.5,
                        }}
                      >
                        <CheckCircle2
                          className="w-4 h-4"
                          style={{ color: "var(--terracotta)", marginTop: 2 }}
                        />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={tier.ctaHref}
                    className="inline-flex items-center justify-center gap-2"
                    style={
                      featured
                        ? {
                            background: "var(--terracotta)",
                            color: "var(--cream-3)",
                            padding: "14px 22px",
                            fontFamily: "var(--font-sans)",
                            fontWeight: 600,
                            fontSize: 14,
                            borderRadius: 2,
                            border: "none",
                            textDecoration: "none",
                          }
                        : {
                            background: "transparent",
                            color: "var(--ink)",
                            border: "1px solid var(--ink)",
                            padding: "13px 21px",
                            fontFamily: "var(--font-sans)",
                            fontWeight: 600,
                            fontSize: 14,
                            borderRadius: 2,
                            textDecoration: "none",
                          }
                    }
                  >
                    {tier.ctaLabel}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. FAQ (server-rendered details/summary so it's AEO-crawlable) ──── */}
      <section className="py-16 md:py-20" style={{ background: "var(--cream)" }}>
        <div className="container-x px-6" style={{ maxWidth: "780px", margin: "0 auto" }}>
          <div className="mb-10">
            <div className="mb-5" style={eyebrow}>
              <span style={eyebrowRule} />
              FAQs for {i.shortName} operators
            </div>
            <h2 style={h2Style}>
              Questions {i.shortName} owners ask{" "}
              <em
                style={{
                  fontStyle: "normal",
                  color: "var(--terracotta)",
                  fontWeight: 700,
                }}
              >
                before booking.
              </em>
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {i.faqs.map((f, idx) => (
              <details
                key={idx}
                className="group"
                style={{
                  background: "var(--cream-2)",
                  border: "1px solid rgba(26,26,26,0.12)",
                  padding: 20,
                  borderRadius: 2,
                }}
              >
                <summary
                  className="cursor-pointer flex justify-between items-center gap-4 list-none"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 16,
                    fontWeight: 600,
                    color: "var(--ink)",
                    lineHeight: 1.4,
                  }}
                >
                  <span>{f.q}</span>
                  <span
                    className="group-open:rotate-45 transition"
                    style={{
                      color: "var(--terracotta)",
                      fontSize: 24,
                      lineHeight: 1,
                      fontWeight: 300,
                      flexShrink: 0,
                    }}
                  >
                    +
                  </span>
                </summary>
                <p
                  style={{
                    fontSize: 15,
                    color: "var(--ink-2)",
                    marginTop: 16,
                    lineHeight: 1.6,
                  }}
                >
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA ────────────────────────────────────────────────────── */}
      <section
        className="py-20 md:py-24"
        style={{
          background: "var(--cream-3)",
          borderTop: "1px solid rgba(26,26,26,0.10)",
        }}
      >
        <div className="container-x px-6 max-w-3xl mx-auto text-center">
          <h2
            style={{
              ...h2Style,
              fontSize: "clamp(32px, 4.5vw, 48px)",
              maxWidth: "32ch",
              margin: "0 auto 18px",
            }}
          >
            {i.finalCtaHeadline}
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "var(--ink-2)",
              maxWidth: "52ch",
              margin: "0 auto 28px",
              lineHeight: 1.6,
            }}
          >
            {i.finalCtaSubhead}
          </p>
          <Link
            href={i.finalCtaHref}
            className="inline-flex items-center gap-2"
            style={ctaPrimary}
          >
            {i.finalCtaButtonLabel}
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--ink-faint)",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              marginTop: 20,
            }}
          >
            30-minute call · Bali hours: 1-hour reply · otherwise within 6 hours
          </p>
        </div>
      </section>
    </>
  );
}
