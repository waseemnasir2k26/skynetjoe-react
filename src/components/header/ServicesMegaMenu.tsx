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
  ArrowRight,
} from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/site";

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

/**
 * Cream editorial — per-category accent is a single muted hex/var, no gradients.
 * Was cyan/violet/teal/amber; now terracotta/ochre/sage/oxblood.
 */
type Accent = {
  /** primary accent color (used for border-left, icon tint, link text) */
  color: string;
  /** very soft fill for icon container */
  fill: string;
};

const CATEGORY_META: Record<
  string,
  { pain: string; pitch: string; icon: string; accent: Accent }
> = {
  Automation: {
    pain: "Leads ghost. Tools don't talk.",
    pitch: "n8n + GHL + AI chatbots — replace the copy-paste workflow.",
    icon: "Bot",
    accent: { color: "var(--terracotta)", fill: "rgba(198,107,63,0.08)" },
  },
  "AI Content": {
    pain: "Content engine = you, exhausted.",
    pitch: "Daily voice-locked posts + reels across 5 channels, AI-tell linted.",
    icon: "Clapperboard",
    accent: { color: "var(--ochre)", fill: "rgba(201,169,110,0.10)" },
  },
  Development: {
    pain: "Website looks like 2019.",
    pitch: "Bespoke Next.js + SEO/AEO base — flagship in 14 days, not 14 weeks.",
    icon: "Globe",
    accent: { color: "var(--sage)", fill: "rgba(138,154,123,0.10)" },
  },
  Consulting: {
    pain: "Team doesn't know how to use AI.",
    pitch: "Playbooks, fractional AI lead, ops blueprint — adoption to 92%.",
    icon: "Building2",
    accent: { color: "var(--oxblood)", fill: "rgba(107,44,44,0.08)" },
  },
};

type Props = {
  onClose?: () => void;
};

