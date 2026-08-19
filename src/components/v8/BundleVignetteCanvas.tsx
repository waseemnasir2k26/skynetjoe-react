"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";

/**
 * Tiny deterministic drop-and-stack: `partCount` boxes spawn stacked
 * directly above the same x=0 column (small y stagger only) and fall
 * straight onto a floor collider — same-column spawn + gravity guarantees a
 * tidy vertical stack every time, no scripted impulses needed to "correct"
 * a bad landing. Runs to rest (damping) and then contributes nothing further
 * to the frame budget — `frameloop="always"` is fine here because this
 * canvas only exists in the DOM for a few seconds around the trigger
 * (parent unmounts nothing, but the body count is tiny: <=3, well inside
 * the 20-body page budget).
 *
 * Each part gets a distinct lightness step off the base color (not just a
 * flat repeat of the same swatch) — identical same-color boxes settled
 * edge-to-edge with no shading cue read as one fused blob, not 3 stacked
 * parts, at this render scale.
 *
 * `active` is IO-driven by the parent (BundleVignette.tsx) — intersecting
 * the viewport AND tab visible — so `frameloop` drops to "never" and the
 * physics world pauses once the card scrolls out, instead of the pile
 * running `frameloop="always"` (and rapier stepping) forever after its
 * one-time drop trigger, which burned a render + physics step every frame
 * for every off-screen card on the page. `onContextLost` matches the
 * V4Canvas/HeroPhysicsCanvas convention — drop to the static fallback if
 * the GL context dies.
 */
export default function BundleVignetteCanvas({
  partCount,
  color,
  active,
  onContextLost,
}: {
  partCount: number;
  color: string;
  active: boolean;
  onContextLost?: () => void;
}) {
  const shades = useMemo(() => {
    const base = new THREE.Color(color);
    return Array.from({ length: partCount }, (_, i) => {
      const c = base.clone();
      const hsl = { h: 0, s: 0, l: 0 };
      c.getHSL(hsl);
      c.setHSL(
        hsl.h,
        hsl.s,
        THREE.MathUtils.clamp(hsl.l + (i - 1) * 0.14, 0.06, 0.92),
      );
      return `#${c.getHexString()}`;
    });
  }, [color, partCount]);

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      camera={{ fov: 38, near: 0.1, far: 20, position: [0.9, 0.55, 3.4] }}
      frameloop={active ? "always" : "never"}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", (e) => {
          e.preventDefault();
          onContextLost?.();
        });
      }}
    >
      <ambientLight intensity={1.1} color="#f2efe6" />
      <directionalLight position={[2, 3, 3]} intensity={0.7} />
      <Physics gravity={[0, -9.81, 0]} paused={!active}>
        <RigidBody type="fixed">
          <mesh position={[0, -0.55, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[3, 3]} />
            <meshBasicMaterial visible={false} />
          </mesh>
        </RigidBody>
        {Array.from({ length: partCount }).map((_, i) => (
          <RigidBody
            key={i}
            position={[0, 0.5 + i * 0.55, 0]}
            colliders="cuboid"
            restitution={0.05}
            friction={0.9}
            linearDamping={0.7}
            angularDamping={0.95}
          >
            <mesh>
              <boxGeometry args={[0.56, 0.22, 0.32]} />
              <meshPhysicalMaterial
                color={shades[i]}
                roughness={0.32}
                metalness={0.06}
              />
            </mesh>
          </RigidBody>
        ))}
      </Physics>
    </Canvas>
  );
}
