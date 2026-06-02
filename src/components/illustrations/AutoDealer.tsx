import * as React from "react";

type Props = { className?: string };

export default function AutoDealer({ className }: Props) {
  return (
    <svg
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Auto dealer site illustration"
      className={className}
    >
      <defs>
        <linearGradient id="auto-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0F172A" />
          <stop offset="55%" stopColor="#1E40AF" />
          <stop offset="100%" stopColor="#60A5FA" />
        </linearGradient>
        <linearGradient id="auto-car" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F1F5F9" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>
      </defs>

      <rect width="320" height="180" fill="url(#auto-bg)" />

      {/* Background grid */}
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

      {/* Headlight glow */}
      <ellipse cx="240" cy="118" rx="80" ry="14" fill="#FCD34D" opacity="0.3" />

      {/* Premium car silhouette */}
      <g transform="translate(56 78)">
        {/* Body */}
        <path
          d="M0 38 C 0 30 6 26 14 26 L 36 24 C 44 14 52 8 76 8 C 100 8 116 14 132 24 L 168 28 C 188 30 196 34 196 42 L 196 50 L 0 50 Z"
          fill="url(#auto-car)"
        />
        <path
          d="M0 38 C 0 30 6 26 14 26 L 36 24 C 44 14 52 8 76 8 C 100 8 116 14 132 24 L 168 28 C 188 30 196 34 196 42 L 196 50 L 0 50 Z"
          fill="none"
          stroke="#0F172A"
          strokeWidth="1.2"
        />
        {/* Windows */}
        <path
          d="M44 22 L 56 14 C 64 11 86 11 96 14 L 104 22 Z"
          fill="#0F172A"
          opacity="0.85"
        />
        <path
          d="M108 22 L 116 14 C 122 11 130 11 134 14 L 142 22 Z"
          fill="#0F172A"
          opacity="0.85"
        />
        {/* Door line */}
        <path d="M76 22 L 76 38" stroke="#94A3B8" strokeWidth="1" />
        {/* Headlight */}
        <ellipse cx="186" cy="36" rx="6" ry="4" fill="#FCD34D" />
        {/* Wheel wells */}
        <circle cx="44" cy="48" r="14" fill="#0F172A" />
        <circle cx="44" cy="48" r="10" fill="#1E293B" />
        <circle cx="44" cy="48" r="4" fill="#FCD34D" />
        <circle cx="156" cy="48" r="14" fill="#0F172A" />
        <circle cx="156" cy="48" r="10" fill="#1E293B" />
        <circle cx="156" cy="48" r="4" fill="#FCD34D" />
        {/* Rim spokes */}
        <g stroke="#94A3B8" strokeWidth="1.2">
          <line x1="44" y1="38" x2="44" y2="58" />
          <line x1="34" y1="48" x2="54" y2="48" />
          <line x1="156" y1="38" x2="156" y2="58" />
          <line x1="146" y1="48" x2="166" y2="48" />
        </g>
      </g>

      {/* Price tile */}
      <g transform="translate(18 22)">
        <rect width="84" height="50" rx="8" fill="#fff" opacity="0.97" />
        <text x="8" y="14" fontFamily="system-ui,sans-serif" fontSize="6" fill="#1E40AF" opacity="0.6" letterSpacing="0.5">
          MSRP FROM
        </text>
        <text x="8" y="32" fontFamily="system-ui,sans-serif" fontSize="14" fontWeight="900" fill="#0F172A">
          $74,500
        </text>
        <rect x="8" y="38" width="32" height="6" rx="2" fill="#10B981" />
        <text x="24" y="43" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="4.5" fontWeight="800" fill="#fff" letterSpacing="0.4">
          IN STOCK
        </text>
      </g>

      {/* Calc/finance card */}
      <g transform="translate(228 24)">
        <rect width="78" height="46" rx="8" fill="#0F172A" opacity="0.92" />
        <rect x="1" y="1" width="76" height="44" rx="7" fill="none" stroke="#60A5FA" strokeWidth="1" opacity="0.6" />
        <text x="8" y="12" fontFamily="system-ui,sans-serif" fontSize="6" fill="#60A5FA" letterSpacing="0.4">
          FINANCE
        </text>
        {/* slider */}
        <rect x="8" y="18" width="62" height="3" rx="1.5" fill="#1E293B" />
        <rect x="8" y="18" width="38" height="3" rx="1.5" fill="#60A5FA" />
        <circle cx="46" cy="19.5" r="3.5" fill="#FCD34D" />
        <text x="8" y="34" fontFamily="system-ui,sans-serif" fontSize="6.5" fill="#fff" opacity="0.7">
          60 mo @
        </text>
        <text x="38" y="34" fontFamily="system-ui,sans-serif" fontSize="8" fontWeight="800" fill="#FCD34D">
          $899/mo
        </text>
      </g>

      {/* Ground line */}
      <line x1="0" y1="148" x2="320" y2="148" stroke="#1E293B" strokeWidth="3" />
      <line x1="0" y1="148" x2="320" y2="148" stroke="#FCD34D" strokeWidth="0.8" opacity="0.6" strokeDasharray="6 8" />

      {/* Stat */}
      <g transform="translate(96 156)">
        <rect width="128" height="16" rx="8" fill="#100f14" opacity="0.6" />
        <text x="64" y="11" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="8" fontWeight="700" fill="#FCD34D">
          15 model pages · cited in Perplexity
        </text>
      </g>
    </svg>
  );
}
