"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bot,
  Target,
  Link as LinkIcon,
  Smartphone,
  Clapperboard,
  PlayCircle,
  Music,
  Users,
  Globe,
  ShoppingCart,
  Zap,
  MessageSquare,
  Building2,
  BookOpen,
  Palette,
  PenTool,
  Check,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import {
  CATEGORIES,
  SERVICE_PRICING,
  servicesByCategory,
  type ServicePricing,
  type ServiceTier,
} from "@/lib/service-pricing";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Bot,
  Target,
  Link: LinkIcon,
  Smartphone,
  Clapperboard,
  PlayCircle,
  Music,
  Users,
  Globe,
  ShoppingCart,
  Zap,
  MessageSquare,
  Building2,
  BookOpen,
  Palette,
  PenTool,
};

function formatPrice(p: number) {
  return `$${p.toLocaleString("en-US")}`;
}

function TierCard({ tier }: { tier: ServiceTier }) {
  const featured = tier.badge === "Most picked" || tier.badge === "Best value";
  return (
    <div
      className={`relative flex flex-col rounded-2xl p-6 transition ${
        featured
          ? "bg-gradient-to-b from-cyan-500/10 to-white/[0.02] border border-cyan-400/40 shadow-[0_8px_40px_rgba(0,212,255,0.18)]"
          : "bg-white/[0.03] border border-white/10 hover:border-white/20"
      }`}
    >
      {tier.badge && (
        <span
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase whitespace-nowrap"
          style={{
            background: "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
            color: "#0a0a0a",
          }}
        >
          {tier.badge}
        </span>
      )}

      <div className="text-[11px] uppercase tracking-wider text-cyan-300 font-semibold mb-1">
        {tier.name}
      </div>
      <p className="text-sm text-fg-muted mb-4">{tier.tagline}</p>

      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-3xl font-extrabold text-white tracking-tight">
          {formatPrice(tier.price)}
        </span>
        {tier.cadence === "monthly" && (
          <span className="text-sm text-fg-faint">/mo</span>
        )}
      </div>
      <div className="inline-flex w-fit text-xs text-skynet-primary-light bg-skynet-primary/10 border border-skynet-primary/20 px-2 py-1 rounded-md mb-5">
        Ships in {tier.ship}
      </div>

      <ul className="space-y-2.5 mb-6 flex-1">
        {tier.features.map((f) => (
          <li key={f} className="flex gap-2 text-sm text-fg-muted leading-snug">
            <Check className="w-4 h-4 text-cyan-300 flex-shrink-0 mt-0.5" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <Link
        href={tier.ctaHref}
        className={`mt-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-sm font-semibold transition-transform hover:-translate-y-0.5 ${
          featured
            ? "text-white"
            : "text-white border border-white/15 bg-white/[0.04] hover:border-cyan-400/40"
        }`}
        style={
          featured
            ? {
                background:
                  "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
                boxShadow: "0 6px 20px rgba(30,136,229,0.35)",
              }
            : undefined
        }
      >
        {tier.ctaLabel}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

function ServicePanel({ service }: { service: ServicePricing }) {
  const Icon = ICONS[service.icon];
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        {Icon && (
          <span className="w-11 h-11 rounded-xl flex items-center justify-center bg-cyan-500/12 border border-cyan-400/25">
            <Icon className="w-5 h-5 text-cyan-300" />
          </span>
        )}
        <div>
          <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
            {service.label}
          </h3>
          <p className="text-sm text-fg-muted">{service.tagline}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
        {service.tiers.map((t) => (
          <TierCard key={t.name} tier={t} />
        ))}
      </div>

      {service.addons.length > 0 && (
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-cyan-300" />
            <span className="text-[11px] uppercase tracking-wider text-cyan-300 font-semibold">
              Optional add-ons
            </span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {service.addons.map((a) => (
              <li
                key={a.id}
                className="flex items-center justify-between gap-3 py-2 px-3 rounded-lg bg-white/[0.03] border border-white/[0.06] text-sm"
              >
                <span className="text-fg-muted">{a.label}</span>
                <span className="text-white font-semibold whitespace-nowrap">
                  +{formatPrice(a.price)}
                  {a.cadence === "monthly" && (
                    <span className="text-fg-faint font-normal">/mo</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="pt-2">
        <Link
          href={`/services/${service.slug}`}
          className="inline-flex items-center gap-1.5 text-sm text-cyan-300 hover:text-cyan-200 font-semibold"
        >
          Read full {service.label} service page
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default function ServicePricingTabs() {
  const [activeCat, setActiveCat] = useState<(typeof CATEGORIES)[number]>(
    "Automation"
  );
  const services = servicesByCategory(activeCat);
  const [activeSlug, setActiveSlug] = useState<string>(services[0]?.slug ?? "");
  const active =
    services.find((s) => s.slug === activeSlug) ?? services[0] ?? SERVICE_PRICING[0];

  return (
    <section className="relative py-16 md:py-24 border-t border-white/[0.08]">
      <div className="container-x px-6 max-w-6xl mx-auto">
        <div className="mb-10 md:mb-12">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-300 mb-3 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/25">
            Per-service pricing
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
            Pick a service. See real numbers.
          </h2>
          <p className="text-lg text-fg-muted max-w-2xl">
            16 services across 4 categories. Each has 3 tiers — Starter, Pro,
            Custom — plus optional add-ons. Same transparency, scoped per
            service.
          </p>
        </div>

        {/* Category tabs */}
        <div
          role="tablist"
          aria-label="Service categories"
          className="flex flex-wrap gap-2 mb-6 pb-2"
        >
          {CATEGORIES.map((cat) => {
            const isActive = cat === activeCat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setActiveCat(cat);
                  const first = servicesByCategory(cat)[0]?.slug;
                  if (first) setActiveSlug(first);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  isActive
                    ? "bg-gradient-to-r from-skynet-primary to-skynet-secondary text-[#0a0a0a] shadow-[0_4px_18px_rgba(30,136,229,0.35)]"
                    : "bg-white/[0.04] text-fg-muted border border-white/10 hover:border-cyan-400/30 hover:text-white"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Service sub-tabs */}
        <div
          role="tablist"
          aria-label="Services"
          className="flex flex-wrap gap-2 mb-10 pb-1 -mx-1 px-1"
        >
          {services.map((s) => {
            const Icon = ICONS[s.icon];
            const isActive = s.slug === active.slug;
            return (
              <button
                key={s.slug}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveSlug(s.slug)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-[13px] font-medium transition ${
                  isActive
                    ? "bg-cyan-500/15 text-white border border-cyan-400/50"
                    : "bg-white/[0.02] text-fg-muted border border-white/[0.06] hover:border-white/20 hover:text-white"
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5 text-cyan-300" />}
                {s.label}
              </button>
            );
          })}
        </div>

        <ServicePanel service={active} />
      </div>
    </section>
  );
}
