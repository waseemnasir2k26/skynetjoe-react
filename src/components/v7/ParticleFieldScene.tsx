"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  PARTICLE_COUNT,
  SHAPE_CENTERS,
  buildShapeTargets,
  computeShapeWeights,
} from "./particleData";
import { createParticleMaterial } from "./particleShader";

/**
 * R3F scene content for the V7 morphing particle field. Lives inside the
 * ssr:false <Canvas> mounted by ParticleFieldCanvas.tsx. `progressRef` is
 * 0..1, driven by the GSAP ScrollTrigger in ParticleFieldBeat.tsx (a ref,
 * not React state — scrubbing never triggers a re-render here).
 *
 * Geometry attributes (aP0..aP4, one Float32Array per shape) are built ONCE
 * on mount via useMemo — shape generation (incl. the canvas glyph-sampling
 * for the wordmark) is not free, and it never needs to re-run mid-session.
 */
export default function ParticleFieldScene({
  progressRef,
}: {
  progressRef: React.MutableRefObject<number>;
}) {
  const { gl } = useThree();
  const pointsRef = useRef<THREE.Points>(null);
  // Mutated every frame in useFrame below — kept in a ref (not the raw
  // useMemo binding) so the mutation targets `materialRef.current`, matching
  // the ref-mutation pattern already used by v3/MachineSceneContent.tsx
  // (`ref.current.material.opacity = ...`) rather than reassigning a value
  // closed over directly from a hook's return.
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  const { geometry, material } = useMemo(() => {
    const { targets, seeds } = buildShapeTargets(PARTICLE_COUNT);
    const geo = new THREE.BufferGeometry();
    // "position" itself is required by Three but never read meaningfully —
    // the vertex shader overwrites gl_Position from aP0..aP4. Seed it with
    // shape 0 (field) so nothing looks wrong before the first frame runs.
    geo.setAttribute("position", new THREE.BufferAttribute(targets[0], 3));
    geo.setAttribute("aP0", new THREE.BufferAttribute(targets[0], 3));
    geo.setAttribute("aP1", new THREE.BufferAttribute(targets[1], 3));
    geo.setAttribute("aP2", new THREE.BufferAttribute(targets[2], 3));
    geo.setAttribute("aP3", new THREE.BufferAttribute(targets[3], 3));
    geo.setAttribute("aP4", new THREE.BufferAttribute(targets[4], 3));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    // Bounding sphere from the widest shape target (wordmark spans widest)
    // so R3F's automatic frustum culling never clips the field mid-morph.
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 6);
    const mat = createParticleMaterial();
    return { geometry: geo, material: mat };
  }, []);

  useEffect(() => {
    materialRef.current = material;
    return () => {
      materialRef.current = null;
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame(({ clock }) => {
    const mat = materialRef.current;
    if (!mat) return;
    const weights = computeShapeWeights(progressRef.current, SHAPE_CENTERS);
    const uw = mat.uniforms.uWeights.value as number[];
    for (let i = 0; i < weights.length; i++) uw[i] = weights[i];
    mat.uniforms.uTime.value = clock.getElapsedTime();
    mat.uniforms.uPixelRatio.value = gl.getPixelRatio();
  });

  return (
    <points
      ref={pointsRef}
      geometry={geometry}
      material={material}
      frustumCulled={false}
    />
  );
}
