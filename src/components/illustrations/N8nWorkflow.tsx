import * as React from "react";

type Props = { className?: string };

export default function N8nWorkflow({ className }: Props) {
  return (
    <svg
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="n8n workflow node graph illustration"
      className={className}
    >
      <defs>
        <linearGradient id="n8n-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#831843" />
          <stop offset="55%" stopColor="#E11D48" />
          <stop offset="100%" stopColor="#FB7185" />
        </linearGradient>
        <linearGradient id="n8n-node" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE4E6" />
          <stop offset="100%" stopColor="#FB7185" />
        </linearGradient>
      </defs>

      <rect width="320" height="180" fill="url(#n8n-bg)" />

      {/* Background grid */}
      {Array.from({ length: 17 }).map((_, c) =>
        Array.from({ length: 10 }).map((_, r) => (
          <circle key={`${c}-${r}`} cx={10 + c * 20} cy={10 + r * 20} r="0.8" fill="#fff" opacity="0.12" />
        ))
      )}

      {/* Floating geometric */}
      <rect x="270" y="20" width="14" height="14" rx="3" transform="rotate(15 277 27)" fill="#fff" opacity="0.18" />
      <circle cx="36" cy="34" r="20" fill="#fff" opacity="0.08" />

      {/* Connector wires */}
      <g stroke="#FFE4E6" strokeWidth="2.2" fill="none">
        <path d="M58 92 C 92 92 92 50 130 50" />
        <path d="M58 92 C 92 92 92 134 130 134" />
        <path d="M170 50 C 200 50 200 92 234 92" />
        <path d="M170 134 C 200 134 200 92 234 92" />
      </g>
      {/* Animated dot dashes on wires */}
      <g stroke="#5EEAD4" strokeWidth="1.4" fill="none" strokeDasharray="3 5">
        <path d="M58 92 C 92 92 92 50 130 50" />
        <path d="M58 92 C 92 92 92 134 130 134" />
        <path d="M170 50 C 200 50 200 92 234 92" />
        <path d="M170 134 C 200 134 200 92 234 92" />
      </g>

      {/* Trigger node (left) */}
      <g transform="translate(28 70)">
        <rect width="60" height="44" rx="10" fill="url(#n8n-node)" />
        <rect width="60" height="44" rx="10" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.4" />
        <circle cx="14" cy="22" r="6" fill="#831843" />
        <path d="M11 22 L 17 22 M 14 19 L 14 25" stroke="#FFE4E6" strokeWidth="1.5" strokeLinecap="round" />
        <text x="36" y="20" fontFamily="system-ui,sans-serif" fontSize="6.5" fontWeight="700" fill="#831843">
          TRIGGER
        </text>
        <text x="36" y="30" fontFamily="system-ui,sans-serif" fontSize="5.5" fill="#831843" opacity="0.7">
          on email
        </text>
      </g>

      {/* Middle nodes */}
      <g transform="translate(130 28)">
        <rect width="40" height="44" rx="10" fill="url(#n8n-node)" />
        <rect width="40" height="44" rx="10" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.4" />
        <path
          d="M14 14 L 26 14 L 14 30 L 26 30"
          stroke="#831843"
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text x="20" y="39" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="5" fontWeight="700" fill="#831843">
          PARSE
        </text>
      </g>

      <g transform="translate(130 112)">
        <rect width="40" height="44" rx="10" fill="url(#n8n-node)" />
        <rect width="40" height="44" rx="10" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.4" />
        <circle cx="20" cy="20" r="6" fill="#831843" />
        <path d="M16 22 L 20 26 L 26 16" stroke="#FFE4E6" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="20" y="39" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="5" fontWeight="700" fill="#831843">
          ROUTE
        </text>
      </g>

      {/* End node — AI */}
      <g transform="translate(234 70)">
        <rect width="60" height="44" rx="10" fill="#100f14" />
        <rect width="60" height="44" rx="10" fill="none" stroke="#5EEAD4" strokeWidth="1.6" />
        <path
          d="M14 14 L 18 22 L 14 30 M 22 14 L 22 30 M 28 14 L 26 22 L 32 22 L 34 14"
          stroke="#5EEAD4"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text x="44" y="20" fontFamily="system-ui,sans-serif" fontSize="6" fontWeight="700" fill="#5EEAD4">
          AI
        </text>
        <text x="44" y="30" fontFamily="system-ui,sans-serif" fontSize="5.5" fill="#fff" opacity="0.8">
          draft
        </text>
      </g>

      {/* Header label */}
      <g transform="translate(14 12)">
        <rect width="60" height="16" rx="8" fill="#100f14" opacity="0.6" />
        <text x="30" y="11" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="8" fontWeight="800" fill="#FFE4E6" letterSpacing="0.5">
          n8n
        </text>
      </g>

      {/* Bottom data chip */}
      <g transform="translate(98 156)">
        <rect width="124" height="16" rx="8" fill="#100f14" opacity="0.55" />
        <text x="62" y="11" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="7.5" fontWeight="700" fill="#5EEAD4">
          200 docs/mo · auto-routed
        </text>
      </g>
    </svg>
  );
}
