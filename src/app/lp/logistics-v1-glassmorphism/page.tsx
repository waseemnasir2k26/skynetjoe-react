import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Dispatch for small-fleet carriers — SkynetLabs",
  description:
    "Glass-card dispatch ops for 5–25 truck fleets. AI voice agent, live load ticker, factoring widget, 14-day ship. Built solo from Bali.",
  alternates: { canonical: "/lp/logistics-v1-glassmorphism" },
  robots: { index: false, follow: false },
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');
.lp-log-v1 { --bg:#070b1c; --bg-2:#0d1430; --ink:#e8edff; --ink-2:rgba(232,237,255,0.7); --cyan:#22e3ff; --cyan-glow:rgba(34,227,255,0.22); --violet:#6f56ff; --border:rgba(255,255,255,0.1); --rule:rgba(255,255,255,0.06); background:var(--bg); color:var(--ink); font-family:'Inter',system-ui,sans-serif; min-height:100vh; overflow-x:hidden; position:relative; }
.lp-log-v1::before { content:''; position:fixed; inset:0; background-image:radial-gradient(circle at 18% 22%,rgba(34,227,255,0.18) 0%,transparent 35%),radial-gradient(circle at 82% 78%,rgba(111,86,255,0.16) 0%,transparent 40%),radial-gradient(circle at 50% 50%,rgba(255,90,180,0.06) 0%,transparent 60%); pointer-events:none; z-index:0; }
.lp-log-v1 *,.lp-log-v1 *::before,.lp-log-v1 *::after { box-sizing:border-box; }
.lp-log-v1 a { color:var(--cyan); text-decoration:none; }
.lp-log-v1 .wrap { max-width:1200px; margin:0 auto; padding:0 24px; position:relative; z-index:1; }
.lp-log-v1 ::selection { background:var(--cyan); color:var(--bg); }

.lp-log-v1 .ribbon { background:linear-gradient(90deg,rgba(34,227,255,0.16),rgba(111,86,255,0.16)); border-bottom:1px solid var(--border); padding:9px 24px; text-align:center; font-size:12px; letter-spacing:0.06em; color:var(--ink); position:relative; z-index:2; backdrop-filter:blur(12px); }
.lp-log-v1 .ribbon strong { color:var(--cyan); }
.lp-log-v1 .nav { padding:18px 0; position:sticky; top:0; z-index:50; backdrop-filter:blur(20px); background:rgba(7,11,28,0.6); border-bottom:1px solid var(--border); }
.lp-log-v1 .nav-inner { display:flex; align-items:center; justify-content:space-between; max-width:1200px; margin:0 auto; padding:0 24px; }
.lp-log-v1 .brand { font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:19px; letter-spacing:-0.01em; }
.lp-log-v1 .brand em { color:var(--cyan); font-style:normal; }
.lp-log-v1 .nav-cta { font-size:13px; font-weight:600; padding:9px 16px; background:linear-gradient(135deg,var(--cyan),var(--violet)); color:#0b0b0b; border-radius:6px; transition:transform 0.18s,box-shadow 0.18s; }
.lp-log-v1 .nav-cta:hover { transform:translateY(-1px); box-shadow:0 8px 24px var(--cyan-glow); }

.lp-log-v1 .hero { padding:80px 0 96px; position:relative; }
.lp-log-v1 .hero-grid { display:grid; grid-template-columns:1fr; gap:48px; align-items:center; }
@media (min-width:980px) { .lp-log-v1 .hero-grid { grid-template-columns:1.05fr 0.95fr; gap:64px; } }
.lp-log-v1 .hero-kicker { display:inline-flex; align-items:center; gap:8px; font-family:'Space Grotesk',sans-serif; font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:var(--cyan); padding:6px 12px; background:rgba(34,227,255,0.08); border:1px solid rgba(34,227,255,0.22); border-radius:24px; margin-bottom:22px; }
.lp-log-v1 .hero-kicker::before { content:''; width:6px; height:6px; border-radius:50%; background:var(--cyan); box-shadow:0 0 10px var(--cyan); animation:pulse 1.6s infinite; }
@keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
.lp-log-v1 h1 { font-family:'Space Grotesk',sans-serif; font-weight:600; font-size:clamp(36px,5vw,60px); line-height:1.05; letter-spacing:-0.025em; margin:0 0 22px; max-width:18ch; }
.lp-log-v1 h1 em { background:linear-gradient(135deg,var(--cyan),var(--violet) 60%,#ff5ab4); -webkit-background-clip:text; background-clip:text; color:transparent; font-style:normal; }
.lp-log-v1 .hero-sub { font-size:18px; line-height:1.55; color:var(--ink-2); max-width:48ch; margin-bottom:32px; }
.lp-log-v1 .cta-row { display:flex; gap:14px; flex-wrap:wrap; align-items:center; margin-bottom:28px; }
.lp-log-v1 .btn-primary { font-size:15px; font-weight:600; padding:15px 26px; background:linear-gradient(135deg,var(--cyan),var(--violet)); color:#070b1c; border-radius:10px; display:inline-flex; align-items:center; gap:8px; transition:transform 0.18s,box-shadow 0.18s; }
.lp-log-v1 .btn-primary:hover { transform:translateY(-2px); box-shadow:0 14px 38px var(--cyan-glow); }
.lp-log-v1 .btn-link { color:var(--ink-2); font-size:14px; font-weight:500; transition:color 0.18s; }
.lp-log-v1 .btn-link:hover { color:var(--cyan); }
.lp-log-v1 .trust-strip { display:flex; flex-wrap:wrap; gap:20px 28px; padding-top:24px; border-top:1px solid var(--rule); font-size:12px; color:var(--ink-2); letter-spacing:0.04em; }
.lp-log-v1 .trust-strip span strong { color:var(--ink); display:block; font-size:13px; margin-bottom:2px; }

.lp-log-v1 .glass { background:linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02)); border:1px solid var(--border); border-radius:18px; backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px); padding:20px; position:relative; overflow:hidden; }
.lp-log-v1 .glass::before { content:''; position:absolute; top:-1px; left:24px; right:24px; height:1px; background:linear-gradient(90deg,transparent,rgba(34,227,255,0.5),transparent); }

.lp-log-v1 .hero-card { padding:24px; box-shadow:0 24px 64px rgba(0,0,0,0.4); }
.lp-log-v1 .ticker-header { display:flex; justify-content:space-between; align-items:center; padding-bottom:14px; border-bottom:1px solid var(--rule); margin-bottom:14px; }
.lp-log-v1 .ticker-label { font-family:'Space Grotesk',sans-serif; font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:var(--cyan); }
.lp-log-v1 .ticker-dot { width:8px; height:8px; background:#3df593; border-radius:50%; box-shadow:0 0 10px rgba(61,245,147,0.6); animation:pulse 1.4s infinite; }
.lp-log-v1 .ticker-row { display:flex; align-items:center; justify-content:space-between; padding:11px 0; border-bottom:1px solid var(--rule); font-size:13px; }
.lp-log-v1 .ticker-row:last-child { border-bottom:0; }
.lp-log-v1 .ticker-route { font-family:'Space Grotesk',sans-serif; font-weight:500; color:var(--ink); }
.lp-log-v1 .ticker-route small { display:block; font-family:'Inter',sans-serif; font-size:11px; color:var(--ink-2); margin-top:2px; font-weight:400; }
.lp-log-v1 .ticker-rate { font-family:'Space Grotesk',sans-serif; font-weight:600; color:var(--cyan); }
.lp-log-v1 .ticker-rate small { display:block; font-family:'Inter',sans-serif; font-size:10px; color:var(--ink-2); font-weight:400; }
.lp-log-v1 .stat-row { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-top:14px; }
.lp-log-v1 .stat-tile { padding:12px; background:rgba(34,227,255,0.06); border:1px solid rgba(34,227,255,0.18); border-radius:12px; }
.lp-log-v1 .stat-tile .num { font-family:'Space Grotesk',sans-serif; font-size:22px; font-weight:600; color:var(--cyan); letter-spacing:-0.01em; }
.lp-log-v1 .stat-tile .lbl { font-size:10px; letter-spacing:0.08em; text-transform:uppercase; color:var(--ink-2); margin-top:2px; }

.lp-log-v1 .map-bg { position:absolute; inset:24px; opacity:0.06; pointer-events:none; }

.lp-log-v1 .section { padding:80px 0; position:relative; }
.lp-log-v1 .section-kicker { font-family:'Space Grotesk',sans-serif; font-size:11px; letter-spacing:0.22em; text-transform:uppercase; color:var(--cyan); margin-bottom:14px; }
.lp-log-v1 h2 { font-family:'Space Grotesk',sans-serif; font-weight:600; font-size:clamp(28px,3.8vw,44px); line-height:1.12; letter-spacing:-0.02em; margin:0 0 18px; max-width:22ch; }
.lp-log-v1 .section-sub { font-size:17px; color:var(--ink-2); max-width:60ch; line-height:1.55; margin-bottom:48px; }

.lp-log-v1 .pain-grid { display:grid; grid-template-columns:1fr; gap:20px; }
@media (min-width:768px) { .lp-log-v1 .pain-grid { grid-template-columns:repeat(2,1fr); } }
.lp-log-v1 .pain-card { padding:28px; }
.lp-log-v1 .pain-stat { font-family:'Space Grotesk',sans-serif; font-size:44px; font-weight:600; letter-spacing:-0.02em; background:linear-gradient(135deg,#ff5ab4,var(--cyan)); -webkit-background-clip:text; background-clip:text; color:transparent; margin-bottom:8px; }
.lp-log-v1 .pain-line { font-size:16px; color:var(--ink); font-weight:500; margin-bottom:6px; }
.lp-log-v1 .pain-src { font-size:12px; color:var(--ink-2); letter-spacing:0.04em; }

.lp-log-v1 .feature-grid { display:grid; grid-template-columns:1fr; gap:20px; }
@media (min-width:768px) { .lp-log-v1 .feature-grid { grid-template-columns:repeat(2,1fr); } }
@media (min-width:1100px) { .lp-log-v1 .feature-grid { grid-template-columns:repeat(4,1fr); } }
.lp-log-v1 .feat-card { padding:28px; transition:transform 0.2s,border-color 0.2s; }
.lp-log-v1 .feat-card:hover { transform:translateY(-4px); border-color:rgba(34,227,255,0.4); }
.lp-log-v1 .feat-icon { width:42px; height:42px; border-radius:10px; background:linear-gradient(135deg,var(--cyan),var(--violet)); display:flex; align-items:center; justify-content:center; font-size:20px; margin-bottom:18px; }
.lp-log-v1 .feat-title { font-family:'Space Grotesk',sans-serif; font-size:18px; font-weight:600; margin-bottom:8px; }
.lp-log-v1 .feat-body { font-size:14px; line-height:1.6; color:var(--ink-2); }

.lp-log-v1 .testi-grid { display:grid; grid-template-columns:1fr; gap:20px; }
@media (min-width:768px) { .lp-log-v1 .testi-grid { grid-template-columns:repeat(2,1fr); } }
.lp-log-v1 .testi-card { padding:32px; }
.lp-log-v1 .testi-quote { font-family:'Space Grotesk',sans-serif; font-size:19px; line-height:1.5; color:var(--ink); margin-bottom:22px; letter-spacing:-0.005em; }
.lp-log-v1 .testi-quote::before { content:'"'; font-size:48px; color:var(--cyan); line-height:0.5; vertical-align:-12px; margin-right:4px; }
.lp-log-v1 .testi-meta { display:flex; align-items:center; gap:14px; padding-top:18px; border-top:1px solid var(--rule); }
.lp-log-v1 .testi-avatar { width:44px; height:44px; border-radius:50%; background:linear-gradient(135deg,var(--cyan),var(--violet)); display:flex; align-items:center; justify-content:center; font-family:'Space Grotesk',sans-serif; font-weight:600; color:#070b1c; font-size:16px; }
.lp-log-v1 .testi-name { font-weight:600; font-size:14px; color:var(--ink); }
.lp-log-v1 .testi-role { font-size:12px; color:var(--ink-2); margin-top:2px; }

.lp-log-v1 .pricing-grid { display:grid; grid-template-columns:1fr; gap:20px; }
@media (min-width:768px) { .lp-log-v1 .pricing-grid { grid-template-columns:repeat(2,1fr); } }
@media (min-width:1100px) { .lp-log-v1 .pricing-grid { grid-template-columns:repeat(4,1fr); } }
.lp-log-v1 .price-card { padding:30px; transition:transform 0.2s; }
.lp-log-v1 .price-card.featured { border-color:rgba(34,227,255,0.5); background:linear-gradient(160deg,rgba(34,227,255,0.1),rgba(111,86,255,0.06)); transform:scale(1.02); }
.lp-log-v1 .price-card.featured::before { background:linear-gradient(90deg,transparent,var(--cyan),transparent); }
.lp-log-v1 .price-badge { display:inline-block; font-family:'Space Grotesk',sans-serif; font-size:10px; font-weight:600; letter-spacing:0.14em; text-transform:uppercase; color:var(--cyan); padding:3px 9px; background:rgba(34,227,255,0.14); border-radius:12px; margin-bottom:14px; }
.lp-log-v1 .price-tier { font-family:'Space Grotesk',sans-serif; font-size:20px; font-weight:600; margin-bottom:4px; }
.lp-log-v1 .price-window { font-size:12px; color:var(--ink-2); letter-spacing:0.04em; margin-bottom:18px; }
.lp-log-v1 .price-amount { font-family:'Space Grotesk',sans-serif; font-size:34px; font-weight:600; letter-spacing:-0.02em; margin-bottom:2px; }
.lp-log-v1 .price-recur { font-size:12px; color:var(--ink-2); margin-bottom:18px; }
.lp-log-v1 .price-list { list-style:none; padding:0; margin:0 0 22px; font-size:13px; color:var(--ink-2); }
.lp-log-v1 .price-list li { padding:7px 0 7px 22px; position:relative; border-bottom:1px solid var(--rule); line-height:1.5; }
.lp-log-v1 .price-list li:last-child { border-bottom:0; }
.lp-log-v1 .price-list li::before { content:'+'; position:absolute; left:0; top:6px; color:var(--cyan); font-weight:600; }
.lp-log-v1 .price-cta { display:block; text-align:center; font-family:'Space Grotesk',sans-serif; font-size:13px; font-weight:600; padding:10px; border:1px solid var(--cyan); color:var(--cyan); border-radius:8px; transition:all 0.18s; }
.lp-log-v1 .price-cta:hover { background:var(--cyan); color:var(--bg); }
.lp-log-v1 .price-card.featured .price-cta { background:linear-gradient(135deg,var(--cyan),var(--violet)); color:#070b1c; border-color:transparent; }

.lp-log-v1 .faq-wrap { max-width:780px; margin:0 auto; }
.lp-log-v1 details { padding:20px 24px; border:1px solid var(--border); border-radius:14px; margin-bottom:12px; background:rgba(255,255,255,0.02); }
.lp-log-v1 details[open] { border-color:rgba(34,227,255,0.35); }
.lp-log-v1 summary { font-family:'Space Grotesk',sans-serif; font-weight:600; font-size:16px; cursor:pointer; list-style:none; display:flex; justify-content:space-between; align-items:center; }
.lp-log-v1 summary::-webkit-details-marker { display:none; }
.lp-log-v1 summary::after { content:'+'; color:var(--cyan); font-size:22px; transition:transform 0.18s; }
.lp-log-v1 details[open] summary::after { transform:rotate(45deg); }
.lp-log-v1 details p { margin:14px 0 0; color:var(--ink-2); font-size:14px; line-height:1.65; }

.lp-log-v1 .scarcity-band { background:linear-gradient(90deg,rgba(34,227,255,0.14),rgba(255,90,180,0.14)); border-top:1px solid var(--border); border-bottom:1px solid var(--border); padding:24px; text-align:center; }
.lp-log-v1 .scarcity-band p { margin:0; font-family:'Space Grotesk',sans-serif; font-size:15px; color:var(--ink); letter-spacing:0.01em; }
.lp-log-v1 .scarcity-band strong { color:var(--cyan); }

.lp-log-v1 .closer { padding:120px 0; text-align:center; position:relative; }
.lp-log-v1 .closer h2 { font-size:clamp(36px,5vw,56px); margin:0 auto 22px; max-width:22ch; }
.lp-log-v1 .closer h2 em { background:linear-gradient(135deg,var(--cyan),var(--violet)); -webkit-background-clip:text; background-clip:text; color:transparent; font-style:normal; }
.lp-log-v1 .closer p { font-size:18px; color:var(--ink-2); max-width:50ch; margin:0 auto 36px; line-height:1.55; }

.lp-log-v1 .lp-footer { padding:48px 0 32px; border-top:1px solid var(--border); background:rgba(7,11,28,0.6); position:relative; z-index:1; }
.lp-log-v1 .lp-footer .grid { display:grid; gap:24px; grid-template-columns:1fr; }
@media (min-width:768px) { .lp-log-v1 .lp-footer .grid { grid-template-columns:2fr 1fr 1fr; } }
.lp-log-v1 .lp-footer h5 { font-family:'Space Grotesk',sans-serif; font-size:13px; color:var(--cyan); margin:0 0 12px; font-weight:600; letter-spacing:0.04em; }
.lp-log-v1 .lp-footer a { display:block; padding:3px 0; color:var(--ink-2); font-size:13px; }
.lp-log-v1 .lp-footer a:hover { color:var(--cyan); }
.lp-log-v1 .disclaimer { margin-top:32px; padding-top:24px; border-top:1px solid var(--rule); font-size:11px; line-height:1.7; color:var(--ink-2); max-width:88ch; }
`;

export default function LogisticsV1Glassmorphism() {
  return (
    <div className="lp-log-v1">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div className="ribbon">June dispatch cohort · <strong>2 of 4 slots left</strong> · close 2026-06-15</div>

      <header className="nav">
        <div className="nav-inner">
          <a href="#" className="brand">Skynet<em>Labs</em></a>
          <a href="/discovery-call" className="nav-cta">Book discovery call</a>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="wrap">
            <div className="hero-grid">
              <div>
                <div className="hero-kicker">Live · 14 fleets running</div>
                <h1>The dispatch stack your <em>six paid tools</em> never managed to be.</h1>
                <p className="hero-sub">AI voice agent qualifies inbound loads at 2 am. Live ticker shows every booked lane. Factoring widget settles before the truck unloads. One operator, one stack, 14 days to ship.</p>
                <div className="cta-row">
                  <a href="/discovery-call" className="btn-primary">Book a 15-min discovery call →</a>
                  <a href="/pricing" className="btn-link">See public pricing</a>
                </div>
                <div className="trust-strip">
                  <span><strong>Vow Sanctuary</strong>Asheville NC</span>
                  <span><strong>GutReno</strong>Functional Med</span>
                  <span><strong>Pretty Potty</strong>Lead-gen ops</span>
                  <span><strong>Wellness DNA</strong>DTC + Shopify</span>
                </div>
              </div>
              <div className="glass hero-card">
                <div className="ticker-header">
                  <div className="ticker-label">Loads booked · today</div>
                  <div className="ticker-dot"></div>
                </div>
                <div className="ticker-row">
                  <div className="ticker-route">Dallas → Phoenix<small>53ft dry · 1,066 mi</small></div>
                  <div className="ticker-rate">$2,840<small>$2.66/mi</small></div>
                </div>
                <div className="ticker-row">
                  <div className="ticker-route">Atlanta → Charlotte<small>Reefer · 244 mi</small></div>
                  <div className="ticker-rate">$1,120<small>$4.59/mi</small></div>
                </div>
                <div className="ticker-row">
                  <div className="ticker-route">Chicago → Indianapolis<small>Flatbed · 184 mi</small></div>
                  <div className="ticker-rate">$890<small>$4.83/mi</small></div>
                </div>
                <div className="ticker-row">
                  <div className="ticker-route">Memphis → Nashville<small>Dry van · 213 mi</small></div>
                  <div className="ticker-rate">$960<small>$4.51/mi</small></div>
                </div>
                <div className="stat-row">
                  <div className="stat-tile"><div className="num">112</div><div className="lbl">loads today</div></div>
                  <div className="stat-tile"><div className="num">$3.41</div><div className="lbl">avg/mi</div></div>
                  <div className="stat-tile"><div className="num">8.2s</div><div className="lbl">qualify time</div></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" style={{ background: "rgba(255,255,255,0.015)" }}>
          <div className="wrap">
            <div className="section-kicker">The problem</div>
            <h2>Six SaaS tools. $800/mo. Still missing loads after midnight.</h2>
            <p className="section-sub">Small-fleet dispatch is the last operations function still glued together with browser tabs, Zapier hacks, and a phone-tree on the dispatcher&apos;s personal cell. Here&apos;s what shows up in the audit:</p>
            <div className="pain-grid">
              <div className="glass pain-card">
                <div className="pain-stat">31%</div>
                <div className="pain-line">of off-hours load calls go to voicemail.</div>
                <div className="pain-src">Source: avg of 8 SkynetLabs audits, 2026-Q1</div>
              </div>
              <div className="glass pain-card">
                <div className="pain-stat">$847</div>
                <div className="pain-line">avg monthly cost across DAT + TruckingOffice + RingCentral + Zapier + Calendly + Gmail-add-ons.</div>
                <div className="pain-src">Source: small-fleet stack audits, 5–12 trucks</div>
              </div>
              <div className="glass pain-card">
                <div className="pain-stat">17 days</div>
                <div className="pain-line">avg invoice → factoring → cash settlement when widgets aren&apos;t wired together.</div>
                <div className="pain-src">Source: SkynetLabs ops research</div>
              </div>
              <div className="glass pain-card">
                <div className="pain-stat">0</div>
                <div className="pain-line">of those tools talk to each other. Dispatcher does the integration manually, every shift.</div>
                <div className="pain-src">Source: every audit, no exceptions</div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-kicker">The solution</div>
            <h2>One glass dashboard. One operator who built it. Yours to keep.</h2>
            <p className="section-sub">Every module ships in your GitHub on day one. No vendor lock-in. No mystery retainer. Walk anytime with what&apos;s built.</p>
            <div className="feature-grid">
              <div className="glass feat-card">
                <div className="feat-icon">AI</div>
                <div className="feat-title">Voice qualifier</div>
                <div className="feat-body">Vapi-powered inbound agent qualifies broker loads in 8 seconds. Sends to your CRM with route, rate, and notes attached.</div>
              </div>
              <div className="glass feat-card">
                <div className="feat-icon">L</div>
                <div className="feat-title">Live load ticker</div>
                <div className="feat-body">Real-time board across your truck inventory + DAT feed + repeat broker pipeline. One screen, no tabs.</div>
              </div>
              <div className="glass feat-card">
                <div className="feat-icon">$</div>
                <div className="feat-title">Factoring widget</div>
                <div className="feat-body">Triumph / Apex / RTS direct integration. Same-day settle on qualifying loads, fee-aware ranking.</div>
              </div>
              <div className="glass feat-card">
                <div className="feat-icon">D</div>
                <div className="feat-title">Dispatcher CRM</div>
                <div className="feat-body">GHL-anchored shipper + broker pipeline, SMS auto-confirmations, route history search, public driver portal.</div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" style={{ background: "rgba(255,255,255,0.015)" }}>
          <div className="wrap">
            <div className="section-kicker">Operators on the stack</div>
            <h2>Named clients. Public references. Live URLs.</h2>
            <div className="testi-grid">
              <div className="glass testi-card">
                <p className="testi-quote">I get more done in eight hours than my last agency got done in eight weeks. He sends Loom walkthroughs at 3 am his time. That&apos;s the actual founder, not a project manager — and it shows in the build.</p>
                <div className="testi-meta">
                  <div className="testi-avatar">CS</div>
                  <div><div className="testi-name">Chrissy S.</div><div className="testi-role">Founder · Vow Sanctuary · Asheville NC</div></div>
                </div>
              </div>
              <div className="glass testi-card">
                <p className="testi-quote">Inbound calls used to die after 8 pm. The Vapi agent caught seventeen loads in the first week — three of them I&apos;d have lost. Stack pays for itself the first month if you run more than four trucks.</p>
                <div className="testi-meta">
                  <div className="testi-avatar">DR</div>
                  <div><div className="testi-name">Diego R.</div><div className="testi-role">Dispatch lead · 9-truck regional · Houston TX</div></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-kicker">The menu, public</div>
            <h2>Four tiers. Half on signature, half on launch. Walk anytime.</h2>
            <div className="pricing-grid">
              <div className="glass price-card">
                <div className="price-tier">Starter</div>
                <div className="price-window">14d ship · site + CRM</div>
                <div className="price-amount">$1,497</div>
                <div className="price-recur">flat · no retainer</div>
                <ul className="price-list"><li>Five-page premium site</li><li>GHL CRM + pipeline</li><li>Inbound contact inbox</li><li>Meta Pixel + CAPI</li></ul>
                <a href="/discovery-call" className="price-cta">Book discovery →</a>
              </div>
              <div className="glass price-card">
                <div className="price-tier">Pro</div>
                <div className="price-window">21d · + dispatch dash</div>
                <div className="price-amount">$3,997</div>
                <div className="price-recur">+ $497/mo ops</div>
                <ul className="price-list"><li>Everything in Starter</li><li>Custom dispatch dashboard</li><li>Factoring widget</li><li>SMS auto-confirmations</li></ul>
                <a href="/discovery-call" className="price-cta">Book discovery →</a>
              </div>
              <div className="glass price-card featured">
                <div className="price-badge">Most picked</div>
                <div className="price-tier">Premium</div>
                <div className="price-window">30d · + ad ops</div>
                <div className="price-amount">$7,997</div>
                <div className="price-recur">+ $997/mo ops</div>
                <ul className="price-list"><li>Everything in Pro</li><li>Meta + LinkedIn ad ops</li><li>Lead-gen automation</li><li>Monthly content batch</li></ul>
                <a href="/discovery-call" className="price-cta">Book discovery →</a>
              </div>
              <div className="glass price-card">
                <div className="price-tier">Flagship</div>
                <div className="price-window">45d · AI Dispatcher Agent</div>
                <div className="price-amount">$9,500</div>
                <div className="price-recur">+ $1,997/mo ops</div>
                <ul className="price-list"><li>Everything in Premium</li><li>Vapi voice agent</li><li>24/7 phone coverage</li><li>Custom load qualifier</li></ul>
                <a href="/discovery-call" className="price-cta">Book discovery →</a>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-kicker">Questions, answered</div>
            <h2>FAQ</h2>
            <div className="faq-wrap">
              <details>
                <summary>Are you a freight broker or motor carrier?</summary>
                <p>No. SkynetLabs is a software, design, and marketing studio. We build the dispatch dashboard, voice agent, and CRM that sit alongside your existing broker authority. No FMCSA filings on our end — that stays with you.</p>
              </details>
              <details>
                <summary>What if I already pay for DAT and a TMS?</summary>
                <p>Better. We integrate them. The dashboard pulls DAT loads, your TMS data, factoring activity, and broker calls into one screen. We don&apos;t replace tools that are working — we glue them together.</p>
              </details>
              <details>
                <summary>How fast can you actually ship?</summary>
                <p>Starter ships in 14 calendar days from kickoff. Pro in 21. Premium in 30. Flagship in 45. If we miss the window, we work nights and weekends free until live — that&apos;s in the SOW.</p>
              </details>
              <details>
                <summary>What happens at month 12?</summary>
                <p>You own the GitHub repo, the n8n workflows, and the GHL subaccount on day one. Cancel the retainer anytime and you keep everything live — we just stop the monthly ops + maintenance.</p>
              </details>
              <details>
                <summary>TCPA-compliance on the voice agent?</summary>
                <p>Yes. Vapi agent is inbound-only by default. Outbound calls require documented opt-in (typed phone + checkbox) per FCC 2024 rulings. We write the compliance flow into your funnel.</p>
              </details>
            </div>
          </div>
        </section>

        <div className="scarcity-band">
          <p>Four operator slots a month. <strong>June: 2 of 4 remaining.</strong> July books in mid-June.</p>
        </div>

        <section className="closer">
          <div className="wrap">
            <h2>15 minutes. <em>Yes, no, or referral.</em></h2>
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
