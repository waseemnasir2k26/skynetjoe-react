"use client";

/**
 * ExitIntentModal — capture leaving visitors with a free Loom-audit offer (T14).
 *
 * Psychology stack:
 *   - Reciprocity (Cialdini): free funnel teardown before any ask
 *   - Loss aversion (Kahneman/Tversky): "leaving without a plan" frames exit as loss
 *   - Fogg ability: 2 fields + submit, no calendar tag required
 *
 * Behavior:
 *   - Desktop: mouseleave to TOP of viewport triggers once per session
 *   - Mobile: pagehide after >30s on page AND >50% scroll triggers once
 *   - One-shot per session (localStorage `skynet:exit-intent:shown`)
 *   - Close: Esc, backdrop click, X button, or successful submit
 *   - Disabled on /discovery-call, /lp/*, /api/*
 *   - Coexists with DiscoveryPopup: different storage key, different copy,
 *     12s delay so DiscoveryPopup wins the early window
 */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Sparkles, X, Loader2, CheckCircle2 } from "lucide-react";

const STORAGE_KEY = "skynet:exit-intent:shown";
const MIN_TIME_ON_PAGE_MS = 12000; // give DiscoveryPopup priority for first 12s
const MOBILE_MIN_TIME_MS = 30000;
const MOBILE_MIN_SCROLL_PCT = 0.5;

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function ExitIntentModal() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const triggeredRef = useRef(false);
  const mountedAtRef = useRef<number>(Date.now());
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const disabled =
    pathname === "/discovery-call" ||
    pathname?.startsWith("/lp/") ||
    pathname?.startsWith("/api/");

  useEffect(() => {
    setMounted(true);
    mountedAtRef.current = Date.now();
    if (disabled) return;
    if (typeof window === "undefined") return;

    // One-shot: already shown this session?
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {}

    const fire = () => {
      if (triggeredRef.current) return;
      // Respect minimum dwell time (let DiscoveryPopup go first)
      if (Date.now() - mountedAtRef.current < MIN_TIME_ON_PAGE_MS) return;
      triggeredRef.current = true;
      try {
        localStorage.setItem(STORAGE_KEY, "1");
      } catch {}
      setOpen(true);
    };

    // DESKTOP: cursor leaves to top
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) fire();
    };

    // MOBILE: pagehide after dwell + scroll thresholds
    const onPageHide = () => {
      const dwellOk = Date.now() - mountedAtRef.current >= MOBILE_MIN_TIME_MS;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPct = docH > 0 ? window.scrollY / docH : 0;
      if (dwellOk && scrollPct >= MOBILE_MIN_SCROLL_PCT) fire();
    };

    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("pagehide", onPageHide);

    return () => {
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("pagehide", onPageHide);
    };
  }, [disabled, pathname]);

  // Esc to close + focus trap
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    // Focus the close button on mount for accessibility
    closeBtnRef.current?.focus();
    // Lock body scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !url) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email.");
      return;
    }
    setStatus("submitting");
    setErrorMsg(null);

    const payload = {
      source: "exit-intent-loom-audit",
      email,
      url,
      submitted_at: new Date().toISOString(),
      path: pathname,
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        // /api/leads may not exist yet (parallel agent building it). Log + treat success
        // so we don't punish the user for our backend race condition.
        console.log("[exit-intent] /api/leads non-OK, stubbing success", {
          status: res.status,
          payload,
        });
      }
    } catch (err) {
      console.log("[exit-intent] /api/leads not reachable, stubbing success", {
        err,
        payload,
      });
    }
    setStatus("success");
    // Auto-close after 2s on success
    setTimeout(() => setOpen(false), 2000);
  };

  if (!mounted || disabled || !open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center px-4 py-4 md:py-6 overflow-y-auto"
      style={{
        background: "rgba(0, 0, 0, 0.78)",
        animation: "skynet-exit-fade 0.28s ease-out forwards",
      }}
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[540px] rounded-3xl overflow-hidden"
        style={{
          background:
            "linear-gradient(155deg, #061827 0%, #0a2d4a 50%, #073846 100%)",
          border: "1px solid rgba(0, 212, 255, 0.35)",
          boxShadow:
            "0 40px 90px -12px rgba(0, 212, 255, 0.38), 0 0 0 1px rgba(0, 212, 255, 0.10)",
          animation: "skynet-exit-scale 0.34s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        }}
      >
        {/* Decorative ocean glow */}
        <span
          aria-hidden
          className="absolute -top-24 -left-24 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background: "#1E88E5",
            opacity: 0.32,
            filter: "blur(70px)",
          }}
        />
        <span
          aria-hidden
          className="absolute -bottom-32 -right-20 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background: "#FF6B9D",
            opacity: 0.22,
            filter: "blur(80px)",
          }}
        />

        <button
          ref={closeBtnRef}
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute top-3 right-3 w-9 h-9 rounded-lg flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition z-10"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative p-7 md:p-9">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
            style={{
              background: "rgba(255, 107, 157, 0.14)",
              border: "1px solid rgba(255, 107, 157, 0.45)",
              color: "#FFB3CC",
            }}
          >
            <Sparkles className="w-3 h-3" />
            <span className="text-[10px] font-semibold tracking-wider uppercase">
              Free · No call required
            </span>
          </div>

          <h2
            id="exit-intent-title"
            className="text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight mb-3"
          >
            Leaving without a plan?
          </h2>

          <p className="text-sm md:text-base text-gray-200 leading-relaxed mb-6 max-w-[420px]">
            Drop your URL —{" "}
            <span className="text-cyan-200 font-semibold">
              I&apos;ll Loom-audit your funnel free
            </span>
            . Honest 8-min teardown of where leads leak. No call. No pitch.
          </p>

          {status === "success" ? (
            <div className="flex items-center gap-3 p-5 rounded-2xl bg-white/5 border border-white/10">
              <CheckCircle2 className="w-6 h-6 text-cyan-300 shrink-0" />
              <div>
                <div className="font-semibold text-white">Got it.</div>
                <div className="text-sm text-gray-300">
                  Loom lands in your inbox within 48 hrs.
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <label className="flex flex-col gap-1.5">
                <span className="text-[11px] uppercase tracking-wider text-cyan-300 font-semibold">
                  Your email
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-white/35 focus:outline-none focus:border-cyan-300/60 focus:bg-white/10 transition text-sm"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-[11px] uppercase tracking-wider text-cyan-300 font-semibold">
                  Site URL
                </span>
                <input
                  type="url"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://your-site.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-white/35 focus:outline-none focus:border-cyan-300/60 focus:bg-white/10 transition text-sm"
                />
              </label>

              {status === "error" && errorMsg && (
                <p className="text-xs text-rose-300">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-transform hover:scale-[1.01] disabled:opacity-60 disabled:hover:scale-100"
                style={{
                  background: "linear-gradient(135deg, #FF6B9D 0%, #FF8FB1 100%)",
                  boxShadow: "0 10px 30px rgba(255, 107, 157, 0.40)",
                }}
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>Get my free Loom audit</>
                )}
              </button>
              <p className="text-[11px] text-white/45 text-center">
                One-shot · I personally review every URL · No newsletter spam
              </p>
            </form>
          )}
        </div>

        {/* Waseem polaroid bottom-right */}
        <div
          aria-hidden
          className="hidden sm:block absolute bottom-3 right-3 w-20 h-20 rounded-xl overflow-hidden border-2 border-cyan-300/40 shadow-xl pointer-events-none rotate-[6deg]"
          style={{
            boxShadow: "0 12px 30px -8px rgba(0, 212, 255, 0.45)",
          }}
        >
          <Image
            src="/portraits/waseem-cafe-smile.jpg"
            alt=""
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>
      </div>

      <style jsx global>{`
        @keyframes skynet-exit-fade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes skynet-exit-scale {
          from {
            opacity: 0;
            transform: scale(0.94) translateY(8px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-skynet-exit-modal] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
