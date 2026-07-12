import type { Metadata } from "next";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Quiz from "./Quiz";
import {
  QUESTIONS,
  CATEGORIES,
  BUCKETS,
  MAX_SCORE,
} from "@/data/tools/aeo-audit";
import { SearchCheck, Timer, ShieldCheck, ListChecks } from "lucide-react";

const PATH = "/tools/aeo-audit";

export const metadata: Metadata = {
  title: "AEO Audit — Free AI Readiness Checker",
  description:
    "10-question AEO audit. Score your site 0-100 on schema, answer-ready content, crawlability and entity clarity — get a prioritized fix list.",
  alternates: { canonical: `${SITE.url}${PATH}` },
  openGraph: {
    title: "AEO Audit — Answer Engine Optimization Checker",
    description:
      "10 questions, one 0-100 AEO score, a prioritized fix list. Free and heuristic — see exactly what's blocking AI answer engines from reading and citing your site.",
    url: `${SITE.url}${PATH}`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "AEO Audit — Score your site's AI answer engine readiness",
    description:
      "Schema, content structure, crawlability, entity clarity, citations. Free heuristic checker.",
  },
};

const faqs = [
  {
    q: "Is this a live crawler or a self-reported checklist?",
    a: "Self-reported. It's a 10-question heuristic diagnostic you answer about your own site — not an automated scanner that fetches your URL. That keeps it instant and free, but the accuracy depends on how honestly you answer. If you're not sure about a question (e.g. whether JS-only rendering blocks crawlers), check page source before answering.",
  },
  {
    q: "What exactly is AEO?",
    a: "Answer Engine Optimization — making your site readable and citable by AI systems like ChatGPT, Perplexity, and Google AI Overviews, not just ranking in classic blue-link search. It overlaps with SEO but adds structured data, direct-answer formatting, and machine-readable entity signals as first-class requirements.",
  },
  {
    q: "What do you collect?",
    a: "Your answers stay in your browser's localStorage. To unlock the full score breakdown and fix list you enter an email — that goes to my CRM so I can follow up. No name or company required.",
  },
  {
    q: "What's a good score?",
    a: "80+ means answer engines can parse, trust, and cite your site with minimal friction. Under 30 means the fundamentals — schema, server rendering, llms.txt — aren't there yet, and that's where to start, not with advanced citation tactics.",
  },
];

const heroStats = [
  { icon: Timer, label: "2 minutes", body: "10 questions, one tap each." },
  {
    icon: ShieldCheck,
    label: "Email to unlock",
    body: "Answers stay local. Email unlocks the fix list.",
  },
  {
    icon: ListChecks,
    label: "5 categories",
    body: "Schema, content, crawlability, entity, citations.",
  },
];

