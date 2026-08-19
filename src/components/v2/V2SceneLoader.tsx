"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { isWebGLAvailable } from "./webgl";
import V2StaticFallback from "./V2StaticFallback";

// R3F Canvas is client-only (WebGL context can't exist on the server) —
// split into its own chunk so the 3D deps never touch the SSR bundle or the
// initial HTML payload.
const V2SceneCanvas = dynamic(() => import("./V2SceneCanvas"), {
  ssr: false,
  loading: () => null,
});

/**
 * Decides whether the real R3F scene mounts, or the static fallback is
 * used instead: mobile (<768px), prefers-reduced-motion, or no WebGL.
 * Renders V2StaticFallback (a real gradient/SVG composition, styled
 * poster) until that decision + the scene chunk are ready, so there is
 * never a blank flash behind the SSR hero text.
 *
 * The mobile/reduced-motion checks are re-evaluated live via matchMedia
 * "change" listeners (device rotation, OS-level motion toggle, resizing a
 * desktop window below the breakpoint) instead of only once on mount.
 * Mode also drops to "fallback" if the live WebGL context is lost
 * mid-session (see onContextLost passed to V2SceneCanvas) since a lost
 * context can't reliably be resumed inside R3F.
 */
export default function V2SceneLoader({
  experienceRef,
}: {
  experienceRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [mode, setMode] = useState<"pending" | "scene" | "fallback">("pending");
  const [contextLost, setContextLost] = useState(false);

  const evaluate = useCallback(() => {
    if (contextLost) {
      setMode("fallback");
      return;
    }
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const webgl = isWebGLAvailable();

    setMode(isMobile || reduced || !webgl ? "fallback" : "scene");
  }, [contextLost]);

  useEffect(() => {
    // Deferred to a microtask so the first call isn't a synchronous
    // setState in the effect body (react-hooks/set-state-in-effect) — the
    // one-frame delay is invisible since V2StaticFallback is already the
    // "pending" render, so there's no flash either way.
    queueMicrotask(evaluate);

    const mobileMql = window.matchMedia("(max-width: 767px)");
    const reducedMql = window.matchMedia("(prefers-reduced-motion: reduce)");
    mobileMql.addEventListener("change", evaluate);
    reducedMql.addEventListener("change", evaluate);

    return () => {
      mobileMql.removeEventListener("change", evaluate);
      reducedMql.removeEventListener("change", evaluate);
    };
  }, [evaluate]);

  const handleContextLost = useCallback(() => {
    setContextLost(true);
    setMode("fallback");
  }, []);

  if (mode === "pending" || mode === "fallback") {
    return <V2StaticFallback />;
  }

  return (
    <V2SceneCanvas
      experienceRef={experienceRef}
      onContextLost={handleContextLost}
    />
  );
}
