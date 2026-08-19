"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { buildRobotEdges, ROBOT_CALLOUTS } from "./robotGeometry";

/**
 * The wireframe automation robot itself — a single THREE.LineSegments draw
 * call whose `drawRange` grows from 0 to the full vertex count as
 * `progressRef` (0..1, driven by BlueprintHero's one-shot GSAP tween, NOT
 * scroll-scrubbed) advances. That single-mesh + drawRange approach is
 * deliberately chosen over one <Line> per edge (which is what the drei
 * dashOffset technique would cost): identical "line-by-line" visual result,
 * one draw call instead of ~20, no LineMaterial resolution/dash-scale
 * bookkeeping.
 */
export default function RobotSceneContent({
  progressRef,
}: {
  progressRef: React.MutableRefObject<number>;
}) {
  const { positions, totalVertices } = useMemo(() => buildRobotEdges(), []);
  const lineRef = useRef<THREE.LineSegments>(null);
  const calloutRefs = useRef<(HTMLDivElement | null)[]>([]);
  const groupRef = useRef<THREE.Group>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setDrawRange(0, 0);
    return geo;
  }, [positions]);

  useFrame(({ clock }) => {
    const p = THREE.MathUtils.clamp(progressRef.current, 0, 1);
    const count = Math.floor(p * totalVertices);
    // Even count required (pairs of vertices per LineSegments segment).
    geometry.setDrawRange(0, count - (count % 2));

    ROBOT_CALLOUTS.forEach((c, i) => {
      const el = calloutRefs.current[i];
      if (!el) return;
      const local = THREE.MathUtils.clamp((p - c.revealAt) / 0.14, 0, 1);
      el.style.opacity = String(local);
      el.style.transform = `translateY(${(1 - local) * 8}px)`;
    });

    if (groupRef.current) {
      const t = clock.getElapsedTime();
      // Gentle idle drift once fully drawn — reads as a live technical
      // rig, not a frozen render.
      groupRef.current.rotation.y = Math.sin(t * 0.18) * 0.09 * p;
    }
  });

  return (
    <group ref={groupRef}>
      <lineSegments ref={lineRef} geometry={geometry}>
        <lineBasicMaterial color="#1a1a1a" transparent opacity={0.88} />
      </lineSegments>

      {ROBOT_CALLOUTS.map((c, i) => (
        <Html
          key={c.id}
          position={c.anchor}
          center
          occlude={false}
          zIndexRange={[5, 0]}
          style={{ pointerEvents: "none" }}
        >
          <div
            ref={(el) => {
              calloutRefs.current[i] = el;
            }}
            style={{
              opacity: 0,
              transition: "none",
              fontFamily: "var(--font-mono)",
              fontSize: 10.5,
              whiteSpace: "nowrap",
              background: "rgba(242,239,230,0.94)",
              border: "1px solid rgba(198,107,63,0.5)",
              borderRadius: 2,
              padding: "4px 8px",
              color: "var(--terracotta-aa)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            — {c.label}
          </div>
        </Html>
      ))}
    </group>
  );
}
