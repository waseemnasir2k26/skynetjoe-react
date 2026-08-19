import type { Metadata } from "next";
import Link from "next/link";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import Generator from "./Generator";
import { N8N_TEMPLATES } from "@/data/tools/n8n-templates";
import { Download, ShieldCheck, Sparkles, Workflow } from "lucide-react";

const PATH = "/tools/n8n-workflow-generator";

const breadcrumbListSchema = breadcrumbSchema([
  { name: "Home", url: SITE.url },
  { name: "Tools", url: `${SITE.url}/tools` },
  { name: "n8n Workflow Generator", url: `${SITE.url}${PATH}` },
]);

export const metadata: Metadata = {
  title: "n8n Workflow Generator — Free n8n Templates",
  description:
    "Pick a trigger and an action, get an importable n8n workflow JSON in seconds. 12 real recipes — GHL, Slack, Stripe, Gmail and more. Free.",
  alternates: { canonical: `${SITE.url}${PATH}` },
  openGraph: {
    title: "n8n Workflow Generator — free n8n templates, instant download",
    description:
      "Trigger app → action app → ready-to-import n8n workflow JSON. 12 real recipes, no signup wall until download.",
    url: `${SITE.url}${PATH}`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "n8n Workflow Generator — free n8n templates",
    description:
      "Pick a trigger, pick an action, download a valid n8n workflow JSON. 12 real recipes.",
  },
};

const faqs = [
  {
    q: "Is the downloaded JSON actually valid n8n workflow syntax?",
    a: "Yes. Every template is a real n8n workflow object — nodes with real n8n-nodes-base type identifiers, typeVersion, parameters, and a connections graph chaining trigger to action. Open n8n, go to Workflows → Import from File (or paste it via the three-dot menu → Import from JSON), and the nodes drop straight onto the canvas.",
  },
  {
    q: "Do the templates include my API keys or credentials?",
    a: "No, and they never will. Nodes that need auth (Slack, Gmail, HubSpot, Stripe, Twilio, generic HTTP calls) carry a placeholder credential name only. On import, n8n prompts you to connect your own credential to each node — nothing here is a working secret.",
  },
  {
    q: "What if there's no exact recipe for my trigger + action combo?",
    a: "The generator matches the closest available recipe for your trigger app and flags it with a 'closest match' note instead of failing. You still get a valid, importable JSON — just double-check the action nodes match what you actually want before you connect credentials.",
  },
  {
    q: "Why do I need to enter my email to download?",
    a: "The wizard, the recipe preview, and the full JSON preview are all free to browse with no gate. The email unlock only sits in front of the actual file download, so I know who's using the tool and can follow up if you want a custom build.",
  },
];

