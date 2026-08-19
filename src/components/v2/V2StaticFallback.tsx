/**
 * Premium static backdrop for mobile (<768px), prefers-reduced-motion, and
 * WebGL-unavailable browsers. No 3D, no JS animation loop — a layered
 * gradient + SVG node lattice that echoes the real scene's composition
 * (same node/link layout, flattened to 2D) so the visual language is
 * consistent across devices instead of degrading to a flat page.
 */
export default function V2StaticFallback() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background:
          "radial-gradient(120% 90% at 50% 0%, #faf7f0 0%, #f2efe6 45%, #ede8dc 100%)",
      }}
    >
      <svg
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <defs>
          <linearGradient id="v2-link" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c66b3f" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#c66b3f" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        {[
          [120, 180, 340, 260],
          [340, 260, 260, 420],
          [260, 420, 520, 460],
          [520, 460, 620, 220],
          [620, 220, 480, 120],
          [120, 180, 260, 420],
          [480, 120, 340, 260],
        ].map(([x1, y1, x2, y2], i) => (
          <path
            key={i}
            d={`M${x1},${y1} Q${(x1 + x2) / 2},${(y1 + y2) / 2 - 60} ${x2},${y2}`}
            stroke="url(#v2-link)"
            strokeWidth={1.5}
            fill="none"
          />
        ))}
        {[
          [120, 180, 16, "#f2efe6"],
          [340, 260, 22, "#e8ded0"],
          [260, 420, 14, "#f2efe6"],
          [520, 460, 20, "#e8ded0"],
          [620, 220, 15, "#f2efe6"],
          [480, 120, 18, "#e8ded0"],
        ].map(([cx, cy, r, fill], i) => (
          <circle
            key={i}
            cx={cx as number}
            cy={cy as number}
            r={r as number}
            fill={fill as string}
            stroke="#c66b3f"
            strokeOpacity={0.35}
            strokeWidth={1}
          />
        ))}
      </svg>
      {/* Layered card stack — flat-safe 2D stand-in for the real WebGL
          node/link scene (V2SceneCanvas + V2SceneContent) that renders on
          wider viewports when WebGL/motion is available. */}
      <div
        style={{
          position: "absolute",
          right: "6%",
          bottom: "8%",
          width: "min(60vw, 260px)",
          aspectRatio: "1 / 1",
          background:
            "linear-gradient(135deg, rgba(198,107,63,0.14), rgba(198,107,63,0.02))",
          border: "1px solid rgba(198,107,63,0.25)",
          borderRadius: 12,
          transform: "rotate(-6deg)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: "12%",
          bottom: "14%",
          width: "min(50vw, 220px)",
          aspectRatio: "1 / 1",
          background:
            "linear-gradient(135deg, rgba(26,26,26,0.05), rgba(26,26,26,0.01))",
          border: "1px solid rgba(26,26,26,0.10)",
          borderRadius: 12,
          transform: "rotate(4deg)",
        }}
      />
    </div>
  );
}
