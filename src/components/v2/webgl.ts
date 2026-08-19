/**
 * Cheap WebGL availability probe — no rendering happens, the probe canvas
 * is never attached to the DOM, and its reference is dropped immediately
 * after the check so it's eligible for normal GC. This runs at most once
 * per V2SceneLoader mount (not per frame/re-render), so context-limit
 * exhaustion from repeated probing is not a realistic concern here. Used
 * to decide whether the V2 hero mounts the real R3F scene or falls back
 * to the static composition.
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
