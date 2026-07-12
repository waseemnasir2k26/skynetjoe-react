import type { Metadata } from "next";
import Link from "next/link";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Builder from "./Builder";
import { Clock, Webhook, Workflow, ArrowRight } from "lucide-react";

const PATH = "/tools/cron-expression-builder";

export const metadata: Metadata = {
  title: "Cron Expression Generator — plain-English to cron · SkynetLabs",
  description:
    "Pick a schedule in plain English, get a valid cron expression plus an n8n Schedule Trigger config — including the field:hours fix for the triggerAtMinute gotcha.",
  alternates: { canonical: `${SITE.url}${PATH}` },
  openGraph: {
    title: "Cron Expression Builder · schedule to cron in seconds",
    description:
      "Every-N-minutes, hourly, daily, weekly, or monthly — pick it visually, copy the cron expression and the matching n8n node config.",
    url: `${SITE.url}${PATH}`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cron Expression Generator · free, no signup",
    description:
      "Human schedule to cron syntax, with n8n Schedule Trigger config included.",
  },
};

const faqs = [
  {
    q: "What is a cron expression?",
    a: 'A 5-field string — minute, hour, day of month, month, day of week — that tells a scheduler exactly when to run something. "0 9 * * 1-5" means 9:00am every weekday. This tool builds that string from plain-English choices so you don\'t have to memorize field order.',
  },
  {
    q: "Why does the n8n config mention a triggerAtMinute gotcha?",
    a: 'n8n\'s Schedule Trigger node has a field: "minutes" interval mode that fires every N minutes from whenever the workflow activated — it does not respect triggerAtMinute, so you can\'t land on a clean clock boundary that way. For anything that needs an exact minute (a daily 9:00am run, a specific weekly slot), use field: "hours"/"days"/"weeks"/"months" with triggerAtHour + triggerAtMinute instead, or paste the cronExpression interval this tool generates.',
  },
  {
    q: "Does this work for Zapier, Make, or crontab too?",
    a: "The cron expression itself is a standard format — it works anywhere that accepts raw cron syntax, including crontab, GitHub Actions, and most schedulers. The node-config JSON is n8n-specific.",
  },
  {
    q: "Is anything sent to a server?",
    a: "No. The schedule and expression are built entirely in your browser. Nothing is logged or stored.",
  },
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Cron Expression Builder",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  url: `${SITE.url}${PATH}`,
  description:
    "Free tool that converts a plain-English schedule into a valid cron expression and a matching n8n Schedule Trigger node configuration.",
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

export default function CronExpressionBuilderPage() {
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
              <Clock className="w-3.5 h-3.5" />
              <span className="text-xs font-medium tracking-wider uppercase">
                Free · No signup · n8n config included
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
              &quot;Every weekday at 9am&quot;{" "}
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
                → a real cron expression.
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
              Pick a frequency, set the time, done. You get the standard 5-field
              cron string plus a ready-to-paste n8n Schedule Trigger config —
              and the one n8n scheduling gotcha that trips up minute-precision
              runs.
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
                I built this after debugging the same n8n scheduling bug twice.
              </h2>
              <div className="space-y-5 text-[var(--ink-2)] leading-relaxed text-base md:text-lg">
                <p>
                  Cron syntax is simple once you know it and completely
                  unmemorable if you touch it once a quarter. Five fields, wrong
                  order, and your workflow fires at 3am instead of 9am — or
                  worse, fires every minute because a wildcard landed somewhere
                  it shouldn&apos;t have.
                </p>
                <p>
                  The bigger trap is specific to n8n: the Schedule Trigger
                  node&apos;s &quot;every N minutes&quot; interval mode silently
                  ignores the exact-minute setting. It just fires every N
                  minutes from activation time, not on the clock. I lost an
                  afternoon to that once. This tool bakes the fix — field:
                  &quot;hours&quot; with explicit triggerAtHour /
                  triggerAtMinute — directly into the generated config.
                </p>
                <p>
                  Pair it with the{" "}
                  <Link
                    href="/tools/webhook-payload-builder"
                    className="font-semibold text-[var(--terracotta-aa)] hover:underline"
                  >
                    Webhook Payload Builder
                  </Link>{" "}
                  and the{" "}
                  <Link
                    href="/tools/n8n-workflow-generator"
                    className="font-semibold text-[var(--terracotta-aa)] hover:underline"
                  >
                    n8n Workflow Generator
                  </Link>{" "}
                  when you&apos;re scoping a scheduled automation end to end.
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
                icon: Webhook,
                href: "/tools/webhook-payload-builder",
                label: "Webhook Payload Builder",
                desc: "Build the trigger payload for the workflow this runs.",
              },
              {
                icon: Workflow,
                href: "/tools/n8n-workflow-generator",
                label: "n8n Workflow Generator",
                desc: "Get the full workflow JSON, not just the schedule.",
              },
              {
                icon: ArrowRight,
                href: "/discovery-call",
                label: "Book a discovery call",
                desc: "Have a scheduled automation to build? Let's scope it.",
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
