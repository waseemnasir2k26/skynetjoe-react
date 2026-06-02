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

/**
 * Cream editorial pivot 2026-05-25 — qualifier form.
 * Form questions on cream surfaces, 1px ink border inputs,
 * terracotta primary button. All client state preserved.
 */

const C = {
  cream: "#F2EFE6",
  cream2: "#EDE8DC",
  cream3: "#FAF7F0",
  ink: "#1A1A1A",
  ink2: "#3A3A36",
  inkFaint: "#56564F", // AA: ~5:1 on cream (was #6B6B65)
  terra: "#C66B3F", // backgrounds / borders / icons only
  terraAA: "#A8451F", // accent TEXT — clears 4.5:1 on cream
  terra2: "#B85A30",
  rule: "rgba(26,26,26,0.12)",
  ruleSoft: "rgba(26,26,26,0.06)",
};

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
    title: "What's costing you the most right now — money or time?",
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
    if (q.id === "monthlyLeads") return true;
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
      <div
        style={{
          background: C.cream3,
          border: `1px solid ${C.rule}`,
          padding: "56px 40px",
          textAlign: "center",
          minHeight: 280,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          style={{ marginBottom: 20 }}
        >
          <Loader2 style={{ width: 48, height: 48, color: C.terra }} />
        </motion.div>
        <p
          style={{
            fontFamily: "var(--font-display)",
            color: C.ink,
            fontWeight: 600,
            fontSize: 18,
            marginBottom: 4,
          }}
        >
          Calculating your readiness score…
        </p>
        <p style={{ fontSize: 14, color: C.inkFaint, margin: 0 }}>
          Matching slot type and prep notes.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        background: C.cream3,
        border: `1px solid ${C.rule}`,
        padding: "32px 32px",
        minHeight: 420,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Progress bar + skip */}
      <div style={{ marginBottom: 24 }}>
        <div className="flex items-center justify-between mb-2 gap-4">
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: C.terraAA,
              fontWeight: 600,
              margin: 0,
            }}
          >
            — Question {step + 1} of {totalSteps}
          </p>
          <button
            type="button"
            onClick={onSkip}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              color: C.inkFaint,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              textTransform: "uppercase",
              letterSpacing: "0.10em",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = C.terra)}
            onMouseLeave={(e) => (e.currentTarget.style.color = C.inkFaint)}
          >
            <SkipForward style={{ width: 12, height: 12 }} />
            Skip to calendar
          </button>
        </div>
        <div
          style={{
            height: 6,
            borderRadius: 0,
            background: C.cream2,
            overflow: "hidden",
            border: `1px solid ${C.ruleSoft}`,
          }}
        >
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 110, damping: 20 }}
            style={{ height: "100%", background: C.terra }}
          />
        </div>
      </div>

      {/* Question */}
      <div style={{ flex: 1 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ.id as string}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.22 }}
          >
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 24,
                fontWeight: 600,
                color: C.ink,
                letterSpacing: "-0.01em",
                lineHeight: 1.2,
                marginBottom: 6,
              }}
            >
              {currentQ.title}
            </h3>
            {currentQ.helper && (
              <p style={{ fontSize: 14, color: C.inkFaint, marginBottom: 20 }}>
                {currentQ.helper}
              </p>
            )}
            {!currentQ.helper && <div style={{ marginBottom: 20 }} />}

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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          paddingTop: 24,
          marginTop: 24,
          borderTop: `1px solid ${C.ruleSoft}`,
        }}
      >
        <button
          type="button"
          onClick={prev}
          disabled={step === 0}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 16px",
            background: "transparent",
            color: C.ink,
            border: `1px solid ${C.ink}`,
            cursor: step === 0 ? "not-allowed" : "pointer",
            opacity: step === 0 ? 0.3 : 1,
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: 14,
            borderRadius: 2,
          }}
        >
          <ArrowLeft style={{ width: 14, height: 14 }} /> Back
        </button>

        <motion.button
          type="button"
          whileHover={canAdvance ? { scale: 1.02 } : {}}
          whileTap={canAdvance ? { scale: 0.98 } : {}}
          onClick={next}
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
            opacity: canAdvance ? 1 : 0.6,
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: 14,
            borderRadius: 2,
          }}
        >
          {step === totalSteps - 1 ? (
            <>
              See my slot <CheckCircle2 style={{ width: 16, height: 16 }} />
            </>
          ) : (
            <>
              Next <ArrowRight style={{ width: 16, height: 16 }} />
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
              style={{
                textAlign: "left",
                background: active ? C.cream2 : C.cream3,
                border: active ? `2px solid ${C.terra}` : `1px solid ${C.rule}`,
                padding: compact ? 12 : 16,
                cursor: "pointer",
                borderRadius: 2,
                transition: "border-color 0.18s",
              }}
              onMouseEnter={(e) => {
                if (!active) e.currentTarget.style.borderColor = C.terra;
              }}
              onMouseLeave={(e) => {
                if (!active) e.currentTarget.style.borderColor = C.rule;
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  color: C.ink,
                  fontSize: compact ? 14 : 15,
                }}
              >
                {o.label}
              </div>
              {o.sub && (
                <div
                  style={{
                    fontSize: 12,
                    color: C.inkFaint,
                    marginTop: 4,
                    lineHeight: 1.4,
                  }}
                >
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
          style={{
            marginTop: 12,
            width: "100%",
            padding: "12px 16px",
            background: C.cream3,
            border: `1px solid ${C.ink}`,
            color: C.ink,
            fontFamily: "var(--font-sans)",
            fontSize: 15,
            outline: "none",
            borderRadius: 2,
          }}
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
              style={{
                padding: "10px 18px",
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
          style={{
            marginTop: 12,
            width: "100%",
            padding: "12px 16px",
            background: C.cream3,
            border: `1px solid ${C.ink}`,
            color: C.ink,
            fontFamily: "var(--font-sans)",
            fontSize: 15,
            outline: "none",
            borderRadius: 2,
          }}
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
    <div
      style={{
        background: C.cream2,
        border: `1px solid ${C.rule}`,
        padding: 20,
      }}
    >
      <div className="flex items-baseline justify-between mb-4">
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "normal",
            fontSize: 32,
            fontWeight: 700,
            color: C.terraAA,
          }}
        >
          {LEAD_LABELS[value] || LEAD_LABELS["200"]}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: C.inkFaint,
            textTransform: "uppercase",
            letterSpacing: "0.10em",
          }}
        >
          leads or inquiries
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={LEAD_RANGES.length - 1}
        step={1}
        value={idx}
        onChange={(e) => onChange(LEAD_RANGES[parseInt(e.target.value, 10)])}
        style={{ width: "100%", accentColor: C.terra, cursor: "pointer" }}
        aria-label="Monthly leads"
      />
      <div className="flex justify-between mt-2" style={{ fontFamily: "var(--font-mono)", fontSize: 10 }}>
        {LEAD_RANGES.map((r) => (
          <span key={r} style={{ color: r === value ? C.terraAA : C.inkFaint }}>
            {LEAD_LABELS[r].replace(" / mo", "").replace("~", "")}
          </span>
        ))}
      </div>
    </div>
  );
}
