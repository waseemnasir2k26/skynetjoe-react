/**
 * /blog — Journal index, restyled into the .sky / skyv3 design language
 * (the /lp/logistics look). Hero + feature-card grid live under the global
 * `.sky` wrapper; class defs in src/styles/skyv3.css. Data wiring (POSTS,
 * schema, links to [slug], dates, metadata, JSON-LD) left intact.
 */

import Link from "next/link";
import type { Metadata } from "next";
import { POSTS } from "@/lib/posts";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Journal — Long-form on AI Automation, AEO & Shipping | SkynetLabs",
  description:
    "Honest writing on automation, answer-engine optimization, and shipping software for service businesses across 9 countries. New posts when there's something worth saying.",
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
  description:
    "Long-form writing on AI automation, AEO, and shipping software.",
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

function categoryLabel(c: string): string {
  return c.replace("-", " ");
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogPage() {
  return (
    <div className="sky">
      <JsonLd data={schema} />

      {/* HERO */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-inner">
            <div className="hero-eyebrow">
              <span className="pulse"></span>
              Journal · field notes
            </div>

            <h1>
              Long-form on <em>what actually ships.</em>
            </h1>

            <p className="hero-sub">
              In-depth guides and essays — the long reads on automation,
              answer-engine optimization, and shipping software. Posts when
              there&apos;s something worth saying, not on a schedule.
            </p>

            <div className="cta-row">
              <Link href="/discovery-call" className="btn-primary">
                Book a free 30-min audit →
              </Link>
              <Link href="/news" className="btn-line">
                Looking for short field notes? Latest News
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* POST GRID */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="section-kicker">All posts</span>
            <h2>
              The long <em>reads.</em>
            </h2>
            <p className="section-sub">
              Essays and guides, newest first. No fluff — just what we learned
              shipping for service businesses.
            </p>
          </div>

          <div className="feature-row">
            {POSTS.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="feat-card"
                style={{ display: "block" }}
              >
                <span className="feat-tag">
                  {categoryLabel(p.category)} · {formatDate(p.publishedAt)} ·{" "}
                  {p.readingTime} min
                </span>
                <h3 className="feat-title">{p.title}</h3>
                <p className="feat-body">{p.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
