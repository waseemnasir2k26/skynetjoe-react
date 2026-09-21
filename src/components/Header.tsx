"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { NAV_PRIMARY, NAV_CTA } from "@/lib/site";

/**
 * Site header — flat six-item nav + one CTA (2026-09-21 simplification).
 * No mega menus, no dropdowns, no announcement bar. Desktop renders the
 * links inline; below `lg` a full-width drawer lists the same items.
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
          <Link
            href={NAV_CTA.href}
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
            <div className="mt-5">
              <Link
                href={NAV_CTA.href}
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
