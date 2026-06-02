import * as React from "react";

type Props = { className?: string };

export default function WordPressSite({ className }: Props) {
  return (
    <svg
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="WordPress site build illustration"
      className={className}
    >
      <defs>
        <linearGradient id="wp-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0C4A6E" />
          <stop offset="55%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#7DD3FC" />
        </linearGradient>
      </defs>

      <rect width="320" height="180" fill="url(#wp-bg)" />

      {/* Floating squares */}
      <rect x="282" y="22" width="16" height="16" rx="3" transform="rotate(25 290 30)" fill="#fff" opacity="0.2" />
      <circle cx="38" cy="34" r="22" fill="#fff" opacity="0.1" />

      {/* Browser frame */}
      <g transform="translate(28 28)">
        <rect width="264" height="138" rx="8" fill="#0C4A6E" opacity="0.96" />
        <rect width="264" height="20" rx="8" fill="#082F49" />
        <circle cx="12" cy="10" r="3" fill="#FF6B6B" />
        <circle cx="22" cy="10" r="3" fill="#FCD34D" />
        <circle cx="32" cy="10" r="3" fill="#5EEAD4" />
        <rect x="48" y="4" width="180" height="12" rx="6" fill="#0C4A6E" />
        <text x="138" y="13" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="6.5" fill="#7DD3FC">
          skynetjoe.com/wp
        </text>

        {/* WP "W" badge */}
        <g transform="translate(14 30)">
          <circle cx="14" cy="14" r="14" fill="#fff" />
          <circle cx="14" cy="14" r="14" fill="none" stroke="#0EA5E9" strokeWidth="1.6" />
          <path
            d="M5 9 L 9 20 L 11 14 L 14 21 L 17 14 L 19 20 L 23 9"
            stroke="#0EA5E9"
            strokeWidth="1.6"
            fill="none"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </g>

        {/* Header text */}
        <text x="50" y="40" fontFamily="system-ui,sans-serif" fontSize="9" fontWeight="800" fill="#fff" letterSpacing="0.4">
          NICHE FLAGSHIP
        </text>
        <text x="50" y="50" fontFamily="system-ui,sans-serif" fontSize="6" fill="#7DD3FC">
          Lighthouse 98 · 3-day ship
        </text>

        {/* Content blocks row */}
        <g transform="translate(14 70)">
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${i * 80} 0)`}>
              <rect width="72" height="56" rx="5" fill="#082F49" />
              <rect x="4" y="4" width="64" height="22" rx="3" fill="#0EA5E9" opacity="0.5" />
              {/* mini chart bars */}
              <rect x="10" y="10" width="6" height="12" fill="#5EEAD4" />
              <rect x="20" y="14" width="6" height="8" fill="#7DD3FC" />
              <rect x="30" y="6" width="6" height="16" fill="#fff" />
              <rect x="40" y="12" width="6" height="10" fill="#5EEAD4" />
              <rect x="50" y="8" width="6" height="14" fill="#7DD3FC" />
              <rect x="4" y="32" width="50" height="3" rx="1" fill="#fff" opacity="0.7" />
              <rect x="4" y="40" width="36" height="3" rx="1" fill="#fff" opacity="0.45" />
              <rect x="4" y="48" width="44" height="4" rx="1.5" fill="#0EA5E9" />
            </g>
          ))}
        </g>
      </g>

      {/* Tag/badge floating */}
      <g transform="translate(232 138)">
        <rect width="64" height="22" rx="11" fill="#fff" />
        <text x="32" y="15" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="8" fontWeight="800" fill="#0C4A6E" letterSpacing="0.5">
          26 NICHES
        </text>
      </g>
    </svg>
  );
}
