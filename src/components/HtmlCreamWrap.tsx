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
        paddingTop: "calc(var(--promo-h, 44px) + 88px)",
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

          /* CSS-custom-prop overrides — fixes author page + any payload
             that drives surface via --a-*, --x-*, --p-* dark tokens. */
          --a-bg: var(--cream) !important;
          --a-bg-alt: var(--cream-2) !important;
          --a-surface: var(--cream-2) !important;
          --a-surface-2: var(--cream-3) !important;
          --a-fg: var(--ink) !important;
          --a-fg-muted: var(--ink-2) !important;
          --a-fg-faint: var(--ink-faint) !important;
          --a-border: rgba(26,26,26,0.10) !important;
          --a-border-strong: rgba(26,26,26,0.18) !important;
          --a-green: var(--terracotta) !important;
          --a-green-dark: var(--oxblood) !important;
          --a-green-light: var(--terracotta) !important;
          --a-purple: var(--ochre) !important;
          --a-purple-light: var(--ochre) !important;
          --a-cyan: var(--terracotta) !important;

          /* Generic dark-token names other payloads may use */
          --bg: var(--cream) !important;
          --surface: var(--cream-2) !important;
          --panel: var(--cream-2) !important;
          --card: var(--cream-2) !important;
          --fg: var(--ink) !important;
          --muted: var(--ink-2) !important;
          --accent: var(--terracotta) !important;
        }

        /* Direct descendants — force cream surface on any wn-* sub-element
           that escaped the explicit whitelist below. Safety net. */
        .cream-html-wrap article[class*="wn-"] [class*="wn-a-"],
        .cream-html-wrap article[class*="wn-"] [class*="wn-l"],
        .cream-html-wrap article[class*="wn-"] .wn-wrap,
        .cream-html-wrap article[class*="wn-"] .wn-verdict,
        .cream-html-wrap article[class*="wn-"] .wn-verdict > div,
        .cream-html-wrap article[class*="wn-"] .wn-verdict-line,
        .cream-html-wrap article[class*="wn-"] .wn-arrow,
        .cream-html-wrap article[class*="wn-"] .wn-byline,
        .cream-html-wrap article[class*="wn-"] .wn-updated,
        .cream-html-wrap article[class*="wn-"] .wn-direct-label,
        .cream-html-wrap article[class*="wn-"] .wn-q-stat,
        .cream-html-wrap article[class*="wn-"] .wn-q-claim,
        .cream-html-wrap article[class*="wn-"] .wn-q-source {
          background-color: transparent !important;
          color: var(--ink-2) !important;
        }

        /* Layer chips (.wn-l1 etc) — keep accent tint but on cream */
        .cream-html-wrap article[class*="wn-"] [class*="wn-l"][class*="wn-l1"],
        .cream-html-wrap article[class*="wn-"] [class*="wn-l"][class*="wn-l2"],
        .cream-html-wrap article[class*="wn-"] [class*="wn-l"][class*="wn-l3"],
        .cream-html-wrap article[class*="wn-"] [class*="wn-l"][class*="wn-l4"],
        .cream-html-wrap article[class*="wn-"] [class*="wn-l"][class*="wn-l5"] {
          background-color: var(--cream-3) !important;
          border-color: rgba(198,107,63,0.30) !important;
        }

        /* Quotables stat numerals → terracotta (single color event) */
        .cream-html-wrap article[class*="wn-"] .wn-q-stat,
        .cream-html-wrap article[class*="wn-"] .wn-direct-label {
          color: var(--terracotta) !important;
          font-family: var(--font-display) !important;
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
        .cream-html-wrap article[class*="wn-"] .wn-feature,
        .cream-html-wrap article[class*="wn-"] .wn-toc,
        .cream-html-wrap article[class*="wn-"] .wn-stack,
        .cream-html-wrap article[class*="wn-"] .wn-tree,
        .cream-html-wrap article[class*="wn-"] .wn-week,
        .cream-html-wrap article[class*="wn-"] .wn-anti,
        .cream-html-wrap article[class*="wn-"] .wn-jump,
        .cream-html-wrap article[class*="wn-"] .wn-jump a,
        .cream-html-wrap article[class*="wn-"] .wn-scenario,
        .cream-html-wrap article[class*="wn-"] .wn-quotables,
        .cream-html-wrap article[class*="wn-"] .wn-quotable,
        .cream-html-wrap article[class*="wn-"] .wn-node,
        .cream-html-wrap article[class*="wn-"] [class*="wn-leaf-"],
        .cream-html-wrap article[class*="wn-"] .wn-direct,
        .cream-html-wrap article[class*="wn-"] .wn-tldr,
        .cream-html-wrap article[class*="wn-"] [class*="wn-pick-"] {
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
        .cream-html-wrap article[class*="wn-"] [style*="color:#5EEAD4"],
        .cream-html-wrap article[class*="wn-"] [style*="color:#a78bfa"],
        .cream-html-wrap article[class*="wn-"] [style*="color:#f472b6"],
        .cream-html-wrap article[class*="wn-"] [style*="color:#1565C0"],
        .cream-html-wrap article[class*="wn-"] [style*="color:#42A5F5"],
        .cream-html-wrap article[class*="wn-"] [style*="color:#fbbf24"],
        .cream-html-wrap article[class*="wn-"] [style*="color:#60a5fa"] {
          color: var(--terracotta) !important;
        }

        /* Inline-style backgrounds w/ known dark hex → cream-2 */
        .cream-html-wrap article[class*="wn-"] [style*="background:#100f14"],
        .cream-html-wrap article[class*="wn-"] [style*="background:#17161d"],
        .cream-html-wrap article[class*="wn-"] [style*="background:#1f1d28"],
        .cream-html-wrap article[class*="wn-"] [style*="background:#1a1318"],
        .cream-html-wrap article[class*="wn-"] [style*="background-color:#100f14"],
        .cream-html-wrap article[class*="wn-"] [style*="background-color:#17161d"] {
          background: var(--cream-2) !important;
          background-color: var(--cream-2) !important;
        }

        /* Gradient backgrounds on .wn-cta / .wn-direct / .wn-tldr → flat cream-2 */
        .cream-html-wrap article[class*="wn-"] .wn-direct,
        .cream-html-wrap article[class*="wn-"] .wn-tldr {
          background: var(--cream-2) !important;
          border: 1px solid rgba(26,26,26,0.14) !important;
        }

        /* ============================================================
           MOBILE RESPONSIVE LAYER — 360-414px Android dominant traffic.
           Lives here so HTML payloads using dangerouslySetInnerHTML get
           mobile-safe sizing even if globals.css load order is later or
           a payload's own inline <style> wins specificity.
           ============================================================ */

        /* Always-on: hold viewport, scroll tables/pre, break long links */
        .cream-html-wrap article[class*="wn-"] {
          max-width: 100% !important;
          overflow-x: hidden !important;
        }
        .cream-html-wrap article[class*="wn-"] table {
          display: block !important;
          overflow-x: auto !important;
          max-width: 100% !important;
          -webkit-overflow-scrolling: touch;
        }
        .cream-html-wrap article[class*="wn-"] pre {
          overflow-x: auto !important;
          max-width: 100% !important;
          -webkit-overflow-scrolling: touch;
        }
        .cream-html-wrap article[class*="wn-"] img,
        .cream-html-wrap article[class*="wn-"] iframe,
        .cream-html-wrap article[class*="wn-"] video {
          max-width: 100% !important;
          height: auto !important;
        }

        @media (max-width: 768px) {
          .cream-html-wrap {
            padding-top: 64px !important;
          }
          .cream-html-wrap article[class*="wn-"] {
            padding: clamp(28px, 7vw, 48px) clamp(14px, 4vw, 20px) !important;
          }
          /* Hero compact */
          .cream-html-wrap article[class*="wn-"] .wn-hero {
            padding: 28px 16px !important;
          }
          /* Heading clamps */
          .cream-html-wrap article[class*="wn-"] h1 {
            font-size: clamp(22px, 6.8vw, 28px) !important;
            line-height: 1.15 !important;
            letter-spacing: -0.015em !important;
          }
          .cream-html-wrap article[class*="wn-"] h2 {
            font-size: clamp(19px, 5.2vw, 24px) !important;
            line-height: 1.2 !important;
            margin-top: 36px !important;
          }
          .cream-html-wrap article[class*="wn-"] h3 {
            font-size: clamp(16px, 4.4vw, 20px) !important;
            line-height: 1.25 !important;
          }
          .cream-html-wrap article[class*="wn-"] h4 {
            font-size: 15px !important;
          }
          /* Body type — readable 15px */
          .cream-html-wrap article[class*="wn-"] p,
          .cream-html-wrap article[class*="wn-"] li {
            font-size: 15px !important;
            line-height: 1.6 !important;
          }
          /* Stack ALL multi-col grids inside payload */
          .cream-html-wrap article[class*="wn-"] .wn-verdict,
          .cream-html-wrap article[class*="wn-"] .wn-quotables,
          .cream-html-wrap article[class*="wn-"] .wn-grid,
          .cream-html-wrap article[class*="wn-"] .wn-2col,
          .cream-html-wrap article[class*="wn-"] .wn-3col,
          .cream-html-wrap article[class*="wn-"] [style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          /* Quotable padding tighter */
          .cream-html-wrap article[class*="wn-"] .wn-quotable {
            padding: 14px 16px !important;
          }
          .cream-html-wrap article[class*="wn-"] .wn-q-stat {
            font-size: 20px !important;
          }
          /* Cards: tighter padding */
          .cream-html-wrap article[class*="wn-"] details,
          .cream-html-wrap article[class*="wn-"] .wn-card,
          .cream-html-wrap article[class*="wn-"] .wn-proof-item,
          .cream-html-wrap article[class*="wn-"] .wn-block,
          .cream-html-wrap article[class*="wn-"] .wn-feature,
          .cream-html-wrap article[class*="wn-"] .wn-toc,
          .cream-html-wrap article[class*="wn-"] .wn-week,
          .cream-html-wrap article[class*="wn-"] .wn-anti,
          .cream-html-wrap article[class*="wn-"] .wn-scenario,
          .cream-html-wrap article[class*="wn-"] .wn-tldr,
          .cream-html-wrap article[class*="wn-"] .wn-direct,
          .cream-html-wrap article[class*="wn-"] .wn-cta,
          .cream-html-wrap article[class*="wn-"] .wn-final-cta {
            padding: 16px !important;
          }
          /* Summary: 44px min tap area */
          .cream-html-wrap article[class*="wn-"] summary {
            font-size: 15px !important;
            line-height: 1.4 !important;
            min-height: 44px;
            display: flex;
            align-items: center;
          }
          /* Tables: smaller font + min-width per cell so scroll feels intentional */
          .cream-html-wrap article[class*="wn-"] table {
            font-size: 12.5px !important;
          }
          .cream-html-wrap article[class*="wn-"] th,
          .cream-html-wrap article[class*="wn-"] td {
            padding: 8px 10px !important;
            min-width: 110px;
          }
          /* CTA / final-cta anchors: 44px tap target */
          .cream-html-wrap article[class*="wn-"] .wn-cta a,
          .cream-html-wrap article[class*="wn-"] .wn-final-cta a,
          .cream-html-wrap article[class*="wn-"] .wn-jump a {
            min-height: 44px;
            display: inline-flex;
            align-items: center;
            padding: 10px 14px !important;
            font-size: 13.5px !important;
          }
          /* Long words / URLs break instead of overflowing */
          .cream-html-wrap article[class*="wn-"] p,
          .cream-html-wrap article[class*="wn-"] li,
          .cream-html-wrap article[class*="wn-"] a,
          .cream-html-wrap article[class*="wn-"] code,
          .cream-html-wrap article[class*="wn-"] h1,
          .cream-html-wrap article[class*="wn-"] h2,
          .cream-html-wrap article[class*="wn-"] h3 {
            overflow-wrap: anywhere;
            word-break: break-word;
          }
          /* Author page: portrait 220px col + 5-col stat strip stack */
          .cream-html-wrap article.wn-author [style*="grid-template-columns: 220px"],
          .cream-html-wrap article.wn-author .wn-a-hero,
          .cream-html-wrap article.wn-author .wn-a-portrait-row {
            grid-template-columns: 1fr !important;
          }
          .cream-html-wrap article.wn-author .wn-a-stats,
          .cream-html-wrap article.wn-author [style*="grid-template-columns: repeat(5"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .cream-html-wrap article.wn-author .wn-a-creds,
          .cream-html-wrap article.wn-author .wn-a-bullets {
            grid-template-columns: 1fr !important;
          }
          /* Stack indented ladder rows flatter on phone */
          .cream-html-wrap article[class*="wn-"] .wn-stack .wn-l2,
          .cream-html-wrap article[class*="wn-"] .wn-stack .wn-l3,
          .cream-html-wrap article[class*="wn-"] .wn-stack .wn-l4,
          .cream-html-wrap article[class*="wn-"] .wn-stack .wn-l5 {
            margin-left: 8px !important;
          }
        }

        @media (max-width: 414px) {
          .cream-html-wrap article[class*="wn-"] h1 {
            font-size: clamp(20px, 6.4vw, 24px) !important;
          }
          .cream-html-wrap article[class*="wn-"] h2 {
            font-size: 19px !important;
          }
        }
      `}</style>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
