"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "./gsapClient";

/**
 * Thin decorative connector line drawn above a 3-up card grid — one dot per
 * card, joined by a path that draws itself in (stroke-dashoffset) as the
 * section scrolls into view. Desktop/tablet only (hidden <768px, where the
 * cards stack and a horizontal connector stops making visual sense).
 */
export default function ConnectorLine() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const path = pathRef.current;
    const svg = svgRef.current;
    if (!path || !svg) return;
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = reduce ? "0" : `${len}`;
    if (reduce) return;

    const { gsap, ScrollTrigger } = getGsap();
    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: svg,
          start: "top 85%",
          once: true,
        },
      });
    });
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === svg) st.kill();
      });
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      viewBox="0 0 100 6"
      preserveAspectRatio="none"
      className="hidden md:block"
      style={{ width: "100%", height: 14, marginBottom: -4 }}
    >
      <path
        ref={pathRef}
        d="M 17 3 L 50 3 L 83 3"
        fill="none"
        stroke="var(--terracotta)"
        strokeOpacity={0.45}
        strokeWidth={0.6}
      />
      {[17, 50, 83].map((x) => (
        <circle key={x} cx={x} cy={3} r={1.3} fill="var(--terracotta)" />
      ))}
    </svg>
  );
}
