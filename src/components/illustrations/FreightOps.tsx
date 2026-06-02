import * as React from "react";

type Props = { className?: string };

export default function FreightOps({ className }: Props) {
  return (
    <svg
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Freight operations illustration"
      className={className}
    >
      <defs>
        <linearGradient id="frg-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0F172A" />
          <stop offset="55%" stopColor="#1E40AF" />
          <stop offset="100%" stopColor="#60A5FA" />
        </linearGradient>
        <linearGradient id="frg-truck" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F1F5F9" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>
        <linearGradient id="frg-cab" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>

      <rect width="320" height="180" fill="url(#frg-bg)" />

      {/* Stars */}
      <g fill="#fff">
        <circle cx="40" cy="22" r="1" opacity="0.85" />
        <circle cx="78" cy="14" r="1.4" />
        <circle cx="260" cy="18" r="1" opacity="0.85" />
        <circle cx="296" cy="32" r="1.2" />
      </g>

      {/* Distant mountain skyline */}
      <path
        d="M0 88 L 30 60 L 60 80 L 100 50 L 140 78 L 180 56 L 220 82 L 260 64 L 300 80 L 320 70 V 110 H 0 Z"
        fill="#0F172A"
        opacity="0.6"
      />

      {/* Road lines */}
      <g>
        <rect x="0" y="116" width="320" height="64" fill="#1E293B" />
        {/* center dash */}
        {Array.from({ length: 8 }).map((_, i) => (
          <rect key={i} x={20 + i * 38} y="146" width="20" height="4" fill="#FCD34D" />
        ))}
        <rect x="0" y="116" width="320" height="2" fill="#FCD34D" opacity="0.85" />
        <rect x="0" y="178" width="320" height="2" fill="#FCD34D" opacity="0.85" />
      </g>

      {/* Semi truck */}
      <g transform="translate(56 86)">
        {/* Trailer */}
        <rect width="120" height="36" rx="3" fill="url(#frg-truck)" />
        <rect width="120" height="36" rx="3" fill="none" stroke="#0F172A" strokeWidth="1.2" />
        <line x1="4" y1="10" x2="116" y2="10" stroke="#94A3B8" strokeWidth="0.7" />
        <line x1="4" y1="26" x2="116" y2="26" stroke="#94A3B8" strokeWidth="0.7" />
        {/* logo box */}
        <rect x="8" y="8" width="36" height="20" rx="2" fill="#1E40AF" />
        <text x="26" y="22" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="8" fontWeight="900" fill="#FCD34D" letterSpacing="0.5">
          SKY
        </text>
        {/* serial */}
        <text x="100" y="22" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="6" fontWeight="700" fill="#0F172A">
          47-DFW
        </text>

        {/* Cab */}
        <path d="M120 4 L 154 4 L 162 18 L 162 36 L 120 36 Z" fill="url(#frg-cab)" />
        <path d="M120 4 L 154 4 L 162 18 L 162 36 L 120 36 Z" fill="none" stroke="#0F172A" strokeWidth="1.2" />
        <rect x="124" y="8" width="22" height="12" rx="1.5" fill="#0F172A" />
        <rect x="125" y="9" width="10" height="10" fill="#60A5FA" opacity="0.75" />
        {/* exhaust */}
        <rect x="156" y="0" width="3" height="10" fill="#0F172A" />

        {/* Wheels */}
        <circle cx="20" cy="36" r="7" fill="#0F172A" />
        <circle cx="20" cy="36" r="3" fill="#94A3B8" />
        <circle cx="64" cy="36" r="7" fill="#0F172A" />
        <circle cx="64" cy="36" r="3" fill="#94A3B8" />
        <circle cx="104" cy="36" r="7" fill="#0F172A" />
        <circle cx="104" cy="36" r="3" fill="#94A3B8" />
        <circle cx="138" cy="36" r="7" fill="#0F172A" />
        <circle cx="138" cy="36" r="3" fill="#94A3B8" />

        {/* Speed lines */}
        <g stroke="#fff" strokeWidth="1.2" opacity="0.7">
          <line x1="-12" y1="14" x2="-2" y2="14" />
          <line x1="-18" y1="22" x2="-6" y2="22" />
          <line x1="-14" y1="30" x2="-4" y2="30" />
        </g>
      </g>

      {/* Dollar/revenue card top right */}
      <g transform="translate(222 24)">
        <rect width="78" height="50" rx="8" fill="#fff" opacity="0.97" />
        <circle cx="14" cy="14" r="9" fill="#10B981" />
        <text x="14" y="18" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="11" fontWeight="900" fill="#fff">
          $
        </text>
        <text x="28" y="13" fontFamily="system-ui,sans-serif" fontSize="6" fill="#0F172A" opacity="0.6" letterSpacing="0.4">
          MONTHLY
        </text>
        <text x="28" y="22" fontFamily="system-ui,sans-serif" fontSize="9" fontWeight="900" fill="#0F172A">
          +$47K
        </text>
        {/* mini sparkline */}
        <polyline
          points="8,42 18,38 28,40 36,30 46,34 56,26 68,30"
          fill="none"
          stroke="#10B981"
          strokeWidth="1.6"
        />
      </g>

      {/* Top label */}
      <g transform="translate(14 14)">
        <rect width="92" height="16" rx="8" fill="#FCD34D" opacity="0.95" />
        <text x="46" y="11" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="8" fontWeight="900" fill="#0F172A" letterSpacing="0.5">
          FREIGHT OPS
        </text>
      </g>
    </svg>
  );
}
