"use client";

/**
 * EmailGate — capture an email before revealing a tool's result.
 *
 * Used by result-producing tools (ai-readiness-score, automation-gap-analyzer,
 * executive-summary-generator, voice-persona-builder, content-calendar).
 *
 * Behavior:
 *   - On mount, read localStorage. If a valid email is already stored for this
 *     tool, immediately call onUnlock(email) — user already submitted, skip gate.
 *   - Otherwise render the cream-paper form.
 *   - On submit: POST /api/lead-capture (fire-and-forget but await for toast
 *     feedback), save to localStorage, call onUnlock(email).
 *   - GHL POST failure never blocks unlock — user experience wins.
 *
 * Cream tokens — bg cream-3, ink, terracotta accent. Fraunces/Onest/Plex Mono.
 */

import { useEffect, useState, type ReactNode } from "react";
import { Loader2 } from "lucide-react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type EmailGateProps = {
  /** Slug used as `source` in the lead-capture payload + tag in GHL. */
  toolSlug: string;
  /** Human-readable tool name shown in the eyebrow. */
  toolName: string;
  /** 1-line carrot copy. E.g. "your custom 5-step roadmap". */
  promise: string;
  /** Optional teaser content rendered above the gate (e.g. partial result). */
  payloadPreview?: ReactNode;
  /** Parent shows results after this fires. */
  onUnlock: (email: string) => void;
  /** Override localStorage key. Default `skynet-tool-${toolSlug}-email`. */
  storageKey?: string;
  /** Sentence after the promise. Default "No spam, no drip. One result, one inbox." */
  subnote?: ReactNode;
  /** Fine print under the button. Default "Stored locally + sent to my CRM…". */
  finePrint?: ReactNode;
  /** Submit button label. Default "Show my result →". */
  buttonLabel?: string;
};

function isValidEmail(s: string): boolean {
  if (!s || s.length > 254) return false;
  return EMAIL_RE.test(s);
}

export default function EmailGate({
  toolSlug,
  toolName,
  promise,
  payloadPreview,
  onUnlock,
  storageKey,
  subnote,
  finePrint,
  buttonLabel,
}: EmailGateProps) {
  const key = storageKey || `skynet-tool-${toolSlug}-email`;
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  // hydration: null = still checking storage, false = no stored email, true = unlock'd
  const [storedUnlock, setStoredUnlock] = useState<boolean | null>(null);

  // On mount: check localStorage for a previously-submitted email
  useEffect(() => {
    if (typeof window === "undefined") return;
    let found: string | null = null;
    try {
      const stored = window.localStorage.getItem(key);
      if (stored && isValidEmail(stored)) found = stored;
    } catch {
      // ignore — fall through to gate
    }
    if (found) {
      setStoredUnlock(true);
      onUnlock(found);
    } else {
      setStoredUnlock(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // Pre-hydration or already unlocked → render nothing, parent shows result
  if (storedUnlock !== false) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!isValidEmail(trimmed)) {
      setError("That doesn't look like an email — try again.");
      return;
    }
    setError(null);
    setSubmitting(true);

    // Save locally FIRST — user's experience never blocked on backend
    try {
      window.localStorage.setItem(key, trimmed);
    } catch {
      // private mode / quota — ignore
    }

    const payload = {
      email: trimmed,
      source: toolSlug,
      capturedAt: new Date().toISOString(),
    };

    // Fire to backend — short await for toast feedback, never blocks unlock
    try {
      await Promise.race([
        fetch("/api/lead-capture", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }).catch((err) => {
          console.log("[email-gate] /api/lead-capture failed silently", err);
        }),
        new Promise((resolve) => setTimeout(resolve, 1500)),
      ]);
    } catch {
      // Swallow — local save already done, unlock proceeds
    }

    setSubmitting(false);
    onUnlock(trimmed);
  };

  return (
    <div>
      {payloadPreview && <div className="mb-6">{payloadPreview}</div>}

      <div
        className="relative overflow-hidden"
        style={{
          background: "var(--cream-3)",
          border: "1px solid rgba(26,26,26,0.18)",
          borderRadius: 2,
          padding: "40px 32px",
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

        {/* Mono eyebrow */}
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
          — Unlock your result · {toolName}
        </div>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 4vw, 36px)",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: "var(--ink)",
            marginBottom: 14,
          }}
        >
          One quick thing.
        </h2>

        <p
          style={{
            fontSize: 15,
            color: "var(--ink-2)",
            lineHeight: 1.55,
            marginBottom: 24,
            maxWidth: "52ch",
          }}
        >
          Drop your email and I&apos;ll unlock{" "}
          <span style={{ color: "var(--terracotta)", fontWeight: 600 }}>
            {promise}
          </span>
          . {subnote ?? "No spam, no drip. One result, one inbox."}
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(null);
            }}
            placeholder="you@company.com"
            aria-label="Your email"
            aria-invalid={!!error}
            disabled={submitting}
            style={{
              width: "100%",
              background: "var(--cream-3)",
              color: "var(--ink)",
              border: error
                ? "1px solid var(--terracotta)"
                : "1px solid rgba(26,26,26,0.18)",
              borderRadius: 2,
              padding: "14px 16px",
              fontFamily: "var(--font-mono)",
              fontSize: 14,
              outline: "none",
              transition: "border-color 0.15s ease",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "var(--terracotta)";
            }}
            onBlur={(e) => {
              if (!error) {
                e.currentTarget.style.borderColor = "rgba(26,26,26,0.18)";
              }
            }}
          />

          {error && (
            <p
              role="alert"
              style={{
                fontSize: 12,
                color: "var(--terracotta)",
                marginTop: 8,
                fontFamily: "var(--font-sans)",
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="hover:opacity-90"
            style={{
              marginTop: 14,
              background: "var(--terracotta)",
              color: "var(--cream-3)",
              padding: "14px 24px",
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: 15,
              borderRadius: 2,
              border: "none",
              cursor: submitting ? "not-allowed" : "pointer",
              opacity: submitting ? 0.6 : 1,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              transition: "opacity 0.15s ease",
            }}
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Unlocking…
              </>
            ) : (
              <>{buttonLabel ?? "Show my result →"}</>
            )}
          </button>

          <p
            style={{
              fontSize: 11,
              color: "var(--ink-faint)",
              marginTop: 14,
              lineHeight: 1.5,
              maxWidth: "52ch",
              fontFamily: "var(--font-sans)",
            }}
          >
            {finePrint ??
              "Stored locally + sent to my CRM. I'll be the only person who sees it."}
          </p>
        </form>
      </div>
    </div>
  );
}
