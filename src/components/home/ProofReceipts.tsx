"use client";

import { Terminal, Globe, CalendarClock } from "lucide-react";
import CountUp from "./CountUp";
import Reveal from "./Reveal";

/**
 * New "proof/receipts" section (BUILD SPEC step 6). Numbers here are the
 * SAME canonical figures already published on this site (see
 * ProofOfLifeStrip.tsx / about/page.tsx / HeroFunnel trust strip: "180+
 * workflows and 40+ sites delivered across 9 countries", founded 2019) —
 * nothing new is claimed, count-up is purely a presentation layer on
 * existing verbatim numbers.
 */
const STATS = [
  { value: 180, suffix: "+", label: "workflows shipped" },
  { value: 40, suffix: "+", label: "sites delivered" },
  { value: 9, suffix: "", label: "countries served" },
];

export default function ProofReceipts() {
  return (
    <section
      className="section"
      style={{
        background: "var(--cream-3)",
        color: "var(--ink)",
        fontFamily: "var(--font-sans)",
        borderBottom: "1px solid rgba(26,26,26,0.12)",
      }}
    >
      <div className="container-x">
        <Reveal className="max-w-2xl mb-10">
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
            The receipts
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "var(--ink)",
              fontSize: "clamp(26px, 6vw, 40px)",
              margin: 0,
              maxWidth: "24ch",
              wordBreak: "break-word",
            }}
          >
            Not a pitch deck.{" "}
            <span
              style={{
                fontStyle: "normal",
                color: "var(--terracotta-aa)",
                fontWeight: 700,
              }}
            >
              A track record.
            </span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div
                style={{
                  background: "var(--cream-2)",
                  border: "1px solid rgba(26,26,26,0.12)",
                  padding: "clamp(24px, 5vw, 32px) clamp(20px, 5vw, 28px)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "clamp(40px, 8vw, 56px)",
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
                    fontSize: 12,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "var(--ink-2)",
                  }}
                >
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-3"
            style={{ fontSize: 13, color: "var(--ink-2)" }}
          >
            <div
              className="rounded-xl p-4 flex items-start gap-3"
              style={{
                background: "var(--cream-2)",
                border: "1px solid rgba(26,26,26,0.12)",
              }}
            >
              <Terminal
                style={{
                  width: 18,
                  height: 18,
                  flexShrink: 0,
                  color: "var(--terracotta-aa)",
                }}
              />
              <span>
                Human-led builds, AI on the keyboard. Every change reviewed by
                hand.
              </span>
            </div>
            <div
              className="rounded-xl p-4 flex items-start gap-3"
              style={{
                background: "var(--cream-2)",
                border: "1px solid rgba(26,26,26,0.12)",
              }}
            >
              <Globe
                style={{
                  width: 18,
                  height: 18,
                  flexShrink: 0,
                  color: "var(--terracotta-aa)",
                }}
              />
              <span>
                Shipping worldwide since 2019 — solo, from Bali, GMT+8.
              </span>
            </div>
            <div
              className="rounded-xl p-4 flex items-start gap-3"
              style={{
                background: "var(--cream-2)",
                border: "1px solid rgba(26,26,26,0.12)",
              }}
            >
              <CalendarClock
                style={{
                  width: 18,
                  height: 18,
                  flexShrink: 0,
                  color: "var(--terracotta-aa)",
                }}
              />
              <span>
                Reply in 8h · scope in 48h · most builds ship in 5–14 days.
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
