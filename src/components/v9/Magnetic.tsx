"use client";
import { useRef, ReactNode, useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

/* Route-local port of waseemnasir-react components/Magnetic.tsx, scoped
   to /v9 (that file lives outside this port's edit scope, so the two
   small motion constants it depends on — EASE_SILK / SPRING_SNAP — are
   inlined below rather than imported cross-repo). */
const SPRING_SNAP = { type: "spring", stiffness: 300, damping: 26 } as const;

interface MagneticProps {
  children: ReactNode;
  /** Outer container travel multiplier (default 0.3) */
  strength?: number;
  /** Inner label trail multiplier — creates depth parallax (default 0.15) */
  innerStrength?: number;
}

/**
 * Magnetic hover wrapper with inner-label parallax depth.
 * Guards: useReducedMotion() and (hover:hover)+(pointer:fine) both pass
 * through unwrapped (no spring loops on touch / reduced-motion).
 */
export default function Magnetic({
  children,
  strength = 0.3,
  innerStrength = 0.15,
}: MagneticProps) {
  const reduce = useReducedMotion();
  const [isFine, setIsFine] = useState(true);

  useEffect(() => {
    // Deferred to a microtask — avoids a synchronous setState in the effect
    // body (react-hooks/set-state-in-effect), matching the v2/V2SceneLoader
    // convention used elsewhere in this repo.
    queueMicrotask(() => {
      setIsFine(
        window.matchMedia("(hover: hover) and (pointer: fine)").matches,
      );
    });
  }, []);

  const outerRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  const ox = useMotionValue(0);
  const oy = useMotionValue(0);
  const ix = useMotionValue(0);
  const iy = useMotionValue(0);

  const sx = useSpring(ox, { stiffness: 200, damping: 15 });
  const sy = useSpring(oy, { stiffness: 200, damping: 15 });
  const isx = useSpring(ix, { stiffness: 200, damping: 15 });
  const isy = useSpring(iy, { stiffness: 200, damping: 15 });

  if (reduce || !isFine) {
    return <>{children}</>;
  }

  const onEnter = () => {
    if (outerRef.current) {
      rectRef.current = outerRef.current.getBoundingClientRect();
    }
  };

  const onMove = (e: React.MouseEvent) => {
    const r = rectRef.current;
    if (!r) return;
    const cx = e.clientX - (r.left + r.width / 2);
    const cy = e.clientY - (r.top + r.height / 2);
    ox.set(cx * strength);
    oy.set(cy * strength);
    ix.set(cx * innerStrength);
    iy.set(cy * innerStrength);
  };

  const reset = () => {
    ox.set(0);
    oy.set(0);
    ix.set(0);
    iy.set(0);
    rectRef.current = null;
  };

  return (
    <motion.div
      ref={outerRef}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={reset}
      whileHover={{ scale: 1.02, transition: SPRING_SNAP }}
      whileTap={{ scale: 0.96, transition: SPRING_SNAP }}
      style={{ x: sx, y: sy, display: "inline-block" }}
    >
      <motion.span style={{ x: isx, y: isy, display: "block" }}>
        {children}
      </motion.span>
    </motion.div>
  );
}
