import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FreightOps — one canvas for dispatch | SkynetLabs",
  description:
    "The dispatch canvas for small-fleet operators. AI voice agent, factoring widget, lane economics — built like Linear / Mercury, shipped in 14 days.",
  alternates: { canonical: "/lp/logistics-v3-dashboard-mockup" },
  robots: { index: false, follow: false },
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
.lp-log-v3 { --bg:#fafafa; --bg-2:#f4f4f5; --ink:#0a0a0b; --ink-2:#52525b; --ink-3:#a1a1aa; --border:#e4e4e7; --rule:#f0f0f2; --green:#16a34a; --green-2:#22c55e; --green-soft:#dcfce7; --amber:#f59e0b; --blue:#3b82f6; --red:#ef4444; background:var(--bg); color:var(--ink); font-family:'Inter',-apple-system,BlinkMacSystemFont,system-ui,sans-serif; min-height:100vh; letter-spacing:-0.005em; }
.lp-log-v3 *,.lp-log-v3 *::before,.lp-log-v3 *::after { box-sizing:border-box; }
.lp-log-v3 a { color:var(--ink); text-decoration:none; }
.lp-log-v3 .wrap { max-width:1200px; margin:0 auto; padding:0 24px; }
.lp-log-v3 ::selection { background:var(--green); color:#fff; }
.lp-log-v3 .mono { font-family:'JetBrains Mono',ui-monospace,monospace; }

.lp-log-v3 .ribbon { background:#0a0a0b; color:#fafafa; padding:8px 24px; text-align:center; font-size:12px; letter-spacing:0.04em; }
.lp-log-v3 .ribbon strong { color:var(--green-2); }

.lp-log-v3 .nav { padding:18px 0; background:rgba(250,250,250,0.85); backdrop-filter:blur(20px); position:sticky; top:0; z-index:50; border-bottom:1px solid var(--border); }
.lp-log-v3 .nav-inner { max-width:1200px; margin:0 auto; padding:0 24px; display:flex; align-items:center; justify-content:space-between; }
.lp-log-v3 .brand { font-weight:700; font-size:18px; letter-spacing:-0.025em; display:flex; align-items:center; gap:8px; }
.lp-log-v3 .brand-dot { width:8px; height:8px; background:var(--green); border-radius:2px; }
.lp-log-v3 .brand em { color:var(--ink-2); font-style:normal; font-weight:500; }
.lp-log-v3 .nav-cta { font-size:13px; font-weight:500; padding:8px 14px; background:var(--ink); color:#fafafa; border-radius:6px; }
.lp-log-v3 .nav-cta:hover { background:var(--green); }

.lp-log-v3 .hero { padding:72px 0 56px; text-align:center; }
.lp-log-v3 .hero-kicker { display:inline-flex; align-items:center; gap:8px; font-size:12px; font-weight:500; color:var(--ink-2); padding:6px 12px; border:1px solid var(--border); border-radius:24px; margin-bottom:24px; background:#fff; }
.lp-log-v3 .hero-kicker .kicker-dot { width:6px; height:6px; background:var(--green); border-radius:50%; }
.lp-log-v3 .hero-kicker strong { color:var(--ink); font-weight:600; }
.lp-log-v3 h1 { font-size:clamp(36px,5.5vw,68px); font-weight:700; letter-spacing:-0.04em; line-height:1.02; margin:0 auto 20px; max-width:18ch; }
.lp-log-v3 h1 em { color:var(--green); font-style:normal; }
.lp-log-v3 .hero-sub { font-size:19px; color:var(--ink-2); max-width:60ch; margin:0 auto 28px; line-height:1.5; font-weight:400; }
.lp-log-v3 .cta-row { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; align-items:center; margin-bottom:48px; }
.lp-log-v3 .btn-primary { font-size:14px; font-weight:600; padding:12px 22px; background:var(--ink); color:#fafafa; border-radius:8px; transition:background 0.18s,transform 0.18s; display:inline-flex; align-items:center; gap:6px; }
.lp-log-v3 .btn-primary:hover { background:var(--green); transform:translateY(-1px); }
.lp-log-v3 .btn-link { font-size:14px; font-weight:500; color:var(--ink-2); border-bottom:1px solid var(--border); padding-bottom:2px; }
.lp-log-v3 .btn-link:hover { color:var(--ink); border-color:var(--ink); }

.lp-log-v3 .mockup-wrap { max-width:1100px; margin:0 auto; padding:0 24px; position:relative; }
.lp-log-v3 .mockup { background:#fff; border:1px solid var(--border); border-radius:14px; overflow:hidden; box-shadow:0 24px 64px rgba(0,0,0,0.08),0 4px 16px rgba(0,0,0,0.04); }
.lp-log-v3 .mockup-bar { display:flex; align-items:center; gap:8px; padding:12px 16px; border-bottom:1px solid var(--border); background:var(--bg-2); }
.lp-log-v3 .mockup-dots { display:flex; gap:6px; }
.lp-log-v3 .mockup-dots span { width:11px; height:11px; border-radius:50%; }
.lp-log-v3 .mockup-dots span:nth-child(1) { background:#ff5f57; }
.lp-log-v3 .mockup-dots span:nth-child(2) { background:#febc2e; }
.lp-log-v3 .mockup-dots span:nth-child(3) { background:#28c840; }
.lp-log-v3 .mockup-addr { flex:1; text-align:center; font-family:'JetBrains Mono',monospace; font-size:11px; color:var(--ink-3); }
.lp-log-v3 .mockup-body { display:grid; grid-template-columns:200px 1fr 280px; min-height:480px; }
@media (max-width:980px) { .lp-log-v3 .mockup-body { grid-template-columns:1fr; } .lp-log-v3 .mock-side,.lp-log-v3 .mock-right { display:none; } }
.lp-log-v3 .mock-side { border-right:1px solid var(--border); padding:16px 12px; background:var(--bg-2); }
.lp-log-v3 .mock-side-head { font-size:11px; font-weight:600; color:var(--ink-3); letter-spacing:0.08em; text-transform:uppercase; padding:6px 10px; margin-bottom:6px; }
.lp-log-v3 .mock-side-item { display:flex; align-items:center; gap:8px; padding:7px 10px; border-radius:6px; font-size:13px; font-weight:500; color:var(--ink-2); margin-bottom:2px; }
.lp-log-v3 .mock-side-item.active { background:#fff; color:var(--ink); box-shadow:0 1px 0 var(--border); }
.lp-log-v3 .mock-side-item .badge { margin-left:auto; font-size:10px; background:var(--green); color:#fff; padding:1px 5px; border-radius:8px; font-family:'JetBrains Mono',monospace; }
.lp-log-v3 .mock-main { padding:20px 24px; }
.lp-log-v3 .mock-h { font-size:18px; font-weight:600; margin:0 0 2px; letter-spacing:-0.02em; }
.lp-log-v3 .mock-sub { font-size:12px; color:var(--ink-2); margin-bottom:16px; }
.lp-log-v3 .mock-tiles { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-bottom:18px; }
.lp-log-v3 .mock-tile { padding:14px; border:1px solid var(--border); border-radius:10px; background:#fff; }
.lp-log-v3 .mock-tile-lbl { font-size:11px; color:var(--ink-3); font-weight:500; }
.lp-log-v3 .mock-tile-num { font-family:'JetBrains Mono',monospace; font-size:22px; font-weight:600; letter-spacing:-0.02em; margin-top:2px; }
.lp-log-v3 .mock-tile.up .mock-tile-num { color:var(--green); }
.lp-log-v3 .mock-tile-delta { font-size:10px; font-weight:500; margin-top:2px; }
.lp-log-v3 .mock-tile.up .mock-tile-delta { color:var(--green); }
.lp-log-v3 .mock-lanes-h { font-size:11px; font-weight:600; color:var(--ink-3); letter-spacing:0.08em; text-transform:uppercase; margin-bottom:8px; display:flex; justify-content:space-between; align-items:center; }
.lp-log-v3 .mock-lane { display:grid; grid-template-columns:1fr auto auto; gap:12px; align-items:center; padding:10px 12px; border:1px solid var(--border); border-radius:8px; margin-bottom:6px; background:#fff; }
.lp-log-v3 .mock-lane-route { font-size:13px; font-weight:500; }
.lp-log-v3 .mock-lane-route small { display:block; font-size:11px; color:var(--ink-3); margin-top:1px; font-weight:400; }
.lp-log-v3 .mock-lane-rate { font-family:'JetBrains Mono',monospace; font-size:13px; font-weight:600; color:var(--green); }
.lp-log-v3 .mock-lane-status { font-size:10px; font-weight:600; padding:3px 7px; border-radius:10px; }
.lp-log-v3 .status-booked { background:var(--green-soft); color:var(--green); }
.lp-log-v3 .status-pending { background:#fef3c7; color:#92400e; }
.lp-log-v3 .status-routing { background:#dbeafe; color:#1e40af; }
.lp-log-v3 .mock-right { border-left:1px solid var(--border); padding:20px; background:#fafafa; }
.lp-log-v3 .agent-card { padding:14px; background:#fff; border:1px solid var(--border); border-radius:10px; margin-bottom:10px; }
.lp-log-v3 .agent-head { display:flex; align-items:center; gap:8px; margin-bottom:8px; }
.lp-log-v3 .agent-pill { font-size:10px; font-weight:600; padding:2px 7px; background:var(--green-soft); color:var(--green); border-radius:8px; }
.lp-log-v3 .agent-pulse { width:6px; height:6px; background:var(--green); border-radius:50%; animation:pulse-v3 1.4s infinite; }
@keyframes pulse-v3 { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
.lp-log-v3 .agent-title { font-size:13px; font-weight:600; }
.lp-log-v3 .agent-body { font-size:12px; color:var(--ink-2); line-height:1.45; margin-top:6px; }
.lp-log-v3 .agent-body code { font-family:'JetBrains Mono',monospace; background:var(--bg-2); padding:1px 4px; border-radius:3px; font-size:11px; }
.lp-log-v3 .factor-card { padding:14px; background:#fff; border:1px solid var(--border); border-radius:10px; }
.lp-log-v3 .factor-bar { height:6px; background:var(--bg-2); border-radius:3px; overflow:hidden; margin-top:10px; }
.lp-log-v3 .factor-bar-fill { height:100%; background:linear-gradient(90deg,var(--green),var(--green-2)); width:74%; border-radius:3px; }
.lp-log-v3 .factor-num { font-family:'JetBrains Mono',monospace; font-size:22px; font-weight:600; color:var(--green); margin-top:4px; }
.lp-log-v3 .factor-sub { font-size:11px; color:var(--ink-3); }

.lp-log-v3 .logo-strip { padding:48px 0; border-top:1px solid var(--border); border-bottom:1px solid var(--border); background:#fff; margin-top:64px; }
.lp-log-v3 .logo-row { display:flex; gap:48px; justify-content:center; flex-wrap:wrap; align-items:center; }
.lp-log-v3 .logo-row .lab { font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:var(--ink-3); margin-right:8px; }
.lp-log-v3 .logo-row .name { font-size:15px; font-weight:600; color:var(--ink); letter-spacing:-0.01em; }

.lp-log-v3 .section { padding:96px 0; }
.lp-log-v3 .section-head { max-width:780px; margin-bottom:56px; }
.lp-log-v3 .section-kicker { font-size:12px; letter-spacing:0.14em; text-transform:uppercase; color:var(--green); font-weight:600; margin-bottom:14px; }
.lp-log-v3 h2 { font-size:clamp(28px,4vw,44px); font-weight:700; letter-spacing:-0.03em; line-height:1.08; margin:0 0 16px; }
.lp-log-v3 .section-sub { font-size:18px; color:var(--ink-2); line-height:1.5; max-width:60ch; }

.lp-log-v3 .pain-row { display:grid; grid-template-columns:1fr; gap:1px; border:1px solid var(--border); border-radius:14px; overflow:hidden; background:var(--border); }
@media (min-width:768px) { .lp-log-v3 .pain-row { grid-template-columns:repeat(2,1fr); } }
.lp-log-v3 .pain-cell { padding:32px; background:#fff; }
.lp-log-v3 .pain-stat { font-family:'JetBrains Mono',monospace; font-size:42px; font-weight:600; letter-spacing:-0.02em; color:var(--red); line-height:1; margin-bottom:10px; }
.lp-log-v3 .pain-line { font-size:16px; color:var(--ink); font-weight:500; line-height:1.45; }
.lp-log-v3 .pain-src { font-size:12px; color:var(--ink-3); margin-top:10px; }

.lp-log-v3 .feature-row { display:grid; grid-template-columns:1fr; gap:24px; }
@media (min-width:768px) { .lp-log-v3 .feature-row { grid-template-columns:repeat(2,1fr); } }
.lp-log-v3 .feat-card { padding:32px; border:1px solid var(--border); border-radius:14px; background:#fff; }
.lp-log-v3 .feat-tag { display:inline-block; font-family:'JetBrains Mono',monospace; font-size:11px; font-weight:500; padding:3px 8px; background:var(--bg-2); color:var(--ink-2); border-radius:6px; margin-bottom:14px; }
.lp-log-v3 .feat-title { font-size:20px; font-weight:600; letter-spacing:-0.02em; margin-bottom:10px; }
.lp-log-v3 .feat-body { font-size:14px; line-height:1.6; color:var(--ink-2); }
.lp-log-v3 .feat-list { list-style:none; padding:0; margin:14px 0 0; }
.lp-log-v3 .feat-list li { font-size:13px; color:var(--ink-2); padding:5px 0 5px 22px; position:relative; }
.lp-log-v3 .feat-list li::before { content:''; position:absolute; left:0; top:11px; width:6px; height:6px; background:var(--green); border-radius:50%; }

.lp-log-v3 .testi-row { display:grid; grid-template-columns:1fr; gap:20px; }
@media (min-width:768px) { .lp-log-v3 .testi-row { grid-template-columns:repeat(2,1fr); } }
.lp-log-v3 .testi-card { padding:32px; border:1px solid var(--border); border-radius:14px; background:#fff; }
.lp-log-v3 .testi-quote { font-size:17px; color:var(--ink); line-height:1.5; margin-bottom:22px; font-weight:500; letter-spacing:-0.01em; }
.lp-log-v3 .testi-meta { display:flex; align-items:center; gap:12px; padding-top:18px; border-top:1px solid var(--rule); }
.lp-log-v3 .testi-avatar { width:40px; height:40px; border-radius:8px; background:var(--ink); color:#fafafa; display:flex; align-items:center; justify-content:center; font-weight:600; font-size:14px; }
.lp-log-v3 .testi-name { font-weight:600; font-size:14px; }
.lp-log-v3 .testi-role { font-size:12px; color:var(--ink-2); margin-top:1px; }

.lp-log-v3 .pricing-row { display:grid; grid-template-columns:1fr; gap:1px; border:1px solid var(--border); border-radius:14px; overflow:hidden; background:var(--border); }
@media (min-width:768px) { .lp-log-v3 .pricing-row { grid-template-columns:repeat(2,1fr); } }
@media (min-width:1100px) { .lp-log-v3 .pricing-row { grid-template-columns:repeat(4,1fr); } }
.lp-log-v3 .price-cell { padding:32px 26px; background:#fff; position:relative; }
.lp-log-v3 .price-cell.featured { background:var(--green-soft); }
.lp-log-v3 .price-badge { position:absolute; top:18px; right:18px; font-size:10px; font-weight:600; padding:3px 7px; background:var(--green); color:#fff; border-radius:8px; letter-spacing:0.04em; }
.lp-log-v3 .price-tier { font-size:18px; font-weight:600; letter-spacing:-0.02em; margin-bottom:2px; }
.lp-log-v3 .price-window { font-size:12px; color:var(--ink-3); margin-bottom:18px; }
.lp-log-v3 .price-amount { font-family:'JetBrains Mono',monospace; font-size:32px; font-weight:600; letter-spacing:-0.02em; line-height:1; }
.lp-log-v3 .price-recur { font-size:12px; color:var(--ink-2); margin:6px 0 18px; }
.lp-log-v3 .price-list { list-style:none; padding:0; margin:0 0 22px; font-size:13px; color:var(--ink-2); }
.lp-log-v3 .price-list li { padding:6px 0 6px 18px; position:relative; line-height:1.45; }
.lp-log-v3 .price-list li::before { content:'+'; position:absolute; left:0; top:6px; color:var(--green); font-weight:700; font-family:'JetBrains Mono',monospace; }
.lp-log-v3 .price-cta { display:block; text-align:center; font-size:13px; font-weight:600; padding:10px; border:1px solid var(--ink); color:var(--ink); border-radius:8px; transition:all 0.18s; }
.lp-log-v3 .price-cta:hover { background:var(--ink); color:#fafafa; }
.lp-log-v3 .price-cell.featured .price-cta { background:var(--ink); color:#fafafa; }
.lp-log-v3 .price-cell.featured .price-cta:hover { background:var(--green); border-color:var(--green); }

.lp-log-v3 .faq-wrap { max-width:780px; margin:0 auto; border-top:1px solid var(--border); }
.lp-log-v3 details { padding:24px 0; border-bottom:1px solid var(--border); }
.lp-log-v3 summary { font-size:17px; font-weight:600; cursor:pointer; list-style:none; display:flex; justify-content:space-between; align-items:center; letter-spacing:-0.015em; }
.lp-log-v3 summary::-webkit-details-marker { display:none; }
.lp-log-v3 summary::after { content:'+'; font-size:22px; transition:transform 0.18s; color:var(--ink-3); font-family:'JetBrains Mono',monospace; font-weight:400; }
.lp-log-v3 details[open] summary::after { transform:rotate(45deg); color:var(--green); }
.lp-log-v3 details p { margin:12px 0 0; color:var(--ink-2); font-size:14px; line-height:1.6; max-width:60ch; }

.lp-log-v3 .scarcity-band { background:var(--ink); color:#fafafa; padding:18px; text-align:center; }
.lp-log-v3 .scarcity-band p { margin:0; font-size:14px; font-weight:500; letter-spacing:0.01em; }
.lp-log-v3 .scarcity-band strong { color:var(--green-2); }

.lp-log-v3 .closer { padding:120px 0; text-align:center; background:#fff; border-top:1px solid var(--border); }
.lp-log-v3 .closer h2 { font-size:clamp(36px,5vw,56px); margin:0 auto 18px; max-width:22ch; }
.lp-log-v3 .closer h2 em { color:var(--green); font-style:normal; }
.lp-log-v3 .closer p { font-size:17px; color:var(--ink-2); max-width:54ch; margin:0 auto 32px; line-height:1.5; }

.lp-log-v3 .lp-footer { padding:40px 0 28px; background:var(--bg-2); border-top:1px solid var(--border); }
.lp-log-v3 .lp-footer .grid { display:grid; gap:24px; grid-template-columns:1fr; }
@media (min-width:768px) { .lp-log-v3 .lp-footer .grid { grid-template-columns:2fr 1fr 1fr; } }
.lp-log-v3 .lp-footer h5 { font-size:12px; margin:0 0 10px; font-weight:600; color:var(--ink); letter-spacing:0.04em; text-transform:uppercase; }
.lp-log-v3 .lp-footer a { display:block; padding:3px 0; color:var(--ink-2); font-size:13px; }
.lp-log-v3 .lp-footer a:hover { color:var(--ink); }
.lp-log-v3 .disclaimer { margin-top:28px; padding-top:24px; border-top:1px solid var(--border); font-size:11px; line-height:1.7; color:var(--ink-3); max-width:88ch; }
`;

export default function LogisticsV3Dashboard() {
  return (
    <div className="lp-log-v3">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div className="ribbon">June dispatch cohort · <strong>2 of 4 slots left</strong> · close 2026-06-15</div>

      <header className="nav">
        <div className="nav-inner">
          <a href="#" className="brand"><span className="brand-dot"></span>SkynetLabs <em>· FreightOps</em></a>
          <a href="/discovery-call" className="nav-cta">Book discovery →</a>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="wrap">
            <div className="hero-kicker"><span className="kicker-dot"></span><strong>v1.4</strong>&nbsp;· now booking June 2026 cohort</div>
            <h1>The dispatch canvas for <em>small-fleet operators.</em></h1>
            <p className="hero-sub">FreightOps is one screen for loads, lanes, factoring, and the AI voice agent that picks up at 2 am. Built like Linear. Priced like a side project. Shipped in 14 days.</p>
            <div className="cta-row">
              <a href="/discovery-call" className="btn-primary">Book a 15-min discovery call →</a>
              <a href="/portfolio" className="btn-link">View live builds</a>
            </div>
          </div>

          <div className="mockup-wrap">
            <div className="mockup">
              <div className="mockup-bar">
                <div className="mockup-dots"><span></span><span></span><span></span></div>
                <div className="mockup-addr">freightops.skynetlabs.app/dispatch/today</div>
              </div>
              <div className="mockup-body">
                <aside className="mock-side">
                  <div className="mock-side-head">Workspace</div>
                  <div className="mock-side-item active">Dispatch <span className="badge">12</span></div>
                  <div className="mock-side-item">Lanes</div>
                  <div className="mock-side-item">Brokers</div>
                  <div className="mock-side-item">Drivers</div>
                  <div className="mock-side-item">Factoring</div>
                  <div className="mock-side-head" style={{ marginTop: 18 }}>AI Agents</div>
                  <div className="mock-side-item">Voice intake <span className="badge">3</span></div>
                  <div className="mock-side-item">SMS confirm</div>
                  <div className="mock-side-item">Rate qualifier</div>
                </aside>
                <div className="mock-main">
                  <div className="mock-h">Dispatch · Thursday, June 12</div>
                  <div className="mock-sub">Live load + lane economics across your 9 trucks</div>
                  <div className="mock-tiles">
                    <div className="mock-tile up"><div className="mock-tile-lbl">Booked today</div><div className="mock-tile-num">112</div><div className="mock-tile-delta">+18 vs avg</div></div>
                    <div className="mock-tile up"><div className="mock-tile-lbl">$/mi avg</div><div className="mock-tile-num">$3.41</div><div className="mock-tile-delta">+$0.22 vs Mo</div></div>
                    <div className="mock-tile up"><div className="mock-tile-lbl">Qualify time</div><div className="mock-tile-num">8.2s</div><div className="mock-tile-delta">−72% vs human</div></div>
                  </div>
                  <div className="mock-lanes-h"><span>Active lanes</span><span style={{ color: "var(--green)", fontWeight: 600 }}>● Live</span></div>
                  <div className="mock-lane">
                    <div className="mock-lane-route">Dallas → Phoenix<small>53ft dry · 1,066 mi · Maverick</small></div>
                    <div className="mock-lane-rate">$2,840</div>
                    <div className="mock-lane-status status-booked">BOOKED</div>
                  </div>
                  <div className="mock-lane">
                    <div className="mock-lane-route">Atlanta → Charlotte<small>Reefer · 244 mi · CRST</small></div>
                    <div className="mock-lane-rate">$1,120</div>
                    <div className="mock-lane-status status-routing">ROUTING</div>
                  </div>
                  <div className="mock-lane">
                    <div className="mock-lane-route">Chicago → Indianapolis<small>Flatbed · 184 mi · Landstar</small></div>
                    <div className="mock-lane-rate">$890</div>
                    <div className="mock-lane-status status-booked">BOOKED</div>
                  </div>
                  <div className="mock-lane">
                    <div className="mock-lane-route">Memphis → Nashville<small>Dry van · 213 mi · ArcBest</small></div>
                    <div className="mock-lane-rate">$960</div>
                    <div className="mock-lane-status status-pending">PENDING</div>
                  </div>
                </div>
                <aside className="mock-right">
                  <div className="agent-card">
                    <div className="agent-head"><div className="agent-pulse"></div><div className="agent-pill">LIVE</div><div className="agent-title">Voice intake</div></div>
                    <div className="agent-body">Inbound from <code>(214) 555-0192</code> · <strong>Maverick dispatch</strong> · Dallas → Phoenix offered at $2,650 · counter pushed to $2,840.</div>
                  </div>
                  <div className="agent-card">
                    <div className="agent-head"><div className="agent-pulse"></div><div className="agent-pill">QUEUED</div><div className="agent-title">SMS confirm</div></div>
                    <div className="agent-body">Driver Alvin C. confirmed pickup at <code>15:40 CDT</code>. ETA Phoenix Friday 09:20 MST.</div>
                  </div>
                  <div className="factor-card">
                    <div className="agent-title" style={{ marginBottom: 4 }}>Factoring · Triumph</div>
                    <div className="factor-num">$28,640</div>
                    <div className="factor-sub">settled today · 4 invoices</div>
                    <div className="factor-bar"><div className="factor-bar-fill"></div></div>
                    <div className="factor-sub" style={{ marginTop: 6 }}>74% of June queue settled</div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </section>

        <section className="logo-strip">
          <div className="wrap">
            <div className="logo-row">
              <span className="lab">Trusted by</span>
              <span className="name">Vow Sanctuary</span>
              <span className="name">GutReno</span>
              <span className="name">Wellness DNA</span>
              <span className="name">Pretty Potty</span>
              <span className="name">TimeLapse Reno</span>
              <span className="name">SkynetJoe</span>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-head">
              <div className="section-kicker">The problem</div>
              <h2>Your dispatch stack is six browser tabs and a personal cell.</h2>
              <p className="section-sub">Small-fleet operators run six paid SaaS tools that don&apos;t talk. The dispatcher is the integration layer — and they cost more than every license combined.</p>
            </div>
            <div className="pain-row">
              <div className="pain-cell">
                <div className="pain-stat">31%</div>
                <div className="pain-line">of off-hours broker calls go to voicemail.</div>
                <div className="pain-src">SkynetLabs audits, Q1 2026, n=8 fleets</div>
              </div>
              <div className="pain-cell">
                <div className="pain-stat">$847</div>
                <div className="pain-line">avg monthly SaaS cost across DAT + TruckingOffice + RingCentral + Calendly + Zapier + add-ons.</div>
                <div className="pain-src">5–12 truck operators, n=8</div>
              </div>
              <div className="pain-cell">
                <div className="pain-stat">17 days</div>
                <div className="pain-line">avg invoice → factoring → cash settlement without widget integration.</div>
                <div className="pain-src">SkynetLabs ops research</div>
              </div>
              <div className="pain-cell">
                <div className="pain-stat">0</div>
                <div className="pain-line">tools that talk to each other. Dispatcher does the glue manually, every shift.</div>
                <div className="pain-src">Every audit, no exceptions</div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" style={{ background: "#fff" }}>
          <div className="wrap">
            <div className="section-head">
              <div className="section-kicker">The solution</div>
              <h2>One canvas. Four modules. Yours to keep.</h2>
              <p className="section-sub">Everything ships to your GitHub on day one. Cancel the retainer anytime — the stack stays live, the code is yours.</p>
            </div>
            <div className="feature-row">
              <div className="feat-card">
                <div className="feat-tag">VOICE / AGENT</div>
                <div className="feat-title">Vapi inbound dispatcher</div>
                <div className="feat-body">Off-hours load calls qualified in eight seconds. Route, rate, contact, notes auto-attached to your CRM.</div>
                <ul className="feat-list"><li>24/7 phone coverage, zero graveyard shift</li><li>Custom rate qualifier per lane</li><li>Auto-callback for filtered loads</li></ul>
              </div>
              <div className="feat-card">
                <div className="feat-tag">DISPATCH / OPS</div>
                <div className="feat-title">Live dispatch canvas</div>
                <div className="feat-body">DAT feed + truck inventory + repeat-broker pipeline + factoring on one screen. Tabs replaced with focus.</div>
                <ul className="feat-list"><li>Lane economics in real time</li><li>Driver ETA + SMS auto-confirms</li><li>Searchable route history, public driver portal</li></ul>
              </div>
              <div className="feat-card">
                <div className="feat-tag">CASH / FACTORING</div>
                <div className="feat-title">Factoring widget</div>
                <div className="feat-body">Direct Triumph, Apex, RTS integration. Same-day settle on qualifying loads, fee-aware ranking, auto invoice attach.</div>
                <ul className="feat-list"><li>74% queue settled within 4 hours</li><li>Fee diff display per load</li><li>Push to QuickBooks ledger</li></ul>
              </div>
              <div className="feat-card">
                <div className="feat-tag">FUNNEL / LEAD-GEN</div>
                <div className="feat-title">Ad ops + content batch</div>
                <div className="feat-body">Meta + LinkedIn campaigns wired to GHL pipeline. Monthly content batch from the Bali studio, public weekly review call.</div>
                <ul className="feat-list"><li>Pixel + CAPI on day one</li><li>Cold + warm lead-gen flows</li><li>Monthly Loom audit + roadmap</li></ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-head">
              <div className="section-kicker">Operators on the stack</div>
              <h2>Named clients. Public references.</h2>
            </div>
            <div className="testi-row">
              <div className="testi-card">
                <p className="testi-quote">&quot;I get more done in eight hours than my last agency got done in eight weeks. He sends Loom walkthroughs at 3 am his time — that&apos;s the actual founder, not a project manager.&quot;</p>
                <div className="testi-meta">
                  <div className="testi-avatar">CS</div>
                  <div><div className="testi-name">Chrissy S.</div><div className="testi-role">Founder · Vow Sanctuary · Asheville NC</div></div>
                </div>
              </div>
              <div className="testi-card">
                <p className="testi-quote">&quot;Inbound calls used to die after 8 pm. The voice agent caught 17 loads in week one — three I&apos;d have lost. Stack paid for itself the first month.&quot;</p>
                <div className="testi-meta">
                  <div className="testi-avatar">DR</div>
                  <div><div className="testi-name">Diego R.</div><div className="testi-role">Dispatch lead · 9-truck regional · Houston TX</div></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" style={{ background: "#fff" }}>
          <div className="wrap">
            <div className="section-head">
              <div className="section-kicker">The menu, public</div>
              <h2>Four tiers. No custom-quote theater.</h2>
              <p className="section-sub">Half on signature, half on launch. You own the code on day one.</p>
            </div>
            <div className="pricing-row">
              <div className="price-cell">
                <div className="price-tier">Starter</div>
                <div className="price-window">14d · site + CRM</div>
                <div className="price-amount">$1,497</div>
                <div className="price-recur">flat · no retainer</div>
                <ul className="price-list"><li>Five-page premium site</li><li>GHL CRM pipeline</li><li>Inbound contact inbox</li><li>Meta Pixel + CAPI</li></ul>
                <a href="/discovery-call" className="price-cta">Book →</a>
              </div>
              <div className="price-cell">
                <div className="price-tier">Pro</div>
                <div className="price-window">21d · + dispatch</div>
                <div className="price-amount">$3,997</div>
                <div className="price-recur">+ $497/mo ops</div>
                <ul className="price-list"><li>Everything in Starter</li><li>Dispatch dashboard</li><li>Factoring widget</li><li>SMS auto-confirms</li></ul>
                <a href="/discovery-call" className="price-cta">Book →</a>
              </div>
              <div className="price-cell featured">
                <div className="price-badge">PICK</div>
                <div className="price-tier">Premium</div>
                <div className="price-window">30d · + ad ops</div>
                <div className="price-amount">$7,997</div>
                <div className="price-recur">+ $997/mo ops</div>
                <ul className="price-list"><li>Everything in Pro</li><li>Meta + LinkedIn ad ops</li><li>Lead-gen automation</li><li>Monthly content batch</li></ul>
                <a href="/discovery-call" className="price-cta">Book →</a>
              </div>
              <div className="price-cell">
                <div className="price-tier">Flagship</div>
                <div className="price-window">45d · AI Dispatcher</div>
                <div className="price-amount">$9,500</div>
                <div className="price-recur">+ $1,997/mo ops</div>
                <ul className="price-list"><li>Everything in Premium</li><li>Vapi voice agent</li><li>24/7 phone coverage</li><li>Custom load qualifier</li></ul>
                <a href="/discovery-call" className="price-cta">Book →</a>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-head">
              <div className="section-kicker">FAQ</div>
              <h2>Questions, before you book.</h2>
            </div>
            <div className="faq-wrap">
              <details>
                <summary>Are you a freight broker or motor carrier?</summary>
                <p>No. SkynetLabs is a software, design, and marketing studio. We build the dispatch dashboard, voice agent, and CRM that sit alongside your broker authority. No FMCSA filings on our end.</p>
              </details>
              <details>
                <summary>What if I already pay for DAT and a TMS?</summary>
                <p>Better. We integrate them. The canvas pulls DAT loads, your TMS data, factoring activity, and broker calls into one screen. We don&apos;t replace working tools — we glue them together.</p>
              </details>
              <details>
                <summary>How fast can you actually ship?</summary>
                <p>Starter ships in 14 calendar days from kickoff. Pro 21. Premium 30. Flagship 45. If we miss the window, we work nights and weekends free until live — written into the SOW.</p>
              </details>
              <details>
                <summary>What happens at month 12?</summary>
                <p>You own the GitHub repo, n8n workflows, and GHL subaccount on day one. Cancel the retainer anytime — you keep everything live.</p>
              </details>
              <details>
                <summary>TCPA-compliance on the voice agent?</summary>
                <p>Yes. The Vapi agent is inbound-only by default. Outbound calls require documented opt-in (typed phone + checkbox) per FCC 2024 rulings. We write the compliance flow into your funnel.</p>
              </details>
            </div>
          </div>
        </section>

        <div className="scarcity-band">
          <p>Four operator slots a month · <strong>June: 2 of 4 remaining</strong> · July books in mid-June</p>
        </div>

        <section className="closer">
          <div className="wrap">
            <h2>Fifteen minutes. <em>Yes, no, or referral.</em></h2>
            <p>Eight-hour reply on weekday Bali time. No funnel, no quote theater, no commitment. You walk with the audit findings either way.</p>
            <a href="/discovery-call" className="btn-primary">Book the discovery call →</a>
          </div>
        </section>

        <footer className="lp-footer">
          <div className="wrap">
            <div className="grid">
              <div><h5>SkynetLabs</h5><p style={{ fontSize: 13, color: "var(--ink-2)", margin: 0, lineHeight: 1.6 }}>One operator. One stack. One roof.<br />Waseem Nasir · Canggu, Bali (GMT+8) + Lahore, Pakistan.</p></div>
              <div><h5>Pages</h5><a href="/services">Services</a><a href="/portfolio">Work</a><a href="/pricing">Pricing</a></div>
              <div><h5>Reach</h5><a href="/discovery-call">Book discovery</a><a href="mailto:waseem@skynetjoe.com">Email</a></div>
            </div>
            <p className="disclaimer">SkynetLabs provides software, design, and marketing services. Not a freight broker or motor carrier. No FMCSA authority. Software demos are inbound-only and require user consent (TCPA-compliant). Reference 49 CFR 371 governs broker authority and is not implicated by services described herein. Public pricing reflects standard scope as of 2026-06-01 and may vary by custom requirements. © 2026 SkynetLabs · Waseem Nasir.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
