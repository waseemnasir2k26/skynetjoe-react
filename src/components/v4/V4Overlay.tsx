"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MagneticButton from "@/components/home/MagneticButton";
import CountUp from "@/components/home/CountUp";
import { BUNDLES, FINALE, HERO, PROOF_STATS, STATIONS } from "./v4Data";

/**
 * DOM overlay cards for "THE LINE" — one per scroll station, absolutely
 * stacked inside the sticky canvas viewport and crossfaded by
 * V4Journey.tsx's ScrollTrigger onUpdate (opacity written directly via the
 * refs below, NOT React state — keeps the 60fps scrub path free of
 * re-renders). The entrance card starts server-rendered at opacity:1 (see
 * inline style) so the H1 is the true LCP element regardless of whether JS
 * has resolved scene/fallback mode yet.
 *
 * eyebrow/label styling matches the v3 "The machine"/"The receipts" system
 * (same tokens, same mono-eyebrow-with-rule convention) — kept visually
 * consistent with the rest of the site rather than inventing a new style
 * language for one route.
 */

const eyebrowStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.16em",
  color: "var(--terracotta-aa)",
  marginBottom: 16,
  display: "inline-flex",
  alignItems: "center",
  gap: 12,
};

const ruleStyle: React.CSSProperties = {
  width: 28,
  height: 1,
  background: "var(--terracotta)",
  display: "inline-block",
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div style={eyebrowStyle}>
      <span style={ruleStyle} />
      {children}
    </div>
  );
}

