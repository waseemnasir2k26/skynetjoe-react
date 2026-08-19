"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getGsap } from "@/components/home/gsapClient";
import { isWebGLAvailable } from "./webgl";
import V7StaticFallback from "./V7StaticFallback";
import { CAPTIONS, PROOF_STATS, STATE_COUNT } from "./particleData";

// R3F Canvas is client-only (WebGL context can't exist on the server) —
// split into its own chunk so the 3D deps never touch the SSR bundle. Same
// pattern as v3/MachineBeat.tsx.
const ParticleFieldCanvas = dynamic(() => import("./ParticleFieldCanvas"), {
  ssr: false,
  loading: () => null,
});

const DESKTOP_QUERY = "(min-width: 768px) and (pointer: fine)";

/**
 * V7 "Particle Field" hero-to-proof beat — a GPU particle system (THREE.Points,
 * custom ShaderMaterial, attribute-morph between 5 precomputed shapes) morphs
 * from an ambient field into a workflow node-graph, a rising bar chart, the
 * SKYNETLABS wordmark, and finally an arrow converging on the CTA — all
 * driven by a single GSAP-pinned ScrollTrigger scrub (4 content states,
 * `progressRef` 0..1, read every frame — no React re-render on scroll).
 *
 * Desktop + fine pointer + no prefers-reduced-motion + WebGL available:
 * pins the section and mounts the real R3F scene. Everyone else gets
 * V7StaticFallback — a normal-flow, non-pinned composition carrying the
 * identical 4-state narrative. Mode is decided once on mount and
 * re-evaluated on the relevant matchMedia "change" events; a lost WebGL
 * context also drops straight to the fallback.
 */
