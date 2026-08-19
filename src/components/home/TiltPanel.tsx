"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Wraps one of the existing bespoke SVG illustrations (WhatsAppCRM,
 * AIDispatcher, ContentPipeline — the homepage's "mock dashboard panels")
 * with a subtle cursor-parallax tilt (transform-only, no repaint) and a
 * pulsing "live" status dot in the corner. No numbers on the panel change —
 * only the existing static SVG artwork gets a live-feel wrapper, per the
 * "no fake changing numbers" constraint.
 */
export default function TiltPanel({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const coarse = window.matchMedia?.("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    function onMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      el!.style.transform = `perspective(700px) rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 6).toFixed(2)}deg)`;
    }
    function onLeave() {
      el!.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg)";
    }

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        transformStyle: "preserve-3d",
        transition: "transform 0.25s ease-out",
        willChange: "transform",
      }}
    >
      {children}
      <span
        aria-hidden
        className="tilt-panel-dot"
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "var(--sage)",
          boxShadow: "0 0 0 0 rgba(138,154,123,0.6)",
        }}
      />
    </div>
  );
}
