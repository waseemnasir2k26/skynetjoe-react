// Aesthetic: Retro arcade / 8-bit pixel — chunky Press Start 2P, scanline overlay,
// blinking cursor, "PLAYER 1 — PRESS START" energy. Picked for broad nerd appeal
// and clean CSS-only execution that matches Waseem's builder vibe.

import Link from "next/link";
import { Press_Start_2P } from "next/font/google";
import { SITE } from "@/lib/site";
import KonamiUnlock from "@/components/easter/KonamiUnlock";

const pixel = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pixel",
});

export const metadata = {
  title: `404 — GAME OVER · ${SITE.brand}`,
  description: "Level not found. Respawn at the homepage or send Waseem a flare.",
  robots: { index: false, follow: false },
};

const LEVELS = [
  { href: "/", label: "HOMEPAGE", tag: "WORLD-1" },
  { href: "/services", label: "SERVICES", tag: "WORLD-2" },
  { href: "/case-studies", label: "CASE-STUDIES", tag: "WORLD-3" },
  { href: "/pricing", label: "PRICING", tag: "WORLD-4" },
  { href: "/blog", label: "BLOG", tag: "WORLD-5" },
];

export default function NotFound() {
  return (
    <section
      className={`${pixel.variable} relative overflow-hidden min-h-[88vh] flex items-center justify-center py-20 px-4`}
      style={{
        background:
          "radial-gradient(ellipse at 50% 30%, #0a2d4a 0%, #061827 55%, #03101a 100%)",
        fontFamily: "var(--font-pixel), ui-monospace, monospace",
        color: "#eaf6ff",
      }}
    >
      {/* CSS-only retro background: scanlines + grid + starfield */}
      <style>{`
        .crt-scanlines {
          position: absolute; inset: 0; pointer-events: none; z-index: 2;
          background: repeating-linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.0) 0px,
            rgba(0, 0, 0, 0.0) 2px,
            rgba(0, 0, 0, 0.18) 3px,
            rgba(0, 0, 0, 0.18) 4px
          );
          mix-blend-mode: multiply;
        }
        .crt-grid {
          position: absolute; inset: 0; pointer-events: none; z-index: 1;
          background-image:
            linear-gradient(to right, rgba(94, 234, 212, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(94, 234, 212, 0.08) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
        }
        .crt-stars {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            radial-gradient(1px 1px at 12% 18%, #fff, transparent 50%),
            radial-gradient(1px 1px at 22% 72%, #5EEAD4, transparent 50%),
            radial-gradient(1px 1px at 38% 42%, #fff, transparent 50%),
            radial-gradient(1px 1px at 52% 88%, #00D4FF, transparent 50%),
            radial-gradient(1px 1px at 68% 22%, #fff, transparent 50%),
            radial-gradient(1px 1px at 78% 62%, #5EEAD4, transparent 50%),
            radial-gradient(1px 1px at 88% 12%, #fff, transparent 50%),
            radial-gradient(1px 1px at 8% 92%, #fff, transparent 50%);
        }
        .crt-flicker {
          animation: crt-flicker 6s infinite steps(1);
        }
        @keyframes crt-flicker {
          0%, 92%, 100% { opacity: 1; }
          93% { opacity: 0.82; }
          94% { opacity: 1; }
          96% { opacity: 0.88; }
          97% { opacity: 1; }
        }
        .blink-cursor::after {
          content: "_";
          margin-left: 4px;
          animation: blink 1s steps(2) infinite;
          color: #5EEAD4;
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .pixel-shake:hover {
          animation: pxshake 0.25s steps(2) infinite;
        }
        @keyframes pxshake {
          0% { transform: translate(0, 0); }
          50% { transform: translate(1px, -1px); }
          100% { transform: translate(-1px, 1px); }
        }
        .glow-cyan {
          text-shadow:
            0 0 6px #00D4FF,
            0 0 14px rgba(0, 212, 255, 0.55),
            4px 4px 0 #061827;
        }
        .glow-magenta {
          text-shadow:
            0 0 6px #ff5ec8,
            0 0 14px rgba(255, 94, 200, 0.45),
            3px 3px 0 #061827;
        }
        @media (prefers-reduced-motion: reduce) {
          .crt-flicker,
          .blink-cursor::after,
          .pixel-shake:hover {
            animation: none !important;
          }
        }
        @media (max-width: 480px) {
          .pixel-404 { font-size: 64px !important; }
          .pixel-h1 { font-size: 14px !important; line-height: 1.6 !important; }
          .pixel-p { font-size: 9px !important; }
          .pixel-cta { font-size: 9px !important; padding: 12px 14px !important; }
          .pixel-lvl { font-size: 9px !important; padding: 12px !important; }
        }
      `}</style>

      <div className="crt-stars" />
      <div className="crt-grid" />
      <div className="crt-scanlines" />

      <div className="relative z-10 w-full max-w-3xl mx-auto text-center crt-flicker">
        {/* Top status bar */}
        <div className="flex items-center justify-between text-[8px] md:text-[10px] tracking-[0.25em] mb-8 opacity-80">
          <span style={{ color: "#5EEAD4" }}>PLAYER-1</span>
          <span style={{ color: "#00D4FF" }}>{SITE.brand.toUpperCase()}</span>
          <span style={{ color: "#5EEAD4" }}>SCORE 000404</span>
        </div>

        {/* Big 404 */}
        <div
          className="pixel-404 glow-cyan"
          style={{
            fontSize: "clamp(72px, 18vw, 168px)",
            color: "#00D4FF",
            lineHeight: 1,
            marginBottom: "1.5rem",
            letterSpacing: "0.04em",
          }}
        >
          404
        </div>

        {/* Heading */}
        <h1
          className="pixel-h1 glow-magenta"
          style={{
            fontSize: "clamp(14px, 3vw, 22px)",
            color: "#ff5ec8",
            lineHeight: 1.6,
            marginBottom: "1rem",
            letterSpacing: "0.04em",
          }}
        >
          GAME OVER
        </h1>

        {/* Sub-copy w/ blinking cursor */}
        <p
          className="pixel-p blink-cursor"
          style={{
            fontSize: "clamp(9px, 1.6vw, 12px)",
            color: "#eaf6ff",
            lineHeight: 1.9,
            margin: "0 auto 0.75rem",
            maxWidth: "640px",
            letterSpacing: "0.06em",
          }}
        >
          THIS LEVEL DOESN&apos;T EXIST.
        </p>
        <p
          className="pixel-p"
          style={{
            fontSize: "clamp(9px, 1.5vw, 11px)",
            color: "#7ea3bf",
            lineHeight: 1.9,
            margin: "0 auto 2.5rem",
            maxWidth: "640px",
            letterSpacing: "0.06em",
          }}
        >
          HAVE YOU TRIED <span style={{ color: "#5EEAD4" }}>git checkout main</span> ?
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center mb-12">
          <Link
            href="/"
            className="pixel-cta pixel-shake inline-block"
            style={{
              fontFamily: "var(--font-pixel), monospace",
              fontSize: "clamp(10px, 1.5vw, 12px)",
              padding: "16px 22px",
              color: "#061827",
              background: "linear-gradient(180deg, #5EEAD4 0%, #14B8A6 100%)",
              border: "3px solid #061827",
              boxShadow: "0 0 0 3px #5EEAD4, 6px 6px 0 0 rgba(0, 0, 0, 0.55)",
              letterSpacing: "0.18em",
              textDecoration: "none",
            }}
          >
            ▶ RESPAWN (HOME)
          </Link>
          <Link
            href="/contact"
            className="pixel-cta pixel-shake inline-block"
            style={{
              fontFamily: "var(--font-pixel), monospace",
              fontSize: "clamp(10px, 1.5vw, 12px)",
              padding: "16px 22px",
              color: "#5EEAD4",
              background: "#061827",
              border: "3px solid #5EEAD4",
              boxShadow: "6px 6px 0 0 rgba(0, 0, 0, 0.55)",
              letterSpacing: "0.18em",
              textDecoration: "none",
            }}
          >
            ⚡ CHEAT CODE (CONTACT)
          </Link>
        </div>

        {/* LEVEL SELECT */}
        <div className="text-left mx-auto" style={{ maxWidth: "640px" }}>
          <div
            className="text-[10px] md:text-xs mb-4 text-center"
            style={{
              color: "#ff5ec8",
              letterSpacing: "0.3em",
            }}
          >
            ── LEVEL SELECT ──
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {LEVELS.map((lvl) => (
              <li key={lvl.href}>
                <Link
                  href={lvl.href}
                  className="pixel-lvl pixel-shake flex items-center justify-between gap-3 px-4 py-3"
                  style={{
                    fontFamily: "var(--font-pixel), monospace",
                    fontSize: "clamp(9px, 1.3vw, 11px)",
                    color: "#eaf6ff",
                    background: "rgba(10, 45, 74, 0.55)",
                    border: "2px solid rgba(94, 234, 212, 0.35)",
                    letterSpacing: "0.12em",
                    textDecoration: "none",
                  }}
                >
                  <span style={{ color: "#5EEAD4" }}>{lvl.tag}</span>
                  <span>{lvl.label}</span>
                  <span style={{ color: "#00D4FF" }}>▶</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer credits strip */}
        <div
          className="mt-12 text-[8px] md:text-[10px] tracking-[0.3em] opacity-70"
          style={{ color: "#7ea3bf" }}
        >
          PRESS START · INSERT COIN · BUILT BY {SITE.founder.toUpperCase()}
        </div>
      </div>

      {/* Konami easter egg — only client code on the page */}
      <KonamiUnlock />
    </section>
  );
}
