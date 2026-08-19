"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import Reveal from "@/components/home/Reveal";
import MagneticButton from "@/components/home/MagneticButton";
import { BUNDLES, type Bundle } from "@/components/v3/bundlesData";

/**
 * Bundle copy is imported VERBATIM from v3/bundlesData.ts (read-only import,
 * no fork) — same 3 offers, same flagship price ($2,750 setup + $395/mo for
 * Inbox Ops Autopilot), same proof lines. Only the presentation differs:
 * editorial frosted-glass panels (backdrop-filter blur over the cream
 * paper) in a static grid, matching the GLASSHOUSE design language instead
 * of v3's GSAP horizontal-pin machine-shop layout.
 */
function GlassBundleCard({ b }: { b: Bundle }) {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        background: b.flagship
          ? "linear-gradient(165deg, rgba(26,26,26,0.94), rgba(26,26,26,0.86))"
          : "rgba(255,255,255,0.5)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: b.flagship
          ? "1px solid rgba(198,107,63,0.5)"
          : "1px solid rgba(255,255,255,0.6)",
        borderRadius: 6,
        padding: "clamp(28px, 4vw, 40px)",
        boxShadow: b.flagship
          ? "0 30px 70px rgba(26,26,26,0.25)"
          : "0 24px 60px rgba(26,26,26,0.08)",
      }}
    >
      {/* Glass sheen accent */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: 2,
          background: b.flagship
            ? "linear-gradient(90deg, transparent, rgba(198,107,63,0.8), transparent)"
            : "linear-gradient(90deg, transparent, rgba(198,107,63,0.5), transparent)",
        }}
      />

      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          color: b.flagship ? "var(--terracotta)" : "var(--terracotta-aa)",
          marginBottom: 14,
        }}
      >
        {b.eyebrow}
      </div>

      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "clamp(22px, 3.2vw, 27px)",
          lineHeight: 1.2,
          color: b.flagship ? "var(--cream)" : "var(--ink)",
          marginBottom: 10,
        }}
      >
        {b.painHeadline}
      </h3>

      <div
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 16,
          fontWeight: 600,
          color: b.flagship ? "var(--terracotta)" : "var(--terracotta-aa)",
          marginBottom: 20,
        }}
      >
        → {b.name}
      </div>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: "0 0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 11,
        }}
      >
        {b.whatsInside.map((item) => (
          <li
            key={item}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              fontSize: 14.5,
              lineHeight: 1.55,
              color: b.flagship ? "rgba(242,239,230,0.82)" : "var(--ink-2)",
            }}
          >
            <Check
              style={{
                width: 15,
                height: 15,
                marginTop: 3,
                flexShrink: 0,
                color: "var(--terracotta-aa)",
              }}
              strokeWidth={2.5}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {b.proofLine && (
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11.5,
            lineHeight: 1.5,
            color: b.flagship ? "rgba(242,239,230,0.65)" : "var(--ink-faint)",
            borderTop: b.flagship
              ? "1px solid rgba(242,239,230,0.14)"
              : "1px solid rgba(26,26,26,0.1)",
            paddingTop: 14,
            marginTop: 22,
          }}
        >
          — {b.proofLine}
        </p>
      )}

      {b.price && (
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 22,
            color: "var(--cream)",
            marginTop: 22,
          }}
        >
          {b.price.setup}{" "}
          <span
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "rgba(242,239,230,0.6)",
            }}
          >
            + {b.price.monthly}
          </span>
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 18,
          marginTop: 22,
        }}
      >
        <MagneticButton>
          <Link
            href="/discovery-call"
            style={{
              background: "var(--terracotta)",
              color: "var(--cream-3)",
              padding: "13px 22px",
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: 14,
              borderRadius: 2,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              textDecoration: "none",
              minHeight: 44,
            }}
          >
            Book a free 30-min check-up
            <ArrowRight style={{ width: 14, height: 14 }} />
          </Link>
        </MagneticButton>

        {!b.flagship && (
          <Link
            href="/pricing"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--ink)",
              textDecoration: "underline",
              textUnderlineOffset: 4,
            }}
          >
            See pricing
          </Link>
        )}

        {b.freeEntry && (
          <Link
            href={b.freeEntry.href}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--terracotta-aa)",
              textDecoration: "underline",
              textUnderlineOffset: 4,
            }}
          >
            {b.freeEntry.label}
          </Link>
        )}
      </div>
    </div>
  );
}

export default function BundlesGlass() {
  return (
    <section
      className="section"
      style={{
        position: "relative",
        background: "var(--cream)",
        fontFamily: "var(--font-sans)",
      }}
    >
      <div className="container-x" style={{ maxWidth: 1180 }}>
        <Reveal className="mb-12">
          <div style={{ maxWidth: "32ch" }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "var(--terracotta-aa)",
                marginBottom: 16,
              }}
            >
              Bundled fixes, not a-la-carte tasks
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.06,
                fontSize: "clamp(30px, 6.5vw, 56px)",
                margin: 0,
                maxWidth: "18ch",
              }}
            >
              Three problems.{" "}
              <span style={{ color: "var(--terracotta-aa)" }}>
                Three systems that end them.
              </span>
            </h2>
          </div>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "clamp(20px, 3vw, 28px)",
          }}
        >
          {BUNDLES.map((b, i) => (
            <Reveal key={b.id} delay={i * 0.08}>
              <GlassBundleCard b={b} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
