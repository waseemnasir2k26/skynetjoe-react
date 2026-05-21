"use client";

import Script from "next/script";
import { ArrowUpRight } from "lucide-react";

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-label="LinkedIn" className={className}>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.78C.8 0 0 .77 0 1.73v20.54C0 23.23.8 24 1.78 24h20.44C23.2 24 24 23.23 24 22.27V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);

export default function LinkedInBadge() {
  return (
    <section className="section relative overflow-hidden">
      <Script
        src="https://platform.linkedin.com/badges/js/profile.js"
        strategy="lazyOnload"
      />
      <div className="container-x">
        <div className="rounded-3xl bg-gradient-to-br from-[#0a2d4a]/80 via-[#073846]/60 to-[#0a2d4a]/80 border border-cyan-400/20 p-8 md:p-12 backdrop-blur-md">
          <div className="grid md:grid-cols-[1fr_auto] gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold uppercase tracking-[0.18em] mb-5">
                <LinkedInIcon className="w-3.5 h-3.5" />
                Posting daily on LinkedIn
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-white">
                Watch me ship,{" "}
                <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                  in public.
                </span>
              </h2>
              <p className="text-base md:text-lg text-gray-300 mb-6 max-w-xl">
                Daily posts on n8n automations, AI workflows, client wins,
                AEO/SEO experiments, and the messy reality of running an agency
                from Bali. Hit follow — connect to chat.
              </p>
              <a
                href="https://www.linkedin.com/in/waseemnasir2k26"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-semibold transition-colors"
              >
                Follow on LinkedIn
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
            <div className="flex justify-center md:justify-end">
              <div
                className="badge-base LI-profile-badge"
                data-locale="en_US"
                data-size="large"
                data-theme="dark"
                data-type="HORIZONTAL"
                data-vanity="waseemnasir2k26"
                data-version="v1"
              >
                <a
                  className="badge-base__link LI-simple-link"
                  href="https://pk.linkedin.com/in/waseemnasir2k26?trk=profile-badge"
                >
                  Muhammad Waseem Nasir
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
