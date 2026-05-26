"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarCheck,
  ClipboardList,
  Copy,
  Download,
  RefreshCw,
  X,
} from "lucide-react";
import {
  IDEA_TEMPLATES,
  PLATFORM_META,
  GOAL_META,
  ASSET_LABEL,
  type CalendarGoal,
  type PlatformKey,
  type AssetKind,
  type IdeaTemplate,
} from "@/data/content-calendar-ideas";
import EmailGate from "@/components/cta/EmailGate";

const STORAGE_KEY = "skynet:content-calendar:v1";

type Inputs = {
  niche: string;
  audience: string;
  cadence: Record<PlatformKey, number>;
  goal: CalendarGoal;
  startDate: string; // ISO yyyy-mm-dd
  seed: number;
};

type Post = {
  id: string;
  date: string; // ISO
  platform: PlatformKey;
  kind: IdeaTemplate["kind"];
  hook: string;
  body: string;
  cta: string;
  tags: string[];
  asset: AssetKind;
};

const PLATFORM_ORDER: PlatformKey[] = [
  "linkedin",
  "x",
  "instagram",
  "shorts",
  "newsletter",
];

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function tomorrowIso(): string {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 1);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const DEFAULTS: Inputs = {
  niche: "",
  audience: "",
  cadence: {
    linkedin: 5,
    x: 4,
    instagram: 3,
    shorts: 2,
    newsletter: 1,
  },
  goal: "leadgen",
  startDate: "", // hydrated client-side to tomorrow
  seed: Math.floor(Math.random() * 1_000_000),
};

// Mulberry32 PRNG so the same seed re-renders the same calendar.
function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pickIdea(
  rand: () => number,
  kindMix: Record<"educate" | "story" | "proof" | "cta", number>
): IdeaTemplate {
  const total =
    kindMix.educate + kindMix.story + kindMix.proof + kindMix.cta;
  let r = rand() * total;
  let kind: IdeaTemplate["kind"] = "educate";
  if (r < kindMix.educate) kind = "educate";
  else if ((r -= kindMix.educate) < kindMix.story) kind = "story";
  else if ((r -= kindMix.story) < kindMix.proof) kind = "proof";
  else kind = "cta";
  const candidates = IDEA_TEMPLATES.filter((t) => t.kind === kind);
  const list = candidates.length ? candidates : IDEA_TEMPLATES;
  return list[Math.floor(rand() * list.length)];
}

function interpolate(s: string, inputs: Inputs, rand: () => number): string {
  const niche = inputs.niche.trim() || "operators";
  const audience = inputs.audience.trim() || "founders";
  const audienceTag = (inputs.audience.trim() || "founders")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const month = new Date(inputs.startDate || tomorrowIso()).toLocaleString("en-US", {
    month: "long",
  });
  const outcomes = [
    "30 % more booked calls",
    "10 hours back per week",
    "your first 5 retainer clients",
    "a documented sales process",
    "a 7-figure pipeline",
    "your first paying customer",
    "a clean handoff system",
  ];
  const actions = [
    "discounting their service",
    "manually copying CRM data",
    "answering DMs on their phone",
    "writing posts at midnight",
    "saying yes to every project",
  ];
  const n = 3 + Math.floor(rand() * 8); // 3-10
  const n2 = 1 + Math.floor(rand() * 5);
  return s
    .replace(/\{niche\}/g, niche)
    .replace(/\{audience\}/g, audience)
    .replace(/\{audienceTag\}/g, audienceTag)
    .replace(/\{n\}/g, String(n))
    .replace(/\{n2\}/g, String(n2))
    .replace(/\{outcome\}/g, outcomes[Math.floor(rand() * outcomes.length)])
    .replace(/\{action\}/g, actions[Math.floor(rand() * actions.length)])
    .replace(/\{month\}/g, month);
}

