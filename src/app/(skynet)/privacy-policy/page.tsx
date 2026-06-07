import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import HtmlCreamWrap from "@/components/HtmlCreamWrap";

const html = fs.readFileSync(
  path.join(process.cwd(), "content", "privacy-policy.html"),
  "utf8",
);

export const metadata: Metadata = {
  title: "Privacy Policy — SkynetLabs",
  description:
    "How SkynetLabs collects, stores, and shares data. Plain-language policy for skynetjoe.com and any consulting engagement. Last updated 2026-05-20.",
  alternates: { canonical: `${SITE.url}/privacy-policy` },
  openGraph: {
    title: "SkynetLabs Privacy Policy",
    description:
      "How we handle your data. Minimum collection, no tracking cookies, deletion on request.",
    url: `${SITE.url}/privacy-policy`,
    type: "article",
    images: [...DEFAULT_OG_IMAGES],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Privacy Policy — SkynetLabs",
  description:
    "How SkynetLabs collects, stores, and shares data. Plain-language policy for skynetjoe.com and any consulting engagement.",
  url: `${SITE.url}/privacy-policy`,
  inLanguage: "en",
  dateModified: "2026-05-20",
  author: { "@type": "Person", name: SITE.founder, url: SITE.founderUrl },
  publisher: {
    "@type": "Organization",
    name: SITE.brand,
    url: SITE.url,
    logo: { "@type": "ImageObject", url: `${SITE.url}/og-default.png` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE.url}/privacy-policy` },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="sky">
      <JsonLd data={schema} />

      <section className="hero">
        <div className="wrap">
          <div className="hero-inner">
            <div className="hero-eyebrow">
              <span className="pulse"></span>
              Legal&nbsp;· Last updated 2026-05-20
            </div>
            <h1>
              How we handle <em>your data.</em>
            </h1>
            <p className="hero-sub">
              Plain-language privacy policy for skynetjoe.com and any consulting
              engagement. Minimum collection, no tracking cookies, deletion on
              request.
            </p>
          </div>
        </div>
      </section>

      <HtmlCreamWrap html={html} />
    </div>
  );
}
