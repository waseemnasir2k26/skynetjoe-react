"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createInkFlow, type InkFlowHandle } from "./inkShader";
import { getGsap } from "@/components/home/gsapClient";
import MagneticButton from "@/components/home/MagneticButton";

// Copy reused verbatim from HeroFunnel.tsx (proven homepage hero) — no new
// claims. Word-split for the per-word stagger reveal (SSR-safe: joined
// string is what search engines/no-JS readers see; this route is noindex
// anyway, but we keep the text real regardless).
const HEADLINE_A = "Stop losing customers";
const HEADLINE_B = "while you're busy.";
const SUB =
  "We set up smart tools that reply to every new customer in seconds, follow up for you automatically, and handle the boring repeat work — so you win more jobs without working more hours.";

function WordStagger({
  text,
  accent = false,
}: {
  text: string;
  accent?: boolean;
}) {
  const words = text.split(" ");
  return (
    <span style={{ display: "inline" }}>
      {words.map((w, i) => (
        <span
          key={i}
          className="v3-word-mask"
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "top",
          }}
        >
          <span
            className="v3-word-inner"
            style={{
              display: "inline-block",
              color: accent ? "var(--terracotta-aa)" : "var(--ink)",
            }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </span>
  );
}

export default function InkShaderHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const [staticFallback, setStaticFallback] = useState(false);
  const [ready, setReady] = useState(false);

  // Shader mount + IntersectionObserver kill + ScrollTrigger order-scrub.
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // Shader mount requires a real desktop pointer, not just a wide
    // viewport — touch tablets (iPad landscape etc.) match min-width:768
    // but have no fine pointer, so they'd otherwise get the full WebGL
    // cost for a hover/mouse-driven effect they can't use.
    const desktopMq = window.matchMedia?.(
      "(min-width: 768px) and (pointer: fine)",
    );
    const isDesktopPointer = desktopMq?.matches ?? false;

    if (reduce || !isDesktopPointer) {
      // Deferred a tick (not called synchronously in the effect body) to
      // avoid a same-frame cascading re-render — functionally identical
      // timing (fires before the next paint either way), just satisfies
      // the "don't setState directly in an effect" rule.
      queueMicrotask(() => {
        setStaticFallback(true);
        setReady(true);
      });
      return;
    }

    let handle: InkFlowHandle | null = null;
    let io: IntersectionObserver | null = null;
    let onResize: (() => void) | null = null;
    let scrollTriggerInstance: { kill: () => void } | null = null;
    let mqListener: (() => void) | null = null;

    // Defer to next frame so layout is settled before we size the canvas.
    const raf = requestAnimationFrame(() => {
      try {
        handle = createInkFlow(canvas, { dprCap: 1.5, trailDivisor: 3 });
      } catch {
        handle = null;
      }
      if (!handle) {
        setStaticFallback(true);
        setReady(true);
        return;
      }
      handle.start();
      setReady(true);

      onResize = () => handle?.resize();
      window.addEventListener("resize", onResize);

      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) handle?.start();
            else handle?.stop();
          }
        },
        { threshold: 0.05 },
      );
      io.observe(section);

      // Scroll scrubs turbulence -> order across hero -> section-2 boundary.
      const { gsap, ScrollTrigger } = getGsap();
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => handle?.setOrder(self.progress),
      });
      scrollTriggerInstance = st;
      void gsap;

      // Desktop -> mobile/touch mid-session switch (e.g. rotating a
      // convertible, or DevTools device-mode toggle): tear the shader
      // handle down and drop to the static fallback rather than leaving a
      // dead canvas mounted for a pointer that no longer qualifies.
      mqListener = () => {
        if (!desktopMq.matches) {
          handle?.destroy();
          handle = null;
          setStaticFallback(true);
        }
      };
      desktopMq.addEventListener?.("change", mqListener);
    });

    return () => {
      cancelAnimationFrame(raf);
      if (onResize) window.removeEventListener("resize", onResize);
      if (mqListener) desktopMq.removeEventListener?.("change", mqListener);
      io?.disconnect();
      scrollTriggerInstance?.kill();
      handle?.destroy();
    };
  }, []);

  // Word-stagger reveal — headline starts in its final SSR position (no
  // CLS); gsap.from() animates it up out of a masked overflow-hidden row,
  // matching the Reveal.tsx convention used sitewide. Runs on mount,
  // independent of the shader's `ready` flag — the shader (WebGL init,
  // sometimes a full extra RAF tick) and the headline are unrelated, and
  // gating the text reveal on shader readiness caused a double-paint
  // (words visible in final SSR position, THEN the stagger fires late).
  useEffect(() => {
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce || !headlineRef.current) return;

    const { gsap } = getGsap();
    const words =
      headlineRef.current.querySelectorAll<HTMLElement>(".v3-word-inner");
    const ctx = gsap.context(() => {
      gsap.from(words, {
        yPercent: 115,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.045,
        delay: 0.15,
      });
    }, headlineRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="v3-hero relative overflow-hidden"
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
      {/* WebGL canvas — behind text, killed on scroll-out. */}
      {!staticFallback && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            zIndex: 0,
          }}
        />
      )}

      {/* Static premium fallback: mobile / reduced-motion / no-WebGL.
          Layered radial gradients + CSS grain — intentional, not a blank box. */}
      {staticFallback && (
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            zIndex: 0,
            background: `
              radial-gradient(at 20% 25%, rgba(198,107,63,0.30) 0, transparent 52%),
              radial-gradient(at 78% 15%, rgba(26,26,26,0.10) 0, transparent 46%),
              radial-gradient(at 55% 85%, rgba(198,107,63,0.18) 0, transparent 55%),
              radial-gradient(at 90% 90%, rgba(26,26,26,0.08) 0, transparent 50%),
              var(--cream-3)
            `,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.05,
              mixBlendMode: "multiply",
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
            }}
          />
        </div>
      )}

      {/* Cream scrim so text stays legible over the ink field at any point. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background:
            "linear-gradient(180deg, rgba(242,239,230,0.15) 0%, rgba(242,239,230,0.55) 62%, rgba(242,239,230,0.88) 100%)",
        }}
      />

      <div
        className="container-x relative"
        style={{
          zIndex: 2,
          paddingLeft: "clamp(16px, 5vw, 24px)",
          paddingRight: "clamp(16px, 5vw, 24px)",
        }}
      >
        <div style={{ maxWidth: 760 }}>
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
            V3 preview · shader ink-flow
          </div>

          <h1
            ref={headlineRef}
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              lineHeight: 1.08,
              fontSize: "clamp(34px, 8.4vw, 76px)",
              margin: "0 0 24px",
              wordBreak: "break-word",
            }}
          >
            <WordStagger text={HEADLINE_A} />{" "}
            <WordStagger text={HEADLINE_B} accent />
          </h1>

          <p
            style={{
              fontSize: "clamp(17px, 4vw, 20px)",
              color: "var(--ink-2)",
              maxWidth: "54ch",
              lineHeight: 1.6,
              marginBottom: 32,
            }}
          >
            {SUB}
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
              — Scroll: watch the ink find order
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
