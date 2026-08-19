/**
 * Cheap WebGL availability probe — no rendering happens, the probe canvas is
 * never attached to the DOM, reference dropped immediately after the check.
 * Local v7-scoped copy of src/components/v3/webgl.ts (same pattern: kept
 * per-route so this build stays inside src/components/v7/** per the build
 * brief, rather than importing across a sibling variant's folder).
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
