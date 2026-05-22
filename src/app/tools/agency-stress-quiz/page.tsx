import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Quiz from "./Quiz";
import { QUIZ, BUCKETS } from "@/data/quiz-questions";
import { Sparkles, Timer, ShieldCheck, Flame } from "lucide-react";

const PATH = "/tools/agency-stress-quiz";

export const metadata: Metadata = {
  title:
    "Agency Stress Quiz — 60s diagnostic for service-business owners · SkynetLabs",
  description:
    "60 seconds. 7 questions. One honest score on how chaotic your agency really is. Built by SkynetLabs for service founders who want the brutal truth.",
  alternates: { canonical: `${SITE.url}${PATH}` },
  openGraph: {
    title: "Agency Stress Quiz · find your chaos score in 60 seconds",
    description:
      "7 questions, one honest score (0 to 70). Tells you exactly where your service business is leaking leads, cash, and sleep.",
    url: `${SITE.url}${PATH}`,
    type: "website",
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
    a: "Accurate enough to tell you which of four buckets you're in: clean, manageable, leaking, or chaos. It's not a financial audit. It's a 60-second pattern match against the 200+ service businesses I've worked inside.",
  },
  {
    q: "What if my score is 70?",
    a: "Then you're in the bucket I like building for. Bleeding businesses fix faster than chill ones because the leak is easier to find. Book a 30-min audit and we'll map the first three fixes before the call ends.",
  },
];

const heroStats = [
  { icon: Timer, label: "60 seconds", body: "7 questions, one tap each." },
  { icon: ShieldCheck, label: "Anonymous", body: "Nothing leaves your browser." },
  { icon: Flame, label: "Brutally honest", body: "Score from 0 (chill) to 70 (chaos)." },
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
    "Free 60-second diagnostic that scores service-business operational stress from 0 to 70 and routes the result into a revenue-leak calculator.",
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

      {/* HERO */}
      <section
        className="relative overflow-hidden pt-24 md:pt-32 pb-12"
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
            background: "#ef4444",
            top: 80,
            right: -160,
            opacity: 0.32,
            animationDelay: "-7s",
          }}
        />

        <div className="container-x px-6 relative z-10">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{
                background: "rgba(239, 68, 68, 0.14)",
                border: "1px solid rgba(239, 68, 68, 0.40)",
                color: "#fda4af",
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-xs font-medium tracking-wider uppercase">
                Free diagnostic · No email gate
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.04] tracking-tight mb-6 text-white">
              60 seconds.{" "}
              <span
                style={{
                  background:
                    "linear-gradient(120deg, #fda4af 0%, #fde68a 50%, #7ee4ff 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  WebkitTextFillColor: "transparent",
                }}
              >
                7 questions.
              </span>{" "}
              One brutally honest score.
            </h1>

            <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-4 max-w-2xl">
              I&apos;ve sat inside 200+ service businesses. The same five
              patterns blow up every founder I talk to. This quiz scores you
              against those patterns and tells you where to fix first.
            </p>
            <p className="text-base text-gray-300 leading-relaxed max-w-2xl">
              No email gate. No drip sequence. No data leaves your browser. Just
              a number from 0 to 70 and three priorities.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
              {heroStats.map(({ icon: Icon, label, body }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <div className="flex items-center gap-2 text-white">
                    <Icon className="w-4 h-4 text-cyan-300" />
                    <span className="text-sm font-semibold">{label}</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-400 leading-relaxed">
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
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3 text-center">
              The four buckets
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-10 text-center text-white">
              Where do you land?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {BUCKETS.map((b) => (
                <div
                  key={b.key}
                  className="rounded-2xl border bg-white/5 p-5"
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
                  <h3 className="text-white text-lg font-extrabold mb-1">
                    {b.label}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
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
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12 backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3">
                Why this quiz exists
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6 text-white">
                The same five patterns. Over and over.
              </h2>
              <div className="space-y-5 text-gray-200 leading-relaxed text-base md:text-lg">
                <p>
                  Every cold-call I take starts the same way. Founder pulls up
                  their numbers and says revenue is fine. Then I ask about
                  response time, after-hours, manual hours, and tool sprawl.
                  Five minutes in we&apos;ve usually found a five-figure leak
                  they didn&apos;t know existed.
                </p>
                <p>
                  This quiz is that same diagnostic, just compressed. The
                  questions are the ones I actually ask. The buckets are the
                  same four I sort callers into. If you land in &quot;bleeding
                  cash and sleep&quot; you&apos;re in good company. That&apos;s
                  the bucket I rebuild from most, because the leak is obvious
                  once you stop running on adrenaline long enough to see it.
                </p>
              </div>
              <p className="mt-6 text-sm text-gray-500">
                Waseem, building from Bali · waseem@skynetjoe.com
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3 text-center">
              Quick answers
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-center text-white">
              Honest FAQ
            </h2>
            <div className="space-y-3">
              {faqs.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition open:bg-white/8"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-white font-semibold list-none">
                    <span>{f.q}</span>
                    <span className="text-cyan-300 transition group-open:rotate-45 text-xl leading-none">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm md:text-base text-gray-300 leading-relaxed">
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
