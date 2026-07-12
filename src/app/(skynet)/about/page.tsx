import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
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

const BUILDER_LIFE_PHOTOS = [
  {
    src: "/img/pro/CAFE-WORK-2026-03-29-rooftop-cafe-laptop-mountain-clouds.jpg",
    alt: "Waseem working on a laptop at a rooftop cafe above mountain clouds",
    cap: "Rooftop deploys · Bali",
  },
  {
    src: "/img/pro/BALI-2026-05-06-cafe-arch-working-side.jpg",
    alt: "Working on a laptop under a stone arch cafe, side profile",
    cap: "Cafe office · Ubud",
  },
  {
    src: "/img/pro/CAFE-WORK-2026-02-14-night-rooftop-cafe-phone-city-lights.jpg",
    alt: "Night rooftop cafe, phone in hand with city lights behind",
    cap: "Night shift · city lights",
  },
  {
    src: "/img/pro/TRAVEL-2026-05-05-airport-lounge-armchair-phone-paintings.jpg",
    alt: "Airport lounge armchair between flights, phone in hand",
    cap: "Terminals · between flights",
  },
  {
    src: "/img/pro/CAFE-WORK-2026-03-30-dual-laptop-analytics-dashboard-coffee.jpg",
    alt: "Dual laptops with an analytics dashboard over coffee",
    cap: "Dashboards · client ops",
  },
  {
    src: "/img/pro/BALI-2026-05-07-veranda-phone-thinking.jpg",
    alt: "Thinking through a build on a veranda, phone in hand",
    cap: "Veranda · thinking time",
  },
  {
    src: "/img/pro/TRAVEL-kuala-lumpur-street-crossbody-bag-portrait.jpg",
    alt: "Street portrait in Kuala Lumpur with a crossbody bag",
    cap: "Kuala Lumpur · on the road",
  },
  {
    src: "/img/pro/PORTRAIT-2026-06-09-guitar-closeup-strumming-glasses.jpg",
    alt: "Strumming a guitar, close-up in glasses — off the clock",
    cap: "Off the clock",
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
    <>
      <JsonLd data={schema} />

      {/* HERO */}
      <section
        style={{
          background: "var(--cream-3)",
          padding: "clamp(88px, 18vw, 112px) 0 clamp(48px, 12vw, 80px)",
          borderBottom: "1px solid rgba(26,26,26,0.10)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 clamp(16px, 5vw, 24px)",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 40,
            alignItems: "end",
          }}
          className="about-hero"
        >
          <style>{`
            @media (min-width: 900px) {
              .about-hero { grid-template-columns: 7fr 5fr !important; }
            }
            @media (max-width: 640px) {
              .about-hero-portrait { transform: rotate(0) !important; padding: 8px !important; margin-left: 0 !important; }
              .about-timeline-card { transform: none !important; }
              .about-stat-card { transform: none !important; }
              .about-bali-figure { transform: rotate(0) !important; padding: 8px !important; }
            }
          `}</style>

          <Reveal initialVisible>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "var(--terracotta-aa)",
                marginBottom: 24,
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span
                style={{
                  width: 28,
                  height: 1,
                  background: "var(--terracotta)",
                }}
              />
              About · since 2019
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(40px, 6.5vw, 76px)",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                lineHeight: 1.02,
                color: "var(--ink)",
                margin: "0 0 24px",
              }}
            >
              From a{" "}
              <span style={{ color: "var(--terracotta-aa)", fontWeight: 700 }}>
                $10 Fiverr gig
              </span>{" "}
              to 180+ workflows.
            </h1>
            <p
              style={{
                fontSize: 19,
                color: "var(--ink-2)",
                maxWidth: "56ch",
                lineHeight: 1.6,
                marginBottom: 24,
              }}
            >
              I&apos;m Waseem. Started uni in Lahore in 2017. Took my first $10
              Fiverr gig in 2019 — still a student. Failed at video editing,
              ecommerce, Amazon. Graduated in 2021 and went service-first. Today
              I run SkynetLabs solo from Bali.
            </p>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.10em",
                color: "var(--ink-faint)",
                lineHeight: 1.8,
              }}
            >
              <span style={{ color: "var(--ink)" }}>7 years</span> shipping
              <span style={{ margin: "0 12px", color: "rgba(26,26,26,0.20)" }}>
                ·
              </span>
              Lahore → <span style={{ color: "var(--ink)" }}>Bali</span>
              <span style={{ margin: "0 12px", color: "rgba(26,26,26,0.20)" }}>
                ·
              </span>
              <span style={{ color: "var(--ink)" }}>9</span> countries served
            </div>
          </Reveal>

          <div>
            <ParallaxFigure
              className="about-hero-portrait"
              style={{
                margin: 0,
                transform: "rotate(-1.2deg)",
                background: "var(--cream-3)",
                padding: 10,
                border: "1px solid rgba(26,26,26,0.14)",
                boxShadow: "0 18px 48px rgba(26,26,26,0.15)",
                maxWidth: 400,
                marginLeft: "auto",
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
                  sizes="(min-width: 900px) 400px, 90vw"
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                />
              </div>
              <figcaption
                style={{
                  fontFamily: "var(--font-mono)",
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
        </div>
      </section>

      {/* TIMELINE */}
      <section
        style={{
          padding: "clamp(48px, 12vw, 72px) 0",
          borderBottom: "1px solid rgba(26,26,26,0.10)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            maxWidth: 800,
            margin: "0 auto",
            padding: "0 clamp(16px, 5vw, 24px)",
          }}
        >
          {/* FOUNDER TRUST STRIP — small round photo, "you talk to the builder" */}
          <Reveal
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              background: "var(--cream-2)",
              border: "1px solid rgba(26,26,26,0.10)",
              borderRadius: 999,
              padding: "12px 22px 12px 12px",
              marginBottom: 36,
              maxWidth: 440,
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
              <span style={{ color: "var(--terracotta-aa)", fontWeight: 700 }}>
                Waseem
              </span>
              , directly.
            </span>
          </Reveal>

          <Reveal>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "var(--terracotta-aa)",
                marginBottom: 14,
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span
                style={{
                  width: 28,
                  height: 1,
                  background: "var(--terracotta)",
                }}
              />
              The arc
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                color: "var(--ink)",
                marginBottom: 12,
              }}
            >
              Seven years of{" "}
              <span style={{ color: "var(--terracotta-aa)", fontWeight: 700 }}>
                failing in public.
              </span>
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "var(--ink-2)",
                maxWidth: "56ch",
                marginBottom: 36,
                lineHeight: 1.6,
              }}
            >
              Every pivot below was a real bet. Most of them lost. The wins
              taught me what to stop doing.
            </p>
          </Reveal>

          <RevealGroup
            as="ol"
            style={{ listStyle: "none", padding: 0, margin: 0 }}
          >
            {TIMELINE.map((t, i) => {
              const rotate = i % 2 === 0 ? "-0.2deg" : "0.2deg";
              return (
                <RevealItem
                  as="li"
                  key={`${t.year}-${t.title}`}
                  className="about-timeline-card"
                  style={{
                    background: "var(--cream-2)",
                    border: "1px solid rgba(26,26,26,0.10)",
                    padding: "20px 22px 22px",
                    marginBottom: 14,
                    transform: `rotate(${rotate})`,
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
                        style={{
                          fontFamily: "var(--font-mono)",
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
                        style={{
                          fontFamily: "var(--font-display)",
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
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* THE LETTER — centerpiece quote on terracotta */}
      <section
        style={{
          background: "var(--terracotta)",
          padding: "clamp(64px, 16vw, 96px) 0",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            maxWidth: 820,
            margin: "0 auto",
            padding: "0 clamp(16px, 5vw, 24px)",
            textAlign: "center",
          }}
        >
          <Reveal>
            <div
              style={{
                fontFamily: "var(--font-mono)",
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
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "normal",
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
              style={{
                marginTop: 24,
                fontFamily: "var(--font-mono)",
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

      {/* BALI LIFE — photo grid */}
      <section
        style={{
          padding: "clamp(48px, 12vw, 72px) 0",
          borderBottom: "1px solid rgba(26,26,26,0.10)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 clamp(16px, 5vw, 24px)",
          }}
        >
          <Reveal style={{ maxWidth: 720, marginBottom: 40 }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "var(--terracotta-aa)",
                marginBottom: 14,
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span
                style={{
                  width: 28,
                  height: 1,
                  background: "var(--terracotta)",
                }}
              />
              The builder life
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                color: "var(--ink)",
                marginBottom: 12,
              }}
            >
              Cafes. Terminals.{" "}
              <span style={{ color: "var(--terracotta-aa)", fontWeight: 700 }}>
                Deploys.
              </span>
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "var(--ink-2)",
                lineHeight: 1.6,
                maxWidth: "60ch",
              }}
            >
              Same builder you&apos;d hire — actually here, actually shipping.
              No agency layer, no Zoom mask. Just a fixed rhythm that ends with
              your thing live.
            </p>
          </Reveal>

          <RevealGroup
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 16,
              marginBottom: 40,
            }}
          >
            {BUILDER_LIFE_PHOTOS.map((p, i) => (
              <RevealItem
                key={p.src}
                style={{
                  transform: i % 2 === 0 ? "rotate(-0.4deg)" : "rotate(0.4deg)",
                }}
              >
                <figure style={{ margin: 0 }}>
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "4 / 5",
                      overflow: "hidden",
                      background: "var(--cream-2)",
                      border: "1px solid rgba(26,26,26,0.12)",
                    }}
                  >
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      sizes="(min-width: 900px) 260px, 45vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <figcaption
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      textTransform: "uppercase",
                      letterSpacing: "0.10em",
                      color: "var(--ink-faint)",
                      paddingTop: 8,
                    }}
                  >
                    {p.cap}
                  </figcaption>
                </figure>
              </RevealItem>
            ))}
          </RevealGroup>

          <RevealGroup
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 20,
            }}
          >
            {BUILDER_LIFE.map((b, i) => (
              <RevealItem
                key={b.label}
                className="about-bali-figure"
                style={{
                  background: "var(--cream-2)",
                  border: "1px solid rgba(26,26,26,0.12)",
                  padding: "24px 22px",
                  transform: i % 2 === 0 ? "rotate(-0.3deg)" : "rotate(0.3deg)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: "var(--terracotta-aa)",
                    marginBottom: 10,
                  }}
                >
                  {b.label}
                </div>
                <p
                  style={{
                    fontSize: 15,
                    color: "var(--ink-2)",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {b.line}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* BY THE NUMBERS */}
      <section
        style={{
          padding: "clamp(44px, 11vw, 64px) 0",
          background: "var(--cream-3)",
          borderBottom: "1px solid rgba(26,26,26,0.10)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 clamp(16px, 5vw, 24px)",
          }}
        >
          <RevealGroup
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 20,
            }}
          >
            {[
              { num: "7", label: "Years shipping" },
              { num: "180+", label: "Workflows" },
              { num: "40+", label: "Websites" },
              { num: "9", label: "Countries" },
            ].map((s, i) => (
              <RevealItem
                key={s.label}
                className="about-stat-card"
                style={{
                  background: "var(--cream-2)",
                  border: "1px solid rgba(26,26,26,0.12)",
                  padding: "28px 22px",
                  textAlign: "center",
                  transform: i % 2 === 0 ? "rotate(-0.3deg)" : "rotate(0.3deg)",
                }}
              >
                <StatCounter
                  value={s.num}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontStyle: "normal",
                    fontSize: 52,
                    fontWeight: 700,
                    color: "var(--terracotta-aa)",
                    lineHeight: 1,
                    marginBottom: 8,
                    letterSpacing: "-0.02em",
                  }}
                />
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
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

      {/* COMMUNITY */}
      <Community />

      {/* CLOSER */}
      <section
        style={{
          padding: "clamp(56px, 14vw, 80px) 0",
          borderTop: "1px solid rgba(26,26,26,0.10)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Reveal
          style={{
            maxWidth: 720,
            margin: "0 auto",
            padding: "0 clamp(16px, 5vw, 24px)",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "var(--ink)",
              marginBottom: 14,
            }}
          >
            Want to ship{" "}
            <span style={{ color: "var(--terracotta-aa)", fontWeight: 700 }}>
              something real?
            </span>
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "var(--ink-2)",
              maxWidth: "44ch",
              margin: "0 auto 28px",
              lineHeight: 1.6,
            }}
          >
            Send a 3-sentence brief. Scope + price back in 8 hours. Same
            builder, same hands.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <Link
              href="/discovery-call"
              style={{
                background: "var(--terracotta)",
                color: "var(--cream-3)",
                padding: "16px 28px",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: 15,
                borderRadius: 2,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                textDecoration: "none",
              }}
            >
              Start a brief
              <ArrowRight style={{ width: 16, height: 16 }} />
            </Link>
            <Link
              href="/case-studies"
              style={{
                background: "transparent",
                color: "var(--ink)",
                padding: "15px 26px",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: 15,
                border: "1px solid var(--ink)",
                borderRadius: 2,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                textDecoration: "none",
              }}
            >
              See case studies
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
