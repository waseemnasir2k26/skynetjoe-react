"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { getGsap } from "@/components/home/gsapClient";
import MagneticButton from "@/components/home/MagneticButton";
import { BUNDLES, type Bundle } from "./bundlesData";

/**
 * Bundled "big-problem-solver" offers — replaces the old 5-simple-service
 * ServiceStrip. Same proven pin mechanism as ServiceStrip.tsx (GSAP
 * ScrollTrigger horizontal scrub, desktop + fine-pointer only, plain
 * vertical stack + native scroll everywhere else) — reused deliberately
 * rather than inventing a new per-card pin choreography, since that
 * mechanism already has a track record on this route.
 */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const DESKTOP_QUERY = "(min-width: 768px) and (pointer: fine)";

function BundleCard({ b, isDesktop }: { b: Bundle; isDesktop: boolean }) {
  return (
    <div
      style={{
        flex: isDesktop ? "0 0 min(78vw, 620px)" : "1 1 auto",
        minHeight: isDesktop ? "min(74vh, 660px)" : undefined,
        display: "flex",
        flexDirection: "column",
        background: b.flagship ? "var(--ink)" : "var(--cream-3)",
        border: b.flagship
          ? "1px solid rgba(198,107,63,0.4)"
          : "1px solid rgba(26,26,26,0.12)",
        borderRadius: 4,
        padding: isDesktop
          ? "clamp(36px, 4vw, 52px)"
          : "clamp(24px, 5vw, 32px)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          color: b.flagship ? "var(--terracotta)" : "var(--terracotta-aa)",
          marginBottom: 14,
        }}
      >
        {b.eyebrow}
      </div>

      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: isDesktop ? 24 : 20,
          lineHeight: 1.25,
          color: b.flagship ? "var(--cream)" : "var(--ink)",
          marginBottom: 10,
        }}
      >
        {b.painHeadline}
      </h3>

      <div
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: isDesktop ? 17 : 15,
          fontWeight: 600,
          color: b.flagship ? "var(--terracotta)" : "var(--terracotta-aa)",
          marginBottom: isDesktop ? 22 : 16,
        }}
      >
        → {b.name}
      </div>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: "0 0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {b.whatsInside.map((item) => (
          <li
            key={item}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              fontSize: isDesktop ? 14.5 : 13.5,
              lineHeight: 1.55,
              color: b.flagship ? "rgba(242,239,230,0.82)" : "var(--ink-2)",
            }}
          >
            <Check
              style={{
                width: 15,
                height: 15,
                marginTop: 3,
                flexShrink: 0,
                color: "var(--terracotta-aa)",
              }}
              strokeWidth={2.5}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {b.proofLine && (
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11.5,
            lineHeight: 1.5,
            color: b.flagship ? "rgba(242,239,230,0.65)" : "var(--ink-faint)",
            borderTop: b.flagship
              ? "1px solid rgba(242,239,230,0.14)"
              : "1px solid rgba(26,26,26,0.1)",
            paddingTop: 14,
            marginTop: 22,
          }}
        >
          — {b.proofLine}
        </p>
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 16,
          marginTop: 24,
        }}
      >
        {b.price && (
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: isDesktop ? 22 : 19,
              color: "var(--cream)",
            }}
          >
            {b.price.setup}{" "}
            <span
              style={{
                fontSize: isDesktop ? 14 : 12.5,
                fontWeight: 500,
                color: "rgba(242,239,230,0.6)",
              }}
            >
              + {b.price.monthly}
            </span>
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 20,
          marginTop: 18,
        }}
      >
        <MagneticButton>
          <Link
            href="/discovery-call"
            style={{
              background: "var(--terracotta)",
              color: "var(--cream-3)",
              padding: "13px 22px",
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: 14,
              borderRadius: 2,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              textDecoration: "none",
              minHeight: 44,
            }}
          >
            Book a free 30-min check-up
            <ArrowRight style={{ width: 14, height: 14 }} />
          </Link>
        </MagneticButton>

        {!b.flagship && (
          <Link
            href="/pricing"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: b.flagship ? "var(--cream)" : "var(--ink)",
              textDecoration: "underline",
              textUnderlineOffset: 4,
            }}
          >
            See pricing
          </Link>
        )}

        {b.freeEntry && (
          <Link
            href={b.freeEntry.href}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--terracotta-aa)",
              textDecoration: "underline",
              textUnderlineOffset: 4,
            }}
          >
            {b.freeEntry.label}
          </Link>
        )}
      </div>
    </div>
  );
}

export default function BundlesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    setIsDesktop(mq.matches);
    const onChange = () => setIsDesktop(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    const { gsap, ScrollTrigger } = getGsap();
    const ctx = gsap.context(() => {
      const distance = track.scrollWidth - section.clientWidth;
      if (distance <= 0) return;
      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance + section.clientWidth * 0.4}`,
          scrub: 0.6,
          pin: true,
          pinSpacing: true,
          pinType: "transform",
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [isDesktop]);

  return (
    <section
      ref={sectionRef}
      className="v3-bundles-section section relative overflow-hidden"
      style={{
        background: "var(--cream-2)",
        color: "var(--ink)",
        fontFamily: "var(--font-sans)",
        borderBottom: "1px solid rgba(26,26,26,0.12)",
      }}
    >
      <div
        className="container-x"
        style={{
          paddingLeft: "clamp(16px, 5vw, 24px)",
          paddingRight: "clamp(16px, 5vw, 24px)",
          marginBottom: 32,
        }}
      >
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
          Bundled fixes, not a-la-carte tasks
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            fontSize: "clamp(26px, 6vw, 40px)",
            margin: 0,
            maxWidth: "28ch",
          }}
        >
          Three problems.{" "}
          <span style={{ color: "var(--terracotta-aa)" }}>
            Three systems that end them.
          </span>
        </h2>
      </div>

      <div
        ref={trackRef}
        className="v3-bundles-track"
        style={{
          display: "flex",
          flexDirection: isDesktop ? "row" : "column",
          gap: "clamp(16px, 3vw, 24px)",
          paddingLeft: "clamp(16px, 5vw, 24px)",
          paddingRight: "clamp(16px, 5vw, 24px)",
          willChange: isDesktop ? "transform" : undefined,
        }}
      >
        {BUNDLES.map((b) => (
          <BundleCard key={b.id} b={b} isDesktop={isDesktop} />
        ))}
      </div>
    </section>
  );
}
