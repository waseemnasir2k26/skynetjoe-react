import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import ServicePricingTabs from "@/components/pricing/ServicePricingTabs";
import PricingCalculator from "@/components/pricing/PricingCalculator";

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
  minPrice: 997,
  maxPrice: 14500,
  provider: { "@id": `${SITE.url}/#organization` },
};

const offerCatalog = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: `${SITE.brand} Service Packages`,
  url: `${SITE.url}/pricing`,
  itemListElement: [
    {
      "@type": "Offer",
      name: "Starter (per service)",
      price: 997,
      priceCurrency: "USD",
      description:
        "Smallest tier across any of 16 services. Single deliverable, 3-7 day ship.",
    },
    {
      "@type": "Offer",
      name: "Pro (per service)",
      price: 4500,
      priceCurrency: "USD",
      description:
        "Mid tier. Full build or multi-system pipeline, 10-14 day ship.",
    },
    {
      "@type": "Offer",
      name: "Custom (per service)",
      price: 1997,
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: 1997,
        priceCurrency: "USD",
        unitText: "MONTH",
      },
      description:
        "Monthly retainer or enterprise one-time scope, depending on service.",
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

      {/* HERO */}
      <section
        className="relative overflow-hidden pt-32 md:pt-40 pb-16"
        style={{
          background:
            "linear-gradient(135deg, #061827 0%, #0a2d4a 45%, #073846 100%)",
        }}
      >
        <span
          className="orb"
          style={{
            width: 540,
            height: 540,
            background: "#1E88E5",
            top: -90,
            left: -130,
            opacity: 0.45,
          }}
        />
        <span
          className="orb"
          style={{
            width: 580,
            height: 580,
            background: "#00D4FF",
            top: 80,
            right: -160,
            opacity: 0.35,
            animationDelay: "-7s",
          }}
        />

        <div className="container-x px-6 relative z-10 max-w-4xl">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-300 mb-5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/25">
            <Sparkles className="w-3 h-3" />
            Pricing · SkynetLabs
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.05] mb-5">
            Public pricing for people who hate{" "}
            <span
              className="italic font-semibold"
              style={{
                fontFamily:
                  '"Playfair Display", Georgia, "Times New Roman", serif',
                background:
                  "linear-gradient(120deg, #00D4FF 0%, #14B8A6 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
              }}
            >
              &ldquo;request a quote&rdquo;
            </span>
            .
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mb-8">
            16 services. 3 tiers each. Optional add-ons. Live calculator below.
            You see the price before we see your calendar.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-300">
            <span>
              <b className="text-white">180+</b> workflows
            </span>
            <span className="text-cyan-300/30">·</span>
            <span>
              <b className="text-white">40+</b> websites
            </span>
            <span className="text-cyan-300/30">·</span>
            <span>
              <b className="text-white">9</b> countries
            </span>
            <span className="text-cyan-300/30">·</span>
            <span>
              <b className="text-white">5-14d</b> ship
            </span>
          </div>
        </div>
      </section>

      {/* SINGLE PRICING SECTION (tabs) */}
      <ServicePricingTabs />

      {/* CALCULATOR */}
      <PricingCalculator />

      {/* VULNERABILITY QUOTE */}
      <section className="py-12 border-t border-white/[0.08]">
        <div className="container-x px-6 max-w-3xl mx-auto">
          <blockquote
            className="relative rounded-2xl p-6 md:p-8 italic text-fg-muted"
            style={{
              background: "rgba(20, 184, 166, 0.06)",
              borderLeft: "3px solid #14B8A6",
            }}
          >
            <p className="text-base md:text-lg leading-relaxed">
              Most agencies hide the price because the price doesn&apos;t match
              the work. I&apos;ve been on the other side of three of those
              proposals. Every one ended in renegotiation. I&apos;d rather quote
              you out of a deal than nickel you through one.
            </p>
            <footer className="mt-3 text-sm not-italic text-cyan-200">
              — Waseem Nasir
            </footer>
          </blockquote>
        </div>
      </section>

      {/* MICROS */}
      <section className="py-16 md:py-20 border-t border-white/[0.08]">
        <div className="container-x px-6 max-w-5xl mx-auto">
          <div className="mb-8">
            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-300">
              Smaller engagements
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mt-2 mb-3">
              Need just one thing? Pick a micro.
            </h2>
            <p className="text-base text-fg-muted max-w-2xl">
              Six fixed-scope wedges. Each is a single deliverable, 1-2 weeks,
              no retainer commitment. Use to test the working relationship
              before scaling.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {MICROS.map((m) => (
              <div
                key={m.name}
                className="flex items-center justify-between gap-3 px-4 py-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/40 transition"
              >
                <span className="text-sm font-semibold text-white">
                  {m.name}
                </span>
                <span className="text-sm font-bold text-cyan-300 whitespace-nowrap">
                  ${m.price.toLocaleString("en-US")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 border-t border-white/[0.08]">
        <div className="container-x px-6 max-w-3xl mx-auto">
          <div className="mb-8">
            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-300">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mt-2">
              Pricing questions we get often.
            </h2>
          </div>
          <div className="space-y-2.5">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl bg-white/[0.03] border border-white/10 overflow-hidden"
              >
                <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between gap-4 text-white font-semibold">
                  <span>{f.q}</span>
                  <span className="text-cyan-300 text-xl leading-none group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5 text-fg-muted text-sm leading-relaxed">
                  {f.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSER */}
      <section className="py-16 md:py-20 border-t border-white/[0.08]">
        <div className="container-x px-6 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
            180 workflows · 40 websites · 9 countries.
          </h2>
          <p className="text-base text-fg-muted max-w-xl mx-auto mb-7">
            No quote form. No 30-min discovery dance. Send a 3-sentence brief
            and you get scope + price back in 8 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/discovery-call"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white transition-transform hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
                boxShadow: "0 8px 28px rgba(0, 212, 255, 0.30)",
              }}
            >
              Start a brief
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white border border-white/15 bg-white/[0.04] hover:border-cyan-400/40 transition"
            >
              See case studies
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
