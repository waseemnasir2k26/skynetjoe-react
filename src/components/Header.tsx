"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV_PRIMARY, SERVICE_CATEGORIES } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);

  if (pathname?.startsWith("/lp/")) return null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mega-menu on route change
  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  const openMega = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setMegaOpen(true);
  };

  const scheduleCloseMega = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 180);
  };

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
              onMouseEnter={() => item.hasMega && openMega()}
              onMouseLeave={() => item.hasMega && scheduleCloseMega()}
            >
              <Link
                href={item.href}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-fg-muted hover:text-fg transition-colors"
                onClick={() => item.hasMega && setMegaOpen(false)}
              >
                {item.label}
                {item.hasMega && (
                  <ChevronDown
                    className={`w-3.5 h-3.5 opacity-60 transition-transform ${
                      megaOpen ? "rotate-180" : ""
                    }`}
                  />
                )}
              </Link>

              {item.hasMega && megaOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 w-[960px] pt-3"
                  onMouseEnter={openMega}
                  onMouseLeave={scheduleCloseMega}
                >
                  <div className="glass rounded-2xl p-8 grid grid-cols-4 gap-6 shadow-2xl border border-white/10">
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
                    <div className="col-span-4 mt-2 pt-4 border-t border-white/10 flex items-center justify-between text-sm">
                      <span className="text-fg-muted">
                        16 services · ship in 5–14 days
                      </span>
                      <Link
                        href="/services"
                        className="text-skynet-primary-light hover:text-skynet-primary font-medium"
                      >
                        View all services →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link href="/discovery-call" className="btn-primary text-sm">
            Apply for a call
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-fg"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden glass border-t border-white/10 max-h-[calc(100vh-72px)] overflow-y-auto">
          <nav className="container-x px-6 py-6 flex flex-col gap-1">
            {NAV_PRIMARY.map((item) =>
              item.hasMega ? (
                <div key={item.href} className="border-b border-white/5">
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="w-full flex items-center justify-between py-3 text-base font-medium text-fg"
                    aria-expanded={mobileServicesOpen}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        mobileServicesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {mobileServicesOpen && (
                    <div className="pb-3 pl-3 space-y-4">
                      {SERVICE_CATEGORIES.map((cat) => (
                        <div key={cat.name}>
                          <div className="text-[11px] uppercase tracking-wider text-skynet-primary font-semibold mb-1.5">
                            {cat.name}
                          </div>
                          <ul className="space-y-1.5">
                            {cat.services.map((svc) => (
                              <li key={svc.slug}>
                                <Link
                                  href={`/services/${svc.slug}`}
                                  onClick={() => setMobileOpen(false)}
                                  className="block py-1 text-sm text-fg-muted hover:text-skynet-primary-light"
                                >
                                  {svc.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      <Link
                        href="/services"
                        onClick={() => setMobileOpen(false)}
                        className="inline-block pt-2 text-sm text-skynet-primary-light font-medium"
                      >
                        View all services →
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-base font-medium text-fg hover:text-skynet-primary-light border-b border-white/5"
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="mt-4">
              <Link
                href="/discovery-call"
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full justify-center"
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
