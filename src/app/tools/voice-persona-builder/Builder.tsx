"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  Check,
  Copy,
  Download,
  RotateCcw,
  Sparkles,
} from "lucide-react";

const STORAGE_KEY = "skynet:voice-persona-builder:v1";

type Identity = {
  brandName: string;
  industry: string;
  teamSize: string;
  audience: string;
  origin: string;
};

type ToneKey =
  | "formality"
  | "playfulness"
  | "boldness"
  | "innovation"
  | "concision"
  | "authority"
  | "realism"
  | "niche";

type Tones = Record<ToneKey, number>;

type Vocab = {
  use: string;
  avoid: string;
  signature: string;
};

type Examples = {
  best: string;
  customerQuote: string;
  antiExample: string;
};

type State = {
  step: number;
  identity: Identity;
  tones: Tones;
  vocab: Vocab;
  examples: Examples;
};

const EMPTY_IDENTITY: Identity = {
  brandName: "",
  industry: "",
  teamSize: "",
  audience: "",
  origin: "",
};

const DEFAULT_TONES: Tones = {
  formality: 6,
  playfulness: 5,
  boldness: 7,
  innovation: 7,
  concision: 7,
  authority: 6,
  realism: 6,
  niche: 7,
};

const EMPTY_VOCAB: Vocab = { use: "", avoid: "", signature: "" };
const EMPTY_EXAMPLES: Examples = {
  best: "",
  customerQuote: "",
  antiExample: "",
};

const INITIAL_STATE: State = {
  step: 0,
  identity: EMPTY_IDENTITY,
  tones: DEFAULT_TONES,
  vocab: EMPTY_VOCAB,
  examples: EMPTY_EXAMPLES,
};

type ToneSlider = {
  key: ToneKey;
  left: string;
  right: string;
  caption: string;
};

const TONE_SLIDERS: ToneSlider[] = [
  {
    key: "formality",
    left: "Formal",
    right: "Casual",
    caption: "Tie-and-jacket vs morning-coffee.",
  },
  {
    key: "playfulness",
    left: "Serious",
    right: "Playful",
    caption: "Dry-and-direct vs a bit of wink.",
  },
  {
    key: "boldness",
    left: "Reserved",
    right: "Bold",
    caption: "Quiet-confident vs flag-planting.",
  },
  {
    key: "innovation",
    left: "Traditional",
    right: "Innovative",
    caption: "Heritage vs frontier.",
  },
  {
    key: "concision",
    left: "Detailed",
    right: "Concise",
    caption: "Long-form depth vs short, punchy.",
  },
  {
    key: "authority",
    left: "Friendly",
    right: "Authoritative",
    caption: "Peer vs expert.",
  },
  {
    key: "realism",
    left: "Optimistic",
    right: "Realistic",
    caption: "Possibility-first vs limits-first.",
  },
  {
    key: "niche",
    left: "Universal",
    right: "Niche",
    caption: "Wide audience vs insider language.",
  },
];

const STEPS = [
  { n: 1, label: "Identity" },
  { n: 2, label: "Tone" },
  { n: 3, label: "Vocabulary" },
  { n: 4, label: "Examples" },
];

function clamp(v: number, min: number, max: number) {
  if (Number.isNaN(v)) return min;
  return Math.max(min, Math.min(max, v));
}

function describeTone(slider: ToneSlider, value: number): string {
  if (value <= 2) return `very ${slider.left.toLowerCase()}`;
  if (value <= 4) return `${slider.left.toLowerCase()}-leaning`;
  if (value === 5) return "balanced";
  if (value <= 7) return `${slider.right.toLowerCase()}-leaning`;
  if (value <= 9) return `quite ${slider.right.toLowerCase()}`;
  return `very ${slider.right.toLowerCase()}`;
}

