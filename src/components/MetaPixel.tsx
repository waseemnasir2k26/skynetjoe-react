"use client";

import { useEffect, useSyncExternalStore } from "react";
import Link from "next/link";

/**
 * Meta Pixel, consent-gated (2026-10-07, owner ruling: ads paused, gate it).
 *
 *  - Nothing from Meta is requested (no connect.facebook.net script, hence no
 *    _fbp cookie) until the visitor presses "Accept".
 *  - Never loads, and never shows the bar, when Do-Not-Track or Global Privacy
 *    Control is on. The check is the same one SxoBeacon uses for its own beacon.
 *  - The choice is kept in localStorage (try/catch: Safari private mode etc.)
 *    and the bar is not shown again after a choice.
 *  - The old <noscript> tracking image is gone: it requested facebook.com/tr
 *    for every no-JS visitor with no way to ask first.
 *
 * <MetaPixel /> (mounted once, in the root layout) owns the bar and the load.
 * <MetaPixelEvents /> (lp/* pages) attaches the Lead / InitiateCheckout /
 * ViewContent listeners once fbq exists.
 */

// Pixel IDs are public by nature (visible in every page that fires them).
// The fallback keeps the pixel alive even when the host builds without the
// env var — Hostinger builds on-host, and NEXT_PUBLIC_* is inlined at build
// time, so a missing panel var would otherwise silently ship a null pixel.
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1040197438955330";

const STORAGE_KEY = "sj_meta_consent";
const READY_EVENT = "sj-pixel-ready";

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  push?: unknown;
  loaded?: boolean;
  version?: string;
};
type PixelWindow = Window & {
  fbq?: Fbq;
  _fbq?: Fbq;
  doNotTrack?: string;
};

/** Exact DNT / GPC predicate from SxoBeacon.tsx — keep the two in sync. */
function privacySignalOn(): boolean {
  const w = window as PixelWindow;
  const nav = navigator as Navigator & {
    msDoNotTrack?: string;
    globalPrivacyControl?: boolean;
  };
  return (
    /^(1|yes)$/.test(
      String(nav.doNotTrack || w.doNotTrack || nav.msDoNotTrack || ""),
    ) || nav.globalPrivacyControl === true
  );
}

function readChoice(): "granted" | "denied" | null {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

function storeChoice(v: "granted" | "denied") {
  try {
    window.localStorage.setItem(STORAGE_KEY, v);
  } catch {
    /* storage blocked — choice just won't persist */
  }
  // First-party cookie mirror so the server can honour the same choice before
  // it mirrors a lead to Meta's Conversions API (see hasMetaConsent).
  try {
    document.cookie =
      v === "granted"
        ? `${STORAGE_KEY}=granted; Path=/; Max-Age=15552000; SameSite=Lax; Secure`
        : `${STORAGE_KEY}=; Path=/; Max-Age=0; SameSite=Lax; Secure`;
  } catch {
    /* cookies blocked — server treats the visitor as not consented */
  }
}

/** Standard Meta bootstrap, written out so it only runs after consent. */
function loadPixel() {
  const w = window as PixelWindow;
  if (!w.fbq) {
    const n: Fbq = function (...args: unknown[]) {
      if (n.callMethod) n.callMethod(...args);
      else n.queue!.push(args);
    };
    if (!w._fbq) w._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    w.fbq = n;
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(s);
    w.fbq("init", PIXEL_ID);
    w.fbq("track", "PageView");
  }
  window.dispatchEvent(new Event(READY_EVENT));
}

// Tiny external store so the bar can read localStorage without a
// setState-in-effect, and so the server snapshot ("off") matches hydration.
const listeners = new Set<() => void>();
let decidedThisSession = false; // covers browsers where storage is blocked
function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}
/** "ask" = show the bar; "off" = decided, DNT/GPC, or no pixel id. */
function getSnapshot(): "ask" | "off" {
  if (!PIXEL_ID || decidedThisSession || privacySignalOn()) return "off";
  return readChoice() ? "off" : "ask";
}
const getServerSnapshot = (): "ask" | "off" => "off";

