"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MagneticButton from "@/components/home/MagneticButton";

/**
 * Full-bleed rust final CTA. "Shader echo" is a CSS-only animated gradient
 * pulse (not a second WebGL context) — deliberate perf call: one live
 * shader per page is enough GPU budget for a marketing route; a second
 * canvas here would double fill-rate cost for a purely decorative accent.
 * Copy reused verbatim from FinalCTA.tsx (homepage) — no new claims.
 */
export default function FinalCTAInk() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "var(--terracotta)",
        padding: "clamp(64px, 14vw, 120px) 0 clamp(72px, 16vw, 132px)",
        fontFamily: "var(--font-sans)",
      }}
    >
      <style>{`
        @keyframes v3-echo-drift {
          0%   { transform: translate(-8%, -6%) scale(1);   opacity: 0.55; }
          50%  { transform: translate(6%, 4%) scale(1.15);  opacity: 0.8; }
          100% { transform: translate(-8%, -6%) scale(1);   opacity: 0.55; }
        }
        @media (prefers-reduced-motion: reduce) {
          .v3-echo { animation: none !important; }
        }
      `}</style>
      <div
        aria-hidden="true"
        className="v3-echo absolute"
        style={{
          top: "-20%",
          left: "-10%",
          width: "70%",
          height: "140%",
          background: `radial-gradient(circle at 40% 40%, rgba(26,26,26,0.28) 0%, transparent 60%),
            radial-gradient(circle at 65% 60%, rgba(242,239,230,0.22) 0%, transparent 55%)`,
          filter: "blur(40px)",
          animation: "v3-echo-drift 16s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div className="container-x relative">
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
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
              color: "var(--cream-3)",
              marginBottom: 20,
              wordBreak: "break-word",
            }}
          >
            Find the gaps in{" "}
            <span
              style={{
                fontStyle: "normal",
                textDecoration: "underline",
                textDecorationThickness: "1px",
                textUnderlineOffset: "8px",
              }}
            >
              30 minutes.
            </span>
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
            A free 30-min check-up. We share screens, spot the one fix that pays
            off fastest, and send you a short build plan. No pitch deck.
          </p>
          <MagneticButton>
            <Link
              href="/discovery-call"
              style={{
                background: "var(--cream-3)",
                color: "var(--terracotta-aa)",
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
              Book a free 30-min check-up
              <ArrowRight style={{ width: 16, height: 16 }} />
            </Link>
          </MagneticButton>
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
