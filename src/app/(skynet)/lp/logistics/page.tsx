import type { Metadata } from "next";
import { MetaPixel, MetaPixelEvents } from "@/components/MetaPixel";
import { SITE } from "@/lib/site";
import LeadCaptureForm from "@/components/cta/LeadCaptureForm";

// Canonical/OG host resolves via SITE.url (env-overridable, defaults to the
// production domain) — same source the rest of the app uses for canonicals.
const PAGE_URL = `${SITE.url.replace(/\/+$/, "")}/lp/logistics`;

export const metadata: Metadata = {
  title: "Dispatch canvas for small-fleet carriers",
  description:
    "Stop running freight ops from six browser tabs and a personal cell. SkynetLabs ships the dispatch canvas — AI voice agent, factoring widget, lane economics — in 14 days. Public pricing. For US small-fleet carriers (5–25 trucks).",
  alternates: { canonical: PAGE_URL },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Dispatch canvas for small-fleet carriers — SkynetLabs",
    description:
      "Six tabs. $847/mo. Voicemail after 8pm. We rebuild the lot in 14 days. Public pricing. Source-controlled.",
    url: PAGE_URL,
    type: "website",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Are you a freight broker or motor carrier?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. SkynetLabs is a software, design, and marketing studio. We build the dispatch dashboard, voice agent, and CRM that sit alongside your broker authority. No FMCSA filings on our end.",
      },
    },
    {
      "@type": "Question",
      name: "What if I already pay for DAT and a TMS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Better. We integrate them. The canvas pulls DAT loads, your TMS data, factoring activity, and broker calls into one screen.",
      },
    },
    {
      "@type": "Question",
      name: "How fast can you actually ship?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Starter ships in 14 calendar days. Pro 21. Premium 30. Flagship 45. Miss the window — nights and weekends free until live.",
      },
    },
    {
      "@type": "Question",
      name: "What happens at month 12?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You own the GitHub repo, n8n workflows, and GHL subaccount on day one. Cancel anytime, keep everything live.",
      },
    },
    {
      "@type": "Question",
      name: "TCPA-compliance on the voice agent?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Inbound-only by default. Outbound requires documented opt-in per FCC 2024 rulings.",
      },
    },
    {
      "@type": "Question",
      name: "I only run 5 trucks. Am I too small?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Starter $1,497 is built for 5–10 trucks. Site + CRM + inbound inbox in 14 days. No monthly retainer.",
      },
    },
  ],
};

