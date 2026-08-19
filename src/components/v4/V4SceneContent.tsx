"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  CAMERA_POSITIONS,
  CAMERA_TARGETS,
  PROOF_STATS,
  STATION_Z,
  STATIONS,
} from "./v4Data";

/**
 * "THE LINE" — the whole-page 3D diorama. One CatmullRomCurve3 camera path
 * dollies through an automation-factory line (entrance gate -> 3 machine
 * stations -> data-readout wall -> lit CTA booth) as `progressRef` (0..1,
 * driven by a page-length GSAP ScrollTrigger in V4Journey.tsx) advances.
 * `progressRef` is a ref, not React state, so scrubbing never triggers a
 * React re-render — every visual change happens inside useFrame.
 *
 * Perf budget: every repeated element (dust, wall grid, station orbit
 * pings) is one InstancedMesh; there are ~9 individual meshes total for the
 * gate/stations/booth geometry. Total draw calls stay comfortably under
 * the 150 budget.
 */

const CREAM = "#f2efe6";
const CREAM_3 = "#faf7f0";
const INK = "#1a1a1a";
const RUST = "#c66b3f";
const RUST_AA = "#a8451f";

function smoothstep(x: number): number {
  const t = THREE.MathUtils.clamp(x, 0, 1);
  return t * t * (3 - 2 * t);
}

function hash(i: number): number {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

// Local progress (0..1) within a named station's scroll band — drives
// per-station reveal/idle animation without needing React state.
function bandProgress(id: (typeof STATIONS)[number]["id"], t: number) {
  const band = STATIONS.find((s) => s.id === id)!;
  return smoothstep((t - band.start) / (band.end - band.start));
}

const cameraCurve = new THREE.CatmullRomCurve3(
  CAMERA_POSITIONS,
  false,
  "catmullrom",
  0.35,
);
const lookCurve = new THREE.CatmullRomCurve3(
  CAMERA_TARGETS,
  false,
  "catmullrom",
  0.35,
);

const tmpPos = new THREE.Vector3();
const tmpLook = new THREE.Vector3();

// DataWall's useFrame previously allocated a fresh THREE.Color every
// column, every frame (cols * rows samples over the whole scroll journey)
// — hoisted to module scope since both are fixed palette constants, not
// per-instance state.
const DATA_WALL_LIT_COLOR = new THREE.Color(RUST);
const DATA_WALL_DIM_COLOR = new THREE.Color(CREAM_3);

function CameraRig({
  progressRef,
}: {
  progressRef: React.MutableRefObject<number>;
}) {
  const currentLook = useRef(new THREE.Vector3().copy(CAMERA_TARGETS[0]));
  useFrame(({ camera }) => {
    const t = THREE.MathUtils.clamp(progressRef.current, 0, 1);
    cameraCurve.getPointAt(t, tmpPos);
    lookCurve.getPointAt(t, tmpLook);
    // Smooth-damp toward the curve sample rather than snapping straight to
    // it — mitigates scroll-event/rAF desync (notably iOS Safari) so the
    // dolly reads as a fluid camera move even if scroll progress arrives
    // in bursts rather than a perfectly even stream.
    camera.position.lerp(tmpPos, 0.09);
    currentLook.current.lerp(tmpLook, 0.09);
    camera.lookAt(currentLook.current);
  });
  return null;
}

// Long cream ground strip running the length of the line + a rust
// centerline rail — one plane, one thin box, the visual "factory floor".
function Ground() {
  return (
    <group>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.02, -2]}
        receiveShadow={false}
      >
        <planeGeometry args={[16, 26]} />
        <meshStandardMaterial color={CREAM} roughness={0.95} metalness={0} />
      </mesh>
      <mesh position={[0, 0.01, -2]}>
        <boxGeometry args={[0.5, 0.02, 24]} />
        <meshStandardMaterial
          color={RUST}
          roughness={0.5}
          metalness={0.1}
          emissive={RUST}
          emissiveIntensity={0.05}
        />
      </mesh>
    </group>
  );
}

// Entrance gate — two ink pillars + a rust lintel the camera dollies
// through at the top of the journey. Pillars are pushed well outside the
// camera curve's full x-range (max |x| ~3.4 at the AI Visibility station,
// plus Catmull-Rom overshoot margin) so the dolly never clips through
// solid geometry mid-scrub — a first pass at x=+-2.1 put the left pillar
// directly in the camera's path approaching Station A and filled the
// frame with a black near-clip wall.
function EntranceGate() {
  const z = STATION_Z.entrance;
  return (
    <group position={[0, 0, z]}>
      {[-4.8, 4.8].map((x) => (
        <mesh key={x} position={[x, 1.4, 0]}>
          <boxGeometry args={[0.4, 2.8, 0.4]} />
          <meshPhysicalMaterial color={INK} roughness={0.4} clearcoat={0.4} />
        </mesh>
      ))}
      <mesh position={[0, 2.9, 0]}>
        <boxGeometry args={[10.2, 0.32, 0.5]} />
        <meshPhysicalMaterial
          color={RUST}
          roughness={0.3}
          metalness={0.15}
          emissive={RUST}
          emissiveIntensity={0.08}
        />
      </mesh>
    </group>
  );
}

