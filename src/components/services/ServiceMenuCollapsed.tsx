"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
  Truck,
  ChevronDown,
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
  Truck,
};

// Category-level muted accents — terracotta / ochre / sage / oxblood.
const CAT_ACCENT = [
  "var(--terracotta)",
  "var(--ochre)",
  "var(--sage)",
  "var(--oxblood)",
] as const;

export default function ServiceMenuCollapsed() {
  const [open, setOpen] = useState(false);

  return (
    <section
      className="py-14 md:py-20"
      style={{
        background: "var(--cream-3)",
        borderTop: "1px solid rgba(26,26,26,0.10)",
      }}
    >
      <div className="container-x px-6 max-w-6xl mx-auto">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
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
              For completeness
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                color: "var(--ink)",
                fontSize: "clamp(24px, 3.2vw, 34px)",
                lineHeight: 1.15,
                marginBottom: 8,
              }}
            >
              Or browse the{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: "var(--terracotta)",
                  fontWeight: 500,
                }}
              >
                full 16-service menu.
              </em>
            </h2>
            <p
              style={{
                fontSize: 14.5,
                color: "var(--ink-2)",
                maxWidth: "36rem",
                lineHeight: 1.55,
              }}
            >
              Useful if you already know exactly what you want and don&apos;t
              need a pain-frame.
            </p>
          </div>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="inline-flex items-center gap-2"
            style={{
              padding: "12px 20px",
              fontFamily: "var(--font-sans)",
              fontSize: 13,
              fontWeight: 600,
              color: open ? "var(--cream-3)" : "var(--ink)",
              background: open ? "var(--terracotta)" : "transparent",
              border: `1px solid ${open ? "var(--terracotta)" : "var(--ink)"}`,
              borderRadius: 2,
              transition: "all 0.18s",
            }}
          >
            {open ? "Hide menu" : "Show all 16"}
            <ChevronDown
              className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-4 space-y-10">
                {SERVICE_CATEGORIES.map((cat, ci) => {
                  const accent = CAT_ACCENT[ci % CAT_ACCENT.length];
                  return (
                    <div key={cat.name}>
                      <div
                        className="flex items-center gap-3 mb-4"
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 11,
                          textTransform: "uppercase",
                          letterSpacing: "0.18em",
                          color: accent,
                          fontWeight: 600,
                        }}
                      >
                        <span
                          style={{
                            width: 28,
                            height: 1,
                            background: accent,
                            display: "inline-block",
                          }}
                        />
                        — {cat.name}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {cat.services.map((svc, si) => {
                          const Icon = ICONS[svc.icon];
                          const rotate = si % 2 === 0 ? "-0.2deg" : "0.2deg";
                          return (
                            <Link
                              key={svc.slug}
                              href={("href" in svc && typeof svc.href === "string" ? svc.href : `/services/${svc.slug}`) as string}
                              className="group flex items-start gap-3"
                              style={{
                                padding: 16,
                                background: "var(--cream-2)",
                                border: "1px solid rgba(26,26,26,0.10)",
                                transform: `rotate(${rotate})`,
                                transition: "border-color 0.18s, transform 0.18s",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = accent;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor =
                                  "rgba(26,26,26,0.10)";
                              }}
                            >
                              {Icon && (
                                <span
                                  className="flex-shrink-0 mt-0.5 w-9 h-9 flex items-center justify-center"
                                  style={{
                                    background: "var(--cream-3)",
                                    border: `1px solid ${accent}`,
                                    color: accent,
                                  }}
                                >
                                  <Icon className="w-4 h-4" />
                                </span>
                              )}
                              <div className="min-w-0 flex-1">
                                <div
                                  className="flex items-center gap-1.5 mb-1"
                                  style={{
                                    fontFamily: "var(--font-display)",
                                    fontSize: 15,
                                    fontWeight: 600,
                                    color: "var(--ink)",
                                    letterSpacing: "-0.005em",
                                  }}
                                >
                                  {svc.label}
                                  {"badge" in svc && typeof svc.badge === "string" && (
                                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", padding: "2px 7px", background: "var(--terracotta)", color: "var(--cream)", borderRadius: 999, marginLeft: 6, verticalAlign: "middle" }}>
                                      {svc.badge}
                                    </span>
                                  )}
                                  <ArrowRight
                                    className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition"
                                    style={{ color: accent }}
                                  />
                                </div>
                                <p
                                  style={{
                                    fontSize: 12,
                                    color: "var(--ink-2)",
                                    lineHeight: 1.4,
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                  }}
                                >
                                  {svc.desc}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
