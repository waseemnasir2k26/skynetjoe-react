import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Community from "@/components/sections/Community";
import ZoomableImage from "@/components/ZoomableImage";

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

const BALI_GRID = [
  { src: "/bali-trek/mountain-vista.jpg", alt: "Mountain vista from the May 2026 Bali trek" },
  { src: "/bali-trek/trek-path-palms.jpg", alt: "Trek path through Balinese palms" },
  { src: "/bali-trek/jungle-stairs.jpg", alt: "Jungle stairs near the waterfall" },
  { src: "/bali-trek/river-rocks.jpg", alt: "River rocks rest stop, mid-trek" },
  { src: "/portraits/waseem-cafe-arch.jpg", alt: "Canggu cafe — first deploy of the day" },
  { src: "/portraits/waseem-poolside-laptop.jpg", alt: "Poolside push after a green migration" },
  { src: "/bali-trek/villa-arrival.jpg", alt: "Morning at the Bali villa before the trek" },
  { src: "/portraits/waseem-rooftop-smile.jpg", alt: "Friday ship, phone on DND" },
];

const ROT = ["-1.0deg", "0.7deg", "-0.6deg", "1.1deg", "-0.9deg", "0.5deg", "-1.2deg", "0.8deg"];

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
    images: [`${SITE.assetsUrl}/portraits/waseem-builder-hero.jpg`],
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
      "@type": "Organization",
      "@id": `${SITE.url}/#organization`,
      name: SITE.brand,
      url: SITE.url,
      foundingDate: "2019",
      description: SITE.description,
      founder: { "@type": "Person", name: SITE.founder, url: SITE.founderUrl },
      foundingLocation: { "@type": "Place", name: "Lahore, Pakistan" },
      location: { "@type": "Place", name: "Bali, Indonesia" },
      sameAs: [
        SITE.social.linkedin,
        SITE.social.twitter,
        SITE.social.github,
        SITE.social.youtube,
        SITE.social.fiverr,
      ],
    },
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

          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "var(--terracotta)",
                marginBottom: 24,
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span style={{ width: 28, height: 1, background: "var(--terracotta)" }} />
              About · since 2019
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(40px, 6.5vw, 76px)",
                fontWeight: 500,
                letterSpacing: "-0.025em",
                lineHeight: 1.02,
                color: "var(--ink)",
                margin: "0 0 24px",
              }}
            >
              From a{" "}
              <em style={{ fontStyle: "italic", color: "var(--terracotta)", fontWeight: 500 }}>
                $10 Fiverr gig
              </em>{" "}
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
              <span style={{ margin: "0 12px", color: "rgba(26,26,26,0.20)" }}>·</span>
              Lahore → <span style={{ color: "var(--ink)" }}>Bali</span>
              <span style={{ margin: "0 12px", color: "rgba(26,26,26,0.20)" }}>·</span>
              <span style={{ color: "var(--ink)" }}>9</span> countries served
            </div>
          </div>

          <div>
            <figure
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
                }}
              >
                <ZoomableImage
                  src="/portraits/waseem-builder-hero.jpg"
                  alt="Waseem Nasir, founder of SkynetLabs"
                  fill
                  priority
                  sizes="(min-width: 900px) 400px, 90vw"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center top",
                    filter: "sepia(0.10) saturate(0.95) contrast(1.02)",
                  }}
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
            </figure>
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
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 clamp(16px, 5vw, 24px)" }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "var(--terracotta)",
              marginBottom: 14,
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ width: 28, height: 1, background: "var(--terracotta)" }} />
            The arc
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "var(--ink)",
              marginBottom: 12,
            }}
          >
            Seven years of{" "}
            <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>
              failing in public.
            </em>
          </h2>
          <p style={{ fontSize: 16, color: "var(--ink-2)", maxWidth: "56ch", marginBottom: 36, lineHeight: 1.6 }}>
            Every pivot below was a real bet. Most of them lost. The wins taught
            me what to stop doing.
          </p>

          <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {TIMELINE.map((t, i) => {
              const rotate = i % 2 === 0 ? "-0.2deg" : "0.2deg";
              return (
                <li
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
                          color: "var(--terracotta)",
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
                </li>
              );
            })}
          </ol>
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
              fontStyle: "italic",
              fontSize: "clamp(24px, 4.4vw, 44px)",
              fontWeight: 400,
              lineHeight: 1.25,
              letterSpacing: "-0.015em",
              color: "var(--cream-3)",
              margin: 0,
            }}
          >
            &ldquo;If I could go back to 2019, I&apos;d say: 2026 Waseem is proud
            of you. Just don&apos;t quit. You did it — with the blessing of
            God.&rdquo;
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
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(16px, 5vw, 24px)" }}>
          <div style={{ maxWidth: 720, marginBottom: 40 }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "var(--terracotta)",
                marginBottom: 14,
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span style={{ width: 28, height: 1, background: "var(--terracotta)" }} />
              The builder life
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                color: "var(--ink)",
                marginBottom: 12,
              }}
            >
              Bali treks. Cafes.{" "}
              <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>
                Deploys.
              </em>
            </h2>
            <p style={{ fontSize: 16, color: "var(--ink-2)", lineHeight: 1.6, maxWidth: "60ch" }}>
              Same Waseem you&apos;d hire — actually here, actually shipping.
              Latest batch: a 24-May 2026 jungle trek with the Bali builder
              crew. No stock photos. No agency Zoom mask.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 28,
            }}
          >
            {BALI_GRID.map((p, i) => (
              <figure
                key={p.src}
                className="about-bali-figure"
                style={{
                  margin: 0,
                  transform: `rotate(${ROT[i] ?? "0deg"})`,
                  background: "var(--cream-3)",
                  padding: 10,
                  border: "1px solid rgba(26,26,26,0.14)",
                  boxShadow: "0 14px 36px rgba(26,26,26,0.10)",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "4 / 3",
                    overflow: "hidden",
                    background: "var(--cream-2)",
                  }}
                >
                  <ZoomableImage
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 90vw"
                    style={{
                      objectFit: "cover",
                      filter: "sepia(0.08) saturate(0.92)",
                    }}
                  />
                </div>
                <figcaption
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: "0.10em",
                    color: "var(--ink-faint)",
                    paddingTop: 10,
                    lineHeight: 1.5,
                  }}
                >
                  — {p.alt}
                </figcaption>
              </figure>
            ))}
          </div>
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
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(16px, 5vw, 24px)" }}>
          <div
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
              <div
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
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontSize: 52,
                    fontWeight: 500,
                    color: "var(--terracotta)",
                    lineHeight: 1,
                    marginBottom: 8,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {s.num}
                </div>
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
              </div>
            ))}
          </div>
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
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 clamp(16px, 5vw, 24px)", textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "var(--ink)",
              marginBottom: 14,
            }}
          >
            Want to ship{" "}
            <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>
              something real?
            </em>
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
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
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
        </div>
      </section>
    </>
  );
}
