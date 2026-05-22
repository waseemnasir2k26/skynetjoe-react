import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { POSTS, getPost } from "@/lib/posts";
import { SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";

export const dynamicParams = false;

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: `${post.title} | SkynetLabs Journal`,
    description: post.description,
    alternates: { canonical: `${SITE.url}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE.url}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [SITE.founder],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: "@Skynetjoe1",
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const htmlPath = path.join(process.cwd(), "content", "blog", "posts", `${post.slug}.html`);
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
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: `${SITE.url}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: { "@type": "Person", name: SITE.founder, url: SITE.founderUrl },
    publisher: {
      "@type": "Organization",
      name: SITE.brand,
      url: SITE.url,
      logo: { "@type": "ImageObject", url: `${SITE.url}/og-default.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE.url}/blog/${post.slug}` },
    keywords: post.tags.join(", "),
  };

  return (
    <>
      <JsonLd data={schema} />

      <section
        className="relative overflow-hidden pt-24 md:pt-28 pb-12"
        style={{
          background:
            "linear-gradient(135deg, #061827 0%, #0a2d4a 45%, #073846 100%)",
        }}
      >
        <span className="orb" style={{ width: 540, height: 540, background: "#1E88E5", top: -90, left: -130, opacity: 0.5 }} />
        <span className="orb" style={{ width: 580, height: 580, background: "#00D4FF", top: 80, right: -160, opacity: 0.35, animationDelay: "-7s" }} />

        <div className="container-x px-6 relative z-10">
          <Link href="/blog" className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 text-sm mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to journal
          </Link>

          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-5 text-xs text-gray-400">
              <span className="px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-200 uppercase tracking-wider font-semibold">
                {post.category}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime} min read
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.1] mb-5">
              {post.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              {post.description}
            </p>
          </div>
        </div>
      </section>

      <article className="section">
        <div className="container-x px-6">
          <div className={`prose-wn wn-${post.slug} max-w-3xl mx-auto`} dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </article>

      <section className="section">
        <div className="container-x px-6 max-w-3xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-4">
            {prev && (
              <Link
                href={`/blog/${prev.slug}`}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/50 transition group"
              >
                <div className="text-xs uppercase tracking-wider text-cyan-300 mb-2 inline-flex items-center gap-1.5">
                  <ArrowLeft className="w-3 h-3" /> Previous
                </div>
                <div className="font-semibold text-white group-hover:text-cyan-200">{prev.title}</div>
              </Link>
            )}
            {next && (
              <Link
                href={`/blog/${next.slug}`}
                className={`p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/50 transition group ${!prev ? "sm:col-start-2" : ""}`}
              >
                <div className="text-xs uppercase tracking-wider text-cyan-300 mb-2 inline-flex items-center gap-1.5 justify-end w-full">
                  Next <ArrowRight className="w-3 h-3" />
                </div>
                <div className="font-semibold text-white group-hover:text-cyan-200 sm:text-right">{next.title}</div>
              </Link>
            )}
          </div>

          <div
            className="mt-10 rounded-3xl p-8 text-center"
            style={{ background: "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)" }}
          >
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
              Want this kind of result for your business?
            </h2>
            <p className="text-white/90 mb-6">
              Send a brief. Yes/no in 8 hours. No funnel.
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
