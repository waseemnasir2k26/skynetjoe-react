import * as THREE from "three";

/**
 * Custom THREE.ShaderMaterial for the morphing THREE.Points field. Deliberate
 * choice per build brief: attribute-morph in a hand-written vertex shader,
 * NOT @react-three/postprocessing (not installed, scope forbids new deps) —
 * the "glow" is a shader falloff in the fragment shader (soft circular
 * sprite + additive blending), not a bloom pass.
 *
 * Five vec3 position attributes (aP0..aP4, one per shape) are mixed by a
 * 5-element weight uniform computed in JS from scroll progress
 * (particleData.computeShapeWeights). A small sin/cos wobble adds organic
 * motion without needing curl-noise textures or a compute pass.
 */

const VERTEX = /* glsl */ `
attribute vec3 aP0;
attribute vec3 aP1;
attribute vec3 aP2;
attribute vec3 aP3;
attribute vec3 aP4;
attribute float aSeed;

uniform float uWeights[5];
uniform float uTime;
uniform float uPixelRatio;
uniform float uSize;

varying float vSeed;

void main() {
  vec3 pos =
    aP0 * uWeights[0] +
    aP1 * uWeights[1] +
    aP2 * uWeights[2] +
    aP3 * uWeights[3] +
    aP4 * uWeights[4];

  float wob = 0.045;
  pos.x += sin(uTime * 0.6 + aSeed * 6.2831853) * wob;
  pos.y += cos(uTime * 0.5 + aSeed * 9.42) * wob;
  pos.z += sin(uTime * 0.4 + aSeed * 3.14159) * wob * 0.6;

  vSeed = aSeed;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = uSize * uPixelRatio * (7.5 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
`;

const FRAGMENT = /* glsl */ `
precision mediump float;

uniform vec3 uColorA;
uniform vec3 uColorB;

varying float vSeed;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  float alpha = smoothstep(0.5, 0.0, d);
  alpha *= alpha; // tighter falloff = crisper glow core
  vec3 color = mix(uColorA, uColorB, vSeed);
  gl_FragColor = vec4(color, alpha);
}
`;

export function createParticleMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
    uniforms: {
      uWeights: { value: [1, 0, 0, 0, 0] },
      uTime: { value: 0 },
      uPixelRatio: { value: 1 },
      uSize: { value: 3.2 },
      // Rust + cream on deep ink background — brand palette, high contrast,
      // additive blend reads as a warm glow rather than a flat dot field.
      uColorA: { value: new THREE.Color("#c66b3f") },
      uColorB: { value: new THREE.Color("#f2efe6") },
    },
    transparent: true,
    depthWrite: false,
    depthTest: true,
    blending: THREE.AdditiveBlending,
  });
}
