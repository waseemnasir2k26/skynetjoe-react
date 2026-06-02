import * as React from "react";

type Props = { className?: string };

export default function VideoEditor({ className }: Props) {
  return (
    <svg
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Video editor reel pipeline illustration"
      className={className}
    >
      <defs>
        <linearGradient id="ve-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0F172A" />
          <stop offset="55%" stopColor="#7E22CE" />
          <stop offset="100%" stopColor="#F472B6" />
        </linearGradient>
      </defs>

      <rect width="320" height="180" fill="url(#ve-bg)" />

      {/* Stars/sparkle */}
      <g fill="#fff">
        <circle cx="40" cy="22" r="1.2" />
        <circle cx="284" cy="30" r="1.4" />
        <circle cx="294" cy="158" r="1" opacity="0.7" />
      </g>

      {/* Timeline window */}
      <g transform="translate(20 28)">
        <rect width="280" height="124" rx="8" fill="#100f14" opacity="0.94" />
        <rect x="1" y="1" width="278" height="16" rx="7" fill="#1F2937" />
        <circle cx="10" cy="9" r="2.5" fill="#FF6B6B" />
        <circle cx="20" cy="9" r="2.5" fill="#FCD34D" />
        <circle cx="30" cy="9" r="2.5" fill="#5EEAD4" />
        <text x="140" y="12" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="7" fill="#F472B6" letterSpacing="0.5">
          reel-pipeline · v3
        </text>

        {/* Video preview (left) */}
        <g transform="translate(12 28)">
          <rect width="78" height="84" rx="6" fill="#1F2937" />
          <rect x="1" y="1" width="76" height="82" rx="5" fill="url(#ve-bg)" opacity="0.7" />
          {/* face silhouette */}
          <circle cx="39" cy="36" r="14" fill="#100f14" opacity="0.55" />
          <path d="M20 70 C 22 56 56 56 58 70 L 58 84 L 20 84 Z" fill="#100f14" opacity="0.55" />
          {/* play button */}
          <circle cx="39" cy="44" r="14" fill="#fff" opacity="0.95" />
          <path d="M35 38 L 35 50 L 47 44 Z" fill="#7E22CE" />
          {/* caption */}
          <rect x="6" y="68" width="66" height="10" rx="2" fill="#100f14" opacity="0.85" />
          <rect x="9" y="71" width="38" height="4" rx="1.5" fill="#FCD34D" />
        </g>

        {/* Timeline tracks (right) */}
        <g transform="translate(100 28)">
          {/* Track labels */}
          {["AUDIO", "VIDEO", "CAPS", "BGM"].map((label, i) => (
            <g key={label} transform={`translate(0 ${i * 20})`}>
              <rect width="34" height="16" rx="3" fill="#1F2937" />
              <text x="17" y="10" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="5.5" fontWeight="700" fill="#F472B6" letterSpacing="0.4">
                {label}
              </text>
            </g>
          ))}

          {/* Track clips */}
          {/* AUDIO — waveform */}
          <g transform="translate(38 4)">
            <rect width="132" height="8" rx="2" fill="#7E22CE" opacity="0.4" />
            {Array.from({ length: 22 }).map((_, k) => {
              const h = ((k * 7) % 6) + 1.5;
              return (
                <line
                  key={k}
                  x1={4 + k * 6}
                  y1={4 - h / 2}
                  x2={4 + k * 6}
                  y2={4 + h / 2}
                  stroke="#5EEAD4"
                  strokeWidth="1.4"
                />
              );
            })}
          </g>

          {/* VIDEO */}
          <g transform="translate(38 22)">
            <rect width="40" height="12" rx="2" fill="#F472B6" />
            <rect x="44" width="32" height="12" rx="2" fill="#F472B6" opacity="0.8" />
            <rect x="80" width="48" height="12" rx="2" fill="#F472B6" opacity="0.65" />
          </g>

          {/* CAPS */}
          <g transform="translate(38 42)">
            <rect width="132" height="12" rx="2" fill="#1F2937" />
            <text x="6" y="9" fontFamily="system-ui,sans-serif" fontSize="6" fontWeight="700" fill="#FCD34D">
              ◊ silence-cut → whisper
            </text>
          </g>

          {/* BGM */}
          <g transform="translate(38 62)">
            <rect width="132" height="12" rx="2" fill="#5EEAD4" opacity="0.5" />
            <polyline
              points="2,6 14,3 24,8 36,4 50,7 64,3 78,9 92,4 108,8 122,5 130,6"
              fill="none"
              stroke="#0F172A"
              strokeWidth="1.2"
            />
          </g>

          {/* Playhead */}
          <line x1="74" y1="0" x2="74" y2="80" stroke="#fff" strokeWidth="1.5" />
          <polygon points="69,0 79,0 74,5" fill="#fff" />
        </g>
      </g>

      {/* Stat badge */}
      <g transform="translate(20 156)">
        <rect width="116" height="14" rx="7" fill="#100f14" opacity="0.55" />
        <text x="58" y="10" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="7.5" fontWeight="800" fill="#F472B6" letterSpacing="0.4">
          RAW → REEL · 30 MIN
        </text>
      </g>
    </svg>
  );
}