// Shared "machine" body used by all three bundle stations — a ceramic
// box body with a spinning core (icosahedron or torus) so each station
// reads as a distinct working machine, not a repeated prop.
function MachineStation({
  position,
  bodySize,
  core,
  progressRef,
  bandId,
  emphasis = 1,
}: {
  position: [number, number, number];
  bodySize: [number, number, number];
  core: "icosahedron" | "torus" | "tower";
  progressRef: React.MutableRefObject<number>;
  bandId: (typeof STATIONS)[number]["id"];
  emphasis?: number;
}) {
  const bodyRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const a = bandProgress(bandId, progressRef.current);
    const t = clock.getElapsedTime();
    if (bodyRef.current) {
      const s = 0.35 + a * 0.65;
      bodyRef.current.scale.setScalar(s);
    }
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.35;
      coreRef.current.rotation.x = t * 0.18;
      const mat = coreRef.current.material as THREE.MeshPhysicalMaterial;
      mat.emissiveIntensity = 0.15 + a * 0.35 * emphasis;
    }
  });

  return (
    <group position={position}>
      <mesh ref={bodyRef} position={[0, bodySize[1] / 2, 0]}>
        <boxGeometry args={bodySize} />
        <meshPhysicalMaterial
          color={CREAM_3}
          roughness={0.25}
          clearcoat={0.7}
          clearcoatRoughness={0.25}
        />
      </mesh>
      <mesh ref={coreRef} position={[0, bodySize[1] + 0.35, 0]}>
        {core === "icosahedron" && <icosahedronGeometry args={[0.42, 0]} />}
        {core === "torus" && <torusGeometry args={[0.5, 0.14, 16, 32]} />}
        {core === "tower" && <coneGeometry args={[0.35, 0.9, 16]} />}
        <meshPhysicalMaterial
          color={RUST}
          roughness={0.2}
          metalness={0.2}
          emissive={RUST}
          emissiveIntensity={0.15}
        />
      </mesh>
    </group>
  );
}

// Small instanced-sphere "signal" orbit around a station core — one draw
// call, reused for the AI Visibility station's pings.
function OrbitPings({
  center,
  count = 10,
  radius = 1.1,
}: {
  center: [number, number, number];
  count?: number;
  radius?: number;
}) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2 + t * 0.25;
      dummy.position.set(
        center[0] + Math.cos(a) * radius,
        center[1] + Math.sin(t * 0.5 + i) * 0.15,
        center[2] + Math.sin(a) * radius,
      );
      dummy.scale.setScalar(0.05);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color={RUST_AA} transparent opacity={0.85} />
    </instancedMesh>
  );
}

