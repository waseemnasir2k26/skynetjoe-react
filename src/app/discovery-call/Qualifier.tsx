"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Loader2,
  SkipForward,
  CheckCircle2,
} from "lucide-react";

export type QualifierState = {
  businessType: string;
  businessTypeOther?: string;
  teamSize: string;
  biggestLeak: string;
  biggestLeakOther?: string;
  monthlyLeads: string;
  automateTargets: string[];
  automateTargetsOther?: string;
  revenueRange: string;
  urgency: string;
};

export const QUALIFIER_INITIAL: QualifierState = {
  businessType: "",
  teamSize: "",
  biggestLeak: "",
  monthlyLeads: "200",
  automateTargets: [],
  revenueRange: "",
  urgency: "",
};

const STORAGE_KEY = "skynet:discovery-call:v1";

type Option = { value: string; label: string; sub?: string };

const BUSINESS_OPTIONS: Option[] = [
  { value: "service", label: "Service business", sub: "Dental, legal, clinic, agency clients" },
  { value: "agency", label: "Agency", sub: "Marketing, dev, creative, recruiting" },
  { value: "ecommerce", label: "E-commerce", sub: "Shopify, WooCommerce, DTC" },
  { value: "saas", label: "SaaS", sub: "Product-led or sales-led" },
  { value: "consultancy", label: "Consultancy / coach", sub: "1:1 or group programs" },
  { value: "other", label: "Other", sub: "Tell me below" },
];

const TEAM_OPTIONS: Option[] = [
  { value: "solo", label: "Solo" },
  { value: "2-5", label: "2 – 5" },
  { value: "6-15", label: "6 – 15" },
  { value: "16-50", label: "16 – 50" },
  { value: "50-plus", label: "50+" },
];

const LEAK_OPTIONS: Option[] = [
  { value: "missed-leads", label: "Missed leads", sub: "Inquiries falling through cracks" },
  { value: "manual-followups", label: "Manual follow-ups", sub: "Reps re-typing the same emails" },
  { value: "tool-sprawl", label: "Tool sprawl", sub: "12 tabs, none talking to each other" },
  { value: "no-content", label: "No content engine", sub: "Posting feels like a side job" },
  { value: "no-reporting", label: "No reporting", sub: "Can't tell what's actually working" },
  { value: "other", label: "Other", sub: "Tell me below" },
];

const LEAD_RANGES = ["10", "50", "200", "500", "1000-plus"] as const;
const LEAD_LABELS: Record<string, string> = {
  "10": "~10 / mo",
  "50": "~50 / mo",
  "200": "~200 / mo",
  "500": "~500 / mo",
  "1000-plus": "1,000+ / mo",
};

const AUTOMATE_OPTIONS: Option[] = [
  { value: "lead-routing", label: "Lead routing" },
  { value: "whatsapp-dms", label: "WhatsApp / DMs" },
  { value: "email-followups", label: "Email follow-ups" },
  { value: "crm-updates", label: "CRM updates" },
  { value: "reporting", label: "Reporting" },
  { value: "content", label: "Content" },
  { value: "other", label: "Other" },
];

const REVENUE_OPTIONS: Option[] = [
  { value: "under-10k", label: "Under $10k / mo" },
  { value: "10k-30k", label: "$10k – $30k / mo" },
  { value: "30k-100k", label: "$30k – $100k / mo" },
  { value: "100k-500k", label: "$100k – $500k / mo" },
  { value: "500k-plus", label: "$500k+ / mo" },
];

const URGENCY_OPTIONS: Option[] = [
  { value: "this-month", label: "This month", sub: "Ship this month — premium queue" },
  { value: "30-60d", label: "Next 30 – 60 days", sub: "Standard scope window" },
  { value: "q3", label: "Q3 / later", sub: "Planning phase — keep me posted" },
  { value: "exploring", label: "Just exploring", sub: "No timeline yet, kicking tires" },
];

type Question = {
  id: keyof QualifierState | "automateTargets";
  title: string;
  helper?: string;
};

const QUESTIONS: Question[] = [
  { id: "businessType", title: "What kind of business are you running?" },
  { id: "teamSize", title: "How big is your team right now?" },
  {
    id: "biggestLeak",
    title: "What's the #1 thing leaking money or time right now?",
    helper: "Pick whichever hurts most. Other is fine — write it in.",
  },
  {
    id: "monthlyLeads",
    title: "Roughly how many leads or inquiries hit you per month?",
    helper: "Rough guess is fine. Slide it.",
  },
  {
    id: "automateTargets",
    title: "What would you most want to automate?",
    helper: "Pick all that apply. No wrong answer.",
  },
  {
    id: "revenueRange",
    title: "What's your monthly revenue range?",
    helper: "Helps me figure out if my pricing is a fit. No judgment.",
  },
  { id: "urgency", title: "When do you want this done?" },
];

