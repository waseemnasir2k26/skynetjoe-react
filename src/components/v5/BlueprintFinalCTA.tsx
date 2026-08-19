"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getGsap } from "@/components/home/gsapClient";
import MagneticButton from "@/components/home/MagneticButton";

/**
 * Final CTA — a rust "APPROVED" ink stamp slams down onto the button as the
 * section scrolls into view (GSAP scale+rotate, once), then the button gets
 * the usual MagneticButton cursor-follow on hover. Copy reused verbatim
 * from FinalCTA.tsx (homepage) / FinalCTAInk.tsx (v3) — no new claims.
 */
export default function BlueprintFinalCTA() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stampRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stamp = stampRef.current;
    if (!section || !stamp) return;
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      stamp.style.opacity = "1";
      stamp.style.transform = "translate(-50%, -50%) rotate(-8deg) scale(1)";
      return;
    }

    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        stamp,
        { opacity: 0, scale: 2.6, rotate: -8 },
        {
          opacity: 1,
          scale: 1,
          rotate: -8,
          duration: 0.5,
          ease: "power4.out",
          scrollTrigger: { trigger: section, start: "top 60%", once: true },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="v5-grid-bg relative overflow-hidden"
      style={{
        background: "var(--cream)",
        padding: "clamp(64px, 14vw, 120px) 0 clamp(72px, 16vw, 132px)",
        fontFamily: "var(--font-sans)",
      }}
    >
      <div className="container-x relative">
        <div
          style={{
            maxWidth: 760,
            margin: "0 auto",
            padding: "0 clamp(16px, 5vw, 24px)",
            textAlign: "center",
            position: "relative",
          }}
        >
          <div className="v5-mono-tag" style={{ justifyContent: "center" }}>
            <span className="v5-tick" />— Limited audits each month
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 7vw, 52px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
              color: "var(--ink)",
              marginBottom: 20,
              wordBreak: "break-word",
            }}
          >
            Find the gaps in{" "}
            <span
              style={{
                color: "var(--terracotta-aa)",
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
              color: "var(--ink-2)",
              maxWidth: "46ch",
              margin: "0 auto 32px",
              lineHeight: 1.6,
            }}
          >
            A free 30-min check-up. We share screens, spot the one fix that pays
            off fastest, and send you a short build plan. No pitch deck.
          </p>

          <div style={{ position: "relative", display: "inline-block" }}>
            <MagneticButton>
              <Link
                href="/discovery-call"
                style={{
                  background: "var(--terracotta)",
                  color: "var(--cream-3)",
                  padding: "16px 28px",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 700,
                  fontSize: 16,
                  borderRadius: 2,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  textDecoration: "none",
                  boxShadow: "0 16px 40px rgba(26,26,26,0.16)",
                  minHeight: 48,
                }}
              >
                Book a free 30-min check-up
                <ArrowRight style={{ width: 16, height: 16 }} />
              </Link>
            </MagneticButton>
            <div
              ref={stampRef}
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "-14px",
                left: "-18px",
                transform: "translate(-50%, -50%) rotate(-8deg) scale(1)",
                opacity: 0,
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: "0.12em",
                color: "var(--terracotta-aa)",
                border: "3px solid var(--terracotta-aa)",
                borderRadius: 4,
                padding: "6px 12px",
                pointerEvents: "none",
                background: "rgba(250,247,240,0.9)",
                whiteSpace: "nowrap",
              }}
            >
              APPROVED
            </div>
          </div>

          <div
            className="v5-mono-note"
            style={{ marginTop: 22, display: "block" }}
          >
            — Reply in 8h · scope in 48h · Bali (GMT+8) · 9 countries served
          </div>
        </div>
      </div>
    </section>
  );
}
