"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import MagneticButton from "@/components/home/MagneticButton";
import { isWebGLAvailable, prefersReducedMotion } from "./webgl";

const FinalCTAPhysicsCanvas = dynamic(() => import("./FinalCTAPhysicsCanvas"), {
  ssr: false,
  loading: () => null,
});

/**
 * Full-bleed rust final CTA. Copy reused verbatim from FinalCTAInk.tsx (v3)
 * / FinalCTA.tsx (homepage) — no new claims. Delight detail: 2 small tumble
 * pieces sit behind the button; tossing one so it overlaps the button's
 * physics sensor makes the real DOM button glow (rust ring + slight scale)
 * via a genuine rapier collision event (FinalCTAPhysicsScene.tsx), not a
 * mouse-position CSS trick.
 */
export default function FinalCTAWorkshop() {
  const wrapperRef = useRef<HTMLElement | null>(null);
  const [mode, setMode] = useState<"pending" | "scene" | "fallback">("pending");
  const [intersecting, setIntersecting] = useState(true);
  const [visible, setVisible] = useState(true);
  const [glow, setGlow] = useState(false);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const webgl = isWebGLAvailable();
    queueMicrotask(() => setMode(reduced || !webgl ? "fallback" : "scene"));
  }, []);

  const onVisibilityChange = useCallback(
    () => setVisible(!document.hidden),
    [],
  );

  const handleContextLost = useCallback(() => {
    setGlow(false);
    setMode("fallback");
  }, []);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(el);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [onVisibilityChange]);

  return (
    <section
      ref={wrapperRef}
      className="relative overflow-hidden"
      style={{
        background: "var(--terracotta)",
        padding: "clamp(64px, 14vw, 120px) 0 clamp(72px, 16vw, 132px)",
        fontFamily: "var(--font-sans)",
      }}
    >
      {mode === "scene" && (
        <FinalCTAPhysicsCanvas
          active={intersecting && visible}
          onGlow={setGlow}
          onContextLost={handleContextLost}
        />
      )}

      <div className="container-x relative" style={{ zIndex: 2 }}>
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
                transition: "transform 0.18s, box-shadow 0.25s",
                boxShadow: glow
                  ? "0 0 0 6px rgba(26,26,26,0.22), 0 16px 44px rgba(26,26,26,0.28)"
                  : "0 16px 40px rgba(26,26,26,0.18)",
                transform: glow ? "scale(1.04)" : "scale(1)",
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
