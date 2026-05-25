"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useEffect, useState } from "react";
import * as THREE from "three";

/**
 * Cinematic mouse-interactive nebula scene:
 *   - Central glowing torus-knot (signature shape, slow spin)
 *   - ~900 nebula particles drifting in 3D space (cyan/teal/white)
 *   - Mouse parallax: camera tilts toward cursor (smoothed)
 *   - Mouse drag on the hero: spins the central knot
 *   - Additive blending + soft pulse for a "lovely" glow feel
 *
 * Cost: ~120KB gzipped (three + r3f). No drei, no postprocessing.
 * Lazy-loaded + mobile-skipped + reduced-motion-skipped at the wrapper.
 */

const PARTICLE_COUNT = 900;

function ParticleField() {
  const points = useRef<THREE.Points>(null);

  const [positions, sizes, colors] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const siz = new Float32Array(PARTICLE_COUNT);
    const col = new Float32Array(PARTICLE_COUNT * 3);
    const palette = [
      new THREE.Color("#00D4FF"),
      new THREE.Color("#14B8A6"),
      new THREE.Color("#1E88E5"),
      new THREE.Color("#FFFFFF"),
    ];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Spherical-ish cloud with bias toward outer shell
      const r = 2.6 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.65;
      pos[i * 3 + 2] = r * Math.cos(phi);
      siz[i] = 0.015 + Math.random() * 0.045;
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, siz, col];
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    const t = state.clock.elapsedTime;
    points.current.rotation.y = t * 0.04;
    points.current.rotation.x = Math.sin(t * 0.08) * 0.1;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function CentralKnot({
  dragX,
  dragY,
}: {
  dragX: { current: number };
  dragY: { current: number };
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const glow = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (mesh.current) {
      mesh.current.rotation.x = t * 0.18 + dragY.current * 1.5;
      mesh.current.rotation.y = t * 0.22 + dragX.current * 1.5;
      const pulse = 1 + Math.sin(t * 1.2) * 0.04;
      mesh.current.scale.set(pulse, pulse, pulse);
    }
    if (glow.current) {
      glow.current.rotation.x = -t * 0.06;
      glow.current.rotation.y = -t * 0.09;
    }
  });

  return (
    <group>
      {/* Outer translucent halo */}
      <mesh ref={glow}>
        <icosahedronGeometry args={[2.4, 1]} />
        <meshBasicMaterial
          color="#00D4FF"
          transparent
          opacity={0.06}
          wireframe
        />
      </mesh>

      {/* Central glowing knot */}
      <mesh ref={mesh}>
        <torusKnotGeometry args={[1.05, 0.32, 220, 32, 2, 3]} />
        <meshStandardMaterial
          color="#1E88E5"
          emissive="#00D4FF"
          emissiveIntensity={1.6}
          metalness={0.85}
          roughness={0.22}
        />
      </mesh>
    </group>
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
    // Smooth lerp toward target
    const tx = mouseX.current * 0.9;
    const ty = mouseY.current * 0.5;
    camera.position.x += (tx - camera.position.x) * 0.04;
    camera.position.y += (ty + 0.3 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function WorkflowNodes3D() {
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const dragX = useRef(0);
  const dragY = useRef(0);
  const [dragging, setDragging] = useState(false);
  const lastPointer = useRef<{ x: number; y: number } | null>(null);

  // Track mouse globally — parent has pointer-events:none so we listen on window
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -((e.clientY / window.innerHeight) * 2 - 1);
      mouseX.current = nx;
      mouseY.current = ny;
      if (dragging && lastPointer.current) {
        dragX.current += (nx - lastPointer.current.x) * 1.5;
        dragY.current += (ny - lastPointer.current.y) * 1.5;
      }
      lastPointer.current = { x: nx, y: ny };
    };
    const onDown = (e: MouseEvent) => {
      // Only activate drag in the top hero band (top 90vh) so footer/nav not weird
      if (e.clientY < window.innerHeight * 0.9) {
        setDragging(true);
        lastPointer.current = {
          x: (e.clientX / window.innerWidth) * 2 - 1,
          y: -((e.clientY / window.innerHeight) * 2 - 1),
        };
      }
    };
    const onUp = () => setDragging(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [dragging]);

  return (
    <Canvas
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.3, 7], fov: 55 }}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
      frameloop="always"
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[-6, 3, 4]} color="#1E88E5" intensity={1.6} />
      <pointLight position={[6, -2, 4]} color="#14B8A6" intensity={1.3} />
      <pointLight position={[0, 0, 6]} color="#00D4FF" intensity={0.7} />
      <fog attach="fog" args={["#061827", 6, 14]} />

      <MouseParallaxCamera mouseX={mouseX} mouseY={mouseY} />
      <CentralKnot dragX={dragX} dragY={dragY} />
      <ParticleField />
    </Canvas>
  );
}
