"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Send,
  ArrowRight,
  ArrowLeft,
  User,
  Briefcase,
  Sparkles,
  TrendingUp,
  Clock,
  DollarSign,
  Zap,
} from "lucide-react";

/**
 * Cream editorial pivot 2026-05-25 — legacy form (cream surfaces, 1px ink
 * border inputs, terracotta primary button). All form logic preserved.
 */

const C = {
  cream: "#F2EFE6",
  cream2: "#EDE8DC",
  cream3: "#FAF7F0",
  ink: "#1A1A1A",
  ink2: "#3A3A36",
  inkFaint: "#6B6B65",
  terra: "#C66B3F",
  terra2: "#B85A30",
  rule: "rgba(26,26,26,0.12)",
  ruleSoft: "rgba(26,26,26,0.06)",
};

const BUDGETS = [
  { value: "under-500", label: "Under $500", description: "Likely DIY territory — we'll send resources.", roi: 0 },
  { value: "500-2000", label: "$500 – $2,000", description: "Small scope: 1 workflow, landing page, or audit.", roi: 1200 },
  { value: "2000-5000", label: "$2,000 – $5,000", description: "Standard build: site + automation + CRM wire.", roi: 3500 },
  { value: "5000-plus", label: "$5,000+", description: "Full stack: platform, multi-flow, ongoing retainer.", roi: 7500 },
] as const;

const TIMELINES = [
  { value: "this-week", label: "This week", description: "Urgent. Premium rate applies.", days: 5 },
  { value: "this-month", label: "This month", description: "Standard ship window: 5–14 days.", days: 14 },
  { value: "1-3-months", label: "1–3 months", description: "Planning phase — let's scope properly.", days: 60 },
  { value: "exploring", label: "Just exploring", description: "No timeline. We'll send the AEO guide.", days: 0 },
] as const;

const STACK_OPTIONS = [
  "n8n",
  "Make / Integromat",
  "Zapier",
  "GoHighLevel",
  "WordPress",
  "Shopify",
  "Webflow",
  "Next.js / React",
  "Live chat / chatbot",
  "OpenAI / Claude API",
  "Airtable / Notion",
  "Nothing yet",
] as const;

const HEARD_OPTIONS = [
  { value: "linkedin", label: "LinkedIn" },
  { value: "google", label: "Google search" },
  { value: "referral", label: "Referral / word of mouth" },
  { value: "upwork", label: "Upwork" },
  { value: "fiverr", label: "Fiverr" },
  { value: "github", label: "GitHub" },
  { value: "youtube", label: "YouTube" },
  { value: "other", label: "Other" },
];

type FormState = {
  name: string;
  email: string;
  whatsapp: string;
  company: string;
  website: string;
  role: string;
  budget: string;
  timeline: string;
  stack: string[];
  pain: string;
  heard: string;
  consent: boolean;
};

const initial: FormState = {
  name: "",
  email: "",
  whatsapp: "",
  company: "",
  website: "",
  role: "",
  budget: "",
  timeline: "",
  stack: [],
  pain: "",
  heard: "",
  consent: false,
};

type Status = "idle" | "submitting" | "success" | "error";

const STEPS = [
  { id: 1, title: "About you", icon: User },
  { id: 2, title: "Your project", icon: Briefcase },
  { id: 3, title: "The brief", icon: Sparkles },
] as const;

const INPUT_STYLE: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  background: C.cream3,
  border: `1px solid ${C.rule}`,
  color: C.ink,
  fontFamily: "var(--font-sans)",
  fontSize: 15,
  outline: "none",
  borderRadius: 2,
};

