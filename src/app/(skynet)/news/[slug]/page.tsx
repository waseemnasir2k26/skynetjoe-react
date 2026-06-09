import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { NEWS, getArticle, relatedFor } from "@/lib/news";
import { SITE } from "@/lib/site";
import { person, personRef, organization } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import ZoomableImage from "@/components/ZoomableImage";
import {
  Reveal,
  RevealGroup,
  RevealItem,
  ParallaxFigure,
} from "@/components/motion/Reveal";

/**
 * Dynamic /news/[slug] — cream editorial pivot. Renders cream pages for entries
 * with a `body` field. Legacy hand-written articles (own page.tsx folders)
 * win the route match automatically and bypass this.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return NEWS.filter((n) => n.body && n.body.length > 0).map((n) => ({
    slug: n.slug,
  }));
}

// Per-category accent (cream-palette: terracotta / ochre / sage / oxblood)
const CATEGORY_COLORS: Record<string, string> = {
  Automation: "var(--terracotta)",
  AEO: "var(--sage)",
  Stack: "var(--ochre)",
  Operations: "var(--oxblood)",
  Pricing: "var(--terracotta)",
  Tools: "var(--ochre)",
  "Field notes": "var(--sage)",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return { title: "Article not found" };
  // SERP title: prefer the short seoTitle (≤55 chars) when set so the global
  // `%s | SkynetLabs` template doesn't push us past the ~60-char truncation
  // line. Falls back to the long editorial headline. og/twitter keep the full
  // title for social cards (no width limit there).
  return {
    title: a.seoTitle ?? a.title,
    description: a.description,
    alternates: { canonical: `${SITE.url}/news/${a.slug}` },
    openGraph: {
      title: a.title,
      description: a.description,
      url: `${SITE.url}/news/${a.slug}`,
      type: "article",
      publishedTime: a.publishedAt,
      modifiedTime: a.updatedAt || a.publishedAt,
      authors: [SITE.founder],
      images: [`${SITE.assetsUrl}${a.heroImage}`],
    },
    twitter: {
      card: "summary_large_image",
      title: a.title,
      description: a.description,
      creator: "@skynetlabs",
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a || !a.body) notFound();

  const accent = CATEGORY_COLORS[a.category] ?? "var(--terracotta)";
  const related = relatedFor(a.slug, 3);

  // NewsArticle (not BlogPosting) is the correct type for /news content and
  // unlocks Google News / Top Stories eligibility. Built inline here — the
  // shared schema.ts helper is owned elsewhere and deliberately left untouched.
  // Required NewsArticle fields per schema.org/Google: headline, image,
  // datePublished, dateModified, author (Person), publisher (Organization +
  // logo ImageObject), mainEntityOfPage. All sourced from existing data only.
  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NewsArticle",
        headline: a.title,
        description: a.description,
        url: `${SITE.url}/news/${a.slug}`,
        datePublished: a.publishedAt,
        dateModified: a.updatedAt || a.publishedAt,
        image: [`${SITE.assetsUrl}${a.heroImage}`],
        // Reference the canonical #person / #organization (emitted below in this
        // @graph) instead of bare inline copies (M15).
        author: personRef,
        publisher: { "@id": `${SITE.url}/#organization` },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${SITE.url}/news/${a.slug}`,
        },
        keywords: a.tags.join(", "),
      },
      person,
      organization,
    ],
  };

  return (
    <>
      <JsonLd data={articleSchema} />

      {/* HERO */}
      <section
        style={{
          background: "var(--cream-3)",
          padding: "clamp(88px, 18vw, 112px) 0 clamp(28px, 7vw, 40px)",
          borderBottom: "1px solid rgba(26,26,26,0.10)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            maxWidth: 820,
            margin: "0 auto",
            padding: "0 clamp(16px, 5vw, 24px)",
          }}
        >
          <Breadcrumbs
            bare
            items={[
              { label: "Home", href: "/" },
              { label: "News", href: "/news" },
              { label: a.title },
            ]}
          />

          <Link
            href="/news"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              color: "var(--terracotta-aa)",
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.10em",
              marginBottom: 24,
              textDecoration: "none",
            }}
          >
            <ArrowLeft style={{ width: 14, height: 14 }} />
            Back to all field notes
          </Link>

          <Reveal>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 18,
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.16em",
                  fontWeight: 600,
                  padding: "5px 10px",
                  color: "var(--cream-3)",
                  background: accent,
                  borderRadius: 2,
                }}
              >
                {a.category}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.10em",
                  color: "var(--ink-faint)",
                }}
              >
                — {formatDate(a.publishedAt)} · {a.readingTime} min read
              </span>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 5.2vw, 60px)",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                lineHeight: 1.04,
                color: "var(--ink)",
                margin: "0 0 18px",
              }}
            >
              {a.title}
            </h1>
            <p
              style={{
                fontSize: 19,
                color: "var(--ink-2)",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {a.deck}
            </p>
          </Reveal>
        </div>
      </section>

      {/* HERO IMAGE — polaroid */}
      <section
        style={{
          padding: "clamp(20px, 5vw, 32px) 0 16px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            padding: "0 clamp(16px, 5vw, 24px)",
          }}
        >
          <ParallaxFigure
            className="news-hero-polaroid"
            style={{
              margin: 0,
              background: "var(--cream-3)",
              padding: 12,
              border: "1px solid rgba(26,26,26,0.14)",
              boxShadow: "0 24px 60px rgba(26,26,26,0.14)",
            }}
          >
            <style>{`
              @media (max-width: 640px) {
                .news-hero-polaroid { padding: 8px !important; }
              }
            `}</style>
            <div
              style={{
                position: "relative",
                aspectRatio: "16 / 9",
                overflow: "hidden",
                background: "var(--cream-2)",
              }}
            >
              <ZoomableImage
                src={a.heroImage}
                alt={a.heroCaption}
                fill
                priority
                sizes="(min-width: 1024px) 880px, 100vw"
                style={{
                  objectFit: "cover",
                  objectPosition: a.heroPosition ?? "center top",
                  filter: "none",
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
              — {a.heroCaption}
            </figcaption>
          </ParallaxFigure>
        </div>
      </section>

      {/* BODY */}
      <article
        style={{
          padding: "clamp(32px, 8vw, 48px) 0",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
            padding: "0 clamp(16px, 5vw, 24px)",
          }}
        >
          <Reveal
            style={{
              color: "var(--ink-2)",
              fontSize: 17,
              lineHeight: 1.75,
            }}
          >
            {a.body!.map((p, i) => (
              <p key={i} style={{ marginBottom: 18 }}>
                {p}
              </p>
            ))}
          </Reveal>

          {a.tags.length > 0 && (
            <div
              style={{
                marginTop: 40,
                paddingTop: 22,
                borderTop: "1px solid rgba(26,26,26,0.10)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.16em",
                  color: "var(--terracotta-aa)",
                  marginBottom: 12,
                }}
              >
                — Tags
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {a.tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      padding: "5px 11px",
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      color: "var(--ink-2)",
                      background: "var(--cream-2)",
                      border: "1px solid rgba(26,26,26,0.10)",
                    }}
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* INLINE CTA */}
      <section
        style={{
          padding: "16px 0 clamp(40px, 10vw, 56px)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            maxWidth: 760,
            margin: "0 auto",
            padding: "0 clamp(16px, 5vw, 24px)",
          }}
        >
          <Reveal
            style={{
              background: "var(--cream-2)",
              border: "1px solid rgba(26,26,26,0.12)",
              padding: "clamp(24px, 6vw, 36px) clamp(20px, 5vw, 32px)",
            }}
          >
            {a.cta ? (
              <>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.18em",
                    color: "var(--terracotta-aa)",
                    fontWeight: 600,
                    marginBottom: 12,
                  }}
                >
                  — Related service · {a.cta.serviceLabel}
                </div>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(22px, 3vw, 30px)",
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.15,
                    color: "var(--ink)",
                    margin: "0 0 18px",
                  }}
                >
                  {a.cta.tagline}
                </h2>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                  <Link
                    href={a.cta.href}
                    style={{
                      background: "var(--terracotta)",
                      color: "var(--cream-3)",
                      padding: "14px 24px",
                      fontFamily: "var(--font-sans)",
                      fontWeight: 600,
                      fontSize: 14,
                      borderRadius: 2,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      textDecoration: "none",
                    }}
                  >
                    {a.cta.label}
                    <ArrowRight style={{ width: 14, height: 14 }} />
                  </Link>
                  <Link
                    href="/discovery-call"
                    style={{
                      background: "transparent",
                      color: "var(--ink)",
                      padding: "13px 22px",
                      fontFamily: "var(--font-sans)",
                      fontWeight: 600,
                      fontSize: 14,
                      border: "1px solid var(--ink)",
                      borderRadius: 2,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      textDecoration: "none",
                    }}
                  >
                    Book a strategy call
                  </Link>
                </div>
              </>
            ) : (
              <div style={{ textAlign: "center" }}>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(22px, 3vw, 30px)",
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                    color: "var(--ink)",
                    margin: "0 0 14px",
                  }}
                >
                  Want this kind of build for{" "}
                  <span
                    style={{ fontWeight: 700, color: "var(--terracotta-aa)" }}
                  >
                    your business?
                  </span>
                </h2>
                <p
                  style={{
                    fontSize: 15,
                    color: "var(--ink-2)",
                    maxWidth: "48ch",
                    margin: "0 auto 22px",
                    lineHeight: 1.6,
                  }}
                >
                  Send a 3-sentence brief. Scope + price back in 8 hours.
                </p>
                <Link
                  href="/discovery-call"
                  style={{
                    background: "var(--terracotta)",
                    color: "var(--cream-3)",
                    padding: "14px 24px",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 600,
                    fontSize: 14,
                    borderRadius: 2,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    textDecoration: "none",
                  }}
                >
                  Book the audit
                  <ArrowRight style={{ width: 14, height: 14 }} />
                </Link>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section
          style={{
            padding: "clamp(40px, 10vw, 56px) 0 clamp(56px, 14vw, 88px)",
            borderTop: "1px solid rgba(26,26,26,0.10)",
            background: "var(--cream-3)",
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
              — More from the journal
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(24px, 3.4vw, 34px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "var(--ink)",
                margin: "0 0 24px",
              }}
            >
              Keep{" "}
              <span style={{ fontWeight: 700, color: "var(--terracotta-aa)" }}>
                reading.
              </span>
            </h2>
            <RevealGroup
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: 20,
              }}
            >
              {related.map((r) => {
                const a2 = CATEGORY_COLORS[r.category] ?? "var(--terracotta)";
                return (
                  <RevealItem
                    as="article"
                    key={r.slug}
                    style={{ display: "flex" }}
                  >
                    <Link
                      href={`/news/${r.slug}`}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                        background: "var(--cream-2)",
                        border: "1px solid rgba(26,26,26,0.12)",
                        textDecoration: "none",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          aspectRatio: "16 / 10",
                          overflow: "hidden",
                          background: "var(--cream-3)",
                          borderBottom: "1px solid rgba(26,26,26,0.10)",
                        }}
                      >
                        <Image
                          src={r.heroImage}
                          alt={r.heroCaption}
                          fill
                          sizes="(min-width: 1024px) 33vw, 50vw"
                          style={{
                            objectFit: "cover",
                            objectPosition: r.heroPosition ?? "center top",
                            filter: "none",
                          }}
                        />
                      </div>
                      <div style={{ padding: "16px 18px" }}>
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 10,
                            textTransform: "uppercase",
                            letterSpacing: "0.16em",
                            fontWeight: 600,
                            color: a2,
                          }}
                        >
                          {r.category}
                        </span>
                        <h3
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: 16,
                            fontWeight: 600,
                            color: "var(--ink)",
                            margin: "6px 0 6px",
                            letterSpacing: "-0.01em",
                            lineHeight: 1.25,
                          }}
                        >
                          {r.title}
                        </h3>
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 11,
                            textTransform: "uppercase",
                            letterSpacing: "0.10em",
                            color: "var(--ink-faint)",
                          }}
                        >
                          — {r.readingTime} min · {formatDate(r.publishedAt)}
                        </span>
                      </div>
                    </Link>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </section>
      )}
    </>
  );
}
