"use client";

import { useMemo, useState } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');

.lp-v4 { --bg:#0d1117; --bg-2:#0a0e14; --panel:#161b22; --panel-2:#1c2230; --panel-3:#212834; --line:rgba(255,255,255,0.10); --line-strong:rgba(255,255,255,0.22); --green:#00ff9c; --green-dim:#00b46e; --green-pale:rgba(0,255,156,0.10); --amber:#ffb000; --amber-dim:#cc8800; --red:#ff3b3b; --text:#d0d7de; --text-bright:#f0f6fc; --text-dim:#8b949e; --text-faint:#586069; background:var(--bg); color:var(--text); font-family:'JetBrains Mono',ui-monospace,monospace; font-size:14px; line-height:1.55; min-height:100vh; background-image:radial-gradient(circle at 90% 10%,rgba(0,255,156,0.05) 0%,transparent 40%),radial-gradient(circle at 10% 90%,rgba(255,176,0,0.04) 0%,transparent 40%); -webkit-font-smoothing:antialiased; }
.lp-v4 *,.lp-v4 *::before,.lp-v4 *::after { box-sizing:border-box; }
.lp-v4 img { max-width:100%; height:auto; display:block; }
.lp-v4 a { color:var(--green); text-decoration:none; }
.lp-v4 ::selection { background:var(--green); color:var(--bg); }
.lp-v4 .sans { font-family:'Inter',sans-serif; }

/* NAV */
.lp-v4 .nav { position:sticky; top:0; z-index:50; background:rgba(13,17,23,0.95); backdrop-filter:blur(8px); border-bottom:1px solid var(--line); padding:12px 24px; }
.lp-v4 .nav-inner { max-width:1280px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; gap:16px; }
.lp-v4 .brand { font-family:'JetBrains Mono',monospace; font-weight:700; font-size:15px; color:var(--text-bright); letter-spacing:0.04em; }
.lp-v4 .brand span { color:var(--green); }
.lp-v4 .nav-meta { display:none; font-size:11px; color:var(--text-faint); letter-spacing:0.06em; align-items:center; gap:8px; }
.lp-v4 .nav-meta .blink { width:8px; height:8px; background:var(--green); border-radius:50%; animation:blink 1.4s ease-in-out infinite; }
@keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
@media (min-width:768px) { .lp-v4 .nav-meta { display:flex; } }
.lp-v4 .nav-cta { font-family:'JetBrains Mono',monospace; font-weight:700; font-size:12px; letter-spacing:0.08em; padding:10px 18px; background:var(--green); color:var(--bg); text-transform:uppercase; transition:background 0.18s,transform 0.18s; }
.lp-v4 .nav-cta:hover { background:var(--text-bright); transform:translateY(-1px); }

.lp-v4 .term { max-width:1280px; margin:0 auto; }

/* HERO */
.lp-v4 .hero { padding:56px 24px 24px; }
.lp-v4 .prompt { color:var(--green); font-size:13px; margin-bottom:12px; letter-spacing:0.04em; }
.lp-v4 .prompt::before { content:'$ '; color:var(--amber); }
.lp-v4 .hero h1 { font-family:'JetBrains Mono',monospace; font-weight:700; font-size:clamp(30px,4.4vw,56px); line-height:1.05; letter-spacing:-0.02em; color:var(--text-bright); margin-bottom:18px; max-width:22ch; }
.lp-v4 .hero h1 .green { color:var(--green); }
.lp-v4 .hero h1 .amber { color:var(--amber); }
.lp-v4 .hero p.sub { font-family:'Inter',sans-serif; font-size:18px; line-height:1.6; color:var(--text-dim); max-width:62ch; margin-bottom:22px; }
.lp-v4 .hero p.sub strong { color:var(--text-bright); font-weight:600; }
.lp-v4 .hero-scarcity { display:inline-flex; align-items:center; gap:10px; font-size:12px; color:var(--text-dim); padding:8px 14px; background:var(--green-pale); border:1px solid var(--green-dim); letter-spacing:0.04em; margin-bottom:8px; }
.lp-v4 .hero-scarcity strong { color:var(--green); font-weight:700; }
.lp-v4 .hero-scarcity::before { content:'●'; color:var(--green); animation:blink 1.4s ease-in-out infinite; }

/* CALCULATOR */
.lp-v4 .calc-grid { display:grid; grid-template-columns:1fr; gap:16px; padding:0 24px 56px; }
@media (min-width:1024px) { .lp-v4 .calc-grid { grid-template-columns:1.1fr 1fr; gap:24px; } }
.lp-v4 .calc-inputs { background:var(--panel); border:1px solid var(--line); padding:28px; position:relative; }
.lp-v4 .calc-inputs::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,var(--amber),transparent); }
.lp-v4 .calc-h { font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:var(--amber); margin-bottom:20px; display:flex; align-items:center; gap:12px; }
.lp-v4 .calc-h::before { content:''; width:24px; height:1px; background:var(--amber); }
.lp-v4 .calc-input { margin-bottom:24px; }
.lp-v4 .calc-input label { display:flex; justify-content:space-between; align-items:baseline; margin-bottom:8px; font-size:12px; letter-spacing:0.04em; }
.lp-v4 .calc-input label .key { color:var(--text-dim); }
.lp-v4 .calc-input label .val { color:var(--green); font-size:18px; font-weight:700; font-variant-numeric:tabular-nums; }
.lp-v4 input[type=range] { -webkit-appearance:none; appearance:none; width:100%; height:4px; background:var(--line); outline:none; border-radius:0; }
.lp-v4 input[type=range]::-webkit-slider-thumb { -webkit-appearance:none; appearance:none; width:20px; height:20px; background:var(--green); cursor:pointer; border:2px solid var(--bg); box-shadow:0 0 0 1px var(--green),0 0 12px rgba(0,255,156,0.4); }
.lp-v4 input[type=range]::-moz-range-thumb { width:20px; height:20px; background:var(--green); cursor:pointer; border:2px solid var(--bg); }
.lp-v4 .calc-range-meta { display:flex; justify-content:space-between; font-size:10px; color:var(--text-faint); margin-top:6px; letter-spacing:0.05em; }
.lp-v4 .calc-output { background:var(--bg); border:1px solid var(--green-dim); padding:28px; box-shadow:0 0 0 1px rgba(0,255,156,0.12),0 24px 48px rgba(0,0,0,0.5); position:relative; }
.lp-v4 .calc-output::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:var(--green); }
.lp-v4 .calc-output-h { font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:var(--green); margin-bottom:20px; display:flex; align-items:center; gap:12px; }
.lp-v4 .calc-output-h::before { content:'>>>'; color:var(--green); }
.lp-v4 .out-row { display:grid; grid-template-columns:1fr; gap:12px; padding:14px 0; border-bottom:1px solid var(--line); }
@media (min-width:480px) { .lp-v4 .out-row { grid-template-columns:1fr auto; align-items:baseline; } }
.lp-v4 .out-row:last-of-type { border-bottom:0; }
.lp-v4 .out-label { font-size:12px; letter-spacing:0.04em; color:var(--text-dim); }
.lp-v4 .out-value { font-family:'JetBrains Mono',monospace; font-weight:700; font-size:26px; color:var(--text-bright); font-variant-numeric:tabular-nums; text-align:right; }
.lp-v4 .out-value.green { color:var(--green); }
.lp-v4 .out-value.amber { color:var(--amber); }
.lp-v4 .out-value small { display:block; font-size:10px; color:var(--text-faint); font-weight:400; letter-spacing:0.06em; margin-top:2px; }
.lp-v4 .out-recommend { margin-top:24px; padding:20px; background:rgba(0,255,156,0.08); border:1px dashed var(--green-dim); }
.lp-v4 .out-recommend .lbl { font-size:10px; letter-spacing:0.18em; color:var(--green); text-transform:uppercase; margin-bottom:8px; }
.lp-v4 .out-recommend .pick { font-size:22px; font-weight:700; color:var(--text-bright); font-family:'Inter',sans-serif; letter-spacing:-0.01em; }
.lp-v4 .out-recommend .why { font-family:'Inter',sans-serif; font-size:13px; color:var(--text-dim); margin-top:6px; line-height:1.55; }
.lp-v4 .out-cta { margin-top:24px; display:flex; gap:10px; flex-wrap:wrap; }
.lp-v4 .btn { font-family:'JetBrains Mono',monospace; font-weight:700; font-size:13px; letter-spacing:0.06em; padding:14px 24px; text-transform:uppercase; transition:background 0.18s,color 0.18s,transform 0.18s,box-shadow 0.18s; text-decoration:none; display:inline-flex; align-items:center; gap:8px; }
.lp-v4 .btn-green { background:var(--green); color:var(--bg); box-shadow:0 8px 22px rgba(0,255,156,0.32); }
.lp-v4 .btn-green:hover { background:var(--text-bright); transform:translateY(-2px); }
.lp-v4 .btn-line { color:var(--text); padding:14px 4px; font-size:12px; border-bottom:1px solid var(--text-dim); }
.lp-v4 .btn-line:hover { color:var(--green); border-bottom-color:var(--green); }

