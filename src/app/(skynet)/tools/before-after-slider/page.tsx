import type { Metadata } from "next";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, howToSchema } from "@/lib/schema";
import Slider from "./Slider";
import { SCENARIOS } from "@/data/before-after-scenarios";
import { Sparkles, Hand, ShieldCheck } from "lucide-react";

const PATH = "/tools/before-after-slider";

const breadcrumbListSchema = breadcrumbSchema([
  { name: "Home", url: SITE.url },
  { name: "Tools", url: `${SITE.url}/tools` },
  { name: "Before/After Slider", url: `${SITE.url}${PATH}` },
]);

export const metadata: Metadata = {
  title: "Before/After Slider — see what AI automation actually does",
  description:
    "Drag-to-compare slider across 6 real workflows: lead response, content production, customer service, CRM data entry, reporting, lead qualification. Manual vs automated side by side.",
  alternates: { canonical: `${SITE.url}${PATH}` },
  openGraph: {
    title: "Before/After Slider — manual vs automated, side by side",
    description:
      "Six preset scenarios with drag-to-compare visuals and KPI deltas. Free, no email gate.",
    url: `${SITE.url}${PATH}`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Before/After Slider — visualise the AI automation delta",
    description:
      "Drag the handle. See what your workflow looks like manually vs automated.",
  },
};

const heroStats = [
  {
    icon: Hand,
    label: "Drag to compare",
    body: "Six preset workflow scenarios.",
  },
  {
    icon: Sparkles,
    label: "Real deltas",
    body: "Time, cost and quality numbers from shipped builds.",
  },
  {
    icon: ShieldCheck,
    label: "No email gate",
    body: "Pure browser. Nothing leaves your tab.",
  },
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Before/After Slider",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${SITE.url}${PATH}`,
  description:
    "Interactive drag-to-compare slider showing six manual-versus-automated workflow scenarios with KPI deltas for lead response, content production, customer service, CRM data entry, reporting and lead qualification.",
  offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
  dateModified: "2026-08-19",
  publisher: { "@id": `${SITE.url}/#organization` },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Before/After workflow scenarios",
  itemListElement: SCENARIOS.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: s.title,
    description: s.blurb,
  })),
};

const faqs = [
  {
    q: "Are these numbers real?",
    a: "Yes. The deltas are pulled from automation builds we've shipped between 2024 and 2026 across 180+ workflows. They're not industry benchmarks, they're our outcomes. Your business will differ but the order of magnitude holds.",
  },
  {
    q: "Will my workflow really save this much?",
    a: "Depends on volume, team size and how much the current workflow wastes. The slider scenarios assume a service business at $20k-$200k MRR. Below that, savings shrink. Above that, they compound faster than shown.",
  },
  {
    q: "Can you build this for me?",
    a: "Yes. Book a 30-minute call. Tell me the workflow that wastes your week. I'll sketch the automation on the call, give you a yes-or-no on whether it's worth the build, and pricing in the same conversation. No funnel.",
  },
  {
    q: "Why is the slider draggable instead of just two columns?",
    a: "Because seeing the manual side shrink as the automated side grows is the actual point. Two side-by-side columns get scanned. A drag interaction forces you to notice the delta.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const howToSteps = howToSchema({
  name: "How to use the Before/After Slider",
  description:
    "Compare a manual workflow against its automated version for six common business processes.",
  steps: [
    {
      name: "Pick a scenario",
      text: "Pick the scenario closest to your own workflow.",
    },
    {
      name: "Drag the handle",
      text: "Drag the handle to compare the manual and automated steps.",
    },
    {
      name: "Read the delta",
      text: "Read the KPI delta under the slider — that's the gap worth closing.",
    },
    {
      name: "Book a call",
      text: "Book a call if the gap looks worth building against.",
    },
  ],
});

export default function BeforeAfterSliderPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={itemListSchema} />
      <JsonLd data={breadcrumbListSchema} />
      <JsonLd data={howToSteps} />
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
                Free · No email gate
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
              See what AI automation{" "}
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
                actually does.
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
              Drag the handle. Six real workflows, side by side — manual on the
              left, automated on the right. No projections, no marketing math.
              The deltas are what we&apos;ve shipped.
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

      {/* SLIDER */}
      <section className="section">
        <div className="container-x px-6">
          <div className="max-w-5xl mx-auto">
            <Slider />
          </div>
        </div>
      </section>

      {/* WHY THIS EXISTS */}
      <section className="section pt-0">
        <div className="container-x px-6">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-8 md:p-12">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3">
                Why this tool exists
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6 text-[var(--ink)]">
                &quot;Automation saves time&quot; is a claim. This is a picture.
              </h2>
              <div className="space-y-5 text-[var(--ink-2)] leading-relaxed text-base md:text-lg">
                <p>
                  Most automation pitches lead with a percentage. Percentages
                  are easy to write and easy to ignore. Dragging a slider and
                  watching a five-step manual process collapse into one
                  automated step lands differently — it&apos;s the same reason
                  before/after photos work in every other industry.
                </p>
                <p>
                  Each of the six scenarios is a workflow shape we&apos;ve
                  actually built — lead response, content production, customer
                  service, CRM data entry, reporting, lead qualification. Pick
                  the one closest to your own bottleneck and use the delta as a
                  starting estimate, not a guarantee.
                </p>
              </div>
              <h3 className="text-lg font-bold mt-8 mb-3 text-[var(--ink)]">
                How to use it
              </h3>
              <ol className="space-y-2 text-[var(--ink-2)] text-sm md:text-base list-decimal list-inside">
                <li>Pick the scenario closest to your own workflow.</li>
                <li>
                  Drag the handle to compare the manual and automated steps.
                </li>
                <li>
                  Read the KPI delta under the slider — that&apos;s the gap
                  worth closing.
                </li>
                <li>Book a call if the gap looks worth building against.</li>
              </ol>
              <h3 className="text-lg font-bold mt-8 mb-3 text-[var(--ink)]">
                Who this is for
              </h3>
              <ul className="space-y-2 text-[var(--ink-2)] text-sm md:text-base list-disc list-inside">
                <li>
                  Founders scoping whether an automation build is worth the
                  spend.
                </li>
                <li>
                  Ops leads building the internal case for a workflow change.
                </li>
                <li>
                  Agencies pitching automation who need a visual, not a slide of
                  bullet points.
                </li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/tools/automation-gap-analyzer"
                  className="text-sm font-semibold text-[var(--terracotta-aa)] hover:underline"
                >
                  → Find your own automation gap
                </a>
                <a
                  href="/tools/n8n-workflow-generator"
                  className="text-sm font-semibold text-[var(--terracotta-aa)] hover:underline"
                >
                  → Generate an n8n workflow
                </a>
                <a
                  href="/services/n8n-automation"
                  className="text-sm font-semibold text-[var(--terracotta-aa)] hover:underline"
                >
                  → n8n automation service
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section pt-0">
        <div className="container-x px-6">
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
