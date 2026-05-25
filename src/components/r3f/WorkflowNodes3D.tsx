"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";

/**
 * Subtle ambient hero scene — minimal, light, doesn't dominate.
 *   - 400 sparse glowing particles, slow drift
 *   - Mouse parallax: camera tilts gently toward cursor
 *   - No central object, no drag, no overlay
 *
 * Designed to feel like depth/atmosphere, not a hero element.
 * Cost: ~120KB gzipped (three + r3f). Lazy-loaded + mobile-skipped.
 */

const PARTICLE_COUNT = 400;

function ParticleField() {
  const points = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);
    const palette = [
      new THREE.Color("#00D4FF"),
      new THREE.Color("#14B8A6"),
      new THREE.Color("#1E88E5"),
    ];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const r = 3 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.55;
      pos[i * 3 + 2] = r * Math.cos(phi);
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.elapsedTime * 0.025;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function MouseParallaxCamera({
  mouseX,
  mouseY,
}: {
  mouseX: { current: number };
  mouseY: { current: number };
}) {
  const { camera } = useThree();
  useFrame(() => {
    const tx = mouseX.current * 0.45;
    const ty = mouseY.current * 0.25;
    camera.position.x += (tx - camera.position.x) * 0.03;
    camera.position.y += (ty + 0.2 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function WorkflowNodes3D() {
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.current = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY.current = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <Canvas
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      dpr={[1, 1.25]}
      camera={{ position: [0, 0.2, 7], fov: 55 }}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
      frameloop="always"
    >
      <ambientLight intensity={0.4} />
      <fog attach="fog" args={["#061827", 5, 13]} />
      <MouseParallaxCamera mouseX={mouseX} mouseY={mouseY} />
      <ParticleField />
    </Canvas>
  );
}
