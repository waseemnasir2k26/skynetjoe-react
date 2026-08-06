/**
 * Route-segment Suspense fallback for (skynet) — shown while the homepage
 * (and any other top-level route in this group) streams in.
 *
 * 2026-08-06: replaced the full-viewport centered spinner with a skeleton
 * that mirrors HeroFunnel's actual layout (same container-x grid, same
 * clamp() paddings, same md:grid-cols-[1.3fr_1fr] split) so there's no
 * visible layout shift when the real hero swaps in. Cream/ink palette only,
 * no new deps — pure CSS pulse animation.
 */
export default function Loading() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--cream-3)",
      }}
    >
      <style>{`
        @keyframes skel-pulse {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 1; }
        }
        .skel-bar { animation: skel-pulse 1.6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .skel-bar { animation: none; }
        }
      `}</style>
      <section
        style={{
          paddingTop: "clamp(96px, 18vw, 144px)",
          paddingBottom: "clamp(56px, 12vw, 112px)",
        }}
      >
        <div
          className="container-x grid md:grid-cols-[1.3fr_1fr] items-end"
          style={{
            paddingLeft: "clamp(16px, 5vw, 24px)",
            paddingRight: "clamp(16px, 5vw, 24px)",
            gap: "clamp(28px, 6vw, 56px)",
          }}
        >
          {/* Left column — eyebrow, headline, subline, CTA pills */}
          <div>
            <div
              className="skel-bar"
              style={{
                width: 220,
                maxWidth: "70%",
                height: 11,
                borderRadius: 2,
                background: "rgba(168,69,31,0.16)",
                marginBottom: 22,
              }}
            />
            <div
              className="skel-bar"
              style={{
                width: "90%",
                height: "clamp(32px, 8vw, 68px)",
                maxHeight: 56,
                borderRadius: 4,
                background: "rgba(26,26,26,0.08)",
                marginBottom: 14,
              }}
            />
            <div
              className="skel-bar"
              style={{
                width: "62%",
                height: "clamp(32px, 8vw, 68px)",
                maxHeight: 56,
                borderRadius: 4,
                background: "rgba(26,26,26,0.08)",
                marginBottom: 24,
              }}
            />
            <div
              className="skel-bar"
              style={{
                width: "100%",
                maxWidth: "54ch",
                height: 16,
                borderRadius: 3,
                background: "rgba(26,26,26,0.06)",
                marginBottom: 10,
              }}
            />
            <div
              className="skel-bar"
              style={{
                width: "80%",
                maxWidth: "44ch",
                height: 16,
                borderRadius: 3,
                background: "rgba(26,26,26,0.06)",
                marginBottom: 28,
              }}
            />
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 24,
              }}
            >
              <div
                className="skel-bar"
                style={{
                  width: 220,
                  height: 48,
                  borderRadius: 2,
                  background: "rgba(168,69,31,0.22)",
                }}
              />
              <div
                className="skel-bar"
                style={{
                  width: 130,
                  height: 20,
                  borderRadius: 2,
                  background: "rgba(26,26,26,0.08)",
                }}
              />
            </div>
          </div>

          {/* Right column — icon-card placeholder */}
          <div
            style={{
              width: "100%",
              maxWidth: 420,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <div
              className="skel-bar"
              style={{
                background: "rgba(26,26,26,0.04)",
                border: "1px solid rgba(26,26,26,0.10)",
                borderRadius: 4,
                height: 300,
                width: "100%",
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
