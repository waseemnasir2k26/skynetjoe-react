/**
 * /blog — Journal index, ported to cream pivot 2026-05-25.
 *
 * Matches sitewide cream system:
 *   - Background: var(--cream-3) hero, var(--cream) grid section
 *   - Hero H1: Fraunces 500 with terracotta <em> accent
 *   - Cards: var(--cream-2) bg, 1px ink border, ink-2 body copy
 *   - Category chip: mono, terracotta on cream-3
 *   - CTA: flat terracotta block (no gradient)
 *   - Zero text-white / cyan / dark-gradient classes.
 */

import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { POSTS } from "@/lib/posts";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Journal — Long-form on AI Automation, AEO & Shipping | SkynetLabs",
  description:
    "Honest writing on n8n, GoHighLevel, answer-engine optimization, and shipping software for service businesses across 9 countries. New posts when there's something worth saying.",
  alternates: { canonical: `${SITE.url}/blog` },
  openGraph: {
    title: "SkynetLabs Journal",
    description:
      "Long-form writing on AI automation, AEO, and shipping software for service businesses.",
    url: `${SITE.url}/blog`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "SkynetLabs Journal",
  url: `${SITE.url}/blog`,
  description: "Long-form writing on AI automation, AEO, and shipping software.",
  author: { "@type": "Person", name: SITE.founder, url: SITE.founderUrl },
  publisher: { "@type": "Organization", name: SITE.brand, url: SITE.url },
  blogPost: POSTS.map((p) => ({
    "@type": "BlogPosting",
    headline: p.title,
    description: p.description,
    url: `${SITE.url}/blog/${p.slug}`,
    datePublished: p.publishedAt,
    dateModified: p.updatedAt || p.publishedAt,
    author: { "@type": "Person", name: SITE.founder },
  })),
};

// Category label kept simple — no gradient classes in cream system.
function categoryLabel(c: string): string {
  return c.replace("-", " ");
}

export default function BlogPage() {
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
        <div className="container-x px-6 relative z-10 max-w-4xl">
          <div
            className="inline-flex items-center gap-3 mb-6"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "var(--terracotta)",
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
            Journal · long-form
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
            Long-form on{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--terracotta)",
                fontWeight: 500,
              }}
            >
              what actually ships.
            </em>
          </h1>

          <p
            style={{
              fontSize: 19,
              color: "var(--ink-2)",
              maxWidth: "54ch",
              lineHeight: 1.55,
              marginBottom: 0,
            }}
          >
            Posts when we have something worth saying — not on a schedule.
            Real client builds, real cost math, real failure modes.
          </p>
        </div>
      </section>

      {/* POST GRID */}
      <section className="py-16 md:py-20" style={{ background: "var(--cream)" }}>
        <div className="container-x px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {POSTS.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group flex flex-col h-full"
                style={{
                  background: "var(--cream-2)",
                  border: "1px solid rgba(26,26,26,0.12)",
                  padding: 24,
                  borderRadius: 2,
                  textDecoration: "none",
                  transition: "border-color 0.18s",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    color: "var(--terracotta)",
                    marginBottom: 14,
                  }}
                >
                  {categoryLabel(p.category)}
                </div>

                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    fontSize: 22,
                    lineHeight: 1.18,
                    color: "var(--ink)",
                    marginBottom: 12,
                    letterSpacing: "-0.015em",
                  }}
                >
                  {p.title}
                </h2>

                <p
                  style={{
                    fontSize: 14,
                    color: "var(--ink-2)",
                    lineHeight: 1.55,
                    marginBottom: 20,
                    flexGrow: 1,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {p.description}
                </p>

                <div
                  className="flex items-center justify-between"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "var(--ink-faint)",
                    marginTop: "auto",
                    paddingTop: 14,
                    borderTop: "1px solid rgba(26,26,26,0.08)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      {new Date(p.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />
                      {p.readingTime} min
                    </span>
                  </div>
                  <ArrowRight
                    className="w-4 h-4 transition"
                    style={{ color: "var(--terracotta)" }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSER — cream editorial */}
      <section
        className="py-16 md:py-20"
        style={{
          background: "var(--cream-3)",
          borderTop: "1px solid rgba(26,26,26,0.10)",
        }}
      >
        <div className="container-x px-6 max-w-3xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-3 mb-5"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "var(--terracotta)",
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
            One last thing
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
              color: "var(--ink)",
              fontSize: "clamp(28px, 4vw, 44px)",
              marginBottom: 14,
            }}
          >
            Reading isn&apos;t{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--terracotta)",
                fontWeight: 500,
              }}
            >
              shipping.
            </em>
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "var(--ink-2)",
              maxWidth: "46ch",
              margin: "0 auto 28px",
              lineHeight: 1.6,
            }}
          >
            If anything here matches your problem, send a brief. We&apos;ll
            send back a fixed scope in 48 hours.
          </p>
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
            Apply for a discovery call
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
