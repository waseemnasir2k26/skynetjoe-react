"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { getGsap } from "@/components/home/gsapClient";
import { isWebGLAvailable } from "./machineWebgl";
import MachineStaticFallback from "./MachineStaticFallback";
import { MACHINE_CAPTIONS, MACHINE_NODES } from "./machineData";

// R3F Canvas is client-only (WebGL context can't exist on the server) —
// split into its own chunk so the 3D deps never touch the SSR bundle.
const MachineCanvas = dynamic(() => import("./MachineCanvas"), {
  ssr: false,
  loading: () => null,
});

// Same desktop-pointer gate used by InkShaderHero/ServiceStrip — touch
// tablets match min-width:768 but can't drive a scroll-scrubbed pin
// comfortably, so they get the static fallback too.
const DESKTOP_QUERY = "(min-width: 768px) and (pointer: fine)";

/**
 * "THE MACHINE" — pinned, scroll-scrubbed beat between the ink-flow hero
 * and the bundles section. An automation chain (webhook -> AI agent -> CRM
 * -> calendar -> WhatsApp) assembles node-by-node as the user scrubs a
 * GSAP-pinned section, narrated by 4 short crossfading captions.
 *
 * Desktop + fine pointer + no prefers-reduced-motion + WebGL available:
 * pins the section (GSAP ScrollTrigger, pinType "transform") and mounts the
 * real R3F scene. Everyone else gets MachineStaticFallback — a normal-flow,
 * vertical, non-pinned composition. Mode is decided once on mount and
 * re-evaluated on the relevant matchMedia "change" events; a lost WebGL
 * context also drops straight to the fallback.
 */
export default function MachineBeat() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const pinTargetRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef(0);
  const captionRefs = useRef<(HTMLParagraphElement | null)[]>([]);

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

  // Pin + scrub, scene mode only.
  useEffect(() => {
    if (mode !== "scene") return;
    const section = pinTargetRef.current;
    if (!section) return;

    const { gsap, ScrollTrigger } = getGsap();
    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${window.innerHeight * 2.4}`,
        scrub: 0.6,
        pin: true,
        pinSpacing: true,
        pinType: "transform",
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          progressRef.current = self.progress;
          const idx = Math.min(
            MACHINE_CAPTIONS.length - 1,
            Math.floor(self.progress * MACHINE_CAPTIONS.length),
          );
          captionRefs.current.forEach((el, i) => {
            if (!el) return;
            el.style.opacity = i === idx ? "1" : "0";
          });
        },
      });
      return () => st.kill();
    }, section);

    return () => ctx.revert();
  }, [mode]);

  // Pause the R3F frame loop when off-screen / tab hidden — scene mode only.
  useEffect(() => {
    if (mode !== "scene") return;
    const el = wrapperRef.current;
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

  const eyebrow = (
    <div
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        textTransform: "uppercase",
        letterSpacing: "0.16em",
        color: "var(--terracotta-aa)",
        marginBottom: 16,
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <span
        style={{
          width: 28,
          height: 1,
          background: "var(--terracotta)",
          display: "inline-block",
        }}
      />
      The machine
    </div>
  );

  // Screen-reader / no-JS summary — always in the DOM regardless of mode,
  // so the flow is never conveyed only by scrubbed captions or 3D labels.
  const srSummary = (
    <p className="sr-only">
      Watch an automation get built, step by step:{" "}
      {MACHINE_NODES.map((n) => `${n.label} — ${n.sublabel}`).join("; ")}.
    </p>
  );

  if (mode === "pending") {
    // Reserve layout space matching the fallback shape (fallback is the
    // safe default until the client-only mode decision resolves) so there
    // is no flash of empty space.
    return (
      <section
        ref={wrapperRef}
        className="section"
        style={{
          background: "var(--cream-2)",
          color: "var(--ink)",
          fontFamily: "var(--font-sans)",
          borderBottom: "1px solid rgba(26,26,26,0.12)",
        }}
      >
        <div className="container-x">
          {eyebrow}
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              fontSize: "clamp(26px, 6vw, 40px)",
              margin: "0 0 28px",
              maxWidth: "22ch",
            }}
          >
            Watch it{" "}
            <span style={{ color: "var(--terracotta-aa)" }}>get built.</span>
          </h2>
          {srSummary}
          <MachineStaticFallback />
        </div>
      </section>
    );
  }

  if (mode === "fallback") {
    return (
      <section
        className="section"
        style={{
          background: "var(--cream-2)",
          color: "var(--ink)",
          fontFamily: "var(--font-sans)",
          borderBottom: "1px solid rgba(26,26,26,0.12)",
        }}
      >
        <div className="container-x">
          {eyebrow}
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              fontSize: "clamp(26px, 6vw, 40px)",
              margin: "0 0 28px",
              maxWidth: "22ch",
            }}
          >
            Watch it{" "}
            <span style={{ color: "var(--terracotta-aa)" }}>get built.</span>
          </h2>
          {srSummary}
          <MachineStaticFallback />
        </div>
      </section>
    );
  }

  // Scene mode: pinned full-viewport 3D beat.
  return (
    <section
      ref={wrapperRef}
      aria-label="Watch an automation get built"
      style={{
        background: "var(--cream-2)",
        borderBottom: "1px solid rgba(26,26,26,0.12)",
      }}
    >
      {srSummary}
      <div
        ref={pinTargetRef}
        className="relative overflow-hidden"
        style={{ height: "100svh" }}
      >
        <MachineCanvas
          progressRef={progressRef}
          active={intersecting && visible}
          onContextLost={handleContextLost}
        />

        {/* Cream scrim top/bottom so captions + eyebrow stay legible over
            the 3D field at any scrub point. */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            zIndex: 1,
            pointerEvents: "none",
            background:
              "linear-gradient(180deg, rgba(242,239,230,0.55) 0%, rgba(242,239,230,0) 22%, rgba(242,239,230,0) 68%, rgba(242,239,230,0.6) 100%)",
          }}
        />

        <div
          className="container-x absolute"
          style={{
            zIndex: 2,
            top: "clamp(24px, 5vw, 48px)",
            left: 0,
            right: 0,
          }}
        >
          {eyebrow}
        </div>

        <div
          aria-hidden="true"
          className="container-x absolute"
          style={{
            zIndex: 2,
            left: 0,
            right: 0,
            bottom: "clamp(28px, 7vw, 64px)",
            pointerEvents: "none",
          }}
        >
          <div style={{ position: "relative", minHeight: 44 }}>
            {MACHINE_CAPTIONS.map((c, i) => (
              <p
                key={c}
                ref={(el) => {
                  captionRefs.current[i] = el;
                }}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  margin: 0,
                  opacity: i === 0 ? 1 : 0,
                  transition: "opacity 0.25s ease-out",
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "clamp(22px, 5vw, 34px)",
                  lineHeight: 1.2,
                  color: "var(--ink)",
                  maxWidth: "20ch",
                }}
              >
                {c}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
