"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, X, Send, ArrowRight } from "lucide-react";

type Msg = {
  id: number;
  from: "bot" | "user";
  text: string;
  cta?: { label: string; href: string };
};

const INITIAL: Msg = {
  id: 0,
  from: "bot",
  text: "Hey 👋 I'm Waseem's assistant. Ask me about services, pricing, n8n automation, AEO/SEO, chatbots — or how to book a call.",
};

function botReply(input: string, nextId: number): Msg {
  const q = input.toLowerCase().trim();
  const has = (...keys: string[]) => keys.some((k) => q.includes(k));
  const reply = (text: string, cta?: Msg["cta"]): Msg => ({
    id: nextId,
    from: "bot",
    text,
    cta,
  });

  // ── Specific topics first (most → least specific) ──
  if (
    has("book", "call", "audit", "consult", "meeting", "schedule", "discovery")
  )
    return reply(
      "Easiest path: book a free 30-min call on the contact page — or send a 3-field brief there and Waseem replies within 8 hours.",
      { label: "Book a call", href: "/contact" },
    );

  if (
    has("price", "cost", "how much", "budget", "rate", "pricing", "quote", "$")
  )
    return reply(
      "Pricing is public — no mystery quotes. Starter from $1,497 up to $9,500 for a flagship build. Fixed scope, returned within 48h of your brief.",
      { label: "See pricing", href: "/pricing" },
    );

  if (
    has(
      "n8n",
      "automat",
      "workflow",
      "zapier",
      "make.com",
      "integrat",
      "no-code",
      "nocode",
    )
  )
    return reply(
      "Automation is our core: n8n/Make/Zapier workflows that run while you sleep — lead capture, CRM sync, reminders, billing. n8n self-hosted for the heavy stuff. Want the n8n vs Zapier breakdown?",
      { label: "n8n vs Zapier", href: "/n8n-vs-zapier" },
    );

  if (
    has(
      "aeo",
      "geo",
      "seo",
      "rank",
      "google",
      "chatgpt",
      "perplexity",
      "citation",
      "answer engine",
      "llm",
    )
  )
    return reply(
      "AEO/GEO = getting your business cited by ChatGPT, Perplexity & Google AI Overviews, not just ranked. We build answer-first content + schema so AI engines quote you. Full playbook in the guide.",
      { label: "Read the AEO guide", href: "/aeo-guide" },
    );

  if (
    has(
      "chatbot",
      "chat bot",
      "whatsapp",
      "ai agent",
      "agent",
      "support bot",
      "receptionist",
    )
  )
    return reply(
      "We build AI chatbots & agents — web chat, WhatsApp, voice receptionists — wired into your CRM so they book calls and answer FAQs 24/7.",
      { label: "AI Chatbots", href: "/services/ai-chatbots" },
    );

  if (
    has("content", "video", "reel", "youtube", "tiktok", "social media", "post")
  )
    return reply(
      "AI content at volume: reels, shorts, talking-head video, and faceless channel pipelines — voice-locked to your brand.",
      { label: "Browse services", href: "/services" },
    );

  if (
    has(
      "website",
      "site",
      "web ",
      "develop",
      "next.js",
      "nextjs",
      "wordpress",
      "shopify",
      "ecommerce",
      "landing",
    )
  )
    return reply(
      "We ship custom Next.js sites, WordPress SEO blogs, and Shopify/e-commerce builds — AEO-tuned, 7–14 day ship window.",
      { label: "Browse services", href: "/services" },
    );

  if (
    has(
      "service",
      "offer",
      "what do you do",
      "what can you",
      "help with",
      "do you do",
    )
  )
    return reply(
      "16 productized services across Automation, AI Content, Development & Consulting — n8n, GoHighLevel, chatbots, AEO sites, AI video and more.",
      { label: "Browse services", href: "/services" },
    );

  if (
    has(
      "about",
      "who are",
      "who is",
      "who's",
      "your story",
      "yourself",
      "waseem",
      "founder",
    )
  )
    return reply(
      "SkynetLabs is run solo by Waseem Nasir from Bali — n8n + AI automation, AEO sites and GHL CRM systems for service businesses. 4 builds/month max, 14-day ship.",
      { label: "About Waseem", href: "/author/waseem-nasir" },
    );

  if (
    has(
      "where",
      "located",
      "location",
      "bali",
      "based",
      "country",
      "timezone",
      "remote",
    )
  )
    return reply(
      "Based in Canggu, Bali (GMT+8) with roots in Lahore, Pakistan. Fully remote — clients across 9 countries.",
      { label: "Book a call", href: "/contact" },
    );

  if (has("contact", "email", "reach", "get in touch", "phone", "number"))
    return reply(
      "Everything lives on the contact page — book a call or send a short brief. 8-hour reply on weekdays.",
      { label: "Contact", href: "/contact" },
    );

  // ── Greetings / smalltalk ──
  if (has("how are you", "how r u", "how are u", "how's it", "hows it"))
    return reply(
      "Running smooth, thanks for asking 🙂 I can help with services, pricing, n8n automation, AEO or booking a call — what are you after?",
      { label: "Browse services", href: "/services" },
    );

  if (
    has(
      "hi",
      "hello",
      "hey",
      "yo",
      "sup",
      "good morning",
      "good evening",
      "salam",
      "assalam",
    )
  )
    return reply(
      "Hey! 👋 Ask me about services, pricing, n8n automation, AEO/SEO, chatbots — or say 'book a call'.",
    );

  if (
    has(
      "thank",
      "thanks",
      "great",
      "awesome",
      "cool",
      "nice",
      "perfect",
      "ok",
      "okay",
      "got it",
    )
  )
    return reply(
      "Anytime! Want me to point you to services, pricing, or set up a quick call?",
      { label: "Book a call", href: "/contact" },
    );

  // ── Helpful fallback (not a dead-end) ──
  return reply(
    "Not sure I caught that — I can help with: services, pricing, n8n/automation, AEO/SEO, chatbots, or booking a call. Which one?",
    { label: "Browse services", href: "/services" },
  );
}

