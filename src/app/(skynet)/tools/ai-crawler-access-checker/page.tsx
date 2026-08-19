import type { Metadata } from "next";
import Link from "next/link";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { faqSchema, howToSchema, breadcrumbSchema } from "@/lib/schema";
import Checker from "./Checker";
import { TARGET_BOTS } from "./parse";
import { FileCode2, Radar, SearchCheck, Shield } from "lucide-react";

const PATH = "/tools/ai-crawler-access-checker";

export const metadata: Metadata = {
  title:
    "Free AI Crawler Access Checker — GPTBot, ClaudeBot & More | SkynetJoe",
  description:
    "Enter a domain, get a real robots.txt parse showing exactly which AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended and more) are allowed, blocked, or partially blocked — plus an llms.txt check.",
  alternates: { canonical: `${SITE.url}${PATH}` },
  openGraph: {
    title:
      "Free AI Crawler Access Checker — is your site blocking GPTBot/ClaudeBot?",
    description:
      "Real robots.txt parse against 10 named AI crawlers, plus an llms.txt presence + quality check.",
    url: `${SITE.url}${PATH}`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Crawler Access Checker",
    description:
      "See exactly which AI crawlers your robots.txt allows, blocks, or partially blocks.",
  },
};

const faqs = [
  {
    q: "Where does the verdict data come from?",
    a: "It's a real fetch and parse of your site's actual /robots.txt (and /llms.txt), done over a server-side proxy so the browser can read a cross-origin file. Nothing here is a lookup table or a guess — the ALLOWED/BLOCKED/PARTIAL verdict is computed from the User-agent groups and Allow/Disallow rules actually present in your file.",
  },
  {
    q: "Why check these 10 specific bots?",
    a: "GPTBot and OAI-SearchBot (OpenAI), ChatGPT-User (ChatGPT's live browsing), ClaudeBot and Claude-SearchBot/anthropic-ai (Anthropic), PerplexityBot, Google-Extended (Gemini/AI Overviews training), Bytespider (ByteDance), CCBot (Common Crawl — feeds many other models' training sets), and Applebot-Extended (Apple Intelligence) are the named user-agents the major AI platforms document publicly for crawling and/or training.",
  },
  {
    q: "What does PARTIAL mean?",
    a: "The bot isn't blocked at the root (no blanket Disallow: /), but specific paths are disallowed for it — for example /wp-admin/ or /private/. The tool lists exactly which paths from your real robots.txt triggered that.",
  },
  {
    q: "My robots.txt has no rules for these bots at all — what's the verdict?",
    a: "If there's no matching User-agent group and no wildcard (User-agent: *) group either, the verdict is ALLOWED — that's how robots.txt actually works: no rule means no restriction. If the file itself doesn't exist or didn't return HTTP 200, that's shown separately as 'No robots.txt'.",
  },
  {
    q: "Is having an llms.txt file required?",
    a: "No — it's an emerging, non-standardized convention (not an official web standard) that some AI platforms may use to understand a site's structure. This checker reports whether one exists and does a basic structural sanity check (H1, sections, links), not a compliance grade against a spec that doesn't formally exist yet.",
  },
  {
    q: "If a crawler is blocked, does that mean I'll never appear in ChatGPT or Claude answers?",
    a: "Not necessarily — some answer engines browse live (like ChatGPT-User) even when the training crawler (GPTBot) is blocked, and citations can come from crawled/indexed pages elsewhere. But a blocked crawler is still a deliberate signal you should be making on purpose, not by an inherited robots.txt nobody's looked at.",
  },
];

