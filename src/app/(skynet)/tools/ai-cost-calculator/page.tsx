import type { Metadata } from "next";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import Calculator from "./Calculator";
import { LLM_PRICING, PRICING_AS_OF } from "@/data/tools/llm-pricing";
import { Sparkles, Calculator as CalcIcon, Table, Copy } from "lucide-react";

const PATH = "/tools/ai-cost-calculator";

const breadcrumbListSchema = breadcrumbSchema([
  { name: "Home", url: SITE.url },
  { name: "Tools", url: `${SITE.url}/tools` },
  { name: "LLM API Cost Calculator", url: `${SITE.url}${PATH}` },
]);

export const metadata: Metadata = {
  title: "LLM API Cost Calculator — Free Monthly Estimate",
  description:
    "Free LLM API cost calculator. Pick a model — Claude, GPT, or Gemini — enter your token volume, and get an estimated monthly cost, compared across every provider. No email required.",
  alternates: { canonical: `${SITE.url}${PATH}` },
  openGraph: {
    title: "LLM API Cost Calculator — free monthly cost estimate",
    description:
      "Model picker + token volume in, estimated monthly cost across Claude, GPT, and Gemini out. Free, no email gate.",
    url: `${SITE.url}${PATH}`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "LLM API Cost Calculator · free, no email required",
    description:
      "Estimate monthly LLM API spend across Claude, GPT, and Gemini from your actual token volume.",
  },
};

const faqs = [
  {
    q: "Where does the pricing data come from?",
    a: `Published provider pricing pages, condensed into a static table as of ${PRICING_AS_OF}. This is not a live feed — no API is called and nothing is fetched from the providers. Rates change often, so treat every number here as an approximation and verify on the provider's own pricing page before budgeting real spend.`,
  },
  {
    q: "Why is my actual bill different from this estimate?",
    a: "A few reasons: cached/prompt-caching discounts most providers offer, batch API discounts, volume-tier pricing at high scale, and the fact that real conversations vary in token count far more than a flat average captures. This calculator gives you a directionally correct monthly number, not an invoice-accurate one.",
  },
  {
    q: "How do I count tokens for my own use case?",
    a: "Roughly, 1 token is about 4 characters of English text. A typical chat message is 50-300 tokens; a long document or big system prompt can run into the thousands. If you're unsure, start with this tool's defaults and adjust until the volume matches what you actually see in your provider's usage dashboard.",
  },
  {
    q: "Is this free? Do I need to enter my email?",
    a: "Fully free, no email gate. Change the model and volume as many times as you want and copy the summary whenever you're ready.",
  },
];

const heroStats = [
  {
    icon: CalcIcon,
    label: `${LLM_PRICING.length} models`,
    body: "Claude, GPT, and Gemini families.",
  },
  {
    icon: Table,
    label: "Live comparison",
    body: "Every model, same volume, ranked by cost.",
  },
  {
    icon: Copy,
    label: "Copy summary",
    body: "One click, paste into a proposal or Slack.",
  },
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "LLM API Cost Calculator",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${SITE.url}${PATH}`,
  description: `Free calculator that estimates monthly LLM API spend across ${LLM_PRICING.length} models from Anthropic, OpenAI, and Google, based on token volume you provide. Pricing table is ${PRICING_AS_OF}.`,
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

export default function AiCostCalculatorPage() {
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
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-xs font-medium tracking-wider uppercase">
                Free · No email required
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
              What&apos;s your{" "}
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
                LLM API bill
              </span>{" "}
              actually going to be?
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
              Pick a model, enter your request volume and average token counts,
              and see an estimated monthly cost — plus how every other model
              stacks up at the same volume.
            </p>
            <p
              style={{
                fontSize: 15,
                color: "var(--ink-2)",
                lineHeight: 1.6,
                maxWidth: "52ch",
              }}
            >
              Pricing table as of {PRICING_AS_OF}. API pricing moves fast, so
              treat every number as a directional estimate, not an invoice.
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

      {/* TOOL */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-4xl mx-auto">
            <Calculator />
          </div>
        </div>
      </section>

      {/* WHY THIS EXISTS */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-8 md:p-12 backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3">
                Why this calculator exists
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6 text-[var(--ink)]">
                Nobody scopes AI spend before they build. Everyone should.
              </h2>
              <div className="space-y-5 text-[var(--ink-2)] leading-relaxed text-base md:text-lg">
                <p>
                  When I scope an AI automation build, the first question a
                  client asks after &quot;how long will it take&quot; is
                  &quot;what&apos;s this going to cost me every month to
                  run.&quot; Most people have never priced out an LLM API before
                  — they know the $20/month consumer chat subscription, not the
                  pay-per-token API rate that scales with usage.
                </p>
                <p>
                  Those two numbers are not related. A consumer subscription
                  caps your usage; an API call bills you for every token in and
                  out, every single request. A chatbot answering 200 customer
                  questions a day on a flagship model can cost more per month
                  than the subscription that inspired the project — or it can
                  cost a few dollars if you pick the right tier. The difference
                  is almost entirely model choice and prompt length, both of
                  which you control.
                </p>
                <p>
                  This tool exists so you can run that math before you commit to
                  a build, not after the first invoice surprises you. Pick a
                  model, enter your real volume, and see where you land — then
                  compare against a cheaper tier to see what accuracy you&apos;d
                  be trading for cost.
                </p>
                <p>
                  If the number that comes back changes your build plan — fewer
                  tokens per call, a cheaper model for the bulk of requests, a
                  flagship model only for the hard cases — that&apos;s exactly
                  the kind of architecture decision I help clients make on a
                  discovery call, before a single line of code ships.
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
