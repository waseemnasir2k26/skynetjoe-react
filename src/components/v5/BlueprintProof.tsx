"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/components/home/gsapClient";
import Reveal from "@/components/home/Reveal";

/**
 * Canonical proof numbers ONLY — same figures already published in
 * ProofReceipts.tsx / HeroFunnel.tsx / about page: "180+ workflows, 40+
 * sites, 9 countries, founded 2019". Nothing new claimed here; presented as
 * annotated gauge/dial drawings instead of plain stat cards.
 */
const STATS = [
  {
    id: "workflows",
    value: 180,
    suffix: "+",
    label: "workflows shipped",
    max: 200,
  },
  { id: "sites", value: 40, suffix: "+", label: "sites delivered", max: 50 },
  { id: "countries", value: 9, suffix: "", label: "countries served", max: 12 },
  { id: "since", value: 2019, suffix: "", label: "shipping since", max: 2019 },
];

const R = 46;
const CIRC = 2 * Math.PI * R;

function Gauge({ id, value, suffix, label, max }: (typeof STATS)[number]) {
  const arcRef = useRef<SVGCircleElement | null>(null);
  const numRef = useRef<SVGTextElement | null>(null);

  useEffect(() => {
    const arc = arcRef.current;
    const num = numRef.current;
    if (!arc || !num) return;
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const fraction = id === "since" ? 1 : Math.min(1, value / max);

    arc.style.strokeDasharray = `${CIRC}`;
    if (reduce) {
      arc.style.strokeDashoffset = `${CIRC * (1 - fraction)}`;
      num.textContent = `${value}${suffix}`;
      return;
    }
    arc.style.strokeDashoffset = `${CIRC}`;

    const { gsap, ScrollTrigger } = getGsap();
    const counter = { n: 0, f: 0 };
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        n: value,
        f: fraction,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: { trigger: arc, start: "top 90%", once: true },
        onUpdate: () => {
          num.textContent = `${Math.round(counter.n)}${suffix}`;
          arc.style.strokeDashoffset = `${CIRC * (1 - counter.f)}`;
        },
      });
    });
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === arc) st.kill();
      });
    };
  }, [id, value, suffix, max]);

  return (
    <Reveal>
      <div style={{ textAlign: "center" }}>
        <svg
          viewBox="0 0 120 120"
          style={{ width: "100%", maxWidth: 140, margin: "0 auto" }}
        >
          <circle
            cx={60}
            cy={60}
            r={R}
            fill="none"
            stroke="rgba(26,26,26,0.14)"
            strokeWidth={2}
          />
          <circle
            ref={arcRef}
            cx={60}
            cy={60}
            r={R}
            fill="none"
            stroke="var(--terracotta-aa)"
            strokeWidth={2.5}
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
          />
          {/* tick marks — dial reads like an instrument, not a plain ring */}
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i / 12) * Math.PI * 2;
            const x1 = 60 + Math.cos(a) * (R + 4);
            const y1 = 60 + Math.sin(a) * (R + 4);
            const x2 = 60 + Math.cos(a) * (R + 8);
            const y2 = 60 + Math.sin(a) * (R + 8);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(26,26,26,0.35)"
                strokeWidth={1}
              />
            );
          })}
          <text
            ref={numRef}
            x={60}
            y={66}
            textAnchor="middle"
            fontFamily="var(--font-display)"
            fontWeight={700}
            fontSize={22}
            fill="var(--ink)"
          >
            0
          </text>
        </svg>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--ink-2)",
            marginTop: 6,
          }}
        >
          {label}
        </div>
      </div>
    </Reveal>
  );
}

export default function BlueprintProof() {
  return (
    <section
      className="section"
      style={{
        background: "var(--cream-3)",
        color: "var(--ink)",
        fontFamily: "var(--font-sans)",
        borderBottom: "1px solid rgba(26,26,26,0.14)",
      }}
    >
      <div className="container-x">
        <Reveal className="max-w-2xl mb-10">
          <div className="v5-mono-tag">
            <span className="v5-tick" />
            Fig. 03 — Instrument panel
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              fontSize: "clamp(26px, 6vw, 40px)",
              margin: 0,
              maxWidth: "24ch",
            }}
          >
            Order settles.{" "}
            <span style={{ color: "var(--terracotta-aa)" }}>
              The readings don&rsquo;t move.
            </span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s) => (
            <Gauge key={s.id} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
