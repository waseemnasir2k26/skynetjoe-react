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
    "Hey 👋 I'm Waseem's assistant. Ask me about services, pricing, n8n automation, AEO/SEO, chatbots — or how to book a call.",
};

function botReply(input: string, nextId: number): Msg {
  const q = input.toLowerCase().trim();
  const has = (...keys: string[]) => keys.some((k) => q.includes(k));
  const reply = (text: string, cta?: Msg["cta"]): Msg => ({ id: nextId, from: "bot", text, cta });

  // ── Specific topics first (most → least specific) ──
  if (has("book", "call", "audit", "consult", "meeting", "schedule", "discovery"))
    return reply(
      "Easiest path: apply for a free discovery call. 3-min brief, Waseem reads every one personally and replies within 8 hours.",
      { label: "Apply for a call", href: "/discovery-call" }
    );

  if (has("price", "cost", "how much", "budget", "rate", "pricing", "quote", "$"))
    return reply(
      "Pricing is public — no mystery quotes. Starter from $1,497 up to $9,500 for a flagship build. Fixed scope, returned within 48h of your brief.",
      { label: "See pricing", href: "/pricing" }
    );

  if (has("n8n", "automat", "workflow", "zapier", "make.com", "integrat", "no-code", "nocode"))
    return reply(
      "Automation is our core: n8n/Make/Zapier workflows that run while you sleep — lead capture, CRM sync, reminders, billing. n8n self-hosted for the heavy stuff. Want the n8n vs Zapier breakdown?",
      { label: "n8n vs Zapier", href: "/n8n-vs-zapier" }
    );

  if (has("aeo", "geo", "seo", "rank", "google", "chatgpt", "perplexity", "citation", "answer engine", "llm"))
    return reply(
      "AEO/GEO = getting your business cited by ChatGPT, Perplexity & Google AI Overviews, not just ranked. We build answer-first content + schema so AI engines quote you. Full playbook in the guide.",
      { label: "Read the AEO guide", href: "/aeo-guide" }
    );

  if (has("chatbot", "chat bot", "whatsapp", "ai agent", "agent", "support bot", "receptionist"))
    return reply(
      "We build AI chatbots & agents — web chat, WhatsApp, voice receptionists — wired into your CRM so they book calls and answer FAQs 24/7.",
      { label: "AI Chatbots", href: "/services/ai-chatbots" }
    );

  if (has("content", "video", "reel", "youtube", "tiktok", "social media", "post"))
    return reply(
      "AI content at volume: reels, shorts, talking-head video, and faceless channel pipelines — voice-locked to your brand.",
      { label: "Browse services", href: "/services" }
    );

  if (has("website", "site", "web ", "develop", "next.js", "nextjs", "wordpress", "shopify", "ecommerce", "landing"))
    return reply(
      "We ship custom Next.js sites, WordPress SEO blogs, and Shopify/e-commerce builds — AEO-tuned, 7–14 day ship window.",
      { label: "Browse services", href: "/services" }
    );

  if (has("service", "offer", "what do you do", "what can you", "help with", "do you do"))
    return reply(
      "16 productized services across Automation, AI Content, Development & Consulting — n8n, GoHighLevel, chatbots, AEO sites, AI video and more.",
      { label: "Browse services", href: "/services" }
    );

  if (has("about", "who are", "who is", "who's", "your story", "yourself", "waseem", "founder"))
    return reply(
      "SkynetLabs is run solo by Waseem Nasir from Bali — n8n + AI automation, AEO sites and GHL CRM systems for service businesses. 4 builds/month max, 14-day ship.",
      { label: "About Waseem", href: "/author/waseem-nasir" }
    );

  if (has("where", "located", "location", "bali", "based", "country", "timezone", "remote"))
    return reply(
      "Based in Canggu, Bali (GMT+8) with roots in Lahore, Pakistan. Fully remote — clients across 9 countries.",
      { label: "Apply for a call", href: "/discovery-call" }
    );

  if (has("contact", "email", "reach", "get in touch", "phone", "number"))
    return reply(
      "Fastest is the discovery form (8-hour reply). Or reach us via the contact page.",
      { label: "Contact", href: "/contact" }
    );

  // ── Greetings / smalltalk ──
  if (has("how are you", "how r u", "how are u", "how's it", "hows it"))
    return reply(
      "Running smooth, thanks for asking 🙂 I can help with services, pricing, n8n automation, AEO or booking a call — what are you after?",
      { label: "Browse services", href: "/services" }
    );

  if (has("hi", "hello", "hey", "yo", "sup", "good morning", "good evening", "salam", "assalam"))
    return reply(
      "Hey! 👋 Ask me about services, pricing, n8n automation, AEO/SEO, chatbots — or say 'book a call'.",
    );

  if (has("thank", "thanks", "great", "awesome", "cool", "nice", "perfect", "ok", "okay", "got it"))
    return reply(
      "Anytime! Want me to point you to services, pricing, or set up a quick call?",
      { label: "Apply for a call", href: "/discovery-call" }
    );

  // ── Helpful fallback (not a dead-end) ──
  return reply(
    "Not sure I caught that — I can help with: services, pricing, n8n/automation, AEO/SEO, chatbots, or booking a call. Which one?",
    { label: "Browse services", href: "/services" }
  );
}

export default function LiveChat() {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const [draft, setDraft] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([INITIAL]);
  const [modalOpen, setModalOpen] = useState(false);

  // Hide the chat bubble while a modal popup is open (one overlay at a time).
  useEffect(() => {
    const h = (e: Event) => setModalOpen(Boolean((e as CustomEvent).detail));
    window.addEventListener("skynet:modal", h);
    return () => window.removeEventListener("skynet:modal", h);
  }, []);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const closed = sessionStorage.getItem("livechat-closed");
      if (closed === "1") setOpen(false);
    } catch {}
  }, []);

  useEffect(() => {
    function onAnchor(e: MouseEvent) {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const a = t.closest('a[href="#livechat-open"]');
      if (a) {
        e.preventDefault();
        setOpen(true);
        try { sessionStorage.removeItem("livechat-closed"); } catch {}
      }
    }
    function onHashChange() {
      if (window.location.hash === "#livechat-open") {
        setOpen(true);
        try { sessionStorage.removeItem("livechat-closed"); } catch {}
      }
    }
    document.addEventListener("click", onAnchor);
    window.addEventListener("hashchange", onHashChange);
    if (window.location.hash === "#livechat-open") {
      setOpen(true);
      try { sessionStorage.removeItem("livechat-closed"); } catch {}
    }
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

      {/* Floating button — flat terracotta, pulsing + ring + "Chat" label */}
      {!open && (
        <div
          className="fixed right-5 z-[60] flex items-center gap-2"
          style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 88px)" }}
        >
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
          <div style={{ position: "relative", width: 64, height: 64 }}>
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
                try { sessionStorage.removeItem("livechat-closed"); } catch {}
              }}
              aria-label="Open live chat"
              className="w-16 h-16 flex items-center justify-center transition"
              style={{
                position: "relative",
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
              <MessageCircle className="w-7 h-7" />
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
                try { sessionStorage.setItem("livechat-closed", "1"); } catch {}
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
                        try { sessionStorage.setItem("livechat-closed", "1"); } catch {}
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
