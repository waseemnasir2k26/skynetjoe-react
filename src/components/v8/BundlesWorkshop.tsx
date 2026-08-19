"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import MagneticButton from "@/components/home/MagneticButton";
import { BUNDLES, type Bundle } from "@/components/v3/bundlesData";
import BundleVignette from "./BundleVignette";

// Bundle copy is imported directly from v3/bundlesData.ts — read-only reuse
// of the canonical, already-fact-checked bundle content (build brief:
// "copy VERBATIM"). No fork, no drift risk, and v3's own files are never
// modified by this build.
const VIGNETTE_COLOR: Record<string, string> = {
  "speed-to-lead": "#c66b3f",
  "inbox-ops-autopilot": "#1a1a1a",
  "ai-visibility-engine": "#8a7a5c",
};

function BundleCard({ b }: { b: Bundle }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: b.flagship ? "var(--ink)" : "var(--cream-3)",
        border: b.flagship
          ? "1px solid rgba(198,107,63,0.4)"
          : "1px solid rgba(26,26,26,0.12)",
        borderRadius: 4,
        padding: "clamp(24px, 4vw, 32px)",
      }}
    >
      <BundleVignette
        partCount={Math.min(b.whatsInside.length, 3)}
        color={b.flagship ? "#c66b3f" : (VIGNETTE_COLOR[b.id] ?? "#c66b3f")}
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
          fontSize: 21,
          lineHeight: 1.25,
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
          marginBottom: 16,
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
          gap: 10,
        }}
      >
        {b.whatsInside.map((item) => (
          <li
            key={item}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              fontSize: 13.5,
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
            fontSize: 20,
            color: "var(--cream)",
            marginTop: 20,
          }}
        >
          {b.price.setup}{" "}
          <span
            style={{
              fontSize: 13,
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
          gap: 20,
          marginTop: 18,
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

export default function BundlesWorkshop() {
  return (
    <section
      className="section"
      style={{
        background: "var(--cream-2)",
        color: "var(--ink)",
        fontFamily: "var(--font-sans)",
        borderBottom: "1px solid rgba(26,26,26,0.12)",
      }}
    >
      <div className="container-x" style={{ marginBottom: 32 }}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            color: "var(--terracotta-aa)",
            marginBottom: 16,
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
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
          Bundled fixes, not a-la-carte tasks
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            fontSize: "clamp(26px, 6vw, 40px)",
            margin: 0,
            maxWidth: "28ch",
          }}
        >
          Three problems.{" "}
          <span style={{ color: "var(--terracotta-aa)" }}>
            Watch the fix assemble itself.
          </span>
        </h2>
      </div>

      <div
        className="container-x grid gap-5"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
      >
        {BUNDLES.map((b) => (
          <BundleCard key={b.id} b={b} />
        ))}
      </div>
    </section>
  );
}
