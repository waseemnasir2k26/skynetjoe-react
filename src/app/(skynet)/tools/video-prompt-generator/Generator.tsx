"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Check,
  Copy,
  Film,
  Loader2,
  Mail,
  RotateCcw,
  Save,
  Sparkles,
  Trash2,
} from "lucide-react";

/* ────────── option banks ────────── */

const CAMERA_MOVES = [
  { value: "dolly-in", label: "Dolly in" },
  { value: "pan", label: "Pan" },
  { value: "aerial", label: "Aerial / drone" },
  { value: "handheld", label: "Handheld" },
  { value: "static", label: "Static" },
  { value: "orbit", label: "Orbit" },
] as const;

const MOODS = [
  { value: "cinematic", label: "Cinematic" },
  { value: "documentary", label: "Documentary" },
  { value: "dreamlike", label: "Dreamlike" },
  { value: "energetic", label: "Energetic" },
  { value: "melancholic", label: "Melancholic" },
  { value: "luxury", label: "Luxury" },
] as const;

const LIGHTING = [
  { value: "golden-hour", label: "Golden hour" },
  { value: "overcast", label: "Overcast soft" },
  { value: "neon", label: "Neon city" },
  { value: "studio", label: "Studio key" },
  { value: "candlelit", label: "Candlelit" },
  { value: "harsh-noon", label: "Harsh noon" },
] as const;

const DURATIONS = ["4s", "8s", "16s", "30s"] as const;

const STYLES = [
  { value: "realistic", label: "Photoreal" },
  { value: "anime", label: "Anime" },
  { value: "3d-render", label: "3D render" },
  { value: "claymation", label: "Claymation" },
  { value: "film-noir", label: "Film noir" },
  { value: "watercolor", label: "Watercolor" },
] as const;

const ASPECTS = ["16:9", "9:16", "1:1", "21:9"] as const;

type CameraMove = (typeof CAMERA_MOVES)[number]["value"];
type Mood = (typeof MOODS)[number]["value"];
type Lighting = (typeof LIGHTING)[number]["value"];
type Duration = (typeof DURATIONS)[number];
type Style = (typeof STYLES)[number]["value"];
type Aspect = (typeof ASPECTS)[number];

type Inputs = {
  subject: string;
  camera: CameraMove;
  mood: Mood;
  lighting: Lighting;
  duration: Duration;
  style: Style;
  aspect: Aspect;
  negative: string;
};

const DEFAULTS: Inputs = {
  subject: "a Bali cafe at sunrise",
  camera: "dolly-in",
  mood: "cinematic",
  lighting: "golden-hour",
  duration: "8s",
  style: "realistic",
  aspect: "16:9",
  negative: "",
};

/* ────────── adjective banks for variation ────────── */

const MOOD_ADJ: Record<Mood, string[]> = {
  cinematic: ["epic", "filmic", "richly composed", "carefully framed"],
  documentary: ["unscripted", "observational", "raw", "candid"],
  dreamlike: ["surreal", "ethereal", "softly hazy", "floating"],
  energetic: ["kinetic", "punchy", "fast-cut", "vivid"],
  melancholic: ["wistful", "muted", "introspective", "tender"],
  luxury: ["opulent", "polished", "high-end", "indulgent"],
};

const LIGHTING_DESC: Record<Lighting, string> = {
  "golden-hour":
    "warm golden-hour light raking across the scene at a low angle",
  overcast: "diffuse overcast daylight, soft and shadowless",
  neon: "saturated neon signage casting magenta and cyan rim light",
  studio: "controlled studio key with subtle rim and fill",
  candlelit: "flickering candlelight, amber and intimate",
  "harsh-noon": "high-noon sunlight casting deep contrasty shadows",
};

