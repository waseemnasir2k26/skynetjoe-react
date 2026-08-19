import * as React from "react";

type Props = { className?: string };

export default function RetailCommerce({ className }: Props) {
  return (
    <svg
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Retail commerce storefront illustration"
      className={className}
    >
      <defs>
        <linearGradient id="ret-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#055F4E" />
          <stop offset="55%" stopColor="#14B8A6" />
          <stop offset="100%" stopColor="#5EEAD4" />
        </linearGradient>
        <linearGradient id="ret-bag" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF7E6" />
          <stop offset="100%" stopColor="#FFD37A" />
        </linearGradient>
        <linearGradient id="ret-chip" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#FFE07A" />
        </linearGradient>
      </defs>

      <rect width="320" height="180" fill="url(#ret-bg)" />

      {/* Diagonal sparkle accents */}
      <g opacity="0.18" fill="#fff">
        <circle cx="40" cy="32" r="22" />
        <circle cx="290" cy="40" r="14" />
        <rect
          x="22"
          y="146"
          width="18"
          height="18"
          rx="3"
          transform="rotate(15 31 155)"
        />
      </g>

      {/* Storefront awning */}
      <g transform="translate(34 30)">
        <rect width="252" height="22" rx="3" fill="#0F2F2A" opacity="0.55" />
        {Array.from({ length: 14 }).map((_, i) => (
          <rect
            key={i}
            x={i * 18 + 1}
            y="0"
            width="16"
            height="22"
            fill={i % 2 === 0 ? "#d4af37" : "#FFE07A"}
            opacity={i % 2 === 0 ? 0.9 : 0.7}
          />
        ))}
        <text
          x="126"
          y="14"
          textAnchor="middle"
          fontFamily="system-ui,sans-serif"
          fontSize="9"
          fontWeight="800"
          fill="#0F2F2A"
          letterSpacing="1"
        >
          BOUTIQUE · RIYADH
        </text>
      </g>

      {/* Product cards row */}
      <g transform="translate(34 64)">
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${i * 64} 0)`}>
            <rect width="56" height="66" rx="6" fill="#fff" opacity="0.96" />
            <rect
              x="4"
              y="4"
              width="48"
              height="36"
              rx="3"
              fill="#5EEAD4"
              opacity="0.5"
            />
            {/* product silhouette */}
            <path
              d={`M ${10 + i} 32 C ${12 + i} 16 ${24 + i} 12 ${28 + i} 12 C ${32 + i} 12 ${44 + i} 16 ${46 + i} 32 Z`}
              fill="#055F4E"
              opacity="0.65"
            />
            <rect
              x="6"
              y="44"
              width="36"
              height="4"
              rx="1.5"
              fill="#0F2F2A"
              opacity="0.7"
            />
            <rect
              x="6"
              y="51"
              width="22"
              height="3"
              rx="1"
              fill="#0F2F2A"
              opacity="0.45"
            />
            <rect x="6" y="58" width="44" height="6" rx="2" fill="#14B8A6" />
            <text
              x="28"
              y="62.5"
              textAnchor="middle"
              fontFamily="system-ui,sans-serif"
              fontSize="5.5"
              fontWeight="700"
              fill="#fff"
            >
              ADD TO CART
            </text>
          </g>
        ))}
      </g>

      {/* Shopping bag (right) */}
      <g transform="translate(232 64)">
        <path
          d="M8 14 H 50 L 54 60 A 4 4 0 0 1 50 64 H 8 A 4 4 0 0 1 4 60 Z"
          fill="url(#ret-bag)"
        />
        <path
          d="M18 14 V 8 A 11 11 0 0 1 40 8 V 14"
          stroke="#0F2F2A"
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
        />
        <text
          x="29"
          y="44"
          textAnchor="middle"
          fontFamily="system-ui,sans-serif"
          fontSize="12"
          fontWeight="900"
          fill="#0F2F2A"
          opacity="0.7"
        >
          ع
        </text>
      </g>

      {/* Payment chip */}
      <g transform="translate(196 138)">
        <rect width="108" height="32" rx="6" fill="#0F2F2A" opacity="0.88" />
        <rect x="6" y="9" width="14" height="14" rx="2" fill="url(#ret-chip)" />
        {/* chip lines */}
        <line
          x1="9"
          y1="13"
          x2="17"
          y2="13"
          stroke="#0F2F2A"
          strokeWidth="0.5"
        />
        <line
          x1="9"
          y1="16"
          x2="17"
          y2="16"
          stroke="#0F2F2A"
          strokeWidth="0.5"
        />
        <line
          x1="9"
          y1="19"
          x2="17"
          y2="19"
          stroke="#0F2F2A"
          strokeWidth="0.5"
        />
        <text
          x="26"
          y="15"
          fontFamily="system-ui,sans-serif"
          fontSize="6.5"
          fill="#5EEAD4"
          fontWeight="700"
        >
          MADA
        </text>
        <text
          x="26"
          y="25"
          fontFamily="system-ui,sans-serif"
          fontSize="8"
          fontWeight="800"
          fill="#fff"
        >
          Reply→sale flow
        </text>
      </g>

      {/* Connecting price tag */}
      <g transform="translate(16 138)">
        <path
          d="M0 0 L 60 0 L 70 14 L 60 28 L 0 28 Z"
          fill="#FFE07A"
          opacity="0.95"
        />
        <circle cx="58" cy="14" r="3" fill="#0F2F2A" />
        <text
          x="28"
          y="18"
          textAnchor="middle"
          fontFamily="system-ui,sans-serif"
          fontSize="9"
          fontWeight="800"
          fill="#0F2F2A"
        >
          800 SKU
        </text>
      </g>
    </svg>
  );
}
