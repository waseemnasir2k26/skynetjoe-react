import { STATS } from "@/lib/site";

/**
 * Cream editorial pivot 2026-05-25 — stats section.
 * Terracotta italic Fraunces numerals on cream-2 cards.
 */

const C = {
  cream2: "#EDE8DC",
  cream3: "#FAF7F0",
  ink: "#1A1A1A",
  ink2: "#3A3A36",
  inkFaint: "#6B6B65",
  terra: "#C66B3F",
  ochre: "#C9A96E",
  sage: "#8A9A7B",
  oxblood: "#6B2C2C",
  rule: "rgba(26,26,26,0.12)",
};

const ACCENTS = [C.terra, C.ochre, C.sage, C.oxblood];

export default function Stats() {
  return (
    <section className="section">
      <div className="container-x">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((stat, i) => {
            const color = ACCENTS[i % ACCENTS.length];
            return (
              <div
                key={stat.label}
                style={{
                  position: "relative",
                  textAlign: "center",
                  padding: 24,
                  background: C.cream2,
                  border: `1px solid ${C.rule}`,
                  transform: i % 2 === 0 ? "rotate(-0.3deg)" : "rotate(0.3deg)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontStyle: "normal",
                    fontSize: "clamp(36px, 5vw, 56px)",
                    fontWeight: 700,
                    color,
                    marginBottom: 8,
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: C.inkFaint,
                  }}
                >
                  — {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Team-size hook */}
        <div className="mt-6 flex justify-center">
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 14,
              padding: "14px 24px",
              background: C.cream3,
              border: `1px solid ${C.terra}`,
              borderRadius: 2,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "normal",
                fontSize: 17,
                fontWeight: 700,
                color: "var(--terracotta-aa)",
                letterSpacing: "-0.01em",
              }}
            >
              1 human + 1 Claude Code
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: C.inkFaint,
              }}
            >
              = 2-person agency. Most have 12.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
