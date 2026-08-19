"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "sj-hostinger-promo-v1";
const HOSTINGER_URL = "https://www.hostinger.com?REFERRALCODE=skynetlabs";

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
 */
export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === "1") {
        setVisible(false);
      }
    } catch {
      // localStorage unavailable (privacy mode, etc.) — leave bar visible.
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore write failures
    }
  };

  if (!visible) return null;

  return (
    <div
      style={{
        background: "var(--ink)",
        color: "var(--cream-3)",
      }}
    >
      <div
        className="container-x flex items-center justify-center gap-x-3 gap-y-0.5 px-4 sm:px-6 flex-wrap"
        style={{ minHeight: 40, padding: "6px 16px" }}
      >
        <p
          className="flex items-center gap-x-2 flex-wrap justify-center text-center"
          style={{
            fontSize: 13,
            lineHeight: 1.4,
            margin: 0,
            fontFamily: "var(--font-sans)",
          }}
        >
          <span>We host on Hostinger — get up to 20% off your first plan.</span>
          <a
            href={HOSTINGER_URL}
            target="_blank"
            rel="sponsored noopener"
            className="font-semibold underline-offset-2 hover:underline"
            style={{ color: "var(--terracotta)" }}
          >
            Get the link →
          </a>
          <span
            className="hidden sm:inline"
            style={{ opacity: 0.65, fontSize: 12 }}
          >
            Referral link — we may earn a commission at no extra cost to you.
          </span>
          <span className="sr-only sm:hidden">
            Referral link — we may earn a commission at no extra cost to you.
          </span>
        </p>

        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss announcement"
          className="inline-flex items-center justify-center flex-shrink-0"
          style={{
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
