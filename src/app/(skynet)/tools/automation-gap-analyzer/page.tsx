import type { Metadata } from "next";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Quiz from "./Quiz";
import { QUESTIONS, AXES } from "@/data/automation-gap-questions";
import { Sparkles, Timer, ShieldCheck, Target } from "lucide-react";

const PATH = "/tools/automation-gap-analyzer";

export const metadata: Metadata = {
  title:
    "Automation Gap Analyzer — find your biggest manual time-sink in 90 seconds",
  description:
    "Free 12-question diagnostic across lead capture, follow-up, reporting, team productivity. Get an automation gap % score plus the one axis to fix first.",
  alternates: { canonical: `${SITE.url}${PATH}` },
  openGraph: {
    title:
      "Automation Gap Analyzer — score your manual work 0 to 100 · SkynetLabs",
    description:
      "12 questions, 4 axes, one honest automation gap score. Find the biggest gap and the moves to close it.",
    url: `${SITE.url}${PATH}`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Automation Gap Analyzer · 90-second diagnostic",
    description:
      "Score your business 0 to 100 across lead capture, follow-up, reporting and team productivity.",
  },
};

const faqs = [
  {
    q: "What does the automation gap score measure?",
    a: "It scores how much of your repeatable work runs without a human pressing a button. 100 means lead intake, follow-up, reporting and hand-offs are wired end-to-end. 0 means everything is copy-paste, Slack threads and memory. The four-axis breakdown shows which axis is the biggest gap.",
  },
  {
    q: "What do you collect?",
    a: "Your answers stay in your browser's localStorage and never leave it. To unlock your full score and the axis breakdown you enter an email — that one email is sent to my CRM so I can follow up. No name, no company required. Your score lives in the URL only if you choose to share it.",
  },
  {
    q: "Why 4 axes specifically?",
    a: "Lead Capture, Follow-Up, Reporting and Team Productivity are the four places service businesses lose hours. Lead capture is the inbox-to-CRM gap. Follow-up is the 5-7 touch curve nobody runs. Reporting is the Monday-morning-CSV tax. Team productivity is the copy-paste-between-tools tax. Fix one axis and the others get easier.",
  },
  {
    q: "What happens after I get my score?",
    a: "Two paths. Either you book a 30-minute call where I look at the lowest-scoring axis and tell you exactly what to wire first, or you bounce to the revenue calculator with your implied manual hours prefilled to see the dollar number behind the gap. Both are free.",
  },
];

const heroStats = [
  { icon: Timer, label: "90 seconds", body: "12 questions, one tap each." },
  {
    icon: ShieldCheck,
    label: "Email to unlock",
    body: "Answers stay local. Email unlocks your result.",
  },
  {
    icon: Target,
    label: "Biggest gap",
    body: "Pinpoints the axis costing you most.",
  },
];

const quizSchema = {
  "@context": "https://schema.org",
  "@type": "Quiz",
  name: "Automation Gap Analyzer",
  about: {
    "@type": "Thing",
    name: "Service business automation gap diagnostic",
  },
  educationalAlignment: {
    "@type": "AlignmentObject",
    alignmentType: "assesses",
    targetName:
      "Automation maturity across lead capture, follow-up, reporting, and team productivity",
  },
  url: `${SITE.url}${PATH}`,
  inLanguage: "en",
  audience: {
    "@type": "Audience",
    audienceType: "Service business founders and agency operators",
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
  name: "Automation Gap Analyzer",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${SITE.url}${PATH}`,
  description:
    "Free 90-second diagnostic that scores service-business automation maturity 0 to 100 across four axes and routes results into a strategy call or the Revenue Recovery Calculator.",
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

export default function AutomationGapPage() {
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
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-xs font-medium tracking-wider uppercase">
                Free diagnostic · Email to unlock
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
              Where is your business{" "}
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
                actually manual?
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
              12 questions across the four axes that bleed hours in every
              service business: lead capture, follow-up, reporting, and team
              productivity. 90 seconds to score, one biggest gap to fix first.
            </p>
            <p
              style={{
                fontSize: 15,
                color: "var(--ink-2)",
                lineHeight: 1.6,
                maxWidth: "52ch",
              }}
            >
              You get a 0 to 100 automation gap %, a four-axis radar, and a
              tailored callout for the weakest axis. Then choose: book a call,
              run the revenue calculator on your implied manual hours, or share
              the result.
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

      {/* AXES PREVIEW */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3 text-center">
              The four axes
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-10 text-center text-[var(--ink)]">
              Where the hours actually go.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {AXES.map((a) => (
                <div
                  key={a.key}
                  className="rounded-2xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-5"
                >
                  <div className="inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] mb-3 bg-[rgba(198,107,63,0.10)] text-[var(--terracotta-aa)] border border-[rgba(198,107,63,0.30)]">
                    {a.questionCount} Qs · max {a.maxScore}
                  </div>
                  <h3 className="text-[var(--ink)] text-lg font-extrabold mb-1">
                    {a.label}
                  </h3>
                  <p className="text-sm text-[var(--ink-faint)] leading-relaxed">
                    {a.short}
                  </p>
                </div>
              ))}
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
