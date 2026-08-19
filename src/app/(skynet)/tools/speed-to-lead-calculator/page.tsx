import type { Metadata } from "next";
import Link from "next/link";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { faqSchema, howToSchema, breadcrumbSchema } from "@/lib/schema";
import Calculator from "./Calculator";
import { MessageSquareText, Sliders, Target, Zap } from "lucide-react";

const PATH = "/tools/speed-to-lead-calculator";

export const metadata: Metadata = {
  title:
    "Free Speed-to-Lead Revenue Calculator — Response Time Cost | SkynetJoe",
  description:
    "See what slow lead response is actually costing you, in your own dollars — using your leads/month, close rate, and deal value against a published contact-decay study. Formula shown, source cited.",
  alternates: { canonical: `${SITE.url}${PATH}` },
  openGraph: {
    title: "Free Speed-to-Lead Revenue Calculator",
    description:
      "Enter your leads, close rate, deal value, and response time — see the estimated revenue at risk, formula and source shown.",
    url: `${SITE.url}${PATH}`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Speed-to-Lead Revenue Calculator",
    description:
      "What's slow lead response actually costing you? Formula shown, source cited.",
  },
};

const faqs = [
  {
    q: "What research is this actually based on?",
    a: "Oldroyd, McElheran & Elkington, \"The Short Life of Online Sales Leads,\" Harvard Business Review, March 2011 — an analysis of roughly 15,000 leads across 2,241 companies using contact data from InsideSales.com, finding the odds of qualifying a lead are roughly 21x higher when contacted within 5 minutes vs. after 30 minutes. That's a 2011 study on that dataset's response patterns — it's directional evidence, not a live guarantee for your business today.",
  },
  {
    q: "Why does the formula panel say some numbers are 'modeled' and not from the study?",
    a: "Because that's the truth. Only the 5-minute and 30-minute reference points are drawn from the cited research. The 24-hour floor and the interpolation between/beyond those points are this tool's own straight-line model, built for a smooth slider experience — clicking 'Show the formula' shows you exactly where the real data stops and the model starts.",
  },
  {
    q: "Why is the 'implied best close rate' capped?",
    a: "A blind multiplier (close rate × 21) can produce nonsense at low starting close rates — nobody actually converts at 100%+ just from answering faster. The tool caps the implied uplift at +40 percentage points or 95%, whichever is lower, so the output stays in a defensible range instead of compounding the multiplier into a fantasy number.",
  },
  {
    q: "Does this account for my industry or lead source?",
    a: "No — it's a generic model driven entirely by the numbers you enter (leads/month, close rate, deal value, response time). It doesn't know if your leads are cold ads, referrals, or inbound demo requests, all of which respond differently to speed. Treat the dollar figure as directional, not a forecast.",
  },
  {
    q: "What actually fixes slow response time?",
    a: "Usually one of: an instant auto-acknowledgment (SMS/email) the moment a lead comes in, an AI chatbot that qualifies and books while a human is unavailable, or an n8n/automation routing rule that pings the right rep the second a form submits — instead of a lead sitting in an inbox until someone checks it.",
  },
];

