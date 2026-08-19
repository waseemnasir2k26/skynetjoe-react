/**
 * Cheap WebGL availability probe — no rendering happens, the probe canvas is
 * never attached to the DOM, reference dropped immediately after the check.
 * Local v4-scoped copy of src/components/v3/machineWebgl.ts (kept local so
 * this build stays inside src/components/v4/** per the build brief).
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
