import { HERO_OBJECTS } from "./heroObjectsData";

/**
 * Premium static composition for mobile-weak/prefers-reduced-motion/no-WebGL
 * — no physics, no JS animation loop, no CLS risk. A hand-placed "settled
 * pile" of the same 5 labeled tiles the live physics scene tumbles in, laid
 * out with fixed rotations/offsets so it reads as a deliberate illustration,
 * not a placeholder. Same convention as v3's MachineStaticFallback.tsx.
 */
const LAYOUT: { x: number; y: number; rot: number; scale: number }[] = [
  { x: 58, y: 62, rot: -6, scale: 1.15 },
  { x: 8, y: 30, rot: 8, scale: 0.95 },
  { x: 74, y: 18, rot: -12, scale: 0.85 },
  { x: 30, y: 68, rot: 14, scale: 1.0 },
  { x: 52, y: 8, rot: -4, scale: 0.78 },
];

export default function HeroStaticFallback() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* Ink floor-line, matching the live scene's floor plane. */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: "18%",
          height: 2,
          background: "rgba(26,26,26,0.14)",
        }}
      />
      {HERO_OBJECTS.map((def, i) => {
        const l = LAYOUT[i];
        return (
          <div
            key={def.id}
            style={{
              position: "absolute",
              left: `${l.x}%`,
              bottom: `${18 + l.y * 0.28}%`,
              transform: `translate(-50%, 0) rotate(${l.rot}deg) scale(${l.scale})`,
              width: 64,
              height: def.shape === "box" && def.args[1] < 0.2 ? 64 : 56,
              borderRadius: def.shape === "ball" ? "50%" : 8,
              background: def.color,
              border: "1px solid rgba(26,26,26,0.14)",
              boxShadow: "0 14px 28px rgba(26,26,26,0.16)",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              paddingBottom: 6,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 8.5,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: def.accent ? "var(--cream-3)" : "var(--ink)",
                whiteSpace: "nowrap",
              }}
            >
              {def.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
