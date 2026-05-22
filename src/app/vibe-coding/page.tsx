import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import {
  Brain,
  Rocket,
  Code2,
  FileCode,
  Sparkles,
  Coffee,
  Send,
  Users,
  Eye,
  Globe,
  ArrowRight,
  Mail,
  Calendar,
  Zap,
  Wrench,
  Layers,
  Cpu,
  PenTool,
  Bot,
  ChevronRight,
} from "lucide-react";

const CAL_URL = "https://cal.com/skynetjoe/30min";

export const metadata: Metadata = {
  title:
    "Vibe Coding by SkynetLabs — Ship Real Apps in 5–14 Days with Claude Code + the AI Toolchain",
  description:
    "Vibe coding is Waseem Nasir's human-led, AI-paired build workflow from Bali. Claude Code as primary, Cursor + Replit + Codex + Gemini as backup. Ship in 5–14 days.",
  alternates: { canonical: `${SITE.url}/vibe-coding` },
  openGraph: {
    title: "Vibe Coding by SkynetLabs — Real Human, AI Pair, 5–14 Day Ship",
    description:
      "Human-led, AI-paired builds from Bali. Claude Code primary + Cursor/Replit/Codex/Gemini. Real Waseem at a real keyboard, just typing 12x faster.",
    url: `${SITE.url}/vibe-coding`,
    type: "website",
    images: [
      {
        url: `${SITE.url}/portraits/waseem-cafe-builder.jpg`,
        width: 1200,
        height: 1200,
        alt: "Waseem Nasir vibe coding at a Bali cafe with Claude Code",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vibe Coding — SkynetLabs",
    description:
      "Human-led, AI-paired builds from Bali. Ship real apps in 5–14 days.",
    images: [`${SITE.url}/portraits/waseem-cafe-builder.jpg`],
  },
};

const faqs = [
  {
    q: "Is this a coding bootcamp?",
    a: "No. It's a done-for-you build service. I sit at the keyboard, Claude Code sits next to me, and we ship your thing. You get the working product, the source code, and a hand-off doc. You don't have to learn anything unless you want to.",
  },
  {
    q: "Do you write the code or does AI?",
    a: "Both of us, every line. Claude Code drafts, I read every diff, I push back on bad calls, I rewrite anything that looks wrong. AI types fast. I bring the taste, the judgment, and the 'no, that pattern will bite you in 6 months' instinct. You're hiring a human builder with a very fast typist as a pair partner.",
  },
  {
    q: "What happens after delivery?",
    a: "You get the repo, the deployment, a written hand-off doc, and 14 days of free bug fixes. After that, I offer a flat monthly maintenance retainer if you want me on call. Most clients don't need it. The code is yours, in your GitHub, no lock-in.",
  },
  {
    q: "Can I watch you build live?",
    a: "Yes. I run screenshare sessions during the heavy build days (usually day 2 to day 4). Some clients love this, some find it overwhelming. It's optional. Async daily updates with screenshots and a Loom are the default.",
  },
  {
    q: "What if I change my mind mid-build?",
    a: "Tell me. Most scope adjustments cost nothing if they happen before staging. Bigger pivots get a new fixed quote, no surprises. I'd rather rebuild section 3 on day 4 than ship something you don't love. The whole point of the 5–14 day window is that pivoting is cheap.",
  },
  {
    q: "Why Claude Code and not just GitHub Copilot?",
    a: "Copilot is a faster autocomplete. Claude Code is a teammate. It holds the entire codebase in context, plans multi-file refactors, runs the tests, and tells me when my approach is dumb. For greenfield builds that have to ship in days, that gap is everything. Copilot still rides shotgun on small inline edits inside Cursor.",
  },
];

const toolchain = [
  {
    name: "Claude Code",
    badge: "Primary",
    role: "The brain. Long-context refactors, multi-file edits, agent loops.",
    when:
      "Every build. From the first scaffold to the final deploy. It reads the whole repo and plans the work.",
    icon: Brain,
    accent: "from-cyan-300 to-teal-300",
  },
  {
    name: "Replit",
    badge: "Speed",
    role: "When the deploy needs to be live in 8 minutes.",
    when:
      "Throwaway demos, client pitch sandboxes, the 'can you just show me' builds that don't deserve a full repo.",
    icon: Rocket,
    accent: "from-orange-300 to-pink-300",
  },
  {
    name: "Cursor",
    badge: "IDE",
    role: "When you want IDE-grade inline edits.",
    when:
      "Mid-build, when I'm touching specific files and want tab-complete + a small chat that sees only the open buffer.",
    icon: Code2,
    accent: "from-purple-300 to-blue-300",
  },
  {
    name: "Codex",
    badge: "Volume",
    role: "Heavy code-gen, batch boilerplate, throwaway scripts.",
    when:
      "When I need 40 similar API route handlers, or a CSV-to-TS-types pipeline. It's the boring-bulk specialist.",
    icon: FileCode,
    accent: "from-emerald-300 to-cyan-300",
  },
  {
    name: "Gemini",
    badge: "Context",
    role: "Long-doc analysis, big-context image grounding.",
    when:
      "When the client sends a 90-page PDF spec, or 30 screenshots of their old site. Million-token window earns its keep.",
    icon: Sparkles,
    accent: "from-yellow-300 to-orange-300",
  },
];

const pipeSteps = [
  {
    num: "01",
    label: "Vibe check",
    icon: Coffee,
    body: "30-min call. You describe the dream out loud. I ask the awkward questions about budget, deadline, and what 'done' actually looks like. No deck, no slide funnel.",
  },
  {
    num: "02",
    label: "Pipe it in",
    icon: Send,
    body: "You send the artifacts: PDFs, screenshots, voice memos, a Loom of you using the thing you wish existed. I read all of it before I touch a line.",
  },
  {
    num: "03",
    label: "Pair with the agents",
    icon: Users,
    body: "I sit at the cafe, Claude Code sits next to me, we ship the first working version. Multi-hour build sessions. Live screenshare if you want it.",
    photo: {
      src: "/portraits/waseem-cafe-side.jpg",
      alt: "Waseem at a Bali cafe pairing with Claude Code on a multi-hour build session",
    },
  },
  {
    num: "04",
    label: "Ship to staging",
    icon: Eye,
    body: "Vercel preview link in your inbox. You click around, scream-test it, send me 'more pop on the hero' and 'this button needs to live on the right'. I iterate.",
  },
  {
    num: "05",
    label: "Live within the week",
    icon: Globe,
    body: "Production deploy. DNS cutover. Monitoring wired up. Hand-off doc in your inbox. 14 days of free bug fixes. The repo is yours.",
  },
];

const buildTypes = [
  {
    icon: Layers,
    title: "Next.js sites",
    body: "Marketing sites, flagship clinic builds, SaaS landing pages, agency sites.",
    price: "$3.5k–9k",
    ship: "5 days",
  },
  {
    icon: Wrench,
    title: "Chrome extensions",
    body: "Sales-team helpers, scraping tools, in-page widgets for niche workflows.",
    price: "$2.5k–6k",
    ship: "5 days",
  },
  {
    icon: Cpu,
    title: "n8n custom nodes",
    body: "Private nodes for client-only integrations. TypeScript, fully versioned.",
    price: "$1.8k–4k",
    ship: "5 days",
  },
  {
    icon: Bot,
    title: "AI-agent micro-products",
    body: "Small revenue-earning agents: a paid extension, a niche SaaS, a one-job tool.",
    price: "$4k–12k",
    ship: "10 days",
  },
  {
    icon: PenTool,
    title: "WordPress plugins",
    body: "Custom blocks, ACF dashboards, admin tools. Still ship a lot of these.",
    price: "$2k–5k",
    ship: "5 days",
  },
  {
    icon: Zap,
    title: "Internal ops dashboards",
    body: "The 'I wish I could see all my orders in one screen' dashboards. Auth + charts + filters.",
    price: "$3k–8k",
    ship: "7 days",
  },
];

const shippedCases = [
  {
    slug: "manhattan-dental-atelier-flagship",
    title: "Manhattan dental atelier flagship",
    outcome: "14-section bespoke Next.js, end-to-end in 12 days.",
    tag: "Next.js + Tailwind",
  },
  {
    slug: "bali-wellness-conversion-funnel",
    title: "Bali wellness conversion funnel",
    outcome: "Doubled monthly bookings on a single-page voice-locked funnel.",
    tag: "Next.js + scheduling",
  },
  {
    slug: "premium-auto-dealership-network-demo",
    title: "Premium auto dealership network",
    outcome: "Multi-location dealership site with inventory feed integration.",
    tag: "Next.js + feeds",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${SITE.url}/vibe-coding#service`,
      name: "Vibe Coding — Human-led, AI-paired app and website builds",
      serviceType: "Software development",
      description:
        "Done-for-you app, site, and tool builds delivered in 5–14 days using Claude Code as the primary AI pair-programmer alongside Cursor, Replit, Codex, and Gemini.",
      provider: {
        "@type": "Organization",
        "@id": `${SITE.url}/#organization`,
        name: SITE.brand,
        url: SITE.url,
      },
      areaServed: { "@type": "Place", name: "Worldwide" },
      url: `${SITE.url}/vibe-coding`,
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "USD",
        lowPrice: "1800",
        highPrice: "12000",
        offerCount: "6",
      },
      performer: {
        "@type": "Person",
        "@id": `${SITE.url}/about#waseem`,
        name: SITE.founder,
        url: SITE.founderUrl,
        jobTitle: "Founder and lead builder",
        worksFor: { "@id": `${SITE.url}/#organization` },
        image: `${SITE.url}/portraits/waseem-cafe-builder.jpg`,
        homeLocation: { "@type": "Place", name: "Bali, Indonesia" },
        knowsAbout: [
          "Claude Code",
          "Next.js",
          "TypeScript",
          "n8n",
          "AI agents",
          "Tailwind",
          "Vercel",
        ],
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE.url}/vibe-coding#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function VibeCodingPage() {
  return (
    <>
      <JsonLd data={schema} />

      {/* HERO ============================================ */}
      <section
        className="relative overflow-hidden pt-24 md:pt-32 pb-20"
        style={{
          background:
            "linear-gradient(135deg, #061827 0%, #0a2d4a 45%, #073846 100%)",
        }}
      >
        <span
          className="orb"
          style={{
            width: 540,
            height: 540,
            background: "#1E88E5",
            top: -90,
            left: -130,
            opacity: 0.55,
          }}
        />
        <span
          className="orb"
          style={{
            width: 520,
            height: 520,
            background: "#00D4FF",
            top: 100,
            right: -140,
            opacity: 0.40,
            animationDelay: "-7s",
          }}
        />

        <div className="container-x px-6 relative z-10">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
                style={{
                  background: "rgba(94, 234, 212, 0.12)",
                  border: "1px solid rgba(94, 234, 212, 0.40)",
                  color: "#5eead4",
                }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-xs font-medium tracking-wider uppercase">
                  Vibe Coding by SkynetLabs
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.04] tracking-tight mb-6 text-white">
                Real human at a real keyboard.{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(120deg, #7ee4ff 0%, #5eead4 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Just one that types 12x faster now.
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-4">
                Vibe coding is how I (Waseem, the actual person you&apos;ll be
                talking to) ship real apps, sites, and tools from a cafe in
                Bali, with Claude Code as my pair partner and the rest of the
                AI toolchain on the bench.
              </p>
              <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-8">
                5 to 14 days from brief to live. No agency layer, no PM email
                chain, no SDR funnel. You talk to me. I talk to the keyboard.
                The keyboard talks to the models. The thing ships.
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href={CAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <Calendar className="w-4 h-4" />
                  Book a 30-min vibe check
                </a>
                <a href="#toolchain" className="btn-ghost">
                  See the toolchain
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="relative">
              <div
                className="relative aspect-[4/5] rounded-3xl overflow-hidden border"
                style={{
                  borderColor: "rgba(126, 228, 255, 0.30)",
                  boxShadow:
                    "0 20px 60px rgba(0, 212, 255, 0.20), 0 0 0 1px rgba(94, 234, 212, 0.15) inset",
                }}
              >
                <Image
                  src="/portraits/waseem-cafe-builder.jpg"
                  alt="Waseem Nasir vibe coding at a Bali cafe with Claude Code open on the laptop"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 540px"
                  className="object-cover"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 55%, rgba(6,24,39,0.75) 100%)",
                  }}
                />
                <div className="absolute bottom-5 left-5 right-5">
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                    style={{
                      background: "rgba(6, 24, 39, 0.65)",
                      border: "1px solid rgba(126, 228, 255, 0.30)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                    <span className="text-xs font-medium text-cyan-100">
                      Live from Canggu, Bali
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IS VIBE CODING ============================================ */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3 text-center">
              Direct answer
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8 text-center text-white">
              What is{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                vibe coding
              </span>
              ?
            </h2>
            <div
              className="rounded-3xl p-8 md:p-10 relative"
              style={{
                background: "rgba(10, 45, 74, 0.45)",
                border: "1px solid rgba(126, 228, 255, 0.18)",
                backdropFilter: "blur(14px)",
              }}
            >
              <div
                aria-hidden
                className="absolute -top-4 left-8 text-6xl font-serif text-cyan-300/40 select-none"
              >
                &ldquo;
              </div>
              <p className="text-lg md:text-xl text-gray-100 leading-[1.7]">
                Vibe coding is a human-led, AI-paired build workflow in which
                an experienced developer drives the design and judgment calls
                while large language models like Claude Code, Cursor, and
                Codex handle the typing, the scaffolding, and the
                multi-file refactors. At SkynetLabs, Waseem Nasir runs the
                workflow from Bali and ships production websites, Chrome
                extensions, n8n nodes, and AI micro-products in a fixed 5 to
                14 day window. The vibe is not the laptop. The vibe is the
                builder.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HUMAN IN THE LOOP ============================================ */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-center">
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2 aspect-[4/5] relative rounded-2xl overflow-hidden border border-cyan-400/20">
                <Image
                  src="/portraits/waseem-cafe-arch.jpg"
                  alt="Waseem working under the cafe arch in Bali, blue polo, laptop open"
                  fill
                  sizes="(max-width: 1024px) 60vw, 360px"
                  className="object-cover"
                />
              </div>
              <div className="grid grid-rows-2 gap-3">
                <div className="relative rounded-2xl overflow-hidden border border-cyan-400/20">
                  <Image
                    src="/portraits/waseem-veranda-gaze.jpg"
                    alt="Waseem on the veranda, direct gaze, thinking through a build"
                    fill
                    sizes="(max-width: 1024px) 30vw, 180px"
                    className="object-cover"
                  />
                </div>
                <div className="relative rounded-2xl overflow-hidden border border-cyan-400/20">
                  <Image
                    src="/portraits/waseem-poolside-laptop.jpg"
                    alt="Waseem poolside in Bali with the laptop, nomad work setup"
                    fill
                    sizes="(max-width: 1024px) 30vw, 180px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3">
                The human in the loop
              </p>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-white">
                You talk to me.{" "}
                <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                  Not a chatbot.
                </span>
              </h2>
              <p className="text-lg text-gray-200 leading-relaxed mb-4">
                I sit at the cafe under the brick arch in Canggu most
                mornings. Blue polo, oat-milk americano, a 14-inch laptop, and
                Claude Code humming in the terminal. That&apos;s where your
                build happens. No offshored ticketing system, no &quot;your
                account manager will be in touch&quot;, no AI-only agency.
              </p>
              <p className="text-lg text-gray-200 leading-relaxed mb-4">
                When you ping me on email, you get me. When we hop on a call,
                you see my face. When something breaks on production at 2am
                Bali time, you get a reply from me, not from a queue.
              </p>
              <p className="text-base text-gray-300 leading-relaxed">
                The AI part of the stack is loud and impressive and it
                deserves a page like this. The human part is the part that
                actually decides if your thing is any good.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TOOLCHAIN ============================================ */}
      <section id="toolchain" className="section">
        <div className="container-x">
          <div className="max-w-3xl mb-12">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3">
              The toolchain
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
              5 models on the bench.{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                One picks the lineup.
              </span>
            </h2>
            <p className="text-lg text-gray-300">
              No single model is best at everything. Here&apos;s the lineup
              and when each one comes in.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {toolchain.map((t) => {
              const Icon = t.icon;
              return (
                <div
                  key={t.name}
                  className="rounded-2xl p-6 relative overflow-hidden transition-transform hover:-translate-y-1"
                  style={{
                    background: "rgba(10, 45, 74, 0.55)",
                    border: "1px solid rgba(126, 228, 255, 0.18)",
                    backdropFilter: "blur(14px)",
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${t.accent}`}
                    >
                      <Icon className="w-6 h-6 text-slate-900" />
                    </div>
                    <span
                      className="text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full"
                      style={{
                        background: "rgba(94, 234, 212, 0.14)",
                        color: "#5eead4",
                        border: "1px solid rgba(94, 234, 212, 0.30)",
                      }}
                    >
                      {t.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {t.name}
                  </h3>
                  <p className="text-sm text-cyan-100/90 leading-relaxed mb-3">
                    {t.role}
                  </p>
                  <div
                    className="pt-3 mt-2"
                    style={{
                      borderTop: "1px dashed rgba(126, 228, 255, 0.22)",
                    }}
                  >
                    <p className="text-xs uppercase tracking-widest text-cyan-300/80 mb-1">
                      When we reach for it
                    </p>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {t.when}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PIPE CODING FLOW ============================================ */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-3xl mb-12">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3">
              The pipe coding flow
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
              From vibe check to live,{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                in 5 moves.
              </span>
            </h2>
            <p className="text-lg text-gray-300">
              Same flow for every build. Same fixed window. No surprise
              invoices, no &quot;phase 2 of 6&quot; deck.
            </p>
          </div>

          <div className="space-y-5">
            {pipeSteps.map((s) => {
              const Icon = s.icon;
              const hasPhoto = !!s.photo;
              return (
                <div
                  key={s.num}
                  className={`rounded-2xl p-6 md:p-8 grid ${
                    hasPhoto
                      ? "md:grid-cols-[1fr_2fr_1fr]"
                      : "md:grid-cols-[1fr_3fr]"
                  } gap-6 items-center`}
                  style={{
                    background: "rgba(10, 45, 74, 0.45)",
                    border: "1px solid rgba(126, 228, 255, 0.18)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="text-4xl md:text-5xl font-extrabold font-mono"
                      style={{
                        background:
                          "linear-gradient(120deg, #7ee4ff 0%, #5eead4 100%)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {s.num}
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/20 to-teal-400/20 flex items-center justify-center border border-cyan-400/30">
                      <Icon className="w-6 h-6 text-cyan-300" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {s.label}
                    </h3>
                    <p className="text-base text-gray-200 leading-relaxed">
                      {s.body}
                    </p>
                  </div>
                  {hasPhoto && s.photo && (
                    <div className="relative aspect-square rounded-2xl overflow-hidden border border-cyan-400/20">
                      <Image
                        src={s.photo.src}
                        alt={s.photo.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 280px"
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHAT WE VIBE-CODE ============================================ */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-3xl mb-12">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3">
              What we vibe-code
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
              Six lanes,{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                all fixed-price.
              </span>
            </h2>
            <p className="text-lg text-gray-300">
              If it&apos;s code that ships in under two weeks, it probably
              fits in one of these.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {buildTypes.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="rounded-2xl p-6 relative"
                  style={{
                    background: "rgba(10, 45, 74, 0.55)",
                    border: "1px solid rgba(126, 228, 255, 0.18)",
                    backdropFilter: "blur(14px)",
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400/20 to-teal-400/20 flex items-center justify-center border border-cyan-400/30">
                      <Icon className="w-5 h-5 text-cyan-300" />
                    </div>
                    <span
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                      style={{
                        background: "rgba(94, 234, 212, 0.14)",
                        color: "#5eead4",
                        border: "1px solid rgba(94, 234, 212, 0.30)",
                      }}
                    >
                      {b.ship} ship
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1.5">
                    {b.title}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed mb-4">
                    {b.body}
                  </p>
                  <div
                    className="text-sm font-semibold text-cyan-200"
                    style={{
                      borderTop: "1px dashed rgba(126, 228, 255, 0.22)",
                      paddingTop: "0.75rem",
                    }}
                  >
                    {b.price}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* A FEW WE'VE SHIPPED ============================================ */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-3xl mb-12">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3">
              A few we&apos;ve shipped
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
              Real builds,{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                real domains.
              </span>
            </h2>
            <p className="text-lg text-gray-300">
              Three vibe-coded case studies you can read in full.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {shippedCases.map((c) => (
              <Link
                key={c.slug}
                href={`/case-studies/${c.slug}`}
                className="group rounded-2xl p-6 block transition-transform hover:-translate-y-1"
                style={{
                  background: "rgba(10, 45, 74, 0.55)",
                  border: "1px solid rgba(126, 228, 255, 0.18)",
                  backdropFilter: "blur(14px)",
                }}
              >
                <span
                  className="text-[11px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full inline-block mb-4"
                  style={{
                    background: "rgba(94, 234, 212, 0.14)",
                    color: "#5eead4",
                    border: "1px solid rgba(94, 234, 212, 0.30)",
                  }}
                >
                  {c.tag}
                </span>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-200 transition-colors">
                  {c.title}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed mb-4">
                  {c.outcome}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300">
                  Read the build story
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* REAL TALK / WHY HUMAN ============================================ */}
      <section className="section pt-0">
        <div className="container-x">
          <div
            className="rounded-3xl p-8 md:p-14 grid md:grid-cols-[1.4fr_1fr] gap-10 items-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(10, 45, 74, 0.75) 0%, rgba(7, 56, 70, 0.65) 100%)",
              border: "1px solid rgba(126, 228, 255, 0.22)",
              backdropFilter: "blur(14px)",
            }}
          >
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-4">
                Real talk
              </p>
              <p className="text-2xl md:text-3xl font-bold text-white leading-[1.35] mb-6">
                &ldquo;AI doesn&apos;t replace the builder. It replaces the
                typing. The judgment, the taste, the &lsquo;no, that button
                needs to live on the right&rsquo;{" "}
                <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                  that&apos;s still me.
                </span>
                &rdquo;
              </p>
              <p className="text-base text-gray-300 leading-relaxed">
                A team of agents can scaffold a Next.js app in 90 seconds.
                None of them know your client base. None of them know that
                the dental atelier in Manhattan won&apos;t trust a site that
                hides pricing. None of them know that a Bali wellness funnel
                needs to address the &quot;is this only for people who
                already meditate&quot; objection in the hero. That&apos;s the
                judgment layer. That&apos;s what you&apos;re paying for.
              </p>
              <div className="mt-6 text-sm text-cyan-100/80">
                Waseem Nasir, founder, SkynetLabs
              </div>
            </div>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-cyan-400/30">
              <Image
                src="/portraits/waseem-rooftop-smile.jpg"
                alt="Waseem Nasir, founder of SkynetLabs, on a Bali rooftop"
                fill
                sizes="(max-width: 768px) 90vw, 400px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ ============================================ */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3 text-center">
              FAQ
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-10 text-center text-white">
              The{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                honest answers.
              </span>
            </h2>

            <div className="space-y-3">
              {faqs.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-2xl p-5 md:p-6"
                  style={{
                    background: "rgba(10, 45, 74, 0.55)",
                    border: "1px solid rgba(126, 228, 255, 0.18)",
                    backdropFilter: "blur(14px)",
                  }}
                >
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-4 text-lg font-semibold text-white">
                    <span>{f.q}</span>
                    <ChevronRight className="w-5 h-5 text-cyan-300 transition-transform group-open:rotate-90 shrink-0" />
                  </summary>
                  <p className="text-base text-gray-300 leading-relaxed mt-4">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA ============================================ */}
      <section className="section pt-0">
        <div className="container-x">
          <div
            className="rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
            }}
          >
            <div className="relative z-10 max-w-2xl mx-auto">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
                style={{
                  background: "rgba(255, 255, 255, 0.15)",
                  border: "1px solid rgba(255, 255, 255, 0.30)",
                  color: "#ffffff",
                }}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span className="text-xs font-medium tracking-wider uppercase">
                  30-min call, free
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-5">
                Book a vibe check
              </h2>
              <p className="text-lg text-white/90 mb-8 leading-relaxed">
                A real call with me. Not a salesperson, not a bot, not a
                discovery funnel. You describe what you want built, I tell you
                if I can ship it in the window, we either book it or we
                don&apos;t.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <a
                  href={CAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-slate-900 font-semibold hover:bg-cyan-50 transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  Grab a 30-min slot
                </a>
                <a
                  href={`mailto:${SITE.emailFounder}?subject=Vibe%20coding%20brief`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 text-white font-semibold border border-white/30 hover:bg-white/20 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Email me the brief
                </a>
              </div>
              <p className="text-sm text-white/75 mt-6">
                {SITE.emailFounder} &middot; Bali timezone (GMT+8) &middot;
                Replies within 8 working hours
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