export function MetaPixel() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Returning visitor who already accepted: load straight away.
  useEffect(() => {
    if (!PIXEL_ID || privacySignalOn()) return;
    if (readChoice() === "granted") loadPixel();
  }, []);

  if (state !== "ask") return null;

  const decide = (v: "granted" | "denied") => {
    storeChoice(v);
    decidedThisSession = true;
    if (v === "granted") loadPixel();
    listeners.forEach((cb) => cb());
  };

  return (
    <div
      role="region"
      aria-label="Advertising cookie choice"
      className="fixed left-3 right-3 top-[68px] sm:top-auto sm:bottom-3 sm:right-auto z-[70] sm:max-w-[420px]"
      style={{
        background: "var(--cream-3)",
        color: "var(--ink)",
        border: "1px solid var(--ink)",
        borderRadius: 2,
        padding: "10px 14px",
        boxShadow: "0 8px 28px rgba(26,26,26,0.18)",
      }}
    >
      <p style={{ fontSize: "0.875rem", lineHeight: 1.5, margin: 0 }}>
        {/* Phones get the short form so the bar stays clear of the header
            menu above it and the hero / sticky CTAs below it. */}
        <span className="sm:hidden">
          OK to load Meta&apos;s ad pixel? It sets cookies.{" "}
        </span>
        <span className="hidden sm:inline">
          May we load Meta&apos;s advertising pixel to measure our ads? It sets
          cookies. Our pages send nothing to Meta unless you accept. The
          Calendly booking widget opens only when you ask for it and loads
          Meta’s script inside its own frame.{" "}
        </span>
        <Link
          href="/privacy-policy"
          style={{ color: "var(--terracotta-aa)", textDecoration: "underline" }}
        >
          Privacy policy
        </Link>
      </p>
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <button
          type="button"
          onClick={() => decide("granted")}
          style={{
            background: "var(--terracotta-aa)",
            color: "var(--cream-3)",
            border: "1px solid var(--terracotta-aa)",
            borderRadius: 2,
            padding: "8px 16px",
            fontSize: "0.8125rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => decide("denied")}
          style={{
            background: "transparent",
            color: "var(--ink)",
            border: "1px solid var(--ink)",
            borderRadius: 2,
            padding: "8px 16px",
            fontSize: "0.8125rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Decline
        </button>
      </div>
    </div>
  );
}

export function MetaPixelEvents() {
  useEffect(() => {
    if (!PIXEL_ID) return;
    let attached = false;
    let onScroll: (() => void) | null = null;

    function attach() {
      const w = window as PixelWindow;
      if (attached || !w.fbq) return;
      attached = true;
      const track = (...a: unknown[]) => w.fbq && w.fbq(...a);
      // Lead: form submit on email capture
      document
        .querySelectorAll<HTMLElement>("form[data-meta-event]")
        .forEach((f) =>
          f.addEventListener("submit", () =>
            track("track", f.dataset.metaEvent || "Lead"),
          ),
        );
      // InitiateCheckout: pricing card CTAs
      document
        .querySelectorAll<HTMLElement>(
          "a[data-meta-event],button[data-meta-event]",
        )
        .forEach((el) =>
          el.addEventListener("click", () =>
            track("track", el.dataset.metaEvent || "InitiateCheckout", {
              content_name: el.dataset.metaName || "",
              value: el.dataset.metaValue || "",
              currency: "USD",
            }),
          ),
        );
      // ViewContent: fire when user scrolls past 50% of viewport
      let fired = false;
      onScroll = () => {
        if (fired) return;
        if (window.scrollY > window.innerHeight * 0.5) {
          fired = true;
          track("track", "ViewContent");
          if (onScroll) window.removeEventListener("scroll", onScroll);
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    attach(); // consent already given on an earlier visit
    window.addEventListener(READY_EVENT, attach); // consent given just now
    return () => {
      window.removeEventListener(READY_EVENT, attach);
      if (onScroll) window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return null;
}