const CAMERA_DESC: Record<CameraMove, string> = {
  "dolly-in":
    "the camera dollies smoothly forward, slowly closing distance to the subject",
  pan: "the camera pans laterally, revealing the scene one element at a time",
  aerial:
    "an aerial drone shot descends and arcs around the subject from above",
  handheld:
    "loose handheld camera with subtle organic shake follows the subject",
  static:
    "a locked-off static frame holds the composition while motion happens within",
  orbit: "the camera orbits 360 degrees around the subject in a slow arc",
};

const STYLE_DESC: Record<Style, string> = {
  realistic:
    "photoreal cinematography, 35mm film grain, shallow depth of field",
  anime: "stylized 2D anime, hand-drawn key frames, cel-shaded color palette",
  "3d-render": "polished 3D render, soft global illumination, octane-style",
  claymation:
    "stop-motion claymation aesthetic, tactile, slight texture jitter",
  "film-noir":
    "black-and-white noir, hard chiaroscuro lighting, venetian blind shadows",
  watercolor:
    "loose watercolor wash, paper texture visible, bleeding edges in motion",
};

/* ────────── prompt composers ────────── */

type Format = "runway" | "pika" | "sora" | "veo";

function composeRunway(i: Inputs, salt: number): string {
  const adj = MOOD_ADJ[i.mood][salt % MOOD_ADJ[i.mood].length];
  const neg = i.negative.trim() ? `\nNegative: ${i.negative.trim()}.` : "";
  return `${adj.charAt(0).toUpperCase() + adj.slice(1)}, ${i.mood} shot of ${i.subject}. ${CAMERA_DESC[i.camera].charAt(0).toUpperCase() + CAMERA_DESC[i.camera].slice(1)}. ${LIGHTING_DESC[i.lighting].charAt(0).toUpperCase() + LIGHTING_DESC[i.lighting].slice(1)}. ${STYLE_DESC[i.style]}. Aspect ratio ${i.aspect}, ${i.duration} duration, 24fps, motion bracket 4, upscale enabled.${neg}`;
}

function composePika(i: Inputs, salt: number): string {
  const adj = MOOD_ADJ[i.mood][(salt + 1) % MOOD_ADJ[i.mood].length];
  const move =
    CAMERA_MOVES.find((c) => c.value === i.camera)?.label ?? i.camera;
  const lightLabel =
    LIGHTING.find((l) => l.value === i.lighting)?.label ?? i.lighting;
  const styleLabel = STYLES.find((s) => s.value === i.style)?.label ?? i.style;
  const neg = i.negative.trim() ? ` --no ${i.negative.trim()}` : "";
  return `${i.subject}, ${adj} ${i.mood}, ${move.toLowerCase()} camera, ${lightLabel.toLowerCase()} lighting, ${styleLabel.toLowerCase()} style --ar ${i.aspect} --fps 24 --motion 3${neg}`;
}

function composeSora(i: Inputs, salt: number): string {
  const adj = MOOD_ADJ[i.mood][(salt + 2) % MOOD_ADJ[i.mood].length];
  const neg = i.negative.trim() ? ` Avoid: ${i.negative.trim()}.` : "";
  return `A ${i.duration} ${adj} ${i.mood} scene. We see ${i.subject}. ${CAMERA_DESC[i.camera].charAt(0).toUpperCase() + CAMERA_DESC[i.camera].slice(1)}, holding ${i.aspect} framing throughout. ${LIGHTING_DESC[i.lighting].charAt(0).toUpperCase() + LIGHTING_DESC[i.lighting].slice(1)}, lending a ${i.mood} atmosphere. The visual treatment is ${STYLE_DESC[i.style]}, with continuity preserved from first to last frame.${neg}`;
}

