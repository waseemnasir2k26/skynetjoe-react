"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import NodeGraphSVG from "./NodeGraphSVG";

// Canvas layer is only ever needed client-side, after mount — split it into
// its own chunk so it doesn't add to the initial hero bundle at all.
const NodeGraphCanvas = dynamic(() => import("./NodeGraphCanvas"), {
  ssr: false,
});

/**
 * Hero background: full-bleed <NodeGraphSVG> (real DOM, SSR'd, always
 * present — the H1 sitting on top of it is unaffected either way, so LCP
 * is unchanged) plus a decorative <NodeGraphCanvas> mounted after first
 * paint via requestIdleCallback. prefers-reduced-motion users never get the
 * canvas at all and keep the static SVG only.
 */
export default function NodeGraphHero() {
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const idle =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback
        : (cb: () => void) => window.setTimeout(cb, 200);
    const cancelIdle =
      typeof window.cancelIdleCallback === "function"
        ? window.cancelIdleCallback
        : window.clearTimeout;

    const id = idle(() => setShowCanvas(true));
    return () => cancelIdle(id as never);
  }, []);

  return (
    <div
      aria-hidden={false}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {/* Pinned to the TOP of the hero with its own aspect ratio, rather than
          stretched to the section's full (often very tall, mobile-stacked)
          height — otherwise SVG `meet` scaling centers the graph vertically
          inside that tall box and it ends up rendered below the fold. */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          aspectRatio: "800 / 480",
          maxHeight: "100%",
          opacity: 0.85,
        }}
      >
        <NodeGraphSVG className="node-graph-svg" />
        {showCanvas && <NodeGraphCanvas />}
      </div>
      {/* Soft cream fade so the graph never fights the H1/copy for contrast. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 70% 60% at 30% 40%, var(--cream-3) 0%, rgba(250,247,240,0.55) 45%, rgba(250,247,240,0.15) 75%)",
        }}
      />
    </div>
  );
}
