/**
 * Claude Code icon — Anthropic-style starburst sparkle in coral.
 * Used to mark "Claude Code as co-founder" hook across the site.
 *
 * Variants:
 * - <ClaudeCodeIcon /> — default 24px starburst
 * - <ClaudeCodeBadge /> — pill badge w/ icon + "Claude Code · co-founder" label
 * - <ClaudeCodeAvatar /> — circular avatar replacement (use where Waseem avatar exists)
 */

const CORAL = "#D97757";
const CORAL_DARK = "#B85F3F";

export default function ClaudeCodeIcon({
  className,
  size = 24,
  glow = false,
}: {
  className?: string;
  size?: number;
  glow?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={className}
      aria-label="Claude Code"
      role="img"
      style={glow ? { filter: `drop-shadow(0 0 8px ${CORAL}66)` } : undefined}
    >
      <defs>
        <linearGradient id="cc-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={CORAL} />
          <stop offset="100%" stopColor={CORAL_DARK} />
        </linearGradient>
      </defs>
      {/* 4-point starburst, soft round endpoints — Anthropic-styled sparkle */}
      <path
        d="M16 2 C 16.5 9.5, 18 12, 22.5 13.5 C 25 14.4, 28 15, 30 16 C 28 17, 25 17.6, 22.5 18.5 C 18 20, 16.5 22.5, 16 30 C 15.5 22.5, 14 20, 9.5 18.5 C 7 17.6, 4 17, 2 16 C 4 15, 7 14.4, 9.5 13.5 C 14 12, 15.5 9.5, 16 2 Z"
        fill="url(#cc-grad)"
      />
    </svg>
  );
}

export function ClaudeCodeBadge({
  label = "Claude Code · co-founder",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 12px 6px 8px",
        borderRadius: 999,
        background: `linear-gradient(135deg, ${CORAL}22, ${CORAL}11)`,
        border: `1px solid ${CORAL}55`,
        color: CORAL,
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: "0.04em",
        lineHeight: 1.2,
      }}
    >
      <ClaudeCodeIcon size={14} glow />
      <span>{label}</span>
    </span>
  );
}

export function ClaudeCodeAvatar({ size = 56, className }: { size?: number; className?: string }) {
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `linear-gradient(135deg, #2a1810 0%, #4a2820 60%, ${CORAL_DARK} 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `2px solid ${CORAL}66`,
        boxShadow: `0 0 0 1px ${CORAL}33, 0 4px 18px ${CORAL}33`,
        position: "relative",
        overflow: "hidden",
      }}
      aria-label="Claude Code avatar"
    >
      <ClaudeCodeIcon size={size * 0.55} glow />
      <span
        style={{
          position: "absolute",
          bottom: 2,
          right: 2,
          fontSize: 8,
          fontWeight: 700,
          color: CORAL,
          background: "#0a0606",
          borderRadius: 999,
          padding: "1px 4px",
          letterSpacing: "0.05em",
        }}
      >
        CC
      </span>
    </div>
  );
}

/**
 * Inline monogram — pairs Waseem "WN" with Claude "CC" for the
 * "two-person team" micro-brand. Use in header, footer, byline.
 */
export function FounderDuoMonogram({
  className,
  size = 36,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontFamily: "-apple-system, system-ui, sans-serif",
        fontSize: size * 0.35,
        fontWeight: 700,
        letterSpacing: "0.02em",
      }}
      aria-label="Waseem Nasir + Claude Code"
    >
      <span
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #14B8A6, #1E88E5)",
          color: "#fff",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
        }}
      >
        WN
      </span>
      <span style={{ color: "#888", fontSize: size * 0.5, fontWeight: 300 }}>+</span>
      <span
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${CORAL}, ${CORAL_DARK})`,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ClaudeCodeIcon size={size * 0.55} />
      </span>
    </span>
  );
}

export const CLAUDE_CODE_COLORS = {
  primary: CORAL,
  dark: CORAL_DARK,
  pale: `${CORAL}22`,
} as const;
