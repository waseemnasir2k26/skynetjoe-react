import type { Metadata } from "next";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Builder from "./Builder";
import { Sparkles, Timer, ShieldCheck, FileText } from "lucide-react";

const PATH = "/tools/voice-persona-builder";
const CAL_URL =
  "https://calendly.com/skynetlabs/schedule-a-free-consultation?utm_source=voice-persona-builder";

export const metadata: Metadata = {
  title:
    "Brand Voice Persona Builder — paste-ready system prompt for Claude + ChatGPT",
  description:
    "Free 4-step brand voice builder. Identity, tone sliders, vocabulary, examples. Outputs a paste-ready Brand Voice Profile + AI system prompt. Enter your email to unlock the result.",
  alternates: { canonical: `${SITE.url}${PATH}` },
  openGraph: {
    title:
      "Brand Voice Persona Builder · paste-ready system prompt for AI assistants",
    description:
      "4 steps. 8 tone sliders. One downloadable Brand Voice Profile + system prompt. Free. Email to unlock.",
    url: `${SITE.url}${PATH}`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brand Voice Persona Builder · SkynetLabs",
    description:
      "Build a paste-ready Brand Voice Profile in 4 steps. Free. Email to unlock.",
  },
};

const faqs = [
  {
    q: "What do I actually get at the end?",
    a: "A 500–800 word Brand Voice Profile you can paste straight into Claude, ChatGPT, Gemini or any other LLM as a system prompt. It includes a persona summary, an 8-axis tone matrix, your do-and-don't vocabulary, 5 sample sentence rewrites in your voice, and a clean copy-paste block at the bottom. You can also download it as a .md file.",
  },
  {
    q: "Is anything sent to a server?",
    a: "Your inputs and the generated profile are built entirely in your browser and saved to localStorage so you can return to a half-finished session — none of that leaves the page. The only thing sent to my CRM is the email you enter to unlock the finished profile.",
  },
  {
    q: "How do I actually use the output?",
    a: "Open Claude or ChatGPT, start a new chat, paste the generated profile as the first message, then ask for whatever copy you need — landing-page hero, email sequence, LinkedIn carousel. The model will write in the voice you described instead of its own default. Update the profile any time your positioning shifts.",
  },
  {
    q: "Why 8 tone sliders specifically?",
    a: "Formal–casual and serious–playful capture register. Reserved–bold and traditional–innovative capture stance. Detailed–concise and friendly–authoritative capture posture. Optimistic–realistic and universal–niche capture worldview. Eight axes is enough to encode a real voice without making the form feel like a survey.",
  },
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Brand Voice Persona Builder",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${SITE.url}${PATH}`,
  description:
    "Free 4-step web tool that generates a Brand Voice Profile document and AI system prompt from identity, 8 tone sliders, vocabulary lists and writing samples.",
  offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
  provider: {
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.brand,
    url: SITE.url,
  },
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

const heroStats = [
  { icon: Timer, label: "4 steps", body: "About 5 minutes end-to-end." },
  {
    icon: ShieldCheck,
    label: "Email to unlock",
    body: "Inputs stay local. Email unlocks the profile.",
  },
  {
    icon: FileText,
    label: ".md export",
    body: "Copy or download a paste-ready profile.",
  },
];

export default function VoicePersonaBuilderPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />

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
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-xs font-medium tracking-wider uppercase">
                Free builder · Email to unlock
              </span>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(42px, 6.5vw, 72px)",
                fontWeight: 500,
                letterSpacing: "-0.025em",
                lineHeight: 1.04,
                color: "var(--ink)",
                marginBottom: 22,
              }}
            >
              Your brand voice,{" "}
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
                pasted into Claude.
              </span>
            </h1>

            <p
              style={{
                fontSize: 18,
                color: "var(--ink-2)",
                lineHeight: 1.6,
                marginBottom: 14,
                maxWidth: "52ch",
              }}
            >
              Four steps. Identity, eight tone sliders, vocabulary, examples.
              Spits out a paste-ready Brand Voice Profile and system prompt your
              AI of choice will actually obey.
            </p>
            <p
              style={{
                fontSize: 15,
                color: "var(--ink-2)",
                lineHeight: 1.6,
                maxWidth: "52ch",
              }}
            >
              Stop re-explaining your voice in every prompt. Build it once,
              paste it forever.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
              {heroStats.map(({ icon: Icon, label, body }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] px-4 py-3"
                >
                  <div className="flex items-center gap-2 text-[var(--ink)]">
                    <Icon className="w-4 h-4 text-[var(--terracotta-aa)]" />
                    <span className="text-sm font-semibold">{label}</span>
                  </div>
                  <p className="mt-1 text-xs text-[var(--ink-faint)] leading-relaxed">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BUILDER (client) */}
      <section className="section">
        <div className="container-x px-6">
          <div className="max-w-4xl mx-auto">
            <Builder calUrl={CAL_URL} />
          </div>
        </div>
      </section>

      {/* WHY THIS */}
      <section className="section pt-0">
        <div className="container-x px-6">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-3xl border border-[rgba(26,26,26,0.12)] bg-[var(--cream-2)] p-8 md:p-12 backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3">
                Why this builder exists
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-6 text-[var(--ink)]">
                Generic LLM output sounds like generic LLM output.
              </h2>
              <div className="space-y-5 text-[var(--ink-2)] leading-relaxed text-base md:text-lg">
                <p>
                  I write 30+ pieces of client copy a week from a co-working
                  spot in Bali. Every one of them needs to sound like the
                  client, not like me, and definitely not like Claude&apos;s
                  default voice.
                </p>
                <p>
                  After the 40th time of rebuilding a voice doc from scratch, I
                  made this. Four steps, eight axes, three example fields. The
                  model behaves because the profile leaves it no wiggle room —
                  what to say, what to avoid, and what good actually looks like.
                </p>
                <p>
                  Build yours, paste it once, and watch every email, page and
                  post sound like the same brand wrote it.
                </p>
              </div>
              <p className="mt-6 text-sm text-[var(--ink-faint)]">
                Waseem, building from Bali · info@skynetjoe.com
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section pt-0">
        <div className="container-x px-6">
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
    </>
  );
}
