import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  MessageCircle,
  Mail,
  Calendar,
  ArrowRight,
  Clock,
  Sparkles,
  CheckCircle2,
  Zap,
  Globe,
  ShieldCheck,
} from "lucide-react";
import { SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-label="LinkedIn" className={className}>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.78C.8 0 0 .77 0 1.73v20.54C0 23.23.8 24 1.78 24h20.44C23.2 24 24 23.23 24 22.27V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-label="GitHub" className={className}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

export const metadata: Metadata = {
  title: "Contact — 8-hour reply guarantee from Bali | SkynetLabs",
  description:
    "Skip the discovery-call dance. Send a brief, get a fixed-price scope back in 48 hours. WhatsApp, email, LinkedIn, or Cal.com — pick your channel. Reply within 8h on weekdays.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Talk to Waseem — SkynetLabs",
    description:
      "8-hour reply guarantee. No discovery funnels. Fixed scope back in 48 hours.",
    url: "/contact",
    type: "website",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact SkynetLabs",
  url: `${SITE.url}/contact`,
  description:
    "Multi-channel contact for SkynetLabs. WhatsApp, email, LinkedIn, Cal.com. 8-hour reply on weekdays.",
  inLanguage: "en",
  mainEntity: {
    "@type": "Organization",
    name: SITE.brand,
    url: SITE.url,
    email: SITE.email,
    founder: { "@type": "Person", name: SITE.founder, url: SITE.founderUrl },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: SITE.email,
        availableLanguage: ["English"],
        areaServed: "Worldwide",
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: SITE.emailFounder,
        availableLanguage: ["English"],
        areaServed: "Worldwide",
      },
    ],
  },
};

const channels = [
  {
    name: "WhatsApp",
    desc: "Fastest. I'm online most days 09:00–22:00 PKT.",
    cta: "Send a voice note",
    href: "https://wa.me/923001001957",
    icon: MessageCircle,
    color: "from-green-400 to-emerald-500",
    badge: "Reply in 8h",
  },
  {
    name: "Email",
    desc: "Best for briefs, attachments, async detail.",
    cta: "info@skynetjoe.com",
    href: "mailto:info@skynetjoe.com",
    icon: Mail,
    color: "from-cyan-400 to-sky-500",
    badge: "48h scope",
  },
  {
    name: "LinkedIn",
    desc: "Connect + DM. I post daily — say hi in comments first.",
    cta: "Open my profile",
    href: "https://www.linkedin.com/in/waseemnasir2k26",
    icon: LinkedInIcon,
    color: "from-blue-400 to-indigo-500",
    badge: "Daily active",
  },
  {
    name: "Cal.com",
    desc: "30-min Zoom. Free. No funnel. Bring questions.",
    cta: "Book a slot",
    href: "https://cal.com/waseemnasir",
    icon: Calendar,
    color: "from-violet-400 to-purple-500",
    badge: "Free",
  },
];

const guarantees = [
  {
    icon: Clock,
    title: "8-hour reply",
    body: "On weekdays. Bali is GMT+8 — your morning is my afternoon.",
  },
  {
    icon: Zap,
    title: "48-hour fixed scope",
    body: "Send a brief, get back a one-pager with price and timeline.",
  },
  {
    icon: ShieldCheck,
    title: "No NDA dance",
    body: "I sign yours, you don't sign mine. Or skip it entirely.",
  },
  {
    icon: Globe,
    title: "9 countries served",
    body: "Bali, Pakistan, US, UK, France, Australia, UAE, Singapore, Italy.",
  },
];

