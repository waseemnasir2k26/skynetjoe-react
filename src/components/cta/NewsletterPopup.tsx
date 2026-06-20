"use client";

/**
 * NewsletterPopup — replaces the old (removed) footer newsletter box with a
 * single-field email-capture modal. Cream editorial brand, matches
 * ExitIntentModal exactly (terracotta rule, Fraunces display, Plex Mono eyebrow).
 *
 * Wiring:
 *   - POST /api/lead-capture  { email, source: "newsletter-popup", capturedAt }
 *     → upsertGhlContact tagged ["newsletter-popup", "tool-lead"] → GHL.
 *     Same proven path as the tool gates; Slack/Resend fallback on the server
 *     means a submitted email is never silently dropped.
 *
 * Coordination (no popup stacking):
 *   - Honours the shared session guard `skynet-popup-fired` used by
 *     ExitIntentModal / SocialProofPopup / DiscoveryPopup / IncomingCallPopup.
 *     First popup to set it wins for the session. This one is LOWEST priority —
 *     long dwell + scroll trigger — so it never pre-empts the higher-value
 *     Loom exit-intent or discovery popups.
 *   - Own frequency cap via localStorage `skynet:newsletter:shown` — once shown
 *     (fired, whether submitted or dismissed) it won't nag again.
 */

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { X, Loader2, CheckCircle2 } from "lucide-react";

const STORAGE_KEY = "skynet:newsletter:shown";
const SHARED_POPUP_KEY = "skynet-popup-fired";
const DWELL_MS = 40000; // lowest-priority: only after real engagement
const SCROLL_PCT = 0.6;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function NewsletterPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const triggeredRef = useRef(false);
  const mountedAtRef = useRef<number>(0);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Don't show where a dedicated capture/flow already owns the screen.
  const disabled =
    pathname === "/discovery-call" ||
    pathname === "/thank-you" ||
    pathname === "/edit-videos-with-claude" ||
    pathname?.startsWith("/lp/") ||
    pathname?.startsWith("/api/");

  useEffect(() => {
    mountedAtRef.current = Date.now();
    if (disabled) return;
    if (typeof window === "undefined") return;

    // Another popup already fired this session → yield.
    try {
      if (sessionStorage.getItem(SHARED_POPUP_KEY) === "1") return;
    } catch {}
    // Already shown to this visitor before → don't nag.
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {}

    const fire = () => {
      if (triggeredRef.current) return;
      // Re-check the shared guard at fire-time — a higher-value popup may have
      // claimed the session while we were waiting.
      try {
        if (sessionStorage.getItem(SHARED_POPUP_KEY) === "1") return;
      } catch {}
      triggeredRef.current = true;
      try {
        localStorage.setItem(STORAGE_KEY, "1");
        sessionStorage.setItem(SHARED_POPUP_KEY, "1");
      } catch {}
      setOpen(true);
    };

    const timer = setTimeout(fire, DWELL_MS);

    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docH > 0 ? window.scrollY / docH : 0;
      if (pct >= SCROLL_PCT) fire();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [disabled, pathname]);

  const closeModal = () => {
    setOpen(false);
    // Release the shared guard so other one-per-session popups can still fire
    // later — matches ExitIntentModal's dismiss behaviour.
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
    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setStatus("error");
      setErrorMsg("That doesn't look like an email — try again.");
      return;
    }
    setStatus("submitting");
    setErrorMsg(null);

    const payload = {
      email: trimmed,
      source: "newsletter-popup",
      capturedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/lead-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        console.error("[newsletter-popup] /api/lead-capture non-OK", {
          status: res.status,
        });
        setStatus("error");
        setErrorMsg("Couldn't save your email. Try info@skynetjoe.com");
        return;
      }
    } catch (err) {
      console.error("[newsletter-popup] /api/lead-capture unreachable", err);
      setStatus("error");
      setErrorMsg("Couldn't save your email. Try info@skynetjoe.com");
      return;
    }
    setStatus("success");
    setTimeout(() => closeModal(), 2200);
  };

  if (disabled || !open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center px-4 py-4 md:py-6 overflow-y-auto"
      style={{
        background: "rgba(26, 26, 26, 0.55)",
        animation: "skynet-news-fade 0.28s ease-out forwards",
      }}
      onClick={closeModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="newsletter-popup-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full overflow-hidden"
        style={{
          maxWidth: "min(500px, calc(100vw - 32px))",
          background: "var(--cream-3)",
          border: "1px solid rgba(26,26,26,0.20)",
          borderRadius: 2,
          boxShadow: "0 32px 80px rgba(26,26,26,0.30)",
          animation:
            "skynet-news-scale 0.34s cubic-bezier(0.16, 1, 0.3, 1) forwards",
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
            The build log
          </div>

          <h2
            id="newsletter-popup-title"
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
            Steal what I&apos;m{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--terracotta)",
                fontWeight: 500,
              }}
            >
              building.
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
            Every so often I send the actual prompts, flows, and AI builds I
            ship with Claude Code — the ones that worked.{" "}
            <span style={{ color: "var(--terracotta)", fontWeight: 600 }}>
              No schedule, no fluff.
            </span>{" "}
            One-click unsubscribe.
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
                  You&apos;re in.
                </div>
                <div style={{ fontSize: 13, color: "var(--ink-2)" }}>
                  Next build worth stealing lands in your inbox.
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
                    "Couldn't save your email. Try info@skynetjoe.com"}
                </div>
                <a
                  href="mailto:info@skynetjoe.com?subject=Add%20me%20to%20the%20build%20log"
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
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3"
              noValidate
            >
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                aria-label="Your email"
                style={{
                  background: "var(--cream-2)",
                  color: "var(--ink)",
                  border: "1px solid rgba(26,26,26,0.18)",
                  borderRadius: 2,
                  padding: "12px 14px",
                  fontFamily: "var(--font-mono)",
                  fontSize: 14,
                  outline: "none",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--terracotta)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(26,26,26,0.18)";
                }}
              />

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
                    Adding you…
                  </>
                ) : (
                  <>Send me the builds →</>
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
                — One inbox, mine · I never share it
              </p>
            </form>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes skynet-news-fade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes skynet-news-scale {
          from {
            opacity: 0;
            transform: scale(0.94) translateY(8px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
