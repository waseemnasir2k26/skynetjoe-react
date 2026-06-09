"use client";

/**
 * Sitewide social-proof popup — cream paper variant.
 *
 *  - Appears 10s after first load
 *  - Rotates through real recent ships every 12s
 *  - User can dismiss (sessionStorage key — won't reappear in same tab)
 *  - Bottom-left float, doesn't block hero or sticky CTAs
 *  - Disabled on /discovery-call + /lp/* + /api/*
 *  - Respects prefers-reduced-motion (no slide-up animation in that case)
 */

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CheckCircle2, X, ArrowRight } from "lucide-react";
import Link from "next/link";

type Proof = {
  client: string;
  outcome: string;
  href: string;
  when: string;
};

const PROOFS: Proof[] = [
  {
    client: "Manhattan Dental Atelier",
    outcome: "14-section flagship site shipped in 12 days",
    href: "/case-studies/manhattan-dental-atelier-flagship",
    when: "Last week",
  },
  {
    client: "EU Logistics Group",
    outcome: "Email triage time 6h → 6min (n8n + GPT-4o)",
    href: "/case-studies/eu-logistics-email-triage-n8n",
    when: "This month",
  },
  {
    client: "Bali Wellness Funnel",
    outcome: "Monthly bookings doubled, 9-day ship",
    href: "/case-studies/bali-wellness-conversion-funnel",
    when: "March",
  },
  {
    client: "KSA Fashion Retailer",
    outcome: "Bilingual Shopify launch, 14 days",
    href: "/case-studies/ksa-fashion-retailer-shopify-ecommerce",
    when: "April",
  },
  {
    client: "US Insurance Retainer Client",
    outcome: "7th GHL rebuild — 3 hrs/day triage killed",
    href: "/case-studies/us-insurance-gohighlevel-rebuild",
    when: "January",
  },
  {
    client: "Premium Auto Network",
    outcome: "Multi-location dealer demo, 7 days",
    href: "/case-studies/premium-auto-dealership-network-demo",
    when: "March",
  },
];

const STORAGE_KEY = "skynet:proof-popup:dismissed";
const SHARED_POPUP_KEY = "skynet-popup-fired";
const SHOW_DELAY_MS = 10_000;
const ROTATE_MS = 12_000;

export default function SocialProofPopup() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [idx, setIdx] = useState(0);

  const disabled =
    pathname === "/discovery-call" ||
    pathname?.startsWith("/lp/") ||
    pathname?.startsWith("/api/");

  useEffect(() => {
    if (disabled) return;
    if (typeof window === "undefined") return;

    try {
      if (sessionStorage.getItem(SHARED_POPUP_KEY) === "1") return;
      if (sessionStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {}

    const showTimer = window.setTimeout(() => {
      try {
        sessionStorage.setItem(SHARED_POPUP_KEY, "1");
      } catch {}
      setVisible(true);
    }, SHOW_DELAY_MS);
    return () => window.clearTimeout(showTimer);
  }, [disabled]);

  useEffect(() => {
    if (!visible) return;
    const t = window.setInterval(() => {
      setIdx((prev) => (prev + 1) % PROOFS.length);
    }, ROTATE_MS);
    return () => window.clearInterval(t);
  }, [visible]);

  const dismiss = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
      sessionStorage.removeItem(SHARED_POPUP_KEY);
    } catch {}
    setVisible(false);
  };

  if (disabled || !visible) return null;

  const p = PROOFS[idx];

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed z-[60] bottom-4 left-4 max-w-[340px] w-[calc(100vw-2rem)] sm:w-auto"
      style={{
        animation: "skynet-proof-in 0.45s cubic-bezier(0.16, 1, 0.3, 1) both",
        fontFamily: "var(--font-sans)",
      }}
    >
      <div
        style={{
          position: "relative",
          background: "var(--cream-3)",
          border: "1px solid rgba(26,26,26,0.18)",
          borderRadius: 2,
          boxShadow: "0 18px 48px rgba(26,26,26,0.18)",
          overflow: "hidden",
        }}
      >
        {/* Terracotta rule top */}
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "var(--terracotta)",
          }}
        />

        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="absolute top-1 right-1 w-9 h-9 flex items-center justify-center transition z-10"
          style={{
            color: "var(--ink-faint)",
            background: "transparent",
            border: "none",
            borderRadius: 2,
            cursor: "pointer",
          }}
        >
          <X className="w-3.5 h-3.5" />
        </button>

        <Link
          href={p.href}
          className="block p-4 pr-10"
          style={{ textDecoration: "none" }}
        >
          <div className="flex items-center gap-2 mb-2 mt-1">
            <span className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: "var(--terracotta)" }}
              />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.16em",
                  color: "var(--terracotta)",
                  fontWeight: 700,
                }}
              >
                Shipped
              </span>
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "var(--ink-faint)",
              }}
            >
              ·
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "var(--ink-faint)",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
              }}
            >
              {p.when}
            </span>
          </div>

          <div className="flex items-start gap-3">
            <span
              className="flex-shrink-0 w-9 h-9 flex items-center justify-center"
              style={{
                background: "rgba(198, 107, 63, 0.12)",
                border: "1px solid rgba(198, 107, 63, 0.35)",
                borderRadius: 2,
              }}
            >
              <CheckCircle2
                className="w-4 h-4"
                style={{ color: "var(--terracotta)" }}
              />
            </span>
            <div className="min-w-0">
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 15,
                  fontWeight: 600,
                  color: "var(--ink)",
                  lineHeight: 1.2,
                  marginBottom: 2,
                }}
                className="truncate"
              >
                {p.client}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--ink-2)",
                  lineHeight: 1.4,
                }}
              >
                {p.outcome}
              </div>
            </div>
          </div>

          <div
            className="mt-3 pt-2.5 flex items-center justify-between"
            style={{
              borderTop: "1px solid rgba(26,26,26,0.10)",
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.10em",
            }}
          >
            <span style={{ color: "var(--ink-faint)" }}>
              {idx + 1} / {PROOFS.length} recent builds
            </span>
            <span
              className="inline-flex items-center gap-1"
              style={{ color: "var(--terracotta)", fontWeight: 700 }}
            >
              Read case
              <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </Link>
      </div>

      <style jsx global>{`
        @keyframes skynet-proof-in {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          [role="status"][aria-live="polite"] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