export default function DiscoveryCallForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [confetti, setConfetti] = useState<{ x: number; y: number; r: number; c: string; d: number }[]>([]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleStack(item: string) {
    setForm((f) => ({
      ...f,
      stack: f.stack.includes(item)
        ? f.stack.filter((s) => s !== item)
        : [...f.stack, item],
    }));
  }

  const canAdvance = useMemo(() => {
    if (step === 1) return form.name.length > 1 && /\S+@\S+\.\S+/.test(form.email);
    if (step === 2) return form.budget && form.timeline;
    return form.pain.length > 10 && form.consent;
  }, [step, form]);

  const estimate = useMemo(() => {
    const b = BUDGETS.find((x) => x.value === form.budget)?.roi || 0;
    const t = TIMELINES.find((x) => x.value === form.timeline)?.days || 0;
    if (!b || !t) return null;
    const monthlyImpact = Math.round(b * 1.6);
    const breakEvenWeeks = b > 0 ? Math.ceil((b / (monthlyImpact / 4)) * 10) / 10 : 0;
    return { build: b, monthly: monthlyImpact, ship: t, breakEven: breakEvenWeeks };
  }, [form.budget, form.timeline]);

  const fillPct = useMemo(() => {
    const checks = [
      form.name,
      form.email,
      form.budget,
      form.timeline,
      form.pain.length > 10,
      form.consent,
    ];
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  }, [form]);

  function triggerConfetti() {
    const colors = [C.terra, C.terra2, "#C9A96E", "#8A9A7B"];
    const pieces = Array.from({ length: 60 }, () => ({
      x: Math.random() * 100,
      y: -10,
      r: Math.random() * 360,
      c: colors[Math.floor(Math.random() * colors.length)],
      d: Math.random() * 0.5,
    }));
    setConfetti(pieces);
    setTimeout(() => setConfetti([]), 4000);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/discovery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Server error (${res.status})`);
      }
      setStatus("success");
      triggerConfetti();
      if (typeof window !== "undefined" && (window as unknown as { dataLayer?: unknown[] }).dataLayer) {
        (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
          event: "discovery_call_submitted",
          budget: form.budget,
          timeline: form.timeline,
          heard: form.heard,
        });
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Submission failed. Email info@skynetjoe.com instead.");
    }
  }

  if (status === "success") {
    return (
      <>
        {confetti.length > 0 && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {confetti.map((p, i) => (
              <motion.span
                key={i}
                initial={{ x: `${p.x}vw`, y: "-5vh", rotate: 0 }}
                animate={{ y: "105vh", rotate: p.r + 720 }}
                transition={{ duration: 3 + p.d, ease: "easeIn" }}
                className="absolute w-2 h-3"
                style={{ background: p.c }}
              />
            ))}
          </div>
        )}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            background: C.cream2,
            border: `1px solid ${C.terra}`,
            padding: 32,
            textAlign: "center",
          }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <CheckCircle2 style={{ width: 64, height: 64, color: C.terra, margin: "0 auto 16px" }} />
          </motion.div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 30,
              fontWeight: 600,
              color: C.ink,
              marginBottom: 12,
              letterSpacing: "-0.01em",
            }}
          >
            Brief received.
          </h3>
          <p style={{ color: C.ink2, marginBottom: 12, fontSize: 17 }}>
            We&apos;ll reply within{" "}
            <strong style={{ color: C.terra }}>8 hours</strong> on weekday Bali
            time (GMT+8).
          </p>
          <div
            style={{
              marginTop: 24,
              padding: 16,
              background: C.cream3,
              border: `1px solid ${C.rule}`,
              textAlign: "left",
              maxWidth: 360,
              margin: "24px auto 0",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                textTransform: "uppercase",
                color: C.terra,
                fontWeight: 600,
                letterSpacing: "0.16em",
                marginBottom: 8,
              }}
            >
              — What happens next
            </p>
            <ol style={{ fontSize: 14, color: C.ink2, lineHeight: 1.7, margin: 0, paddingLeft: 0, listStyle: "none" }}>
              <li>1. Waseem reads your brief personally</li>
              <li>2. You get a yes + Cal.com, or referral, or 1 question</li>
              <li>3. If yes — fixed scope in 48 hours</li>
            </ol>
          </div>
          <p style={{ fontSize: 14, color: C.inkFaint, marginTop: 24 }}>
            Urgent? Email{" "}
            <a
              href="mailto:info@skynetjoe.com"
              style={{ color: C.terra, textDecoration: "underline", fontWeight: 600 }}
            >
              info@skynetjoe.com
            </a>{" "}
            — typical reply window 8 hours.
          </p>
        </motion.div>
      </>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Progress rail */}
      <div className="relative">
        <div className="flex items-center justify-between mb-2">
          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            const active = step === s.id;
            const done = step > s.id;
            return (
              <div key={s.id} className="flex-1 flex items-center">
                <button
                  type="button"
                  onClick={() => done && setStep(s.id)}
                  className="flex items-center gap-2 group"
                  disabled={!done}
                  style={{ background: "transparent", border: "none", cursor: done ? "pointer" : "default" }}
                >
                  <motion.div
                    animate={{ scale: active ? 1.1 : 1 }}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: done || active ? C.terra : C.cream2,
                      border: `2px solid ${done || active ? C.terra : C.rule}`,
                      color: done || active ? C.cream3 : C.inkFaint,
                    }}
                  >
                    {done ? (
                      <CheckCircle2 style={{ width: 16, height: 16 }} />
                    ) : (
                      <Icon style={{ width: 16, height: 16 }} />
                    )}
                  </motion.div>
                  <span
                    className="hidden sm:inline"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: "0.10em",
                      fontWeight: 600,
                      color: active || done ? C.terra : C.inkFaint,
                    }}
                  >
                    {s.title}
                  </span>
                </button>
                {idx < STEPS.length - 1 && (
                  <div className="flex-1 h-px mx-2" style={{ background: C.rule }} />
                )}
              </div>
            );
          })}
        </div>
        <div
          style={{
            height: 6,
            background: C.cream2,
            overflow: "hidden",
            border: `1px solid ${C.ruleSoft}`,
          }}
        >
          <motion.div
            animate={{ width: `${fillPct}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            style={{ height: "100%", background: C.terra }}
          />
        </div>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: C.inkFaint,
            marginTop: 6,
          }}
        >
          — {fillPct}% complete · step {step} of {STEPS.length}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="s1"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field htmlFor="df-name" label="Your name" required>
                <input
                  id="df-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Stephanie Chen"
                  style={INPUT_STYLE}
                  autoFocus
                />
              </Field>
              <Field htmlFor="df-email" label="Email" required>
                <input
                  id="df-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@company.com"
                  style={INPUT_STYLE}
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field htmlFor="df-phone" label="Phone" hint="Optional. Include country code.">
                <input
                  id="df-phone"
                  type="tel"
                  value={form.whatsapp}
                  onChange={(e) => update("whatsapp", e.target.value)}
                  placeholder="+1 415 555 0100"
                  style={INPUT_STYLE}
                />
              </Field>
              <Field htmlFor="df-role" label="Your role" hint="Founder, Ops, Marketing…">
                <input
                  id="df-role"
                  type="text"
                  value={form.role}
                  onChange={(e) => update("role", e.target.value)}
                  placeholder="Founder"
                  style={INPUT_STYLE}
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field htmlFor="df-company" label="Company">
                <input
                  id="df-company"
                  type="text"
                  value={form.company}
                  onChange={(e) => update("company", e.target.value)}
                  placeholder="Acme Dental"
                  style={INPUT_STYLE}
                />
              </Field>
              <Field htmlFor="df-website" label="Website">
                <input
                  id="df-website"
                  type="url"
                  value={form.website}
                  onChange={(e) => update("website", e.target.value)}
                  placeholder="https://acmedental.com"
                  style={INPUT_STYLE}
                />
              </Field>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="s2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="space-y-5"
          >
            <Field
              label="Budget"
              required
              hint="Honest answer = honest scope. No upsell games."
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {BUDGETS.map((b) => (
                  <RadioCard
                    key={b.value}
                    name="budget"
                    value={b.value}
                    checked={form.budget === b.value}
                    onChange={() => update("budget", b.value)}
                    label={b.label}
                    description={b.description}
                  />
                ))}
              </div>
            </Field>

            <Field label="Timeline" required>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {TIMELINES.map((t) => (
                  <RadioCard
                    key={t.value}
                    name="timeline"
                    value={t.value}
                    checked={form.timeline === t.value}
                    onChange={() => update("timeline", t.value)}
                    label={t.label}
                    description={t.description}
                  />
                ))}
              </div>
            </Field>

            <AnimatePresence>
              {estimate && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{ overflow: "hidden" }}
                >
                  <div
                    style={{
                      padding: 20,
                      background: C.cream2,
                      border: `1px solid ${C.rule}`,
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        textTransform: "uppercase",
                        letterSpacing: "0.16em",
                        color: C.terra,
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 12,
                      }}
                    >
                      <TrendingUp style={{ width: 14, height: 14 }} /> Rough estimate (not a quote)
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      <Stat
                        icon={DollarSign}
                        label="Build"
                        value={`$${estimate.build.toLocaleString()}`}
                      />
                      <Stat
                        icon={Clock}
                        label="Ship"
                        value={
                          estimate.ship > 0 ? `~${estimate.ship}d` : "TBD"
                        }
                      />
                      <Stat
                        icon={Zap}
                        label="Break-even"
                        value={
                          estimate.breakEven > 0
                            ? `${estimate.breakEven}wk`
                            : "—"
                        }
                      />
                    </div>
                    <p style={{ fontSize: 11, color: C.inkFaint, marginTop: 12, lineHeight: 1.6 }}>
                      Based on similar gigs. Real scope locked in 48h after
                      brief review.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="s3"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="space-y-5"
          >
            <Field
              label="What stack are you on today?"
              hint="Pick any. Helps us scope quickly."
            >
              <div className="flex flex-wrap gap-2">
                {STACK_OPTIONS.map((s) => {
                  const active = form.stack.includes(s);
                  return (
                    <motion.button
                      type="button"
                      key={s}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleStack(s)}
                      style={{
                        padding: "8px 14px",
                        background: active ? C.terra : C.cream3,
                        color: active ? C.cream3 : C.ink,
                        border: `1px solid ${active ? C.terra : C.rule}`,
                        fontFamily: "var(--font-sans)",
                        fontWeight: 600,
                        fontSize: 14,
                        cursor: "pointer",
                        borderRadius: 999,
                      }}
                    >
                      {s}
                    </motion.button>
                  );
                })}
              </div>
            </Field>

            <Field
              htmlFor="df-pain"
              label="What's the main pain?"
              required
              hint="2–4 sentences. Be specific: 'no-shows costing $8K/mo' beats 'need automation'."
            >
              <textarea
                id="df-pain"
                required
                rows={5}
                value={form.pain}
                onChange={(e) => update("pain", e.target.value)}
                placeholder="Example: We get 40 leads/week from Facebook but 30% no-show on consult calls. CRM is GHL but reminders aren't firing. Want SMS + email reminder flow + auto-rebook for cancellations."
                style={{ ...INPUT_STYLE, resize: "none" }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 11,
                  color: C.inkFaint,
                  marginTop: 6,
                  fontFamily: "var(--font-mono)",
                }}
              >
                <span>{form.pain.length} chars</span>
                <span style={{ color: form.pain.length > 80 ? C.terra : C.inkFaint }}>
                  {form.pain.length > 80 ? "✓ Detailed enough" : "Aim for 80+ chars"}
                </span>
              </div>
            </Field>

            <Field label="How did you hear about us?">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {HEARD_OPTIONS.map((h) => {
                  const active = form.heard === h.value;
                  return (
                    <button
                      type="button"
                      key={h.value}
                      onClick={() => update("heard", h.value)}
                      style={{
                        padding: "8px 12px",
                        background: active ? C.cream2 : C.cream3,
                        color: active ? C.terra : C.ink2,
                        border: active ? `1px solid ${C.terra}` : `1px solid ${C.rule}`,
                        fontFamily: "var(--font-sans)",
                        fontWeight: 600,
                        fontSize: 12,
                        cursor: "pointer",
                        borderRadius: 2,
                      }}
                    >
                      {h.label}
                    </button>
                  );
                })}
              </div>
            </Field>

            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                cursor: "pointer",
                padding: 16,
                background: C.cream2,
                border: `1px solid ${C.rule}`,
              }}
            >
              <input
                type="checkbox"
                required
                checked={form.consent}
                onChange={(e) => update("consent", e.target.checked)}
                style={{ marginTop: 2, width: 16, height: 16, accentColor: C.terra }}
              />
              <span style={{ fontSize: 14, color: C.ink2, lineHeight: 1.55 }}>
                OK to reply via email. We don&apos;t share your data,
                sell it, or add you to a drip. One-touch unsubscribe always.
              </span>
            </label>

            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  padding: 16,
                  background: "rgba(107, 44, 44, 0.08)",
                  border: `1px solid #6B2C2C`,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                }}
              >
                <AlertTriangle style={{ width: 20, height: 20, color: "#6B2C2C", flexShrink: 0, marginTop: 2 }} />
                <div style={{ fontSize: 14 }}>
                  <p style={{ color: "#6B2C2C", fontWeight: 600, marginBottom: 4 }}>
                    Couldn&apos;t submit
                  </p>
                  <p style={{ color: C.ink2 }}>{errorMsg}</p>
                  <p style={{ color: C.inkFaint, marginTop: 8 }}>
                    Fallback:{" "}
                    <a
                      href="mailto:info@skynetjoe.com"
                      style={{ textDecoration: "underline", color: C.terra }}
                    >
                      email Waseem
                    </a>{" "}
                    directly.
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          paddingTop: 12,
          borderTop: `1px solid ${C.ruleSoft}`,
        }}
      >
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 18px",
              background: "transparent",
              color: C.ink,
              border: `1px solid ${C.ink}`,
              cursor: "pointer",
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: 14,
              borderRadius: 2,
            }}
          >
            <ArrowLeft style={{ width: 14, height: 14 }} /> Back
          </button>
        ) : (
          <span />
        )}

        {step < STEPS.length ? (
          <motion.button
            type="button"
            whileHover={canAdvance ? { scale: 1.02 } : {}}
            whileTap={canAdvance ? { scale: 0.98 } : {}}
            onClick={() => canAdvance && setStep((s) => s + 1)}
            disabled={!canAdvance}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 22px",
              background: canAdvance ? C.terra : C.cream2,
              color: canAdvance ? C.cream3 : C.inkFaint,
              border: canAdvance ? "none" : `1px solid ${C.rule}`,
              cursor: canAdvance ? "pointer" : "not-allowed",
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: 14,
              borderRadius: 2,
              opacity: canAdvance ? 1 : 0.5,
            }}
          >
            Continue <ArrowRight style={{ width: 14, height: 14 }} />
          </motion.button>
        ) : (
          <motion.button
            type="submit"
            whileHover={status !== "submitting" ? { scale: 1.02 } : {}}
            whileTap={status !== "submitting" ? { scale: 0.98 } : {}}
            disabled={status === "submitting" || !canAdvance}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 22px",
              background: status !== "submitting" && canAdvance ? C.terra : C.cream2,
              color: status !== "submitting" && canAdvance ? C.cream3 : C.inkFaint,
              border: status !== "submitting" && canAdvance ? "none" : `1px solid ${C.rule}`,
              cursor: status === "submitting" || !canAdvance ? "not-allowed" : "pointer",
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: 14,
              borderRadius: 2,
              opacity: status === "submitting" || !canAdvance ? 0.5 : 1,
            }}
          >
            {status === "submitting" ? (
              <>
                <Loader2 style={{ width: 14, height: 14 }} className="animate-spin" /> Sending brief…
              </>
            ) : (
              <>
                <Send style={{ width: 14, height: 14 }} /> Send brief — reply in 8 hours
              </>
            )}
          </motion.button>
        )}
      </div>

      <p style={{ fontSize: 11, color: C.inkFaint }}>
        By submitting you agree to our{" "}
        <a href="/privacy-policy" style={{ textDecoration: "underline", color: C.terra }}>
          Privacy Policy
        </a>
        . No spam, no sequences.
      </p>
    </form>
  );
}

