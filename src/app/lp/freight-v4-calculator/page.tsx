"use client";

import { useMemo, useState } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=Inter:wght@400;500;600&display=swap');
.lp-v4 { --bg:#0d1117; --panel:#161b22; --panel-2:#1c2230; --line:rgba(255,255,255,0.10); --line-strong:rgba(255,255,255,0.22); --green:#00ff9c; --green-dim:#00b46e; --amber:#ffb000; --red:#ff3b3b; --text:#d0d7de; --text-dim:#8b949e; --text-faint:#586069; background:var(--bg); color:var(--text); font-family:'JetBrains Mono',ui-monospace,monospace; font-size:14px; line-height:1.55; min-height:100vh; background-image:radial-gradient(circle at 90% 10%,rgba(0,255,156,0.04) 0%,transparent 40%),radial-gradient(circle at 10% 90%,rgba(255,176,0,0.03) 0%,transparent 40%); }
.lp-v4 *,.lp-v4 *::before,.lp-v4 *::after { box-sizing:border-box; }
.lp-v4 img { max-width:100%; height:auto; display:block; }
.lp-v4 a { color:var(--green); text-decoration:none; }
.lp-v4 ::selection { background:var(--green); color:var(--bg); }
.lp-v4 .sans { font-family:'Inter',sans-serif; }
.lp-v4 .term { max-width:1280px; margin:0 auto; border:1px solid var(--line); background:var(--panel); }
.lp-v4 .term-bar { display:flex; align-items:center; gap:8px; padding:12px 16px; border-bottom:1px solid var(--line); background:var(--bg); font-size:11px; color:var(--text-faint); }
.lp-v4 .dot { width:10px; height:10px; border-radius:50%; }
.lp-v4 .dot.red { background:#ff5f56; }
.lp-v4 .dot.amber { background:#ffbd2e; }
.lp-v4 .dot.green { background:#27c93f; }
.lp-v4 .term-bar-label { margin-left:12px; letter-spacing:0.06em; }
.lp-v4 .term-bar-meta { margin-left:auto; color:var(--green-dim); }
.lp-v4 .term-bar-meta .blink { display:inline-block; width:8px; height:12px; background:var(--green); vertical-align:middle; margin-right:6px; animation:blink 1.1s steps(2,end) infinite; }
@keyframes blink { 50% { opacity:0; } }
.lp-v4 .hero { padding:56px 24px 32px; }
.lp-v4 .prompt { color:var(--green); font-size:13px; margin-bottom:8px; letter-spacing:0.04em; }
.lp-v4 .prompt::before { content:'$ '; color:var(--amber); }
.lp-v4 .hero h1 { font-family:'JetBrains Mono',monospace; font-weight:700; font-size:clamp(28px,4vw,52px); line-height:1.1; letter-spacing:-0.02em; color:var(--text); margin-bottom:16px; }
.lp-v4 .hero h1 .green { color:var(--green); }
.lp-v4 .hero h1 .amber { color:var(--amber); }
.lp-v4 .hero p { font-family:'Inter',sans-serif; font-size:17px; line-height:1.6; color:var(--text-dim); max-width:60ch; margin-bottom:32px; }
.lp-v4 .calc-grid { display:grid; grid-template-columns:1fr; gap:16px; padding:0 24px 56px; }
@media (min-width:1024px) { .lp-v4 .calc-grid { grid-template-columns:1.1fr 1fr; gap:24px; } }
.lp-v4 .calc-inputs { background:var(--panel-2); border:1px solid var(--line); padding:24px; }
.lp-v4 .calc-h { font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:var(--amber); margin-bottom:16px; display:flex; align-items:center; gap:12px; }
.lp-v4 .calc-h::before { content:''; width:24px; height:1px; background:var(--amber); }
.lp-v4 .calc-input { margin-bottom:28px; }
.lp-v4 .calc-input label { display:flex; justify-content:space-between; align-items:baseline; margin-bottom:8px; font-size:12px; letter-spacing:0.04em; }
.lp-v4 .calc-input label .key { color:var(--text-dim); }
.lp-v4 .calc-input label .val { color:var(--green); font-size:18px; font-weight:700; font-variant-numeric:tabular-nums; }
.lp-v4 input[type=range] { -webkit-appearance:none; appearance:none; width:100%; height:4px; background:var(--line); outline:none; border-radius:0; }
.lp-v4 input[type=range]::-webkit-slider-thumb { -webkit-appearance:none; appearance:none; width:18px; height:18px; background:var(--green); cursor:pointer; border:2px solid var(--bg); box-shadow:0 0 0 1px var(--green); }
.lp-v4 input[type=range]::-moz-range-thumb { width:18px; height:18px; background:var(--green); cursor:pointer; border:2px solid var(--bg); }
.lp-v4 .calc-range-meta { display:flex; justify-content:space-between; font-size:10px; color:var(--text-faint); margin-top:6px; letter-spacing:0.05em; }
.lp-v4 .calc-output { background:var(--bg); border:1px solid var(--green-dim); padding:24px; box-shadow:0 0 0 1px rgba(0,255,156,0.12),0 18px 40px rgba(0,0,0,0.4); }
.lp-v4 .calc-output-h { font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:var(--green); margin-bottom:16px; display:flex; align-items:center; gap:12px; }
.lp-v4 .calc-output-h::before { content:'>>>'; color:var(--green); }
.lp-v4 .out-row { display:grid; grid-template-columns:1fr; gap:14px; padding:14px 0; border-bottom:1px solid var(--line); }
@media (min-width:480px) { .lp-v4 .out-row { grid-template-columns:1fr auto; align-items:baseline; } }
.lp-v4 .out-row:last-child { border-bottom:0; }
.lp-v4 .out-label { font-size:12px; letter-spacing:0.04em; color:var(--text-dim); }
.lp-v4 .out-value { font-family:'JetBrains Mono',monospace; font-weight:700; font-size:26px; color:var(--text); font-variant-numeric:tabular-nums; text-align:right; }
.lp-v4 .out-value.green { color:var(--green); }
.lp-v4 .out-value.amber { color:var(--amber); }
.lp-v4 .out-value small { display:block; font-size:10px; color:var(--text-faint); font-weight:400; letter-spacing:0.06em; margin-top:2px; }
.lp-v4 .out-recommend { margin-top:24px; padding:16px; background:rgba(0,255,156,0.08); border:1px dashed var(--green-dim); }
.lp-v4 .out-recommend .lbl { font-size:10px; letter-spacing:0.18em; color:var(--green); text-transform:uppercase; margin-bottom:8px; }
.lp-v4 .out-recommend .pick { font-size:22px; font-weight:700; color:var(--text); font-family:'Inter',sans-serif; letter-spacing:-0.01em; }
.lp-v4 .out-recommend .why { font-family:'Inter',sans-serif; font-size:13px; color:var(--text-dim); margin-top:4px; line-height:1.55; }
.lp-v4 .out-cta { margin-top:20px; display:flex; gap:10px; flex-wrap:wrap; }
.lp-v4 .btn { font-family:'JetBrains Mono',monospace; font-weight:600; font-size:13px; letter-spacing:0.05em; padding:12px 20px; text-transform:uppercase; transition:background 0.18s,color 0.18s; text-decoration:none; display:inline-flex; align-items:center; gap:8px; }
.lp-v4 .btn-green { background:var(--green); color:var(--bg); }
.lp-v4 .btn-green:hover { background:var(--text); }
.lp-v4 .btn-line { border:1px solid var(--text-dim); color:var(--text); }
.lp-v4 .btn-line:hover { background:var(--text); color:var(--bg); }
.lp-v4 .section { padding:64px 24px; border-top:1px solid var(--line); }
.lp-v4 .section-h { font-family:'JetBrains Mono',monospace; font-weight:700; font-size:clamp(28px,4vw,44px); line-height:1.1; letter-spacing:-0.02em; margin-bottom:28px; color:var(--text); max-width:26ch; }
.lp-v4 .section-h .green { color:var(--green); }
.lp-v4 .section-kicker { font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:var(--amber); margin-bottom:16px; display:inline-flex; align-items:center; gap:12px; }
.lp-v4 .section-kicker::before { content:'~'; color:var(--amber); }
.lp-v4 .problem-list { list-style:none; border-top:1px solid var(--line); margin-top:24px; padding:0; }
.lp-v4 .problem-list li { display:grid; grid-template-columns:60px 1fr; gap:16px; padding:18px 0; border-bottom:1px solid var(--line); align-items:start; }
.lp-v4 .problem-list .pn { color:var(--amber); font-weight:700; }
.lp-v4 .problem-list .pt { font-family:'Inter',sans-serif; line-height:1.6; }
.lp-v4 .problem-list .pt strong { color:var(--text); }
.lp-v4 .problem-list .pt p { color:var(--text-dim); font-size:14px; margin-top:4px; }
.lp-v4 .tier-table { width:100%; border-collapse:collapse; font-family:'JetBrains Mono',monospace; font-size:13px; margin-top:32px; }
.lp-v4 .tier-table th,.lp-v4 .tier-table td { text-align:left; padding:16px 12px; border-bottom:1px solid var(--line); vertical-align:top; }
.lp-v4 .tier-table thead th { font-size:10px; letter-spacing:0.14em; color:var(--green); border-bottom:1px solid var(--green-dim); text-transform:uppercase; }
.lp-v4 .tier-table tbody td { color:var(--text-dim); }
.lp-v4 .tier-table tbody td:first-child { color:var(--text); font-weight:600; }
.lp-v4 .tier-table tbody td .price { color:var(--amber); font-size:18px; font-weight:700; }
.lp-v4 .tier-table tbody td .ship { font-size:11px; color:var(--text-faint); display:block; margin-top:2px; }
.lp-v4 .tier-table tbody tr:hover { background:rgba(0,255,156,0.04); }
.lp-v4 .tier-table tbody tr.featured { background:rgba(0,255,156,0.06); border-left:3px solid var(--green); }
.lp-v4 .founder-row { display:grid; grid-template-columns:1fr; gap:24px; margin-top:24px; padding:24px; background:var(--panel-2); border:1px solid var(--line); }
@media (min-width:768px) { .lp-v4 .founder-row { grid-template-columns:200px 1fr; gap:32px; } }
.lp-v4 .founder-photo { aspect-ratio:1; overflow:hidden; border:1px solid var(--green-dim); }
.lp-v4 .founder-photo img { width:100%; height:100%; object-fit:cover; filter:grayscale(0.3) brightness(0.95); }
.lp-v4 .founder-row h3 { font-family:'Inter',sans-serif; font-weight:700; font-size:22px; color:var(--text); margin-bottom:16px; }
.lp-v4 .founder-row p { font-family:'Inter',sans-serif; font-size:15px; color:var(--text-dim); line-height:1.6; margin-bottom:12px; }
.lp-v4 .founder-row mark { background:rgba(255,176,0,0.18); color:var(--amber); padding:0 4px; }
.lp-v4 .closer { padding:96px 24px; text-align:center; background:linear-gradient(180deg,var(--bg),var(--panel)); border-top:1px solid var(--line); }
.lp-v4 .closer h2 { font-family:'JetBrains Mono',monospace; font-weight:700; font-size:clamp(28px,5vw,52px); line-height:1.05; letter-spacing:-0.025em; margin-bottom:16px; }
.lp-v4 .closer h2 .green { color:var(--green); }
.lp-v4 .closer p { font-family:'Inter',sans-serif; color:var(--text-dim); font-size:16px; max-width:50ch; margin:0 auto 32px; }
.lp-v4 .closer .out-cta { justify-content:center; }
.lp-v4 footer.lp { padding:40px 24px; border-top:1px solid var(--line); font-size:11px; color:var(--text-faint); line-height:1.7; }
.lp-v4 footer.lp .inner { max-width:1280px; margin:0 auto; }
.lp-v4 footer.lp a { color:var(--text-dim); }
.lp-v4 footer.lp a:hover { color:var(--green); }
.lp-v4 .disc { padding-top:16px; border-top:1px solid var(--line); margin-top:16px; }
.lp-v4 .wa-sticky { position:fixed; bottom:24px; right:24px; z-index:60; background:var(--green); color:var(--bg); font-family:'JetBrains Mono',monospace; font-weight:700; font-size:11px; letter-spacing:0.08em; padding:12px 18px; text-transform:uppercase; box-shadow:0 12px 28px rgba(0,255,156,0.32); text-decoration:none; display:inline-flex; align-items:center; gap:8px; transition:transform 0.18s; }
.lp-v4 .wa-sticky:hover { transform:translateY(-3px); }
.lp-v4 .wa-sticky svg { width:16px; height:16px; fill:currentColor; }
.lp-v4 .hero-img-wrap { margin:24px 24px 0; border:1px solid var(--line); aspect-ratio:21/9; overflow:hidden; position:relative; }
.lp-v4 .hero-img-wrap img { width:100%; height:100%; object-fit:cover; filter:hue-rotate(140deg) saturate(0.6) brightness(0.55) contrast(1.1); }
.lp-v4 .hero-img-wrap::after { content:'live · cafe · canggu'; position:absolute; bottom:12px; right:16px; font-size:10px; color:var(--green); letter-spacing:0.12em; }
`;

const WA_ICON = "M17.5 14c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.1-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.7-.9-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 2 .6 3.9 1.7 5.5L2 22l4.6-1.2c1.5.8 3.3 1.3 5.4 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2z";

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

      <main className="term">
        <header className="term-bar">
          <span className="dot red"></span><span className="dot amber"></span><span className="dot green"></span>
          <span className="term-bar-label">skynetlabs://freight-ops-calculator · v2026.06.01</span>
          <span className="term-bar-meta"><span className="blink"></span>LIVE</span>
        </header>

        <section className="hero">
          <div className="prompt">./calculator --segment &quot;us-small-fleet&quot; --trucks 5..50</div>
          <h1>Punch in your numbers.<br /><span className="green">See what one-roof</span> <span className="amber">saves you.</span></h1>
          <p>Zero &quot;trust me&quot; copy. Move the sliders. Output reads like a financial instrument. If savings don&apos;t pencil, book somewhere else. If they do — audit is fifteen minutes.</p>
        </section>

        <figure className="hero-img-wrap">
          <img src="/lp/freight/v4/hero.jpg" alt="Waseem Nasir at laptop, tropical workspace" loading="eager" />
        </figure>

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
              <div className="lbl">RECOMMENDED TIER</div>
              <div className="pick">{result.tier.name}</div>
              <div className="why">{result.tier.why}</div>
            </div>
            <div className="out-cta">
              <a href="https://cal.com/skynetjoe/audit" className="btn btn-green">Book 15-min audit →</a>
              <a href="https://wa.me/923001001957?text=COMMAND" className="btn btn-line">WhatsApp</a>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-kicker">&gt; the_math_behind</div>
          <h2 className="section-h">The model uses <span className="green">three</span> conservative assumptions.</h2>
          <ol className="problem-list">
            <li><span className="pn">01</span><div className="pt"><strong>Stack savings = 60% of current tool spend</strong><p>Most operators retire DAT + GHL + Twilio + 3 other tools post-build. Assume 60% reduction, not 100% — keep ELD compliance + factoring.</p></div></li>
            <li><span className="pn">02</span><div className="pt"><strong>Recovered loads = 35% of currently-missed</strong><p>AI voice agent (Flagship) + consolidated SMS/WA/email inbox typically claws back about a third of lost loads. Conservative on purpose.</p></div></li>
            <li><span className="pn">03</span><div className="pt"><strong>Build cost is one-time + monthly</strong><p>Payback factors upfront build (Pro $3,997 or Flagship $9,500) + recurring SaaS ($497–$1,997/mo). No hidden fees, no &quot;discovery retainer.&quot;</p></div></li>
          </ol>
        </section>

        <section className="section">
          <div className="section-kicker">&gt; the_menu</div>
          <h2 className="section-h">Four tiers. <span className="green">Public.</span> Pick from the table.</h2>
          <table className="tier-table">
            <thead><tr><th>tier</th><th>price</th><th>ships_in</th><th>includes</th></tr></thead>
            <tbody>
              <tr><td>Starter<small style={{ display: "block", color: "var(--text-faint)", fontSize: 11, fontWeight: 400 }}>site + CRM + WA inbox</small></td><td><span className="price">$1,497</span><span className="ship">flat · no monthly</span></td><td>14d</td><td>5-page premium site, GHL CRM, WhatsApp Business inbox, Meta Pixel + CAPI, 2 revisions.</td></tr>
              <tr><td>Pro<small style={{ display: "block", color: "var(--text-faint)", fontSize: 11, fontWeight: 400 }}>+ dispatch + factoring</small></td><td><span className="price">$3,997</span><span className="ship">+ $497/mo</span></td><td>21d</td><td>Starter + custom dispatch dashboard, TBS / OTR factoring, SMS automation, monthly opt call.</td></tr>
              <tr className="featured"><td>Premium ★<small style={{ display: "block", color: "var(--text-faint)", fontSize: 11, fontWeight: 400 }}>+ ad ops + lead gen</small></td><td><span className="price">$7,997</span><span className="ship">+ $997/mo</span></td><td>30d</td><td>Pro + Meta + LinkedIn ad build, cold + warm lead-gen, monthly UGC, weekly review.</td></tr>
              <tr><td>Flagship<small style={{ display: "block", color: "var(--text-faint)", fontSize: 11, fontWeight: 400 }}>AI Dispatcher Agent™</small></td><td><span className="price">$9,500</span><span className="ship">+ $1,997/mo</span></td><td>45d</td><td>Premium + Vapi/Retell AI voice agent, inbound load qualification, 24/7 phone coverage.</td></tr>
            </tbody>
          </table>
        </section>

        <section className="section">
          <div className="section-kicker">&gt; who_built_this</div>
          <h2 className="section-h">One operator. <span className="green">Bali-based.</span> Nine shipped builds.</h2>
          <div className="founder-row">
            <figure className="founder-photo"><img src="/lp/freight/v4/hero.jpg" alt="Waseem Nasir" loading="lazy" /></figure>
            <div>
              <h3>Waseem Nasir — solo builder · Canggu, Bali</h3>
              <p>I built this calculator the same way I&apos;d build your dispatch dashboard: in one sitting, in a cafe, with <mark>Claude as second seat</mark>. The math above is the same math I use to scope your build before quoting.</p>
              <p>Output says Pro tier saves you $24K/year and pays back in 3.5 weeks? That&apos;s the number I&apos;ll quote against. Numbers don&apos;t pencil? I&apos;ll refer you out — no hard sell, no &quot;discovery funnel.&quot;</p>
              <p>Named clients: Vow Sanctuary (Asheville NC), Wellness DNA, GutReno, Pretty Potty, TimeLapse Renovation, SkynetJoe. Every one owns their GitHub repo + n8n workflows.</p>
            </div>
          </div>
        </section>

        <section className="closer">
          <h2>./book_audit <span className="green">--free</span> --reply 8h</h2>
          <p>Four slots per month. Two left for June. Audit takes fifteen minutes. Either we&apos;re a fit, or you walk with a referral and the findings.</p>
          <div className="out-cta">
            <a href="https://cal.com/skynetjoe/audit" className="btn btn-green">./book_audit →</a>
            <a href="https://wa.me/923001001957?text=COMMAND" className="btn btn-line">./whatsapp_command</a>
          </div>
        </section>

        <footer className="lp">
          <div className="inner">
            <p style={{ color: "var(--text-dim)" }}><a href="https://skynetjoe.com">skynetlabs</a> · <a href="https://cal.com/skynetjoe/audit">book audit</a> · <a href="https://wa.me/923001001957?text=COMMAND">whatsapp</a> · <a href="mailto:waseem@skynetjoe.com">email</a> · <a href="https://github.com/waseemnasir2k26">github</a></p>
            <p className="disc">SkynetLabs provides software, design, and marketing services. Not a freight broker or motor carrier. No FMCSA authority. Software demos are inbound-only and require user consent (TCPA-compliant). Reference 49 CFR 371 governs broker authority and is not implicated by services described herein. Public pricing reflects standard scope as of 2026-06-01 and may vary by custom requirements. © 2026 SkynetLabs · Waseem Nasir.</p>
          </div>
        </footer>
      </main>

      <a href="https://wa.me/923001001957?text=COMMAND" className="wa-sticky">
        <svg viewBox="0 0 24 24"><path d={WA_ICON} /></svg>WA
      </a>
    </div>
  );
}
