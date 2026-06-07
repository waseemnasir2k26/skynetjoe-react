import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { organization, person } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Community from "@/components/sections/Community";
import {
  Reveal,
  RevealGroup,
  RevealItem,
  ParallaxFigure,
  StatCounter,
} from "@/components/motion/Reveal";

const TIMELINE = [
  {
    year: "2017",
    title: "Uni starts — Lahore",
    note: "Enrolled in a 4-year bachelor's program. Books by day, internet rabbit-holes by night.",
  },
  {
    year: "2019",
    title: "First $10 on Fiverr",
    note: "Still a uni student. First gig pays $10. Could have quit there. Didn't — kept stacking gigs between lectures.",
  },
  {
    year: "2020",
    title: "Video editing — failed",
    note: "Tried to scale a video-editing side hustle alongside uni. Burned out before it scaled. Lesson: skill ≠ business.",
  },
  {
    year: "2020",
    title: "Ecommerce — failed",
    note: "Dropshipping and Shopify stores. Lost money on ads. Lesson: I'm a builder, not a marketer-of-other-people's-junk.",
  },
  {
    year: "2021",
    title: "Amazon warehouse — failed",
    note: "Inventory, logistics, FBA. Months of pain, zero traction. Lesson: stop chasing what's trending.",
  },
  {
    year: "2021",
    title: "Bachelor's done · service-first pivot",
    note: "Graduated. Killed the side hustles. Committed full-time to building for clients. Real work, real bills, real ship.",
  },
  {
    year: "2024",
    title: "n8n + AI + the SkynetLabs identity",
    note: "Picked the stack: n8n, Claude/GPT, Next.js. Stopped chasing niches — started shipping systems.",
  },
  {
    year: "2026",
    title: "180+ workflows · 9 countries · Bali base",
    note: "Solo operator, AI as second seat. Public pricing. Same builder, different game.",
  },
];

const BUILDER_LIFE = [
  {
    label: "Mornings",
    line: "Coffee, terminal open, Claude Code humming. The first deploy goes out before most inboxes wake up.",
  },
  {
    label: "Build days",
    line: "Multi-hour sessions, every diff read by hand. AI types fast; the taste and judgment stay human.",
  },
  {
    label: "Ship rhythm",
    line: "Staging link in your inbox, you scream-test it, I iterate. Live within the week, repo handed over.",
  },
];

const STAT_STRIP = [
  { num: "180+", label: "Workflows shipped" },
  { num: "40+", label: "Websites delivered" },
  { num: "9", label: "Countries served" },
  { num: "5–14d", label: "Ship window" },
];

export const metadata: Metadata = {
  title: "About — From a $10 Fiverr gig (2019) to 180+ workflows (2026)",
  description:
    "SkynetLabs is run by Waseem Nasir from Bali. Started in 2019 as a uni student in Lahore. Failed at video editing, ecommerce, Amazon — kept building. Today: 180+ automations across 9 countries.",
  alternates: { canonical: `${SITE.url}/about` },
  openGraph: {
    title: "About SkynetLabs — From $10 Fiverr gig to 180+ workflows",
    description:
      "Solo founder. Bali base. 7 years of failing in public and building in public. Public pricing, AI as second seat.",
    url: `${SITE.url}/about`,
    type: "website",
    images: [`${SITE.assetsUrl}/og-default.png`],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${SITE.url}/about#aboutpage`,
      url: `${SITE.url}/about`,
      name: `About ${SITE.brand}`,
      description:
        "SkynetLabs is run solo by Waseem Nasir from Bali. Founded 2019 in Lahore as a $10 Fiverr gig, scaled to 180+ workflows across 9 countries by 2026.",
      inLanguage: "en",
      isPartOf: { "@id": `${SITE.url}/#website` },
      mainEntity: { "@id": `${SITE.url}/#organization` },
    },
    {
      // Spread the canonical Organization (logo ImageObject, founder→#person
      // ref, address, full sameAs) from @/lib/schema instead of redefining a
      // thinner duplicate. Layer only the about-page-relevant founding facts.
      ...organization,
      foundingDate: "2019",
      foundingLocation: { "@type": "Place", name: "Lahore, Pakistan" },
      location: { "@type": "Place", name: "Bali, Indonesia" },
    },
    // Include the canonical Person node so the Organization.founder #person
    // reference resolves on this page (same pattern the homepage uses).
    { ...person },
  ],
};

