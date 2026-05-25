/**
 * ScarcityChip — inline "N of M slots left" chip with pulsing amber dot.
 *
 * Psychology stack:
 *   - Cialdini scarcity (real countable supply, not vague "limited time")
 *   - Anchoring (Kahneman): showing M and N anchors perceived rarity
 *
 * Server component. Numbers ALWAYS come from src/data/availability.ts so
 * one-file edit propagates sitewide.
 *
 * Notes:
 *   - Pulse uses pure CSS @keyframes (no JS); respects prefers-reduced-motion
 *     globally via the @media block.
 *   - Default tone: amber (urgency without alarm). Use `tone="rose"` for
 *     loss-frame contexts.
 */

import {
  SLOTS_LEFT_THIS_WEEK,
  SLOTS_TOTAL_PER_WEEK,
  CURRENT_CYCLE_LABEL,
} from "@/data/availability";

export type ScarcityChipProps = {
  /** Override the "left" count. Defaults to SLOTS_LEFT_THIS_WEEK. */
  left?: number;
  /** Override the "total" count. Defaults to SLOTS_TOTAL_PER_WEEK. */
  total?: number;
  /** Override the cycle label. Defaults to "this week". */
  cycle?: string;
  /** Slot noun. Default: "strategy slots". */
  noun?: string;
  /** Color tone for the dot + border. */
  tone?: "amber" | "rose" | "cyan";
  /** Size preset. Default sm. */
  size?: "xs" | "sm" | "md";
  className?: string;
};

// Cream editorial — semantic warm tones only.
// Legacy keys ("amber"/"rose"/"cyan") retained for API stability.
// amber → ochre, rose → oxblood, cyan → terracotta.
const TONE = {
  amber: {
    dot: "#C9A96E",
    glow: "rgba(201, 169, 110, 0.45)",
    bg: "rgba(201, 169, 110, 0.10)",
    border: "rgba(201, 169, 110, 0.35)",
    text: "#6B2C2C",
  },
  rose: {
    dot: "#6B2C2C",
    glow: "rgba(107, 44, 44, 0.45)",
    bg: "rgba(107, 44, 44, 0.08)",
    border: "rgba(107, 44, 44, 0.30)",
    text: "#6B2C2C",
  },
  cyan: {
    dot: "#C66B3F",
    glow: "rgba(198, 107, 63, 0.45)",
    bg: "rgba(198, 107, 63, 0.10)",
    border: "rgba(198, 107, 63, 0.35)",
    text: "#B85A30",
  },
};

const SIZE = {
  xs: { pad: "px-2.5 py-1", text: "text-[10px]", dot: "w-1.5 h-1.5" },
  sm: { pad: "px-3 py-1.5", text: "text-xs", dot: "w-2 h-2" },
  md: { pad: "px-4 py-2", text: "text-sm", dot: "w-2.5 h-2.5" },
};

export default function ScarcityChip({
  left = SLOTS_LEFT_THIS_WEEK,
  total = SLOTS_TOTAL_PER_WEEK,
  cycle = CURRENT_CYCLE_LABEL,
  noun = "strategy slots",
  tone = "amber",
  size = "sm",
  className = "",
}: ScarcityChipProps) {
  const t = TONE[tone];
  const s = SIZE[size];

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full font-semibold tracking-wider uppercase ${s.pad} ${s.text} ${className}`}
      style={{
        background: t.bg,
        border: `1px solid ${t.border}`,
        color: t.text,
      }}
      role="status"
      aria-label={`${left} of ${total} ${noun} left ${cycle}`}
    >
      <span
        aria-hidden
        className={`inline-block rounded-full shrink-0 ${s.dot}`}
        style={{
          background: t.dot,
          boxShadow: `0 0 10px ${t.glow}`,
          animation: "skynet-scarcity-pulse 2.2s ease-in-out infinite",
        }}
      />
      <span>
        {left} of {total} {noun} left {cycle}
      </span>
      <style>{`
        @keyframes skynet-scarcity-pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="skynet-scarcity-pulse"] { animation: none !important; }
        }
      `}</style>
    </span>
  );
}
