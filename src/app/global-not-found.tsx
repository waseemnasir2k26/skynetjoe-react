/**
 * Branded 404 for URLs that match NO route at all.
 *
 * Why this file and not `src/app/not-found.tsx`:
 *   This app has no `src/app/layout.tsx` — the root layout lives inside the
 *   route group at `src/app/(skynet)/layout.tsx`. Next therefore cannot pick a
 *   layout for a root-level `not-found.tsx`, and every unmatched URL fell
 *   through to Next's built-in black-and-white "404: This page could not be
 *   found." (verified live 2026-09-05 on /this-page-does-not-exist-xyz and
 *   /services/freightops-logistics). `global-not-found.tsx` is Next's answer:
 *   it renders its OWN <html>/<body>, so it needs no layout.
 *   Enabled by `experimental.globalNotFound` in next.config.ts.
 *
 * `(skynet)/not-found.tsx` is still the 404 for notFound() thrown INSIDE the
 * group (it keeps header/footer). This one is the standalone fallback.
 *
 * Self-contained on purpose: no next/font, no globals.css, no client JS —
 * the page must render correctly with zero layout context.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  // Rendered outside the root layout, so title.template never runs here.
  // One brand token only — the eyebrow below carries it.
  title: "404 — Page not found",
  description: "That page doesn't exist. Here are the ones that do.",
  robots: { index: false, follow: false },
};

const C = {
  cream2: "#EDE8DC",
  cream3: "#FAF7F0",
  ink: "#1A1A1A",
  ink2: "#3A3A36",
  inkFaint: "#6B6B65",
  terra: "#C66B3F",
  rule: "rgba(26,26,26,0.12)",
};

const SANS =
  '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
const MONO =
  '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

const LINKS = [
  { href: "/", label: "Homepage" },
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: C.cream3,
          color: C.ink,
          fontFamily: SANS,
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "72px 24px",
          }}
        >
          <div style={{ width: "100%", maxWidth: 680 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontFamily: MONO,
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                color: C.inkFaint,
                marginBottom: 32,
                fontWeight: 600,
              }}
            >
              <span>— Field notes</span>
              <span style={{ color: C.terra }}>{SITE.brand}</span>
              <span>Status 404</span>
            </div>

            <div
              style={{
                fontSize: "clamp(84px, 20vw, 176px)",
                fontWeight: 700,
                color: C.terra,
                lineHeight: 1,
                letterSpacing: "-0.04em",
                textAlign: "center",
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
                textAlign: "center",
                margin: "0 auto 14px",
                maxWidth: "20ch",
              }}
            >
              This page doesn&apos;t exist.
            </h1>

            <p
              style={{
                fontSize: 16,
                color: C.ink2,
                lineHeight: 1.65,
                margin: "0 auto 36px",
                maxWidth: "52ch",
                textAlign: "center",
              }}
            >
              Either it never did, or it moved. Either way, here are the rooms
              that definitely do exist.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                justifyContent: "center",
                marginBottom: 44,
              }}
            >
              <Link
                href="/"
                style={{
                  padding: "13px 21px",
                  background: C.terra,
                  color: C.cream3,
                  fontWeight: 600,
                  fontSize: 14,
                  borderRadius: 2,
                  textDecoration: "none",
                }}
              >
                ← Back to homepage
              </Link>
              <Link
                href="/contact"
                style={{
                  padding: "12px 20px",
                  color: C.ink,
                  border: `1px solid ${C.ink}`,
                  fontWeight: 600,
                  fontSize: 14,
                  borderRadius: 2,
                  textDecoration: "none",
                }}
              >
                Tell Waseem about it
              </Link>
            </div>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "0 auto",
                maxWidth: 560,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 8,
              }}
            >
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                      padding: "12px 16px",
                      background: C.cream2,
                      border: `1px solid ${C.rule}`,
                      color: C.ink,
                      fontSize: 14,
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    <span>{l.label}</span>
                    <span style={{ color: C.inkFaint }}>→</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div
              style={{
                marginTop: 56,
                fontFamily: MONO,
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                color: C.inkFaint,
                textAlign: "center",
              }}
            >
              — Built by {SITE.founder} · Canggu, Bali · GMT+8
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
