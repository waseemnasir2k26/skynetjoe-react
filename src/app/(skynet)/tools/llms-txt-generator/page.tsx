import type { Metadata } from "next";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import Generator from "./Generator";
import { FileCode2, Timer, ShieldCheck, FileText } from "lucide-react";

const PATH = "/tools/llms-txt-generator";

const breadcrumbListSchema = breadcrumbSchema([
  { name: "Home", url: SITE.url },
  { name: "Tools", url: `${SITE.url}/tools` },
  { name: "llms.txt Generator", url: `${SITE.url}${PATH}` },
]);

export const metadata: Metadata = {
  title: "Free llms.txt Generator — Spec-Valid llmstxt.org File in Minutes",
  description:
    "Generate a valid llms.txt file from your site name, summary, sections, and docs URLs. Free, spec-compliant, copy or download. Enter your email to unlock the download.",
  alternates: { canonical: `${SITE.url}${PATH}` },
  openGraph: {
    title: "llms.txt Generator — build a spec-valid llms.txt in minutes",
    description:
      "Fill in your site basics and doc links, get a clean llms.txt an AI crawler can actually parse. Free tool, llmstxt.org spec.",
    url: `${SITE.url}${PATH}`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "llms.txt Generator — free spec-valid builder",
    description:
      "Site name, summary, sections, docs URLs in — valid llms.txt out.",
  },
};

const faqs = [
  {
    q: "What is llms.txt?",
    a: "A markdown file at your domain root (yourdomain.com/llms.txt) that gives AI crawlers a concise, structured summary of what your site is and where the important pages live — similar in spirit to robots.txt or sitemap.xml, but written for language models rather than search-engine crawlers. The spec is defined at llmstxt.org.",
  },
  {
    q: "Does this generator follow the official spec?",
    a: "Yes — H1 site name, an optional blockquote summary, an optional context paragraph, then H2 sections with markdown link lists. That's the full llmstxt.org structure. This tool won't let you generate an invalid file: it requires a site name, a summary, and at least one section with a real link before output appears.",
  },
  {
    q: "Where do I put the generated file?",
    a: "Download it and upload it to your domain root as /llms.txt (e.g. https://yourdomain.com/llms.txt). It needs to be publicly accessible, not behind auth.",
  },
  {
    q: "Why do I need to enter my email to download?",
    a: "The copy and preview are free to use while you build it. I gate the download so I know who's generating one — mainly so I can follow up if you want help wiring the rest of your AEO setup.",
  },
  {
    q: "Do you actually use this on your own site?",
    a: "Yes — skynetjoe.com's own llms.txt was built with this generator, not hand-written. You can see it live at skynetjoe.com/llms.txt.",
  },
];

const heroStats = [
  {
    icon: Timer,
    label: "2 minutes",
    body: "Fill in the form, get valid output.",
  },
  {
    icon: ShieldCheck,
    label: "Email to download",
    body: "Preview builds live. Email unlocks the file.",
  },
  {
    icon: FileText,
    label: "Spec-compliant",
    body: "Matches the llmstxt.org format exactly.",
  },
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "llms.txt Generator",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  url: `${SITE.url}${PATH}`,
  description:
    "Free tool that generates a spec-compliant llms.txt file from a site name, summary, context, and doc sections, per the llmstxt.org specification.",
  offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
  dateModified: "2026-08-19",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function LlmsTxtGeneratorPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={breadcrumbListSchema} />
      <JsonLd data={faqSchema} />

      {/* HERO */}
      <section
        style={{
          position: "relative",
          padding: "96px 0 48px",
          background: "var(--cream-3)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="container-x px-6 relative z-10">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{
                background: "rgba(198,107,63,0.10)",
                border: "1px solid rgba(198,107,63,0.40)",
                color: "var(--terracotta-aa)",
              }}
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span className="text-xs font-medium tracking-wider uppercase">
                Free generator · Email to download
              </span>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(42px, 6.5vw, 72px)",
                fontWeight: 500,
                letterSpacing: "-0.025em",
                lineHeight: 1.04,
                color: "var(--ink)",
                marginBottom: 22,
              }}
            >
              Generate a real{" "}
              <span
                style={{
                  background:
                    "linear-gradient(120deg, var(--terracotta) 0%, var(--ink) 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  WebkitTextFillColor: "transparent",
                }}
              >
                llms.txt.
              </span>
            </h1>

            <p
              style={{
                fontSize: 18,
                color: "var(--ink-2)",
                lineHeight: 1.6,
                marginBottom: 14,
                maxWidth: "52ch",
              }}
            >
              llms.txt tells AI crawlers what your site actually is —
              structured, concise, and spec-compliant. Fill in the form below
              and get a file that follows the llmstxt.org format exactly, no
              guesswork.
            </p>
            <p
              style={{
                fontSize: 15,
                color: "var(--ink-2)",
                lineHeight: 1.6,
                maxWidth: "52ch",
              }}
            >
              Site name and summary, an optional context paragraph, and as many
              sections and doc links as you need. Preview builds as you type.
              Enter your email to copy or download the final file.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
              {heroStats.map(({ icon: Icon, label, body }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] px-4 py-3"
                >
                  <div className="flex items-center gap-2 text-[var(--ink)]">
                    <Icon className="w-4 h-4 text-[var(--terracotta-aa)]" />
                    <span className="text-sm font-semibold">{label}</span>
                  </div>
                  <p className="mt-1 text-xs text-[var(--ink-faint)] leading-relaxed">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GENERATOR */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-3xl mx-auto">
            <Generator />
          </div>
        </div>
      </section>

      {/* WHY THIS EXISTS */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-8 md:p-12 backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3">
                Why this generator exists
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6 text-[var(--ink)]">
                A one-page spec is still easy to get wrong by hand.
              </h2>
              <div className="space-y-5 text-[var(--ink-2)] leading-relaxed text-base md:text-lg">
                <p>
                  llms.txt looks simple — a title, a summary, some sections of
                  links. In practice most hand-written versions I&apos;ve
                  audited skip the blockquote summary, mix up heading levels, or
                  bury the real docs under vague section names. Small mistakes,
                  but they&apos;re the difference between a file a crawler
                  parses cleanly and one it skips.
                </p>
                <p>
                  This generator enforces the structure for you — H1 name,
                  blockquote summary, H2 sections with markdown link lists — so
                  what comes out the other end matches the llmstxt.org spec
                  exactly, every time.
                </p>
              </div>
              <p className="mt-6 text-sm text-[var(--ink-faint)]">
                Waseem, building from Bali · info@skynetjoe.com
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/tools/aeo-audit"
                  className="text-sm font-semibold text-[var(--terracotta-aa)] hover:underline"
                >
                  → Run the AEO audit
                </a>
                <a
                  href="/tools/schema-markup-generator"
                  className="text-sm font-semibold text-[var(--terracotta-aa)] hover:underline"
                >
                  → Build your schema markup
                </a>
                <a
                  href="/tools/chatgpt-visibility-grader"
                  className="text-sm font-semibold text-[var(--terracotta-aa)] hover:underline"
                >
                  → Check your ChatGPT visibility
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3 text-center">
              Quick answers
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-center text-[var(--ink)]">
              Honest FAQ
            </h2>
            <div className="space-y-3">
              {faqs.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-2xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] px-5 py-4 transition open:bg-[var(--cream-2)]"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-[var(--ink)] font-semibold list-none">
                    <span>{f.q}</span>
                    <span className="text-[var(--terracotta-aa)] transition group-open:rotate-45 text-xl leading-none">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm md:text-base text-[var(--ink-2)] leading-relaxed">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
