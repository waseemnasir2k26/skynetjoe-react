"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import JsonLd from "@/components/JsonLd";
import {
  ContentPipeline,
  N8nWorkflow,
  ShopifyStore,
  RetailCommerce,
  VideoEditor,
  BrandRescue,
  AEOEngine,
  WhatsAppCRM,
  AIDispatcher,
  WordPressSite,
} from "@/components/illustrations";
import type { ServiceFunnelContent } from "@/data/service-funnels/types";
import type { findServicePricing } from "@/lib/service-pricing";

/**
 * ServiceFunnel — reusable, data-driven conversion funnel for the non-top-5
 * service pages. Cream editorial, redesign 2026-06-02.
 *
 * Now a CLIENT component so interior service pages get cinematic Framer Motion:
 *   - whileInView masked slide-up reveals
 *   - staggered children on card grids
 *   - a counting stat on the big proof metric
 *   - a parallax-feel bespoke SVG illustration panel in the hero (NO photos)
 * All motion respects prefers-reduced-motion. CTAs are plain <Link> to
 * /discovery-call. AA: accent TEXT uses var(--terracotta-aa); raw
 * var(--terracotta) is reserved for backgrounds and the large display metric.
 */

type Pricing = ReturnType<typeof findServicePricing>;

const fmtPrice = (n: number) =>
  "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });

// ── slug → bespoke SVG illustration (diagrams, never photos) ───────────────
const ILLO_FOR_SLUG: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  "zapier-make": N8nWorkflow,
  "social-automation": ContentPipeline,
  "ai-video": VideoEditor,
  "youtube-automation": VideoEditor,
  "tiktok-automation": VideoEditor,
  "facebook-automation": ContentPipeline,
  "ecommerce-automation": ShopifyStore,
  "ai-business-systems": N8nWorkflow,
  "strategy-training": AEOEngine,
  "branding-design": BrandRescue,
  "ai-content-creation": ContentPipeline,
  "n8n-automation": N8nWorkflow,
  gohighlevel: WhatsAppCRM,
  "ai-chatbots": AIDispatcher,
  "wordpress-seo": WordPressSite,
  "vibe-coded-sites": RetailCommerce,
};

// ── shared motion primitives ───────────────────────────────────────────────

