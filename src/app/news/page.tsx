import Link from "next/link";
import type { Metadata } from "next";
import { NEWS } from "@/lib/news";
import { SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { LetterShell } from "@/components/letter/LetterArticle";

export const metadata: Metadata = {
  title: "Latest news & field notes from SkynetLabs",
  description:
    "Honest field notes from one operator shipping AI automation, n8n, AEO, and bespoke websites from Canggu, Bali. Real client builds, real cost math, real failure modes.",
  alternates: { canonical: "/news" },
  openGraph: {
    title: "SkynetLabs — Latest news & field notes",
    description:
      "Field notes on AI automation, n8n, AEO, and shipping software from Bali.",
    url: "/news",
    type: "website",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "SkynetLabs News",
  url: `${SITE.url}/news`,
  description:
    "Latest field notes on AI automation, n8n, AEO, and shipping software.",
  author: { "@type": "Person", name: SITE.founder, url: SITE.founderUrl },
  publisher: { "@type": "Organization", name: SITE.brand, url: SITE.url },
  blogPost: NEWS.map((p) => ({
    "@type": "BlogPosting",
    headline: p.title,
    description: p.description,
    url: `${SITE.url}/news/${p.slug}`,
    datePublished: p.publishedAt,
    dateModified: p.updatedAt || p.publishedAt,
    image: `${SITE.url}${p.heroImage}`,
    author: { "@type": "Person", name: SITE.founder },
  })),
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function NewsIndex() {
  return (
    <>
      <JsonLd data={schema} />
      <LetterShell>
        <main>
          <section className="index-hero">
            <div className="wrap">
              <div className="hero-mark">The journal · Volume II · 2026</div>
              <h1>
                Field notes from <em>one operator</em>, shipping.
              </h1>
              <p>
                Real client builds. Real cost math. Real failure modes. Written from
                Crate Cafe in Canggu and a desk in Lahore.
              </p>
            </div>
          </section>

          <section className="index-grid">
            <div className="card-list">
              {NEWS.map((n) => (
                <Link key={n.slug} href={`/news/${n.slug}`} className="card">
                  <div className="card-photo">
                    <img src={n.heroImage} alt={n.heroCaption} loading="lazy" />
                  </div>
                  <div className="card-body">
                    <div className="card-meta">
                      {n.category} · {formatDate(n.publishedAt)} · {n.readingTime} min
                    </div>
                    <h2 className="card-title">{n.title}</h2>
                    <p className="card-deck">{n.deck}</p>
                    <span className="card-read">read the letter →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="closer">
            <h2>
              The audit takes <em>fifteen minutes.</em>
            </h2>
            <p>
              Eight-hour reply on weekday Bali time. Yes, no, or referral. Either way
              you walk with the findings.
            </p>
            <div className="closer-cta-row">
              <a href="https://cal.com/skynetjoe/audit" className="btn btn-gold">
                Book the audit →
              </a>
              <a
                href="/discovery-call"
                className="btn btn-paper"
              >
                Apply for a call
              </a>
            </div>
          </section>
        </main>
      </LetterShell>
    </>
  );
}