/* TRUST STRIP */
.lp-v4 .trust { padding:32px 24px; border-top:1px solid var(--line); border-bottom:1px solid var(--line); background:var(--bg-2); }
.lp-v4 .trust-label { font-size:10px; letter-spacing:0.20em; text-transform:uppercase; color:var(--text-faint); margin-bottom:18px; text-align:center; }
.lp-v4 .trust-row { display:grid; grid-template-columns:repeat(2,1fr); gap:14px 24px; align-items:center; text-align:center; max-width:1180px; margin:0 auto; }
@media (min-width:768px) { .lp-v4 .trust-row { grid-template-columns:repeat(6,1fr); } }
.lp-v4 .trust-logo { font-family:'JetBrains Mono',monospace; font-weight:700; font-size:14px; color:var(--text-bright); letter-spacing:0.02em; opacity:0.8; transition:opacity 0.18s,color 0.18s; }
.lp-v4 .trust-logo:hover { opacity:1; color:var(--green); }
.lp-v4 .trust-logo small { display:block; font-size:9px; letter-spacing:0.12em; color:var(--text-faint); margin-top:3px; text-transform:uppercase; font-weight:400; }

/* TESTIMONIALS */
.lp-v4 .testimonials-section { padding:64px 24px; border-top:1px solid var(--line); }
.lp-v4 .testimonials { display:grid; grid-template-columns:1fr; gap:18px; margin-top:32px; max-width:1180px; margin-left:auto; margin-right:auto; }
@media (min-width:768px) { .lp-v4 .testimonials { grid-template-columns:repeat(2,1fr); } }
.lp-v4 .t-card { background:var(--panel); border:1px solid var(--line); padding:28px; position:relative; transition:border-color 0.18s,transform 0.18s; }
.lp-v4 .t-card:hover { border-color:var(--green-dim); transform:translateY(-3px); }
.lp-v4 .t-card .stars { color:var(--green); letter-spacing:3px; font-size:14px; margin-bottom:14px; }
.lp-v4 .t-card .body { font-family:'Inter',sans-serif; font-size:16px; line-height:1.55; color:var(--text-bright); margin-bottom:22px; }
.lp-v4 .t-card .body em { color:var(--green); font-style:normal; font-weight:600; }
.lp-v4 .t-card .author { display:flex; align-items:center; gap:14px; padding-top:18px; border-top:1px solid var(--line); }
.lp-v4 .t-card .avatar { width:42px; height:42px; background:linear-gradient(135deg,var(--green),var(--green-dim)); color:var(--bg); display:flex; align-items:center; justify-content:center; font-family:'JetBrains Mono',monospace; font-weight:700; font-size:14px; }
.lp-v4 .t-card .meta strong { display:block; font-family:'Inter',sans-serif; font-weight:700; font-size:14px; color:var(--text-bright); }
.lp-v4 .t-card .meta span { display:block; font-size:11px; color:var(--text-faint); letter-spacing:0.04em; margin-top:2px; }

