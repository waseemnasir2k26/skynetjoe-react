import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import WorkShowcase from "@/components/sections/WorkShowcase";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Portfolio — Recent Projects",
  description:
    "Live screenshots of every shipped SkynetLabs build: dental flagship, real estate, wellness, HVAC, logistics, legal, healthcare. 20+ deployed sites. Built solo from Bali by Waseem Nasir.",
  alternates: { canonical: `${SITE.url}/portfolio` },
  openGraph: {
    title: "SkynetLabs Portfolio — Recent Projects",
    description:
      "Live screenshots of 20+ shipped builds. Click any tile for the deployed site.",
    url: `${SITE.url}/portfolio`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "SkynetLabs Portfolio — Recent Projects",
  description:
    "Live screenshots of every shipped build across nine countries.",
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

      {/* HERO */}
      <section
        style={{
          background: "var(--cream-3)",
          padding: "clamp(88px, 18vw, 112px) 0 clamp(44px, 12vw, 64px)",
          borderBottom: "1px solid rgba(26,26,26,0.10)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Reveal initialVisible style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(16px, 5vw, 24px)" }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "var(--terracotta-aa)",
              marginBottom: 18,
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ width: 28, height: 1, background: "var(--terracotta)" }} />
            Portfolio · live builds
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(38px, 6vw, 68px)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              lineHeight: 1.04,
              color: "var(--ink)",
              margin: "0 0 18px",
              maxWidth: "20ch",
            }}
          >
            20+ shipped builds.{" "}
            <span style={{ color: "var(--terracotta-aa)", fontWeight: 700 }}>
              Real receipts.
            </span>
          </h1>
          <p
            style={{
              fontSize: 18,
              color: "var(--ink-2)",
              maxWidth: "60ch",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Live screenshots of every site I&apos;ve shipped — dental, real
            estate, wellness, HVAC, logistics, legal, healthcare. Click any
            tile to open the deployed site. Built solo from Bali.
          </p>
        </Reveal>
      </section>

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

      {/* CLOSER */}
      <section
        style={{
          padding: "clamp(56px, 14vw, 88px) 0",
          background: "var(--terracotta)",
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
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "var(--cream-3)",
              opacity: 0.85,
              marginBottom: 18,
            }}
          >
            — 4 build slots open this month
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4.4vw, 44px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "var(--cream-3)",
              marginBottom: 14,
            }}
          >
            Want your build on this{" "}
            <span
              style={{
                fontWeight: 700,
                textDecoration: "underline",
                textDecorationThickness: "1px",
                textUnderlineOffset: "8px",
              }}
            >
              wall next quarter?
            </span>
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "rgba(250, 247, 240, 0.92)",
              maxWidth: "50ch",
              margin: "0 auto 28px",
              lineHeight: 1.6,
            }}
          >
            Send a brief, get a fixed-price scope back. Reply in 8h · scope in
            48h — and a 30-min call decides if we&apos;re the right fit.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
            <Link
              href="/discovery-call"
              style={{
                background: "var(--cream-3)",
                color: "var(--terracotta)",
                padding: "16px 28px",
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: 15,
                borderRadius: 2,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                textDecoration: "none",
                boxShadow: "0 16px 40px rgba(26,26,26,0.18)",
              }}
            >
              Send a 3-sentence brief
              <ArrowRight style={{ width: 16, height: 16 }} />
            </Link>
            <Link
              href="/pricing"
              style={{
                background: "transparent",
                color: "var(--cream-3)",
                padding: "15px 26px",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: 15,
                border: "1px solid var(--cream-3)",
                borderRadius: 2,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                textDecoration: "none",
              }}
            >
              See pricing
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
