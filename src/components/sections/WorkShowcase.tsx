"use client";

/**
 * WorkShowcase — /portfolio gallery of all builds (client, flagship, portal,
 * and self-initiated niche demos), filterable by
 * category (client / flagship / portal / demo) with animated reflow.
 *
 * Cream-pivot port 2026-05-25:
 *   - bg cream-3 (was dark gradient #061827 → #073846)
 *   - Fraunces H1 with terracotta <em> accent
 *   - Cards: cream-2 bg, 1px ink border, ink heading, ink-2 body,
 *     terracotta hover accent (was cyan-400 hover, white/5 cards)
 *   - Founder strip: cream-2 panel with terracotta CTA (was dark
 *     gradient pill with cyan glow)
 *   - Category chips re-tinted to cream-safe terracotta / sage / ink
 *   - Gigs data shape + URLs unchanged.
 */

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Play, Star } from "lucide-react";
import PortfolioScreenshot from "@/components/PortfolioScreenshot";
import { WORK_BUILDS as GIGS, type Gig } from "@/lib/work-builds";

const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6a3.1 3.1 0 0 0-1.3-1.7c-1.1-.7.1-.7.1-.7a2.5 2.5 0 0 1 1.8 1.2 2.5 2.5 0 0 0 3.4 1 2.5 2.5 0 0 1 .8-1.6c-2.7-.3-5.5-1.3-5.5-6a4.7 4.7 0 0 1 1.3-3.3 4.3 4.3 0 0 1 .1-3.2s1-.3 3.3 1.3a11.5 11.5 0 0 1 6 0c2.3-1.6 3.3-1.3 3.3-1.3a4.3 4.3 0 0 1 .1 3.2 4.7 4.7 0 0 1 1.3 3.3c0 4.7-2.9 5.7-5.6 6a2.8 2.8 0 0 1 .8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3z" />
  </svg>
);

// Category chip styles, cream-safe.
const CATEGORY_CHIP: Record<Gig["category"], React.CSSProperties> = {
  client: {
    background: "rgba(198,107,63,0.10)",
    color: "var(--terracotta)",
    border: "1px solid rgba(198,107,63,0.40)",
  },
  flagship: {
    background: "var(--ink)",
    color: "var(--cream-3)",
    border: "1px solid var(--ink)",
  },
  portal: {
    background: "rgba(63,140,94,0.10)",
    color: "#2f6f49",
    border: "1px solid rgba(63,140,94,0.40)",
  },
  demo: {
    background: "rgba(26,26,26,0.04)",
    color: "var(--ink-2)",
    border: "1px solid rgba(26,26,26,0.18)",
  },
};
const CATEGORY_LABEL: Record<Gig["category"], string> = {
  client: "Real Client",
  flagship: "Flagship",
  portal: "Portal / App",
  demo: "Niche Demo",
};

// Filter tab order + labels (drives the pill row + default sort).
const FILTERS: { key: "all" | Gig["category"]; label: string }[] = [
  { key: "all", label: "All work" },
  { key: "client", label: "Real Client" },
  { key: "flagship", label: "Flagship" },
  { key: "portal", label: "Portal / App" },
  { key: "demo", label: "Niche Demo" },
];
const CAT_ORDER: Gig["category"][] = ["client", "flagship", "portal", "demo"];

