import React from "react";

/**
 * HtmlCreamWrap — wraps dangerouslySetInnerHTML payloads that ship with
 * their own dark `.wn-<slug>` scoped styles, and overrides the dark hex
 * palette with the cream editorial palette via descendant selectors.
 *
 * Keeps the original HTML structure + class hooks intact (so injected
 * data attributes like data-slug still work), only flips colors + fonts.
 */

export default function HtmlCreamWrap({ html }: { html: string }) {
  return (
    <div
      className="cream-html-wrap"
      style={{
        background: "var(--cream)",
        color: "var(--ink)",
        position: "relative",
        zIndex: 2,
        paddingTop: 88,
      }}
    >
      <style>{`
        /* Force cream surface on any .wn-* article + nested layout */
        .cream-html-wrap article[class*="wn-"],
        .cream-html-wrap article[class*="wn-"] * {
          color: var(--ink) !important;
          border-color: rgba(26,26,26,0.12) !important;
        }
        .cream-html-wrap article[class*="wn-"] {
          background: var(--cream) !important;
          font-family: var(--font-sans) !important;
        }

        /* Headings → Fraunces, ink */
        .cream-html-wrap article[class*="wn-"] h1,
        .cream-html-wrap article[class*="wn-"] h2,
        .cream-html-wrap article[class*="wn-"] h3,
        .cream-html-wrap article[class*="wn-"] h4 {
          font-family: var(--font-display) !important;
          color: var(--ink) !important;
          font-weight: 500 !important;
          letter-spacing: -0.02em !important;
        }
        .cream-html-wrap article[class*="wn-"] h2 {
          color: var(--ink) !important;
          border-bottom-color: rgba(26,26,26,0.12) !important;
        }

        /* Body text */
        .cream-html-wrap article[class*="wn-"] p,
        .cream-html-wrap article[class*="wn-"] li,
        .cream-html-wrap article[class*="wn-"] td,
        .cream-html-wrap article[class*="wn-"] th {
          color: var(--ink-2) !important;
        }
        .cream-html-wrap article[class*="wn-"] .wn-sub {
          color: var(--ink-faint) !important;
        }

        /* Cards / surfaces */
        .cream-html-wrap article[class*="wn-"] details,
        .cream-html-wrap article[class*="wn-"] .wn-card,
        .cream-html-wrap article[class*="wn-"] .wn-proof-item,
        .cream-html-wrap article[class*="wn-"] .wn-price,
        .cream-html-wrap article[class*="wn-"] .wn-block,
        .cream-html-wrap article[class*="wn-"] .wn-row,
        .cream-html-wrap article[class*="wn-"] .wn-feature {
          background: var(--cream-2) !important;
          border: 1px solid rgba(26,26,26,0.12) !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          box-shadow: none !important;
        }
        .cream-html-wrap article[class*="wn-"] details[open] {
          border-color: var(--terracotta) !important;
        }
        .cream-html-wrap article[class*="wn-"] summary {
          color: var(--ink) !important;
          font-family: var(--font-display) !important;
          font-weight: 600 !important;
        }
        .cream-html-wrap article[class*="wn-"] summary::after {
          color: var(--terracotta) !important;
        }

        /* Inline-CTA blocks */
        .cream-html-wrap article[class*="wn-"] .wn-cta,
        .cream-html-wrap article[class*="wn-"] .wn-final-cta {
          background: var(--cream-2) !important;
          border: 1px solid rgba(26,26,26,0.14) !important;
        }
        .cream-html-wrap article[class*="wn-"] .wn-cta h3,
        .cream-html-wrap article[class*="wn-"] .wn-final-cta h3 {
          color: var(--ink) !important;
        }
        .cream-html-wrap article[class*="wn-"] .wn-cta p,
        .cream-html-wrap article[class*="wn-"] .wn-final-cta p {
          color: var(--ink-2) !important;
        }
        .cream-html-wrap article[class*="wn-"] .wn-cta a,
        .cream-html-wrap article[class*="wn-"] .wn-final-cta a {
          background: var(--terracotta) !important;
          color: var(--cream-3) !important;
          border-radius: 2px !important;
          font-weight: 600 !important;
        }
        .cream-html-wrap article[class*="wn-"] .wn-cta a:hover,
        .cream-html-wrap article[class*="wn-"] .wn-final-cta a:hover {
          background: var(--terracotta-2) !important;
        }

        /* Generic links — terracotta */
        .cream-html-wrap article[class*="wn-"] a {
          color: var(--terracotta) !important;
        }
        .cream-html-wrap article[class*="wn-"] a.wn-card,
        .cream-html-wrap article[class*="wn-"] a.wn-x-thumb {
          color: var(--ink) !important;
        }

        /* Hero gradient overlay → cream */
        .cream-html-wrap article[class*="wn-"] .wn-hero::before {
          background: none !important;
          opacity: 0 !important;
        }
        .cream-html-wrap article[class*="wn-"] .wn-hero {
          background: var(--cream-3) !important;
          border-bottom: 1px solid rgba(26,26,26,0.10) !important;
        }

        /* Section dividers */
        .cream-html-wrap article[class*="wn-"] .wn-section {
          border-top: 1px solid rgba(26,26,26,0.10) !important;
        }

        /* Tables */
        .cream-html-wrap article[class*="wn-"] table {
          background: var(--cream-2) !important;
        }
        .cream-html-wrap article[class*="wn-"] th {
          background: var(--cream-3) !important;
          color: var(--ink) !important;
          font-family: var(--font-mono) !important;
          font-size: 11px !important;
          text-transform: uppercase !important;
          letter-spacing: 0.10em !important;
        }
        .cream-html-wrap article[class*="wn-"] td {
          border-color: rgba(26,26,26,0.08) !important;
        }

        /* Code + pre */
        .cream-html-wrap article[class*="wn-"] code,
        .cream-html-wrap article[class*="wn-"] pre {
          background: var(--cream-2) !important;
          color: var(--ink) !important;
          border: 1px solid rgba(26,26,26,0.10) !important;
          font-family: var(--font-mono) !important;
        }

        /* Strong / em accents in body copy → terracotta */
        .cream-html-wrap article[class*="wn-"] strong {
          color: var(--ink) !important;
        }

        /* Override per-page hex accent colors (cyan/teal/violet/green) */
        .cream-html-wrap article[class*="wn-"] .wn-accent,
        .cream-html-wrap article[class*="wn-"] [style*="color:#1E88E5"],
        .cream-html-wrap article[class*="wn-"] [style*="color:#14B8A6"],
        .cream-html-wrap article[class*="wn-"] [style*="color:#00D4FF"],
        .cream-html-wrap article[class*="wn-"] [style*="color:#5EEAD4"] {
          color: var(--terracotta) !important;
        }
      `}</style>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
