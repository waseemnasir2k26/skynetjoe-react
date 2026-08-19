"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/components/home/gsapClient";

/**
 * One bundle's "exploded technical diagram" — N labelled part boxes
 * (B-01, B-02…) that start pulled apart along a diagonal explode axis with
 * dashed leader lines, draw their own outlines in (stroke-dashoffset), and
 * slide together into a single assembled block as the diagram scrolls into
 * view. Deliberately 2D/SVG rather than a 4th R3F canvas: an exploded
 * orthographic parts diagram IS the native blueprint idiom (drafting
 * assembly drawings are 2D), and it keeps 3 more canvases off the page —
 * the hero robot is the one real WebGL "wireframe machine" showpiece, per
 * the build brief.
 */
export default function ExplodedDiagramSVG({
  prefix,
  partCount,
  flagship,
}: {
  prefix: string;
  partCount: number;
  flagship?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const partRefs = useRef<(SVGGElement | null)[]>([]);
  const outlineRefs = useRef<(SVGRectElement | null)[]>([]);
  const leaderRefs = useRef<(SVGLineElement | null)[]>([]);

  // Deterministic assembled/exploded layout — stacked column, assembled
  // center vs. exploded diagonal offset per part index.
  const layout = Array.from({ length: partCount }, (_, i) => {
    const assembledY = 30 + i * 46;
    return {
      assembledX: 40,
      assembledY,
      explodedX: 40 + (i % 2 === 0 ? -46 : 46),
      explodedY: assembledY - 30 + i * 6,
    };
  });

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    outlineRefs.current.forEach((r) => {
      if (!r) return;
      const len = 2 * (140 + 34);
      r.style.strokeDasharray = `${len}`;
    });

    const applyProgress = (p: number) => {
      layout.forEach((l, i) => {
        const g = partRefs.current[i];
        const outline = outlineRefs.current[i];
        const leader = leaderRefs.current[i];
        if (!g) return;
        const x = l.explodedX + (l.assembledX - l.explodedX) * p;
        const y = l.explodedY + (l.assembledY - l.explodedY) * p;
        g.setAttribute(
          "transform",
          `translate(${x - l.assembledX}, ${y - l.assembledY})`,
        );
        g.style.opacity = String(0.25 + 0.75 * p);
        if (outline) {
          const len = 2 * (140 + 34);
          outline.style.strokeDashoffset = `${len * (1 - p)}`;
        }
        if (leader) {
          leader.style.opacity = String(Math.max(0, 0.5 - p));
        }
      });
    };

    if (reduce) {
      applyProgress(1);
      return;
    }
    applyProgress(0);

    const { gsap, ScrollTrigger } = getGsap();
    const ctx = gsap.context(() => {
      const state = { p: 0 };
      gsap.to(state, {
        p: 1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: wrap,
          start: "top 88%",
          end: "top 42%",
          scrub: 0.5,
        },
        onUpdate: () => applyProgress(state.p),
      });
    }, wrap);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === wrap) st.kill();
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partCount]);

  const height = 30 + (partCount - 1) * 46 + 46;

  return (
    <div ref={wrapRef} style={{ width: "100%" }}>
      <svg
        viewBox={`0 0 220 ${height}`}
        aria-hidden="true"
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        {layout.map((l, i) => (
          <line
            key={`leader-${i}`}
            ref={(el) => {
              leaderRefs.current[i] = el;
            }}
            x1={l.explodedX}
            y1={l.explodedY + 17}
            x2={l.assembledX}
            y2={l.assembledY + 17}
            stroke="var(--terracotta-aa)"
            strokeWidth={1}
            strokeDasharray="2 3"
          />
        ))}
        {layout.map((l, i) => (
          <g
            key={`part-${i}`}
            ref={(el) => {
              partRefs.current[i] = el;
            }}
          >
            <rect
              ref={(el) => {
                outlineRefs.current[i] = el;
              }}
              x={l.assembledX}
              y={l.assembledY}
              width={140}
              height={34}
              fill={flagship ? "var(--ink)" : "var(--cream-3)"}
              stroke={flagship ? "var(--terracotta)" : "#1a1a1a"}
              strokeWidth={1.3}
            />
            <text
              x={l.assembledX + 10}
              y={l.assembledY + 21}
              fontFamily="var(--font-mono)"
              fontSize={10}
              letterSpacing="0.05em"
              fill={flagship ? "var(--terracotta)" : "var(--terracotta-aa)"}
            >
              {prefix}-{String(i + 1).padStart(2, "0")}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
