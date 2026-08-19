"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/components/home/gsapClient";

/**
 * 3-step process with a hand-drawn SVG connector — path strokes draw in
 * (strokeDashoffset 0) as the section scrolls into view. Copy adapted from
 * the homepage's proven "5-14 day" build cadence (ProofReceipts.tsx /
 * HeroFunnel.tsx trust strip) — no new timing claims invented.
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

export default function ProcessSteps() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const path = pathRef.current;
    if (!section || !path) return;

    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = reduce ? "0" : `${length}`;
    if (reduce) return;

    const { gsap, ScrollTrigger } = getGsap();
    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "bottom 60%",
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
        borderBottom: "1px solid rgba(26,26,26,0.12)",
      }}
    >
      <div className="container-x relative">
        <div className="max-w-2xl mb-16">
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "var(--terracotta-aa)",
              marginBottom: 16,
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span
              style={{
                width: 28,
                height: 1,
                background: "var(--terracotta)",
                display: "inline-block",
              }}
            />
            How it runs
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
          {/* Connector SVG — desktop-only decorative line linking the 3 nodes.
              Hidden on narrow viewports where cards stack (line would be
              meaningless vertically-mismatched). */}
          <svg
            className="hidden md:block"
            aria-hidden="true"
            viewBox="0 0 900 40"
            preserveAspectRatio="none"
            style={{
              position: "absolute",
              top: 28,
              left: "16.5%",
              width: "67%",
              height: 40,
              zIndex: 0,
            }}
          >
            <path
              ref={pathRef}
              d="M0,20 C150,60 250,-20 450,20 C650,60 750,-20 900,20"
              fill="none"
              stroke="var(--terracotta)"
              strokeWidth={2}
              strokeLinecap="round"
            />
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
                    borderRadius: "50%",
                    background: "var(--cream-3)",
                    border: "2px solid var(--terracotta)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 18,
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
