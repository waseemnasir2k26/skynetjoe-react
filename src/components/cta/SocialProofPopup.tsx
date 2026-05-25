"use client";

/**
 * Sitewide social-proof popup.
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
    client: "Takycorp Insurance",
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
      if (sessionStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {}

    const showTimer = window.setTimeout(() => setVisible(true), SHOW_DELAY_MS);
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
      }}
    >
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background:
            "linear-gradient(155deg, rgba(10,32,52,0.95) 0%, rgba(6,24,39,0.95) 100%)",
          border: "1px solid rgba(0,212,255,0.25)",
          boxShadow:
            "0 20px 60px -15px rgba(0,212,255,0.35), 0 0 0 1px rgba(255,255,255,0.04) inset",
          backdropFilter: "blur(14px) saturate(140%)",
        }}
      >
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="absolute top-2.5 right-2.5 w-7 h-7 rounded-md flex items-center justify-center text-white/55 hover:text-white hover:bg-white/10 transition z-10"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        <Link href={p.href} className="block p-4 pr-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.15em] text-emerald-300 font-bold">
                Shipped
              </span>
            </span>
            <span className="text-[10px] text-cyan-300/60">·</span>
            <span className="text-[10px] text-cyan-200/80 font-medium">
              {p.when}
            </span>
          </div>

          <div className="flex items-start gap-3">
            <span
              className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(30,136,229,0.30), rgba(20,184,166,0.30))",
                border: "1px solid rgba(126,228,255,0.30)",
              }}
            >
              <CheckCircle2 className="w-4 h-4 text-cyan-300" />
            </span>
            <div className="min-w-0">
              <div className="text-sm font-bold text-white leading-tight mb-0.5 truncate">
                {p.client}
              </div>
              <div className="text-[12px] text-fg-muted leading-snug">
                {p.outcome}
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-white/[0.07] flex items-center justify-between text-[11px]">
            <span className="text-fg-faint">
              {idx + 1} / {PROOFS.length} recent builds
            </span>
            <span className="inline-flex items-center gap-1 text-cyan-300 font-semibold">
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