// Data-readout wall — a grid of instanced ceramic blocks whose column
// heights read off the real proof stats (180+ / 40+ / 9 / 2019), rising
// as the camera arrives at the wall's scroll band. Visual only — the real
// numbers are the DOM CountUp overlay in V4Overlay.tsx; this is decor that
// echoes them, never a second, drifting source of truth.
function DataWall({
  progressRef,
}: {
  progressRef: React.MutableRefObject<number>;
}) {
  const cols = PROOF_STATS.length;
  const rows = 5;
  const count = cols * rows;
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const maxVal = Math.max(...PROOF_STATS.map((s) => s.value));
  const colFill = PROOF_STATS.map((s) =>
    Math.max(0.14, Math.log10(s.value + 1) / Math.log10(maxVal + 1)),
  );

  useFrame(() => {
    if (!ref.current) return;
    const a = bandProgress("data-wall", progressRef.current);
    let idx = 0;
    for (let c = 0; c < cols; c++) {
      const filled = colFill[c] * rows * a;
      for (let r = 0; r < rows; r++) {
        const lit = r < filled ? 1 : 0.12;
        const x = (c - (cols - 1) / 2) * 0.85;
        const y = 0.28 + r * 0.5 * Math.max(0.05, a);
        dummy.position.set(x, y, 0);
        dummy.scale.set(0.55, 0.42 * Math.max(0.05, a), 0.28);
        dummy.updateMatrix();
        ref.current.setMatrixAt(idx, dummy.matrix);
        ref.current.setColorAt(
          idx,
          lit === 1 ? DATA_WALL_LIT_COLOR : DATA_WALL_DIM_COLOR,
        );
        idx++;
      }
    }
    ref.current.instanceMatrix.needsUpdate = true;
    if (ref.current.instanceColor) ref.current.instanceColor.needsUpdate = true;
  });

  return (
    <group position={[0, 0, STATION_Z.dataWall]}>
      <instancedMesh ref={ref} args={[undefined, undefined, count]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial
          roughness={0.35}
          metalness={0.1}
          emissiveIntensity={0.1}
        />
      </instancedMesh>
    </group>
  );
}

// Lit CTA booth — the finale. An ink archway with a warm rust glow that
// intensifies as the camera settles into the last scroll band. No
// postprocessing bloom pass (none of the three deps ship one and no new
// dep is in scope) — the "glow" is an emissive core plus a soft additive
// point light, which reads as a lit booth without the extra draw/composite
// cost of a full bloom pipeline.
function CtaBooth({
  progressRef,
}: {
  progressRef: React.MutableRefObject<number>;
}) {
  const glowRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const z = STATION_Z.ctaBooth;

  useFrame(({ clock }) => {
    const a = bandProgress("cta-booth", progressRef.current);
    const pulse = 0.85 + Math.sin(clock.getElapsedTime() * 1.4) * 0.15;
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.25 + a * 0.55 * pulse;
    }
    if (lightRef.current) {
      lightRef.current.intensity = 0.4 + a * 2.6 * pulse;
    }
  });

  return (
    <group position={[0, 0, z]}>
      {[-1.9, 1.9].map((x) => (
        <mesh key={x} position={[x, 1.2, 0]}>
          <boxGeometry args={[0.34, 2.4, 0.34]} />
          <meshPhysicalMaterial color={INK} roughness={0.35} clearcoat={0.5} />
        </mesh>
      ))}
      <mesh position={[0, 2.5, 0]}>
        <boxGeometry args={[4.2, 0.28, 0.4]} />
        <meshPhysicalMaterial color={INK} roughness={0.35} />
      </mesh>
      <mesh ref={glowRef} position={[0, 1.1, -0.3]}>
        <planeGeometry args={[3.2, 2.2]} />
        <meshBasicMaterial color={RUST} transparent opacity={0.3} />
      </mesh>
      <pointLight
        ref={lightRef}
        position={[0, 1.4, 0.4]}
        color={RUST}
        intensity={0.4}
        distance={6}
      />
    </group>
  );
}

// Ambient dust field along the whole line — one instanced draw call.
function DustField() {
  const count = 110;
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: (hash(i * 4 + 1) - 0.5) * 9,
        y: hash(i * 4 + 2) * 2.6 + 0.1,
        z: hash(i * 4 + 3) * -24 + 6,
        s: hash(i * 4 + 4) * 0.4 + 0.6,
        speed: hash(i * 4 + 1.5) * 0.15 + 0.05,
      })),
    [],
  );

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    seeds.forEach((p, i) => {
      dummy.position.set(p.x, p.y + Math.sin(t * p.speed + i) * 0.12, p.z);
      dummy.scale.setScalar(0.02 * p.s);
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color={RUST} transparent opacity={0.22} />
    </instancedMesh>
  );
}

export default function V4SceneContent({
  progressRef,
}: {
  progressRef: React.MutableRefObject<number>;
}) {
  return (
    <>
      <color attach="background" args={[CREAM]} />
      <fog attach="fog" args={[CREAM, 10, 22]} />
      <ambientLight intensity={0.9} color={CREAM} />
      <directionalLight position={[4, 6, 5]} intensity={0.55} color="#ffffff" />
      <pointLight position={[-3, 2, -6]} intensity={0.35} color={RUST} />

      <CameraRig progressRef={progressRef} />

      <Ground />
      <EntranceGate />

      <MachineStation
        position={[-2.4, 0, STATION_Z.stationA]}
        bodySize={[1.6, 1.1, 1.4]}
        core="icosahedron"
        progressRef={progressRef}
        bandId="station-a"
      />

      {/* Flagship — larger body, brighter emphasis, dead-center on the line. */}
      <MachineStation
        position={[0, 0, STATION_Z.stationB]}
        bodySize={[2.1, 1.5, 1.8]}
        core="torus"
        progressRef={progressRef}
        bandId="station-b"
        emphasis={1.6}
      />

      <MachineStation
        position={[2.6, 0, STATION_Z.stationC]}
        bodySize={[1.5, 1.9, 1.4]}
        core="tower"
        progressRef={progressRef}
        bandId="station-c"
      />
      <OrbitPings center={[2.6, 2.6, STATION_Z.stationC]} />

      <DataWall progressRef={progressRef} />
      <CtaBooth progressRef={progressRef} />
      <DustField />
    </>
  );
}
