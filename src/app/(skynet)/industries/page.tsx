/**
 * /industries — vertical landing index.
 *
 * Why this exists:
 *   /industries/[slug] pages emit a BreadcrumbList that references
 *   ${SITE.url}/industries as position-2. Without an index page that URL
 *   404s — breaking the breadcrumb chain for SEO and any SERP that
 *   surfaces the parent crumb.
 *
 * Styled in the site `.sky` / skyv3 design language (the /lp/logistics look):
 *   - All content wrapped in <div className="sky">; classes defined in
 *     src/styles/skyv3.css, reference impl src/components/sky/SkyHero.tsx.
 *   - Hero pattern (.hero / eyebrow+pulse / h1 <em> / .hero-sub / .cta-row /
 *     .featured-in), feature cards (.feature-row / .feat-card), .closer.
 *   - Server component — animations are pure CSS, no client JS.
 */

import Link from "next/link";
import type { Metadata } from "next";
import { INDUSTRIES } from "@/data/industries";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Industries — Vertical-Built AI Systems",
  description:
    "Industry-specific AI receptionists, booking agents, and revenue automation for dental clinics, wellness spas, and freight & logistics. Vertical tools, vertical voice, vertical scope.",
  alternates: { canonical: `${SITE.url}/industries` },
  openGraph: {
    title: "SkynetLabs Industries — Vertical-built AI systems",
    description:
      "AI systems built for the vertical, not glued on top of it. Dental, wellness, freight. Each one ships fixed-scope, 5-14 days.",
    url: `${SITE.url}/industries`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${SITE.url}/industries#collection`,
      name: `${SITE.brand} Industries`,
      description:
        "Three vertical-specific AI systems: dental clinics, wellness spas, freight & logistics. Each one is a flagship product, not a service line.",
      url: `${SITE.url}/industries`,
      inLanguage: "en",
      isPartOf: { "@id": `${SITE.url}/#website` },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: INDUSTRIES.length,
        itemListElement: INDUSTRIES.map((i, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          url: `${SITE.url}/industries/${i.slug}`,
          name: i.name,
        })),
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE.url}/industries#breadcrumbs`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        {
          "@type": "ListItem",
          position: 2,
          name: "Industries",
          item: `${SITE.url}/industries`,
        },
      ],
    },
  ],
};

export default function IndustriesIndexPage() {
  return (
    <>
      <JsonLd data={schema} />

      <div className="sky">
        {/* HERO ──────────────────────────────────────────────────────────── */}
        <section className="hero">
          <div className="wrap">
            <div className="hero-inner">
              <div className="hero-eyebrow">
                <span className="pulse"></span>
                Vertical-built&nbsp;· <strong>not horizontal-glued</strong>
              </div>

              <h1>
                Generic automations break in your industry.{" "}
                <em>We build ones that speak the dialect.</em>
              </h1>

              <p className="hero-sub">
                Three verticals, three flagship products. Each one trained on
                the vocabulary, the PMS, the dispatch software, the insurance
                plans, the no-show pattern —{" "}
                <strong>
                  every detail the off-the-shelf builder doesn&apos;t know
                  exists.
                </strong>
              </p>

              <div className="cta-row">
                <Link
                  href={SITE.cta.href}
                  className="btn-primary"
                  data-meta-event="Schedule"
                  data-meta-name="industries-book-audit"
                >
                  {SITE.cta.label} →
                </Link>
                <Link href="/case-studies" className="btn-line">
                  See real wins
                </Link>
              </div>

              <div className="hero-scarcity">
                <strong>Custom verticals quoted in 8 hours</strong>&nbsp;· books
                within 48-72 hours
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

        {/* 3 INDUSTRY CARDS ──────────────────────────────────────────────── */}
        <section className="section tinted">
          <div className="wrap">
            <div className="section-head">
              <span className="section-kicker">The verticals</span>
              <h2>
                A flagship product <em>for each industry</em>, not a service
                line.
              </h2>
              <p className="section-sub">
                Vertical tools, vertical voice, vertical scope. Pick the one
                that runs your front desk.
              </p>
            </div>

            <div className="feature-row feature-row-3">
              {INDUSTRIES.map((i) => (
                <Link
                  key={i.slug}
                  href={`/industries/${i.slug}`}
                  className="feat-card"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <span className="feat-tag">{i.shortName} · industry</span>
                  <h3 className="feat-title">{i.name}</h3>
                  <p className="feat-body">{i.eyebrowChip}</p>
                  <ul className="feat-list">
                    <li>Flagship: {i.flagshipProductName}</li>
                    <li>{i.flagshipProductLede.split(". ")[0]}.</li>
                  </ul>
                  <span
                    className="btn-line"
                    style={{ marginTop: "auto", alignSelf: "flex-start" }}
                  >
                    See the {i.shortName} system →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CLOSER ─────────────────────────────────────────────────────────── */}
        <section className="closer">
          <div className="wrap">
            <span className="closer-scarcity">Not your industry yet?</span>
            <h2>
              New industries ship every quarter. <em>Tell me yours.</em>
            </h2>
            <p>
              If you run a med-spa, real-estate brokerage, fitness studio, law
              firm, or anything else with a repeatable front-desk workflow, send
              me the brief. Custom vertical builds quoted within 8 hours.
            </p>
            <div className="cta-row">
              <Link href={SITE.cta.href} className="btn-primary">
                {SITE.cta.label} →
              </Link>
              <Link href="/services" className="btn-line">
                Browse all services
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
