"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, AlertTriangle, Send } from "lucide-react";

const BUDGETS = [
  { value: "under-500", label: "Under $500", description: "Likely DIY territory — we'll send resources." },
  { value: "500-2000", label: "$500 – $2,000", description: "Small scope: 1 workflow, landing page, or audit." },
  { value: "2000-5000", label: "$2,000 – $5,000", description: "Standard build: site + automation + CRM wire." },
  { value: "5000-plus", label: "$5,000+", description: "Full stack: platform, multi-flow, ongoing retainer." },
] as const;

const TIMELINES = [
  { value: "this-week", label: "This week", description: "Urgent. Premium rate applies." },
  { value: "this-month", label: "This month", description: "Standard ship window: 5–14 days." },
  { value: "1-3-months", label: "1–3 months", description: "Planning phase — let's scope properly." },
  { value: "exploring", label: "Just exploring", description: "No timeline. We'll send the AEO guide." },
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
  "WhatsApp Business",
  "OpenAI / Claude API",
  "Airtable / Notion",
  "Nothing yet",
] as const;

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

export default function DiscoveryCallForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

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
      setErrorMsg(err instanceof Error ? err.message : "Submission failed. Try WhatsApp instead.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-gradient-to-br from-emerald-500/15 to-cyan-500/15 border border-emerald-400/40 p-8 text-center">
        <CheckCircle2 className="w-14 h-14 text-emerald-300 mx-auto mb-4" />
        <h3 className="text-2xl font-extrabold text-white mb-3">Brief received.</h3>
        <p className="text-gray-200 mb-2">
          We&apos;ll reply within <strong className="text-emerald-300">8 hours</strong> on weekday Bali time (GMT+8).
        </p>
        <p className="text-sm text-gray-400">
          If it&apos;s urgent, ping us on WhatsApp:{" "}
          <a
            href="https://wa.me/923001001957"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-300 underline"
          >
            +92 300 100 1957
          </a>
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:border-cyan-400 focus:bg-white/8 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 transition";

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Your name" required>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Stephanie Chen"
            className={inputClass}
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
        <Field label="WhatsApp number" hint="Include country code. Reply lands here first.">
          <input
            type="tel"
            value={form.whatsapp}
            onChange={(e) => update("whatsapp", e.target.value)}
            placeholder="+1 415 555 0100"
            className={inputClass}
          />
        </Field>
        <Field label="Role" hint="Founder, Ops, Marketing, etc.">
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

      <Field label="Budget" required hint="Honest answer = honest scope. No upsell games.">
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

      <Field label="What stack are you on today?" hint="Pick any. Helps us scope quickly.">
        <div className="flex flex-wrap gap-2">
          {STACK_OPTIONS.map((s) => {
            const active = form.stack.includes(s);
            return (
              <button
                type="button"
                key={s}
                onClick={() => toggleStack(s)}
                className={
                  active
                    ? "px-3.5 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-900 border border-cyan-300 transition"
                    : "px-3.5 py-2 rounded-full text-sm font-medium bg-white/5 border border-white/15 text-gray-300 hover:border-cyan-400 hover:text-cyan-200 transition"
                }
              >
                {s}
              </button>
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
          placeholder="Example: We get 40 leads/week from Facebook but 30% no-show on consult calls. CRM is GHL but reminders aren't firing. Want WhatsApp + SMS reminder flow + auto-rebook for cancellations."
          className={inputClass + " resize-none"}
        />
      </Field>

      <Field label="How did you hear about us?">
        <select
          value={form.heard}
          onChange={(e) => update("heard", e.target.value)}
          className={inputClass}
        >
          <option value="" className="bg-slate-900">Pick one…</option>
          <option value="linkedin" className="bg-slate-900">LinkedIn</option>
          <option value="google" className="bg-slate-900">Google search</option>
          <option value="referral" className="bg-slate-900">Referral / word of mouth</option>
          <option value="upwork" className="bg-slate-900">Upwork</option>
          <option value="fiverr" className="bg-slate-900">Fiverr</option>
          <option value="github" className="bg-slate-900">GitHub</option>
          <option value="youtube" className="bg-slate-900">YouTube</option>
          <option value="other" className="bg-slate-900">Other</option>
        </select>
      </Field>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          required
          checked={form.consent}
          onChange={(e) => update("consent", e.target.checked)}
          className="mt-1 w-4 h-4 rounded border-white/30 bg-white/5"
        />
        <span className="text-sm text-gray-300 leading-relaxed">
          OK to reply via WhatsApp + email. We don&apos;t share your data, sell
          it, or add you to a drip. One-touch unsubscribe always.
        </span>
      </label>

      {status === "error" && (
        <div className="rounded-xl bg-rose-500/10 border border-rose-400/40 p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-300 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="text-rose-200 font-semibold mb-1">Couldn&apos;t submit</p>
            <p className="text-rose-100/80">{errorMsg}</p>
            <p className="text-rose-100/60 mt-2">
              Fallback:{" "}
              <a
                href="https://wa.me/923001001957"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                WhatsApp Waseem
              </a>{" "}
              directly.
            </p>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
        style={{
          background:
            "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
          boxShadow: "0 8px 28px rgba(0, 212, 255, 0.30)",
        }}
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending brief…
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send brief — reply in 8 hours
          </>
        )}
      </button>

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
    <label
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
          {checked && <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />}
        </div>
        <div className="flex-1">
          <div className="font-semibold text-white text-sm">{label}</div>
          <div className="text-xs text-gray-400 mt-0.5 leading-snug">
            {description}
          </div>
        </div>
      </div>
    </label>
  );
}
