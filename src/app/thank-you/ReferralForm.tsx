"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function ReferralForm() {
  const [email, setEmail] = useState("");
  const [referrerEmail, setReferrerEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setErrorMsg("That doesn't look like a valid email.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "referral",
          website, // honeypot — server can silently swallow if present
          qualification: {
            businessType: "referral",
            customAnswers: {
              referred_email: email,
              referrer_email: referrerEmail || "(unknown — post-booking page)",
              referral_origin: "thank-you-page",
            },
          },
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || `Server error ${res.status}`);
      }
      setStatus("success");
      setEmail("");
      setReferrerEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-400/30 text-emerald-100">
        <p className="font-semibold mb-1">Got it. Thanks for the intro.</p>
        <p className="text-sm text-emerald-200/80">
          I&apos;ll reach out within 24 hours. If they sign for a build, $200 credit
          lands on your next invoice automatically.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]"
      noValidate
    >
      {/* Honeypot — hidden from humans, bots fill it */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        style={{
          position: "absolute",
          left: "-10000px",
          width: 1,
          height: 1,
          opacity: 0,
        }}
        aria-hidden="true"
      />

      <label className="sr-only" htmlFor="referral-email">
        Friend&apos;s email
      </label>
      <input
        id="referral-email"
        type="email"
        required
        placeholder="founder@theircompany.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition"
      />

      <label className="sr-only" htmlFor="referrer-email">
        Your email (optional, for credit tracking)
      </label>
      <input
        id="referrer-email"
        type="email"
        placeholder="your email (for the credit)"
        value={referrerEmail}
        onChange={(e) => setReferrerEmail(e.target.value)}
        className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition"
      />

      <button
        type="submit"
        disabled={status === "loading"}
        className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 disabled:opacity-60 disabled:cursor-not-allowed transition"
      >
        {status === "loading" ? "Sending…" : "Send intro"}
      </button>

      {status === "error" && (
        <p className="sm:col-span-3 text-sm text-red-300">{errorMsg}</p>
      )}
    </form>
  );
}
