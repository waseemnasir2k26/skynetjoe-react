import type { Metadata } from "next";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import XRay from "./XRay";
import { TECH_STACK_SIGNATURES } from "@/data/tools/tech-stack-signatures";
import { Layers, Timer, ShieldCheck, ListChecks } from "lucide-react";

const PATH = "/tools/tech-stack-xray";
const TITLE = "Free Tech Stack X-Ray — See What Any Site Runs | SkynetJoe";

const VENDOR_COUNT = TECH_STACK_SIGNATURES.length;

export const metadata: Metadata = {
  title: TITLE,
  description: `Paste any URL and fingerprint the tools it runs — CMS, ecommerce, CRM, analytics, chat, payments, and more — against a curated ${VENDOR_COUNT}-vendor signature list. See what your competitor runs.`,
  alternates: { canonical: `${SITE.url}${PATH}` },
  openGraph: {
    title: "Tech Stack X-Ray — Free Vendor Fingerprint Tool",
    description: `See what your site (or a competitor's) actually runs — real script/DOM fingerprints against ${VENDOR_COUNT} vendors, with links to each one's own current pricing page.`,
    url: `${SITE.url}${PATH}`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Stack X-Ray — See what any site runs",
    description: `Free fingerprint tool — ${VENDOR_COUNT} vendors, real detections, links to live pricing.`,
  },
};

const categories = Array.from(
  new Set(TECH_STACK_SIGNATURES.map((s) => s.category)),
);

const faqs = [
  {
    q: "How does the fingerprinting actually work?",
    a: `The tool fetches the target homepage server-side, then runs it against a curated list of ${VENDOR_COUNT} vendor signatures — known script sources (e.g. cdn.shopify.com), meta tags, cookies referenced in markup, and DOM class/attribute patterns unique to that vendor. A vendor only shows up if one of its real fingerprints matched the actual returned HTML.`,
  },
  {
    q: "Why don't you show price numbers directly?",
    a: "Because published prices change and a stale number becomes a false claim. Every detected vendor card links straight to that vendor's own current pricing page instead — the number you see is always the one the vendor is publishing right now, not one we cached and forgot to update.",
  },
  {
    q: "Can I scan a competitor's site?",
    a: "Yes — that's the intended use. Paste any public homepage URL. The scan only reads what a normal visitor's browser would load; it doesn't touch anything behind a login.",
  },
  {
    q: "Why might a tool I know is on the site not show up?",
    a: `Two reasons: (1) it's outside our ${VENDOR_COUNT}-vendor list — we cover the common CMS/ecommerce/analytics/CRM/chat/payments stack, not every SaaS on earth, or (2) it loads dynamically after a delay our single fetch doesn't wait for. Both are stated limitations, not silent guesses.`,
  },
  {
    q: "Is this a paid or free tool?",
    a: "Free, no email required. Unlike our lead-magnet tools, this one is built to be shared freely — the more sites people run it against, the more useful it is as a reference.",
  },
];

const howToSteps = [
  {
    name: "Paste a URL",
    text: "Any public homepage — yours, a client's, or a competitor's.",
  },
  {
    name: "Run the X-ray",
    text: "The server fetches the page through the same SSRF-guarded proxy behind the readiness scanner.",
  },
  {
    name: "Read the fingerprint",
    text: "Matched vendors appear grouped by category — CMS, analytics, CRM, chat, payments, and more.",
  },
  {
    name: "Check current pricing",
    text: "Every match links to that vendor's own live pricing page — never a hardcoded number.",
  },
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Tech Stack X-Ray",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${SITE.url}${PATH}`,
  description: `Free fingerprinting tool that detects up to ${TECH_STACK_SIGNATURES.length} vendors (CMS, ecommerce, CRM, analytics, chat, payments, and more) from a site's real HTML.`,
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
  name: "How to run the Tech Stack X-Ray",
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
      name: "Tech Stack X-Ray",
      item: `${SITE.url}${PATH}`,
    },
  ],
};

const heroStats = [
  { icon: Timer, label: "Instant", body: "One fetch, one fingerprint pass." },
  {
    icon: ShieldCheck,
    label: `${TECH_STACK_SIGNATURES.length} vendors`,
    body: "Curated signature list, string-matched.",
  },
  {
    icon: ListChecks,
    label: `${categories.length} categories`,
    body: "CMS, ecommerce, CRM, chat, payments, more.",
  },
];

export default function TechStackXrayPage() {
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
              <Layers className="w-3.5 h-3.5" />
              <span className="text-xs font-medium tracking-wider uppercase">
                Free · No email required
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
              See what your competitor actually runs.
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
              Paste any URL and I&apos;ll fetch the homepage server-side and
              fingerprint it against {TECH_STACK_SIGNATURES.length} real vendor
              signatures — CMS, ecommerce platform, analytics, chat widget, CRM,
              payments, scheduling, and more. Every match links to that
              vendor&apos;s own current pricing page, so the number you see is
              never stale.
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
            <XRay />
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3 text-center">
              Coverage
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-10 text-center text-[var(--ink)]">
              {categories.length} categories, {TECH_STACK_SIGNATURES.length}{" "}
              vendors.
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-[rgba(26,26,26,0.12)]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[var(--cream-2)] text-left">
                    <th className="px-4 py-3 font-semibold text-[var(--ink)]">
                      Category
                    </th>
                    <th className="px-4 py-3 font-semibold text-[var(--ink)]">
                      Vendors covered
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((cat) => {
                    const count = TECH_STACK_SIGNATURES.filter(
                      (s) => s.category === cat,
                    ).length;
                    return (
                      <tr
                        key={cat}
                        className="border-t border-[rgba(26,26,26,0.08)]"
                      >
                        <td className="px-4 py-3 text-[var(--ink)] font-medium">
                          {cat}
                        </td>
                        <td className="px-4 py-3 text-[var(--ink-2)]">
                          {count}
                        </td>
                      </tr>
                    );
                  })}
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
                Four steps, real fingerprints.
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
                  Every audit I run starts with the same question: what is this
                  site actually built on, and what tools does it already pay
                  for? Guessing wastes time and gets the recommendation wrong —
                  a site already on GoHighLevel doesn&apos;t need a second CRM
                  proposal, and a site on WooCommerce needs a different
                  automation approach than one on Shopify.
                </p>
                <p>
                  This tool automates that first pass. It fetches the target
                  homepage the same way a browser would, checks it against a
                  curated {VENDOR_COUNT}-vendor signature list spanning CMS,
                  ecommerce, site builders, frameworks, analytics, tag managers,
                  chat, CRM, payments, scheduling, forms, email capture, CRO
                  testing, session recording, CDN, and reviews — and reports
                  only what it can actually prove from the HTML.
                </p>
                <p>
                  Pricing is never hardcoded. Cached numbers go stale and become
                  false claims, so every detected vendor links straight to that
                  vendor&apos;s own live pricing page instead.
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
                  href="/tools/core-web-vitals-audit"
                  className="text-sm font-semibold text-[var(--terracotta-aa)] hover:underline"
                >
                  → Check Core Web Vitals
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
