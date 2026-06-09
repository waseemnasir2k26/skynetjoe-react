import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { SITE, DEFAULT_OG_IMAGES, twitterFromOpenGraph } from "@/lib/site";
import { person, personRef, organization } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import HtmlCreamWrap from "@/components/HtmlCreamWrap";

const html = fs.readFileSync(
  path.join(process.cwd(), "content", "terms-of-service.html"),
  "utf8",
);

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms governing engagements with SkynetLabs and use of skynetjoe.com. Plain-language contract: 50% deposit, IP transfer on payment, Indonesian jurisdiction. Last updated 2026-05-20.",
  alternates: { canonical: `${SITE.url}/terms-of-service` },
  openGraph: {
    title: "SkynetLabs Terms of Service",
    description:
      "Engagement terms, payment, IP ownership, dispute resolution. Written plainly so both sides know where they stand.",
    url: `${SITE.url}/terms-of-service`,
    type: "article",
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: twitterFromOpenGraph({
    title: "SkynetLabs Terms of Service",
    description:
      "Engagement terms, payment, IP ownership, dispute resolution. Written plainly so both sides know where they stand.",
  }),
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: "Terms of Service — SkynetLabs",
      description:
        "Terms governing engagements with SkynetLabs and use of skynetjoe.com. 50% deposit, IP transfer on payment, Indonesian jurisdiction.",
      url: `${SITE.url}/terms-of-service`,
      inLanguage: "en",
      dateModified: "2026-05-20",
      // image + canonical author/publisher refs (M15). The old publisher.logo
      // wrongly used a personal portrait — the canonical Organization carries
      // the correct icon-512.png logo.
      image: `${SITE.url}/og-default.png`,
      author: personRef,
      publisher: { "@id": `${SITE.url}/#organization` },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${SITE.url}/terms-of-service`,
      },
    },
    person,
    organization,
  ],
};

export default function TermsOfServicePage() {
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
              Where we both <em>stand.</em>
            </h1>
            <p className="hero-sub">
              Terms governing engagements with SkynetLabs and use of
              skynetjoe.com. 50% deposit, IP transfer on payment, Indonesian
              jurisdiction — written plainly.
            </p>
          </div>
        </div>
      </section>

      <HtmlCreamWrap html={html} />
    </div>
  );
}
