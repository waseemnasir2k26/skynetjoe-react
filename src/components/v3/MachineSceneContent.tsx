"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { QuadraticBezierLine, Html } from "@react-three/drei";
import * as THREE from "three";
import { MACHINE_NODES } from "./machineData";

/**
 * "THE MACHINE" pinned-beat scene — an automation chain (webhook -> AI agent
 * -> CRM -> calendar -> WhatsApp) that assembles node-by-node as the pinned
 * section scrubs, rust bezier links drawing between consecutive nodes, and a
 * data pulse traveling the completed chain once assembly finishes. Lives
 * inside the ssr:false <Canvas> mounted by MachineCanvas.tsx — never
 * imported by a server component directly.
 *
 * `progressRef` is 0..1, driven by the GSAP ScrollTrigger in MachineBeat.tsx
 * (NOT React state — this reads a ref every frame so scrubbing never
 * triggers a React re-render).
 */

// Hand-placed arc, receding slightly at the ends so the composition reads
// as a deliberate chain, not a straight row. Deterministic (not random).
const NODE_POSITIONS: [number, number, number][] = [
  [-3.6, 0.3, -1.6],
  [-1.8, 1.0, -0.6],
  [0.0, 0.2, -0.2],
  [1.8, 0.9, -0.6],
  [3.6, 0.3, -1.6],
];

// Camera keyframes the scroll progress (0..1) interpolates between —
// establishing wide shot -> dolly close along the chain as it assembles ->
// pull back to reveal the completed, pulsing chain. Same lerp approach as
// V2SceneContent's CameraRig (proven pattern, kept consistent).
const CAMERA_KEYFRAMES: { pos: THREE.Vector3; look: THREE.Vector3 }[] = [
  { pos: new THREE.Vector3(0, 2.2, 7.5), look: new THREE.Vector3(0, 0.4, -2) },
  {
    pos: new THREE.Vector3(-2.0, 1.4, 4.5),
    look: new THREE.Vector3(-2.4, 0.6, -1.4),
  },
  {
    pos: new THREE.Vector3(0.2, 1.0, 3.2),
    look: new THREE.Vector3(0, 0.5, -1.8),
  },
  {
    pos: new THREE.Vector3(2.4, 1.3, 2.6),
    look: new THREE.Vector3(2.2, 0.5, -1.4),
  },
  {
    pos: new THREE.Vector3(0, 2.6, 6.4),
    look: new THREE.Vector3(0, 0.4, -1.6),
  },
];

function hash(i: number): number {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function smoothstep(x: number): number {
  const t = THREE.MathUtils.clamp(x, 0, 1);
  return t * t * (3 - 2 * t);
}

// Node i "arrives" between [start, end] of the overall 0..1 scrub — five
// evenly-staggered windows that finish assembling by ~72% through the
// scrub, leaving the last ~28% for the completed chain + data pulse.
function nodeAssembly(i: number, t: number): number {
  const start = i * 0.14;
  const end = start + 0.16;
  return smoothstep((t - start) / (end - start));
}

function beatFor(t: number) {
  const segs = CAMERA_KEYFRAMES.length - 1;
  const scaled = THREE.MathUtils.clamp(t, 0, 1) * segs;
  const i = Math.min(Math.floor(scaled), segs - 1);
  const local = scaled - i;
  return { i, local };
}

const tmpPos = new THREE.Vector3();
const tmpLook = new THREE.Vector3();

function CameraRig({
  progressRef,
}: {
  progressRef: React.MutableRefObject<number>;
}) {
  const { camera } = useThree();
  useFrame(() => {
    const { i, local } = beatFor(progressRef.current);
    const a = CAMERA_KEYFRAMES[i];
    const b = CAMERA_KEYFRAMES[i + 1];
    tmpPos.lerpVectors(a.pos, b.pos, local);
    tmpLook.lerpVectors(a.look, b.look, local);
    camera.position.lerp(tmpPos, 0.09);
    camera.lookAt(tmpLook);
  });
  return null;
}

function Node({
  position,
  index,
  progressRef,
  labelRefs,
}: {
  position: [number, number, number];
  index: number;
  progressRef: React.MutableRefObject<number>;
  labelRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const box = index % 2 === 1;
  const seed = hash(index) * Math.PI * 2;

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const a = nodeAssembly(index, progressRef.current);
    // Scale/opacity in on arrival; gentle idle float once assembled.
    const scale = a;
    ref.current.scale.setScalar(scale);
    ref.current.position.y = position[1] + Math.sin(t * 0.4 + seed) * 0.1 * a;
    ref.current.rotation.x = t * 0.1 + seed;
    ref.current.rotation.y = t * 0.14 + seed;
    const mat = ref.current.material as THREE.MeshPhysicalMaterial;
    mat.opacity = a;
    const label = labelRefs.current[index];
    if (label) {
      label.style.opacity = String(Math.max(0, a - 0.25) / 0.75);
      label.style.transform = `translateY(${(1 - a) * 10}px)`;
    }
  });

  return (
    <mesh
      ref={ref}
      position={position}
      castShadow={false}
      receiveShadow={false}
    >
      {box ? (
        <boxGeometry args={[0.62, 0.62, 0.62]} />
      ) : (
        <icosahedronGeometry args={[0.42, 0]} />
      )}
      <meshPhysicalMaterial
        color="#f2efe6"
        roughness={0.22}
        metalness={0.1}
        clearcoat={0.8}
        clearcoatRoughness={0.2}
        emissive="#c66b3f"
        emissiveIntensity={0.06}
        transparent
        opacity={0}
      />
    </mesh>
  );
}

