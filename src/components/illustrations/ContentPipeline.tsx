import * as React from "react";

type Props = { className?: string };

export default function ContentPipeline({ className }: Props) {
  return (
    <svg
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Content pipeline illustration"
      className={className}
    >
      <defs>
        <linearGradient id="cp-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7C2D12" />
          <stop offset="55%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#FCD34D" />
        </linearGradient>
        <linearGradient id="cp-card" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF7E6" />
          <stop offset="100%" stopColor="#FDE68A" />
        </linearGradient>
      </defs>

      <rect width="320" height="180" fill="url(#cp-bg)" />

      {/* Accents */}
      <circle cx="40" cy="32" r="20" fill="#fff" opacity="0.14" />
      <rect
        x="282"
        y="148"
        width="14"
        height="14"
        rx="3"
        transform="rotate(15 289 155)"
        fill="#fff"
        opacity="0.18"
      />

      {/* Stacked carousel slides — fanned out */}
      <g transform="translate(50 28)">
        {[3, 2, 1, 0].map((i) => {
          const offset = i * 6;
          return (
            <g key={i} transform={`translate(${offset} ${offset})`}>
              <rect width="90" height="116" rx="8" fill="url(#cp-card)" />
              <rect
                width="90"
                height="116"
                rx="8"
                fill="none"
                stroke="#7C2D12"
                strokeWidth="0.8"
                opacity="0.4"
              />
              <rect
                x="8"
                y="10"
                width="34"
                height="3"
                rx="1.5"
                fill="#7C2D12"
                opacity="0.5"
              />
              <rect x="8" y="18" width="74" height="6" rx="2" fill="#7C2D12" />
              <rect x="8" y="28" width="60" height="6" rx="2" fill="#7C2D12" />
              <rect
                x="8"
                y="44"
                width="74"
                height="3"
                rx="1"
                fill="#7C2D12"
                opacity="0.45"
              />
              <rect
                x="8"
                y="50"
                width="64"
                height="3"
                rx="1"
                fill="#7C2D12"
                opacity="0.45"
              />
              <rect
                x="8"
                y="56"
                width="70"
                height="3"
                rx="1"
                fill="#7C2D12"
                opacity="0.45"
              />
              {/* mini chart */}
              <g transform="translate(8 68)">
                <rect
                  width="74"
                  height="32"
                  rx="3"
                  fill="#7C2D12"
                  opacity="0.85"
                />
                {[8, 14, 6, 18, 10, 22, 14, 24].map((h, k) => (
                  <rect
                    key={k}
                    x={2 + k * 9}
                    y={32 - h - 2}
                    width="6"
                    height={h}
                    fill={k === 7 ? "#FCD34D" : "#F59E0B"}
                  />
                ))}
              </g>
              <rect x="8" y="106" width="20" height="6" rx="2" fill="#7C2D12" />
              <text
                x="18"
                y="111"
                textAnchor="middle"
                fontFamily="system-ui,sans-serif"
                fontSize="4.5"
                fontWeight="900"
                fill="#FCD34D"
                letterSpacing="0.4"
              >
                {`${i + 1}/200`}
              </text>
            </g>
          );
        })}
      </g>

      {/* Output stack — small thumbnails right side */}
      <g transform="translate(204 32)">
        <text
          x="0"
          y="-4"
          fontFamily="system-ui,sans-serif"
          fontSize="7"
          fontWeight="800"
          fill="#fff"
          letterSpacing="0.5"
        >
          POST-READY
        </text>
        {Array.from({ length: 12 }).map((_, i) => {
          const c = i % 4;
          const r = Math.floor(i / 4);
          return (
            <rect
              key={i}
              x={c * 24}
              y={r * 24}
              width="20"
              height="20"
              rx="3"
              fill="#fff"
              opacity={0.5 + (i % 4) * 0.12}
            />
          );
        })}
        <rect
          x="0"
          y="0"
          width="92"
          height="68"
          fill="none"
          stroke="#fff"
          strokeWidth="0.6"
          opacity="0.3"
        />

        {/* Render arrow */}
        <text
          x="46"
          y="86"
          textAnchor="middle"
          fontFamily="system-ui,sans-serif"
          fontSize="6.5"
          fontWeight="700"
          fill="#fff"
          letterSpacing="0.5"
        >
          auto-designed
        </text>
        <path d="M30 92 L 62 92" stroke="#fff" strokeWidth="1.5" />
        <path d="M58 89 L 64 92 L 58 95 Z" fill="#fff" />
        <text
          x="46"
          y="108"
          textAnchor="middle"
          fontFamily="system-ui,sans-serif"
          fontSize="6.5"
          fontWeight="800"
          fill="#FCD34D"
          letterSpacing="0.5"
        >
          rendered
        </text>
      </g>

      {/* Bottom label */}
      <g transform="translate(102 156)">
        <rect width="116" height="16" rx="8" fill="#100f14" opacity="0.55" />
        <text
          x="58"
          y="11"
          textAnchor="middle"
          fontFamily="system-ui,sans-serif"
          fontSize="8"
          fontWeight="700"
          fill="#FCD34D"
        >
          200 posts · one pass
        </text>
      </g>
    </svg>
  );
}
