"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { isWebGLAvailable } from "./glassWebgl";
import GlassStaticFallback from "./GlassStaticFallback";

// R3F Canvas is client-only (WebGL context can't exist on the server) —
// split into its own chunk so the 3D deps never touch the SSR bundle. Same
// dynamic(ssr:false) split as v3's MachineCanvas.
const GlassCanvas = dynamic(() => import("./GlassCanvas"), {
  ssr: false,
  loading: () => null,
});

/**
 * Whole-page floating-glass layer for /v6 GLASSHOUSE — mounted once at the
 * top of V6Home, fixed to the viewport (does not consume document flow, so
 * it can never cause CLS). Decides once on mount (and re-evaluates on the
 * relevant matchMedia "change" events) between:
 *  - "scene": live R3F canvas, 3 MeshTransmissionMaterial objects drifting
 *    with whole-document scroll progress + cursor.
 *  - "fallback": CSS-only translucent shapes (GlassStaticFallback), with
 *    the idle float animation itself gated off under
 *    prefers-reduced-motion.
 * A lost WebGL context mid-session also drops straight to the fallback.
 */
export default function GlassLayer() {
  const progressRef = useRef(0);
  const [mode, setMode] = useState<"pending" | "scene" | "fallback">("pending");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [contextLost, setContextLost] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);

  const evaluate = useCallback(() => {
    const reduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    setReducedMotion(reduced);
    if (contextLost) {
      setMode("fallback");
      return;
    }
    const coarse = window.matchMedia?.("(pointer: coarse)").matches ?? true;
    const webgl = isWebGLAvailable();
    setMode(!coarse && !reduced && webgl ? "scene" : "fallback");
  }, [contextLost]);

  useEffect(() => {
    queueMicrotask(evaluate);
    const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerMq = window.matchMedia("(pointer: coarse)");
    reducedMq.addEventListener("change", evaluate);
    pointerMq.addEventListener("change", evaluate);
    return () => {
      reducedMq.removeEventListener("change", evaluate);
      pointerMq.removeEventListener("change", evaluate);
    };
  }, [evaluate]);

  const handleContextLost = useCallback(() => {
    setContextLost(true);
    setMode("fallback");
  }, []);

  // Whole-document scroll progress, rAF-throttled, written to a ref (never
  // triggers a React re-render — GlassSceneContent reads it every 3D frame).
  useEffect(() => {
    if (mode !== "scene") return;
    let raf = 0;
    let scheduled = false;
    const update = () => {
      scheduled = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progressRef.current =
        max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };
    const onScroll = () => {
      if (scheduled) return;
      scheduled = true;
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [mode]);

  // Pause the R3F frame loop when the tab is hidden — never spend GPU in
  // the background.
  useEffect(() => {
    if (mode !== "scene") return;
    const onVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [mode]);

  if (mode === "pending") return null;

  if (mode === "fallback") {
    return <GlassStaticFallback animate={!reducedMotion} />;
  }

  return (
    <GlassCanvas
      progressRef={progressRef}
      active={tabVisible}
      onContextLost={handleContextLost}
    />
  );
}
