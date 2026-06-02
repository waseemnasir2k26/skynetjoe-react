import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import { SERVICE_PRICING } from "@/lib/service-pricing";
import JsonLd from "@/components/JsonLd";
import ServicePricingTabs from "@/components/pricing/ServicePricingTabs";
import PricingCalculator from "@/components/pricing/PricingCalculator";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

// Derive the true price floor/ceiling straight from the per-service tier data
// so the schema can never drift from what the page actually publishes. Every
// tier (one-time or monthly) is a real USD entry point, so all are eligible.
const ALL_TIER_PRICES = SERVICE_PRICING.flatMap((s) => s.tiers.map((t) => t.price));
const MIN_PRICE = Math.min(...ALL_TIER_PRICES);
const MAX_PRICE = Math.max(...ALL_TIER_PRICES);

// Lowest one-time tier across all services = the honest "starting from" Offer.
const ONE_TIME_PRICES = SERVICE_PRICING.flatMap((s) =>
  s.tiers.filter((t) => t.cadence !== "monthly").map((t) => t.price)
);
const MIN_ONE_TIME = Math.min(...ONE_TIME_PRICES);
const MAX_ONE_TIME = Math.max(...ONE_TIME_PRICES);

// Lowest real monthly retainer across all services (some Custom tiers ARE
// monthly products — the FAQ says we don't run subscriptions *on a one-time
// fee*, retainers are a separate, explicitly-monthly product).
const MONTHLY_PRICES = SERVICE_PRICING.flatMap((s) =>
  s.tiers.filter((t) => t.cadence === "monthly").map((t) => t.price)
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

const MICROS = [
  { name: "Audit (site + stack + AEO)", price: 497 },
  { name: "Voice profile (locked tone)", price: 997 },
  { name: "n8n smoke-test build", price: 750 },
  { name: "AEO content sprint (10 posts)", price: 1200 },
  { name: "GoHighLevel setup", price: 1500 },
  { name: "Content engine v1", price: 2500 },
];

const FAQS = [
  {
    q: "Why isn't there an enterprise tier?",
    a: "Because every \"enterprise tier\" we've ever been quoted was a generic Flagship with a different number on it. If your scope genuinely needs more than the Pro can hold, we quote the delta on top — line by line, in writing, before kickoff. No mystery tier.",
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
    a: "Wise, Payoneer, PayPal, Stripe invoice, direct USD wire, or bank transfer in IDR / GBP / EUR / SAR / AED. Crypto on request. We invoice from a registered entity — no PayPal \"friends and family\" hacks.",
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
      <style>{`
        .cream-micro-card:hover { border-color: var(--terracotta) !important; }
      `}</style>

      {/* HERO — cream editorial */}
      <section
        className="relative pt-32 md:pt-40 pb-16"
        style={{
          background: "var(--cream-3)",
          borderBottom: "1px solid rgba(26,26,26,0.10)",
        }}
      >
        <Reveal className="container-x px-6 relative z-10 max-w-4xl">
          <div
            className="inline-flex items-center gap-3 mb-5"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "var(--terracotta-aa)",
            }}
          >
            <span
              style={{
                width: 28,
                height: 1,
                background: "var(--terracotta)",
                display: "inline-block",
              }}
            />
            Pricing · SkynetLabs
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              letterSpacing: "-0.025em",
              lineHeight: 1.04,
              color: "var(--ink)",
              fontSize: "clamp(40px, 6vw, 68px)",
              margin: "0 0 20px",
            }}
          >
            See the price before we ever{" "}
            <span style={{ color: "var(--terracotta-aa)", fontWeight: 700 }}>
              touch your calendar.
            </span>
          </h1>
          <p
            style={{
              fontSize: 19,
              color: "var(--ink-2)",
              maxWidth: "52ch",
              lineHeight: 1.6,
              marginBottom: 24,
            }}
          >
            16 services. 3 tiers each. Optional add-ons and a live calculator
            below. No quote form, no &ldquo;request pricing&rdquo; wall.
          </p>
          <div
            className="flex flex-wrap items-center gap-x-5 gap-y-2"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--ink-faint)",
            }}
          >
            <span>
              <b style={{ color: "var(--ink)" }}>180+</b> workflows
            </span>
            <span style={{ color: "rgba(26,26,26,0.20)" }}>·</span>
            <span>
              <b style={{ color: "var(--ink)" }}>40+</b> websites
            </span>
            <span style={{ color: "rgba(26,26,26,0.20)" }}>·</span>
            <span>
              <b style={{ color: "var(--ink)" }}>9</b> countries
            </span>
            <span style={{ color: "rgba(26,26,26,0.20)" }}>·</span>
            <span>
              <b style={{ color: "var(--ink)" }}>5-14d</b> ship
            </span>
          </div>
        </Reveal>
      </section>

      {/* SINGLE PRICING SECTION (tabs) */}
      <ServicePricingTabs />

      {/* CALCULATOR */}
      <PricingCalculator />

      {/* VULNERABILITY QUOTE */}
      <section
        className="py-12"
        style={{
          background: "var(--cream)",
          borderTop: "1px solid rgba(26,26,26,0.10)",
        }}
      >
        <Reveal className="container-x px-6 max-w-3xl mx-auto">
          <blockquote
            style={{
              padding: "26px 32px",
              background: "var(--cream-2)",
              borderLeft: "3px solid var(--terracotta)",
              fontFamily: "var(--font-sans)",
              color: "var(--ink-2)",
            }}
          >
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.6,
              }}
            >
              Most agencies hide the price because the price doesn&apos;t match
              the work. I&apos;ve been on the other side of three of those
              proposals. Every one ended in renegotiation. I&apos;d rather quote
              you out of a deal than nickel you through one.
            </p>
            <footer
              style={{
                marginTop: 14,
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--terracotta-aa)",
              }}
            >
              — Waseem Nasir
            </footer>
          </blockquote>
        </Reveal>
      </section>

      {/* MICROS */}
      <section
        className="py-16 md:py-20"
        style={{
          background: "var(--cream-3)",
          borderTop: "1px solid rgba(26,26,26,0.10)",
        }}
      >
        <div className="container-x px-6 max-w-5xl mx-auto">
          <Reveal className="mb-8">
            <div
              className="inline-flex items-center gap-3 mb-3"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "var(--terracotta-aa)",
              }}
            >
              <span
                style={{
                  width: 28,
                  height: 1,
                  background: "var(--terracotta)",
                  display: "inline-block",
                }}
              />
              Smaller engagements
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "var(--ink)",
                fontSize: "clamp(28px, 4vw, 40px)",
                lineHeight: 1.1,
                marginBottom: 12,
              }}
            >
              Need just one thing?{" "}
              <span style={{ color: "var(--terracotta-aa)", fontWeight: 700 }}>
                Pick a micro.
              </span>
            </h2>
            <p
              style={{
                fontSize: 17,
                color: "var(--ink-2)",
                maxWidth: "44rem",
                lineHeight: 1.6,
              }}
            >
              Six fixed-scope wedges. Each is a single deliverable, 1-2 weeks,
              no retainer commitment. Use one to test the working relationship
              before scaling.
            </p>
          </Reveal>
          <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {MICROS.map((m, i) => {
              const rotate = i % 2 === 0 ? "-0.2deg" : "0.2deg";
              return (
                <RevealItem
                  key={m.name}
                  className="cream-micro-card flex items-center justify-between gap-3"
                  style={{
                    padding: "16px 20px",
                    background: "var(--cream-2)",
                    border: "1px solid rgba(26,26,26,0.10)",
                    transform: `rotate(${rotate})`,
                    transition: "border-color 0.18s",
                  }}
                >
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "var(--ink)",
                    }}
                  >
                    {m.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 14,
                      fontWeight: 700,
                      color: "var(--terracotta-aa)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    ${m.price.toLocaleString("en-US")}
                  </span>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="py-16 md:py-20"
        style={{
          background: "var(--cream)",
          borderTop: "1px solid rgba(26,26,26,0.10)",
        }}
      >
        <div className="container-x px-6 max-w-3xl mx-auto">
          <Reveal className="mb-8">
            <div
              className="inline-flex items-center gap-3 mb-3"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "var(--terracotta-aa)",
              }}
            >
              <span
                style={{
                  width: 28,
                  height: 1,
                  background: "var(--terracotta)",
                  display: "inline-block",
                }}
              />
              FAQ
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "var(--ink)",
                fontSize: "clamp(28px, 4vw, 40px)",
                lineHeight: 1.1,
              }}
            >
              Pricing questions{" "}
              <span style={{ color: "var(--terracotta-aa)", fontWeight: 700 }}>
                we get often.
              </span>
            </h2>
          </Reveal>
          <div>
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="group"
                style={{
                  borderBottom: "1px solid rgba(26,26,26,0.12)",
                  padding: "20px 0",
                }}
              >
                <summary
                  className="cursor-pointer flex items-center justify-between gap-4"
                  style={{
                    listStyle: "none",
                    fontFamily: "var(--font-display)",
                    fontSize: 18,
                    fontWeight: 600,
                    color: "var(--ink)",
                    letterSpacing: "-0.005em",
                  }}
                >
                  <span>{f.q}</span>
                  <span
                    className="group-open:rotate-45 transition-transform"
                    style={{
                      color: "var(--terracotta-aa)",
                      fontSize: 22,
                      lineHeight: 1,
                    }}
                  >
                    +
                  </span>
                </summary>
                <div
                  style={{
                    paddingTop: 12,
                    fontSize: 17,
                    color: "var(--ink-2)",
                    lineHeight: 1.65,
                  }}
                >
                  {f.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSER — flat terracotta event */}
      <section className="py-20 md:py-24" style={{ background: "var(--terracotta)" }}>
        <Reveal className="container-x px-6 max-w-3xl mx-auto text-center">
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "var(--cream-3)",
              opacity: 0.85,
              marginBottom: 18,
            }}
          >
            — 180 workflows · 40 websites · 9 countries
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              color: "var(--cream-3)",
              fontSize: "clamp(28px, 4.5vw, 48px)",
              lineHeight: 1.08,
              marginBottom: 16,
            }}
          >
            Send a brief.{" "}
            <span
              style={{
                color: "var(--cream-3)",
                fontWeight: 700,
                textDecoration: "underline",
                textDecorationThickness: "2px",
                textUnderlineOffset: "8px",
              }}
            >
              Get scope + price in 8 hours.
            </span>
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "rgba(250, 247, 240, 0.92)",
              maxWidth: "44ch",
              margin: "0 auto 28px",
              lineHeight: 1.55,
            }}
          >
            No quote form. No 30-min discovery dance. Just a written reply with
            scope, price and ship window.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/discovery-call"
              className="inline-flex items-center gap-2"
              style={{
                background: "var(--cream-3)",
                color: "var(--terracotta)",
                padding: "16px 28px",
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: 15,
                borderRadius: 2,
              }}
            >
              Start a brief
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2"
              style={{
                background: "transparent",
                color: "var(--cream-3)",
                border: "1px solid var(--cream-3)",
                padding: "15px 26px",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: 15,
                borderRadius: 2,
              }}
            >
              See case studies
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