const css = `
@keyframes pulse-terracotta { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
@keyframes drift-glow { 0%,100% { transform:translateX(-50%) scale(1); } 50% { transform:translateX(-50%) scale(1.08); } }
@keyframes fade-up { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
@keyframes slide-in-left { from { opacity:0; transform:translateX(-32px); } to { opacity:1; transform:translateX(0); } }
@keyframes scarcity-flash { 0%,100% { background:var(--terracotta-soft); } 50% { background:rgba(198,107,63,0.22); } }
@keyframes scroll-progress { from { transform:scaleX(0); } to { transform:scaleX(1); } }
@keyframes shimmer { 0% { background-position:-200% 0; } 100% { background-position:200% 0; } }
@keyframes pulse-soft { 0%,100% { box-shadow:0 0 0 0 rgba(198,107,63,0.4); } 50% { box-shadow:0 0 0 12px rgba(198,107,63,0); } }
@keyframes bar-fill { from { width:0; } to { width:74%; } }

html { scroll-behavior:smooth; }

.lp-log-v3 { --cream:#F2EFE6; --cream-2:#EDE8DC; --cream-3:#FAF7F0; --ink:#1A1A1A; --ink-2:#3A3A36; --ink-faint:#56564F; --ink-mute:#9a988f; --terracotta:#C66B3F; --terracotta-2:#B85A30; --terracotta-soft:rgba(198,107,63,0.10); --ochre:#C9A96E; --sage:#8A9A7B; --sage-soft:rgba(138,154,123,0.16); --oxblood:#6B2C2C; --rule:rgba(26,26,26,0.10); --rule-strong:rgba(26,26,26,0.22); background:var(--cream); color:var(--ink); font-family:var(--font-sans),var(--font-sans-onest),-apple-system,system-ui,sans-serif; font-size:16px; line-height:1.55; letter-spacing:-0.005em; min-height:100vh; -webkit-font-smoothing:antialiased; font-feature-settings:'cv11','ss01'; }
.lp-log-v3 *,.lp-log-v3 *::before,.lp-log-v3 *::after { box-sizing:border-box; }
.lp-log-v3 a { color:var(--ink); text-decoration:none; }
.lp-log-v3 img { max-width:100%; height:auto; display:block; }
.lp-log-v3 ::selection { background:var(--terracotta); color:var(--cream); }
.lp-log-v3 .wrap { max-width:1200px; margin:0 auto; padding:0 24px; }
.lp-log-v3 .serif { font-family:var(--font-serif-fraunces),Georgia,serif; }
.lp-log-v3 .mono { font-family:var(--font-mono-plex),ui-monospace,monospace; }

/* SCROLL PROGRESS BAR */
.lp-log-v3 .scroll-progress { position:fixed; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,var(--terracotta),var(--ochre)); transform-origin:left; transform:scaleX(0); z-index:60; }
@supports (animation-timeline: scroll()) {
  .lp-log-v3 .scroll-progress { animation:scroll-progress linear; animation-timeline:scroll(); }
}

/* RIBBON */
.lp-log-v3 .ribbon { background:var(--ink); color:var(--cream); padding:9px 24px; text-align:center; font-size:12px; letter-spacing:0.04em; font-weight:500; }
.lp-log-v3 .ribbon strong { color:var(--ochre); font-weight:700; }
.lp-log-v3 .ribbon-pulse { display:inline-block; width:6px; height:6px; background:var(--ochre); border-radius:50%; margin-right:8px; vertical-align:middle; animation:pulse-terracotta 1.6s infinite; }

/* NAV */
.lp-log-v3 .nav { padding:18px 0; background:rgba(242,239,230,0.88); backdrop-filter:saturate(140%) blur(18px); position:sticky; top:0; z-index:50; border-bottom:1px solid var(--rule); }
.lp-log-v3 .nav-inner { display:flex; align-items:center; justify-content:space-between; max-width:1200px; margin:0 auto; padding:0 24px; }
.lp-log-v3 .brand { font-family:var(--font-serif-fraunces),serif; font-weight:600; font-size:22px; letter-spacing:-0.02em; display:flex; align-items:center; gap:10px; }
.lp-log-v3 .brand-dot { width:10px; height:10px; background:var(--terracotta); border-radius:2px; box-shadow:0 0 0 0 rgba(198,107,63,0.6); animation:pulse-soft 2.4s infinite; }
.lp-log-v3 .brand em { color:var(--ink-faint); font-style:italic; font-weight:500; font-size:18px; }
.lp-log-v3 .nav-cta { font-size:13px; font-weight:600; padding:10px 18px; background:var(--ink); color:var(--cream); border-radius:999px; transition:background 0.18s,transform 0.18s; }
.lp-log-v3 .nav-cta:hover { background:var(--terracotta); transform:translateY(-1px); }

/* HERO */
.lp-log-v3 .hero { padding:72px 0 48px; text-align:center; position:relative; overflow:hidden; }
.lp-log-v3 .hero::before { content:''; position:absolute; top:-260px; left:50%; transform:translateX(-50%); width:1200px; height:920px; background:radial-gradient(ellipse at center,rgba(198,107,63,0.20) 0%,rgba(201,169,110,0.12) 30%,rgba(138,154,123,0.06) 55%,transparent 75%); pointer-events:none; z-index:0; animation:drift-glow 14s ease-in-out infinite; }
.lp-log-v3 .hero-inner { position:relative; z-index:1; }
.lp-log-v3 .hero-eyebrow { display:inline-flex; align-items:center; gap:10px; font-size:12px; font-weight:600; color:var(--ink-2); padding:7px 14px; border:1px solid var(--rule-strong); border-radius:999px; margin-bottom:26px; background:rgba(242,239,230,0.6); backdrop-filter:blur(6px); animation:fade-up 0.7s ease-out both; }
.lp-log-v3 .hero-eyebrow .pulse { width:7px; height:7px; background:var(--terracotta); border-radius:50%; box-shadow:0 0 0 4px rgba(198,107,63,0.18); animation:pulse-terracotta 1.6s ease-in-out infinite; }
.lp-log-v3 .hero-eyebrow strong { color:var(--terracotta); font-weight:700; letter-spacing:0.04em; }
.lp-log-v3 .hero h1 { font-family:var(--font-display), system-ui, sans-serif; font-weight:500; font-size:clamp(40px,6vw,76px); line-height:1.02; letter-spacing:-0.035em; margin:0 auto 22px; max-width:18ch; animation:fade-up 0.8s ease-out 0.1s both; }
.lp-log-v3 .hero h1 em { font-style:italic; color:var(--terracotta); font-weight:500; background:linear-gradient(120deg,transparent 0%,transparent 45%,rgba(198,107,63,0.18) 45%,rgba(198,107,63,0.18) 100%); padding:0 4px; }
.lp-log-v3 .hero-sub { font-size:20px; line-height:1.5; color:var(--ink-2); max-width:58ch; margin:0 auto 32px; font-weight:400; animation:fade-up 0.8s ease-out 0.2s both; }
.lp-log-v3 .hero-sub strong { color:var(--ink); font-weight:600; }
.lp-log-v3 .cta-row { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; align-items:center; margin-bottom:24px; animation:fade-up 0.8s ease-out 0.3s both; }
.lp-log-v3 .btn-primary { font-size:15px; font-weight:600; padding:16px 28px; background:var(--ink); color:var(--cream); border-radius:999px; transition:background 0.18s,transform 0.18s,box-shadow 0.18s; display:inline-flex; align-items:center; gap:8px; box-shadow:0 10px 28px rgba(26,26,26,0.18); position:relative; overflow:hidden; }
.lp-log-v3 .btn-primary::after { content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent); background-size:200% 100%; animation:shimmer 3s infinite; pointer-events:none; }
.lp-log-v3 .btn-primary:hover { background:var(--terracotta); transform:translateY(-2px); box-shadow:0 14px 36px rgba(198,107,63,0.36); }
.lp-log-v3 .btn-line { font-size:14px; font-weight:500; color:var(--ink-2); border-bottom:1px solid var(--rule-strong); padding:6px 4px; transition:color 0.18s,border-color 0.18s; }
.lp-log-v3 .btn-line:hover { color:var(--terracotta); border-color:var(--terracotta); }
.lp-log-v3 .hero-scarcity { display:inline-flex; align-items:center; gap:10px; font-size:12px; color:var(--ink-2); padding:8px 14px; background:var(--cream-2); border:1px solid var(--rule); border-radius:999px; letter-spacing:0.04em; margin-top:4px; animation:fade-up 0.8s ease-out 0.4s both,scarcity-flash 3s infinite; }
.lp-log-v3 .hero-scarcity strong { color:var(--terracotta); font-weight:700; }
.lp-log-v3 .hero-scarcity::before { content:'●'; color:var(--terracotta); animation:pulse-terracotta 1.6s ease-in-out infinite; }
.lp-log-v3 .featured-in { margin-top:32px; display:flex; gap:18px 28px; justify-content:center; flex-wrap:wrap; align-items:center; font-size:11px; letter-spacing:0.16em; text-transform:uppercase; color:var(--ink-faint); font-weight:600; animation:fade-up 0.8s ease-out 0.5s both; }
.lp-log-v3 .featured-in span { color:var(--ink-2); display:inline-flex; align-items:center; gap:6px; }
.lp-log-v3 .featured-in span::before { content:''; width:4px; height:4px; background:var(--terracotta); border-radius:50%; }
.lp-log-v3 .featured-lbl { color:var(--terracotta); font-weight:700; }
.lp-log-v3 .scroll-indicator { position:absolute; bottom:24px; left:50%; transform:translateX(-50%); width:34px; height:34px; border:1px solid var(--rule-strong); border-radius:50%; display:flex; align-items:center; justify-content:center; color:var(--ink-2); font-size:14px; text-decoration:none; animation:bounce-down 2.4s ease-in-out infinite; background:var(--cream); z-index:2; }
.lp-log-v3 .scroll-indicator:hover { border-color:var(--terracotta); color:var(--terracotta); }
@keyframes bounce-down { 0%,100% { transform:translateX(-50%) translateY(0); } 50% { transform:translateX(-50%) translateY(6px); } }

/* LIVE TICKER */
.lp-log-v3 .live-ticker { background:var(--ink); color:var(--cream); padding:14px 24px; display:flex; align-items:center; justify-content:center; gap:14px; font-size:13px; letter-spacing:0.02em; flex-wrap:wrap; }
.lp-log-v3 .live-ticker strong { color:var(--ochre); font-family:var(--font-mono-plex),monospace; font-weight:700; padding:0 4px; }
.lp-log-v3 .live-ticker .ticker-pulse { width:8px; height:8px; background:var(--terracotta); border-radius:50%; box-shadow:0 0 0 4px rgba(198,107,63,0.22); animation:pulse-terracotta 1.6s infinite; }
.lp-log-v3 .live-ticker .ticker-lbl { font-size:10px; letter-spacing:0.2em; text-transform:uppercase; color:var(--ochre); font-weight:700; padding-right:6px; }
.lp-log-v3 .live-ticker .sep { color:rgba(242,239,230,0.32); }

/* DASHBOARD MOCKUP */
.lp-log-v3 .mockup-wrap { max-width:1140px; margin:48px auto 0; padding:0 16px; position:relative; animation:fade-up 1s ease-out 0.5s both; }
.lp-log-v3 .mockup { background:#fff; border:1px solid var(--rule-strong); border-radius:14px; overflow:hidden; box-shadow:0 32px 80px rgba(26,26,26,0.14),0 8px 24px rgba(198,107,63,0.10); }
.lp-log-v3 .mockup-bar { display:flex; align-items:center; gap:8px; padding:12px 16px; border-bottom:1px solid var(--rule); background:var(--cream-2); }
.lp-log-v3 .mockup-dots { display:flex; gap:6px; }
.lp-log-v3 .mockup-dots span { width:11px; height:11px; border-radius:50%; }
.lp-log-v3 .mockup-dots span:nth-child(1) { background:#ff5f57; }
.lp-log-v3 .mockup-dots span:nth-child(2) { background:#febc2e; }
.lp-log-v3 .mockup-dots span:nth-child(3) { background:#28c840; }
.lp-log-v3 .mockup-addr { flex:1; text-align:center; font-family:var(--font-mono-plex),monospace; font-size:11px; color:var(--ink-faint); letter-spacing:0.02em; }
.lp-log-v3 .mockup-body { display:grid; grid-template-columns:210px 1fr 290px; min-height:500px; }
@media (max-width:980px) { .lp-log-v3 .mockup-body { grid-template-columns:1fr; } .lp-log-v3 .mock-side,.lp-log-v3 .mock-right { display:none; } }
.lp-log-v3 .mock-side { border-right:1px solid var(--rule); padding:18px 12px; background:var(--cream); }
.lp-log-v3 .mock-side-head { font-size:10px; font-weight:700; color:var(--ink-mute); letter-spacing:0.12em; text-transform:uppercase; padding:6px 10px; margin-bottom:6px; }
.lp-log-v3 .mock-side-item { display:flex; align-items:center; gap:8px; padding:8px 10px; border-radius:6px; font-size:13px; font-weight:500; color:var(--ink-2); margin-bottom:2px; transition:background 0.15s,color 0.15s; }
.lp-log-v3 .mock-side-item:hover { background:rgba(198,107,63,0.06); color:var(--ink); }
.lp-log-v3 .mock-side-item.active { background:#fff; color:var(--ink); box-shadow:inset 0 0 0 1px var(--rule); border-left:2px solid var(--terracotta); padding-left:8px; }
.lp-log-v3 .mock-side-item .badge { margin-left:auto; font-size:10px; background:var(--terracotta); color:var(--cream); padding:1px 6px; border-radius:8px; font-family:var(--font-mono-plex),monospace; animation:pulse-soft 2.4s infinite; }

/* INTERACTIVE TABS — radio-driven CSS-only */
.lp-log-v3 .ws-radio { position:absolute; opacity:0; pointer-events:none; }
.lp-log-v3 .mock-side-item.tab { cursor:pointer; user-select:none; }
.lp-log-v3 .mockup:has(#ws-dispatch:checked) .tab[data-for="ws-dispatch"],
.lp-log-v3 .mockup:has(#ws-lanes:checked) .tab[data-for="ws-lanes"],
.lp-log-v3 .mockup:has(#ws-brokers:checked) .tab[data-for="ws-brokers"],
.lp-log-v3 .mockup:has(#ws-drivers:checked) .tab[data-for="ws-drivers"],
.lp-log-v3 .mockup:has(#ws-factoring:checked) .tab[data-for="ws-factoring"] { background:#fff; color:var(--ink); box-shadow:inset 0 0 0 1px var(--rule); border-left:2px solid var(--terracotta); padding-left:8px; }
.lp-log-v3 .panel { display:none; }
.lp-log-v3 .mockup:has(#ws-dispatch:checked) .panel-dispatch,
.lp-log-v3 .mockup:has(#ws-lanes:checked) .panel-lanes,
.lp-log-v3 .mockup:has(#ws-brokers:checked) .panel-brokers,
.lp-log-v3 .mockup:has(#ws-drivers:checked) .panel-drivers,
.lp-log-v3 .mockup:has(#ws-factoring:checked) .panel-factoring { display:block; animation:fade-up 0.32s ease-out both; }
.lp-log-v3 .interactive-hint { position:absolute; top:14px; right:14px; font-size:10px; letter-spacing:0.18em; text-transform:uppercase; color:var(--terracotta); font-weight:700; padding:5px 10px; background:var(--terracotta-soft); border-radius:999px; z-index:3; pointer-events:none; animation:pulse-terracotta 2s infinite; }

/* Panel-specific styles */
.lp-log-v3 .panel-lanes table,.lp-log-v3 .panel-brokers table,.lp-log-v3 .panel-drivers table,.lp-log-v3 .panel-factoring table { width:100%; border-collapse:collapse; font-size:12.5px; margin-top:6px; }
.lp-log-v3 .panel th { text-align:left; padding:8px 10px; font-size:10px; font-weight:700; color:var(--ink-mute); letter-spacing:0.10em; text-transform:uppercase; border-bottom:1px solid var(--rule); }
.lp-log-v3 .panel td { padding:10px; border-bottom:1px solid var(--rule); color:var(--ink-2); }
.lp-log-v3 .panel td:first-child { color:var(--ink); font-weight:600; }
.lp-log-v3 .panel .num { font-family:var(--font-mono-plex),monospace; font-weight:600; color:var(--ink); }
.lp-log-v3 .panel .num.up { color:var(--sage); }
.lp-log-v3 .panel .num.warm { color:var(--terracotta); }
.lp-log-v3 .panel tr:hover { background:rgba(198,107,63,0.04); }
.lp-log-v3 .driver-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:8px; margin-top:8px; }
.lp-log-v3 .driver-card { padding:12px; border:1px solid var(--rule); border-radius:8px; background:var(--cream); }
.lp-log-v3 .driver-card .nm { font-weight:600; font-size:13px; color:var(--ink); }
.lp-log-v3 .driver-card .st { font-size:10px; font-weight:700; letter-spacing:0.06em; margin-top:2px; }
.lp-log-v3 .driver-card .st.route { color:var(--sage); }
.lp-log-v3 .driver-card .st.idle { color:var(--ink-mute); }
.lp-log-v3 .driver-card .st.off { color:var(--terracotta); }
.lp-log-v3 .driver-card .meta { font-size:11px; color:var(--ink-faint); margin-top:6px; }

/* AI AGENTS interactive tabs (right panel) */
.lp-log-v3 .ai-radio { position:absolute; opacity:0; pointer-events:none; }
.lp-log-v3 .mockup:has(#ai-voice:checked) .ai-tab[data-for="ai-voice"],
.lp-log-v3 .mockup:has(#ai-sms:checked) .ai-tab[data-for="ai-sms"],
.lp-log-v3 .mockup:has(#ai-rate:checked) .ai-tab[data-for="ai-rate"] { background:#fff; color:var(--ink); box-shadow:inset 0 0 0 1px var(--rule); border-left:2px solid var(--terracotta); padding-left:8px; }
.lp-log-v3 .ai-panel { display:none; }
.lp-log-v3 .mockup:has(#ai-voice:checked) .ai-panel-voice,
.lp-log-v3 .mockup:has(#ai-sms:checked) .ai-panel-sms,
.lp-log-v3 .mockup:has(#ai-rate:checked) .ai-panel-rate { display:block; animation:fade-up 0.32s ease-out both; }

/* MOBILE TAB PILLS */
.lp-log-v3 .mobile-tabs { display:none; overflow-x:auto; gap:8px; padding:12px 16px; background:var(--cream); border-bottom:1px solid var(--rule); -webkit-overflow-scrolling:touch; scrollbar-width:none; }
.lp-log-v3 .mobile-tabs::-webkit-scrollbar { display:none; }
.lp-log-v3 .mobile-tabs label { flex:0 0 auto; font-size:12px; font-weight:600; color:var(--ink-2); padding:8px 14px; border:1px solid var(--rule-strong); border-radius:999px; cursor:pointer; background:var(--cream); transition:all 0.18s; white-space:nowrap; }
.lp-log-v3 .mobile-tabs label:hover { color:var(--terracotta); border-color:var(--terracotta); }
.lp-log-v3 .mockup:has(#ws-dispatch:checked) .mobile-tabs label[data-for="ws-dispatch"],
.lp-log-v3 .mockup:has(#ws-lanes:checked) .mobile-tabs label[data-for="ws-lanes"],
.lp-log-v3 .mockup:has(#ws-brokers:checked) .mobile-tabs label[data-for="ws-brokers"],
.lp-log-v3 .mockup:has(#ws-drivers:checked) .mobile-tabs label[data-for="ws-drivers"],
.lp-log-v3 .mockup:has(#ws-factoring:checked) .mobile-tabs label[data-for="ws-factoring"] { background:var(--ink); color:var(--cream); border-color:var(--ink); }
@media (max-width:980px) { .lp-log-v3 .mobile-tabs { display:flex; } .lp-log-v3 .interactive-hint { display:none; } }

/* TILE NUM live pulse — suggests fresh data */
@keyframes val-pulse { 0%,92%,100% { background-color:transparent; } 95% { background-color:rgba(198,107,63,0.12); } }
.lp-log-v3 .mock-tile-num { padding:0 4px; border-radius:4px; animation:val-pulse 5s ease-in-out infinite; }
.lp-log-v3 .mock-tile:nth-child(2) .mock-tile-num { animation-delay:1.6s; }
.lp-log-v3 .mock-tile:nth-child(3) .mock-tile-num { animation-delay:3.2s; }

/* STICKY NAV SCROLL-AWARE SHRINK */
@supports (animation-timeline: scroll()) {
  .lp-log-v3 .nav { animation:nav-shrink linear both; animation-timeline:scroll(root); animation-range:0 240px; }
  @keyframes nav-shrink { to { padding-top:10px; padding-bottom:10px; box-shadow:0 4px 24px rgba(26,26,26,0.06); } }
  .lp-log-v3 .nav .brand { animation:brand-shrink linear both; animation-timeline:scroll(root); animation-range:0 240px; }
  @keyframes brand-shrink { to { font-size:18px; } }
}
.lp-log-v3 .mock-main { padding:22px 24px; background:#fff; }
.lp-log-v3 .mock-h { font-family:var(--font-serif-fraunces),serif; font-size:20px; font-weight:600; margin:0 0 4px; letter-spacing:-0.02em; color:var(--ink); }
.lp-log-v3 .mock-sub { font-size:12px; color:var(--ink-faint); margin-bottom:18px; }
.lp-log-v3 .mock-tiles { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-bottom:20px; }
.lp-log-v3 .mock-tile { padding:14px; border:1px solid var(--rule); border-radius:10px; background:var(--cream); transition:transform 0.2s,border-color 0.2s; }
.lp-log-v3 .mock-tile:hover { transform:translateY(-2px); border-color:var(--terracotta); }
.lp-log-v3 .mock-tile-lbl { font-size:10px; color:var(--ink-mute); font-weight:600; letter-spacing:0.08em; text-transform:uppercase; }
.lp-log-v3 .mock-tile-num { font-family:var(--font-mono-plex),monospace; font-size:24px; font-weight:600; letter-spacing:-0.02em; margin-top:4px; color:var(--ink); }
.lp-log-v3 .mock-tile.up .mock-tile-num { color:var(--sage); }
.lp-log-v3 .mock-tile.warm .mock-tile-num { color:var(--terracotta); }
.lp-log-v3 .mock-tile-delta { font-size:10px; font-weight:600; margin-top:2px; color:var(--ink-faint); }
.lp-log-v3 .mock-tile.up .mock-tile-delta { color:var(--sage); }
.lp-log-v3 .mock-tile.warm .mock-tile-delta { color:var(--terracotta); }
.lp-log-v3 .mock-lanes-h { font-size:10px; font-weight:700; color:var(--ink-mute); letter-spacing:0.12em; text-transform:uppercase; margin-bottom:8px; display:flex; justify-content:space-between; align-items:center; }
.lp-log-v3 .mock-lanes-h .live { color:var(--sage); font-weight:600; display:inline-flex; align-items:center; gap:6px; }
.lp-log-v3 .mock-lanes-h .live::before { content:'●'; animation:pulse-terracotta 1.6s ease-in-out infinite; }
.lp-log-v3 .mock-lane { display:grid; grid-template-columns:1fr auto auto; gap:12px; align-items:center; padding:11px 12px; border:1px solid var(--rule); border-radius:8px; margin-bottom:6px; background:#fff; transition:border-color 0.18s,transform 0.18s; }
.lp-log-v3 .mock-lane:hover { border-color:var(--terracotta); transform:translateX(2px); }
.lp-log-v3 .mock-lane-route { font-size:13px; font-weight:600; color:var(--ink); }
.lp-log-v3 .mock-lane-route small { display:block; font-size:11px; color:var(--ink-faint); margin-top:2px; font-weight:400; }
.lp-log-v3 .mock-lane-rate { font-family:var(--font-mono-plex),monospace; font-size:13px; font-weight:700; color:var(--sage); }
.lp-log-v3 .mock-lane-status { font-size:10px; font-weight:700; padding:3px 8px; border-radius:10px; letter-spacing:0.04em; }
.lp-log-v3 .status-booked { background:var(--sage-soft); color:var(--sage); }
.lp-log-v3 .status-pending { background:rgba(201,169,110,0.18); color:#7a6435; }
.lp-log-v3 .status-routing { background:var(--terracotta-soft); color:var(--terracotta); animation:pulse-terracotta 2s infinite; }
.lp-log-v3 .mock-right { border-left:1px solid var(--rule); padding:22px 18px; background:var(--cream); }
.lp-log-v3 .agent-card { padding:14px; background:#fff; border:1px solid var(--rule); border-radius:10px; margin-bottom:10px; }
.lp-log-v3 .agent-head { display:flex; align-items:center; gap:8px; margin-bottom:8px; }
.lp-log-v3 .agent-pill { font-size:10px; font-weight:700; padding:2px 8px; background:var(--sage-soft); color:var(--sage); border-radius:8px; letter-spacing:0.04em; }
.lp-log-v3 .agent-pulse { width:7px; height:7px; background:var(--sage); border-radius:50%; animation:pulse-terracotta 1.4s infinite; }
.lp-log-v3 .agent-title { font-size:13px; font-weight:700; color:var(--ink); }
.lp-log-v3 .agent-body { font-size:12px; color:var(--ink-2); line-height:1.5; margin-top:6px; }
.lp-log-v3 .agent-body code { font-family:var(--font-mono-plex),monospace; background:var(--cream-2); padding:1px 5px; border-radius:3px; font-size:11px; color:var(--terracotta); }
.lp-log-v3 .factor-card { padding:14px; background:#fff; border:1px solid var(--rule); border-radius:10px; }
.lp-log-v3 .factor-bar { height:6px; background:var(--cream-2); border-radius:3px; overflow:hidden; margin-top:10px; }
.lp-log-v3 .factor-bar-fill { height:100%; background:linear-gradient(90deg,var(--terracotta),var(--ochre)); width:74%; border-radius:3px; animation:bar-fill 2s ease-out 0.8s both; }
.lp-log-v3 .factor-num { font-family:var(--font-mono-plex),monospace; font-size:24px; font-weight:700; color:var(--terracotta); margin-top:4px; letter-spacing:-0.02em; }
.lp-log-v3 .factor-sub { font-size:11px; color:var(--ink-faint); }

/* COMPARISON TABLE */
.lp-log-v3 .compare-wrap { overflow-x:auto; border:1px solid var(--rule-strong); border-radius:16px; background:var(--cream); }
.lp-log-v3 .compare-tbl { width:100%; min-width:760px; border-collapse:collapse; font-size:14px; }
.lp-log-v3 .compare-tbl thead th { padding:18px 16px; text-align:left; font-family:var(--font-serif-fraunces),serif; font-size:13px; font-weight:600; color:var(--ink); border-bottom:2px solid var(--ink); letter-spacing:-0.005em; background:var(--cream-2); }
.lp-log-v3 .compare-tbl thead th.us { background:linear-gradient(180deg,var(--terracotta-soft),transparent); color:var(--terracotta); border-bottom-color:var(--terracotta); }
.lp-log-v3 .compare-tbl tbody td { padding:14px 16px; border-bottom:1px solid var(--rule); vertical-align:top; }
.lp-log-v3 .compare-tbl tbody td:first-child { font-weight:500; color:var(--ink); font-size:14px; }
.lp-log-v3 .compare-tbl tbody td.us { background:rgba(198,107,63,0.04); color:var(--ink); font-weight:500; }
.lp-log-v3 .compare-tbl tbody td.us strong { color:var(--terracotta); font-weight:700; }
.lp-log-v3 .compare-tbl tbody td.bad { color:var(--ink-faint); }
.lp-log-v3 .compare-tbl tbody tr:hover { background:rgba(198,107,63,0.03); }
.lp-log-v3 .check { color:var(--sage); font-weight:700; font-family:var(--font-mono-plex),monospace; }
.lp-log-v3 .xmark { color:var(--ink-mute); font-family:var(--font-mono-plex),monospace; }

/* PROCESS TIMELINE */
.lp-log-v3 .process-track { position:relative; display:grid; grid-template-columns:1fr; gap:24px; }
@media (min-width:768px) { .lp-log-v3 .process-track { grid-template-columns:repeat(4,1fr); gap:16px; } .lp-log-v3 .process-track::before { content:''; position:absolute; top:36px; left:6%; right:6%; height:2px; background:linear-gradient(90deg,var(--terracotta),var(--ochre),var(--sage)); opacity:0.35; z-index:0; } }
.lp-log-v3 .process-step { position:relative; z-index:1; }
.lp-log-v3 .process-marker { width:72px; height:72px; border-radius:50%; background:var(--cream); border:2px solid var(--terracotta); display:flex; align-items:center; justify-content:center; font-family:var(--font-serif-fraunces),serif; font-weight:500; font-size:22px; color:var(--terracotta); margin:0 auto 18px; position:relative; transition:transform 0.2s,box-shadow 0.2s; box-shadow:0 0 0 6px var(--cream); }
.lp-log-v3 .process-step:hover .process-marker { transform:scale(1.08); box-shadow:0 0 0 6px var(--cream),0 12px 28px rgba(198,107,63,0.24); }
.lp-log-v3 .process-marker small { position:absolute; bottom:-6px; right:-6px; background:var(--terracotta); color:var(--cream); font-family:var(--font-mono-plex),monospace; font-size:10px; font-weight:700; padding:3px 8px; border-radius:999px; letter-spacing:0.04em; border:2px solid var(--cream); }
.lp-log-v3 .process-step:nth-child(2) .process-marker { border-color:var(--ochre); color:#7a6435; }
.lp-log-v3 .process-step:nth-child(2) .process-marker small { background:var(--ochre); color:var(--ink); }
.lp-log-v3 .process-step:nth-child(3) .process-marker { border-color:var(--sage); color:var(--sage); }
.lp-log-v3 .process-step:nth-child(3) .process-marker small { background:var(--sage); color:var(--cream); }
.lp-log-v3 .process-step:nth-child(4) .process-marker { border-color:var(--ink); color:var(--ink); background:var(--ink); }
.lp-log-v3 .process-step:nth-child(4) .process-marker { color:var(--cream); }
.lp-log-v3 .process-step:nth-child(4) .process-marker small { background:var(--cream); color:var(--ink); border-color:var(--cream); }
.lp-log-v3 .process-step h4 { font-family:var(--font-serif-fraunces),serif; font-size:19px; font-weight:500; color:var(--ink); margin:0 0 8px; text-align:center; letter-spacing:-0.015em; }
.lp-log-v3 .process-step p { font-size:13.5px; color:var(--ink-2); text-align:center; line-height:1.55; margin:0; }

/* LOGO STRIP — marquee */
.lp-log-v3 .logo-strip { padding:36px 0; border-top:1px solid var(--rule); border-bottom:1px solid var(--rule); background:var(--cream-2); margin-top:64px; overflow:hidden; }
.lp-log-v3 .logo-label { text-align:center; font-size:11px; letter-spacing:0.24em; text-transform:uppercase; color:var(--ink-faint); margin-bottom:18px; font-weight:600; }
.lp-log-v3 .logo-marquee { display:flex; gap:64px; align-items:center; animation:marquee 28s linear infinite; width:max-content; }
@keyframes marquee { from { transform:translateX(0); } to { transform:translateX(-50%); } }
.lp-log-v3 .logo-marquee:hover { animation-play-state:paused; }
.lp-log-v3 .logo-marquee .name { font-family:var(--font-serif-fraunces),serif; font-size:20px; font-weight:500; color:var(--ink); letter-spacing:-0.01em; opacity:0.82; white-space:nowrap; }
.lp-log-v3 .logo-marquee .dot { width:5px; height:5px; background:var(--terracotta); border-radius:50%; opacity:0.5; }

/* SECTIONS */
.lp-log-v3 .section { padding:96px 0; }
.lp-log-v3 .section.tinted { background:var(--cream-2); }
.lp-log-v3 .section.dark { background:var(--ink); color:var(--cream); }
.lp-log-v3 .section.dark .section-kicker { color:var(--ochre); }
.lp-log-v3 .section.dark h2 { color:var(--cream); }
.lp-log-v3 .section.dark .section-sub { color:rgba(242,239,230,0.72); }
.lp-log-v3 .section-head { max-width:820px; margin-bottom:56px; }
.lp-log-v3 .section-kicker { font-size:11px; letter-spacing:0.20em; text-transform:uppercase; color:#A8451F; font-weight:700; margin-bottom:14px; display:inline-flex; align-items:center; gap:10px; }
.lp-log-v3 .section-kicker::before { content:''; width:24px; height:1px; background:var(--terracotta); }
.lp-log-v3 h2 { font-family:var(--font-display),var(--font-serif-fraunces),Georgia,serif; font-size:clamp(30px,4.4vw,52px); font-weight:500; letter-spacing:-0.028em; line-height:1.06; margin:0 0 18px; max-width:22ch; }
.lp-log-v3 h2 em { font-style:italic; color:var(--terracotta); font-weight:500; }
.lp-log-v3 .section-sub { font-size:18px; color:var(--ink-2); line-height:1.55; max-width:60ch; }

/* SCROLL REVEAL */
@supports (animation-timeline: view()) {
  .lp-log-v3 .reveal { animation:fade-up 0.8s ease-out both; animation-timeline:view(); animation-range:entry 0% cover 30%; }
  .lp-log-v3 .reveal-l { animation:slide-in-left 0.8s ease-out both; animation-timeline:view(); animation-range:entry 0% cover 30%; }
}

/* PAIN GRID */
.lp-log-v3 .pain-row { display:grid; grid-template-columns:1fr; gap:1px; border:1px solid var(--rule-strong); border-radius:16px; overflow:hidden; background:var(--rule-strong); }
@media (min-width:768px) { .lp-log-v3 .pain-row { grid-template-columns:repeat(2,1fr); } }
@media (min-width:1024px) { .lp-log-v3 .pain-row { grid-template-columns:repeat(4,1fr); } }
.lp-log-v3 .pain-cell { padding:32px 24px; background:var(--cream); transition:background 0.2s; }
.lp-log-v3 .pain-cell:hover { background:var(--cream-3); }
.lp-log-v3 .pain-stat { font-family:var(--font-serif-fraunces),serif; font-size:48px; font-weight:500; letter-spacing:-0.028em; color:var(--oxblood); line-height:1; margin-bottom:12px; }
.lp-log-v3 .pain-stat em { font-style:italic; font-weight:500; }
.lp-log-v3 .pain-line { font-size:15px; color:var(--ink); font-weight:500; line-height:1.5; }
.lp-log-v3 .pain-line strong { color:var(--oxblood); font-weight:700; }
.lp-log-v3 .pain-src { font-size:11px; color:var(--ink-faint); margin-top:12px; letter-spacing:0.04em; }

/* MID-FUNNEL CTA STRIP */
.lp-log-v3 .mid-cta { padding:64px 24px; text-align:center; background:linear-gradient(135deg,var(--ink) 0%,#252522 100%); color:var(--cream); position:relative; overflow:hidden; }
.lp-log-v3 .mid-cta::before { content:''; position:absolute; top:-100px; right:-100px; width:400px; height:400px; background:radial-gradient(circle,rgba(198,107,63,0.18),transparent 70%); }
.lp-log-v3 .mid-cta-inner { position:relative; z-index:1; max-width:780px; margin:0 auto; }
.lp-log-v3 .mid-cta h3 { font-family:var(--font-serif-fraunces),serif; font-size:clamp(26px,3.4vw,36px); font-weight:500; line-height:1.1; letter-spacing:-0.02em; margin-bottom:14px; color:var(--cream); }
.lp-log-v3 .mid-cta h3 em { font-style:italic; color:var(--ochre); }
.lp-log-v3 .mid-cta p { color:rgba(242,239,230,0.75); margin-bottom:24px; font-size:16px; }
.lp-log-v3 .mid-cta .btn-primary { background:var(--terracotta); color:var(--cream); }
.lp-log-v3 .mid-cta .btn-primary:hover { background:var(--cream); color:var(--ink); }

/* FEATURE CARDS */
.lp-log-v3 .feature-row { display:grid; grid-template-columns:1fr; gap:18px; }
@media (min-width:768px) { .lp-log-v3 .feature-row { grid-template-columns:repeat(2,1fr); } }
.lp-log-v3 .feat-card { padding:32px 28px; border:1px solid var(--rule); border-radius:16px; background:var(--cream); transition:border-color 0.2s,transform 0.2s,box-shadow 0.2s; position:relative; overflow:hidden; }
.lp-log-v3 .feat-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,var(--terracotta),var(--ochre)); opacity:0; transition:opacity 0.2s; }
.lp-log-v3 .feat-card:hover { transform:translateY(-4px); border-color:var(--terracotta); box-shadow:0 22px 44px rgba(198,107,63,0.14); }
.lp-log-v3 .feat-card:hover::before { opacity:1; }
.lp-log-v3 .feat-tag { display:inline-block; font-family:var(--font-mono-plex),monospace; font-size:11px; font-weight:600; padding:4px 10px; background:var(--terracotta-soft); color:var(--terracotta); border-radius:6px; margin-bottom:16px; letter-spacing:0.06em; }
.lp-log-v3 .feat-title { font-family:var(--font-serif-fraunces),serif; font-size:24px; font-weight:500; letter-spacing:-0.02em; margin-bottom:10px; color:var(--ink); }
.lp-log-v3 .feat-body { font-size:15px; line-height:1.6; color:var(--ink-2); }
.lp-log-v3 .feat-list { list-style:none; padding:0; margin:14px 0 0; }
.lp-log-v3 .feat-list li { font-size:13.5px; color:var(--ink-2); padding:6px 0 6px 22px; position:relative; line-height:1.5; }
.lp-log-v3 .feat-list li::before { content:''; position:absolute; left:0; top:13px; width:6px; height:6px; background:var(--sage); border-radius:50%; }

/* VALUE STACK */
.lp-log-v3 .value-stack { background:var(--cream-3); border:1px solid var(--rule); border-radius:16px; padding:36px 32px; margin:0 auto; max-width:760px; box-shadow:0 12px 32px rgba(26,26,26,0.04); }
.lp-log-v3 .value-stack-h { font-family:var(--font-serif-fraunces),serif; font-size:22px; font-weight:500; color:var(--ink); margin-bottom:6px; letter-spacing:-0.015em; }
.lp-log-v3 .value-stack-sub { font-size:13px; color:var(--ink-faint); margin-bottom:24px; }
.lp-log-v3 .value-row { display:flex; justify-content:space-between; align-items:baseline; padding:12px 0; border-bottom:1px dashed var(--rule); font-size:14.5px; }
.lp-log-v3 .value-row span { color:var(--ink-2); }
.lp-log-v3 .value-row strong { color:var(--ink); font-family:var(--font-mono-plex),monospace; font-weight:600; }
.lp-log-v3 .value-row.strike strong { text-decoration:line-through; color:var(--ink-faint); }
.lp-log-v3 .value-total { display:flex; justify-content:space-between; align-items:baseline; padding-top:20px; margin-top:8px; border-top:2px solid var(--ink); }
.lp-log-v3 .value-total-lbl { font-family:var(--font-serif-fraunces),serif; font-size:18px; font-weight:500; color:var(--ink); }
.lp-log-v3 .value-total-amt { font-family:var(--font-serif-fraunces),serif; font-size:34px; font-weight:500; color:var(--terracotta); letter-spacing:-0.02em; }
.lp-log-v3 .value-saved { display:inline-block; margin-top:14px; font-family:var(--font-mono-plex),monospace; font-size:12px; font-weight:600; color:var(--sage); background:var(--sage-soft); padding:5px 12px; border-radius:999px; letter-spacing:0.04em; }

/* TESTIMONIALS */
.lp-log-v3 .testi-row { display:grid; grid-template-columns:1fr; gap:20px; }
@media (min-width:768px) { .lp-log-v3 .testi-row { grid-template-columns:repeat(3,1fr); } }
.lp-log-v3 .testi-card { padding:32px; border:1px solid var(--rule); border-radius:16px; background:var(--cream); position:relative; transition:transform 0.18s,border-color 0.18s,box-shadow 0.18s; }
.lp-log-v3 .testi-card:hover { transform:translateY(-3px); border-color:var(--terracotta); box-shadow:0 18px 36px rgba(26,26,26,0.06); }
.lp-log-v3 .testi-stars { color:var(--terracotta); font-size:14px; letter-spacing:3px; margin-bottom:14px; }
.lp-log-v3 .testi-quote { font-family:var(--font-serif-fraunces),serif; font-size:19px; line-height:1.45; color:var(--ink); margin-bottom:24px; font-weight:500; letter-spacing:-0.005em; font-style:italic; }
.lp-log-v3 .testi-quote em { color:var(--terracotta); font-weight:600; }
.lp-log-v3 .testi-meta { display:flex; align-items:center; gap:14px; padding-top:20px; border-top:1px solid var(--rule); }
.lp-log-v3 .testi-avatar { width:46px; height:46px; border-radius:8px; background:linear-gradient(135deg,var(--terracotta),var(--ochre)); color:var(--cream); display:flex; align-items:center; justify-content:center; font-family:var(--font-serif-fraunces),serif; font-weight:500; font-size:18px; }
.lp-log-v3 .testi-name { font-weight:700; font-size:14px; color:var(--ink); }
.lp-log-v3 .testi-role { font-size:12px; color:var(--ink-faint); margin-top:2px; }

/* RISK REVERSAL */
.lp-log-v3 .risk { background:var(--ink); color:var(--cream); padding:48px 36px; border-radius:20px; position:relative; overflow:hidden; max-width:1100px; margin:0 auto; }
.lp-log-v3 .risk::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 80% 50%,rgba(201,169,110,0.18),transparent 60%); pointer-events:none; }
.lp-log-v3 .risk-inner { position:relative; z-index:1; display:grid; grid-template-columns:1fr; gap:32px; align-items:center; }
@media (min-width:768px) { .lp-log-v3 .risk-inner { grid-template-columns:1.2fr 1fr; } }
.lp-log-v3 .risk-h { font-family:var(--font-serif-fraunces),serif; font-size:clamp(26px,3.4vw,38px); font-weight:500; letter-spacing:-0.02em; line-height:1.1; margin-bottom:14px; color:var(--cream); }
.lp-log-v3 .risk-h em { font-style:italic; color:var(--ochre); }
.lp-log-v3 .risk-p { color:rgba(242,239,230,0.78); font-size:16px; line-height:1.55; margin-bottom:6px; }
.lp-log-v3 .risk-list { list-style:none; padding:0; margin:0; }
.lp-log-v3 .risk-list li { padding:14px 0 14px 36px; position:relative; border-top:1px solid rgba(242,239,230,0.12); font-size:14.5px; color:rgba(242,239,230,0.92); line-height:1.5; }
.lp-log-v3 .risk-list li:first-child { border-top:0; }
.lp-log-v3 .risk-list li::before { content:'✓'; position:absolute; left:0; top:14px; color:var(--ochre); font-family:var(--font-serif-fraunces),serif; font-size:20px; font-weight:600; line-height:1; }
.lp-log-v3 .risk-list li strong { color:var(--cream); }

/* PRICING */
.lp-log-v3 .pricing-row { display:grid; grid-template-columns:1fr; gap:1px; border:1px solid var(--rule-strong); border-radius:16px; overflow:hidden; background:var(--rule-strong); }
@media (min-width:768px) { .lp-log-v3 .pricing-row { grid-template-columns:repeat(2,1fr); } }
@media (min-width:1100px) { .lp-log-v3 .pricing-row { grid-template-columns:repeat(4,1fr); } }
.lp-log-v3 .price-cell { padding:32px 26px; background:var(--cream); position:relative; display:flex; flex-direction:column; transition:transform 0.2s; }
.lp-log-v3 .price-cell:hover { transform:translateY(-2px); }
.lp-log-v3 .price-cell.featured { background:linear-gradient(160deg,rgba(198,107,63,0.10),rgba(201,169,110,0.06)); animation:pulse-soft 3s infinite; }
.lp-log-v3 .price-badge { position:absolute; top:18px; right:18px; font-size:10px; font-weight:700; padding:4px 10px; background:var(--terracotta); color:var(--cream); border-radius:999px; letter-spacing:0.08em; }
.lp-log-v3 .price-tier { font-family:var(--font-serif-fraunces),serif; font-size:24px; font-weight:500; letter-spacing:-0.02em; margin-bottom:2px; color:var(--ink); }
.lp-log-v3 .price-window { font-size:12px; color:var(--ink-faint); margin-bottom:20px; letter-spacing:0.02em; }
.lp-log-v3 .price-amount { font-family:var(--font-serif-fraunces),serif; font-size:42px; font-weight:500; letter-spacing:-0.028em; line-height:1; color:var(--ink); }
.lp-log-v3 .price-recur { font-size:12px; color:#A8451F; margin:8px 0 22px; font-weight:600; letter-spacing:0.02em; }
.lp-log-v3 .price-list { list-style:none; padding:0; margin:0 0 24px; font-size:13.5px; color:var(--ink-2); flex:1; }
.lp-log-v3 .price-list li { padding:7px 0 7px 20px; position:relative; line-height:1.5; border-bottom:1px solid var(--rule); }
.lp-log-v3 .price-list li:last-child { border-bottom:0; }
.lp-log-v3 .price-list li::before { content:'+'; position:absolute; left:0; top:7px; color:var(--terracotta); font-weight:700; font-family:var(--font-mono-plex),monospace; }
.lp-log-v3 .price-cta { display:block; text-align:center; font-size:13px; font-weight:600; padding:13px; border:1px solid var(--ink); color:var(--ink); border-radius:999px; transition:all 0.18s; letter-spacing:0.04em; }
.lp-log-v3 .price-cta:hover { background:var(--ink); color:var(--cream); }
.lp-log-v3 .price-cell.featured .price-cta { background:var(--ink); color:var(--cream); border-color:var(--ink); }
.lp-log-v3 .price-cell.featured .price-cta:hover { background:var(--terracotta); border-color:var(--terracotta); }

/* EMAIL CAPTURE LEAD MAGNET */
.lp-log-v3 .email-capture { max-width:780px; margin:0 auto; padding:40px 36px; background:linear-gradient(140deg,var(--ink) 0%,#2a2a26 100%); border-radius:20px; color:var(--cream); position:relative; overflow:hidden; box-shadow:0 24px 56px rgba(26,26,26,0.18); }
.lp-log-v3 .email-capture::before { content:''; position:absolute; top:-80px; right:-80px; width:340px; height:340px; background:radial-gradient(circle,rgba(201,169,110,0.22),transparent 70%); }
.lp-log-v3 .email-capture-inner { position:relative; z-index:1; display:grid; grid-template-columns:1fr; gap:24px; align-items:center; }
@media (min-width:768px) { .lp-log-v3 .email-capture-inner { grid-template-columns:1.1fr 1fr; gap:36px; } }
.lp-log-v3 .ec-kicker { font-size:11px; letter-spacing:0.22em; text-transform:uppercase; color:var(--ochre); font-weight:700; margin-bottom:12px; }
.lp-log-v3 .ec-h { font-family:var(--font-serif-fraunces),serif; font-size:clamp(22px,3vw,30px); font-weight:500; letter-spacing:-0.02em; line-height:1.15; margin:0 0 10px; color:var(--cream); }
.lp-log-v3 .ec-h em { font-style:italic; color:var(--ochre); }
.lp-log-v3 .ec-p { font-size:14.5px; color:rgba(242,239,230,0.72); line-height:1.55; margin:0; }
.lp-log-v3 .ec-form { display:flex; flex-direction:column; gap:10px; }
.lp-log-v3 .ec-input { background:rgba(242,239,230,0.08); border:1px solid rgba(242,239,230,0.2); color:var(--cream); padding:14px 18px; font-size:14px; border-radius:999px; font-family:inherit; transition:border-color 0.18s,background 0.18s; outline:none; }
.lp-log-v3 .ec-input::placeholder { color:rgba(242,239,230,0.45); }
.lp-log-v3 .ec-input:focus { border-color:var(--ochre); background:rgba(242,239,230,0.12); }
.lp-log-v3 .ec-btn { font-size:14px; font-weight:700; padding:14px 22px; background:var(--terracotta); color:var(--cream); border-radius:999px; border:0; cursor:pointer; transition:background 0.18s,transform 0.18s; letter-spacing:0.03em; font-family:inherit; }
.lp-log-v3 .ec-btn:hover { background:var(--ochre); color:var(--ink); transform:translateY(-1px); }
.lp-log-v3 .ec-note { font-size:11px; color:rgba(242,239,230,0.5); text-align:left; letter-spacing:0.02em; }

/* OBJECTION GRID */
.lp-log-v3 .obj-grid { display:grid; grid-template-columns:1fr; gap:14px; }
@media (min-width:640px) { .lp-log-v3 .obj-grid { grid-template-columns:repeat(2,1fr); } }
@media (min-width:1024px) { .lp-log-v3 .obj-grid { grid-template-columns:repeat(3,1fr); } }
.lp-log-v3 .obj-card { padding:24px 22px; border:1px solid var(--rule); border-radius:14px; background:var(--cream); transition:border-color 0.2s,transform 0.2s,box-shadow 0.2s; }
.lp-log-v3 .obj-card:hover { border-color:var(--terracotta); transform:translateY(-2px); box-shadow:0 14px 28px rgba(198,107,63,0.08); }
.lp-log-v3 .obj-q { font-family:var(--font-serif-fraunces),serif; font-style:italic; font-size:17px; font-weight:500; color:var(--oxblood); line-height:1.3; margin:0 0 12px; letter-spacing:-0.01em; }
.lp-log-v3 .obj-q::before { content:'\\201C'; font-family:var(--font-serif-fraunces),serif; font-size:32px; color:var(--terracotta); line-height:0; vertical-align:-12px; margin-right:4px; }
.lp-log-v3 .obj-a { font-size:14px; color:var(--ink-2); line-height:1.55; margin:0; }
.lp-log-v3 .obj-a strong { color:var(--ink); font-weight:600; }

/* FAQ */
.lp-log-v3 .faq-wrap { max-width:780px; margin:0 auto; border-top:1px solid var(--rule); }
.lp-log-v3 .faq-wrap details { padding:24px 0; border-bottom:1px solid var(--rule); transition:background 0.18s; }
.lp-log-v3 .faq-wrap details[open] { background:linear-gradient(180deg,rgba(198,107,63,0.04),transparent); }
.lp-log-v3 .faq-wrap summary { font-family:var(--font-serif-fraunces),serif; font-size:19px; font-weight:500; cursor:pointer; list-style:none; display:flex; justify-content:space-between; align-items:center; letter-spacing:-0.015em; color:var(--ink); transition:color 0.18s; }
.lp-log-v3 .faq-wrap summary:hover { color:var(--terracotta); }
.lp-log-v3 .faq-wrap summary::-webkit-details-marker { display:none; }
.lp-log-v3 .faq-wrap summary::after { content:'+'; font-size:24px; transition:transform 0.18s,color 0.18s; color:var(--ink-faint); font-family:var(--font-mono-plex),monospace; font-weight:400; }
.lp-log-v3 .faq-wrap details[open] summary::after { transform:rotate(45deg); color:var(--terracotta); }
.lp-log-v3 .faq-wrap details p { margin:14px 0 0; color:var(--ink-2); font-size:15px; line-height:1.65; max-width:62ch; }

/* SCARCITY BAND */
.lp-log-v3 .scarcity-band { background:var(--ink); color:var(--cream); padding:22px; text-align:center; position:relative; overflow:hidden; }
.lp-log-v3 .scarcity-band::before { content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent,rgba(201,169,110,0.18),transparent); background-size:200% 100%; animation:shimmer 6s infinite; }
.lp-log-v3 .scarcity-band p { margin:0; font-size:15px; font-weight:500; letter-spacing:0.01em; position:relative; z-index:1; }
.lp-log-v3 .scarcity-band strong { color:var(--ochre); font-weight:700; }

/* CLOSER */
.lp-log-v3 .closer { padding:120px 24px; text-align:center; position:relative; overflow:hidden; background:var(--cream); border-top:1px solid var(--rule); }
.lp-log-v3 .closer::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 50% 30%,rgba(198,107,63,0.14),transparent 60%); pointer-events:none; animation:drift-glow 16s ease-in-out infinite; }
.lp-log-v3 .closer-scarcity { display:inline-flex; align-items:center; gap:10px; font-size:11px; letter-spacing:0.20em; text-transform:uppercase; color:var(--terracotta); margin-bottom:26px; padding:8px 16px; border:1px solid var(--terracotta); border-radius:999px; font-weight:700; position:relative; z-index:1; }
.lp-log-v3 .closer-scarcity::before { content:'●'; animation:pulse-terracotta 1.6s ease-in-out infinite; }
.lp-log-v3 .closer h2 { font-size:clamp(36px,5.4vw,68px); margin:0 auto 20px; max-width:20ch; position:relative; z-index:1; }
.lp-log-v3 .closer p { font-size:18px; color:var(--ink-2); max-width:54ch; margin:0 auto 36px; line-height:1.5; position:relative; z-index:1; }
.lp-log-v3 .closer .cta-row { position:relative; z-index:1; }

/* MOBILE STICKY CTA */
.lp-log-v3 .mobile-cta { display:none; position:fixed; bottom:14px; left:14px; right:14px; z-index:55; background:var(--ink); color:var(--cream); padding:14px 18px; border-radius:999px; box-shadow:0 16px 36px rgba(26,26,26,0.35),0 0 0 1px rgba(198,107,63,0.3); align-items:center; justify-content:space-between; gap:12px; font-size:14px; font-weight:600; }
.lp-log-v3 .mobile-cta::after { content:'→'; font-size:18px; }
.lp-log-v3 .mobile-cta strong { color:var(--ochre); font-weight:700; }
@media (max-width:768px) { .lp-log-v3 .mobile-cta { display:flex; } .lp-log-v3 .closer { padding-bottom:96px; } }

/* FOOTER */
.lp-log-v3 .lp-footer { padding:56px 0 36px; background:var(--cream-2); border-top:1px solid var(--rule); font-size:13px; color:var(--ink-faint); line-height:1.7; }
.lp-log-v3 .lp-footer .grid { display:grid; gap:28px; grid-template-columns:1fr; margin-bottom:32px; }
@media (min-width:768px) { .lp-log-v3 .lp-footer .grid { grid-template-columns:2fr 1fr 1fr 1fr; } }
.lp-log-v3 .lp-footer h5 { font-family:var(--font-serif-fraunces),serif; font-style:italic; font-size:14px; margin:0 0 12px; font-weight:500; color:var(--terracotta); }
.lp-log-v3 .lp-footer a { display:block; padding:3px 0; color:var(--ink-2); font-size:13px; transition:color 0.18s; }
.lp-log-v3 .lp-footer a:hover { color:var(--terracotta); }
.lp-log-v3 .disclaimer { margin-top:0; padding-top:24px; border-top:1px solid var(--rule); font-size:11px; line-height:1.7; color:var(--ink-faint); max-width:92ch; }

@media (prefers-reduced-motion:reduce) {
  .lp-log-v3 *,.lp-log-v3 *::before,.lp-log-v3 *::after { animation:none !important; transition:none !important; }
  .lp-log-v3 .reveal,.lp-log-v3 .reveal-l { opacity:1 !important; transform:none !important; }
}
`;

