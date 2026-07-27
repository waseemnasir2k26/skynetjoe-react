"use client";

import { useEffect, useRef, useState } from "react";
import { PROOF_MODE, seededProofValue } from "@/lib/proof-mode";

/**
 * LiveVisitors — sitewide visitor-count pill (bottom-left).
 *
 * Behavior is governed by the single PROOF_MODE switch in
 * `src/lib/proof-mode.ts` (default 'off' — renders nothing):
 *   'off'    — no fetch, no render.
 *   'real'   — shows the REAL concurrent visitor count from /api/presence
 *              and nothing else, hidden below MIN_TO_SHOW.
 *   'seeded' — shows a date-deterministic 5-30 number, identical all day
 *              and on every reload, labeled "today" (never "live").
 *
 * The previous implementation displayed a manufactured number: a "demo
 * baseline" of 17 that random-walked between 1 and 17 on an empty site, and
 * `Math.max(18, 17 + real + drift)` whenever anyone was present. Because the
 * widget heartbeats itself, `real` was always >= 1 for the person looking at
 * the pill — so every human visitor was shown "18+ viewing now" on a site
 * that had one viewer. That is a fabricated social-proof number presented as
 * live data, and it sat on the same pages as a fabricated testimonial.
 *
 * In 'real' mode the pill hides itself unless at least two people really
 * are on the site, because "1 viewing now" is true but pointless. An honest
 * absence beats an invented crowd — do not reintroduce a floor or drift in
 * 'real' mode.
 */

const HEARTBEAT_MS = 10_000;
/** Below this many concurrent viewers the pill renders nothing at all (real mode only). */
const MIN_TO_SHOW = 2;

function newId(): string {
  try {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return crypto.randomUUID();
    }
  } catch {
    /* fall through */
  }
  return `s-${Math.abs(Math.floor(performance.now() * 1000)).toString(36)}-${performance.now().toString(36).slice(-4)}`;
}

export default function LiveVisitors() {
  const [display, setDisplay] = useState<number | null>(null);
  const realRef = useRef(0); // last known real concurrent count (from server)

  useEffect(() => {
    // 'off' renders nothing, no fetch. 'seeded' is a pure function of
    // today's date computed directly in render below — no effect, no
    // heartbeat, no server round-trip needed. Only 'real' needs a live
    // subscription to /api/presence.
    if (PROOF_MODE !== "real") return;

    let alive = true;

    // stable per-tab session id
    let id = "";
    try {
      id = sessionStorage.getItem("lv:id") || "";
      if (!id) {
        id = newId();
        sessionStorage.setItem("lv:id", id);
      }
    } catch {
      id = newId();
    }

    function recompute() {
      // The real count, unmodified. No baseline, no floor, no drift.
      if (alive) setDisplay(realRef.current);
    }

    async function beat() {
      try {
        const res = await fetch("/api/presence", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
          cache: "no-store",
          keepalive: true,
        });
        const json = await res.json();
        if (typeof json?.live === "number") realRef.current = json.live;
      } catch {
        /* offline — keep last known, demo drift still animates */
      }
      recompute();
    }

    beat();
    const hb = setInterval(beat, HEARTBEAT_MS);

    // best-effort: tell server we're gone on unload (count drops faster)
    const onHide = () => {
      if (document.visibilityState === "hidden") {
        try {
          navigator.sendBeacon?.(
            "/api/presence",
            new Blob([JSON.stringify({ id, leave: true })], {
              type: "application/json",
            }),
          );
        } catch {
          /* ignore */
        }
      }
    };
    document.addEventListener("visibilitychange", onHide);

    return () => {
      alive = false;
      clearInterval(hb);
      document.removeEventListener("visibilitychange", onHide);
    };
  }, []);

  if (PROOF_MODE === "off") return null;

  // 'seeded' is a pure function of today's date — computed directly here,
  // not via state/effect, so it's the same on server and client render and
  // never triggers a cascading setState-in-effect.
  const resolved =
    PROOF_MODE === "seeded" ? seededProofValue("sitewide-visitors") : display;

  // In 'real' mode, render nothing rather than a lonely figure.
  if (resolved === null || (PROOF_MODE === "real" && resolved < MIN_TO_SHOW)) {
    return null;
  }

  const label = PROOF_MODE === "seeded" ? "visitors today" : "viewing now";

  return (
    <div
      aria-live="polite"
      style={{
        position: "fixed",
        left: 16,
        bottom: 16,
        zIndex: 60,
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 12px",
        background: "var(--cream-3, #f2efe6)",
        border: "1px solid rgba(26,26,26,0.14)",
        borderRadius: 999,
        boxShadow: "0 8px 24px rgba(26,26,26,0.14)",
        fontFamily: "var(--font-mono, monospace)",
        fontSize: 12,
        color: "var(--ink, #1a1a1a)",
        letterSpacing: "0.02em",
        userSelect: "none",
      }}
    >
      <span style={{ position: "relative", width: 9, height: 9, flex: "none" }}>
        <span
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "#2e7d32",
          }}
        />
        {/* Pulsing "live" dot only makes sense when the number is actually
            real-time. In 'seeded' mode it's a fixed daily figure, so the
            pulse (which implies live activity) is intentionally omitted. */}
        {PROOF_MODE === "real" && (
          <span
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background: "#2e7d32",
              animation: "lv-ping 1.8s cubic-bezier(0,0,0.2,1) infinite",
            }}
          />
        )}
      </span>
      <strong style={{ fontWeight: 700 }}>{resolved}</strong>
      <span style={{ color: "var(--ink-faint, #6b6b6b)" }}>{label}</span>
      <style>{`
        @keyframes lv-ping {
          0% { transform: scale(1); opacity: 0.7; }
          75%, 100% { transform: scale(2.4); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
