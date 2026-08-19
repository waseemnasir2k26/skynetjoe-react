import type { Metadata } from "next";
import Link from "next/link";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { faqSchema, howToSchema, breadcrumbSchema } from "@/lib/schema";
import Linter from "./Linter";
import { ShieldCheck, SearchCheck, Workflow } from "lucide-react";

const PATH = "/tools/n8n-workflow-linter";

export const metadata: Metadata = {
  title: "Free n8n Workflow Linter — Health Check + Node Graph | SkynetJoe",
  description:
    "Paste your n8n workflow JSON, get a rendered node graph and a 20-point health check — hardcoded credentials, missing retry-on-fail, orphan nodes, and more. Free, runs in your browser.",
  alternates: { canonical: `${SITE.url}${PATH}` },
  openGraph: {
    title: "Free n8n Workflow Linter — health check + node graph",
    description:
      "Paste n8n workflow JSON, get a visual node graph and a 20-point health check citing the exact JSON path of every issue.",
    url: `${SITE.url}${PATH}`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free n8n Workflow Linter — health check + node graph",
    description:
      "Paste n8n workflow JSON, get a visual node graph and a 20-point health check.",
  },
};

const faqs = [
  {
    q: "Does this tool upload my workflow JSON anywhere?",
    a: "No. Parsing, the node graph render, and the 20-point health check all run client-side, in your browser. Nothing is sent to a server or stored — refresh the page and it's gone.",
  },
  {
    q: "Where do I get my workflow's JSON to paste in?",
    a: "In n8n, open the workflow, use the three-dot menu → Download (exports the whole workflow as JSON), or select all nodes (Ctrl/Cmd+A) and copy (Ctrl/Cmd+C) — n8n copies the selection as JSON to your clipboard, ready to paste here.",
  },
  {
    q: "What exactly does the 20-point health check look for?",
    a: "Structural and security issues that are cheap to catch before they bite in production: no error-workflow configured, hardcoded API keys/tokens/URLs in node parameters, missing retry-on-fail on HTTP/API nodes, orphaned nodes with no connections, a Webhook node with no authentication, older typeVersions against a known-latest map, empty Code nodes, missing HTTP timeouts, generic/default node names, single-branch IF nodes, unwired Switch outputs, disabled nodes left in, and a handful of other structural sanity checks. Every finding cites the exact JSON path it came from.",
  },
  {
    q: "Is the 'deprecated typeVersion' check pulled from n8n's live registry?",
    a: "No — it's a manually maintained snapshot of common node typeVersions I keep current, not a live API call to n8n's node registry. If a node type isn't in that map, this check simply skips it rather than guessing.",
  },
  {
    q: "Can this fix the issues it finds?",
    a: "It flags them with the exact path and a plain-English explanation — it doesn't auto-patch your workflow. For a hands-on fix pass, book a workflow rescue call and I'll go through it live.",
  },
  {
    q: "Does it work if my workflow has no node positions saved?",
    a: "Yes. If position data is missing, the graph falls back to a left-to-right grid layout so you can still see the node count and connections — just without the original canvas arrangement.",
  },
];

const howToSteps = [
  {
    name: "Export your workflow JSON",
    text: "In n8n, open the workflow and use the three-dot menu → Download, or select all nodes and copy — either gives you the raw workflow JSON.",
  },
  {
    name: "Paste it into the linter",
    text: "Paste the JSON into the text area above (or click 'Load sample workflow' to see it work on a demo first).",
  },
  {
    name: "Read the node graph",
    text: "Nodes render as colored boxes positioned from their real canvas coordinates, connected by the actual connection graph — trigger nodes in green, HTTP/API calls in terracotta, Code nodes in ink, logic nodes in violet.",
  },
  {
    name: "Work through the 20-point health check",
    text: "Each finding is severity-tagged (critical / warning / info) and cites the JSON path it came from, so you can jump straight to the node and parameter that needs fixing.",
  },
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "n8n Workflow Linter",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  url: `${SITE.url}${PATH}`,
  description:
    "Free browser-based tool that renders an n8n workflow's node graph and runs a 20-point health check for security and structural issues, citing the exact JSON path of every finding.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  dateModified: "2026-08-19",
};