function composeVeo(i: Inputs, salt: number): string {
  const adj = MOOD_ADJ[i.mood][(salt + 3) % MOOD_ADJ[i.mood].length];
  const moveLabel =
    CAMERA_MOVES.find((c) => c.value === i.camera)?.label ?? i.camera;
  const lightLabel =
    LIGHTING.find((l) => l.value === i.lighting)?.label ?? i.lighting;
  const moodLabel = MOODS.find((m) => m.value === i.mood)?.label ?? i.mood;
  const styleLabel = STYLES.find((s) => s.value === i.style)?.label ?? i.style;
  const neg = i.negative.trim()
    ? `\nNegative prompt: ${i.negative.trim()}.`
    : "";
  return `Subject: ${i.subject}.
Camera: ${moveLabel}.
Lighting: ${lightLabel}.
Mood: ${moodLabel}, ${adj}.
Style: ${styleLabel} — ${STYLE_DESC[i.style]}.
Aspect ratio: ${i.aspect}.
Duration: ${i.duration}.
Frame rate: 24fps.${neg}`;
}

const COMPOSERS: Record<Format, (i: Inputs, salt: number) => string> = {
  runway: composeRunway,
  pika: composePika,
  sora: composeSora,
  veo: composeVeo,
};

const FORMAT_META: Record<
  Format,
  { label: string; description: string; color: string }
> = {
  runway: {
    label: "Runway Gen-3",
    description: "Verbose w/ technical params",
    color: "var(--terracotta-aa)",
  },
  pika: {
    label: "Pika",
    description: "Shorter, motion-focused",
    color: "var(--terracotta-aa)",
  },
  sora: {
    label: "Sora",
    description: "Cinematographic, scene-described",
    color: "#a78bfa",
  },
  veo: {
    label: "Veo",
    description: "Google-tuned, structured",
    color: "#fde68a",
  },
};

/* ────────── history (localStorage) ────────── */

const HISTORY_KEY = "skynet:video-prompt-generator:history:v1";
const INPUTS_KEY = "skynet:video-prompt-generator:inputs:v1";
const LEAD_KEY = "skynet:video-prompt-generator:lead-email:v1";
const HISTORY_MAX = 20;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type HistoryEntry = {
  id: string;
  savedAt: number;
  inputs: Inputs;
};

/* ────────── component ────────── */