export default function ParticleFieldBeat() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const pinTargetRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef(0);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const statRefs = useRef<(HTMLSpanElement | null)[]>([]);

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
    // Deferred to the next animation frame (not a same-tick microtask) —
    // BundlesSection (imported below on this route) flips its own
    // "isDesktop" state inside a useLayoutEffect on mount, and batching the
    // "pending" -> "scene" mode swap into the exact same React commit as
    // that layout-effect-driven re-layout produced intermittent
    // insertBefore/removeChild NotFoundErrors in manual QA (React
    // reconciling two unrelated subtrees' structural changes in one pass).
    // One rAF is enough to land this update in its own task.
    const raf = requestAnimationFrame(() => evaluate());
    const desktopMq = window.matchMedia(DESKTOP_QUERY);
    const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    desktopMq.addEventListener("change", evaluate);
    reducedMq.addEventListener("change", evaluate);
    return () => {
      cancelAnimationFrame(raf);
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
        end: () => `+=${window.innerHeight * 3.2}`,
        scrub: 0.6,
        pin: true,
        pinSpacing: true,
        pinType: "transform",
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          progressRef.current = self.progress;
          const idx = Math.min(
            STATE_COUNT - 1,
            Math.floor(self.progress * STATE_COUNT),
          );
          panelRefs.current.forEach((el, i) => {
            if (!el) return;
            el.style.opacity = i === idx ? "1" : "0";
            el.style.pointerEvents = i === idx ? "auto" : "none";
          });

          // Count-up for panel 2 (proof stats) is driven directly off this
          // same pin's progress — not a second ScrollTrigger. A separate
          // per-stat ScrollTrigger (the shared CountUp component's usual
          // approach, fine on the static fallback) mounts fresh the moment
          // this section becomes "scene", at the exact same tick as this
          // pin's own ScrollTrigger.create() — 4 extra trigger creations
          // landing in the same commit as BundlesSection's (lower on this
          // route) own pin/layout-effect churn produced intermittent
          // insertBefore/removeChild NotFoundErrors in manual QA. Reusing
          // the master progress avoids creating any new triggers at all.
          const statT = Math.min(
            1,
            Math.max(0, (self.progress - 0.5) / (0.75 - 0.5)),
          );
          const eased = statT * statT * (3 - 2 * statT);
          statRefs.current.forEach((el, i) => {
            if (!el) return;
            const stat = PROOF_STATS[i];
            el.textContent = `${Math.round(stat.value * eased)}${stat.suffix}`;
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
        color: "var(--terracotta)",
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
      V7 preview · particle field
    </div>
  );

  // Screen-reader / no-JS summary — always in the DOM regardless of mode.
  const srSummary = (
    <p className="sr-only">
      Stop losing customers while you&rsquo;re busy. A lead reaches the site, an
      AI agent replies and qualifies it in seconds, the CRM logs it, and a
      booking or follow-up goes out automatically.{" "}
      {PROOF_STATS.map((s) => `${s.value}${s.suffix} ${s.label}`).join(", ")}.
      Book a free 30-minute check-up.
    </p>
  );

  // IMPORTANT: this component NEVER conditionally swaps its own top-level
  // returned element type on `mode`. Both the static-fallback markup and
  // the scene markup are always present in the DOM; only `display` (CSS)
  // and the WebGL <canvas> itself are toggled. Earlier drafts returned an
  // entirely different tree per mode (a plain <div> for pending/fallback,
  // a <section> with the pin target + panels for scene) — the mode flip
  // that every qualifying desktop browser goes through on mount forced
  // React to delete and remount that whole subtree, and on this specific
  // route (BundlesSection, imported below, also runs its own mount-time
  // layout effect + ScrollTrigger pin) that produced intermittent
  // insertBefore/removeChild NotFoundErrors in manual QA — reproducible
  // regardless of GSAP pin/Canvas/CountUp being involved, i.e. it was the
  // bare top-level structural swap itself, not any one piece inside it.
  // A stable top-level structure with CSS-only visibility toggling sidesteps
  // the whole class of failure instead of chasing the exact GSAP/React
  // interaction that caused it.
  const showScene = mode === "scene";

  return (
    <div ref={wrapperRef} style={{ position: "relative" }}>
      {srSummary}

      <div style={{ display: showScene ? "none" : undefined }}>
        <V7StaticFallback />
      </div>

      <section
        aria-label="Stop losing customers while you're busy"
        style={{
          background: "var(--ink)",
          display: showScene ? undefined : "none",
        }}
      >
        {/* Same clearance band as V7StaticFallback.tsx — the sitewide fixed
            Header is transparent until scrollY 24, and every other route's
            hero is light enough for its dark logo/nav to stay legible over
            it. This full-bleed dark particle hero needs a light strip
            behind that same fixed footprint instead, so the header reads
            the same way here as everywhere else. */}
        <div
          aria-hidden="true"
          style={{
            height: "calc(var(--promo-h, 44px) + 64px)",
            background: "var(--cream-3)",
          }}
        />
        <div
          ref={pinTargetRef}
          className="relative overflow-hidden"
          style={{ height: "100svh" }}
        >
          {showScene && (
            <ParticleFieldCanvas
              progressRef={progressRef}
              active={intersecting && visible}
              onContextLost={handleContextLost}
            />
          )}

          {/* Ink scrim top/bottom so overlay copy stays legible over the
            particle field at any scrub point. */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              zIndex: 1,
              pointerEvents: "none",
              background:
                "linear-gradient(180deg, rgba(26,26,26,0.55) 0%, rgba(26,26,26,0) 24%, rgba(26,26,26,0) 62%, rgba(26,26,26,0.72) 100%)",
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

          {/* 4 crossfading content panels — one per morph state. Stacked
            absolute, opacity-driven by the ScrollTrigger onUpdate above
            (same technique as MachineBeat's caption crossfade, generalized
            from a single <p> to a full panel). */}
          <div
            className="container-x absolute"
            style={{
              zIndex: 2,
              left: 0,
              right: 0,
              bottom: "clamp(28px, 6vw, 64px)",
            }}
          >
            <div
              style={{
                position: "relative",
                minHeight: "clamp(260px, 40vw, 380px)",
              }}
            >
              {/* Panel 0 — hero */}
              <div
                ref={(el) => {
                  panelRefs.current[0] = el;
                }}
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: 1,
                  transition: "opacity 0.3s ease-out",
                }}
              >
                <div style={{ maxWidth: 640 }}>
                  <h1
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      letterSpacing: "-0.025em",
                      lineHeight: 1.08,
                      fontSize: "clamp(30px, 6.4vw, 58px)",
                      margin: "0 0 18px",
                      color: "var(--cream)",
                      wordBreak: "break-word",
                    }}
                  >
                    Stop losing customers{" "}
                    <span style={{ color: "var(--terracotta)" }}>
                      while you&rsquo;re busy.
                    </span>
                  </h1>
                  <p
                    style={{
                      fontSize: "clamp(15px, 2.2vw, 18px)",
                      color: "rgba(242,239,230,0.78)",
                      maxWidth: "52ch",
                      lineHeight: 1.55,
                      marginBottom: 24,
                    }}
                  >
                    We set up smart tools that reply to every new customer in
                    seconds, follow up for you automatically, and handle the
                    boring repeat work.
                  </p>
                  <Link
                    href="/discovery-call"
                    style={{
                      background: "var(--terracotta)",
                      color: "var(--cream-3)",
                      padding: "15px 26px",
                      fontFamily: "var(--font-sans)",
                      fontWeight: 600,
                      fontSize: 15,
                      borderRadius: 2,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      textDecoration: "none",
                      minHeight: 48,
                    }}
                  >
                    Book a free 30-min check-up
                    <ArrowRight style={{ width: 16, height: 16 }} />
                  </Link>
                </div>
              </div>

              {/* Panel 1 — workflow graph */}
              <div
                ref={(el) => {
                  panelRefs.current[1] = el;
                }}
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: 0,
                  transition: "opacity 0.3s ease-out",
                }}
              >
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: "clamp(24px, 4.6vw, 38px)",
                    lineHeight: 1.2,
                    color: "var(--cream)",
                    maxWidth: "18ch",
                  }}
                >
                  {CAPTIONS[1]}
                </h2>
              </div>

              {/* Panel 2 — proof / bar chart */}
              <div
                ref={(el) => {
                  panelRefs.current[2] = el;
                }}
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: 0,
                  transition: "opacity 0.3s ease-out",
                }}
              >
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: "clamp(22px, 4.2vw, 34px)",
                    lineHeight: 1.2,
                    color: "var(--cream)",
                    marginBottom: 20,
                    maxWidth: "18ch",
                  }}
                >
                  {CAPTIONS[2]}
                </h2>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "clamp(14px, 3vw, 28px)",
                  }}
                >
                  {PROOF_STATS.map((s, i) => (
                    <div key={s.label}>
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 700,
                          fontSize: "clamp(24px, 4vw, 34px)",
                          color: "var(--terracotta)",
                          lineHeight: 1,
                          marginBottom: 4,
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        <span
                          ref={(el) => {
                            statRefs.current[i] = el;
                          }}
                        >
                          0
                        </span>
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 10,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          color: "rgba(242,239,230,0.65)",
                        }}
                      >
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Panel 3 — convergence CTA */}
              <div
                ref={(el) => {
                  panelRefs.current[3] = el;
                }}
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: 0,
                  transition: "opacity 0.3s ease-out",
                }}
              >
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "clamp(24px, 4.6vw, 38px)",
                    lineHeight: 1.2,
                    color: "var(--cream)",
                    marginBottom: 22,
                    maxWidth: "18ch",
                  }}
                >
                  {CAPTIONS[3]}
                </h2>
                <Link
                  href="/discovery-call"
                  style={{
                    background: "var(--terracotta)",
                    color: "var(--cream-3)",
                    padding: "17px 30px",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 700,
                    fontSize: 16,
                    borderRadius: 2,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    textDecoration: "none",
                    minHeight: 48,
                    boxShadow: "0 18px 44px rgba(0,0,0,0.4)",
                  }}
                >
                  Book a free 30-min check-up
                  <ArrowRight style={{ width: 16, height: 16 }} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
