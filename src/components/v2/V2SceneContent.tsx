"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { QuadraticBezierLine } from "@react-three/drei";
import * as THREE from "three";

/**
 * V2 "machine room" scene content — floating glass/ceramic nodes wired
 * together by glowing rust splines, camera dollying through them as the
 * page scrolls. Lives inside the ssr:false <Canvas> mounted by
 * V2SceneCanvas.tsx. Never imported directly by a server component.
 */

// Node network — receding in -z so the camera can dolly "through" it.
// Position tuples are hand-placed (not random) so the composition reads
// deliberately instead of like scattered debris. Headline legibility over
// this cluster is NOT handled by dodging with node placement (that's
// fragile — breaks on resize/reflow) — it's handled by the gradient scrim
// in V2Hero.tsx, which is readable regardless of where the camera/nodes
// land for a given scroll beat.
const NODE_POSITIONS: [number, number, number][] = [
  [3.0, 1.9, -0.4],
  [4.0, 0.9, -1.6],
  [2.8, 2.6, -2.9],
  [4.6, 1.6, -3.8],
  [-1.9, 0.2, -5.2],
  [0.4, 1.2, -6.4],
  [2.0, -0.8, -7.6],
  [-1.2, -0.6, -8.8],
  [0.2, 0.8, -10.2],
];

// Sequential connections (i -> i+1) plus a couple of long "cross" links so
// the network reads as a mesh, not a single chain.
const LINKS: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 8],
  [0, 2],
  [3, 5],
];

// Camera keyframes the scroll progress (0..1) interpolates between. Each
// beat corresponds to a section of the page (see V2_BEATS in V2Hero.tsx).
const CAMERA_KEYFRAMES: { pos: THREE.Vector3; look: THREE.Vector3 }[] = [
  { pos: new THREE.Vector3(0, 0, 6), look: new THREE.Vector3(0, 0, 0) }, // hero
  {
    pos: new THREE.Vector3(2.2, 0.9, 2.4),
    look: new THREE.Vector3(3.4, 1.6, -2.6),
  }, // what-we-automate: inside the cluster
  {
    pos: new THREE.Vector3(-0.4, 0.4, -3.6),
    look: new THREE.Vector3(0.4, 0.2, -6.4),
  }, // proof band: continuing through
  {
    pos: new THREE.Vector3(0.2, 0.2, -6.8),
    look: new THREE.Vector3(0, 0.4, -9.5),
  }, // testimonials: deeper still
  {
    pos: new THREE.Vector3(0, 0.6, -9.4),
    look: new THREE.Vector3(0, 0.4, -10.2),
  }, // final CTA: arriving at the lattice
];

