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
  Sparkles,
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
 * Per-category meta — pain copy, pitch, icon, plus an accent color theme
 * that swaps as the user hovers the left rail. Keeps ocean base, shifts
 * accents only (tab glow, featured card, pain banner border, Featured chip).
 */
type Accent = {
  /** rgba — used on tab + card borders */
  rgba: string;
  /** rgba — softer fill for tab bg + chip */
  fill: string;
  /** rgba — outer glow on featured card */
  glow: string;
  /** hex — solid text/icon accent */
  text: string;
  /** hex — gradient stop A */
  gradA: string;
  /** hex — gradient stop B */
  gradB: string;
};

const CATEGORY_META: Record<
  string,
  { pain: string; pitch: string; icon: string; accent: Accent }
> = {
  Automation: {
    pain: "Leads ghost. Tools don't talk.",
    pitch: "n8n + GHL + AI chatbots — replace the copy-paste workflow.",
    icon: "Bot",
    accent: {
      rgba: "rgba(0,212,255,0.40)",
      fill: "rgba(0,212,255,0.14)",
      glow: "rgba(0,212,255,0.30)",
      text: "#7EE4FF",
      gradA: "#1E88E5",
      gradB: "#00D4FF",
    },
  },
  "AI Content": {
    pain: "Content engine = you, exhausted.",
    pitch: "Daily voice-locked posts + reels across 5 channels, AI-tell linted.",
    icon: "Clapperboard",
    accent: {
      rgba: "rgba(167,139,250,0.42)",
      fill: "rgba(167,139,250,0.14)",
      glow: "rgba(167,139,250,0.30)",
      text: "#C4B5FD",
      gradA: "#8B5CF6",
      gradB: "#D946EF",
    },
  },
  Development: {
    pain: "Website looks like 2019.",
    pitch: "Bespoke Next.js + SEO/AEO base — flagship in 14 days, not 14 weeks.",
    icon: "Globe",
    accent: {
      rgba: "rgba(20,184,166,0.42)",
      fill: "rgba(20,184,166,0.14)",
      glow: "rgba(20,184,166,0.30)",
      text: "#5EEAD4",
      gradA: "#14B8A6",
      gradB: "#34D399",
    },
  },
  Consulting: {
    pain: "Team doesn't know how to use AI.",
    pitch: "Playbooks, fractional AI lead, ops blueprint — adoption to 92%.",
    icon: "Building2",
    accent: {
      rgba: "rgba(251,191,36,0.42)",
      fill: "rgba(251,191,36,0.14)",
      glow: "rgba(251,191,36,0.30)",
      text: "#FCD34D",
      gradA: "#F59E0B",
      gradB: "#FBBF24",
    },
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
      className="rounded-2xl overflow-hidden shadow-2xl flex transition-shadow duration-500"
      style={{
        background:
          "linear-gradient(135deg, rgba(10,32,52,0.98) 0%, rgba(6,24,39,0.98) 50%, rgba(7,56,70,0.98) 100%)",
        border: `1px solid ${accent.rgba}`,
        boxShadow: `0 30px 80px -10px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.02) inset, 0 0 50px -10px ${accent.glow}`,
        backdropFilter: "blur(16px) saturate(140%)",
      }}
    >
      {/* LEFT RAIL — categories */}
      <div
        className="w-[260px] flex-shrink-0 p-5"
        style={{
          background:
            "linear-gradient(180deg, rgba(6,24,39,0.6) 0%, rgba(6,24,39,0.4) 100%)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex items-center gap-1.5 mb-4 px-1">
          <Sparkles className="w-3 h-3 text-cyan-300" />
          <span className="text-[10px] uppercase tracking-[0.18em] text-cyan-300 font-bold">
            Pick the bleed
          </span>
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
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left"
                  style={
                    isActive
                      ? {
                          background: `linear-gradient(90deg, ${a.fill} 0%, transparent 100%)`,
                          border: `1px solid ${a.rgba}`,
                          boxShadow: `inset 3px 0 0 0 ${a.text}`,
                        }
                      : {
                          border: "1px solid transparent",
                          background: "transparent",
                        }
                  }
                >
                  <span
                    className="flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center transition-colors"
                    style={
                      isActive
                        ? {
                            background: a.fill,
                            border: `1px solid ${a.rgba}`,
                            color: a.text,
                          }
                        : {
                            background: "rgba(30,136,229,0.10)",
                            border: "1px solid rgba(30,136,229,0.20)",
                            color: "#7EE4FF",
                          }
                    }
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div
                      className={`text-[13px] font-bold leading-tight ${
                        isActive ? "text-white" : "text-fg"
                      }`}
                    >
                      {cat.name}
                    </div>
                    <div className="text-[10px] text-fg-faint uppercase tracking-wider mt-0.5">
                      {cat.services.length} services
                    </div>
                  </div>
                  {isActive && (
                    <span style={{ color: a.text }} className="flex-shrink-0">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        <div
          className="mt-5 pt-4 border-t border-white/[0.06] flex items-center gap-2 text-[11px]"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Ship in 5-14 days · solo operator</span>
        </div>
      </div>

      {/* RIGHT — active category content */}
      <div className="flex-1 p-6 w-[780px]">
        {/* Pain banner */}
        <div
          className="rounded-xl p-4 mb-5 flex items-center justify-between gap-4"
          style={{
            background:
              "linear-gradient(135deg, rgba(244,114,114,0.10) 0%, rgba(0,212,255,0.08) 100%)",
            border: "1px solid rgba(244,114,114,0.20)",
          }}
        >
          <div className="flex items-center gap-3 min-w-0">
            {CategoryIcon && (
              <span className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center bg-rose-500/15 border border-rose-400/30">
                <CategoryIcon className="w-4 h-4 text-rose-200" />
              </span>
            )}
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-[0.18em] text-rose-200 font-bold mb-0.5">
                The pain
              </div>
              <div className="text-sm font-bold text-white leading-tight">
                {meta.pain}
              </div>
            </div>
          </div>
          <div className="hidden sm:block text-[12px] text-cyan-200/85 leading-snug max-w-[280px] text-right">
            {meta.pitch}
          </div>
        </div>

        {/* Featured service */}
        <Link
          href={`/services/${featured.slug}`}
          onClick={onClose}
          className="group block rounded-xl p-5 mb-4 transition-transform hover:-translate-y-0.5"
          style={{
            background: `linear-gradient(135deg, ${accent.fill} 0%, rgba(20,184,166,0.06) 100%)`,
            border: `1px solid ${accent.rgba}`,
            boxShadow: `0 10px 30px -15px ${accent.glow}`,
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span
              className="text-[9px] uppercase tracking-[0.18em] font-bold px-2 py-0.5 rounded"
              style={{
                color: accent.text,
                background: accent.fill,
              }}
            >
              Featured
            </span>
            <span className="text-[10px] text-white/40">·</span>
            <span
              className="text-[10px] uppercase tracking-wider font-semibold"
              style={{ color: `${accent.text}b3` }}
            >
              Most picked in {active.name}
            </span>
          </div>
          <div className="flex items-start gap-4">
            {FeaturedIcon && (
              <span
                className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  background: accent.fill,
                  border: `1px solid ${accent.rgba}`,
                  color: accent.text,
                }}
              >
                <FeaturedIcon className="w-5 h-5" />
              </span>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-base font-extrabold text-white tracking-tight">
                  {featured.label}
                </h3>
                <span
                  style={{ color: accent.text }}
                  className="inline-flex"
                >
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
              <p className="text-[13px] text-white/80 leading-relaxed">
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
                className="group rounded-xl p-3.5 transition-colors hover:bg-white/[0.05] border border-white/[0.06] hover:border-cyan-400/30 bg-white/[0.02]"
              >
                <div className="flex items-center gap-2 mb-2">
                  {Icon && (
                    <span className="flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center bg-skynet-primary/10 border border-skynet-primary/20 group-hover:bg-skynet-primary/20 transition-colors">
                      <Icon className="w-3.5 h-3.5 text-skynet-primary-light" />
                    </span>
                  )}
                  <span className="text-[13px] font-bold text-white leading-tight">
                    {svc.label}
                  </span>
                </div>
                <p className="text-[11px] text-fg-muted leading-snug line-clamp-2">
                  {svc.desc}
                </p>
              </Link>
            );
          })}
        </div>

        {/* Footer strip */}
        <div className="pt-3 border-t border-white/[0.07] flex items-center justify-between text-[12px]">
          <span className="text-fg-muted">
            <b className="text-white">16</b> services · <b className="text-white">4</b> categories · public pricing
          </span>
          <Link
            href="/services"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 font-bold group transition-colors"
            style={{ color: accent.text }}
          >
            See all 16
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
