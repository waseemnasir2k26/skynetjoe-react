import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import Image from "next/image";
import DiscoveryCallForm, { DiscoveryProofSidebar } from "./DiscoveryCallForm";
import { CheckCircle2, Clock, Filter, Users, ShieldCheck, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Apply for a Discovery Call — 4 Clients/Month Max | SkynetLabs",
  description:
    "We only take 4 new builds per month. Send your brief and we'll reply within 8 hours with a yes, no, or referral. No calendar tag — we read first, share availability only if it's a fit.",
  alternates: { canonical: `${SITE.url}/discovery-call` },
  openGraph: {
    title: "Apply for a Discovery Call — SkynetLabs",
    description:
      "We only take 4 new builds per month. Send your brief — yes/no in 8 hours.",
    url: `${SITE.url}/discovery-call`,
    type: "website",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Apply for a Discovery Call",
  url: `${SITE.url}/discovery-call`,
  description:
    "Application form for SkynetLabs discovery calls. Limited to 4 clients per month.",
  inLanguage: "en",
  mainEntity: {
    "@type": "Organization",
    name: SITE.brand,
    url: SITE.url,
  },
};

const whyFilter = [
  {
    icon: Filter,
    title: "We only take 4 builds/month",
    body: "Bali-based, solo-led, no agency overhead. Quality stays high because volume stays low.",
  },
  {
    icon: Clock,
    title: "You'll know in 8 hours",
    body: "Yes, no, or referral. No 14-day discovery funnel. No 3-touch nurture sequence.",
  },
  {
    icon: Users,
    title: "No call until we read your brief",
    body: "We share Cal.com only if it's a fit. Saves your time and ours — no scheduled call goes to waste.",
  },
  {
    icon: ShieldCheck,
    title: "If we say no, you get a referral",
    body: "We know 30+ vetted operators worldwide. Wrong-fit briefs get pointed somewhere right.",
  },
];

const expectSteps = [
  {
    step: "01",
    title: "You submit the brief",
    body: "8 fields. Takes 3 minutes. Be honest about budget — saves both sides time.",
  },
  {
    step: "02",
    title: "We review within 8 hours",
    body: "Weekday Bali hours (GMT+8). Either: yes + Cal.com link, no + referral, or 1 clarifying question.",
  },
  {
    step: "03",
    title: "Discovery call (only if fit)",
    body: "30 min on Cal.com. We come prepared — your brief already read, stack already mapped.",
  },
  {
    step: "04",
    title: "Fixed scope in 48 hours",
    body: "One-pager: deliverables, price, timeline, stack. 50% deposit kicks off in 24h.",
  },
];

export default function DiscoveryCallPage() {
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
          <div className="max-w-3xl">
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
                2 of 4 June 2026 slots remaining
              </span>
            </div>

            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-400/40">
                <Image src="/portraits/waseem-bluepolo.jpg" alt="Waseem Nasir" fill sizes="48px" className="object-cover" />
              </div>
              <div>
                <p className="text-cyan-200 text-sm font-semibold">Waseem reviews briefs personally</p>
                <p className="text-gray-400 text-xs">Bali · GMT+8 · solo-led since 2014</p>
              </div>
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
                Apply for one.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-4">
              We&apos;re solo-led and take{" "}
              <strong className="text-cyan-200">4 new builds per month</strong>.
              The form below is our pre-call filter — send a brief, get a real
              answer in 8 hours. No calendar tag. No discovery dance.
            </p>
            <p className="text-base text-gray-300 leading-relaxed">
              If we&apos;re not the right fit, we&apos;ll point you to someone who
              is. If we are, you&apos;ll have a Cal.com link in your inbox before
              dinner.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div className="grid md:grid-cols-[1.2fr_1fr] gap-10">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3">
                The brief
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
                8 fields.{" "}
                <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                  3 minutes.
                </span>
              </h2>
              <p className="text-base md:text-lg text-gray-300 mb-8">
                Be specific about pain and honest about budget. We read every
                line.
              </p>

              <DiscoveryCallForm />
            </div>

            <aside className="space-y-4">
              <DiscoveryProofSidebar />
              <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3 mt-6">
                Why we filter
              </p>
              {whyFilter.map((w) => {
                const Icon = w.icon;
                return (
                  <div
                    key={w.title}
                    className="p-5 rounded-2xl bg-white/5 border border-white/10"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400/20 to-teal-400/20 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-cyan-300" />
                    </div>
                    <h3 className="text-white font-semibold mb-1">{w.title}</h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {w.body}
                    </p>
                  </div>
                );
              })}
            </aside>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div className="rounded-3xl bg-gradient-to-br from-[#0a2d4a]/80 via-[#073846]/60 to-[#0a2d4a]/80 border border-cyan-400/20 p-8 md:p-12 backdrop-blur-md">
            <div className="max-w-2xl mb-10">
              <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3">
                What happens next
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 text-white">
                From brief to deposit,{" "}
                <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                  4 steps.
                </span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {expectSteps.map((e) => (
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
          <div
            className="rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
            }}
          >
            <div className="relative z-10 max-w-2xl mx-auto">
              <CheckCircle2 className="w-10 h-10 text-white/90 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
                Not ready for a build yet?
              </h2>
              <p className="text-lg text-white/90 mb-8">
                Browse{" "}
                <a
                  href="/pricing"
                  className="underline decoration-2 underline-offset-4 hover:text-cyan-100"
                >
                  public pricing
                </a>
                , read the{" "}
                <a
                  href="/aeo-guide"
                  className="underline decoration-2 underline-offset-4 hover:text-cyan-100"
                >
                  AEO guide
                </a>
                , or just{" "}
                <a
                  href="mailto:waseem@skynetjoe.com"
                  className="underline decoration-2 underline-offset-4 hover:text-cyan-100"
                >
                  email Waseem
                </a>{" "}
                a quick question. No funnel.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
