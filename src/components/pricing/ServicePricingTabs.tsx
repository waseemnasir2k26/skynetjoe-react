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

const ICONS: Record<
  string,
  React.ComponentType<{ className?: string; style?: React.CSSProperties }>
> = {
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

function TierCard({ tier, idx }: { tier: ServiceTier; idx: number }) {
  const featured = tier.badge === "Most picked" || tier.badge === "Best value";
  const rotate = idx % 2 === 0 ? "-0.2deg" : "0.2deg";
  return (
    <div
      className="relative flex flex-col"
      style={{
        padding: 24,
        background: featured ? "var(--cream-3)" : "var(--cream-2)",
        border: `1px solid ${featured ? "var(--terracotta)" : "rgba(26,26,26,0.10)"}`,
        borderTop: featured
          ? "3px solid var(--terracotta)"
          : "1px solid rgba(26,26,26,0.10)",
        transform: `rotate(${rotate})`,
      }}
    >
      {tier.badge && (
        <span
          style={{
            position: "absolute",
            top: -12,
            left: "50%",
            transform: "translateX(-50%)",
            padding: "4px 10px",
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            background: featured ? "var(--terracotta)" : "var(--ochre)",
            color: "var(--cream-3)",
          }}
        >
          {tier.badge}
        </span>
      )}

      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.16em",
          color: "var(--terracotta)",
          fontWeight: 600,
          marginBottom: 6,
        }}
      >
        — {tier.name}
      </div>
      <p
        style={{
          fontSize: 13.5,
          color: "var(--ink-2)",
          marginBottom: 18,
          lineHeight: 1.5,
        }}
      >
        {tier.tagline}
      </p>

      <div className="flex items-baseline gap-1 mb-1">
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 34,
            fontWeight: 600,
            color: "var(--ink)",
            letterSpacing: "-0.02em",
          }}
        >
          {formatPrice(tier.price)}
        </span>
        {tier.cadence === "monthly" && (
          <span style={{ fontSize: 13, color: "var(--ink-faint)" }}>/mo</span>
        )}
      </div>
      <div
        className="inline-flex w-fit mb-5"
        style={{
          padding: "4px 9px",
          fontFamily: "var(--font-mono)",
          fontSize: 10.5,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "var(--ink-2)",
          background: "var(--cream)",
          border: "1px solid rgba(26,26,26,0.10)",
        }}
      >
        Ships in {tier.ship}
      </div>

      <ul className="space-y-2.5 mb-6 flex-1">
        {tier.features.map((f) => (
          <li
            key={f}
            className="flex gap-2"
            style={{
              fontSize: 13.5,
              color: "var(--ink-2)",
              lineHeight: 1.5,
            }}
          >
            <Check
              className="w-4 h-4 flex-shrink-0 mt-0.5"
              style={{ color: "var(--terracotta)" }}
            />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <Link
        href={tier.ctaHref}
        className="mt-auto inline-flex items-center justify-center gap-1.5"
        style={
          featured
            ? {
                padding: "12px 18px",
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                fontWeight: 700,
                background: "var(--terracotta)",
                color: "var(--cream-3)",
                borderRadius: 2,
                border: "none",
              }
            : {
                padding: "11px 17px",
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                fontWeight: 600,
                background: "transparent",
                color: "var(--ink)",
                border: "1px solid var(--ink)",
                borderRadius: 2,
              }
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
          <span
            className="w-11 h-11 flex items-center justify-center"
            style={{
              background: "var(--cream-3)",
              border: "1px solid var(--terracotta)",
              color: "var(--terracotta)",
            }}
          >
            <Icon className="w-5 h-5" />
          </span>
        )}
        <div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(20px, 2.5vw, 24px)",
              fontWeight: 600,
              color: "var(--ink)",
              letterSpacing: "-0.01em",
            }}
          >
            {service.label}
          </h3>
          <p style={{ fontSize: 13.5, color: "var(--ink-2)" }}>
            {service.tagline}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 pt-3">
        {service.tiers.map((t, i) => (
          <TierCard key={t.name} tier={t} idx={i} />
        ))}
      </div>

      {service.addons.length > 0 && (
        <div
          style={{
            padding: 20,
            background: "var(--cream-2)",
            border: "1px solid rgba(26,26,26,0.10)",
          }}
        >
          <div
            className="flex items-center gap-2 mb-3"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "var(--terracotta)",
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            — Optional add-ons
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {service.addons.map((a) => (
              <li
                key={a.id}
                className="flex items-center justify-between gap-3"
                style={{
                  padding: "10px 14px",
                  background: "var(--cream-3)",
                  border: "1px solid rgba(26,26,26,0.10)",
                  fontSize: 13,
                }}
              >
                <span style={{ color: "var(--ink-2)" }}>{a.label}</span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--terracotta)",
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                  }}
                >
                  +{formatPrice(a.price)}
                  {a.cadence === "monthly" && (
                    <span
                      style={{
                        color: "var(--ink-faint)",
                        fontWeight: 400,
                      }}
                    >
                      /mo
                    </span>
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
          className="inline-flex items-center gap-1.5"
          style={{
            fontSize: 13.5,
            color: "var(--terracotta)",
            fontWeight: 600,
            textUnderlineOffset: 4,
          }}
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
    <section
      className="relative py-16 md:py-24"
      style={{
        background: "var(--cream)",
        borderTop: "1px solid rgba(26,26,26,0.10)",
      }}
    >
      <div className="container-x px-6 max-w-6xl mx-auto">
        <div className="mb-10 md:mb-12">
          <div
            className="inline-flex items-center gap-3 mb-3"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "var(--terracotta)",
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
            Per-service pricing
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              fontSize: "clamp(28px, 4vw, 40px)",
              lineHeight: 1.1,
              marginBottom: 12,
            }}
          >
            Pick a service.{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--terracotta)",
                fontWeight: 500,
              }}
            >
              See real numbers.
            </em>
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "var(--ink-2)",
              maxWidth: "44rem",
              lineHeight: 1.55,
            }}
          >
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
                style={{
                  padding: "10px 18px",
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  fontWeight: 600,
                  color: isActive ? "var(--cream-3)" : "var(--ink)",
                  background: isActive ? "var(--terracotta)" : "var(--cream-2)",
                  border: `1px solid ${isActive ? "var(--terracotta)" : "rgba(26,26,26,0.12)"}`,
                  transition: "all 0.18s",
                  borderRadius: 2,
                }}
                onMouseEnter={(e) => {
                  if (!isActive)
                    e.currentTarget.style.background = "var(--cream-3)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive)
                    e.currentTarget.style.background = "var(--cream-2)";
                }}
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
          className="flex flex-wrap gap-2 mb-10 pb-1"
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
                className="inline-flex items-center gap-2"
                style={{
                  padding: "8px 14px",
                  fontFamily: "var(--font-sans)",
                  fontSize: 13,
                  fontWeight: 500,
                  color: isActive ? "var(--ink)" : "var(--ink-2)",
                  background: isActive ? "var(--cream-3)" : "transparent",
                  border: `1px solid ${isActive ? "var(--terracotta)" : "rgba(26,26,26,0.10)"}`,
                  borderLeft: isActive
                    ? "3px solid var(--terracotta)"
                    : "1px solid rgba(26,26,26,0.10)",
                  transition: "all 0.18s",
                }}
                onMouseEnter={(e) => {
                  if (!isActive)
                    e.currentTarget.style.background = "var(--cream-3)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive)
                    e.currentTarget.style.background = "transparent";
                }}
              >
                {Icon && (
                  <Icon
                    className="w-3.5 h-3.5"
                    style={{ color: "var(--terracotta)" }}
                  />
                )}
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
