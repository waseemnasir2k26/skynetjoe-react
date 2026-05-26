// Cream editorial pivot 2026-05-25 — 404 reframed as paper field-note.
// Was: retro 8-bit GAME OVER (Press Start 2P + scanlines + CRT flicker).
// Now: typewriter field-note on cream paper — IBM Plex Mono + Fraunces.
// Konami easter egg preserved.

import Link from "next/link";
import { SITE } from "@/lib/site";
import KonamiUnlock from "@/components/easter/KonamiUnlock";

export const metadata = {
  title: `404 — Page not found · ${SITE.brand}`,
  description: "Page not found. Try the homepage or send Waseem a note.",
  robots: { index: false, follow: false },
};

const C = {
  cream: "#F2EFE6",
  cream2: "#EDE8DC",
  cream3: "#FAF7F0",
  ink: "#1A1A1A",
  ink2: "#3A3A36",
  inkFaint: "#6B6B65",
  terra: "#C66B3F",
  terra2: "#B85A30",
  ochre: "#C9A96E",
  oxblood: "#6B2C2C",
  rule: "rgba(26,26,26,0.12)",
};

const LEVELS = [
  { href: "/", label: "Homepage", tag: "Page 01" },
  { href: "/services", label: "Services", tag: "Page 02" },
  { href: "/case-studies", label: "Case studies", tag: "Page 03" },
  { href: "/pricing", label: "Pricing", tag: "Page 04" },
  { href: "/blog", label: "Blog", tag: "Page 05" },
];

export default function NotFound() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "88vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px",
        background: C.cream3,
        color: C.ink,
      }}
    >
      <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 720, margin: "0 auto" }}>
        {/* Top status strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            color: C.inkFaint,
            marginBottom: 36,
            fontWeight: 600,
          }}
        >
          <span>— Field notes</span>
          <span style={{ color: C.terra }}>{SITE.brand}</span>
          <span>Status 404</span>
        </div>

        {/* Big 404 */}
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: "clamp(96px, 22vw, 200px)",
            fontWeight: 500,
            color: C.terra,
            lineHeight: 1,
            marginBottom: 24,
            letterSpacing: "-0.04em",
            textAlign: "center",
          }}
        >
          404
        </div>

        {/* Heading */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: C.ink,
            marginBottom: 16,
            textAlign: "center",
            maxWidth: "20ch",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          This page{" "}
          <em style={{ fontStyle: "italic", color: C.terra }}>
            doesn&apos;t exist yet.
          </em>
        </h1>

        <p
          style={{
            fontSize: 16,
            color: C.ink2,
            lineHeight: 1.65,
            margin: "0 auto 12px",
            maxWidth: "52ch",
            textAlign: "center",
          }}
        >
          Either it never did, or it moved. Either way, here are the rooms that
          definitely do exist.
        </p>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: C.inkFaint,
            margin: "0 auto 48px",
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: "0.14em",
          }}
        >
          — Have you tried{" "}
          <span style={{ color: C.terra }}>git checkout main</span>?
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-3 justify-center"
          style={{ marginBottom: 48 }}
        >
          <Link
            href="/"
            style={{
              padding: "14px 22px",
              background: C.terra,
              color: C.cream3,
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: 14,
              borderRadius: 2,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            ← Back to homepage
          </Link>
          <Link
            href="/contact"
            style={{
              padding: "13px 20px",
              background: "transparent",
              color: C.ink,
              border: `1px solid ${C.ink}`,
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: 14,
              borderRadius: 2,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            Tell Waseem about it
          </Link>
        </div>

        {/* Level select */}
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.22em",
              color: C.terra,
              marginBottom: 16,
              textAlign: "center",
              fontWeight: 600,
            }}
          >
            — Other pages —
          </div>
          <ul
            className="grid grid-cols-1 sm:grid-cols-2 gap-2"
            style={{ listStyle: "none", padding: 0, margin: 0 }}
          >
            {LEVELS.map((lvl, i) => (
              <li key={lvl.href}>
                <Link
                  href={lvl.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    padding: "12px 16px",
                    background: C.cream2,
                    border: `1px solid ${C.rule}`,
                    color: C.ink,
                    fontFamily: "var(--font-sans)",
                    fontSize: 14,
                    textDecoration: "none",
                    transform: i % 2 === 0 ? "rotate(-0.2deg)" : "rotate(0.2deg)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: C.terra,
                      letterSpacing: "0.10em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    {lvl.tag}
                  </span>
                  <span style={{ fontWeight: 600 }}>{lvl.label}</span>
                  <span style={{ color: C.inkFaint }}>→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: 64,
            fontFamily: "var(--font-mono)",
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

      {/* Konami easter egg — only client code on the page */}
      <KonamiUnlock />
    </section>
  );
}
