import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { POSTS } from "@/lib/posts";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Journal — Long-form on AI Automation, AEO & Shipping | SkynetLabs",
  description:
    "Honest writing on n8n, GoHighLevel, answer-engine optimization, and shipping software for service businesses across 9 countries. New posts when there's something worth saying.",
  alternates: { canonical: `${SITE.url}/blog` },
  openGraph: {
    title: "SkynetLabs Journal",
    description:
      "Long-form writing on AI automation, AEO, and shipping software for service businesses.",
    url: `${SITE.url}/blog`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "SkynetLabs Journal",
  url: `${SITE.url}/blog`,
  description: "Long-form writing on AI automation, AEO, and shipping software.",
  author: { "@type": "Person", name: SITE.founder, url: SITE.founderUrl },
  publisher: { "@type": "Organization", name: SITE.brand, url: SITE.url },
  blogPost: POSTS.map((p) => ({
    "@type": "BlogPosting",
    headline: p.title,
    description: p.description,
    url: `${SITE.url}/blog/${p.slug}`,
    datePublished: p.publishedAt,
    dateModified: p.updatedAt || p.publishedAt,
    author: { "@type": "Person", name: SITE.founder },
  })),
};

const categoryColor: Record<string, string> = {
  automation: "from-cyan-400 to-sky-500",
  aeo: "from-fuchsia-400 to-rose-500",
  "case-study": "from-teal-400 to-emerald-500",
  playbook: "from-amber-400 to-orange-500",
};

export default function BlogPage() {
  return (
    <>
      <JsonLd data={schema} />

      <section
        className="relative overflow-hidden pt-24 md:pt-32 pb-12"
        style={{
          background:
            "linear-gradient(135deg, #061827 0%, #0a2d4a 45%, #073846 100%)",
        }}
      >
        <span className="orb" style={{ width: 540, height: 540, background: "#1E88E5", top: -90, left: -130, opacity: 0.5 }} />
        <span className="orb" style={{ width: 580, height: 580, background: "#00D4FF", top: 80, right: -160, opacity: 0.4, animationDelay: "-7s" }} />

        <div className="container-x px-6 relative z-10">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-4">
              Journal
            </p>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.04] tracking-tight mb-6 text-white">
              Long-form on{" "}
              <span
                style={{
                  background:
                    "linear-gradient(120deg, #7ee4ff 0%, #5eead4 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  WebkitTextFillColor: "transparent",
                }}
              >
                what actually ships.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
              Posts when we have something worth saying — not on a schedule. Real client builds, real cost math, real failure modes.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {POSTS.map((p) => {
              const grad = categoryColor[p.category] || "from-cyan-400 to-sky-500";
              return (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group p-6 rounded-2xl bg-white/95 border border-white/60 shadow-lg shadow-cyan-500/5 hover:shadow-xl hover:shadow-cyan-500/25 hover:-translate-y-1 transition-all"
                >
                  <div className={`inline-block px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold bg-gradient-to-r ${grad} text-white mb-4`}>
                    {p.category.replace("-", " ")}
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-900 leading-tight mb-3 group-hover:text-skynet-primary">
                    {p.title}
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed mb-5 line-clamp-3">
                    {p.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {new Date(p.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="w-3 h-3" />
                        {p.readingTime} min
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-skynet-primary group-hover:translate-x-1 transition" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div
            className="rounded-3xl p-8 md:p-12 text-center"
            style={{ background: "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)" }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3">
              Reading isn&apos;t shipping.
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              If anything here matches your problem, send a brief. We&apos;ll send back a fixed scope in 48 hours.
            </p>
            <Link
              href="/discovery-call"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-900 font-semibold hover:bg-cyan-50 transition"
            >
              Apply for a discovery call
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