function pickAsset(
  template: IdeaTemplate,
  platform: PlatformKey,
  rand: () => number
): AssetKind {
  if (template.assets && template.assets[platform]) {
    return template.assets[platform] as AssetKind;
  }
  // Sensible defaults per platform
  const defaults: Record<PlatformKey, AssetKind[]> = {
    linkedin: ["single", "carousel"],
    x: ["thread", "single"],
    instagram: ["carousel", "single", "story"],
    shorts: ["video"],
    newsletter: ["email"],
  };
  const opts = defaults[platform];
  return opts[Math.floor(rand() * opts.length)];
}

/** Build the post schedule from start-date forwards across 30 days. */
function buildPosts(inputs: Inputs): Post[] {
  if (!inputs.startDate) return [];
  const rand = mulberry32(inputs.seed);
  const start = new Date(inputs.startDate);
  const startMs = start.getTime();
  if (Number.isNaN(startMs)) return [];

  const mix = GOAL_META[inputs.goal].mix;
  const posts: Post[] = [];

  // Distribute each platform's weekly cadence across the 5 weeks
  for (const platform of PLATFORM_ORDER) {
    const perWeek = Math.max(0, Math.min(7, inputs.cadence[platform] || 0));
    if (perWeek === 0) continue;
    for (let week = 0; week < 5; week++) {
      // Pick distinct days within the week
      const dayPool = [0, 1, 2, 3, 4, 5, 6];
      const chosen: number[] = [];
      const target = Math.min(perWeek, 7);
      while (chosen.length < target) {
        const idx = Math.floor(rand() * dayPool.length);
        chosen.push(dayPool.splice(idx, 1)[0]);
      }
      for (const dow of chosen.sort()) {
        const dayOffset = week * 7 + dow;
        if (dayOffset >= 35) continue;
        const date = new Date(startMs);
        date.setDate(start.getDate() + dayOffset);
        const iso = date.toISOString().slice(0, 10);
        const template = pickIdea(rand, mix);
        const hook = interpolate(template.hook, inputs, rand);
        const body = interpolate(template.body, inputs, rand);
        const cta = interpolate(template.cta, inputs, rand);
        const tags = template.tags.map((t) => interpolate(t, inputs, rand));
        const asset = pickAsset(template, platform, rand);
        posts.push({
          id: `${platform}-${dayOffset}-${posts.length}`,
          date: iso,
          platform,
          kind: template.kind,
          hook,
          body,
          cta,
          tags,
          asset,
        });
      }
    }
  }
  posts.sort((a, b) =>
    a.date === b.date
      ? PLATFORM_ORDER.indexOf(a.platform) - PLATFORM_ORDER.indexOf(b.platform)
      : a.date.localeCompare(b.date)
  );
  return posts;
}

function buildCalendarGrid(startIso: string): { date: string; weekday: number }[] {
  const start = new Date(startIso);
  // Walk back to Monday
  const startDow = (start.getDay() + 6) % 7; // 0 = Mon
  const gridStart = new Date(start);
  gridStart.setDate(start.getDate() - startDow);
  const cells: { date: string; weekday: number }[] = [];
  for (let i = 0; i < 35; i++) {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    cells.push({ date: d.toISOString().slice(0, 10), weekday: i % 7 });
  }
  return cells;
}

