/**
 * InlineCTABand — mid-page horizontal CTA band (server component, no client JS).
 *
 * Psychology stack:
 *   - Pattern interrupt: gradient band breaks the page rhythm, anchors attention
 *   - Hick's Law: ONE primary CTA (book), ONE secondary (proof)
 *   - Loss-frame variant uses Kahneman/Tversky dollar framing
 *
 * Variants:
 *   - default: ocean gradient, balanced
 *   - dense: tighter padding, slot it between content sections
 *   - loss-frame: rose-accented urgency, dollar-loss subhead
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

const VARIANT_STYLES: Record<
  InlineCTAVariant,
  { bg: string; border: string; primary: string; primaryShadow: string }
> = {
  default: {
    bg: "linear-gradient(135deg, #061827 0%, #0a2d4a 50%, #073846 100%)",
    border: "1px solid rgba(126, 228, 255, 0.20)",
    primary: "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
    primaryShadow: "0 12px 32px rgba(0, 212, 255, 0.35)",
  },
  dense: {
    bg: "linear-gradient(120deg, rgba(10,45,74,0.78) 0%, rgba(7,56,70,0.78) 100%)",
    border: "1px solid rgba(126, 228, 255, 0.16)",
    primary: "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
    primaryShadow: "0 8px 24px rgba(0, 212, 255, 0.30)",
  },
  "loss-frame": {
    bg: "linear-gradient(135deg, #1a0a18 0%, #2b0e1f 50%, #3a0a1a 100%)",
    border: "1px solid rgba(255, 107, 157, 0.30)",
    primary: "linear-gradient(135deg, #FF6B9D 0%, #FF8FB1 100%)",
    primaryShadow: "0 12px 32px rgba(255, 107, 157, 0.40)",
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
    >
      <div
        className={`relative overflow-hidden mx-auto max-w-[1200px] rounded-3xl ${
          isDense ? "p-6 md:p-8" : "p-8 md:p-12"
        }`}
        style={{
          background: v.bg,
          border: v.border,
          boxShadow: "0 24px 60px -20px rgba(0, 0, 0, 0.55)",
        }}
      >
        {/* Decorative orbs */}
        <span
          aria-hidden
          className="absolute -top-24 -left-20 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background: variant === "loss-frame" ? "#FF6B9D" : "#1E88E5",
            opacity: 0.22,
            filter: "blur(70px)",
          }}
        />
        <span
          aria-hidden
          className="absolute -bottom-20 -right-16 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background: variant === "loss-frame" ? "#1E88E5" : "#14B8A6",
            opacity: 0.20,
            filter: "blur(70px)",
          }}
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-10">
          <div className="max-w-2xl">
            <h2
              className={`font-extrabold tracking-tight text-white leading-tight ${
                isDense
                  ? "text-2xl md:text-3xl mb-2"
                  : "text-3xl md:text-4xl mb-3"
              }`}
            >
              {headline}
            </h2>
            {subhead && (
              <p
                className={`text-gray-200 leading-relaxed ${
                  isDense ? "text-sm md:text-base" : "text-base md:text-lg"
                }`}
              >
                {subhead}
              </p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href={primaryCTA.href}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-transform hover:scale-[1.02] text-sm md:text-base"
              style={{
                background: v.primary,
                boxShadow: v.primaryShadow,
              }}
            >
              {primaryCTA.label}
              <ArrowRight className="w-4 h-4" />
            </Link>
            {secondaryCTA && (
              <Link
                href={secondaryCTA.href}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition border text-sm md:text-base"
                style={{
                  color: "#eaf6ff",
                  background: "rgba(255, 255, 255, 0.06)",
                  borderColor: "rgba(126, 228, 255, 0.30)",
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
