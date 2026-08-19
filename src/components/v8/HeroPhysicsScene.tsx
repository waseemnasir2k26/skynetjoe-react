"use client";

import { Physics, RigidBody } from "@react-three/rapier";
import { HERO_KEEPOUT_X, HERO_OBJECTS } from "./heroObjectsData";
import HeroObject from "./HeroObject";

/**
 * Physics world for the hero pile: floor + 3 invisible walls (right, back,
 * front) keep the tumble contained inside frame, and a tall invisible
 * keep-out wall at x = -0.35 blocks anything from ever settling under the
 * SSR H1/sub/CTA copy column (which occupies the left ~45% of the hero on
 * desktop — see HeroWorkshop.tsx layout). `paused` is driven by the parent's
 * IntersectionObserver (section off-screen) + document.visibilitychange
 * (tab hidden) so this never spends CPU/GPU work the user can't see.
 */
export default function HeroPhysicsScene({ paused }: { paused: boolean }) {
  return (
    <>
      <color attach="background" args={["#00000000"]} />
      <ambientLight intensity={1.05} color="#f2efe6" />
      <directionalLight position={[3, 6, 4]} intensity={0.7} color="#ffffff" />
      <pointLight position={[2, -1, 2]} intensity={0.4} color="#c66b3f" />

      <Physics gravity={[0, -9.81, 0]} paused={paused}>
        {/* Floor */}
        <RigidBody type="fixed" restitution={0.15} friction={0.9}>
          <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[20, 20]} />
            <meshBasicMaterial visible={false} />
          </mesh>
        </RigidBody>

        {/* Keep-out wall: nothing can rest under the copy column. Covers
            gravity/settle/collision; the matching drag-clamp (dragMinX prop
            below) covers the drag case, since kinematic drag bodies bypass
            colliders entirely. */}
        <RigidBody type="fixed">
          <mesh position={[HERO_KEEPOUT_X - 0.15, 1.5, 0]}>
            <boxGeometry args={[0.3, 4, 6]} />
            <meshBasicMaterial visible={false} />
          </mesh>
        </RigidBody>

        {/* Right / back / front invisible walls keep the pile in frame. */}
        <RigidBody type="fixed">
          <mesh position={[4.2, 1.5, 0]}>
            <boxGeometry args={[0.3, 4, 6]} />
            <meshBasicMaterial visible={false} />
          </mesh>
        </RigidBody>
        <RigidBody type="fixed">
          <mesh position={[1.8, 1.5, -2.1]}>
            <boxGeometry args={[6, 4, 0.3]} />
            <meshBasicMaterial visible={false} />
          </mesh>
        </RigidBody>
        <RigidBody type="fixed">
          <mesh position={[1.8, 1.5, 2.1]}>
            <boxGeometry args={[6, 4, 0.3]} />
            <meshBasicMaterial visible={false} />
          </mesh>
        </RigidBody>

        {HERO_OBJECTS.map((def) => (
          <HeroObject key={def.id} def={def} dragMinX={HERO_KEEPOUT_X} />
        ))}
      </Physics>
    </>
  );
}
