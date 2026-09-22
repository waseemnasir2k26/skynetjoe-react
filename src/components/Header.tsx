"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { NAV_PRIMARY, NAV_CTA, WHATSAPP } from "@/lib/site";

/**
 * Site header — flat six-item nav + two CTAs (2026-09-21 simplification).
 * No mega menus, no dropdowns, no announcement bar. Desktop renders the
 * links inline; below `lg` a full-width drawer lists the same items.
 *
 * CTA hierarchy (Waseem ruling, 2026-09-23):
 *   1. WhatsApp  — PRIMARY, filled green, first in both desktop and drawer.
 *   2. Book a call — SECONDARY, outline button, second in both.
 *   3. NO "Contact" nav link in the header. /contact is still reachable via
 *      the Book-a-call CTA and the footer Company column; the page itself is
 *      unchanged. NAV_PRIMARY (src/lib/site.ts) is header-only, so this does
 *      not touch the footer.
 */
export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer on route change (back/forward included). "Adjust state
  // during render" pattern — no effect, no cascading render.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

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

        <nav className="hidden lg:flex items-center" aria-label="Primary">
          {NAV_PRIMARY.map((item) => {
            const active = isActive(item.href);
            const restColor = active ? "var(--terracotta-aa)" : "var(--ink-2)";
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex items-center px-3.5 py-2 text-[13px] transition-colors"
                style={{ color: restColor, fontWeight: active ? 600 : 500 }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--terracotta)")
                }
                onMouseLeave={(e) => (e.currentTarget.style.color = restColor)}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
                {active && (
                  <span
                    aria-hidden
                    className="absolute left-3.5 right-3.5 -bottom-0.5 h-[2px]"
                    style={{ background: "var(--terracotta)" }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <span
            className="h-5 w-px"
            style={{ background: "var(--border)" }}
            aria-hidden="true"
          />
          <a
            href={WHATSAPP.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Contact us on WhatsApp, ${WHATSAPP.display}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-semibold transition-all hover:-translate-y-0.5"
            style={{
              background: "#25D366",
              color: "#0b2e1a",
              borderRadius: 2,
            }}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
            </svg>
            {WHATSAPP.label}
          </a>
          {/* SECONDARY CTA (2026-09-23): outline, not filled — WhatsApp above
              is the primary action. Border colour carries the affordance; the
              hover adds a light terracotta wash rather than a solid fill. */}
          <Link
            href={NAV_CTA.href}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold transition-all hover:-translate-y-0.5"
            style={{
              background: "transparent",
              color: "var(--terracotta-aa)",
              border: "1px solid var(--terracotta)",
              borderRadius: 2,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background =
                "color-mix(in srgb, var(--terracotta) 12%, transparent)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            {NAV_CTA.label}
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
          className="lg:hidden backdrop-blur-md max-h-[calc(100vh_-_64px)] overflow-y-auto"
          style={{
            background: "rgba(242, 239, 230, 0.97)",
            borderTop: "1px solid var(--border)",
          }}
        >
          <nav
            className="container-x px-4 sm:px-6 py-6 flex flex-col gap-1"
            aria-label="Primary mobile"
          >
            {NAV_PRIMARY.map((item) => {
              const active = isActive(item.href);
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
            })}
            {/* 2026-09-23 CTA hierarchy: WhatsApp first and filled (primary),
                "Book a call" below it as an outline button (secondary). Order
                here is the visual order in the drawer — do not re-sort. */}
            <div className="mt-5">
              <a
                href={WHATSAPP.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="mt-3 inline-flex items-center justify-center gap-2 w-full"
                style={{
                  background: "#25D366",
                  color: "#0b2e1a",
                  borderRadius: 2,
                  padding: "14px 24px",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: 15,
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
                </svg>
                Contact us on WhatsApp
              </a>
              <Link
                href={NAV_CTA.href}
                onClick={() => setMobileOpen(false)}
                className="mt-3 inline-flex items-center justify-center gap-1.5 w-full"
                style={{
                  background: "transparent",
                  color: "var(--terracotta-aa)",
                  border: "1px solid var(--terracotta)",
                  borderRadius: 2,
                  padding: "13px 24px",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: 15,
                }}
              >
                {NAV_CTA.label}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
