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
  Truck,
  ArrowRight,
} from "lucide-react";
import { NAV_PRIMARY, SERVICE_CATEGORIES, SITE } from "@/lib/site";
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
  Truck,
};

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileSubOpen, setMobileSubOpen] = useState<string | null>(null);
  const closeTimer = useRef<number | null>(null);

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

  // Lock body scroll while the mobile menu is open → kills iOS scroll-bleed.
  // Restores the prior overflow value on close / unmount.
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  // Guard AFTER all hooks — preserves Rules-of-Hooks invariants when
  // navigating between /lp/* (returns null) and regular routes.
  if (pathname?.startsWith("/lp/")) return null;

  // Active-state: exact match for "/", else section-root match (startsWith)
  // so e.g. /services/n8n-automation still lights the "Services" parent.
  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

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

  const closeNow = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenDropdown(null);
  };

  // a11y: Escape closes the open dropdown and returns focus to its trigger link.
  // The trigger is the first focusable child of the relatedItem wrapper.
  const onMenuKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape" && openDropdown) {
      e.stopPropagation();
      closeNow();
      const trigger = e.currentTarget.querySelector<HTMLElement>("a,button");
      trigger?.focus();
    }
  };

  // a11y: close only when focus actually leaves the wrapper (not when moving
  // between the trigger and items inside the same menu).
  const onMenuBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      scheduleClose();
    }
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
        <Link href="/" className="flex items-center gap-2.5 group">
          <span
            aria-hidden="true"
            className="flex items-center justify-center flex-shrink-0"
            style={{
              width: 30,
              height: 30,
              borderRadius: 6,
              background: "var(--terracotta)",
              color: "var(--cream-3)",
              fontFamily: "var(--font-display)",
              fontSize: "0.78rem",
              fontWeight: 700,
              letterSpacing: "0.02em",
              lineHeight: 1,
            }}
          >
            SL
          </span>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
            }}
          >
            Skynet
            <em
              style={{
                fontStyle: "normal",
                color: "var(--terracotta-aa)",
                fontWeight: 700,
              }}
            >
              Labs
            </em>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center">
          {NAV_PRIMARY.map((item) => {
            const hasDrop =
              item.hasMega || (item.subItems && item.subItems.length > 0);
            const active = isActive(item.href);
            const restColor = active ? "var(--terracotta-aa)" : "var(--ink-2)";
            return (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => hasDrop && openDrop(item.href)}
                onMouseLeave={() => hasDrop && scheduleClose()}
                onFocus={() => hasDrop && openDrop(item.href)}
                onBlur={(e) => hasDrop && onMenuBlur(e)}
                onKeyDown={hasDrop ? onMenuKeyDown : undefined}
              >
                <Link
                  href={item.href}
                  className="relative flex items-center gap-1 px-3.5 py-2 text-[13px] transition-colors"
                  style={{ color: restColor, fontWeight: active ? 600 : 500 }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--terracotta)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = restColor)
                  }
                  // Parent label now NAVIGATES to its index page on click; hover/focus
                  // (wrapper handlers) is what opens the menu. No preventDefault.
                  aria-expanded={
                    hasDrop ? openDropdown === item.href : undefined
                  }
                  aria-haspopup={hasDrop ? "menu" : undefined}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                  {hasDrop && (
                    <ChevronDown
                      className={`w-3 h-3 opacity-50 transition-transform ${
                        openDropdown === item.href ? "rotate-180" : ""
                      }`}
                    />
                  )}
                  {/* Active-state: terracotta underline (Fix 4) */}
                  {active && (
                    <span
                      aria-hidden
                      className="absolute left-3.5 right-3.5 -bottom-0.5 h-[2px]"
                      style={{ background: "var(--terracotta)" }}
                    />
                  )}
                </Link>

                {/* Services mega-menu — redesigned: left rail + featured + remainder */}
                {item.hasMega && openDropdown === item.href && (
                  <div
                    role="menu"
                    className="absolute top-full left-1/2 -translate-x-1/2 w-[min(1040px,calc(100vw-2rem))] pt-3"
                    onMouseEnter={() => openDrop(item.href)}
                    onMouseLeave={scheduleClose}
                  >
                    <ServicesMegaMenu onClose={() => setOpenDropdown(null)} />
                  </div>
                )}

                {/* Simple subItems dropdown — cream editorial, terracotta accent */}
                {item.subItems && openDropdown === item.href && (
                  <div
                    role="menu"
                    className={`absolute top-full left-1/2 -translate-x-1/2 ${
                      item.subItems.length > 6
                        ? "w-[min(420px,calc(100vw-2rem))]"
                        : "w-[min(340px,calc(100vw-2rem))]"
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
                          aria-current={
                            pathname === sub.href ? "page" : undefined
                          }
                          className="group flex items-start gap-3 p-3 transition-colors"
                          style={{
                            borderLeft: "3px solid transparent",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                              "rgba(198, 107, 63, 0.06)";
                            e.currentTarget.style.borderLeftColor =
                              "var(--terracotta)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.borderLeftColor =
                              "transparent";
                          }}
                        >
                          <span
                            className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full"
                            style={{ background: "var(--terracotta)" }}
                          />
                          <span className="min-w-0">
                            <span
                              className="block text-[13px] font-semibold leading-tight"
                              style={{
                                color: "var(--ink)",
                                fontFamily: "var(--font-display)",
                              }}
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
          <span
            className="h-5 w-px"
            style={{ background: "var(--border)" }}
            aria-hidden="true"
          />
          <Link
            href={SITE.cta.href}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold transition-all hover:-translate-y-0.5"
            style={{
              background: "var(--terracotta)",
              color: "var(--cream-3)",
              borderRadius: 2,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--terracotta-2)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "var(--terracotta)")
            }
          >
            {SITE.cta.label}
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
          {mobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
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
              const hasDrop =
                item.hasMega || (item.subItems && item.subItems.length > 0);
              const open = mobileSubOpen === item.href;
              const active = isActive(item.href);
              if (!hasDrop) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="py-3 text-base font-medium border-b border-white/[0.06]"
                    style={{
                      color: active ? "var(--terracotta-aa)" : "var(--ink)",
                      borderLeft: active
                        ? "3px solid var(--terracotta)"
                        : "3px solid transparent",
                      paddingLeft: active ? 10 : 0,
                    }}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                );
              }
              return (
                <div key={item.href} className="border-b border-white/[0.06]">
                  {/* Label NAVIGATES to index; chevron-only button toggles submenu (Fix 5). */}
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex-1 py-3 text-base font-medium"
                      style={{
                        color: active ? "var(--terracotta)" : "var(--ink)",
                        borderLeft: active
                          ? "3px solid var(--terracotta)"
                          : "3px solid transparent",
                        paddingLeft: active ? 10 : 0,
                      }}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                    <button
                      onClick={() => setMobileSubOpen(open ? null : item.href)}
                      className="p-3 -mr-1"
                      style={{ color: "var(--ink)" }}
                      aria-expanded={open}
                      aria-label={`Toggle ${item.label} submenu`}
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
                      />
                    </button>
                  </div>
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
                              const href = (
                                "href" in svc && typeof svc.href === "string"
                                  ? svc.href
                                  : `/services/${svc.slug}`
                              ) as string;
                              return (
                                <li key={svc.slug}>
                                  <Link
                                    href={href}
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-2.5 py-1.5 text-sm text-fg-muted hover:text-skynet-primary-light"
                                  >
                                    {Icon && (
                                      <Icon className="w-3.5 h-3.5 text-skynet-primary-light/70 flex-shrink-0" />
                                    )}
                                    {svc.label}
                                    {"badge" in svc &&
                                      typeof svc.badge === "string" && (
                                        <span
                                          style={{
                                            fontFamily: "var(--font-mono)",
                                            fontSize: 9,
                                            fontWeight: 700,
                                            letterSpacing: "0.12em",
                                            padding: "2px 7px",
                                            background: "var(--terracotta)",
                                            color: "var(--cream)",
                                            borderRadius: 999,
                                            marginLeft: 6,
                                          }}
                                        >
                                          {svc.badge}
                                        </span>
                                      )}
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
                          aria-current={
                            pathname === sub.href ? "page" : undefined
                          }
                          className="block py-2 text-sm transition-colors"
                          style={{
                            color: "var(--ink-2)",
                            wordBreak: "break-word",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.color = "var(--terracotta)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.color = "var(--ink-2)")
                          }
                        >
                          {sub.label}
                          {sub.desc && (
                            <span
                              className="block text-[11px] mt-0.5"
                              style={{
                                color: "var(--ink-faint)",
                                wordBreak: "break-word",
                              }}
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
                href={SITE.cta.href}
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center gap-1.5 w-full"
                style={{
                  background: "var(--terracotta)",
                  color: "var(--cream-3)",
                  borderRadius: 2,
                  padding: "14px 24px",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: 15,
                }}
              >
                {SITE.cta.label}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
