import type { Metadata } from "next";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Quiz from "./Quiz";
import {
  QUESTIONS,
  CATEGORIES,
  BUCKETS,
  MAX_SCORE,
} from "@/data/tools/chatgpt-visibility-grader";
import {
  MessageCircleQuestion,
  Timer,
  ShieldCheck,
  ListChecks,
} from "lucide-react";

const PATH = "/tools/chatgpt-visibility-grader";

export const metadata: Metadata = {
  title:
    "ChatGPT Visibility Grader — Is Your Brand Visible to AI? · SkynetLabs",
  description:
    "9-question heuristic grader for AI chat visibility. Score coverage, structured citations, identity consistency, and content authority. Enter your email to unlock the full roadmap.",
  alternates: { canonical: `${SITE.url}${PATH}` },
  openGraph: {
    title: "ChatGPT Visibility Grader — Is my brand in ChatGPT?",
    description:
      "9 questions, one 0-100 visibility score, a roadmap to close the gap. Free and heuristic — see what actually drives AI chat visibility.",
    url: `${SITE.url}${PATH}`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "ChatGPT Visibility Grader — score your brand's AI chat footprint",
    description:
      "Coverage, structured citations, identity, authority. Free heuristic grader.",
  },
};

const faqs = [
  {
    q: "Does this query ChatGPT to see if it knows my brand?",
    a: "No. There's no reliable, free way to query a live model's training data from a browser tool, and doing so would be a fabricated metric anyway. This grader scores the inputs that actually drive AI chat visibility over time — third-party coverage, structured data, identity consistency, and content authority — the same signals I audit on real AEO projects.",
  },
  {
    q: "Why don't I just ask ChatGPT myself if it knows my brand?",
    a: "You can, and it's a reasonable spot-check. But a single chat response is a snapshot of one model, one prompt, one moment — it doesn't tell you what to fix. This grader gives you the underlying levers instead.",
  },
  {
    q: "What do you collect?",
    a: "Your answers stay in your browser's localStorage. To unlock the full score and roadmap you enter an email — that goes to my CRM so I can follow up. No name or company required.",
  },
  {
    q: "How is this different from the AEO Audit?",
    a: "The AEO Audit scores whether AI crawlers can technically read and cite your site (schema, crawlability, content structure). This grader scores broader brand visibility signals — coverage, identity consistency, and authority — that shape whether a model would surface you at all, separate from any one page's technical readiness.",
  },
];

const heroStats = [
  { icon: Timer, label: "90 seconds", body: "9 questions, one tap each." },
  {
    icon: ShieldCheck,
    label: "Email to unlock",
    body: "Answers stay local. Email unlocks the roadmap.",
  },
  {
    icon: ListChecks,
    label: "4 categories",
    body: "Coverage, structure, identity, authority.",
  },
];

const quizSchema = {
  "@context": "https://schema.org",
  "@type": "Quiz",
  name: "ChatGPT Visibility Grader",
  about: {
    "@type": "Thing",
    name: "Brand visibility to AI chat and answer engines",
  },
  url: `${SITE.url}${PATH}`,
  inLanguage: "en",
  audience: {
    "@type": "Audience",
    audienceType: "Founders and marketers evaluating AI chat visibility",
  },
  hasPart: QUESTIONS.map((q) => ({
    "@type": "Question",
    position: q.step,
    name: q.prompt,
    acceptedAnswer: q.options.map((o) => ({
      "@type": "Answer",
      text: o.label,
    })),
  })),
  publisher: { "@id": `${SITE.url}/#organization` },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ChatGPT Visibility Grader",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${SITE.url}${PATH}`,
  description: `Free heuristic diagnostic that scores AI chat visibility inputs across ${QUESTIONS.length} questions (raw max ${MAX_SCORE}), normalized to a 0-100 score across 4 categories, with a prioritized roadmap.`,
  offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
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

export default function ChatgptVisibilityPage() {
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
              <MessageCircleQuestion className="w-3.5 h-3.5" />
              <span className="text-xs font-medium tracking-wider uppercase">
                Free visibility grader · Email to unlock
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
              Is your brand{" "}
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
                visible to ChatGPT?
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
              You can&apos;t query a model&apos;s training data directly — but
              you can score the exact inputs that drive AI chat visibility:
              coverage, structure, identity, and authority. This grader scores
              those four in 90 seconds.
            </p>
            <p
              style={{
                fontSize: 15,
                color: "var(--ink-2)",
                lineHeight: 1.6,
                maxWidth: "52ch",
              }}
            >
              Answer 9 questions and get a 0-100 visibility score, a
              category-by-category breakdown, and a roadmap ordered by weakest
              signal first.
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
              The four categories.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                Why this grader exists
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6 text-[var(--ink)]">
                &quot;Is my brand in ChatGPT&quot; isn&apos;t a yes/no question.
              </h2>
              <div className="space-y-5 text-[var(--ink-2)] leading-relaxed text-base md:text-lg">
                <p>
                  There&apos;s no dashboard that tells you your training-data
                  presence, and any tool claiming to give you a live
                  &quot;ChatGPT score&quot; is guessing. What actually moves the
                  needle over time is measurable: third-party coverage,
                  structured citations, a consistent identity, and content worth
                  referencing.
                </p>
                <p>
                  I built this grader from the same four levers I work through
                  on real AEO engagements. Each is weighted by how often
                  it&apos;s the actual reason a brand stays invisible — not by
                  guesswork.
                </p>
                <p>
                  If you score low, the roadmap tells you exactly what to fix
                  first. If you score high, you&apos;re ahead of most
                  competitors in your category.
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
