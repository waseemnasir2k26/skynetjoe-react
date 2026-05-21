import Link from "next/link";
import { ArrowRight, Home, MessageCircle, Map, FileText } from "lucide-react";

export const metadata = {
  title: "Page not found — 404 | SkynetLabs",
  description: "Page doesn't exist. Try the homepage, services, or apply for a discovery call.",
  robots: { index: false, follow: false },
};

const links = [
  { href: "/", label: "Homepage", icon: Home, desc: "Start over" },
  { href: "/services", label: "16 services", icon: FileText, desc: "What we build" },
  { href: "/locations", label: "48 states", icon: Map, desc: "Where we ship" },
  { href: "/discovery-call", label: "Apply for a call", icon: ArrowRight, desc: "Send a brief" },
];

export default function NotFound() {
  return (
    <section
      className="relative overflow-hidden min-h-[80vh] flex items-center pt-24 pb-16"
      style={{
        background:
          "linear-gradient(135deg, #061827 0%, #0a2d4a 45%, #073846 100%)",
      }}
    >
      <span className="orb" style={{ width: 540, height: 540, background: "#1E88E5", top: -90, left: -130, opacity: 0.55 }} />
      <span className="orb" style={{ width: 580, height: 580, background: "#00D4FF", top: 80, right: -160, opacity: 0.45, animationDelay: "-7s" }} />

      <div className="container-x px-6 relative z-10">
        <div className="max-w-3xl">
          <div className="text-[140px] md:text-[200px] leading-none font-extrabold mb-4 bg-gradient-to-br from-cyan-300 to-teal-400 bg-clip-text text-transparent">
            404
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            This page took the day off.
          </h1>
          <p className="text-lg text-gray-300 mb-10 max-w-xl">
            The URL is wrong, the page moved, or we deleted it. Here&apos;s where most people meant to go:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
            {links.map((l) => {
              const Icon = l.icon;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className="group p-5 rounded-2xl bg-white/5 border border-white/15 hover:border-cyan-400/60 hover:bg-white/10 transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400/20 to-teal-400/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-cyan-300" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-white">{l.label}</div>
                      <div className="text-sm text-gray-400">{l.desc}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-cyan-300 group-hover:translate-x-1 transition" />
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://wa.me/923001001957"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-white"
              style={{ background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)" }}
            >
              <MessageCircle className="w-4 h-4" />
              Or WhatsApp us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
