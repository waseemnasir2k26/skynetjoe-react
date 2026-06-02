import * as React from "react";

type Props = { className?: string };

export default function BrandRescue({ className }: Props) {
  return (
    <svg
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Brand rescue palette illustration"
      className={className}
    >
      <defs>
        <linearGradient id="br-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0B3D6B" />
          <stop offset="55%" stopColor="#0D9488" />
          <stop offset="100%" stopColor="#5EEAD4" />
        </linearGradient>
      </defs>

      <rect width="320" height="180" fill="url(#br-bg)" />

      {/* Stars */}
      <g fill="#fff" opacity="0.7">
        <circle cx="42" cy="28" r="1.2" />
        <circle cx="270" cy="20" r="1" />
        <circle cx="288" cy="160" r="1.4" />
      </g>

      {/* Trident logo mark (left, central) */}
      <g transform="translate(54 36)">
        <circle cx="34" cy="34" r="34" fill="#0B3D6B" opacity="0.95" />
        <circle cx="34" cy="34" r="34" fill="none" stroke="#5EEAD4" strokeWidth="1.5" />
        {/* Trident */}
        <g stroke="#5EEAD4" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <line x1="34" y1="14" x2="34" y2="54" />
          <path d="M22 22 L 22 32 L 28 26" />
          <path d="M46 22 L 46 32 L 40 26" />
          <line x1="28" y1="22" x2="40" y2="22" />
          <path d="M28 54 L 40 54" />
        </g>
        <text y="80" x="34" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="7" fontWeight="800" fill="#fff" letterSpacing="0.6">
          RECOVERY NETWORK
        </text>
      </g>

      {/* Palette swatches (right) */}
      <g transform="translate(150 30)">
        <text x="0" y="-4" fontFamily="system-ui,sans-serif" fontSize="7" fontWeight="800" fill="#fff" letterSpacing="0.5">
          BRAND PALETTE
        </text>
        {[
          { c: "#0B3D6B", l: "NAVY" },
          { c: "#0D9488", l: "TEAL" },
          { c: "#5EEAD4", l: "MINT" },
          { c: "#FCD34D", l: "WARM" },
          { c: "#F1F5F9", l: "PAPER" },
        ].map((sw, i) => (
          <g key={sw.l} transform={`translate(${(i % 3) * 50} ${Math.floor(i / 3) * 50})`}>
            <rect width="46" height="44" rx="6" fill={sw.c} />
            <rect width="46" height="44" rx="6" fill="none" stroke="#fff" strokeWidth="0.6" opacity="0.4" />
            <text x="23" y="29" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="6.5" fontWeight="800" fill={sw.c === "#FCD34D" || sw.c === "#5EEAD4" || sw.c === "#F1F5F9" ? "#0B3D6B" : "#fff"} letterSpacing="0.4">
              {sw.l}
            </text>
            <text x="23" y="38" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="4.8" fill={sw.c === "#FCD34D" || sw.c === "#5EEAD4" || sw.c === "#F1F5F9" ? "#0B3D6B" : "#fff"} opacity="0.7">
              {sw.c}
            </text>
          </g>
        ))}
      </g>

      {/* Bottom rescue chip */}
      <g transform="translate(20 156)">
        <rect width="132" height="14" rx="7" fill="#100f14" opacity="0.55" />
        <text x="66" y="10" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="7.5" fontWeight="700" fill="#5EEAD4">
          3 revisions · 1 working day
        </text>
      </g>
    </svg>
  );
}
