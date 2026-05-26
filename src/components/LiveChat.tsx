"use client";

import { useEffect, useRef, useState } from "react";
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
  text:
    "Hey, I'm Waseem's assistant. How can I help? Try: 'tell me about you' or 'how do I book a call'",
};

function botReply(input: string, nextId: number): Msg {
  const q = input.toLowerCase();
  const has = (...keys: string[]) => keys.some((k) => q.includes(k));

  if (has("about", "you", "waseem", "who")) {
    return {
      id: nextId,
      from: "bot",
      text:
        "SkynetLabs is run by Waseem Nasir, solo from Bali. We build n8n + AI automation, AEO sites, GHL CRM systems for service businesses. 4 client builds/month max, 14-day ship window.",
      cta: { label: "Apply for a call", href: "/discovery-call" },
    };
  }
  if (has("book", "call", "audit", "consult", "meeting")) {
    return {
      id: nextId,
      from: "bot",
      text:
        "Best way: apply at /discovery-call. 3-min brief, reply within 8 hours.",
      cta: { label: "Apply for a call", href: "/discovery-call" },
    };
  }
  if (has("price", "cost", "how much", "budget", "pricing", "rate")) {
    return {
      id: nextId,
      from: "bot",
      text:
        "Public pricing at /pricing. Starts $1,497 (Starter) up to $9,500 (Flagship). No mystery quotes.",
      cta: { label: "See pricing", href: "/pricing" },
    };
  }
  if (has("service", "what do you do", "offer", "build")) {
    return {
      id: nextId,
      from: "bot",
      text:
        "16 productized services across Automation, AI Content, Development, Consulting. See /services for the full list.",
      cta: { label: "Browse services", href: "/services" },
    };
  }
  if (has("where", "location", "bali", "based", "country")) {
    return {
      id: nextId,
      from: "bot",
      text:
        "I'm based in Canggu, Bali (GMT+8) and Lahore, Pakistan. Clients worldwide.",
      cta: { label: "Apply for a call", href: "/discovery-call" },
    };
  }
  return {
    id: nextId,
    from: "bot",
    text:
      "Best to apply for a discovery call — Waseem reads every brief personally and replies in 8 hours.",
    cta: { label: "Apply for a call", href: "/discovery-call" },
  };
}

export default function LiveChat() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([INITIAL]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onAnchor(e: MouseEvent) {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const a = t.closest('a[href="#livechat-open"]');
      if (a) {
        e.preventDefault();
        setOpen(true);
      }
    }
    function onHashChange() {
      if (window.location.hash === "#livechat-open") setOpen(true);
    }
    document.addEventListener("click", onAnchor);
    window.addEventListener("hashchange", onHashChange);
    if (window.location.hash === "#livechat-open") setOpen(true);
    return () => {
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
  if (pathname === "/discovery-call") return null;

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
      {/* Floating button — flat terracotta */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open live chat"
          className="fixed right-5 z-[60] w-14 h-14 flex items-center justify-center transition"
          style={{
            bottom: "calc(env(safe-area-inset-bottom, 0px) + 88px)",
            background: "var(--terracotta)",
            color: "var(--cream-3)",
            borderRadius: 2,
            border: "1px solid rgba(26,26,26,0.18)",
            boxShadow: "0 18px 40px rgba(26,26,26,0.22)",
            cursor: "pointer",
          }}
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Panel — cream paper */}
      {open && (
        <div
          className="fixed right-3 sm:right-5 z-[60] w-[360px] max-w-[calc(100vw-1.5rem)] overflow-hidden flex flex-col"
          style={{
            bottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)",
            maxHeight: "min(70vh, 540px)",
            background: "var(--cream-3)",
            border: "1px solid rgba(26,26,26,0.20)",
            borderRadius: 2,
            boxShadow: "0 28px 70px rgba(26,26,26,0.28)",
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
              <MessageCircle className="w-4 h-4" style={{ color: "var(--terracotta)" }} />
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
            </div>
            <button
              onClick={() => setOpen(false)}
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

          {/* Messages */}
          <div
            ref={scrollRef}
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
                      onClick={() => setOpen(false)}
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
