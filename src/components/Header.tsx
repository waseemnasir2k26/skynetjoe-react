"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
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
  ArrowRight,
} from "lucide-react";
import { NAV_PRIMARY, SERVICE_CATEGORIES } from "@/lib/site";
import ServicesMegaMenu from "@/components/header/ServicesMegaMenu";

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

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileSubOpen, setMobileSubOpen] = useState<string | null>(null);
  const closeTimer = useRef<number | null>(null);

  if (pathname?.startsWith("/lp/")) return null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpenDropdown(null);
    setMobileOpen(false);
    setMobileSubOpen(null);
  }, [pathname]);

  const openDrop = (key: string) => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenDropdown(key);
  };

  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenDropdown(null), 180);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-[#F2EFE6]/92 border-b border-[rgba(26,26,26,0.10)] shadow-[0_1px_12px_rgba(26,26,26,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex items-center justify-between px-4 sm:px-6 py-3.5 gap-2">
        <Link href="/" className="flex items-center gap-2 group">
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
            }}
          >
            Skynet
            <em style={{ fontStyle: "italic", color: "var(--terracotta)", fontWeight: 500 }}>
              Labs
            </em>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center">
          {NAV_PRIMARY.map((item) => {
            const hasDrop = item.hasMega || (item.subItems && item.subItems.length > 0);
            return (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => hasDrop && openDrop(item.href)}
                onMouseLeave={() => hasDrop && scheduleClose()}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-3.5 py-2 text-[13px] font-medium transition-colors"
                  style={{ color: "var(--ink-2)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--terracotta)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-2)")}
                  onClick={() => hasDrop && setOpenDropdown(null)}
                >
                  {item.label}
                  {hasDrop && (
                    <ChevronDown
                      className={`w-3 h-3 opacity-50 transition-transform ${
                        openDropdown === item.href ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </Link>

                {/* Services mega-menu — redesigned: left rail + featured + remainder */}
                {item.hasMega && openDropdown === item.href && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 w-[1040px] pt-3"
                    onMouseEnter={() => openDrop(item.href)}
                    onMouseLeave={scheduleClose}
                  >
                    <ServicesMegaMenu onClose={() => setOpenDropdown(null)} />
                  </div>
                )}

                {/* Simple subItems dropdown — cream editorial, terracotta accent */}
                {item.subItems && openDropdown === item.href && (
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 ${
                      item.subItems.length > 6 ? "w-[420px]" : "w-[340px]"
                    } pt-3`}
                    onMouseEnter={() => openDrop(item.href)}
                    onMouseLeave={scheduleClose}
                  >
                    <div
                      className="p-2"
                      style={{
                        background: "var(--cream-3)",
                        border: "1px solid rgba(26,26,26,0.18)",
                        boxShadow: "0 30px 60px -20px rgba(26,26,26,0.20)",
                        maxHeight: "min(70vh, 560px)",
                        overflowY: "auto",
                      }}
                    >
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="group flex items-start gap-3 p-3 transition-colors"
                          style={{
                            borderLeft: "3px solid transparent",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(198, 107, 63, 0.06)";
                            e.currentTarget.style.borderLeftColor = "var(--terracotta)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.borderLeftColor = "transparent";
                          }}
                        >
                          <span
                            className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full"
                            style={{ background: "var(--terracotta)" }}
                          />
                          <span className="min-w-0">
                            <span
                              className="block text-[13px] font-semibold leading-tight"
                              style={{ color: "var(--ink)", fontFamily: "var(--font-display)" }}
                            >
                              {sub.label}
                            </span>
                            {sub.desc && (
                              <span
                                className="block text-[11px] leading-snug mt-0.5"
                                style={{ color: "var(--ink-2)" }}
                              >
                                {sub.desc}
                              </span>
                            )}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <span className="h-5 w-px" style={{ background: "var(--border)" }} aria-hidden="true" />
          <Link
            href="/discovery-call"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold transition-all hover:-translate-y-0.5"
            style={{
              background: "var(--terracotta)",
              color: "var(--cream-3)",
              borderRadius: 2,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--terracotta-2)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--terracotta)")}
          >
            Book free audit
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-3 -mr-1"
          style={{ color: "var(--ink)" }}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div
          className="lg:hidden backdrop-blur-md max-h-[calc(100vh-64px)] overflow-y-auto"
          style={{
            background: "rgba(242, 239, 230, 0.97)",
            borderTop: "1px solid var(--border)",
          }}
        >
          <nav className="container-x px-4 sm:px-6 py-6 flex flex-col gap-1">
            {NAV_PRIMARY.map((item) => {
              const hasDrop = item.hasMega || (item.subItems && item.subItems.length > 0);
              const open = mobileSubOpen === item.href;
              if (!hasDrop) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="py-3 text-base font-medium text-fg hover:text-skynet-primary-light border-b border-white/[0.06]"
                  >
                    {item.label}
                  </Link>
                );
              }
              return (
                <div key={item.href} className="border-b border-white/[0.06]">
                  <button
                    onClick={() => setMobileSubOpen(open ? null : item.href)}
                    className="w-full flex items-center justify-between py-3 text-base font-medium text-fg"
                    aria-expanded={open}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
                    />
                  </button>
                  {open && item.hasMega && (
                    <div className="pb-4 pl-1 space-y-4">
                      {SERVICE_CATEGORIES.map((cat) => (
                        <div key={cat.name}>
                          <div className="text-[10.5px] uppercase tracking-[0.18em] text-skynet-primary-light font-semibold mb-2">
                            {cat.name}
                          </div>
                          <ul className="space-y-1">
                            {cat.services.map((svc) => {
                              const Icon = ICONS[svc.icon];
                              return (
                                <li key={svc.slug}>
                                  <Link
                                    href={`/services/${svc.slug}`}
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-2.5 py-1.5 text-sm text-fg-muted hover:text-skynet-primary-light"
                                  >
                                    {Icon && (
                                      <Icon className="w-3.5 h-3.5 text-skynet-primary-light/70 flex-shrink-0" />
                                    )}
                                    {svc.label}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                      <Link
                        href="/services"
                        onClick={() => setMobileOpen(false)}
                        className="inline-flex items-center gap-1.5 pt-2 text-sm text-skynet-primary-light font-semibold"
                      >
                        View all services
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  )}
                  {open && item.subItems && (
                    <div className="pb-4 pl-1 space-y-1">
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-2 text-sm transition-colors"
                          style={{ color: "var(--ink-2)", wordBreak: "break-word" }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--terracotta)")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-2)")}
                        >
                          {sub.label}
                          {sub.desc && (
                            <span
                              className="block text-[11px] mt-0.5"
                              style={{ color: "var(--ink-faint)", wordBreak: "break-word" }}
                            >
                              {sub.desc}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <div className="mt-5">
              <Link
                href="/discovery-call"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center gap-1.5 w-full px-4 py-3 rounded-lg text-sm font-semibold text-white"
                style={{
                  background:
                    "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
                  boxShadow: "0 6px 20px rgba(30,136,229,0.35)",
                }}
              >
                Book free audit
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