const howItWorks = [
  {
    icon: Workflow,
    title: "1. Pick a trigger",
    body: "Webhook, Gmail, Stripe, Typeform, Google Sheets, Calendly, and more.",
  },
  {
    icon: Sparkles,
    title: "2. Pick an action",
    body: "Slack, GoHighLevel, HubSpot, email, SMS — whatever should happen next.",
  },
  {
    icon: Download,
    title: "3. Download the JSON",
    body: "Import straight into n8n. Placeholder credentials only, never real keys.",
  },
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "n8n Workflow Generator",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  url: `${SITE.url}${PATH}`,
  description:
    "Free tool that generates valid, importable n8n workflow JSON from a trigger app and action app pick. 12 real automation recipes, no fabricated credentials.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
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

export default function N8nWorkflowGeneratorPage() {
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
              <Workflow className="w-3.5 h-3.5" />
              <span className="text-xs font-medium tracking-wider uppercase">
                Free · No signup to browse · {N8N_TEMPLATES.length} recipes
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
              Pick a trigger.{" "}
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
                Pick an action.
              </span>{" "}
              Download the n8n workflow.
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
              n8n is the open-source automation platform that connects your apps
              into visual workflows — a webhook fires, a form gets submitted, a
              payment lands, and n8n runs the next steps for you without a human
              in the loop. This generator skips the blank canvas: pick what
              triggers the automation and what should happen next, and you get a
              real, importable workflow JSON.
            </p>
            <p
              style={{
                fontSize: 15,
                color: "var(--ink-2)",
                lineHeight: 1.6,
                maxWidth: "56ch",
              }}
            >
              Every recipe below is based on real automation patterns I&apos;ve
              built and refined through client work — lead capture, inbox
              triage, billing, e-commerce follow-up. Import is one click in n8n:
              Workflows → Import from File, or paste the JSON straight in.
              Credentials are never included; you connect your own on import.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
              {howItWorks.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] px-4 py-3"
                >
                  <div className="flex items-center gap-2 text-[var(--ink)]">
                    <Icon className="w-4 h-4 text-[var(--terracotta-aa)]" />
                    <span className="text-sm font-semibold">{title}</span>
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
          <div className="max-w-4xl mx-auto">
            <Generator />
          </div>
        </div>
      </section>

      {/* WHEN TO AUTOMATE */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-8 md:p-12 backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3">
                When it&apos;s actually worth automating
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6 text-[var(--ink)]">
                Automate the step you do the same way every time.
              </h2>
              <div className="space-y-5 text-[var(--ink-2)] leading-relaxed text-base md:text-lg">
                <p>
                  If a task follows the same trigger and the same steps every
                  single time — a form comes in, you copy it into your CRM, you
                  Slack the team — that&apos;s an n8n workflow, not a job. The
                  templates above are the dozen versions of that pattern I get
                  asked to build most often.
                </p>
                <p>
                  What n8n workflows are good for: moving data between tools the
                  instant an event happens, running the same multi-step sequence
                  without someone remembering to do it, and gluing together apps
                  that don&apos;t natively talk to each other. What they&apos;re
                  not good for: decisions that need real judgment call by call —
                  that&apos;s where you keep a human in the loop or add an AI
                  classification step like the Gmail recipe above.
                </p>
                <p>
                  Importing is the easy part. Open your n8n instance, go to
                  Workflows in the left nav, click Import from File (or use the
                  three-dot menu → Import from JSON if you&apos;d rather paste),
                  and the trigger + action nodes land on the canvas ready to
                  connect your credentials.
                </p>
              </div>
              <p className="mt-6 text-sm text-[var(--ink-faint)]">
                Waseem, building from Bali · info@skynetjoe.com
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
                <ShieldCheck className="h-5 w-5 text-[var(--terracotta-aa)] mb-2" />
                <h3 className="text-[var(--ink)] font-extrabold mb-1">
                  Automation Gap Analyzer
                </h3>
                <p className="text-sm text-[var(--ink-faint)]">
                  Find where your ops lose time and money before you build.
                </p>
              </Link>
              <Link
                href="/tools/webhook-payload-builder"
                className="rounded-2xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-5 transition hover:border-[var(--terracotta)]/50"
              >
                <Workflow className="h-5 w-5 text-[var(--terracotta-aa)] mb-2" />
                <h3 className="text-[var(--ink)] font-extrabold mb-1">
                  Webhook Payload Builder
                </h3>
                <p className="text-sm text-[var(--ink-faint)]">
                  Build and validate a JSON payload before you wire the
                  automation.
                </p>
              </Link>
              <Link
                href="/tools/ghl-snapshot-planner"
                className="rounded-2xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-5 transition hover:border-[var(--terracotta)]/50"
              >
                <Sparkles className="h-5 w-5 text-[var(--terracotta-aa)] mb-2" />
                <h3 className="text-[var(--ink)] font-extrabold mb-1">
                  GHL Snapshot Planner
                </h3>
                <p className="text-sm text-[var(--ink-faint)]">
                  Plan your GoHighLevel pipelines and tags before you build.
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
              Need something the template library doesn&apos;t cover?
            </h2>
            <p className="text-[var(--ink-2)] mb-6 max-w-xl mx-auto">
              These 12 recipes cover the automations I get asked for most. If
              yours is more custom — multi-branch logic, a real AI agent, a
              legacy system with no API — that&apos;s a build, not a download.
            </p>
            <Link
              href="/discovery-call"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-semibold text-[var(--cream-3)] shadow-lg transition-transform hover:scale-[1.02] sm:text-base"
              style={{
                background: "var(--terracotta)",
                boxShadow: "0 10px 32px rgba(198,107,63,0.25)",
              }}
            >
              Book a discovery call
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
