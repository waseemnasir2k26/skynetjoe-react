/**
 * InlineCTABand — mid-page horizontal CTA band (server component, no client JS).
 * Cream editorial variant.
 *
 * Psychology stack:
 *   - Pattern interrupt: terracotta/cream-2 band breaks page rhythm
 *   - Hick's Law: ONE primary CTA (book), ONE secondary (proof)
 *   - loss-frame variant: oxblood-accented urgency
 *
 * Variants:
 *   - default: terracotta block + cream text + cream-bg button (mirrors /lp/audit final CTA)
 *   - dense: cream-2 inline band, terracotta CTA, tighter padding
 *   - loss-frame: oxblood block, cream text + cream button
 */

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type InlineCTAVariant = "default" | "dense" | "loss-frame";

export type InlineCTABandProps = {
  headline: string;
  subhead?: string;
  primaryCTA?: {
    label: string;
    href: string;
  };
  secondaryCTA?: {
    label: string;
    href: string;
  };
  variant?: InlineCTAVariant;
  id?: string;
};

type VariantStyle = {
  bg: string;
  textOn: string;
  subhead: string;
  primaryBg: string;
  primaryFg: string;
  secondaryBorder: string;
  secondaryFg: string;
  border: string;
};

const VARIANT_STYLES: Record<InlineCTAVariant, VariantStyle> = {
  default: {
    bg: "var(--terracotta)",
    textOn: "var(--cream-3)",
    subhead: "rgba(250, 247, 240, 0.92)",
    primaryBg: "var(--cream-3)",
    primaryFg: "var(--terracotta)",
    secondaryBorder: "rgba(250, 247, 240, 0.55)",
    secondaryFg: "var(--cream-3)",
    border: "none",
  },
  dense: {
    bg: "var(--cream-2)",
    textOn: "var(--ink)",
    subhead: "var(--ink-2)",
    primaryBg: "var(--terracotta)",
    primaryFg: "var(--cream-3)",
    secondaryBorder: "var(--ink)",
    secondaryFg: "var(--ink)",
    border: "1px solid rgba(26,26,26,0.12)",
  },
  "loss-frame": {
    bg: "var(--oxblood)",
    textOn: "var(--cream-3)",
    subhead: "rgba(250, 247, 240, 0.85)",
    primaryBg: "var(--cream-3)",
    primaryFg: "var(--oxblood)",
    secondaryBorder: "rgba(250, 247, 240, 0.55)",
    secondaryFg: "var(--cream-3)",
    border: "none",
  },
};

export default function InlineCTABand({
  headline,
  subhead,
  primaryCTA = { label: "Book a 30-min strategy call", href: "/discovery-call" },
  secondaryCTA = { label: "See case studies", href: "/case-studies" },
  variant = "default",
  id,
}: InlineCTABandProps) {
  const v = VARIANT_STYLES[variant];
  const isDense = variant === "dense";

  return (
    <section
      id={id}
      className={isDense ? "px-4 md:px-6 my-10" : "px-4 md:px-6 my-14 md:my-20"}
      aria-label="Strategy call invitation"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <div
        className={`relative mx-auto max-w-[1200px] ${
          isDense ? "p-5 sm:p-6 md:p-8" : "p-6 sm:p-8 md:p-14"
        }`}
        style={{
          background: v.bg,
          border: v.border,
          borderRadius: 2,
        }}
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-10">
          <div className="max-w-2xl">
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                color: v.textOn,
                lineHeight: 1.1,
                fontSize: isDense ? "clamp(20px, 5vw, 30px)" : "clamp(24px, 6vw, 42px)",
                marginBottom: subhead ? 12 : 0,
                wordBreak: "break-word",
              }}
            >
              {headline}
            </h2>
            {subhead && (
              <p
                style={{
                  color: v.subhead,
                  lineHeight: 1.55,
                  fontSize: isDense ? 14 : 17,
                  margin: 0,
                }}
              >
                {subhead}
              </p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href={primaryCTA.href}
              className="inline-flex items-center justify-center gap-2"
              style={{
                background: v.primaryBg,
                color: v.primaryFg,
                padding: "14px 22px",
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: 14,
                borderRadius: 2,
                textDecoration: "none",
                minHeight: 48,
              }}
            >
              {primaryCTA.label}
              <ArrowRight className="w-4 h-4" />
            </Link>
            {secondaryCTA && (
              <Link
                href={secondaryCTA.href}
                className="inline-flex items-center justify-center"
                style={{
                  background: "transparent",
                  color: v.secondaryFg,
                  border: `1px solid ${v.secondaryBorder}`,
                  padding: "13px 20px",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: 14,
                  borderRadius: 2,
                  textDecoration: "none",
                  minHeight: 48,
                }}
              >
                {secondaryCTA.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
