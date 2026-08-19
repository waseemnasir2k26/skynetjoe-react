"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "sj-hostinger-promo-v1";
const HOSTINGER_URL = "https://www.hostinger.com?REFERRALCODE=skynetlabs";
const PROMO_H_VAR = "--promo-h";

/**
 * Hostinger referral announcement bar — rendered as the first child inside
 * the fixed <header> so it sits above the nav row and mega-menus (which
 * anchor with `top-full` off the header) still line up correctly.
 *
 * Persistence: optimistic `useState(true)` (visible) so there's no
 * server/client mismatch on first paint; a `useEffect` reads localStorage
 * on mount and hides the bar if previously dismissed. Returning visitors who
 * dismissed it may see a brief flash before the effect runs — accepted
 * trade-off per spec, avoids hydration errors from reading localStorage
 * during render.
 *
 * Clearance: the bar's real height is written to `--promo-h` on
 * `document.documentElement` via ResizeObserver so every fixed-header-offset
 * consumer (HeroFunnel, loading skeleton, HtmlCreamWrap, Breadcrumbs, mobile
 * drawer max-height) stays in sync instead of assuming a static px value —
 * the bar wraps to 2-3 lines on narrow viewports. When dismissed/unmounted
 * the var drops to 0px so there's no dead gap.
 */
export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === "1") {
        setVisible(false);
      }
    } catch {
      // localStorage unavailable (privacy mode, etc.) — leave bar visible.
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!visible || !barRef.current) {
      document.documentElement.style.setProperty(PROMO_H_VAR, "0px");
      return;
    }

    const el = barRef.current;
    const setHeight = () => {
      document.documentElement.style.setProperty(
        PROMO_H_VAR,
        `${el.offsetHeight}px`,
      );
    };

    setHeight();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", setHeight);
      return () => window.removeEventListener("resize", setHeight);
    }

    const observer = new ResizeObserver(setHeight);
    observer.observe(el);

    return () => observer.disconnect();
  }, [visible]);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined") {
        document.documentElement.style.setProperty(PROMO_H_VAR, "0px");
      }
    };
  }, []);

  const dismiss = () => {
    setVisible(false);
    if (typeof window !== "undefined") {
      document.documentElement.style.setProperty(PROMO_H_VAR, "0px");
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore write failures
    }
  };

  if (!visible) return null;

  return (
    <div
      ref={barRef}
      style={{
        background: "var(--ink)",
        color: "var(--cream-3)",
      }}
    >
      <div
        className="container-x flex items-start sm:items-center justify-center gap-x-3 gap-y-1 px-4 sm:px-6 flex-wrap relative"
        style={{ minHeight: 40, padding: "8px 40px 8px 16px" }}
      >
        <div
          className="flex flex-col items-center gap-y-0.5 text-center"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <p
            className="flex items-center gap-x-2 flex-wrap justify-center text-center"
            style={{
              fontSize: 13,
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            <span>
              We host on Hostinger — get up to 20% off your first plan.
            </span>
            <a
              href={HOSTINGER_URL}
              target="_blank"
              rel="sponsored noopener"
              className="font-semibold underline-offset-2 hover:underline"
              style={{ color: "var(--terracotta)" }}
            >
              Get the link →
            </a>
          </p>
          <span
            className="block sm:hidden"
            style={{ opacity: 0.7, fontSize: 10.5, lineHeight: 1.3 }}
          >
            Referral link · we may earn a commission
          </span>
          <span
            className="hidden sm:inline"
            style={{ opacity: 0.65, fontSize: 12 }}
          >
            Referral link — we may earn a commission at no extra cost to you.
          </span>
        </div>

        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss announcement"
          className="inline-flex items-center justify-center flex-shrink-0 absolute"
          style={{
            top: 6,
            right: 10,
            width: 24,
            height: 24,
            minWidth: 24,
            minHeight: 24,
            color: "var(--cream-3)",
            opacity: 0.75,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.75")}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
