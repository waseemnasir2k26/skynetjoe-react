import type { Metadata } from "next";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Scanner from "./Scanner";
import { AUTOMATION_CHECKS } from "@/data/tools/automation-readiness";
import { ScanSearch, Timer, ShieldCheck, ListChecks } from "lucide-react";

const PATH = "/tools/automation-readiness-scanner";
const TITLE =
  "Free Automation Readiness Scanner — Find Your Site's Lead Gaps | SkynetJoe";

export const metadata: Metadata = {
  title: TITLE,
  description:
    "Paste a URL. We fetch the homepage server-side and check for a contact form, chat widget, booking, pixels, schema, WhatsApp and click-to-call — real detections only, scored 0-100.",
  alternates: { canonical: `${SITE.url}${PATH}` },
  openGraph: {
    title: "Automation Readiness Scanner — Free URL Checker",
    description:
      "Real, fetched-and-detected checks — not a questionnaire. Find exactly which automation surfaces (form, chat, booking, pixels, schema) your site is missing.",
    url: `${SITE.url}${PATH}`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Automation Readiness Scanner — Free URL Checker",
    description:
      "Paste a URL, get a real 0-100 automation-readiness score from actual page signals.",
  },
};

const faqs = [
  {
    q: "Is this a real scan or a self-reported checklist?",
    a: "Real scan. The tool fetches your homepage server-side through a hardened proxy and checks the actual returned HTML for real signals — a <form> tag, known chat-widget script sources, booking-widget embeds, pixel snippets, JSON-LD schema, WhatsApp links, and tel: links. Nothing here is self-reported or guessed.",
  },
  {
    q: "Why does it only check the homepage?",
    a: "One fetch keeps the tool instant and free, and the homepage is where most of these signals live anyway (chat widgets, pixels, and analytics tags are almost always site-wide includes). If your contact form or booking widget lives on a different page, run the scanner against that page's URL directly.",
  },
  {
    q: "What counts as 'detected'?",
    a: "A positive string/regex match against the fetched HTML — e.g. a script tag pointing at a known chat-widget CDN, or a tel: link in an <a href>. If a tool loads only after a click or a delayed script injection that our single fetch doesn't capture, it can show as a false negative — that's a known limitation of a single-request scan, not a guess dressed up as a fact.",
  },
  {
    q: "What do you collect?",
    a: "The URL you scan and the resulting score/gaps stay in your browser until you choose to unlock the full report, which asks for an email. That email goes to my CRM so I can follow up. No account, no name, no company required.",
  },
  {
    q: "Can this scan a site behind login or a staging password?",
    a: "No — the proxy only fetches what a normal anonymous visitor (and a search bot) would see. If your homepage requires auth, the scan will fail with a fetch error rather than fake a result.",
  },
];

const howToSteps = [
  {
    name: "Paste your homepage URL",
    text: "Enter your domain — https:// is added automatically if you leave it off.",
  },
  {
    name: "Run the scan",
    text: "The server fetches your homepage through a hardened proxy (SSRF-guarded, 10s timeout, 2MB cap) and reads the raw HTML.",
  },
  {
    name: "Read the free preview",
    text: "See your 0-100 score and the top 3 highest-weighted gaps immediately.",
  },
  {
    name: "Unlock the full report",
    text: "Enter your email to see every detected signal, every gap, and what an automation would do to close each one.",
  },
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Automation Readiness Scanner",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${SITE.url}${PATH}`,
  description:
    "Free tool that fetches a homepage server-side and scores automation readiness 0-100 across contact form, chat widget, booking, pixels, analytics, schema, email capture, WhatsApp, and click-to-call detections.",
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

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to run the Automation Readiness Scanner",
  step: howToSteps.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.name,
    text: s.text,
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    {
      "@type": "ListItem",
      position: 2,
      name: "Free Tools",
      item: `${SITE.url}/tools`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Automation Readiness Scanner",
      item: `${SITE.url}${PATH}`,
    },
  ],
};

const heroStats = [
  {
    icon: Timer,
    label: "Instant",
    body: "One URL, one server-side fetch, one score.",
  },
  {
    icon: ShieldCheck,
    label: "Real detections",
    body: "Every result is a string match on real HTML.",
  },
  {
    icon: ListChecks,
    label: "9 checks",
    body: "Form, chat, booking, pixels, schema, and more.",
  },
];