function Field({
  htmlFor,
  label,
  hint,
  required,
  children,
}: {
  htmlFor?: string;
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        style={{
          display: "block",
          fontSize: 13,
          fontWeight: 600,
          color: C.ink,
          marginBottom: 6,
          fontFamily: "var(--font-mono)",
          textTransform: "uppercase",
          letterSpacing: "0.10em",
        }}
      >
        {label}
        {required && <span style={{ color: C.terra, marginLeft: 4 }}>*</span>}
      </label>
      {hint && (
        // ink2 (was inkFaint) — bumps 12px hint to WCAG AAA contrast on cream
        <p style={{ fontSize: 12, color: C.ink2, marginBottom: 10 }}>
          {hint}
        </p>
      )}
      {children}
    </div>
  );
}

function RadioCard({
  name,
  value,
  checked,
  onChange,
  label,
  description,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  label: string;
  description: string;
}) {
  return (
    <motion.label
      whileTap={{ scale: 0.98 }}
      style={{
        display: "block",
        padding: 14,
        cursor: "pointer",
        background: checked ? C.cream2 : C.cream3,
        border: checked ? `2px solid ${C.terra}` : `1px solid ${C.rule}`,
        borderRadius: 2,
      }}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <div className="flex items-start gap-3">
        <div
          style={{
            marginTop: 4,
            width: 16,
            height: 16,
            borderRadius: "50%",
            border: `2px solid ${checked ? C.terra : "#6B6B65"}`,
            background: checked ? C.terra : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {checked && (
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.cream3 }} />
          )}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, color: C.ink, fontSize: 14 }}>{label}</div>
          <div style={{ fontSize: 12, color: C.inkFaint, marginTop: 2, lineHeight: 1.4 }}>
            {description}
          </div>
        </div>
      </div>
    </motion.label>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof DollarSign;
  label: string;
  value: string;
}) {
  return (
    <div style={{ textAlign: "center" }}>
      <Icon style={{ width: 16, height: 16, color: C.terra, margin: "0 auto 4px" }} />
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: 18,
          fontWeight: 600,
          color: C.ink,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          textTransform: "uppercase",
          color: C.inkFaint,
          letterSpacing: "0.10em",
        }}
      >
        {label}
      </div>
    </div>
  );
}

