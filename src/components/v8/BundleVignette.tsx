"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { isWebGLAvailable, prefersReducedMotion } from "./webgl";

const BundleVignetteCanvas = dynamic(() => import("./BundleVignetteCanvas"), {
  ssr: false,
  loading: () => null,
});

/**
 * Per-bundle-card physics vignette: 3 parts (standing in for that bundle's
 * first 3 "what's inside" line items) drop from directly above the same x
 * column and land on a tiny floor. Because every part spawns on the same x/z
 * with only a small deterministic height stagger, gravity alone always
 * produces a tidy vertical stack — no randomness, no possible untidy end
 * state. Triggers once, the first time the card scrolls into view
 * (IntersectionObserver) — `triggered` only ever flips true, never back to
 * false, so it does not replay on every re-entry, matching "assembles when
 * scrolled into view" rather than a looping toy. The same observer keeps
 * reporting ongoing intersection (+ tab visibility) after that first fire
 * so the mounted canvas's frameloop/physics can pause while scrolled out
 * instead of running forever (see BundleVignetteCanvas.tsx).
 */
export default function BundleVignette({
  partCount,
  color,
}: {
  partCount: number;
  color: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [triggered, setTriggered] = useState(false);
  const [intersecting, setIntersecting] = useState(false);
  const [visible, setVisible] = useState(true);
  // SSR-safe default: always "fallback" on first render (server AND the
  // client's hydration pass) so the markup matches exactly, then flip to
  // "scene" in an effect (post-hydration) if the browser actually qualifies
  // — same convention as HeroWorkshop/FinalCTAWorkshop's mode state. Doing
  // the window/webgl check inside a useState initializer instead caused a
  // hydration mismatch (client's first render already saw `window`, server
  // never did).
  const [mode, setMode] = useState<"scene" | "fallback">("fallback");

  useEffect(() => {
    queueMicrotask(() => {
      setMode(
        prefersReducedMotion() || !isWebGLAvailable() ? "fallback" : "scene",
      );
    });
  }, []);

  useEffect(() => {
    if (mode !== "scene") return;
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setTriggered(true);
      setIntersecting(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
        if (entry.isIntersecting) setTriggered(true);
      },
      { threshold: 0.35 },
    );
    observer.observe(el);

    function onVisibilityChange() {
      setVisible(!document.hidden);
    }
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [mode]);

  const handleContextLost = useCallback(() => {
    setMode("fallback");
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        height: 92,
        marginBottom: 18,
        borderBottom: "1px solid rgba(26,26,26,0.1)",
      }}
    >
      {mode === "scene" && triggered && (
        <BundleVignetteCanvas
          partCount={partCount}
          color={color}
          active={intersecting && visible}
          onContextLost={handleContextLost}
        />
      )}
      {mode === "fallback" && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column-reverse",
            gap: 3,
          }}
        >
          {Array.from({ length: partCount }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 40 + i * 6,
                height: 14,
                background: color,
                borderRadius: 2,
                opacity: 0.5 + i * 0.18,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