const expect = [
  {
    step: "01",
    title: "You send a brief",
    body: "Bullet points are fine. Loom video is great. Don't pre-design — that's my job.",
  },
  {
    step: "02",
    title: "I reply within 8 hours",
    body: "Either a clarifying question or 'this is doable — scope in 48h'.",
  },
  {
    step: "03",
    title: "Fixed scope arrives",
    body: "One pager: deliverables, price, timeline, stack. No surprises.",
  },
  {
    step: "04",
    title: "You say yes/no",
    body: "If yes: 50% deposit, work starts in 24h. If no: file stays useful — yours.",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={schema} />

      <section
        className="relative overflow-hidden pt-24 md:pt-32 pb-16"
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
            width: 580,
            height: 580,
            background: "#00D4FF",
            top: 80,
            right: -160,
            opacity: 0.45,
            animationDelay: "-7s",
          }}
        />

        <div className="container-x px-6 relative z-10">
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-10 md:gap-14 items-center">
            <div className="max-w-2xl">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
                style={{
                  background: "rgba(0, 212, 255, 0.12)",
                  border: "1px solid rgba(0, 212, 255, 0.40)",
                  color: "#7ee4ff",
                }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-xs font-medium tracking-wider uppercase">
                  Open for 2 builds — June 2026
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.04] tracking-tight mb-6 text-white">
                Don&apos;t book a call.{" "}
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
                  Send a brief.
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-8">
                The fastest way to work with me: skip the discovery dance.
                WhatsApp me a voice note, email a one-pager, or ping me on
                LinkedIn — I&apos;ll send a fixed-price scope back within{" "}
                <strong className="text-cyan-200">48 hours</strong>. If
                I&apos;m not the right fit, I&apos;ll tell you who is.
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://wa.me/923001001957"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white transition-transform hover:scale-[1.02]"
                  style={{
                    background:
                      "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                    boxShadow: "0 8px 28px rgba(37, 211, 102, 0.40)",
                  }}
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp now
                </a>
                <a
                  href="mailto:info@skynetjoe.com"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white transition-transform hover:scale-[1.02]"
                  style={{
                    background:
                      "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
                    boxShadow: "0 8px 28px rgba(0, 212, 255, 0.30)",
                  }}
                >
                  <Mail className="w-4 h-4" />
                  Email me
                </a>
                <a
                  href="https://cal.com/waseemnasir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-white transition-colors"
                  style={{
                    background: "rgba(255, 255, 255, 0.06)",
                    border: "1px solid rgba(255, 255, 255, 0.18)",
                  }}
                >
                  <Calendar className="w-4 h-4" />
                  Or book a slot
                </a>
              </div>
            </div>

            <div className="relative hidden md:block">
              <div
                className="relative aspect-[4/5] w-full max-w-md ml-auto rounded-3xl overflow-hidden"
                style={{
                  border: "1px solid rgba(0, 212, 255, 0.30)",
                  boxShadow: "0 30px 80px -10px rgba(0, 212, 255, 0.40)",
                }}
              >
                <Image
                  src="/portraits/waseem-bluepolo.jpg"
                  alt="Waseem Nasir, founder of SkynetLabs, available for new builds"
                  fill
                  priority
                  sizes="(min-width: 1024px) 440px, 380px"
                  className="object-cover"
                />
                <div
                  className="absolute inset-x-0 bottom-0 p-5 pt-14"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 0%, rgba(6,24,39,0.94) 100%)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs uppercase tracking-[0.18em] text-green-300">
                      Available now
                    </span>
                  </div>
                  <div className="text-white font-semibold text-lg">
                    Waseem Nasir
                  </div>
                  <div className="text-sm text-gray-300">
                    Founder · Bali (GMT+8)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div className="max-w-3xl mb-10">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3">
              Pick your channel
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
              Four ways to start.{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                One reply guarantee.
              </span>
            </h2>
            <p className="text-base md:text-lg text-gray-300">
              All four hit the same inbox. Use whichever feels least like
              homework.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {channels.map((c) => {
              const Icon = c.icon;
              return (
                <a
                  key={c.name}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group relative p-6 rounded-2xl bg-white/95 border border-white/60 shadow-lg shadow-cyan-500/5 hover:shadow-xl hover:shadow-cyan-500/25 hover:border-skynet-primary/60 hover:bg-white transition-all duration-300 hover:-translate-y-2"
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${c.color}`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-slate-900">
                      {c.name}
                    </h3>
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-800">
                      {c.badge}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {c.desc}
                  </p>
                  <div className="inline-flex items-center gap-1.5 text-skynet-primary font-semibold text-sm group-hover:gap-2.5 transition-all">
                    {c.cta}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div className="rounded-3xl bg-gradient-to-br from-[#0a2d4a]/80 via-[#073846]/60 to-[#0a2d4a]/80 border border-cyan-400/20 p-8 md:p-12 backdrop-blur-md">
            <div className="max-w-2xl mb-10">
              <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3">
                What to expect
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 text-white">
                Four steps,{" "}
                <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                  zero funnel.
                </span>
              </h2>
              <p className="text-base md:text-lg text-gray-300">
                No CRM auto-replies. No discovery-call upsell. No 14-day
                follow-up sequence. Just one human writing back.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {expect.map((e) => (
                <div
                  key={e.step}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10"
                >
                  <div className="text-3xl font-extrabold text-cyan-300 mb-2 font-mono">
                    {e.step}
                  </div>
                  <h3 className="text-white font-semibold mb-2">{e.title}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {e.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {guarantees.map((g) => {
              const Icon = g.icon;
              return (
                <div
                  key={g.title}
                  className="p-6 rounded-2xl bg-white/95 border border-white/60 shadow-md"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-skynet-primary/20 to-cyan-400/20 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-skynet-primary" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 mb-1">
                    {g.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {g.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div className="rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
            }}>
            <div className="relative z-10 max-w-2xl mx-auto">
              <CheckCircle2 className="w-10 h-10 text-white/90 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
                Still scrolling? Just{" "}
                <a
                  href="https://wa.me/923001001957"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-2 underline-offset-4 hover:text-cyan-100"
                >
                  send the message
                </a>
                .
              </h2>
              <p className="text-lg text-white/90 mb-8">
                Worst case: you waste 2 minutes. Best case: your CRM, calendar
                and inbox stop fighting each other in 14 days.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="https://wa.me/923001001957"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-900 font-semibold hover:bg-cyan-50 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Open WhatsApp
                </a>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-white/40 text-white font-semibold hover:bg-white/10 transition-colors"
                >
                  See public pricing first
                </Link>
                <a
                  href={SITE.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-white/40 text-white font-semibold hover:bg-white/10 transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  Browse my code
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
