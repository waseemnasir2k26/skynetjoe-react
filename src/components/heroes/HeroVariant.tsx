"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/**
 * Cream editorial pivot 2026-05-25 — HeroVariant.
 * default + bold variants now render on cream (was navy ocean).
 * cream variant kept intact (already light). Orbs removed entirely.
 */

export type HeroVariantProps = {
  id: number;
  archetype: string;
  lever: string;
  headline: React.ReactNode;
  sub: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  visualNote: string;
  style?: "default" | "minimal" | "terminal" | "split" | "cream" | "bold";
};

export default function HeroVariant({
  id,
  archetype,
  lever,
  headline,
  sub,
  primaryCta,
  secondaryCta,
  visualNote,
  style = "default",
}: HeroVariantProps) {
  const isMinimal = style === "minimal";
  const isTerminal = style === "terminal";
  const isCream = style === "cream";
  const isSplit = style === "split";
  const isBold = style === "bold";

  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        borderBottom: "1px solid var(--border)",
        background: isCream ? "#fafaf7" : "var(--cream-3)",
        color: "var(--ink)",
      }}
    >
      {/* Annotation strip */}
      <div className="container-x px-6 mb-10 flex items-center gap-3 text-xs">
        <span
          style={{
            padding: "4px 10px",
            background: "var(--cream-2)",
            color: "var(--terracotta)",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.10em",
            textTransform: "uppercase",
            border: "1px solid var(--border)",
          }}
        >
          V{id.toString().padStart(2, "0")}
        </span>
        <span style={{ color: "var(--ink-2)", fontFamily: "var(--font-mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.10em" }}>
          {archetype}
        </span>
        <span style={{ color: "var(--ink-faint)" }}>·</span>
        <span style={{ color: "var(--ink-faint)", fontFamily: "var(--font-mono)", fontSize: 11 }}>lever: {lever}</span>
      </div>

      <div
        className={
          isCream
            ? "container-x px-6 py-16 mx-6 max-w-[1140px]"
            : isMinimal
              ? "container-x px-6 text-center"
              : isTerminal
                ? "container-x px-6 font-mono"
                : "container-x px-6 relative"
        }
        style={
          isCream
            ? { background: "#fafaf7", color: "#100f14", border: "1px solid var(--border)" }
            : undefined
        }
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className={isSplit ? "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" : "max-w-4xl relative z-10"}
        >
          <div>
            {isTerminal ? (
              <div className="mb-6">
                <span style={{ color: "var(--terracotta)", fontSize: 14 }}>$ </span>
                <span style={{ color: "var(--ink)", fontSize: 14 }}>skynetlabs --version 2026.05.20</span>
              </div>
            ) : null}

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                letterSpacing: "-0.025em",
                lineHeight: 1.04,
                color: isCream ? "#100f14" : "var(--ink)",
                marginBottom: 24,
                fontSize: isBold
                  ? "clamp(40px, 9vw, 96px)"
                  : isMinimal || isCream
                    ? "clamp(36px, 6vw, 72px)"
                    : isTerminal
                      ? "clamp(24px, 4vw, 44px)"
                      : "clamp(36px, 6vw, 72px)",
              }}
            >
              {headline}
            </h1>

            <p
              style={{
                fontSize: 18,
                color: isCream ? "#4a4a52" : "var(--ink-2)",
                maxWidth: "52ch",
                marginBottom: 40,
                lineHeight: 1.6,
              }}
            >
              {sub}
            </p>

            <div className={`flex flex-col sm:flex-row gap-4 ${isMinimal ? "justify-center" : ""}`}>
              <Link
                href={primaryCta.href}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "14px 22px",
                  background: "var(--terracotta)",
                  color: "var(--cream-3)",
                  fontWeight: 600,
                  fontSize: 14,
                  borderRadius: 2,
                  fontFamily: "var(--font-sans)",
                }}
              >
                {primaryCta.label}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={secondaryCta.href}
                target={secondaryCta.href.startsWith("http") ? "_blank" : undefined}
                rel={secondaryCta.href.startsWith("http") ? "noopener" : undefined}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "13px 20px",
                  background: "transparent",
                  border: "1px solid var(--ink)",
                  color: "var(--ink)",
                  fontWeight: 600,
                  fontSize: 14,
                  borderRadius: 2,
                  fontFamily: "var(--font-sans)",
                }}
              >
                {secondaryCta.label}
              </Link>
            </div>
          </div>

          {isSplit && (
            <div
              style={{
                position: "relative",
                height: 384,
                background: "var(--cream-2)",
                border: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--ink-faint)",
                fontSize: 14,
                padding: 32,
                borderRadius: 2,
              }}
            >
              [ {visualNote} ]
            </div>
          )}
        </motion.div>

        {!isSplit && (
          <p
            style={{
              marginTop: 32,
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--ink-faint)",
              fontStyle: "normal",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.10em",
            }}
          >
            — visual concept: {visualNote}
          </p>
        )}
      </div>
    </section>
  );
}
