"use client";

import { Canvas } from "@react-three/fiber";
import V4SceneContent from "./V4SceneContent";

/**
 * Real WebGL canvas for the "THE LINE" whole-page journey. Only ever
 * mounted client-side via next/dynamic(ssr:false) from V4Journey.tsx.
 *
 * `frameloop` is controlled by the parent (only "always" while the sticky
 * canvas is actually intersecting the viewport + tab visible) so this
 * canvas never spends GPU while scrolled past. `onContextLost` bubbles up
 * so the parent can drop to the static fallback if the live WebGL context
 * dies mid-session (R3F does not auto-recover a lost context).
 */
export default function V4Canvas({
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
        alpha: false,
        powerPreference: "high-performance",
      }}
      camera={{ fov: 45, near: 0.1, far: 40, position: [0, 2.6, 9.5] }}
      frameloop={active ? "always" : "never"}
      style={{ position: "absolute", inset: 0 }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", (e) => {
          e.preventDefault();
          onContextLost?.();
        });
      }}
    >
      <V4SceneContent progressRef={progressRef} />
    </Canvas>
  );
}
