/**
 * Cheap WebGL availability probe — no rendering happens, the probe canvas is
 * never attached to the DOM, reference dropped immediately after the check.
 * Local v5-scoped copy of the same pattern used by v2/webgl.ts and
 * v3/machineWebgl.ts (kept scoped to src/components/v5/** per the build
 * brief rather than importing a sibling-in-progress module). Used by
 * BlueprintHero.tsx to decide whether the real R3F wireframe-robot scene
 * mounts or the drawn SVG fallback is used instead.
 */
export function isWebGLAvailable(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    return !!gl;
  } catch {
    return false;
  }
}
