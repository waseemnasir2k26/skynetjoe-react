/**
 * IndustryLanding — single reusable React Server Component that renders an
 * 8-section niche vertical landing page from a typed Industry config.
 *
 * Sections (in order):
 *   1. Hero (eyebrow + H1 + subhead + dual CTA + featured strip)
 *   2. 3-pain block
 *   3. Flagship product section
 *   4. 3-module stack
 *   5. 2-3 niche case study teasers
 *   5.5 Founder mini-bio (Waseem photo + "why I'm right for this niche")
 *   6. Pricing strip (3 tiers)
 *   7. FAQ (5-6 items, details/summary so it's AEO-crawlable without JS)
 *   8. Final CTA (.closer)
 *
 * All copy is driven by the Industry config in src/data/industries.ts.
 *
 * Styled in the site `.sky` / skyv3 design language (the /lp/logistics look):
 *   classes from src/styles/skyv3.css, scoped under <div className="sky">.
 *   Reference implementation: src/components/sky/SkyHero.tsx.
 *   Data shape (Industry config) intentionally unchanged.
 */

import Link from "next/link";
import Image from "next/image";
import type { Industry } from "@/data/industries";

type Props = { industry: Industry };

/**
 * Split the per-industry H1 on sentence boundaries and wrap the final sentence
 * in a single <em> terracotta accent (the .sky h1 convention). Keeps the hero
 * copy driven by data — no hardcoded headline.
 */
function HeroHeadline({ text }: { text: string }) {
  const parts = text.split(/(?<=[.!?])\s+/);
  if (parts.length < 2) return <>{text}</>;
  const lead = parts.slice(0, -1).join(" ");
  const accent = parts[parts.length - 1];
  return (
    <>
      {lead} <em>{accent}</em>
    </>
  );
}

