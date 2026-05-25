"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * 16 floating workflow nodes (one per SkynetLabs service category x 4) orbiting
 * in a soft cyan/teal cinematic network. Pure GPU, no interactivity, no controls.
 *
 * Cost: ~120KB gzipped (three + r3f). No drei to keep the bundle tight.
 * Lazy-loaded + mobile-skipped at the parent wrapper level.
 */

const NODE_COUNT = 16;

const NODES = Array.from({ length: NODE_COUNT }, (_, i) => {
  // Distribute on a torus-ish field
  const angle = (i / NODE_COUNT) * Math.PI * 2;
  const r = 3.2 + (i % 3) * 0.35;
  const y = ((i % 5) - 2) * 0.6;
  const colorHue = i % 2 === 0 ? "#1E88E5" : "#14B8A6";
  return {
    position: [Math.cos(angle) * r, y, Math.sin(angle) * r] as [number, number, number],
    color: colorHue,
    scale: 0.13 + ((i * 37) % 11) * 0.012,
    phaseOffset: (i * 1.31) % (Math.PI * 2),
  };
});

function NodesGroup() {
  const group = useRef<THREE.Group>(null);
  const meshes = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.04;
      group.current.rotation.x = Math.sin(t * 0.12) * 0.07;
    }
    // Gentle per-node bob
    for (let i = 0; i < meshes.current.length; i++) {
      const m = meshes.current[i];
      if (!m) continue;
      const base = NODES[i].position[1];
      m.position.y = base + Math.sin(t * 0.6 + NODES[i].phaseOffset) * 0.18;
    }
  });

  // Connection line pairs — sparse so it reads as a network not a mess
  const linePositions = useMemo(() => {
    const segs: number[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const j = (i + 1) % NODE_COUNT;
      const k = (i + 5) % NODE_COUNT;
      segs.push(...NODES[i].position, ...NODES[j].position);
      segs.push(...NODES[i].position, ...NODES[k].position);
    }
    return new Float32Array(segs);
  }, []);

  return (
    <group ref={group}>
      {NODES.map((n, i) => (
        <mesh
          key={i}
          ref={(el) => {
            meshes.current[i] = el;
          }}
          position={n.position}
          scale={n.scale}
        >
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color={n.color}
            emissive={n.color}
            emissiveIntensity={1.4}
            roughness={0.25}
            metalness={0.5}
          />
        </mesh>
      ))}

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#00D4FF"
          transparent
          opacity={0.18}
          linewidth={1}
        />
      </lineSegments>
    </group>
  );
}

export default function WorkflowNodes3D() {
  return (
    <Canvas
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.4, 6.5], fov: 55 }}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
      frameloop="always"
    >
      <ambientLight intensity={0.35} />
      <pointLight position={[-6, 3, 4]} color="#1E88E5" intensity={1.4} />
      <pointLight position={[6, -2, 4]} color="#14B8A6" intensity={1.1} />
      <pointLight position={[0, 0, 6]} color="#00D4FF" intensity={0.6} />
      <NodesGroup />
      <fog attach="fog" args={["#061827", 6, 12]} />
    </Canvas>
  );
}