const howToSteps = [
  {
    name: "Enter your domain",
    text: "Type the bare domain or full URL — the tool normalizes it to https://yourdomain.com automatically.",
  },
  {
    name: "Read the robots.txt table",
    text: "Each of the 10 tracked AI crawlers gets a real ALLOWED / BLOCKED / PARTIAL verdict, which User-agent group matched, and the exact blocked paths if any.",
  },
  {
    name: "Check the llms.txt panel",
    text: "See whether the file exists and whether it has the basic structure (H1, sections, links) the emerging convention expects.",
  },
  {
    name: "Fix what's blocking you on purpose",
    text: "If a bot you actually want indexing/citing your content is blocked, that's a one-line robots.txt fix — or use the llms.txt Generator and AEO Audit tools linked below.",
  },
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AI Crawler Access Checker",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  url: `${SITE.url}${PATH}`,
  description:
    "Free tool that fetches and parses a domain's real robots.txt to show ALLOWED/BLOCKED/PARTIAL access for 10 named AI crawlers, plus an llms.txt presence and structure check.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function AiCrawlerAccessCheckerPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd
        data={faqSchema(faqs.map((f) => ({ question: f.q, answer: f.a })))}
      />
      <JsonLd
        data={howToSchema({
          name: "How to check which AI crawlers can access your site",
          description:
            "Enter a domain, read the real robots.txt verdict per AI crawler, and check for an llms.txt file.",
          steps: howToSteps,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE.url },
          { name: "Tools", url: `${SITE.url}/tools` },
          { name: "AI Crawler Access Checker", url: `${SITE.url}${PATH}` },
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
              <Radar className="w-3.5 h-3.5" />
              <span className="text-xs font-medium tracking-wider uppercase">
                Free · {TARGET_BOTS.length} AI crawlers checked · Real parse,
                not a guess
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
              Is your robots.txt{" "}
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
                quietly blocking ChatGPT and Claude?
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
              Enter a domain and this tool fetches its real robots.txt, then
              parses it per AI crawler — GPTBot, ClaudeBot, PerplexityBot,
              Google-Extended, and six more — so you see exactly which ones are
              allowed, blocked, or partially blocked, and why.
            </p>
            <p
              style={{
                fontSize: 15,
                color: "var(--ink-2)",
                lineHeight: 1.6,
                maxWidth: "58ch",
              }}
            >
              Plus a check for /llms.txt — presence and basic structure. Updated
              August 2026.
            </p>
          </div>
        </div>
      </section>

      {/* TOOL */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-4xl mx-auto">
            <Checker />
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
              Four steps, one real fetch
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

      {/* WHY THIS MATTERS */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-8 md:p-12">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3">
                Why robots.txt matters for AEO
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6 text-[var(--ink)]">
                Most blocked bots aren&apos;t a decision — they&apos;re an
                accident
              </h2>
              <div className="space-y-5 text-[var(--ink-2)] leading-relaxed text-base md:text-lg mb-8">
                <p>
                  A lot of robots.txt files were written years before GPTBot or
                  ClaudeBot existed, then copy-pasted from a boilerplate or a
                  WordPress security plugin that blanket-blocked every unknown
                  crawler as a precaution. That&apos;s a reasonable default for
                  scrapers — it&apos;s not a reasonable default anymore for a
                  domain that wants to show up when someone asks ChatGPT or
                  Claude about it.
                </p>
                <p>
                  The fix isn&apos;t &quot;unblock everything.&quot;
                  Google-Extended specifically controls Gemini/AI Overviews
                  training, separate from regular Googlebot indexing — you can
                  keep normal SEO crawling on and still opt a site out of AI
                  training. The point of this tool is visibility into what your
                  file actually says, per bot, so the decision is deliberate.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="text-left border-b border-[rgba(26,26,26,0.15)]">
                      <th className="py-2 pr-4 font-bold text-[var(--ink)]">
                        Crawler
                      </th>
                      <th className="py-2 font-bold text-[var(--ink)]">
                        What it&apos;s for
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-[var(--ink-2)]">
                    {TARGET_BOTS.map((b) => (
                      <tr
                        key={b.ua}
                        className="border-b border-[rgba(26,26,26,0.08)]"
                      >
                        <td className="py-2.5 pr-4 font-mono text-xs font-semibold text-[var(--ink)]">
                          {b.ua}
                        </td>
                        <td className="py-2.5">
                          {b.label.split("—")[1]?.trim() || b.label}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                href="/tools/aeo-audit"
                className="rounded-2xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-5 transition hover:border-[var(--terracotta)]/50"
              >
                <SearchCheck className="h-5 w-5 text-[var(--terracotta-aa)] mb-2" />
                <h3 className="text-[var(--ink)] font-extrabold mb-1">
                  AEO Audit
                </h3>
                <p className="text-sm text-[var(--ink-faint)]">
                  Score any URL on how well AI answer engines can read and cite
                  it.
                </p>
              </Link>
              <Link
                href="/tools/llms-txt-generator"
                className="rounded-2xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-5 transition hover:border-[var(--terracotta)]/50"
              >
                <FileCode2 className="h-5 w-5 text-[var(--terracotta-aa)] mb-2" />
                <h3 className="text-[var(--ink)] font-extrabold mb-1">
                  llms.txt Generator
                </h3>
                <p className="text-sm text-[var(--ink-faint)]">
                  Generate a valid llms.txt so AI crawlers know what your site
                  is.
                </p>
              </Link>
              <Link
                href="/tools/chatgpt-visibility-grader"
                className="rounded-2xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-5 transition hover:border-[var(--terracotta)]/50"
              >
                <Shield className="h-5 w-5 text-[var(--terracotta-aa)] mb-2" />
                <h3 className="text-[var(--ink)] font-extrabold mb-1">
                  ChatGPT Visibility Grader
                </h3>
                <p className="text-sm text-[var(--ink-faint)]">
                  See how your brand shows up (or doesn&apos;t) across AI chat
                  answers.
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
              Found bots blocked that shouldn&apos;t be?
            </h2>
            <p className="text-[var(--ink-2)] mb-6 max-w-xl mx-auto">
              A short AEO fix plan covers robots.txt, llms.txt, and the schema
              markup that actually gets you cited.
            </p>
            <Link
              href="/services/n8n-automation"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-semibold text-[var(--cream-3)] shadow-lg transition-transform hover:scale-[1.02] sm:text-base"
              style={{
                background: "var(--terracotta)",
                boxShadow: "0 10px 32px rgba(198,107,63,0.25)",
              }}
            >
              Book a discovery call
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
