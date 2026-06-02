import * as React from "react";

type Props = { className?: string };

export default function ConstructionTracker({ className }: Props) {
  return (
    <svg
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Construction tracker portal illustration"
      className={className}
    >
      <defs>
        <linearGradient id="con-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1F2937" />
          <stop offset="55%" stopColor="#475569" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <linearGradient id="con-hat" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>

      <rect width="320" height="180" fill="url(#con-bg)" />

      {/* Grid */}
      {Array.from({ length: 16 }).map((_, c) =>
        Array.from({ length: 9 }).map((_, r) => (
          <rect
            key={`${c}-${r}`}
            x={c * 20}
            y={r * 20}
            width="20"
            height="20"
            fill="none"
            stroke="#fff"
            strokeWidth="0.3"
            opacity="0.08"
          />
        ))
      )}

      {/* Hard hat */}
      <g transform="translate(36 50)">
        <path
          d="M2 44 A 42 42 0 0 1 76 44 Q 76 50 70 50 H 8 Q 2 50 2 44 Z"
          fill="url(#con-hat)"
        />
        <path
          d="M14 44 C 14 20 30 12 39 12 C 48 12 64 20 64 44"
          fill="url(#con-hat)"
        />
        <rect x="36" y="14" width="6" height="32" fill="#7C2D12" opacity="0.6" />
        <rect x="2" y="44" width="74" height="4" fill="#7C2D12" opacity="0.6" />
        <circle cx="39" cy="44" r="3" fill="#fff" opacity="0.9" />
      </g>

      {/* Portal screen */}
      <g transform="translate(140 24)">
        <rect width="164" height="132" rx="8" fill="#0F172A" opacity="0.92" />
        <rect x="1" y="1" width="162" height="14" rx="7" fill="#1F2937" />
        <circle cx="10" cy="8" r="2" fill="#FF6B6B" />
        <circle cx="18" cy="8" r="2" fill="#FCD34D" />
        <circle cx="26" cy="8" r="2" fill="#5EEAD4" />
        <text x="82" y="11" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="7" fill="#94A3B8">
          project-portal/v3
        </text>

        {/* Progress label */}
        <text x="10" y="30" fontFamily="system-ui,sans-serif" fontSize="8" fontWeight="700" fill="#FCD34D" letterSpacing="0.4">
          PHASE 3 OF 5
        </text>
        <text x="10" y="42" fontFamily="system-ui,sans-serif" fontSize="6.5" fill="#94A3B8">
          framing · electrical
        </text>

        {/* Progress bar */}
        <rect x="10" y="48" width="144" height="9" rx="4.5" fill="#1F2937" />
        <rect x="10" y="48" width="86" height="9" rx="4.5" fill="#F59E0B" />
        <text x="100" y="55" fontFamily="system-ui,sans-serif" fontSize="6" fontWeight="700" fill="#fff">
          60%
        </text>

        {/* Timeline */}
        <line x1="14" y1="80" x2="150" y2="80" stroke="#475569" strokeWidth="1.4" />
        {[0, 1, 2, 3, 4].map((i) => {
          const cx = 14 + i * 34;
          const done = i < 3;
          return (
            <g key={i}>
              <circle
                cx={cx}
                cy="80"
                r="4.5"
                fill={done ? "#F59E0B" : "#1F2937"}
                stroke={done ? "#F59E0B" : "#475569"}
                strokeWidth="1.4"
              />
              <text
                x={cx}
                y="94"
                textAnchor="middle"
                fontFamily="system-ui,sans-serif"
                fontSize="5.5"
                fontWeight="700"
                fill={done ? "#FCD34D" : "#64748B"}
              >
                {["DIG", "FND", "FRM", "ELC", "FIN"][i]}
              </text>
            </g>
          );
        })}

        {/* Stats row */}
        <g transform="translate(10 104)">
          <rect width="46" height="22" rx="4" fill="#1F2937" />
          <text x="23" y="10" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="5.5" fill="#94A3B8">
            BUDGET
          </text>
          <text x="23" y="19" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="7" fontWeight="800" fill="#5EEAD4">
            $182K
          </text>
        </g>
        <g transform="translate(60 104)">
          <rect width="46" height="22" rx="4" fill="#1F2937" />
          <text x="23" y="10" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="5.5" fill="#94A3B8">
            DAYS LEFT
          </text>
          <text x="23" y="19" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="7" fontWeight="800" fill="#FCD34D">
            34
          </text>
        </g>
        <g transform="translate(110 104)">
          <rect width="46" height="22" rx="4" fill="#1F2937" />
          <text x="23" y="10" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="5.5" fill="#94A3B8">
            CREW
          </text>
          <text x="23" y="19" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="7" fontWeight="800" fill="#fff">
            12
          </text>
        </g>
      </g>

      {/* Floating cone */}
      <g transform="translate(38 130)">
        <path d="M16 0 L 32 32 H 0 Z" fill="#F59E0B" />
        <rect x="2" y="22" width="28" height="3" fill="#fff" opacity="0.9" />
        <rect x="4" y="14" width="24" height="3" fill="#fff" opacity="0.9" />
      </g>
    </svg>
  );
}
