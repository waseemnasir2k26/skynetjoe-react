/**
 * Cheap WebGL availability probe — no rendering happens, the probe canvas is
 * never attached to the DOM, reference dropped immediately after the check.
 * Local v6-scoped copy of the same technique used by v2/v3 (machineWebgl.ts,
 * webgl.ts) so this build stays inside src/components/v6/** per the build
 * brief. Used by GlassLayer.tsx to decide whether the live R3F transmission
 * scene mounts or the CSS glass fallback is used instead.
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
