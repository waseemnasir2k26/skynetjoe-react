"use client";

import { useRef } from "react";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import HeroObject from "./HeroObject";
import type { HeroObjectDef } from "./heroObjectsData";

// 2 small leftover pieces, tossable, tumble in over the final CTA band.
const CTA_PIECES: HeroObjectDef[] = [
  {
    id: "cta-chip-a",
    label: "",
    shape: "ball",
    args: [0.26],
    color: "#f2efe6",
    spawn: [-1.3, 2.6, 0],
    spawnRot: [0, 0, 0],
  },
  {
    id: "cta-chip-b",
    label: "",
    shape: "box",
    args: [0.4, 0.4, 0.4],
    color: "#c66b3f",
    accent: true,
    spawn: [1.1, 3.2, -0.3],
    spawnRot: [0.3, 0.2, 0.1],
  },
];

/**
 * Delight detail: a sensor collider spans the CTA button's footprint (the
 * physics world is scaled/positioned to sit exactly behind the real DOM
 * button, see FinalCTAWorkshop.tsx). Any tossed piece that overlaps it
 * fires `onGlow` — the parent adds a glow ring to the real button. Exiting
 * clears it. This is a genuine rapier collision event, not a CSS trick tied
 * to mouse position.
 */
export default function FinalCTAPhysicsScene({
  onGlow,
}: {
  onGlow: (v: boolean) => void;
}) {
  const overlapCount = useRef(0);

  function enter() {
    overlapCount.current += 1;
    onGlow(true);
  }
  function exit() {
    overlapCount.current = Math.max(0, overlapCount.current - 1);
    if (overlapCount.current === 0) onGlow(false);
  }

  return (
    <>
      <ambientLight intensity={1.1} color="#faf7f0" />
      <directionalLight position={[2, 4, 3]} intensity={0.5} />
      <Physics gravity={[0, -9.81, 0]}>
        <RigidBody type="fixed" restitution={0.2} friction={0.85}>
          <mesh position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[10, 6]} />
            <meshBasicMaterial visible={false} />
          </mesh>
        </RigidBody>
        {/* Side walls so tossed pieces stay in frame. */}
        <RigidBody type="fixed">
          <CuboidCollider args={[0.2, 2, 3]} position={[-2.6, 1, 0]} />
        </RigidBody>
        <RigidBody type="fixed">
          <CuboidCollider args={[0.2, 2, 3]} position={[2.6, 1, 0]} />
        </RigidBody>
        {/* Sensor over the button footprint. */}
        <CuboidCollider
          sensor
          args={[1.5, 0.55, 0.6]}
          position={[0, -0.05, 0]}
          onIntersectionEnter={enter}
          onIntersectionExit={exit}
        />
        {CTA_PIECES.map((def) => (
          <HeroObject key={def.id} def={def} />
        ))}
      </Physics>
    </>
  );
}