function Link({
  a,
  b,
  targetIndex,
  progressRef,
}: {
  a: [number, number, number];
  b: [number, number, number];
  targetIndex: number;
  progressRef: React.MutableRefObject<number>;
}) {
  const ref = useRef<THREE.Object3D>(null);
  const mid: [number, number, number] = [
    (a[0] + b[0]) / 2,
    (a[1] + b[1]) / 2 + 0.55,
    (a[2] + b[2]) / 2,
  ];

  useFrame(() => {
    const line = ref.current as unknown as {
      material?: THREE.Material & { opacity: number };
    } | null;
    if (!line?.material) return;
    const v = nodeAssembly(targetIndex, progressRef.current);
    line.material.opacity = v * 0.65;
  });

  return (
    <QuadraticBezierLine
      // @ts-expect-error -- drei forwards ref to the underlying Line2 object
      ref={ref}
      start={a}
      end={b}
      mid={mid}
      color="#c66b3f"
      lineWidth={1.6}
      transparent
      opacity={0}
    />
  );
}

function DataPulse({
  progressRef,
}: {
  progressRef: React.MutableRefObject<number>;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!ref.current) return;
    const t = THREE.MathUtils.clamp((progressRef.current - 0.78) / 0.2, 0, 1);
    if (t <= 0 || t >= 1) {
      ref.current.visible = false;
      return;
    }
    ref.current.visible = true;
    const segs = NODE_POSITIONS.length - 1;
    const scaled = t * segs;
    const i = Math.min(Math.floor(scaled), segs - 1);
    const local = scaled - i;
    const p1 = NODE_POSITIONS[i];
    const p2 = NODE_POSITIONS[i + 1];
    ref.current.position.set(
      THREE.MathUtils.lerp(p1[0], p2[0], local),
      THREE.MathUtils.lerp(p1[1], p2[1], local) + 0.55,
      THREE.MathUtils.lerp(p1[2], p2[2], local),
    );
  });

  return (
    <mesh ref={ref} visible={false}>
      <sphereGeometry args={[0.09, 16, 16]} />
      <meshBasicMaterial color="#c66b3f" />
    </mesh>
  );
}

// Background dust field — one instanced draw call, same technique as
// V2SceneContent.ParticleField.
function ParticleField() {
  const count = 90;
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: (hash(i * 4 + 1) - 0.5) * 9,
        y: (hash(i * 4 + 2) - 0.5) * 3.4,
        z: -hash(i * 4 + 3) * 3 - 0.4,
        s: hash(i * 4 + 4) * 0.4 + 0.6,
        speed: hash(i * 4 + 1.5) * 0.15 + 0.05,
      })),
    [],
  );

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    seeds.forEach((p, i) => {
      dummy.position.set(p.x, p.y + Math.sin(t * p.speed + i) * 0.15, p.z);
      dummy.scale.setScalar(0.018 * p.s);
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#c66b3f" transparent opacity={0.3} />
    </instancedMesh>
  );
}

export default function MachineSceneContent({
  progressRef,
}: {
  progressRef: React.MutableRefObject<number>;
}) {
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <>
      <color attach="background" args={["#f2efe6"]} />
      <ambientLight intensity={0.95} color="#f2efe6" />
      <directionalLight position={[4, 5, 6]} intensity={0.6} color="#ffffff" />
      <pointLight position={[-3, -2, -2]} intensity={0.5} color="#c66b3f" />

      <CameraRig progressRef={progressRef} />

      {NODE_POSITIONS.slice(0, -1).map((p, i) => (
        <Link
          key={i}
          a={p}
          b={NODE_POSITIONS[i + 1]}
          targetIndex={i + 1}
          progressRef={progressRef}
        />
      ))}

      {NODE_POSITIONS.map((p, i) => (
        <group key={i}>
          <Node
            position={p}
            index={i}
            progressRef={progressRef}
            labelRefs={labelRefs}
          />
          <Html
            position={[p[0], p[1] - 0.75, p[2]]}
            center
            occlude={false}
            zIndexRange={[5, 0]}
            style={{ pointerEvents: "none" }}
          >
            <div
              ref={(el) => {
                labelRefs.current[i] = el;
              }}
              style={{
                opacity: 0,
                transition: "none",
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                textAlign: "center",
                whiteSpace: "nowrap",
                background: "rgba(242,239,230,0.92)",
                border: "1px solid rgba(198,107,63,0.35)",
                borderRadius: 3,
                padding: "5px 9px",
                color: "var(--ink)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              <span style={{ color: "var(--terracotta-aa)" }}>
                {MACHINE_NODES[i].index}
              </span>{" "}
              {MACHINE_NODES[i].label}
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 9,
                  textTransform: "none",
                  letterSpacing: 0,
                  color: "var(--ink-2)",
                  marginTop: 2,
                }}
              >
                {MACHINE_NODES[i].sublabel}
              </div>
            </div>
          </Html>
        </group>
      ))}

      <DataPulse progressRef={progressRef} />
      <ParticleField />
    </>
  );
}
