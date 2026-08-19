import CountUp from "@/components/home/CountUp";

/**
 * Opaque proof band — canonical figures only, same numbers already
 * published site-wide (ProofReceipts.tsx / about page / HeroFunnel trust
 * strip): 180+ workflows, 40+ sites, 9 countries, founded 2019. Being
 * opaque also visually "pauses" the 3D scene from the user's perspective
 * as it scrolls fully underneath this section.
 */
const STATS = [
  { value: 180, suffix: "+", label: "workflows shipped" },
  { value: 40, suffix: "+", label: "sites delivered" },
  { value: 9, suffix: "", label: "countries served" },
];

export default function V2Proof() {
  return (
    <section
      className="relative"
      style={{
        background: "var(--cream-3)",
        borderTop: "1px solid rgba(26,26,26,0.12)",
        borderBottom: "1px solid rgba(26,26,26,0.12)",
        padding: "clamp(56px, 11vw, 100px) 0",
        fontFamily: "var(--font-sans)",
      }}
    >
      <div
        className="container-x"
        style={{
          paddingLeft: "clamp(16px, 5vw, 24px)",
          paddingRight: "clamp(16px, 5vw, 24px)",
        }}
      >
        <div className="max-w-2xl mb-10">
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
                background: "var(--terracotta-aa)",
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
            }}
          >
            Not a pitch deck.{" "}
            <span style={{ color: "var(--terracotta-aa)" }}>
              A track record.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {STATS.map((s) => (
            <div
              key={s.label}
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
          ))}
        </div>

        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--ink-faint)",
            marginTop: 24,
          }}
        >
          — Shipping worldwide since 2019 · solo, from Bali, GMT+8
        </p>
      </div>
    </section>
  );
}
