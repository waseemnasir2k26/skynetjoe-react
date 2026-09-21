"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

/**
 * ContactBriefForm — the 3-field brief on /contact (2026-09-21).
 *
 * Replaces the 1,155-line DiscoveryCallForm that lived on /discovery-call.
 * Same endpoint (/api/discovery → GHL webhook + Resend fallback), a tenth
 * of the fields: name, email, what's broken. Budget/timeline are no longer
 * asked — the route scores those as COLD when absent, which is honest.
 *
 * States: idle → submitting → success | error. Double-submit guarded.
 * Honeypot `_honeypot` matches the convention on /api/leads + /api/lead-capture.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "submitting" | "success" | "error";

const field: React.CSSProperties = {
  width: "100%",
  background: "var(--cream-3)",
  border: "1px solid rgba(26,26,26,0.22)",
  borderRadius: 2,
  padding: "12px 14px",
  fontFamily: "var(--font-sans)",
  fontSize: 15,
  color: "var(--ink)",
  outline: "none",
};

const label: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  color: "var(--ink-2)",
  marginBottom: 6,
};

export default function ContactBriefForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pain, setPain] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const n = name.trim();
    const em = email.trim();
    const p = pain.trim();
    if (!n) return fail("Your name, so I know who I'm replying to.");
    if (!EMAIL_RE.test(em) || em.length > 254)
      return fail("That doesn't look like an email — try again.");
    if (p.length < 10)
      return fail("Give me one or two sentences on what's broken.");

    setError(null);
    setStatus("submitting");
    try {
      const res = await fetch("/api/discovery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: n,
          email: em,
          pain: p,
          consent: true,
          source: "contact",
          _honeypot: honeypot,
        }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        return fail(
          body?.error ||
            "Couldn't send that. Email info@skynetjoe.com directly instead.",
        );
      }
      setStatus("success");
    } catch {
      fail("Network hiccup. Email info@skynetjoe.com directly instead.");
    }
  }

  function fail(msg: string) {
    setError(msg);
    setStatus("error");
  }

  if (status === "success") {
    return (
      <div
        role="status"
        style={{
          background: "var(--cream-2)",
          border: "1px solid rgba(26,26,26,0.14)",
          padding: "28px 24px",
          display: "flex",
          gap: 14,
          alignItems: "flex-start",
        }}
      >
        <CheckCircle2
          style={{
            width: 24,
            height: 24,
            color: "var(--sage)",
            flex: "none",
            marginTop: 2,
          }}
        />
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 18,
              fontWeight: 600,
              color: "var(--ink)",
              marginBottom: 4,
            }}
          >
            Got it. Reply within 8 hours on weekdays.
          </div>
          <p
            style={{
              fontSize: 14,
              color: "var(--ink-2)",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Either a clarifying question or a one-page scope with price and ship
            date within 48 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{ display: "grid", gap: 16 }}
      aria-describedby={error ? "contact-brief-error" : undefined}
    >
      <div>
        <label htmlFor="cb-name" style={label}>
          Name
        </label>
        <input
          id="cb-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={field}
        />
      </div>
      <div>
        <label htmlFor="cb-email" style={label}>
          Email
        </label>
        <input
          id="cb-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={field}
        />
      </div>
      <div>
        <label htmlFor="cb-pain" style={label}>
          What&apos;s broken?
        </label>
        <textarea
          id="cb-pain"
          name="pain"
          required
          rows={4}
          maxLength={2000}
          placeholder="Leads go cold before anyone replies. Two tools that don't talk to each other. The thing you keep doing by hand."
          value={pain}
          onChange={(e) => setPain(e.target.value)}
          style={{ ...field, resize: "vertical", minHeight: 110 }}
        />
      </div>
      {/* Honeypot — hidden from humans, filled by bots. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: -9999,
          width: 1,
          height: 1,
          overflow: "hidden",
        }}
      >
        <label htmlFor="cb-company">Company</label>
        <input
          id="cb-company"
          name="_honeypot"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {error && (
        <p
          id="contact-brief-error"
          role="alert"
          style={{
            margin: 0,
            fontSize: 14,
            color: "#A8451F",
            fontWeight: 600,
          }}
        >
          {error}
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={status === "submitting"}
          style={{
            background: "var(--terracotta)",
            color: "var(--cream-3)",
            padding: "14px 24px",
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: 15,
            borderRadius: 2,
            border: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            cursor: status === "submitting" ? "wait" : "pointer",
            opacity: status === "submitting" ? 0.75 : 1,
            minHeight: 48,
          }}
        >
          {status === "submitting" ? (
            <>
              <Loader2
                className="animate-spin"
                style={{ width: 16, height: 16 }}
              />
              Sending…
            </>
          ) : (
            <>
              Send the brief
              <ArrowRight style={{ width: 16, height: 16 }} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
