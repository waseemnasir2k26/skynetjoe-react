import * as React from "react";

type Props = { className?: string };

export default function ShopifyStore({ className }: Props) {
  return (
    <svg
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Shopify storefront illustration"
      className={className}
    >
      <defs>
        <linearGradient id="shop-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#064E3B" />
          <stop offset="55%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#A7F3D0" />
        </linearGradient>
        <linearGradient id="shop-bag" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF7E6" />
          <stop offset="100%" stopColor="#FFE07A" />
        </linearGradient>
      </defs>

      <rect width="320" height="180" fill="url(#shop-bg)" />

      {/* Accents */}
      <circle cx="38" cy="30" r="22" fill="#fff" opacity="0.12" />
      <rect
        x="276"
        y="148"
        width="14"
        height="14"
        rx="3"
        transform="rotate(20 283 155)"
        fill="#fff"
        opacity="0.18"
      />

      {/* Awning */}
      <g transform="translate(26 22)">
        <path d="M0 22 L 24 0 H 244 L 268 22 Z" fill="#064E3B" opacity="0.85" />
        {Array.from({ length: 9 }).map((_, i) => (
          <path
            key={i}
            d={`M${30 + i * 28} 22 L ${42 + i * 28} 0 L ${56 + i * 28} 22 Z`}
            fill={i % 2 === 0 ? "#10B981" : "#A7F3D0"}
            opacity={i % 2 === 0 ? 0.95 : 0.85}
          />
        ))}
        <rect x="0" y="22" width="268" height="4" fill="#064E3B" />
      </g>

      {/* Storefront window */}
      <g transform="translate(26 48)">
        <rect width="268" height="84" fill="#0B6B53" opacity="0.7" />
        <rect
          width="268"
          height="84"
          fill="none"
          stroke="#A7F3D0"
          strokeWidth="1"
          opacity="0.5"
        />

        {/* "OPEN" sign */}
        <g transform="translate(18 16)">
          <rect width="48" height="20" rx="3" fill="#FF6B6B" />
          <text
            x="24"
            y="14"
            textAnchor="middle"
            fontFamily="system-ui,sans-serif"
            fontSize="9"
            fontWeight="900"
            fill="#fff"
            letterSpacing="0.8"
          >
            OPEN
          </text>
        </g>

        {/* Display products */}
        <g transform="translate(82 14)">
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${i * 64} 0)`}>
              <rect width="56" height="58" rx="4" fill="#fff" opacity="0.96" />
              {/* shoe silhouette */}
              <path
                d={`M ${6} 38 C ${8} 30 ${14} 22 ${22} 22 L ${42} 22 C ${48} 22 ${50} 28 ${50} 32 L ${50} 38 Z`}
                fill="#064E3B"
              />
              <path d="M6 38 H 50" stroke="#064E3B" strokeWidth="1" />
              <rect
                x="6"
                y="44"
                width="44"
                height="3"
                rx="1"
                fill="#064E3B"
                opacity="0.7"
              />
              <rect
                x="6"
                y="50"
                width="22"
                height="4"
                rx="1.5"
                fill="#10B981"
              />
            </g>
          ))}
        </g>
      </g>

      {/* Cart bag (right) */}
      <g transform="translate(228 96)">
        <path
          d="M6 14 H 56 L 60 56 A 4 4 0 0 1 56 60 H 6 A 4 4 0 0 1 2 56 Z"
          fill="url(#shop-bag)"
        />
        <path
          d="M16 14 V 8 A 14 14 0 0 1 46 8 V 14"
          stroke="#064E3B"
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="44" cy="36" r="12" fill="#FF6B6B" />
        <text
          x="44"
          y="40"
          textAnchor="middle"
          fontFamily="system-ui,sans-serif"
          fontSize="10"
          fontWeight="900"
          fill="#fff"
        >
          3
        </text>
      </g>

      {/* Conversion stat */}
      <g transform="translate(28 144)">
        <rect width="124" height="26" rx="6" fill="#064E3B" opacity="0.92" />
        <circle cx="14" cy="13" r="5.5" fill="#A7F3D0" />
        <path
          d="M11 13 L 13.5 15.5 L 18 11"
          stroke="#064E3B"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          x="26"
          y="11"
          fontFamily="system-ui,sans-serif"
          fontSize="6"
          fill="#A7F3D0"
          letterSpacing="0.4"
        >
          MOBILE CVR
        </text>
        <text
          x="26"
          y="21"
          fontFamily="system-ui,sans-serif"
          fontSize="9"
          fontWeight="800"
          fill="#fff"
        >
          Built to convert
        </text>
      </g>
    </svg>
  );
}
