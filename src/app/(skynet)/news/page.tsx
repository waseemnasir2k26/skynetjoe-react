import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { NEWS } from "@/lib/news";
import { POSTS } from "@/lib/posts";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import {
  Reveal,
  RevealGroup,
  RevealItem,
  ParallaxFigure,
} from "@/components/motion/Reveal";

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
};

function makeSchema(feed: FeedItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "SkynetLabs News",
    url: `${SITE.url}/news`,
    description:
      "Latest field notes on AI automation, n8n, AEO, and shipping software.",
    author: { "@type": "Person", name: SITE.founder, url: SITE.founderUrl },
    publisher: { "@type": "Organization", name: SITE.brand, url: SITE.url },
    blogPost: feed.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.deck,
      url: `${SITE.url}${p.href}`,
      datePublished: p.publishedAt,
      dateModified: p.publishedAt,
      image: `${SITE.assetsUrl}${p.heroImage}`,
      author: { "@type": "Person", name: SITE.founder },
    })),
  };
}

// Map categories to cream-palette accent colors (was cyan/violet/teal)
const CATEGORY_COLORS: Record<string, string> = {
  Automation: "var(--terracotta)",
  AEO: "var(--sage)",
  Stack: "var(--ochre)",
  Operations: "var(--oxblood)",
  Pricing: "var(--terracotta)",
  Tools: "var(--ochre)",
  "Field notes": "var(--sage)",
  // Long-form Journal (blog) categories, surfaced on this hub too:
  "Case study": "var(--oxblood)",
  Playbook: "var(--ochre)",
  Guide: "var(--sage)",
};

// Blog (posts.ts) category slugs → human labels used on the cards.
const BLOG_CATEGORY_LABEL: Record<string, string> = {
  automation: "Automation",
  aeo: "AEO",
  "case-study": "Case study",
  playbook: "Playbook",
};

// Blog posts carry no cover image → fall back to the brand OG card.
const BLOG_FALLBACK_IMAGE = "/og-default.png";

// How many cards per page in the "All articles" grid (excludes the featured hero).
const PAGE_SIZE = 9;

/** Unified card model so /news can list BOTH short field notes (news.ts,
 *  route /news/[slug]) AND long-form Journal posts (posts.ts, route /blog/[slug])
 *  in one dated, paginated feed without breaking either URL space. */
type FeedItem = {
  href: string;
  title: string;
  deck: string;
  category: string;
  heroImage: string;
  heroCaption: string;
  heroPosition?: string;
  publishedAt: string;
  readingTime: number;
};

