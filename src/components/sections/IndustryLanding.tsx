/**
 * IndustryLanding — single reusable React Server Component that renders an
 * 8-section niche vertical landing page from a typed Industry config.
 *
 * Sections (in order):
 *   1. Hero (eyebrow + H1 + subhead + dual CTA)
 *   2. 3-pain block
 *   3. Flagship product section
 *   4. 3-module stack
 *   5. 2-3 niche case study teasers
 *   5.5 Founder mini-bio (Waseem photo + "why I'm right for this niche")
 *   6. Pricing strip (3 tiers)
 *   7. FAQ (5-6 items, plain accordion-style markup with details/summary so it's
 *       readable by AEO crawlers without client-side JS)
 *   8. Final CTA
 *
 * All copy is driven by the Industry config in src/data/industries.ts.
 */

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Boxes,
  TrendingUp,
  MapPin,
  Quote,
} from "lucide-react";
import type { Industry } from "@/data/industries";

type Props = { industry: Industry };

export default function IndustryLanding({ industry: i }: Props) {
  return (
    <>
      {/* 1. HERO ─────────────────────────────────────────────────────────── */}
      <section className="section pt-16 md:pt-24">
        <div className="container-x">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-fuchsia-400/10 border border-fuchsia-400/30 text-fuchsia-300 text-xs font-semibold uppercase tracking-[0.18em] mb-6">
              <Sparkles className="w-3 h-3" />
              {i.eyebrowChip}
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6">
              {i.heroH1}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl">
              {i.heroSubhead}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={i.heroCtaPrimary.href}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-gradient-to-r from-cyan-400 to-teal-400 text-black font-bold hover:from-cyan-300 hover:to-teal-300 transition"
              >
                {i.heroCtaPrimary.label}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={i.heroCtaSecondary.href}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-white/5 border border-white/15 text-white font-semibold hover:bg-white/10 transition"
              >
                {i.heroCtaSecondary.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 3-PAIN BLOCK ─────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-3xl mb-12">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3">
              Where the leakage is
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Three problems every {i.shortName} operator is paying for, whether they know it or not.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {i.painPoints.map((p, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-fuchsia-400/40 transition"
              >
                <div className="text-5xl font-extrabold text-fuchsia-300/40 mb-2">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                <p className="text-gray-300 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FLAGSHIP PRODUCT ────────────────────────────────────────────── */}
      <section className="section">
        <div className="container-x">
          <div className="rounded-3xl border border-cyan-400/30 bg-gradient-to-br from-cyan-400/5 to-teal-400/5 p-8 md:p-12">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3">
                The flagship system
              </p>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5">
                {i.flagshipProductName}
              </h2>
              <p className="text-lg text-gray-200 mb-8 leading-relaxed">
                {i.flagshipProductLede}
              </p>
              <ul className="space-y-3 mb-8">
                {i.flagshipProductBullets.map((b, idx) => (
                  <li key={idx} className="flex gap-3 items-start text-gray-200">
                    <CheckCircle2 className="w-5 h-5 text-cyan-300 mt-0.5 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/discovery-call"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-teal-400 text-black font-bold hover:from-cyan-300 hover:to-teal-300 transition"
              >
                Scope the build
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 3-MODULE STACK ──────────────────────────────────────────────── */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-3xl mb-12">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3">
              The three modules
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Built in three layers. Buy them together, or ship one at a time.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {i.modules.map((m, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-cyan-400/40 transition flex flex-col"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Boxes className="w-5 h-5 text-cyan-300" />
                  <span className="text-xs uppercase tracking-[0.18em] text-cyan-300 font-semibold">
                    Module {idx + 1}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2">{m.name}</h3>
                <p className="text-gray-300 mb-4">{m.oneLine}</p>
                <ul className="space-y-2 mt-auto">
                  {m.bullets.map((b, j) => (
                    <li key={j} className="flex gap-2 items-start text-sm text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-teal-300 mt-0.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CASE TEASERS ─────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-3xl mb-12">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3">
              Already shipped for {i.shortName} operators
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Proof, not pitch decks.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {i.caseTeasers.map((c, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-fuchsia-400/40 transition flex flex-col"
              >
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-cyan-300" />
                  {c.location}
                </div>
                <h3 className="text-lg font-bold mb-2">{c.clientName}</h3>
                <p className="text-gray-300 text-sm mb-5 flex-1">{c.oneLineOutcome}</p>
                <div className="border-t border-white/10 pt-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-cyan-300 font-semibold mb-1">
                    {c.metricLabel}
                  </p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-sm text-gray-400 line-through">{c.metricBefore}</span>
                    <TrendingUp className="w-4 h-4 text-teal-300" />
                    <span className="text-xl font-extrabold text-teal-300">{c.metricAfter}</span>
                  </div>
                </div>
                {c.caseStudySlug && (
                  <Link
                    href={`/case-studies/${c.caseStudySlug}`}
                    className="inline-flex items-center gap-1.5 text-cyan-300 text-sm font-semibold mt-4 hover:text-cyan-200"
                  >
                    Read full case study
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5.5 FOUNDER MINI-BIO ────────────────────────────────────────────── */}
      <section className="section">
        <div className="container-x">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10 grid md:grid-cols-[260px_1fr] gap-8 items-center">
            <div className="relative w-[200px] h-[200px] md:w-[240px] md:h-[240px] mx-auto md:mx-0 rounded-2xl overflow-hidden border border-white/20">
              <Image
                src={i.bioPhoto}
                alt={i.bioPhotoAlt}
                fill
                sizes="240px"
                className="object-cover"
              />
            </div>
            <div>
              <Quote className="w-6 h-6 text-fuchsia-300 mb-3" />
              <h2 className="text-2xl md:text-3xl font-bold mb-3">{i.bioHeadline}</h2>
              <p className="text-gray-300 text-lg leading-relaxed">{i.bioCopy}</p>
              <p className="text-sm text-gray-400 mt-4">
                Waseem Nasir, founder, SkynetLabs — Bali (GMT+8)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRICING STRIP ───────────────────────────────────────────────── */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-3xl mb-12">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3">
              Pricing
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Three tiers, tuned to your {i.shortName} stage.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {i.pricingTiers.map((tier, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-6 flex flex-col border ${
                  tier.featured
                    ? "border-cyan-400/60 bg-gradient-to-b from-cyan-400/10 to-transparent"
                    : "border-white/10 bg-white/5"
                }`}
              >
                {tier.featured && (
                  <div className="inline-flex self-start px-2.5 py-1 rounded-full bg-cyan-400/20 text-cyan-200 text-[10px] uppercase tracking-[0.18em] font-bold mb-3">
                    Most picked
                  </div>
                )}
                <h3 className="text-2xl font-extrabold mb-1">{tier.tierName}</h3>
                <p className="text-sm text-gray-400 mb-4">{tier.positioning}</p>
                <div className="mb-5">
                  <span className="text-4xl font-extrabold">{tier.price}</span>
                  <span className="text-sm text-gray-400 ml-1">{tier.cadence}</span>
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  {tier.includes.map((line, j) => (
                    <li key={j} className="flex gap-2 items-start text-sm text-gray-200">
                      <CheckCircle2 className="w-4 h-4 text-teal-300 mt-0.5 shrink-0" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={tier.ctaHref}
                  className={`inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold transition ${
                    tier.featured
                      ? "bg-gradient-to-r from-cyan-400 to-teal-400 text-black hover:from-cyan-300 hover:to-teal-300"
                      : "bg-white/10 border border-white/15 text-white hover:bg-white/15"
                  }`}
                >
                  {tier.ctaLabel}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ (server-rendered details/summary so it's AEO-crawlable) ──── */}
      <section className="section">
        <div className="container-x max-w-3xl">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3">
              FAQs for {i.shortName} operators
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Questions {i.shortName} owners ask before booking.
            </h2>
          </div>
          <div className="space-y-3">
            {i.faqs.map((f, idx) => (
              <details
                key={idx}
                className="group rounded-xl border border-white/10 bg-white/5 p-5 hover:border-fuchsia-400/40 transition"
              >
                <summary className="cursor-pointer text-lg font-semibold flex justify-between items-center gap-4 list-none">
                  <span>{f.q}</span>
                  <span className="text-fuchsia-300 text-2xl leading-none group-open:rotate-45 transition">
                    +
                  </span>
                </summary>
                <p className="text-gray-300 mt-4 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="section pb-24">
        <div className="container-x">
          <div className="rounded-3xl border border-fuchsia-400/30 bg-gradient-to-br from-fuchsia-400/10 via-cyan-400/5 to-teal-400/10 p-10 md:p-16 text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 max-w-3xl mx-auto">
              {i.finalCtaHeadline}
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              {i.finalCtaSubhead}
            </p>
            <Link
              href={i.finalCtaHref}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-400 to-teal-400 text-black font-bold text-lg hover:from-cyan-300 hover:to-teal-300 transition"
            >
              {i.finalCtaButtonLabel}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-sm text-gray-400 mt-5">
              30-minute call. Bali daytime: 1-hour reply. Otherwise: within 6 hours.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
