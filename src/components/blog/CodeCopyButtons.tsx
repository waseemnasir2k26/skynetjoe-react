"use client";

import { useEffect } from "react";

/**
 * Progressive enhancement for blog post fragments: adds a Copy button to
 * every <pre> code block inside .prose-wn, and — when a post has 5+ blocks
 * (the prompt-library posts) — a "Copy all" pill before the first block.
 * DOM-injection is deliberate: fragment HTML is static and rendered via
 * dangerouslySetInnerHTML, so React can't own the buttons.
 */
export default function CodeCopyButtons() {
  useEffect(() => {
    const pres = Array.from(
      document.querySelectorAll<HTMLPreElement>(".prose-wn pre"),
    );
    if (!pres.length) return;

    const cleanups: (() => void)[] = [];

    const styleBtn = (b: HTMLButtonElement) => {
      Object.assign(b.style, {
        position: "absolute",
        top: "8px",
        right: "8px",
        padding: "4px 12px",
        fontSize: "12px",
        fontWeight: "600",
        fontFamily: "inherit",
        color: "#FAF7F0",
        background: "#C66B3F",
        border: "none",
        borderRadius: "2px",
        cursor: "pointer",
        opacity: "0.92",
        zIndex: "2",
      } as CSSStyleDeclaration);
    };

    const flash = (b: HTMLButtonElement, label: string) => {
      const orig = b.textContent;
      b.textContent = label;
      b.style.background = "#3d7a4a";
      setTimeout(() => {
        b.textContent = orig;
        b.style.background = "#C66B3F";
      }, 1600);
    };

    pres.forEach((pre) => {
      if (pre.querySelector("[data-copy-btn]")) return;
      pre.style.position = "relative";
      const btn = document.createElement("button");
      btn.setAttribute("data-copy-btn", "1");
      btn.setAttribute("aria-label", "Copy prompt to clipboard");
      btn.textContent = "Copy";
      styleBtn(btn);
      const onClick = () => {
        const code = pre.querySelector("code");
        navigator.clipboard
          .writeText((code ?? pre).innerText.trim())
          .then(() => flash(btn, "Copied ✓"))
          .catch(() => flash(btn, "Press Ctrl+C"));
      };
      btn.addEventListener("click", onClick);
      pre.appendChild(btn);
      cleanups.push(() => {
        btn.removeEventListener("click", onClick);
        btn.remove();
      });
    });

    if (pres.length >= 5 && !document.querySelector("[data-copy-all]")) {
      const bar = document.createElement("button");
      bar.setAttribute("data-copy-all", "1");
      bar.textContent = `Copy all ${pres.length} prompts`;
      Object.assign(bar.style, {
        display: "inline-block",
        margin: "0 0 20px",
        padding: "10px 20px",
        fontSize: "14px",
        fontWeight: "700",
        fontFamily: "inherit",
        color: "#FAF7F0",
        background: "#C66B3F",
        border: "none",
        borderRadius: "2px",
        cursor: "pointer",
      } as CSSStyleDeclaration);
      const onClickAll = () => {
        const all = pres
          .map((pre, i) => {
            const code = pre.querySelector("code");
            return `--- PROMPT ${i + 1} ---\n${(code ?? pre).innerText.trim()}`;
          })
          .join("\n\n");
        navigator.clipboard
          .writeText(all)
          .then(() => flash(bar, "All prompts copied ✓"))
          .catch(() => flash(bar, "Copy failed"));
      };
      bar.addEventListener("click", onClickAll);
      pres[0].parentElement?.insertBefore(bar, pres[0]);
      cleanups.push(() => {
        bar.removeEventListener("click", onClickAll);
        bar.remove();
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