export default function IndustryLanding({ industry: i }: Props) {
  return (
    <div className="sky">
      {/* 1. HERO ─────────────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-inner">
            <div className="hero-eyebrow">
              <span className="pulse"></span>
              {i.eyebrowChip}
            </div>

            <h1>
              <HeroHeadline text={i.heroH1} />
            </h1>

            <p className="hero-sub">{i.heroSubhead}</p>

            <div className="cta-row">
              <Link
                href="/discovery-call"
                className="btn-primary"
                data-meta-event="Schedule"
                data-meta-name={`industry-${i.slug}-book-audit`}
              >
                Book a free 30-min audit →
              </Link>
              <Link href={i.heroCtaSecondary.href} className="btn-line">
                {i.heroCtaSecondary.label}
              </Link>
            </div>

            <div className="featured-in">
              <span className="featured-lbl">Featured</span>
              <span>Upwork Top Rated Plus</span>
              <span>Fiverr Top Rated</span>
              <span>180+ workflows</span>
              <span>9 countries</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 3-PAIN BLOCK ─────────────────────────────────────────────────── */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="section-kicker">
              Where you&apos;re losing customers
            </span>
            <h2>
              Three problems every {i.shortName} operator is{" "}
              <em>paying for, whether they know it or not.</em>
            </h2>
          </div>
          <div className="feature-row">
            {i.painPoints.map((p, idx) => (
              <div key={idx} className="feat-card">
                <span className="feat-tag">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="feat-title">{p.title}</h3>
                <p className="feat-body">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FLAGSHIP PRODUCT ────────────────────────────────────────────── */}
      <section className="section tinted">
        <div className="wrap">
          <div className="section-head">
            <span className="section-kicker">The flagship system</span>
            <h2>{i.flagshipProductName}</h2>
            <p className="section-sub">{i.flagshipProductLede}</p>
          </div>
          <div className="feature-row">
            <div className="feat-card">
              <span className="feat-tag">What it does</span>
              <h3 className="feat-title">Outcomes you can measure</h3>
              <ul className="feat-list">
                {i.flagshipProductBullets.map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
            </div>
            <div
              className="feat-card"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <span className="feat-tag">Scope it</span>
              <h3 className="feat-title">Fixed-scope, shipped in days.</h3>
              <p className="feat-body">
                Built for {i.name.toLowerCase()} — the tools, the vocabulary,
                the workflow. No horizontal template glued on top.
              </p>
              <Link
                href="/discovery-call"
                className="btn-primary"
                style={{ marginTop: 18, alignSelf: "flex-start" }}
              >
                Scope the build →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 3-MODULE STACK ──────────────────────────────────────────────── */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="section-kicker">The three modules</span>
            <h2>
              Built in three layers.{" "}
              <em>Buy them together, or ship one at a time.</em>
            </h2>
          </div>
          <div className="feature-row">
            {i.modules.map((m, idx) => (
              <div
                key={idx}
                className="feat-card"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <span className="feat-tag">Module {idx + 1}</span>
                <h3 className="feat-title">{m.name}</h3>
                <p className="feat-body">{m.oneLine}</p>
                <ul className="feat-list">
                  {m.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CASE TEASERS ─────────────────────────────────────────────────── */}
      <section className="section tinted">
        <div className="wrap">
          <div className="section-head">
            <span className="section-kicker">
              Already shipped for {i.shortName} operators
            </span>
            <h2>
              Proof, <em>not pitch decks.</em>
            </h2>
          </div>
          <div className="testi-row">
            {i.caseTeasers.map((c, idx) => (
              <div key={idx} className="testi-card">
                <div
                  className="mono"
                  style={{
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "var(--ink-faint)",
                    marginBottom: 12,
                  }}
                >
                  {c.location}
                </div>
                <p className="testi-quote">{c.oneLineOutcome}</p>
                <div
                  className="testi-meta"
                  style={{
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 8,
                  }}
                >
                  <div
                    className="mono"
                    style={{
                      fontSize: 10,
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      color: "var(--terracotta)",
                    }}
                  >
                    {c.metricLabel}
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "baseline", gap: 12 }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        color: "var(--ink-faint)",
                        textDecoration: "line-through",
                      }}
                    >
                      {c.metricBefore}
                    </span>
                    <span
                      style={{ color: "var(--terracotta)", fontWeight: 700 }}
                    >
                      →
                    </span>
                    <span className="testi-name" style={{ fontSize: 22 }}>
                      {c.metricAfter}
                    </span>
                  </div>
                  <div className="testi-name">{c.clientName}</div>
                  {c.caseStudySlug && (
                    <Link
                      href={`/case-studies/${c.caseStudySlug}`}
                      className="btn-line"
                    >
                      Read full case study →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5.5 FOUNDER MINI-BIO ────────────────────────────────────────────── */}
      <section className="section">
        <div className="wrap">
          <div
            className="feat-card"
            style={{
              maxWidth: 920,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "minmax(0, 240px) 1fr",
              gap: 32,
              alignItems: "center",
            }}
          >
            <div
              style={{
                position: "relative",
                width: 240,
                height: 240,
                borderRadius: 2,
                overflow: "hidden",
                border: "1px solid var(--rule-strong)",
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
              <span className="feat-tag">Who builds it</span>
              <h3
                className="feat-title"
                style={{ fontSize: "clamp(22px, 3vw, 30px)" }}
              >
                {i.bioHeadline}
              </h3>
              <p className="feat-body">{i.bioCopy}</p>
              <p
                className="mono"
                style={{
                  fontSize: 11,
                  color: "var(--ink-faint)",
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  marginTop: 14,
                }}
              >
                Waseem Nasir · founder · SkynetLabs · Bali (GMT+8)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRICING STRIP ───────────────────────────────────────────────── */}
      <section className="section tinted">
        <div className="wrap">
          <div className="section-head">
            <span className="section-kicker">Pricing</span>
            <h2>
              Three tiers, <em>tuned to your {i.shortName} stage.</em>
            </h2>
          </div>
          <div className="pricing-row">
            {i.pricingTiers.map((tier, idx) => (
              <div
                key={idx}
                className={`price-cell${tier.featured ? " featured" : ""}`}
              >
                {tier.featured && (
                  <span className="price-badge">Most picked</span>
                )}
                <div className="price-tier">{tier.tierName}</div>
                <div className="price-window">{tier.positioning}</div>
                <div className="price-amount">{tier.price}</div>
                <div className="price-recur">{tier.cadence}</div>
                <ul className="price-list">
                  {tier.includes.map((line, j) => (
                    <li key={j}>{line}</li>
                  ))}
                </ul>
                <Link href={tier.ctaHref} className="price-cta">
                  {tier.ctaLabel} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ (server-rendered details/summary so it's AEO-crawlable) ──── */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="section-kicker">
              FAQs for {i.shortName} operators
            </span>
            <h2>
              Questions {i.shortName} owners ask <em>before booking.</em>
            </h2>
          </div>
          <div className="faq-wrap">
            {i.faqs.map((f, idx) => (
              <details key={idx}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="closer">
        <div className="wrap">
          <span className="closer-scarcity">Limited monthly builds</span>
          <h2>{i.finalCtaHeadline}</h2>
          <p>{i.finalCtaSubhead}</p>
          <div className="cta-row">
            <Link href={i.finalCtaHref} className="btn-primary">
              {i.finalCtaButtonLabel} →
            </Link>
            <Link href="/case-studies" className="btn-line">
              See real wins
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