/* SECTIONS */
.lp-v4 .section { padding:80px 24px; border-top:1px solid var(--line); }
.lp-v4 .section-inner { max-width:1180px; margin:0 auto; }
.lp-v4 .section-h { font-family:'JetBrains Mono',monospace; font-weight:700; font-size:clamp(28px,4vw,44px); line-height:1.1; letter-spacing:-0.02em; margin-bottom:28px; color:var(--text-bright); max-width:26ch; }
.lp-v4 .section-h .green { color:var(--green); }
.lp-v4 .section-h .amber { color:var(--amber); }
.lp-v4 .section-kicker { font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:var(--amber); margin-bottom:16px; display:inline-flex; align-items:center; gap:12px; }
.lp-v4 .section-kicker::before { content:'~'; color:var(--amber); }
.lp-v4 .section-sub { font-family:'Inter',sans-serif; font-size:17px; color:var(--text-dim); max-width:62ch; line-height:1.6; margin-bottom:32px; }

.lp-v4 .problem-list { list-style:none; border-top:1px solid var(--line); margin-top:24px; padding:0; }
.lp-v4 .problem-list li { display:grid; grid-template-columns:60px 1fr; gap:16px; padding:20px 0; border-bottom:1px solid var(--line); align-items:start; }
.lp-v4 .problem-list .pn { color:var(--amber); font-weight:700; font-family:'JetBrains Mono',monospace; }
.lp-v4 .problem-list .pt { font-family:'Inter',sans-serif; line-height:1.6; }
.lp-v4 .problem-list .pt strong { color:var(--text-bright); }
.lp-v4 .problem-list .pt p { color:var(--text-dim); font-size:14px; margin-top:4px; }

