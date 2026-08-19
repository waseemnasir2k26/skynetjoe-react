"use client";

import { Canvas } from "@react-three/fiber";
import GlassSceneContent from "./GlassSceneContent";

/**
 * Real WebGL canvas for the GLASSHOUSE floating-glass layer. Only ever
 * mounted client-side via next/dynamic(ssr:false) from GlassLayer.tsx.
 * Fixed full-viewport, alpha-transparent, pointer-events:none — it sits
 * visually above the page (so the glass objects can drift over the type)
 * while every click/tap passes straight through to the real DOM buttons
 * and links underneath.
 *
 * `frameloop` is controlled by the parent (only "always" while the tab is
 * visible) so this never spends GPU in a background tab. `onContextLost`
 * bubbles up so the parent can drop to the CSS fallback if the live WebGL
 * context dies mid-session (R3F does not auto-recover a lost context).
 */
export default function GlassCanvas({
  progressRef,
  active,
  onContextLost,
}: {
  progressRef: React.MutableRefObject<number>;
  active: boolean;
  onContextLost?: () => void;
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      camera={{ fov: 34, near: 0.1, far: 20, position: [0, 0, 6] }}
      frameloop={active ? "always" : "never"}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 5,
        pointerEvents: "none",
      }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", (e) => {
          e.preventDefault();
          onContextLost?.();
        });
      }}
    >
      <GlassSceneContent progressRef={progressRef} />
    </Canvas>
  );
}
