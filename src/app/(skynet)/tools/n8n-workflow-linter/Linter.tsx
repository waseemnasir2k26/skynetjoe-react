"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  OctagonAlert,
  Sparkles,
  Workflow,
} from "lucide-react";
import {
  parseWorkflow,
  lintWorkflow,
  buildGraph,
  CATEGORY_COLOR,
  NODE_W,
  NODE_H,
  SAMPLE_WORKFLOW,
  type Finding,
  type Severity,
} from "@/lib/tools/n8n-lint";
import ToolUsage from "@/components/tools/ToolUsage";

const SEVERITY_ORDER: Severity[] = ["critical", "warning", "info"];

const SEVERITY_META: Record<
  Severity,
  { label: string; color: string; icon: typeof OctagonAlert }
> = {
  critical: { label: "Critical", color: "#c6483f", icon: OctagonAlert },
  warning: { label: "Warning", color: "#c68a3f", icon: AlertTriangle },
  info: { label: "Info", color: "#5a7bc6", icon: Info },
};

export default function Linter() {
  const [raw, setRaw] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);

  const parsed = useMemo(
    () => (submitted !== null ? parseWorkflow(submitted) : null),
    [submitted],
  );

  const checks = useMemo(
    () => (parsed && parsed.ok ? lintWorkflow(parsed.workflow) : null),
    [parsed],
  );

  const graph = useMemo(
    () => (parsed && parsed.ok ? buildGraph(parsed.workflow) : null),
    [parsed],
  );

  const findings: Finding[] = useMemo(() => {
    if (!checks) return [];
    return checks
      .flatMap((c) => c.findings)
      .sort(
        (a, b) =>
          SEVERITY_ORDER.indexOf(a.severity) -
          SEVERITY_ORDER.indexOf(b.severity),
      );
  }, [checks]);

  const counts = useMemo(() => {
    const c = { critical: 0, warning: 0, info: 0 };
    findings.forEach((f) => c[f.severity]++);
    return c;
  }, [findings]);

  const passedCount = checks ? checks.filter((c) => c.passed).length : 0;

  function runLint() {
    setSubmitted(raw);
  }

  function loadSample() {
    const json = JSON.stringify(SAMPLE_WORKFLOW, null, 2);
    setRaw(json);
    setSubmitted(json);
  }

  return (
    <div className="space-y-6">
      {/* INPUT */}
      <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-6 md:p-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(198,107,63,0.15)] text-xs font-bold text-[var(--terracotta-aa)]">
              1
            </span>
            <h2 className="text-lg font-extrabold text-[var(--ink)]">
              Paste your n8n workflow JSON
            </h2>
          </div>
          <button
            type="button"
            onClick={loadSample}
            className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(26,26,26,0.18)] bg-[var(--cream-2)] px-3.5 py-1.5 text-xs font-semibold text-[var(--ink-2)] transition hover:border-[var(--terracotta)] hover:text-[var(--terracotta-aa)]"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Load sample workflow
          </button>
        </div>
        <textarea
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          placeholder='Paste the output of n8n → Workflow menu → Download, or copy from "Import from JSON". Example: { "nodes": [...], "connections": {...} }'
          rows={12}
          spellCheck={false}
          className="w-full rounded-xl border border-[rgba(26,26,26,0.15)] bg-[var(--cream-3)] p-4 font-mono text-xs leading-relaxed text-[var(--ink)] outline-none focus:border-[var(--terracotta)]"
        />
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={runLint}
            disabled={!raw.trim()}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-[var(--cream-3)] shadow-lg transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40 sm:text-base"
            style={{
              background: "var(--terracotta)",
              boxShadow: "0 10px 32px rgba(198,107,63,0.25)",
            }}
          >
            <Workflow className="h-4 w-4" />
            Lint + visualize workflow
          </button>
          <p className="text-xs text-[var(--ink-faint)]">
            Nothing is uploaded anywhere — parsing happens entirely in your
            browser.
          </p>
        </div>
        <div className="mt-4">
          <ToolUsage slug="n8n-workflow-linter" />
        </div>
      </div>

      {/* PARSE ERROR */}
      {parsed && !parsed.ok && (
        <div className="rounded-2xl border border-[rgba(198,72,63,0.35)] bg-[rgba(198,72,63,0.06)] p-5">
          <p className="flex items-center gap-2 text-sm font-semibold text-[#c6483f]">
            <OctagonAlert className="h-4 w-4" />
            Couldn&apos;t parse that
          </p>
          <p className="mt-1 text-sm text-[var(--ink-2)]">{parsed.error}</p>
        </div>
      )}

      {/* RESULTS */}
      {parsed && parsed.ok && graph && checks && (
        <>
          {/* GRAPH */}
          <div className="overflow-hidden rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[rgba(26,26,26,0.12)] px-6 py-4 md:px-8">
              <h2 className="text-lg font-extrabold text-[var(--ink)]">
                Node graph — {graph.nodes.length} node
                {graph.nodes.length === 1 ? "" : "s"}, {graph.edges.length}{" "}
                connection{graph.edges.length === 1 ? "" : "s"}
              </h2>
              <div className="flex flex-wrap gap-3 text-[11px] font-semibold uppercase tracking-wide text-[var(--ink-faint)]">
                {(["trigger", "http", "code", "logic", "other"] as const).map(
                  (cat) => (
                    <span
                      key={cat}
                      className="inline-flex items-center gap-1.5"
                    >
                      <span
                        className="inline-block h-2.5 w-2.5 rounded-full"
                        style={{ background: CATEGORY_COLOR[cat] }}
                      />
                      {cat}
                    </span>
                  ),
                )}
              </div>
            </div>
            <div className="overflow-auto bg-[var(--cream-3)] p-4">
              <svg
                viewBox={graph.viewBox}
                width="100%"
                height={Math.max(260, Math.min(560, graph.nodes.length * 90))}
                role="img"
                aria-label="n8n workflow node graph"
              >
                <defs>
                  <marker
                    id="arrow"
                    markerWidth="8"
                    markerHeight="8"
                    refX="7"
                    refY="4"
                    orient="auto"
                  >
                    <path d="M0,0 L8,4 L0,8 Z" fill="rgba(26,26,26,0.45)" />
                  </marker>
                </defs>
                {graph.edges.map((e, i) => {
                  const from = graph.nodes.find((n) => n.name === e.from);
                  const to = graph.nodes.find((n) => n.name === e.to);
                  if (!from || !to) return null;
                  const x1 = from.x + NODE_W;
                  const y1 = from.y + NODE_H / 2;
                  const x2 = to.x;
                  const y2 = to.y + NODE_H / 2;
                  const midX = (x1 + x2) / 2;
                  return (
                    <path
                      key={`${e.from}-${e.to}-${i}`}
                      d={`M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`}
                      fill="none"
                      stroke="rgba(26,26,26,0.35)"
                      strokeWidth={1.75}
                      markerEnd="url(#arrow)"
                    />
                  );
                })}
                {graph.nodes.map((n) => (
                  <g key={n.name} opacity={n.disabled ? 0.45 : 1}>
                    <rect
                      x={n.x}
                      y={n.y}
                      width={NODE_W}
                      height={NODE_H}
                      rx={10}
                      fill="var(--cream-2)"
                      stroke={CATEGORY_COLOR[n.category]}
                      strokeWidth={2}
                    />
                    <rect
                      x={n.x}
                      y={n.y}
                      width={6}
                      height={NODE_H}
                      rx={3}
                      fill={CATEGORY_COLOR[n.category]}
                    />
                    <text
                      x={n.x + 16}
                      y={n.y + NODE_H / 2 - 6}
                      fontSize={12}
                      fontWeight={700}
                      fill="var(--ink)"
                      fontFamily="var(--font-sans)"
                    >
                      {n.name.length > 20 ? n.name.slice(0, 19) + "…" : n.name}
                    </text>
                    <text
                      x={n.x + 16}
                      y={n.y + NODE_H / 2 + 12}
                      fontSize={9.5}
                      fill="var(--ink-faint)"
                      fontFamily="var(--font-mono)"
                    >
                      {n.type.replace("n8n-nodes-base.", "")}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>

          {/* HEALTH CHECK SUMMARY */}
          <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-6 md:p-8">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-lg font-extrabold text-[var(--ink)]">
                20-point health check — {passedCount}/20 passed
              </h2>
              <div className="flex flex-wrap gap-2">
                {SEVERITY_ORDER.map((sev) => {
                  const meta = SEVERITY_META[sev];
                  const Icon = meta.icon;
                  return (
                    <span
                      key={sev}
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold"
                      style={{
                        background: `${meta.color}18`,
                        color: meta.color,
                      }}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {counts[sev]} {meta.label}
                    </span>
                  );
                })}
              </div>
            </div>

            {findings.length === 0 ? (
              <div className="flex items-center gap-2 rounded-2xl border border-[rgba(79,138,91,0.35)] bg-[rgba(79,138,91,0.08)] px-5 py-4 text-sm font-semibold text-[#4f8a5b]">
                <CheckCircle2 className="h-4 w-4" />
                All 20 checks passed — nothing to flag.
              </div>
            ) : (
              <div className="space-y-2.5">
                {findings.map((f, i) => {
                  const meta = SEVERITY_META[f.severity];
                  const Icon = meta.icon;
                  return (
                    <div
                      key={`${f.ruleId}-${i}`}
                      className="rounded-xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-3)] px-4 py-3.5"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <Icon
                          className="h-4 w-4 shrink-0"
                          style={{ color: meta.color }}
                        />
                        <span
                          className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                          style={{
                            background: `${meta.color}18`,
                            color: meta.color,
                          }}
                        >
                          {meta.label}
                        </span>
                        <span className="text-sm font-semibold text-[var(--ink)]">
                          {f.title}
                        </span>
                      </div>
                      <p className="mt-1.5 text-sm text-[var(--ink-2)]">
                        {f.detail}
                      </p>
                      <p className="mt-1 font-mono text-[11px] text-[var(--ink-faint)]">
                        {f.path}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="mt-6 rounded-2xl border border-[rgba(198,107,63,0.30)] bg-[rgba(198,107,63,0.06)] p-5">
              <p className="text-sm font-semibold text-[var(--ink)]">
                Want these fixed properly, not just flagged?
              </p>
              <p className="mt-1 text-sm text-[var(--ink-2)]">
                A workflow rescue call — I go through the whole thing live, fix
                the critical items, and harden the rest.
              </p>
              <Link
                href="/services/n8n-automation"
                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[var(--terracotta-aa)] hover:underline"
              >
                Book a workflow rescue call →
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
