"use client";

import CountUp from "@/components/home/CountUp";
import Reveal from "@/components/home/Reveal";

/**
 * Canonical proof numbers ONLY — same figures already published in
 * ProofReceipts.tsx / HeroFunnel.tsx / about page: "180+ workflows, 40+
 * sites, 9 countries, founded 2019". Nothing new claimed. Count-up is a
 * presentation layer, not a new metric.
 */
const STATS = [
  { value: 180, suffix: "+", label: "workflows shipped" },
  { value: 40, suffix: "+", label: "sites delivered" },
  { value: 9, suffix: "", label: "countries served" },
  { value: 2019, suffix: "", label: "shipping since" },
];

export default function ProofBand() {
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
              fontSize: "clamp(26px, 6vw, 40px)",
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {STATS.map((s, i) => (
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
  );
}
