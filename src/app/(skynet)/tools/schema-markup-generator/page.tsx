import type { Metadata } from "next";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import Generator from "./Generator";
import { SCHEMA_TYPES } from "@/data/tools/schema-markup-generator";
import { Braces, Timer, CheckCircle2, Layers } from "lucide-react";

const PATH = "/tools/schema-markup-generator";

const breadcrumbListSchema = breadcrumbSchema([
  { name: "Home", url: SITE.url },
  { name: "Tools", url: `${SITE.url}/tools` },
  { name: "Schema Markup Generator", url: `${SITE.url}${PATH}` },
]);

export const metadata: Metadata = {
  title: "Free Schema Markup Generator — Clean JSON-LD in Minutes",
  description:
    "Pick a schema.org type — Organization, FAQPage, Article, LocalBusiness, or SoftwareApplication — fill in the form, and copy clean JSON-LD. Free, no email required.",
  alternates: { canonical: `${SITE.url}${PATH}` },
  openGraph: {
    title: "Schema Markup Generator — build JSON-LD in minutes",
    description:
      "5 schema.org types, one form, clean JSON-LD output. Free and ungated — copy the <script> tag straight into your page.",
    url: `${SITE.url}${PATH}`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Schema Markup Generator — free JSON-LD builder",
    description:
      "Organization, FAQPage, Article, LocalBusiness, SoftwareApplication. Free, no email.",
  },
};

const faqs = [
  {
    q: "Which schema type should I use?",
    a: "Organization for your homepage/brand identity, FAQPage for any Q&A block, Article for blog posts and guides, LocalBusiness if you serve a physical location or defined service area, and SoftwareApplication for an app, tool, or SaaS product page. Most sites end up using at least two — Organization plus one content-specific type.",
  },
  {
    q: "Do I need to validate this before publishing?",
    a: "Yes — always run generated markup through Google's Rich Results Test or the Schema.org validator before shipping. This tool builds spec-correct JSON-LD from your inputs, but it can't verify that the URLs, dates, or images you entered actually resolve on your live site.",
  },
  {
    q: "Why is this free with no email gate?",
    a: "JSON-LD generation is a mechanical task — there's no reason to gate a copy button. The AEO Audit and ChatGPT Visibility Grader in this tool set produce a personalized report worth an email exchange; this one just needs to work.",
  },
  {
    q: "Where do I put the output?",
    a: 'Paste the copied <script type="application/ld+json"> block into the <head> of the relevant page (or wherever your framework renders head tags — e.g. Next.js Metadata/JSON-LD component, WordPress theme header.php).',
  },
];

const heroStats = [
  {
    icon: Timer,
    label: "60 seconds",
    body: "Pick a type, fill the form, copy.",
  },
  {
    icon: CheckCircle2,
    label: "No email",
    body: "Fully free, ungated, every time.",
  },
  {
    icon: Layers,
    label: "5 types",
    body: "Organization, FAQ, Article, LocalBusiness, App.",
  },
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Schema Markup Generator",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  url: `${SITE.url}${PATH}`,
  description:
    "Free tool that generates clean JSON-LD structured data for Organization, FAQPage, Article, LocalBusiness, and SoftwareApplication schema.org types.",
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

export default function SchemaMarkupGeneratorPage() {
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
              <Braces className="w-3.5 h-3.5" />
              <span className="text-xs font-medium tracking-wider uppercase">
                Free forever · No email required
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
              Clean JSON-LD,{" "}
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
                no guessing.
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
              Pick a schema.org type, fill in a plain-language form, and copy
              valid structured data straight into your page. No account, no
              email, no rate limit.
            </p>
            <p
              style={{
                fontSize: 15,
                color: "var(--ink-2)",
                lineHeight: 1.6,
                maxWidth: "52ch",
              }}
            >
              Organization, FAQPage, Article, LocalBusiness, and
              SoftwareApplication — the five types that cover most of what a
              service business or SaaS product actually needs.
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

      {/* GENERATOR */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-3xl mx-auto">
            <Generator />
          </div>
        </div>
      </section>

      {/* TYPES PREVIEW */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3 text-center">
              Supported types
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-10 text-center text-[var(--ink)]">
              Five schema types, one tool.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {SCHEMA_TYPES.map((t) => (
                <div
                  key={t.key}
                  className="rounded-2xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-5"
                >
                  <h3 className="text-[var(--ink)] text-lg font-extrabold mb-1">
                    {t.label}
                  </h3>
                  <p className="text-sm text-[var(--ink-faint)] leading-relaxed">
                    {t.short}
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
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3">
                Why this generator exists
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6 text-[var(--ink)]">
                Most sites either skip schema entirely or copy-paste a broken
                example.
              </h2>
              <div className="space-y-5 text-[var(--ink-2)] leading-relaxed text-base md:text-lg">
                <p>
                  I&apos;ve audited dozens of sites with a JSON-LD block that
                  looked right at a glance and failed validation — a missing
                  comma, an empty required field, a nested type used wrong.
                  Hand-writing structured data is exactly the kind of task that
                  benefits from a form instead of a blank text editor.
                </p>
                <p>
                  This tool builds each type from a typed field set and strips
                  empty fields automatically, so what you copy out is
                  syntactically valid every time. It still won&apos;t catch a
                  factual error — a wrong URL or a stale date — so always run
                  the output through Google&apos;s Rich Results Test before you
                  publish.
                </p>
              </div>
              <p className="mt-6 text-sm text-[var(--ink-faint)]">
                Waseem, building from Bali · info@skynetjoe.com
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/tools/aeo-audit"
                  className="text-sm font-semibold text-[var(--terracotta-aa)] hover:underline"
                >
                  → Run the AEO audit
                </a>
                <a
                  href="/tools/llms-txt-generator"
                  className="text-sm font-semibold text-[var(--terracotta-aa)] hover:underline"
                >
                  → Generate your llms.txt
                </a>
                <a
                  href="/tools/chatgpt-visibility-grader"
                  className="text-sm font-semibold text-[var(--terracotta-aa)] hover:underline"
                >
                  → Check your ChatGPT visibility
                </a>
              </div>
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
