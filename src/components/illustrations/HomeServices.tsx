import * as React from "react";

type Props = { className?: string };

export default function HomeServices({ className }: Props) {
  return (
    <svg
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Home services SMS reminder flow illustration"
      className={className}
    >
      <defs>
        <linearGradient id="home-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7C2D12" />
          <stop offset="55%" stopColor="#EA580C" />
          <stop offset="100%" stopColor="#FED7AA" />
        </linearGradient>
        <linearGradient id="home-house" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF7ED" />
          <stop offset="100%" stopColor="#FDBA74" />
        </linearGradient>
      </defs>

      <rect width="320" height="180" fill="url(#home-bg)" />

      {/* Floating accents */}
      <circle cx="290" cy="32" r="40" fill="#fff" opacity="0.12" />
      <rect x="20" y="156" width="12" height="12" rx="3" transform="rotate(25 26 162)" fill="#fff" opacity="0.45" />
      <circle cx="46" cy="32" r="3" fill="#fff" opacity="0.85" />

      {/* House */}
      <g transform="translate(36 56)">
        <path d="M44 0 L 88 32 V 84 H 0 V 32 Z" fill="url(#home-house)" />
        <path d="M44 0 L 88 32 V 84 H 0 V 32 Z" fill="none" stroke="#7C2D12" strokeWidth="1.4" />
        {/* roof shading */}
        <path d="M44 0 L 88 32 H 44 Z" fill="#7C2D12" opacity="0.18" />
        {/* door */}
        <rect x="36" y="50" width="18" height="34" rx="2" fill="#7C2D12" />
        <circle cx="50" cy="68" r="1.4" fill="#FFE07A" />
        {/* windows */}
        <rect x="10" y="40" width="18" height="14" rx="1.5" fill="#FFE07A" />
        <line x1="19" y1="40" x2="19" y2="54" stroke="#7C2D12" strokeWidth="0.8" />
        <line x1="10" y1="47" x2="28" y2="47" stroke="#7C2D12" strokeWidth="0.8" />
        <rect x="60" y="40" width="18" height="14" rx="1.5" fill="#FFE07A" />
        <line x1="69" y1="40" x2="69" y2="54" stroke="#7C2D12" strokeWidth="0.8" />
        <line x1="60" y1="47" x2="78" y2="47" stroke="#7C2D12" strokeWidth="0.8" />
        {/* chimney */}
        <rect x="68" y="6" width="8" height="14" fill="#7C2D12" />
      </g>

      {/* SMS bubble */}
      <g transform="translate(150 30)">
        <path
          d="M0 8 A 8 8 0 0 1 8 0 H 96 A 8 8 0 0 1 104 8 V 40 A 8 8 0 0 1 96 48 H 26 L 16 58 L 18 48 H 8 A 8 8 0 0 1 0 40 Z"
          fill="#fff"
          opacity="0.97"
        />
        <text x="8" y="14" fontFamily="system-ui,sans-serif" fontSize="6.5" fontWeight="700" fill="#EA580C" letterSpacing="0.5">
          SMS REMINDER
        </text>
        <rect x="8" y="20" width="88" height="3.5" rx="1.5" fill="#FDBA74" />
        <rect x="8" y="28" width="68" height="3.5" rx="1.5" fill="#FDBA74" />
        <rect x="8" y="36" width="50" height="6" rx="2" fill="#EA580C" />
        <text x="33" y="40.5" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="5.5" fontWeight="800" fill="#fff">
          CONFIRM
        </text>
      </g>

      {/* Mini calendar (right) */}
      <g transform="translate(232 96)">
        <rect width="72" height="68" rx="6" fill="#fff" opacity="0.96" />
        <rect width="72" height="16" rx="6" fill="#7C2D12" />
        <text x="36" y="11" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="7" fontWeight="700" fill="#FED7AA" letterSpacing="0.5">
          NEXT VISIT
        </text>
        {Array.from({ length: 5 }).map((_, c) =>
          Array.from({ length: 3 }).map((_, r) => {
            const isPicked = c === 2 && r === 1;
            return (
              <rect
                key={`${c}-${r}`}
                x={6 + c * 12}
                y={22 + r * 13}
                width="9"
                height="9"
                rx="1.5"
                fill={isPicked ? "#EA580C" : "#FED7AA"}
                opacity={isPicked ? 1 : 0.7}
              />
            );
          })
        )}
      </g>

      {/* Connecting dotted line */}
      <path
        d="M124 92 C 138 92 144 60 150 60"
        stroke="#fff"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="3 4"
        opacity="0.85"
      />
      <path
        d="M254 84 C 260 84 260 100 264 100"
        stroke="#fff"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="3 4"
        opacity="0.85"
      />
    </svg>
  );
}
