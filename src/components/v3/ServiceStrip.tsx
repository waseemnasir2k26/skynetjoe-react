"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { getGsap } from "@/components/home/gsapClient";
import {
  Zap,
  Bot,
  Globe2,
  Search,
  MessageSquareText,
  type LucideIcon,
} from "lucide-react";

/**
 * "What we automate" — 5 panels, sourced from the SAME serviceType list
 * already published in the homepage JSON-LD ProfessionalService schema
 * (src/app/(skynet)/page.tsx): AI Automation, n8n Workflow, WordPress
 * Development, AEO/SEO, Chatbot Development. No new service claims.
 *
 * Desktop (>=768px): GSAP ScrollTrigger pins the section and scrubs the
 * track horizontally — a sticky-pinned "what we automate" strip.
 * Mobile (<768px): pin is never created; the track is a plain vertical
 * CSS stack (flex-direction: column), native scroll only.
 */
const SERVICES: {
  Icon: LucideIcon;
  title: string;
  body: string;
}[] = [
  {
    Icon: Zap,
    title: "AI Automation",
    body: "n8n workflows that pick up the boring, repeatable parts of running a business — quietly, in the background.",
  },
  {
    Icon: Bot,
    title: "n8n Workflow Builds",
    body: "Custom node graphs wired straight into the tools you already use — CRM, inbox, calendar, payments.",
  },
  {
    Icon: Globe2,
    title: "WordPress Development",
    body: "Fast, editable sites built for owners who need to change a price or a photo without calling a developer.",
  },
  {
    Icon: Search,
    title: "AEO / SEO",
    body: "Content and structure tuned for both classic search and the AI answer engines founders now discover you through.",
  },
  {
    Icon: MessageSquareText,
    title: "Chatbot Development",
    body: "A trained assistant that answers like you would — on the site, on WhatsApp, at 2am.",
  },
];

// SSR is a no-op for useLayoutEffect (and React warns about it), but this
// component only ever renders on the client behind "use client" — alias to
// a plain useEffect when `window` isn't there yet to keep the warning
// silent, and use the real layout effect once it is, so the very first
// client paint already has the correct row/column layout (no post-paint
// vertical->horizontal snap).
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Gate both the pin AND the row layout on a real desktop pointer, not just
// viewport width — touch tablets (iPad landscape etc.) match min-width:768
// but can't drive a scroll-scrubbed horizontal pin comfortably, so they get
// the plain vertical stack + native scroll instead.
const DESKTOP_QUERY = "(min-width: 768px) and (pointer: fine)";

export default function ServiceStrip() {
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
      className="v3-service-strip section relative overflow-hidden"
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
          What we automate
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            fontSize: "clamp(26px, 6vw, 40px)",
            margin: 0,
            maxWidth: "26ch",
          }}
        >
          Five automation{" "}
          <span style={{ color: "var(--terracotta-aa)" }}>wins.</span>
        </h2>
      </div>

      <div
        ref={trackRef}
        className="v3-service-track"
        style={{
          display: "flex",
          flexDirection: isDesktop ? "row" : "column",
          gap: "clamp(16px, 3vw, 24px)",
          paddingLeft: "clamp(16px, 5vw, 24px)",
          paddingRight: "clamp(16px, 5vw, 24px)",
          willChange: isDesktop ? "transform" : undefined,
        }}
      >
        {SERVICES.map(({ Icon, title, body }, i) => (
          <div
            key={title}
            style={{
              flex: isDesktop ? "0 0 min(34vw, 440px)" : "1 1 auto",
              // Pinned desktop viewport was reading as a mostly-empty
              // strip (~280px cards inside a ~635px-tall pinned section
              // on a 900px-tall viewport) — scale cards up so the pinned
              // frame reads as composed, not sparse.
              minHeight: isDesktop ? "min(70vh, 620px)" : undefined,
              display: isDesktop ? "flex" : undefined,
              flexDirection: isDesktop ? "column" : undefined,
              justifyContent: isDesktop ? "center" : undefined,
              background: "var(--cream-3)",
              border: "1px solid rgba(26,26,26,0.12)",
              borderRadius: 4,
              padding: isDesktop
                ? "clamp(40px, 4vw, 56px)"
                : "clamp(24px, 5vw, 32px)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: isDesktop ? 52 : 32,
                fontWeight: 700,
                color: "var(--terracotta-aa)",
                lineHeight: 1,
                marginBottom: isDesktop ? 22 : 14,
              }}
            >
              0{i + 1}
            </div>
            <span
              aria-hidden="true"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: isDesktop ? 60 : 44,
                height: isDesktop ? 60 : 44,
                borderRadius: 4,
                background: "rgba(198,107,63,0.08)",
                marginBottom: isDesktop ? 24 : 16,
              }}
            >
              <Icon
                style={{
                  width: isDesktop ? 28 : 22,
                  height: isDesktop ? 28 : 22,
                  color: "var(--terracotta-aa)",
                }}
                strokeWidth={2}
              />
            </span>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: isDesktop ? 26 : 20,
                fontWeight: 600,
                color: "var(--ink)",
                marginBottom: isDesktop ? 14 : 10,
                lineHeight: 1.25,
              }}
            >
              {title}
            </h3>
            <p
              style={{
                fontSize: isDesktop ? 17 : 14.5,
                color: "var(--ink-2)",
                lineHeight: 1.65,
              }}
            >
              {body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
