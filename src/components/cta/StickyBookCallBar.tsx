"use client";

/**
 * StickyBookCallBar — global sitewide CTA bar.
 *
 * Psychology stack:
 *   - Cialdini scarcity ("3 slots left this week", real number from data/availability)
 *   - Fogg ability (1-click route to /discovery-call, no form first)
 *   - Hick's Law (1 destination, no choice paralysis)
 *
 * Behavior:
 *   - Hidden until scroll > 600px (don't compete with hero CTAs)
 *   - Dismissible via X — sets localStorage for 24h (don't nag)
 *   - Desktop: slides in from TOP
 *   - Mobile (<768px): bottom-fixed pill bar (thumb-zone)
 *   - prefers-reduced-motion: fade only, no slide
 *   - Hidden on /discovery-call itself (don't sell what they're already on)
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, X } from "lucide-react";
import { SLOTS_LEFT_THIS_WEEK } from "@/data/availability";

const STORAGE_KEY = "skynet:sticky-cta:dismissed";
const DISMISS_TTL_MS = 24 * 60 * 60 * 1000; // 24h
const SCROLL_THRESHOLD_PX = 600;

export default function StickyBookCallBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const disabled =
    pathname === "/discovery-call" ||
    pathname?.startsWith("/lp/") ||
    pathname?.startsWith("/api/");

  useEffect(() => {
    setMounted(true);
    if (disabled) return;
    if (typeof window === "undefined") return;

    // Check dismissal TTL
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const ts = parseInt(raw, 10);
        if (!Number.isNaN(ts) && Date.now() - ts < DISMISS_TTL_MS) return;
      }
    } catch {}

    // Reduced motion
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

  if (!mounted || disabled) return null;

  const baseTransition = reduceMotion
    ? "opacity 200ms ease"
    : "transform 320ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms ease";

  return (
    <>
      {/* DESKTOP: top bar */}
      <div
        role="region"
        aria-label="Book a strategy call"
        className="hidden md:flex fixed top-0 left-0 right-0 z-[60] items-center justify-center px-4 py-2.5"
        style={{
          background:
            "linear-gradient(90deg, rgba(6,24,39,0.96) 0%, rgba(10,45,74,0.96) 50%, rgba(7,56,70,0.96) 100%)",
          borderBottom: "1px solid rgba(126, 228, 255, 0.22)",
          backdropFilter: "blur(14px) saturate(140%)",
          WebkitBackdropFilter: "blur(14px) saturate(140%)",
          transform: visible
            ? "translateY(0)"
            : reduceMotion
              ? "translateY(0)"
              : "translateY(-110%)",
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
          transition: baseTransition,
          boxShadow: "0 6px 24px -10px rgba(0, 212, 255, 0.30)",
        }}
      >
        <div className="flex items-center gap-3 max-w-[1200px] w-full">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{
              background: "#FF6B9D",
              boxShadow: "0 0 12px rgba(255, 107, 157, 0.65)",
              animation: reduceMotion
                ? "none"
                : "skynet-cta-pulse 2.2s ease-in-out infinite",
            }}
            aria-hidden
          />
          <Link
            href="/discovery-call"
            className="flex-1 text-sm font-medium text-white hover:text-cyan-200 transition flex items-center gap-2"
          >
            <span>
              Book a 30-min strategy call ·{" "}
              <span className="text-cyan-300 font-semibold">
                {SLOTS_LEFT_THIS_WEEK} slots left this week
              </span>
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-cyan-300" />
          </Link>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss for 24 hours"
            className="w-7 h-7 rounded-md flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* MOBILE: bottom pill bar (T23) */}
      <div
        role="region"
        aria-label="Book a strategy call"
        className="md:hidden fixed bottom-3 left-3 right-3 z-[60] flex items-center gap-2 px-4 py-3 rounded-2xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(6,24,39,0.97) 0%, rgba(10,45,74,0.97) 100%)",
          border: "1px solid rgba(126, 228, 255, 0.32)",
          backdropFilter: "blur(14px) saturate(140%)",
          WebkitBackdropFilter: "blur(14px) saturate(140%)",
          transform: visible
            ? "translateY(0)"
            : reduceMotion
              ? "translateY(0)"
              : "translateY(160%)",
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
          transition: baseTransition,
          boxShadow: "0 12px 30px -8px rgba(0, 212, 255, 0.45)",
        }}
      >
        <span
          className="inline-block w-2 h-2 rounded-full shrink-0"
          style={{
            background: "#FF6B9D",
            boxShadow: "0 0 12px rgba(255, 107, 157, 0.65)",
            animation: reduceMotion
              ? "none"
              : "skynet-cta-pulse 2.2s ease-in-out infinite",
          }}
          aria-hidden
        />
        <Link
          href="/discovery-call"
          className="flex-1 text-[13px] font-semibold text-white leading-snug"
        >
          Book a 30-min call ·{" "}
          <span className="text-cyan-300">{SLOTS_LEFT_THIS_WEEK} slots left</span>
        </Link>
        <Link
          href="/discovery-call"
          className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-xs font-bold text-white shrink-0"
          style={{
            background: "linear-gradient(135deg, #FF6B9D 0%, #FF8FB1 100%)",
            boxShadow: "0 4px 14px rgba(255, 107, 157, 0.45)",
          }}
        >
          Book
          <ArrowRight className="w-3 h-3 ml-1" />
        </Link>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss for 24 hours"
          className="w-6 h-6 rounded-md flex items-center justify-center text-white/60 hover:text-white shrink-0"
        >
          <X className="w-3 h-3" />
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
