"use client";

import { useEffect, useRef, useState } from "react";

/**
 * LiveVisitors — sitewide "X people viewing now" pill (bottom-left).
 *
 * Behaviour (per spec):
 *   • When NO real visitor is present, it shows a demo figure that drifts
 *     up and down within 1–17 (so an empty site never looks dead).
 *   • The moment a REAL visitor is on the site it starts from 18 and climbs:
 *     displayed = 17 (demo baseline) + real concurrent visitors, floored at 18,
 *     with a gentle ±drift so the number breathes instead of freezing.
 *
 * Real concurrency comes from /api/presence (server-side heartbeat map). The
 * widget itself heartbeats every 10s, so a live viewer is always counted —
 * which is exactly why a real visitor sees ≥18.
 */

const DEMO_BASE = 17; // "17 viewers from my side" — the demo baseline
const HEARTBEAT_MS = 10_000;
const DRIFT_MS = 4_500;

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
  const demoRef = useRef(11); // drifts within 1..17 when no real traffic
  const driftRef = useRef(0); // small ±drift on top of the real count

  useEffect(() => {
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
      const real = realRef.current;
      let n: number;
      if (real >= 1) {
        // real visitor present → start from 18 and climb with concurrency
        n = Math.max(18, DEMO_BASE + real + driftRef.current);
      } else {
        // empty site → demo figure drifting within 1..17
        n = demoRef.current;
      }
      if (alive) setDisplay(n);
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

    function drift() {
      // demo random walk, bounded 1..17
      const stepA = Math.floor(performance.now() % 3) - 1; // -1,0,1
      demoRef.current = Math.min(17, Math.max(1, demoRef.current + stepA));
      // gentle breathing on the real figure
      driftRef.current = Math.floor(performance.now() % 4); // 0..3
      recompute();
    }

    beat();
    const hb = setInterval(beat, HEARTBEAT_MS);
    const df = setInterval(drift, DRIFT_MS);

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
      clearInterval(df);
      document.removeEventListener("visibilitychange", onHide);
    };
  }, []);

  if (display === null) return null;

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
        <span
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "#2e7d32",
            animation: "lv-ping 1.8s cubic-bezier(0,0,0.2,1) infinite",
          }}
        />
      </span>
      <strong style={{ fontWeight: 700 }}>{display}</strong>
      <span style={{ color: "var(--ink-faint, #6b6b6b)" }}>viewing now</span>
      <style>{`
        @keyframes lv-ping {
          0% { transform: scale(1); opacity: 0.7; }
          75%, 100% { transform: scale(2.4); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
