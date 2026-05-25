import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Generator from "./Generator";
import { Sparkles, Film, Layers, Zap } from "lucide-react";

const PATH = "/tools/video-prompt-generator";

export const metadata: Metadata = {
  title:
    "Video Prompt Generator — Runway, Pika, Sora & Veo prompts in one click · SkynetLabs",
  description:
    "Free AI video prompt builder. Pick a subject, camera, mood, lighting, duration. Get production-ready prompts in 4 formats — Runway, Pika, Sora, Veo. Copy + ship.",
  alternates: { canonical: `${SITE.url}${PATH}` },
  openGraph: {
    title:
      "Video Prompt Generator · Runway, Pika, Sora, Veo in one click",
    description:
      "Generate AI video prompts in 4 formats side-by-side. Free, no email gate. Built for creators who ship.",
    url: `${SITE.url}${PATH}`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Video Prompt Generator · 4 formats, one click",
    description:
      "Runway. Pika. Sora. Veo. Build prompts side-by-side. Free, no signup.",
  },
};

const faqs = [
  {
    q: "Which AI video tool should I use?",
    a: "Runway Gen-3 is best for verbose control over camera moves and technical params. Pika is fastest and best for short motion-driven loops. Sora handles cinematic scenes with character continuity. Veo is Google's tuned model — good for structured prompts. The generator builds for all four side-by-side so you can paste into whichever you're using today.",
  },
  {
    q: "Are these prompts production-ready?",
    a: "They're production-starting-points. The 4 formats each use the conventions that model responds to — Pika takes --ar and --motion flags, Veo prefers structured key:value, Sora prefers narrative description, Runway likes technical params. You'll still iterate, but you're starting from format-native scaffolding instead of plain text.",
  },
  {
    q: "Why are there 4 outputs for the same input?",
    a: "Because each model parses prompts differently. The same scene description that gets you a banger in Sora often produces sludge in Pika. The generator composes the same intent in each model's native voice — verbose technical for Runway, motion-tagged for Pika, narrative for Sora, structured for Veo.",
  },
  {
    q: "Does saving history send anything to a server?",
    a: "No. History lives in your browser's localStorage. Nothing leaves your device. Clear it any time, or clear it automatically when you clear browser data.",
  },
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SkynetLabs Video Prompt Generator",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Web",
  url: `${SITE.url}${PATH}`,
  description:
    "Free interactive prompt builder for AI video generation. Composes the same scene description in 4 model-native formats — Runway Gen-3, Pika, Sora, and Veo — side-by-side with one-click copy.",
  offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
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
  {
    icon: Film,
    label: "4 formats",
    body: "Runway, Pika, Sora, Veo side-by-side.",
  },
  {
    icon: Layers,
    label: "8 inputs",
    body: "Subject, camera, mood, lighting, more.",
  },
  {
    icon: Zap,
    label: "0 backend",
    body: "Pure client-side. Instant. Anonymous.",
  },
];

export default function VideoPromptGeneratorPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />

      {/* HERO */}
      <section
        style={{ position: "relative", padding: "96px 0 48px", background: "var(--cream-3)", borderBottom: "1px solid var(--border)" }}
      >
        <div className="container-x px-6 relative z-10">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{
                background: "rgba(94, 234, 212, 0.14)",
                border: "1px solid rgba(94, 234, 212, 0.40)",
                color: "#5eead4",
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-xs font-medium tracking-wider uppercase">
                Free · No email gate
              </span>
            </div>

            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(42px, 6.5vw, 72px)", fontWeight: 500, letterSpacing: "-0.025em", lineHeight: 1.04, color: "var(--ink)", marginBottom: 22 }}>
              One scene.{" "}
              <span
                style={{
                  background:
                    "linear-gradient(120deg, #7ee4ff 0%, #5eead4 50%, #fde68a 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Four formats.
              </span>
            </h1>

            <p style={{ fontSize: 18, color: "var(--ink-2)", lineHeight: 1.6, marginBottom: 14, maxWidth: "52ch" }}>
              Pick your subject, camera move, mood, lighting, duration, style
              and aspect ratio. The generator composes the same scene in 4
              model-native formats — Runway, Pika, Sora, Veo — so you paste
              into whichever you&apos;re running today.
            </p>
            <p style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.6, maxWidth: "52ch" }}>
              Each format speaks the model&apos;s native voice. Pika gets
              motion tags. Runway gets technical params. Sora gets
              cinematographic narration. Veo gets structured key:value.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
              {heroStats.map(({ icon: Icon, label, body }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <div className="flex items-center gap-2 text-white">
                    <Icon className="w-4 h-4 text-cyan-300" />
                    <span className="text-sm font-semibold">{label}</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-400 leading-relaxed">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GENERATOR */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-6xl mx-auto">
            <Generator />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3 text-center">
              Quick answers
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-center text-white">
              Honest FAQ
            </h2>
            <div className="space-y-3">
              {faqs.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition open:bg-white/8"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-white font-semibold list-none">
                    <span>{f.q}</span>
                    <span className="text-cyan-300 transition group-open:rotate-45 text-xl leading-none">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm md:text-base text-gray-300 leading-relaxed">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-4xl mx-auto">
            <div
              className="rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
              }}
            >
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
                Want a full AI video pipeline, not just prompts?
              </h2>
              <p className="text-base md:text-lg text-white/90 mb-6 max-w-2xl mx-auto">
                Generating prompts is step one. We build n8n pipelines that
                pump 30+ AI-generated reels a month into your social channels
                on autopilot. Book a call.
              </p>
              <a
                href="https://cal.com/waseemnasir/strategy?source=video-prompt-generator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-cyan-50 transition"
              >
                Book a strategy call
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