export default function Generator() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);
  const [salt, setSalt] = useState(0);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [copyStateByFormat, setCopyStateByFormat] = useState<
    Record<Format, boolean>
  >({ runway: false, pika: false, sora: false, veo: false });
  const [savedToast, setSavedToast] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  /* hydrate */
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const rawInputs = window.localStorage.getItem(INPUTS_KEY);
      if (rawInputs) {
        const parsed = JSON.parse(rawInputs) as Inputs;
        setInputs({ ...DEFAULTS, ...parsed });
      }
    } catch {
      /* ignore */
    }
    try {
      const rawHist = window.localStorage.getItem(HISTORY_KEY);
      if (rawHist) {
        const parsed = JSON.parse(rawHist) as HistoryEntry[];
        if (Array.isArray(parsed)) setHistory(parsed.slice(0, HISTORY_MAX));
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  /* persist inputs */
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(INPUTS_KEY, JSON.stringify(inputs));
    } catch {
      /* ignore */
    }
  }, [inputs, hydrated]);

  const outputs = useMemo(
    () =>
      ({
        runway: composeRunway(inputs, salt),
        pika: composePika(inputs, salt),
        sora: composeSora(inputs, salt),
        veo: composeVeo(inputs, salt),
      }) satisfies Record<Format, string>,
    [inputs, salt],
  );

  function update<K extends keyof Inputs>(key: K, value: Inputs[K]) {
    setInputs((curr) => ({ ...curr, [key]: value }));
  }

  function regenerate() {
    setSalt((s) => s + 1);
  }

  function reset() {
    setInputs(DEFAULTS);
    setSalt(0);
  }

  async function copyOne(fmt: Format) {
    try {
      await navigator.clipboard.writeText(outputs[fmt]);
      setCopyStateByFormat((curr) => ({ ...curr, [fmt]: true }));
      window.setTimeout(() => {
        setCopyStateByFormat((curr) => ({ ...curr, [fmt]: false }));
      }, 1800);
    } catch {
      /* ignore */
    }
  }

  function saveToHistory() {
    const entry: HistoryEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      savedAt: Date.now(),
      inputs: { ...inputs },
    };
    const next = [entry, ...history].slice(0, HISTORY_MAX);
    setHistory(next);
    try {
      window.localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
    setSavedToast(true);
    window.setTimeout(() => setSavedToast(false), 1800);
  }

  function loadFromHistory(entry: HistoryEntry) {
    setInputs(entry.inputs);
    setSalt(0);
  }

  function deleteHistory(id: string) {
    const next = history.filter((h) => h.id !== id);
    setHistory(next);
    try {
      window.localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }

  function clearHistory() {
    setHistory([]);
    try {
      window.localStorage.removeItem(HISTORY_KEY);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-6">
      {/* INPUTS */}
      <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] backdrop-blur-md p-5 md:p-7 h-fit lg:sticky lg:top-24">
        <div className="flex items-center gap-2 mb-5">
          <Film className="h-5 w-5 text-[var(--terracotta-aa)]" />
          <h2 className="text-lg font-extrabold text-[var(--ink)]">Inputs</h2>
        </div>

        {/* Subject */}
        <label className="block mb-5">
          <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--terracotta-aa)] mb-2">
            Subject / scene
          </span>
          <textarea
            value={inputs.subject}
            onChange={(e) => update("subject", e.target.value)}
            rows={3}
            placeholder="e.g. a Bali cafe at sunrise with rain on the window"
            className="w-full bg-[var(--cream-2)] border border-[rgba(26,26,26,0.12)] rounded-xl px-3 py-2.5 text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:outline-none focus:border-[var(--terracotta)] focus:bg-[var(--cream-2)] transition text-sm resize-y"
          />
        </label>

        {/* Camera */}
        <Field label="Camera movement">
          <Select
            value={inputs.camera}
            onChange={(v) => update("camera", v as CameraMove)}
            options={CAMERA_MOVES}
          />
        </Field>

        {/* Mood */}
        <Field label="Mood">
          <Select
            value={inputs.mood}
            onChange={(v) => update("mood", v as Mood)}
            options={MOODS}
          />
        </Field>

        {/* Lighting */}
        <Field label="Lighting">
          <Select
            value={inputs.lighting}
            onChange={(v) => update("lighting", v as Lighting)}
            options={LIGHTING}
          />
        </Field>

        {/* Duration */}
        <Field label="Duration">
          <RadioRow
            value={inputs.duration}
            onChange={(v) => update("duration", v as Duration)}
            options={DURATIONS.map((d) => ({ value: d, label: d }))}
          />
        </Field>

        {/* Style */}
        <Field label="Style preset">
          <RadioRow
            value={inputs.style}
            onChange={(v) => update("style", v as Style)}
            options={STYLES}
            wrap
          />
        </Field>

        {/* Aspect */}
        <Field label="Aspect ratio">
          <RadioRow
            value={inputs.aspect}
            onChange={(v) => update("aspect", v as Aspect)}
            options={ASPECTS.map((a) => ({ value: a, label: a }))}
          />
        </Field>

        {/* Negative */}
        <label className="block mb-5">
          <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--terracotta-aa)] mb-2">
            Negative prompts{" "}
            <span className="text-[var(--ink-faint)]">(optional)</span>
          </span>
          <input
            type="text"
            value={inputs.negative}
            onChange={(e) => update("negative", e.target.value)}
            placeholder="e.g. blurry, distorted faces, text on screen"
            className="w-full bg-[var(--cream-2)] border border-[rgba(26,26,26,0.12)] rounded-xl px-3 py-2.5 text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:outline-none focus:border-[var(--terracotta)] focus:bg-[var(--cream-2)] transition text-sm"
          />
        </label>

        <div className="flex flex-col gap-2.5">
          <button
            type="button"
            onClick={regenerate}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-[var(--cream-3)] transition hover:opacity-90 hover:scale-[1.02]"
            style={{
              background: "var(--terracotta)",
            }}
          >
            <Sparkles className="h-4 w-4" />
            Regenerate with variation
          </button>
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={saveToHistory}
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] px-3 py-2.5 text-xs font-semibold text-[var(--ink-2)] hover:border-[var(--terracotta)] hover:text-[var(--terracotta-aa)] transition"
            >
              <Save className="h-3.5 w-3.5" />
              {savedToast ? "Saved" : "Save"}
            </button>
            <button
              type="button"
              onClick={reset}
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] px-3 py-2.5 text-xs font-semibold text-[var(--ink-2)] hover:border-[var(--terracotta)] hover:text-[var(--terracotta-aa)] transition"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* OUTPUTS + HISTORY */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(["runway", "pika", "sora", "veo"] as Format[]).map((fmt) => {
            const meta = FORMAT_META[fmt];
            const text = outputs[fmt];
            const copied = copyStateByFormat[fmt];
            return (
              <div
                key={fmt}
                className="rounded-2xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-5 flex flex-col"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span
                        className="inline-block h-2 w-2 rounded-full"
                        style={{ background: meta.color }}
                      />
                      <h3 className="text-[var(--ink)] font-extrabold text-base">
                        {meta.label}
                      </h3>
                    </div>
                    <p className="text-[11px] text-[var(--ink-faint)]">
                      {meta.description}
                    </p>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-[var(--ink-faint)]">
                    {text.length} chars
                  </span>
                </div>

                <pre className="whitespace-pre-wrap break-words font-mono text-[12px] leading-relaxed text-[var(--ink)] bg-[var(--cream-3)] border border-[rgba(26,26,26,0.12)] rounded-xl p-3.5 mb-3 flex-1 min-h-[140px]">
                  {text}
                </pre>

                <button
                  type="button"
                  onClick={() => copyOne(fmt)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[rgba(26,26,26,0.18)] bg-[var(--cream-2)] px-4 py-2.5 text-xs font-semibold text-[var(--ink)] transition hover:border-[var(--terracotta)] hover:bg-[var(--cream-2)]"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[var(--terracotta-aa)]" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      Copy {meta.label}
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Optional lead capture — non-gating, prompts above stay free */}
        {hydrated && <TemplatesCapture />}

        {/* History */}
        {history.length > 0 && (
          <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] backdrop-blur-md p-5 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--terracotta-aa)] mb-0.5">
                  Saved history
                </p>
                <p className="text-xs text-[var(--ink-faint)]">
                  {history.length} of {HISTORY_MAX} max · stored locally
                </p>
              </div>
              <button
                type="button"
                onClick={clearHistory}
                className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--ink-faint)] hover:text-red-400 transition"
              >
                Clear all
              </button>
            </div>
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {history.map((h) => (
                <div
                  key={h.id}
                  className="flex items-center gap-2 rounded-xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] px-3 py-2.5 group"
                >
                  <button
                    type="button"
                    onClick={() => loadFromHistory(h)}
                    className="flex-1 text-left"
                  >
                    <div className="text-sm font-semibold text-[var(--ink)] truncate group-hover:text-[var(--terracotta-aa)] transition">
                      {h.inputs.subject || "(no subject)"}
                    </div>
                    <div className="text-[10px] text-[var(--ink-faint)] uppercase tracking-wider">
                      {h.inputs.style} · {h.inputs.mood} · {h.inputs.duration} ·{" "}
                      {h.inputs.aspect}
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteHistory(h.id)}
                    className="text-[var(--ink-faint)] hover:text-red-400 transition p-1.5"
                    aria-label="Delete from history"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ────────── optional lead capture (non-gating) ────────── */

function TemplatesCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  /* already submitted on a previous visit → show success state */
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(LEAD_KEY);
      if (stored && EMAIL_RE.test(stored)) setStatus("done");
    } catch {
      /* ignore */
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed) || trimmed.length > 254) {
      setError("That doesn't look like an email — try again.");
      return;
    }
    setError(null);
    setStatus("sending");

    /* Save locally FIRST — user's experience never blocked on backend */
    try {
      window.localStorage.setItem(LEAD_KEY, trimmed);
    } catch {
      /* private mode / quota — ignore */
    }

    /* Fire to backend — short await, failure never blocks success state */
    try {
      await Promise.race([
        fetch("/api/lead-capture", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: trimmed,
            source: "video-prompt-generator",
            capturedAt: new Date().toISOString(),
          }),
        }).catch((err) => {
          console.log(
            "[video-prompt-generator] /api/lead-capture failed silently",
            err,
          );
        }),
        new Promise((resolve) => setTimeout(resolve, 1500)),
      ]);
    } catch {
      /* swallow — local save already done */
    }

    setStatus("done");
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-5 flex items-center gap-3">
        <Check className="h-4 w-4 shrink-0 text-[var(--terracotta-aa)]" />
        <p className="text-sm text-[var(--ink-2)]">
          Done — 10 pro video prompt templates are on their way to your inbox.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-5">
      <div className="flex items-center gap-2 mb-1.5">
        <Mail className="h-4 w-4 text-[var(--terracotta-aa)]" />
        <h3 className="text-sm font-extrabold text-[var(--ink)]">
          Email me 10 pro video prompt templates
        </h3>
      </div>
      <p className="text-xs text-[var(--ink-faint)] mb-3.5">
        Optional — the generator above stays free either way. No spam, no drip.
      </p>
      <form onSubmit={handleSubmit} noValidate className="flex gap-2.5">
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(null);
          }}
          placeholder="you@company.com"
          aria-label="Your email"
          aria-invalid={!!error}
          disabled={status === "sending"}
          className="flex-1 min-w-0 bg-[var(--cream-2)] border border-[rgba(26,26,26,0.12)] rounded-xl px-3 py-2.5 text-[var(--ink)] placeholder:text-[var(--ink-faint)] focus:outline-none focus:border-[var(--terracotta)] transition text-sm"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-[var(--cream-3)] transition hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ background: "var(--terracotta)" }}
        >
          {status === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending
            </>
          ) : (
            "Send templates"
          )}
        </button>
      </form>
      {error && (
        <p role="alert" className="text-xs text-[var(--terracotta-aa)] mt-2">
          {error}
        </p>
      )}
    </div>
  );
}

