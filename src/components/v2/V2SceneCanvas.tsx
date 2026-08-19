"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import V2SceneContent from "./V2SceneContent";

/**
 * Real WebGL canvas for the V2 hero. Only ever mounted client-side via
 * next/dynamic(ssr:false) from V2SceneLoader.tsx — never imported by a
 * server component directly.
 *
 * `experienceRef` is the wrapper DOM node the scroll progress is measured
 * against (spans hero -> final CTA). Progress + mouse position are pushed
 * into refs (not React state) so the R3F frame loop never re-renders React.
 *
 * The frame loop only runs while the experience wrapper is actually
 * intersecting the viewport (IntersectionObserver) AND the tab is visible
 * — this canvas is a full-viewport sticky backdrop for the whole /v2
 * route, so once the user has scrolled past it (or switches tabs) there is
 * no reason to keep spending GPU on it. `onContextLost` notifies the
 * parent loader so it can drop to the static fallback if the live WebGL
 * context dies mid-session (R3F does not auto-recover a lost context).
 */
export default function V2SceneCanvas({
  experienceRef,
  onContextLost,
}: {
  experienceRef: React.RefObject<HTMLDivElement | null>;
  onContextLost?: () => void;
}) {
  const progressRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);
  const [intersecting, setIntersecting] = useState(true);
  const active = visible && intersecting;

  useEffect(() => {
    let raf = 0;

    function computeProgress() {
      const el = experienceRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      progressRef.current =
        total > 0 ? Math.min(Math.max(scrolled / total, 0), 1) : 0;
      raf = requestAnimationFrame(computeProgress);
    }
    raf = requestAnimationFrame(computeProgress);

    function onMove(e: MouseEvent) {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    }
    window.addEventListener("mousemove", onMove, { passive: true });

    // Pause the render loop when the tab is hidden — meaningful GPU/battery
    // saving, combined below with the IntersectionObserver check for when
    // the experience wrapper has scrolled fully out of view.
    function onVisibility() {
      setVisible(!document.hidden);
    }
    document.addEventListener("visibilitychange", onVisibility);

    const el = experienceRef.current;
    let observer: IntersectionObserver | undefined;
    if (el && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => setIntersecting(entry.isIntersecting),
        { threshold: 0 },
      );
      observer.observe(el);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      observer?.disconnect();
    };
  }, [experienceRef]);

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      }}
      camera={{ fov: 45, near: 0.1, far: 30, position: [0, 0, 6] }}
      frameloop={active ? "always" : "never"}
      style={{ position: "absolute", inset: 0 }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", (e) => {
          e.preventDefault();
          onContextLost?.();
        });
      }}
    >
      <V2SceneContent progressRef={progressRef} mouseRef={mouseRef} />
    </Canvas>
  );
}
