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
      {/* INPUTS */}
      <div
        className="rounded-3xl p-6 md:p-8 mb-6"
        style={{
          background: "rgba(10, 45, 74, 0.55)",
          border: "1px solid rgba(126, 228, 255, 0.22)",
          backdropFilter: "blur(14px)",
        }}
      >
        <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-5">
          1. Configure your calendar
        </p>

        <div className="grid md:grid-cols-2 gap-5 mb-5">
          <Field label="Niche / industry">
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
          <Field label="Target audience">
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
          <Field label="Goal of the month">
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
          <Field label="Start date">
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

        <p className="text-xs uppercase tracking-[0.22em] text-cyan-300/80 font-semibold mb-3">
          Posting cadence — posts per week (0–7)
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PLATFORM_ORDER.map((p) => {
            const v = inputs.cadence[p];
            const pct = (v / 7) * 100;
            const meta = PLATFORM_META[p];
            return (
              <div key={p}>
                <div className="flex items-baseline justify-between gap-3 mb-2">
                  <label className="text-sm font-semibold text-white flex items-center gap-2">
                    <span
                      className="inline-flex items-center justify-center rounded-md w-7 h-7 text-[10px] font-bold"
                      style={{ background: meta.bg, color: meta.color, border: `1px solid ${meta.color}40` }}
                    >
                      {meta.short}
                    </span>
                    {meta.label}
                  </label>
                  <span className="text-sm font-extrabold text-cyan-200 tabular-nums">
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

      {/* EXPORT BAR */}
      <div
        className="rounded-2xl p-4 md:p-5 mb-6 flex flex-wrap items-center justify-between gap-3"
        style={{
          background: "rgba(10, 45, 74, 0.45)",
          border: "1px solid rgba(126, 228, 255, 0.18)",
          backdropFilter: "blur(14px)",
        }}
      >
        <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold">
          2. {posts.length} posts scheduled across 30 days
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onDownloadCsv}
            disabled={posts.length === 0}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white border border-cyan-300/40 bg-cyan-300/10 hover:bg-cyan-300/20 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" /> CSV
          </button>
          <button
            type="button"
            onClick={onDownloadIcs}
            disabled={posts.length === 0}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white border border-cyan-300/40 bg-cyan-300/10 hover:bg-cyan-300/20 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" /> ICS
          </button>
          <button
            type="button"
            onClick={onCopyMarkdown}
            disabled={posts.length === 0}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white border border-cyan-300/40 bg-cyan-300/10 hover:bg-cyan-300/20 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {mdCopied ? <ClipboardList className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {mdCopied ? "MD copied" : "Markdown"}
          </button>
          <button
            type="button"
            onClick={regen}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white border border-white/20 bg-white/5 hover:bg-white/10 transition"
          >
            <RefreshCw className="w-4 h-4" /> Regenerate
          </button>
        </div>
      </div>

      {/* GRID */}
      <div
        className="rounded-3xl p-3 md:p-5 mb-6"
        style={{
          background: "rgba(10, 45, 74, 0.45)",
          border: "1px solid rgba(126, 228, 255, 0.18)",
          backdropFilter: "blur(14px)",
        }}
      >
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2 mb-2">
          {DAY_LABELS.map((d) => (
            <div
              key={d}
              className="text-[10px] sm:text-xs uppercase tracking-wider text-cyan-300/70 font-semibold text-center"
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
                  background: inRange ? "rgba(6, 24, 39, 0.55)" : "rgba(6, 24, 39, 0.25)",
                  border: `1px solid ${
                    isToday ? "rgba(94, 234, 212, 0.6)" : "rgba(126, 228, 255, 0.14)"
                  }`,
                  opacity: inRange ? 1 : 0.45,
                }}
              >
                <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-gray-400 mb-1 flex items-center justify-between">
                  <span>{cell.date.slice(8, 10)}</span>
                  {isToday && (
                    <span className="text-cyan-300 font-bold">Today</span>
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
                      className="text-[10px] sm:text-[11px] text-cyan-300 hover:text-cyan-200 text-left"
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

      {/* CTA */}
      <div
        className="rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
        style={{
          background:
            "linear-gradient(135deg, rgba(30, 136, 229, 0.18) 0%, rgba(20, 184, 166, 0.18) 100%)",
          border: "1px solid rgba(126, 228, 255, 0.30)",
        }}
      >
        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-2">
            Want this on autopilot?
          </p>
          <h3 className="text-xl md:text-2xl font-extrabold text-white mb-2">
            We&apos;ll wire the calendar into your GHL / Buffer / n8n.
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            30-minute call to scope. If automation is worth doing for your
            business, we&apos;ll build it. If it isn&apos;t, we&apos;ll say
            so.
          </p>
        </div>
        <a
          href={calUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-white whitespace-nowrap"
          style={{
            background: "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
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
          style={{ background: "rgba(6, 24, 39, 0.75)", backdropFilter: "blur(6px)" }}
          onClick={() => setOpenPost(null)}
        >
          <div
            className="w-full max-w-2xl rounded-3xl p-6 md:p-8 max-h-[90vh] overflow-y-auto"
            style={{
              background: "linear-gradient(135deg, #0a2d4a 0%, #073846 100%)",
              border: "1px solid rgba(126, 228, 255, 0.35)",
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
                <span className="text-[11px] uppercase tracking-wider text-gray-400">
                  {openPost.date} · {openPost.kind}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOpenPost(null)}
                className="text-gray-300 hover:text-white"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <h3 className="text-xl md:text-2xl font-extrabold text-white mb-4 leading-snug">
              {openPost.hook}
            </h3>
            <div className="space-y-4 text-sm text-gray-200 leading-relaxed">
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
                        background: "rgba(94, 234, 212, 0.12)",
                        color: "#5eead4",
                        border: "1px solid rgba(94, 234, 212, 0.30)",
                      }}
                    >
                      #{t}
                    </span>
                  ))}
                </span>
              </ModalRow>
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white border border-cyan-300/40 bg-cyan-300/10 hover:bg-cyan-300/20 transition"
              >
                <Copy className="w-4 h-4" /> Copy post
              </button>
              <button
                type="button"
                onClick={() => setOpenPost(null)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border border-white/20 text-white/90 hover:bg-white/10 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .cc-input {
          width: 100%;
          background: rgba(6, 24, 39, 0.55);
          border: 1px solid rgba(126, 228, 255, 0.22);
          border-radius: 0.75rem;
          padding: 0.7rem 0.9rem;
          color: #fff;
          font-size: 0.95rem;
          line-height: 1.5;
          outline: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .cc-input::placeholder { color: rgba(203, 213, 225, 0.45); }
        .cc-input:focus {
          border-color: rgba(94, 234, 212, 0.7);
          box-shadow: 0 0 0 3px rgba(94, 234, 212, 0.15);
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
            #5eead4 0%,
            #7ee4ff var(--rc-fill, 50%),
            rgba(126, 228, 255, 0.15) var(--rc-fill, 50%),
            rgba(126, 228, 255, 0.15) 100%
          );
          border: 1px solid rgba(126, 228, 255, 0.30);
        }
        .rc-range::-moz-range-track {
          height: 8px;
          border-radius: 999px;
          background: rgba(126, 228, 255, 0.15);
          border: 1px solid rgba(126, 228, 255, 0.30);
        }
        .rc-range::-moz-range-progress {
          height: 8px;
          border-radius: 999px;
          background: linear-gradient(90deg, #5eead4 0%, #7ee4ff 100%);
        }
        .rc-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid #14B8A6;
          margin-top: -7px;
          box-shadow: 0 4px 14px rgba(20, 184, 166, 0.45),
            0 0 0 4px rgba(126, 228, 255, 0.12);
        }
        .rc-range::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid #14B8A6;
          box-shadow: 0 4px 14px rgba(20, 184, 166, 0.45),
            0 0 0 4px rgba(126, 228, 255, 0.12);
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
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-wider text-cyan-300/80 font-semibold mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

function ModalRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-wider text-cyan-300/80 font-semibold mb-1">
        {label}
      </p>
      <div className="text-sm text-gray-100">{children}</div>
    </div>
  );
}