export default function AboutPage() {
  return (
    <div className="sky">
      <JsonLd data={schema} />

      {/* HERO — skyv3 pattern: eyebrow+pulse, h1 w/ one terracotta <em>, sub, CTA row, featured strip */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-inner">
            <div className="hero-eyebrow">
              <span className="pulse"></span>
              About {SITE.founder}&nbsp;· solo studio · Bali-built since{" "}
              <strong>2019</strong>
            </div>

            <h1>
              From a <em>$10 Fiverr gig</em> to 180+ workflows.
            </h1>

            <p className="hero-sub">
              I&apos;m {SITE.founder}. Started uni in Lahore in 2017, took my
              first $10 Fiverr gig in 2019, failed at video editing, ecommerce,
              and Amazon — then went service-first. Today I run{" "}
              <strong>SkynetLabs solo from Bali</strong>: no account managers,
              public pricing, repo in your GitHub on launch day.
            </p>

            <div className="cta-row">
              <Link
                href={SITE.cta.href}
                className="btn-primary"
                data-meta-event="Schedule"
                data-meta-name="about-hero-book-audit"
              >
                {SITE.cta.label} →
              </Link>
              <Link href="/case-studies" className="btn-line">
                See case studies
              </Link>
            </div>

            <div className="hero-scarcity">
              <strong>Limited monthly builds</strong>&nbsp;· 5–14 day ship · you
              talk to the builder
            </div>

            <div className="featured-in">
              <span className="featured-lbl">Track record</span>
              <span>7 years shipping</span>
              <span>180+ workflows</span>
              <span>40+ websites</span>
              <span>9 countries</span>
            </div>
          </div>

          {/* Founder portrait — kept from the original hero, recast into a sky figure */}
          <ParallaxFigure
            style={{
              margin: "40px auto 0",
              maxWidth: 360,
              background: "var(--cream-3)",
              padding: 10,
              border: "1px solid var(--rule)",
              boxShadow: "0 18px 48px rgba(26,26,26,0.15)",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "4 / 5",
                overflow: "hidden",
                background: "var(--cream-2)",
              }}
            >
              <Image
                src="/portraits/waseem-builder-portrait.jpg"
                alt="Waseem Nasir, founder of SkynetLabs"
                fill
                priority
                sizes="(min-width: 900px) 360px, 90vw"
                style={{ objectFit: "cover", objectPosition: "center top" }}
              />
            </div>
            <figcaption
              className="mono"
              style={{
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.10em",
                color: "var(--ink-faint)",
                textAlign: "center",
                paddingTop: 12,
              }}
            >
              Waseem · founder · Bali · GMT+8
            </figcaption>
          </ParallaxFigure>
        </div>
      </section>

      {/* THE ARC — timeline, mapped to .section / .section-head rhythm */}
      <section className="section">
        <div className="wrap">
          {/* Founder trust strip — "you talk to the builder" */}
          <Reveal
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              background: "var(--cream-2)",
              border: "1px solid var(--rule)",
              borderRadius: 999,
              padding: "12px 22px 12px 12px",
              marginBottom: 40,
              maxWidth: 460,
            }}
          >
            <span
              style={{
                position: "relative",
                width: 56,
                height: 56,
                borderRadius: "50%",
                overflow: "hidden",
                flexShrink: 0,
                border: "2px solid var(--cream-3)",
                boxShadow: "0 4px 14px rgba(26,26,26,0.18)",
              }}
            >
              <Image
                src="/portraits/waseem-builder-portrait.jpg"
                alt="Waseem Nasir"
                fill
                sizes="56px"
                style={{ objectFit: "cover", objectPosition: "center top" }}
              />
            </span>
            <span
              style={{
                fontSize: 15,
                color: "var(--ink)",
                lineHeight: 1.4,
                fontWeight: 600,
              }}
            >
              No account managers. You talk to the builder —{" "}
              <strong
                style={{ color: "var(--terracotta-aa)", fontWeight: 700 }}
              >
                Waseem
              </strong>
              , directly.
            </span>
          </Reveal>

          <Reveal className="section-head">
            <div className="section-kicker">The arc</div>
            <h2>
              Seven years of <em>failing in public.</em>
            </h2>
            <p className="section-sub">
              Every pivot below was a real bet. Most of them lost. The wins
              taught me what to stop doing.
            </p>
          </Reveal>

          <RevealGroup
            as="ol"
            style={{ listStyle: "none", padding: 0, margin: 0, maxWidth: 820 }}
          >
            {TIMELINE.map((t) => (
              <RevealItem
                as="li"
                key={`${t.year}-${t.title}`}
                style={{
                  background: "var(--cream)",
                  border: "1px solid var(--rule)",
                  borderRadius: 4,
                  padding: "20px 22px 22px",
                  marginBottom: 14,
                  display: "grid",
                  gridTemplateColumns: "14px 1fr",
                  gap: 16,
                }}
              >
                <span
                  aria-hidden
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "var(--terracotta)",
                    marginTop: 8,
                  }}
                />
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "baseline",
                      gap: 12,
                      marginBottom: 4,
                    }}
                  >
                    <span
                      className="mono"
                      style={{
                        fontSize: 11,
                        textTransform: "uppercase",
                        letterSpacing: "0.16em",
                        color: "var(--terracotta-aa)",
                        fontWeight: 600,
                      }}
                    >
                      {t.year}
                    </span>
                    <h3
                      className="serif"
                      style={{
                        fontSize: 19,
                        fontWeight: 600,
                        color: "var(--ink)",
                        margin: 0,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {t.title}
                    </h3>
                  </div>
                  <p
                    style={{
                      color: "var(--ink-2)",
                      fontSize: 15,
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {t.note}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* THE LETTER — centerpiece quote on terracotta */}
      <section
        style={{
          background: "var(--terracotta)",
          padding: "clamp(64px, 16vw, 96px) 0",
        }}
      >
        <div
          style={{
            maxWidth: 820,
            margin: "0 auto",
            padding: "0 24px",
            textAlign: "center",
          }}
        >
          <Reveal>
            <div
              className="mono"
              style={{
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                color: "var(--cream-3)",
                opacity: 0.85,
                marginBottom: 20,
              }}
            >
              — A letter to 2019
            </div>
            <blockquote
              className="serif"
              style={{
                fontSize: "clamp(24px, 4.4vw, 44px)",
                fontWeight: 400,
                lineHeight: 1.25,
                letterSpacing: "-0.015em",
                color: "var(--cream-3)",
                margin: 0,
              }}
            >
              &ldquo;If I could go back to 2019, I&apos;d say: 2026 Waseem is
              proud of you. Just don&apos;t quit. You did it — with the blessing
              of God.&rdquo;
            </blockquote>
            <footer
              className="mono"
              style={{
                marginTop: 24,
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: "var(--cream-3)",
                opacity: 0.85,
              }}
            >
              — Waseem · 2026
            </footer>
          </Reveal>
        </div>
      </section>

      {/* THE BUILDER LIFE — mapped to .feature-row / .feat-card */}
      <section className="section tinted">
        <div className="wrap">
          <Reveal className="section-head">
            <div className="section-kicker">The builder life</div>
            <h2>
              Cafes. Terminals. <em>Deploys.</em>
            </h2>
            <p className="section-sub">
              Same builder you&apos;d hire — actually here, actually shipping.
              No agency layer, no Zoom mask. Just a fixed rhythm that ends with
              your thing live.
            </p>
          </Reveal>

          <RevealGroup
            className="feature-row"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            }}
          >
            {BUILDER_LIFE.map((b) => (
              <RevealItem key={b.label} className="feat-card">
                <span className="feat-tag">{b.label}</span>
                <p className="feat-body" style={{ margin: 0 }}>
                  {b.line}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* BY THE NUMBERS */}
      <section className="section">
        <div className="wrap">
          <Reveal className="section-head" style={{ marginBottom: 40 }}>
            <div className="section-kicker">By the numbers</div>
            <h2>
              Seven years, <em>measured.</em>
            </h2>
          </Reveal>

          <RevealGroup
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 18,
            }}
          >
            {STAT_STRIP.map((s) => (
              <RevealItem
                key={s.label}
                className="feat-card"
                style={{ textAlign: "center", padding: "28px 22px" }}
              >
                <StatCounter
                  value={s.num}
                  className="serif"
                  style={{
                    fontSize: 52,
                    fontWeight: 700,
                    color: "var(--terracotta)",
                    lineHeight: 1,
                    marginBottom: 8,
                    letterSpacing: "-0.02em",
                  }}
                />
                <div
                  className="mono"
                  style={{
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: "var(--ink-faint)",
                  }}
                >
                  — {s.label}
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* COMMUNITY — self-contained section, inherits .sky tokens/type */}
      <Community />

      {/* CLOSER — skyv3 .closer pattern */}
      <section className="closer">
        <Reveal>
          <div className="closer-scarcity">8-hour reply window</div>
          <h2>
            Want to ship <em>something real?</em>
          </h2>
          <p>
            Send a 3-sentence brief. Scope + price back in 8 hours. Same
            builder, same hands.
          </p>
          <div className="cta-row">
            <Link href={SITE.cta.href} className="btn-primary">
              {SITE.cta.label} →
            </Link>
            <Link href="/case-studies" className="btn-line">
              See case studies
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
