import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Quiz from "./Quiz";
import { QUESTIONS, AXES } from "@/data/automation-gap-questions";
import { Sparkles, Timer, ShieldCheck, Target } from "lucide-react";

const PATH = "/tools/automation-gap-analyzer";

export const metadata: Metadata = {
  title:
    "Automation Gap Analyzer — find your biggest manual leak in 90 seconds · SkynetLabs",
  description:
    "Free 12-question diagnostic across lead capture, follow-up, reporting, team productivity. Get an automation gap % score plus the one axis to fix first.",
  alternates: { canonical: `${SITE.url}${PATH}` },
  openGraph: {
    title:
      "Automation Gap Analyzer — score your manual leaks 0 to 100 · SkynetLabs",
    description:
      "12 questions, 4 axes, one honest automation gap score. Find the biggest leak and the moves to plug it.",
    url: `${SITE.url}${PATH}`,
    type: "website",
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
    a: "It scores how much of your repeatable work runs without a human pressing a button. 100 means lead intake, follow-up, reporting and hand-offs are wired end-to-end. 0 means everything is copy-paste, Slack threads and memory. The four-axis breakdown shows which axis is the biggest leak.",
  },
  {
    q: "Is this anonymous?",
    a: "Yes. Nothing leaves your browser. No email, no name, no company. Answers live in localStorage. Your score lives in the URL only if you choose to share it.",
  },
  {
    q: "Why 4 axes specifically?",
    a: "Lead Capture, Follow-Up, Reporting and Team Productivity are the four places service businesses leak hours. Lead capture is the inbox-to-CRM gap. Follow-up is the 5-7 touch curve nobody runs. Reporting is the Monday-morning-CSV tax. Team productivity is the copy-paste-between-tools tax. Fix one axis and the others get easier.",
  },
  {
    q: "What happens after I get my score?",
    a: "Two paths. Either you book a 30-minute call where I look at the lowest-scoring axis and tell you exactly what to wire first, or you bounce to the revenue calculator with your implied manual hours prefilled to see the dollar number behind the leak. Both are free.",
  },
];

const heroStats = [
  { icon: Timer, label: "90 seconds", body: "12 questions, one tap each." },
  {
    icon: ShieldCheck,
    label: "Anonymous",
    body: "No email gate. Nothing leaves your browser.",
  },
  {
    icon: Target,
    label: "Biggest leak",
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
            background: "#14B8A6",
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
                background: "rgba(94, 234, 212, 0.14)",
                border: "1px solid rgba(94, 234, 212, 0.40)",
                color: "#5eead4",
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-xs font-medium tracking-wider uppercase">
                Free diagnostic · No email gate
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.04] tracking-tight mb-6 text-white">
              Where is your business{" "}
              <span
                style={{
                  background:
                    "linear-gradient(120deg, #7ee4ff 0%, #5eead4 50%, #fde68a 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  WebkitTextFillColor: "transparent",
                }}
              >
                actually manual?
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-4 max-w-2xl">
              12 questions across the four axes that bleed hours in every
              service business: lead capture, follow-up, reporting, and team
              productivity. 90 seconds to score, one biggest leak to fix first.
            </p>
            <p className="text-base text-gray-300 leading-relaxed max-w-2xl">
              You get a 0 to 100 automation gap %, a four-axis radar, and a
              tailored callout for the weakest axis. Then choose: book a call,
              run the revenue calculator on your implied manual hours, or share
              the result.
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

      {/* AXES PREVIEW */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3 text-center">
              The four axes
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-10 text-center text-white">
              Where the hours actually leak.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {AXES.map((a) => (
                <div
                  key={a.key}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] mb-3 bg-cyan-300/10 text-cyan-200 border border-cyan-300/30">
                    {a.questionCount} Qs · max {a.maxScore}
                  </div>
                  <h3 className="text-white text-lg font-extrabold mb-1">
                    {a.label}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
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
