/**
 * Cheap WebGL availability probe — no rendering happens, the probe canvas is
 * never attached to the DOM, reference dropped immediately after the check.
 * Local v8-scoped copy (mirrors src/components/v3/machineWebgl.ts) so this
 * build stays inside src/components/v8/** per the build brief.
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

/** Desktop + fine pointer + no prefers-reduced-motion — the "run real
 * physics" gate, same convention as v3's DESKTOP_QUERY. Touch devices are
 * handled separately (physics still runs there, capped + simplified). */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false
  );
}

export function isCoarsePointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(pointer: coarse)").matches ?? false;
}
