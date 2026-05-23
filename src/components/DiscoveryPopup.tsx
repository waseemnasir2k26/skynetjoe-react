"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Sparkles, ArrowRight, X } from "lucide-react";

const STORAGE_KEY = "discovery-popup-shown";

export default function DiscoveryPopup() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Guards (recomputed on every render — cheap)
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
      // Exit-intent: cursor leaving viewport from the TOP
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
        background: "rgba(0, 0, 0, 0.75)",
        animation: "discovery-popup-fade 0.3s ease-out forwards",
      }}
      onClick={() => setOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[480px] rounded-2xl overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(10, 45, 74, 0.96) 0%, rgba(6, 24, 39, 0.98) 100%)",
          border: "1px solid rgba(0, 212, 255, 0.40)",
          boxShadow:
            "0 30px 80px -10px rgba(0, 212, 255, 0.35), 0 0 0 1px rgba(0, 212, 255, 0.12)",
          animation: "discovery-popup-scale 0.4s ease-out forwards",
        }}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Close popup"
          className="absolute top-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-7 md:p-8">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
            style={{
              background: "rgba(0, 212, 255, 0.12)",
              border: "1px solid rgba(0, 212, 255, 0.40)",
              color: "#7ee4ff",
            }}
          >
            <Sparkles className="w-3 h-3" />
            <span className="text-[10px] font-semibold tracking-wider uppercase">
              2 slots left this cycle
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight mb-3">
            Fill out the form —{" "}
            <span
              style={{
                background:
                  "linear-gradient(120deg, #7ee4ff 0%, #5eead4 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
              }}
            >
              get a FREE audit
            </span>
          </h2>

          <p className="text-sm md:text-base text-gray-200 leading-relaxed mb-6">
            Let SkynetLabs save you time via AI automation. 4 builds/month max
            — currently 2 slots left for next cycle.
          </p>

          <div className="flex flex-col gap-3">
            <Link
              href="/discovery-call"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-transform hover:scale-[1.02]"
              style={{
                background:
                  "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
                boxShadow: "0 8px 28px rgba(0, 212, 255, 0.30)",
              }}
            >
              Apply for free audit
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-xs text-gray-400 hover:text-gray-200 transition underline-offset-2 hover:underline"
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