export default function N8nWorkflowLinterPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd
        data={faqSchema(faqs.map((f) => ({ question: f.q, answer: f.a })))}
      />
      <JsonLd
        data={howToSchema({
          name: "How to lint and visualize an n8n workflow",
          description:
            "Export your n8n workflow JSON, paste it into the linter, and read the node graph and health check results.",
          steps: howToSteps,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE.url },
          { name: "Tools", url: `${SITE.url}/tools` },
          { name: "n8n Workflow Linter", url: `${SITE.url}${PATH}` },
        ])}
      />

      {/* HERO */}
      <section
        style={{
          position: "relative",
          padding: "96px 0 48px",
          background: "var(--cream-3)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="container-x px-6 relative z-10">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{
                background: "rgba(198,107,63,0.10)",
                border: "1px solid rgba(198,107,63,0.40)",
                color: "var(--terracotta-aa)",
              }}
            >
              <Workflow className="w-3.5 h-3.5" />
              <span className="text-xs font-medium tracking-wider uppercase">
                Free · Runs in your browser · No upload
              </span>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(38px, 6vw, 66px)",
                fontWeight: 500,
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
                color: "var(--ink)",
                marginBottom: 22,
              }}
            >
              Paste your n8n workflow.{" "}
              <span
                style={{
                  background:
                    "linear-gradient(120deg, var(--terracotta) 0%, var(--ink) 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  WebkitTextFillColor: "transparent",
                }}
              >
                See what&apos;s actually wrong with it.
              </span>
            </h1>

            <p
              style={{
                fontSize: 18,
                color: "var(--ink-2)",
                lineHeight: 1.6,
                marginBottom: 14,
                maxWidth: "58ch",
              }}
            >
              Paste any n8n workflow JSON and get a rendered node graph plus a
              20-point health check — hardcoded credentials, missing
              retry-on-fail, orphan nodes, unauthenticated webhooks, and more.
              Every finding cites the exact JSON path it came from.
            </p>
            <p
              style={{
                fontSize: 15,
                color: "var(--ink-2)",
                lineHeight: 1.6,
                maxWidth: "58ch",
              }}
            >
              Nothing is uploaded — parsing, the graph render, and the checklist
              all run in your browser. Updated August 2026.
            </p>
          </div>
        </div>
      </section>

      {/* TOOL */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-4xl mx-auto">
            <Linter />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3 text-center">
              How it works
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-center text-[var(--ink)]">
              Four steps, no signup
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {howToSteps.map((s, i) => (
                <div
                  key={s.name}
                  className="rounded-2xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-5"
                >
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(198,107,63,0.15)] text-xs font-bold text-[var(--terracotta-aa)] mb-2">
                    {i + 1}
                  </span>
                  <h3 className="text-[var(--ink)] font-extrabold mb-1">
                    {s.name}
                  </h3>
                  <p className="text-sm text-[var(--ink-faint)]">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* THE 20 CHECKS TABLE */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-8 md:p-12">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3">
                What gets checked
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6 text-[var(--ink)]">
                Why a workflow that &quot;runs fine&quot; can still be a
                liability
              </h2>
              <div className="space-y-5 text-[var(--ink-2)] leading-relaxed text-base md:text-lg mb-8">
                <p>
                  Most n8n workflows I get called in to fix aren&apos;t broken —
                  they&apos;re working exactly as built, which is the problem. A
                  hardcoded API key sitting in a parameter field, a webhook with
                  no authentication that anyone on the internet can POST to, an
                  HTTP node with no retry that quietly drops a lead every time
                  the target API hiccups for half a second. None of that shows
                  up until it does.
                </p>
                <p>
                  This linter runs the same checklist I go through manually on a
                  client workflow before I&apos;ll sign off on it, condensed
                  into 20 automated checks. It won&apos;t catch business-logic
                  bugs — it can&apos;t know your IF condition is testing the
                  wrong field — but it will catch the structural and security
                  issues that are cheap to fix now and expensive to debug in
                  production.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="text-left border-b border-[rgba(26,26,26,0.15)]">
                      <th className="py-2 pr-4 font-bold text-[var(--ink)]">
                        Check
                      </th>
                      <th className="py-2 pr-4 font-bold text-[var(--ink)]">
                        Default severity
                      </th>
                      <th className="py-2 font-bold text-[var(--ink)]">
                        Why it matters
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-[var(--ink-2)]">
                    {[
                      [
                        "Error workflow configured",
                        "Warning",
                        "No fallback when an execution fails",
                      ],
                      [
                        "Hardcoded credentials/tokens",
                        "Critical",
                        "Secrets leak if the JSON is shared",
                      ],
                      [
                        "Credentials embedded in URLs",
                        "Critical",
                        "Same leak risk, easy to miss",
                      ],
                      [
                        "Webhook without authentication",
                        "Critical",
                        "Anyone with the URL can trigger it",
                      ],
                      [
                        "Retry-on-fail on HTTP/API nodes",
                        "Warning",
                        "One flaky call kills the run",
                      ],
                      [
                        "HTTP timeout set",
                        "Info",
                        "A hung call can stall the whole workflow",
                      ],
                      [
                        "Orphan/disconnected nodes",
                        "Warning",
                        "Dead weight that never executes",
                      ],
                      [
                        "Empty Code nodes",
                        "Critical",
                        "Errors or silently no-ops at runtime",
                      ],
                      [
                        "Deprecated typeVersion",
                        "Info",
                        "Running an older node version than current",
                      ],
                      [
                        "Single-branch IF nodes",
                        "Info",
                        "The unwired branch dead-ends silently",
                      ],
                    ].map((row) => (
                      <tr
                        key={row[0]}
                        className="border-b border-[rgba(26,26,26,0.08)]"
                      >
                        <td className="py-2.5 pr-4 font-semibold text-[var(--ink)]">
                          {row[0]}
                        </td>
                        <td className="py-2.5 pr-4">{row[1]}</td>
                        <td className="py-2.5">{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-3 text-xs text-[var(--ink-faint)]">
                  10 of the 20 checks shown — the rest cover node naming, Switch
                  fallback branches, disabled nodes, and workflow-level
                  structure. Full list runs live in the tool above.
                </p>
              </div>
              <p className="mt-6 text-sm text-[var(--ink-faint)]">
                Waseem, building from Bali · info@skynetjoe.com · Updated August
                2026
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MORE TOOLS */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3 text-center">
              Keep going
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-center text-[var(--ink)]">
              Related free tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                href="/tools/n8n-workflow-generator"
                className="rounded-2xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-5 transition hover:border-[var(--terracotta)]/50"
              >
                <Workflow className="h-5 w-5 text-[var(--terracotta-aa)] mb-2" />
                <h3 className="text-[var(--ink)] font-extrabold mb-1">
                  n8n Workflow Generator
                </h3>
                <p className="text-sm text-[var(--ink-faint)]">
                  Pick a trigger and action, get an importable workflow JSON.
                </p>
              </Link>
              <Link
                href="/tools/webhook-payload-builder"
                className="rounded-2xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-5 transition hover:border-[var(--terracotta)]/50"
              >
                <ShieldCheck className="h-5 w-5 text-[var(--terracotta-aa)] mb-2" />
                <h3 className="text-[var(--ink)] font-extrabold mb-1">
                  Webhook Payload Builder
                </h3>
                <p className="text-sm text-[var(--ink-faint)]">
                  Build and validate a JSON payload before you wire the
                  automation.
                </p>
              </Link>
              <Link
                href="/tools/automation-gap-analyzer"
                className="rounded-2xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-5 transition hover:border-[var(--terracotta)]/50"
              >
                <SearchCheck className="h-5 w-5 text-[var(--terracotta-aa)] mb-2" />
                <h3 className="text-[var(--ink)] font-extrabold mb-1">
                  Automation Gap Analyzer
                </h3>
                <p className="text-sm text-[var(--ink-faint)]">
                  Find where your ops lose time and money before you build.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3 text-center">
              Quick answers
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-center text-[var(--ink)]">
              Honest FAQ
            </h2>
            <div className="space-y-3">
              {faqs.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-2xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] px-5 py-4 transition open:bg-[var(--cream-2)]"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-[var(--ink)] font-semibold list-none">
                    <span>{f.q}</span>
                    <span className="text-[var(--terracotta-aa)] transition group-open:rotate-45 text-xl leading-none">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm md:text-base text-[var(--ink-2)] leading-relaxed">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DISCOVERY CTA */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-3xl mx-auto text-center rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-10 md:p-14">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3 text-[var(--ink)]">
              Found more red than you expected?
            </h2>
            <p className="text-[var(--ink-2)] mb-6 max-w-xl mx-auto">
              A workflow rescue call gets the critical items fixed live, on a
              screen-share, plus a second pass on the rest.
            </p>
            <Link
              href="/services/n8n-automation"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-semibold text-[var(--cream-3)] shadow-lg transition-transform hover:scale-[1.02] sm:text-base"
              style={{
                background: "var(--terracotta)",
                boxShadow: "0 10px 32px rgba(198,107,63,0.25)",
              }}
            >
              Book a workflow rescue call
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
