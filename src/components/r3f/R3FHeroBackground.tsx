"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const WorkflowNodes3D = dynamic(() => import("./WorkflowNodes3D"), {
  ssr: false,
  loading: () => null,
});

/**
 * Cinematic R3F hero background — mobile-skipped + reduced-motion-skipped.
 *
 * Loads only when:
 *   - Viewport >= 1024px (lg+) — skip mobile GPU drain entirely
 *   - User does NOT prefer-reduced-motion
 *
 * Lives behind the hero content (absolute positioned, pointer-events:none).
 */
export default function R3FHeroBackground() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mqDesktop = window.matchMedia("(min-width: 1024px)");
    const mqMotion = window.matchMedia("(prefers-reduced-motion: no-preference)");

    const evaluate = () => setEnabled(mqDesktop.matches && mqMotion.matches);
    evaluate();

    mqDesktop.addEventListener("change", evaluate);
    mqMotion.addEventListener("change", evaluate);
    return () => {
      mqDesktop.removeEventListener("change", evaluate);
      mqMotion.removeEventListener("change", evaluate);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.85 }}
    >
      <WorkflowNodes3D />
    </div>
  );
}
