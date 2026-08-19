"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import {
  RigidBody,
  CylinderCollider,
  ConeCollider,
  type RapierRigidBody,
} from "@react-three/rapier";
import { Html } from "@react-three/drei";
import type { HeroObjectDef } from "./heroObjectsData";

/**
 * One grabbable/tossable hero object. Drag is implemented as a raycast
 * against a camera-facing plane at the body's current depth (not against
 * the shrinking mesh itself, so fast pointer moves never "lose" the drag):
 *
 *  pointerdown on the mesh -> switch the rapier body to
 *  KinematicPositionBased (type 2), lock a drag plane through its current
 *  position, capture the pointer.
 *  pointermove (window-level, only while dragging) -> raycast onto the
 *  plane, setNextKinematicTranslation to the hit point, track velocity from
 *  the last 2 samples.
 *  pointerup -> switch back to Dynamic (type 0) and setLinvel to the
 *  tracked velocity -> a real toss, not a teleport.
 *
 * Rapier RigidBodyType enum (from @dimforge/rapier3d-compat): Dynamic = 0,
 * Fixed = 1, KinematicPositionBased = 2, KinematicVelocityBased = 3 — used
 * as raw numbers here so this component never imports the wasm binding
 * directly (only @react-three/rapier's already-initialized RigidBody API).
 */
export default function HeroObject({
  def,
  dragMinX = -Infinity,
}: {
  def: HeroObjectDef;
  /** Hard clamp on the drag target's world-x — kinematic drag bodies bypass
   * colliders entirely (they don't respond to physics, they teleport), so
   * the hero pile's keep-out wall (which stops gravity-settled objects from
   * resting under the copy column) does nothing once a user is actively
   * dragging. This clamp is the only thing that actually enforces "objects
   * never occlude the copy" during a drag. */
  dragMinX?: number;
}) {
  const rb = useRef<RapierRigidBody>(null);
  const { camera, gl } = useThree();
  const dragging = useRef(false);
  const plane = useRef(new THREE.Plane());
  const dragOffset = useRef(new THREE.Vector3());
  const lastPoint = useRef(new THREE.Vector3());
  const lastTime = useRef(0);
  const velocity = useRef(new THREE.Vector3());
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const tmpVec = useMemo(() => new THREE.Vector3(), []);

  const pointToWorld = useCallback(
    (clientX: number, clientY: number, out: THREE.Vector3) => {
      const rect = gl.domElement.getBoundingClientRect();
      const ndc = new THREE.Vector2(
        ((clientX - rect.left) / rect.width) * 2 - 1,
        -((clientY - rect.top) / rect.height) * 2 + 1,
      );
      raycaster.setFromCamera(ndc, camera);
      raycaster.ray.intersectPlane(plane.current, out);
      return out;
    },
    [camera, gl, raycaster],
  );

  useEffect(() => {
    function onMove(e: PointerEvent) {
      if (!dragging.current || !rb.current) return;
      const hit = pointToWorld(e.clientX, e.clientY, tmpVec.clone());
      if (!hit) return;
      hit.add(dragOffset.current);
      hit.x = Math.max(hit.x, dragMinX);
      const now = performance.now();
      const dt = Math.max((now - lastTime.current) / 1000, 1 / 120);
      velocity.current.copy(hit).sub(lastPoint.current).divideScalar(dt);
      lastPoint.current.copy(hit);
      lastTime.current = now;
      rb.current.setNextKinematicTranslation(hit);
    }
    function onUp() {
      if (!dragging.current || !rb.current) return;
      dragging.current = false;
      rb.current.setBodyType(0, true);
      // Cap toss speed so a fast flick can't launch the object off-scene.
      const v = velocity.current.clone().clampLength(0, 6);
      rb.current.setLinvel({ x: v.x, y: v.y, z: v.z }, true);
      rb.current.setAngvel({ x: v.z, y: 0.4, z: -v.x }, true);
    }
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [pointToWorld, tmpVec, dragMinX]);

  function onPointerDown(e: {
    stopPropagation: () => void;
    clientX: number;
    clientY: number;
  }) {
    e.stopPropagation();
    const body = rb.current;
    if (!body) return;
    const t = body.translation();
    const camDir = camera.getWorldDirection(new THREE.Vector3()).negate();
    plane.current.setFromNormalAndCoplanarPoint(
      camDir,
      new THREE.Vector3(t.x, t.y, t.z),
    );
    const hit = pointToWorld(e.clientX, e.clientY, tmpVec.clone());
    dragOffset.current.set(t.x - hit.x, t.y - hit.y, t.z - hit.z);
    lastPoint.current.set(t.x, t.y, t.z);
    lastTime.current = performance.now();
    velocity.current.set(0, 0, 0);
    body.setBodyType(2, true);
    dragging.current = true;
  }

  const geometry = useMemo(() => {
    switch (def.shape) {
      case "box":
        return (
          <boxGeometry
            args={[def.args[0], def.args[1], def.args[2]] as const}
          />
        );
      case "ball":
        return <sphereGeometry args={[def.args[0], 24, 24]} />;
      case "cylinder":
        return (
          <cylinderGeometry
            args={[def.args[0], def.args[0], def.args[1], 20]}
          />
        );
      case "cone":
        return <coneGeometry args={[def.args[0], def.args[1], 16]} />;
    }
  }, [def.shape, def.args]);

  // Only ball/cuboid have an "auto" collider in @react-three/rapier —
  // cylinder/cone need an explicit collider child instead (colliders=false
  // disables the auto-generated one). CylinderArgs/ConeArgs are
  // [halfHeight, radius], while def.args is [radius, height] (matches the
  // three.js geometry arg order), hence the swap+halve below.
  const autoCollider: "cuboid" | "ball" | false =
    def.shape === "box" ? "cuboid" : def.shape === "ball" ? "ball" : false;

  return (
    <RigidBody
      ref={rb}
      position={def.spawn}
      rotation={def.spawnRot}
      colliders={autoCollider}
      restitution={0.32}
      friction={0.7}
      linearDamping={0.55}
      angularDamping={0.75}
      canSleep
    >
      {def.shape === "cylinder" && (
        <CylinderCollider args={[def.args[1] / 2, def.args[0]]} />
      )}
      {def.shape === "cone" && (
        <ConeCollider args={[def.args[1] / 2, def.args[0]]} />
      )}
      <mesh
        castShadow={false}
        receiveShadow={false}
        onPointerDown={onPointerDown}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "grab";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "default";
        }}
      >
        {geometry}
        <meshPhysicalMaterial
          color={def.color}
          roughness={def.accent ? 0.28 : 0.4}
          metalness={0.08}
          clearcoat={0.5}
          clearcoatRoughness={0.3}
        />
      </mesh>
      {def.label && (
        <Html
          position={[0, def.shape === "box" ? def.args[1] / 2 + 0.28 : 0.5, 0]}
          center
          occlude={false}
          // Capped well below the copy card's z-index:2 (HeroWorkshop.tsx) —
          // drei's Html sets both the label div's AND the <canvas> element's
          // own z-index from this range, so a range that reaches/exceeds 2
          // let a near-camera label's tag paint on top of the SSR copy card.
          zIndexRange={[1, 0]}
          style={{ pointerEvents: "none" }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              whiteSpace: "nowrap",
              background: "rgba(242,239,230,0.94)",
              border: "1px solid rgba(198,107,63,0.35)",
              borderRadius: 3,
              padding: "3px 7px",
              color: "var(--ink)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            {def.label}
          </div>
        </Html>
      )}
    </RigidBody>
  );
}
