"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Target,
  Link as LinkIcon,
  Smartphone,
  Clapperboard,
  PlayCircle,
  Music,
  Users,
  Globe,
  ShoppingCart,
  Zap,
  MessageSquare,
  Building2,
  BookOpen,
  Palette,
  PenTool,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/site";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Bot,
  Target,
  Link: LinkIcon,
  Smartphone,
  Clapperboard,
  PlayCircle,
  Music,
  Users,
  Globe,
  ShoppingCart,
  Zap,
  MessageSquare,
  Building2,
  BookOpen,
  Palette,
  PenTool,
};

export default function ServiceMenuCollapsed() {
  const [open, setOpen] = useState(false);

  return (
    <section className="py-14 md:py-20 border-t border-white/[0.08]">
      <div className="container-x px-6 max-w-6xl mx-auto">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-300">
              For completeness
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mt-2">
              Or browse the full 16-service menu.
            </h2>
            <p className="text-sm text-fg-muted mt-2 max-w-xl">
              Useful if you already know exactly what you want and don&apos;t
              need a pain-frame.
            </p>
          </div>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-cyan-300 border border-cyan-400/30 bg-cyan-500/10 hover:bg-cyan-500/15 transition"
          >
            {open ? "Hide menu" : "Show all 16"}
            <ChevronDown
              className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-4 space-y-8">
                {SERVICE_CATEGORIES.map((cat) => (
                  <div key={cat.name}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-1 h-1 rounded-full bg-skynet-primary-light" />
                      <h3 className="text-[10.5px] uppercase tracking-[0.18em] text-skynet-primary-light font-bold">
                        {cat.name}
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {cat.services.map((svc) => {
                        const Icon = ICONS[svc.icon];
                        return (
                          <Link
                            key={svc.slug}
                            href={`/services/${svc.slug}`}
                            className="group flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/40 transition"
                          >
                            {Icon && (
                              <span className="flex-shrink-0 mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center bg-skynet-primary/10 border border-skynet-primary/20 group-hover:bg-skynet-primary/20 transition">
                                <Icon className="w-4 h-4 text-skynet-primary-light" />
                              </span>
                            )}
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5 text-sm font-semibold text-white mb-0.5">
                                {svc.label}
                                <ArrowRight className="w-3.5 h-3.5 text-cyan-300/0 group-hover:text-cyan-300 transition" />
                              </div>
                              <p className="text-xs text-fg-muted leading-snug line-clamp-2">
                                {svc.desc}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