export default function LogisticsLP() {
  return (
    <div className="lp-log-v3">
      <MetaPixel />
      <MetaPixelEvents />
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="scroll-progress" aria-hidden="true"></div>

      <div className="ribbon">
        <span className="ribbon-pulse"></span>Dispatch cohort ·{" "}
        <strong>limited builds</strong> · 8-hour reply window
      </div>

      <header className="nav">
        <div className="nav-inner">
          <a href="#" className="brand">
            <span className="brand-dot"></span>SkynetLabs <em>FreightOps</em>
          </a>
          <a href="/discovery-call" className="nav-cta">
            Book audit →
          </a>
        </div>
      </header>

      <main>
        {/* HERO — pain-first w/ animated entrance */}
        <section className="hero">
          <div className="wrap">
            <div className="hero-inner">
              <div className="hero-eyebrow">
                <span className="pulse"></span>For US carriers{" "}
                <strong>5–25 trucks</strong>&nbsp;· cohort booking now
              </div>
              <h1>
                Your dispatch stack is <em>bleeding loads.</em> We rebuild it in
                14 days.
              </h1>
              <p className="hero-sub">
                Six paid tabs. <strong>$847/mo SaaS bill.</strong> Voicemail
                after 8pm. SkynetLabs ships the dispatch canvas — AI voice
                agent, factoring widget, lane economics — under one roof. Public
                pricing. Source-controlled.{" "}
                <strong>Repo in your GitHub on launch day.</strong>
              </p>
              <div className="cta-row">
                <a
                  href="/discovery-call"
                  className="btn-primary"
                  data-meta-event="Schedule"
                  data-meta-name="hero-book-audit"
                >
                  Book a 15-min discovery call →
                </a>
                <a href="#pricing" className="btn-line">
                  See public pricing
                </a>
              </div>
              <div className="hero-scarcity">
                <strong>Limited build slots</strong>&nbsp;· 8-hour reply window
              </div>
              <div className="featured-in">
                <span className="featured-lbl">Featured</span>
                <span>Upwork Top Rated Plus</span>
                <span>Vercel SaaS</span>
                <span>Canggu Builders Bali</span>
              </div>
            </div>
          </div>

          {/* DASHBOARD MOCKUP — interactive tabs */}
          <div className="mockup-wrap">
            <div
              className="mockup"
              role="region"
              aria-label="FreightOps dispatch canvas preview — interactive"
            >
              <span className="interactive-hint">Click tabs →</span>
              {/* hidden radios drive panel switching */}
              <input
                className="ws-radio"
                type="radio"
                name="ws"
                id="ws-dispatch"
                defaultChecked
              />
              <input
                className="ws-radio"
                type="radio"
                name="ws"
                id="ws-lanes"
              />
              <input
                className="ws-radio"
                type="radio"
                name="ws"
                id="ws-brokers"
              />
              <input
                className="ws-radio"
                type="radio"
                name="ws"
                id="ws-drivers"
              />
              <input
                className="ws-radio"
                type="radio"
                name="ws"
                id="ws-factoring"
              />
              <input
                className="ai-radio"
                type="radio"
                name="ai"
                id="ai-voice"
                defaultChecked
              />
              <input className="ai-radio" type="radio" name="ai" id="ai-sms" />
              <input className="ai-radio" type="radio" name="ai" id="ai-rate" />

              {/* Mobile horizontal tab pills — only <980px */}
              <div
                className="mobile-tabs"
                role="tablist"
                aria-label="Workspace tabs"
              >
                <label htmlFor="ws-dispatch" data-for="ws-dispatch">
                  Dispatch
                </label>
                <label htmlFor="ws-lanes" data-for="ws-lanes">
                  Lanes
                </label>
                <label htmlFor="ws-brokers" data-for="ws-brokers">
                  Brokers
                </label>
                <label htmlFor="ws-drivers" data-for="ws-drivers">
                  Drivers
                </label>
                <label htmlFor="ws-factoring" data-for="ws-factoring">
                  Factoring
                </label>
              </div>

              <div className="mockup-bar">
                <div className="mockup-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="mockup-addr">
                  freightops.skynetlabs.app/dispatch/today
                </div>
              </div>
              <div className="mockup-body">
                <aside className="mock-side">
                  <div className="mock-side-head">Workspace</div>
                  <label
                    htmlFor="ws-dispatch"
                    className="mock-side-item tab"
                    data-for="ws-dispatch"
                  >
                    Dispatch <span className="badge">12</span>
                  </label>
                  <label
                    htmlFor="ws-lanes"
                    className="mock-side-item tab"
                    data-for="ws-lanes"
                  >
                    Lanes
                  </label>
                  <label
                    htmlFor="ws-brokers"
                    className="mock-side-item tab"
                    data-for="ws-brokers"
                  >
                    Brokers
                  </label>
                  <label
                    htmlFor="ws-drivers"
                    className="mock-side-item tab"
                    data-for="ws-drivers"
                  >
                    Drivers
                  </label>
                  <label
                    htmlFor="ws-factoring"
                    className="mock-side-item tab"
                    data-for="ws-factoring"
                  >
                    Factoring
                  </label>
                  <div className="mock-side-head" style={{ marginTop: 20 }}>
                    AI Agents
                  </div>
                  <label
                    htmlFor="ai-voice"
                    className="mock-side-item ai-tab"
                    data-for="ai-voice"
                  >
                    Voice intake <span className="badge">3</span>
                  </label>
                  <label
                    htmlFor="ai-sms"
                    className="mock-side-item ai-tab"
                    data-for="ai-sms"
                  >
                    SMS confirm
                  </label>
                  <label
                    htmlFor="ai-rate"
                    className="mock-side-item ai-tab"
                    data-for="ai-rate"
                  >
                    Rate qualifier
                  </label>
                </aside>

                <div className="mock-main">
                  {/* PANEL: DISPATCH (default) */}
                  <div className="panel panel-dispatch">
                    <div className="mock-h">Dispatch · Thursday, June 12</div>
                    <div className="mock-sub">
                      Live load + lane economics across your 9 trucks
                    </div>
                    <div className="mock-tiles">
                      <div className="mock-tile up">
                        <div className="mock-tile-lbl">Booked today</div>
                        <div className="mock-tile-num">112</div>
                        <div className="mock-tile-delta">+18 vs avg</div>
                      </div>
                      <div className="mock-tile up">
                        <div className="mock-tile-lbl">$/mi avg</div>
                        <div className="mock-tile-num">$3.41</div>
                        <div className="mock-tile-delta">+$0.22 vs Mon</div>
                      </div>
                      <div className="mock-tile warm">
                        <div className="mock-tile-lbl">Qualify time</div>
                        <div className="mock-tile-num">8.2s</div>
                        <div className="mock-tile-delta">−72% vs human</div>
                      </div>
                    </div>
                    <div className="mock-lanes-h">
                      <span>Active lanes</span>
                      <span className="live">Live</span>
                    </div>
                    <div className="mock-lane">
                      <div className="mock-lane-route">
                        Dallas → Phoenix
                        <small>53ft dry · 1,066 mi · Maverick</small>
                      </div>
                      <div className="mock-lane-rate">$2,840</div>
                      <div className="mock-lane-status status-booked">
                        BOOKED
                      </div>
                    </div>
                    <div className="mock-lane">
                      <div className="mock-lane-route">
                        Atlanta → Charlotte<small>Reefer · 244 mi · CRST</small>
                      </div>
                      <div className="mock-lane-rate">$1,120</div>
                      <div className="mock-lane-status status-routing">
                        ROUTING
                      </div>
                    </div>
                    <div className="mock-lane">
                      <div className="mock-lane-route">
                        Chicago → Indianapolis
                        <small>Flatbed · 184 mi · Landstar</small>
                      </div>
                      <div className="mock-lane-rate">$890</div>
                      <div className="mock-lane-status status-booked">
                        BOOKED
                      </div>
                    </div>
                    <div className="mock-lane">
                      <div className="mock-lane-route">
                        Memphis → Nashville
                        <small>Dry van · 213 mi · ArcBest</small>
                      </div>
                      <div className="mock-lane-rate">$960</div>
                      <div className="mock-lane-status status-pending">
                        PENDING
                      </div>
                    </div>
                  </div>

                  {/* PANEL: LANES */}
                  <div className="panel panel-lanes">
                    <div className="mock-h">Lanes · Top 5 this month</div>
                    <div className="mock-sub">
                      Repeat lanes ranked by $/mi · last 30 days
                    </div>
                    <div className="mock-tiles">
                      <div className="mock-tile up">
                        <div className="mock-tile-lbl">Lanes booked</div>
                        <div className="mock-tile-num">348</div>
                        <div className="mock-tile-delta">+42 vs May</div>
                      </div>
                      <div className="mock-tile up">
                        <div className="mock-tile-lbl">Best $/mi</div>
                        <div className="mock-tile-num">$4.12</div>
                        <div className="mock-tile-delta">DAL → DEN</div>
                      </div>
                      <div className="mock-tile warm">
                        <div className="mock-tile-lbl">Avg margin</div>
                        <div className="mock-tile-num">28%</div>
                        <div className="mock-tile-delta">+3 pts</div>
                      </div>
                    </div>
                    <table>
                      <thead>
                        <tr>
                          <th>Lane</th>
                          <th>Loads</th>
                          <th>Avg $/mi</th>
                          <th>Margin</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Dallas → Denver</td>
                          <td>42</td>
                          <td className="num up">$4.12</td>
                          <td>34%</td>
                        </tr>
                        <tr>
                          <td>Atlanta → Charlotte</td>
                          <td>38</td>
                          <td className="num up">$3.86</td>
                          <td>31%</td>
                        </tr>
                        <tr>
                          <td>Houston → Phoenix</td>
                          <td>31</td>
                          <td className="num up">$3.74</td>
                          <td>29%</td>
                        </tr>
                        <tr>
                          <td>Chicago → Indianapolis</td>
                          <td>28</td>
                          <td className="num">$3.41</td>
                          <td>27%</td>
                        </tr>
                        <tr>
                          <td>Memphis → Nashville</td>
                          <td>24</td>
                          <td className="num warm">$2.98</td>
                          <td>22%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* PANEL: BROKERS */}
                  <div className="panel panel-brokers">
                    <div className="mock-h">Brokers · Top relationships</div>
                    <div className="mock-sub">
                      Repeat brokers ranked by lifetime revenue
                    </div>
                    <div className="mock-tiles">
                      <div className="mock-tile up">
                        <div className="mock-tile-lbl">Active brokers</div>
                        <div className="mock-tile-num">24</div>
                        <div className="mock-tile-delta">+4 this qtr</div>
                      </div>
                      <div className="mock-tile up">
                        <div className="mock-tile-lbl">Top broker rev</div>
                        <div className="mock-tile-num">$184K</div>
                        <div className="mock-tile-delta">YTD · Maverick</div>
                      </div>
                      <div className="mock-tile warm">
                        <div className="mock-tile-lbl">Win rate</div>
                        <div className="mock-tile-num">62%</div>
                        <div className="mock-tile-delta">on quoted</div>
                      </div>
                    </div>
                    <table>
                      <thead>
                        <tr>
                          <th>Broker</th>
                          <th>Loads YTD</th>
                          <th>Avg rate</th>
                          <th>Win %</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Maverick Transport</td>
                          <td>87</td>
                          <td className="num up">$2,640</td>
                          <td>71%</td>
                        </tr>
                        <tr>
                          <td>CH Robinson</td>
                          <td>62</td>
                          <td className="num">$2,420</td>
                          <td>58%</td>
                        </tr>
                        <tr>
                          <td>Landstar</td>
                          <td>54</td>
                          <td className="num up">$2,820</td>
                          <td>66%</td>
                        </tr>
                        <tr>
                          <td>CRST</td>
                          <td>41</td>
                          <td className="num">$1,890</td>
                          <td>52%</td>
                        </tr>
                        <tr>
                          <td>ArcBest</td>
                          <td>38</td>
                          <td className="num warm">$1,720</td>
                          <td>48%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* PANEL: DRIVERS */}
                  <div className="panel panel-drivers">
                    <div className="mock-h">
                      Drivers · 9 trucks, live status
                    </div>
                    <div className="mock-sub">
                      Real-time ETA + last comms across fleet
                    </div>
                    <div className="driver-grid">
                      <div className="driver-card">
                        <div className="nm">Alvin C.</div>
                        <div className="st route">● On route · ATL→CLT</div>
                        <div className="meta">ETA 18:42 EDT · last ping 4m</div>
                      </div>
                      <div className="driver-card">
                        <div className="nm">Diego R.</div>
                        <div className="st route">● On route · DAL→PHX</div>
                        <div className="meta">
                          ETA Fri 09:20 MST · last ping 11m
                        </div>
                      </div>
                      <div className="driver-card">
                        <div className="nm">Marcus T.</div>
                        <div className="st route">● On route · CHI→IND</div>
                        <div className="meta">ETA 21:08 CDT · last ping 2m</div>
                      </div>
                      <div className="driver-card">
                        <div className="nm">Sarah W.</div>
                        <div className="st idle">○ Available · Memphis TN</div>
                        <div className="meta">Off-deck 4h · home base</div>
                      </div>
                      <div className="driver-card">
                        <div className="nm">James K.</div>
                        <div className="st route">● On route · HOU→PHX</div>
                        <div className="meta">
                          ETA Sat 14:00 MST · last ping 7m
                        </div>
                      </div>
                      <div className="driver-card">
                        <div className="nm">Tony M.</div>
                        <div className="st off">○ Off-duty · 34hr reset</div>
                        <div className="meta">Resumes Friday 06:00 CDT</div>
                      </div>
                    </div>
                  </div>

                  {/* PANEL: FACTORING */}
                  <div className="panel panel-factoring">
                    <div className="mock-h">Factoring · Triumph queue</div>
                    <div className="mock-sub">
                      Same-day settle ranked by fee efficiency
                    </div>
                    <div className="mock-tiles">
                      <div className="mock-tile up">
                        <div className="mock-tile-lbl">Settled today</div>
                        <div className="mock-tile-num">$28,640</div>
                        <div className="mock-tile-delta">4 invoices</div>
                      </div>
                      <div className="mock-tile up">
                        <div className="mock-tile-lbl">Avg cash-to-day</div>
                        <div className="mock-tile-num">1.4d</div>
                        <div className="mock-tile-delta">
                          −15.6d vs no widget
                        </div>
                      </div>
                      <div className="mock-tile warm">
                        <div className="mock-tile-lbl">Fee saved YTD</div>
                        <div className="mock-tile-num">$4,820</div>
                        <div className="mock-tile-delta">vs flat rate</div>
                      </div>
                    </div>
                    <table>
                      <thead>
                        <tr>
                          <th>Invoice</th>
                          <th>Broker</th>
                          <th>Net</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>INV-4291</td>
                          <td>Maverick</td>
                          <td className="num up">$2,756</td>
                          <td>Settled</td>
                        </tr>
                        <tr>
                          <td>INV-4288</td>
                          <td>Landstar</td>
                          <td className="num up">$2,723</td>
                          <td>Settled</td>
                        </tr>
                        <tr>
                          <td>INV-4284</td>
                          <td>CH Robinson</td>
                          <td className="num">$2,348</td>
                          <td>Settled</td>
                        </tr>
                        <tr>
                          <td>INV-4282</td>
                          <td>CRST</td>
                          <td className="num">$1,086</td>
                          <td>Settled</td>
                        </tr>
                        <tr>
                          <td>INV-4279</td>
                          <td>ArcBest</td>
                          <td className="num warm">$931</td>
                          <td>Pending</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <aside className="mock-right">
                  {/* AI agent panel — VOICE (default) */}
                  <div className="ai-panel ai-panel-voice">
                    <div className="agent-card">
                      <div className="agent-head">
                        <div className="agent-pulse"></div>
                        <div className="agent-pill">LIVE</div>
                        <div className="agent-title">Voice intake</div>
                      </div>
                      <div className="agent-body">
                        Inbound from <code>(214) 555-0192</code> ·{" "}
                        <strong>Maverick dispatch</strong> · Dallas → Phoenix
                        offered at $2,650 · counter pushed to $2,840.
                      </div>
                    </div>
                    <div className="agent-card">
                      <div className="agent-head">
                        <div className="agent-pulse"></div>
                        <div className="agent-pill">LIVE</div>
                        <div className="agent-title">Voice intake</div>
                      </div>
                      <div className="agent-body">
                        Inbound from <code>(404) 555-0288</code> ·{" "}
                        <strong>CRST</strong> · Atlanta → Charlotte at $1,120 ·
                        qualified, routed to dispatcher.
                      </div>
                    </div>
                    <div className="factor-card">
                      <div className="agent-title" style={{ marginBottom: 4 }}>
                        Today · Voice intake
                      </div>
                      <div className="factor-num">47 calls</div>
                      <div className="factor-sub">
                        22 qualified · 8 booked · 17 referred
                      </div>
                      <div className="factor-bar">
                        <div className="factor-bar-fill"></div>
                      </div>
                      <div className="factor-sub" style={{ marginTop: 6 }}>
                        74% qualified rate · avg 8.2s response
                      </div>
                    </div>
                  </div>

                  {/* AI agent panel — SMS confirm */}
                  <div className="ai-panel ai-panel-sms">
                    <div className="agent-card">
                      <div className="agent-head">
                        <div className="agent-pulse"></div>
                        <div className="agent-pill">QUEUED</div>
                        <div className="agent-title">SMS confirm</div>
                      </div>
                      <div className="agent-body">
                        Driver Alvin C. confirmed pickup at{" "}
                        <code>15:40 CDT</code>. ETA Phoenix Friday 09:20 MST.
                      </div>
                    </div>
                    <div className="agent-card">
                      <div className="agent-head">
                        <div className="agent-pulse"></div>
                        <div className="agent-pill">SENT</div>
                        <div className="agent-title">SMS confirm</div>
                      </div>
                      <div className="agent-body">
                        Driver Diego R. → load <code>L-4291</code> · rate $2,840
                        · POD reminder queued for delivery.
                      </div>
                    </div>
                    <div className="factor-card">
                      <div className="agent-title" style={{ marginBottom: 4 }}>
                        Today · SMS confirm
                      </div>
                      <div className="factor-num">114 sent</div>
                      <div className="factor-sub">
                        94 ack · 18 pending · 2 escalated
                      </div>
                      <div className="factor-bar">
                        <div className="factor-bar-fill"></div>
                      </div>
                      <div className="factor-sub" style={{ marginTop: 6 }}>
                        82% driver ack rate · avg 4 min
                      </div>
                    </div>
                  </div>

                  {/* AI agent panel — Rate qualifier */}
                  <div className="ai-panel ai-panel-rate">
                    <div className="agent-card">
                      <div className="agent-head">
                        <div className="agent-pulse"></div>
                        <div className="agent-pill">PASS</div>
                        <div className="agent-title">Rate qualifier</div>
                      </div>
                      <div className="agent-body">
                        Lane Houston → Phoenix · offered $2,400 · floor $2,650 ·{" "}
                        <strong>auto-rejected.</strong> Counter sent at $2,840.
                      </div>
                    </div>
                    <div className="agent-card">
                      <div className="agent-head">
                        <div className="agent-pulse"></div>
                        <div className="agent-pill">FLAG</div>
                        <div className="agent-title">Rate qualifier</div>
                      </div>
                      <div className="agent-body">
                        Memphis → Nashville at $960 · margin <code>22%</code> ·
                        below 28% target · dispatcher review.
                      </div>
                    </div>
                    <div className="factor-card">
                      <div className="agent-title" style={{ marginBottom: 4 }}>
                        Today · Rate qualifier
                      </div>
                      <div className="factor-num">+$3,420</div>
                      <div className="factor-sub">
                        recovered via counters · 6 of 8 hit
                      </div>
                      <div className="factor-bar">
                        <div className="factor-bar-fill"></div>
                      </div>
                      <div className="factor-sub" style={{ marginTop: 6 }}>
                        74% counter-acceptance · avg uplift $428
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
          <a
            href="#problem"
            className="scroll-indicator"
            aria-label="Scroll to problem section"
          >
            ↓
          </a>
        </section>

        {/* LIVE TICKER — across-cohort activity */}
        <div className="live-ticker">
          <span className="ticker-pulse"></span>
          <span className="ticker-lbl">LIVE</span>
          <span>
            <strong>47</strong> calls qualified across cohort today
          </span>
          <span className="sep">·</span>
          <span>
            <strong>$184K</strong> in loads booked this week
          </span>
          <span className="sep">·</span>
          <span>
            <strong>9.2s</strong> avg AI response
          </span>
        </div>

        {/* MARQUEE LOGO STRIP */}
        <section className="logo-strip">
          <div className="logo-label">
            Operators on the stack — 9 shipped builds, every repo handed over
          </div>
          <div className="logo-marquee">
            <span className="name">Vow Sanctuary</span>
            <span className="dot"></span>
            <span className="name">GutReno</span>
            <span className="dot"></span>
            <span className="name">Wellness DNA</span>
            <span className="dot"></span>
            <span className="name">Pretty Potty</span>
            <span className="dot"></span>
            <span className="name">TimeLapse Reno</span>
            <span className="dot"></span>
            <span className="name">SkynetJoe</span>
            <span className="dot"></span>
            <span className="name">Cirrosis360</span>
            <span className="dot"></span>
            <span className="name">Kitts Recovery</span>
            <span className="dot"></span>
            <span className="name">Bayou Savage</span>
            <span className="dot"></span>
            {/* duplicate for seamless marquee */}
            <span className="name">Vow Sanctuary</span>
            <span className="dot"></span>
            <span className="name">GutReno</span>
            <span className="dot"></span>
            <span className="name">Wellness DNA</span>
            <span className="dot"></span>
            <span className="name">Pretty Potty</span>
            <span className="dot"></span>
            <span className="name">TimeLapse Reno</span>
            <span className="dot"></span>
            <span className="name">SkynetJoe</span>
            <span className="dot"></span>
            <span className="name">Cirrosis360</span>
            <span className="dot"></span>
            <span className="name">Kitts Recovery</span>
            <span className="dot"></span>
            <span className="name">Bayou Savage</span>
            <span className="dot"></span>
          </div>
        </section>

        {/* PAIN */}
        <section className="section" id="problem">
          <div className="wrap">
            <div className="section-head reveal">
              <div className="section-kicker">The problem</div>
              <h2>
                Your dispatch stack is <em>six browser tabs</em> and a personal
                cell.
              </h2>
              <p className="section-sub">
                Small-fleet operators run six paid SaaS tools that don&apos;t
                talk. The dispatcher is the integration layer — and they cost
                more than every license combined.
              </p>
            </div>
            <div className="pain-row reveal">
              <div className="pain-cell">
                <div className="pain-stat">
                  31<em>%</em>
                </div>
                <div className="pain-line">
                  of off-hours broker calls go to <strong>voicemail</strong>.
                </div>
                <div className="pain-src">SkynetLabs audits Q1 2026 · n=8</div>
              </div>
              <div className="pain-cell">
                <div className="pain-stat">$847</div>
                <div className="pain-line">
                  avg monthly SaaS cost across <strong>six disconnected</strong>{" "}
                  dispatch + back-office tools.
                </div>
                <div className="pain-src">5–12 truck operators · n=8</div>
              </div>
              <div className="pain-cell">
                <div className="pain-stat">
                  17<em>d</em>
                </div>
                <div className="pain-line">
                  avg invoice → factoring → cash without{" "}
                  <strong>widget integration</strong>.
                </div>
                <div className="pain-src">SkynetLabs ops research</div>
              </div>
              <div className="pain-cell">
                <div className="pain-stat">0</div>
                <div className="pain-line">
                  tools that talk. Dispatcher does the{" "}
                  <strong>glue manually</strong>, every shift.
                </div>
                <div className="pain-src">Every audit, no exceptions</div>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section className="section tinted">
          <div className="wrap">
            <div className="section-head reveal">
              <div className="section-kicker">The 5-line map</div>
              <h2>
                Where the others <em>stop,</em> SkynetLabs begins.
              </h2>
              <p className="section-sub">
                Brokerage tools own the load board. Agencies own the brand. Dev
                shops own the code. SkynetLabs ships all three under one roof,
                in 14 days, at public price.
              </p>
            </div>
            <div className="compare-wrap reveal">
              <table className="compare-tbl">
                <thead>
                  <tr>
                    <th>Capability</th>
                    <th className="us">SkynetLabs FreightOps</th>
                    <th>DAT / TruckingOffice</th>
                    <th>Brand agency</th>
                    <th>Dev shop</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Marketing site + CRM</td>
                    <td className="us">
                      <strong>✓ 14 days</strong>
                    </td>
                    <td className="bad">
                      <span className="xmark">— not their scope</span>
                    </td>
                    <td>
                      <span className="check">✓ 60 days</span>
                    </td>
                    <td className="bad">
                      <span className="xmark">— sub-contracted</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Live dispatch dashboard</td>
                    <td className="us">
                      <strong>✓ included Pro tier</strong>
                    </td>
                    <td>
                      <span className="check">✓ but their UI only</span>
                    </td>
                    <td className="bad">
                      <span className="xmark">—</span>
                    </td>
                    <td>
                      <span className="check">✓ 180 days, T&amp;M</span>
                    </td>
                  </tr>
                  <tr>
                    <td>AI voice agent (Vapi)</td>
                    <td className="us">
                      <strong>✓ branded, your voice</strong>
                    </td>
                    <td className="bad">
                      <span className="xmark">—</span>
                    </td>
                    <td className="bad">
                      <span className="xmark">—</span>
                    </td>
                    <td className="bad">
                      <span className="xmark">— specialized hire</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Factoring widget</td>
                    <td className="us">
                      <strong>✓ Triumph/Apex/RTS</strong>
                    </td>
                    <td className="bad">
                      <span className="xmark">— external</span>
                    </td>
                    <td className="bad">
                      <span className="xmark">—</span>
                    </td>
                    <td>
                      <span className="check">✓ custom build</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Public, fixed pricing</td>
                    <td className="us">
                      <strong>✓ four tiers, visible</strong>
                    </td>
                    <td>
                      <span className="check">✓ per-seat SaaS</span>
                    </td>
                    <td className="bad">
                      <span className="xmark">— custom quote</span>
                    </td>
                    <td className="bad">
                      <span className="xmark">— T&amp;M</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Source-controlled hand-off</td>
                    <td className="us">
                      <strong>✓ your GitHub day 1</strong>
                    </td>
                    <td className="bad">
                      <span className="xmark">— vendor SaaS</span>
                    </td>
                    <td className="bad">
                      <span className="xmark">— hostage data</span>
                    </td>
                    <td>
                      <span className="check">✓ partial</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Ship guarantee</td>
                    <td className="us">
                      <strong>✓ miss = free nights</strong>
                    </td>
                    <td className="bad">
                      <span className="xmark">—</span>
                    </td>
                    <td className="bad">
                      <span className="xmark">—</span>
                    </td>
                    <td className="bad">
                      <span className="xmark">— scope creep</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* MID-FUNNEL CTA */}
        <section className="mid-cta">
          <div className="mid-cta-inner reveal">
            <h3>
              Reading this at <em>2am</em> because dispatch died again?
            </h3>
            <p>
              Audit takes 15 minutes. Reply window: 8 hours, weekday Bali time.
              Yes, no, or referral — you walk with the findings.
            </p>
            <a
              href="/discovery-call"
              className="btn-primary"
              data-meta-event="Schedule"
              data-meta-name="mid-cta-2am"
            >
              Book the audit — free →
            </a>
          </div>
        </section>

        {/* SOLUTION */}
        <section className="section tinted">
          <div className="wrap">
            <div className="section-head reveal">
              <div className="section-kicker">The solution</div>
              <h2>
                One canvas. <em>Four modules.</em> Yours to keep.
              </h2>
              <p className="section-sub">
                Every module ships to your GitHub on day one. Cancel the
                retainer anytime — stack stays live, code is yours. No vendor
                lock-in, no hostage data.
              </p>
            </div>
            <div className="feature-row reveal">
              <div className="feat-card">
                <div className="feat-tag">VOICE · AGENT</div>
                <div className="feat-title">Vapi inbound dispatcher</div>
                <div className="feat-body">
                  Off-hours load calls qualified in eight seconds. Route, rate,
                  contact, notes auto-attached to your CRM. Pipeline populated
                  by sunrise.
                </div>
                <ul className="feat-list">
                  <li>24/7 phone coverage, zero graveyard shift</li>
                  <li>Custom rate qualifier per lane</li>
                  <li>Auto-callback for filtered loads</li>
                  <li>TCPA-compliant inbound only</li>
                </ul>
              </div>
              <div className="feat-card">
                <div className="feat-tag">DISPATCH · OPS</div>
                <div className="feat-title">Live dispatch canvas</div>
                <div className="feat-body">
                  DAT feed + truck inventory + repeat-broker pipeline +
                  factoring on one screen. Six tabs replaced with focus.
                </div>
                <ul className="feat-list">
                  <li>Lane economics in real time</li>
                  <li>Driver ETA + SMS auto-confirms</li>
                  <li>Searchable route history</li>
                  <li>Public driver portal</li>
                </ul>
              </div>
              <div className="feat-card">
                <div className="feat-tag">CASH · FACTORING</div>
                <div className="feat-title">Factoring widget</div>
                <div className="feat-body">
                  Direct Triumph, Apex, RTS integration. Same-day settle on
                  qualifying loads, fee-aware ranking, auto invoice attach.
                </div>
                <ul className="feat-list">
                  <li>74% queue settled within 4 hours</li>
                  <li>Fee diff display per load</li>
                  <li>Push to QuickBooks ledger</li>
                </ul>
              </div>
              <div className="feat-card">
                <div className="feat-tag">FUNNEL · LEAD-GEN</div>
                <div className="feat-title">Ad ops + content batch</div>
                <div className="feat-body">
                  Meta + LinkedIn campaigns wired to GHL pipeline. Monthly
                  content batch from the Bali studio, weekly review call.
                </div>
                <ul className="feat-list">
                  <li>Pixel + CAPI on day one</li>
                  <li>Cold + warm lead-gen flows</li>
                  <li>Monthly Loom audit + roadmap</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS TIMELINE */}
        <section className="section">
          <div className="wrap">
            <div className="section-head reveal">
              <div className="section-kicker">The 14-day ship</div>
              <h2>
                Day 1 to live, <em>no scope theater.</em>
              </h2>
              <p className="section-sub">
                Fixed gates. Public timeline. Miss it and we work nights +
                weekends free until live — written into the SOW. Below = exact
                Starter tier track.
              </p>
            </div>
            <div className="process-track reveal">
              <div className="process-step">
                <div className="process-marker">
                  I<small>Day 1</small>
                </div>
                <h4>Kickoff + audit</h4>
                <p>
                  Live walkthrough of your six tabs. We map the gaps. Domain +
                  GHL subaccount provisioned. You get a Loom recap by EOD.
                </p>
              </div>
              <div className="process-step">
                <div className="process-marker">
                  II<small>Day 4</small>
                </div>
                <h4>Wireframe lock</h4>
                <p>
                  Site map + CRM pipeline + inbound routing in Figma. Two
                  revision rounds inside this window. Lock means lock.
                </p>
              </div>
              <div className="process-step">
                <div className="process-marker">
                  III<small>Day 10</small>
                </div>
                <h4>Build review</h4>
                <p>
                  Staging URL live. We walk every page on a Loom. You approve
                  copy + Pixel + CAPI. Last polish window.
                </p>
              </div>
              <div className="process-step">
                <div className="process-marker">
                  IV<small>Day 14</small>
                </div>
                <h4>Live + handoff</h4>
                <p>
                  Production push. GitHub repo transferred to your org. n8n +
                  GHL credentials handed over. Walk anytime — you own
                  everything.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* VALUE STACK */}
        <section className="section tinted">
          <div className="wrap">
            <div
              className="section-head reveal"
              style={{
                textAlign: "center",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <div
                className="section-kicker"
                style={{ marginLeft: "auto", marginRight: "auto" }}
              >
                What you get
              </div>
              <h2 style={{ marginLeft: "auto", marginRight: "auto" }}>
                Starter tier · <em>$1,497 flat</em>
              </h2>
            </div>
            <div className="value-stack reveal">
              <div className="value-stack-h">
                Inside the $1,497 Starter build
              </div>
              <div className="value-stack-sub">
                Comparable agency quotes — same scope, no source-controlled
                hand-off.
              </div>
              <div className="value-row strike">
                <span>5-page premium Next.js site</span>
                <strong>$3,500</strong>
              </div>
              <div className="value-row strike">
                <span>GHL CRM pipeline + custom fields</span>
                <strong>$1,200</strong>
              </div>
              <div className="value-row strike">
                <span>Inbound contact inbox + routing</span>
                <strong>$800</strong>
              </div>
              <div className="value-row strike">
                <span>Meta Pixel + Conversions API</span>
                <strong>$600</strong>
              </div>
              <div className="value-row strike">
                <span>2 revision rounds</span>
                <strong>$500</strong>
              </div>
              <div className="value-row strike">
                <span>GitHub repo handoff (you own everything)</span>
                <strong>included</strong>
              </div>
              <div className="value-total">
                <span className="value-total-lbl">Your price</span>
                <span className="value-total-amt">$1,497</span>
              </div>
              <span className="value-saved">
                ↓ saves $5,103 vs comparable agency
              </span>
            </div>
          </div>
        </section>

        {/* RISK REVERSAL */}
        <section className="section">
          <div className="wrap">
            <div className="risk reveal">
              <div className="risk-inner">
                <div>
                  <div
                    className="section-kicker"
                    style={{ color: "var(--ochre)" }}
                  >
                    The guarantee
                  </div>
                  <h3 className="risk-h">
                    Three ways we <em>de-risk</em> the build for you.
                  </h3>
                  <p className="risk-p">
                    Public pricing, sourced-controlled, fixed ship windows. The
                    audit is free. You only commit after the 15-minute call.
                  </p>
                </div>
                <ul className="risk-list">
                  <li>
                    <strong>Miss the ship window?</strong> Nights and weekends
                    free until live. Written into the SOW.
                  </li>
                  <li>
                    <strong>Cancel the retainer?</strong> Stack stays live. Repo
                    + n8n + GHL stay yours.
                  </li>
                  <li>
                    <strong>Not a fit?</strong> Audit ends with a referral. No
                    upsell, no funnel.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        {/* PROOF — testimonials intentionally absent.
            This section previously rendered three named testimonials with
            five-star ratings under the heading "Named clients. Real
            testimonials." They were fabricated: "Diego R." and "Marcus T." are
            the placeholder driver names used by this same page's product mockup
            (see the dispatch-board markup above), and no FreightOps client
            record exists in src/lib/work-builds.ts. There is also no
            star-rating system on this site, so the stars were an invented
            review score -- see the truth rules in src/data/social-proof.ts.
            A real quote goes here only when a named client has approved their
            own words in writing. Until then this renders nothing: an honest
            absence beats invented proof. Do NOT re-add placeholder names. */}

        {/* EMAIL CAPTURE LEAD MAGNET */}
        <section className="section tinted">
          <div className="wrap">
            <div className="email-capture reveal">
              <div className="email-capture-inner">
                <div>
                  <div className="ec-kicker">
                    Free teardown · No call required
                  </div>
                  <h3 className="ec-h">
                    Get the <em>12-tab dispatch teardown.</em>
                  </h3>
                  <p className="ec-p">
                    Real teardown of a 12-truck Houston operator&apos;s six-tab
                    stack &mdash; where the leaks live, what to replace, what to
                    keep. Drop your email and I&apos;ll send it over myself.
                  </p>
                </div>
                <LeadCaptureForm
                  source="teardown-pdf"
                  formClassName="ec-form"
                  buttonClassName="ec-btn"
                  inputClassName="ec-input"
                  ariaLabel="Email address"
                  emailPlaceholder="you@yourcarrier.com"
                  buttonLabel="Email me the teardown →"
                  submittingLabel="Sending…"
                  formMetaEvent="Lead"
                  successHeading="Got it."
                  successBody="I'll send the teardown to that inbox myself, usually within a day."
                  belowButton={
                    <p className="ec-note">
                      No spam. One email, from me directly.
                    </p>
                  }
                />
              </div>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section className="section tinted" id="pricing">
          <div className="wrap">
            <div className="section-head reveal">
              <div className="section-kicker">The menu, public</div>
              <h2>
                Four tiers. <em>No custom-quote theater.</em>
              </h2>
              <p className="section-sub">
                Half on signature, half on launch. Walk anytime with what&apos;s
                built. You own the GitHub repo + n8n workflows + GHL subaccount
                on day one. The audit comes first — pricing matters only if
                we&apos;re a fit.
              </p>
            </div>
            <div className="pricing-row reveal">
              <div className="price-cell">
                <div className="price-tier">Starter</div>
                <div className="price-window">14 days · site + CRM</div>
                <div className="price-amount">$1,497</div>
                <div className="price-recur">flat · no retainer</div>
                <ul className="price-list">
                  <li>Five-page premium site</li>
                  <li>GHL CRM pipeline wired</li>
                  <li>Inbound contact inbox</li>
                  <li>Meta Pixel + CAPI</li>
                  <li>Two revision rounds</li>
                </ul>
                <a
                  href="/discovery-call"
                  className="price-cta"
                  data-meta-event="InitiateCheckout"
                  data-meta-name="Starter"
                  data-meta-value="1497"
                >
                  Book discovery →
                </a>
              </div>
              <div className="price-cell">
                <div className="price-tier">Pro</div>
                <div className="price-window">21 days · + dispatch</div>
                <div className="price-amount">$3,997</div>
                <div className="price-recur">+ $497/mo ops</div>
                <ul className="price-list">
                  <li>Everything in Starter</li>
                  <li>Dispatch dashboard</li>
                  <li>Factoring widget (Triumph/Apex)</li>
                  <li>SMS auto-confirms</li>
                  <li>Monthly opt call</li>
                </ul>
                <a
                  href="/discovery-call"
                  className="price-cta"
                  data-meta-event="InitiateCheckout"
                  data-meta-name="Pro"
                  data-meta-value="3997"
                >
                  Book discovery →
                </a>
              </div>
              <div className="price-cell featured">
                <div className="price-badge">MOST PICKED</div>
                <div className="price-tier">Premium</div>
                <div className="price-window">30 days · + ad ops</div>
                <div className="price-amount">$7,997</div>
                <div className="price-recur">+ $997/mo ops</div>
                <ul className="price-list">
                  <li>Everything in Pro</li>
                  <li>Meta + LinkedIn ad ops</li>
                  <li>Lead-gen automation</li>
                  <li>Monthly content batch</li>
                  <li>Weekly review call</li>
                </ul>
                <a
                  href="/discovery-call"
                  className="price-cta"
                  data-meta-event="InitiateCheckout"
                  data-meta-name="Premium"
                  data-meta-value="7997"
                >
                  Book Premium →
                </a>
              </div>
              <div className="price-cell">
                <div className="price-tier">Flagship</div>
                <div className="price-window">45 days · AI Dispatcher</div>
                <div className="price-amount">$9,500</div>
                <div className="price-recur">+ $1,997/mo ops</div>
                <ul className="price-list">
                  <li>Everything in Premium</li>
                  <li>Vapi voice agent, branded</li>
                  <li>24/7 phone coverage</li>
                  <li>Custom load qualifier</li>
                  <li>Inbound load auto-book</li>
                </ul>
                <a
                  href="/discovery-call"
                  className="price-cta"
                  data-meta-event="InitiateCheckout"
                  data-meta-name="Flagship"
                  data-meta-value="9500"
                >
                  Talk Flagship →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* OBJECTION KILLER GRID */}
        <section className="section">
          <div className="wrap">
            <div className="section-head reveal">
              <div className="section-kicker">The six excuses</div>
              <h2>
                You&apos;re probably thinking <em>one of these.</em>
              </h2>
              <p className="section-sub">
                Cold ad clicks land here with the same six objections.
                We&apos;ve heard them on every audit call. Honest answers below.
              </p>
            </div>
            <div className="obj-grid reveal">
              <div className="obj-card">
                <p className="obj-q">
                  We tried tools before — they didn&apos;t talk to each other.
                </p>
                <p className="obj-a">
                  Exactly the point. <strong>We don&apos;t sell tools</strong> —
                  we glue your existing stack together. DAT, your TMS,
                  QuickBooks, GHL all into one screen.
                </p>
              </div>
              <div className="obj-card">
                <p className="obj-q">
                  We only run 5–8 trucks. Too small for this.
                </p>
                <p className="obj-a">
                  <strong>Starter is built for 5–10 trucks.</strong> $1,497
                  flat. No retainer. Site + CRM + inbound inbox in 14 days.
                  Cancel anytime, walk with the build.
                </p>
              </div>
              <div className="obj-card">
                <p className="obj-q">We already pay for DAT and a TMS.</p>
                <p className="obj-a">
                  Better — <strong>we integrate them.</strong> Dashboard pulls
                  DAT loads, your TMS data, factoring activity into one canvas.
                  Don&apos;t replace working tools; glue them.
                </p>
              </div>
              <div className="obj-card">
                <p className="obj-q">
                  Burned $40K on an agency last year. Why different?
                </p>
                <p className="obj-a">
                  <strong>Public pricing</strong> fixes that.{" "}
                  <strong>14-day ship window</strong> fixes that.{" "}
                  <strong>Repo handed to you day 1</strong> fixes that. Miss the
                  window, we work nights free.
                </p>
              </div>
              <div className="obj-card">
                <p className="obj-q">FMCSA, TCPA — too much compliance risk.</p>
                <p className="obj-a">
                  No FMCSA filings on our end —{" "}
                  <strong>broker authority stays with you.</strong> Vapi voice
                  agent is inbound-only by default = TCPA compliant. We write
                  the consent flow.
                </p>
              </div>
              <div className="obj-card">
                <p className="obj-q">What if you ghost us after launch?</p>
                <p className="obj-a">
                  <strong>Repo + n8n + GHL handed to your org day 1.</strong>{" "}
                  Cancel the retainer anytime — stack stays live, code is yours.
                  No vendor lock-in, no hostage data.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section tinted">
          <div className="wrap">
            <div className="section-head reveal">
              <div className="section-kicker">Operators ask first</div>
              <h2>
                Questions, <em>before you book.</em>
              </h2>
            </div>
            <div className="faq-wrap reveal">
              <details>
                <summary>Are you a freight broker or motor carrier?</summary>
                <p>
                  No. SkynetLabs is a software, design, and marketing studio. We
                  build the dispatch dashboard, voice agent, and CRM that sit
                  alongside your broker authority. No FMCSA filings on our end —
                  that stays with you. Reference 49 CFR 371 governs broker
                  authority and is not implicated by our services.
                </p>
              </details>
              <details>
                <summary>What if I already pay for DAT and a TMS?</summary>
                <p>
                  Better. We integrate them. The canvas pulls DAT loads, your
                  TMS data, factoring activity, and broker calls into one
                  screen. We don&apos;t replace working tools — we glue them
                  together.
                </p>
              </details>
              <details>
                <summary>How fast can you actually ship?</summary>
                <p>
                  Starter ships in 14 calendar days from kickoff. Pro 21.
                  Premium 30. Flagship 45. If we miss the window, we work nights
                  and weekends free until live — written into the SOW.
                </p>
              </details>
              <details>
                <summary>What happens at month 12?</summary>
                <p>
                  You own the GitHub repo, n8n workflows, and GHL subaccount on
                  day one. Cancel the retainer anytime — you keep everything
                  live. We just stop monthly ops.
                </p>
              </details>
              <details>
                <summary>TCPA-compliance on the voice agent?</summary>
                <p>
                  Yes. The Vapi agent is inbound-only by default. Outbound calls
                  require documented opt-in (typed phone + checkbox) per FCC
                  2024 rulings. We write the compliance flow into your funnel.
                </p>
              </details>
              <details>
                <summary>I only run 5 trucks. Am I too small?</summary>
                <p>
                  Starter ($1,497) is built for 5–10 trucks. Site + CRM +
                  inbound inbox in 14 days. No monthly retainer. Cancel anytime,
                  walk with what&apos;s built.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* SCARCITY BAND */}
        <div className="scarcity-band">
          <p>
            Four operator builds a month ·{" "}
            <strong>limited build slots</strong> · next opening confirmed on the call
          </p>
        </div>

        {/* CLOSER */}
        <section className="closer">
          <div className="closer-scarcity">● Limited build slots</div>
          <h2>
            Fifteen minutes. <em>Yes, no, or referral.</em>
          </h2>
          <p>
            Eight-hour reply on weekday Bali time. No funnel, no quote theater,
            no commitment. You walk with the audit findings either way.
          </p>
          <div className="cta-row">
            <a
              href="/discovery-call"
              className="btn-primary"
              data-meta-event="Schedule"
              data-meta-name="closer-book-audit"
            >
              Book the discovery call →
            </a>
            <a href="#pricing" className="btn-line">
              Review pricing
            </a>
          </div>
        </section>

        <footer className="lp-footer">
          <div className="wrap">
            <div className="grid">
              <div>
                <h5>SkynetLabs</h5>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--ink-2)",
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  One operator. One stack. One roof.
                  <br />
                  Waseem Nasir · Canggu, Bali (GMT+8) + Lahore, Pakistan.
                </p>
              </div>
              <div>
                <h5>Pages</h5>
                <a href="/services">Services</a>
                <a href="/portfolio">Work</a>
                <a href="/pricing">Pricing</a>
              </div>
              <div>
                <h5>Reach</h5>
                <a href="/discovery-call">Book discovery</a>
                <a href="mailto:info@skynetjoe.com">Email</a>
              </div>
              <div>
                <h5>Elsewhere</h5>
                <a href="https://www.linkedin.com/in/waseemnasir2k26">
                  LinkedIn
                </a>
                <a href="https://github.com/waseemnasir2k26">GitHub</a>
              </div>
            </div>
            <p className="disclaimer">
              SkynetLabs provides software, design, and marketing services. Not
              a freight broker or motor carrier. No FMCSA authority. Software
              demos are inbound-only and require user consent (TCPA-compliant).
              Reference 49 CFR 371 governs broker authority and is not
              implicated by services described herein. Public pricing reflects
              standard scope as of 2026-06-01 and may vary by custom
              requirements. © 2026 SkynetLabs · Waseem Nasir.
            </p>
          </div>
        </footer>

        {/* MOBILE STICKY CTA */}
        <a
          href="/discovery-call"
          className="mobile-cta"
          data-meta-event="Schedule"
          data-meta-name="mobile-sticky"
        >
          <span>
            <strong>Limited build slots</strong> · Book audit
          </span>
        </a>
      </main>
    </div>
  );
}
