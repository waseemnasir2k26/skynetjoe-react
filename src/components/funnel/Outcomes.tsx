import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const OUTCOMES = [
  {
    title: "60-second follow-up, every lead, 24/7",
    promise:
      "Auto-DM + WhatsApp + email triggers fire the moment a lead lands. No app to open. No reminder to set.",
    proof: "Show-rate jumped 23% → 71% — Grand Mercer Dental, NY",
  },
  {
    title: "One dashboard. Every deal. Zero screenshots.",
    promise:
      "GoHighLevel CRM wired into your stack. Every quote, call, and reply in one pipeline you can actually see.",
    proof: "200+ debtor calls/week handled in French — KODIASIMMO",
  },
  {
    title: "Content that ships itself, in your voice",
    promise:
      "AI content engine generates 30 voice-locked posts/month across LinkedIn, IG, FB. You approve, it posts.",
    proof: "3 hr/day → 20 min email triage — Takycorp",
  },
];

export default function Outcomes() {
  return (
    <section
      className="section relative overflow-hidden"
      style={{
        background: "var(--cream-3)",
        color: "var(--ink)",
        fontFamily: "var(--font-sans)",
        borderBottom: "1px solid rgba(26,26,26,0.12)",
      }}
    >
      <div className="container-x relative z-10">
        <div className="max-w-2xl mb-12">
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "var(--sage)",
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
                background: "var(--sage)",
                display: "inline-block",
              }}
            />
            Real shipped builds
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "var(--ink)",
              fontSize: "clamp(26px, 6vw, 40px)",
              margin: 0,
              maxWidth: "22ch",
              wordBreak: "break-word",
            }}
          >
            Plug every leak.{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--terracotta)",
                fontWeight: 500,
              }}
            >
              Shipped in 14 days.
            </em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {OUTCOMES.map((o, i) => (
            <div
              key={o.title}
              style={{
                background: "var(--cream-2)",
                border: "1px solid rgba(26,26,26,0.12)",
                padding: "clamp(20px, 5vw, 28px) clamp(20px, 5vw, 28px) clamp(18px, 4vw, 24px)",
                transform: i === 1 ? "rotate(0.3deg)" : "rotate(-0.3deg)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: 36,
                  fontWeight: 500,
                  color: "var(--terracotta)",
                  lineHeight: 1,
                  marginBottom: 12,
                }}
              >
                0{i + 1}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 20,
                  fontWeight: 600,
                  color: "var(--ink)",
                  marginBottom: 10,
                  lineHeight: 1.25,
                  letterSpacing: "-0.01em",
                }}
              >
                {o.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--ink-2)",
                  lineHeight: 1.6,
                  marginBottom: 16,
                  flex: 1,
                }}
              >
                {o.promise}
              </p>
              <div
                style={{
                  paddingTop: 12,
                  borderTop: "1px solid rgba(26,26,26,0.10)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.04em",
                  color: "var(--sage)",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 6,
                }}
              >
                <Check style={{ width: 13, height: 13, marginTop: 2, flexShrink: 0 }} />
                <span>{o.proof}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/services"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "var(--terracotta)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontWeight: 600,
            }}
          >
            — See all 16 services
            <ArrowRight style={{ width: 13, height: 13 }} />
          </Link>
        </div>
      </div>
    </section>
  );
}
