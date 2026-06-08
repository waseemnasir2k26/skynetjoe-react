"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SITE, FOOTER_COLUMNS } from "@/lib/site";
import ToolsStrip from "@/components/cta/ToolsStrip";

const SocialIcon = ({ d, label }: { d: string; label: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-label={label}
    className="w-4 h-4"
  >
    <path d={d} />
  </svg>
);
const ICON_LI =
  "M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.78C.8 0 0 .77 0 1.73v20.54C0 23.23.8 24 1.78 24h20.44C23.2 24 24 23.23 24 22.27V1.73C24 .77 23.2 0 22.22 0z";
const ICON_X =
  "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z";
const ICON_GH =
  "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z";
const ICON_YT =
  "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z";

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/lp/")) return null;

  // ToolsStrip cross-promo: render on every route EXCEPT homepage + /lp/* (already filtered above).
  // On /tools/[slug] pages, hide the current tool from the strip.
  const showToolsStrip =
    pathname !== "/" && pathname !== null && pathname !== undefined;
  let currentSlug: string | undefined;
  if (pathname?.startsWith("/tools/")) {
    const seg = pathname.split("/")[2];
    if (seg) currentSlug = seg;
  }

  return (
    <>
      {showToolsStrip && <ToolsStrip currentSlug={currentSlug} />}
      <footer
        className="mt-14 sm:mt-24 border-t"
        style={{
          background: "var(--cream-2)",
          borderColor: "var(--border)",
        }}
      >
        <div
          className="container-x py-12 sm:py-16"
          style={{
            paddingLeft: "clamp(16px, 5vw, 24px)",
            paddingRight: "clamp(16px, 5vw, 24px)",
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 sm:gap-10">
            <div className="lg:col-span-2">
              <Link
                href="/"
                className="inline-block mb-4"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "var(--ink)",
                  borderBottom: "none",
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
              </Link>
              <p
                className="text-sm leading-relaxed max-w-sm"
                style={{ color: "var(--ink-2)" }}
              >
                {SITE.description}
              </p>
              <div className="flex items-center gap-2 mt-6">
                {[
                  { d: ICON_LI, href: SITE.social.linkedin, label: "LinkedIn" },
                  { d: ICON_X, href: SITE.social.twitter, label: "X" },
                  { d: ICON_GH, href: SITE.social.github, label: "GitHub" },
                  { d: ICON_YT, href: SITE.social.youtube, label: "YouTube" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener"
                    aria-label={s.label}
                    className="w-11 h-11 flex items-center justify-center transition-colors"
                    style={{
                      border: "1px solid var(--border)",
                      color: "var(--ink-2)",
                      background: "var(--cream-3)",
                      borderRadius: 2,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--terracotta)";
                      e.currentTarget.style.borderColor = "var(--terracotta)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--ink-2)";
                      e.currentTarget.style.borderColor = "var(--border)";
                    }}
                  >
                    <SocialIcon d={s.d} label={s.label} />
                  </a>
                ))}
              </div>

              {/* Founder credit — small round founder photo (you talk to the builder) */}
              <div className="flex items-center gap-3 mt-6">
                <span
                  className="hidden min-[400px]:block flex-shrink-0 overflow-hidden"
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 999,
                    border: "2px solid var(--terracotta)",
                  }}
                >
                  <Image
                    src="/portraits/waseem-builder-portrait.jpg"
                    alt="Waseem Nasir, founder of SkynetLabs"
                    width={34}
                    height={34}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </span>
                <span className="text-sm" style={{ color: "var(--ink-2)" }}>
                  Built by Waseem, SkynetLabs · Bali
                </span>
              </div>
            </div>

            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <h4
                  className="mb-4"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: "#A8451F",
                    fontWeight: 600,
                  }}
                >
                  — {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm transition-colors"
                        style={{ color: "var(--ink-2)", borderBottom: "none" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "var(--terracotta)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "var(--ink-2)")
                        }
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.10em",
                color: "var(--ink-faint)",
                wordBreak: "break-word",
              }}
            >
              © {new Date().getFullYear()} {SITE.brand} · Built in Bali by{" "}
              <a
                href={SITE.founderUrl}
                style={{ color: "#A8451F", borderBottom: "1px solid #A8451F" }}
              >
                {SITE.founder}
              </a>
            </p>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.10em",
                color: "var(--ink-faint)",
                wordBreak: "break-word",
                overflowWrap: "anywhere",
              }}
            >
              <a
                href={`mailto:${SITE.email}`}
                style={{
                  color: "var(--ink-2)",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                {SITE.email}
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