export default function AutomationReadinessScannerPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={howToSchema} />
      <JsonLd data={breadcrumbSchema} />

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
              <ScanSearch className="w-3.5 h-3.5" />
              <span className="text-xs font-medium tracking-wider uppercase">
                Free URL scan · Real detections · Email to unlock
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
                marginBottom: 20,
              }}
            >
              Is your site catching leads, or just displaying them?
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
              Paste a URL and I&apos;ll fetch the homepage server-side, then
              check it for the same nine automation signals I look for on every
              audit: contact form, chat widget, booking, ad pixels, analytics,
              schema, email capture, WhatsApp, and click-to-call. Every result
              is a real match against the actual page — no self-reported
              checklist.
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

      <section className="section">
        <div className="container-x">
          <div className="max-w-3xl mx-auto">
            <Scanner />
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3 text-center">
              What we check
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-10 text-center text-[var(--ink)]">
              9 checks, weighted by impact.
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-[rgba(26,26,26,0.12)]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[var(--cream-2)] text-left">
                    <th className="px-4 py-3 font-semibold text-[var(--ink)]">
                      Check
                    </th>
                    <th className="px-4 py-3 font-semibold text-[var(--ink)]">
                      Score weight
                    </th>
                    <th className="px-4 py-3 font-semibold text-[var(--ink)]">
                      Detection method
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {AUTOMATION_CHECKS.map((c) => (
                    <tr
                      key={c.id}
                      className="border-t border-[rgba(26,26,26,0.08)]"
                    >
                      <td className="px-4 py-3 text-[var(--ink)] font-medium">
                        {c.label}
                      </td>
                      <td className="px-4 py-3 text-[var(--ink-2)]">
                        {c.weight} pts
                      </td>
                      <td className="px-4 py-3 text-[var(--ink-faint)]">
                        Real HTML string/regex match
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-8 md:p-12">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3">
                How it works
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6 text-[var(--ink)]">
                Four steps, no guesswork.
              </h2>
              <ol className="space-y-4">
                {howToSteps.map((s, i) => (
                  <li key={s.name} className="flex gap-4">
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--terracotta)]/15 text-xs font-bold text-[var(--terracotta-aa)]">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-[var(--ink)]">
                        {s.name}
                      </p>
                      <p className="text-sm text-[var(--ink-2)] mt-0.5">
                        {s.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-8 space-y-5 text-[var(--ink-2)] leading-relaxed text-base">
                <p>
                  I built this scanner from the same nine signals I check on
                  every automation audit I run for service businesses. Most
                  sites lose leads not because their offer is weak, but because
                  the path from &quot;interested visitor&quot; to &quot;captured
                  contact&quot; has silent gaps — no chat widget to catch the
                  visitor who won&apos;t fill out a form, no booking link so a
                  phone call has to happen first, no pixel so ad spend
                  can&apos;t retarget.
                </p>
                <p>
                  This tool fetches your homepage the same way a bot or a
                  first-time visitor would, checks it against those nine
                  signals, and scores what it finds — nothing more. If a signal
                  loads dynamically after a delay our single fetch doesn&apos;t
                  wait for, it can show as a false negative; that limitation is
                  stated plainly above rather than hidden behind a
                  confident-looking score.
                </p>
              </div>
              <p className="mt-6 text-sm text-[var(--ink-faint)]">
                Waseem, building from Bali · info@skynetjoe.com
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/tools/tech-stack-xray"
                  className="text-sm font-semibold text-[var(--terracotta-aa)] hover:underline"
                >
                  → See what tools your site (or a competitor&apos;s) runs
                </a>
                <a
                  href="/tools/core-web-vitals-audit"
                  className="text-sm font-semibold text-[var(--terracotta-aa)] hover:underline"
                >
                  → Check your Core Web Vitals
                </a>
                <a
                  href="/tools/aeo-audit"
                  className="text-sm font-semibold text-[var(--terracotta-aa)] hover:underline"
                >
                  → Run the AEO Audit
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                  className="group rounded-2xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] px-5 py-4"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-[var(--ink)] font-semibold list-none">
                    <span>{f.q}</span>
                    <span className="text-[var(--terracotta-aa)] text-xl leading-none">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm md:text-base text-[var(--ink-2)] leading-relaxed">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
            <p className="mt-8 text-center text-xs text-[var(--ink-faint)]">
              Updated August 2026
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
