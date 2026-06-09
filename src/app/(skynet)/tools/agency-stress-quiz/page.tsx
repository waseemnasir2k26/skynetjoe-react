import type { Metadata } from "next";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Quiz from "./Quiz";
import { QUIZ, BUCKETS } from "@/data/quiz-questions";
import { Sparkles, Timer, ShieldCheck, Flame } from "lucide-react";

const PATH = "/tools/agency-stress-quiz";

export const metadata: Metadata = {
  title: "Agency Stress Quiz — 60s diagnostic for service-business owners",
  description:
    "60 seconds. 7 questions. One honest score on how chaotic your agency really is. Built by SkynetLabs for service founders who want the brutal truth.",
  alternates: { canonical: `${SITE.url}${PATH}` },
  openGraph: {
    title: "Agency Stress Quiz · find your chaos score in 60 seconds",
    description:
      "7 questions, one honest score (0 to 70). Tells you exactly where your service business is losing leads, cash, and sleep.",
    url: `${SITE.url}${PATH}`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agency Stress Quiz · your honest chaos score in 60s",
    description:
      "7 questions. 1 brutally honest score. Free diagnostic for service founders.",
  },
};

const faqs = [
  {
    q: "Is this anonymous?",
    a: "Yes. Nothing leaves your browser. We don't ask for an email, name, or company. Your answers live in localStorage and your score lives in the URL so you can share it if you want.",
  },
  {
    q: "What do you do with my answers?",
    a: "Nothing. There's no server call, no analytics event tied to your answers, no follow-up sequence. The whole thing runs client-side. If you click through to the calculator we pre-fill it with your numbers, that's it.",
  },
  {
    q: "How accurate is the score?",
    a: "Accurate enough to tell you which of four buckets you're in: clean, manageable, strained, or chaos. It's not a financial audit. It's a 60-second pattern match against the service-business funnels I've built and audited.",
  },
  {
    q: "What if my score is 70?",
    a: "Then you're in the bucket I like building for. Strained businesses fix faster than chill ones because the problem is easier to find. Book a 30-min audit and we'll map the first three fixes before the call ends.",
  },
];

const heroStats = [
  { icon: Timer, label: "60 seconds", body: "7 questions, one tap each." },
  {
    icon: ShieldCheck,
    label: "Anonymous",
    body: "Nothing leaves your browser.",
  },
  {
    icon: Flame,
    label: "Brutally honest",
    body: "Score from 0 (chill) to 70 (chaos).",
  },
];

/** Quiz schema (https://schema.org/Quiz). Uses Question subtype for each step. */
const quizSchema = {
  "@context": "https://schema.org",
  "@type": "Quiz",
  name: "Agency Stress Quiz",
  about: {
    "@type": "Thing",
    name: "Service business operations stress diagnostic",
  },
  educationalAlignment: {
    "@type": "AlignmentObject",
    alignmentType: "assesses",
    targetName: "Agency operational stress level",
  },
  url: `${SITE.url}${PATH}`,
  inLanguage: "en",
  audience: {
    "@type": "Audience",
    audienceType: "Service business founders, agency owners, solo operators",
  },
  hasPart: QUIZ.map((q) => ({
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
  name: "Agency Stress Quiz",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${SITE.url}${PATH}`,
  description:
    "Free 60-second diagnostic that scores service-business operational stress from 0 to 70 and routes the result into a revenue-loss calculator.",
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

export default function StressQuizPage() {
  return (
    <>
      <JsonLd data={quizSchema} />
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />

      {/* HERO — cream paper */}
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
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "var(--terracotta-aa)",
                fontWeight: 600,
                marginBottom: 22,
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <Sparkles style={{ width: 12, height: 12 }} />
              Free diagnostic · no email gate
            </div>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(42px, 6.5vw, 72px)",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                lineHeight: 1.04,
                color: "var(--ink)",
                marginBottom: 22,
              }}
            >
              60 seconds.{" "}
              <span style={{ color: "var(--terracotta-aa)" }}>
                7 questions.
              </span>{" "}
              One brutally honest score.
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
              I&apos;ve built funnels for service businesses across 9 countries.
              The same five patterns blow up every founder I talk to. This quiz
              scores you against those patterns and tells you where to fix
              first.
            </p>
            <p
              style={{
                fontSize: 15,
                color: "var(--ink-2)",
                lineHeight: 1.6,
                maxWidth: "52ch",
              }}
            >
              No email gate. No drip sequence. No data leaves your browser. Just
              a number from 0 to 70 and three priorities.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
              {heroStats.map(({ icon: Icon, label, body }, i) => (
                <div
                  key={label}
                  style={{
                    padding: 16,
                    background: "var(--cream-2)",
                    border: "1px solid var(--border)",
                    transform:
                      i % 2 === 0 ? "rotate(-0.3deg)" : "rotate(0.3deg)",
                  }}
                >
                  <div
                    className="flex items-center gap-2"
                    style={{ color: "var(--ink)" }}
                  >
                    <Icon
                      className="w-4 h-4"
                      style={{ color: "var(--terracotta-aa)" }}
                    />
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        fontFamily: "var(--font-sans)",
                      }}
                    >
                      {label}
                    </span>
                  </div>
                  <p
                    style={{
                      marginTop: 6,
                      fontSize: 12,
                      color: "var(--ink-faint)",
                      lineHeight: 1.5,
                    }}
                  >
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

      {/* BUCKETS PREVIEW (calibrates expectations) */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3 text-center">
              The four buckets
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-10 text-center text-[var(--ink)]">
              Where do you land?
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

      {/* WASEEM VOICE — WHY THIS EXISTS */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-8 md:p-12 backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3">
                Why this quiz exists
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6 text-[var(--ink)]">
                The same five patterns. Over and over.
              </h2>
              <div className="space-y-5 text-[var(--ink-2)] leading-relaxed text-base md:text-lg">
                <p>
                  Every cold-call I take starts the same way. Founder pulls up
                  their numbers and says revenue is fine. Then I ask about
                  response time, after-hours, manual hours, and tool sprawl.
                  Five minutes in we&apos;ve usually found a five-figure hole
                  they didn&apos;t know existed.
                </p>
                <p>
                  This quiz is that same diagnostic, just compressed. The
                  questions are the ones I actually ask. The buckets are the
                  same four I sort callers into. If you land in &quot;bleeding
                  cash and sleep&quot; you&apos;re in good company. That&apos;s
                  the bucket I rebuild from most, because the problem is obvious
                  once you stop running on adrenaline long enough to see it.
                </p>
              </div>
              <p className="mt-6 text-sm text-[var(--ink-faint)]">
                Waseem, building from Bali · info@skynetjoe.com
              </p>
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