export default function Qualifier({
  onComplete,
  onSkip,
}: {
  onComplete: (state: QualifierState) => void;
  onSkip: () => void;
}) {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<QualifierState>(QUALIFIER_INITIAL);
  const [computing, setComputing] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          setState((s) => ({ ...s, ...parsed }));
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist on change
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state]);

  function update<K extends keyof QualifierState>(
    key: K,
    value: QualifierState[K],
  ) {
    setState((s) => ({ ...s, [key]: value }));
  }

  function toggleAutomate(value: string) {
    setState((s) => ({
      ...s,
      automateTargets: s.automateTargets.includes(value)
        ? s.automateTargets.filter((v) => v !== value)
        : [...s.automateTargets, value],
    }));
  }

  const currentQ = QUESTIONS[step];
  const totalSteps = QUESTIONS.length;
  const progress = Math.round(((step + 1) / totalSteps) * 100);

  const canAdvance = useMemo(() => {
    const q = QUESTIONS[step];
    if (q.id === "businessType") {
      return state.businessType !== "" &&
        (state.businessType !== "other" || !!state.businessTypeOther);
    }
    if (q.id === "teamSize") return !!state.teamSize;
    if (q.id === "biggestLeak") {
      return state.biggestLeak !== "" &&
        (state.biggestLeak !== "other" || !!state.biggestLeakOther);
    }
    if (q.id === "monthlyLeads") return true; // slider always has value
    if (q.id === "automateTargets") {
      if (state.automateTargets.length === 0) return false;
      if (state.automateTargets.includes("other")) {
        return !!state.automateTargetsOther;
      }
      return true;
    }
    if (q.id === "revenueRange") return !!state.revenueRange;
    if (q.id === "urgency") return !!state.urgency;
    return false;
  }, [step, state]);

  function next() {
    if (!canAdvance) return;
    if (step < totalSteps - 1) {
      setStep((s) => s + 1);
    } else {
      // Final step — show calculating spinner then complete
      setComputing(true);
      window.setTimeout(() => {
        onComplete(state);
      }, 1500);
    }
  }

  function prev() {
    if (step > 0) setStep((s) => s - 1);
  }

  if (computing) {
    return (
      <div className="rounded-2xl bg-white/5 border border-cyan-400/30 p-10 md:p-14 text-center min-h-[280px] flex flex-col items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          className="mb-5"
        >
          <Loader2 className="w-12 h-12 text-cyan-300" />
        </motion.div>
        <p className="text-cyan-200 font-semibold text-lg mb-1">
          Calculating your readiness score…
        </p>
        <p className="text-sm text-gray-400">
          Matching slot type and prep notes.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-6 md:p-8 min-h-[420px] flex flex-col">
      {/* Progress bar + skip */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2 gap-4">
          <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-300 font-semibold">
            Question {step + 1} of {totalSteps}
          </p>
          <button
            type="button"
            onClick={onSkip}
            className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-cyan-300 transition"
          >
            <SkipForward className="w-3.5 h-3.5" />
            Skip to calendar
          </button>
        </div>
        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 110, damping: 20 }}
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #1E88E5 0%, #14B8A6 100%)",
            }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ.id as string}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.22 }}
            className="motion-reduce:transform-none motion-reduce:transition-none"
          >
            <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight mb-2">
              {currentQ.title}
            </h3>
            {currentQ.helper && (
              <p className="text-sm text-gray-400 mb-5">{currentQ.helper}</p>
            )}
            {!currentQ.helper && <div className="mb-5" />}

            {currentQ.id === "businessType" && (
              <OptionGrid
                options={BUSINESS_OPTIONS}
                value={state.businessType}
                onChange={(v) => update("businessType", v)}
                otherValue={state.businessTypeOther}
                onOtherChange={(v) => update("businessTypeOther", v)}
              />
            )}

            {currentQ.id === "teamSize" && (
              <OptionGrid
                options={TEAM_OPTIONS}
                value={state.teamSize}
                onChange={(v) => update("teamSize", v)}
                columns={5}
                compact
              />
            )}

            {currentQ.id === "biggestLeak" && (
              <OptionGrid
                options={LEAK_OPTIONS}
                value={state.biggestLeak}
                onChange={(v) => update("biggestLeak", v)}
                otherValue={state.biggestLeakOther}
                onOtherChange={(v) => update("biggestLeakOther", v)}
              />
            )}

            {currentQ.id === "monthlyLeads" && (
              <LeadSlider
                value={state.monthlyLeads}
                onChange={(v) => update("monthlyLeads", v)}
              />
            )}

            {currentQ.id === "automateTargets" && (
              <MultiSelectGrid
                options={AUTOMATE_OPTIONS}
                values={state.automateTargets}
                onToggle={toggleAutomate}
                otherValue={state.automateTargetsOther}
                onOtherChange={(v) => update("automateTargetsOther", v)}
              />
            )}

            {currentQ.id === "revenueRange" && (
              <OptionGrid
                options={REVENUE_OPTIONS}
                value={state.revenueRange}
                onChange={(v) => update("revenueRange", v)}
              />
            )}

            {currentQ.id === "urgency" && (
              <OptionGrid
                options={URGENCY_OPTIONS}
                value={state.urgency}
                onChange={(v) => update("urgency", v)}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav */}
      <div className="flex items-center justify-between gap-3 pt-6 mt-6 border-t border-white/5">
        <button
          type="button"
          onClick={prev}
          disabled={step === 0}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-gray-300 hover:border-cyan-400 hover:text-cyan-200 transition disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <motion.button
          type="button"
          whileHover={canAdvance ? { scale: 1.02 } : {}}
          whileTap={canAdvance ? { scale: 0.98 } : {}}
          onClick={next}
          disabled={!canAdvance}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition disabled:opacity-40 disabled:cursor-not-allowed motion-reduce:transform-none"
          style={{
            background: "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
            boxShadow: canAdvance
              ? "0 8px 28px rgba(0, 212, 255, 0.30)"
              : "none",
          }}
        >
          {step === totalSteps - 1 ? (
            <>
              See my slot <CheckCircle2 className="w-4 h-4" />
            </>
          ) : (
            <>
              Next <ArrowRight className="w-4 h-4" />
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}

// ============================================================
// Subcomponents
// ============================================================

function OptionGrid({
  options,
  value,
  onChange,
  otherValue,
  onOtherChange,
  columns = 2,
  compact = false,
}: {
  options: Option[];
  value: string;
  onChange: (v: string) => void;
  otherValue?: string;
  onOtherChange?: (v: string) => void;
  columns?: 2 | 3 | 4 | 5;
  compact?: boolean;
}) {
  const colsClass =
    columns === 5
      ? "grid-cols-2 sm:grid-cols-5"
      : columns === 4
        ? "grid-cols-2 sm:grid-cols-4"
        : columns === 3
          ? "grid-cols-1 sm:grid-cols-3"
          : "grid-cols-1 sm:grid-cols-2";
  return (
    <>
      <div className={`grid ${colsClass} gap-2.5`}>
        {options.map((o) => {
          const active = value === o.value;
          return (
            <motion.button
              key={o.value}
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => onChange(o.value)}
              className={`text-left rounded-xl border-2 transition motion-reduce:transform-none ${
                compact ? "p-3" : "p-4"
              } ${
                active
                  ? "bg-cyan-500/10 border-cyan-400"
                  : "bg-white/5 border-white/10 hover:border-cyan-400/50"
              }`}
            >
              <div
                className={`font-semibold text-white ${
                  compact ? "text-sm" : "text-base"
                }`}
              >
                {o.label}
              </div>
              {o.sub && (
                <div className="text-xs text-gray-400 mt-1 leading-snug">
                  {o.sub}
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
      {value === "other" && onOtherChange && (
        <motion.input
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          type="text"
          value={otherValue || ""}
          onChange={(e) => onOtherChange(e.target.value)}
          placeholder="Type it in — short is fine"
          className="mt-3 w-full px-4 py-3 rounded-xl bg-white/5 border border-cyan-400/40 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 transition"
          autoFocus
        />
      )}
    </>
  );
}

function MultiSelectGrid({
  options,
  values,
  onToggle,
  otherValue,
  onOtherChange,
}: {
  options: Option[];
  values: string[];
  onToggle: (v: string) => void;
  otherValue?: string;
  onOtherChange?: (v: string) => void;
}) {
  return (
    <>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = values.includes(o.value);
          return (
            <motion.button
              key={o.value}
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => onToggle(o.value)}
              className={`px-4 py-2.5 rounded-full text-sm font-semibold transition motion-reduce:transform-none ${
                active
                  ? "bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-900 border border-cyan-300"
                  : "bg-white/5 border border-white/15 text-gray-300 hover:border-cyan-400 hover:text-cyan-200"
              }`}
            >
              {active ? "✓ " : ""}
              {o.label}
            </motion.button>
          );
        })}
      </div>
      {values.includes("other") && onOtherChange && (
        <motion.input
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          type="text"
          value={otherValue || ""}
          onChange={(e) => onOtherChange(e.target.value)}
          placeholder="What else? Short answer"
          className="mt-3 w-full px-4 py-3 rounded-xl bg-white/5 border border-cyan-400/40 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 transition"
          autoFocus
        />
      )}
    </>
  );
}

function LeadSlider({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const idx = Math.max(0, LEAD_RANGES.indexOf(value as (typeof LEAD_RANGES)[number]));
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-5">
      <div className="flex items-baseline justify-between mb-4">
        <span className="text-3xl md:text-4xl font-extrabold text-white">
          {LEAD_LABELS[value] || LEAD_LABELS["200"]}
        </span>
        <span className="text-xs text-gray-400">leads or inquiries</span>
      </div>
      <input
        type="range"
        min={0}
        max={LEAD_RANGES.length - 1}
        step={1}
        value={idx}
        onChange={(e) => onChange(LEAD_RANGES[parseInt(e.target.value, 10)])}
        className="w-full accent-cyan-400 cursor-pointer"
        aria-label="Monthly leads"
      />
      <div className="flex justify-between mt-2 text-[10px] text-gray-500 font-mono">
        {LEAD_RANGES.map((r) => (
          <span key={r} className={r === value ? "text-cyan-300" : ""}>
            {LEAD_LABELS[r].replace(" / mo", "").replace("~", "")}
          </span>
        ))}
      </div>
    </div>
  );
}
