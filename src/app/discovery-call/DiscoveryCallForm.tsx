"use client";

import { useState, useMemo, useEffect } from "react";
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
    const colors = ["#00D4FF", "#14B8A6", "#1E88E5", "#5EEAD4", "#7EE4FF"];
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
      setErrorMsg(err instanceof Error ? err.message : "Submission failed. Email waseem@skynetjoe.com instead.");
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
                className="absolute w-2 h-3 rounded-sm"
                style={{ background: p.c }}
              />
            ))}
          </div>
        )}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl bg-gradient-to-br from-emerald-500/15 to-cyan-500/15 border border-emerald-400/40 p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <CheckCircle2 className="w-16 h-16 text-emerald-300 mx-auto mb-4" />
          </motion.div>
          <h3 className="text-3xl font-extrabold text-white mb-3">Brief received.</h3>
          <p className="text-gray-200 mb-3 text-lg">
            We&apos;ll reply within{" "}
            <strong className="text-emerald-300">8 hours</strong> on weekday Bali
            time (GMT+8).
          </p>
          <div className="mt-6 p-4 rounded-xl bg-slate-900/40 border border-white/10 text-left max-w-sm mx-auto">
            <p className="text-xs uppercase text-cyan-300 font-semibold tracking-wider mb-2">
              What happens next
            </p>
            <ol className="text-sm text-gray-300 space-y-1.5">
              <li>1. Waseem reads your brief personally</li>
              <li>2. You get a yes + Cal.com, or referral, or 1 question</li>
              <li>3. If yes — fixed scope in 48 hours</li>
            </ol>
          </div>
          <p className="text-sm text-gray-400 mt-6">
            Urgent? Email{" "}
            <a
              href="mailto:waseem@skynetjoe.com"
              className="text-cyan-300 underline font-semibold"
            >
              waseem@skynetjoe.com
            </a>{" "}
            — typical reply window 8 hours.
          </p>
        </motion.div>
      </>
    );
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:border-cyan-400 focus:bg-white/8 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 transition";

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
                >
                  <motion.div
                    animate={{
                      scale: active ? 1.1 : 1,
                      backgroundColor: done
                        ? "rgba(16,185,129,0.2)"
                        : active
                        ? "rgba(0,212,255,0.18)"
                        : "rgba(255,255,255,0.05)",
                    }}
                    className={`w-9 h-9 rounded-full flex items-center justify-center border-2 ${
                      done
                        ? "border-emerald-400"
                        : active
                        ? "border-cyan-400"
                        : "border-white/15"
                    }`}
                  >
                    {done ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    ) : (
                      <Icon
                        className={`w-4 h-4 ${
                          active ? "text-cyan-300" : "text-gray-500"
                        }`}
                      />
                    )}
                  </motion.div>
                  <span
                    className={`hidden sm:inline text-xs font-semibold ${
                      active
                        ? "text-cyan-200"
                        : done
                        ? "text-emerald-300"
                        : "text-gray-500"
                    }`}
                  >
                    {s.title}
                  </span>
                </button>
                {idx < STEPS.length - 1 && (
                  <div className="flex-1 h-px bg-white/10 mx-2" />
                )}
              </div>
            );
          })}
        </div>
        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            animate={{ width: `${fillPct}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-teal-400"
          />
        </div>
        <p className="text-[11px] text-gray-500 mt-1.5">
          {fillPct}% complete · step {step} of {STEPS.length}
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
              <Field label="Your name" required>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Stephanie Chen"
                  className={inputClass}
                  autoFocus
                />
              </Field>
              <Field label="Email" required>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@company.com"
                  className={inputClass}
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Phone" hint="Optional. Include country code.">
                <input
                  type="tel"
                  value={form.whatsapp}
                  onChange={(e) => update("whatsapp", e.target.value)}
                  placeholder="+1 415 555 0100"
                  className={inputClass}
                />
              </Field>
              <Field label="Your role" hint="Founder, Ops, Marketing…">
                <input
                  type="text"
                  value={form.role}
                  onChange={(e) => update("role", e.target.value)}
                  placeholder="Founder"
                  className={inputClass}
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Company">
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => update("company", e.target.value)}
                  placeholder="Acme Dental"
                  className={inputClass}
                />
              </Field>
              <Field label="Website">
                <input
                  type="url"
                  value={form.website}
                  onChange={(e) => update("website", e.target.value)}
                  placeholder="https://acmedental.com"
                  className={inputClass}
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
                  className="overflow-hidden"
                >
                  <div className="rounded-2xl p-5 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-cyan-400/30">
                    <p className="text-xs uppercase tracking-wider text-cyan-300 font-semibold flex items-center gap-2 mb-3">
                      <TrendingUp className="w-3.5 h-3.5" /> Rough estimate (not a quote)
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
                    <p className="text-[11px] text-gray-400 mt-3 leading-relaxed">
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
                      className={
                        active
                          ? "px-3.5 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-900 border border-cyan-300 transition"
                          : "px-3.5 py-2 rounded-full text-sm font-medium bg-white/5 border border-white/15 text-gray-300 hover:border-cyan-400 hover:text-cyan-200 transition"
                      }
                    >
                      {s}
                    </motion.button>
                  );
                })}
              </div>
            </Field>

            <Field
              label="What's the main pain?"
              required
              hint="2–4 sentences. Be specific: 'no-shows costing $8K/mo' beats 'need automation'."
            >
              <textarea
                required
                rows={5}
                value={form.pain}
                onChange={(e) => update("pain", e.target.value)}
                placeholder="Example: We get 40 leads/week from Facebook but 30% no-show on consult calls. CRM is GHL but reminders aren't firing. Want SMS + email reminder flow + auto-rebook for cancellations."
                className={inputClass + " resize-none"}
              />
              <div className="flex justify-between text-[11px] text-gray-500 mt-1.5">
                <span>{form.pain.length} chars</span>
                <span
                  className={
                    form.pain.length > 80 ? "text-emerald-300" : "text-gray-500"
                  }
                >
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
                      className={
                        active
                          ? "px-3 py-2 rounded-lg text-xs font-semibold bg-cyan-400/15 border border-cyan-400 text-cyan-200 transition"
                          : "px-3 py-2 rounded-lg text-xs font-medium bg-white/5 border border-white/10 text-gray-400 hover:border-cyan-400/50 transition"
                      }
                    >
                      {h.label}
                    </button>
                  );
                })}
              </div>
            </Field>

            <label className="flex items-start gap-3 cursor-pointer p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/30 transition">
              <input
                type="checkbox"
                required
                checked={form.consent}
                onChange={(e) => update("consent", e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-white/30 bg-white/5 accent-cyan-400"
              />
              <span className="text-sm text-gray-300 leading-relaxed">
                OK to reply via email. We don&apos;t share your data,
                sell it, or add you to a drip. One-touch unsubscribe always.
              </span>
            </label>

            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl bg-rose-500/10 border border-rose-400/40 p-4 flex items-start gap-3"
              >
                <AlertTriangle className="w-5 h-5 text-rose-300 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-rose-200 font-semibold mb-1">
                    Couldn&apos;t submit
                  </p>
                  <p className="text-rose-100/80">{errorMsg}</p>
                  <p className="text-rose-100/60 mt-2">
                    Fallback:{" "}
                    <a
                      href="mailto:waseem@skynetjoe.com"
                      className="underline"
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

      <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/5">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/15 text-gray-300 hover:border-cyan-400 hover:text-cyan-200 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back
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
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background:
                "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
              boxShadow: canAdvance
                ? "0 8px 28px rgba(0, 212, 255, 0.30)"
                : "none",
            }}
          >
            Continue <ArrowRight className="w-4 h-4" />
          </motion.button>
        ) : (
          <motion.button
            type="submit"
            whileHover={status !== "submitting" ? { scale: 1.02 } : {}}
            whileTap={status !== "submitting" ? { scale: 0.98 } : {}}
            disabled={status === "submitting" || !canAdvance}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background:
                "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
              boxShadow: "0 8px 28px rgba(0, 212, 255, 0.30)",
            }}
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Sending brief…
              </>
            ) : (
              <>
                <Send className="w-4 h-4" /> Send brief — reply in 8 hours
              </>
            )}
          </motion.button>
        )}
      </div>

      <p className="text-xs text-gray-500">
        By submitting you agree to our{" "}
        <a href="/privacy-policy" className="underline hover:text-cyan-300">
          Privacy Policy
        </a>
        . No spam, no sequences.
      </p>
    </form>
  );
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-100 mb-1.5">
        {label}
        {required && <span className="text-cyan-400 ml-1">*</span>}
      </label>
      {hint && <p className="text-xs text-gray-400 mb-2.5">{hint}</p>}
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
      className={
        checked
          ? "block p-3.5 rounded-xl cursor-pointer border-2 bg-cyan-500/10 border-cyan-400 transition"
          : "block p-3.5 rounded-xl cursor-pointer border-2 bg-white/5 border-white/10 hover:border-cyan-400/50 transition"
      }
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
          className={
            checked
              ? "mt-1 w-4 h-4 rounded-full border-2 border-cyan-300 bg-cyan-400 flex items-center justify-center flex-shrink-0"
              : "mt-1 w-4 h-4 rounded-full border-2 border-gray-500 flex-shrink-0"
          }
        >
          {checked && (
            <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
          )}
        </div>
        <div className="flex-1">
          <div className="font-semibold text-white text-sm">{label}</div>
          <div className="text-xs text-gray-400 mt-0.5 leading-snug">
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
    <div className="text-center">
      <Icon className="w-4 h-4 text-cyan-300 mx-auto mb-1" />
      <div className="text-lg font-extrabold text-white">{value}</div>
      <div className="text-[10px] uppercase text-gray-400 tracking-wider">
        {label}
      </div>
    </div>
  );
}

export function DiscoveryProofSidebar() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl p-5 bg-white/5 border border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-400/40 flex-shrink-0">
            <Image
              src="/portraits/waseem-cafe-arch.jpg"
              alt="Waseem"
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Waseem reads every brief</p>
            <p className="text-xs text-gray-400">Solo founder · Bali based</p>
          </div>
        </div>
        <p className="text-sm text-gray-300 leading-relaxed">
          &quot;You don&apos;t get a sales rep. You get me. I read your brief,
          map your stack, then reply yes / no / referral. No funnel.&quot;
        </p>
      </div>
    </div>
  );
}
