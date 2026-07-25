import * as React from "react";

type Props = { className?: string };

export default function DentalFlow({ className }: Props) {
  return (
    <svg
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Dental no-show automation flow illustration"
      className={className}
    >
      <defs>
        <linearGradient id="dental-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF8FA3" />
          <stop offset="55%" stopColor="#E85A6F" />
          <stop offset="100%" stopColor="#7A2540" />
        </linearGradient>
        <linearGradient id="dental-tooth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF7F8" />
          <stop offset="100%" stopColor="#FFD9DF" />
        </linearGradient>
        <linearGradient id="dental-bubble" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#25D366" />
          <stop offset="100%" stopColor="#128C7E" />
        </linearGradient>
      </defs>

      <rect width="320" height="180" fill="url(#dental-bg)" />

      {/* Soft floating circles */}
      <circle cx="40" cy="40" r="48" fill="#fff" opacity="0.08" />
      <circle cx="290" cy="150" r="36" fill="#fff" opacity="0.06" />
      <circle cx="280" cy="30" r="6" fill="#FFD9DF" opacity="0.85" />
      <rect
        x="22"
        y="124"
        width="10"
        height="10"
        rx="2"
        transform="rotate(35 27 129)"
        fill="#fff"
        opacity="0.4"
      />

      {/* Calendar card (left) */}
      <g transform="translate(28 56)">
        <rect width="92" height="80" rx="10" fill="#fff" opacity="0.96" />
        <rect width="92" height="20" rx="10" fill="#E85A6F" />
        <rect y="14" width="92" height="6" fill="#E85A6F" />
        <text
          x="46"
          y="14"
          textAnchor="middle"
          fontFamily="system-ui,sans-serif"
          fontSize="9"
          fontWeight="700"
          fill="#fff"
        >
          APPOINTMENTS
        </text>
        {/* Grid dots */}
        {[0, 1, 2, 3, 4, 5, 6].map((c) =>
          [0, 1, 2, 3].map((r) => {
            const filled = (c + r) % 4 === 0;
            return (
              <circle
                key={`${c}-${r}`}
                cx={9 + c * 12}
                cy={32 + r * 11}
                r="2.6"
                fill={filled ? "#E85A6F" : "#FCE4E8"}
              />
            );
          }),
        )}
        {/* Highlighted day */}
        <rect x="42" y="40" width="14" height="14" rx="3" fill="#7A2540" />
        <text
          x="49"
          y="50"
          textAnchor="middle"
          fontFamily="system-ui,sans-serif"
          fontSize="8"
          fontWeight="700"
          fill="#fff"
        >
          14
        </text>
      </g>

      {/* Tooth icon (center) */}
      <g transform="translate(150 38)">
        <path
          d="M30 8 C 12 8 4 22 4 36 C 4 52 10 64 14 78 C 16 86 18 96 22 102 C 26 108 30 102 32 92 C 34 82 34 70 36 64 C 38 58 42 58 44 64 C 46 70 46 82 48 92 C 50 102 54 108 58 102 C 62 96 64 86 66 78 C 70 64 76 52 76 36 C 76 22 68 8 50 8 C 44 8 42 12 40 12 C 38 12 36 8 30 8 Z"
          fill="url(#dental-tooth)"
          stroke="#fff"
          strokeWidth="1.5"
        />
        <path
          d="M22 30 Q 28 24 38 26"
          stroke="#FFB8C2"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="40" cy="48" r="3.2" fill="#fff" opacity="0.9" />
      </g>

      {/* WhatsApp bubble (right) */}
      <g transform="translate(232 70)">
        <path
          d="M14 0 H 64 A 14 14 0 0 1 78 14 V 46 A 14 14 0 0 1 64 60 H 20 L 8 70 L 12 60 H 14 A 14 14 0 0 1 0 46 V 14 A 14 14 0 0 1 14 0 Z"
          fill="url(#dental-bubble)"
        />
        <rect
          x="10"
          y="14"
          width="56"
          height="3.5"
          rx="1.5"
          fill="#fff"
          opacity="0.85"
        />
        <rect
          x="10"
          y="22"
          width="44"
          height="3.5"
          rx="1.5"
          fill="#fff"
          opacity="0.7"
        />
        <rect
          x="10"
          y="30"
          width="50"
          height="3.5"
          rx="1.5"
          fill="#fff"
          opacity="0.7"
        />
        <circle cx="14" cy="44" r="2.5" fill="#fff" />
        <circle cx="22" cy="44" r="2.5" fill="#fff" />
        <circle cx="30" cy="44" r="2.5" fill="#fff" />
      </g>

      {/* Connecting flow lines */}
      <path
        d="M120 96 C 138 94 144 78 160 78"
        stroke="#fff"
        strokeWidth="1.8"
        fill="none"
        strokeDasharray="3 4"
        opacity="0.85"
      />
      <path
        d="M210 110 C 220 106 228 102 232 100"
        stroke="#fff"
        strokeWidth="1.8"
        fill="none"
        strokeDasharray="3 4"
        opacity="0.85"
      />

      {/* Stat chip */}
      <g transform="translate(16 154)">
        <rect width="96" height="18" rx="9" fill="#100f14" opacity="0.6" />
        <text
          x="48"
          y="12"
          textAnchor="middle"
          fontFamily="system-ui,sans-serif"
          fontSize="9"
          fontWeight="700"
          fill="#FFD9DF"
        >
          32% → 9% no-show
        </text>
      </g>
    </svg>
  );
}
