import { X } from "lucide-react";

const PAINS = [
  {
    pain: "Leads ghost you after 1 hour.",
    detail:
      "Up to half of B2B sales go to whoever replies first. If your follow-up is manual, you're losing them while you sleep.",
  },
  {
    pain: "Your pipeline lives in WhatsApp screenshots.",
    detail:
      "You quote, hope, repeat. No dashboard. No follow-up sequence. No idea which deal is alive and which already died.",
  },
  {
    pain: "Content rots in drafts for weeks.",
    detail:
      "You know you should post. You can't find 6 hours/week. So nothing ships and your competitors own the feed.",
  },
];

export default function PainPoints() {
  return (
    <section
      className="section"
      style={{
        background: "var(--bg)",
        color: "var(--ink)",
        fontFamily: "var(--font-sans)",
        borderBottom: "1px solid rgba(26,26,26,0.12)",
      }}
    >
      <div className="container-x">
        <div className="max-w-2xl mb-12">
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
                display: "inline-block",
              }}
            />
            Sound familiar?
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
              maxWidth: "26ch",
              wordBreak: "break-word",
            }}
          >
            Three ways you&rsquo;re{" "}
            <span
              style={{
                fontStyle: "normal",
                color: "var(--oxblood)",
                fontWeight: 700,
              }}
            >
              losing customers
            </span>{" "}
            without even noticing.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PAINS.map((p) => (
            <div
              key={p.pain}
              style={{
                background: "var(--cream-2)",
                border: "1px solid rgba(26,26,26,0.12)",
                padding: "clamp(20px, 5vw, 28px)",
                // Tilt removed — same ±0.3deg card rotation repeated across
                // PainPoints → Outcomes → Testimonials read as a template tic.
                // Tilt now lives only on Testimonials. (P3 motif variety)
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                  background: "rgba(107, 44, 44, 0.08)",
                  border: "1px solid rgba(107, 44, 44, 0.30)",
                  borderRadius: 2,
                }}
              >
                <X
                  style={{
                    width: 18,
                    height: 18,
                    color: "var(--oxblood)",
                  }}
                />
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 19,
                  fontWeight: 600,
                  color: "var(--ink)",
                  marginBottom: 10,
                  lineHeight: 1.25,
                  letterSpacing: "-0.01em",
                }}
              >
                {p.pain}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--ink-2)",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {p.detail}
              </p>
            </div>
          ))}
        </div>

        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "var(--ink)",
            marginTop: 32,
            marginBottom: 0,
          }}
        >
          Each of these has a 14-day fix.{" "}
          <span aria-hidden style={{ color: "#A8451F" }}>↓</span>
        </p>
      </div>
    </section>
  );
}
