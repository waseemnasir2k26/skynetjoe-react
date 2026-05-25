/**
 * Cream editorial pivot 2026-05-25 — loading state.
 * Single concentric ring spinner, terracotta on cream.
 */
export default function Loading() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--cream)",
      }}
    >
      <div className="flex flex-col items-center gap-6">
        <div style={{ position: "relative" }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              border: "3px solid rgba(26,26,26,0.10)",
              borderTopColor: "var(--terracotta)",
              animation: "spin 1s linear infinite",
            }}
          />
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            color: "var(--terracotta)",
            fontWeight: 600,
          }}
        >
          — Loading
        </div>
      </div>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="animation: spin"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
