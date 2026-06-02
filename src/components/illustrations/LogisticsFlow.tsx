import * as React from "react";

type Props = { className?: string };

export default function LogisticsFlow({ className }: Props) {
  return (
    <svg
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="EU logistics dispatch route illustration"
      className={className}
    >
      <defs>
        <linearGradient id="log-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0B3D6B" />
          <stop offset="55%" stopColor="#1E88E5" />
          <stop offset="100%" stopColor="#00D4FF" />
        </linearGradient>
        <linearGradient id="log-truck" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F4F8FB" />
          <stop offset="100%" stopColor="#BFD9EE" />
        </linearGradient>
      </defs>

      <rect width="320" height="180" fill="url(#log-bg)" />

      {/* Grid dots background */}
      {Array.from({ length: 12 }).map((_, c) =>
        Array.from({ length: 7 }).map((_, r) => (
          <circle key={`${c}-${r}`} cx={12 + c * 28} cy={12 + r * 24} r="1" fill="#fff" opacity="0.12" />
        ))
      )}

      {/* Floating accents */}
      <circle cx="40" cy="36" r="32" fill="#00D4FF" opacity="0.12" />
      <rect x="270" y="20" width="14" height="14" rx="3" transform="rotate(45 277 27)" fill="#fff" opacity="0.18" />

      {/* Route line */}
      <path
        d="M30 132 Q 80 88 130 110 T 230 80 Q 270 70 296 96"
        stroke="#00D4FF"
        strokeWidth="2.5"
        fill="none"
        strokeDasharray="6 5"
      />

      {/* Route waypoints */}
      <g>
        <circle cx="30" cy="132" r="6" fill="#fff" stroke="#00D4FF" strokeWidth="2.5" />
        <circle cx="30" cy="132" r="2.5" fill="#00D4FF" />
        <text x="38" y="148" fontFamily="system-ui,sans-serif" fontSize="8.5" fontWeight="700" fill="#fff">
          ORD
        </text>
      </g>
      <g>
        <circle cx="130" cy="110" r="5" fill="#FFB547" />
        <circle cx="130" cy="110" r="9" fill="none" stroke="#FFB547" strokeWidth="1.2" opacity="0.6" />
      </g>
      <g>
        <circle cx="230" cy="80" r="5" fill="#FFB547" />
        <circle cx="230" cy="80" r="9" fill="none" stroke="#FFB547" strokeWidth="1.2" opacity="0.6" />
      </g>
      <g>
        <circle cx="296" cy="96" r="6" fill="#fff" stroke="#FF6B6B" strokeWidth="2.5" />
        <circle cx="296" cy="96" r="2.5" fill="#FF6B6B" />
        <text x="270" y="84" fontFamily="system-ui,sans-serif" fontSize="8.5" fontWeight="700" fill="#fff">
          DFW
        </text>
      </g>

      {/* Truck silhouette */}
      <g transform="translate(72 64)">
        {/* Trailer */}
        <rect width="60" height="34" rx="3" fill="url(#log-truck)" />
        <rect x="3" y="4" width="54" height="22" fill="#1E88E5" opacity="0.4" />
        <rect x="6" y="6" width="22" height="4" fill="#fff" opacity="0.6" />
        <rect x="6" y="12" width="16" height="3" fill="#fff" opacity="0.45" />
        {/* Cab */}
        <rect x="60" y="10" width="22" height="24" rx="2" fill="url(#log-truck)" />
        <rect x="64" y="13" width="14" height="9" rx="1.5" fill="#0B3D6B" />
        <rect x="65" y="14.5" width="6" height="6" fill="#00D4FF" opacity="0.75" />
        {/* Wheels */}
        <circle cx="12" cy="36" r="5.5" fill="#100f14" />
        <circle cx="12" cy="36" r="2.5" fill="#5EEAD4" />
        <circle cx="46" cy="36" r="5.5" fill="#100f14" />
        <circle cx="46" cy="36" r="2.5" fill="#5EEAD4" />
        <circle cx="72" cy="36" r="5.5" fill="#100f14" />
        <circle cx="72" cy="36" r="2.5" fill="#5EEAD4" />
      </g>

      {/* Dashboard tile (top right) */}
      <g transform="translate(196 18)">
        <rect width="106" height="46" rx="6" fill="#0B3D6B" opacity="0.86" />
        <rect x="1" y="1" width="104" height="44" rx="5.5" fill="none" stroke="#5EEAD4" strokeWidth="1" opacity="0.4" />
        <text x="8" y="14" fontFamily="system-ui,sans-serif" fontSize="7" fontWeight="700" fill="#5EEAD4" letterSpacing="0.5">
          DISPATCH
        </text>
        {/* Sparkline */}
        <polyline
          points="8,32 22,28 32,30 44,22 58,26 70,18 84,20 98,12"
          fill="none"
          stroke="#00D4FF"
          strokeWidth="1.6"
        />
        <circle cx="98" cy="12" r="2.4" fill="#00D4FF" />
        <text x="8" y="40" fontFamily="system-ui,sans-serif" fontSize="6.5" fill="#fff" opacity="0.8">
          €2.1K/mo saved
        </text>
      </g>

      {/* Bottom label */}
      <g transform="translate(170 152)">
        <rect width="132" height="18" rx="9" fill="#100f14" opacity="0.55" />
        <text x="66" y="12" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="9" fontWeight="700" fill="#5EEAD4">
          n8n + Airtable + Slack
        </text>
      </g>
    </svg>
  );
}