function csvEscape(s: string): string {
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function downloadFile(name: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function toCsv(posts: Post[]): string {
  const header = [
    "Date",
    "Platform",
    "Kind",
    "Hook",
    "Body angle",
    "CTA",
    "Tags",
    "Asset",
  ].join(",");
  const rows = posts.map((p) =>
    [
      p.date,
      PLATFORM_META[p.platform].label,
      p.kind,
      p.hook,
      p.body,
      p.cta,
      p.tags.join("; "),
      ASSET_LABEL[p.asset],
    ]
      .map(csvEscape)
      .join(",")
  );
  return [header, ...rows].join("\n");
}

function toIcs(posts: Post[]): string {
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//SkynetLabs//Content Calendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
  ];
  const fmt = (d: string, hh = "09", mm = "00") =>
    `${d.replace(/-/g, "")}T${hh}${mm}00`;
  for (const p of posts) {
    const uid = `${p.id}@skynetjoe.com`;
    const desc = [
      `Hook: ${p.hook}`,
      `Body: ${p.body}`,
      `CTA: ${p.cta}`,
      `Tags: ${p.tags.join(", ")}`,
      `Asset: ${ASSET_LABEL[p.asset]}`,
    ]
      .join("\\n")
      .replace(/,/g, "\\,");
    lines.push(
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTAMP:${fmt(p.date)}`,
      `DTSTART:${fmt(p.date)}`,
      `DTEND:${fmt(p.date, "09", "30")}`,
      `SUMMARY:[${PLATFORM_META[p.platform].short}] ${p.hook.replace(/,/g, "\\,")}`,
      `DESCRIPTION:${desc}`,
      "END:VEVENT"
    );
  }
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

const KIND_PSYCH: Record<
  IdeaTemplate["kind"],
  { lever: string; why: string }
> = {
  educate: {
    lever: "Curiosity gap + authority",
    why: "Promising a specific number (e.g. '3 things') opens a knowledge loop the reader's brain has to close. Pair that with a how-to angle and you signal expertise without bragging.",
  },
  story: {
    lever: "Identification + emotional contagion",
    why: "Specific narrative beats let the reader cast themselves as the protagonist. They feel what you felt, which is what builds parasocial trust faster than facts ever will.",
  },
  proof: {
    lever: "Social proof + loss aversion",
    why: "Numbers from a peer ('we did X, here's the result') anchor the reader and trigger the fear of falling behind. Concrete > clever every single time.",
  },
  cta: {
    lever: "Reciprocity + scarcity",
    why: "After giving away value all week, asking for one small action lands lightly. Tight framing (cohort size, deadline, slots) does the closing work for you.",
  },
};

function toMarkdown(posts: Post[], inputs: Inputs): string {
  const lines: string[] = [];
  lines.push(`# 30-day content calendar — ${inputs.niche || "your business"}`);
  lines.push("");
  lines.push(
    `Audience: ${inputs.audience || "—"} · Goal: ${GOAL_META[inputs.goal].label} · Start: ${inputs.startDate}`
  );
  lines.push("");
  // Group by date
  const byDate = new Map<string, Post[]>();
  for (const p of posts) {
    if (!byDate.has(p.date)) byDate.set(p.date, []);
    byDate.get(p.date)!.push(p);
  }
  const dates = [...byDate.keys()].sort();
  for (const d of dates) {
    lines.push(`## ${d}`);
    for (const p of byDate.get(d) || []) {
      lines.push(`- [ ] **${PLATFORM_META[p.platform].label}** · ${ASSET_LABEL[p.asset]} · ${p.hook}`);
      lines.push(`  - Body: ${p.body}`);
      lines.push(`  - CTA: ${p.cta}`);
      lines.push(`  - Tags: ${p.tags.map((t) => `#${t}`).join(" ")}`);
    }
    lines.push("");
  }
  return lines.join("\n");
}

export default function Calendar({ calUrl }: { calUrl: string }) {
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);
  const [hydrated, setHydrated] = useState(false);
  const [openPost, setOpenPost] = useState<Post | null>(null);
  const [mdCopied, setMdCopied] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  // Hydrate
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<Inputs>;
        setInputs((s) => ({
          ...s,
          niche: saved.niche ?? "",
          audience: saved.audience ?? "",
          cadence: { ...s.cadence, ...(saved.cadence || {}) },
          goal: (saved.goal as CalendarGoal) ?? s.goal,
          startDate: saved.startDate || tomorrowIso(),
          seed: typeof saved.seed === "number" ? saved.seed : s.seed,
        }));
      } else {
        setInputs((s) => ({ ...s, startDate: tomorrowIso() }));
      }
    } catch {
      setInputs((s) => ({ ...s, startDate: tomorrowIso() }));
    }
    setHydrated(true);
  }, []);

  // Persist
  useEffect(() => {
    if (!hydrated || typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(inputs));
    } catch {
      // ignore
    }
  }, [inputs, hydrated]);

  const posts = useMemo(() => buildPosts(inputs), [inputs]);
  const grid = useMemo(
    () => (inputs.startDate ? buildCalendarGrid(inputs.startDate) : []),
    [inputs.startDate]
  );

  const postsByDate = useMemo(() => {
    const map = new Map<string, Post[]>();
    for (const p of posts) {
      if (!map.has(p.date)) map.set(p.date, []);
      map.get(p.date)!.push(p);
    }
    return map;
  }, [posts]);

  const setCadence = useCallback((key: PlatformKey, v: number) => {
    setInputs((s) => ({ ...s, cadence: { ...s.cadence, [key]: v } }));
  }, []);

  const regen = useCallback(() => {
    setInputs((s) => ({ ...s, seed: Math.floor(Math.random() * 1_000_000) }));
  }, []);

  const onDownloadCsv = () => {
    downloadFile(
      `content-calendar-${inputs.startDate}.csv`,
      toCsv(posts),
      "text/csv"
    );
  };
  const onDownloadIcs = () => {
    downloadFile(
      `content-calendar-${inputs.startDate}.ics`,
      toIcs(posts),
      "text/calendar"
    );
  };
  const onCopyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(toMarkdown(posts, inputs));
      setMdCopied(true);
      setTimeout(() => setMdCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div>
      {/* HOOK / HERO */}
      <div className="mb-6 px-1">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--terracotta)] mb-3">
          — Content calendar generator · free forever
        </p>
        <h1 className="text-3xl md:text-5xl font-extrabold leading-[1.05] tracking-tight text-[var(--ink)] mb-4 font-serif italic">
          Stop staring at the empty week.
        </h1>
        <p className="text-base md:text-lg text-[var(--ink-2)] leading-relaxed max-w-3xl">
          Plug in your niche, your tone, your platform mix. You walk away with
          a 30-day calendar — hooks, formats, hashtags, and a cadence that
          won&apos;t burn you out by week three.
        </p>
      </div>

      {/* INPUTS */}
      <div
        className="rounded-3xl p-6 md:p-8 mb-6"
        style={{
          background: "var(--cream-2)",
          border: "1px solid rgba(26,26,26,0.18)",
          backdropFilter: "blur(14px)",
        }}
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--terracotta)] mb-5">
          — Step 1 · who are we writing for?
        </p>

        <div className="grid md:grid-cols-2 gap-5 mb-5">
          <Field
            label="Niche / industry"
            hint="What you actually sell — be specific, not 'consulting'."
          >
            <input
              type="text"
              value={inputs.niche}
              onChange={(e) =>
                setInputs((s) => ({ ...s, niche: e.target.value }))
              }
              placeholder="e.g. AI automation for dental clinics"
              className="cc-input"
            />
          </Field>
          <Field
            label="Target audience"
            hint="The exact person scrolling past — title, stage, pain."
          >
            <input
              type="text"
              value={inputs.audience}
              onChange={(e) =>
                setInputs((s) => ({ ...s, audience: e.target.value }))
              }
              placeholder="e.g. solo dentists doing $40k–$120k/mo"
              className="cc-input"
            />
          </Field>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-5">
          <Field
            label="Goal of the month"
            hint="The output we'll bias every hook toward."
          >
            <select
              value={inputs.goal}
              onChange={(e) =>
                setInputs((s) => ({ ...s, goal: e.target.value as CalendarGoal }))
              }
              className="cc-input"
            >
              {(["awareness", "leadgen", "engagement", "sales", "authority"] as CalendarGoal[]).map(
                (g) => (
                  <option key={g} value={g}>
                    {GOAL_META[g].label}
                  </option>
                )
              )}
            </select>
          </Field>
          <Field
            label="Start date"
            hint="Defaults to tomorrow. Pick a Monday if you want clean weeks."
          >
            <input
              type="date"
              value={inputs.startDate}
              onChange={(e) =>
                setInputs((s) => ({ ...s, startDate: e.target.value || tomorrowIso() }))
              }
              className="cc-input"
            />
          </Field>
        </div>

        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--terracotta)] mb-1">
          — Posting cadence
        </p>
        <p className="text-xs italic text-[var(--ink-faint)] mb-3">
          0 means we skip the channel. Cap each at what you&apos;ll actually ship.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PLATFORM_ORDER.map((p) => {
            const v = inputs.cadence[p];
            const pct = (v / 7) * 100;
            const meta = PLATFORM_META[p];
            return (
              <div key={p}>
                <div className="flex items-baseline justify-between gap-3 mb-2">
                  <label className="text-sm font-semibold text-[var(--ink)] flex items-center gap-2">
                    <span
                      className="inline-flex items-center justify-center rounded-md w-7 h-7 text-[10px] font-bold"
                      style={{ background: meta.bg, color: meta.color, border: `1px solid ${meta.color}40` }}
                    >
                      {meta.short}
                    </span>
                    {meta.label}
                  </label>
                  <span className="text-sm font-extrabold text-[var(--terracotta)] tabular-nums">
                    {v}/wk
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={7}
                  step={1}
                  value={v}
                  onChange={(e) => setCadence(p, Number(e.target.value))}
                  className="rc-range w-full"
                  style={{ ["--rc-fill" as never]: `${pct}%` } as React.CSSProperties}
                  aria-label={`${meta.label} posts per week`}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* GATE — captures email before showing 12-month calendar */}
      {!unlocked && (
        <div className="mb-6">
          <EmailGate
            toolSlug="content-calendar"
            toolName="Content Calendar"
            promise="your 12-month content calendar"
            onUnlock={() => setUnlocked(true)}
          />
        </div>
      )}

      {/* EXPORT BAR */}
      {unlocked && (
      <>
      <div
        className="rounded-2xl p-4 md:p-5 mb-6 flex flex-wrap items-center justify-between gap-3"
        style={{
          background: "var(--cream-2)",
          border: "1px solid rgba(26,26,26,0.12)",
          backdropFilter: "blur(14px)",
        }}
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--terracotta)]">
          — {posts.length} posts ready · 30 days · regenerate till you love it
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onDownloadCsv}
            disabled={posts.length === 0}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold text-[var(--ink)] border border-[rgba(198,107,63,0.30)] bg-[rgba(198,107,63,0.10)] hover:bg-[rgba(198,107,63,0.85)]/20 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" /> CSV
          </button>
          <button
            type="button"
            onClick={onDownloadIcs}
            disabled={posts.length === 0}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold text-[var(--ink)] border border-[rgba(198,107,63,0.30)] bg-[rgba(198,107,63,0.10)] hover:bg-[rgba(198,107,63,0.85)]/20 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" /> ICS
          </button>
          <button
            type="button"
            onClick={onCopyMarkdown}
            disabled={posts.length === 0}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold text-[var(--ink)] border border-[rgba(198,107,63,0.30)] bg-[rgba(198,107,63,0.10)] hover:bg-[rgba(198,107,63,0.85)]/20 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {mdCopied ? <ClipboardList className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {mdCopied ? "MD copied" : "Markdown"}
          </button>
          <button
            type="button"
            onClick={regen}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold text-[var(--ink)] border border-[rgba(26,26,26,0.18)] bg-[var(--cream-2)] hover:bg-[var(--cream-2)] transition"
          >
            <RefreshCw className="w-4 h-4" /> Regenerate
          </button>
        </div>
      </div>

      {/* GRID */}
      <div
        className="rounded-3xl p-3 md:p-5 mb-6"
        style={{
          background: "var(--cream-2)",
          border: "1px solid rgba(26,26,26,0.12)",
          backdropFilter: "blur(14px)",
        }}
      >
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2 mb-2">
          {DAY_LABELS.map((d) => (
            <div
              key={d}
              className="text-[10px] sm:text-xs uppercase tracking-wider text-[var(--terracotta)]/70 font-semibold text-center"
            >
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {grid.map((cell) => {
            const cellDate = new Date(cell.date);
            const inRange =
              !!inputs.startDate &&
              cellDate >= new Date(inputs.startDate) &&
              cellDate <
                new Date(
                  new Date(inputs.startDate).getTime() + 30 * 24 * 3600 * 1000
                );
            const isToday = cellDate.getTime() === today.getTime();
            const cellPosts = postsByDate.get(cell.date) || [];
            return (
              <div
                key={cell.date}
                className="rounded-lg p-1.5 sm:p-2 min-h-[78px] sm:min-h-[100px] flex flex-col"
                style={{
                  background: inRange ? "var(--cream-3)" : "rgba(237, 232, 220, 0.5)",
                  border: `1px solid ${
                    isToday ? "var(--terracotta)" : "rgba(26,26,26,0.10)"
                  }`,
                  boxShadow: isToday
                    ? "0 0 0 3px rgba(198,107,63,0.10), inset 0 1px 2px rgba(26,26,26,0.04)"
                    : "inset 0 1px 2px rgba(26,26,26,0.03)",
                  opacity: inRange ? 1 : 0.5,
                }}
              >
                <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[var(--ink-faint)] mb-1 flex items-center justify-between">
                  <span>{cell.date.slice(8, 10)}</span>
                  {isToday && (
                    <span className="text-[var(--terracotta)] font-bold">Today</span>
                  )}
                </p>
                <div className="flex flex-col gap-1 overflow-hidden">
                  {cellPosts.slice(0, 3).map((p) => {
                    const meta = PLATFORM_META[p.platform];
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setOpenPost(p)}
                        className="text-left rounded px-1.5 py-0.5 text-[10px] sm:text-[11px] truncate transition hover:brightness-125"
                        style={{
                          background: meta.bg,
                          color: meta.color,
                          border: `1px solid ${meta.color}40`,
                        }}
                        title={p.hook}
                      >
                        <span className="font-bold mr-1">{meta.short}</span>
                        <span className="opacity-90">{p.hook}</span>
                      </button>
                    );
                  })}
                  {cellPosts.length > 3 && (
                    <button
                      type="button"
                      onClick={() => setOpenPost(cellPosts[3])}
                      className="text-[10px] sm:text-[11px] text-[var(--terracotta)] hover:text-[var(--terracotta)] text-left"
                    >
                      +{cellPosts.length - 3} more
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px]">
          {PLATFORM_ORDER.map((p) => {
            const meta = PLATFORM_META[p];
            return (
              <span
                key={p}
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1"
                style={{
                  background: meta.bg,
                  color: meta.color,
                  border: `1px solid ${meta.color}40`,
                }}
              >
                <span className="font-bold">{meta.short}</span>
                {meta.label}
              </span>
            );
          })}
        </div>
      </div>
      </>
      )}

      {/* SOCIAL PROOF STRIP */}
      <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          {
            quote:
              "Stopped writing posts at midnight. The calendar runs three weeks ahead of me now.",
            who: "Maya R., dental SaaS founder",
          },
          {
            quote:
              "Used the regenerate button until I had 30 posts I'd actually publish. That was the whole job.",
            who: "Daniel O., agency owner ($28k MRR)",
          },
          {
            quote:
              "We hit our first 1k LinkedIn followers month two. The hooks do the heavy lifting.",
            who: "Aisha K., ops consultant",
          },
        ].map((t, i) => (
          <div
            key={i}
            className="rounded-2xl p-4 border border-[rgba(26,26,26,0.12)] bg-[var(--cream-3)]"
            style={{ boxShadow: "inset 0 1px 2px rgba(26,26,26,0.04)" }}
          >
            <p className="text-sm leading-relaxed text-[var(--ink-2)] italic mb-2">
              &ldquo;{t.quote}&rdquo;
            </p>
            <p className="text-[11px] uppercase tracking-wider font-semibold text-[var(--terracotta)]">
              — {t.who}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div
        className="rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
        style={{
          background: "var(--cream-2)",
          border: "1px solid rgba(26,26,26,0.18)",
        }}
      >
        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta)] font-semibold mb-2">
            — Skip the copy-paste
          </p>
          <h3 className="text-xl md:text-2xl font-extrabold text-[var(--ink)] mb-2 font-serif italic">
            Want the calendar to post itself?
          </h3>
          <p className="text-sm text-[var(--ink-2)] leading-relaxed">
            30-minute call. We wire the calendar into your GHL, Buffer, or n8n
            so posts ship on the day they should. If automation isn&apos;t
            worth it for your stage, we&apos;ll say so.
          </p>
        </div>
        <a
          href={calUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-[var(--cream-3)] whitespace-nowrap hover:opacity-90 transition"
          style={{
            background: "var(--terracotta)",
          }}
        >
          <CalendarCheck className="w-4 h-4" /> Book the call <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      {/* MODAL */}
      {openPost && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Post detail"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6"
          style={{ background: "rgba(26,26,26,0.75)", backdropFilter: "blur(6px)" }}
          onClick={() => setOpenPost(null)}
        >
          <div
            className="w-full max-w-2xl rounded-3xl p-6 md:p-8 max-h-[90vh] overflow-y-auto"
            style={{
              background: "var(--cream-3)",
              border: "1px solid rgba(26,26,26,0.18)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider"
                  style={{
                    background: PLATFORM_META[openPost.platform].bg,
                    color: PLATFORM_META[openPost.platform].color,
                    border: `1px solid ${PLATFORM_META[openPost.platform].color}40`,
                  }}
                >
                  {PLATFORM_META[openPost.platform].label}
                </span>
                <span className="text-[11px] uppercase tracking-wider text-[var(--ink-faint)]">
                  {openPost.date} · {openPost.kind}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOpenPost(null)}
                className="text-[var(--ink-2)] hover:text-[var(--ink)]"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <h3 className="text-xl md:text-2xl font-extrabold text-[var(--ink)] mb-4 leading-snug">
              {openPost.hook}
            </h3>
            <div className="space-y-4 text-sm text-[var(--ink-2)] leading-relaxed">
              <ModalRow label="Body angle">{openPost.body}</ModalRow>
              <ModalRow label="Suggested CTA">{openPost.cta}</ModalRow>
              <ModalRow label="Suggested asset">
                {ASSET_LABEL[openPost.asset]}
              </ModalRow>
              <ModalRow label="Hashtags / tags">
                <span className="inline-flex flex-wrap gap-1.5">
                  {openPost.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-2 py-0.5 rounded-full"
                      style={{
                        background: "rgba(198,107,63,0.10)",
                        color: "var(--terracotta)",
                        border: "1px solid rgba(198,107,63,0.30)",
                      }}
                    >
                      #{t}
                    </span>
                  ))}
                </span>
              </ModalRow>

              <details
                className="group rounded-2xl border border-[rgba(138,154,123,0.40)] bg-[rgba(138,154,123,0.10)] p-4 mt-2"
              >
                <summary className="cursor-pointer list-none flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--sage)]">
                    Why this hook works
                  </span>
                  <span className="text-[var(--sage)] text-sm group-open:rotate-180 transition-transform">
                    ▾
                  </span>
                </summary>
                <div className="mt-3 space-y-1.5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--terracotta)]">
                    Lever — {KIND_PSYCH[openPost.kind].lever}
                  </p>
                  <p className="text-sm leading-relaxed text-[var(--ink-2)]">
                    {KIND_PSYCH[openPost.kind].why}
                  </p>
                </div>
              </details>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={async () => {
                  try {
                    const txt = `${openPost.hook}\n\n${openPost.body}\n\n${openPost.cta}\n\nTags: ${openPost.tags
                      .map((t) => `#${t}`)
                      .join(" ")}`;
                    await navigator.clipboard.writeText(txt);
                  } catch {
                    // ignore
                  }
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-[var(--ink)] border border-[rgba(198,107,63,0.30)] bg-[rgba(198,107,63,0.10)] hover:bg-[rgba(198,107,63,0.85)]/20 transition"
              >
                <Copy className="w-4 h-4" /> Copy post
              </button>
              <button
                type="button"
                onClick={() => setOpenPost(null)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border border-[rgba(26,26,26,0.18)] text-[var(--ink-2)] hover:bg-[var(--cream-2)] transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FEEDBACK */}
      <div className="mt-12 rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-6 md:p-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--terracotta)] mb-2">
          — Feedback · 30-second form
        </p>
        <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-[var(--ink)] mb-2 font-serif">
          What should this tool do next?
        </h3>
        <p className="text-sm text-[var(--ink-2)] mb-4">
          One missing field, one weird output, one tool you wish existed — tell me. I read every reply.
        </p>
        <form action="/api/tool-feedback" method="POST" className="space-y-3">
          <input type="hidden" name="tool" value="content-calendar" />
          <textarea
            name="message"
            required
            rows={3}
            placeholder="What should we improve, fix, or build?"
            className="cc-input"
            style={{ fontFamily: "var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)", minHeight: 96, resize: "vertical" }}
          />
          <input
            type="email"
            name="email"
            placeholder="Email (optional — only if you want a reply)"
            className="cc-input"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-[var(--cream-3)] hover:opacity-90 transition"
            style={{ background: "var(--terracotta)" }}
          >
            Send feedback →
          </button>
        </form>
      </div>

      <style>{`
        .cc-input {
          width: 100%;
          background: var(--cream-3);
          border: 1px solid rgba(26,26,26,0.18);
          border-radius: 12px;
          padding: 0.85rem 1rem;
          color: var(--ink);
          font-size: 0.95rem;
          line-height: 1.5;
          outline: none;
          box-shadow: inset 0 1px 2px rgba(26,26,26,0.04);
          transition: border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
        }
        .cc-input::placeholder {
          color: var(--ink-faint);
          font-style: italic;
          font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
          font-size: 0.85rem;
        }
        .cc-input:hover { border-color: rgba(26,26,26,0.28); }
        .cc-input:focus {
          border-color: var(--terracotta);
          box-shadow: 0 0 0 3px rgba(198,107,63,0.10), inset 0 1px 2px rgba(26,26,26,0.04);
          background: #ffffff;
        }
        select.cc-input {
          appearance: none;
          -webkit-appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23C66B3F' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'/%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 0.9rem center;
          background-size: 14px;
          padding-right: 2.5rem;
        }
        input[type="date"].cc-input::-webkit-calendar-picker-indicator {
          filter: invert(45%) sepia(28%) saturate(1500%) hue-rotate(-12deg);
          opacity: 0.75;
          cursor: pointer;
        }

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
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid var(--terracotta);
          margin-top: -7px;
          box-shadow: 0 4px 14px rgba(20, 184, 166, 0.45),
            0 0 0 4px rgba(26,26,26,0.12);
        }
        .rc-range::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid var(--terracotta);
          box-shadow: 0 4px 14px rgba(20, 184, 166, 0.45),
            0 0 0 4px rgba(26,26,26,0.12);
        }
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
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--terracotta)] mb-1.5">
        {label}
      </label>
      {children}
      {hint ? (
        <p className="text-xs italic text-[var(--ink-faint)] mt-1.5">{hint}</p>
      ) : null}
    </div>
  );
}

function ModalRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-wider text-[var(--terracotta)]/80 font-semibold mb-1">
        {label}
      </p>
      <div className="text-sm text-[var(--ink)]">{children}</div>
    </div>
  );
}