function buildRewrites(tones: Tones, vocab: Vocab): { generic: string; voice: string }[] {
  const concise = tones.concision >= 6;
  const bold = tones.boldness >= 7;
  const casual = tones.formality >= 6;
  const playful = tones.playfulness >= 7;
  const innovative = tones.innovation >= 7;
  const friendly = tones.authority <= 5;
  const niche = tones.niche >= 7;

  const sig = (vocab.signature || "")
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean)[0];

  const sigTag = sig ? ` ${sig}.` : "";

  return [
    {
      generic: "We provide industry-leading solutions for your business needs.",
      voice: bold
        ? `We fix the one thing in your business that's leaking the most.${sigTag}`
        : casual
          ? `We help you tighten the parts of your business that quietly leak revenue.${sigTag}`
          : `We work with operators to identify and resolve their highest-leverage growth bottleneck.${sigTag}`,
    },
    {
      generic: "Please don't hesitate to contact us for further information.",
      voice: concise
        ? "Questions? Hit reply."
        : casual
          ? "If anything's unclear, just hit reply — I read everything."
          : "If you'd like further detail on any of the above, reply to this message and we will respond promptly.",
    },
    {
      generic: "Our innovative platform leverages cutting-edge AI to deliver value.",
      voice: innovative
        ? niche
          ? "We wire AI agents into the boring parts of your stack so the rest of your team can do the work only humans can."
          : "We use AI where it actually saves time — and leave the parts that need a human alone."
        : "We use proven tools the right way, instead of chasing whatever launched this week.",
    },
    {
      generic: "Thanks for reaching out. A team member will respond shortly.",
      voice: friendly
        ? playful
          ? "Got it — thanks for sending this over. I'll come back with a real reply within a day, promise."
          : "Got it — I'll come back with a real reply within one working day."
        : "Received. We will respond within one business day with next steps.",
    },
    {
      generic: "Click here to learn more about our services.",
      voice: bold
        ? `See exactly what we'd ship for you →${sigTag}`
        : concise
          ? "See what we'd build →"
          : "Take a look at how we'd approach a project like yours.",
    },
  ];
}

function buildToneMatrix(tones: Tones): string {
  const header = "| Axis | Value (1-10) | Lean |";
  const sep = "| --- | --- | --- |";
  const rows = TONE_SLIDERS.map((s) => {
    const v = tones[s.key];
    return `| ${s.left} ↔ ${s.right} | ${v} | ${describeTone(s, v)} |`;
  });
  return [header, sep, ...rows].join("\n");
}

function buildPersonaSummary(state: State): string {
  const { identity, tones } = state;
  const bn = identity.brandName.trim() || "The brand";
  const audience = identity.audience.trim() || "its audience";
  const industry = identity.industry.trim() || "its industry";
  const tone1 = describeTone(TONE_SLIDERS[0], tones.formality);
  const tone2 = describeTone(TONE_SLIDERS[2], tones.boldness);
  const tone3 = describeTone(TONE_SLIDERS[5], tones.authority);
  return `${bn} speaks to ${audience} in ${industry}. The voice is ${tone1}, ${tone2} and ${tone3}, with a preference for ${
    tones.concision >= 6 ? "short, punchy phrasing" : "fuller, more textured prose"
  } and ${
    tones.innovation >= 7
      ? "frontier-leaning framing"
      : "heritage-aware framing"
  }. The brand never sounds generic, never sounds desperate, and never sounds like default LLM output.`;
}

