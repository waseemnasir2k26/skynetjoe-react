import Link from "next/link";
import type { Metadata } from "next";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import WorkShowcase from "@/components/sections/WorkShowcase";

export const metadata: Metadata = {
  title: "Portfolio — Recent Projects",
  description:
    "Live screenshots of every shipped SkynetLabs build: dental flagship, real estate, wellness, HVAC, logistics, legal, healthcare. 40+ deployed sites. Built solo from Bali by Waseem Nasir.",
  alternates: { canonical: `${SITE.url}/portfolio` },
  openGraph: {
    title: "SkynetLabs Portfolio — Recent Projects",
    description:
      "Live screenshots of 40+ shipped builds. Click any tile for the deployed site.",
    url: `${SITE.url}/portfolio`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "SkynetLabs Portfolio — Recent Projects",
  description: "Live screenshots of every shipped build across nine countries.",
  url: `${SITE.url}/portfolio`,
  inLanguage: "en",
  isPartOf: { "@id": `${SITE.url}/#website` },
  publisher: { "@id": `${SITE.url}/#organization` },
  author: { "@type": "Person", name: SITE.founder, url: SITE.founderUrl },
};

export default function PortfolioPage() {
  return (
    <>
      <JsonLd data={schema} />

      <div className="sky">
        {/* HERO — skyv3 design language */}
        <section className="hero">
          <div className="wrap">
            <div className="hero-inner">
              <div className="hero-eyebrow">
                <span className="pulse"></span>
                <strong>40+ sites shipped</strong>&nbsp;· 180+ workflows · 9
                countries
              </div>

              <h1>
                Not mockups. <em>Live shipped builds, real screenshots.</em>
              </h1>

              <p className="hero-sub">
                Every tile below is a site I actually deployed — dental, real
                estate, wellness, HVAC, logistics, legal, healthcare.{" "}
                <strong>Click any tile to open the live site.</strong> Built
                solo from Bali, source-controlled, public-priced.
              </p>

              <div className="cta-row">
                <Link
                  href={SITE.cta.href}
                  className="btn-primary"
                  data-meta-event="Schedule"
                  data-meta-name="portfolio-book-audit"
                >
                  {SITE.cta.label} →
                </Link>
                <Link href="/case-studies" className="btn-line">
                  Read the case studies
                </Link>
              </div>

              <div className="featured-in">
                <span className="featured-lbl">Proof</span>
                <span>40+ websites delivered</span>
                <span>180+ workflows shipped</span>
                <span>9 countries served</span>
              </div>
            </div>
          </div>
        </section>

        {/* GALLERY — interactive lightbox preserved; re-skinned to cream via wrap */}
        <div
          className="portfolio-cream-wrap"
          style={{
            background: "var(--cream-3)",
            padding: "48px 0 64px",
            position: "relative",
            zIndex: 2,
          }}
        >
          <style>{`
            .portfolio-cream-wrap { color: var(--ink); }
            .portfolio-cream-wrap h1,
            .portfolio-cream-wrap h2,
            .portfolio-cream-wrap h3 { color: var(--ink) !important; font-family: var(--font-display) !important; }
            .portfolio-cream-wrap p { color: var(--ink-2) !important; }
            .portfolio-cream-wrap .text-white,
            .portfolio-cream-wrap .text-gray-100,
            .portfolio-cream-wrap .text-gray-200,
            .portfolio-cream-wrap .text-gray-300,
            .portfolio-cream-wrap .text-gray-400 { color: var(--ink-2) !important; }
            .portfolio-cream-wrap .bg-white\\/5,
            .portfolio-cream-wrap .bg-white\\/10 { background-color: var(--cream-2) !important; }
            .portfolio-cream-wrap .border-white\\/10,
            .portfolio-cream-wrap .border-white\\/15,
            .portfolio-cream-wrap .border-white\\/20 { border-color: rgba(26,26,26,0.12) !important; }
            .portfolio-cream-wrap section { background: transparent !important; }
          `}</style>
          <WorkShowcase />
        </div>

        {/* CLOSER — skyv3 design language */}
        <section className="closer">
          <div className="wrap">
            <div className="closer-scarcity">4 build slots open this month</div>
            <h2>
              Want your build on this <em>wall next quarter?</em>
            </h2>
            <p>
              Send a 3-sentence brief, get a fixed-price scope back. Reply in 8h
              · scope in 48h — and a 30-min call decides if we&apos;re the right
              fit.
            </p>
            <div className="cta-row">
              <Link
                href={SITE.cta.href}
                className="btn-primary"
                data-meta-event="Schedule"
                data-meta-name="portfolio-closer-audit"
              >
                {SITE.cta.label} →
              </Link>
              <Link href="/pricing" className="btn-line">
                See pricing
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