const MOBILE_QUERY = "(max-width: 767px)";
function subscribeMobileQuery(onChange: () => void) {
  const mq = window.matchMedia(MOBILE_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
function getMobileSnapshot(): boolean | null {
  return window.matchMedia(MOBILE_QUERY).matches;
}
function getMobileServerSnapshot(): boolean | null {
  return null;
}

export default function LiveChat() {
  const pathname = usePathname();
  // Default CLOSED — panel never auto-covers content on first load.
  // On desktop (≥768 px) a #livechat-open deep-link may auto-open the panel;
  // on phones it shows only the floating button (matchMedia gate below).
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([INITIAL]);
  const [modalOpen, setModalOpen] = useState(false);
  // Mobile (<768 px): the launcher used to sit bottom-right at 64 px and
  // covered the hero's primary CTA at 390 px (home-mob.png, 2026-09-21).
  // Now it is 44 px, bottom-LEFT, 12 px inset, and stays hidden while the
  // hero (#hero, or the page's first <section>) is in view. Desktop unchanged.
  // Viewport class comes from matchMedia as an external store: null during
  // SSR/hydration (launcher not rendered, so a phone never flashes the 64 px
  // desktop bubble over the hero), then true/false once the client snapshot
  // is read.
  const isMobile = useSyncExternalStore(
    subscribeMobileQuery,
    getMobileSnapshot,
    getMobileServerSnapshot,
  );
  // Keyed by pathname so a stale "hero in view" from the previous route can
  // never hide the launcher on a page that has no hero at all.
  const [heroState, setHeroState] = useState<{
    path: string | null;
    inView: boolean;
  }>({ path: null, inView: false });
  const heroInView = heroState.path === pathname && heroState.inView;

  useEffect(() => {
    if (!isMobile || typeof IntersectionObserver === "undefined") return;
    const hero =
      document.getElementById("hero") ??
      document.querySelector<HTMLElement>("main section");
    if (!hero) return;
    const path = pathname;
    // Service funnels pin their own CTA bar to the bottom (.sf-sticky); two
    // fixed elements in the same corner overlapped at 390 px (jury r2).
    if (document.querySelector(".sf-sticky")) {
      const t = window.setTimeout(
        () => setHeroState({ path, inView: true }),
        0,
      );
      return () => window.clearTimeout(t);
    }
    // Watch the hero AND the closing CTA band: the launcher covered the
    // final CTA's micro-copy at 390 px (jury 2026-09-21).
    const watched = [hero, document.getElementById("final-cta")].filter(
      (el): el is HTMLElement => Boolean(el),
    );
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      // Any sliver of a watched block on screen keeps the launcher hidden.
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        }
        setHeroState({ path, inView: visible.size > 0 });
      },
      { threshold: 0 },
    );
    watched.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // Re-run per route: the hero element changes with the page.
  }, [isMobile, pathname]);

  // Hide the chat bubble while a modal popup is open (one overlay at a time).
  useEffect(() => {
    const h = (e: Event) => setModalOpen(Boolean((e as CustomEvent).detail));
    window.addEventListener("skynet:modal", h);
    return () => window.removeEventListener("skynet:modal", h);
  }, []);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onAnchor(e: MouseEvent) {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const a = t.closest('a[href="#livechat-open"]');
      if (a) {
        e.preventDefault();
        setOpen(true);
        try {
          sessionStorage.removeItem("livechat-closed");
        } catch {}
      }
    }
    function onHashChange() {
      if (window.location.hash === "#livechat-open") {
        setOpen(true);
        try {
          sessionStorage.removeItem("livechat-closed");
        } catch {}
      }
    }
    document.addEventListener("click", onAnchor);
    window.addEventListener("hashchange", onHashChange);
    // P0 mobile fix (audit-2026-06-28): gate page-load auto-open behind
    // matchMedia so a #livechat-open deep-link only expands the panel on
    // desktop (≥768 px). Phones show only the floating button; user taps
    // to open on intent. Anchor-click and hashchange remain ungated
    // because those are explicit user actions regardless of screen size.
    // Deferred one tick: the hash is external state read after hydration,
    // and opening synchronously inside the effect body would cascade a
    // render before the first paint settles.
    let deepLink = 0;
    if (
      window.location.hash === "#livechat-open" &&
      window.matchMedia("(min-width: 768px)").matches
    ) {
      deepLink = window.setTimeout(onHashChange, 0);
    }
    return () => {
      window.clearTimeout(deepLink);
      document.removeEventListener("click", onAnchor);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [msgs, open]);

  if (pathname?.startsWith("/lp/freight-")) return null;
  // /contact carries the Calendly embed + brief form; the bubble would sit on
  // top of the primary CTA there for no gain.
  if (pathname === "/contact") return null;
  if (modalOpen && !open) return null;

  function send() {
    const text = draft.trim();
    if (!text) return;
    setMsgs((prev) => {
      const userMsg: Msg = { id: prev.length, from: "user", text };
      const bot = botReply(text, prev.length + 1);
      return [...prev, userMsg, bot];
    });
    setDraft("");
  }

  return (
    <>
      <style>{`
        @keyframes livechat-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        @keyframes livechat-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes livechat-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.55; transform: scale(1.25); }
        }
      `}</style>

      {/* Floating button — flat terracotta, pulsing + ring + "Chat" label.
          Mobile: 44 px, bottom-left, 12 px inset, hidden while the hero is
          on screen so it never overlaps the primary CTA. */}
      {!open && isMobile !== null && !(isMobile && heroInView) && (
        <div
          className={
            isMobile
              ? "fixed z-[60] flex items-center gap-2"
              : "fixed right-5 z-[60] flex items-center gap-2"
          }
          style={
            isMobile
              ? {
                  left: 12,
                  bottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)",
                }
              : { bottom: "calc(env(safe-area-inset-bottom, 0px) + 88px)" }
          }
        >
          {!isMobile && (
            <span
              aria-hidden
              style={{
                background: "var(--ink)",
                color: "var(--cream-3)",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                padding: "6px 10px",
                borderRadius: 2,
                boxShadow: "0 8px 20px rgba(26,26,26,0.25)",
              }}
            >
              Chat
            </span>
          )}
          <div
            style={{
              position: "relative",
              width: isMobile ? 44 : 64,
              height: isMobile ? 44 : 64,
            }}
          >
            <span
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 2,
                background: "var(--terracotta)",
                opacity: 0.5,
                animation: "livechat-ring 2s ease-out infinite",
                pointerEvents: "none",
              }}
            />
            <button
              onClick={() => {
                setOpen(true);
                try {
                  sessionStorage.removeItem("livechat-closed");
                } catch {}
              }}
              aria-label="Open live chat"
              className="flex items-center justify-center transition"
              style={{
                position: "relative",
                width: isMobile ? 44 : 64,
                height: isMobile ? 44 : 64,
                background: "var(--terracotta)",
                color: "var(--cream-3)",
                borderRadius: 2,
                border: "1px solid rgba(26,26,26,0.18)",
                boxShadow:
                  "0 24px 60px rgba(198,107,63,0.45), 0 8px 20px rgba(26,26,26,0.25)",
                cursor: "pointer",
                animation: "livechat-pulse 1.5s ease-in-out infinite",
              }}
            >
              <MessageCircle className={isMobile ? "w-5 h-5" : "w-7 h-7"} />
            </button>
          </div>
        </div>
      )}

      {/* Panel — cream paper */}
      {open && (
        <div
          className="fixed right-3 sm:right-5 z-[60] w-[380px] max-w-[calc(100vw-1.5rem)] overflow-hidden flex flex-col"
          style={{
            bottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)",
            maxHeight: "min(70vh, 540px)",
            background: "var(--cream-3)",
            border: "1px solid rgba(26,26,26,0.20)",
            borderRadius: 2,
            boxShadow:
              "0 32px 80px rgba(26,26,26,0.35), 0 12px 30px rgba(198,107,63,0.18)",
            fontFamily: "var(--font-sans)",
            position: "fixed",
          }}
        >
          {/* Terracotta top rule */}
          <span
            aria-hidden
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: "var(--terracotta)",
            }}
          />

          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{
              background: "var(--cream-2)",
              borderBottom: "1px solid rgba(26,26,26,0.12)",
              marginTop: 3,
            }}
          >
            <div className="flex items-center gap-2">
              <MessageCircle
                className="w-4 h-4"
                style={{ color: "var(--terracotta)" }}
              />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  fontWeight: 700,
                  color: "var(--ink)",
                }}
              >
                Chat with SkynetLabs
              </span>
              <span
                aria-hidden
                title="Online"
                style={{
                  display: "inline-block",
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: "var(--sage, #8A9A7B)",
                  marginLeft: 4,
                  animation: "livechat-dot 1.4s ease-in-out infinite",
                  boxShadow: "0 0 0 2px rgba(138,154,123,0.18)",
                }}
              />
            </div>
            <button
              onClick={() => {
                setOpen(false);
                try {
                  sessionStorage.setItem("livechat-closed", "1");
                } catch {}
              }}
              aria-label="Close chat"
              style={{
                color: "var(--ink-faint)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages — a11y: live region so SR users hear bot replies as they arrive */}
          <div
            ref={scrollRef}
            role="log"
            aria-live="polite"
            aria-atomic="false"
            aria-label="Chat messages"
            className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5"
            style={{ background: "var(--cream-3)" }}
          >
            {msgs.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className="max-w-[85%] px-3.5 py-2 text-sm leading-relaxed"
                  style={
                    m.from === "user"
                      ? {
                          background: "var(--terracotta)",
                          color: "var(--cream-3)",
                          borderRadius: 2,
                        }
                      : {
                          background: "var(--cream-2)",
                          color: "var(--ink)",
                          border: "1px solid rgba(26,26,26,0.10)",
                          borderRadius: 2,
                        }
                  }
                >
                  {m.text}
                  {m.cta && (
                    <Link
                      href={m.cta.href}
                      onClick={() => {
                        setOpen(false);
                        try {
                          sessionStorage.setItem("livechat-closed", "1");
                        } catch {}
                      }}
                      className="mt-2 inline-flex items-center gap-1"
                      style={{
                        color:
                          m.from === "user"
                            ? "var(--cream-3)"
                            : "var(--terracotta)",
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        fontWeight: 700,
                        textDecoration: "none",
                      }}
                    >
                      {m.cta.label} <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex items-center gap-2 px-3 py-2.5"
            style={{
              borderTop: "1px solid rgba(26,26,26,0.12)",
              background: "var(--cream-2)",
            }}
          >
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type a question…"
              className="flex-1 px-3 py-2 text-sm outline-none"
              style={{
                background: "var(--cream-3)",
                color: "var(--ink)",
                border: "1px solid rgba(26,26,26,0.18)",
                borderRadius: 2,
                fontFamily: "var(--font-sans)",
              }}
            />
            <button
              type="submit"
              disabled={!draft.trim()}
              aria-label="Send"
              className="w-9 h-9 flex items-center justify-center"
              style={{
                background: "var(--terracotta)",
                color: "var(--cream-3)",
                borderRadius: 2,
                border: "none",
                cursor: draft.trim() ? "pointer" : "not-allowed",
                opacity: draft.trim() ? 1 : 0.4,
              }}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
