"use client";

import { Canvas } from "@react-three/fiber";
import ParticleFieldScene from "./ParticleFieldScene";

/**
 * Real WebGL canvas for the V7 morphing particle field. Only ever mounted
 * client-side via next/dynamic(ssr:false) from ParticleFieldBeat.tsx.
 * Same control contract as v3/MachineCanvas.tsx: `frameloop` is owned by the
 * parent (only "always" while the pinned section is intersecting + tab
 * visible) so this canvas never spends GPU while scrolled out of view, and
 * `onContextLost` bubbles up so the parent can drop to the static fallback
 * if the live WebGL context dies mid-session.
 */
export default function ParticleFieldCanvas({
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
        antialias: false,
        alpha: false,
        powerPreference: "high-performance",
      }}
      camera={{ fov: 40, near: 0.1, far: 30, position: [0, 0, 6.2] }}
      frameloop={active ? "always" : "never"}
      style={{ position: "absolute", inset: 0 }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", (e) => {
          e.preventDefault();
          onContextLost?.();
        });
      }}
    >
      <color attach="background" args={["#1a1a1a"]} />
      <ParticleFieldScene progressRef={progressRef} />
    </Canvas>
  );
}
