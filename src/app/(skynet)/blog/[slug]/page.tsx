import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { POSTS, getPost } from "@/lib/posts";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import { person, personRef, organization } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Reveal } from "@/components/motion/Reveal";

export const dynamicParams = false;

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found" };
  // The n8n-vs-zapier-2026 blog post duplicates the dedicated comparison hub at
  // /n8n-vs-zapier. Canonical it to the hub to avoid keyword cannibalization;
  // all other posts self-canonical to their /blog/ URL.
  const canonical =
    post.slug === "n8n-vs-zapier-2026"
      ? `${SITE.url}/n8n-vs-zapier`
      : `${SITE.url}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE.url}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [SITE.founder],
      tags: post.tags,
      images: [...DEFAULT_OG_IMAGES],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: "@skynetlabs",
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const htmlPath = path.join(
    process.cwd(),
    "content",
    "blog",
    "posts",
    `${post.slug}.html`,
  );
  let html: string;
  try {
    html = fs.readFileSync(htmlPath, "utf8");
  } catch {
    notFound();
  }

  const idx = POSTS.findIndex((p) => p.slug === post.slug);
  const prev = idx > 0 ? POSTS[idx - 1] : null;
  const next = idx < POSTS.length - 1 ? POSTS[idx + 1] : null;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        url: `${SITE.url}/blog/${post.slug}`,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt || post.publishedAt,
        // image added (rich-result eligibility) + canonical author/publisher
        // refs instead of bare inline copies (M15).
        image: post.coverImage
          ? `${SITE.assetsUrl}${post.coverImage}`
          : `${SITE.url}/og-default.png`,
        author: personRef,
        publisher: { "@id": `${SITE.url}/#organization` },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${SITE.url}/blog/${post.slug}`,
        },
        keywords: post.tags.join(", "),
      },
      person,
      organization,
    ],
  };

  return (
    <>
      <JsonLd data={schema} />

      {/* Cream editorial hero — flat cream-3 paper, 1px ink border, terracotta accents */}
      <section
        className="relative pt-24 md:pt-28 pb-12"
        style={{
          background: "var(--cream-3)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="container-x px-6 relative">
          <Breadcrumbs
            bare
            items={[
              { label: "Home", href: "/" },
              { label: "Journal", href: "/blog" },
              { label: post.title },
            ]}
          />
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm mb-6"
            style={{ color: "var(--terracotta-aa)" }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to journal
          </Link>

          <Reveal className="max-w-3xl">
            <div
              className="flex flex-wrap items-center gap-3 mb-5 text-xs"
              style={{ color: "var(--ink-2)" }}
            >
              <span
                className="px-3 py-1 uppercase tracking-wider font-semibold"
                style={{
                  background: "rgba(198, 107, 63, 0.10)",
                  border: "1px solid rgba(198, 107, 63, 0.30)",
                  color: "var(--terracotta-aa)",
                  borderRadius: 2,
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.14em",
                }}
              >
                {post.category}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime} min read
              </span>
            </div>

            <h1
              className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mb-5"
              style={{
                color: "var(--ink)",
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              {post.title}
            </h1>
            <p
              className="text-lg md:text-xl leading-relaxed"
              style={{ color: "var(--ink-2)" }}
            >
              {post.description}
            </p>
          </Reveal>
        </div>
      </section>

      <article className="section">
        <div className="container-x px-6">
          <Reveal className={`prose-wn wn-${post.slug} max-w-3xl mx-auto`}>
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </Reveal>
        </div>
      </article>

      <section className="section">
        <div className="container-x px-6 max-w-3xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-4">
            {prev && (
              <Link
                href={`/blog/${prev.slug}`}
                className="p-5 transition group"
                style={{
                  background: "var(--cream-3)",
                  border: "1px solid var(--border)",
                  borderRadius: 2,
                }}
              >
                <div
                  className="text-xs uppercase tracking-wider mb-2 inline-flex items-center gap-1.5"
                  style={{
                    color: "var(--terracotta-aa)",
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.14em",
                  }}
                >
                  <ArrowLeft className="w-3 h-3" /> Previous
                </div>
                <div className="font-semibold" style={{ color: "var(--ink)" }}>
                  {prev.title}
                </div>
              </Link>
            )}
            {next && (
              <Link
                href={`/blog/${next.slug}`}
                className={`p-5 transition group ${!prev ? "sm:col-start-2" : ""}`}
                style={{
                  background: "var(--cream-3)",
                  border: "1px solid var(--border)",
                  borderRadius: 2,
                }}
              >
                <div
                  className="text-xs uppercase tracking-wider mb-2 inline-flex items-center gap-1.5 justify-end w-full"
                  style={{
                    color: "var(--terracotta-aa)",
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.14em",
                  }}
                >
                  Next <ArrowRight className="w-3 h-3" />
                </div>
                <div
                  className="font-semibold sm:text-right"
                  style={{ color: "var(--ink)" }}
                >
                  {next.title}
                </div>
              </Link>
            )}
          </div>

          <Reveal
            className="mt-10 p-8 text-center"
            style={{
              background: "var(--cream-3)",
              border: "1px solid var(--border)",
              borderRadius: 2,
            }}
          >
            <h2
              className="text-2xl md:text-3xl font-extrabold mb-3"
              style={{
                color: "var(--ink)",
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              Want this kind of result for your business?
            </h2>
            <p className="mb-6" style={{ color: "var(--ink-2)" }}>
              Send a brief. Yes/no in 8 hours. No funnel.
            </p>
            <Link
              href="/discovery-call"
              className="inline-flex items-center gap-2 px-6 py-3 font-semibold transition"
              style={{
                background: "var(--terracotta)",
                color: "var(--cream-3)",
                borderRadius: 2,
                fontFamily: "var(--font-sans)",
              }}
            >
              Apply for a discovery call
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
