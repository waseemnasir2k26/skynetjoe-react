"use client";

// Konami code listener (↑↑↓↓←→←→BA) → unlock secret modal.
// Tiny client component, no deps. Kill animations under prefers-reduced-motion.

import { useEffect, useState, useCallback } from "react";

const SEQUENCE = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a",
];

export default function KonamiUnlock() {
  const [progress, setProgress] = useState(0);
  const [unlocked, setUnlocked] = useState(false);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (unlocked) return;
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    setProgress((p) => {
      const expected = SEQUENCE[p];
      if (key === expected) {
        const next = p + 1;
        if (next === SEQUENCE.length) {
          setUnlocked(true);
          return 0;
        }
        return next;
      }
      // reset; but if the wrong key still matches index 0, count it.
      if (key === SEQUENCE[0]) return 1;
      return 0;
    });
  }, [unlocked]);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  return (
    <>
      {/* Hint chip — bottom-left (moved from right to avoid StickyBookCallBar overlap), pixel font */}
      <div
        aria-hidden="true"
        className="fixed bottom-3 left-3 z-40 px-2 py-1 text-[10px] tracking-widest"
        style={{
          fontFamily: "var(--font-pixel, monospace)",
          color: "var(--ink-faint, #6B6B65)",
          background: "rgba(26,26,26,0.06)",
          border: "1px solid rgba(26,26,26,0.12)",
          letterSpacing: "0.18em",
        }}
      >
        {progress > 0 ? `CHEAT ${progress}/${SEQUENCE.length}` : "TRY ↑↑↓↓←→←→BA"}
      </div>

      {unlocked && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="konami-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(3, 16, 26, 0.86)", backdropFilter: "blur(6px)" }}
          onClick={() => setUnlocked(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-md w-full p-6 md:p-8 text-center"
            style={{
              background: "#061827",
              border: "3px solid #5EEAD4",
              boxShadow: "0 0 0 4px #061827, 0 0 0 6px #1E88E5, 0 18px 60px rgba(0,212,255,0.35)",
              fontFamily: "var(--font-pixel, monospace)",
            }}
          >
            <div
              id="konami-title"
              className="text-[10px] md:text-xs tracking-[0.3em] mb-3"
              style={{ color: "#5EEAD4" }}
            >
              SECRET UNLOCKED
            </div>
            <div
              className="text-xl md:text-2xl mb-4 leading-tight"
              style={{ color: "#eaf6ff" }}
            >
              +1 EXTRA LIFE
            </div>
            <p
              className="text-[11px] md:text-xs leading-relaxed mb-6"
              style={{ color: "#b8d4e8", fontFamily: "var(--font-sans, system-ui)" }}
            >
              Mention <span style={{ color: "#5EEAD4" }}>KONAMI</span> when you book a
              discovery call and Waseem will throw in a free AEO audit with your
              first build. No catch. Just liked that you found this.
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="/discovery-call"
                className="block py-3 text-[11px] tracking-[0.2em]"
                style={{
                  background: "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
                  color: "#061827",
                  border: "2px solid #5EEAD4",
                }}
              >
                CLAIM THE LIFE
              </a>
              <button
                onClick={() => setUnlocked(false)}
                className="block py-2 text-[10px] tracking-[0.2em]"
                style={{
                  background: "transparent",
                  color: "#7ea3bf",
                  border: "1px solid rgba(126, 228, 255, 0.20)",
                }}
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
