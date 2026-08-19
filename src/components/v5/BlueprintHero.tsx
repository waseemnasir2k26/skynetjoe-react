"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MagneticButton from "@/components/home/MagneticButton";
import { isWebGLAvailable } from "./robotWebgl";
import RobotStaticSVG from "./RobotStaticSVG";

const RobotCanvas = dynamic(() => import("./RobotCanvas"), {
  ssr: false,
  loading: () => null,
});

const DESKTOP_QUERY = "(min-width: 768px) and (pointer: fine)";

// Copy reused verbatim from the homepage hero (HeroFunnel.tsx) — same
// headline/sub used by v3's InkShaderHero, no new claims for this variant.
const HEADLINE_A = "Stop losing customers";
const HEADLINE_B = "while you're busy.";
const SUB =
  "We set up smart tools that reply to every new customer in seconds, follow up for you automatically, and handle the boring repeat work — so you win more jobs without working more hours.";

/**
 * Hero beat: an automation robot drawn as a technical-drawing wireframe,
 * line-by-line, over ~2s once the hero enters view — real R3F LineSegments
 * on desktop + fine pointer + WebGL, a hand-drawn SVG with its own (shorter,
 * CSS-cheap) stroke draw-in everywhere else. Mode decided once on mount,
 * re-evaluated on the relevant matchMedia changes; a lost WebGL context
 * drops straight to the SVG version.
 *
 * H1/sub/CTA are plain SSR markup (LCP element), independent of which
 * drawing mode wins — the diagram is a decorative companion, never the
 * thing search engines or slow connections wait on.
 */
export default function BlueprintHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef(0);

  const [mode, setMode] = useState<"pending" | "scene" | "fallback">("pending");
  const [contextLost, setContextLost] = useState(false);
  const [intersecting, setIntersecting] = useState(false);

  const evaluate = useCallback(() => {
    if (contextLost) {
      setMode("fallback");
      return;
    }
    const desktop = window.matchMedia?.(DESKTOP_QUERY).matches ?? false;
    const reduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    setMode(desktop && !reduced && isWebGLAvailable() ? "scene" : "fallback");
  }, [contextLost]);

  useEffect(() => {
    queueMicrotask(evaluate);
    const desktopMq = window.matchMedia(DESKTOP_QUERY);
    const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    desktopMq.addEventListener("change", evaluate);
    reducedMq.addEventListener("change", evaluate);
    return () => {
      desktopMq.removeEventListener("change", evaluate);
      reducedMq.removeEventListener("change", evaluate);
    };
  }, [evaluate]);

  const handleContextLost = useCallback(() => {
    setContextLost(true);
    setMode("fallback");
  }, []);

  // One-shot ~2s draw-in when the hero enters view (scene mode only) — NOT
  // scroll-scrubbed; the machine draws itself once, then idles.
  useEffect(() => {
    if (mode !== "scene") return;
    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window)) {
      progressRef.current = 1;
      setIntersecting(true);
      return;
    }
    let played = false;
    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && !played) {
          played = true;
          const start = performance.now();
          const duration = 2000;
          const tick = (now: number) => {
            progressRef.current = Math.min(1, (now - start) / duration);
            if (progressRef.current < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(section);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [mode]);

  const srSummary = (
    <p className="sr-only">
      An automation robot assembles step by step: lead intake, AI triage,
      auto-reply.
    </p>
  );

  return (
    <section
      ref={sectionRef}
      className="v5-hero relative overflow-hidden"
      style={{
        background: "var(--cream)",
        color: "var(--ink)",
        fontFamily: "var(--font-sans)",
        borderBottom: "1px solid rgba(26,26,26,0.14)",
        paddingTop:
          "calc(var(--promo-h, 44px) + 64px + clamp(16px, 4vw, 88px))",
        paddingBottom: "clamp(56px, 12vw, 96px)",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        aria-hidden="true"
        className="v5-grid-bg absolute inset-0"
        style={{ zIndex: 0 }}
      />

      <div
        className="container-x relative"
        style={{
          zIndex: 2,
          paddingLeft: "clamp(16px, 5vw, 24px)",
          paddingRight: "clamp(16px, 5vw, 24px)",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "clamp(32px, 6vw, 56px)",
          alignItems: "center",
        }}
      >
        <div
          className="v5-hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "clamp(32px, 6vw, 56px)",
            alignItems: "center",
          }}
        >
          <div style={{ maxWidth: 640 }}>
            <div className="v5-mono-tag">
              <span className="v5-tick" />
              Fig. 01 — Automation unit
            </div>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                lineHeight: 1.08,
                fontSize: "clamp(32px, 7.6vw, 68px)",
                margin: "0 0 22px",
                wordBreak: "break-word",
              }}
            >
              {HEADLINE_A}{" "}
              <span style={{ color: "var(--terracotta-aa)" }}>
                {HEADLINE_B}
              </span>
            </h1>

            <p
              style={{
                fontSize: "clamp(16px, 3.8vw, 19px)",
                color: "var(--ink-2)",
                maxWidth: "54ch",
                lineHeight: 1.6,
                marginBottom: 30,
              }}
            >
              {SUB}
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 22,
              }}
            >
              <MagneticButton>
                <Link
                  href="/discovery-call"
                  style={{
                    background: "var(--terracotta)",
                    color: "var(--cream-3)",
                    padding: "16px 28px",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 600,
                    fontSize: 15,
                    borderRadius: 2,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    textDecoration: "none",
                    minHeight: 48,
                    boxShadow: "0 18px 44px rgba(26,26,26,0.14)",
                  }}
                >
                  Book a free 30-min check-up
                  <ArrowRight style={{ width: 16, height: 16 }} />
                </Link>
              </MagneticButton>
              <span className="v5-mono-note">
                — Scale 1:1 · watch it assemble
              </span>
            </div>
          </div>

          <div
            className="v5-diagram-frame relative"
            style={{
              width: "100%",
              aspectRatio: "4 / 4.2",
              minHeight: 320,
            }}
          >
            {srSummary}
            {(mode === "pending" || mode === "fallback") && <RobotStaticSVG />}
            {mode === "scene" && (
              <RobotCanvas
                progressRef={progressRef}
                active={intersecting}
                onContextLost={handleContextLost}
              />
            )}
            <span className="v5-corner v5-corner-tl" aria-hidden="true" />
            <span className="v5-corner v5-corner-tr" aria-hidden="true" />
            <span className="v5-corner v5-corner-bl" aria-hidden="true" />
            <span className="v5-corner v5-corner-br" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
