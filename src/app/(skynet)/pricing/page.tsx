import type { Metadata } from "next";
import Link from "next/link";
import { SITE, DEFAULT_OG_IMAGES, twitterFromOpenGraph } from "@/lib/site";
import { SERVICE_PRICING } from "@/lib/service-pricing";
import JsonLd from "@/components/JsonLd";
import ServicePricingTabs from "@/components/pricing/ServicePricingTabs";
import PricingCalculator from "@/components/pricing/PricingCalculator";

// Derive the true price floor/ceiling straight from the per-service tier data
// so the schema can never drift from what the page actually publishes. Every
// tier (one-time or monthly) is a real USD entry point, so all are eligible.
const ALL_TIER_PRICES = SERVICE_PRICING.flatMap((s) =>
  s.tiers.map((t) => t.price),
);
const MIN_PRICE = Math.min(...ALL_TIER_PRICES);
const MAX_PRICE = Math.max(...ALL_TIER_PRICES);

// Lowest one-time tier across all services = the honest "starting from" Offer.
const ONE_TIME_PRICES = SERVICE_PRICING.flatMap((s) =>
  s.tiers.filter((t) => t.cadence !== "monthly").map((t) => t.price),
);
const MIN_ONE_TIME = Math.min(...ONE_TIME_PRICES);
const MAX_ONE_TIME = Math.max(...ONE_TIME_PRICES);

// Lowest real monthly retainer across all services (some Custom tiers ARE
// monthly products — the FAQ says we don't run subscriptions *on a one-time
// fee*, retainers are a separate, explicitly-monthly product).
const MONTHLY_PRICES = SERVICE_PRICING.flatMap((s) =>
  s.tiers.filter((t) => t.cadence === "monthly").map((t) => t.price),
);
const MIN_MONTHLY = Math.min(...MONTHLY_PRICES);

export const metadata: Metadata = {
  title: "Pricing — Public, honest, no 'request a quote'",
  description:
    "Transparent per-service pricing across 16 SkynetLabs services. Three tiers each, optional add-ons, live stack calculator. No hidden enterprise tier, no discovery dance.",
  alternates: { canonical: `${SITE.url}/pricing` },
  openGraph: {
    title: "SkynetLabs Pricing — public, per-service, calculator-backed",
    description:
      "16 services × 3 tiers each. Live calculator. Public prices. No quote form.",
    url: `${SITE.url}/pricing`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: twitterFromOpenGraph({
    title: "SkynetLabs Pricing — public, per-service, calculator-backed",
    description:
      "16 services × 3 tiers each. Live calculator. Public prices. No quote form.",
  }),
};

const priceSchema = {
  "@context": "https://schema.org",
  "@type": "PriceSpecification",
  name: `${SITE.brand} Pricing`,
  url: `${SITE.url}/pricing`,
  description:
    "Per-service pricing across 16 services, 3 tiers each (Starter / Pro / Custom), plus optional add-ons. Live calculator on page.",
  priceCurrency: "USD",
  // Derived from SERVICE_PRICING tiers — never hand-keyed.
  minPrice: MIN_PRICE,
  maxPrice: MAX_PRICE,
  provider: { "@id": `${SITE.url}/#organization` },
};

const offerCatalog = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: `${SITE.brand} Service Packages`,
  url: `${SITE.url}/pricing`,
  itemListElement: [
    {
      // One-time project work — the honest floor/ceiling of the one-off tiers.
      // No unitText/cadence: these are one-time Offers, matching the FAQ
      // ("we don't run subscriptions on a one-time fee").
      "@type": "Offer",
      name: "Project build (one-time, per service)",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "USD",
        minPrice: MIN_ONE_TIME,
        maxPrice: MAX_ONE_TIME,
      },
      description:
        "Fixed-scope one-time build across any of 16 services — Starter, Pro and one-time Custom tiers. Single payment, 3-21 day ship.",
    },
    {
      // Monthly retainers ARE a real, separately-priced product — so this
      // (and only this) Offer carries a MONTH UnitPriceSpecification.
      "@type": "Offer",
      name: "Monthly retainer (per service)",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: MIN_MONTHLY,
        priceCurrency: "USD",
        unitText: "MONTH",
      },
      description:
        "Ongoing live-ops retainer for services that offer one — billed monthly, separate from one-time project fees.",
    },
  ],
};

