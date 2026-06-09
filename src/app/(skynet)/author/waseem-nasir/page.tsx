import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { person } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import HtmlCreamWrap from "@/components/HtmlCreamWrap";

const html = fs.readFileSync(
  path.join(process.cwd(), "content", "author-waseem-nasir.html"),
  "utf8",
);

export const metadata: Metadata = {
  title: "Waseem Nasir — Founder",
  description:
    "I build automation that doesn't need me to babysit it. Lahore → Singapore → Bangkok → KL → Bali. 180+ workflows, 40+ websites, 9 countries served.",
  alternates: { canonical: `${SITE.url}/author/waseem-nasir` },
  openGraph: {
    title: "Waseem Nasir — Founder, SkynetLabs",
    description:
      "Founder of SkynetLabs. n8n automation, AI chatbots and conversion-tuned websites — built from Bali.",
    url: `${SITE.url}/author/waseem-nasir`,
    type: "profile",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "SkynetLabs — AI automation, chatbots and conversion-tuned websites",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Waseem Nasir — Founder, SkynetLabs",
    description:
      "I build automation that doesn't need me to babysit it. 180+ workflows, 40+ websites, 9 countries.",
    creator: "@skynetlabs",
    images: ["/og-default.png"],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${SITE.url}/author/waseem-nasir#profilepage`,
      url: `${SITE.url}/author/waseem-nasir`,
      name: `${SITE.founder} — Founder, ${SITE.brand}`,
      mainEntity: { "@id": `${SITE.url}/#person` },
      inLanguage: "en",
    },
    // Canonical #person node (single source of truth in @/lib/schema). The
    // ProfilePage above is mainEntity → this. Occupation/award richness that
    // previously lived here inline is dropped in favour of ONE byte-identical
    // Person entity reused across the site (M15 — was conflicting jobTitle/
    // image/sameAs vs every other page).
    person,
  ],
};

export default function AuthorPage() {
  return (
    <div className="sky">
      <JsonLd data={schema} />

      <section className="hero">
        <div className="wrap">
          <div className="hero-inner">
            <div className="hero-eyebrow">
              <span className="pulse"></span>
              Author
            </div>
            <h1>
              Waseem Nasir builds automation that <em>runs itself.</em>
            </h1>
            <p className="hero-sub">
              Founder of SkynetLabs. n8n automation, AI chatbots and
              conversion-tuned websites — built from Bali.{" "}
              <strong>180+ workflows, 40+ websites, 9 countries served.</strong>
            </p>
          </div>
        </div>
      </section>

      <HtmlCreamWrap html={html} />
    </div>
  );
}
