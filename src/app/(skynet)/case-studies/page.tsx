import fs from "fs";
import path from "path";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import { CASE_STUDIES } from "@/lib/case-studies";
import JsonLd from "@/components/JsonLd";

const rawHtml = fs.readFileSync(
  path.join(process.cwd(), "content", "case-studies.html"),
  "utf8"
);

// Wrap each `<article class="wn-x-card">…</article>` block in an anchor that
// links to the matching detail page. Cards appear in numerical order (01..09)
// inside `<section class="wn-x-grid">…</section>`, matching CASE_STUDIES
// ordered by `position`. Also injects a real AI-generated hero image into the
// `.wn-x-thumb` div (replaces the gradient placeholder + glyph text) and a
// "Read full case study →" link inside each card body.
function injectCardLinks(html: string): string {
  const ordered = [...CASE_STUDIES].sort((a, b) => a.position - b.position);
  let i = 0;
  let j = 0;
  return html
    .replace(/<article class="wn-x-card">/g, () => {
      const c = ordered[i++];
      if (!c) return '<article class="wn-x-card">';
      return `<article class="wn-x-card" data-slug="${c.slug}" style="position:relative;">`;
    })
    // Insert real image inside .wn-x-thumb (keep the number badge, drop the glyph)
    .replace(
      /<div class="wn-x-thumb (g\d+)" aria-hidden="true">\s*<span class="wn-x-thumb-num">([^<]+)<\/span>\s*<span class="wn-x-thumb-glyph">[^<]+<\/span>\s*<\/div>/g,
      (_match, gClass, num) => {
        const c = ordered[j++];
        if (!c)
          return `<div class="wn-x-thumb ${gClass}" aria-hidden="true"><span class="wn-x-thumb-num">${num}</span></div>`;
        return `<a href="/case-studies/${c.slug}" class="wn-x-thumb ${gClass}" style="display:block;position:relative;text-decoration:none;"><img src="${c.coverImage}" alt="${c.clientName} — ${c.industry}" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;" /><span class="wn-x-thumb-num" style="z-index:3;">${num}</span><span aria-hidden="true" style="position:absolute;inset:0;background:linear-gradient(180deg, rgba(26,26,26,0) 55%, rgba(26,26,26,0.45) 100%);z-index:2;"></span></a>`;
      }
    )
    .replace(/<\/ul>\s*<\/div>\s*<\/article>/g, (match) => {
      const c = ordered.shift();
      if (!c) return match;
      const link = `</ul><a href="/case-studies/${c.slug}" style="display:inline-flex;align-items:center;gap:.4rem;margin-top:.85rem;color:#C66B3F;font-size:.85rem;font-weight:600;text-decoration:none;">Read full case study →</a></div></article>`;
      return link;
    });
}

const html = injectCardLinks(rawHtml);

export const metadata: Metadata = {
  title: "Case Studies — 9 builds across automation, websites & AI content",
  description:
    "Nine anonymized client wins from SkynetLabs: n8n automation, flagship websites, AEO content engines and CRM rebuilds. Honest outcomes, no vanity metrics.",
  alternates: { canonical: `${SITE.url}/case-studies` },
  openGraph: {
    title: "SkynetLabs Case Studies — 9 shipped builds",
    description:
      "EU logistics, Manhattan dental, Bali wellness, KSA retail and more — anonymized where contracts require it.",
    url: `${SITE.url}/case-studies`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "SkynetLabs Case Studies",
  description:
    "Nine anonymized client wins across automation, websites, AEO content engines and CRM rebuilds.",
  url: `${SITE.url}/case-studies`,
  inLanguage: "en",
  isPartOf: { "@id": `${SITE.url}/#website` },
  publisher: { "@id": `${SITE.url}/#organization` },
  about: { "@id": `${SITE.url}/#organization` },
};

export default function CaseStudiesPage() {
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
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(16px, 5vw, 24px)" }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "var(--terracotta)",
              marginBottom: 18,
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ width: 28, height: 1, background: "var(--terracotta)" }} />
            Case studies · 2024–2026
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(38px, 6vw, 68px)",
              fontWeight: 500,
              letterSpacing: "-0.025em",
              lineHeight: 1.04,
              color: "var(--ink)",
              margin: "0 0 18px",
              maxWidth: "20ch",
            }}
          >
            Nine shipped builds.{" "}
            <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>
              Real receipts.
            </em>
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
            EU logistics. Manhattan dental. Bali wellness. KSA retail. Each
            one anonymized where the contract requires it — outcomes, stack,
            and timelines stay honest.
          </p>
        </div>
      </section>

      {/* Cream-tinted wrapper for the injected legacy HTML */}
      <div
        style={{
          background: "var(--cream)",
          color: "var(--ink)",
          padding: "40px 0 64px",
          position: "relative",
          zIndex: 2,
        }}
        className="cs-html-wrap"
      >
        <style>{`
          .cs-html-wrap article[class*="wn-"] { color: var(--ink) !important; }
          .cs-html-wrap article[class*="wn-"] h1,
          .cs-html-wrap article[class*="wn-"] h2,
          .cs-html-wrap article[class*="wn-"] h3,
          .cs-html-wrap article[class*="wn-"] h4 {
            color: var(--ink) !important;
            font-family: var(--font-display) !important;
          }
          .cs-html-wrap article[class*="wn-"] p,
          .cs-html-wrap article[class*="wn-"] li {
            color: var(--ink-2) !important;
          }
          .cs-html-wrap .wn-x-card {
            background: var(--cream-2) !important;
            border: 1px solid rgba(26,26,26,0.12) !important;
            box-shadow: 0 12px 32px rgba(26,26,26,0.08) !important;
          }
          .cs-html-wrap .wn-x-card:nth-child(odd) { transform: rotate(-0.3deg); }
          .cs-html-wrap .wn-x-card:nth-child(even) { transform: rotate(0.3deg); }
          @media (max-width: 640px) {
            .cs-html-wrap .wn-x-card { transform: none !important; }
          }
        `}</style>
        <div dangerouslySetInnerHTML={{ __html: html }} />
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
        <div
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
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "var(--cream-3)",
              marginBottom: 14,
            }}
          >
            Want your name on this{" "}
            <em
              style={{
                fontStyle: "italic",
                textDecoration: "underline",
                textDecorationThickness: "1px",
                textUnderlineOffset: "8px",
              }}
            >
              page next quarter?
            </em>
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
            9 builds shipped. 4 slots open per month. 30-min call decides if
            we&apos;re the right fit — yes/no in 8 hours.
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
              Apply for a discovery call
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
        </div>
      </section>
    </>
  );
}
