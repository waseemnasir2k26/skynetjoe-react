import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { CASE_STUDIES, getCaseStudy } from "@/lib/case-studies";
import { SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import ZoomableImage from "@/components/ZoomableImage";

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

  const title = `${c.clientName} â€” ${c.industryTag} case study | SkynetLabs`;
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
      images: [`${SITE.assetsUrl}${c.coverImage}`],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@skynetlabs",
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
    headline: `${c.clientName} â€” ${c.oneLineOutcome}`,
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
    image: `${SITE.assetsUrl}${c.coverImage}`,
    publisher: {
      "@type": "Organization",
      name: SITE.brand,
      url: SITE.url,
      logo: { "@type": "ImageObject", url: `${SITE.assetsUrl}/waseem-portrait.jpg`, width: 1200, height: 1200 },
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

  const dateFmt = new Date(c.publishDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* HERO */}
      <section
        style={{
          background: "var(--cream-3)",
          padding: "clamp(88px, 18vw, 112px) 0 clamp(40px, 10vw, 56px)",
          borderBottom: "1px solid rgba(26,26,26,0.10)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(16px, 5vw, 24px)" }}>
          <nav
            aria-label="Breadcrumb"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.10em",
              color: "var(--ink-faint)",
              marginBottom: 20,
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              alignItems: "center",
            }}
          >
            <Link href="/" style={{ color: "var(--ink-faint)", textDecoration: "none" }}>
              Home
            </Link>
            <span aria-hidden>/</span>
            <Link href="/case-studies" style={{ color: "var(--ink-faint)", textDecoration: "none" }}>
              Case Studies
            </Link>
            <span aria-hidden>/</span>
            <span style={{ color: "var(--ink)" }}>{c.clientName}</span>
          </nav>

          <Link
            href="/case-studies"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              color: "var(--terracotta)",
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.10em",
              marginBottom: 28,
              textDecoration: "none",
            }}
          >
            <ArrowLeft style={{ width: 14, height: 14 }} />
            Back to all case studies
          </Link>

          <div style={{ maxWidth: 820 }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--ink-faint)",
                marginBottom: 18,
                lineHeight: 1.7,
              }}
            >
              <span style={{ color: "var(--terracotta)" }}>â€” {c.industryTag}</span>
              <span style={{ margin: "0 10px", color: "rgba(26,26,26,0.20)" }}>Â·</span>
              {c.location}
              <span style={{ margin: "0 10px", color: "rgba(26,26,26,0.20)" }}>Â·</span>
              {dateFmt}
              <span style={{ margin: "0 10px", color: "rgba(26,26,26,0.20)" }}>Â·</span>
              {c.implementationPeriod}
            </div>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(30px, 5.5vw, 64px)",
                fontWeight: 500,
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
                color: "var(--ink)",
                margin: "0 0 18px",
                wordBreak: "break-word",
                overflowWrap: "anywhere",
              }}
            >
              {c.clientName}
            </h1>
            <p
              style={{
                fontSize: 19,
                color: "var(--ink-2)",
                lineHeight: 1.55,
                maxWidth: "60ch",
                margin: 0,
              }}
            >
              {c.oneLineOutcome}
            </p>
          </div>
        </div>
      </section>

      {/* HERO IMAGE â€” polaroid frame */}
      <section style={{ padding: "clamp(24px, 6vw, 40px) 0 24px", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 clamp(16px, 5vw, 24px)" }}>
          <figure
            className="cs-hero-polaroid"
            style={{
              margin: 0,
              transform: "rotate(-0.6deg)",
              background: "var(--cream-3)",
              padding: 12,
              border: "1px solid rgba(26,26,26,0.14)",
              boxShadow: "0 24px 64px rgba(26,26,26,0.14)",
            }}
          >
            <style>{`
              @media (max-width: 640px) {
                .cs-hero-polaroid { transform: rotate(0) !important; padding: 8px !important; }
              }
            `}</style>
            <div
              style={{
                position: "relative",
                aspectRatio: "16 / 9",
                overflow: "hidden",
                background: "var(--cream-2)",
              }}
            >
              <ZoomableImage
                src={c.coverImage}
                alt={`${c.clientName} â€” ${c.industry}`}
                fill
                priority
                sizes="(min-width: 1024px) 1000px, 100vw"
                style={{
                  objectFit: "cover",
                  filter: "none",
                }}
              />
            </div>
          </figure>
        </div>
      </section>

      {/* KPI STRIP */}
      <section style={{ padding: "clamp(20px, 6vw, 32px) 0 clamp(40px, 10vw, 56px)", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 clamp(16px, 5vw, 24px)" }}>
          <div
            className="cs-kpi-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 16,
            }}
          >
            <style>{`
              @media (max-width: 640px) {
                .cs-kpi-grid > div { transform: none !important; }
              }
            `}</style>
            {c.keyMetrics.map((m, i) => (
              <div
                key={m.label}
                style={{
                  background: "var(--cream-2)",
                  border: "1px solid rgba(26,26,26,0.10)",
                  padding: "20px 22px",
                  transform: i % 2 === 0 ? "rotate(-0.3deg)" : "rotate(0.3deg)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: "0.18em",
                    color: "var(--sage)",
                    fontWeight: 600,
                    marginBottom: 12,
                  }}
                >
                  â€” {m.label}
                </div>
                <div style={{ fontSize: 12, color: "var(--ink-faint)", marginBottom: 4 }}>
                  Before: <span style={{ color: "var(--ink-2)" }}>{m.before}</span>
                </div>
                <div style={{ fontSize: 12, color: "var(--ink-faint)", marginBottom: 10 }}>
                  After: <span style={{ color: "var(--ink)", fontWeight: 600 }}>{m.after}</span>
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontSize: 28,
                    fontWeight: 500,
                    color: "var(--terracotta)",
                    lineHeight: 1,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {m.delta}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section
        style={{
          padding: "clamp(40px, 10vw, 56px) 0",
          borderTop: "1px solid rgba(26,26,26,0.10)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 clamp(16px, 5vw, 24px)" }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "var(--oxblood)",
              marginBottom: 14,
            }}
          >
            â€” The problem
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(26px, 3.6vw, 36px)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              marginBottom: 20,
              lineHeight: 1.15,
            }}
          >
            What was{" "}
            <em style={{ fontStyle: "italic", color: "var(--oxblood)" }}>actually broken.</em>
          </h2>
          <div style={{ color: "var(--ink-2)", fontSize: 16, lineHeight: 1.75 }}>
            {c.problemStatement.map((p, i) => (
              <p key={i} style={{ marginBottom: 14 }}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE BUILT */}
      <section
        style={{
          padding: "clamp(40px, 10vw, 56px) 0",
          background: "var(--cream-3)",
          borderTop: "1px solid rgba(26,26,26,0.10)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 clamp(16px, 5vw, 24px)" }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "var(--terracotta)",
              marginBottom: 14,
            }}
          >
            â€” What we built
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(26px, 3.6vw, 36px)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              marginBottom: 24,
              lineHeight: 1.15,
            }}
          >
            The{" "}
            <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>solution stack.</em>
          </h2>

          <div style={{ marginBottom: 28 }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "var(--ink-faint)",
                marginBottom: 10,
              }}
            >
              â€” Tools
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {c.solutionStack.map((tool) => (
                <span
                  key={tool}
                  style={{
                    padding: "7px 14px",
                    background: "var(--cream-2)",
                    border: "1px solid rgba(26,26,26,0.14)",
                    color: "var(--ink)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    letterSpacing: "0.02em",
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "var(--ink-faint)",
              marginBottom: 10,
            }}
          >
            â€” Implementation ({c.implementationPeriod})
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {c.implementationBreakdown.map((b, i) => (
              <li
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "20px 1fr",
                  gap: 12,
                  padding: "12px 0",
                  borderBottom: "1px solid rgba(26,26,26,0.06)",
                  fontSize: 15,
                  color: "var(--ink-2)",
                  lineHeight: 1.6,
                }}
              >
                <span style={{ color: "var(--terracotta)", fontWeight: 700 }}>â†’</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* RESULTS */}
      <section
        style={{
          padding: "clamp(40px, 10vw, 56px) 0",
          borderTop: "1px solid rgba(26,26,26,0.10)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 clamp(16px, 5vw, 24px)" }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "var(--sage)",
              marginBottom: 14,
            }}
          >
            â€” Results
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(26px, 3.6vw, 36px)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              marginBottom: 20,
              lineHeight: 1.15,
            }}
          >
            What{" "}
            <em style={{ fontStyle: "italic", color: "var(--sage)" }}>changed.</em>
          </h2>
          <div style={{ color: "var(--ink-2)", fontSize: 16, lineHeight: 1.75 }}>
            {c.longFormStory.map((p, i) => (
              <p key={i} style={{ marginBottom: 14 }}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section style={{ padding: "clamp(20px, 6vw, 32px) 0 clamp(40px, 10vw, 56px)", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 clamp(16px, 5vw, 24px)" }}>
          <blockquote
            className="cs-pull-quote"
            style={{
              background: "var(--cream-2)",
              border: "1px solid rgba(26,26,26,0.12)",
              padding: "clamp(24px, 6vw, 32px) clamp(20px, 5vw, 36px)",
              margin: 0,
              transform: "rotate(-0.3deg)",
            }}
          >
            <style>{`
              @media (max-width: 640px) {
                .cs-pull-quote { transform: none !important; }
              }
            `}</style>
            <Quote
              style={{
                width: 18,
                height: 18,
                color: "var(--terracotta)",
                marginBottom: 12,
              }}
            />
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: 22,
                fontWeight: 400,
                color: "var(--ink)",
                lineHeight: 1.45,
                marginBottom: 16,
                letterSpacing: "-0.005em",
              }}
            >
              &ldquo;{c.testimonialQuote}&rdquo;
            </p>
            <footer
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--ink-faint)",
              }}
            >
              â€” {c.testimonialAuthor}
            </footer>
          </blockquote>
        </div>
      </section>

      {/* TOOLS / RELATED SERVICES */}
      {c.relatedServices.length > 0 && (
        <section
          style={{
            padding: "clamp(40px, 10vw, 56px) 0",
            background: "var(--cream-3)",
            borderTop: "1px solid rgba(26,26,26,0.10)",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 clamp(16px, 5vw, 24px)" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(24px, 3.2vw, 32px)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                color: "var(--ink)",
                marginBottom: 18,
              }}
            >
              Tools &amp; services used
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
              {c.relatedServices.map((s, i) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  style={{
                    background: "var(--cream-2)",
                    border: "1px solid rgba(26,26,26,0.10)",
                    padding: "16px 18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    textDecoration: "none",
                    transform: i % 2 === 0 ? "rotate(-0.2deg)" : "rotate(0.2deg)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 16,
                      fontWeight: 600,
                      color: "var(--ink)",
                    }}
                  >
                    {s.label}
                  </span>
                  <ArrowRight style={{ width: 14, height: 14, color: "var(--terracotta)" }} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section
        style={{
          padding: "clamp(56px, 14vw, 88px) 0",
          background: "var(--terracotta)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 clamp(16px, 5vw, 24px)", textAlign: "center" }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "var(--cream-3)",
              opacity: 0.85,
              marginBottom: 18,
            }}
          >
            â€” Same builder Â· same playbook
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4.4vw, 44px)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "var(--cream-3)",
              marginBottom: 16,
            }}
          >
            Want a result{" "}
            <em
              style={{
                fontStyle: "italic",
                textDecoration: "underline",
                textDecorationThickness: "1px",
                textUnderlineOffset: "8px",
              }}
            >
              like this?
            </em>
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "rgba(250, 247, 240, 0.92)",
              maxWidth: "44ch",
              margin: "0 auto 28px",
              lineHeight: 1.6,
            }}
          >
            Send the brief. Fixed-price scope back in 48 hours. No retainer
            hostage situation.
          </p>
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
            Apply for a discovery call
            <ArrowRight style={{ width: 16, height: 16 }} />
          </Link>
        </div>
      </section>
    </>
  );
}
