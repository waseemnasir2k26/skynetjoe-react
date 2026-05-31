import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section
      style={{
        background: "var(--terracotta)",
        padding: "clamp(56px, 12vw, 100px) 0 clamp(64px, 14vw, 112px)",
        fontFamily: "var(--font-sans)",
      }}
    >
      <div className="container-x">
        <div
          style={{
            maxWidth: 760,
            margin: "0 auto",
            padding: "0 clamp(16px, 5vw, 24px)",
            textAlign: "center",
          }}
        >
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
— Limited audits each month
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 7vw, 52px)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
              color: "var(--cream-3)",
              marginBottom: 20,
              wordBreak: "break-word",
            }}
          >
            Find your biggest leak in{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--cream-3)",
                fontWeight: 500,
                textDecoration: "underline",
                textDecorationThickness: "1px",
                textUnderlineOffset: "8px",
              }}
            >
              30 minutes.
            </em>
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
            Free audit. We screen-share, find the one automation that pays for
            itself fastest, and Loom you a build plan. No pitch deck.
          </p>
          <Link
            href="/discovery-call"
            style={{
              background: "var(--cream-3)",
              color: "var(--terracotta)",
              padding: "16px 28px",
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: 16,
              borderRadius: 2,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              textDecoration: "none",
              transition: "transform 0.18s",
              boxShadow: "0 16px 40px rgba(26,26,26,0.18)",
              minHeight: 48,
            }}
          >
            Book free 30-min audit
            <ArrowRight style={{ width: 16, height: 16 }} />
          </Link>
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
— Reply in 8h · scope in 48h · Bali (GMT+8) · 9 countries served
          </div>
        </div>
      </div>
    </section>
  );
}