// Deterministic pseudo-random hash (classic GLSL-style sine hash) — used
// instead of Math.random() so per-node/particle "randomness" stays a pure
// function of its index. Math.random() during render is impure and trips
// the repo's react-hooks/purity lint rule; this hash gives the same visual
// variety without it.
function hash(i: number): number {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function beatFor(t: number) {
  const segs = CAMERA_KEYFRAMES.length - 1;
  const scaled = Math.min(Math.max(t, 0), 1) * segs;
  const i = Math.min(Math.floor(scaled), segs - 1);
  const local = scaled - i;
  return { i, local };
}

const tmpPos = new THREE.Vector3();
const tmpLook = new THREE.Vector3();
const tmpCamTarget = new THREE.Vector3();

function CameraRig({
  progressRef,
  mouseRef,
}: {
  progressRef: React.MutableRefObject<number>;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const { camera } = useThree();

  useFrame(() => {
    const { i, local } = beatFor(progressRef.current);
    const a = CAMERA_KEYFRAMES[i];
    const b = CAMERA_KEYFRAMES[i + 1];
    tmpPos.lerpVectors(a.pos, b.pos, local);
    tmpLook.lerpVectors(a.look, b.look, local);

    // Cursor parallax — strongest in the hero beat, fades out as the camera
    // dollies in so it never fights the scroll-driven motion deeper in.
    const parallaxStrength = THREE.MathUtils.clamp(
      1 - progressRef.current * 3,
      0,
      1,
    );
    const px = mouseRef.current.x * 0.35 * parallaxStrength;
    const py = mouseRef.current.y * 0.2 * parallaxStrength;

    tmpCamTarget.set(tmpPos.x + px, tmpPos.y + py, tmpPos.z);
    camera.position.lerp(tmpCamTarget, 0.08);
    camera.lookAt(tmpLook.x + px * 0.4, tmpLook.y + py * 0.4, tmpLook.z);
  });

  return null;
}

function Node({
  position,
  index,
}: {
  position: [number, number, number];
  index: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const glass = index % 2 === 0;
  // GPU cost: transmission (real-time refraction) is the priciest material
  // feature in this scene, so it's kept on only 2 of the 5 glass nodes
  // (the ones closest to camera in the hero/what-we-automate beats); the
  // rest use an opaque clearcoat ceramic look that reads as "glass-adjacent"
  // without paying for transmission.
  const transmissive = glass && (index === 0 || index === 4);
  const seed = hash(index) * Math.PI * 2;

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    // Gentle idle float + slow rotation — cheap, no physics.
    ref.current.position.y = position[1] + Math.sin(t * 0.4 + seed) * 0.14;
    ref.current.rotation.x = t * 0.08 + seed;
    ref.current.rotation.y = t * 0.11 + seed;
  });

  return (
    <mesh
      ref={ref}
      position={position}
      castShadow={false}
      receiveShadow={false}
    >
      {glass ? (
        <sphereGeometry args={[0.34, 32, 32]} />
      ) : (
        <boxGeometry args={[0.5, 0.5, 0.5]} />
      )}
      {transmissive ? (
        <meshPhysicalMaterial
          color="#f2efe6"
          transmission={0.92}
          thickness={0.6}
          roughness={0.08}
          ior={1.4}
          clearcoat={1}
          clearcoatRoughness={0.1}
          attenuationColor="#c66b3f"
          attenuationDistance={1.2}
        />
      ) : glass ? (
        <meshPhysicalMaterial
          color="#f2efe6"
          roughness={0.18}
          ior={1.4}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      ) : (
        <meshPhysicalMaterial
          color="#e8ded0"
          roughness={0.28}
          metalness={0.15}
          clearcoat={0.6}
          clearcoatRoughness={0.25}
          emissive="#c66b3f"
          emissiveIntensity={0.04}
        />
      )}
    </mesh>
  );
}

function Links() {
  return (
    <>
      {LINKS.map(([a, b], i) => {
        const start = NODE_POSITIONS[a];
        const end = NODE_POSITIONS[b];
        const mid: [number, number, number] = [
          (start[0] + end[0]) / 2 + (i % 2 === 0 ? 0.5 : -0.5),
          (start[1] + end[1]) / 2 + 0.5,
          (start[2] + end[2]) / 2,
        ];
        return (
          <QuadraticBezierLine
            key={`${a}-${b}`}
            start={start}
            end={end}
            mid={mid}
            color="#c66b3f"
            lineWidth={1.4}
            transparent
            opacity={0.55}
          />
        );
      })}
    </>
  );
}

// Background dust field — the one genuinely instanced mesh in the scene
// (perf budget: instancing keeps ~140 particles to a single draw call).
function ParticleField() {
  const count = 140;
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: (hash(i * 4 + 1) - 0.5) * 8,
        y: (hash(i * 4 + 2) - 0.5) * 5,
        z: -hash(i * 4 + 3) * 11 + 1,
        s: hash(i * 4 + 4) * 0.4 + 0.6,
        speed: hash(i * 4 + 1.5) * 0.15 + 0.05,
      })),
    [],
  );

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    seeds.forEach((p, i) => {
      dummy.position.set(p.x, p.y + Math.sin(t * p.speed + i) * 0.2, p.z);
      dummy.scale.setScalar(0.02 * p.s);
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#c66b3f" transparent opacity={0.35} />
    </instancedMesh>
  );
}

export default function V2SceneContent({
  progressRef,
  mouseRef,
}: {
  progressRef: React.MutableRefObject<number>;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}) {
  return (
    <>
      <color attach="background" args={["#f2efe6"]} />
      <ambientLight intensity={0.9} color="#f2efe6" />
      <directionalLight position={[4, 5, 6]} intensity={0.6} color="#ffffff" />
      <pointLight position={[-3, -2, -4]} intensity={0.5} color="#c66b3f" />

      <CameraRig progressRef={progressRef} mouseRef={mouseRef} />
      <Links />
      {NODE_POSITIONS.map((p, i) => (
        <Node key={i} position={p} index={i} />
      ))}
      <ParticleField />
    </>
  );
}
