"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV_PRIMARY, SERVICE_CATEGORIES } from "@/lib/site";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  if (pathname?.startsWith("/lp/")) return null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container-x flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-extrabold tracking-tight">
            <span className="gradient-primary-text">Skynet</span>
            <span className="text-fg">Labs</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_PRIMARY.map((item) => (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={() => item.hasMega && setMegaOpen(true)}
              onMouseLeave={() => item.hasMega && setMegaOpen(false)}
            >
              <Link
                href={item.href}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-fg-muted hover:text-fg transition-colors"
              >
                {item.label}
                {item.hasMega && <ChevronDown className="w-3.5 h-3.5 opacity-60" />}
              </Link>

              {item.hasMega && megaOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[920px]">
                  <div className="glass rounded-2xl p-8 grid grid-cols-4 gap-6 shadow-2xl">
                    {SERVICE_CATEGORIES.map((cat) => (
                      <div key={cat.name}>
                        <h4 className="text-xs uppercase tracking-wider text-skynet-primary font-semibold mb-3">
                          {cat.name}
                        </h4>
                        <ul className="space-y-2">
                          {cat.services.map((svc) => (
                            <li key={svc.slug}>
                              <Link
                                href={`/services/${svc.slug}`}
                                className="block text-sm text-fg-muted hover:text-skynet-primary-light transition-colors"
                              >
                                {svc.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <Link href="/discovery-call" className="btn-primary text-sm">
            Apply for a call
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-fg"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden glass border-t border-white/10">
          <nav className="container-x px-6 py-6 flex flex-col gap-1">
            {NAV_PRIMARY.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-base font-medium text-fg hover:text-skynet-primary-light border-b border-white/5"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 flex items-center gap-2">
              <ThemeToggle />
              <Link
                href="/discovery-call"
                onClick={() => setMobileOpen(false)}
                className="btn-primary flex-1 justify-center"
              >
                Apply for a call
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