const howToSteps = [
  {
    name: "Enter your leads per month",
    text: "How many new leads you get in an average month, across whatever channel you're evaluating.",
  },
  {
    name: "Enter your current close rate and deal value",
    text: "Your real numbers — not an industry benchmark. The dollar estimate is only as good as these inputs.",
  },
  {
    name: "Set your current response time",
    text: "How long it actually takes, on average, for a lead to hear back from a human — not how fast you wish it was.",
  },
  {
    name: "Read the estimate and the formula",
    text: "The result shows monthly and yearly revenue at risk, plus a 'Show the formula' panel with every number in the calculation and which parts are cited research vs. this tool's own model.",
  },
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Speed-to-Lead Revenue Calculator",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${SITE.url}${PATH}`,
  description:
    "Free calculator estimating revenue at risk from slow lead response time, using the user's own leads/close rate/deal value against a published contact-decay research finding, with the full formula shown.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function SpeedToLeadCalculatorPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd
        data={faqSchema(faqs.map((f) => ({ question: f.q, answer: f.a })))}
      />
      <JsonLd
        data={howToSchema({
          name: "How to estimate revenue lost to slow lead response",
          description:
            "Enter leads per month, close rate, deal value, and response time to see estimated revenue at risk.",
          steps: howToSteps,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE.url },
          { name: "Tools", url: `${SITE.url}/tools` },
          {
            name: "Speed-to-Lead Revenue Calculator",
            url: `${SITE.url}${PATH}`,
          },
        ])}
      />

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
              <Zap className="w-3.5 h-3.5" />
              <span className="text-xs font-medium tracking-wider uppercase">
                Free · Formula shown · Source cited
              </span>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(38px, 6vw, 66px)",
                fontWeight: 500,
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
                color: "var(--ink)",
                marginBottom: 22,
              }}
            >
              What&apos;s a slow lead response{" "}
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
                actually costing you?
              </span>
            </h1>

            <p
              style={{
                fontSize: 18,
                color: "var(--ink-2)",
                lineHeight: 1.6,
                marginBottom: 14,
                maxWidth: "58ch",
              }}
            >
              Enter your leads per month, close rate, deal value, and current
              response time. This tool estimates the revenue at risk using your
              real numbers against a published research finding on contact-rate
              decay — with the formula fully shown, not a black box.
            </p>
            <p
              style={{
                fontSize: 15,
                color: "var(--ink-2)",
                lineHeight: 1.6,
                maxWidth: "58ch",
              }}
            >
              Source: Oldroyd, McElheran &amp; Elkington, Harvard Business
              Review, 2011 — labeled honestly as a 2011 study, directional not
              guaranteed. Updated August 2026.
            </p>
          </div>
        </div>
      </section>

      {/* TOOL */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-4xl mx-auto">
            <Calculator />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3 text-center">
              How it works
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-center text-[var(--ink)]">
              Four inputs, one transparent formula
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {howToSteps.map((s, i) => (
                <div
                  key={s.name}
                  className="rounded-2xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-5"
                >
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(198,107,63,0.15)] text-xs font-bold text-[var(--terracotta-aa)] mb-2">
                    {i + 1}
                  </span>
                  <h3 className="text-[var(--ink)] font-extrabold mb-1">
                    {s.name}
                  </h3>
                  <p className="text-sm text-[var(--ink-faint)]">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* THE RESEARCH */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-8 md:p-12">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3">
                The research this is built on
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6 text-[var(--ink)]">
                One real study, labeled honestly — not a made-up benchmark
              </h2>
              <div className="space-y-5 text-[var(--ink-2)] leading-relaxed text-base md:text-lg mb-8">
                <p>
                  &quot;The Short Life of Online Sales Leads&quot; (Oldroyd,
                  McElheran &amp; Elkington, Harvard Business Review, March
                  2011) analyzed roughly 15,000 leads across 2,241 companies
                  using contact attempt data from InsideSales.com. The headline
                  finding: companies that tried to contact a lead within 5
                  minutes were dramatically more likely to actually qualify it
                  than companies that waited even 30 minutes — the study reports
                  odds roughly 21x higher in that window.
                </p>
                <p>
                  This calculator uses exactly two numbers from that study — the
                  5-minute and 30-minute reference points — as anchors for a
                  simple curve. Everything else (the 24-hour floor, the
                  interpolation, the implied close-rate cap) is this tool&apos;s
                  own model, disclosed in full in the &quot;Show the
                  formula&quot; panel above. It&apos;s a 14-year-old dataset
                  from one research team&apos;s sample — a directional signal
                  worth taking seriously, not a number to quote as gospel for
                  your specific business.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="text-left border-b border-[rgba(26,26,26,0.15)]">
                      <th className="py-2 pr-4 font-bold text-[var(--ink)]">
                        Response time
                      </th>
                      <th className="py-2 pr-4 font-bold text-[var(--ink)]">
                        Modeled qualify index
                      </th>
                      <th className="py-2 font-bold text-[var(--ink)]">
                        Where it comes from
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-[var(--ink-2)]">
                    <tr className="border-b border-[rgba(26,26,26,0.08)]">
                      <td className="py-2.5 pr-4 font-semibold text-[var(--ink)]">
                        5 minutes
                      </td>
                      <td className="py-2.5 pr-4 font-mono">1.000</td>
                      <td className="py-2.5">
                        Baseline anchor (best-practice response)
                      </td>
                    </tr>
                    <tr className="border-b border-[rgba(26,26,26,0.08)]">
                      <td className="py-2.5 pr-4 font-semibold text-[var(--ink)]">
                        30 minutes
                      </td>
                      <td className="py-2.5 pr-4 font-mono">0.048</td>
                      <td className="py-2.5">
                        HBR 2011 — ~21x qualification-odds finding
                      </td>
                    </tr>
                    <tr className="border-b border-[rgba(26,26,26,0.08)]">
                      <td className="py-2.5 pr-4 font-semibold text-[var(--ink)]">
                        24 hours
                      </td>
                      <td className="py-2.5 pr-4 font-mono">0.010</td>
                      <td className="py-2.5">
                        This tool&apos;s modeled floor — not from the study
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-6 text-sm text-[var(--ink-faint)]">
                Waseem, building from Bali · info@skynetjoe.com · Updated August
                2026
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MORE TOOLS */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3 text-center">
              Keep going
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-center text-[var(--ink)]">
              Related free tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                href="/tools/automation-gap-analyzer"
                className="rounded-2xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-5 transition hover:border-[var(--terracotta)]/50"
              >
                <Target className="h-5 w-5 text-[var(--terracotta-aa)] mb-2" />
                <h3 className="text-[var(--ink)] font-extrabold mb-1">
                  Automation Gap Analyzer
                </h3>
                <p className="text-sm text-[var(--ink-faint)]">
                  Find where your ops lose time and money before you build.
                </p>
              </Link>
              <Link
                href="/tools/ai-cost-calculator"
                className="rounded-2xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-5 transition hover:border-[var(--terracotta)]/50"
              >
                <Sliders className="h-5 w-5 text-[var(--terracotta-aa)] mb-2" />
                <h3 className="text-[var(--ink)] font-extrabold mb-1">
                  AI Cost Calculator
                </h3>
                <p className="text-sm text-[var(--ink-faint)]">
                  Estimate real monthly spend across the AI tools you&apos;re
                  running.
                </p>
              </Link>
              <Link
                href="/tools/cold-dm-generator"
                className="rounded-2xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-5 transition hover:border-[var(--terracotta)]/50"
              >
                <MessageSquareText className="h-5 w-5 text-[var(--terracotta-aa)] mb-2" />
                <h3 className="text-[var(--ink)] font-extrabold mb-1">
                  Cold DM Generator
                </h3>
                <p className="text-sm text-[var(--ink-faint)]">
                  Personalized cold outreach that doesn&apos;t read like a
                  template.
                </p>
              </Link>
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

      {/* DISCOVERY CTA */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-3xl mx-auto text-center rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-10 md:p-14">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3 text-[var(--ink)]">
              Want the 5-minute response without hiring a night shift?
            </h2>
            <p className="text-[var(--ink-2)] mb-6 max-w-xl mx-auto">
              An AI chatbot or an automated routing workflow can acknowledge and
              qualify a lead the moment it comes in — no human has to be at a
              desk.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/services/ai-chatbots"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-semibold text-[var(--cream-3)] shadow-lg transition-transform hover:scale-[1.02] sm:text-base"
                style={{
                  background: "var(--terracotta)",
                  boxShadow: "0 10px 32px rgba(198,107,63,0.25)",
                }}
              >
                Explore AI chatbots
              </Link>
              <Link
                href="/services/n8n-automation"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[rgba(26,26,26,0.18)] bg-[var(--cream-2)] px-6 py-4 text-sm font-semibold text-[var(--ink-2)] transition hover:border-[var(--terracotta)] hover:text-[var(--terracotta-aa)] sm:text-base"
              >
                Explore n8n automation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
