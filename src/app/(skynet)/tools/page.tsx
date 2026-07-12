import type { Metadata } from "next";
import Link from "next/link";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
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
} from "lucide-react";
import Reveal from "./Reveal";
import ToolUsage from "@/components/tools/ToolUsage";
import { TOOL_CATEGORIES, toolsByCategory } from "@/data/tools-registry";

const ICONS: Record<
  string,
  React.ComponentType<{ className?: string; style?: React.CSSProperties }>
> = {
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
};

export const metadata: Metadata = {
  title: "26 Free Tools for Service Businesses",
  description:
    "26 free tools across automation, AEO, prompts, ops and diagnostics — n8n workflow generator, AEO audit, cold DM generator and more.",
  alternates: { canonical: `${SITE.url}/tools` },
  openGraph: {
    title: "SkynetLabs Free Tools — 26 calculators, diagnostics and generators",
    description:
      "Find out where your business is losing time and money. 26 free tools across automation, AEO, prompts, ops, and diagnostics.",
    url: `${SITE.url}/tools`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
};

const CATEGORY_DESC: Record<string, string> = {
  "Automation & Workflows":
    "n8n, GHL, webhooks, and cron — plan and generate the wiring before you build it.",
  "AEO & AI Visibility":
    "Audit, grade, and structure your site for AI answer engines and crawlers.",
  "Prompts & Agents":
    "Build production-grade prompts, agent specs, and SOPs for AI you actually run.",
  "Ops & Outbound":
    "Cold outreach, cost modeling, and stack decisions for lean operators.",
  Diagnostics:
    "Score, quiz, and calculate exactly where your business leaks time and money.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "SkynetLabs Free Tools",
  description:
    "26 free utilities from SkynetLabs across automation & workflows, AEO & AI visibility, prompts & agents, ops & outbound, and diagnostics.",
  url: `${SITE.url}/tools`,
  inLanguage: "en",
  isPartOf: { "@id": `${SITE.url}/#website` },
  hasPart: TOOL_CATEGORIES.flatMap((cat) =>
    toolsByCategory(cat).map((t) => ({
      "@type": "SoftwareApplication",
      name: t.name,
      url: `${SITE.url}/tools/${t.slug}`,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    })),
  ),
};

export default function ToolsIndexPage() {
  return (
    <>
      <JsonLd data={schema} />
      <main
        style={{
          minHeight: "100vh",
          background: "var(--cream)",
          color: "var(--ink)",
        }}
      >
        <section
          className="container-x px-6 pt-32 pb-16 md:pt-40"
          style={{
            background: "var(--cream-3)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <Reveal className="max-w-3xl">
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "var(--terracotta-aa)",
                fontWeight: 600,
                marginBottom: 22,
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span
                style={{
                  width: 28,
                  height: 1,
                  background: "var(--terracotta)",
                }}
              />
              26 free tools
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(40px, 6vw, 64px)",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
                color: "var(--ink)",
                marginBottom: 18,
              }}
            >
              Find out where your business is{" "}
              <span style={{ color: "var(--terracotta-aa)" }}>
                losing money.
              </span>
            </h1>
            <p
              style={{
                fontSize: 18,
                color: "var(--ink-2)",
                maxWidth: "52ch",
                lineHeight: 1.6,
              }}
            >
              26 free tools I built for myself before I built them for clients —
              automation planning, AEO/AI visibility, prompt and agent builders,
              outbound ops, and diagnostics. All free. Some hand you the result
              instantly; a few ask for an email to unlock it. Just numbers,
              either way.
            </p>
          </Reveal>
        </section>

        {TOOL_CATEGORIES.map((cat, catIdx) => {
          const tools = toolsByCategory(cat);
          return (
            <section
              key={cat}
              className="container-x px-6 py-16"
              style={
                catIdx % 2 === 1 ? { background: "var(--cream-2)" } : undefined
              }
            >
              <Reveal className="mb-10 max-w-2xl">
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: "var(--terracotta-aa)",
                    fontWeight: 700,
                    marginBottom: 8,
                  }}
                >
                  {String(catIdx + 1).padStart(2, "0")} — {tools.length} tools
                </div>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(26px, 3.4vw, 36px)",
                    fontWeight: 700,
                    letterSpacing: "-0.015em",
                    color: "var(--ink)",
                    marginBottom: 10,
                  }}
                >
                  {cat}
                </h2>
                <p
                  style={{
                    fontSize: 15,
                    color: "var(--ink-2)",
                    lineHeight: 1.55,
                  }}
                >
                  {CATEGORY_DESC[cat]}
                </p>
              </Reveal>

              <div className="grid md:grid-cols-2 gap-6">
                {tools.map((tool, i) => {
                  const Icon = ICONS[tool.icon];
                  return (
                    <Reveal key={tool.slug} delay={(i % 2) * 0.06}>
                      <Link
                        href={`/tools/${tool.slug}`}
                        className="group relative"
                        style={{
                          display: "block",
                          padding: 28,
                          background: "var(--cream-2)",
                          border: "1px solid var(--border)",
                          textDecoration: "none",
                          color: "var(--ink)",
                          transform:
                            i % 2 === 0 ? "rotate(-0.3deg)" : "rotate(0.3deg)",
                        }}
                      >
                        <div className="flex items-start justify-between mb-5">
                          <div
                            style={{
                              width: 48,
                              height: 48,
                              background: "var(--cream-3)",
                              border: "1px solid var(--border)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {Icon && (
                              <Icon
                                className="w-6 h-6"
                                style={{ color: "var(--terracotta-aa)" }}
                              />
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {tool.isNew && (
                              <span
                                style={{
                                  fontFamily: "var(--font-mono)",
                                  fontSize: 9,
                                  fontWeight: 700,
                                  letterSpacing: "0.12em",
                                  padding: "3px 8px",
                                  background: "var(--terracotta)",
                                  color: "var(--cream)",
                                  borderRadius: 999,
                                }}
                              >
                                NEW
                              </span>
                            )}
                            <ArrowRight
                              className="w-5 h-5 group-hover:translate-x-1 transition-all"
                              style={{ color: "var(--ink-faint)" }}
                            />
                          </div>
                        </div>
                        <h3
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: 22,
                            fontWeight: 600,
                            marginBottom: 12,
                            color: "var(--ink)",
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {tool.name}
                        </h3>
                        <p
                          style={{
                            fontSize: 14,
                            color: "var(--ink-2)",
                            lineHeight: 1.6,
                            marginBottom: 16,
                          }}
                        >
                          {tool.oneLiner}
                        </p>
                        <ToolUsage slug={tool.slug} />
                      </Link>
                    </Reveal>
                  );
                })}
              </div>
            </section>
          );
        })}
      </main>
    </>
  );
}
