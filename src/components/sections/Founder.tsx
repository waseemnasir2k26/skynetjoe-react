"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Coffee, Code2 } from "lucide-react";

const Youtube = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.6 12 3.6 12 3.6s-7.6 0-9.4.5A3 3 0 0 0 .5 6.2C0 8 0 12 0 12s0 4 .5 5.8a3 3 0 0 0 2.1 2.1c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.8.5-5.8.5-5.8s0-4-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/></svg>
);
const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3v9zM6.5 8.3A1.7 1.7 0 1 1 8.2 6.6 1.7 1.7 0 0 1 6.5 8.3zM19 19h-3v-4.7c0-1.1 0-2.5-1.5-2.5s-1.8 1.2-1.8 2.4V19h-3v-9h2.9v1.2h.1a3.2 3.2 0 0 1 2.9-1.5c3.1 0 3.7 2 3.7 4.7V19z"/></svg>
);
const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6a3.1 3.1 0 0 0-1.3-1.7c-1.1-.7.1-.7.1-.7a2.5 2.5 0 0 1 1.8 1.2 2.5 2.5 0 0 0 3.4 1 2.5 2.5 0 0 1 .8-1.6c-2.7-.3-5.5-1.3-5.5-6a4.7 4.7 0 0 1 1.3-3.3 4.3 4.3 0 0 1 .1-3.2s1-.3 3.3 1.3a11.5 11.5 0 0 1 6 0c2.3-1.6 3.3-1.3 3.3-1.3a4.3 4.3 0 0 1 .1 3.2 4.7 4.7 0 0 1 1.3 3.3c0 4.7-2.9 5.7-5.6 6a2.8 2.8 0 0 1 .8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3z"/></svg>
);

const stats = [
  { value: "180+", label: "workflows shipped" },
  { value: "55+", label: "client builds" },
  { value: "9", label: "countries served" },
  { value: "2", label: "home bases — Bali + Lahore" },
];

export default function Founder() {
  return (
    <section className="relative section overflow-hidden">
      <span
        className="orb"
        style={{
          width: 520,
          height: 520,
          background: "#14B8A6",
          top: -120,
          right: -160,
          opacity: 0.35,
        }}
      />
      <span
        className="orb"
        style={{
          width: 460,
          height: 460,
          background: "#1E88E5",
          bottom: -140,
          left: -120,
          opacity: 0.3,
          animationDelay: "-6s",
        }}
      />

      <div className="container-x px-6 relative z-10">
        <div className="grid md:grid-cols-[0.95fr_1.05fr] gap-10 md:gap-14 items-center">
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="/portraits/waseem-rooftop.jpg"
                alt="Waseem Nasir, founder of SkynetLabs, on a Bali rooftop"
                fill
                sizes="(min-width: 768px) 40vw, 90vw"
                className="object-cover"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center gap-2 text-white/90 text-sm">
                <MapPin className="w-4 h-4 text-cyan-300" />
                <span>Canggu, Bali — GMT+8</span>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-4 w-32 h-32 rounded-2xl overflow-hidden border-4 border-slate-950 shadow-xl hidden md:block">
              <Image
                src="/portraits/waseem-veranda.jpg"
                alt="Waseem at a Bali veranda workstation"
                fill
                sizes="128px"
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3 flex items-center gap-2">
              <Coffee className="w-3.5 h-3.5" /> Meet the founder
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                Waseem.
              </span>
            </h2>
            <p className="text-base md:text-lg text-fg-muted leading-relaxed mb-4">
              SkynetLabs isn&apos;t an agency. It&apos;s one person + Claude as
              second seat, shipping automation and sites from a Canggu co-working
              space and a Liberty Market desk in Lahore. No account managers, no
              sales pods, no hand-offs. You send a brief, I read it, I build.
            </p>
            <p className="text-base md:text-lg text-fg-muted leading-relaxed mb-6">
              I started this after 10+ years in WordPress, then n8n, then AI. The
              clients I keep are the ones who needed it shipped this week, not
              this quarter. The clients I refer out are the ones who need a
              committee.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="p-3 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="text-xl font-extrabold text-cyan-300">
                    {s.value}
                  </div>
                  <div className="text-[11px] text-fg-faint leading-tight mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              <Link
                href="/discovery-call"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white transition hover:scale-[1.02]"
                style={{
                  background:
                    "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
                  boxShadow: "0 8px 28px rgba(0, 212, 255, 0.30)",
                }}
              >
                <Code2 className="w-4 h-4" /> Apply for a call
              </Link>
              <a
                href="https://www.youtube.com/watch?v=5lT9vrzssU0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold bg-white/5 border border-white/15 text-fg hover:border-cyan-400 hover:text-cyan-200 transition"
              >
                <Youtube className="w-4 h-4 text-rose-400" /> Watch how I work
              </a>
            </div>

            <div className="flex gap-3 text-fg-faint">
              <a
                href="https://www.linkedin.com/in/waseem-nasir"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-300 transition"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/waseemnasir2k26"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-300 transition"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/@skynetlabs"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-300 transition"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