export default function WorkShowcase() {
  const [active, setActive] = useState<"all" | Gig["category"]>("all");

  // Sort once: client → flagship → portal → demo, so "All work" reads cleanly.
  const sorted = useMemo(
    () =>
      [...GIGS].sort(
        (a, b) => CAT_ORDER.indexOf(a.category) - CAT_ORDER.indexOf(b.category),
      ),
    [],
  );
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: GIGS.length };
    for (const g of GIGS) c[g.category] = (c[g.category] ?? 0) + 1;
    return c;
  }, []);
  const visible =
    active === "all" ? sorted : sorted.filter((g) => g.category === active);

  return (
    <section
      className="relative pt-24 md:pt-32 pb-16"
      style={{
        background: "var(--cream-3)",
      }}
    >
      <div className="container-x px-6 relative z-10">
        {/* HERO */}
        <div className="max-w-3xl mb-10">
          <div
            className="inline-flex items-center gap-3 mb-5"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6875rem",
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
            Recent projects · real screenshots
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              lineHeight: 1.04,
              color: "var(--ink)",
              fontSize: "clamp(40px, 6vw, 68px)",
              margin: "0 0 18px",
            }}
          >
            Filter, then open{" "}
            <span
              style={{
                fontStyle: "normal",
                color: "var(--terracotta-aa)",
                fontWeight: 700,
              }}
            >
              any live tile.
            </span>
          </h2>
          <p
            style={{
              fontSize: "1.0625rem",
              color: "var(--ink-2)",
              lineHeight: 1.6,
              maxWidth: "62ch",
            }}
          >
            Live screenshots, not mockups. Every tile links to the deployed
            site. Built solo from Bali + Lahore. Video below walks through one
            being built end-to-end in Claude Code.
          </p>
        </div>

        {/* Video — 1px ink border on cream, no dark frame */}
        <div
          className="overflow-hidden mb-12 aspect-video"
          style={{
            border: "1px solid rgba(26,26,26,0.18)",
            borderRadius: 2,
            background: "var(--ink)",
          }}
        >
          <iframe
            src="https://www.youtube.com/embed/5lT9vrzssU0"
            title="WordPress plugin development using Claude Code by Anthropic — Waseem Nasir"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
          />
        </div>

        {/* FILTER TABS */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {FILTERS.map((f) => {
            const on = active === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setActive(f.key)}
                className="relative inline-flex items-center gap-2"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  padding: "9px 15px",
                  borderRadius: 2,
                  cursor: "pointer",
                  background: on ? "var(--terracotta)" : "var(--cream-2)",
                  color: on ? "var(--cream-3)" : "var(--ink-2)",
                  border: on
                    ? "1px solid var(--terracotta)"
                    : "1px solid rgba(26,26,26,0.18)",
                  transition:
                    "background 0.18s, color 0.18s, border-color 0.18s",
                }}
              >
                {f.label}
                <span
                  style={{
                    fontSize: "0.625rem",
                    opacity: 0.7,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {counts[f.key] ?? 0}
                </span>
              </button>
            );
          })}
        </div>

        {/* GIG GRID */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((g) => (
              <motion.a
                layout
                key={g.slug}
                href={`/work/${g.slug}`}
                className="group flex flex-col"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background: "var(--cream-2)",
                  border: "1px solid rgba(26,26,26,0.12)",
                  borderRadius: 2,
                  overflow: "hidden",
                  textDecoration: "none",
                }}
              >
                <div
                  className="relative aspect-video overflow-hidden"
                  style={{ background: "rgba(26,26,26,0.06)" }}
                >
                  <PortfolioScreenshot
                    src={`/portfolio/${g.slug}.jpg`}
                    alt={`${g.title} — live screenshot`}
                  />
                  <span
                    className="absolute top-3 left-3"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.625rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      padding: "4px 8px",
                      borderRadius: 2,
                      background: "var(--cream-3)",
                      color: "var(--ink)",
                      border: "1px solid rgba(26,26,26,0.18)",
                    }}
                  >
                    {g.niche}
                  </span>
                  <span
                    className="absolute top-3 right-3"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.625rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      padding: "4px 8px",
                      borderRadius: 2,
                      ...CATEGORY_CHIP[g.category],
                    }}
                  >
                    {CATEGORY_LABEL[g.category]}
                  </span>
                  <span
                    className="absolute bottom-3 right-3 inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.625rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      padding: "4px 8px",
                      borderRadius: 2,
                      background: "var(--terracotta)",
                      color: "var(--cream-3)",
                      border: "1px solid var(--terracotta)",
                    }}
                  >
                    <ExternalLink className="w-3 h-3" /> View build
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 17,
                      lineHeight: 1.2,
                      color: "var(--ink)",
                      marginBottom: 4,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {g.title}
                  </h2>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      color: "var(--terracotta-aa)",
                      marginBottom: 12,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {g.client}
                  </p>
                  <p
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--ink-2)",
                      lineHeight: 1.55,
                      marginBottom: 16,
                    }}
                  >
                    {g.outcome}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {g.stack.map((s) => (
                      <span
                        key={s}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.625rem",
                          padding: "3px 8px",
                          borderRadius: 9999,
                          background: "var(--cream-3)",
                          border: "1px solid rgba(26,26,26,0.12)",
                          color: "var(--ink-faint)",
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Founder strip */}
        <div
          style={{
            background: "var(--cream-2)",
            border: "1px solid rgba(26,26,26,0.18)",
            padding: "clamp(20px, 5vw, 32px)",
            borderRadius: 2,
          }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="flex items-center gap-5">
            <div
              aria-hidden
              className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center"
              style={{
                borderRadius: "50%",
                background: "#A8451F",
                color: "var(--cream-3)",
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
                fontSize: 24,
                letterSpacing: "0.04em",
              }}
            >
              SL
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.625rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.16em",
                  color: "var(--terracotta-aa)",
                  marginBottom: 6,
                }}
              >
                Built by Waseem · solo · Bali-based
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 22,
                  color: "var(--ink)",
                  letterSpacing: "-0.015em",
                  marginBottom: 4,
                }}
              >
                Want yours on this page next?
              </div>
              <div
                style={{
                  fontSize: "0.875rem",
                  color: "var(--ink-2)",
                  lineHeight: 1.55,
                }}
              >
                3-min brief · 8-hour reply · limited slots.
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 w-full md:w-auto md:flex-shrink-0">
            <a
              href="https://github.com/waseemnasir2k26"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
              style={{
                background: "transparent",
                color: "var(--ink)",
                border: "1px solid var(--ink)",
                padding: "13px 21px",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "0.875rem",
                borderRadius: 2,
                textDecoration: "none",
              }}
            >
              <Star className="w-4 h-4" /> All repos
            </a>
            <a
              href="/discovery-call"
              className="inline-flex items-center gap-2"
              style={{
                background: "var(--terracotta)",
                color: "var(--cream-3)",
                padding: "14px 22px",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "0.875rem",
                borderRadius: 2,
                border: "none",
                textDecoration: "none",
              }}
            >
              <Play className="w-4 h-4" /> Book free audit
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
