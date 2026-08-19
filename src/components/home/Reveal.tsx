"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { getGsap } from "./gsapClient";

/**
 * gsap/ScrollTrigger reveal for the scroll-choreographed homepage sections
 * (Outcomes "what we automate" cards, proof/receipts, tools teaser,
 * testimonials). Element starts visually in its final position in the
 * server-rendered HTML (no FOUC, no CLS) — gsap.from() only animates it
 * client-side, and prefers-reduced-motion skips the tween entirely so the
 * element just stays where it already is.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    const { gsap, ScrollTrigger } = getGsap();
    const ctx = gsap.context(() => {
      gsap.from(el, {
        opacity: 0,
        y,
        duration: 0.6,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      });
    }, el);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [delay, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
