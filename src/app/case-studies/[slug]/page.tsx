import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Calendar, MapPin, Wrench } from "lucide-react";
import { CASE_STUDIES, getCaseStudy } from "@/lib/case-studies";
import { SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";

export const dynamicParams = false;

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return { title: "Case study not found" };

  const title = `${c.clientName} — ${c.industryTag} case study | SkynetLabs`;
  const description = c.oneLineOutcome;

  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/case-studies/${c.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE.url}/case-studies/${c.slug}`,
      type: "article",
      publishedTime: c.publishDate,
      authors: [SITE.founder],
      images: [`${SITE.url}${c.coverImage}`],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@Skynetjoe1",
    },
  };
}

export default async function CaseStudyDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${c.clientName} — ${c.oneLineOutcome}`,
    description: c.oneLineOutcome,
    url: `${SITE.url}/case-studies/${c.slug}`,
    datePublished: c.publishDate,
    dateModified: c.publishDate,
    inLanguage: "en",
    author: {
      "@type": "Person",
      name: SITE.founder,
      url: `${SITE.url}/author/waseem-nasir`,
    },
    image: `${SITE.url}${c.coverImage}`,
    publisher: {
      "@type": "Organization",
      name: SITE.brand,
      url: SITE.url,
      logo: { "@type": "ImageObject", url: `${SITE.url}/og-default.png` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE.url}/case-studies/${c.slug}`,
    },
    about: c.industry,
    keywords: [c.industryTag, c.industry, c.location, ...c.solutionStack].join(", "),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Case Studies",
        item: `${SITE.url}/case-studies`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: c.clientName,
        item: `${SITE.url}/case-studies/${c.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* HERO */}
      <section
        className="relative overflow-hidden pt-24 md:pt-28 pb-12"
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
            opacity: 0.5,
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

        <div className="container-x px-6 relative z-10">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="text-xs text-cyan-200/80 mb-6 flex items-center flex-wrap gap-2"
          >
            <Link href="/" className="hover:text-cyan-100">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/case-studies" className="hover:text-cyan-100">
              Case Studies
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-white/90">{c.clientName}</span>
          </nav>

          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 text-sm mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all case studies
          </Link>

          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-5 text-xs text-gray-400">
              <span className="px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-200 uppercase tracking-wider font-semibold">
                {c.industryTag}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {c.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(c.publishDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5" />
                {c.implementationPeriod}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.1] mb-5">
              {c.clientName}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              {c.oneLineOutcome}
            </p>
          </div>
        </div>
      </section>

      {/* HERO IMAGE */}
      <section className="relative -mt-2">
        <div className="container-x px-6 max-w-5xl mx-auto">
          <div
            className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl"
            style={{
              border: "1px solid rgba(0, 212, 255, 0.30)",
              boxShadow: "0 30px 80px -12px rgba(0, 212, 255, 0.30)",
            }}
          >
            <Image
              src={c.coverImage}
              alt={`${c.clientName} — ${c.industry}`}
              fill
              priority
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover"
            />
            <span
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(6,24,39,0) 60%, rgba(6,24,39,0.55) 100%)",
              }}
            />
          </div>
        </div>
      </section>

      {/* KPI STRIP */}
      <section className="section pt-12">
        <div className="container-x px-6 max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {c.keyMetrics.map((m) => (
              <div
                key={m.label}
                className="rounded-2xl bg-white/5 border border-white/10 p-4 md:p-5"
              >
                <div className="text-[11px] uppercase tracking-wider text-cyan-300 font-semibold mb-2">
                  {m.label}
                </div>
                <div className="text-xs text-gray-400 mb-1">
                  Before: <span className="text-gray-200">{m.before}</span>
                </div>
                <div className="text-xs text-gray-400 mb-2">
                  After: <span className="text-white font-semibold">{m.after}</span>
                </div>
                <div className="text-base md:text-lg font-extrabold text-cyan-200">
                  {m.delta}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="section">
        <div className="container-x px-6 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
            The problem
          </h2>
          <div className="space-y-4 text-gray-200 leading-relaxed">
            {c.problemStatement.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE BUILT */}
      <section className="section">
        <div className="container-x px-6 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
            What we built
          </h2>

          <div className="mb-6">
            <div className="text-xs uppercase tracking-wider text-cyan-300 font-semibold mb-3">
              Solution stack
            </div>
            <div className="flex flex-wrap gap-2">
              {c.solutionStack.map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/25 text-cyan-100 text-sm"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-2 text-xs uppercase tracking-wider text-cyan-300 font-semibold">
            Implementation ({c.implementationPeriod})
          </div>
          <ul className="space-y-2 text-gray-200 leading-relaxed list-none pl-0">
            {c.implementationBreakdown.map((b, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-cyan-300 font-bold flex-shrink-0">→</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* RESULTS */}
      <section className="section">
        <div className="container-x px-6 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
            Results
          </h2>
          <div className="space-y-4 text-gray-200 leading-relaxed">
            {c.longFormStory.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section className="section">
        <div className="container-x px-6 max-w-3xl mx-auto">
          <blockquote
            className="relative rounded-3xl p-8 md:p-10"
            style={{
              background:
                "linear-gradient(135deg, rgba(30,136,229,0.12) 0%, rgba(20,184,166,0.12) 100%)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <p className="text-xl md:text-2xl text-white font-semibold leading-snug mb-4">
              &ldquo;{c.testimonialQuote}&rdquo;
            </p>
            <footer className="text-sm text-cyan-200">
              — {c.testimonialAuthor}
            </footer>
          </blockquote>
        </div>
      </section>

      {/* TOOLS / RELATED SERVICES */}
      {c.relatedServices.length > 0 && (
        <section className="section">
          <div className="container-x px-6 max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
              Tools & services used
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {c.relatedServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/50 transition group flex items-center justify-between"
                >
                  <span className="font-semibold text-white group-hover:text-cyan-200">
                    {s.label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-cyan-300" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section">
        <div className="container-x px-6 max-w-3xl mx-auto">
          <div
            className="rounded-3xl p-8 md:p-10 text-center"
            style={{
              background: "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
            }}
          >
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
              Want a result like this for your business?
            </h2>
            <p className="text-white/90 mb-6">
              Send the brief. Fixed-price scope back in 48 hours. No retainer
              hostage situation.
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