export default function ServicesMegaMenu({ onClose }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = SERVICE_CATEGORIES[activeIdx];
  const meta = CATEGORY_META[active.name];
  const accent = meta.accent;
  const featured = active.services[0];
  const FeaturedIcon = ICONS[featured.icon];
  const CategoryIcon = ICONS[meta.icon];

  return (
    <div
      className="overflow-hidden flex"
      style={{
        background: "var(--cream-3)",
        border: "1px solid rgba(26,26,26,0.18)",
        boxShadow: "0 30px 60px -20px rgba(26,26,26,0.20)",
      }}
    >
      {/* LEFT RAIL — categories */}
      <div
        className="w-[260px] flex-shrink-0 p-5"
        style={{
          background: "var(--cream-2)",
          borderRight: "1px solid rgba(26,26,26,0.10)",
        }}
      >
        <div
          className="flex items-center gap-3 mb-4 px-1"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: "var(--terracotta)",
            fontWeight: 700,
          }}
        >
          <span
            style={{
              width: 22,
              height: 1,
              background: "var(--terracotta)",
              display: "inline-block",
            }}
          />
          Pick the bleed
        </div>

        <ul className="space-y-1">
          {SERVICE_CATEGORIES.map((cat, i) => {
            const isActive = i === activeIdx;
            const catMeta = CATEGORY_META[cat.name];
            const Icon = ICONS[catMeta.icon];
            const a = catMeta.accent;
            return (
              <li key={cat.name}>
                <button
                  onMouseEnter={() => setActiveIdx(i)}
                  onFocus={() => setActiveIdx(i)}
                  className="w-full flex items-center gap-3 text-left"
                  style={
                    isActive
                      ? {
                          padding: "10px 12px",
                          background: "var(--cream-3)",
                          border: "1px solid rgba(26,26,26,0.10)",
                          borderLeft: `3px solid ${a.color}`,
                          transition: "all 0.12s",
                        }
                      : {
                          padding: "10px 12px",
                          background: "transparent",
                          border: "1px solid transparent",
                          borderLeft: "3px solid transparent",
                          transition: "all 0.12s",
                        }
                  }
                >
                  <span
                    className="flex-shrink-0 w-8 h-8 flex items-center justify-center"
                    style={
                      isActive
                        ? {
                            background: a.fill,
                            border: `1px solid ${a.color}`,
                            color: a.color,
                          }
                        : {
                            background: "var(--cream-3)",
                            border: "1px solid rgba(26,26,26,0.10)",
                            color: "var(--ink-faint)",
                          }
                    }
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 14,
                        fontWeight: 600,
                        color: "var(--ink)",
                        letterSpacing: "-0.005em",
                        lineHeight: 1.15,
                      }}
                    >
                      {cat.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        color: "var(--ink-faint)",
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        marginTop: 2,
                      }}
                    >
                      {cat.services.length} services
                    </div>
                  </div>
                  {isActive && (
                    <span style={{ color: a.color }} className="flex-shrink-0">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        <div
          className="mt-5 pt-4 flex items-center gap-2"
          style={{
            borderTop: "1px solid rgba(26,26,26,0.10)",
            fontFamily: "var(--font-mono)",
            fontSize: 10.5,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "var(--ink-faint)",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              background: "var(--sage)",
              display: "inline-block",
            }}
          />
          Ship 5-14 days · solo
        </div>
      </div>

      {/* RIGHT — active category content */}
      <div className="flex-1 p-6 w-[780px]" style={{ background: "var(--cream-3)" }}>
        {/* Pain banner */}
        <div
          className="flex items-center justify-between gap-4 mb-5"
          style={{
            padding: 14,
            background: "var(--cream-2)",
            border: "1px solid rgba(26,26,26,0.10)",
            borderLeft: "3px solid var(--oxblood)",
          }}
        >
          <div className="flex items-center gap-3 min-w-0">
            {CategoryIcon && (
              <span
                className="flex-shrink-0 w-9 h-9 flex items-center justify-center"
                style={{
                  background: "rgba(107,44,44,0.08)",
                  border: "1px solid var(--oxblood)",
                  color: "var(--oxblood)",
                }}
              >
                <CategoryIcon className="w-4 h-4" />
              </span>
            )}
            <div className="min-w-0">
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.16em",
                  color: "var(--oxblood)",
                  fontWeight: 700,
                  marginBottom: 2,
                }}
              >
                — The pain
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--ink)",
                  lineHeight: 1.2,
                }}
              >
                {meta.pain}
              </div>
            </div>
          </div>
          <div
            className="hidden sm:block max-w-[280px] text-right"
            style={{
              fontSize: 12,
              color: "var(--ink-2)",
              lineHeight: 1.4,
            }}
          >
            {meta.pitch}
          </div>
        </div>

        {/* Featured service */}
        <Link
          href={`/services/${featured.slug}`}
          onClick={onClose}
          className="group block mb-4 transition-transform hover:-translate-y-0.5"
          style={{
            padding: 18,
            background: accent.fill,
            border: `1px solid rgba(26,26,26,0.10)`,
            borderLeft: `3px solid ${accent.color}`,
          }}
        >
          <div
            className="flex items-center gap-3 mb-2"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              fontWeight: 700,
              color: accent.color,
            }}
          >
            <span>— Featured</span>
            <span style={{ color: "var(--ink-faint)" }}>·</span>
            <span style={{ color: "var(--ink-faint)", fontWeight: 600 }}>
              Most picked in {active.name}
            </span>
          </div>
          <div className="flex items-start gap-4">
            {FeaturedIcon && (
              <span
                className="flex-shrink-0 w-12 h-12 flex items-center justify-center"
                style={{
                  background: "var(--cream-3)",
                  border: `1px solid ${accent.color}`,
                  color: accent.color,
                }}
              >
                <FeaturedIcon className="w-5 h-5" />
              </span>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 17,
                    fontWeight: 600,
                    color: "var(--ink)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {featured.label}
                </h3>
                <span style={{ color: accent.color }}>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: "var(--ink-2)",
                  lineHeight: 1.55,
                }}
              >
                {featured.desc}
              </p>
            </div>
          </div>
        </Link>

        {/* Remaining 3 services as compact cards */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {active.services.slice(1).map((svc) => {
            const Icon = ICONS[svc.icon];
            return (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}`}
                onClick={onClose}
                className="group"
                style={{
                  padding: 14,
                  background: "var(--cream-2)",
                  border: "1px solid rgba(26,26,26,0.10)",
                  transition: "border-color 0.18s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = accent.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(26,26,26,0.10)";
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  {Icon && (
                    <span
                      className="flex-shrink-0 w-7 h-7 flex items-center justify-center"
                      style={{
                        background: "var(--cream-3)",
                        border: `1px solid ${accent.color}`,
                        color: accent.color,
                      }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                  )}
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--ink)",
                      lineHeight: 1.2,
                    }}
                  >
                    {svc.label}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 11.5,
                    color: "var(--ink-2)",
                    lineHeight: 1.45,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {svc.desc}
                </p>
              </Link>
            );
          })}
        </div>

        {/* Footer strip */}
        <div
          className="pt-3 flex items-center justify-between"
          style={{
            borderTop: "1px solid rgba(26,26,26,0.10)",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--ink-faint)",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
          }}
        >
          <span>
            <b style={{ color: "var(--ink)" }}>16</b> services ·{" "}
            <b style={{ color: "var(--ink)" }}>4</b> categories · public pricing
          </span>
          <Link
            href="/services"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 group transition-colors"
            style={{ color: accent.color, fontWeight: 700 }}
          >
            See all 16
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
