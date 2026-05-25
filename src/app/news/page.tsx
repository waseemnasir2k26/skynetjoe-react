import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { NEWS } from "@/lib/news";
import { SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Latest news & field notes — SkynetLabs",
  description:
    "Honest field notes from one operator shipping AI automation, n8n, AEO, and bespoke websites from Bali. Real client builds, real cost math, real failure modes.",
  alternates: { canonical: `${SITE.url}/news` },
  openGraph: {
    title: "SkynetLabs — Latest news & field notes",
    description:
      "Field notes on AI automation, n8n, AEO, and shipping software from Bali.",
    url: `${SITE.url}/news`,
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

// Map categories to cream-palette accent colors (was cyan/violet/teal)
const CATEGORY_COLORS: Record<string, string> = {
  Automation: "var(--terracotta)",
  AEO: "var(--sage)",
  Stack: "var(--ochre)",
  Operations: "var(--oxblood)",
  Pricing: "var(--terracotta)",
  Tools: "var(--ochre)",
  "Field notes": "var(--sage)",
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
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      <JsonLd data={schema} />

      {/* HERO */}
      <section
        style={{
          background: "var(--cream-3)",
          padding: "112px 0 56px",
          borderBottom: "1px solid rgba(26,26,26,0.10)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
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
            The journal · Volume II
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(40px, 6.5vw, 76px)",
              fontWeight: 500,
              letterSpacing: "-0.025em",
              lineHeight: 1.02,
              color: "var(--ink)",
              margin: "0 0 20px",
              maxWidth: "22ch",
            }}
          >
            Field notes from{" "}
            <em style={{ fontStyle: "italic", color: "var(--terracotta)", fontWeight: 500 }}>
              one operator,
            </em>{" "}
            shipping.
          </h1>
          <p
            style={{
              fontSize: 18,
              color: "var(--ink-2)",
              maxWidth: "60ch",
              lineHeight: 1.55,
              margin: 0,
            }}
          >
            Real client builds. Real cost math. Real failure modes. Written
            from cafes in Canggu and rooftops in Pererenan.
          </p>
        </div>
      </section>

      {/* FEATURED */}
      <section style={{ padding: "56px 0", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <Link
            href={`/news/${featured.slug}`}
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr)",
              gap: 0,
              background: "var(--cream-3)",
              border: "1px solid rgba(26,26,26,0.12)",
              textDecoration: "none",
              boxShadow: "0 24px 60px rgba(26,26,26,0.10)",
              transform: "rotate(-0.2deg)",
            }}
            className="news-featured"
          >
            <style>{`
              @media (max-width: 768px) {
                .news-featured { grid-template-columns: 1fr !important; }
              }
            `}</style>
            <div
              style={{
                position: "relative",
                aspectRatio: "16 / 10",
                overflow: "hidden",
                background: "var(--cream-2)",
                borderRight: "1px solid rgba(26,26,26,0.10)",
              }}
            >
              <Image
                src={featured.heroImage}
                alt={featured.heroCaption}
                fill
                priority
                sizes="(min-width: 768px) 55vw, 100vw"
                style={{
                  objectFit: "cover",
                  objectPosition: featured.heroPosition ?? "center",
                  filter: "sepia(0.06) saturate(0.95)",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  top: 14,
                  left: 14,
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.16em",
                  fontWeight: 600,
                  padding: "5px 10px",
                  color: "var(--cream-3)",
                  background: CATEGORY_COLORS[featured.category] ?? "var(--terracotta)",
                  borderRadius: 2,
                }}
              >
                Featured · {featured.category}
              </span>
            </div>
            <div
              style={{
                padding: "36px 36px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "var(--ink-faint)",
                  marginBottom: 12,
                }}
              >
                — {formatDate(featured.publishedAt)} · {featured.readingTime} min
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(22px, 2.6vw, 30px)",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  color: "var(--ink)",
                  margin: "0 0 14px",
                }}
              >
                {featured.title}
              </h2>
              <p
                style={{
                  fontSize: 15,
                  color: "var(--ink-2)",
                  lineHeight: 1.6,
                  margin: "0 0 20px",
                }}
              >
                {featured.deck}
              </p>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "var(--terracotta)",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                Read the letter
                <ArrowRight style={{ width: 14, height: 14 }} />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* GRID */}
      <section style={{ padding: "16px 0 72px", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: 28,
              gap: 16,
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(22px, 2.4vw, 28px)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                color: "var(--ink)",
                margin: 0,
              }}
            >
              All field notes
            </h2>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--ink-faint)",
              }}
            >
              — {posts.length} articles · newest first
            </span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            {rest.map((n, i) => {
              const accent = CATEGORY_COLORS[n.category] ?? "var(--terracotta)";
              const rotate = i % 2 === 0 ? "-0.3deg" : "0.3deg";
              return (
                <Link
                  key={n.slug}
                  href={`/news/${n.slug}`}
                  className="news-card"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    background: "var(--cream-2)",
                    border: "1px solid rgba(26,26,26,0.12)",
                    textDecoration: "none",
                    transform: `rotate(${rotate})`,
                    transition: "border-color 0.2s ease, transform 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      aspectRatio: "16 / 10",
                      overflow: "hidden",
                      background: "var(--cream-3)",
                      borderBottom: "1px solid rgba(26,26,26,0.10)",
                    }}
                  >
                    <Image
                      src={n.heroImage}
                      alt={n.heroCaption}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      style={{
                        objectFit: "cover",
                        objectPosition: n.heroPosition ?? "center",
                        filter: "sepia(0.06) saturate(0.95)",
                      }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        top: 10,
                        left: 10,
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        textTransform: "uppercase",
                        letterSpacing: "0.14em",
                        fontWeight: 600,
                        padding: "4px 9px",
                        color: "var(--cream-3)",
                        background: accent,
                        borderRadius: 2,
                      }}
                    >
                      {n.category}
                    </span>
                  </div>
                  <div style={{ padding: "20px 22px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        color: "var(--ink-faint)",
                        marginBottom: 10,
                      }}
                    >
                      — {formatDate(n.publishedAt)} · {n.readingTime} min
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 17,
                        fontWeight: 600,
                        color: "var(--ink)",
                        margin: "0 0 8px",
                        letterSpacing: "-0.01em",
                        lineHeight: 1.25,
                      }}
                    >
                      {n.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 14,
                        color: "var(--ink-2)",
                        lineHeight: 1.55,
                        flex: 1,
                        margin: "0 0 14px",
                      }}
                    >
                      {n.deck}
                    </p>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        textTransform: "uppercase",
                        letterSpacing: "0.14em",
                        color: "var(--terracotta)",
                        fontWeight: 600,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        marginTop: "auto",
                      }}
                    >
                      Read
                      <ArrowRight style={{ width: 12, height: 12 }} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
          <style>{`
            .news-card:hover { border-color: var(--terracotta) !important; }
          `}</style>
        </div>
      </section>

      {/* CLOSER */}
      <section
        style={{
          padding: "88px 0",
          background: "var(--terracotta)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
            padding: "0 24px",
            textAlign: "center",
          }}
        >
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
            The audit takes{" "}
            <em
              style={{
                fontStyle: "italic",
                textDecoration: "underline",
                textDecorationThickness: "1px",
                textUnderlineOffset: "8px",
              }}
            >
              fifteen minutes.
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
            Eight-hour reply on weekday Bali time. Yes, no, or referral. Either
            way you walk with the findings.
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
              Book the audit
              <ArrowRight style={{ width: 16, height: 16 }} />
            </Link>
            <Link
              href="/case-studies"
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
              See case studies
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
