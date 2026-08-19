"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import MagneticButton from "@/components/home/MagneticButton";
import { isWebGLAvailable, prefersReducedMotion } from "./webgl";
import HeroStaticFallback from "./HeroStaticFallback";

// Rapier's WASM binding + the whole R3F scene graph is client-only and
// heavy — split into its own chunk, never touches the SSR bundle. `active`
// prop (IO + tab-visibility gated, computed by the parent below) controls
// whether the frame loop / physics step actually run once mounted.
const HeroPhysicsCanvas = dynamic(() => import("./HeroPhysicsCanvas"), {
  ssr: false,
  loading: () => null,
});

/**
 * V8 "Workshop" hero. The H1/sub/CTA are plain SSR markup in the left copy
 * column — this is what search engines, no-JS readers, and the LCP
 * measurement see; the 3D pile is a decorative, client-only layer behind it
 * that never blocks or delays the text paint.
 *
 * Mode decision (desktop AND mobile/touch both get the live scene — only
 * prefers-reduced-motion, no-WebGL, or a low-power device drop to the
 * static illustrated fallback):
 *   prefers-reduced-motion -> fallback
 *   WebGL unavailable -> fallback
 *   hardwareConcurrency <= 2 or deviceMemory <= 2 (low-power signal) -> fallback
 *   else -> live rapier physics scene
 */
export default function HeroWorkshop() {
  const wrapperRef = useRef<HTMLElement | null>(null);
  const [mode, setMode] = useState<"pending" | "scene" | "fallback">("pending");
  const [intersecting, setIntersecting] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const webgl = isWebGLAvailable();
    const nav = navigator as Navigator & {
      deviceMemory?: number;
    };
    const lowPower =
      (nav.hardwareConcurrency ?? 8) <= 2 || (nav.deviceMemory ?? 8) <= 2;
    queueMicrotask(() => {
      setMode(reduced || !webgl || lowPower ? "fallback" : "scene");
    });
  }, []);

  const onVisibilityChange = useCallback(() => {
    setVisible(!document.hidden);
  }, []);

  const handleContextLost = useCallback(() => {
    setMode("fallback");
  }, []);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(el);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [onVisibilityChange]);

  return (
    <section
      ref={wrapperRef}
      className="v8-hero relative overflow-hidden"
      style={{
        background: "var(--cream-3)",
        color: "var(--ink)",
        fontFamily: "var(--font-sans)",
        borderBottom: "1px solid rgba(26,26,26,0.12)",
        paddingTop: "calc(var(--promo-h, 44px) + clamp(16px, 4vw, 88px))",
        paddingBottom: "clamp(72px, 14vw, 128px)",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Ink floor-line — present in every mode, the 3D floor sits right on
          top of it once the scene mounts. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: "18%",
          height: 1,
          background: "rgba(26,26,26,0.14)",
          zIndex: 0,
        }}
      />

      {mode === "scene" && (
        <HeroPhysicsCanvas
          active={intersecting && visible}
          onContextLost={handleContextLost}
        />
      )}
      {mode !== "scene" && <HeroStaticFallback />}

      {/* Cream scrim so text stays legible over the pile at any settle
          point — matches the v3 hero's ink-scrim convention. This alone is
          only reliable on wide/landscape viewports (left column vs. right
          pile); on narrow/portrait viewports the world-to-screen mapping
          puts the pile behind the full-width text instead, so the copy card
          below (opaque background, not just a gradient) is the real
          legibility guarantee across every breakpoint. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background:
            "linear-gradient(90deg, rgba(242,239,230,0.96) 0%, rgba(242,239,230,0.72) 42%, rgba(242,239,230,0.08) 60%, rgba(242,239,230,0) 100%)",
        }}
      />

      <div
        className="container-x relative"
        style={{
          zIndex: 2,
          paddingLeft: "clamp(16px, 5vw, 24px)",
          paddingRight: "clamp(16px, 5vw, 24px)",
          width: "100%",
        }}
      >
        {/* Opaque "workshop note card" — guarantees H1/sub/CTA legibility
            over the pile at any viewport aspect, not just desktop's 2-column
            split. Reads as a deliberate object in the scene (an index card
            on the workbench), not a defensive box. */}
        <div
          style={{
            maxWidth: 620,
            background: "rgba(242,239,230,0.94)",
            backdropFilter: "blur(6px)",
            borderRadius: 6,
            padding: "clamp(20px, 4vw, 32px)",
            marginLeft: "clamp(-20px, -4vw, -32px)",
            boxShadow: "0 24px 60px rgba(26,26,26,0.08)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "var(--terracotta-aa)",
              marginBottom: 22,
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span
              style={{
                width: 28,
                height: 1,
                background: "var(--terracotta-aa)",
                display: "inline-block",
              }}
            />
            V8 preview · the workshop
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              lineHeight: 1.08,
              fontSize: "clamp(34px, 7.6vw, 68px)",
              margin: "0 0 24px",
              wordBreak: "break-word",
            }}
          >
            Stop losing customers{" "}
            <span style={{ color: "var(--terracotta-aa)" }}>
              while you&rsquo;re busy.
            </span>
          </h1>

          <p
            style={{
              fontSize: "clamp(17px, 4vw, 20px)",
              color: "var(--ink-2)",
              maxWidth: "48ch",
              lineHeight: 1.6,
              marginBottom: 32,
            }}
          >
            We set up smart tools that reply to every new customer in seconds,
            follow up for you automatically, and handle the boring repeat work —
            so you win more jobs without working more hours.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 24,
            }}
          >
            <MagneticButton>
              <Link
                href="/discovery-call"
                style={{
                  background: "var(--terracotta)",
                  color: "var(--cream-3)",
                  padding: "16px 28px",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: 15,
                  borderRadius: 2,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  transition: "background 0.18s",
                  textDecoration: "none",
                  minHeight: 48,
                  boxShadow: "0 18px 44px rgba(26,26,26,0.14)",
                }}
              >
                Book a free 30-min check-up
                <ArrowRight style={{ width: 16, height: 16 }} />
              </Link>
            </MagneticButton>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--ink-faint)",
              }}
            >
              — Grab a piece. Give it a toss.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
