// ---------------------------------------------------------------------------
// ROOT not-found (M9) — branded 404 for ALL unmatched top-level URLs.
//
// Why this file exists: the app has no top-level `app/layout.tsx`. The site's
// root layout lives in the `(skynet)` route group, and the branded 404 in
// `(skynet)/not-found.tsx` only catches `notFound()` thrown INSIDE that group.
// Arbitrary unmatched URLs (e.g. /totally-made-up) are resolved by Next at the
// `app/` root, where there was no `not-found` file — so they fell through to
// Next's BARE default 404. This root `app/not-found.tsx` is what Next composes
// for those global unmatched routes.
//
// It is intentionally SELF-CONTAINED: a server component with inline styles and
// no dependency on globals.css or font CSS variables. There are two root layouts
// in this app ((skynet) and (lp)), so the wrapper Next applies to this root
// not-found can vary; inlining every style guarantees the page renders correctly
// (and on-brand) no matter which layout — or Next's built-in fallback layout —
// wraps it. Mirrors the cream/terracotta field-note look of the in-group 404.
//
// Server component, minimal, no client JS.
// ---------------------------------------------------------------------------

import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata = {
  title: `404 — Page not found · ${SITE.brand}`,
  description: "Page not found. Try the homepage, services, or contact.",
  robots: { index: false, follow: false },
};

const C = {
  cream: "#FAF7F0",
  cream2: "#EDE8DC",
  ink: "#1A1A1A",
  ink2: "#3A3A36",
  inkFaint: "#56564F",
  terra: "#C66B3F",
  rule: "rgba(26,26,26,0.12)",
};

const LINKS = [
  { href: "/", label: "Homepage" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

const sans =
  '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
const mono =
  'ui-monospace, "SF Mono", "IBM Plex Mono", Menlo, Consolas, monospace';

export default function RootNotFound() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px",
        background: C.cream,
        color: C.ink,
        fontFamily: sans,
      }}
    >
      <div style={{ width: "100%", maxWidth: 640, margin: "0 auto" }}>
        {/* Brand lockup — logo mark + wordmark (no external assets) */}
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            marginBottom: 40,
            fontWeight: 800,
            fontSize: 18,
            letterSpacing: "-0.03em",
            color: C.ink,
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: 14,
              height: 14,
              borderRadius: 3,
              background: C.terra,
              display: "inline-block",
            }}
          />
          {SITE.brand}
        </Link>

        <div
          style={{
            fontFamily: mono,
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            color: C.inkFaint,
            fontWeight: 600,
            marginBottom: 16,
          }}
        >
          Status 404 — Field note
        </div>

        <div
          style={{
            fontSize: "clamp(72px, 18vw, 140px)",
            fontWeight: 800,
            color: C.terra,
            lineHeight: 1,
            letterSpacing: "-0.04em",
            marginBottom: 20,
          }}
        >
          404
        </div>

        <h1
          style={{
            fontSize: "clamp(26px, 4vw, 40px)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1.12,
            color: C.ink,
            margin: "0 0 16px",
          }}
        >
          This page{" "}
          <span style={{ fontWeight: 800, color: C.terra }}>
            doesn&apos;t exist.
          </span>
        </h1>

        <p
          style={{
            fontSize: 16,
            color: C.ink2,
            lineHeight: 1.65,
            margin: "0 0 36px",
            maxWidth: "52ch",
          }}
        >
          Either it never did, or it moved. Here are the pages that definitely
          do exist — pick one and you&apos;re back on track.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            marginBottom: 8,
          }}
        >
          {LINKS.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "13px 20px",
                background: i === 0 ? C.terra : "transparent",
                color: i === 0 ? C.cream : C.ink,
                border: i === 0 ? "none" : `1px solid ${C.rule}`,
                borderRadius: 2,
                fontWeight: 600,
                fontSize: 14,
                textDecoration: "none",
              }}
            >
              {l.label} <span aria-hidden="true">→</span>
            </Link>
          ))}
        </div>

        <div
          style={{
            marginTop: 56,
            fontFamily: mono,
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            color: C.inkFaint,
          }}
        >
          — Built by {SITE.founder} · Canggu, Bali
        </div>
      </div>
    </section>
  );
}
