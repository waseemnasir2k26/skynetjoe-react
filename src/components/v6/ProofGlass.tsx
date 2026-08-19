"use client";

import CountUp from "@/components/home/CountUp";
import Reveal from "@/components/home/Reveal";

/**
 * Canonical proof numbers ONLY — same figures already published in
 * ProofReceipts.tsx / HeroFunnel.tsx / v3 ProofBand.tsx / about page:
 * "180+ workflows, 40+ sites, 9 countries, founded 2019". Nothing new
 * claimed. The "gauge" bars are a CSS-only glass sculpture (gradient fill +
 * backdrop-filter sheen), not a real WebGL element — a second live 3D
 * context here would be extra GPU cost for a purely decorative accent,
 * same call v3's FinalCTAInk docblock made for its shader echo.
 */
const STATS = [
  { value: 180, suffix: "+", label: "workflows shipped", fill: 92 },
  { value: 40, suffix: "+", label: "sites delivered", fill: 68 },
  { value: 9, suffix: "", label: "countries served", fill: 45 },
  { value: 2019, suffix: "", label: "shipping since", fill: 100 },
];

export default function ProofGlass() {
  return (
    <section
      className="section"
      style={{
        position: "relative",
        background: "var(--cream-2)",
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
              The receipts
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.06,
                fontSize: "clamp(30px, 6.5vw, 56px)",
                margin: 0,
                maxWidth: "16ch",
              }}
            >
              Order settles.{" "}
              <span style={{ color: "var(--terracotta-aa)" }}>
                The track record doesn&rsquo;t move.
              </span>
            </h2>
          </div>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "clamp(16px, 3vw, 22px)",
          }}
        >
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.07}>
              <div
                style={{
                  position: "relative",
                  background: "rgba(255,255,255,0.55)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.7)",
                  borderRadius: 8,
                  padding:
                    "clamp(24px, 4vw, 32px) clamp(18px, 3vw, 22px) clamp(20px, 3vw, 26px)",
                  overflow: "hidden",
                  boxShadow: "0 20px 50px rgba(26,26,26,0.06)",
                }}
              >
                {/* Glass "gauge" fill — vertical bar rising to the stat's
                    relative fill amount, rust gradient under a glass sheen. */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: `${s.fill}%`,
                    background:
                      "linear-gradient(180deg, rgba(198,107,63,0.05), rgba(198,107,63,0.16))",
                    borderTop: "1px solid rgba(198,107,63,0.35)",
                  }}
                />
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "-20%",
                    width: "50%",
                    height: "100%",
                    background:
                      "linear-gradient(115deg, rgba(255,255,255,0.5), transparent 60%)",
                    pointerEvents: "none",
                  }}
                />

                <div
                  style={{
                    position: "relative",
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "clamp(32px, 6.5vw, 48px)",
                    color: "var(--terracotta-aa)",
                    lineHeight: 1,
                    marginBottom: 10,
                  }}
                >
                  <CountUp value={s.value} suffix={s.suffix} />
                </div>
                <div
                  style={{
                    position: "relative",
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
