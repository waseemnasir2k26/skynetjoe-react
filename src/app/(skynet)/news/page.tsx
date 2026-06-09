/**
 * /news — Latest news / field-notes index, restyled into the .sky / skyv3
 * design language (the /lp/logistics look). Hero + feature-card grid under the
 * global `.sky` wrapper; class defs in src/styles/skyv3.css. Data wiring (NEWS,
 * schema, links to [slug], dates, metadata, JSON-LD) left intact.
 */

import Link from "next/link";
import type { Metadata } from "next";
import { NEWS } from "@/lib/news";
import { SITE, DEFAULT_OG_IMAGES, twitterFromOpenGraph } from "@/lib/site";
import { person, personRef, organization } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Latest news & field notes",
  description:
    "Honest field notes from one operator shipping AI automation, n8n, AEO, and bespoke websites from Bali. Real client builds, real cost math, real failure modes.",
  alternates: { canonical: `${SITE.url}/news` },
  openGraph: {
    title: "SkynetLabs — Latest news & field notes",
    description:
      "Field notes on AI automation, n8n, AEO, and shipping software from Bali.",
    url: `${SITE.url}/news`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: twitterFromOpenGraph({
    title: "SkynetLabs — Latest news & field notes",
    description:
      "Field notes on AI automation, n8n, AEO, and shipping software from Bali.",
  }),
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Blog",
      name: "SkynetLabs News",
      url: `${SITE.url}/news`,
      description:
        "Latest field notes on AI automation, n8n, AEO, and shipping software.",
      // Link author/publisher to the canonical entities (M15).
      author: personRef,
      publisher: { "@id": `${SITE.url}/#organization` },
      blogPost: NEWS.map((p) => ({
        "@type": "NewsArticle",
        headline: p.title,
        description: p.description,
        url: `${SITE.url}/news/${p.slug}`,
        datePublished: p.publishedAt,
        dateModified: p.updatedAt || p.publishedAt,
        image: `${SITE.assetsUrl}${p.heroImage}`,
        author: personRef,
      })),
    },
    person,
    organization,
  ],
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function NewsIndex() {
  const posts = [...NEWS].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  return (
    <div className="sky">
      <JsonLd data={schema} />

      {/* HERO */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-inner">
            <div className="hero-eyebrow">
              <span className="pulse"></span>
              News · playbooks
            </div>

            <h1>
              Field notes from <em>one operator,</em> shipping.
            </h1>

            <p className="hero-sub">
              Short, dated updates from the build — real client wins, real cost
              math, real failure modes. Written from cafes in Canggu and
              rooftops in Pererenan.
            </p>

            <div className="cta-row">
              <Link href="/discovery-call" className="btn-primary">
                Book a free 30-min audit →
              </Link>
              <Link href="/blog" className="btn-line">
                Want long-form guides? Read the Journal
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="section-kicker">All field notes</span>
            <h2>
              The latest <em>updates.</em>
            </h2>
            <p className="section-sub">
              {posts.length} dated notes, newest first — straight from the
              build.
            </p>
          </div>

          <div className="feature-row">
            {posts.map((n) => (
              <Link
                key={n.slug}
                href={`/news/${n.slug}`}
                className="feat-card"
                style={{ display: "block" }}
              >
                <span className="feat-tag">
                  {n.category} · {formatDate(n.publishedAt)} · {n.readingTime}{" "}
                  min
                </span>
                <h3 className="feat-title">{n.title}</h3>
                <p className="feat-body">{n.deck}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
