"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/**
 * One-shot scramble reveal for a short H1 accent phrase.
 *
 * LCP-safe by construction: the DOM starts with `text` (the real, final
 * copy) already rendered — that's what gets measured for Largest
 * Contentful Paint. The scramble effect only starts in a useEffect *after*
 * mount/hydration, so it never delays first paint; it just briefly
 * animates the already-painted text before settling back to itself.
 * prefers-reduced-motion and no-JS both simply show the static final text.
 */
export default function ScrambleText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);
  const played = useRef(false);

  useEffect(() => {
    if (played.current) return;
    played.current = true;

    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    const duration = 550;
    const start = performance.now();
    let raf = 0;

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      const revealCount = Math.floor(progress * text.length);

      let out = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === " " || i < revealCount) {
          out += ch;
        } else {
          out += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      setDisplay(out);

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text]);

  return <span aria-label={text}>{display}</span>;
}
