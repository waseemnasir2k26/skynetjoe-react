"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import MagneticButton from "@/components/home/MagneticButton";
import Reveal from "@/components/home/Reveal";
import { BUNDLES, type Bundle } from "@/components/v3/bundlesData";
import ExplodedDiagramSVG from "./ExplodedDiagramSVG";

// Copy imported verbatim from src/components/v3/bundlesData.ts (per build
// brief) — no local fork, zero drift risk. Prefix letters (A/B/C) label the
// exploded diagram part numbers only; bundle content is untouched.
const PREFIXES = ["A", "B", "C"];

function BundleBlock({ b, prefix }: { b: Bundle; prefix: string }) {
  return (
    <Reveal>
      <div
        className="v5-bundle-grid"
        style={{
          display: "grid",
          gap: "clamp(20px, 4vw, 32px)",
          background: b.flagship ? "var(--ink)" : "var(--cream-3)",
          border: b.flagship
            ? "1px solid rgba(198,107,63,0.45)"
            : "1px solid rgba(26,26,26,0.14)",
          borderRadius: 4,
          padding: "clamp(24px, 5vw, 40px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {b.flagship && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 18,
              right: 18,
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.14em",
              color: "var(--terracotta)",
              border: "2px solid var(--terracotta)",
              borderRadius: 3,
              padding: "4px 10px",
              transform: "rotate(4deg)",
            }}
          >
            FLAGSHIP
          </div>
        )}

        <div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: b.flagship ? "var(--terracotta)" : "var(--terracotta-aa)",
              marginBottom: 12,
            }}
          >
            {b.eyebrow}
          </div>

          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(19px, 4vw, 24px)",
              lineHeight: 1.25,
              color: b.flagship ? "var(--cream)" : "var(--ink)",
              marginBottom: 8,
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
              marginBottom: 18,
            }}
          >
            → {b.name}
          </div>

          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "0 0 20px",
              display: "flex",
              flexDirection: "column",
              gap: 9,
            }}
          >
            {b.whatsInside.map((item, i) => (
              <li
                key={item}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: b.flagship ? "rgba(242,239,230,0.82)" : "var(--ink-2)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "var(--terracotta-aa)",
                    marginTop: 3,
                  }}
                >
                  {prefix}-{String(i + 1).padStart(2, "0")}
                </span>
                <Check
                  style={{
                    width: 14,
                    height: 14,
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
                color: b.flagship
                  ? "rgba(242,239,230,0.65)"
                  : "var(--ink-faint)",
                borderTop: b.flagship
                  ? "1px solid rgba(242,239,230,0.14)"
                  : "1px solid rgba(26,26,26,0.1)",
                paddingTop: 14,
                marginBottom: 20,
              }}
            >
              — {b.proofLine}
            </p>
          )}

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 18,
            }}
          >
            {b.price && (
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 21,
                  color: "var(--cream)",
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
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 18,
              marginTop: 16,
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

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ExplodedDiagramSVG
            prefix={prefix}
            partCount={b.whatsInside.length}
            flagship={b.flagship}
          />
        </div>
      </div>
    </Reveal>
  );
}

export default function BlueprintBundles() {
  return (
    <section
      className="section"
      style={{
        background: "var(--cream-2)",
        color: "var(--ink)",
        fontFamily: "var(--font-sans)",
        borderBottom: "1px solid rgba(26,26,26,0.14)",
      }}
    >
      <div className="container-x">
        <div className="v5-mono-tag">
          <span className="v5-tick" />
          Fig. 02 — Assembly drawings
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            fontSize: "clamp(26px, 6vw, 40px)",
            margin: "0 0 40px",
            maxWidth: "28ch",
          }}
        >
          Three problems.{" "}
          <span style={{ color: "var(--terracotta-aa)" }}>
            Three systems that end them.
          </span>
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(24px, 4vw, 36px)",
          }}
        >
          {BUNDLES.map((b, i) => (
            <BundleBlock key={b.id} b={b} prefix={PREFIXES[i] ?? "X"} />
          ))}
        </div>
      </div>
    </section>
  );
}
