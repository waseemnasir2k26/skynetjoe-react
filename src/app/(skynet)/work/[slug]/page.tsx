import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { WORK_BUILDS, getBuild, getNarrative } from "@/lib/work-builds";
import { SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";

export const dynamicParams = false;

export function generateStaticParams() {
  return WORK_BUILDS.map((b) => ({ slug: b.slug }));
}

const CATEGORY_LABEL: Record<string, string> = {
  client: "Client build",
  flagship: "Flagship build",
  portal: "Portal / app",
  demo: "Spec demo",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const b = getBuild(slug);
  if (!b) return { title: "Build not found" };
  const n = getNarrative(slug);
  // No `| SkynetLabs` suffix here — the root layout's title.template
  // (`%s | ${SITE.brand}`) already appends it; a hardcoded suffix produced
  // "... | SkynetLabs | SkynetLabs" in the rendered <title>.
  const title = `${b.title} — ${b.niche} build`;
  const description = n?.seoDescription ?? b.outcome;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/work/${b.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE.url}/work/${b.slug}`,
      type: "article",
      images: [`${SITE.assetsUrl}/portfolio/${b.slug}.jpg`],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function WorkDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const b = getBuild(slug);
  if (!b) notFound();
  const n = getNarrative(slug);
  const catLabel = CATEGORY_LABEL[b.category] ?? "Build";
  const isDemo = b.category === "demo";

  const related = WORK_BUILDS.filter(
    (x) => x.category === b.category && x.slug !== b.slug,
  ).slice(0, 3);

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: b.title,
    headline: b.title,
    about: b.niche,
    description: n?.seoDescription ?? b.outcome,
    url: `${SITE.url}/work/${b.slug}`,
    image: `${SITE.assetsUrl}/portfolio/${b.slug}.jpg`,
    creator: { "@type": "Person", name: SITE.founder, url: SITE.founderUrl },
    isPartOf: { "@id": `${SITE.url}/portfolio` },
    keywords: [b.niche, catLabel, ...b.stack].join(", "),
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Portfolio",
        item: `${SITE.url}/portfolio`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: b.title,
        item: `${SITE.url}/work/${b.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={schema} />
      <JsonLd data={breadcrumb} />
      <section
        className="relative pt-24 md:pt-32 pb-20"
        style={{ background: "var(--cream-3)" }}
      >
        <div className="container-x px-6 max-w-4xl">
          {/* breadcrumb */}
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 mb-8"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6875rem",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "var(--terracotta-aa)",
              textDecoration: "none",
            }}
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All 47 builds
          </Link>

          {/* eyebrow */}
          <div
            className="flex flex-wrap items-center gap-3 mb-4"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6875rem",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
            }}
          >
            <span style={{ color: "var(--terracotta-aa)" }}>{catLabel}</span>
            <span style={{ color: "var(--ink-faint)" }}>·</span>
            <span style={{ color: "var(--ink-2)" }}>{b.niche}</span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
              color: "var(--ink)",
              fontSize: "clamp(32px, 5vw, 52px)",
              margin: "0 0 14px",
            }}
          >
            {b.title}
          </h1>

          <p
            style={{
              fontSize: "1.0625rem",
              color: "var(--ink-2)",
              lineHeight: 1.6,
              maxWidth: "62ch",
              margin: "0 0 24px",
            }}
          >
            {n?.intro ?? b.outcome}
          </p>

          <div className="flex flex-wrap gap-3 mb-12">
            <a
              href={b.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
              style={{
                background: "var(--terracotta)",
                color: "var(--cream-3)",
                padding: "13px 20px",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "0.875rem",
                borderRadius: 2,
                textDecoration: "none",
              }}
            >
              Visit live site <ArrowUpRight className="w-4 h-4" />
            </a>
            <Link
              href="/discovery-call"
              className="inline-flex items-center gap-2"
              style={{
                background: "transparent",
                color: "var(--ink)",
                border: "1px solid var(--ink)",
                padding: "13px 20px",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "0.875rem",
                borderRadius: 2,
                textDecoration: "none",
              }}
            >
              Want one like this? Book a free audit
            </Link>
          </div>

          {/* screenshot */}
          <div
            className="relative overflow-hidden mb-12"
            style={{
              border: "1px solid rgba(26,26,26,0.14)",
              borderRadius: 3,
              aspectRatio: "16 / 10",
              background: "rgba(26,26,26,0.05)",
            }}
          >
            <Image
              src={`/portfolio/${b.slug}.jpg`}
              alt={`${b.title} — live screenshot`}
              fill
              sizes="(min-width: 900px) 860px, 100vw"
              className="object-cover object-top"
              priority
            />
          </div>

          {isDemo && (
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6875rem",
                color: "var(--ink-faint)",
                marginBottom: 24,
              }}
            >
              Spec demo — a self-initiated build showing the craft for this
              niche. Real names/assets swap in on a live engagement.
            </p>
          )}

          {/* What it shows */}
          {(n?.showcase || n?.designNotes?.length) && (
            <div className="mb-12">
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 22,
                  color: "var(--ink)",
                  letterSpacing: "-0.015em",
                  margin: "0 0 12px",
                }}
              >
                What this build shows
              </h2>
              {n?.showcase && (
                <p
                  style={{
                    fontSize: "1rem",
                    color: "var(--ink-2)",
                    lineHeight: 1.65,
                    maxWidth: "64ch",
                    margin: "0 0 18px",
                  }}
                >
                  {n.showcase}
                </p>
              )}
              {n?.designNotes?.length ? (
                <ul
                  className="flex flex-col gap-2.5"
                  style={{ listStyle: "none", padding: 0, margin: 0 }}
                >
                  {n.designNotes.map((d, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check
                        className="w-4 h-4 flex-shrink-0"
                        style={{ color: "var(--terracotta)", marginTop: 3 }}
                      />
                      <span
                        style={{
                          fontSize: "0.9375rem",
                          color: "var(--ink-2)",
                          lineHeight: 1.55,
                        }}
                      >
                        {d}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          )}

          {/* stack + who for */}
          <div className="grid sm:grid-cols-2 gap-8 mb-14">
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.625rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.16em",
                  color: "var(--terracotta-aa)",
                  marginBottom: 10,
                }}
              >
                Built with
              </div>
              <div className="flex flex-wrap gap-1.5">
                {b.stack.map((s) => (
                  <span
                    key={s}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      padding: "4px 10px",
                      borderRadius: 9999,
                      background: "var(--cream-2)",
                      border: "1px solid rgba(26,26,26,0.12)",
                      color: "var(--ink-2)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            {n?.whoFor && (
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.625rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: "var(--terracotta-aa)",
                    marginBottom: 10,
                  }}
                >
                  Proof of craft for
                </div>
                <p
                  style={{
                    fontSize: "0.9375rem",
                    color: "var(--ink-2)",
                    lineHeight: 1.55,
                    margin: 0,
                  }}
                >
                  {n.whoFor}
                </p>
              </div>
            )}
          </div>

          {/* related */}
          {related.length > 0 && (
            <div
              style={{
                borderTop: "1px solid rgba(26,26,26,0.12)",
                paddingTop: 28,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.625rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.16em",
                  color: "var(--ink-faint)",
                  marginBottom: 16,
                }}
              >
                More {catLabel.toLowerCase()}s
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/work/${r.slug}`}
                    className="group block"
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      className="relative overflow-hidden mb-2 aspect-video"
                      style={{
                        border: "1px solid rgba(26,26,26,0.12)",
                        borderRadius: 2,
                      }}
                    >
                      <Image
                        src={`/portfolio/${r.slug}.jpg`}
                        alt={r.title}
                        fill
                        sizes="280px"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div
                      style={{
                        fontSize: "0.8125rem",
                        fontWeight: 600,
                        color: "var(--ink)",
                        lineHeight: 1.3,
                      }}
                    >
                      {r.title}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12">
            <Link
              href="/services"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "var(--terracotta-aa)",
                textDecoration: "none",
              }}
            >
              See what we build →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
