"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  Copy,
  Loader2,
  Sparkles,
  Wand2,
} from "lucide-react";

const STORAGE_KEY = "skynet:exec-summary:v1";

type Audience = "ceo" | "investor" | "board" | "client" | "team";
type Tone = "formal" | "direct" | "storytelling";

type Inputs = {
  text: string;
  audience: Audience;
  length: number; // target words
  tone: Tone;
};

const DEFAULTS: Inputs = {
  text: "",
  audience: "ceo",
  length: 220,
  tone: "direct",
};

const AUDIENCE_LABEL: Record<Audience, string> = {
  ceo: "CEO",
  investor: "Investor",
  board: "Board",
  client: "Client",
  team: "Team",
};

const TONE_LABEL: Record<Tone, string> = {
  formal: "Formal",
  direct: "Direct",
  storytelling: "Storytelling",
};

const POS_WORDS = [
  "win",
  "growth",
  "shipped",
  "launched",
  "closed",
  "signed",
  "expanded",
  "increased",
  "improved",
  "delivered",
  "secured",
  "achieved",
  "strong",
  "milestone",
  "record",
  "ahead",
  "successful",
  "approved",
  "validated",
  "opportunity",
];

const NEG_WORDS = [
  "risk",
  "delay",
  "blocked",
  "missed",
  "slipped",
  "churn",
  "concern",
  "issue",
  "bug",
  "broken",
  "fail",
  "failed",
  "loss",
  "decline",
  "behind",
  "drop",
  "stalled",
  "shortfall",
  "deficit",
  "outage",
];

const TARGET_KEYWORDS = [
  "revenue",
  "users",
  "leads",
  "customers",
  "growth",
  "churn",
  "retention",
  "conversion",
  "pipeline",
  "deal",
  "client",
  "launch",
  "ship",
  "deploy",
  "feature",
  "bug",
  "hire",
  "team",
  "roadmap",
  "budget",
  "cost",
  "spend",
  "burn",
  "runway",
  "investor",
  "round",
];