function buildFeed(): FeedItem[] {
  const fromNews: FeedItem[] = NEWS.map((n) => ({
    href: `/news/${n.slug}`,
    title: n.title,
    deck: n.deck,
    category: n.category,
    heroImage: n.heroImage,
    heroCaption: n.heroCaption,
    heroPosition: n.heroPosition,
    publishedAt: n.publishedAt,
    readingTime: n.readingTime,
  }));
  const fromBlog: FeedItem[] = POSTS.map((p) => ({
    href: `/blog/${p.slug}`,
    title: p.title,
    deck: p.description,
    category: BLOG_CATEGORY_LABEL[p.category] ?? "Guide",
    heroImage: p.coverImage ?? BLOG_FALLBACK_IMAGE,
    heroCaption: p.title,
    publishedAt: p.publishedAt,
    readingTime: p.readingTime,
  }));
  return [...fromNews, ...fromBlog].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function NewsIndex({
  searchParams,
}: {
  searchParams: Promise<{ page?: string | string[] }>;
}) {
  const posts = buildFeed();
  const featured = posts[0];
  const rest = posts.slice(1);

  // Server-side pagination via ?page=N. Featured hero shows on page 1 only.
  const totalPages = Math.max(1, Math.ceil(rest.length / PAGE_SIZE));
  const pageParam = (await searchParams).page;
  const pageRaw = Number(Array.isArray(pageParam) ? pageParam[0] : pageParam);
  const page = Math.min(
    Math.max(1, Number.isFinite(pageRaw) ? Math.trunc(pageRaw) : 1),
    totalPages,
  );
  const start = (page - 1) * PAGE_SIZE;
  // Global rank across the whole feed (featured = #1) → drives card numbering.
  const pageItems = rest
    .slice(start, start + PAGE_SIZE)
    .map((item, i) => ({ item, rank: start + i + 2 }));

  return (
    <>
      <JsonLd data={makeSchema(posts)} />

      {/* HERO */}
      <section
        style={{
          background: "var(--cream-3)",
          padding: "clamp(88px, 18vw, 112px) 0 clamp(40px, 9vw, 56px)",
          borderBottom: "1px solid rgba(26,26,26,0.10)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Reveal
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 clamp(16px, 5vw, 24px)",
          }}
        >
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
            <span
              style={{ width: 28, height: 1, background: "var(--terracotta)" }}
            />
            News · short field notes
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(40px, 6.5vw, 76px)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              lineHeight: 1.02,
              color: "var(--ink)",
              margin: "0 0 20px",
              maxWidth: "22ch",
            }}
          >
            Field notes from{" "}
            <span style={{ color: "var(--terracotta-aa)", fontWeight: 700 }}>
              one operator,
            </span>{" "}
            shipping.
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
            Short, dated updates from the build — real client wins, real cost
            math, real failure modes. Written from cafes in Canggu and rooftops
            in Pererenan.
          </p>

          {/* Cross-link to the long-form hub — keeps News + Journal distinct. */}
          <Link
            href="/blog"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginTop: 22,
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              fontWeight: 600,
              color: "var(--terracotta-aa)",
              textDecoration: "none",
            }}
          >
            Want long-form guides? → Read the Journal
            <ArrowRight style={{ width: 14, height: 14 }} />
          </Link>
        </Reveal>
      </section>

      {/* FEATURED — newest across news + journal; page 1 only */}
      {page === 1 && (
        <section
          style={{
            padding: "clamp(40px, 9vw, 56px) 0",
            position: "relative",
            zIndex: 2,
          }}
        >
          <ParallaxFigure
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              padding: "0 clamp(16px, 5vw, 24px)",
            }}
          >
            <Link
              href={featured.href}
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
                .news-featured { grid-template-columns: 1fr !important; transform: rotate(0) !important; }
                .news-featured-body { padding: 24px 20px !important; }
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
                    objectPosition: featured.heroPosition ?? "center top",
                    filter: "none",
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
                    color:
                      (CATEGORY_COLORS[featured.category] ??
                        "var(--terracotta)") === "var(--ochre)" ||
                      (CATEGORY_COLORS[featured.category] ??
                        "var(--terracotta)") === "var(--sage)"
                        ? "var(--ink)"
                        : "var(--cream-3)",
                    background:
                      CATEGORY_COLORS[featured.category] ?? "var(--terracotta)",
                    borderRadius: 2,
                  }}
                >
                  Featured · {featured.category}
                </span>
              </div>
              <div
                className="news-featured-body"
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
                  <span style={{ color: "var(--terracotta-aa)" }}>01</span> ·{" "}
                  {formatDate(featured.publishedAt)} · {featured.readingTime}{" "}
                  min
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
          </ParallaxFigure>
        </section>
      )}

      {/* GRID */}
      <section
        style={{
          padding: "16px 0 clamp(56px, 12vw, 72px)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 clamp(16px, 5vw, 24px)",
          }}
        >
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
              — {posts.length} articles · newest first · page {page} of{" "}
              {totalPages}
            </span>
          </div>
          <RevealGroup
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            {pageItems.map(({ item: n, rank }) => {
              const accent = CATEGORY_COLORS[n.category] ?? "var(--terracotta)";
              // Light accents (ochre/sage) need ink text for AA contrast on chip bg.
              const chipTextColor =
                accent === "var(--ochre)" || accent === "var(--sage)"
                  ? "var(--ink)"
                  : "var(--cream-3)";
              return (
                <RevealItem
                  as="article"
                  key={n.href}
                  style={{ display: "flex" }}
                >
                  <Link
                    href={n.href}
                    className="news-card"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                      background: "var(--cream-2)",
                      border: "1px solid rgba(26,26,26,0.12)",
                      textDecoration: "none",
                      transition: "border-color 0.2s ease",
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
                          objectPosition: n.heroPosition ?? "center top",
                          filter: "none",
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
                          color: chipTextColor,
                          background: accent,
                          borderRadius: 2,
                        }}
                      >
                        {n.category}
                      </span>
                    </div>
                    <div
                      style={{
                        padding: "20px 22px",
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                      }}
                    >
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
                        <span style={{ color: "var(--terracotta-aa)" }}>
                          {pad2(rank)}
                        </span>{" "}
                        · {formatDate(n.publishedAt)} · {n.readingTime} min
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
                          color: "var(--terracotta-aa)",
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
                </RevealItem>
              );
            })}
          </RevealGroup>
          <style>{`
            .news-card:hover { border-color: var(--terracotta) !important; }
            .pager-link:hover { border-color: var(--terracotta) !important; color: var(--terracotta-aa) !important; }
          `}</style>

          {/* PAGINATION — server-rendered, crawlable (?page=N); page 1 = /news */}
          {totalPages > 1 && (
            <nav
              aria-label="News pagination"
              style={{
                marginTop: 44,
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: "0.08em",
              }}
            >
              {page > 1 ? (
                <Link
                  className="pager-link"
                  href={page - 1 === 1 ? "/news" : `/news?page=${page - 1}`}
                  rel="prev"
                  style={{
                    padding: "9px 14px",
                    border: "1px solid rgba(26,26,26,0.20)",
                    color: "var(--ink-2)",
                    textDecoration: "none",
                    textTransform: "uppercase",
                    fontWeight: 600,
                  }}
                >
                  ← Prev
                </Link>
              ) : (
                <span
                  style={{
                    padding: "9px 14px",
                    border: "1px solid rgba(26,26,26,0.08)",
                    color: "var(--ink-faint)",
                    textTransform: "uppercase",
                    fontWeight: 600,
                  }}
                >
                  ← Prev
                </span>
              )}

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                const isCurrent = p === page;
                return (
                  <Link
                    key={p}
                    className={isCurrent ? undefined : "pager-link"}
                    href={p === 1 ? "/news" : `/news?page=${p}`}
                    aria-current={isCurrent ? "page" : undefined}
                    style={{
                      minWidth: 40,
                      textAlign: "center",
                      padding: "9px 12px",
                      border: "1px solid",
                      borderColor: isCurrent
                        ? "var(--terracotta)"
                        : "rgba(26,26,26,0.20)",
                      background: isCurrent
                        ? "var(--terracotta)"
                        : "transparent",
                      color: isCurrent ? "var(--cream-3)" : "var(--ink-2)",
                      textDecoration: "none",
                      fontWeight: 600,
                    }}
                  >
                    {pad2(p)}
                  </Link>
                );
              })}

              {page < totalPages ? (
                <Link
                  className="pager-link"
                  href={`/news?page=${page + 1}`}
                  rel="next"
                  style={{
                    padding: "9px 14px",
                    border: "1px solid rgba(26,26,26,0.20)",
                    color: "var(--ink-2)",
                    textDecoration: "none",
                    textTransform: "uppercase",
                    fontWeight: 600,
                  }}
                >
                  Next →
                </Link>
              ) : (
                <span
                  style={{
                    padding: "9px 14px",
                    border: "1px solid rgba(26,26,26,0.08)",
                    color: "var(--ink-faint)",
                    textTransform: "uppercase",
                    fontWeight: 600,
                  }}
                >
                  Next →
                </span>
              )}
            </nav>
          )}
        </div>
      </section>

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
            The audit takes{" "}
            <span
              style={{
                fontWeight: 700,
                textDecoration: "underline",
                textDecorationThickness: "1px",
                textUnderlineOffset: "8px",
              }}
            >
              fifteen minutes.
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
            Eight-hour reply on weekday Bali time. Yes, no, or referral. Either
            way you walk with the findings.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 12,
            }}
          >
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
        </Reveal>
      </section>
    </>
  );
}
