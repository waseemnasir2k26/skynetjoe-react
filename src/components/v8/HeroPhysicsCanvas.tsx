"use client";

import { Canvas } from "@react-three/fiber";
import HeroPhysicsScene from "./HeroPhysicsScene";

/**
 * Real WebGL canvas for the hero physics pile. Only ever mounted client-side
 * via next/dynamic(ssr:false) from HeroWorkshop.tsx — the rapier WASM
 * binding never touches the SSR bundle or the server response.
 *
 * `frameloop` is controlled by the parent (only "always" while the hero is
 * actually intersecting the viewport + tab visible) so this never spends
 * GPU while scrolled out of view.
 *
 * `onContextLost` bubbles up so the parent can drop to HeroStaticFallback
 * if the live WebGL context dies mid-session — R3F does not auto-recover a
 * lost context, and without this the section would go permanently blank
 * (rapier still stepping into a dead GL context).
 */
export default function HeroPhysicsCanvas({
  active,
  onContextLost,
}: {
  active: boolean;
  onContextLost?: () => void;
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ fov: 40, near: 0.1, far: 30, position: [1.8, 2.4, 7] }}
      frameloop={active ? "always" : "never"}
      style={{ position: "absolute", inset: 0 }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", (e) => {
          e.preventDefault();
          onContextLost?.();
        });
      }}
    >
      <HeroPhysicsScene paused={!active} />
    </Canvas>
  );
}
