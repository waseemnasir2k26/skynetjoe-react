"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/components/home/gsapClient";

/**
 * Drawn front-elevation of the automation robot — mobile / touch / no-WebGL
 * / reduced-motion / lost-context fallback for BlueprintHero. NOT a static
 * screenshot of the 3D scene: it's its own hand-built line drawing of the
 * same base -> legs -> chassis -> arms -> head -> antenna -> eye assembly,
 * so it reads as premium on its own rather than a degraded placeholder.
 *
 * Draw-in is CSS-cheap (SVG stroke-dashoffset, no WebGL, no per-frame JS
 * once the tween starts) so it still runs on mobile — just a shorter
 * duration than the desktop 3D beat, per the build brief ("mobile: draw-ins
 * work, shorten durations"). prefers-reduced-motion renders the finished
 * drawing with zero animation.
 *
 * Callout opacity is driven directly off the tween's own progress (ref
 * mutation in onUpdate), NOT a "played once" React state flipped by
 * onComplete — React 19's Strict Mode double-invokes this effect in dev
 * (mount -> cleanup -> mount), and an onComplete-gated boolean can get
 * reverted by the first cleanup's `ctx.revert()` before it ever fires,
 * leaving callouts permanently invisible. Reading progress every update
 * self-corrects across any number of mount/cleanup cycles.
 */
const CALLOUTS = [
  { id: "intake", label: "Lead intake", x: 46, y: 300, revealAt: 0.15 },
  { id: "triage", label: "AI triage", x: 220, y: 190, revealAt: 0.5 },
  { id: "reply", label: "Auto-reply", x: 200, y: 62, revealAt: 0.85 },
];

export default function RobotStaticSVG() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const calloutRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const paths = Array.from(
      svg.querySelectorAll<SVGPathElement>("path[data-draw]"),
    );
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const lengths = paths.map((p) => p.getTotalLength());

    const applyProgress = (p: number) => {
      paths.forEach((el, i) => {
        el.style.strokeDasharray = `${lengths[i]}`;
        el.style.strokeDashoffset = `${lengths[i] * (1 - p)}`;
      });
      CALLOUTS.forEach((c, i) => {
        const el = calloutRefs.current[i];
        if (!el) return;
        const local = Math.max(0, Math.min(1, (p - c.revealAt) / 0.12));
        el.style.opacity = String(local);
      });
    };

    if (reduce) {
      applyProgress(1);
      return;
    }
    applyProgress(0);

    const mobile = window.matchMedia?.("(max-width: 767px)").matches ?? false;
    const duration = mobile ? 0.9 : 1.7;

    const { gsap, ScrollTrigger } = getGsap();
    const ctx = gsap.context(() => {
      const state = { p: 0 };
      gsap.to(state, {
        p: 1,
        duration,
        ease: "power1.inOut",
        scrollTrigger: { trigger: svg, start: "top 85%", once: true },
        onUpdate: () => applyProgress(state.p),
      });
    }, svg);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === svg) st.kill();
      });
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <svg
        ref={svgRef}
        viewBox="0 0 300 340"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <g fill="none" stroke="#1a1a1a" strokeWidth={1.4} strokeLinecap="round">
          {/* base */}
          <path data-draw d="M70,318 H230 V294 H70 Z" />
          {/* legs */}
          <path data-draw d="M96,294 V236 H120 V294" />
          <path data-draw d="M180,294 V236 H204 V294" />
          {/* chassis */}
          <path data-draw d="M80,236 H220 V148 H80 Z" />
          {/* arms */}
          <path data-draw d="M80,175 H26 V150 H80" />
          <path data-draw d="M220,175 H274 V150 H220" />
          {/* head */}
          <path data-draw d="M112,148 H188 V90 H112 Z" />
          {/* antenna */}
          <path data-draw d="M150,90 V54" />
          <path data-draw d="M150,44 a10,10 0 1,0 0.01,0" stroke="#c66b3f" />
          {/* eye */}
          <path
            data-draw
            d="M150,120 a16,16 0 1,0 0.01,0"
            stroke="#c66b3f"
            strokeWidth={1.6}
          />
        </g>
      </svg>

      {CALLOUTS.map((c, i) => (
        <div
          key={c.id}
          ref={(el) => {
            calloutRefs.current[i] = el;
          }}
          aria-hidden="true"
          style={{
            position: "absolute",
            left: `${(c.x / 300) * 100}%`,
            top: `${(c.y / 340) * 100}%`,
            transform: "translate(-50%, -50%)",
            fontFamily: "var(--font-mono)",
            fontSize: 10.5,
            whiteSpace: "nowrap",
            background: "rgba(242,239,230,0.94)",
            border: "1px solid rgba(198,107,63,0.5)",
            borderRadius: 2,
            padding: "3px 7px",
            color: "var(--terracotta-aa)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            opacity: 0,
          }}
        >
          — {c.label}
        </div>
      ))}
    </div>
  );
}