function buildSystemPrompt(state: State, rewrites: { generic: string; voice: string }[]): string {
  const { identity, vocab, examples } = state;
  const bn = identity.brandName.trim() || "[BRAND]";
  const wordsUse = (vocab.use || "").trim() || "—";
  const wordsAvoid = (vocab.avoid || "").trim() || "—";
  const sig = (vocab.signature || "").trim() || "—";
  const example = (examples.best || "").trim() || "—";
  const antiExample = (examples.antiExample || "").trim() || "—";
  const quote = (examples.customerQuote || "").trim();

  const lines: string[] = [];
  lines.push(`You are writing as ${bn}.`);
  lines.push("");
  lines.push("Voice rules:");
  lines.push(buildPersonaSummary(state));
  lines.push("");
  lines.push("Always use this vocabulary:");
  lines.push(wordsUse);
  lines.push("");
  lines.push("Never use this vocabulary:");
  lines.push(wordsAvoid);
  lines.push("");
  lines.push("Signature phrases (sprinkle, don't overuse):");
  lines.push(sig);
  lines.push("");
  lines.push("This is an example of writing that sounds correct:");
  lines.push(example);
  lines.push("");
  lines.push("This is an example of writing that DOES NOT sound correct — never write like this:");
  lines.push(antiExample);
  if (quote) {
    lines.push("");
    lines.push("A real customer described us this way (preserve this energy):");
    lines.push(`"${quote}"`);
  }
  lines.push("");
  lines.push("Style demonstrations — match the right column, never the left:");
  rewrites.forEach((r, i) => {
    lines.push(`${i + 1}. WRONG: ${r.generic}`);
    lines.push(`   RIGHT: ${r.voice}`);
  });
  lines.push("");
  lines.push(
    "Before sending any draft, re-read it and ask: does this sound like the brand above, or does it sound like a default AI? If it sounds like default AI, rewrite."
  );
  return lines.join("\n");
}

function buildProfileDoc(state: State): string {
  const { identity, tones, vocab, examples } = state;
  const rewrites = buildRewrites(tones, vocab);
  const bn = identity.brandName.trim() || "Untitled Brand";

  const lines: string[] = [];
  lines.push(`# Brand Voice Profile — ${bn}`);
  lines.push("");
  lines.push("> Paste this entire document into Claude, ChatGPT or any LLM as a system prompt before you ask for copy. Update it any time positioning shifts.");
  lines.push("");
  lines.push("## 1. Persona summary");
  lines.push("");
  lines.push(buildPersonaSummary(state));
  lines.push("");
  lines.push("## 2. Identity");
  lines.push("");
  lines.push(`- **Brand name:** ${identity.brandName || "—"}`);
  lines.push(`- **Industry:** ${identity.industry || "—"}`);
  lines.push(`- **Founder / team size:** ${identity.teamSize || "—"}`);
  lines.push(`- **Target audience:** ${identity.audience || "—"}`);
  lines.push(`- **Origin story:** ${identity.origin || "—"}`);
  lines.push("");
  lines.push("## 3. Tone matrix");
  lines.push("");
  lines.push(buildToneMatrix(tones));
  lines.push("");
  lines.push("## 4. Vocabulary");
  lines.push("");
  lines.push("### Words we USE");
  lines.push(vocab.use || "—");
  lines.push("");
  lines.push("### Words we AVOID");
  lines.push(vocab.avoid || "—");
  lines.push("");
  lines.push("### Signature phrases");
  lines.push(vocab.signature || "—");
  lines.push("");
  lines.push("## 5. Worked examples");
  lines.push("");
  lines.push("### Best piece of writing we have shipped");
  lines.push(examples.best || "—");
  lines.push("");
  lines.push("### Best customer quote about us");
  lines.push(examples.customerQuote || "—");
  lines.push("");
  lines.push("### Anti-example — never sound like this");
  lines.push(examples.antiExample || "—");
  lines.push("");
  lines.push("## 6. Five rewrites in your voice");
  lines.push("");
  rewrites.forEach((r, i) => {
    lines.push(`**${i + 1}. Generic →** ${r.generic}`);
    lines.push("");
    lines.push(`**${i + 1}. Your voice →** ${r.voice}`);
    lines.push("");
  });
  lines.push("---");
  lines.push("");
  lines.push("## 7. Copy-paste system prompt for AI assistants");
  lines.push("");
  lines.push("```");
  lines.push(buildSystemPrompt(state, rewrites));
  lines.push("```");
  lines.push("");
  lines.push(`_Generated by the SkynetLabs Voice Persona Builder._`);
  return lines.join("\n");
}

function isStepValid(state: State): boolean {
  if (state.step === 0) {
    return state.identity.brandName.trim().length > 0 && state.identity.audience.trim().length > 0;
  }
  if (state.step === 1) return true;
  if (state.step === 2) return true;
  if (state.step === 3) return true;
  return true;
}

