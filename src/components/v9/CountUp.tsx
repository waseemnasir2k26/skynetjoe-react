"use client";
import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
  useReducedMotion,
} from "framer-motion";

/* Route-local port of waseemnasir-react components/CountUp.tsx, scoped
   to /v9. EASE_SILK inlined (matches tokens.ts EASE — the source's
   components/motion.ts is outside this port's edit scope). */
const EASE_SILK = [0.16, 1, 0.3, 1] as const;

interface CountUpProps {
  /** The final integer value to count to */
  to: number;
  /** Appended after the number, e.g. "+" or " countries" */
  suffix?: string;
  /**
   * Set false for values that should not roll (e.g. year 2019 — a year
   * reads wrong as a tally). Renders final value immediately.
   */
  roll?: boolean;
  durationMs?: number;
}

/**
 * Honesty-safe count-up that lands EXACTLY on the declared value.
 * Uses framer-motion animate() on a motionValue so there are zero React
 * re-renders per frame. Tabular-nums prevents CLS from digit-width shifts.
 */
export default function CountUp({
  to,
  suffix = "",
  roll = true,
  durationMs = 1400,
}: CountUpProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true });
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.round(v));

  useEffect(() => {
    if (!roll || reduce || !isInView) return;

    const controls = animate(motionVal, to, {
      duration: durationMs / 1000,
      ease: EASE_SILK as unknown as [number, number, number, number],
    });

    return controls.stop;
  }, [isInView, motionVal, to, roll, reduce, durationMs]);

  if (!roll || reduce) {
    return (
      <span
        ref={ref}
        style={{ fontVariantNumeric: "tabular-nums" }}
        aria-label={`${to}${suffix}`}
      >
        {to}
        {suffix}
      </span>
    );
  }

  return (
    <span
      ref={ref}
      style={{ fontVariantNumeric: "tabular-nums" }}
      aria-label={`${to}${suffix}`}
      aria-live="off"
    >
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
