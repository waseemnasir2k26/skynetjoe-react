"use client";

import { useEffect, useRef, useState } from "react";
import { InlineWidget, useCalendlyEventListener } from "react-calendly";

// Claims discipline (CLAIMS-WHITELIST.md): no statistics, no client names,
// no testimonials, no guarantees, no asserted reply-time numbers. The SMS
// walkthrough is fictional — "Simulated demonstration" ribbon stays the FIRST
// visible element of the phone mock.

const WHATSAPP_URL =
  "https://wa.me/6281316077185?text=Hi%20Waseem%20—%20saw%20the%20HVAC%20speed-to-lead%20page.";
const INSTAGRAM_URL = "https://instagram.com/waseemnasir009";
const CALENDLY_URL =
  "https://calendly.com/skynetlabs/schedule-a-free-consultation";

function fireFbq(event: string, eventId?: string) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { fbq?: (...args: unknown[]) => void };
  // eventID is shared with the server CAPI mirror so Meta dedupes the pair.
  if (w.fbq)
    w.fbq("track", event, {}, eventId ? { eventID: eventId } : undefined);
}

function newEventId() {
  try {
    return crypto.randomUUID();
  } catch {
    return `ev_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
  }
}

// Ad-level attribution: Ads Manager appends ?utm_content=<ad name> via url_tags.
function utmContent() {
  if (typeof window === "undefined") return undefined;
  return (
    new URLSearchParams(window.location.search).get("utm_content") || undefined
  );
}

const css = `
  .s2l-wrap { max-width: 840px; margin: 0 auto; padding: 0 20px;
    --ink: #1a1a1a; --cream: #f2efe6; --rust: #c66b3f; --rust-soft: #e8a075; }

  @keyframes s2l-ring { 0%,100%{transform:rotate(0)} 4%{transform:rotate(-14deg)} 8%{transform:rotate(12deg)} 12%{transform:rotate(-10deg)} 16%{transform:rotate(8deg)} 20%{transform:rotate(0)} }
  @keyframes s2l-pulse { 0%,100%{box-shadow:0 0 0 0 rgba(198,107,63,.45)} 60%{box-shadow:0 0 0 16px rgba(198,107,63,0)} }
  @keyframes s2l-pop { from{opacity:0;transform:translateY(14px) scale(.97)} to{opacity:1;transform:none} }
  @keyframes s2l-dotty { 0%,60%,100%{opacity:.25;transform:translateY(0)} 30%{opacity:1;transform:translateY(-3px)} }
  @keyframes s2l-shine { from{transform:translateX(-120%) skewX(-18deg)} to{transform:translateX(240%) skewX(-18deg)} }
  @keyframes s2l-word { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:none} }
  @keyframes s2l-draw { from{transform:scaleY(0)} to{transform:scaleY(1)} }
  @keyframes s2l-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }

  /* ---------- HERO ---------- */
  .s2l-hero { padding: 56px 0 30px; position: relative; }
  .s2l-eyebrow { display:inline-flex; align-items:center; gap:10px;
    font-family: var(--font-mono-plex), monospace; font-size:.74rem; letter-spacing:.16em;
    text-transform:uppercase; color:var(--rust); font-weight:600; margin:0 0 20px;
    border:1px solid rgba(198,107,63,.4); border-radius:99px; padding:7px 14px; background:rgba(198,107,63,.06); }
  .s2l-eyebrow .dot { width:8px; height:8px; border-radius:50%; background:var(--rust); animation:s2l-pulse 2.2s infinite; }
  .s2l-hero h1 { font-weight:800; font-size:clamp(2.3rem,6.8vw,4rem); line-height:1.03; letter-spacing:-.028em; color:var(--ink); margin:0 0 18px; }
  .s2l-hero h1 .w { display:inline-block; opacity:0; animation:s2l-word .6s cubic-bezier(.2,.7,.2,1) forwards; }
  .s2l-hero h1 em { font-style:normal; color:var(--rust); }
  .s2l-hero .sub { font-size:clamp(1.05rem,2.4vw,1.25rem); color:#2a2a2a; max-width:660px; margin:0 0 22px; line-height:1.55;
    opacity:0; animation:s2l-word .7s .55s forwards; }

  .s2l-livebar { display:flex; align-items:center; gap:12px; flex-wrap:wrap;
    background:var(--ink); color:var(--cream); border-radius:14px; padding:14px 18px; margin:0 0 22px;
    opacity:0; animation:s2l-word .7s .75s forwards; }
  .s2l-livebar .ph { font-size:1.5rem; display:inline-block; animation:s2l-ring 2.8s infinite; transform-origin:50% 10%; }
  .s2l-livebar .t { font-family:var(--font-mono-plex),monospace; font-size:.92rem; }
  .s2l-livebar .t b { color:var(--rust-soft); }

  .s2l-spec { display:flex; justify-content:space-between; gap:12px; flex-wrap:wrap;
    border-top:2px solid var(--ink); border-bottom:2px solid var(--ink); padding:14px 2px; margin:0 0 8px;
    font-family:var(--font-mono-plex),monospace; font-size:.82rem; font-weight:700; letter-spacing:.06em; color:var(--ink);
    opacity:0; animation:s2l-word .7s .9s forwards; }

  /* ---------- SECTIONS + REVEAL ---------- */
  .s2l-sec { padding:40px 0 8px; }
  .s2l-sec h2 { font-size:clamp(1.55rem,3.8vw,2.1rem); letter-spacing:-.02em; color:var(--ink); margin:0 0 6px; font-weight:800; }
  .s2l-sec .lead { color:#444; margin:0 0 24px; font-size:1rem; }
  .s2l-rev { opacity:0; transform:translateY(26px); transition:opacity .65s ease, transform .65s cubic-bezier(.2,.7,.2,1); }
  .s2l-rev.in { opacity:1; transform:none; }

  /* ---------- WORKFLOW ---------- */
  .s2l-step { display:flex; gap:18px; align-items:flex-start; background:#fff; border:1px solid rgba(26,26,26,.12);
    border-radius:16px; padding:18px; transition:transform .25s ease, box-shadow .25s ease; }
  .s2l-step:hover { transform:translateY(-4px); box-shadow:0 14px 34px rgba(26,26,26,.12); }
  .s2l-step .icon { flex-shrink:0; width:54px; height:54px; border-radius:14px; background:var(--ink); color:var(--cream);
    display:flex; align-items:center; justify-content:center; font-size:1.45rem; }
  .s2l-step.hot .icon { background:var(--rust); animation:s2l-pulse 2.6s infinite; }
  .s2l-step .txt h3 { margin:2px 0 5px; font-size:1.06rem; }
  .s2l-step .txt p { margin:0; color:#444; font-size:.95rem; line-height:1.5; }
  .s2l-step .num { margin-left:auto; font-family:var(--font-mono-plex),monospace; color:rgba(26,26,26,.3); font-weight:800; font-size:1.1rem; flex-shrink:0; }
  .s2l-conn { width:3px; height:30px; background:var(--rust); margin:2px 0 2px 26px; border-radius:2px;
    transform-origin:top; transform:scaleY(0); }
  .s2l-rev.in .s2l-conn { animation:s2l-draw .5s .3s forwards; }

  /* ---------- PHONE / SMS DEMO ---------- */
  .s2l-phone { background:var(--ink); border-radius:26px; padding:18px 15px 20px; max-width:410px; margin:0 auto;
    box-shadow:0 18px 60px rgba(26,26,26,.3); border:1px solid rgba(242,239,230,.12); animation:s2l-float 6s ease-in-out infinite; }
  .s2l-sim-ribbon { display:block; text-align:center; font-family:var(--font-mono-plex),monospace; font-size:.68rem;
    letter-spacing:.13em; text-transform:uppercase; color:var(--ink); background:#f4c26b; border-radius:9px;
    padding:7px 10px; margin:0 0 12px; font-weight:700; }
  .s2l-phone .statusrow { display:flex; justify-content:space-between; color:rgba(242,239,230,.55);
    font-family:var(--font-mono-plex),monospace; font-size:.7rem; padding:0 4px 10px; }
  .s2l-bubbles { display:flex; flex-direction:column; gap:9px; min-height:390px; }
  .s2l-b { max-width:84%; padding:10px 13px; border-radius:16px; font-size:.92rem; line-height:1.42;
    animation:s2l-pop .35s cubic-bezier(.2,.7,.2,1); }
  .s2l-b.sys { background:#3b3b3b; color:var(--cream); align-self:flex-start; border-bottom-left-radius:5px; }
  .s2l-b.cust { background:var(--rust); color:var(--cream); align-self:flex-end; border-bottom-right-radius:5px; }
  .s2l-b .who { display:block; font-size:.66rem; opacity:.6; margin-bottom:3px; font-family:var(--font-mono-plex),monospace; letter-spacing:.08em; text-transform:uppercase; }
  .s2l-typing { display:inline-flex; gap:5px; padding:12px 15px; background:#3b3b3b; border-radius:16px; border-bottom-left-radius:5px; align-self:flex-start; animation:s2l-pop .25s; }
  .s2l-typing i { width:7px; height:7px; border-radius:50%; background:var(--cream); animation:s2l-dotty 1.1s infinite; }
  .s2l-typing i:nth-child(2){animation-delay:.18s} .s2l-typing i:nth-child(3){animation-delay:.36s}
  .s2l-phone .cap { text-align:center; color:rgba(242,239,230,.5); font-size:.73rem; margin:12px 0 0; }
  .s2l-replay { display:block; margin:10px auto 0; background:transparent; border:1px solid rgba(242,239,230,.35);
    color:rgba(242,239,230,.8); border-radius:9px; padding:6px 14px; font-size:.78rem; cursor:pointer; }
  .s2l-replay:hover { border-color:var(--rust-soft); color:var(--rust-soft); }

  /* ---------- PAIN ---------- */
  .s2l-pain { list-style:none; padding:0; margin:0; display:grid; grid-template-columns:1fr 1fr; gap:12px; }
  @media (max-width:640px){ .s2l-pain { grid-template-columns:1fr; } }
  .s2l-pain li { background:#fff; border:1px solid rgba(26,26,26,.14); border-radius:14px; padding:16px;
    font-size:.97rem; display:flex; gap:12px; align-items:flex-start; transition:transform .22s ease, border-color .22s ease; }
  .s2l-pain li:hover { transform:translateY(-3px); border-color:var(--rust); }
  .s2l-pain li b { color:var(--rust); display:block; margin-bottom:2px; }
  .s2l-pain .tick { flex-shrink:0; font-size:1.3rem; }

  /* ---------- FAQ ---------- */
  .s2l-faq { display:flex; flex-direction:column; gap:10px; }
  .s2l-faq details { background:#fff; border:1px solid rgba(26,26,26,.14); border-radius:12px; overflow:hidden; }
  .s2l-faq summary { cursor:pointer; padding:15px 18px; font-weight:700; font-size:.98rem; list-style:none; display:flex; justify-content:space-between; align-items:center; }
  .s2l-faq summary::-webkit-details-marker { display:none; }
  .s2l-faq summary::after { content:"+"; font-size:1.3rem; color:var(--rust); transition:transform .25s; }
  .s2l-faq details[open] summary::after { transform:rotate(45deg); }
  .s2l-faq .a { padding:0 18px 15px; color:#444; font-size:.94rem; line-height:1.55; }

  /* ---------- PRICE / CONTACT ---------- */
  .s2l-price-card { background:var(--ink); color:var(--cream); border-radius:18px; padding:30px 28px; margin:8px 0 16px; position:relative; overflow:hidden; }
  .s2l-price-card h2 { color:var(--cream); margin:0 0 6px; font-size:1.45rem; }
  .s2l-price-row { display:flex; gap:28px; flex-wrap:wrap; margin:16px 0 8px; }
  .s2l-price-row .p .n { font-size:2.1rem; font-weight:800; font-family:var(--font-mono-plex),monospace; }
  .s2l-price-row .p .l { display:block; font-size:.76rem; letter-spacing:.1em; text-transform:uppercase; color:rgba(242,239,230,.6); margin-top:2px; font-family:var(--font-mono-plex),monospace; }
  .s2l-price-card .fine { font-size:.9rem; color:rgba(242,239,230,.75); margin:10px 0 0; line-height:1.55; }
  .s2l-contact { display:flex; gap:12px; flex-wrap:wrap; margin:20px 0 8px; }
  .s2l-cbtn { position:relative; overflow:hidden; display:inline-flex; align-items:center; gap:8px; text-decoration:none;
    font-weight:800; font-size:1.02rem; padding:15px 22px; border-radius:13px; transition:transform .2s ease; }
  .s2l-cbtn:hover { transform:translateY(-2px); }
  .s2l-cbtn.wa { background:#25d366; color:#10391f; animation:s2l-pulse 3s infinite; }
  .s2l-cbtn.wa::after { content:""; position:absolute; inset:0; width:34%;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,.55),transparent); animation:s2l-shine 3.4s 1s infinite; }
  .s2l-cbtn.ig { background:transparent; color:var(--cream); border:2px solid rgba(242,239,230,.5); }
  .s2l-cbtn.ig:hover { border-color:var(--rust-soft); color:var(--rust-soft); }
  .s2l-founder { font-size:.93rem; color:rgba(242,239,230,.85); margin:14px 0 0; line-height:1.55; }
  .s2l-foot-note { color:#6b6b6b; font-size:.84rem; margin:26px 0 90px; }

  .s2l-hero-cta { display:inline-flex; align-items:center; gap:8px; background:var(--rust); color:#fff;
    font-weight:800; font-size:1.05rem; padding:15px 24px; border-radius:13px; text-decoration:none;
    margin:0 0 24px; animation:s2l-pulse 3s infinite; transition:transform .2s ease;
    opacity:0; animation:s2l-word .7s 1.05s forwards, s2l-pulse 3s 1.8s infinite; }
  .s2l-hero-cta:hover { transform:translateY(-2px); }

  /* ---------- BOOK A CALL ---------- */
  .s2l-book-card { background:#fff; border:1px solid rgba(26,26,26,.16); border-radius:18px; padding:28px 26px; max-width:560px; margin:0 auto;
    box-shadow:0 14px 44px rgba(26,26,26,.10); }
  .s2l-book-card h3 { margin:0 0 6px; font-size:1.2rem; }
  .s2l-book-card .hint { color:#444; font-size:.93rem; margin:0 0 16px; line-height:1.5; }
  .s2l-book-card input.fld { width:100%; box-sizing:border-box; border:1.5px solid rgba(26,26,26,.25); border-radius:11px;
    padding:13px 14px; font-size:1rem; font-family:inherit; background:#fff; color:var(--ink); }
  .s2l-book-card input.fld:focus { outline:none; border-color:var(--rust); }
  .s2l-book-btn { width:100%; border:none; cursor:pointer; background:var(--rust); color:#fff; font-weight:800; font-size:1.05rem;
    padding:15px 20px; border-radius:13px; margin-top:12px; transition:transform .2s ease; }
  .s2l-book-btn:hover { transform:translateY(-2px); }
  .s2l-book-btn:disabled { opacity:.6; cursor:wait; }
  .s2l-book-err { color:#b3261e; font-size:.88rem; margin:10px 0 0; }
  .s2l-book-wrap { background:#fff; border:1px solid rgba(26,26,26,.16); border-radius:18px; padding:8px; position:relative; overflow:hidden; }
  .s2l-book-done { position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
    background:rgba(242,239,230,.95); z-index:10; text-align:center; font-weight:800; font-size:1.15rem; color:var(--ink); padding:0 20px; }

  /* ---------- STICKY MOBILE CTA ---------- */
  .s2l-sticky { position:fixed; left:0; right:0; bottom:0; z-index:60; display:flex; gap:10px; align-items:center;
    background:rgba(26,26,26,.96); backdrop-filter:blur(6px); padding:10px 16px calc(10px + env(safe-area-inset-bottom));
    transform:translateY(110%); transition:transform .4s cubic-bezier(.2,.7,.2,1); }
  .s2l-sticky.show { transform:none; }
  .s2l-sticky .txt { color:var(--cream); font-size:.85rem; line-height:1.3; flex:1; min-width:0; }
  .s2l-sticky a { flex-shrink:0; background:#25d366; color:#10391f; font-weight:800; text-decoration:none;
    padding:11px 16px; border-radius:11px; font-size:.92rem; }

  @media (prefers-reduced-motion: reduce) {
    .s2l-wrap *, .s2l-wrap *::after { animation:none !important; transition:none !important; opacity:1 !important; transform:none !important; }
  }
`;

const FLOW = [
  {
    icon: "📞",
    hot: true,
    h: "A homeowner calls. You're on the tools.",
    p: "Mid-install, on a roof, elbow-deep in a condenser — the call rings out. Today, that homeowner dials the next HVAC company on the list.",
  },
  {
    icon: "💬",
    hot: false,
    h: "The system texts them back",
    p: "The moment the call rings out, an AI assistant opens a real text conversation with the caller — as your business, in plain English.",
  },
  {
    icon: "❓",
    hot: false,
    h: "It qualifies the job",
    p: "No cooling? Heating out? Emergency call-out or routine aircon service? It asks what your office would ask, and politely filters the tyre-kickers.",
  },
  {
    icon: "📅",
    hot: false,
    h: "It books the job onto your calendar",
    p: "The caller picks a slot you actually have free. Confirmation goes to them, notification goes to you.",
  },
  {
    icon: "🔔",
    hot: true,
    h: "You finish the job in front of you",
    p: "You climb down the ladder to a booked appointment, not a missed-call log. That's the whole machine.",
  },
];

const CONVO: { side: "sys" | "cust"; who: string; text: string }[] = [
  {
    side: "sys",
    who: "Your business",
    text: "Hi, this is the assistant for [Your HVAC Co] — sorry we missed your call, the techs are on jobs. What's going on with your system?",
  },
  {
    side: "cust",
    who: "Homeowner",
    text: "Aircon stopped blowing cold this afternoon. It's 38 degrees out.",
  },
  {
    side: "sys",
    who: "Your business",
    text: "That's rough in this heat. Is the unit running but blowing warm, or not turning on at all?",
  },
  { side: "cust", who: "Homeowner", text: "Running but warm air." },
  {
    side: "sys",
    who: "Your business",
    text: "Got it — sounds like a service call. We have tomorrow 8:30 AM or 1:00 PM open. Which works?",
  },
  { side: "cust", who: "Homeowner", text: "8:30." },
  {
    side: "sys",
    who: "Your business",
    text: "Booked ✔ You'll get a confirmation text now, and the tech gets your address and notes. See you at 8:30.",
  },
];

const PAINS = [
  {
    icon: "🔧",
    b: "After-hours rings out.",
    t: "Evening and weekend emergency calls — the highest-value HVAC work there is — go to voicemail.",
  },
  {
    icon: "🪜",
    b: "The owner IS the office.",
    t: "Most small trade outfits quote, dispatch, invoice and answer the phone — from the attic, on a ladder, in a roof cavity.",
  },
  {
    icon: "📵",
    b: "Voicemail nobody uses.",
    t: "Homeowners with a dead AC don't leave messages. They call the next company.",
  },
  {
    icon: "💸",
    b: "Answering service books nothing.",
    t: "You pay someone to take a message. The message isn't a job on your calendar.",
  },
];

const FAQS = [
  {
    q: "Is this an answering service?",
    a: "No. An answering service takes a message. This holds the conversation, qualifies the job and books it straight onto your calendar — then notifies you. No human middleman, no message pile.",
  },
  {
    q: "Does it replace my office staff?",
    a: "It catches what they can't: ring-outs, after-hours, weekends, the calls that come while everyone's busy. Whatever your office already handles stays exactly as it is.",
  },
  {
    q: "What do I need on my side?",
    a: "Your existing phone number and a calendar. I wire everything around what you already use — done-for-you, tuned to how you actually book jobs before anything goes live.",
  },
  {
    q: "What does it cost?",
    a: "Straight pricing: $2,500 one-time build, $395/month to run. No hidden tiers.",
  },
  {
    q: "How do I know it works?",
    a: "You experience it yourself before you pay a cent — fill the form in the ad or WhatsApp me, and watch how you're handled. The follow-up you get is the product.",
  },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".s2l-rev");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.18 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function LiveClock() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-AU", {
        hour: "numeric",
        minute: "2-digit",
        timeZone: "Australia/Sydney",
      }).format(new Date());
    setNow(fmt());
    const id = setInterval(() => setNow(fmt()), 15000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="s2l-livebar">
      <span className="ph">📞</span>
      <span className="t">
        Right now it&apos;s <b>{now ?? "…"}</b> in Sydney. If your phone rang
        this second — <b>who&apos;s answering it?</b>
      </span>
    </div>
  );
}

function SmsDemo() {
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);
  const [run, setRun] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          setRun((r) => r + 1);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (run === 0) return;
    setShown(0);
    setTyping(false);
    let i = 0;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const next = () => {
      if (cancelled || i >= CONVO.length) return;
      setTyping(true);
      timers.push(
        setTimeout(
          () => {
            if (cancelled) return;
            setTyping(false);
            i += 1;
            setShown(i);
            timers.push(setTimeout(next, 900));
          },
          CONVO[i].side === "sys" ? 1300 : 800,
        ),
      );
    };
    timers.push(setTimeout(next, 600));
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [run]);

  return (
    <div className="s2l-phone" ref={boxRef}>
      <span className="s2l-sim-ribbon">
        Simulated demonstration — fictional conversation
      </span>
      <div className="statusrow">
        <span>MESSAGES</span>
        <span>now</span>
      </div>
      <div className="s2l-bubbles">
        {CONVO.slice(0, shown).map((m) => (
          <div key={m.text} className={`s2l-b ${m.side}`}>
            <span className="who">{m.who}</span>
            {m.text}
          </div>
        ))}
        {typing && (
          <span className="s2l-typing">
            <i />
            <i />
            <i />
          </span>
        )}
      </div>
      <p className="cap">
        Illustration of the flow — wording is tailored to your company.
      </p>
      <button className="s2l-replay" onClick={() => setRun((r) => r + 1)}>
        ↻ Replay conversation
      </button>
    </div>
  );
}

// Free-call booking: same gate→calendar pattern as /lp/ai-audit. Email gate
// posts the lead (fires pixel Lead + CAPI mirror via /api/leads) BEFORE the
// calendar opens; the Calendly onEventScheduled then fires Schedule and
// updates the same leadId. Booking is never blocked by a CRM hiccup.
function BookCall() {
  const [lead, setLead] = useState<{
    name: string;
    email: string;
    leadId: string;
  } | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [trap, setTrap] = useState(""); // honeypot — humans never see it
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [scheduled, setScheduled] = useState(false);
  const [mountedAt] = useState(() => Date.now());

  useCalendlyEventListener({
    onEventScheduled: async (e) => {
      if (!lead || scheduled) return;
      setScheduled(true);
      const eventId = newEventId();
      fireFbq("Schedule", eventId);
      try {
        await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            leadId: lead.leadId,
            source: "lp-speed-to-lead",
            email: lead.email,
            eventId,
            booking: {
              event: e.data.payload?.event?.uri,
              invitee: e.data.payload?.invitee?.uri,
              inviteeEmail: lead.email,
              inviteeName: lead.name,
              scheduledAt: new Date().toISOString(),
            },
            utm: {
              source: "meta",
              medium: "paid-social",
              campaign: "hvac-speed-to-lead-2026",
              content: utmContent(),
            },
            submittedAt: new Date().toISOString(),
          }),
        });
      } catch (e2) {
        console.error("[lp-speed-to-lead] booking POST failed", e2);
      }
    },
  });

  async function unlock(ev: React.FormEvent) {
    ev.preventDefault();
    const n = name.trim().slice(0, 120);
    const em = email.trim().slice(0, 200);
    if (!n || n.length < 2) {
      setErr("A name and a working email — that's all it needs.");
      return;
    }
    if (
      !/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(em) ||
      /@(test|example|mailinator|guerrillamail|10minutemail|tempmail|trashmail|yopmail)\./i.test(
        em,
      )
    ) {
      setErr("That email doesn't look deliverable.");
      return;
    }
    if (/https?:\/\/|www\.|<|>/i.test(n)) {
      setErr("Just your name — no links needed here.");
      return;
    }
    const isBot = Boolean(trap) || Date.now() - mountedAt < 3000;
    setErr("");
    setBusy(true);
    const eventId = newEventId();
    if (!isBot) fireFbq("Lead", eventId);
    const leadId = `lead_${Date.now().toString(36)}_${Math.random()
      .toString(36)
      .slice(2, 8)}`;
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId,
          source: "lp-speed-to-lead",
          email: em,
          eventId,
          ...(isBot ? { _honeypot: "1" } : {}),
          qualification: {
            email: em,
            firstName: n.split(/\s+/)[0],
            lastName: n.split(/\s+/).slice(1).join(" ") || undefined,
          },
          utm: {
            source: "meta",
            medium: "paid-social",
            campaign: "hvac-speed-to-lead-2026",
            content: utmContent(),
          },
          submittedAt: new Date().toISOString(),
        }),
      });
    } catch (e) {
      console.error("[lp-speed-to-lead] lead POST failed", e);
    }
    setLead({ name: n, email: em, leadId });
    setBusy(false);
  }

  if (lead)
    return (
      <div className="s2l-book-wrap">
        <InlineWidget
          url={CALENDLY_URL}
          prefill={{ name: lead.name, email: lead.email }}
          utm={{
            utmSource: "meta",
            utmMedium: "paid-social",
            utmCampaign: "hvac-speed-to-lead-2026",
          }}
          styles={{ height: "700px", minWidth: "300px" }}
          pageSettings={{
            backgroundColor: "FAF7F0",
            primaryColor: "C66B3F",
            textColor: "1A1A1A",
            hideGdprBanner: true,
          }}
          iframeTitle="SkynetLabs · Free 15-minute call"
        />
        {scheduled && (
          <div className="s2l-book-done">
            Slot locked ✔ Check your email for the confirmation.
          </div>
        )}
      </div>
    );

  return (
    <form className="s2l-book-card" onSubmit={unlock}>
      <h3>Book a free 15-minute call</h3>
      <p className="hint">
        No pitch deck, no obligation — we look at how your calls are handled
        today and whether this fits. Calendar opens right after.
      </p>
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={trap}
        onChange={(e) => setTrap(e.target.value)}
        style={{
          position: "absolute",
          left: -9999,
          width: 1,
          height: 1,
          opacity: 0,
        }}
      />
      <div style={{ display: "grid", gap: 12 }}>
        <input
          className="fld"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
        />
        <input
          className="fld"
          type="email"
          placeholder="Email for the call details"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
      </div>
      {err && <p className="s2l-book-err">{err}</p>}
      <button className="s2l-book-btn" type="submit" disabled={busy}>
        {busy ? "Opening calendar…" : "Pick a time →"}
      </button>
    </form>
  );
}

function StickyCta() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className={`s2l-sticky${show ? " show" : ""}`}>
      <span className="txt">
        <b>HVAC missed-call rescue</b> — free 15-min call
      </span>
      <a href="#book">📅 Book a call</a>
    </div>
  );
}

export default function SpeedToLeadClient() {
  useReveal();
  const headline = ["Your", "missed", "calls", "are"];
  return (
    <div className="s2l-wrap">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <section className="s2l-hero">
        <p className="s2l-eyebrow">
          <span className="dot" /> HVAC · AI Speed-to-Lead · SkynetLabs
        </p>
        <h1>
          {headline.map((w, i) => (
            <span
              key={w}
              className="w"
              style={{ animationDelay: `${0.06 * i}s` }}
            >
              {w}&nbsp;
            </span>
          ))}
          <span className="w" style={{ animationDelay: "0.3s" }}>
            <em>your competitor&apos;s</em>&nbsp;
          </span>
          <span className="w" style={{ animationDelay: "0.4s" }}>
            best salesman.
          </span>
        </h1>
        <p className="sub">
          Built for HVAC businesses with crews on the road. When a call comes in
          and nobody can answer — after-hours, on a roof, mid-repair — this
          system texts the caller back, qualifies the job and books it onto your
          calendar. You stay on the tools.
        </p>
        <LiveClock />
        <a className="s2l-hero-cta" href="#book">
          📅 Book a free 15-min call →
        </a>
        <div className="s2l-spec">
          <span>HVAC · AC REPAIR · HEATING</span>
          <span>DONE-FOR-YOU BUILD</span>
          <span>YOU OWN THE CALENDAR</span>
        </div>
      </section>

      <section className="s2l-sec">
        <div className="s2l-rev">
          <h2>How the machine works</h2>
          <p className="lead">
            One flow, five moves. I build and wire the whole thing for you.
          </p>
        </div>
        {FLOW.map((s, i) => (
          <div key={s.h} className="s2l-rev">
            <div className={`s2l-step${s.hot ? " hot" : ""}`}>
              <div className="icon">{s.icon}</div>
              <div className="txt">
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </div>
              <span className="num">0{i + 1}</span>
            </div>
            {i < FLOW.length - 1 && <div className="s2l-conn" />}
          </div>
        ))}
      </section>

      <section className="s2l-sec">
        <div className="s2l-rev">
          <h2>What the homeowner sees</h2>
          <p className="lead">
            A walkthrough of the kind of conversation the system holds — watch
            it play. Scripted illustration, not a recording of a real customer.
          </p>
        </div>
        <div className="s2l-rev">
          <SmsDemo />
        </div>
      </section>

      <section className="s2l-sec">
        <div className="s2l-rev">
          <h2>Sound familiar?</h2>
          <p className="lead">
            If any of these are your week, this is the fix.
          </p>
        </div>
        <ul className="s2l-pain">
          {PAINS.map((p) => (
            <li key={p.b} className="s2l-rev">
              <span className="tick">{p.icon}</span>
              <span>
                <b>{p.b}</b>
                {p.t}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="s2l-sec" id="book">
        <div className="s2l-rev">
          <h2>See if it fits — free 15-minute call</h2>
          <p className="lead">
            Bring your phone habits, I&apos;ll show you the machine. Straight
            answers, no pitch deck.
          </p>
        </div>
        <div className="s2l-rev">
          <BookCall />
        </div>
      </section>

      <section className="s2l-sec">
        <div className="s2l-rev">
          <h2>Straight questions</h2>
          <p className="lead">The things owners ask before they message me.</p>
        </div>
        <div className="s2l-faq s2l-rev">
          {FAQS.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <div className="a">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="s2l-sec">
        <div className="s2l-price-card s2l-rev">
          <h2>Straight pricing</h2>
          <div className="s2l-price-row">
            <div className="p">
              <span className="n">$2,500</span>
              <span className="l">one-time build</span>
            </div>
            <div className="p">
              <span className="n">$395/mo</span>
              <span className="l">to run it</span>
            </div>
          </div>
          <p className="fine">
            Done-for-you: I build it, wire it to your phone line and calendar,
            and tune the conversation to how you actually book jobs. I&apos;m
            Waseem Nasir, founder of SkynetLabs — I build these systems myself.
          </p>
          <div className="s2l-contact">
            <a
              className="s2l-cbtn wa"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 WhatsApp me directly
            </a>
            <a
              className="s2l-cbtn ig"
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              📷 @waseemnasir009
            </a>
          </div>
          <p className="s2l-founder">
            Fastest route: WhatsApp <b>+62 813-1607-7185</b> — message me
            &quot;HVAC&quot; and I&apos;ll reply personally. Or fill the form in
            the ad and watch how fast you hear from me: that speed is the
            product.
          </p>
        </div>
        <p className="s2l-foot-note">
          SkynetLabs builds operations automation — lead routing, booking flows,
          follow-up systems. The walkthrough above is a simulated demonstration;
          your build is configured for your company, your service area and your
          calendar before anything goes live.
        </p>
      </section>

      <StickyCta />
    </div>
  );
}
