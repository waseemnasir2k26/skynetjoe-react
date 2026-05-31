import type { Metadata } from "next";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Quiz from "./Quiz";
import {
  QUESTIONS,
  BUCKETS,
  DIMENSIONS,
  MAX_SCORE,
} from "@/data/ai-readiness-questions";
import { Sparkles, Timer, ShieldCheck, Compass } from "lucide-react";

const PATH = "/tools/ai-readiness-score";

export const metadata: Metadata = {
  title:
    "AI Readiness Score — 90-second diagnostic for service businesses · SkynetLabs",
  description:
    "Score your service business 0 to 100 on AI automation readiness in 90 seconds. 10 questions across foundation, process, demand and buy-in. Enter your email to unlock the full breakdown.",
  alternates: { canonical: `${SITE.url}${PATH}` },
  openGraph: {
    title: "AI Readiness Score · 90-second diagnostic for service businesses",
    description:
      "10 questions, one 0 to 100 score, four-axis breakdown of where you're strong and where you'll stall. Enter your email to unlock the result.",
    url: `${SITE.url}${PATH}`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Readiness Score · score your business 0 to 100 in 90 seconds",
    description:
      "10 questions across foundation, process, demand and buy-in. Free and brutally honest.",
  },
};

const faqs = [
  {
    q: "What does the score actually measure?",
    a: "Four things: your current automation foundation, how documented your processes are, how much real demand you're handling, and how ready you are to actually approve a build. Each is weighted differently because they fail differently. A 95 on Demand with a 10 on Buy-in still puts you in 'not ready yet' for a reason.",
  },
  {
    q: "What do you collect?",
    a: "Your quiz answers stay in your browser's localStorage and never leave it. To unlock your full score and roadmap you enter an email — that one email is sent to my CRM so I can follow up. No name, no company required. Your score lives in the URL only if you choose to share it.",
  },
  {
    q: "What if my score is below 30?",
    a: "Then you'd waste money on automation right now and I'd tell you so on the call. The result page gives you three foundation moves to make first. Do those, retake the quiz in 60 days, then we talk.",
  },
  {
    q: "Can I share my result?",
    a: "Yep. Click 'share your score' on the result page and you get a copyable URL with your score and bucket baked in. Sharing the URL does not share your individual answers.",
  },
];

const heroStats = [
  { icon: Timer, label: "90 seconds", body: "10 questions, one tap each." },
  {
    icon: ShieldCheck,
    label: "Email to unlock",
    body: "Answers stay local. Email unlocks your result.",
  },
  {
    icon: Compass,
    label: "Four-axis",
    body: "Foundation, Process, Demand, Buy-in.",
  },
];

const quizSchema = {
  "@context": "https://schema.org",
  "@type": "Quiz",
  name: "AI Readiness Score",
  about: {
    "@type": "Thing",
    name: "Service business AI automation readiness diagnostic",
  },
  educationalAlignment: {
    "@type": "AlignmentObject",
    alignmentType: "assesses",
    targetName: "AI automation readiness across foundation, process, demand and buy-in",
  },
  url: `${SITE.url}${PATH}`,
  inLanguage: "en",
  audience: {
    "@type": "Audience",
    audienceType: "Service business founders, agency owners, solo operators",
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
  name: "AI Readiness Score",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${SITE.url}${PATH}`,
  description: `Free 90-second diagnostic that scores service-business AI automation readiness from 0 to ${MAX_SCORE} across four dimensions and routes high-readiness operators to a strategy call.`,
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

export default function AIReadinessPage() {
  return (
    <>
      <JsonLd data={quizSchema} />
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />

      {/* HERO */}
      <section
        style={{ position: "relative", padding: "96px 0 48px", background: "var(--cream-3)", borderBottom: "1px solid var(--border)" }}
      >
        <div className="container-x px-6 relative z-10">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{
                background: "rgba(198,107,63,0.10)",
                border: "1px solid rgba(198,107,63,0.40)",
                color: "var(--terracotta)",
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-xs font-medium tracking-wider uppercase">
                Free diagnostic · Email to unlock
              </span>
            </div>

            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(42px, 6.5vw, 72px)", fontWeight: 500, letterSpacing: "-0.025em", lineHeight: 1.04, color: "var(--ink)", marginBottom: 22 }}>
              90 seconds.{" "}
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
                10 questions.
              </span>{" "}
              One AI readiness score.
            </h1>

            <p style={{ fontSize: 18, color: "var(--ink-2)", lineHeight: 1.6, marginBottom: 14, maxWidth: "52ch" }}>
              I&apos;ve scoped 240+ automation builds since 2019. Half of them
              I should have turned down because the business wasn&apos;t ready.
              This diagnostic catches that mismatch in 90 seconds, before
              anyone wastes a call.
            </p>
            <p style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.6, maxWidth: "52ch" }}>
              You get a 0 to 100 score, a four-axis breakdown of where
              you&apos;re strong and where you&apos;ll stall, and three moves
              tailored to whichever dimension scored lowest.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
              {heroStats.map(({ icon: Icon, label, body }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] px-4 py-3"
                >
                  <div className="flex items-center gap-2 text-[var(--ink)]">
                    <Icon className="w-4 h-4 text-[var(--terracotta)]" />
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

      {/* DIMENSIONS PREVIEW */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta)] font-semibold mb-3 text-center">
              The four axes
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-10 text-center text-[var(--ink)]">
              What we&apos;re actually measuring.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {DIMENSIONS.map((d) => (
                <div
                  key={d.key}
                  className="rounded-2xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-5"
                >
                  <div className="inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] mb-3 bg-[rgba(198,107,63,0.10)] text-[var(--terracotta)] border border-[rgba(198,107,63,0.30)]">
                    {d.questionCount} Qs · max {d.maxScore}
                  </div>
                  <h3 className="text-[var(--ink)] text-lg font-extrabold mb-1">
                    {d.label}
                  </h3>
                  <p className="text-sm text-[var(--ink-faint)] leading-relaxed">
                    {d.short}
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
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta)] font-semibold mb-3 text-center">
              The four outcomes
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-10 text-center text-[var(--ink)]">
              Where will you land?
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
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta)] font-semibold mb-3">
                Why this diagnostic exists
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6 text-[var(--ink)]">
                Most businesses fail at automation because they buy first and
                think second.
              </h2>
              <div className="space-y-5 text-[var(--ink-2)] leading-relaxed text-base md:text-lg">
                <p>
                  I&apos;ve killed more automation projects than I&apos;ve
                  shipped. Not because the tech failed, but because the
                  business wasn&apos;t ready. No documented workflow, no clean
                  data, no decision authority. We&apos;d build something
                  beautiful and it would sit idle.
                </p>
                <p>
                  So I made a 90-second check. Same four dimensions I scan in
                  the first 10 minutes of every discovery call: Foundation,
                  Process, Demand, Buy-in. Each weighted by what actually
                  matters when a build hits week 6 and reality shows up.
                </p>
                <p>
                  If you score under 30, I&apos;m telling you not to hire
                  anyone yet. If you score over 80, I&apos;m telling you to
                  book me this week. Both answers save us both money.
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
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta)] font-semibold mb-3 text-center">
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
                    <span className="text-[var(--terracotta)] transition group-open:rotate-45 text-xl leading-none">
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
