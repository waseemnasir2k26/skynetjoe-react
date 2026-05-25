"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ArrowRight, X } from "lucide-react";

const STORAGE_KEY = "discovery-popup-shown";

export default function DiscoveryPopup() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const disabled =
    pathname?.startsWith("/lp/freight-") ||
    pathname === "/discovery-call" ||
    pathname?.startsWith("/api/") ||
    searchParams?.get("popup") === "off";

  useEffect(() => {
    setMounted(true);
    if (disabled) return;
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY) === "1") return;

    let triggered = false;
    const fire = () => {
      if (triggered) return;
      triggered = true;
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {}
      setOpen(true);
    };

    const timer = window.setTimeout(fire, 22000);

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) fire();
    };
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [disabled, pathname]);

  if (!mounted || disabled || !open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center px-4"
      style={{
        background: "rgba(26, 26, 26, 0.55)",
        animation: "discovery-popup-fade 0.3s ease-out forwards",
        fontFamily: "var(--font-sans)",
      }}
      onClick={() => setOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[480px] overflow-hidden"
        style={{
          background: "var(--cream-3)",
          border: "1px solid rgba(26,26,26,0.20)",
          borderRadius: 2,
          boxShadow: "0 32px 80px rgba(26,26,26,0.30)",
          animation: "discovery-popup-scale 0.4s ease-out forwards",
        }}
      >
        {/* Terracotta top rule */}
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "var(--terracotta)",
          }}
        />

        <button
          onClick={() => setOpen(false)}
          aria-label="Close popup"
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center transition"
          style={{
            color: "var(--ink-faint)",
            background: "transparent",
            border: "none",
            borderRadius: 2,
            cursor: "pointer",
          }}
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-7 md:p-8">
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "var(--terracotta)",
              marginBottom: 16,
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span
              style={{
                width: 28,
                height: 1,
                background: "var(--terracotta)",
                display: "inline-block",
              }}
            />
            2 slots left this cycle
          </div>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(24px, 4vw, 32px)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "var(--ink)",
              marginBottom: 14,
            }}
          >
            Fill out the form —{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--terracotta)",
                fontWeight: 500,
              }}
            >
              get a free audit.
            </em>
          </h2>

          <p
            style={{
              fontSize: 15,
              color: "var(--ink-2)",
              lineHeight: 1.55,
              marginBottom: 24,
            }}
          >
            Let SkynetLabs save you time via AI automation. 4 builds/month max
            — currently 2 slots left for next cycle.
          </p>

          <div className="flex flex-col gap-3">
            <Link
              href="/discovery-call"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2"
              style={{
                background: "var(--terracotta)",
                color: "var(--cream-3)",
                padding: "14px 24px",
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: 15,
                borderRadius: 2,
                textDecoration: "none",
              }}
            >
              Apply for free audit
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--ink-faint)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                textDecoration: "underline",
                textUnderlineOffset: 3,
              }}
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes discovery-popup-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes discovery-popup-scale {
          from {
            opacity: 0;
            transform: scale(0.92);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
