"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MagneticButton from "@/components/home/MagneticButton";
import CountUp from "@/components/home/CountUp";
import Reveal from "@/components/home/Reveal";
import { BUNDLES, FINALE, HERO, PROOF_STATS } from "./v4Data";

/**
 * Premium static vertical layout for mobile/touch, prefers-reduced-motion,
 * WebGL-unavailable, and the "pending" (client mode not yet resolved)
 * state — no pin, no 3D, no scroll-hijack. Same copy as the scene-mode
 * overlay (v4Data is the single source of truth), presented as a normal
 * stacked page with small inline SVG diorama illustrations so it reads as
 * a designed fallback, not a stripped-down placeholder. Mirrors the
 * MachineStaticFallback.tsx precedent (Reveal fade-ups, no bespoke
 * animation system).
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

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div style={eyebrowStyle}>
      <span
        style={{
          width: 28,
          height: 1,
          background: "var(--terracotta)",
          display: "inline-block",
        }}
      />
      {children}
    </div>
  );
}

// Small abstract diorama glyphs — geometric echoes of the 3D scene's gate/
// machine/wall/booth shapes, not literal renders. Cheap inline SVG, no
// asset requests.
function GateGlyph() {
  return (
    <svg
      viewBox="0 0 120 60"
      width="100%"
      style={{ display: "block" }}
      aria-hidden="true"
    >
      <rect x="14" y="10" width="10" height="42" fill="var(--ink)" />
      <rect x="96" y="10" width="10" height="42" fill="var(--ink)" />
      <rect x="10" y="4" width="100" height="8" fill="var(--terracotta)" />
    </svg>
  );
}

function MachineGlyph({ variant }: { variant: "a" | "b" | "c" }) {
  return (
    <svg
      viewBox="0 0 120 80"
      width="100%"
      style={{ display: "block" }}
      aria-hidden="true"
    >
      <rect
        x="24"
        y="34"
        width="72"
        height="38"
        rx="3"
        fill="var(--cream-3)"
        stroke="var(--ink-faint)"
      />
      {variant === "a" && (
        <polygon
          points="60,10 74,22 66,34 54,34 46,22"
          fill="var(--terracotta)"
        />
      )}
      {variant === "b" && (
        <circle
          cx="60"
          cy="22"
          r="14"
          fill="none"
          stroke="var(--terracotta)"
          strokeWidth="6"
        />
      )}
      {variant === "c" && (
        <polygon points="60,8 70,30 50,30" fill="var(--terracotta)" />
      )}
    </svg>
  );
}

function WallGlyph() {
  return (
    <svg
      viewBox="0 0 120 60"
      width="100%"
      style={{ display: "block" }}
      aria-hidden="true"
    >
      {PROOF_STATS.map((_, c) =>
        Array.from({ length: 4 }, (_, r) => (
          <rect
            key={`${c}-${r}`}
            x={12 + c * 26}
            y={48 - r * 11}
            width="18"
            height="8"
            fill={r < c + 1 ? "var(--terracotta)" : "var(--cream-2)"}
            stroke="rgba(26,26,26,0.15)"
          />
        )),
      )}
    </svg>
  );
}

function BoothGlyph() {
  return (
    <svg
      viewBox="0 0 120 60"
      width="100%"
      style={{ display: "block" }}
      aria-hidden="true"
    >
      <rect x="18" y="8" width="8" height="44" fill="var(--ink)" />
      <rect x="94" y="8" width="8" height="44" fill="var(--ink)" />
      <rect x="14" y="4" width="92" height="6" fill="var(--ink)" />
      <rect
        x="34"
        y="16"
        width="52"
        height="32"
        fill="var(--terracotta)"
        opacity="0.35"
      />
      <circle cx="60" cy="32" r="10" fill="var(--terracotta)" />
    </svg>
  );
}

export default function V4StaticFallback() {
  return (
    <div style={{ background: "var(--cream)", fontFamily: "var(--font-sans)" }}>
      {/* Entrance / hero */}
      <section
        className="section"
        style={{
          color: "var(--ink)",
          borderBottom: "1px solid rgba(26,26,26,0.12)",
        }}
      >
        {/* Fixed-header clearance spacer, not a paddingTop override — the
            sitewide `.section { padding-top: ... !important }` mobile media
            rule in globals.css stomps any inline paddingTop on a
            `.section`-classed element under 768px, so a plain style prop
            here would silently no-op on the exact mobile viewport this is
            meant to fix. A spacer div isn't touched by that rule and pushes
            the H1 clear of the fixed header + promo banner on every
            viewport, while leaving .section's own top padding intact. */}
        <div
          aria-hidden="true"
          style={{ height: "calc(var(--promo-h, 44px) + 72px)" }}
        />
        <div className="container-x" style={{ maxWidth: 760 }}>
          <Eyebrow>{HERO.eyebrow}</Eyebrow>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              lineHeight: 1.08,
              fontSize: "clamp(30px, 8vw, 54px)",
              margin: "0 0 20px",
              wordBreak: "break-word",
            }}
          >
            {HERO.headlineA}{" "}
            <span style={{ color: "var(--terracotta-aa)" }}>
              {HERO.headlineB}
            </span>
          </h1>
          <p
            style={{
              fontSize: "clamp(16px, 4vw, 19px)",
              color: "var(--ink-2)",
              maxWidth: "52ch",
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
                padding: "16px 28px",
                fontWeight: 600,
                fontSize: 15,
                borderRadius: 2,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                textDecoration: "none",
                minHeight: 48,
                boxShadow: "0 18px 44px rgba(26,26,26,0.14)",
              }}
            >
              {HERO.ctaLabel}
              <ArrowRight style={{ width: 16, height: 16 }} />
            </Link>
          </MagneticButton>
          <div style={{ maxWidth: 220, margin: "40px auto 0" }}>
            <GateGlyph />
          </div>
        </div>
      </section>

      {/* Three machine stations */}
      <section
        className="section"
        style={{
          background: "var(--cream-2)",
          borderBottom: "1px solid rgba(26,26,26,0.12)",
        }}
      >
        <div className="container-x">
          <Reveal className="mb-8">
            <Eyebrow>The line</Eyebrow>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                fontSize: "clamp(24px, 6vw, 38px)",
                margin: 0,
                maxWidth: "22ch",
              }}
            >
              Three machines,{" "}
              <span style={{ color: "var(--terracotta-aa)" }}>
                one job each.
              </span>
            </h2>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {BUNDLES.map((b, i) => (
              <Reveal key={b.id} delay={i * 0.08}>
                <div
                  style={{
                    background: "var(--cream-3)",
                    border: b.flagship
                      ? "1.5px solid var(--terracotta)"
                      : "1px solid rgba(26,26,26,0.12)",
                    borderRadius: 4,
                    padding: "clamp(20px, 5vw, 28px)",
                    display: "grid",
                    gridTemplateColumns: "minmax(0,1fr)",
                    gap: 16,
                  }}
                >
                  <div style={{ maxWidth: 140 }}>
                    <MachineGlyph
                      variant={i === 0 ? "a" : i === 1 ? "b" : "c"}
                    />
                  </div>
                  <div>
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
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: "clamp(19px, 4vw, 24px)",
                        margin: "0 0 12px",
                      }}
                    >
                      {b.name}
                    </h3>
                    <ul
                      style={{
                        margin: "0 0 12px",
                        padding: 0,
                        listStyle: "none",
                      }}
                    >
                      {b.whatsInside.map((line) => (
                        <li
                          key={line}
                          style={{
                            fontSize: 14,
                            color: "var(--ink-2)",
                            lineHeight: 1.55,
                            marginBottom: 6,
                            paddingLeft: 18,
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
                          fontSize: 13,
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
                          fontSize: 14,
                          fontWeight: 700,
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
                          fontSize: 13.5,
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
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Data-readout wall */}
      <section
        className="section"
        style={{
          background: "var(--cream-3)",
          borderBottom: "1px solid rgba(26,26,26,0.12)",
        }}
      >
        <div className="container-x">
          <Reveal className="mb-8 max-w-2xl">
            <Eyebrow>The receipts</Eyebrow>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                fontSize: "clamp(24px, 6vw, 38px)",
                margin: 0,
                maxWidth: "24ch",
              }}
            >
              Order settles.{" "}
              <span style={{ color: "var(--terracotta-aa)" }}>
                The track record doesn&rsquo;t move.
              </span>
            </h2>
          </Reveal>
          <div style={{ maxWidth: 280, margin: "0 auto 28px" }}>
            <WallGlyph />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {PROOF_STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.07}>
                <div
                  style={{
                    background: "var(--cream-2)",
                    border: "1px solid rgba(26,26,26,0.12)",
                    padding: "clamp(20px, 5vw, 28px) clamp(16px, 4vw, 20px)",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "clamp(30px, 6.5vw, 48px)",
                      color: "var(--terracotta-aa)",
                      lineHeight: 1,
                      marginBottom: 10,
                    }}
                  >
                    <CountUp value={s.value} suffix={s.suffix} />
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "var(--ink-2)",
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lit CTA booth finale */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "var(--terracotta)",
          padding: "clamp(56px, 12vw, 100px) 0 clamp(64px, 14vw, 112px)",
        }}
      >
        <div className="container-x relative" style={{ textAlign: "center" }}>
          <div style={{ maxWidth: 220, margin: "0 auto 24px", opacity: 0.9 }}>
            <BoothGlyph />
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "var(--cream-3)",
              marginBottom: 20,
              opacity: 0.85,
            }}
          >
            {FINALE.eyebrow}
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(26px, 7vw, 46px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
              color: "var(--cream-3)",
              marginBottom: 20,
              maxWidth: 640,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {FINALE.headline}
          </h2>
          <p
            style={{
              fontSize: "clamp(15px, 3.6vw, 17px)",
              color: "rgba(250, 247, 240, 0.92)",
              maxWidth: "46ch",
              margin: "0 auto 32px",
              lineHeight: 1.6,
            }}
          >
            {FINALE.sub}
          </p>
          <MagneticButton>
            <Link
              href={FINALE.ctaHref}
              style={{
                background: "var(--cream-3)",
                color: "var(--terracotta-aa)",
                padding: "16px 28px",
                fontWeight: 700,
                fontSize: 16,
                borderRadius: 2,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                textDecoration: "none",
                boxShadow: "0 16px 40px rgba(26,26,26,0.18)",
                minHeight: 48,
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
              color: "rgba(250, 247, 240, 0.78)",
              marginTop: 22,
            }}
          >
            {FINALE.footnote}
          </div>
        </div>
      </section>
    </div>
  );
}
