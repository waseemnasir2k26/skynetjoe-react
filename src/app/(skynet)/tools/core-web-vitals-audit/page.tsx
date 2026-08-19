import type { Metadata } from "next";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Audit from "./Audit";
import { Gauge, Timer, ShieldCheck, ListChecks } from "lucide-react";

const PATH = "/tools/core-web-vitals-audit";
const TITLE = "Free Core Web Vitals Mini-Audit — Real Google Data | SkynetJoe";

export const metadata: Metadata = {
  title: TITLE,
  description:
    "Mobile + desktop LCP, INP, and CLS from Google's own PageSpeed Insights API — pass/fail against Google's thresholds, plus lab performance score. Slow site, wasted ad spend.",
  alternates: { canonical: `${SITE.url}${PATH}` },
  openGraph: {
    title: "Core Web Vitals Mini-Audit — Free, Google Data Only",
    description:
      "Real LCP/INP/CLS field + lab data via Google's PageSpeed Insights API, mobile and desktop, scored against Google's own pass/fail thresholds.",
    url: `${SITE.url}${PATH}`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Core Web Vitals Mini-Audit",
    description:
      "Real Google PageSpeed Insights data — mobile + desktop, no invented numbers.",
  },
};

const faqs = [
  {
    q: "Where does this data actually come from?",
    a: "Directly from Google's PageSpeed Insights (PSI) v5 API — the same API that powers pagespeed.web.dev. We call it server-side (so an optional API key, if configured, never ships to the browser) and pass through exactly what Google returns: field data (real Chrome users, via the Chrome UX Report) when available, and lab data (a simulated Lighthouse run) as a fallback or supplement. Nothing here is estimated by us.",
  },
  {
    q: "What's the difference between field data and lab data?",
    a: "Field data is aggregated from real Chrome users who actually visited the page over the last 28 days (Chrome UX Report / CrUX) — it reflects real devices and real networks. Lab data is a single simulated run against a fixed device/network profile. Field data is the ground truth Google uses for ranking signals; lab data is a useful proxy when a page hasn't collected enough real-user traffic (common for lower-traffic and new pages).",
  },
  {
    q: "What are Google's pass/fail thresholds?",
    a: "LCP (Largest Contentful Paint): good ≤2.5s, needs improvement ≤4s, poor beyond that. INP (Interaction to Next Paint): good ≤200ms, needs improvement ≤500ms, poor beyond. CLS (Cumulative Layout Shift): good ≤0.1, needs improvement ≤0.25, poor beyond. These are Google's published Core Web Vitals thresholds, not ours.",
  },
  {
    q: "Why does this take longer than the other free tools?",
    a: "Because it's a real call to Google's PSI API for both mobile and desktop, and Google's lab test genuinely runs a Lighthouse pass against your page — that typically takes 10-20 seconds. There's no way to fake that faster without inventing numbers, which we won't do.",
  },
  {
    q: "What if I hit a quota error?",
    a: "PSI's keyless quota is shared and IP-based, so it can occasionally rate-limit under heavy shared usage. If that happens the tool tells you plainly rather than showing a fake score — try again shortly, or use the full PSI report link for a direct check.",
  },
];

const howToSteps = [
  {
    name: "Paste a page URL",
    text: "Any public URL — your homepage or a specific landing page.",
  },
  {
    name: "Run the audit",
    text: "The server calls Google's PSI API for mobile and desktop in parallel.",
  },
  {
    name: "Read the pass/fail table",
    text: "LCP, INP, CLS scored against Google's own published thresholds.",
  },
  {
    name: "Open the full report",
    text: "Every result links to the complete PageSpeed Insights report for that URL and device.",
  },
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Core Web Vitals Mini-Audit",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${SITE.url}${PATH}`,
  description:
    "Free tool that calls Google's PageSpeed Insights API for mobile and desktop LCP, INP, CLS field/lab data, scored against Google's published Core Web Vitals thresholds.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
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
  name: "How to run the Core Web Vitals Mini-Audit",
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
      name: "Core Web Vitals Mini-Audit",
      item: `${SITE.url}${PATH}`,
    },
  ],
};

