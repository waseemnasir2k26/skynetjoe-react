import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { ChevronRight, Calculator as CalcIcon, Sparkles } from "lucide-react";
import { CASE_STUDIES } from "@/lib/case-studies";
import Calculator from "./Calculator";

const CAL_URL = "https://cal.com/skynetjoe/30min";

export const metadata: Metadata = {
  title:
    "Revenue Recovery Calculator — see what your missed leads + manual work are costing you · SkynetLabs",
  description:
    "Free interactive ROI calculator. Move 6 sliders, see in real time how much revenue your business is leaking from missed leads, low close rate, and manual follow-ups.",
  alternates: { canonical: `${SITE.url}/tools/revenue-calculator` },
  openGraph: {
    title:
      "Revenue Recovery Calculator — what your missed leads cost you · SkynetLabs",
    description:
      "Interactive ROI calculator. 6 sliders, live math, real number. Built by SkynetLabs to size the actual recovery opportunity in your business.",
    url: `${SITE.url}/tools/revenue-calculator`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Revenue Recovery Calculator · SkynetLabs",
    description:
      "Move 6 sliders. See the leak. See the recovery. Real math, no email gate.",
  },
};

const faqs = [
  {
    q: "Is this realistic?",
    a: "It's a directional estimate, not a guarantee. The 80% missed-revenue recovery and 70% manual-hours reduction are the average outcomes from 240+ automations I've shipped since 2019 across n8n, GoHighLevel and custom AI agents. Your number will be higher or lower than the calculator says. The point is to size the opportunity in the right order of magnitude before we get on a call.",
  },
  {
    q: "What if I'm under 50 leads a month?",
    a: "Slide the leads input down — the math still works at 5, 10, 20 leads. Smaller operators usually have a bigger percentage gain because they have less time to chase follow-ups and miss the most calls. A solo practitioner with 18 leads a month and a 4-hour-a-week follow-up habit is usually leaking enough to pay for the system 3 to 6 times over.",
  },
  {
    q: "Do you guarantee these numbers?",
    a: "No. Anyone who guarantees revenue numbers in a calculator is lying to you. What I do guarantee: a discovery call where I look at your actual lead flow, your actual close rate and your actual time logs, and tell you honestly whether automation will pay for itself in your business. If the math doesn't work for you, I'll say so on the call.",
  },
  {
    q: "What's the catch?",
    a: "There isn't one. The calculator is free, the discovery call is free, and if I don't see a clean recovery path I'll tell you. I've turned down 40+ projects in the last 18 months because the math didn't justify the build. I'd rather not take your money than take it and disappoint you.",
  },
  {
    q: "Why these specific recovery percentages?",
    a: "Missed-revenue 80% recovery comes from after-hours auto-reply, AI voice-pickup and 24/7 inbox triage — these reliably recapture 4 out of 5 leads that previously went silent. Manual-hours 70% reduction comes from automating follow-up sequences, CRM data entry and routine email triage. The other 30% is real human judgment work that should never be automated.",
  },
];

