/**
 * Cheap WebGL availability probe — no rendering happens, the probe canvas is
 * never attached to the DOM, reference dropped immediately after the check.
 * Mirrors src/components/v2/webgl.ts (kept as a local v3-scoped copy so this
 * build stays inside src/components/v3/** per the build brief). Used by
 * MachineBeat.tsx to decide whether the pinned R3F "assembly" scene mounts
 * or the static SVG fallback is used instead.
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
