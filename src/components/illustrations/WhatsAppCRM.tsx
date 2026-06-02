import * as React from "react";

type Props = { className?: string };

export default function WhatsAppCRM({ className }: Props) {
  return (
    <svg
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="WhatsApp CRM pipeline illustration"
      className={className}
    >
      <defs>
        <linearGradient id="wa-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#064E3B" />
          <stop offset="55%" stopColor="#0D9488" />
          <stop offset="100%" stopColor="#5EEAD4" />
        </linearGradient>
        <linearGradient id="wa-bubble" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#DCFCE7" />
          <stop offset="100%" stopColor="#86EFAC" />
        </linearGradient>
      </defs>

      <rect width="320" height="180" fill="url(#wa-bg)" />

      {/* Background dots */}
      {Array.from({ length: 14 }).map((_, c) =>
        Array.from({ length: 8 }).map((_, r) => (
          <circle key={`${c}-${r}`} cx={14 + c * 22} cy={14 + r * 22} r="0.8" fill="#fff" opacity="0.12" />
        ))
      )}

      {/* WhatsApp bubble (left, large) */}
      <g transform="translate(20 40)">
        <path
          d="M14 0 H 78 A 14 14 0 0 1 92 14 V 60 A 14 14 0 0 1 78 74 H 28 L 14 86 L 18 74 H 14 A 14 14 0 0 1 0 60 V 14 A 14 14 0 0 1 14 0 Z"
          fill="url(#wa-bubble)"
        />
        <rect x="10" y="14" width="64" height="4" rx="1.5" fill="#064E3B" opacity="0.8" />
        <rect x="10" y="24" width="50" height="4" rx="1.5" fill="#064E3B" opacity="0.6" />
        <rect x="10" y="34" width="58" height="4" rx="1.5" fill="#064E3B" opacity="0.6" />
        <rect x="10" y="44" width="40" height="4" rx="1.5" fill="#064E3B" opacity="0.6" />
        {/* read checkmarks */}
        <g transform="translate(72 60)">
          <path d="M0 4 L 3 7 L 8 0" stroke="#0D9488" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 4 L 8 7 L 13 0" stroke="#0D9488" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>

      {/* CRM pipeline (right) */}
      <g transform="translate(132 28)">
        <rect width="172" height="124" rx="8" fill="#100f14" opacity="0.94" />
        <rect x="1" y="1" width="170" height="14" rx="7" fill="#1F2937" />
        <text x="86" y="11" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="7" fontWeight="700" fill="#5EEAD4" letterSpacing="0.5">
          CRM PIPELINE
        </text>

        {/* 3 columns */}
        {[
          { label: "NEW", color: "#5EEAD4", count: 12, items: 3 },
          { label: "QUAL", color: "#FCD34D", count: 7, items: 2 },
          { label: "WON", color: "#10B981", count: 4, items: 2 },
        ].map((col, i) => (
          <g key={col.label} transform={`translate(${8 + i * 54} 22)`}>
            <rect width="48" height="96" rx="4" fill="#1F2937" />
            <rect width="48" height="14" rx="4" fill={col.color} />
            <text x="24" y="10" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="6.5" fontWeight="800" fill="#0F172A" letterSpacing="0.6">
              {col.label}
            </text>
            <text x="40" y="10" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="5.5" fontWeight="700" fill="#0F172A">
              {col.count}
            </text>
            {Array.from({ length: col.items }).map((_, j) => (
              <g key={j} transform={`translate(4 ${20 + j * 22})`}>
                <rect width="40" height="18" rx="3" fill="#0F172A" />
                <rect x="3" y="3" width="22" height="3" rx="1" fill="#fff" opacity="0.85" />
                <rect x="3" y="9" width="14" height="2.5" rx="1" fill="#fff" opacity="0.5" />
                <circle cx="34" cy="9" r="3" fill={col.color} />
              </g>
            ))}
          </g>
        ))}
      </g>

      {/* Arrow from bubble to CRM */}
      <path
        d="M116 92 L 132 92"
        stroke="#5EEAD4"
        strokeWidth="2"
        fill="none"
        markerEnd="url(#wa-arrow)"
      />
      <defs>
        <marker id="wa-arrow" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0 0 L 8 4 L 0 8 Z" fill="#5EEAD4" />
        </marker>
      </defs>

      {/* Top stat */}
      <g transform="translate(14 14)">
        <rect width="78" height="16" rx="8" fill="#100f14" opacity="0.6" />
        <text x="39" y="11" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="8" fontWeight="800" fill="#5EEAD4" letterSpacing="0.5">
          WHATSAPP
        </text>
      </g>

      {/* Bottom chip */}
      <g transform="translate(20 158)">
        <rect width="92" height="14" rx="7" fill="#100f14" opacity="0.55" />
        <text x="46" y="10" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="7.5" fontWeight="700" fill="#DCFCE7">
          14-touch nurture
        </text>
      </g>
    </svg>
  );
}
