"use client";

/**
 * ExitIntentModal — capture leaving visitors with a free Loom-audit offer.
 * Cream paper variant — converted from dark ocean.
 *
 * Psychology unchanged:
 *   - Reciprocity (Cialdini): free funnel teardown before any ask
 *   - Loss aversion: "leaving without a plan" frames exit as loss
 *   - Fogg ability: 2 fields + submit
 *
 * Behavior unchanged.
 */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X, Loader2, CheckCircle2 } from "lucide-react";

const STORAGE_KEY = "skynet:exit-intent:shown";
const SHARED_POPUP_KEY = "skynet-popup-fired";
const MIN_TIME_ON_PAGE_MS = 12000;
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

    try {
      if (sessionStorage.getItem(SHARED_POPUP_KEY) === "1") return;
    } catch {}

    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {}

    const fire = () => {
      if (triggeredRef.current) return;
      if (Date.now() - mountedAtRef.current < MIN_TIME_ON_PAGE_MS) return;
      triggeredRef.current = true;
      try {
        localStorage.setItem(STORAGE_KEY, "1");
        sessionStorage.setItem(SHARED_POPUP_KEY, "1");
      } catch {}
      setOpen(true);
    };

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) fire();
    };

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

  const closeModal = () => {
    setOpen(false);
    try {
      sessionStorage.removeItem(SHARED_POPUP_KEY);
    } catch {}
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);
    closeBtnRef.current?.focus();
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
        console.error("[exit-intent] /api/leads non-OK", {
          status: res.status,
          payload,
        });
        setStatus("error");
        setErrorMsg(
          "Couldn't reach our inbox. Try email: info@skynetjoe.com"
        );
        return;
      }
    } catch (err) {
      console.error("[exit-intent] /api/leads not reachable", {
        err,
        payload,
      });
      setStatus("error");
      setErrorMsg(
        "Couldn't reach our inbox. Try email: info@skynetjoe.com"
      );
      return;
    }
    setStatus("success");
    setTimeout(() => closeModal(), 2000);
  };

  if (!mounted || disabled || !open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center px-4 py-4 md:py-6 overflow-y-auto"
      style={{
        background: "rgba(26, 26, 26, 0.55)",
        animation: "skynet-exit-fade 0.28s ease-out forwards",
      }}
      onClick={closeModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full overflow-hidden"
        style={{
          maxWidth: "min(540px, calc(100vw - 32px))",
          background: "var(--cream-3)",
          border: "1px solid rgba(26,26,26,0.20)",
          borderRadius: 2,
          boxShadow: "0 32px 80px rgba(26,26,26,0.30)",
          animation: "skynet-exit-scale 0.34s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          fontFamily: "var(--font-sans)",
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
            height: 4,
            background: "var(--terracotta)",
          }}
        />

        <button
          ref={closeBtnRef}
          onClick={closeModal}
          aria-label="Close"
          className="absolute top-2 right-2 w-11 h-11 flex items-center justify-center transition z-10"
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

        <div className="relative p-5 sm:p-7 md:p-9">
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
            Free · no call required
          </div>

          <h2
            id="exit-intent-title"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(24px, 4vw, 32px)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "var(--ink)",
              marginBottom: 14,
              maxWidth: "20ch",
            }}
          >
            Leaving without{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--terracotta)",
                fontWeight: 500,
              }}
            >
              a plan?
            </em>
          </h2>

          <p
            style={{
              fontSize: 15,
              color: "var(--ink-2)",
              lineHeight: 1.55,
              marginBottom: 24,
              maxWidth: "44ch",
            }}
          >
            Drop your URL —{" "}
            <span style={{ color: "var(--terracotta)", fontWeight: 600 }}>
              I&apos;ll Loom-audit your funnel free
            </span>
            . Honest 8-min teardown of where leads leak. No call. No pitch.
          </p>

          {status === "success" ? (
            <div
              className="flex items-center gap-3 p-5"
              style={{
                background: "var(--cream-2)",
                border: "1px solid rgba(26,26,26,0.12)",
                borderRadius: 2,
              }}
            >
              <CheckCircle2
                className="w-6 h-6 shrink-0"
                style={{ color: "var(--terracotta)" }}
              />
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 16,
                    fontWeight: 600,
                    color: "var(--ink)",
                  }}
                >
                  Got it.
                </div>
                <div style={{ fontSize: 13, color: "var(--ink-2)" }}>
                  Loom lands in your inbox within 48 hrs.
                </div>
              </div>
            </div>
          ) : status === "error" ? (
            <div
              className="flex items-start gap-3 p-5"
              style={{
                background: "var(--cream-2)",
                border: "1px solid rgba(107,44,44,0.30)",
                borderLeft: "3px solid var(--oxblood)",
                borderRadius: 2,
              }}
              role="alert"
            >
              <div className="min-w-0">
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 16,
                    fontWeight: 600,
                    color: "var(--ink)",
                    marginBottom: 4,
                  }}
                >
                  Something broke.
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "var(--ink-2)",
                    lineHeight: 1.5,
                    marginBottom: 8,
                  }}
                >
                  {errorMsg ||
                    "Couldn't reach our inbox. Try email: info@skynetjoe.com"}
                </div>
                <a
                  href="mailto:info@skynetjoe.com?subject=Free%20Loom%20funnel%20audit"
                  style={{
                    display: "inline-block",
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "var(--terracotta)",
                    textTransform: "uppercase",
                    letterSpacing: "0.10em",
                    textDecoration: "underline",
                    textUnderlineOffset: 3,
                  }}
                >
                  Email info@skynetjoe.com
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <label className="flex flex-col gap-1.5">
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    color: "var(--ink-faint)",
                    fontWeight: 600,
                  }}
                >
                  Your email
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  style={{
                    background: "var(--cream-2)",
                    color: "var(--ink)",
                    border: "1px solid rgba(26,26,26,0.18)",
                    borderRadius: 2,
                    padding: "10px 14px",
                    fontFamily: "var(--font-sans)",
                    fontSize: 14,
                    outline: "none",
                  }}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    color: "var(--ink-faint)",
                    fontWeight: 600,
                  }}
                >
                  Site URL
                </span>
                <input
                  type="url"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://your-site.com"
                  style={{
                    background: "var(--cream-2)",
                    color: "var(--ink)",
                    border: "1px solid rgba(26,26,26,0.18)",
                    borderRadius: 2,
                    padding: "10px 14px",
                    fontFamily: "var(--font-sans)",
                    fontSize: 14,
                    outline: "none",
                  }}
                />
              </label>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-1 inline-flex items-center justify-center gap-2"
                style={{
                  background: "var(--terracotta)",
                  color: "var(--cream-3)",
                  padding: "14px 24px",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 700,
                  fontSize: 15,
                  borderRadius: 2,
                  border: "none",
                  cursor: status === "submitting" ? "not-allowed" : "pointer",
                  opacity: status === "submitting" ? 0.6 : 1,
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
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "var(--ink-faint)",
                  textAlign: "center",
                  marginTop: 4,
                }}
              >
                — One-shot · I personally review every URL · No spam
              </p>
            </form>
          )}
        </div>

        {/* Waseem polaroid bottom-right */}
        <div
          aria-hidden
          className="hidden sm:block absolute bottom-3 right-3 w-20 h-20 overflow-hidden pointer-events-none"
          style={{
            borderRadius: 2,
            border: "1px solid rgba(26,26,26,0.25)",
            transform: "rotate(6deg)",
            boxShadow: "0 10px 24px rgba(26,26,26,0.18)",
          }}
        >
          <Image
            src="/portraits/waseem-cafe-smile.jpg"
            alt=""
            fill
            sizes="80px"
            style={{
              objectFit: "cover",
              filter: "sepia(0.10) saturate(0.95)",
            }}
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
