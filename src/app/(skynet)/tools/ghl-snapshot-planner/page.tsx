import type { Metadata } from "next";
import Link from "next/link";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import Planner from "./Planner";
import { BUSINESS_TYPES } from "@/data/tools/ghl-snapshots";
import { GitBranch, Target, Webhook, ArrowRight } from "lucide-react";

const PATH = "/tools/ghl-snapshot-planner";

const breadcrumbListSchema = breadcrumbSchema([
  { name: "Home", url: SITE.url },
  { name: "Tools", url: `${SITE.url}/tools` },
  { name: "GoHighLevel Snapshot Planner", url: `${SITE.url}${PATH}` },
]);

export const metadata: Metadata = {
  title:
    "Free GoHighLevel Snapshot Planner — Pipelines, Workflows & Fields Mapped",
  description:
    "Pick your business type, get a recommended GHL snapshot structure — pipelines, workflows, custom fields, calendars — as an exportable checklist.",
  alternates: { canonical: `${SITE.url}${PATH}` },
  openGraph: {
    title: "GHL Snapshot Planner · pipelines, workflows, fields, calendars",
    description: `${BUSINESS_TYPES.length} business types, one recommended snapshot structure each, exportable as a checklist before you touch your GHL account.`,
    url: `${SITE.url}${PATH}`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "GHL Snapshot Planner · free planning checklist",
    description:
      "Recommended GoHighLevel pipeline, workflow, and field structure by business type.",
  },
};

const faqs = [
  {
    q: "Is this an actual GHL snapshot I can import?",
    a: "No — it's a planning checklist: the pipeline stages, workflow names, custom fields, and calendar types I'd actually configure for that business type. GoHighLevel account structure still has to be built by hand (or with a build partner) inside your own sub-account.",
  },
  {
    q: "Why plan before building in GHL?",
    a: "Because renaming pipeline stages after workflows and automations already reference them is one of the most common GHL cleanup jobs I get hired for. Planning the structure on paper first — pipelines, then workflows, then the fields that connect them — avoids a rebuild three months in.",
  },
  {
    q: "What does the export include?",
    a: "A plain-text checklist: every pipeline and its stages, every recommended workflow, every custom field, and every calendar type for your business type, formatted as checkboxes you can work through with your team or hand to a builder.",
  },
  {
    q: "My business type isn't listed — what should I do?",
    a: `Pick the closest of the ${BUSINESS_TYPES.length} listed — the pipeline/workflow/field pattern transfers to most service businesses with light adjustment. Or book a call and I'll plan the exact structure for your ops.`,
  },
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "GHL Snapshot Planner",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${SITE.url}${PATH}`,
  description:
    "Free planning tool that recommends a GoHighLevel snapshot structure — pipelines, workflows, custom fields, and calendars — by business type, exportable as a checklist.",
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

export default function GhlSnapshotPlannerPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={breadcrumbListSchema} />
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
              <GitBranch className="w-3.5 h-3.5" />
              <span className="text-xs font-medium tracking-wider uppercase">
                {BUSINESS_TYPES.length} business types · Email to export
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
              Plan your GHL{" "}
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
                before you build it.
              </span>
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
              Pick your business type, get the pipelines, workflows, custom
              fields, and calendars I&apos;d actually set up for that vertical —
              as an exportable checklist you can work through before you touch
              your GoHighLevel account.
            </p>
          </div>
        </div>
      </section>

      {/* TOOL */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-4xl mx-auto">
            <Planner />
          </div>
        </div>
      </section>

      {/* WHY THIS EXISTS */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-8 md:p-12">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3">
                Why this planner exists
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6 text-[var(--ink)]">
                Most GHL rebuilds I&apos;m hired for start with a pipeline that
                got renamed too late.
              </h2>
              <div className="space-y-5 text-[var(--ink-2)] leading-relaxed text-base md:text-lg">
                <p>
                  GoHighLevel is powerful precisely because everything connects
                  — pipeline stages trigger workflows, workflows read custom
                  fields, calendars feed pipeline stage changes. That&apos;s
                  also why restructuring six months in is expensive: rename a
                  stage and three workflows silently break.
                </p>
                <p>
                  This planner exists so you decide the structure before any of
                  it is wired together. Pick your business type, see the
                  pipeline stages, workflow list, custom fields, and calendar
                  types I&apos;d actually configure, export it as a checklist,
                  and build (or hand it to a builder) with a plan instead of
                  guessing as you go.
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
                desc: "Find which pipeline or workflow to build first.",
              },
              {
                icon: Webhook,
                href: "/tools/webhook-payload-builder",
                label: "Webhook Payload Builder",
                desc: "Test the payload shape before wiring GHL into n8n.",
              },
              {
                icon: ArrowRight,
                href: "/discovery-call",
                label: "Book a discovery call",
                desc: "Have this built and wired properly, end to end.",
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
