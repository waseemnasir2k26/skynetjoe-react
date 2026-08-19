import * as THREE from "three";

/**
 * Config + choreography data for the GLASSHOUSE 3D layer (GlassSceneContent).
 * Hard cap: exactly 3 MeshTransmissionMaterial objects ever mount at once —
 * well under the 3-4 on-screen budget agreed for this build. No 4th object,
 * no pooled/instanced duplicates.
 *
 * Each object drifts between 3 hand-placed waypoints (hero / mid-page / final
 * CTA) as the whole-document scroll progress (0..1) advances — same lerp
 * technique as v3's MachineSceneContent CameraRig (proven pattern, reused
 * rather than inventing a new interpolation scheme). A slow idle bob +
 * rotation runs on top so nothing ever looks frozen even at scrollProgress
 * extremes, and PointerRig (in GlassSceneContent.tsx) adds a small uniform
 * cursor-drift offset to the whole group.
 */

export type GlassGeometry = "knot" | "blob" | "prism";

export type GlassObjectConfig = {
  id: string;
  geometry: GlassGeometry;
  tint: string;
  scale: number;
  /** [x, y, z] world-space waypoints at scrollProgress 0, 0.5, 1. */
  waypoints: [THREE.Vector3, THREE.Vector3, THREE.Vector3];
  bobSpeed: number;
  bobAmount: number;
  rotSpeed: [number, number];
};

export const GLASS_OBJECTS: GlassObjectConfig[] = [
  {
    id: "knot",
    geometry: "knot",
    tint: "#c66b3f", // --terracotta
    scale: 0.6,
    // t=1 kept well off the centered final-CTA headline column. Scroll
    // progress never actually reaches 1.0 while the FinalCTAGlass section
    // is in view (the sitewide ToolsStrip + Footer sit below it and count
    // toward document height), so the 3rd waypoint has to be extreme enough
    // that even the ~70-85% progress reached at that section is already
    // clear of the centered ~46ch text column — an earlier, more modest
    // value still sat on top of "Find the gaps in 30 minutes." there.
    waypoints: [
      new THREE.Vector3(2.0, 1.3, -0.4),
      new THREE.Vector3(1.1, 0.4, -0.9),
      new THREE.Vector3(-5.2, -2.3, -0.6),
    ],
    bobSpeed: 0.32,
    bobAmount: 0.14,
    rotSpeed: [0.09, 0.13],
  },
  {
    id: "blob",
    geometry: "blob",
    tint: "#a8451f", // --terracotta-aa
    scale: 0.7,
    // Kept off the hero headline column (x <= -3.6, bleeding toward/past the
    // left edge) — airy/editorial per brief, not blocking the H1 body copy.
    // -3.1 still clipped the subhead's first characters at 1440 on load;
    // pushed further left/off-frame.
    waypoints: [
      new THREE.Vector3(-3.7, -1.3, -1.3),
      new THREE.Vector3(-0.4, 0.8, -0.6),
      new THREE.Vector3(1.8, 1.0, -1.0),
    ],
    bobSpeed: 0.22,
    bobAmount: 0.11,
    rotSpeed: [0.05, 0.08],
  },
  {
    id: "prism",
    geometry: "prism",
    tint: "#c66b3f",
    scale: 0.7,
    // t=1 nudged right (x 0.0 -> 1.35) so it clears the centered final-CTA
    // paragraph/button column instead of clipping across its right edge.
    waypoints: [
      new THREE.Vector3(0.4, -1.8, 0.1),
      new THREE.Vector3(2.1, -0.3, -1.1),
      new THREE.Vector3(1.35, -1.4, 0.2),
    ],
    bobSpeed: 0.4,
    bobAmount: 0.09,
    rotSpeed: [0.12, 0.07],
  },
];

// Shared MeshTransmissionMaterial tuning — deliberately conservative (each
// instance is its own multi-pass transmission render, and 3 run at once).
export const GLASS_MATERIAL_PROPS = {
  resolution: 256,
  samples: 4,
  transmission: 1,
  thickness: 0.32,
  roughness: 0.03,
  chromaticAberration: 0.06,
  anisotropicBlur: 0.1,
  distortion: 0.15,
  distortionScale: 0.35,
  temporalDistortion: 0.03,
  ior: 1.4,
  clearcoat: 0.7,
  clearcoatRoughness: 0.08,
  envMapIntensity: 1.7,
  backside: false,
  // Explicit fill color the transmission pass refracts when it has nothing
  // else in-scene behind the glass to sample (the canvas has no opaque
  // backdrop — it's an alpha:true overlay so the real page shows through
  // everywhere the glass isn't). Without this the transmission buffer reads
  // near-black and the "glass" renders as an opaque dark blob instead of a
  // light, lensed refractive form. Kept near-white/cream and low thickness
  // so it reads as clear crystal, not solid tinted marble.
  background: new THREE.Color("#faf7f0"),
} as const;

// `out` param avoids a fresh THREE.Vector3 allocation every call — this
// runs once per glass object per rendered frame (3 objects x 60fps).
// Callers that omit `out` still get a new vector (kept optional so any
// other call sites don't break).
export function beatLerp(
  waypoints: THREE.Vector3[],
  t: number,
  out: THREE.Vector3 = new THREE.Vector3(),
): THREE.Vector3 {
  const clamped = THREE.MathUtils.clamp(t, 0, 1);
  const segs = waypoints.length - 1;
  const scaled = clamped * segs;
  const i = Math.min(Math.floor(scaled), segs - 1);
  const local = scaled - i;
  return out.lerpVectors(waypoints[i], waypoints[i + 1], local);
}