// Smaller fixed-scope wedges. Each is a single deliverable, 1-2 weeks, no
// retainer. The Audit is the recommended low-friction entry point.
const MICROS = [
  {
    name: "Audit",
    detail: "Site + stack + AEO",
    price: 497,
    window: "Ships in 3 days",
    features: [
      "Full site + stack teardown",
      "AEO/SEO gap report",
      "Prioritised fix list",
    ],
    featured: true,
  },
  {
    name: "Voice profile",
    detail: "Locked tone",
    price: 997,
    window: "Ships in 3-5 days",
    features: [
      "Brand voice workshop",
      "Reusable prompt pack",
      "AI-tell linter run",
    ],
  },
  {
    name: "n8n smoke-test build",
    detail: "One proof workflow",
    price: 750,
    window: "Ships in 3-5 days",
    features: [
      "1 production workflow",
      "Error handling wired",
      "Loom walkthrough",
    ],
  },
  {
    name: "AEO content sprint",
    detail: "10 posts",
    price: 1200,
    window: "Ships in 5-7 days",
    features: [
      "10 AEO-tuned posts",
      "Keyword + entity research",
      "Schema blocks",
    ],
  },
  {
    name: "GoHighLevel setup",
    detail: "Account + 1 funnel",
    price: 1500,
    window: "Ships in 5-7 days",
    features: [
      "GHL onboarding",
      "1 funnel + pipeline",
      "Starter template pack",
    ],
  },
  {
    name: "Content engine v1",
    detail: "Pipeline build",
    price: 2500,
    window: "Ships in 7-10 days",
    features: ["Auto-publish pipeline", "Voice-locked drafts", "Team SOP"],
  },
];

