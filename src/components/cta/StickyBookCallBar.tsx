"use client";

/**
 * StickyBookCallBar — sitewide CTA bar, cream editorial version.
 *
 * Psychology stack unchanged:
 *   - Cialdini scarcity ("3 slots left this week", real number from data/availability)
 *   - Fogg ability (1-click route to /discovery-call, no form first)
 *   - Hick's Law (1 destination, no choice paralysis)
 *
 * Behavior unchanged:
 *   - Hidden until scroll > 600px
 *   - Dismissible via X — sets localStorage for 24h
 *   - Desktop: top bar
 *   - Mobile: bottom-fixed pill bar
 *   - prefers-reduced-motion: fade only
 *   - Hidden on /discovery-call, /lp/*, /api/*
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, X } from "lucide-react";
import { SLOTS_LEFT_THIS_WEEK } from "@/data/availability";

const STORAGE_KEY = "skynet:sticky-cta:dismissed";
const DISMISS_TTL_MS = 24 * 60 * 60 * 1000; // 24h
const SCROLL_THRESHOLD_PX = 1200; // 2026-05-29: 600 → 1200, appears later/less pushy

export default function StickyBookCallBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Hide while a modal popup is open so only ONE overlay shows at a time.
  useEffect(() => {
    const h = (e: Event) => setModalOpen(Boolean((e as CustomEvent).detail));
    window.addEventListener("skynet:modal", h);
    return () => window.removeEventListener("skynet:modal", h);
  }, []);

  const disabled =
    pathname === "/discovery-call" ||
    pathname?.startsWith("/lp/") ||
    pathname?.startsWith("/api/");

  useEffect(() => {
    setMounted(true);
    if (disabled) return;
    if (typeof window === "undefined") return;

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const ts = parseInt(raw, 10);
        if (!Number.isNaN(ts) && Date.now() - ts < DISMISS_TTL_MS) return;
      }
    } catch {}

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const mqHandler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", mqHandler);

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        if (window.scrollY > SCROLL_THRESHOLD_PX) setVisible(true);
        else setVisible(false);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      mq.removeEventListener("change", mqHandler);
    };
  }, [disabled, pathname]);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {}
  };

  if (!mounted || disabled || modalOpen) return null;

  const baseTransition = reduceMotion
    ? "opacity 200ms ease"
    : "transform 320ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms ease";

  return (
    <>
      {/* DESKTOP: top bar — flat terracotta */}
      <div
        role="region"
        aria-label="Book a strategy call"
        className="hidden md:flex fixed top-0 left-0 right-0 z-40 items-center justify-center px-4 py-2.5"
        style={{
          background: "var(--terracotta)",
          color: "var(--cream-3)",
          fontFamily: "var(--font-sans)",
          transform: visible
            ? "translateY(0)"
            : reduceMotion
              ? "translateY(0)"
              : "translateY(-110%)",
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
          transition: baseTransition,
        }}
      >
        <div className="flex items-center gap-3 max-w-[1200px] w-full">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{
              background: "var(--cream-3)",
              animation: reduceMotion
                ? "none"
                : "skynet-cta-pulse 2.2s ease-in-out infinite",
            }}
            aria-hidden
          />
          <Link
            href="/discovery-call"
            className="flex-1 flex items-center gap-2"
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "var(--cream-3)",
              textDecoration: "none",
              fontFamily: "var(--font-mono)",
              textTransform: "uppercase",
              letterSpacing: "0.10em",
            }}
          >
            <span>
              Book a 30-min strategy call ·{" "}
              <span style={{ fontWeight: 700 }}>
                {SLOTS_LEFT_THIS_WEEK} slots left this week
              </span>
            </span>
            <ArrowRight className="w-3.5 h-3.5" style={{ color: "var(--cream-3)" }} />
          </Link>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss for 24 hours"
            className="w-7 h-7 flex items-center justify-center transition"
            style={{
              color: "rgba(250, 247, 240, 0.80)",
              background: "transparent",
              border: "none",
              borderRadius: 2,
              cursor: "pointer",
            }}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* MOBILE: bottom pill — cream-3 with terracotta button */}
      <div
        role="region"
        aria-label="Book a strategy call"
        className="md:hidden fixed left-3 right-3 z-40 flex items-center gap-2 px-3 py-3"
        style={{
          bottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)",
          background: "var(--cream-3)",
          border: "1px solid rgba(26,26,26,0.18)",
          borderRadius: 2,
          fontFamily: "var(--font-sans)",
          transform: visible
            ? "translateY(0)"
            : reduceMotion
              ? "translateY(0)"
              : "translateY(160%)",
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
          transition: baseTransition,
          boxShadow: "0 18px 40px rgba(26,26,26,0.22)",
        }}
      >
        <span
          className="inline-block w-2 h-2 rounded-full shrink-0"
          style={{
            background: "var(--terracotta)",
            animation: reduceMotion
              ? "none"
              : "skynet-cta-pulse 2.2s ease-in-out infinite",
          }}
          aria-hidden
        />
        <Link
          href="/discovery-call"
          className="flex-1 leading-snug"
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "var(--ink)",
            textDecoration: "none",
          }}
        >
          Book a 30-min call ·{" "}
          <span style={{ color: "var(--terracotta)", fontWeight: 700 }}>
            {SLOTS_LEFT_THIS_WEEK} slots left
          </span>
        </Link>
        <Link
          href="/discovery-call"
          className="inline-flex items-center justify-center shrink-0"
          style={{
            background: "var(--terracotta)",
            color: "var(--cream-3)",
            padding: "10px 14px",
            borderRadius: 2,
            fontSize: 12,
            fontWeight: 700,
            textDecoration: "none",
            minHeight: 40,
          }}
        >
          Book
          <ArrowRight className="w-3 h-3 ml-1" />
        </Link>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss for 24 hours"
          className="flex items-center justify-center shrink-0"
          style={{
            width: 32,
            height: 32,
            color: "var(--ink-faint)",
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <style jsx global>{`
        @keyframes skynet-cta-pulse {
          0%, 100% {
            opacity: 0.55;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.35);
          }
        }
      `}</style>
    </>
  );
}
