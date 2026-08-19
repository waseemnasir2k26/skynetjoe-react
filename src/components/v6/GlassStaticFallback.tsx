"use client";

/**
 * CSS-only glass layer for mobile/touch, prefers-reduced-motion, and
 * WebGL-unavailable browsers — no Canvas, no 3D, no frame loop. Three
 * blurred rust/cream radial-gradient discs with a translucent
 * backdrop-filter blur stand in for the transmission-glass shapes, fixed to
 * the viewport (same footprint as GlassCanvas) so the page still reads as
 * "glass floating over cream paper" rather than a flat fallback. `animate`
 * gates the gentle CSS float — off entirely for prefers-reduced-motion.
 *
 * Narrow-viewport override (<=640px): the middle-left disc (v6-glass-b)
 * defaults to a position that sat directly on top of the hero CTA button on
 * a 390px-wide screen, hurting legibility — pushed further down + shrunk +
 * lowered opacity under the max-width query below so it never sits over
 * primary CTA copy on phone-width viewports.
 */
export default function GlassStaticFallback({ animate }: { animate: boolean }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 5,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes v6-float-a { 0%,100% { transform: translate(0,0) rotate(0deg); } 50% { transform: translate(-14px, 22px) rotate(6deg); } }
        @keyframes v6-float-b { 0%,100% { transform: translate(0,0) rotate(0deg); } 50% { transform: translate(18px, -16px) rotate(-5deg); } }
        @keyframes v6-float-c { 0%,100% { transform: translate(0,0) rotate(0deg); } 50% { transform: translate(-10px, -18px) rotate(4deg); } }
        @media (max-width: 640px) {
          .v6-glass-b {
            top: 74% !important;
            left: -8% !important;
            width: 130px !important;
            height: 130px !important;
            opacity: 0.6 !important;
          }
        }
      `}</style>
      <div
        style={{
          position: "absolute",
          top: "8%",
          right: "6%",
          width: "clamp(140px, 30vw, 260px)",
          height: "clamp(140px, 30vw, 260px)",
          borderRadius: "42% 58% 63% 37% / 41% 44% 56% 59%",
          background:
            "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.85), rgba(198,107,63,0.28) 55%, rgba(198,107,63,0.08) 80%)",
          border: "1px solid rgba(198,107,63,0.3)",
          backdropFilter: "blur(2px)",
          boxShadow: "0 30px 70px rgba(26,26,26,0.1)",
          animation: animate ? "v6-float-a 9s ease-in-out infinite" : "none",
        }}
      />
      <div
        className="v6-glass-b"
        style={{
          position: "absolute",
          top: "48%",
          left: "4%",
          width: "clamp(120px, 26vw, 220px)",
          height: "clamp(120px, 26vw, 220px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 40% 35%, rgba(255,255,255,0.8), rgba(168,69,31,0.25) 55%, rgba(168,69,31,0.06) 80%)",
          border: "1px solid rgba(168,69,31,0.28)",
          backdropFilter: "blur(2px)",
          boxShadow: "0 24px 60px rgba(26,26,26,0.1)",
          animation: animate ? "v6-float-b 11s ease-in-out infinite" : "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "12%",
          width: "clamp(100px, 20vw, 180px)",
          height: "clamp(100px, 20vw, 180px)",
          clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.7), rgba(198,107,63,0.22) 60%, rgba(198,107,63,0.05) 100%)",
          border: "1px solid rgba(198,107,63,0.25)",
          backdropFilter: "blur(2px)",
          animation: animate ? "v6-float-c 8s ease-in-out infinite" : "none",
        }}
      />
    </div>
  );
}
