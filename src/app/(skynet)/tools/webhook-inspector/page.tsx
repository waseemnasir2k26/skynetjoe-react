import type { Metadata } from "next";
import Link from "next/link";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { howToSchema } from "@/lib/schema";
import Inspector from "./Inspector";
import { RadioTower, Webhook, Workflow, ArrowRight } from "lucide-react";

const PATH = "/tools/webhook-inspector";

export const metadata: Metadata = {
  title: "Free Webhook Inspector — Test & Debug Webhooks Live | SkynetJoe",
  description:
    "Get a unique URL, point any webhook at it, and watch the real request — method, headers, query, body — show up live. Then generate the matching n8n Webhook node. Free, no signup.",
  alternates: { canonical: `${SITE.url}${PATH}` },
  openGraph: {
    title: "Webhook Inspector · live request-bin + n8n node generator",
    description:
      "A unique capture URL, the real payload live in your browser, and one click to a ready-to-import n8n Webhook node.",
    url: `${SITE.url}${PATH}`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Webhook Inspector · free, live, no signup",
    description:
      "Point any webhook at a unique URL and watch the real request show up live — then generate the n8n node for it.",
  },
};

const faqs = [
  {
    q: "How long do bins last?",
    a: "24 hours from creation, and that's the honest ceiling — not a guarantee. This tool runs as a single Node process with in-memory storage, the same way the rest of skynetjoe.com's live tools do. If the server restarts (a deploy, a crash, routine maintenance), every bin clears immediately, well before 24 hours. Don't point a production webhook here and walk away — it's for debugging in the moment, not for durable delivery.",
  },
  {
    q: "Is this safe to point a real webhook at?",
    a: 'For testing and debugging, yes. For anything carrying real secrets, be careful: cookie and authorization header VALUES are redacted to "[redacted]" before they\'re ever stored, and the raw body is capped at 64KB, but the rest of the payload — including whatever fields your app sends — is stored as-is and shown in your browser tab. Treat it like any other request-bin tool: fine for shape-checking a Stripe or GHL test event, not for piping production PII through.',
  },
  {
    q: "Who can see my captured requests?",
    a: "Only whoever has your bin's URL. The bin ID is a 96-bit random token — unguessable by brute force — and that ID is the only access control; there's no login. Anyone you share the capture URL with can also see what lands in it, same as any request-bin tool.",
  },
  {
    q: "Why does it poll every 2.5 seconds instead of using a websocket?",
    a: "Simplicity and reliability on a single Node process without a pub/sub layer. Short-polling every 2.5s is close enough to real time for debugging a webhook, costs nothing extra to run, and pauses automatically when you switch tabs so it isn't hammering the server in the background.",
  },
  {
    q: 'What does "Generate n8n node" actually produce?',
    a: "An importable n8n workflow JSON snippet: a Webhook node pre-configured with the captured request's HTTP method and a placeholder path, plus a Set node that maps the top-level fields from the captured body. Paste it into n8n via Workflows → Import from File (or paste-as-JSON) and you have a working starting point instead of a blank canvas. No credentials are ever embedded.",
  },
  {
    q: "Does this replace webhook.site or RequestBin?",
    a: "For a quick shape check while wiring an n8n workflow, this tool does the same core job — plus the n8n node generation those tools don't offer. It doesn't replace a dedicated, always-on request-bin service for long-running integrations: this one is explicitly ephemeral (see the 24-hour / restart-clears-it answer above), because it's running on the same single Node process as the rest of this site, not a dedicated queue-backed service.",
  },
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Webhook Inspector",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  url: `${SITE.url}${PATH}`,
  description:
    "Free live request-bin: get a unique URL, point any webhook at it, watch the real request (method, headers, query, body) show up live, and generate a matching n8n Webhook node.",
  offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
  dateModified: "2026-08-19",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const howTo = howToSchema({
  name: "How to inspect a webhook live",
  description:
    "Create a unique capture URL, point a webhook at it, and read the real request as it arrives.",
  steps: [
    {
      name: "Create a bin",
      text: "Click Create my bin. You get a unique, unguessable capture URL immediately — nothing to sign up for.",
    },
    {
      name: "Point your webhook at the URL",
      text: "Paste the capture URL into whatever's sending the webhook — a GHL automation, a Stripe endpoint, an n8n Webhook node's test URL, or a curl command.",
    },
    {
      name: "Fire the event",
      text: 'Trigger the real event, or use the built-in "Send test request" button to confirm the loop works before wiring the real integration.',
    },
    {
      name: "Read the captured request",
      text: "The page polls every 2.5 seconds and shows method, headers, query params, and the pretty-printed body for every request as it arrives.",
    },
    {
      name: "Generate the n8n node",
      text: "Click Generate n8n node on any captured request to get an importable Webhook + Set node JSON pre-mapped to the fields you just saw.",
    },
  ],
});

const comparisonRows: [string, string, string][] = [
  ["Price", "Free, no signup", "Free tier + paid plans"],
  [
    "Bin lifetime",
    "24h, or until the server restarts (stated up front)",
    "Longer-lived, dedicated service",
  ],
  ["n8n node generation", "Yes — one click from any captured request", "No"],
  [
    "Header redaction",
    "Cookie/Authorization values redacted automatically",
    "Shown as received",
  ],
  [
    "Best for",
    "Debugging one integration you're actively wiring right now",
    "Long-running or team-shared inspection",
  ],
];

export default function WebhookInspectorPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={howTo} />

      {/* HERO */}
      <section
        style={{
          padding: "96px 0 48px",
          background: "var(--cream-3)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="container-x px-6">
          <Breadcrumbs
            bare
            items={[
              { label: "Tools", href: "/tools" },
              { label: "Webhook Inspector" },
            ]}
          />
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{
                background: "rgba(198,107,63,0.10)",
                border: "1px solid rgba(198,107,63,0.40)",
                color: "var(--terracotta-aa)",
              }}
            >
              <RadioTower className="w-3.5 h-3.5" />
              <span className="text-xs font-medium tracking-wider uppercase">
                Free · Live capture · No signup
              </span>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(38px, 6vw, 64px)",
                fontWeight: 500,
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
                color: "var(--ink)",
                marginBottom: 22,
              }}
            >
              Point any webhook here{" "}
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
                — see the real payload, instantly.
              </span>
            </h1>

            <p
              style={{
                fontSize: 18,
                color: "var(--ink-2)",
                lineHeight: 1.6,
                marginBottom: 8,
                maxWidth: "58ch",
              }}
            >
              Create a unique capture URL, point any webhook at it, and watch
              the actual request — method, headers, query, body — land here live
              within a couple of seconds. Then generate the matching n8n Webhook
              node in one click, so you go straight from &quot;what does this
              payload look like&quot; to a working node.
            </p>
            <p className="text-sm" style={{ color: "var(--ink-faint)" }}>
              Updated August 2026
            </p>
          </div>
        </div>
      </section>

      {/* TOOL */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-4xl mx-auto">
            <Inspector />
          </div>
        </div>
      </section>

      {/* WHY THIS EXISTS + BODY COPY */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-8 md:p-12">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3">
                Why this tool exists
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6 text-[var(--ink)]">
                &quot;What does this webhook actually send&quot; is the first
                question in every automation build, and vendor docs almost never
                answer it precisely.
              </h2>
              <div className="space-y-5 text-[var(--ink-2)] leading-relaxed text-base md:text-lg">
                <p>
                  Every n8n, Zapier, or Make workflow that starts on a webhook
                  has the same first step: fire the real event and look at what
                  actually arrives. Field names drift from what the docs show.
                  Nested objects show up where the docs implied a flat shape.
                  Optional fields are sometimes present and sometimes not. You
                  can guess at all of this from documentation, or you can just
                  watch it happen once.
                </p>
                <p>
                  This tool gives you a unique capture URL the moment you load
                  the page — no account, no API key. Point the real integration
                  at it (GHL, Stripe, Calendly, a custom app, whatever), or hit
                  the built-in test-fire button to confirm the loop works first.
                  Every request that lands is redacted for anything that looks
                  like a secret — cookie and authorization header values never
                  make it past the capture endpoint — and shown here within a
                  couple of seconds.
                </p>
                <p>
                  The part most request-bin tools stop short of: once you can
                  see the real shape of the payload, this tool generates the
                  matching n8n Webhook node plus a Set node pre-mapped to the
                  fields you just captured, ready to import. You go from &quot;I
                  wonder what this sends&quot; to a working starting node in the
                  same tab.
                </p>
                <p>
                  Pair it with the{" "}
                  <Link
                    href="/tools/webhook-payload-builder"
                    className="font-semibold text-[var(--terracotta-aa)] hover:underline"
                  >
                    Webhook Payload Builder
                  </Link>{" "}
                  when you need a sample shape before a real event exists yet,
                  and the{" "}
                  <Link
                    href="/tools/n8n-workflow-generator"
                    className="font-semibold text-[var(--terracotta-aa)] hover:underline"
                  >
                    n8n Workflow Generator
                  </Link>{" "}
                  once you know what the trigger looks like and need the rest of
                  the chain.
                </p>
              </div>
              <p className="mt-6 text-sm text-[var(--ink-faint)]">
                Waseem, building from Bali · info@skynetjoe.com
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3 text-center">
              Comparison
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-center text-[var(--ink)]">
              Webhook Inspector vs. webhook.site
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-[rgba(26,26,26,0.12)]">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr
                    className="text-[11px] uppercase tracking-wider text-[var(--ink-faint)]"
                    style={{ background: "var(--cream-3)" }}
                  >
                    <th className="px-4 py-3 font-semibold">Feature</th>
                    <th className="px-4 py-3 font-semibold">
                      Webhook Inspector
                    </th>
                    <th className="px-4 py-3 font-semibold">webhook.site</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr
                      key={row[0]}
                      className={
                        i % 2 === 0
                          ? "border-t border-[rgba(26,26,26,0.08)]"
                          : "border-t border-[rgba(26,26,26,0.08)] bg-[var(--cream-3)]"
                      }
                    >
                      {row.map((cell) => (
                        <td
                          key={cell}
                          className="px-4 py-3 text-[var(--ink-2)]"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-[var(--ink-faint)]">
              Feature comparison based on webhook.site&apos;s publicly
              documented free tier as of August 2026. Verify current details on
              their site — third-party pricing and features change.
            </p>
          </div>
        </div>
      </section>

      {/* CROSS-LINKS */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: Webhook,
                href: "/tools/webhook-payload-builder",
                label: "Webhook Payload Builder",
                desc: "Build a sample payload before a real event exists.",
              },
              {
                icon: Workflow,
                href: "/tools/n8n-workflow-generator",
                label: "n8n Workflow Generator",
                desc: "Turn the trigger you just saw into a full workflow.",
              },
              {
                icon: ArrowRight,
                href: "/services/n8n-automation",
                label: "Get the integration built for you",
                desc: "Have a real webhook to wire end to end? Let's scope it.",
              },
            ].map(({ icon: Icon, href, label, desc }) => (
              <Link
                key={href}
                href={href}
                className="group rounded-2xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-5 transition hover:border-[var(--terracotta)]/50"
              >
                <Icon className="w-5 h-5 text-[var(--terracotta-aa)] mb-3" />
                <div className="text-[var(--ink)] font-bold mb-1">{label}</div>
                <p className="text-sm text-[var(--ink-faint)] leading-relaxed">
                  {desc}
                </p>
              </Link>
            ))}
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
                  className="group rounded-2xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] px-5 py-4 transition"
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
    </>
  );
}
