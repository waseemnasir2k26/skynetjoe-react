"use client";

import { useEffect, useRef, useState } from "react";
import { getGsap } from "./gsapClient";

/**
 * Counts up from 0 to `value` once, when the element scrolls into view.
 * `prefix`/`suffix` wrap the number (e.g. suffix="+" for "180+").
 * prefers-reduced-motion / no-JS: renders the final value immediately —
 * no partial-count flash, no layout shift (number is right-aligned width
 * reserved via tabular-nums).
 */
export default function CountUp({
  value,
  prefix = "",
  suffix = "",
  className,
  style,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(value);
  const played = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    const { gsap, ScrollTrigger } = getGsap();
    const counter = { n: 0 };
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        n: value,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          once: true,
          onEnter: () => {
            played.current = true;
            // Reset the visible number to 0 right as the tween starts
            // (inside this gsap callback, not the effect body directly) —
            // avoids a flash of the final value for elements already in
            // the initial viewport before ScrollTrigger fires.
            setDisplay(0);
          },
        },
        onUpdate: () => setDisplay(Math.round(counter.n)),
      });
    }, el);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [value]);

  return (
    <span
      ref={ref}
      className={className}
      style={{ fontVariantNumeric: "tabular-nums", ...style }}
    >
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