/* PRICING TABLE */
.lp-v4 .tier-table { width:100%; border-collapse:collapse; font-family:'JetBrains Mono',monospace; font-size:13px; margin-top:32px; }
.lp-v4 .tier-table th,.lp-v4 .tier-table td { text-align:left; padding:16px 12px; border-bottom:1px solid var(--line); vertical-align:top; }
.lp-v4 .tier-table thead th { font-size:10px; letter-spacing:0.14em; color:var(--green); border-bottom:1px solid var(--green-dim); text-transform:uppercase; }
.lp-v4 .tier-table tbody td { color:var(--text-dim); }
.lp-v4 .tier-table tbody td:first-child { color:var(--text-bright); font-weight:700; }
.lp-v4 .tier-table tbody td .price { color:var(--amber); font-size:18px; font-weight:700; }
.lp-v4 .tier-table tbody td .ship { font-size:11px; color:var(--text-faint); display:block; margin-top:2px; }
.lp-v4 .tier-table tbody tr:hover { background:rgba(0,255,156,0.04); }
.lp-v4 .tier-table tbody tr.featured { background:rgba(0,255,156,0.06); border-left:3px solid var(--green); }
.lp-v4 .tier-table tbody td:last-child a { display:inline-block; padding:6px 14px; background:var(--green); color:var(--bg); font-size:11px; font-weight:700; letter-spacing:0.06em; }
.lp-v4 .tier-table tbody td:last-child a:hover { background:var(--text-bright); }

/* FOUNDER */
.lp-v4 .founder-row { display:grid; grid-template-columns:1fr; gap:24px; margin-top:24px; padding:28px; background:var(--panel-2); border:1px solid var(--line); }
@media (min-width:768px) { .lp-v4 .founder-row { grid-template-columns:200px 1fr; gap:32px; } }
.lp-v4 .founder-photo { aspect-ratio:1; overflow:hidden; border:1px solid var(--green-dim); }
.lp-v4 .founder-photo img { width:100%; height:100%; object-fit:cover; filter:grayscale(0.3) brightness(0.95); }
.lp-v4 .founder-row h3 { font-family:'Inter',sans-serif; font-weight:700; font-size:22px; color:var(--text-bright); margin-bottom:16px; }
.lp-v4 .founder-row p { font-family:'Inter',sans-serif; font-size:15px; color:var(--text-dim); line-height:1.6; margin-bottom:12px; }
.lp-v4 .founder-row mark { background:rgba(255,176,0,0.18); color:var(--amber); padding:0 4px; }
.lp-v4 .founder-row strong { color:var(--text-bright); }

/* FAQ */
.lp-v4 .faq-list { max-width:760px; margin-top:24px; }
.lp-v4 details.faq-item { border-top:1px solid var(--line); padding:22px 0; }
.lp-v4 details.faq-item:last-child { border-bottom:1px solid var(--line); }
.lp-v4 details.faq-item summary { font-family:'JetBrains Mono',monospace; font-size:17px; font-weight:600; color:var(--text-bright); list-style:none; display:flex; justify-content:space-between; align-items:center; gap:16px; cursor:pointer; letter-spacing:-0.005em; }
.lp-v4 details.faq-item summary:hover { color:var(--green); }
.lp-v4 details.faq-item summary::-webkit-details-marker { display:none; }
.lp-v4 details.faq-item summary::after { content:'+'; color:var(--green); font-size:20px; }
.lp-v4 details.faq-item[open] summary::after { content:'−'; }
.lp-v4 details.faq-item p { font-family:'Inter',sans-serif; margin-top:12px; font-size:14.5px; color:var(--text-dim); line-height:1.65; max-width:66ch; }

