import * as React from "react";

type Props = { className?: string };

export default function MedicineConsult({ className }: Props) {
  return (
    <svg
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Medicine consultation funnel illustration"
      className={className}
    >
      <defs>
        <linearGradient id="med-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2E1065" />
          <stop offset="55%" stopColor="#6D28D9" />
          <stop offset="100%" stopColor="#A78BFA" />
        </linearGradient>
        <linearGradient id="med-stetho" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F8F5FF" />
          <stop offset="100%" stopColor="#C4B5FD" />
        </linearGradient>
      </defs>

      <rect width="320" height="180" fill="url(#med-bg)" />

      {/* Molecule decoration */}
      <g opacity="0.6" stroke="#fff" strokeWidth="1.2" fill="none">
        <circle cx="36" cy="40" r="5" fill="#A78BFA" />
        <circle cx="68" cy="22" r="4" fill="#fff" opacity="0.7" />
        <circle cx="58" cy="62" r="4" fill="#fff" opacity="0.7" />
        <circle cx="22" cy="74" r="3" fill="#fff" opacity="0.6" />
        <line x1="36" y1="40" x2="68" y2="22" />
        <line x1="36" y1="40" x2="58" y2="62" />
        <line x1="36" y1="40" x2="22" y2="74" />
      </g>

      {/* Stethoscope */}
      <g transform="translate(90 28)">
        <path
          d="M30 4 V 30 C 30 50 50 60 60 60 C 70 60 90 50 90 30 V 4"
          stroke="url(#med-stetho)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="30" cy="4" r="5" fill="#F8F5FF" />
        <circle cx="90" cy="4" r="5" fill="#F8F5FF" />
        <path
          d="M60 60 V 88"
          stroke="url(#med-stetho)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="60" cy="96" r="10" fill="#F8F5FF" />
        <circle cx="60" cy="96" r="6" fill="#6D28D9" />
        <circle cx="60" cy="96" r="2.5" fill="#F8F5FF" />
      </g>

      {/* Consult booking panel (right) */}
      <g transform="translate(204 32)">
        <rect width="100" height="116" rx="8" fill="#fff" opacity="0.96" />
        <rect width="100" height="22" rx="8" fill="#6D28D9" />
        <text x="50" y="14" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="8" fontWeight="700" fill="#fff" letterSpacing="0.5">
          BOOK CONSULT
        </text>

        {/* form rows */}
        <rect x="8" y="30" width="84" height="14" rx="3" fill="#EDE9FE" />
        <rect x="11" y="34" width="38" height="6" rx="2" fill="#6D28D9" opacity="0.5" />
        <rect x="8" y="48" width="84" height="14" rx="3" fill="#EDE9FE" />
        <rect x="11" y="52" width="50" height="6" rx="2" fill="#6D28D9" opacity="0.5" />

        {/* date slots */}
        <text x="8" y="74" fontFamily="system-ui,sans-serif" fontSize="6.5" fill="#2E1065" fontWeight="700" letterSpacing="0.4">
          AVAILABLE
        </text>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${8 + i * 30} 80)`}>
            <rect width="26" height="14" rx="3" fill={i === 1 ? "#6D28D9" : "#EDE9FE"} />
            <text
              x="13"
              y="10"
              textAnchor="middle"
              fontFamily="system-ui,sans-serif"
              fontSize="6.5"
              fontWeight="700"
              fill={i === 1 ? "#fff" : "#6D28D9"}
            >
              {["10AM", "2PM", "5PM"][i]}
            </text>
          </g>
        ))}

        <rect x="8" y="100" width="84" height="10" rx="3" fill="#A78BFA" />
        <text x="50" y="107" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="6.5" fontWeight="800" fill="#fff">
          CONFIRM →
        </text>
      </g>

      {/* Heart pulse line */}
      <g transform="translate(38 122)">
        <polyline
          points="0,12 18,12 22,4 28,20 34,12 56,12 60,2 66,22 72,12 110,12 114,4 120,20 126,12 150,12"
          stroke="#5EEAD4"
          strokeWidth="2"
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </g>

      {/* Stat chip */}
      <g transform="translate(16 156)">
        <rect width="116" height="16" rx="8" fill="#100f14" opacity="0.55" />
        <text x="58" y="11" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="8" fontWeight="700" fill="#5EEAD4">
          12% landing → consult
        </text>
      </g>
    </svg>
  );
}
