"use client";

/**
 * Reveal — cinematic scroll-reveal primitives for interior content pages.
 *
 * Server pages (which export `metadata`) can't be `"use client"`, so the
 * Framer Motion is isolated here and dropped into those pages as wrappers.
 * Honors prefers-reduced-motion via Framer's `MotionConfig reducedMotion`
 * default (transform/opacity only) and a viewport `once` guard so reveals
 * fire a single time. Used by: about, portfolio, blog, news, author,
 * case-studies interior pages (redesign/full-site).
 */

import { motion, type Variants } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Masked slide-up: content rises into a clip window as it enters view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  style,
  as = "div",
  initialVisible = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "section" | "li" | "figure";
  /**
   * Paint children visible on first frame (no hidden initial state) so
   * above-the-fold / hero content is never blank on no-JS or slow hydration,
   * while still animating to its final state. P0 conversion + LLM-crawler fix.
   * Defaults to false to preserve the masked-reveal behavior for existing callers.
   */
  initialVisible?: boolean;
}) {
  const MotionTag = motion[as];
  // `reveal-root` is a stable hook so the prefers-reduced-motion override in
  // globals.css can force this (otherwise class-less) motion.div visible.
  const rootClass = className ? `reveal-root ${className}` : "reveal-root";
  return (
    <MotionTag
      className={rootClass}
      style={style}
      initial={
        initialVisible
          ? false
          : { opacity: 0, y, clipPath: "inset(0 0 100% 0)" }
      }
      animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}

const STAGGER_PARENT: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
};

const STAGGER_CHILD: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/** Parent that staggers its <RevealItem> children as the group enters view. */
export function RevealGroup({
  children,
  className,
  style,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "ol" | "ul" | "section";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      style={style}
      variants={STAGGER_PARENT}
      initial={false}
      animate="visible"
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  style,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "li" | "article" | "figure";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag variants={STAGGER_CHILD} className={className} style={style}>
      {children}
    </MotionTag>
  );
}

/** Subtle parallax drift for hero figures / images. */
export function ParallaxFigure({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <motion.figure
      className={className}
      style={style}
      initial={false}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.85, ease: EASE }}
    >
      {children}
    </motion.figure>
  );
}

/** Count-up number for stat strips. Animates 0 → target on first view. */
export function StatCounter({
  value,
  className,
  style,
}: {
  value: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={false}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, ease: EASE }}
    >
      {value}
    </motion.div>
  );
}
