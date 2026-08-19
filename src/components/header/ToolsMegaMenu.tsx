"use client";

import Link from "next/link";
import {
  Workflow,
  Webhook,
  Clock,
  GitBranch,
  Target,
  CalendarDays,
  SearchCheck,
  MessageCircleQuestion,
  FileCode2,
  Braces,
  Link2,
  Bot,
  TerminalSquare,
  ListChecks,
  Library,
  Mic,
  Film,
  Send,
  Calculator,
  LayoutGrid,
  FileText,
  ArrowLeftRight,
  Compass,
  Activity,
  TrendingUp,
  BarChart3,
  ArrowRight,
  ScanSearch,
  Radar,
  Zap,
  MailCheck,
  Globe,
  ShieldCheck,
  ScanLine,
  Layers,
  Gauge,
} from "lucide-react";
import {
  TOOL_CATEGORIES,
  TOOLS_REGISTRY,
  toolsByCategory,
} from "@/data/tools-registry";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Workflow,
  Webhook,
  Clock,
  GitBranch,
  Target,
  CalendarDays,
  SearchCheck,
  MessageCircleQuestion,
  FileCode2,
  Braces,
  Link2,
  Bot,
  TerminalSquare,
  ListChecks,
  Library,
  Mic,
  Film,
  Send,
  Calculator,
  LayoutGrid,
  FileText,
  ArrowLeftRight,
  Compass,
  Activity,
  TrendingUp,
  BarChart3,
  ScanSearch,
  Radar,
  Zap,
  MailCheck,
  Globe,
  ShieldCheck,
  ScanLine,
  Layers,
  Gauge,
};

type Props = {
  onClose?: () => void;
};

/**
 * Tools mega-menu — categorized grid of all 26 free tools, grouped into
 * the 5 TOOL_CATEGORIES. Modeled on ServicesMegaMenu's cream editorial
 * idiom (no gradients, single accent, mono labels) but flat (no left-rail
 * category switcher — 26 items across 5 groups reads fine as one scroll).
 */
export default function ToolsMegaMenu({ onClose }: Props) {
  return (
    <div
      className="overflow-hidden"
      style={{
        background: "var(--cream-3)",
        border: "1px solid rgba(26,26,26,0.18)",
        boxShadow: "0 30px 60px -20px rgba(26,26,26,0.20)",
        maxHeight: "min(78vh, 640px)",
        overflowY: "auto",
      }}
    >
      <div className="p-6 pb-9">
        <div
          className="flex items-center gap-3 mb-5"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: "var(--terracotta)",
            fontWeight: 700,
          }}
        >
          <span
            style={{
              width: 22,
              height: 1,
              background: "var(--terracotta)",
              display: "inline-block",
            }}
          />
          {TOOLS_REGISTRY.length} free tools, zero paywall
        </div>

        {/*
          5 TOOL_CATEGORIES in a 3-col CSS grid leaves a structural empty
          cell on the last row (5 doesn't divide evenly by 3) — that read as
          a large blank right pane once scrolled to that row. A balanced
          multi-column flow (vs. a row-major grid) fills all 3 columns by
          height instead of leaving a fixed empty cell.
        */}
        <div className="sm:columns-2 lg:columns-3 gap-8">
          {TOOL_CATEGORIES.map((cat) => {
            const items = toolsByCategory(cat);
            return (
              <div
                key={cat}
                className="mb-6"
                style={{ breakInside: "avoid-column" }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--ink)",
                    marginBottom: 10,
                    paddingBottom: 8,
                    borderBottom: "1px solid rgba(26,26,26,0.10)",
                  }}
                >
                  {cat}
                </div>
                <ul className="space-y-2.5">
                  {items.map((tool) => {
                    const Icon = ICONS[tool.icon];
                    return (
                      <li key={tool.slug}>
                        <Link
                          href={`/tools/${tool.slug}`}
                          onClick={onClose}
                          className="group flex items-start gap-2.5"
                        >
                          {Icon && (
                            <span
                              className="flex-shrink-0 mt-0.5 w-6 h-6 flex items-center justify-center"
                              style={{
                                background: "var(--cream-2)",
                                border: "1px solid rgba(26,26,26,0.10)",
                                color: "var(--ink-faint)",
                                transition: "border-color 0.15s, color 0.15s",
                              }}
                            >
                              <Icon className="w-3 h-3" />
                            </span>
                          )}
                          <span className="min-w-0">
                            <span
                              className="flex items-center gap-1.5"
                              style={{
                                fontSize: 12.5,
                                fontWeight: 600,
                                color: "var(--ink)",
                                lineHeight: 1.25,
                              }}
                            >
                              <span
                                style={{ transition: "color 0.15s" }}
                                className="group-hover:text-[var(--terracotta)]"
                              >
                                {tool.name}
                              </span>
                              {tool.isNew && (
                                <span
                                  style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: 8,
                                    fontWeight: 700,
                                    letterSpacing: "0.10em",
                                    padding: "1px 5px",
                                    background: "var(--terracotta)",
                                    color: "var(--cream)",
                                    borderRadius: 999,
                                    flexShrink: 0,
                                  }}
                                >
                                  NEW
                                </span>
                              )}
                            </span>
                            <span
                              className="block"
                              style={{
                                fontSize: 11,
                                color: "var(--ink-2)",
                                lineHeight: 1.4,
                                marginTop: 2,
                              }}
                            >
                              {tool.oneLiner}
                            </span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Footer strip */}
        <div
          className="mt-6 pt-4 flex items-center justify-between"
          style={{
            borderTop: "1px solid rgba(26,26,26,0.10)",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--ink-faint)",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
          }}
        >
          <Link
            href="/tools"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 group transition-colors"
            style={{ color: "var(--terracotta)", fontWeight: 700 }}
          >
            All 26 tools
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/discovery-call"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 transition-all hover:-translate-y-0.5"
            style={{
              background: "var(--terracotta)",
              color: "var(--cream-3)",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              padding: "8px 14px",
              borderRadius: 2,
            }}
          >
            Book free audit
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