export function DiscoveryProofSidebar() {
  return (
    <div className="space-y-4">
      <div
        style={{
          padding: 20,
          background: C.cream2,
          border: `1px solid ${C.rule}`,
          transform: "rotate(-0.3deg)",
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div
            style={{
              position: "relative",
              width: 48,
              height: 48,
              borderRadius: "50%",
              overflow: "hidden",
              border: `2px solid ${C.terra}`,
              flexShrink: 0,
            }}
          >
            <Image
              src="/portraits/waseem-cafe-arch.jpg"
              alt="Waseem"
              fill
              sizes="48px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div>
            <p style={{ color: C.ink, fontWeight: 600, fontSize: 14 }}>Waseem reads every brief</p>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: C.inkFaint,
                textTransform: "uppercase",
                letterSpacing: "0.10em",
              }}
            >
              — Solo founder · Bali based
            </p>
          </div>
        </div>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: 14,
            color: C.ink2,
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          &quot;You don&apos;t get a sales rep. You get me. I read your brief,
          map your stack, then reply yes / no / referral. No funnel.&quot;
        </p>
      </div>

      <div
        style={{
          padding: 20,
          background: C.cream3,
          border: `1px solid ${C.terra}`,
          transform: "rotate(0.3deg)",
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div
            style={{
              position: "relative",
              width: 48,
              height: 48,
              borderRadius: "50%",
              overflow: "hidden",
              border: `2px solid ${C.terra}`,
              flexShrink: 0,
            }}
          >
            <Image
              src="/portraits/waseem-veranda-thinking.jpg"
              alt="Waseem"
              fill
              sizes="48px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 14,
              background: C.terra,
              color: C.cream3,
              fontFamily: "var(--font-mono)",
              border: `2px solid ${C.terra}`,
              flexShrink: 0,
            }}
          >
            CC
          </div>
          <div>
            <p style={{ color: C.ink, fontWeight: 600, fontSize: 14 }}>
              <span style={{ color: C.terra }}>WN</span>{" "}
              <span style={{ color: C.inkFaint }}>+</span>{" "}
              <span style={{ color: C.terra }}>CC</span>
            </p>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: C.inkFaint,
                textTransform: "uppercase",
                letterSpacing: "0.10em",
              }}
            >
              — 2-person team. Yes that&apos;s it.
            </p>
          </div>
        </div>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: 14,
            color: C.ink2,
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          You brief me. Claude drafts. I ship. Most agencies have 12 humans —
          we have 1 human + 1 Anthropic API key. The math works.
        </p>
      </div>
    </div>
  );
}
