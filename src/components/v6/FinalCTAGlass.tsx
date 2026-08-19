"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MagneticButton from "@/components/home/MagneticButton";

/**
 * Final CTA — glass button with a rust glow, magnetic (reuses
 * MagneticButton, same mechanism as every other CTA on this route/the rest
 * of the site — no new hover/magnet system invented). Copy reused verbatim
 * from FinalCTAInk.tsx (v3) / FinalCTA.tsx (homepage) — no new claims.
 */
export default function FinalCTAGlass() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "var(--ink)",
        padding: "clamp(72px, 15vw, 140px) 0 clamp(80px, 16vw, 148px)",
        fontFamily: "var(--font-sans)",
      }}
    >
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          top: "-30%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(80vw, 900px)",
          height: "min(80vw, 900px)",
          background:
            "radial-gradient(circle, rgba(198,107,63,0.28) 0%, transparent 65%)",
          filter: "blur(30px)",
          pointerEvents: "none",
        }}
      />
      <div className="container-x relative">
        <div
          style={{
            maxWidth: 760,
            margin: "0 auto",
            padding: "0 clamp(20px, 5vw, 24px)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "var(--terracotta)",
              marginBottom: 20,
              opacity: 0.9,
            }}
          >
            — Limited audits each month
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(30px, 8vw, 64px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.04,
              color: "var(--cream)",
              marginBottom: 22,
              wordBreak: "break-word",
            }}
          >
            Find the gaps in{" "}
            <span
              style={{
                textDecoration: "underline",
                textDecorationColor: "var(--terracotta)",
                textDecorationThickness: "2px",
                textUnderlineOffset: "8px",
              }}
            >
              30 minutes.
            </span>
          </h2>
          <p
            style={{
              fontSize: "clamp(15px, 3.6vw, 18px)",
              color: "rgba(242,239,230,0.78)",
              maxWidth: "46ch",
              margin: "0 auto 34px",
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
                position: "relative",
                background: "rgba(242,239,230,0.08)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                color: "var(--cream)",
                padding: "18px 32px",
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: 17,
                borderRadius: 3,
                border: "1px solid rgba(198,107,63,0.6)",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                textDecoration: "none",
                boxShadow:
                  "0 0 0 1px rgba(198,107,63,0.15), 0 24px 60px rgba(198,107,63,0.35)",
                minHeight: 50,
              }}
            >
              Book a free 30-min check-up
              <ArrowRight style={{ width: 17, height: 17 }} />
            </Link>
          </MagneticButton>

          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "rgba(242,239,230,0.55)",
              marginTop: 24,
            }}
          >
            — Reply in 8h · scope in 48h · Bali (GMT+8) · 9 countries served
          </div>
        </div>
      </div>
    </section>
  );
}
