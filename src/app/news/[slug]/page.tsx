import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import { NEWS, getArticle, relatedFor } from "@/lib/news";
import { SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";

/**
 * Dynamic /news/[slug] — renders ocean-themed article pages for entries
 * with a `body` field. Legacy hand-written articles (own page.tsx folders)
 * win the route match automatically and bypass this.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return NEWS.filter((n) => n.body && n.body.length > 0).map((n) => ({
    slug: n.slug,
  }));
}

const CATEGORY_COLORS: Record<string, string> = {
  Automation: "#7EE4FF",
  AEO: "#5EEAD4",
  Stack: "#C4B5FD",
  Operations: "#FCD34D",
  Pricing: "#FF8FB1",
  Tools: "#F472B6",
  "Field notes": "#FFB547",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return { title: "Article not found" };
  return {
    title: `${a.title} — SkynetLabs`,
    description: a.description,
    alternates: { canonical: `${SITE.url}/news/${a.slug}` },
    openGraph: {
      title: a.title,
      description: a.description,
      url: `${SITE.url}/news/${a.slug}`,
      type: "article",
      publishedTime: a.publishedAt,
      modifiedTime: a.updatedAt || a.publishedAt,
      authors: [SITE.founder],
      images: [`${SITE.url}${a.heroImage}`],
    },
    twitter: {
      card: "summary_large_image",
      title: a.title,
      description: a.description,
      creator: "@Skynetjoe1",
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a || !a.body) notFound();

  const accent = CATEGORY_COLORS[a.category] ?? "#7EE4FF";
  const related = relatedFor(a.slug, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: a.title,
    description: a.description,
    url: `${SITE.url}/news/${a.slug}`,
    datePublished: a.publishedAt,
    dateModified: a.updatedAt || a.publishedAt,
    image: `${SITE.url}${a.heroImage}`,
    author: {
      "@type": "Person",
      name: SITE.founder,
      url: `${SITE.url}/author/waseem-nasir`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.brand,
      url: SITE.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE.url}/news/${a.slug}`,
    },
    keywords: a.tags.join(", "),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "News",
        item: `${SITE.url}/news`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: a.title,
        item: `${SITE.url}/news/${a.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* HERO */}
      <section
        className="relative overflow-hidden pt-28 md:pt-32 pb-10"
        style={{
          background:
            "linear-gradient(135deg, #061827 0%, #0a2d4a 45%, #073846 100%)",
        }}
      >
        <span
          className="orb"
          style={{
            width: 480,
            height: 480,
            background: "#1E88E5",
            top: -80,
            left: -120,
            opacity: 0.40,
          }}
        />

        <div className="container-x px-6 relative z-10 max-w-3xl">
          <nav
            aria-label="Breadcrumb"
            className="text-xs text-cyan-200/80 mb-5 flex items-center flex-wrap gap-2"
          >
            <Link href="/" className="hover:text-cyan-100">
              Home
            </Link>
            <span aria-hidden>/</span>
            <Link href="/news" className="hover:text-cyan-100">
              News
            </Link>
            <span aria-hidden>/</span>
            <span className="text-white/85 truncate">{a.title}</span>
          </nav>

          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 text-sm mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all field notes
          </Link>

          <div className="flex items-center gap-3 mb-5">
            <span
              className="text-[10px] uppercase tracking-[0.18em] font-bold px-2.5 py-1 rounded-md"
              style={{
                color: accent,
                background: `${accent}1a`,
                border: `1px solid ${accent}40`,
              }}
            >
              {a.category}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-fg-muted">
              <Calendar className="w-3 h-3" />
              {formatDate(a.publishedAt)}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-fg-muted">
              <Clock className="w-3 h-3" />
              {a.readingTime} min read
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.08] mb-5">
            {a.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            {a.deck}
          </p>
        </div>
      </section>

      {/* HERO IMAGE */}
      <section className="relative -mt-2">
        <div className="container-x px-6 max-w-4xl mx-auto">
          <div
            className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl"
            style={{
              border: `1px solid ${accent}40`,
              boxShadow: `0 30px 80px -15px ${accent}30`,
            }}
          >
            <Image
              src={a.heroImage}
              alt={a.heroCaption}
              fill
              priority
              sizes="(min-width: 1024px) 800px, 100vw"
              className="object-cover"
            />
            <span
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent 60%, rgba(6,24,39,0.55) 100%)",
              }}
            />
          </div>
          <p className="text-xs text-fg-faint italic text-center mt-3">
            {a.heroCaption}
          </p>
        </div>
      </section>

      {/* BODY */}
      <article className="py-12 md:py-16">
        <div className="container-x px-6 max-w-3xl mx-auto">
          <div className="prose-body text-fg-muted text-[17px] md:text-[18px] leading-[1.75] space-y-5">
            {a.body!.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {a.tags.length > 0 && (
            <div className="mt-12 pt-6 border-t border-white/[0.08]">
              <div className="text-[11px] uppercase tracking-wider text-cyan-300 font-semibold mb-3">
                Tags
              </div>
              <div className="flex flex-wrap gap-2">
                {a.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-md text-xs bg-white/[0.04] border border-white/10 text-fg-muted"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* INLINE CTA */}
      <section className="pb-16">
        <div className="container-x px-6 max-w-3xl mx-auto">
          <div
            className="rounded-3xl p-7 md:p-9 text-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(30,136,229,0.18) 0%, rgba(20,184,166,0.14) 100%)",
              border: "1px solid rgba(0,212,255,0.30)",
            }}
          >
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-3">
              Want this kind of build for your business?
            </h2>
            <p className="text-base text-fg-muted max-w-xl mx-auto mb-6">
              Send a 3-sentence brief. Scope + price back in 8 hours.
            </p>
            <Link
              href="/discovery-call"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white transition-transform hover:-translate-y-0.5"
              style={{
                background:
                  "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
                boxShadow: "0 8px 28px rgba(0, 212, 255, 0.30)",
              }}
            >
              Book the audit
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="pb-20 border-t border-white/[0.08] pt-14">
          <div className="container-x px-6 max-w-5xl mx-auto">
            <div className="text-[11px] uppercase tracking-[0.18em] text-cyan-300 font-bold mb-2">
              More from the journal
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-6">
              Keep reading.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map((r) => {
                const a2 = CATEGORY_COLORS[r.category] ?? "#7EE4FF";
                return (
                  <Link
                    key={r.slug}
                    href={`/news/${r.slug}`}
                    className="group rounded-2xl overflow-hidden flex flex-col bg-white/[0.03] border border-white/10 hover:border-cyan-400/40 transition-all hover:-translate-y-1"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={r.heroImage}
                        alt={r.heroCaption}
                        fill
                        sizes="(min-width: 1024px) 33vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="p-4">
                      <span
                        className="text-[10px] uppercase tracking-[0.16em] font-bold"
                        style={{ color: a2 }}
                      >
                        {r.category}
                      </span>
                      <h3 className="text-sm font-bold text-white tracking-tight leading-snug mt-1 mb-1 line-clamp-2">
                        {r.title}
                      </h3>
                      <span className="text-xs text-fg-faint">
                        {r.readingTime} min · {formatDate(r.publishedAt)}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