function splitSentences(text: string): string[] {
  return text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+(?=[A-Z0-9"'(\[])/g)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function splitParagraphs(text: string): string[] {
  return text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function wordsCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function titleCase(s: string): string {
  return s.replace(/\b([a-z])/g, (m) => m.toUpperCase());
}

function extractTitle(text: string): string {
  const firstLine = text.split(/\n/)[0]?.trim();
  if (firstLine && firstLine.length > 0 && firstLine.length <= 120) {
    return firstLine.replace(/[#*_>`]/g, "").trim();
  }
  const first = splitSentences(text)[0] || "Executive summary";
  return first.length > 120 ? `${first.slice(0, 117)}…` : first;
}

function extractNounPhrases(text: string): string[] {
  // Cheap heuristic — capitalised runs that are not at sentence start.
  const matches = text.match(/(?:[A-Z][a-zA-Z0-9'’&-]+\s?){1,4}/g) || [];
  const counts = new Map<string, number>();
  for (const raw of matches) {
    const cleaned = raw.trim().replace(/[.,;:]$/, "");
    if (cleaned.length < 3) continue;
    if (/^(The|And|But|For|This|That|We|I|You|They|It|He|She|If|When|While|However|After|Before|With)\b/.test(cleaned)) continue;
    counts.set(cleaned, (counts.get(cleaned) || 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([k]) => k);
}

function scoreSentence(s: string): number {
  const lower = s.toLowerCase();
  let score = 0;
  for (const w of TARGET_KEYWORDS) if (lower.includes(w)) score += 2;
  for (const w of POS_WORDS) if (lower.includes(w)) score += 1.4;
  for (const w of NEG_WORDS) if (lower.includes(w)) score += 1.2;
  // numerals / percentages — strong signal
  if (/\d/.test(s)) score += 1.5;
  if (/%|\$|€|£/.test(s)) score += 1.2;
  // Length sweet spot
  const wc = wordsCount(s);
  if (wc >= 8 && wc <= 28) score += 1;
  if (wc > 40) score -= 1;
  return score;
}

function sentiment(text: string): "positive" | "neutral" | "negative" {
  const lower = text.toLowerCase();
  let p = 0;
  let n = 0;
  for (const w of POS_WORDS) if (lower.includes(w)) p++;
  for (const w of NEG_WORDS) if (lower.includes(w)) n++;
  if (p === 0 && n === 0) return "neutral";
  if (p > n + 1) return "positive";
  if (n > p + 1) return "negative";
  return "neutral";
}

function rank(text: string): string[] {
  return splitSentences(text)
    .map((s) => ({ s, score: scoreSentence(s) }))
    .sort((a, b) => b.score - a.score)
    .map((x) => x.s);
}

function getTopSentences(text: string, n: number): string[] {
  const ranked = rank(text);
  const picked = ranked.slice(0, n);
  // Restore original order
  const order = splitSentences(text);
  return picked.sort((a, b) => order.indexOf(a) - order.indexOf(b));
}

function bulletify(sentences: string[]): string[] {
  return sentences.map((s) => s.replace(/[.!?]$/, ""));
}

function trimWords(text: string, max: number): string {
  const words = text.trim().split(/\s+/);
  if (words.length <= max) return text;
  return words.slice(0, max).join(" ") + "…";
}

function joinSentences(sentences: string[]): string {
  return sentences
    .map((s) => (/[.!?]$/.test(s) ? s : `${s}.`))
    .join(" ");
}

function audienceGreeting(a: Audience, tone: Tone): { greeting: string; signoff: string } {
  if (tone === "formal") {
    return {
      greeting:
        a === "investor" || a === "board" ? "Dear team," : a === "client" ? "Dear partner," : "Hello team,",
      signoff: "Regards,",
    };
  }
  if (tone === "storytelling") {
    return {
      greeting:
        a === "investor" ? "Hi all," : a === "client" ? "Hey there," : "Hi team,",
      signoff: "More soon,",
    };
  }
  return {
    greeting:
      a === "investor" ? "Hi investors," : a === "client" ? "Hi there," : a === "board" ? "Hi board," : "Hi team,",
    signoff: "Best,",
  };
}

type Bundle = {
  title: string;
  tldr: { bullets: string[]; words: number };
  email: { subject: string; body: string; words: number };
  slack: { body: string; words: number };
  deck: { title: string; bullets: string[]; words: number };
  investor: {
    problem: string;
    solution: string;
    traction: string;
    ask: string;
    next: string[];
    words: number;
  };
};

function buildBundle(inputs: Inputs): Bundle {
  const { text, audience, length, tone } = inputs;
  const title = titleCase(extractTitle(text));
  const phrases = extractNounPhrases(text);
  const subject = phrases[0] || title;
  const mood = sentiment(text);

  const lengthSentenceCount = Math.max(3, Math.min(12, Math.round(length / 22)));
  const top = getTopSentences(text, lengthSentenceCount);
  const ranked = rank(text);
  const paragraphs = splitParagraphs(text);

  // TL;DR — 3 bullets, < 100 words
  const tldrBullets = bulletify(ranked.slice(0, 3)).map((b) => trimWords(b, 24));
  const tldr = {
    bullets: tldrBullets,
    words: wordsCount(tldrBullets.join(" ")),
  };

  // Email — 3 paragraphs
  const greet = audienceGreeting(audience, tone);
  const para1 = trimWords(joinSentences(top.slice(0, 2)), Math.round(length * 0.3));
  const para2 = trimWords(
    joinSentences(top.slice(2, Math.min(top.length, 5))),
    Math.round(length * 0.4)
  );
  const para3Bullets = ranked.slice(top.length, top.length + 3);
  const callToAction =
    audience === "investor"
      ? "Happy to walk through the supporting detail on a 20-minute call this week."
      : audience === "client"
        ? "Let me know if anything here needs adjusting and I will turn it around within a day."
        : audience === "board"
          ? "Full deck and supporting figures attached. Questions welcome before our next session."
          : audience === "team"
            ? "Reply in-thread with blockers and I will route them this afternoon."
            : "Happy to expand on any item — just reply with which one.";
  const emailBody = [
    `${greet.greeting}`,
    "",
    `Quick summary on ${subject}.`,
    "",
    para1,
    "",
    para2 || (para3Bullets.length ? "Key follow-ups:" : ""),
    para3Bullets.length
      ? para3Bullets.map((b) => `• ${trimWords(b, 20)}`).join("\n")
      : "",
    "",
    callToAction,
    "",
    greet.signoff,
  ]
    .filter((l, i, arr) => !(l === "" && arr[i - 1] === ""))
    .join("\n");
  const email = {
    subject: `${
      mood === "positive" ? "Update" : mood === "negative" ? "Flag" : "Summary"
    } — ${trimWords(subject, 12)}`,
    body: emailBody,
    words: wordsCount(emailBody),
  };

  // Slack
  const emoji = mood === "positive" ? "🟢" : mood === "negative" ? "🟠" : "🔵";
  const slackBullets = ranked.slice(0, 4).map((s, i) => {
    const prefix = ["✅", "📈", "⚠️", "👉"][i] || "•";
    return `${prefix} ${trimWords(s.replace(/[.!?]$/, ""), 18)}`;
  });
  const slackLead = trimWords(top[0] || subject, 28);
  const slackBody = [
    `${emoji} *${trimWords(title, 14)}*`,
    "",
    slackLead,
    "",
    ...slackBullets,
    "",
    audience === "team"
      ? "Reply in-thread with blockers 🧵"
      : "DM me if you need detail on any of these.",
  ].join("\n");
  const slack = { body: slackBody, words: wordsCount(slackBody) };

  // Deck slide
  const deckBullets = ranked.slice(0, 5).map((b) => trimWords(b.replace(/[.!?]$/, ""), 14));
  const deck = {
    title: trimWords(title, 10),
    bullets: deckBullets,
    words: wordsCount(deckBullets.join(" ")),
  };

  // Investor 1-pager
  const problemSrc =
    paragraphs[0] || top.slice(0, 2).join(" ") || text.slice(0, 200);
  const solutionSrc =
    paragraphs[1] || top.slice(2, 4).join(" ") || top[1] || "";
  const tractionSrc =
    ranked.find((s) => /\d/.test(s)) || ranked[2] || top[2] || "";
  const askSrc =
    ranked.find((s) => /\b(need|ask|funding|raise|invest|hire|budget|approve)\b/i.test(s)) ||
    "We are seeking strategic introductions and follow-on support to accelerate the next milestone.";
  const nextSteps = ranked
    .filter((s) => /\b(will|plan|next|then|by|launch|ship|hire|close|deliver)\b/i.test(s))
    .slice(0, 3)
    .map((s) => trimWords(s.replace(/[.!?]$/, ""), 16));
  const fallbackNext =
    nextSteps.length === 3
      ? nextSteps
      : [
          ...nextSteps,
          ...ranked.slice(0, 3 - nextSteps.length).map((s) => trimWords(s.replace(/[.!?]$/, ""), 16)),
        ].slice(0, 3);

  const investor = {
    problem: trimWords(problemSrc, 60),
    solution: trimWords(solutionSrc || problemSrc, 60),
    traction: trimWords(tractionSrc, 60),
    ask: trimWords(askSrc, 50),
    next: fallbackNext,
    words: wordsCount(
      [problemSrc, solutionSrc, tractionSrc, askSrc, fallbackNext.join(" ")].join(" ")
    ),
  };

  return { title, tldr, email, slack, deck, investor };
}

type TabKey = "tldr" | "email" | "slack" | "deck" | "investor";

const TAB_LIST: { key: TabKey; label: string; hint: string }[] = [
  { key: "tldr", label: "TL;DR", hint: "<100 words" },
  { key: "email", label: "Email-ready", hint: "3 paragraphs" },
  { key: "slack", label: "Slack-ready", hint: "≈150 words" },
  { key: "deck", label: "Deck slide", hint: "5 bullets" },
  { key: "investor", label: "Investor 1-pager", hint: "Problem · Ask" },
];

function bundleToText(b: Bundle, tab: TabKey): string {
  if (tab === "tldr") {
    return `${b.title}\n\n` + b.tldr.bullets.map((x) => `• ${x}`).join("\n");
  }
  if (tab === "email") {
    return `Subject: ${b.email.subject}\n\n${b.email.body}`;
  }
  if (tab === "slack") return b.slack.body;
  if (tab === "deck") {
    return `${b.deck.title}\n\n` + b.deck.bullets.map((x) => `• ${x}`).join("\n");
  }
  // investor
  return [
    `${b.title} — Investor 1-pager`,
    "",
    `Problem: ${b.investor.problem}`,
    "",
    `Solution: ${b.investor.solution}`,
    "",
    `Traction: ${b.investor.traction}`,
    "",
    `Ask: ${b.investor.ask}`,
    "",
    `Next steps:`,
    ...b.investor.next.map((x) => `• ${x}`),
  ].join("\n");
}

export default function Generator({ calUrl }: { calUrl: string }) {
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);
  const [bundle, setBundle] = useState<Bundle | null>(null);
  const [generating, setGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("tldr");
  const [copied, setCopied] = useState<TabKey | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const resultRef = useRef<HTMLDivElement | null>(null);

  // Hydrate
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<Inputs>;
        setInputs({
          text: saved.text ?? "",
          audience: (saved.audience as Audience) ?? DEFAULTS.audience,
          length: typeof saved.length === "number" ? saved.length : DEFAULTS.length,
          tone: (saved.tone as Tone) ?? DEFAULTS.tone,
        });
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  // Persist (inputs only — not bundle)
  useEffect(() => {
    if (!hydrated || typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(inputs));
    } catch {
      // ignore
    }
  }, [inputs, hydrated]);

  const setText = useCallback(
    (v: string) => setInputs((s) => ({ ...s, text: v.slice(0, 8000) })),
    []
  );

  const generate = useCallback(() => {
    if (inputs.text.trim().length < 40) return;
    setGenerating(true);
    setBundle(null);
    // Fake-latency for UX legitimacy
    setTimeout(() => {
      const b = buildBundle(inputs);
      setBundle(b);
      setGenerating(false);
      requestAnimationFrame(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }, 900);
  }, [inputs]);

  const onCopy = useCallback(
    async (tab: TabKey) => {
      if (!bundle) return;
      try {
        await navigator.clipboard.writeText(bundleToText(bundle, tab));
        setCopied(tab);
        setTimeout(() => setCopied(null), 1500);
      } catch {
        // ignore
      }
    },
    [bundle]
  );

  const charCount = inputs.text.length;
  const wordCount = useMemo(() => wordsCount(inputs.text), [inputs.text]);
  const canGenerate = inputs.text.trim().length >= 40 && !generating;

  return (
    <div>
      {/* INPUT PANEL */}
      <div
        className="rounded-3xl p-6 md:p-8 mb-6"
        style={{
          background: "rgba(10, 45, 74, 0.55)",
          border: "1px solid rgba(126, 228, 255, 0.22)",
          backdropFilter: "blur(14px)",
        }}
      >
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold">
            1. Paste your raw notes
          </p>
          <span className="text-xs text-gray-400 tabular-nums">
            {wordCount} words · {charCount.toLocaleString()} / 8,000 chars
          </span>
        </div>

        <textarea
          value={inputs.text}
          onChange={(e) => setText(e.target.value)}
          rows={10}
          placeholder="Paste meeting notes, a project brief, a sales call transcript, anything with sentences. Minimum 40 characters."
          className="esg-input esg-textarea w-full"
        />

        {/* Controls */}
        <div className="grid sm:grid-cols-3 gap-4 mt-5">
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-cyan-300/80 font-semibold mb-1.5">
              Audience
            </label>
            <select
              value={inputs.audience}
              onChange={(e) =>
                setInputs((s) => ({ ...s, audience: e.target.value as Audience }))
              }
              className="esg-input"
            >
              {(["ceo", "investor", "board", "client", "team"] as Audience[]).map(
                (a) => (
                  <option key={a} value={a}>
                    {AUDIENCE_LABEL[a]}
                  </option>
                )
              )}
            </select>
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-cyan-300/80 font-semibold mb-1.5">
              Desired length · {inputs.length} words
            </label>
            <input
              type="range"
              min={100}
              max={500}
              step={10}
              value={inputs.length}
              onChange={(e) =>
                setInputs((s) => ({ ...s, length: Number(e.target.value) }))
              }
              className="rc-range w-full"
              style={
                {
                  ["--rc-fill" as never]:
                    `${((inputs.length - 100) / 400) * 100}%`,
                } as React.CSSProperties
              }
            />
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-cyan-300/80 font-semibold mb-1.5">
              Tone
            </label>
            <select
              value={inputs.tone}
              onChange={(e) =>
                setInputs((s) => ({ ...s, tone: e.target.value as Tone }))
              }
              className="esg-input"
            >
              {(["formal", "direct", "storytelling"] as Tone[]).map((t) => (
                <option key={t} value={t}>
                  {TONE_LABEL[t]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-6">
          <button
            type="button"
            onClick={generate}
            disabled={!canGenerate}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
            }}
          >
            {generating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Generating five formats…
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" /> Generate
              </>
            )}
          </button>
          {bundle && !generating && (
            <button
              type="button"
              onClick={generate}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold border border-white/20 text-white/90 hover:bg-white/10 transition"
            >
              Regenerate
            </button>
          )}
        </div>

        {inputs.text.trim().length < 40 && (
          <p className="mt-3 text-xs text-amber-300/90">
            Paste at least 40 characters of text to enable generation.
          </p>
        )}
      </div>

      {/* OUTPUT */}
      <div ref={resultRef}>
        {bundle && (
          <div
            className="rounded-3xl p-6 md:p-8 mb-6"
            style={{
              background: "rgba(10, 45, 74, 0.65)",
              border: "1px solid rgba(126, 228, 255, 0.28)",
              backdropFilter: "blur(14px)",
            }}
          >
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-2">
              2. Pick the format you need
            </p>
            <h3 className="text-xl md:text-2xl font-extrabold text-white mb-5">
              {bundle.title}
            </h3>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-5" role="tablist">
              {TAB_LIST.map((t) => {
                const active = activeTab === t.key;
                return (
                  <button
                    key={t.key}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveTab(t.key)}
                    className="px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition"
                    style={
                      active
                        ? {
                            background:
                              "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
                            color: "#fff",
                            border: "1px solid rgba(126, 228, 255, 0.35)",
                          }
                        : {
                            background: "rgba(6, 24, 39, 0.55)",
                            color: "rgba(203, 213, 225, 0.85)",
                            border: "1px solid rgba(126, 228, 255, 0.18)",
                          }
                    }
                  >
                    {t.label}{" "}
                    <span className="text-[10px] uppercase tracking-wider opacity-70 ml-1">
                      {t.hint}
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              className="rounded-2xl p-4 sm:p-5"
              style={{
                background: "rgba(6, 24, 39, 0.65)",
                border: "1px solid rgba(126, 228, 255, 0.18)",
              }}
            >
              {activeTab === "tldr" && (
                <div>
                  <ul className="space-y-2 text-base text-gray-100 leading-relaxed list-none">
                    {bundle.tldr.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-cyan-300">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === "email" && (
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-wider text-cyan-300/80 font-semibold">
                    Subject
                  </p>
                  <p className="text-base text-white font-semibold">
                    {bundle.email.subject}
                  </p>
                  <p className="text-xs uppercase tracking-wider text-cyan-300/80 font-semibold mt-3">
                    Body
                  </p>
                  <pre className="text-sm text-gray-100 leading-relaxed whitespace-pre-wrap font-sans">
                    {bundle.email.body}
                  </pre>
                </div>
              )}

              {activeTab === "slack" && (
                <pre className="text-sm text-gray-100 leading-relaxed whitespace-pre-wrap font-sans">
                  {bundle.slack.body}
                </pre>
              )}

              {activeTab === "deck" && (
                <div>
                  <p className="text-xs uppercase tracking-wider text-cyan-300/80 font-semibold mb-2">
                    Slide title
                  </p>
                  <h4 className="text-xl md:text-2xl font-extrabold text-white mb-4">
                    {bundle.deck.title}
                  </h4>
                  <ul className="space-y-2.5 text-base text-gray-100 leading-relaxed">
                    {bundle.deck.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-cyan-300 font-bold">{i + 1}.</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === "investor" && (
                <div className="space-y-4 text-sm md:text-base text-gray-100 leading-relaxed">
                  <Section label="Problem">{bundle.investor.problem}</Section>
                  <Section label="Solution">{bundle.investor.solution}</Section>
                  <Section label="Traction">{bundle.investor.traction}</Section>
                  <Section label="Ask">{bundle.investor.ask}</Section>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-cyan-300/80 font-semibold mb-1.5">
                      Next steps
                    </p>
                    <ul className="space-y-1.5">
                      {bundle.investor.next.map((b, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-cyan-300">→</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between flex-wrap gap-3 mt-4">
              <p className="text-xs text-gray-400 tabular-nums">
                {(() => {
                  if (activeTab === "tldr")
                    return `${bundle.tldr.words} words · ${
                      bundle.tldr.bullets.join(" ").length
                    } chars`;
                  if (activeTab === "email")
                    return `${bundle.email.words} words · ${bundle.email.body.length} chars`;
                  if (activeTab === "slack")
                    return `${bundle.slack.words} words · ${bundle.slack.body.length} chars`;
                  if (activeTab === "deck")
                    return `${bundle.deck.words} words · 5 bullets`;
                  return `${bundle.investor.words} words · 5 sections`;
                })()}
              </p>
              <button
                type="button"
                onClick={() => onCopy(activeTab)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white border border-cyan-300/40 bg-cyan-300/10 hover:bg-cyan-300/20 transition"
              >
                {copied === activeTab ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                {copied === activeTab ? "Copied" : "Copy this format"}
              </button>
            </div>
          </div>
        )}

        {/* CTA */}
        {bundle && (
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
                Want a REAL AI-powered summary?
              </p>
              <h3 className="text-xl md:text-2xl font-extrabold text-white mb-2">
                Book a 30-min call to scope a custom prompt for your workflow.
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                This tool is a structured-prettifier. We&apos;ll scope a real
                LLM pipeline that ingests your transcripts and writes in your
                voice every time. Free call. No pitch unless the math works.
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
              <CalendarCheck className="w-4 h-4" />
              Book the call
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}

        {bundle && (
          <p className="mt-4 text-[11px] text-gray-500 inline-flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            Generated locally. Nothing was sent to a server.
          </p>
        )}
      </div>

      <style>{`
        .esg-input {
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
        .esg-input::placeholder { color: rgba(203, 213, 225, 0.45); }
        .esg-input:focus {
          border-color: rgba(94, 234, 212, 0.7);
          box-shadow: 0 0 0 3px rgba(94, 234, 212, 0.15);
        }
        .esg-textarea { resize: vertical; min-height: 180px; font-family: inherit; }

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
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid #14B8A6;
          margin-top: -8px;
          box-shadow: 0 4px 14px rgba(20, 184, 166, 0.45),
            0 0 0 4px rgba(126, 228, 255, 0.12);
        }
        .rc-range::-moz-range-thumb {
          width: 22px;
          height: 22px;
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

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-wider text-cyan-300/80 font-semibold mb-1">
        {label}
      </p>
      <p>{children}</p>
    </div>
  );
}
