import type { Metadata } from "next";
import Link from "next/link";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Calculator from "./Calculator";
import { INDUSTRIES } from "@/data/tools/automation-roi";
import { BarChart3, Target, GitBranch, ArrowRight } from "lucide-react";

const PATH = "/tools/automation-roi-by-industry";

export const metadata: Metadata = {
  title: "Automation ROI Calculator by Industry — free tool · SkynetLabs",
  description:
    "Pick your industry and volumes, see a directional range for hours and dollars saved per year from automating your most common manual tasks. Email to unlock the full breakdown.",
  alternates: { canonical: `${SITE.url}${PATH}` },
  openGraph: {
    title: "Automation ROI by Industry · hours & dollars saved, as a range",
    description: `${INDUSTRIES.length} industries, your own volumes, a directional low-high savings range — never a fabricated single number.`,
    url: `${SITE.url}${PATH}`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Automation ROI Calculator by Industry",
    description:
      "See typical automation payback and time saved for your industry, based on your own volumes.",
  },
};

const faqs = [
  {
    q: "Where do the savings ranges come from?",
    a: "They're directional planning ranges — the same rough time-reduction bands I use when scoping automation work on a discovery call, applied to the volumes YOU enter. They are not pulled from a published study or a specific client dataset, and the tool always shows a low-high range, never a single invented precise figure.",
  },
  {
    q: "Why a range instead of one number?",
    a: "Because a single number would be a guess dressed up as fact. Every business automates a task at a different rate depending on process complexity and current tooling — the range reflects that honestly instead of hiding it.",
  },
  {
    q: "What do you collect?",
    a: "Your industry pick and volume sliders stay in your browser. To unlock the full task-by-task breakdown you enter an email, which goes to my CRM so I can follow up. No name or company required.",
  },
  {
    q: "My industry isn't listed — what should I do?",
    a: `Pick the closest match from the ${INDUSTRIES.length} listed — the underlying math (your task count × your minutes × a time-reduction range) applies to any service business with repeatable manual work. Or book a call and I'll scope your actual numbers.`,
  },
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Automation ROI Calculator by Industry",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${SITE.url}${PATH}`,
  description:
    "Free calculator that estimates hours and dollars saved per year from automating common manual tasks, using industry-specific benchmark ranges applied to the user's own volumes.",
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

export default function AutomationRoiByIndustryPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />

      {/* HERO */}
      <section
        style={{
          padding: "96px 0 48px",
          background: "var(--cream-3)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="container-x px-6">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{
                background: "rgba(198,107,63,0.10)",
                border: "1px solid rgba(198,107,63,0.40)",
                color: "var(--terracotta-aa)",
              }}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span className="text-xs font-medium tracking-wider uppercase">
                {INDUSTRIES.length} industries · Email to unlock full report
              </span>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(38px, 6vw, 64px)",
                fontWeight: 500,
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
                color: "var(--ink)",
                marginBottom: 22,
              }}
            >
              What automation{" "}
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
                actually saves,
              </span>{" "}
              by industry.
            </h1>

            <p
              style={{
                fontSize: 18,
                color: "var(--ink-2)",
                lineHeight: 1.6,
                marginBottom: 14,
                maxWidth: "56ch",
              }}
            >
              Pick your industry, tell it how often a manual task happens and
              how long it takes today. You get a low-to-high range of hours and
              dollars saved per year — never a single made-up figure, always
              framed as what you save, not what any tool costs.
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

      {/* WHY THIS EXISTS */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-8 md:p-12">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3">
                Why this calculator exists
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6 text-[var(--ink)]">
                Most ROI calculators fabricate a precise number. This one shows
                you a range and tells you why.
              </h2>
              <div className="space-y-5 text-[var(--ink-2)] leading-relaxed text-base md:text-lg">
                <p>
                  Every &quot;save $47,382/year with AI&quot; calculator you see
                  online is doing the same thing: picking a plausible percentage
                  out of thin air and multiplying it by your revenue.
                  That&apos;s marketing, not math.
                </p>
                <p>
                  This tool does something narrower and more honest. You tell it
                  your own volumes — how many times a task happens, how long it
                  takes today. We apply a directional time-reduction range for
                  your industry, the same rough bands I use to scope real
                  builds, and show you a low-high result instead of a single
                  confident-sounding lie.
                </p>
                <p>
                  If you want the real number for your specific ops, that takes
                  a conversation — the full report unlocks the task-by-task view
                  and a direct line to book that call.
                </p>
              </div>
              <p className="mt-6 text-sm text-[var(--ink-faint)]">
                Waseem, building from Bali · info@skynetjoe.com
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CROSS-LINKS */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: Target,
                href: "/tools/automation-gap-analyzer",
                label: "Automation Gap Analyzer",
                desc: "90 seconds, 12 questions — find where ops leak time first.",
              },
              {
                icon: GitBranch,
                href: "/tools/n8n-workflow-generator",
                label: "n8n Workflow Generator",
                desc: "Turn the task you'd automate into a real workflow.",
              },
              {
                icon: ArrowRight,
                href: "/discovery-call",
                label: "Book a discovery call",
                desc: "Get the real, scoped number for your business.",
              },
            ].map(({ icon: Icon, href, label, desc }) => (
              <Link
                key={href}
                href={href}
                className="group rounded-2xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-5 transition hover:border-[var(--terracotta)]/50"
              >
                <Icon className="w-5 h-5 text-[var(--terracotta-aa)] mb-3" />
                <div className="text-[var(--ink)] font-bold mb-1">{label}</div>
                <p className="text-sm text-[var(--ink-faint)] leading-relaxed">
                  {desc}
                </p>
              </Link>
            ))}
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
                  className="group rounded-2xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] px-5 py-4 transition"
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
