"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/components/home/gsapClient";

/**
 * 3-step process drawn as a flowchart — box nodes + connector arrows that
 * stroke-draw in as the section scrolls into view. Copy reused from v3's
 * ProcessSteps.tsx (same homepage-proven "5–14 day" build cadence) — no new
 * timing claims invented for this variant.
 */
const STEPS = [
  {
    n: "01",
    title: "Print the inbox",
    body: "We sit with your actual threads, calls, and forms before writing a single workflow node. No assumptions.",
  },
  {
    n: "02",
    title: "Ship the fix",
    body: "Most builds land in 5–14 days. You see it working, not a slide deck describing it.",
  },
  {
    n: "03",
    title: "Stay in the loop",
    body: "Reply in 8h, scope changes in 48h. Bali hours, GMT+8 — but async by default.",
  },
];

export default function BlueprintProcess() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const boxRefs = useRef<(SVGRectElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const paths = pathRefs.current.filter(Boolean) as SVGPathElement[];
    const boxes = boxRefs.current.filter(Boolean) as SVGRectElement[];

    paths.forEach((p) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = reduce ? "0" : `${len}`;
    });
    boxes.forEach((b) => {
      const w = Number(b.getAttribute("width"));
      const h = Number(b.getAttribute("height"));
      const len = 2 * (w + h);
      b.style.strokeDasharray = `${len}`;
      b.style.strokeDashoffset = reduce ? "0" : `${len}`;
    });
    if (reduce) return;

    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.to([...boxes, ...paths], {
        strokeDashoffset: 0,
        ease: "power1.inOut",
        stagger: 0.18,
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "bottom 55%",
          scrub: 0.6,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section relative"
      style={{
        background: "var(--cream-2)",
        color: "var(--ink)",
        fontFamily: "var(--font-sans)",
        borderBottom: "1px solid rgba(26,26,26,0.14)",
      }}
    >
      <div className="container-x relative">
        <div className="max-w-2xl mb-16">
          <div className="v5-mono-tag">
            <span className="v5-tick" />
            Fig. 04 — Process flow
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              fontSize: "clamp(26px, 6vw, 40px)",
              margin: 0,
              maxWidth: "22ch",
            }}
          >
            Three steps.{" "}
            <span style={{ color: "var(--terracotta-aa)" }}>
              No pitch deck.
            </span>
          </h2>
        </div>

        <div className="relative">
          <svg
            className="hidden md:block"
            aria-hidden="true"
            viewBox="0 0 900 120"
            preserveAspectRatio="none"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: 120,
              zIndex: 0,
            }}
          >
            {STEPS.map((s, i) => (
              <rect
                key={s.n}
                ref={(el) => {
                  boxRefs.current[i] = el;
                }}
                x={i * 300 + 40}
                y={30}
                width={220}
                height={60}
                fill="var(--cream-3)"
                stroke="#1a1a1a"
                strokeWidth={1.4}
              />
            ))}
            <path
              ref={(el) => {
                pathRefs.current[0] = el;
              }}
              d="M260,60 H340"
              fill="none"
              stroke="var(--terracotta-aa)"
              strokeWidth={1.6}
              markerEnd="url(#v5-arrow)"
            />
            <path
              ref={(el) => {
                pathRefs.current[1] = el;
              }}
              d="M560,60 H640"
              fill="none"
              stroke="var(--terracotta-aa)"
              strokeWidth={1.6}
              markerEnd="url(#v5-arrow)"
            />
            <defs>
              <marker
                id="v5-arrow"
                markerWidth="8"
                markerHeight="8"
                refX="6"
                refY="4"
                orient="auto"
              >
                <path d="M0,0 L8,4 L0,8 Z" fill="var(--terracotta-aa)" />
              </marker>
            </defs>
          </svg>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
            style={{ zIndex: 1 }}
          >
            {STEPS.map((s) => (
              <div key={s.n} style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 4,
                    background: "var(--cream-3)",
                    border: "2px solid var(--terracotta)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 700,
                    fontSize: 16,
                    color: "var(--terracotta-aa)",
                  }}
                >
                  {s.n}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 19,
                    fontWeight: 600,
                    marginBottom: 10,
                    color: "var(--ink)",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    fontSize: 14.5,
                    color: "var(--ink-2)",
                    lineHeight: 1.6,
                    maxWidth: "32ch",
                    margin: "0 auto",
                  }}
                >
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