function Reveal({
  children,
  delay = 0,
  y = 28,
  style,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  style?: React.CSSProperties;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={style}
      initial={reduce ? false : { opacity: 0, y, clipPath: "inset(0 0 12% 0)" }}
      whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function StaggerGrid({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({
  children,
  style,
  className,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={style}
      variants={{
        hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 24 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Counts up the numeric part of the proof metric (e.g. "-70%", "180+", "8h"). */
function StatMetric({
  value,
  style,
}: {
  value: string;
  style: React.CSSProperties;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  // Split into prefix / number / suffix so "-70%" counts the 70.
  const match = value.match(/^(\D*)([\d,]+)([\s\S]*)$/);
  const prefix = match?.[1] ?? "";
  const target = match ? Number(match[2].replace(/,/g, "")) : NaN;
  const suffix = match?.[3] ?? "";

  if (reduce || !match || Number.isNaN(target)) {
    return <span style={style}>{value}</span>;
  }

  return (
    <span ref={ref} style={style} aria-label={value}>
      {prefix}
      <Counter target={target} inView={inView} numRef={numRef} />
      {suffix}
    </span>
  );
}

function Counter({
  target,
  inView,
  numRef,
}: {
  target: number;
  inView: boolean;
  numRef: React.RefObject<HTMLSpanElement | null>;
}) {
  const started = useRef(false);
  if (inView && numRef.current && !started.current) {
    started.current = true;
    const start = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      if (numRef.current)
        numRef.current.textContent = String(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
  return <span ref={numRef}>{inView ? 0 : target}</span>;
}

export default function ServiceFunnel({
  content,
  pricing,
}: {
  content: ServiceFunnelContent;
  pricing: Pricing;
}) {
  const tiers = pricing?.tiers ?? [];
  const Illo = ILLO_FOR_SLUG[content.slug] ?? N8nWorkflow;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  // Shared inline styles -----------------------------------------------------
  const eyebrow = (color: string): React.CSSProperties => ({
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.16em",
    color,
    marginBottom: 16,
    display: "inline-flex",
    alignItems: "center",
    gap: 12,
  });
  const rule = (color: string): React.CSSProperties => ({
    width: 28,
    height: 1,
    background: color,
    display: "inline-block",
  });
  const h2style: React.CSSProperties = {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(28px, 4vw, 40px)",
    fontWeight: 700,
    letterSpacing: "-0.02em",
    lineHeight: 1.12,
    color: "var(--ink)",
    marginBottom: 40,
    maxWidth: "26ch",
  };
  const primaryBtn: React.CSSProperties = {
    background: "var(--terracotta)",
    color: "var(--cream-3)",
    padding: "16px 28px",
    fontFamily: "var(--font-sans)",
    fontWeight: 600,
    fontSize: 15,
    borderRadius: 2,
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    textDecoration: "none",
    minHeight: 44,
  };
  const ghostBtn: React.CSSProperties = {
    color: "var(--terracotta-aa)",
    padding: "16px 8px",
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    fontWeight: 600,
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    textDecoration: "none",
    minHeight: 44,
  };
  // Accent for inline heading emphasis — AA-safe on cream.
  const accentText: React.CSSProperties = {
    fontStyle: "normal",
    color: "var(--terracotta-aa)",
    fontWeight: 700,
  };

  return (
    <div
      style={{
        background: "var(--cream)",
        color: "var(--ink)",
        fontFamily: "var(--font-sans)",
        position: "relative",
      }}
    >
      <JsonLd data={faqSchema} />

      <style>{`
        .sf-grid { display: grid; gap: 24px; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }
        .sf-tiers { display: grid; gap: 20px; grid-template-columns: 1fr; }
        @media (min-width: 820px) { .sf-tiers { grid-template-columns: repeat(3, 1fr); align-items: stretch; } }
        .sf-hero-grid { display: grid; grid-template-columns: 1fr; gap: clamp(28px, 6vw, 44px); align-items: center; }
        @media (min-width: 900px) { .sf-hero-grid { grid-template-columns: 7fr 5fr; } }
        .sf-illo { width: 100%; height: auto; aspect-ratio: 16 / 9; border-radius: 10px; display: block; box-shadow: 0 20px 56px rgba(26,37,64,0.16); border: 1px solid rgba(26,26,26,0.10); }
        .sf-sticky { position: fixed; left: 0; right: 0; bottom: 0; z-index: 50; display: flex; }
        @media (min-width: 760px) { .sf-sticky { display: none; } }
        .sf-pad-mobile { display: none; }
        @media (max-width: 759px) { .sf-pad-mobile { display: block; height: 72px; } }
        @media (prefers-reduced-motion: reduce) { .sf-tilt { transform: none !important; } }
      `}</style>

      {/* 1. UTILITY STRIP */}
      <div
        style={{
          background: "var(--terracotta)",
          color: "var(--cream-3)",
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.16em",
          textAlign: "center",
          padding: "10px 16px",
        }}
      >
        — {content.label} · clear pricing · ship in 14 days · Bali GMT+8
      </div>

      {/* 2. HERO */}
      <section
        style={{
          padding: "clamp(48px, 10vw, 72px) 0 clamp(56px, 12vw, 80px)",
          borderBottom: "1px solid rgba(26,26,26,0.12)",
          background: "var(--cream-3)",
          overflow: "hidden",
        }}
      >
        <div
          className="sf-hero-grid"
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 clamp(16px, 5vw, 32px)",
          }}
        >
          <Reveal>
            <div style={eyebrow("var(--terracotta-aa)")}>
              <span style={rule("var(--terracotta-aa)")} />
              {content.hero.eyebrow}
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 8vw, 68px)",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                lineHeight: 1.04,
                color: "var(--ink)",
                margin: "0 0 24px",
                maxWidth: "18ch",
              }}
            >
              {content.hero.h1}
            </h1>
            <p
              style={{
                fontSize: "clamp(17px, 2.5vw, 19px)",
                color: "var(--ink-2)",
                maxWidth: "56ch",
                lineHeight: 1.6,
                marginBottom: 28,
              }}
            >
              {content.hero.sub}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              <Link href={content.hero.primary.href} style={primaryBtn}>
                {content.hero.primary.label}
                <ArrowRight style={{ width: 16, height: 16 }} />
              </Link>
              <Link href={content.hero.secondary.href} style={ghostBtn}>
                {content.hero.secondary.label}
                <ArrowRight style={{ width: 14, height: 14 }} />
              </Link>
            </div>
            {/* trust chips */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                marginTop: 26,
              }}
            >
              {content.hero.trust.map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.10em",
                    color: "var(--ink-faint)",
                    background: "var(--cream-2)",
                    border: "1px solid rgba(26,26,26,0.12)",
                    padding: "7px 12px",
                    borderRadius: 999,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>

          {/* bespoke SVG illustration panel — diagram, never a photo. Parallax depth. */}
          <motion.div
            initial={{ opacity: 0, y: 36, rotate: -1.2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            aria-hidden
          >
            <Illo className="sf-illo" />
          </motion.div>
        </div>
      </section>

      {/* 3. PAIN */}
      <section
        style={{
          padding: "clamp(48px, 10vw, 72px) 0",
          borderBottom: "1px solid rgba(26,26,26,0.12)",
          background: "var(--cream-2)",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 clamp(16px, 5vw, 32px)",
          }}
        >
          <Reveal>
            <div style={eyebrow("var(--oxblood)")}>
              <span style={rule("var(--oxblood)")} />
              The problem
            </div>
            <h2 style={h2style}>
              What it&apos;s{" "}
              <span style={{ ...accentText, color: "var(--oxblood)" }}>
                costing you right now.
              </span>
            </h2>
          </Reveal>
          <StaggerGrid className="sf-grid">
            {content.pains.map((p, i) => (
              <StaggerItem
                key={p.title}
                className="sf-tilt"
                style={{
                  background: "var(--cream-2)",
                  border: "1px solid rgba(26,26,26,0.12)",
                  padding: 28,
                  transform: `rotate(${i % 2 === 0 ? "-0.3deg" : "0.3deg"})`,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: "var(--oxblood)",
                    marginBottom: 10,
                  }}
                >
                  Pain {String(i + 1).padStart(2, "0")}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 22,
                    fontWeight: 600,
                    color: "var(--ink)",
                    marginBottom: 10,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    color: "var(--ink-2)",
                    fontSize: 15,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {p.body}
                </p>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* 4. OUTCOMES + MID CTA */}
      <section
        style={{
          padding: "clamp(48px, 10vw, 72px) 0",
          borderBottom: "1px solid rgba(26,26,26,0.12)",
          background: "var(--cream-3)",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 clamp(16px, 5vw, 32px)",
          }}
        >
          <Reveal>
            <div style={eyebrow("var(--terracotta-aa)")}>
              <span style={rule("var(--terracotta-aa)")} />
              The after-state
            </div>
            <h2 style={h2style}>
              What you walk away <span style={accentText}>owning.</span>
            </h2>
          </Reveal>
          <StaggerGrid className="sf-grid">
            {content.outcomes.map((o) => (
              <StaggerItem
                key={o.title}
                style={{
                  background: "var(--cream-3)",
                  border: "1px solid rgba(26,26,26,0.12)",
                  borderLeft: "3px solid var(--sage)",
                  padding: 28,
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 20,
                    fontWeight: 600,
                    color: "var(--ink)",
                    marginBottom: 10,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {o.title}
                </h3>
                <p
                  style={{
                    color: "var(--ink-2)",
                    fontSize: 15,
                    lineHeight: 1.6,
                    margin: o.proof ? "0 0 12px" : 0,
                  }}
                >
                  {o.body}
                </p>
                {o.proof && (
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: "0.10em",
                      color: "var(--oxblood)",
                    }}
                  >
                    — {o.proof}
                  </div>
                )}
              </StaggerItem>
            ))}
          </StaggerGrid>

          {/* MID-PAGE CTA */}
          <Reveal delay={0.05}>
            <div
              style={{
                marginTop: 40,
                display: "flex",
                alignItems: "center",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <Link href="/discovery-call" style={primaryBtn}>
                Book a free 30-min check-up
                <ArrowRight style={{ width: 16, height: 16 }} />
              </Link>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "var(--ink-faint)",
                }}
              >
                — fixed scope back in 48 hours · no quote dance
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4b. COMPARISON (optional) */}
      {content.comparison && (
        <section
          style={{
            padding: "clamp(48px, 10vw, 72px) 0",
            borderBottom: "1px solid rgba(26,26,26,0.12)",
            background: "var(--cream)",
          }}
        >
          <div
            style={{
              maxWidth: 1000,
              margin: "0 auto",
              padding: "0 clamp(16px, 5vw, 32px)",
            }}
          >
            <Reveal>
              <div style={eyebrow("var(--terracotta-aa)")}>
                <span style={rule("var(--terracotta-aa)")} />
                The honest comparison
              </div>
              <h2 style={h2style}>{content.comparison.heading}</h2>
            </Reveal>
            <Reveal delay={0.05}>
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: 14,
                    minWidth: 520,
                  }}
                >
                  <thead>
                    <tr>
                      {content.comparison.cols.map((c, i) => (
                        <th
                          key={i}
                          style={{
                            textAlign: "left",
                            padding: "12px 16px",
                            fontFamily: "var(--font-mono)",
                            fontSize: 11,
                            textTransform: "uppercase",
                            letterSpacing: "0.12em",
                            color:
                              i === 1
                                ? "var(--terracotta-aa)"
                                : "var(--ink-faint)",
                            borderBottom: "1px solid rgba(26,26,26,0.16)",
                            background:
                              i === 1 ? "var(--cream-2)" : "transparent",
                          }}
                        >
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {content.comparison.rows.map((r) => (
                      <tr key={r.dimension}>
                        <td
                          style={{
                            padding: "14px 16px",
                            color: "var(--ink)",
                            fontWeight: 600,
                            borderBottom: "1px solid rgba(26,26,26,0.08)",
                            verticalAlign: "top",
                          }}
                        >
                          {r.dimension}
                        </td>
                        <td
                          style={{
                            padding: "14px 16px",
                            color: "var(--ink)",
                            borderBottom: "1px solid rgba(26,26,26,0.08)",
                            background: "var(--cream-2)",
                            verticalAlign: "top",
                            lineHeight: 1.5,
                          }}
                        >
                          <span
                            aria-hidden
                            style={{ color: "var(--sage)", marginRight: 8 }}
                          >
                            ✓
                          </span>
                          {r.us}
                        </td>
                        <td
                          style={{
                            padding: "14px 16px",
                            color: "var(--ink-2)",
                            borderBottom: "1px solid rgba(26,26,26,0.08)",
                            verticalAlign: "top",
                            lineHeight: 1.5,
                          }}
                        >
                          {r.them}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* 5. PROCESS */}
      <section
        style={{
          padding: "clamp(48px, 10vw, 72px) 0",
          borderBottom: "1px solid rgba(26,26,26,0.12)",
          background: "var(--cream-2)",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 clamp(16px, 5vw, 32px)",
          }}
        >
          <Reveal>
            <div style={eyebrow("var(--terracotta-aa)")}>
              <span style={rule("var(--terracotta-aa)")} />
              How it works
            </div>
            <h2 style={h2style}>
              Three steps, <span style={accentText}>no mystery.</span>
            </h2>
          </Reveal>
          <StaggerGrid
            style={{
              display: "grid",
              gap: 24,
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            }}
          >
            {content.process.map((s, i) => (
              <StaggerItem
                key={s.title}
                style={{
                  background: "var(--cream-2)",
                  border: "1px solid rgba(26,26,26,0.12)",
                  padding: 28,
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 36,
                    height: 36,
                    borderRadius: 4,
                    background: "var(--terracotta)",
                    color: "var(--cream-3)",
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: 18,
                    marginBottom: 14,
                  }}
                >
                  {i + 1}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 20,
                    fontWeight: 600,
                    color: "var(--ink)",
                    marginBottom: 10,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    color: "var(--ink-2)",
                    fontSize: 15,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {s.body}
                </p>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* 5b. TOOL STACK (optional) — quiet "tools we use" strip, plain words above */}
      {content.toolStack && (
        <section
          style={{
            padding: "clamp(32px, 7vw, 48px) 0",
            borderBottom: "1px solid rgba(26,26,26,0.12)",
            background: "var(--cream-3)",
          }}
        >
          <Reveal
            style={{
              maxWidth: 1000,
              margin: "0 auto",
              padding: "0 clamp(16px, 5vw, 32px)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 16,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: "var(--ink-faint)",
                }}
              >
                {content.toolStack.label}
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {content.toolStack.items.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      color: "var(--ink)",
                      background: "var(--cream-2)",
                      border: "1px solid rgba(26,26,26,0.12)",
                      padding: "6px 12px",
                      borderRadius: 4,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* 5c. FIT CHECK (optional) */}
      {content.fitCheck && (
        <section
          style={{
            padding: "clamp(48px, 10vw, 72px) 0",
            borderBottom: "1px solid rgba(26,26,26,0.12)",
            background: "var(--cream-2)",
          }}
        >
          <div
            style={{
              maxWidth: 1000,
              margin: "0 auto",
              padding: "0 clamp(16px, 5vw, 32px)",
            }}
          >
            <Reveal>
              <div style={eyebrow("var(--terracotta-aa)")}>
                <span style={rule("var(--terracotta-aa)")} />
                Honest fit check
              </div>
              <h2 style={{ ...h2style, marginBottom: 28 }}>
                The right fit, <span style={accentText}>or an honest no.</span>
              </h2>
            </Reveal>
            <StaggerGrid
              style={{
                display: "grid",
                gap: 20,
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              }}
            >
              <StaggerItem
                style={{
                  background: "var(--cream-3)",
                  border: "1px solid rgba(26,26,26,0.12)",
                  borderLeft: "3px solid var(--sage)",
                  padding: 24,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    color: "var(--oxblood)",
                    marginBottom: 14,
                  }}
                >
                  This is for you if
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {content.fitCheck.forYou.map((f) => (
                    <li
                      key={f}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "16px 1fr",
                        gap: 10,
                        padding: "7px 0",
                        fontSize: 15,
                        color: "var(--ink)",
                        lineHeight: 1.55,
                      }}
                    >
                      <span aria-hidden style={{ color: "var(--sage)" }}>
                        ✓
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </StaggerItem>
              <StaggerItem
                style={{
                  background: "var(--cream-3)",
                  border: "1px solid rgba(26,26,26,0.12)",
                  borderLeft: "3px solid var(--oxblood)",
                  padding: 24,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    color: "var(--oxblood)",
                    marginBottom: 14,
                  }}
                >
                  We&apos;re not a fit if
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {content.fitCheck.notForYou.map((f) => (
                    <li
                      key={f}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "16px 1fr",
                        gap: 10,
                        padding: "7px 0",
                        fontSize: 15,
                        color: "var(--ink-2)",
                        lineHeight: 1.55,
                      }}
                    >
                      <span aria-hidden style={{ color: "var(--oxblood)" }}>
                        ✕
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            </StaggerGrid>
          </div>
        </section>
      )}

      {/* 6. PROOF — counting stat */}
      <section
        style={{
          padding: "clamp(56px, 12vw, 96px) 0",
          borderBottom: "1px solid rgba(26,26,26,0.12)",
          background: "var(--cream)",
          textAlign: "center",
        }}
      >
        <Reveal
          style={{
            maxWidth: 760,
            margin: "0 auto",
            padding: "0 clamp(16px, 5vw, 32px)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "var(--ink-faint)",
              marginBottom: 14,
            }}
          >
            — Receipts, not promises
          </div>
          <StatMetric
            value={content.proof.metric}
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(48px, 11vw, 110px)",
              lineHeight: 0.95,
              color: "var(--terracotta)",
              letterSpacing: "-0.03em",
              marginBottom: 18,
              display: "block",
            }}
          />
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(17px, 3vw, 22px)",
              color: "var(--ink-2)",
              lineHeight: 1.45,
              maxWidth: "40ch",
              margin: "0 auto 12px",
            }}
          >
            {content.proof.detail}
          </p>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "var(--ink-faint)",
            }}
          >
            — {content.proof.client}
          </div>
        </Reveal>
      </section>

      {/* 6b. SECONDARY PROOF (optional) */}
      {content.secondaryProof && (
        <section
          style={{
            padding: "clamp(40px, 9vw, 64px) 0",
            borderBottom: "1px solid rgba(26,26,26,0.12)",
            background: "var(--cream-2)",
          }}
        >
          <Reveal
            style={{
              maxWidth: 900,
              margin: "0 auto",
              padding: "0 clamp(16px, 5vw, 32px)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "baseline",
                gap: "0 22px",
                borderLeft: "3px solid var(--terracotta)",
                paddingLeft: 22,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(30px, 6vw, 52px)",
                  color: "var(--terracotta)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}
              >
                {content.secondaryProof.metric}
              </div>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(15px, 2.5vw, 19px)",
                  color: "var(--ink-2)",
                  lineHeight: 1.45,
                  margin: 0,
                  flex: 1,
                  minWidth: 240,
                }}
              >
                {content.secondaryProof.detail}
              </p>
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "var(--ink-faint)",
                paddingLeft: 22,
                marginTop: 12,
              }}
            >
              — {content.secondaryProof.client}
            </div>
          </Reveal>
        </section>
      )}

      {/* 7. PRICING */}
      {tiers.length > 0 && (
        <section
          style={{
            padding: "clamp(48px, 10vw, 72px) 0",
            borderBottom: "1px solid rgba(26,26,26,0.12)",
            background: "var(--cream-3)",
          }}
        >
          <div
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              padding: "0 clamp(16px, 5vw, 32px)",
            }}
          >
            <Reveal>
              <div style={eyebrow("var(--terracotta-aa)")}>
                <span style={rule("var(--terracotta-aa)")} />
                Investment
              </div>
              <h2 style={h2style}>
                Clear pricing. <span style={accentText}>No quote dance.</span>
              </h2>
            </Reveal>
            <StaggerGrid className="sf-tiers">
              {tiers.map((tier) => {
                const featured = Boolean(tier.badge);
                return (
                  <StaggerItem
                    key={tier.name}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      background: featured
                        ? "var(--cream-2)"
                        : "var(--cream-3)",
                      border: featured
                        ? "1px solid var(--terracotta)"
                        : "1px solid rgba(26,26,26,0.12)",
                      padding: 28,
                      height: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 12,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 11,
                          textTransform: "uppercase",
                          letterSpacing: "0.16em",
                          color: "var(--ink-faint)",
                        }}
                      >
                        {tier.name}
                      </span>
                      {tier.badge && (
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 10,
                            textTransform: "uppercase",
                            letterSpacing: "0.12em",
                            color: "var(--cream-3)",
                            background: "var(--terracotta)",
                            padding: "4px 8px",
                            borderRadius: 999,
                          }}
                        >
                          {tier.badge}
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: 38,
                        color: "var(--ink)",
                        letterSpacing: "-0.02em",
                        lineHeight: 1,
                      }}
                    >
                      {fmtPrice(tier.price)}
                      {tier.cadence === "monthly" && (
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 13,
                            color: "var(--ink-faint)",
                            letterSpacing: "0.02em",
                          }}
                        >
                          {" "}
                          /mo
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        color: "var(--ink-faint)",
                        margin: "8px 0 14px",
                      }}
                    >
                      Ship: {tier.ship}
                    </div>
                    <p
                      style={{
                        color: "var(--ink-2)",
                        fontSize: 14,
                        lineHeight: 1.55,
                        margin: "0 0 16px",
                      }}
                    >
                      {tier.tagline}
                    </p>
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: "0 0 22px",
                        flexGrow: 1,
                      }}
                    >
                      {tier.features.map((f) => (
                        <li
                          key={f}
                          style={{
                            display: "grid",
                            gridTemplateColumns: "16px 1fr",
                            gap: 10,
                            padding: "8px 0",
                            borderBottom: "1px solid rgba(26,26,26,0.06)",
                            fontSize: 13.5,
                            color: "var(--ink)",
                            lineHeight: 1.5,
                          }}
                        >
                          <span
                            aria-hidden
                            style={{ color: "var(--sage)", marginTop: 1 }}
                          >
                            ✓
                          </span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={tier.ctaHref}
                      style={{
                        ...primaryBtn,
                        justifyContent: "center",
                        background: featured
                          ? "var(--terracotta)"
                          : "transparent",
                        color: featured
                          ? "var(--cream-3)"
                          : "var(--terracotta-aa)",
                        border: featured
                          ? "1px solid var(--terracotta)"
                          : "1px solid var(--terracotta-aa)",
                      }}
                    >
                      {tier.ctaLabel}
                      <ArrowRight style={{ width: 16, height: 16 }} />
                    </Link>
                  </StaggerItem>
                );
              })}
            </StaggerGrid>
          </div>
        </section>
      )}

      {/* 7b. GUARANTEE / RISK-REVERSAL (optional) */}
      {content.guarantee && (
        <section
          style={{
            padding: "clamp(40px, 9vw, 64px) 0",
            borderBottom: "1px solid rgba(26,26,26,0.12)",
            background: "color-mix(in srgb, var(--sage) 10%, var(--cream-3))",
          }}
        >
          <Reveal
            style={{
              maxWidth: 760,
              margin: "0 auto",
              padding: "0 clamp(16px, 5vw, 32px)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "var(--oxblood)",
                marginBottom: 14,
              }}
            >
              — The risk is on me
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(24px, 4vw, 36px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.12,
                color: "var(--ink)",
                marginBottom: 14,
              }}
            >
              {content.guarantee.title}
            </h2>
            <p
              style={{
                fontSize: "clamp(15px, 2.5vw, 17px)",
                color: "var(--ink-2)",
                maxWidth: "52ch",
                margin: "0 auto",
                lineHeight: 1.6,
              }}
            >
              {content.guarantee.body}
            </p>
          </Reveal>
        </section>
      )}

      {/* 8. FAQ */}
      <section
        style={{
          padding: "clamp(48px, 10vw, 72px) 0",
          borderBottom: "1px solid rgba(26,26,26,0.12)",
          background: "var(--cream-2)",
        }}
      >
        <div
          style={{
            maxWidth: 820,
            margin: "0 auto",
            padding: "0 clamp(16px, 5vw, 32px)",
          }}
        >
          <Reveal>
            <div style={eyebrow("var(--terracotta-aa)")}>
              <span style={rule("var(--terracotta-aa)")} />
              Questions
            </div>
            <h2 style={{ ...h2style, marginBottom: 28 }}>
              Before you <span style={accentText}>book the call.</span>
            </h2>
          </Reveal>
          {content.faqs.map((f) => (
            <details
              key={f.q}
              style={{
                background: "var(--cream-3)",
                border: "1px solid rgba(26,26,26,0.12)",
                borderRadius: 2,
                marginBottom: 10,
              }}
            >
              <summary
                style={{
                  padding: "16px 18px",
                  cursor: "pointer",
                  listStyle: "none",
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 17,
                  color: "var(--ink)",
                  minHeight: 44,
                }}
              >
                {f.q}
              </summary>
              <div
                style={{
                  padding: "0 18px 18px",
                  fontSize: 15,
                  color: "var(--ink-2)",
                  lineHeight: 1.7,
                }}
              >
                {f.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* 8b. FREE TOOLS (optional) — hub↔spoke↔money cross-link */}
      {content.freeTools && (
        <section
          style={{
            padding: "clamp(32px, 7vw, 48px) 0",
            borderBottom: "1px solid rgba(26,26,26,0.12)",
            background: "var(--cream-3)",
          }}
        >
          <Reveal
            style={{
              maxWidth: 1000,
              margin: "0 auto",
              padding: "0 clamp(16px, 5vw, 32px)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 16,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: "var(--ink-faint)",
                }}
              >
                {content.freeTools.label}
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {content.freeTools.items.map((t) => (
                  <Link
                    key={t.href}
                    href={t.href}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      color: "var(--terracotta-aa)",
                      background: "var(--cream-2)",
                      border: "1px solid rgba(26,26,26,0.12)",
                      padding: "8px 14px",
                      borderRadius: 4,
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    {t.label}
                    <ArrowRight style={{ width: 12, height: 12 }} />
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* 9. FINAL CTA */}
      <section
        style={{
          padding: "clamp(56px, 12vw, 88px) 0 clamp(64px, 14vw, 100px)",
          background:
            "linear-gradient(180deg, var(--cream) 0%, color-mix(in srgb, var(--terracotta) 8%, var(--cream)) 100%)",
        }}
      >
        <Reveal
          style={{
            maxWidth: 760,
            margin: "0 auto",
            padding: "0 clamp(16px, 5vw, 32px)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "var(--terracotta-aa)",
              marginBottom: 20,
            }}
          >
            — Start the brief
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(30px, 5vw, 52px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "var(--ink)",
              marginBottom: 20,
            }}
          >
            {content.finalCta.h2}
          </h2>
          <p
            style={{
              fontSize: "clamp(15px, 2.5vw, 17px)",
              color: "var(--ink-2)",
              maxWidth: "46ch",
              margin: "0 auto 32px",
              lineHeight: 1.6,
            }}
          >
            {content.finalCta.body}
          </p>
          <Link
            href="/discovery-call"
            style={{
              ...primaryBtn,
              padding: "18px 32px",
              fontWeight: 700,
              fontSize: 16,
            }}
          >
            {content.finalCta.ctaLabel}
            <ArrowRight style={{ width: 16, height: 16 }} />
          </Link>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--ink-faint)",
              marginTop: 22,
            }}
          >
            — 4 builds per month · 8-hour weekday reply
          </div>
        </Reveal>
      </section>

      {/* spacer so sticky bar never covers final content on mobile */}
      <div className="sf-pad-mobile" aria-hidden />

      {/* 10. STICKY MOBILE CTA */}
      <div
        className="sf-sticky"
        style={{
          background: "var(--cream-3)",
          borderTop: "1px solid rgba(26,26,26,0.16)",
          boxShadow: "0 -6px 24px rgba(26,37,64,0.10)",
          padding: "10px 16px calc(10px + env(safe-area-inset-bottom))",
        }}
      >
        <Link
          href="/discovery-call"
          style={{
            ...primaryBtn,
            flex: 1,
            justifyContent: "center",
            fontWeight: 700,
          }}
        >
          Book a 30-min call
          <ArrowRight style={{ width: 16, height: 16 }} />
        </Link>
      </div>
    </div>
  );
}
