import * as React from "react";

type Props = { className?: string };

export default function AEOEngine({ className }: Props) {
  return (
    <svg
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="AEO content engine illustration"
      className={className}
    >
      <defs>
        <linearGradient id="aeo-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1E1B4B" />
          <stop offset="55%" stopColor="#4338CA" />
          <stop offset="100%" stopColor="#818CF8" />
        </linearGradient>
        <linearGradient id="aeo-quote" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F5F3FF" />
          <stop offset="100%" stopColor="#C7D2FE" />
        </linearGradient>
        <radialGradient id="aeo-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="320" height="180" fill="url(#aeo-bg)" />

      {/* Star/sparkle background */}
      <g fill="#fff">
        <circle cx="40" cy="32" r="1.4" />
        <circle cx="80" cy="20" r="1" opacity="0.7" />
        <circle cx="280" cy="148" r="1.6" />
        <circle cx="240" cy="160" r="1" opacity="0.7" />
        <circle cx="20" cy="160" r="1.2" />
        <circle cx="300" cy="40" r="1.4" />
      </g>

      {/* Central glow */}
      <circle cx="160" cy="92" r="74" fill="url(#aeo-glow)" />

      {/* Quote/answer card (center) */}
      <g transform="translate(106 50)">
        <rect width="108" height="84" rx="10" fill="url(#aeo-quote)" />
        <text x="10" y="16" fontFamily="Georgia,serif" fontSize="22" fontWeight="700" fill="#4338CA" opacity="0.45">
          “
        </text>
        <rect x="22" y="22" width="76" height="4" rx="1.5" fill="#4338CA" opacity="0.65" />
        <rect x="10" y="32" width="88" height="4" rx="1.5" fill="#4338CA" opacity="0.45" />
        <rect x="10" y="40" width="68" height="4" rx="1.5" fill="#4338CA" opacity="0.45" />
        <rect x="10" y="56" width="58" height="10" rx="3" fill="#1E1B4B" />
        <text x="39" y="63" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="6" fontWeight="700" fill="#5EEAD4" letterSpacing="0.4">
          CITED 14x
        </text>
        <text x="10" y="78" fontFamily="system-ui,sans-serif" fontSize="6" fontWeight="700" fill="#4338CA" opacity="0.6" letterSpacing="0.5">
          PERPLEXITY · CHATGPT
        </text>
      </g>

      {/* AI nodes around the card */}
      <g>
        {/* Top-left node */}
        <g transform="translate(42 32)">
          <circle r="14" fill="#fff" opacity="0.97" />
          <path
            d="M-5 -5 L 0 0 L 5 -5 M 0 0 L 0 6 M -6 2 L 6 2"
            stroke="#4338CA"
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
          />
          <text y="-18" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="6" fontWeight="700" fill="#fff" letterSpacing="0.5">
            CLAUDE
          </text>
        </g>

        {/* Top-right node */}
        <g transform="translate(278 36)">
          <circle r="14" fill="#fff" opacity="0.97" />
          <circle r="3" fill="#4338CA" />
          <circle r="7" fill="none" stroke="#4338CA" strokeWidth="1" />
          <circle r="10" fill="none" stroke="#4338CA" strokeWidth="0.7" opacity="0.5" />
          <text y="-22" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="6" fontWeight="700" fill="#fff" letterSpacing="0.5">
            GPT-4o
          </text>
        </g>

        {/* Bottom-left node */}
        <g transform="translate(46 140)">
          <circle r="14" fill="#fff" opacity="0.97" />
          <path d="M-6 -2 L -2 4 L 6 -4" stroke="#1E1B4B" strokeWidth="2" fill="none" strokeLinecap="round" />
          <text y="26" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="6" fontWeight="700" fill="#fff" letterSpacing="0.5">
            PERPLEXITY
          </text>
        </g>

        {/* Bottom-right node */}
        <g transform="translate(272 140)">
          <circle r="14" fill="#fff" opacity="0.97" />
          <path
            d="M-5 0 L 0 -6 L 5 0 L 0 6 Z"
            fill="#4338CA"
          />
          <text y="26" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="6" fontWeight="700" fill="#fff" letterSpacing="0.5">
            GEMINI
          </text>
        </g>
      </g>

      {/* Connector lines */}
      <g stroke="#00D4FF" strokeWidth="1.4" fill="none" strokeDasharray="3 4" opacity="0.75">
        <path d="M56 32 Q 100 56 116 60" />
        <path d="M264 36 Q 230 56 210 60" />
        <path d="M60 140 Q 100 130 120 124" />
        <path d="M258 140 Q 220 126 200 124" />
      </g>

      {/* 4-point sparkle */}
      <g transform="translate(160 18)">
        <path d="M0 -10 L 2 -2 L 10 0 L 2 2 L 0 10 L -2 2 L -10 0 L -2 -2 Z" fill="#5EEAD4" />
      </g>
    </svg>
  );
}