const heroStats = [
  {
    icon: Timer,
    label: "10-20s",
    body: "Real Google PSI call, mobile + desktop.",
  },
  {
    icon: ShieldCheck,
    label: "Google data only",
    body: "Field (CrUX) + lab, no invented numbers.",
  },
  {
    icon: ListChecks,
    label: "3 metrics",
    body: "LCP, INP, CLS vs Google's own thresholds.",
  },
];

const thresholdRows = [
  {
    metric: "LCP — Largest Contentful Paint",
    good: "≤ 2.5s",
    ni: "≤ 4.0s",
    poor: "> 4.0s",
  },
  {
    metric: "INP — Interaction to Next Paint",
    good: "≤ 200ms",
    ni: "≤ 500ms",
    poor: "> 500ms",
  },
  {
    metric: "CLS — Cumulative Layout Shift",
    good: "≤ 0.10",
    ni: "≤ 0.25",
    poor: "> 0.25",
  },
];

export default function CoreWebVitalsAuditPage() {
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
              <Gauge className="w-3.5 h-3.5" />
              <span className="text-xs font-medium tracking-wider uppercase">
                Free · Real Google PSI data
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
              A slow site is wasted ad spend.
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
              Paste a URL and I&apos;ll query Google&apos;s own PageSpeed
              Insights API for mobile and desktop — real Core Web Vitals field
              data where Google has enough real-user traffic, real lab data
              otherwise. Every click you pay for lands on this page; a slow LCP
              or a janky CLS is money leaking out of that click before it
              converts.
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
            <Audit />
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3 text-center">
              Google&apos;s own thresholds
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-10 text-center text-[var(--ink)]">
              What pass, needs-work, and fail mean.
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-[rgba(26,26,26,0.12)]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[var(--cream-2)] text-left">
                    <th className="px-4 py-3 font-semibold text-[var(--ink)]">
                      Metric
                    </th>
                    <th className="px-4 py-3 font-semibold text-[#2f8f5b]">
                      Good
                    </th>
                    <th className="px-4 py-3 font-semibold text-[#c66b3f]">
                      Needs improvement
                    </th>
                    <th className="px-4 py-3 font-semibold text-[#a53939]">
                      Poor
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {thresholdRows.map((r) => (
                    <tr
                      key={r.metric}
                      className="border-t border-[rgba(26,26,26,0.08)]"
                    >
                      <td className="px-4 py-3 text-[var(--ink)] font-medium">
                        {r.metric}
                      </td>
                      <td className="px-4 py-3 text-[var(--ink-2)]">
                        {r.good}
                      </td>
                      <td className="px-4 py-3 text-[var(--ink-2)]">{r.ni}</td>
                      <td className="px-4 py-3 text-[var(--ink-2)]">
                        {r.poor}
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
                Why this exists
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6 text-[var(--ink)]">
                Speed is a conversion metric, not a vanity one.
              </h2>
              <div className="space-y-5 text-[var(--ink-2)] leading-relaxed text-base">
                <p>
                  Core Web Vitals aren&apos;t an SEO checkbox — they measure
                  whether a real visitor sees your content fast (LCP), whether
                  the page responds when they tap something (INP), and whether
                  things jump around while they&apos;re trying to read or click
                  (CLS). Every one of those failures is a moment where a paid or
                  organic visitor gives up before your offer even loads.
                </p>
                <p>
                  This tool doesn&apos;t simulate anything of its own — it calls
                  Google&apos;s PageSpeed Insights API directly and reports back
                  exactly what Google measured, labeled clearly as field data
                  (real Chrome users) or lab data (a simulated run), scored
                  against Google&apos;s own published thresholds. If your
                  site&apos;s numbers are green, that&apos;s real. If
                  they&apos;re red, that&apos;s real too.
                </p>
              </div>
              <p className="mt-6 text-sm text-[var(--ink-faint)]">
                Waseem, building from Bali · info@skynetjoe.com
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/tools/automation-readiness-scanner"
                  className="text-sm font-semibold text-[var(--terracotta-aa)] hover:underline"
                >
                  → Run the Automation Readiness Scanner
                </a>
                <a
                  href="/tools/tech-stack-xray"
                  className="text-sm font-semibold text-[var(--terracotta-aa)] hover:underline"
                >
                  → See what your site runs
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
