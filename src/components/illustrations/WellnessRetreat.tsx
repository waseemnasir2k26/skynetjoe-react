import * as React from "react";

type Props = { className?: string };

export default function WellnessRetreat({ className }: Props) {
  return (
    <svg
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Wellness retreat booking flow illustration"
      className={className}
    >
      <defs>
        <linearGradient id="well-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3F6E5C" />
          <stop offset="55%" stopColor="#6FAE8B" />
          <stop offset="100%" stopColor="#D6E9DC" />
        </linearGradient>
        <linearGradient id="well-leaf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F8FFF9" />
          <stop offset="100%" stopColor="#A7D3B5" />
        </linearGradient>
        <radialGradient id="well-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#FFE9B0" />
          <stop offset="100%" stopColor="#FFE9B0" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="320" height="180" fill="url(#well-bg)" />

      {/* Soft sun glow */}
      <circle cx="260" cy="40" r="60" fill="url(#well-sun)" />
      <circle cx="260" cy="40" r="14" fill="#FFE9B0" opacity="0.85" />

      {/* Floating accents */}
      <circle cx="48" cy="32" r="4" fill="#fff" opacity="0.7" />
      <circle cx="80" cy="50" r="2" fill="#fff" opacity="0.5" />
      <rect x="290" y="120" width="8" height="8" rx="2" transform="rotate(30 294 124)" fill="#fff" opacity="0.4" />

      {/* Stem with curves */}
      <path
        d="M130 158 C 130 140 124 122 110 110"
        stroke="#3F6E5C"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M130 158 C 132 130 144 110 158 92"
        stroke="#3F6E5C"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* Lotus petals — center */}
      <g transform="translate(160 92)">
        <path
          d="M0 0 C -22 -18 -40 -10 -36 8 C -28 4 -14 4 0 0 Z"
          fill="url(#well-leaf)"
          opacity="0.92"
        />
        <path
          d="M0 0 C 22 -18 40 -10 36 8 C 28 4 14 4 0 0 Z"
          fill="url(#well-leaf)"
          opacity="0.92"
        />
        <path
          d="M0 0 C -10 -30 -2 -48 8 -42 C 10 -28 6 -12 0 0 Z"
          fill="url(#well-leaf)"
          opacity="0.96"
        />
        <path
          d="M0 0 C -16 -24 -8 -42 4 -36 C 8 -24 6 -10 0 0 Z"
          fill="#fff"
          opacity="0.6"
        />
        <circle cx="0" cy="-2" r="3.5" fill="#FFE9B0" />
      </g>

      {/* Side leaves */}
      <path
        d="M100 110 C 86 102 78 92 82 78 C 94 86 102 96 100 110 Z"
        fill="url(#well-leaf)"
        opacity="0.85"
      />
      <path d="M82 78 C 90 90 96 100 100 110" stroke="#3F6E5C" strokeWidth="0.8" fill="none" opacity="0.5" />

      {/* Booking card (left) */}
      <g transform="translate(20 58)">
        <rect width="80" height="64" rx="8" fill="#fff" opacity="0.96" />
        <rect width="80" height="16" rx="8" fill="#3F6E5C" />
        <text x="40" y="11" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="7" fontWeight="700" fill="#fff" letterSpacing="0.5">
          RETREAT BOOKING
        </text>
        <rect x="8" y="22" width="64" height="5" rx="2" fill="#D6E9DC" />
        <rect x="8" y="30" width="48" height="5" rx="2" fill="#D6E9DC" />
        <rect x="8" y="38" width="58" height="5" rx="2" fill="#D6E9DC" />
        <rect x="8" y="48" width="64" height="10" rx="3" fill="#6FAE8B" />
        <text x="40" y="55" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="6.5" fontWeight="700" fill="#fff">
          CONFIRM →
        </text>
      </g>

      {/* Right side: 3 steps */}
      <g transform="translate(212 124)">
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${i * 30} 0)`}>
            <circle cx="10" cy="10" r="10" fill="#fff" opacity="0.95" />
            <text x="10" y="13" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="9" fontWeight="800" fill="#3F6E5C">
              {i + 1}
            </text>
          </g>
        ))}
        <path d="M22 10 L 28 10" stroke="#fff" strokeWidth="1.6" opacity="0.85" />
        <path d="M52 10 L 58 10" stroke="#fff" strokeWidth="1.6" opacity="0.85" />
      </g>

      {/* Bottom label */}
      <g transform="translate(106 156)">
        <rect width="108" height="16" rx="8" fill="#100f14" opacity="0.45" />
        <text x="54" y="11" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="8" fontWeight="700" fill="#F8FFF9">
          Vow Sanctuary · 98/100
        </text>
      </g>
    </svg>
  );
}