const quizSchema = {
  "@context": "https://schema.org",
  "@type": "Quiz",
  name: "AEO Audit",
  about: { "@type": "Thing", name: "AI answer engine optimization readiness" },
  url: `${SITE.url}${PATH}`,
  inLanguage: "en",
  audience: {
    "@type": "Audience",
    audienceType:
      "Founders, marketers, and site owners evaluating AI search readiness",
  },
  hasPart: QUESTIONS.map((q) => ({
    "@type": "Question",
    position: q.step,
    name: q.prompt,
    suggestedAnswer: q.options.map((o) => ({
      "@type": "Answer",
      text: o.label,
    })),
  })),
  publisher: { "@id": `${SITE.url}/#organization` },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AEO Audit",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${SITE.url}${PATH}`,
  description: `Free heuristic diagnostic that scores AI answer engine readiness across ${QUESTIONS.length} questions (raw max ${MAX_SCORE}), normalized to a 0-100 score across 5 categories, and routes results to a prioritized fix list.`,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
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

export default function AeoAuditPage() {
  return (
    <>
      <JsonLd data={quizSchema} />
      <JsonLd data={softwareSchema} />
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
              <SearchCheck className="w-3.5 h-3.5" />
              <span className="text-xs font-medium tracking-wider uppercase">
                Free AEO diagnostic · Email to unlock
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
              Can AI answer engines{" "}
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
                actually read your site?
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
              I&apos;ve rebuilt schema, llms.txt, and content structure for
              sites across e-commerce, agencies, and local service businesses
              since AI search started replacing blue links. Most failures come
              down to the same five gaps. This checker finds yours in two
              minutes.
            </p>
            <p
              style={{
                fontSize: 15,
                color: "var(--ink-2)",
                lineHeight: 1.6,
                maxWidth: "52ch",
              }}
            >
              Answer 10 questions about your own site and get a 0-100 AEO score,
              a category-by-category breakdown, and a prioritized fix list —
              worst gap first.
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

      {/* QUIZ */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-3xl mx-auto">
            <Quiz />
          </div>
        </div>
      </section>

      {/* CATEGORIES PREVIEW */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3 text-center">
              What we&apos;re scoring
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-10 text-center text-[var(--ink)]">
              The five categories.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {CATEGORIES.map((c) => (
                <div
                  key={c.key}
                  className="rounded-2xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-5"
                >
                  <div className="inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] mb-3 bg-[rgba(198,107,63,0.10)] text-[var(--terracotta-aa)] border border-[rgba(198,107,63,0.30)]">
                    max {c.maxScore}
                  </div>
                  <h3 className="text-[var(--ink)] text-lg font-extrabold mb-1">
                    {c.label}
                  </h3>
                  <p className="text-sm text-[var(--ink-faint)] leading-relaxed">
                    {c.short}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BUCKETS PREVIEW */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3 text-center">
              Where you might land
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-10 text-center text-[var(--ink)]">
              Four outcomes.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {BUCKETS.map((b) => (
                <div
                  key={b.key}
                  className="rounded-2xl border bg-[var(--cream-2)] p-5"
                  style={{ borderColor: `${b.color}55` }}
                >
                  <div
                    className="inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] mb-3"
                    style={{ background: `${b.color}22`, color: b.color }}
                  >
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full"
                      style={{ background: b.color }}
                    />
                    {b.range[0]}–{b.range[1]}
                  </div>
                  <h3 className="text-[var(--ink)] text-lg font-extrabold mb-1">
                    {b.label}
                  </h3>
                  <p className="text-sm text-[var(--ink-faint)] leading-relaxed">
                    {b.headline}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY THIS EXISTS */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-8 md:p-12 backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3">
                Why this checker exists
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6 text-[var(--ink)]">
                Most sites optimize for a search engine that&apos;s already
                half-replaced.
              </h2>
              <div className="space-y-5 text-[var(--ink-2)] leading-relaxed text-base md:text-lg">
                <p>
                  Blue-link SEO still matters, but a growing share of discovery
                  now happens inside ChatGPT, Perplexity, and Google&apos;s AI
                  Overviews — and those systems read pages differently than a
                  classic crawler. They want structured data, direct answers,
                  and unambiguous entities. Most sites have none of that.
                </p>
                <p>
                  I built this checker from the same five categories I audit on
                  every AEO project: structured data, direct-answer content,
                  crawlability, entity clarity, and citation-worthiness. Each is
                  weighted by how often it&apos;s the actual reason a site gets
                  skipped.
                </p>
                <p>
                  If you score low, the fix list tells you exactly what to build
                  first — not a generic &quot;improve your SEO&quot; platitude.
                  If you score high, you&apos;re already ahead of most of the
                  market.
                </p>
              </div>
              <p className="mt-6 text-sm text-[var(--ink-faint)]">
                Waseem, building from Bali · info@skynetjoe.com
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/tools/llms-txt-generator"
                  className="text-sm font-semibold text-[var(--terracotta-aa)] hover:underline"
                >
                  → Generate your llms.txt
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
