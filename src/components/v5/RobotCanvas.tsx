"use client";

import { Canvas } from "@react-three/fiber";
import RobotSceneContent from "./RobotSceneContent";

/**
 * Real WebGL canvas for the hero wireframe robot. Only ever mounted
 * client-side via next/dynamic(ssr:false) from BlueprintHero.tsx.
 * `frameloop` is parent-controlled (only "always" while the hero is
 * actually intersecting) so the canvas never spends GPU off-screen.
 * `onContextLost` bubbles up so the parent drops to the SVG fallback if the
 * live WebGL context dies mid-session.
 */
export default function RobotCanvas({
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
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ fov: 38, near: 0.1, far: 20, position: [2.6, 1.1, 4.4] }}
      frameloop={active ? "always" : "never"}
      style={{ position: "absolute", inset: 0 }}
      onCreated={({ gl, camera }) => {
        camera.lookAt(0, 0, 0);
        gl.domElement.addEventListener("webglcontextlost", (e) => {
          e.preventDefault();
          onContextLost?.();
        });
      }}
    >
      <RobotSceneContent progressRef={progressRef} />
    </Canvas>
  );
}
