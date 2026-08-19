"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";
import {
  GLASS_MATERIAL_PROPS,
  GLASS_OBJECTS,
  beatLerp,
  type GlassObjectConfig,
} from "./glassData";

/**
 * Self-contained synthetic "studio" reflection — three emissive cream/rust
 * panels arranged around the origin, baked ONCE (frames={1}) into a small
 * cube render target via drei's <Environment> portal mode. Deliberately NOT
 * using `<Environment preset="studio">` — every named preset resolves to a
 * remote .hdr fetched from the pmndrs/assets CDN at runtime, which would
 * make this page depend on a third-party asset host at load time. This
 * portal scene is 100% local geometry, so the reflections/refraction the
 * glass objects show are fully self-contained — no network fetch, no CSP
 * exception needed.
 */
function SyntheticStudioEnvironment() {
  return (
    <Environment resolution={64} frames={1}>
      <color attach="background" args={["#f2efe6"]} />
      <mesh position={[0, 0, -6]} scale={10}>
        <planeGeometry />
        <meshBasicMaterial color="#faf7f0" />
      </mesh>
      <mesh position={[-5, 2, 2]} rotation={[0, Math.PI / 3, 0]} scale={6}>
        <planeGeometry />
        <meshBasicMaterial color="#c66b3f" toneMapped={false} />
      </mesh>
      <mesh position={[5, -1, 3]} rotation={[0, -Math.PI / 3, 0]} scale={6}>
        <planeGeometry />
        <meshBasicMaterial color="#f2efe6" toneMapped={false} />
      </mesh>
      <mesh position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]} scale={8}>
        <planeGeometry />
        <meshBasicMaterial color="#ffffff" toneMapped={false} />
      </mesh>
    </Environment>
  );
}

function GlassGeometryFor({
  geometry,
}: {
  geometry: GlassObjectConfig["geometry"];
}) {
  if (geometry === "knot")
    return <torusKnotGeometry args={[0.62, 0.2, 128, 24]} />;
  if (geometry === "blob") return <icosahedronGeometry args={[0.7, 4]} />;
  // "prism" — a triangular-cross-section cylinder reads as an abstract glass prism.
  return <cylinderGeometry args={[0.75, 0.75, 1.15, 3]} />;
}

function GlassObject({
  config,
  progressRef,
  pointerRef,
}: {
  config: GlassObjectConfig;
  progressRef: React.MutableRefObject<number>;
  pointerRef: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const home = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }, delta) => {
    const group = groupRef.current;
    const mesh = meshRef.current;
    if (!group || !mesh) return;
    const t = clock.getElapsedTime();

    beatLerp(config.waypoints, progressRef.current, home);
    const bob =
      Math.sin(t * config.bobSpeed + config.scale * 10) * config.bobAmount;

    // Whole-group cursor drift is applied once in GlassSceneContent (shared
    // lerp); here we only add the per-object home position + idle bob so
    // each object keeps its own depth-appropriate motion.
    group.position.set(
      home.x + pointerRef.current.x * 0.4,
      home.y + bob + pointerRef.current.y * 0.25,
      home.z,
    );

    // Scaled by rAF `delta` (not a hardcoded ~1/60 assumption) so rotation
    // speed stays consistent across refresh rates instead of spinning
    // faster on high-Hz displays / slower on throttled tabs.
    mesh.rotation.x += config.rotSpeed[0] * delta;
    mesh.rotation.y += config.rotSpeed[1] * delta;
  });

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        scale={config.scale}
        castShadow={false}
        receiveShadow={false}
      >
        <GlassGeometryFor geometry={config.geometry} />
        <MeshTransmissionMaterial
          {...GLASS_MATERIAL_PROPS}
          color={config.tint}
        />
      </mesh>
    </group>
  );
}

/**
 * Tracks normalized pointer position (-1..1) and eases a shared drift vector
 * toward it every frame — a single lerp shared by all 3 objects (cheap: one
 * ref write per frame, not per-object event listeners).
 */
function usePointerDrift() {
  const pointerRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  useFrame(({ pointer }) => {
    targetRef.current.x = pointer.x;
    targetRef.current.y = pointer.y;
    pointerRef.current.x += (targetRef.current.x - pointerRef.current.x) * 0.04;
    pointerRef.current.y += (targetRef.current.y - pointerRef.current.y) * 0.04;
  });

  return pointerRef;
}

export default function GlassSceneContent({
  progressRef,
}: {
  progressRef: React.MutableRefObject<number>;
}) {
  const pointerRef = usePointerDrift();

  return (
    <>
      <SyntheticStudioEnvironment />
      <ambientLight intensity={0.9} color="#faf7f0" />
      <directionalLight position={[4, 5, 6]} intensity={0.7} color="#ffffff" />
      <pointLight position={[-3, -2, 2]} intensity={0.4} color="#c66b3f" />

      {GLASS_OBJECTS.map((cfg) => (
        <GlassObject
          key={cfg.id}
          config={cfg}
          progressRef={progressRef}
          pointerRef={pointerRef}
        />
      ))}
    </>
  );
}
