import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight, Calendar, Clock, Sparkles } from "lucide-react";
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

const CATEGORY_COLORS: Record<string, string> = {
  Automation: "#7EE4FF",
  AEO: "#5EEAD4",
  Stack: "#C4B5FD",
  Operations: "#FCD34D",
  Pricing: "#FF8FB1",
  Tools: "#F472B6",
  "Field notes": "#FFB547",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function NewsIndex() {
  // Sort newest first
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
        className="relative overflow-hidden pt-28 md:pt-36 pb-12"
        style={{
          background:
            "linear-gradient(135deg, #061827 0%, #0a2d4a 45%, #073846 100%)",
        }}
      >
        <span
          className="orb"
          style={{
            width: 540,
            height: 540,
            background: "#1E88E5",
            top: -90,
            left: -130,
            opacity: 0.45,
          }}
        />
        <span
          className="orb"
          style={{
            width: 580,
            height: 580,
            background: "#00D4FF",
            top: 80,
            right: -160,
            opacity: 0.35,
            animationDelay: "-7s",
          }}
        />

        <div className="container-x px-6 relative z-10 max-w-4xl">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-300 mb-5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/25">
            <Sparkles className="w-3 h-3" />
            The journal · Volume II
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.04] mb-5">
            Field notes from{" "}
            <span
              className="italic font-semibold"
              style={{
                fontFamily:
                  '"Playfair Display", Georgia, "Times New Roman", serif',
                background:
                  "linear-gradient(120deg, #00D4FF 0%, #14B8A6 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
              }}
            >
              one operator,
            </span>{" "}
            shipping.
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl">
            Real client builds. Real cost math. Real failure modes. Written
            from cafes in Canggu and rooftops in Pererenan.
          </p>
        </div>
      </section>

      {/* FEATURED */}
      <section className="py-12 md:py-16">
        <div className="container-x px-6 max-w-6xl mx-auto">
          <Link
            href={`/news/${featured.slug}`}
            className="group block rounded-3xl overflow-hidden grid md:grid-cols-[1.2fr_1fr] gap-0 transition-transform hover:-translate-y-1"
            style={{
              background:
                "linear-gradient(135deg, rgba(10,32,52,0.7) 0%, rgba(7,56,70,0.6) 100%)",
              border: "1px solid rgba(0,212,255,0.20)",
              boxShadow: "0 30px 80px -25px rgba(0,212,255,0.25)",
            }}
          >
            <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[360px] overflow-hidden">
              <Image
                src={featured.heroImage}
                alt={featured.heroCaption}
                fill
                priority
                sizes="(min-width: 768px) 55vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                style={{ objectPosition: featured.heroPosition ?? "center" }}
              />
              <span
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 60%, rgba(10,32,52,0.6) 100%)",
                }}
              />
              <span
                className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.18em] font-bold px-2.5 py-1 rounded-md backdrop-blur-md"
                style={{
                  color: CATEGORY_COLORS[featured.category] ?? "#7EE4FF",
                  background: "rgba(6,24,39,0.65)",
                  border: `1px solid ${CATEGORY_COLORS[featured.category] ?? "#7EE4FF"}40`,
                }}
              >
                Featured · {featured.category}
              </span>
            </div>
            <div className="p-6 md:p-9 flex flex-col justify-center">
              <div className="flex items-center gap-3 text-xs text-fg-faint mb-3">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  {formatDate(featured.publishedAt)}
                </span>
                <span>·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  {featured.readingTime} min
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight mb-3">
                {featured.title}
              </h2>
              <p className="text-sm md:text-base text-fg-muted leading-relaxed mb-5">
                {featured.deck}
              </p>
              <span className="inline-flex items-center gap-1.5 text-cyan-300 text-sm font-bold group-hover:gap-3 transition-all">
                Read the letter
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* GRID */}
      <section className="pb-16 md:pb-24">
        <div className="container-x px-6 max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-white">
              All field notes
            </h2>
            <span className="text-xs text-fg-faint">
              {posts.length} articles · newest first
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((n) => {
              const accent = CATEGORY_COLORS[n.category] ?? "#7EE4FF";
              return (
                <Link
                  key={n.slug}
                  href={`/news/${n.slug}`}
                  className="group rounded-2xl overflow-hidden flex flex-col bg-white/[0.03] border border-white/10 hover:border-cyan-400/40 transition-all hover:-translate-y-1"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={n.heroImage}
                      alt={n.heroCaption}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      style={{ objectPosition: n.heroPosition ?? "center" }}
                    />
                    <span
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, transparent 50%, rgba(6,24,39,0.85) 100%)",
                      }}
                    />
                    <span
                      className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.16em] font-bold px-2 py-0.5 rounded-md backdrop-blur-md"
                      style={{
                        color: accent,
                        background: "rgba(6,24,39,0.7)",
                        border: `1px solid ${accent}40`,
                      }}
                    >
                      {n.category}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-xs text-fg-faint mb-2">
                      <span>{formatDate(n.publishedAt)}</span>
                      <span>·</span>
                      <span>{n.readingTime} min</span>
                    </div>
                    <h3 className="text-base font-bold text-white tracking-tight leading-snug mb-2 line-clamp-2">
                      {n.title}
                    </h3>
                    <p className="text-sm text-fg-muted leading-relaxed line-clamp-3 mb-4 flex-1">
                      {n.deck}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-cyan-300 text-sm font-semibold group-hover:gap-2.5 transition-all mt-auto">
                      Read
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CLOSER */}
      <section className="py-16 md:py-20 border-t border-white/[0.08]">
        <div className="container-x px-6 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
            The audit takes{" "}
            <span
              className="italic"
              style={{
                fontFamily:
                  '"Playfair Display", Georgia, "Times New Roman", serif',
                background:
                  "linear-gradient(120deg, #00D4FF 0%, #14B8A6 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
              }}
            >
              fifteen minutes.
            </span>
          </h2>
          <p className="text-base text-fg-muted max-w-xl mx-auto mb-7">
            Eight-hour reply on weekday Bali time. Yes, no, or referral. Either
            way you walk with the findings.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/discovery-call"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white transition-transform hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
                boxShadow: "0 8px 28px rgba(0, 212, 255, 0.30)",
              }}
            >
              Book the audit
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white border border-white/15 bg-white/[0.04] hover:border-cyan-400/40 transition"
            >
              See case studies
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
