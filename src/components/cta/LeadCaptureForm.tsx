"use client";

/**
 * LeadCaptureForm — the shared "drop your email" island used by the three
 * LP audit/teardown forms (freight, home-services, logistics).
 *
 * Replaces the old native <form action="/api/leads" method="POST"> /
 * <form action="/discovery-call" method="GET"> markup that either 400'd
 * on urlencoded bodies or silently discarded the email in a query string.
 *
 * Behavior:
 *   - Client-side email validation (same regex as EmailGate / ReferralForm).
 *   - POSTs JSON to /api/lead-capture (NOT /api/leads — that route requires
 *     a qualification/booking object these forms don't have).
 *   - Real idle / submitting / success / error states — button disables
 *     while submitting, errors surface via role="alert", success replaces
 *     the form with a confirmation (matches ReferralForm's strict pattern).
 *   - Double-submit guard: ignores a second submit while status==="submitting".
 *   - Honeypot field sent as `_honeypot` — matches /api/leads' convention
 *     and is now also checked by /api/lead-capture.
 *
 * Visual design is 100% owned by the caller via className props — this
 * component renders no inline styling of its own beyond honeypot hiding,
 * so it drops into each LP's existing hand-written CSS unchanged.
 */

import { useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(value: string): boolean {
  if (!value || value.length > 254) return false;
  return EMAIL_RE.test(value);
}

type Status = "idle" | "submitting" | "success" | "error";

export type LeadCaptureFormProps = {
  /** DOM id for the <form>, e.g. for #anchor scroll targets. */
  id?: string;
  /** `source` tag sent to /api/lead-capture + GHL. */
  source: string;
  formClassName: string;
  buttonClassName: string;
  inputClassName?: string;
  /** If both are set, a visible <label> is rendered. */
  emailId?: string;
  emailLabel?: string;
  /** Used when there's no visible label (e.g. the logistics teardown form). */
  ariaLabel?: string;
  emailPlaceholder: string;
  buttonLabel: string;
  submittingLabel?: string;
  successHeading: string;
  successBody: string;
  /** data-meta-event placed on the <form> (logistics convention).
      "Lead" is IGNORED — the form now fires a deduped fbq Lead itself on
      confirmed success (shared eventID with the server-side CAPI event);
      rendering the attribute too would double-count via MetaPixelEvents. */
  formMetaEvent?: string;
  /** data-meta-event placed on the submit <button> (freight/home-services
      convention). "Lead" is IGNORED — same reason as formMetaEvent. */
  buttonMetaEvent?: string;
  /** Optional custom_data for the browser fbq Lead event AND the server-side
      CAPI mirror (forwarded to /api/lead-capture, which passes it to
      sendCapiLead). Omit to fall back to the pre-existing behavior
      (content_name = `source`, no value/currency) — safe no-op for every
      caller that doesn't pass these. */
  metaContentName?: string;
  metaValue?: number;
  metaCurrency?: string;
  /** Extra content rendered inside the form, below the button, only while idle/error (e.g. the ec-note copy). */
  belowButton?: React.ReactNode;
  /** Extra content rendered inside the success state, below successBody (e.g. a booking CTA). */
  successCta?: React.ReactNode;
};

export default function LeadCaptureForm({
  id,
  source,
  formClassName,
  buttonClassName,
  inputClassName,
  emailId,
  emailLabel,
  ariaLabel,
  emailPlaceholder,
  buttonLabel,
  submittingLabel = "Sending…",
  successHeading,
  successBody,
  formMetaEvent,
  buttonMetaEvent,
  metaContentName,
  metaValue,
  metaCurrency,
  belowButton,
  successCta,
}: LeadCaptureFormProps) {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return; // double-submit guard

    const trimmed = email.trim();
    if (!isValidEmail(trimmed)) {
      setError("That doesn't look like an email — try again.");
      setStatus("error");
      return;
    }

    setError(null);
    setStatus("submitting");

    // Shared event id: sent to the server (CAPI Lead) AND used for the
    // browser fbq Lead below, so Meta deduplicates the pixel/CAPI pair.
    const eventId =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `lead-${Date.now()}-${Math.floor(Math.random() * 1e9)}`;

    try {
      const res = await fetch("/api/lead-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmed,
          source,
          capturedAt: new Date().toISOString(),
          eventId,
          contentName: metaContentName,
          value: metaValue,
          currency: metaCurrency,
          _honeypot: honeypot,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}) as { error?: string });
        throw new Error(body?.error || `Server error ${res.status}`);
      }

      // Fire the browser Lead only on CONFIRMED capture (better signal than
      // submit-attempt) with the same eventID the server sent via CAPI, and
      // the same custom_data so the pixel/CAPI pair matches Meta's dedup
      // pair exactly (event_name + event_id + one browser + one server).
      const customData: Record<string, string | number> = {};
      if (metaContentName) customData.content_name = metaContentName;
      if (typeof metaValue === "number") customData.value = metaValue;
      if (metaCurrency) customData.currency = metaCurrency;

      const w = window as unknown as {
        fbq?: (...args: unknown[]) => void;
      };
      // Guarded: fbq may be undefined (blocked/absent) — must never throw
      // and must never block the success UI below.
      try {
        if (typeof w.fbq === "function") {
          w.fbq("track", "Lead", customData, { eventID: eventId });
        }
      } catch {
        // fbq threw (ad-blocker shim, etc.) — the lead is already captured
        // server-side; never let pixel noise fail the success state.
      }

      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong — try again, or email info@skynetjoe.com directly.",
      );
    }
  }

  if (status === "success") {
    return (
      <div
        className={formClassName}
        role="status"
        data-lead-capture-success="true"
      >
        <p style={{ fontWeight: 700, margin: "0 0 4px" }}>{successHeading}</p>
        <p style={{ fontSize: "0.92rem", margin: 0, opacity: 0.85 }}>
          {successBody}
        </p>
        {successCta}
      </div>
    );
  }

  return (
    <form
      className={formClassName}
      id={id}
      onSubmit={handleSubmit}
      noValidate
      data-meta-event={formMetaEvent === "Lead" ? undefined : formMetaEvent}
    >
      {/* Honeypot — hidden from humans, bots fill it. Server checks `_honeypot`. */}
      <input
        type="text"
        name="_honeypot"
        tabIndex={-1}
        autoComplete="off"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        style={{
          position: "absolute",
          left: "-10000px",
          width: 1,
          height: 1,
          opacity: 0,
        }}
        aria-hidden="true"
      />

      {emailLabel && emailId && <label htmlFor={emailId}>{emailLabel}</label>}
      <input
        id={emailId}
        className={inputClassName}
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder={emailPlaceholder}
        aria-label={ariaLabel}
        aria-invalid={status === "error"}
        value={email}
        disabled={status === "submitting"}
        onChange={(e) => {
          setEmail(e.target.value);
          if (error) setError(null);
        }}
      />

      <button
        type="submit"
        className={buttonClassName}
        disabled={status === "submitting"}
        data-meta-event={
          buttonMetaEvent === "Lead" ? undefined : buttonMetaEvent
        }
      >
        {status === "submitting" ? submittingLabel : buttonLabel}
      </button>

      {error && (
        <p role="alert" style={{ fontSize: 12, color: "#B02A2A", margin: 0 }}>
          {error}
        </p>
      )}

      {belowButton}
    </form>
  );
}