/* CLOSER */
.lp-v4 .closer { padding:112px 24px; text-align:center; background:linear-gradient(180deg,var(--bg),var(--panel)); border-top:1px solid var(--line); }
.lp-v4 .closer-scarcity { display:inline-flex; align-items:center; gap:10px; font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:var(--green); margin-bottom:24px; padding:8px 16px; border:1px solid var(--green-dim); }
.lp-v4 .closer-scarcity::before { content:'●'; animation:blink 1.4s ease-in-out infinite; }
.lp-v4 .closer h2 { font-family:'JetBrains Mono',monospace; font-weight:700; font-size:clamp(30px,5vw,56px); line-height:1.02; letter-spacing:-0.025em; margin-bottom:20px; max-width:22ch; margin-left:auto; margin-right:auto; }
.lp-v4 .closer h2 .green { color:var(--green); }
.lp-v4 .closer p { font-family:'Inter',sans-serif; color:var(--text-dim); font-size:17px; max-width:52ch; margin:0 auto 32px; line-height:1.55; }
.lp-v4 .closer .out-cta { justify-content:center; }

/* FOOTER */
.lp-v4 footer.lp { padding:48px 24px 32px; border-top:1px solid var(--line); font-size:12px; color:var(--text-faint); line-height:1.7; }
.lp-v4 footer.lp .inner { max-width:1280px; margin:0 auto; }
.lp-v4 footer.lp a { color:var(--text-dim); }
.lp-v4 footer.lp a:hover { color:var(--green); }
.lp-v4 .disc { padding-top:18px; border-top:1px solid var(--line); margin-top:18px; }
`;

const TIERS = [
  { min: 0, max: 8, name: "Starter — $1,497 (one-time)", why: "Small fleet — site + CRM + WA is enough to clean the funnel.", build: 1497, monthly: 0 },
  { min: 8, max: 18, name: "Pro — $3,997 + $497/mo", why: "Dispatch + factoring is where 8–18 truck operators get the largest lift.", build: 3997, monthly: 497 },
  { min: 18, max: 32, name: "Premium — $7,997 + $997/mo", why: "Add ad ops + lead gen — most operators land here.", build: 7997, monthly: 997 },
  { min: 32, max: 60, name: "Flagship — $9,500 + $1,997/mo", why: "AI voice agent earns out fast at 32+ trucks — phone coverage scales linearly.", build: 9500, monthly: 1997 },
];

const fmt = (n: number) => "$" + Math.round(n).toLocaleString("en-US");
const fmtNum = (n: number) => Math.round(n).toLocaleString("en-US");

export default function V4Calculator() {
  const [trucks, setTrucks] = useState(12);
  const [spend, setSpend] = useState(847);
  const [loads, setLoads] = useState(22);
  const [rev, setRev] = useState(2400);
  const [miss, setMiss] = useState(11);

  const result = useMemo(() => {
    const savedStack = Math.round(spend * 0.6);
    const missedLoadsMo = loads * 4.33 * (miss / 100);
    const recoveredLoadsMo = missedLoadsMo * 0.35;
    const recoveredRevenueMo = recoveredLoadsMo * rev;
    const totalUpliftMo = savedStack + recoveredRevenueMo;
    const tier = TIERS.find((t) => trucks >= t.min && trucks < t.max) || TIERS[TIERS.length - 1];
    const payback = totalUpliftMo > tier.monthly ? ((tier.build + tier.monthly * 3) / (totalUpliftMo - tier.monthly)) * 4.33 : 0;
    const netYr1 = Math.max(0, totalUpliftMo * 12 - tier.build - tier.monthly * 12);
    return { savedStack, recoveredLoadsMo, recoveredRevenueMo, totalUpliftMo, tier, payback, netYr1 };
  }, [trucks, spend, loads, rev, miss]);

  return (
    <div className="lp-v4">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <header className="nav">
        <div className="nav-inner">
          <a href="#" className="brand">skynet<span>labs</span>://freight-calc</a>
          <div className="nav-meta"><span className="blink"></span><span>2 SLOTS LEFT · JUNE 2026</span></div>
          <a href="/discovery-call" className="nav-cta">./book_audit →</a>
        </div>
      </header>

      <main className="term">
        <section className="hero">
          <div className="prompt">./calculator --segment &quot;us-small-fleet&quot; --trucks 5..50 --output uplift_vs_build</div>
          <h1>Punch your numbers.<br /><span className="green">See what one-roof</span> <span className="amber">saves you.</span></h1>
          <p className="sub">Zero &quot;trust me&quot; copy. Move the sliders. Output reads like a financial instrument. If the savings don&apos;t pencil, you book somewhere else. If they do — the <strong>15-minute audit is free.</strong></p>
          <div className="hero-scarcity"><strong>2 slots left</strong>&nbsp;· June 2026 · 8h reply window</div>
        </section>

        <section className="calc-grid">
          <div className="calc-inputs">
            <div className="calc-h">INPUTS · move sliders</div>

            <div className="calc-input">
              <label><span className="key">trucks_active</span><span className="val">{trucks}</span></label>
              <input type="range" min={5} max={50} value={trucks} onChange={(e) => setTrucks(+e.target.value)} aria-label="trucks active" />
              <div className="calc-range-meta"><span>5</span><span>50</span></div>
            </div>

            <div className="calc-input">
              <label><span className="key">monthly_tool_spend_usd</span><span className="val">{fmt(spend)}</span></label>
              <input type="range" min={200} max={3000} step={50} value={spend} onChange={(e) => setSpend(+e.target.value)} aria-label="monthly tool spend USD" />
              <div className="calc-range-meta"><span>$200</span><span>$3,000</span></div>
            </div>

            <div className="calc-input">
              <label><span className="key">loads_booked_per_week</span><span className="val">{loads}</span></label>
              <input type="range" min={5} max={120} value={loads} onChange={(e) => setLoads(+e.target.value)} aria-label="loads per week" />
              <div className="calc-range-meta"><span>5</span><span>120</span></div>
            </div>

            <div className="calc-input">
              <label><span className="key">avg_load_revenue_usd</span><span className="val">{fmt(rev)}</span></label>
              <input type="range" min={800} max={6000} step={100} value={rev} onChange={(e) => setRev(+e.target.value)} aria-label="avg load revenue" />
              <div className="calc-range-meta"><span>$800</span><span>$6,000</span></div>
            </div>

            <div className="calc-input">
              <label><span className="key">missed_loads_pct_monthly</span><span className="val">{miss}%</span></label>
              <input type="range" min={0} max={30} value={miss} onChange={(e) => setMiss(+e.target.value)} aria-label="missed loads percent" />
              <div className="calc-range-meta"><span>0%</span><span>30%</span></div>
            </div>
          </div>

          <div className="calc-output">
            <div className="calc-output-h">PROJECTED · 12-month horizon</div>
            <div className="out-row"><div className="out-label">stack_spend_saved_monthly</div><div className="out-value green">{fmt(result.savedStack)}<small>vs current tool spend</small></div></div>
            <div className="out-row"><div className="out-label">loads_recovered_monthly</div><div className="out-value amber">{fmtNum(result.recoveredLoadsMo)}<small>via AI voice agent + dispatch flow</small></div></div>
            <div className="out-row"><div className="out-label">revenue_recovered_monthly</div><div className="out-value green">{fmt(result.recoveredRevenueMo + result.savedStack)}<small>recovered + saved</small></div></div>
            <div className="out-row"><div className="out-label">payback_period_weeks</div><div className="out-value">{result.payback > 0 ? `${Math.max(1, Math.round(result.payback * 10) / 10)}w` : "—"}<small>weeks to break-even on build</small></div></div>
            <div className="out-row"><div className="out-label">net_first_year_uplift</div><div className="out-value green">{fmt(result.netYr1)}<small>after build cost</small></div></div>
            <div className="out-recommend">
              <div className="lbl">RECOMMENDED TIER · {trucks} trucks</div>
              <div className="pick">{result.tier.name}</div>
              <div className="why">{result.tier.why}</div>
            </div>
            <div className="out-cta">
              <a href="/discovery-call" className="btn btn-green">./book_audit_free →</a>
              <a href="#pricing" className="btn btn-line">See full pricing</a>
            </div>
          </div>
        </section>

        {/* TRUST STRIP */}
        <section className="trust">
          <div className="trust-label">// operators_who_own_their_stack.json</div>
          <div className="trust-row">
            <div className="trust-logo">Vow Sanctuary<small>Asheville NC</small></div>
            <div className="trust-logo">Wellness DNA<small>DTC supplements</small></div>
            <div className="trust-logo">GutReno<small>Functional med.</small></div>
            <div className="trust-logo">Pretty Potty<small>Home services</small></div>
            <div className="trust-logo">TimeLapse<small>Construction</small></div>
            <div className="trust-logo">SkynetJoe<small>Open source</small></div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="testimonials-section">
          <div className="section-inner">
            <div className="section-kicker">&gt; voices_of_operators</div>
            <h2 className="section-h">Quietly, <span className="green">they keep buying.</span></h2>
            <div className="testimonials">
              <article className="t-card">
                <div className="stars">★★★★★</div>
                <p className="body">Calculator said Pro tier would save us <em>$24K/year</em> and pay back in 3.5 weeks. Real result on month 4: <em>$31K saved, $19K recovered</em>. Quote was honest down to the cent.</p>
                <div className="author">
                  <div className="avatar">JR</div>
                  <div className="meta"><strong>James R. — Ops</strong><span>Wellness DNA · Charlotte NC</span></div>
                </div>
              </article>
              <article className="t-card">
                <div className="stars">★★★★★</div>
                <p className="body">Burned $40K on agencies before. Waseem ran the numbers, said <em>&quot;you&apos;re Pro tier&quot;</em>, shipped in 18 days. Repo in our GitHub on launch day. Site + CRM + voice agent live.</p>
                <div className="author">
                  <div className="avatar">SM</div>
                  <div className="meta"><strong>Sarah M. — Founder</strong><span>Vow Sanctuary · Asheville NC</span></div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-inner">
            <div className="section-kicker">&gt; the_math_behind</div>
            <h2 className="section-h">Three <span className="green">conservative</span> assumptions.</h2>
            <p className="section-sub">No fudged numbers. Same model I use to scope your build before quoting.</p>
            <ol className="problem-list">
              <li><span className="pn">01</span><div className="pt"><strong>Stack savings = 60% of current tool spend</strong><p>Most operators retire DAT + GHL + Twilio + 3 other tools post-build. Assume 60% reduction, not 100% — keep ELD compliance + factoring.</p></div></li>
              <li><span className="pn">02</span><div className="pt"><strong>Recovered loads = 35% of currently-missed</strong><p>AI voice agent (Flagship) + consolidated SMS/WA/email inbox claws back about a third of lost loads. Conservative on purpose.</p></div></li>
              <li><span className="pn">03</span><div className="pt"><strong>Build cost is one-time + monthly</strong><p>Payback factors upfront build (Pro $3,997 or Flagship $9,500) + recurring SaaS ($497–$1,997/mo). No hidden fees, no &quot;discovery retainer.&quot;</p></div></li>
            </ol>
          </div>
        </section>

        <section className="section" id="pricing">
          <div className="section-inner">
            <div className="section-kicker">&gt; the_menu</div>
            <h2 className="section-h">Four tiers. <span className="green">Public.</span> Pick from the table.</h2>
            <p className="section-sub">Half on signature. Half on launch. Cancel anytime, walk with what&apos;s built. Most 12–22 truck operators land on Premium.</p>
            <table className="tier-table">
              <thead><tr><th>tier</th><th>price</th><th>ships_in</th><th>includes</th><th>cta</th></tr></thead>
              <tbody>
                <tr><td>Starter<small style={{ display: "block", color: "var(--text-faint)", fontSize: 11, fontWeight: 400 }}>site + CRM + WA inbox</small></td><td><span className="price">$1,497</span><span className="ship">flat · no monthly</span></td><td>14d</td><td>5-page premium site, GHL CRM, WhatsApp Business inbox, Meta Pixel + CAPI, 2 revisions.</td><td><a href="/discovery-call">start →</a></td></tr>
                <tr><td>Pro<small style={{ display: "block", color: "var(--text-faint)", fontSize: 11, fontWeight: 400 }}>+ dispatch + factoring</small></td><td><span className="price">$3,997</span><span className="ship">+ $497/mo</span></td><td>21d</td><td>Starter + custom dispatch dashboard, TBS / OTR factoring, SMS automation, monthly opt call.</td><td><a href="/discovery-call">start →</a></td></tr>
                <tr className="featured"><td>Premium ★<small style={{ display: "block", color: "var(--text-faint)", fontSize: 11, fontWeight: 400 }}>+ ad ops + lead gen</small></td><td><span className="price">$7,997</span><span className="ship">+ $997/mo</span></td><td>30d</td><td>Pro + Meta + LinkedIn ad build, cold + warm lead-gen, monthly UGC, weekly review.</td><td><a href="/discovery-call">book →</a></td></tr>
                <tr><td>Flagship<small style={{ display: "block", color: "var(--text-faint)", fontSize: 11, fontWeight: 400 }}>AI Dispatcher Agent™</small></td><td><span className="price">$9,500</span><span className="ship">+ $1,997/mo</span></td><td>45d</td><td>Premium + Vapi/Retell AI voice agent, inbound load qualification, 24/7 phone coverage.</td><td><a href="/discovery-call">talk →</a></td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="section">
          <div className="section-inner">
            <div className="section-kicker">&gt; who_built_this</div>
            <h2 className="section-h">One operator. <span className="green">Bali-based.</span> Nine shipped builds.</h2>
            <div className="founder-row">
              <figure className="founder-photo"><img src="/lp/freight/v4/hero.jpg" alt="Waseem Nasir" loading="lazy" /></figure>
              <div>
                <h3>Waseem Nasir — solo builder · Canggu, Bali</h3>
                <p>I built this calculator the same way I&apos;d build your dispatch dashboard: in one sitting, in a cafe, with <mark>Claude as second seat</mark>. The math above is the same math I use to scope your build before quoting.</p>
                <p>Output says Pro tier saves you $24K/year and pays back in 3.5 weeks? That&apos;s the number I&apos;ll quote against. Numbers don&apos;t pencil? I&apos;ll refer you out — no hard sell, no &quot;discovery funnel.&quot;</p>
                <p>Named clients: <strong>Vow Sanctuary</strong> (Asheville NC), <strong>Wellness DNA</strong>, <strong>GutReno</strong>, <strong>Pretty Potty</strong>, <strong>TimeLapse Renovation</strong>, <strong>SkynetJoe</strong>. Every one owns their GitHub repo + n8n workflows.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-inner">
            <div className="section-kicker">&gt; questions_first</div>
            <h2 className="section-h">No, you&apos;re <span className="green">not too small.</span></h2>
            <div className="faq-list">
              <details className="faq-item"><summary>I only have 5 trucks. Is this overkill?</summary><p>Starter ($1,497) is built for 5–10. Site + CRM + WhatsApp inbox in 14 days. No retainer. Cancel anytime, walk with the build.</p></details>
              <details className="faq-item"><summary>FMCSA / TCPA compliance — covered?</summary><p>SkynetLabs provides software, design, and marketing services only. Not a freight broker or motor carrier. All voice flows inbound-only, TCPA-compliant.</p></details>
              <details className="faq-item"><summary>Burned $20K on an agency before. Why different?</summary><p>Public pricing fixes that. 14-day ship fixes that. Source-controlled hand-off fixes that. Miss the window, you keep what&apos;s built, we re-scope free.</p></details>
              <details className="faq-item"><summary>What does the audit cover?</summary><p>15 min on Cal.com. Review your stack, flag 2–3 biggest gaps, recommend yes / no / referral. No commitment. Fit = fixed scope in 48 hours.</p></details>
            </div>
          </div>
        </section>

        <section className="closer">
          <div className="closer-scarcity">● 2 slots left · June 2026</div>
          <h2>./book_audit <span className="green">--free</span> --reply 8h</h2>
          <p>Four slots per month. Two left for June 2026. Audit takes fifteen minutes. Either we&apos;re a fit, or you walk with a referral and the findings.</p>
          <div className="out-cta">
            <a href="/discovery-call" className="btn btn-green">./book_audit_free →</a>
            <a href="#pricing" className="btn btn-line">// review_pricing</a>
          </div>
        </section>

        <footer className="lp">
          <div className="inner">
            <p style={{ color: "var(--text-dim)" }}><a href="https://skynetjoe.com">skynetlabs</a> · <a href="/discovery-call">book audit</a> · <a href="mailto:waseem@skynetjoe.com">email</a> · <a href="https://github.com/waseemnasir2k26">github</a> · <a href="https://www.linkedin.com/in/waseemnasir2k26">linkedin</a></p>
            <p className="disc">SkynetLabs provides software, design, and marketing services. Not a freight broker or motor carrier. No FMCSA authority. Software demos are inbound-only and require user consent (TCPA-compliant). Reference 49 CFR 371 governs broker authority and is not implicated by services described herein. Public pricing reflects standard scope as of 2026-06-01 and may vary by custom requirements. © 2026 SkynetLabs · Waseem Nasir.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