const FAQS = [
  {
    q: "Why isn't there an enterprise tier?",
    a: 'Because every "enterprise tier" we\'ve ever been quoted was a generic Flagship with a different number on it. If your scope genuinely needs more than the Pro can hold, we quote the delta on top — line by line, in writing, before kickoff. No mystery tier.',
  },
  {
    q: "Can I split the Pro into two payments?",
    a: "Yes. Default is 50% at kickoff and 50% at ship. For larger Pro scopes (multi-site or multi-brand), we offer three payments tied to milestones. We don't run subscriptions on a one-time fee.",
  },
  {
    q: "What happens if you go over the ship window?",
    a: "If the delay is on us, the retainer month is free or we credit the equivalent hours on a one-time build. If the delay is on your side (asset hand-off, account access, brand approval), we pause the clock with a written log — no surprise extension fees. The ship window in your contract is the one we hit.",
  },
  {
    q: "Do you offer revenue-share or equity in place of cash?",
    a: "No. We've taken three rev-share deals and zero ended cleanly. Pricing is cash-affordable at the size of business that benefits — under that line, the work doesn't pay back fast enough either way.",
  },
  {
    q: "Can I see the contract before I send a brief?",
    a: "Yes. Drop a one-line request via /contact and we send the standard MSA + SOW template before you commit. It's two pages. Everyone reads it.",
  },
  {
    q: "What payment methods do you accept?",
    a: 'Wise, Payoneer, PayPal, Stripe invoice, direct USD wire, or bank transfer in IDR / GBP / EUR / SAR / AED. Crypto on request. We invoice from a registered entity — no PayPal "friends and family" hacks.',
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function PricingPage() {
  return (
    <>
      <JsonLd data={priceSchema} />
      <JsonLd data={offerCatalog} />
      <JsonLd data={faqSchema} />

      <div className="sky">
        {/* HERO — skyv3 */}
        <section className="hero">
          <div className="wrap">
            <div className="hero-inner">
              <div className="hero-eyebrow">
                <span className="pulse"></span>
                Public pricing&nbsp;·{" "}
                <strong>no sales call to see a number</strong>
              </div>

              <h1>
                See the price before we ever <em>touch your calendar.</em>
              </h1>

              <p className="hero-sub">
                16 services. 3 tiers each. Optional add-ons and a live
                calculator below.{" "}
                <strong>Public, source-controlled pricing</strong> — and the
                repo lands in your GitHub on launch day. No quote form, no
                &ldquo;request pricing&rdquo; wall.
              </p>

              <div className="cta-row">
                <Link
                  href="/discovery-call"
                  className="btn-primary"
                  data-meta-event="Schedule"
                  data-meta-name="pricing-book-audit"
                >
                  Book a free 30-min audit →
                </Link>
                <Link href="/case-studies" className="btn-line">
                  See real results
                </Link>
              </div>

              <div className="featured-in">
                <span className="featured-lbl">Featured</span>
                <span>180+ workflows</span>
                <span>40+ websites</span>
                <span>9 countries</span>
                <span>5-14d ship</span>
              </div>
            </div>
          </div>
        </section>

        {/* SINGLE PRICING SECTION (interactive per-service tabs) */}
        <ServicePricingTabs />

        {/* CALCULATOR */}
        <PricingCalculator />

        {/* VULNERABILITY QUOTE */}
        <section className="section tinted">
          <div className="wrap">
            <blockquote
              style={{
                maxWidth: 760,
                margin: "0 auto",
                padding: "32px 36px",
                background: "var(--cream-3)",
                borderLeft: "3px solid var(--terracotta)",
                borderRadius: 4,
                boxShadow: "0 12px 32px rgba(26, 26, 26, 0.04)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 20,
                  lineHeight: 1.5,
                  color: "var(--ink)",
                  fontWeight: 500,
                }}
              >
                Most agencies hide the price because the price doesn&apos;t
                match the work. I&apos;ve been on the other side of three of
                those proposals. Every one ended in renegotiation. I&apos;d
                rather quote you out of a deal than nickel you through one.
              </p>
              <footer
                style={{
                  marginTop: 16,
                  fontFamily: "var(--font-mono-plex), monospace",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.16em",
                  color: "var(--terracotta-aa)",
                  fontWeight: 700,
                }}
              >
                — Waseem Nasir
              </footer>
            </blockquote>
          </div>
        </section>

        {/* MICROS — skyv3 pricing-row / price-cell */}
        <section className="section">
          <div className="wrap">
            <div className="section-head">
              <span className="section-kicker">Smaller engagements</span>
              <h2>
                Need just one thing? <em>Pick a micro.</em>
              </h2>
              <p className="section-sub">
                Six fixed-scope wedges. Each is a single deliverable, 1-2 weeks,
                no retainer commitment. Use one to test the working relationship
                before scaling.
              </p>
            </div>

            <div className="pricing-row">
              {MICROS.map((m) => (
                <div
                  key={m.name}
                  className={`price-cell${m.featured ? " featured" : ""}`}
                >
                  {m.featured && (
                    <span className="price-badge">Best value</span>
                  )}
                  <div className="price-tier">{m.name}</div>
                  <div className="price-window">{m.detail}</div>
                  <div className="price-amount">
                    ${m.price.toLocaleString("en-US")}
                  </div>
                  <div className="price-recur">{m.window}</div>
                  <ul className="price-list">
                    {m.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <Link href="/discovery-call" className="price-cta">
                    Start this →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ — skyv3 faq-wrap */}
        <section className="section tinted">
          <div className="wrap">
            <div
              className="section-head"
              style={{ marginInline: "auto", textAlign: "center" }}
            >
              <span className="section-kicker">FAQ</span>
              <h2 style={{ marginInline: "auto" }}>
                Pricing questions <em>we get often.</em>
              </h2>
            </div>
            <div className="faq-wrap">
              {FAQS.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CLOSER — skyv3 */}
        <section className="closer">
          <span className="closer-scarcity">
            180+ workflows · 40+ websites · 9 countries
          </span>
          <h2>
            Send a brief. <em>Get scope + price in 8 hours.</em>
          </h2>
          <p>
            No quote form. No 30-min discovery dance. Just a written reply with
            scope, price and ship window.
          </p>
          <div className="cta-row">
            <Link href="/discovery-call" className="btn-primary">
              Start a brief →
            </Link>
            <Link href="/case-studies" className="btn-line">
              See case studies
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