export default function Builder({ calUrl }: { calUrl: string }) {
  const [state, setState] = useState<State>(INITIAL_STATE);
  const [hydrated, setHydrated] = useState(false);
  const [phase, setPhase] = useState<"build" | "result">("build");
  const [copied, setCopied] = useState(false);
  const resultRef = useRef<HTMLDivElement | null>(null);

  // Hydrate from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<State>;
        setState({
          step: saved.step ?? 0,
          identity: { ...EMPTY_IDENTITY, ...(saved.identity ?? {}) },
          tones: { ...DEFAULT_TONES, ...(saved.tones ?? {}) },
          vocab: { ...EMPTY_VOCAB, ...(saved.vocab ?? {}) },
          examples: { ...EMPTY_EXAMPLES, ...(saved.examples ?? {}) },
        });
      }
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);

  // Persist
  useEffect(() => {
    if (!hydrated || typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state, hydrated]);

  const updateIdentity = useCallback(
    (key: keyof Identity, val: string) =>
      setState((s) => ({ ...s, identity: { ...s.identity, [key]: val } })),
    []
  );
  const updateTone = useCallback(
    (key: ToneKey, val: number) =>
      setState((s) => ({ ...s, tones: { ...s.tones, [key]: clamp(val, 1, 10) } })),
    []
  );
  const updateVocab = useCallback(
    (key: keyof Vocab, val: string) =>
      setState((s) => ({ ...s, vocab: { ...s.vocab, [key]: val } })),
    []
  );
  const updateExamples = useCallback(
    (key: keyof Examples, val: string) =>
      setState((s) => ({ ...s, examples: { ...s.examples, [key]: val } })),
    []
  );

  const doc = useMemo(() => buildProfileDoc(state), [state]);

  const onNext = () => {
    if (state.step < 3) {
      setState((s) => ({ ...s, step: s.step + 1 }));
      return;
    }
    setPhase("result");
    requestAnimationFrame(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };
  const onBack = () => {
    setState((s) => ({ ...s, step: Math.max(0, s.step - 1) }));
  };

  const onReset = () => {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
    }
    setState(INITIAL_STATE);
    setPhase("build");
  };

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(doc);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  const onDownload = () => {
    const blob = new Blob([doc], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const safe = (state.identity.brandName || "brand-voice").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    a.href = url;
    a.download = `${safe || "brand-voice"}-voice-profile.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const stepValid = isStepValid(state);

  return (
    <div ref={resultRef}>
      {/* PROGRESS */}
      <div
        className="rounded-3xl p-5 md:p-6 mb-6"
        style={{
          background: "var(--cream-2)",
          border: "1px solid rgba(26,26,26,0.18)",
          backdropFilter: "blur(14px)",
        }}
      >
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta)] font-semibold">
            {phase === "result" ? "Profile generated" : `Step ${state.step + 1} of 4`}
          </p>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 text-xs text-[var(--ink-faint)] hover:text-[var(--terracotta)] transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {STEPS.map((s, i) => {
            const active = phase === "build" ? i === state.step : true;
            const done = phase === "result" || i < state.step;
            return (
              <div key={s.n}>
                <div
                  className="h-1.5 rounded-full transition-colors"
                  style={{
                    background: done || active
                      ? "linear-gradient(90deg, var(--terracotta) 0%, var(--terracotta) 100%)"
                      : "rgba(26,26,26,0.12)",
                  }}
                />
                <p
                  className={`mt-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider ${
                    active || done ? "text-[var(--terracotta)]" : "text-[var(--ink-faint)]"
                  }`}
                >
                  {s.n}. {s.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* PANEL */}
      {phase === "build" && (
        <div
          className="rounded-3xl p-6 md:p-8 mb-6"
          style={{
            background: "var(--cream-2)",
            border: "1px solid rgba(26,26,26,0.12)",
            backdropFilter: "blur(14px)",
          }}
        >
          {state.step === 0 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2 text-[var(--ink)]">
                  Step 1 — Identity
                </h2>
                <p className="text-sm text-[var(--ink-faint)]">
                  The basics. Five fields, two minutes.
                </p>
              </div>

              <Field label="Brand name" required>
                <input
                  type="text"
                  value={state.identity.brandName}
                  onChange={(e) => updateIdentity("brandName", e.target.value)}
                  placeholder="e.g. SkynetLabs"
                  className="vpb-input"
                />
              </Field>
              <Field label="Industry">
                <input
                  type="text"
                  value={state.identity.industry}
                  onChange={(e) => updateIdentity("industry", e.target.value)}
                  placeholder="e.g. AI automation for service businesses"
                  className="vpb-input"
                />
              </Field>
              <Field label="Founder / team size">
                <input
                  type="text"
                  value={state.identity.teamSize}
                  onChange={(e) => updateIdentity("teamSize", e.target.value)}
                  placeholder="e.g. Solo founder + 2 contractors"
                  className="vpb-input"
                />
              </Field>
              <Field label="Target audience" required>
                <input
                  type="text"
                  value={state.identity.audience}
                  onChange={(e) => updateIdentity("audience", e.target.value)}
                  placeholder="e.g. Agency owners doing $30k–$200k/mo who are drowning in ops"
                  className="vpb-input"
                />
              </Field>
              <Field label="Origin story" hint="2–3 sentences. Why does this brand exist?">
                <textarea
                  value={state.identity.origin}
                  onChange={(e) => updateIdentity("origin", e.target.value)}
                  rows={4}
                  placeholder="e.g. Built after watching 40+ founders waste money on tools they could not use. We only ship automations that pay for themselves in 90 days."
                  className="vpb-input vpb-textarea"
                />
              </Field>
            </div>
          )}

          {state.step === 1 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2 text-[var(--ink)]">
                  Step 2 — Tone sliders
                </h2>
                <p className="text-sm text-[var(--ink-faint)]">
                  Drag each axis toward the side that feels true. Mid is a fine answer.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                {TONE_SLIDERS.map((s) => {
                  const v = state.tones[s.key];
                  const pct = ((v - 1) / 9) * 100;
                  return (
                    <div key={s.key} className="min-w-0">
                      <div className="flex items-baseline justify-between gap-3 mb-2">
                        <div className="text-sm font-semibold text-[var(--ink)]">
                          {s.left}{" "}
                          <span className="text-[var(--ink-faint)]">↔</span>{" "}
                          {s.right}
                        </div>
                        <span className="text-sm font-extrabold text-[var(--terracotta)] tabular-nums whitespace-nowrap">
                          {v}/10
                        </span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={10}
                        step={1}
                        value={v}
                        onChange={(e) => updateTone(s.key, Number(e.target.value))}
                        className="rc-range w-full"
                        aria-label={`${s.left} to ${s.right}`}
                        style={{ ["--rc-fill" as never]: `${pct}%` } as React.CSSProperties}
                      />
                      <p className="text-xs text-[var(--ink-faint)] mt-1.5 leading-snug">
                        {s.caption} <span className="text-[var(--terracotta)]/80">— {describeTone(s, v)}</span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {state.step === 2 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2 text-[var(--ink)]">
                  Step 3 — Vocabulary
                </h2>
                <p className="text-sm text-[var(--ink-faint)]">
                  Comma- or newline-separated. The model treats these as hard rules.
                </p>
              </div>
              <Field label="Words we USE" hint="Operator language, plain English, specific verbs.">
                <textarea
                  value={state.vocab.use}
                  onChange={(e) => updateVocab("use", e.target.value)}
                  rows={4}
                  placeholder="ship, leak, recover, operator, stack, scope, automate, brutally honest, real number"
                  className="vpb-input vpb-textarea"
                />
              </Field>
              <Field label="Words we AVOID" hint="Cliches, jargon, AI tells.">
                <textarea
                  value={state.vocab.avoid}
                  onChange={(e) => updateVocab("avoid", e.target.value)}
                  rows={4}
                  placeholder="leverage, synergy, cutting-edge, revolutionary, world-class, dive into, in today's fast-paced world"
                  className="vpb-input vpb-textarea"
                />
              </Field>
              <Field label="Signature phrases" hint="Phrases the brand says like a chorus.">
                <textarea
                  value={state.vocab.signature}
                  onChange={(e) => updateVocab("signature", e.target.value)}
                  rows={3}
                  placeholder="If the math doesn't work, I'll say so. Built from Bali. Operator-tested."
                  className="vpb-input vpb-textarea"
                />
              </Field>
            </div>
          )}

          {state.step === 3 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2 text-[var(--ink)]">
                  Step 4 — Examples
                </h2>
                <p className="text-sm text-[var(--ink-faint)]">
                  Show the model what good looks like. And what to never sound like.
                </p>
              </div>
              <Field label="Best email, post or landing page you have written">
                <textarea
                  value={state.examples.best}
                  onChange={(e) => updateExamples("best", e.target.value)}
                  rows={6}
                  placeholder="Paste a paragraph or two of writing you'd stand behind 5 years from now."
                  className="vpb-input vpb-textarea"
                />
              </Field>
              <Field label="Best customer quote about you">
                <textarea
                  value={state.examples.customerQuote}
                  onChange={(e) => updateExamples("customerQuote", e.target.value)}
                  rows={3}
                  placeholder='"They saved us 18 hours a week the same month they shipped." — Marcus, US insurance broker'
                  className="vpb-input vpb-textarea"
                />
              </Field>
              <Field label={'Anti-example — "DON’T sound like this"'}>
                <textarea
                  value={state.examples.antiExample}
                  onChange={(e) => updateExamples("antiExample", e.target.value)}
                  rows={4}
                  placeholder="Paste a piece of writing — a competitor, a generic LLM draft, an email template — that sounds the opposite of you."
                  className="vpb-input vpb-textarea"
                />
              </Field>
            </div>
          )}

          {/* NAV */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-8">
            <button
              type="button"
              onClick={onBack}
              disabled={state.step === 0}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold border border-[rgba(26,26,26,0.18)] text-[var(--ink-2)] hover:bg-[var(--cream-2)] transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={!stepValid}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-[var(--ink)] disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: "var(--ink)",
              }}
            >
              {state.step < 3 ? "Next step" : "Generate profile"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          {state.step === 0 && !stepValid && (
            <p className="mt-3 text-xs text-[var(--terracotta)]/90">
              Brand name and target audience are required. Everything else is optional but improves output.
            </p>
          )}
        </div>
      )}

      {/* RESULT */}
      {phase === "result" && (
        <div
          className="rounded-3xl p-6 md:p-8 mb-6"
          style={{
            background: "var(--cream-2)",
            border: "1px solid rgba(26,26,26,0.18)",
            backdropFilter: "blur(14px)",
          }}
        >
          <div className="flex items-start justify-between flex-wrap gap-3 mb-5">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta)] font-semibold mb-2">
                Your Brand Voice Profile
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[var(--ink)]">
                Paste this into Claude or ChatGPT.
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={onCopy}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-[var(--ink)] border border-[rgba(198,107,63,0.30)] bg-[rgba(198,107,63,0.10)] hover:bg-[rgba(198,107,63,0.85)]/20 transition"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied" : "Copy doc"}
              </button>
              <button
                type="button"
                onClick={onDownload}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-[var(--ink)] border border-[rgba(26,26,26,0.18)] bg-[var(--cream-2)] hover:bg-[var(--cream-2)] transition"
              >
                <Download className="w-4 h-4" />
                Download .md
              </button>
              <button
                type="button"
                onClick={() => setPhase("build")}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-[var(--ink-2)] border border-[rgba(26,26,26,0.18)] hover:bg-[var(--cream-2)] transition"
              >
                <ArrowLeft className="w-4 h-4" />
                Edit
              </button>
            </div>
          </div>

          <pre
            className="text-xs sm:text-sm leading-relaxed text-[var(--ink-2)] overflow-x-auto rounded-2xl p-4 sm:p-5 whitespace-pre-wrap break-words"
            style={{
              background: "rgba(26,26,26,0.65)",
              border: "1px solid rgba(26,26,26,0.12)",
              maxHeight: "60vh",
              overflowY: "auto",
            }}
          >
            {doc}
          </pre>

          {/* CTA */}
          <div className="mt-6 rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            style={{
              background: "linear-gradient(135deg, rgba(30, 136, 229, 0.18) 0%, rgba(20, 184, 166, 0.18) 100%)",
              border: "1px solid rgba(26,26,26,0.18)",
            }}
          >
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta)] font-semibold mb-1">
                Want a voice audit?
              </p>
              <p className="text-[var(--ink)] text-base md:text-lg font-semibold">
                I&apos;ll review your profile + 3 pieces of live copy on a 30-minute call. Free.
              </p>
            </div>
            <a
              href={calUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-[var(--ink)] whitespace-nowrap"
              style={{
                background: "var(--ink)",
              }}
            >
              <CalendarCheck className="w-4 h-4" />
              Book the call
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <p className="mt-4 text-[11px] text-[var(--ink-faint)] inline-flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            Generated locally. Nothing was sent to a server.
          </p>
        </div>
      )}

      {/* shared inputs + slider css */}
      <style>{`
        .vpb-input {
          width: 100%;
          background: rgba(6, 24, 39, 0.55);
          border: 1px solid rgba(26,26,26,0.18);
          border-radius: 0.75rem;
          padding: 0.7rem 0.9rem;
          color: #fff;
          font-size: 0.95rem;
          line-height: 1.5;
          outline: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .vpb-input::placeholder { color: rgba(203, 213, 225, 0.45); }
        .vpb-input:focus {
          border-color: rgba(198,107,63,0.50);
          box-shadow: 0 0 0 3px rgba(198,107,63,0.15);
        }
        .vpb-textarea { resize: vertical; min-height: 96px; }

        .rc-range {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          height: 28px;
          cursor: pointer;
        }
        .rc-range:focus { outline: none; }
        .rc-range::-webkit-slider-runnable-track {
          height: 8px;
          border-radius: 999px;
          background: linear-gradient(
            90deg,
            var(--terracotta) 0%,
            var(--terracotta) var(--rc-fill, 50%),
            rgba(26,26,26,0.12) var(--rc-fill, 50%),
            rgba(26,26,26,0.12) 100%
          );
          border: 1px solid rgba(26,26,26,0.18);
        }
        .rc-range::-moz-range-track {
          height: 8px;
          border-radius: 999px;
          background: rgba(26,26,26,0.12);
          border: 1px solid rgba(26,26,26,0.18);
        }
        .rc-range::-moz-range-progress {
          height: 8px;
          border-radius: 999px;
          background: linear-gradient(90deg, var(--terracotta) 0%, var(--terracotta) 100%);
        }
        .rc-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid var(--terracotta);
          margin-top: -8px;
          box-shadow: 0 4px 14px rgba(20, 184, 166, 0.45),
            0 0 0 4px rgba(26,26,26,0.12);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .rc-range::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid var(--terracotta);
          box-shadow: 0 4px 14px rgba(20, 184, 166, 0.45),
            0 0 0 4px rgba(26,26,26,0.12);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .rc-range:hover::-webkit-slider-thumb,
        .rc-range:focus::-webkit-slider-thumb { transform: scale(1.08); }
        .rc-range:hover::-moz-range-thumb,
        .rc-range:focus::-moz-range-thumb { transform: scale(1.08); }
        @media (prefers-reduced-motion: reduce) {
          .rc-range::-webkit-slider-thumb,
          .rc-range::-moz-range-thumb { transition: none; }
        }
      `}</style>
    </div>
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
      <label className="block text-sm font-semibold text-[var(--ink)] mb-1.5">
        {label}
        {required ? <span className="text-[var(--terracotta)] ml-1">*</span> : null}
      </label>
      {children}
      {hint ? <p className="text-xs text-[var(--ink-faint)] mt-1.5">{hint}</p> : null}
    </div>
  );
}
