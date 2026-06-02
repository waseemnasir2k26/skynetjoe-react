import { Search, Wrench, Rocket, TrendingUp, ArrowRight, Calendar, Terminal } from "lucide-react";

/**
 * Cream editorial pivot 2026-05-25 — process section.
 * cream-2 cards with alternating rotation, terracotta step number.
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
  rule: "rgba(26,26,26,0.12)",
};

const STEPS = [
  {
    icon: Search,
    n: "01",
    title: "Audit",
    when: "Mon",
    desc: "Free 20-min Loom audit. We map your funnel, find the leak, name the leverage.",
    deliverable: "20-min Loom + 1-pager",
    color: C.terra,
  },
  {
    icon: Wrench,
    n: "02",
    title: "Build",
    when: "Tue–Thu",
    desc: "I build the workflow / site / chatbot in 5–14 days. You see daily Loom updates.",
    deliverable: "Daily Looms · live preview URL",
    color: C.ochre,
  },
  {
    icon: Rocket,
    n: "03",
    title: "Ship",
    when: "Fri",
    desc: "Deploy to production. Train your team. Hand over Notion SOPs + Loom library.",
    deliverable: "Production deploy · SOPs · Loom library",
    color: C.sage,
  },
  {
    icon: TrendingUp,
    n: "04",
    title: "Compound",
    when: "Mo+",
    desc: "Optional retainer: I monitor, optimize, and stack new automations monthly.",
    deliverable: "Monthly stack + dashboard",
    color: C.terra,
  },
];

export default function Process() {
  return (
    <section className="section relative">
      <div className="container-x relative z-10">
        <div className="max-w-3xl mb-14">
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: C.terra,
              fontWeight: 600,
              marginBottom: 14,
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <Calendar style={{ width: 12, height: 12 }} />
            Mon audit · Fri build · Next-Fri ship
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              lineHeight: 1.08,
              color: C.ink,
              marginBottom: 16,
            }}
          >
            Four steps.{" "}
            <span style={{ fontStyle: "normal", color: C.terra, fontWeight: 700 }}>No drawn-out proposals.</span>
          </h2>
          <p style={{ fontSize: 17, color: C.ink2, lineHeight: 1.6 }}>
            No 14-slide proposal deck. No 6-week discovery phase. Audit Monday,
            build by Friday, ship by next Friday.
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                style={{ position: "relative" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 20,
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: 56,
                      height: 56,
                      background: s.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 2,
                    }}
                  >
                    <s.icon style={{ width: 26, height: 26, color: C.cream3 }} />
                    <span
                      style={{
                        position: "absolute",
                        top: -10,
                        right: -10,
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        background: C.cream3,
                        border: `1px solid ${C.ink}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        fontWeight: 700,
                        color: C.ink,
                      }}
                    >
                      {s.n}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.16em",
                      color: C.terra,
                      background: C.cream3,
                      border: `1px solid ${C.rule}`,
                      padding: "6px 12px",
                      borderRadius: 999,
                    }}
                  >
                    {s.when}
                  </span>
                </div>

                <div
                  style={{
                    padding: 24,
                    background: C.cream2,
                    border: `1px solid ${C.rule}`,
                    transform: i % 2 === 0 ? "rotate(-0.3deg)" : "rotate(0.3deg)",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 19,
                      fontWeight: 600,
                      color: C.ink,
                      marginBottom: 8,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {s.title}
                    {i < STEPS.length - 1 && (
                      <ArrowRight style={{ width: 16, height: 16, color: C.inkFaint }} />
                    )}
                  </h3>
                  <p style={{ fontSize: 14, color: C.ink2, lineHeight: 1.6, marginBottom: 16 }}>
                    {s.desc}
                  </p>
                  <div style={{ paddingTop: 12, borderTop: `1px solid ${C.rule}` }}>
                    <p
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        textTransform: "uppercase",
                        letterSpacing: "0.18em",
                        color: C.inkFaint,
                        fontWeight: 600,
                        marginBottom: 4,
                      }}
                    >
                      — You get
                    </p>
                    <p style={{ fontSize: 12, color: C.ink, fontWeight: 500 }}>
                      {s.deliverable}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Co-founder pact card */}
        <div
          className="mt-14 grid md:grid-cols-[180px_1fr] gap-6 items-center"
          style={{
            padding: 32,
            background: C.cream3,
            border: `1px solid ${C.rule}`,
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 180,
              aspectRatio: "1/1",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              border: `1px solid ${C.rule}`,
              background: C.cream2,
              margin: "0 auto",
            }}
          >
            <span
              aria-hidden
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: C.terra,
                color: C.cream3,
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 24,
                letterSpacing: "0.02em",
              }}
            >
              SL
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "#A8451F",
                fontWeight: 700,
              }}
            >
              1 human + 1 API key
            </span>
          </div>
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: C.terra,
                fontWeight: 600,
                marginBottom: 10,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Terminal style={{ width: 12, height: 12 }} />
              How the 2-person team splits the work
            </div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(20px, 2.6vw, 26px)",
                fontWeight: 600,
                color: C.ink,
                marginBottom: 12,
                letterSpacing: "-0.01em",
              }}
            >
              You brief Waseem. Claude drafts.{" "}
              <span style={{ fontStyle: "normal", color: C.terra, fontWeight: 700 }}>Waseem ships.</span>
            </h3>
            <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.6, marginBottom: 10 }}>
              You send a brief in 3 sentences. I read it, scope it, and pair
              with Claude Code in a terminal next to my coffee. Claude drafts
              architecture, writes the first 70% of the code, audits diffs, and
              writes the docs. I make the calls, talk to you, ship the
              deliverable, and take the blame if it breaks.
            </p>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: C.inkFaint,
                fontStyle: "normal",
                textTransform: "uppercase",
                letterSpacing: "0.10em",
              }}
            >
              — Most agencies have 12 humans. We have 1 human + 1 API key.
            </p>
          </div>
        </div>

        <div
          className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{
            padding: 24,
            background: C.cream2,
            border: `1px solid ${C.rule}`,
          }}
        >
          <div className="flex-1">
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 15,
                fontWeight: 600,
                color: C.ink,
                marginBottom: 4,
                letterSpacing: "-0.005em",
              }}
            >
              Total clock: 14 days from first Loom to production deploy.
            </p>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: C.inkFaint,
                textTransform: "uppercase",
                letterSpacing: "0.10em",
              }}
            >
              — No discovery phases. No invoice surprises.
            </p>
          </div>
          <a
            href="/discovery-call"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 22px",
              background: C.terra,
              color: C.cream3,
              fontWeight: 600,
              fontSize: 14,
              borderRadius: 2,
              fontFamily: "var(--font-sans)",
              whiteSpace: "nowrap",
            }}
          >
            <Calendar style={{ width: 14, height: 14 }} />
            Apply for a discovery call
          </a>
        </div>
      </div>
    </section>
  );
}
