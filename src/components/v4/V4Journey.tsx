"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { getGsap } from "@/components/home/gsapClient";
import { isWebGLAvailable } from "./v4Webgl";
import V4StaticFallback from "./V4StaticFallback";
import V4Overlay from "./V4Overlay";
import { JOURNEY_VH, STATIONS } from "./v4Data";

// R3F Canvas is client-only (WebGL context can't exist on the server) —
// split into its own chunk so the 3D deps never touch the SSR bundle.
const V4Canvas = dynamic(() => import("./V4Canvas"), {
  ssr: false,
  loading: () => null,
});

// Same desktop-pointer gate used by v3's InkShaderHero/MachineBeat — touch
// tablets match min-width:768 but can't drive a scroll-scrubbed dolly
// comfortably, so they get the static fallback too.
const DESKTOP_QUERY = "(min-width: 768px) and (pointer: fine)";

/**
 * "THE LINE" — the whole-page scroll-scrubbed 3D journey at /v4. A sticky
 * full-viewport <Canvas> stays pinned via CSS `position: sticky` (cheaper
 * and more robust across a very tall (6*100svh) scroll distance than a
 * GSAP transform-pin) while a page-length GSAP ScrollTrigger reads normal
 * document scroll into `progressRef` (0..1, a ref — NOT React state, so
 * scrubbing never triggers a re-render). DOM station cards (V4Overlay)
 * crossfade on top by writing opacity directly to their DOM nodes from the
 * same onUpdate callback the camera curve reads.
 *
 * Desktop + fine pointer + no prefers-reduced-motion + WebGL available:
 * scene mode. Everyone else — mobile/touch, reduced-motion, no WebGL, and
 * the brief "pending" tick before JS resolves that decision — gets
 * V4StaticFallback, a normal-flow vertical page with the same copy. A lost
 * WebGL context also drops straight to the fallback.
 */
export default function V4Journey() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef(0);
  const stationRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [mode, setMode] = useState<"pending" | "scene" | "fallback">("pending");
  const [contextLost, setContextLost] = useState(false);
  const [intersecting, setIntersecting] = useState(false);
  const [visible, setVisible] = useState(true);

  const evaluate = useCallback(() => {
    if (contextLost) {
      setMode("fallback");
      return;
    }
    const desktop = window.matchMedia?.(DESKTOP_QUERY).matches ?? false;
    const reduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const webgl = isWebGLAvailable();
    setMode(desktop && !reduced && webgl ? "scene" : "fallback");
  }, [contextLost]);

  useEffect(() => {
    queueMicrotask(evaluate);
    const desktopMq = window.matchMedia(DESKTOP_QUERY);
    const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    desktopMq.addEventListener("change", evaluate);
    reducedMq.addEventListener("change", evaluate);
    return () => {
      desktopMq.removeEventListener("change", evaluate);
      reducedMq.removeEventListener("change", evaluate);
    };
  }, [evaluate]);

  const handleContextLost = useCallback(() => {
    setContextLost(true);
    setMode("fallback");
  }, []);

  // Page-length scrub — drives progressRef (camera) + station opacity
  // crossfade. Scene mode only.
  useEffect(() => {
    if (mode !== "scene") return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const { gsap, ScrollTrigger } = getGsap();
    const ctx = gsap.context(() => {
      const applyStation = (progress: number) => {
        const activeIdx = STATIONS.findIndex(
          (s) => progress >= s.start && progress < s.end,
        );
        const idx = activeIdx === -1 ? STATIONS.length - 1 : activeIdx;
        stationRefs.current.forEach((el, i) => {
          if (!el) return;
          const active = i === idx;
          el.style.opacity = active ? "1" : "0";
          // Hidden stations must also drop out of hit-testing / focus —
          // opacity:0 alone leaves pointerEvents:auto children stacked on
          // top of the active station's CTA (and exposes them to
          // screen-reader/tab focus while invisible).
          el.style.visibility = active ? "visible" : "hidden";
        });
      };
      // Set the correct initial station immediately (avoids a flash of
      // the entrance card if the journey mounts already scrolled into
      // view, e.g. back-forward cache navigation).
      applyStation(0);

      const st = ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          progressRef.current = self.progress;
          applyStation(self.progress);
        },
      });
      return () => st.kill();
    }, wrapper);

    return () => ctx.revert();
  }, [mode]);

  // Pause the R3F frame loop when the sticky canvas is off-screen / tab
  // hidden — scene mode only.
  useEffect(() => {
    if (mode !== "scene") return;
    const el = stickyRef.current;
    if (!el || !("IntersectionObserver" in window)) {
      setIntersecting(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(el);

    function onVisibility() {
      setVisible(!document.hidden);
    }
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [mode]);

  // Screen-reader / no-JS summary — the scrubbed crossfade shouldn't be
  // the only way this content is conveyed.
  const srSummary = (
    <p className="sr-only">
      Scroll through an automation-factory line: an entrance, three
      problem-solving machine stations (Speed-to-Lead System, Inbox Ops
      Autopilot, AI Visibility Engine), a proof wall, and a booking booth.
    </p>
  );

  if (mode === "pending" || mode === "fallback") {
    return (
      <>
        {srSummary}
        <V4StaticFallback />
      </>
    );
  }

  return (
    <section aria-label="THE LINE — scroll journey">
      {srSummary}
      <div
        ref={wrapperRef}
        className="relative"
        style={{ height: `${JOURNEY_VH}svh` }}
      >
        <div
          ref={stickyRef}
          className="relative overflow-hidden"
          style={{ position: "sticky", top: 0, height: "100svh" }}
        >
          <V4Canvas
            progressRef={progressRef}
            active={intersecting && visible}
            onContextLost={handleContextLost}
          />

          {/* Cream scrim top/bottom so overlay text stays legible over the
              3D field at any scroll depth. */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              zIndex: 1,
              pointerEvents: "none",
              background:
                "linear-gradient(180deg, rgba(242,239,230,0.35) 0%, rgba(242,239,230,0) 20%, rgba(242,239,230,0) 72%, rgba(242,239,230,0.4) 100%)",
            }}
          />

          <V4Overlay stationRefs={stationRefs} />
        </div>
      </div>
    </section>
  );
}
