import type { Metadata } from "next";
import Link from "next/link";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Builder from "./Builder";
import { WEBHOOK_APPS } from "@/data/tools/webhook-payloads";
import { Webhook, ShieldCheck, Zap, ArrowRight } from "lucide-react";

const PATH = "/tools/webhook-payload-builder";

export const metadata: Metadata = {
  title: "Webhook Payload Builder — free JSON payload generator · SkynetLabs",
  description:
    "Build and validate JSON payloads for GHL, Stripe, Typeform, Calendly, and Shopify webhooks. Live validation, one-click copy, no signup.",
  alternates: { canonical: `${SITE.url}${PATH}` },
  openGraph: {
    title: "Webhook Payload Builder · sample payloads + live JSON validation",
    description:
      "Sample payloads for 5 common apps, editable and live-validated, ready to paste into n8n, Postman, or curl.",
    url: `${SITE.url}${PATH}`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Webhook Payload Builder · free, no signup",
    description:
      "GHL, Stripe, Typeform, Calendly, Shopify sample payloads — build, validate, copy.",
  },
};

const faqs = [
  {
    q: "Is this a webhook payload generator I can actually test with?",
    a: "Yes. Every sample is a realistic payload shape based on each vendor's documented webhook events — placeholder IDs and emails, real field structure. Copy it straight into an n8n Webhook node's test panel, Postman, or a curl -d flag.",
  },
  {
    q: "Do you store the payloads I edit?",
    a: "No. Everything runs client-side in your browser tab. Nothing is sent anywhere, nothing is saved — refresh the page and it's gone.",
  },
  {
    q: "Why does live validation matter?",
    a: "Most webhook debugging time goes to a typo'd field name or an extra trailing comma, not the actual integration logic. Catching invalid JSON before you wire it into n8n or Zapier saves a debugging session later.",
  },
  {
    q: "Can I use this for apps not in the sample list?",
    a: "Yes — hit 'Blank canvas' and build from scratch, or paste a real payload you already have and use the validator + copy button on it.",
  },
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Webhook Payload Builder",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  url: `${SITE.url}${PATH}`,
  description:
    "Free tool to build and validate JSON webhook payloads for GoHighLevel, Stripe, Typeform, Calendly, and Shopify, with live JSON validation and one-click copy.",
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

export default function WebhookPayloadBuilderPage() {
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
              <Webhook className="w-3.5 h-3.5" />
              <span className="text-xs font-medium tracking-wider uppercase">
                Free · No signup · Runs in your browser
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
              Build the payload{" "}
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
                before you wire the automation.
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
              I&apos;ve lost hours to a Zapier or n8n step failing on a field
              name that didn&apos;t match the docs. This tool gives you real
              sample shapes for {WEBHOOK_APPS.length} common apps, a live JSON
              validator, and a one-click copy — so you test the shape before you
              touch the live integration.
            </p>
          </div>
        </div>
      </section>

      {/* TOOL */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-4xl mx-auto">
            <Builder />
          </div>
        </div>
      </section>

      {/* WHY THIS EXISTS */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-8 md:p-12">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3">
                Why this tool exists
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6 text-[var(--ink)]">
                Every automation I&apos;ve shipped started with a payload I had
                to guess at.
              </h2>
              <div className="space-y-5 text-[var(--ink-2)] leading-relaxed text-base md:text-lg">
                <p>
                  When you&apos;re wiring GoHighLevel, Stripe, Typeform,
                  Calendly, or Shopify into n8n or Zapier, the first real
                  question isn&apos;t &quot;what should the workflow do&quot; —
                  it&apos;s &quot;what does the actual webhook body look
                  like.&quot; Vendor docs are inconsistent about this, and the
                  fastest way to find out is usually to fire a test event and
                  read the raw JSON.
                </p>
                <p>
                  This tool skips that step. Pick an app, get a realistic sample
                  shape, edit it to match your own use case, and copy it
                  straight into your test panel. Live validation catches syntax
                  errors before you&apos;ve spent 20 minutes debugging a
                  workflow that was never going to receive valid JSON in the
                  first place.
                </p>
                <p>
                  It&apos;s ungated, runs entirely in your browser, and pairs
                  well with the{" "}
                  <Link
                    href="/tools/n8n-workflow-generator"
                    className="font-semibold text-[var(--terracotta-aa)] hover:underline"
                  >
                    n8n Workflow Generator
                  </Link>{" "}
                  and the{" "}
                  <Link
                    href="/tools/cron-expression-builder"
                    className="font-semibold text-[var(--terracotta-aa)] hover:underline"
                  >
                    Cron Expression Builder
                  </Link>{" "}
                  when you&apos;re scoping a build end to end.
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
                icon: Zap,
                href: "/tools/n8n-workflow-generator",
                label: "n8n Workflow Generator",
                desc: "Turn your validated payload into an importable workflow.",
              },
              {
                icon: ShieldCheck,
                href: "/tools/automation-gap-analyzer",
                label: "Automation Gap Analyzer",
                desc: "Find where manual work is costing you hours first.",
              },
              {
                icon: ArrowRight,
                href: "/discovery-call",
                label: "Book a discovery call",
                desc: "Have a real integration to wire? Let's scope it.",
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
