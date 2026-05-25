"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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
    <section className="relative border-b border-[var(--border)] py-24 md:py-32 overflow-hidden">
      {/* Annotation strip */}
      <div className="container-x px-6 mb-10 flex items-center gap-3 text-xs">
        <span className="px-2.5 py-1 rounded-md bg-skynet-primary/10 text-skynet-primary-light font-semibold">
          V{id.toString().padStart(2, "0")}
        </span>
        <span className="text-fg-muted">{archetype}</span>
        <span className="text-fg-faint">·</span>
        <span className="text-fg-faint">lever: {lever}</span>
      </div>

      {/* Variant body */}
      <div
        className={
          isCream
            ? "container-x px-6 py-16 rounded-3xl bg-[#fafaf7] text-[#100f14] mx-6 max-w-[1140px]"
            : isMinimal
              ? "container-x px-6 text-center"
              : isTerminal
                ? "container-x px-6 font-mono"
                : "container-x px-6 relative"
        }
      >
        {/* Decorative orbs for default + bold */}
        {(style === "default" || isBold) && (
          <>
            <div className="orb w-[400px] h-[400px] bg-skynet-primary/30 -top-20 -left-20" />
            <div className="orb w-[500px] h-[500px] bg-skynet-secondary/25 top-40 -right-40" style={{ animationDelay: "-7s" }} />
          </>
        )}

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
                <span className="text-skynet-primary-light text-sm">$ </span>
                <span className="text-fg text-sm">skynetlabs --version 2026.05.20</span>
              </div>
            ) : null}

            <h1
              className={
                isMinimal
                  ? "text-3xl sm:text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6"
                  : isTerminal
                    ? "text-2xl sm:text-3xl md:text-5xl font-bold leading-tight mb-6 text-fg"
                    : isBold
                      ? "text-4xl sm:text-6xl md:text-8xl font-black leading-[0.95] tracking-tighter mb-6"
                      : isCream
                        ? "text-3xl sm:text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6 text-[#100f14]"
                        : "text-3xl sm:text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6"
              }
            >
              {headline}
            </h1>

            <p
              className={
                isCream
                  ? "text-lg md:text-xl text-[#4a4a52] max-w-2xl mb-10 leading-relaxed"
                  : "text-lg md:text-xl text-fg-muted max-w-2xl mb-10 leading-relaxed"
              }
            >
              {sub}
            </p>

            <div className={`flex flex-col sm:flex-row gap-4 ${isMinimal ? "justify-center" : ""}`}>
              <Link href={primaryCta.href} className="btn-primary">
                {primaryCta.label}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={secondaryCta.href}
                target={secondaryCta.href.startsWith("http") ? "_blank" : undefined}
                rel={secondaryCta.href.startsWith("http") ? "noopener" : undefined}
                className="btn-ghost"
              >
                {secondaryCta.label}
              </Link>
            </div>
          </div>

          {isSplit && (
            <div className="relative h-72 lg:h-96 rounded-2xl bg-skynet-surface/40 border border-[var(--border)] flex items-center justify-center text-fg-faint text-sm p-8">
              [ {visualNote} ]
            </div>
          )}
        </motion.div>

        {/* Visual note footer for non-split */}
        {!isSplit && (
          <p className="mt-10 text-xs text-fg-faint italic">visual concept: {visualNote}</p>
        )}
      </div>
    </section>
  );
}