export default function V4Overlay({
  stationRefs,
}: {
  stationRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}) {
  return (
    <div
      className="container-x absolute"
      style={{
        zIndex: 2,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Station 0 — entrance / hero. Server-rendered visible (opacity:1
          inline, not class-driven) so the H1 is the LCP element even
          before the journey's mode/JS has resolved. */}
      <div
        ref={(el) => {
          stationRefs.current[0] = el;
        }}
        style={{
          position: "absolute",
          inset: 0,
          opacity: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ maxWidth: 640, pointerEvents: "auto" }}>
          <Eyebrow>{HERO.eyebrow}</Eyebrow>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              lineHeight: 1.08,
              fontSize: "clamp(30px, 6.2vw, 60px)",
              margin: "0 0 20px",
              color: "var(--ink)",
            }}
          >
            {HERO.headlineA}{" "}
            <span style={{ color: "var(--terracotta-aa)" }}>
              {HERO.headlineB}
            </span>
          </h1>
          <p
            style={{
              fontSize: "clamp(15px, 2.6vw, 18px)",
              color: "var(--ink-2)",
              maxWidth: "48ch",
              lineHeight: 1.6,
              marginBottom: 28,
            }}
          >
            {HERO.sub}
          </p>
          <MagneticButton>
            <Link
              href={HERO.ctaHref}
              style={{
                background: "var(--terracotta)",
                color: "var(--cream-3)",
                padding: "15px 26px",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: 15,
                borderRadius: 2,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                textDecoration: "none",
                minHeight: 48,
                boxShadow: "0 16px 40px rgba(26,26,26,0.16)",
              }}
            >
              {HERO.ctaLabel}
              <ArrowRight style={{ width: 16, height: 16 }} />
            </Link>
          </MagneticButton>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--ink-faint)",
              marginTop: 20,
            }}
          >
            — Scroll: ride the line
          </div>
        </div>
      </div>

      {/* Stations 1-3 — the three bundle machines. */}
      {BUNDLES.map((b, i) => (
        <div
          key={b.id}
          ref={(el) => {
            stationRefs.current[i + 1] = el;
          }}
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0,
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              maxWidth: 420,
              marginLeft: i === 2 ? "auto" : 0,
              marginRight: i === 0 ? "auto" : undefined,
              pointerEvents: "auto",
              background: "rgba(250,247,240,0.88)",
              backdropFilter: "blur(6px)",
              border: b.flagship
                ? "1.5px solid var(--terracotta)"
                : "1px solid rgba(26,26,26,0.14)",
              borderRadius: 4,
              padding: "clamp(20px, 4vw, 28px)",
            }}
          >
            <Eyebrow>{b.eyebrow}</Eyebrow>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--ink-faint)",
                marginBottom: 8,
              }}
            >
              {b.painHeadline}
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(20px, 3.4vw, 28px)",
                letterSpacing: "-0.01em",
                margin: "0 0 14px",
                color: "var(--ink)",
              }}
            >
              {b.name}
            </h2>
            <ul style={{ margin: "0 0 14px", padding: 0, listStyle: "none" }}>
              {b.whatsInside.map((line) => (
                <li
                  key={line}
                  style={{
                    fontSize: 13.5,
                    color: "var(--ink-2)",
                    lineHeight: 1.55,
                    marginBottom: 6,
                    paddingLeft: 16,
                    position: "relative",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: 0,
                      color: "var(--terracotta-aa)",
                    }}
                  >
                    →
                  </span>
                  {line}
                </li>
              ))}
            </ul>
            {b.proofLine && (
              <div
                style={{
                  fontSize: 12.5,
                  color: "var(--terracotta-aa)",
                  fontStyle: "italic",
                  marginBottom: 10,
                }}
              >
                {b.proofLine}
              </div>
            )}
            {b.price && (
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "var(--ink)",
                  marginBottom: 10,
                }}
              >
                {b.price.setup} + {b.price.monthly}
              </div>
            )}
            {b.freeEntry && (
              <Link
                href={b.freeEntry.href}
                style={{
                  fontSize: 13,
                  color: "var(--terracotta-aa)",
                  fontWeight: 600,
                  textDecoration: "underline",
                }}
              >
                {b.freeEntry.label} →
              </Link>
            )}
          </div>
        </div>
      ))}

      {/* Station 4 — data-readout wall (real proof numbers, count-up). */}
      <div
        ref={(el) => {
          stationRefs.current[4] = el;
        }}
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            maxWidth: 620,
            margin: "0 auto",
            textAlign: "center",
            pointerEvents: "auto",
          }}
        >
          <Eyebrow>The receipts</Eyebrow>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(24px, 4.6vw, 36px)",
              letterSpacing: "-0.02em",
              margin: "0 0 22px",
              color: "var(--ink)",
            }}
          >
            Order settles.{" "}
            <span style={{ color: "var(--terracotta-aa)" }}>
              The track record doesn&rsquo;t move.
            </span>
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: 12,
            }}
          >
            {PROOF_STATS.map((s) => (
              <div
                key={s.label}
                style={{
                  background: "rgba(250,247,240,0.9)",
                  border: "1px solid rgba(26,26,26,0.12)",
                  padding: "14px 8px",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "clamp(20px, 4vw, 30px)",
                    color: "var(--terracotta-aa)",
                    lineHeight: 1,
                    marginBottom: 6,
                  }}
                >
                  <CountUp value={s.value} suffix={s.suffix} />
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 9.5,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "var(--ink-2)",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Station 5 — lit CTA booth finale. */}
      <div
        ref={(el) => {
          stationRefs.current[5] = el;
        }}
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            maxWidth: 560,
            margin: "0 auto",
            textAlign: "center",
            pointerEvents: "auto",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "var(--terracotta-aa)",
              marginBottom: 18,
            }}
          >
            {FINALE.eyebrow}
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(26px, 5.4vw, 44px)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              margin: "0 0 18px",
              color: "var(--ink)",
            }}
          >
            {FINALE.headline}
          </h2>
          <p
            style={{
              fontSize: "clamp(14px, 2.6vw, 16px)",
              color: "var(--ink-2)",
              maxWidth: "44ch",
              margin: "0 auto 26px",
              lineHeight: 1.6,
            }}
          >
            {FINALE.sub}
          </p>
          <MagneticButton>
            <Link
              href={FINALE.ctaHref}
              style={{
                background: "var(--terracotta)",
                color: "var(--cream-3)",
                padding: "16px 28px",
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: 16,
                borderRadius: 2,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                textDecoration: "none",
                minHeight: 48,
                boxShadow: "0 18px 44px rgba(26,26,26,0.2)",
              }}
            >
              {FINALE.ctaLabel}
              <ArrowRight style={{ width: 16, height: 16 }} />
            </Link>
          </MagneticButton>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--ink-faint)",
              marginTop: 20,
            }}
          >
            {FINALE.footnote}
          </div>
        </div>
      </div>
    </div>
  );
}

// Re-export so V4Journey.tsx (owner of the ScrollTrigger) can iterate
// stations in the same order the refs array above was populated.
export const OVERLAY_STATION_COUNT = STATIONS.length;