const calcCases = CASE_STUDIES.filter((c) =>
  [
    "us-insurance-gohighlevel-rebuild",
    "eu-logistics-email-triage-n8n",
    "bali-wellness-conversion-funnel",
  ].includes(c.slug)
);

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE.url}/tools/revenue-calculator#app`,
      name: "SkynetLabs Revenue Recovery Calculator",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: `${SITE.url}/tools/revenue-calculator`,
      description:
        "Interactive 6-slider calculator that estimates monthly revenue leakage from missed leads and wasted manual hours, plus projected annual recovery with automation.",
      offers: {
        "@type": "Offer",
        price: 0,
        priceCurrency: "USD",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: "42",
        bestRating: "5",
        worstRating: "1",
      },
      provider: {
        "@type": "Organization",
        "@id": `${SITE.url}/#organization`,
        name: SITE.brand,
        url: SITE.url,
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE.url}/tools/revenue-calculator#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function RevenueCalculatorPage() {
  return (
    <>
      <JsonLd data={schema} />

      {/* HERO */}
      <section
        className="relative overflow-hidden pt-24 md:pt-32 pb-12 md:pb-16"
        style={{
          background:
            "linear-gradient(135deg, #061827 0%, #0a2d4a 45%, #073846 100%)",
        }}
      >
        <span
          className="orb"
          style={{
            width: 480,
            height: 480,
            background: "#1E88E5",
            top: -80,
            left: -120,
            opacity: 0.5,
          }}
        />
        <span
          className="orb"
          style={{
            width: 460,
            height: 460,
            background: "#00D4FF",
            top: 60,
            right: -120,
            opacity: 0.35,
            animationDelay: "-7s",
          }}
        />

        <div className="container-x px-6 relative z-10">
          <div className="max-w-4xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{
                background: "rgba(94, 234, 212, 0.12)",
                border: "1px solid rgba(94, 234, 212, 0.40)",
                color: "#5eead4",
              }}
            >
              <CalcIcon className="w-3.5 h-3.5" />
              <span className="text-xs font-medium tracking-wider uppercase">
                Free tool · no email gate
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.04] tracking-tight mb-5 text-white">
              How much money is your business{" "}
              <span
                style={{
                  background:
                    "linear-gradient(120deg, #7ee4ff 0%, #5eead4 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  WebkitTextFillColor: "transparent",
                }}
              >
                actually leaking?
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl">
              Move 6 sliders. The calculator runs the math live. You walk away
              knowing what missed leads, low close rate and manual follow-ups
              are costing you every month, and what an automation stack would
              recover.
            </p>
          </div>
        </div>
      </section>

      {/* CALCULATOR (client) */}
      <Suspense
        fallback={
          <section className="section">
            <div className="container-x px-6">
              <div
                className="rounded-3xl p-10 text-center"
                style={{
                  background: "rgba(10, 45, 74, 0.45)",
                  border: "1px solid rgba(126, 228, 255, 0.18)",
                }}
              >
                <p className="text-gray-300">Loading the calculator…</p>
              </div>
            </div>
          </section>
        }
      >
        <Calculator calUrl={CAL_URL} />
      </Suspense>

      {/* CASE PROOF */}
      <section className="section pt-0">
        <div className="container-x px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3">
              Real recoveries
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
              Three clients who actually{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                ran this play.
              </span>
            </h2>
            <p className="text-lg text-gray-300">
              Same math, real businesses, public case studies. The numbers in
              the calculator are calibrated against outcomes like these.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {calcCases.map((c) => (
              <Link
                key={c.slug}
                href={`/case-studies/${c.slug}`}
                className="group rounded-2xl p-6 block transition-transform hover:-translate-y-1"
                style={{
                  background: "rgba(10, 45, 74, 0.55)",
                  border: "1px solid rgba(126, 228, 255, 0.18)",
                  backdropFilter: "blur(14px)",
                }}
              >
                <span
                  className="text-[11px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full inline-block mb-4"
                  style={{
                    background: "rgba(94, 234, 212, 0.14)",
                    color: "#5eead4",
                    border: "1px solid rgba(94, 234, 212, 0.30)",
                  }}
                >
                  {c.industryTag}
                </span>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-200 transition-colors">
                  {c.clientName}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed mb-4">
                  {c.oneLineOutcome}
                </p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {c.keyMetrics.slice(0, 2).map((m) => (
                    <div
                      key={m.label}
                      className="rounded-lg p-2"
                      style={{
                        background: "rgba(6, 24, 39, 0.45)",
                        border: "1px solid rgba(126, 228, 255, 0.12)",
                      }}
                    >
                      <p className="text-[10px] uppercase tracking-wider text-cyan-300/80 mb-1">
                        {m.label}
                      </p>
                      <p className="text-sm font-bold text-white">{m.delta}</p>
                    </div>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300">
                  Read the full case
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section pt-0">
        <div className="container-x px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3 text-center">
              FAQ
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-10 text-center text-white">
              The{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                honest answers.
              </span>
            </h2>

            <div className="space-y-3">
              {faqs.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-2xl p-5 md:p-6"
                  style={{
                    background: "rgba(10, 45, 74, 0.55)",
                    border: "1px solid rgba(126, 228, 255, 0.18)",
                    backdropFilter: "blur(14px)",
                  }}
                >
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-4 text-lg font-semibold text-white">
                    <span>{f.q}</span>
                    <ChevronRight className="w-5 h-5 text-cyan-300 transition-transform group-open:rotate-90 shrink-0" />
                  </summary>
                  <p className="text-base text-gray-300 leading-relaxed mt-4">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section pt-0">
        <div className="container-x px-6">
          <div
            className="rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
            }}
          >
            <div className="relative z-10 max-w-2xl mx-auto">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
                style={{
                  background: "rgba(255, 255, 255, 0.15)",
                  border: "1px solid rgba(255, 255, 255, 0.30)",
                  color: "#ffffff",
                }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-xs font-medium tracking-wider uppercase">
                  Personalize the number
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-5">
                Get your real annual gain.
              </h2>
              <p className="text-lg text-white/90 mb-8 leading-relaxed">
                The calculator gives you the order of magnitude. A 30-minute
                call gives you the number — what your stack would actually
                recover, what it would cost to build, and whether the math is
                worth doing. If it isn&apos;t, I&apos;ll say so.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <a
                  href={CAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-slate-900 font-semibold hover:bg-cyan-50 transition-colors"
                >
                  Get my custom recovery plan
                </a>
                <Link
                  href="/case-studies"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 text-white font-semibold border border-white/30 hover:bg-white/20 transition-colors"
                >
                  See real case studies
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <p className="text-sm text-white/75 mt-6">
                Free 30-min call · Bali timezone · Replies within 8 working
                hours
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
