"use client";

import { Canvas } from "@react-three/fiber";
import MachineSceneContent from "./MachineSceneContent";

/**
 * Real WebGL canvas for the "THE MACHINE" pinned beat. Only ever mounted
 * client-side via next/dynamic(ssr:false) from MachineBeat.tsx.
 *
 * `frameloop` is controlled by the parent (only "always" while the pinned
 * section is actually intersecting the viewport) so this canvas never
 * spends GPU while scrolled out of view. `onContextLost` bubbles up so the
 * parent can drop to the static fallback if the live WebGL context dies
 * mid-session (R3F does not auto-recover a lost context).
 */
export default function MachineCanvas({
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
      camera={{ fov: 42, near: 0.1, far: 30, position: [0, 2.2, 7.5] }}
      frameloop={active ? "always" : "never"}
      style={{ position: "absolute", inset: 0 }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", (e) => {
          e.preventDefault();
          onContextLost?.();
        });
      }}
    >
      <MachineSceneContent progressRef={progressRef} />
    </Canvas>
  );
}
