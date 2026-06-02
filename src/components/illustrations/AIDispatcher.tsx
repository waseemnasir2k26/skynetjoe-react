import * as React from "react";

type Props = { className?: string };

export default function AIDispatcher({ className }: Props) {
  return (
    <svg
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="AI dispatcher phone illustration"
      className={className}
    >
      <defs>
        <linearGradient id="ai-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3B0764" />
          <stop offset="55%" stopColor="#7E22CE" />
          <stop offset="100%" stopColor="#D8B4FE" />
        </linearGradient>
        <linearGradient id="ai-phone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F5F3FF" />
          <stop offset="100%" stopColor="#C4B5FD" />
        </linearGradient>
      </defs>

      <rect width="320" height="180" fill="url(#ai-bg)" />

      {/* Star field */}
      <g fill="#fff">
        <circle cx="40" cy="32" r="1.4" />
        <circle cx="280" cy="28" r="1" opacity="0.7" />
        <circle cx="60" cy="148" r="1.2" />
        <circle cx="290" cy="158" r="1.4" />
      </g>

      {/* Ringback rings */}
      <g transform="translate(80 90)" stroke="#fff" fill="none">
        <circle r="30" strokeWidth="1.5" opacity="0.55" />
        <circle r="44" strokeWidth="1.2" opacity="0.35" />
        <circle r="58" strokeWidth="1" opacity="0.2" />
      </g>

      {/* Phone */}
      <g transform="translate(54 64)">
        <rect width="52" height="52" rx="14" fill="url(#ai-phone)" />
        <path
          d="M14 18 C 14 14 18 12 22 14 L 26 18 C 28 20 28 24 26 26 L 24 28 C 28 34 32 38 38 42 L 40 40 C 42 38 46 38 48 40 L 52 44 C 54 48 52 52 48 52"
          fill="#7E22CE"
        />
      </g>

      {/* Waveform line */}
      <g transform="translate(120 92)" stroke="#5EEAD4" strokeWidth="2" strokeLinecap="round">
        <line x1="0" y1="0" x2="0" y2="0" />
        <line x1="4" y1="-6" x2="4" y2="6" />
        <line x1="10" y1="-10" x2="10" y2="10" />
        <line x1="16" y1="-16" x2="16" y2="16" />
        <line x1="22" y1="-22" x2="22" y2="22" />
        <line x1="28" y1="-12" x2="28" y2="12" />
        <line x1="34" y1="-18" x2="34" y2="18" />
        <line x1="40" y1="-8" x2="40" y2="8" />
        <line x1="46" y1="-14" x2="46" y2="14" />
        <line x1="52" y1="-20" x2="52" y2="20" />
        <line x1="58" y1="-10" x2="58" y2="10" />
        <line x1="64" y1="-16" x2="64" y2="16" />
        <line x1="70" y1="-6" x2="70" y2="6" />
      </g>

      {/* AI brain node */}
      <g transform="translate(228 70)">
        <circle r="32" fill="#fff" opacity="0.97" />
        <circle r="32" fill="none" stroke="#5EEAD4" strokeWidth="1.5" />
        {/* nodes */}
        <circle cx="-12" cy="-8" r="4" fill="#7E22CE" />
        <circle cx="10" cy="-12" r="4" fill="#7E22CE" />
        <circle cx="14" cy="6" r="4" fill="#7E22CE" />
        <circle cx="-8" cy="10" r="4" fill="#7E22CE" />
        <circle cx="2" cy="0" r="5" fill="#3B0764" />
        {/* lines */}
        <g stroke="#7E22CE" strokeWidth="1.2" fill="none">
          <line x1="-12" y1="-8" x2="2" y2="0" />
          <line x1="10" y1="-12" x2="2" y2="0" />
          <line x1="14" y1="6" x2="2" y2="0" />
          <line x1="-8" y1="10" x2="2" y2="0" />
          <line x1="-12" y1="-8" x2="10" y2="-12" />
          <line x1="14" y1="6" x2="-8" y2="10" />
        </g>
        <text y="42" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="7" fontWeight="700" fill="#fff" letterSpacing="0.5">
          CLAUDE VOICE
        </text>
      </g>

      {/* Top label */}
      <g transform="translate(14 12)">
        <rect width="100" height="16" rx="8" fill="#100f14" opacity="0.6" />
        <circle cx="10" cy="8" r="3" fill="#FF6B6B" />
        <circle cx="10" cy="8" r="6" fill="none" stroke="#FF6B6B" strokeWidth="1" opacity="0.6" />
        <text x="20" y="11" fontFamily="system-ui,sans-serif" fontSize="8" fontWeight="700" fill="#fff" letterSpacing="0.5">
          INBOUND CALL
        </text>
      </g>

      {/* Bottom stat */}
      <g transform="translate(120 152)">
        <rect width="124" height="18" rx="9" fill="#100f14" opacity="0.6" />
        <text x="62" y="12" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="8" fontWeight="700" fill="#D8B4FE">
          24/7 · 4-sec pickup
        </text>
      </g>

      {/* Sparkle */}
      <g transform="translate(304 100)">
        <path d="M0 -6 L 1.5 -1.5 L 6 0 L 1.5 1.5 L 0 6 L -1.5 1.5 L -6 0 L -1.5 -1.5 Z" fill="#5EEAD4" />
      </g>
    </svg>
  );
}
