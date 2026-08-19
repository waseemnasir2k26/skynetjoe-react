"use client";

import { Canvas } from "@react-three/fiber";
import FinalCTAPhysicsScene from "./FinalCTAPhysicsScene";

/**
 * `onContextLost` bubbles up so FinalCTAWorkshop can drop to its no-canvas
 * fallback mode if the live WebGL context dies mid-session — matches the
 * V4Canvas / HeroPhysicsCanvas convention rather than inventing a second
 * recovery path.
 */
export default function FinalCTAPhysicsCanvas({
  active,
  onGlow,
  onContextLost,
}: {
  active: boolean;
  onGlow: (v: boolean) => void;
  onContextLost?: () => void;
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      camera={{ fov: 38, near: 0.1, far: 20, position: [0, 1.2, 6] }}
      frameloop={active ? "always" : "never"}
      style={{ position: "absolute", inset: 0 }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", (e) => {
          e.preventDefault();
          onContextLost?.();
        });
      }}
    >
      <FinalCTAPhysicsScene onGlow={onGlow} />
    </Canvas>
  );
}