/* ────────── tiny field primitives ────────── */

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--terracotta-aa)] mb-2">
        {label}
      </div>
      {children}
    </div>
  );
}

function Select<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: readonly { value: T; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      className="w-full bg-[var(--cream-2)] border border-[rgba(26,26,26,0.12)] rounded-xl px-3 py-2.5 text-[var(--ink)] text-sm focus:outline-none focus:border-[var(--terracotta)] focus:bg-[var(--cream-2)] transition appearance-none cursor-pointer"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23C66B3F' stroke-width='2'><polyline points='6 9 12 15 18 9'/></svg>\")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 0.75rem center",
        paddingRight: "2rem",
      }}
    >
      {options.map((o) => (
        <option
          key={o.value}
          value={o.value}
          className="bg-[var(--cream-3)] text-[var(--ink)]"
        >
          {o.label}
        </option>
      ))}
    </select>
  );
}

function RadioRow<T extends string>({
  value,
  onChange,
  options,
  wrap = false,
}: {
  value: T;
  onChange: (v: T) => void;
  options: readonly { value: T; label: string }[];
  wrap?: boolean;
}) {
  return (
    <div
      className={wrap ? "flex flex-wrap gap-1.5" : "grid grid-cols-4 gap-1.5"}
    >
      {options.map((o) => {
        const selected = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={
              selected
                ? "rounded-lg border-2 border-[var(--terracotta)] bg-[rgba(198,107,63,0.10)] px-2.5 py-1.5 text-xs font-semibold text-[var(--terracotta-aa)] transition"
                : "rounded-lg border-2 border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] px-2.5 py-1.5 text-xs font-semibold text-[var(--ink-2)] transition hover:border-[var(--terracotta)]/50 hover:bg-[var(--cream-2)]"
            }
            aria-pressed={selected}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
