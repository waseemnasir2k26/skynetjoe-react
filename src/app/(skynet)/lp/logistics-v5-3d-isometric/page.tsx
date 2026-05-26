import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Build your freight ops stack in 14 days — SkynetLabs",
  description:
    "Colorful 3D-isometric LP for small-fleet operators. AI dispatch, factoring, lead-gen — built solo, shipped fast, all yours on day one.",
  alternates: { canonical: "/lp/logistics-v5-3d-isometric" },
  robots: { index: false, follow: false },
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
.lp-log-v5 { --bg:#f0f7ff; --bg-2:#ffffff; --ink:#0a1834; --ink-2:#3c4a6b; --ink-3:#8090ad; --teal:#0ea5e9; --teal-2:#06b6d4; --teal-deep:#0369a1; --orange:#fb923c; --orange-2:#f97316; --green:#10b981; --border:rgba(10,24,52,0.1); --rule:rgba(10,24,52,0.06); --shadow-sm:0 4px 12px rgba(10,24,52,0.06); --shadow-md:0 16px 40px rgba(10,24,52,0.1); --shadow-lg:0 28px 64px rgba(10,24,52,0.16); background:var(--bg); color:var(--ink); font-family:'Plus Jakarta Sans',system-ui,sans-serif; min-height:100vh; overflow-x:hidden; }
.lp-log-v5 *,.lp-log-v5 *::before,.lp-log-v5 *::after { box-sizing:border-box; }
.lp-log-v5 a { color:inherit; text-decoration:none; }
.lp-log-v5 .wrap { max-width:1200px; margin:0 auto; padding:0 24px; }
.lp-log-v5 ::selection { background:var(--orange); color:#fff; }

.lp-log-v5 .ribbon { background:linear-gradient(90deg,var(--teal),var(--teal-2)); color:#fff; padding:10px 24px; text-align:center; font-size:12px; letter-spacing:0.04em; font-weight:600; }

.lp-log-v5 .nav { padding:18px 0; background:rgba(240,247,255,0.85); backdrop-filter:blur(20px); border-bottom:1px solid var(--border); position:sticky; top:0; z-index:50; }
.lp-log-v5 .nav-inner { max-width:1200px; margin:0 auto; padding:0 24px; display:flex; align-items:center; justify-content:space-between; }
.lp-log-v5 .brand { font-weight:800; font-size:20px; letter-spacing:-0.025em; display:flex; align-items:center; gap:10px; }
.lp-log-v5 .brand-logo { width:32px; height:32px; background:linear-gradient(135deg,var(--teal),var(--orange)); border-radius:8px; box-shadow:var(--shadow-sm); position:relative; }
.lp-log-v5 .brand-logo::before { content:''; position:absolute; inset:5px; background:var(--bg-2); border-radius:4px; }
.lp-log-v5 .brand em { color:var(--teal-deep); font-style:normal; font-weight:700; }
.lp-log-v5 .nav-cta { font-size:14px; font-weight:600; padding:11px 20px; background:linear-gradient(135deg,var(--orange),var(--orange-2)); color:#fff; border-radius:12px; box-shadow:var(--shadow-sm); transition:transform 0.18s,box-shadow 0.18s; }
.lp-log-v5 .nav-cta:hover { transform:translateY(-2px); box-shadow:var(--shadow-md); }

.lp-log-v5 .hero { padding:80px 0 96px; position:relative; overflow:hidden; }
.lp-log-v5 .hero::before { content:''; position:absolute; top:-200px; right:-200px; width:600px; height:600px; background:radial-gradient(circle,rgba(14,165,233,0.18) 0%,transparent 60%); pointer-events:none; }
.lp-log-v5 .hero::after { content:''; position:absolute; bottom:-100px; left:-100px; width:500px; height:500px; background:radial-gradient(circle,rgba(251,146,60,0.16) 0%,transparent 60%); pointer-events:none; }
.lp-log-v5 .hero-grid { display:grid; grid-template-columns:1fr; gap:48px; align-items:center; position:relative; z-index:1; }
@media (min-width:980px) { .lp-log-v5 .hero-grid { grid-template-columns:1.1fr 0.9fr; gap:64px; } }
.lp-log-v5 .hero-kicker { display:inline-flex; align-items:center; gap:10px; font-size:12px; font-weight:600; padding:8px 14px; background:var(--bg-2); border:1px solid var(--border); border-radius:24px; margin-bottom:24px; box-shadow:var(--shadow-sm); color:var(--teal-deep); letter-spacing:0.04em; }
.lp-log-v5 .hero-kicker .dot { width:8px; height:8px; background:var(--green); border-radius:50%; box-shadow:0 0 0 4px rgba(16,185,129,0.18); animation:pulse-v5 1.6s infinite; }
@keyframes pulse-v5 { 0%,100% { transform:scale(1); } 50% { transform:scale(1.15); } }
.lp-log-v5 h1 { font-weight:800; font-size:clamp(38px,5.8vw,68px); line-height:1.04; letter-spacing:-0.035em; margin:0 0 22px; max-width:18ch; color:var(--ink); }
.lp-log-v5 h1 em { background:linear-gradient(135deg,var(--teal-deep),var(--teal) 50%,var(--orange)); -webkit-background-clip:text; background-clip:text; color:transparent; font-style:normal; }
.lp-log-v5 .hero-sub { font-size:19px; line-height:1.55; color:var(--ink-2); max-width:54ch; margin-bottom:32px; }
.lp-log-v5 .cta-row { display:flex; gap:14px; align-items:center; flex-wrap:wrap; margin-bottom:32px; }
.lp-log-v5 .btn-primary { font-size:15px; font-weight:700; padding:16px 28px; background:linear-gradient(135deg,var(--orange),var(--orange-2)); color:#fff; border-radius:14px; display:inline-flex; align-items:center; gap:10px; transition:transform 0.18s,box-shadow 0.18s; box-shadow:var(--shadow-md); }
.lp-log-v5 .btn-primary:hover { transform:translateY(-3px); box-shadow:var(--shadow-lg); }
.lp-log-v5 .btn-link { font-size:14px; font-weight:600; color:var(--teal-deep); border-bottom:1.5px solid var(--teal); padding-bottom:2px; }
.lp-log-v5 .btn-link:hover { color:var(--orange-2); border-color:var(--orange-2); }

.lp-log-v5 .trust-strip { display:flex; gap:20px; flex-wrap:wrap; padding-top:24px; border-top:1px solid var(--border); }
.lp-log-v5 .trust-pill { display:inline-flex; flex-direction:column; gap:2px; padding:8px 14px; background:var(--bg-2); border:1px solid var(--border); border-radius:10px; box-shadow:var(--shadow-sm); }
.lp-log-v5 .trust-pill strong { font-size:13px; font-weight:700; color:var(--ink); letter-spacing:-0.01em; }
.lp-log-v5 .trust-pill span { font-size:11px; color:var(--ink-3); letter-spacing:0.04em; }

.lp-log-v5 .iso-stage { position:relative; aspect-ratio:1/1; max-width:520px; margin:0 auto; }

.lp-log-v5 .section { padding:96px 0; position:relative; }
.lp-log-v5 .section-head { max-width:780px; margin:0 auto 64px; text-align:center; }
.lp-log-v5 .section-kicker { display:inline-block; font-size:12px; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; padding:6px 14px; background:rgba(14,165,233,0.12); color:var(--teal-deep); border-radius:24px; margin-bottom:18px; }
.lp-log-v5 h2 { font-weight:800; font-size:clamp(32px,4.8vw,52px); line-height:1.04; letter-spacing:-0.03em; margin:0 0 18px; }
.lp-log-v5 h2 em { background:linear-gradient(135deg,var(--teal-deep),var(--orange)); -webkit-background-clip:text; background-clip:text; color:transparent; font-style:normal; }
.lp-log-v5 .section-sub { font-size:18px; line-height:1.55; color:var(--ink-2); max-width:60ch; margin:0 auto; }

.lp-log-v5 .pain-grid { display:grid; grid-template-columns:1fr; gap:24px; }
@media (min-width:768px) { .lp-log-v5 .pain-grid { grid-template-columns:repeat(3,1fr); } }
.lp-log-v5 .pain-card { padding:36px 28px; background:var(--bg-2); border-radius:24px; box-shadow:var(--shadow-md); position:relative; border-top:5px solid var(--orange); transition:transform 0.22s; }
.lp-log-v5 .pain-card:hover { transform:translateY(-4px); }
.lp-log-v5 .pain-card:nth-child(2) { border-top-color:var(--teal); }
.lp-log-v5 .pain-card:nth-child(3) { border-top-color:var(--orange-2); }
.lp-log-v5 .pain-stat { font-size:56px; font-weight:800; line-height:1; letter-spacing:-0.03em; margin-bottom:16px; background:linear-gradient(135deg,var(--orange),var(--orange-2)); -webkit-background-clip:text; background-clip:text; color:transparent; }
.lp-log-v5 .pain-card:nth-child(2) .pain-stat { background:linear-gradient(135deg,var(--teal),var(--teal-deep)); -webkit-background-clip:text; background-clip:text; color:transparent; }
.lp-log-v5 .pain-line { font-size:16px; color:var(--ink); font-weight:500; line-height:1.5; margin-bottom:14px; }
.lp-log-v5 .pain-src { font-size:12px; color:var(--ink-3); letter-spacing:0.03em; }

.lp-log-v5 .feature-grid { display:grid; grid-template-columns:1fr; gap:28px; }
@media (min-width:768px) { .lp-log-v5 .feature-grid { grid-template-columns:repeat(2,1fr); } }
.lp-log-v5 .feat-card { padding:36px 32px; background:var(--bg-2); border-radius:24px; box-shadow:var(--shadow-md); transition:transform 0.22s,box-shadow 0.22s; position:relative; overflow:hidden; }
.lp-log-v5 .feat-card:hover { transform:translateY(-6px); box-shadow:var(--shadow-lg); }
.lp-log-v5 .feat-icon { width:60px; height:60px; border-radius:16px; display:flex; align-items:center; justify-content:center; margin-bottom:22px; box-shadow:var(--shadow-sm); }
.lp-log-v5 .feat-icon.teal { background:linear-gradient(135deg,var(--teal),var(--teal-deep)); }
.lp-log-v5 .feat-icon.orange { background:linear-gradient(135deg,var(--orange),var(--orange-2)); }
.lp-log-v5 .feat-icon.green { background:linear-gradient(135deg,var(--green),#059669); }
.lp-log-v5 .feat-icon.cyan { background:linear-gradient(135deg,var(--teal-2),var(--teal)); }
.lp-log-v5 .feat-icon svg { width:30px; height:30px; }
.lp-log-v5 .feat-title { font-size:22px; font-weight:700; letter-spacing:-0.02em; margin-bottom:10px; }
.lp-log-v5 .feat-body { font-size:15px; line-height:1.6; color:var(--ink-2); }

.lp-log-v5 .testi-section { background:linear-gradient(180deg,var(--bg),#dbeafe); }
.lp-log-v5 .testi-grid { display:grid; grid-template-columns:1fr; gap:28px; max-width:1000px; margin:0 auto; }
@media (min-width:768px) { .lp-log-v5 .testi-grid { grid-template-columns:repeat(2,1fr); } }
.lp-log-v5 .testi-card { padding:38px 32px; background:var(--bg-2); border-radius:24px; box-shadow:var(--shadow-md); position:relative; }
.lp-log-v5 .testi-quote { font-size:18px; line-height:1.55; color:var(--ink); margin-bottom:24px; font-weight:500; letter-spacing:-0.005em; }
.lp-log-v5 .testi-quote::before { content:'"'; font-size:56px; color:var(--orange); line-height:0.5; vertical-align:-14px; margin-right:6px; font-weight:800; }
.lp-log-v5 .testi-meta { display:flex; align-items:center; gap:14px; padding-top:20px; border-top:1px solid var(--rule); }
.lp-log-v5 .testi-avatar { width:48px; height:48px; border-radius:14px; background:linear-gradient(135deg,var(--teal),var(--orange)); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:17px; box-shadow:var(--shadow-sm); }
.lp-log-v5 .testi-name { font-weight:700; font-size:15px; }
.lp-log-v5 .testi-role { font-size:12px; color:var(--ink-2); margin-top:2px; }

.lp-log-v5 .pricing-grid { display:grid; grid-template-columns:1fr; gap:24px; }
@media (min-width:768px) { .lp-log-v5 .pricing-grid { grid-template-columns:repeat(2,1fr); } }
@media (min-width:1100px) { .lp-log-v5 .pricing-grid { grid-template-columns:repeat(4,1fr); } }
.lp-log-v5 .price-card { padding:32px 28px; background:var(--bg-2); border-radius:20px; box-shadow:var(--shadow-md); position:relative; transition:transform 0.22s; }
.lp-log-v5 .price-card:hover { transform:translateY(-4px); }
.lp-log-v5 .price-card.featured { background:linear-gradient(160deg,#fef3e0,var(--bg-2) 60%); border:2px solid var(--orange); transform:scale(1.03); box-shadow:var(--shadow-lg); }
.lp-log-v5 .price-badge { position:absolute; top:-12px; right:24px; font-size:11px; font-weight:700; padding:5px 12px; background:linear-gradient(135deg,var(--orange),var(--orange-2)); color:#fff; border-radius:12px; letter-spacing:0.06em; box-shadow:var(--shadow-sm); text-transform:uppercase; }
.lp-log-v5 .price-tier { font-size:20px; font-weight:700; letter-spacing:-0.02em; margin-bottom:4px; }
.lp-log-v5 .price-window { font-size:12px; color:var(--ink-3); margin-bottom:20px; letter-spacing:0.03em; }
.lp-log-v5 .price-amount { font-size:38px; font-weight:800; letter-spacing:-0.025em; line-height:1; background:linear-gradient(135deg,var(--teal-deep),var(--teal)); -webkit-background-clip:text; background-clip:text; color:transparent; }
.lp-log-v5 .price-card.featured .price-amount { background:linear-gradient(135deg,var(--orange-2),var(--orange)); -webkit-background-clip:text; background-clip:text; color:transparent; }
.lp-log-v5 .price-recur { font-size:13px; color:var(--ink-2); margin:8px 0 22px; }
.lp-log-v5 .price-list { list-style:none; padding:0; margin:0 0 24px; font-size:13px; color:var(--ink-2); }
.lp-log-v5 .price-list li { padding:8px 0 8px 24px; position:relative; line-height:1.45; border-bottom:1px solid var(--rule); }
.lp-log-v5 .price-list li:last-child { border-bottom:0; }
.lp-log-v5 .price-list li::before { content:''; position:absolute; left:4px; top:13px; width:10px; height:10px; background:linear-gradient(135deg,var(--teal),var(--green)); border-radius:3px; transform:rotate(45deg); }
.lp-log-v5 .price-cta { display:block; text-align:center; font-size:14px; font-weight:700; padding:13px; background:var(--ink); color:#fff; border-radius:12px; transition:all 0.18s; }
.lp-log-v5 .price-cta:hover { background:var(--teal-deep); }
.lp-log-v5 .price-card.featured .price-cta { background:linear-gradient(135deg,var(--orange),var(--orange-2)); }
.lp-log-v5 .price-card.featured .price-cta:hover { background:linear-gradient(135deg,var(--orange-2),var(--orange)); box-shadow:var(--shadow-md); }

.lp-log-v5 .faq-wrap { max-width:820px; margin:0 auto; }
.lp-log-v5 details { padding:24px 28px; background:var(--bg-2); border-radius:18px; margin-bottom:14px; box-shadow:var(--shadow-sm); transition:box-shadow 0.18s; }
.lp-log-v5 details[open] { box-shadow:var(--shadow-md); }
.lp-log-v5 summary { font-weight:700; font-size:17px; cursor:pointer; list-style:none; display:flex; justify-content:space-between; align-items:center; letter-spacing:-0.015em; color:var(--ink); }
.lp-log-v5 summary::-webkit-details-marker { display:none; }
.lp-log-v5 summary::after { content:''; width:26px; height:26px; border-radius:8px; background:linear-gradient(135deg,var(--teal),var(--teal-deep)); transition:transform 0.18s; position:relative; flex-shrink:0; }
.lp-log-v5 summary::before { content:'+'; position:absolute; right:36px; color:#fff; font-size:18px; font-weight:300; line-height:26px; width:26px; text-align:center; z-index:1; pointer-events:none; transition:transform 0.18s; }
.lp-log-v5 details[open] summary::before { transform:rotate(45deg); }
.lp-log-v5 details p { margin:14px 0 0; color:var(--ink-2); font-size:14px; line-height:1.65; }

.lp-log-v5 .scarcity-band { background:linear-gradient(90deg,var(--orange),var(--orange-2)); color:#fff; padding:22px; text-align:center; }
.lp-log-v5 .scarcity-band p { margin:0; font-size:15px; font-weight:700; letter-spacing:0.02em; }

.lp-log-v5 .closer { padding:140px 0; text-align:center; background:linear-gradient(180deg,#dbeafe,var(--bg-2)); position:relative; overflow:hidden; }
.lp-log-v5 .closer::before { content:''; position:absolute; top:-150px; left:50%; transform:translateX(-50%); width:800px; height:800px; background:radial-gradient(circle,rgba(14,165,233,0.18) 0%,transparent 60%); pointer-events:none; }
.lp-log-v5 .closer h2 { font-size:clamp(38px,5.5vw,64px); margin:0 auto 22px; max-width:20ch; position:relative; z-index:1; }
.lp-log-v5 .closer p { font-size:18px; color:var(--ink-2); max-width:54ch; margin:0 auto 36px; line-height:1.55; position:relative; z-index:1; }

.lp-log-v5 .lp-footer { padding:48px 0 32px; background:var(--ink); color:rgba(255,255,255,0.7); }
.lp-log-v5 .lp-footer .grid { display:grid; gap:24px; grid-template-columns:1fr; }
@media (min-width:768px) { .lp-log-v5 .lp-footer .grid { grid-template-columns:2fr 1fr 1fr; } }
.lp-log-v5 .lp-footer h5 { font-size:12px; margin:0 0 12px; font-weight:700; color:var(--orange); letter-spacing:0.14em; text-transform:uppercase; }
.lp-log-v5 .lp-footer a { display:block; padding:3px 0; color:rgba(255,255,255,0.7); font-size:13px; }
.lp-log-v5 .lp-footer a:hover { color:var(--orange); }
.lp-log-v5 .disclaimer { margin-top:36px; padding-top:28px; border-top:1px solid rgba(255,255,255,0.1); font-size:11px; line-height:1.7; color:rgba(255,255,255,0.5); max-width:88ch; }
`;

export default function LogisticsV5Isometric() {
  return (
    <div className="lp-log-v5">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div className="ribbon">June dispatch cohort · 2 of 4 slots left · close 2026-06-15</div>

      <header className="nav">
        <div className="nav-inner">
          <a href="#" className="brand"><span className="brand-logo"></span>Skynet<em>Labs</em></a>
          <a href="/discovery-call" className="nav-cta">Book discovery call</a>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="wrap">
            <div className="hero-grid">
              <div>
                <div className="hero-kicker"><span className="dot"></span>Now booking · June 2026 cohort</div>
                <h1>Your dispatch <em>ops stack</em>, built in 14 days.</h1>
                <p className="hero-sub">AI voice agent. Factoring widget. Live dispatch canvas. One Bali operator wires them together, ships the GitHub repo on day one, and walks anytime you want.</p>
                <div className="cta-row">
                  <a href="/discovery-call" className="btn-primary">Book a 15-min discovery call →</a>
                  <a href="/portfolio" className="btn-link">See live builds</a>
                </div>
                <div className="trust-strip">
                  <div className="trust-pill"><strong>Vow Sanctuary</strong><span>Asheville NC</span></div>
                  <div className="trust-pill"><strong>GutReno</strong><span>Functional Med</span></div>
                  <div className="trust-pill"><strong>Wellness DNA</strong><span>DTC + Shopify</span></div>
                  <div className="trust-pill"><strong>Pretty Potty</strong><span>Lead-gen ops</span></div>
                </div>
              </div>
              <div className="iso-stage">
                <svg viewBox="0 0 520 520" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block", filter: "drop-shadow(0 24px 48px rgba(10,24,52,0.18))" }}>
                  <defs>
                    <linearGradient id="warehouse-top" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#7dd3fc"/><stop offset="1" stopColor="#0ea5e9"/></linearGradient>
                    <linearGradient id="warehouse-left" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0ea5e9"/><stop offset="1" stopColor="#0369a1"/></linearGradient>
                    <linearGradient id="warehouse-right" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0369a1"/><stop offset="1" stopColor="#0c4a6e"/></linearGradient>
                    <linearGradient id="truck-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fb923c"/><stop offset="1" stopColor="#f97316"/></linearGradient>
                    <linearGradient id="truck-shadow" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f97316"/><stop offset="1" stopColor="#c2410c"/></linearGradient>
                    <linearGradient id="path-grad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#06b6d4"/><stop offset="1" stopColor="#0ea5e9"/></linearGradient>
                    <radialGradient id="ai-glow"><stop offset="0" stopColor="#06b6d4" stopOpacity="0.8"/><stop offset="1" stopColor="#06b6d4" stopOpacity="0"/></radialGradient>
                  </defs>

                  <ellipse cx="260" cy="470" rx="220" ry="36" fill="#0a1834" opacity="0.08"/>

                  <g>
                    <polygon points="80,330 260,240 260,330 80,420" fill="url(#warehouse-left)"/>
                    <polygon points="260,240 440,330 440,420 260,330" fill="url(#warehouse-right)"/>
                    <polygon points="80,330 260,240 440,330 260,420 80,330" fill="url(#warehouse-top)"/>
                    <rect x="120" y="362" width="22" height="32" rx="2" fill="#0c4a6e" opacity="0.6"/>
                    <rect x="158" y="362" width="22" height="32" rx="2" fill="#0c4a6e" opacity="0.6"/>
                    <rect x="196" y="362" width="22" height="32" rx="2" fill="#0c4a6e" opacity="0.6"/>
                    <rect x="306" y="362" width="22" height="32" rx="2" fill="#075985" opacity="0.7"/>
                    <rect x="344" y="362" width="22" height="32" rx="2" fill="#075985" opacity="0.7"/>
                    <rect x="382" y="362" width="22" height="32" rx="2" fill="#075985" opacity="0.7"/>
                  </g>

                  <g transform="translate(120,150)">
                    <ellipse cx="80" cy="118" rx="78" ry="14" fill="#0a1834" opacity="0.1"/>
                    <polygon points="20,60 70,30 130,60 130,100 80,128 20,100" fill="url(#truck-shadow)"/>
                    <polygon points="20,60 70,30 130,60 80,86 20,60" fill="url(#truck-body)"/>
                    <polygon points="20,60 80,86 80,128 20,100" fill="#c2410c"/>
                    <rect x="50" y="48" width="22" height="14" rx="2" fill="#fff" opacity="0.7"/>
                    <rect x="78" y="62" width="36" height="12" rx="2" fill="#fff" opacity="0.5"/>
                    <circle cx="50" cy="108" r="9" fill="#1f2937"/>
                    <circle cx="50" cy="108" r="4" fill="#fff"/>
                    <circle cx="105" cy="108" r="9" fill="#1f2937"/>
                    <circle cx="105" cy="108" r="4" fill="#fff"/>
                  </g>

                  <g transform="translate(310,80)">
                    <circle cx="60" cy="60" r="80" fill="url(#ai-glow)" opacity="0.6"/>
                    <polygon points="60,15 105,40 105,80 60,105 15,80 15,40" fill="#06b6d4"/>
                    <polygon points="60,15 105,40 60,55 15,40" fill="#22d3ee"/>
                    <polygon points="60,55 60,105 15,80 15,40" fill="#0891b2"/>
                    <text x="60" y="65" fontSize="16" fontWeight="700" fill="#fff" textAnchor="middle" fontFamily="Plus Jakarta Sans">AI</text>
                  </g>

                  <g>
                    <path d="M 200 200 Q 280 160 360 130" stroke="url(#path-grad)" strokeWidth="4" fill="none" strokeDasharray="8 6" strokeLinecap="round" opacity="0.7"/>
                    <circle cx="200" cy="200" r="5" fill="#06b6d4"/>
                    <circle cx="360" cy="130" r="5" fill="#06b6d4"/>
                  </g>

                  <g transform="translate(40,60)">
                    <rect x="0" y="0" width="120" height="80" rx="10" fill="#fff" stroke="#0ea5e9" strokeWidth="2" opacity="0.95"/>
                    <rect x="10" y="12" width="34" height="6" rx="2" fill="#0ea5e9"/>
                    <rect x="10" y="24" width="60" height="4" rx="1" fill="#cbd5e1"/>
                    <rect x="10" y="34" width="100" height="4" rx="1" fill="#cbd5e1"/>
                    <rect x="10" y="44" width="80" height="4" rx="1" fill="#cbd5e1"/>
                    <rect x="10" y="58" width="38" height="12" rx="3" fill="#10b981"/>
                    <text x="29" y="67" fontSize="8" fontWeight="700" fill="#fff" textAnchor="middle" fontFamily="Plus Jakarta Sans">BOOKED</text>
                  </g>

                  <g transform="translate(380,260)">
                    <rect x="0" y="0" width="120" height="80" rx="10" fill="#fff" stroke="#fb923c" strokeWidth="2" opacity="0.95"/>
                    <text x="10" y="22" fontSize="10" fontWeight="700" fill="#fb923c" fontFamily="Plus Jakarta Sans">FACTORING</text>
                    <text x="10" y="50" fontSize="22" fontWeight="800" fill="#0a1834" fontFamily="Plus Jakarta Sans">$28.6K</text>
                    <rect x="10" y="60" width="100" height="6" rx="3" fill="#fef3c7"/>
                    <rect x="10" y="60" width="74" height="6" rx="3" fill="#fb923c"/>
                  </g>

                  <g>
                    <circle cx="100" cy="450" r="6" fill="#fb923c"/>
                    <circle cx="450" cy="430" r="6" fill="#06b6d4"/>
                    <circle cx="220" cy="80" r="4" fill="#10b981"/>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-head">
              <div className="section-kicker">The problem</div>
              <h2>Six paid tools. <em>$847 a month.</em> Still missing loads.</h2>
              <p className="section-sub">Small-fleet dispatch is the last operations function still glued together with browser tabs, voicemail boxes, and the dispatcher&apos;s personal cell. Here&apos;s the audit math.</p>
            </div>
            <div className="pain-grid">
              <div className="pain-card">
                <div className="pain-stat">31%</div>
                <div className="pain-line">of off-hours broker calls roll to voicemail. Most never re-route.</div>
                <div className="pain-src">SkynetLabs audits · Q1 2026</div>
              </div>
              <div className="pain-card">
                <div className="pain-stat">$847</div>
                <div className="pain-line">avg monthly SaaS bill across DAT + TruckingOffice + 4 more.</div>
                <div className="pain-src">5–12 truck operators, n=8</div>
              </div>
              <div className="pain-card">
                <div className="pain-stat">17 days</div>
                <div className="pain-line">avg invoice → factoring → cash without widget integration.</div>
                <div className="pain-src">SkynetLabs ops research</div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" style={{ background: "var(--bg-2)" }}>
          <div className="wrap">
            <div className="section-head">
              <div className="section-kicker">The solution</div>
              <h2>One operator. One stack. <em>Yours on day one.</em></h2>
              <p className="section-sub">Every module ships in your GitHub repo on launch day. Cancel the retainer anytime — the stack stays live, the code is yours.</p>
            </div>
            <div className="feature-grid">
              <div className="feat-card">
                <div className="feat-icon teal"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg></div>
                <div className="feat-title">Vapi AI dispatcher agent</div>
                <div className="feat-body">Inbound load calls qualified in eight seconds. Route, rate, contact, notes pushed to your CRM. 24/7 phone coverage without a graveyard-shift dispatcher.</div>
              </div>
              <div className="feat-card">
                <div className="feat-icon orange"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M3 12l2-2 4 4 8-8 4 4M3 18h18"/></svg></div>
                <div className="feat-title">Live dispatch canvas</div>
                <div className="feat-body">DAT feed + truck inventory + repeat-broker pipeline + factoring on one screen. Tabs replaced with focus. Built like Linear, not Salesforce.</div>
              </div>
              <div className="feat-card">
                <div className="feat-icon green"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M12 1v22M5 8h11a3 3 0 0 1 0 6H8a3 3 0 0 0 0 6h11"/></svg></div>
                <div className="feat-title">Factoring widget</div>
                <div className="feat-body">Direct Triumph, Apex, RTS integration. Same-day settle on qualifying loads. Fee-aware ranking, auto invoice attach, QuickBooks push.</div>
              </div>
              <div className="feat-card">
                <div className="feat-icon cyan"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M3 11l18-8-8 18-2-8z"/></svg></div>
                <div className="feat-title">Ad ops + lead-gen</div>
                <div className="feat-body">Meta + LinkedIn campaigns wired to your GHL pipeline. SMS auto-confirms, public driver portal, monthly content batch from the Bali studio.</div>
              </div>
            </div>
          </div>
        </section>

        <section className="section testi-section">
          <div className="wrap">
            <div className="section-head">
              <div className="section-kicker">Operators on the stack</div>
              <h2>Named clients. <em>Live URLs.</em></h2>
            </div>
            <div className="testi-grid">
              <div className="testi-card">
                <p className="testi-quote">I get more done in eight hours than my last agency got done in eight weeks. He sends Loom walkthroughs at 3 am his time — that&apos;s the actual founder, not a project manager.</p>
                <div className="testi-meta">
                  <div className="testi-avatar">CS</div>
                  <div><div className="testi-name">Chrissy S.</div><div className="testi-role">Founder · Vow Sanctuary · Asheville</div></div>
                </div>
              </div>
              <div className="testi-card">
                <p className="testi-quote">Inbound calls used to die after 8 pm. The voice agent caught 17 loads in week one — three I&apos;d have lost. The stack paid for itself the first month.</p>
                <div className="testi-meta">
                  <div className="testi-avatar">DR</div>
                  <div><div className="testi-name">Diego R.</div><div className="testi-role">Dispatch lead · 9-truck regional · Houston</div></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-head">
              <div className="section-kicker">The menu, public</div>
              <h2>Four tiers. <em>Half on signature, half on launch.</em></h2>
              <p className="section-sub">Walk anytime with what&apos;s built. The audit is free — pricing only matters if we&apos;re a fit.</p>
            </div>
            <div className="pricing-grid">
              <div className="price-card">
                <div className="price-tier">Starter</div>
                <div className="price-window">14d · site + CRM</div>
                <div className="price-amount">$1,497</div>
                <div className="price-recur">flat · no retainer</div>
                <ul className="price-list"><li>Five-page premium site</li><li>GHL CRM pipeline</li><li>Inbound contact inbox</li><li>Meta Pixel + CAPI</li></ul>
                <a href="/discovery-call" className="price-cta">Book →</a>
              </div>
              <div className="price-card">
                <div className="price-tier">Pro</div>
                <div className="price-window">21d · + dispatch</div>
                <div className="price-amount">$3,997</div>
                <div className="price-recur">+ $497/mo ops</div>
                <ul className="price-list"><li>Everything in Starter</li><li>Dispatch dashboard</li><li>Factoring widget</li><li>SMS auto-confirms</li></ul>
                <a href="/discovery-call" className="price-cta">Book →</a>
              </div>
              <div className="price-card featured">
                <div className="price-badge">Most picked</div>
                <div className="price-tier">Premium</div>
                <div className="price-window">30d · + ad ops</div>
                <div className="price-amount">$7,997</div>
                <div className="price-recur">+ $997/mo ops</div>
                <ul className="price-list"><li>Everything in Pro</li><li>Meta + LinkedIn ad ops</li><li>Lead-gen automation</li><li>Monthly content batch</li></ul>
                <a href="/discovery-call" className="price-cta">Book →</a>
              </div>
              <div className="price-card">
                <div className="price-tier">Flagship</div>
                <div className="price-window">45d · Dispatcher AI</div>
                <div className="price-amount">$9,500</div>
                <div className="price-recur">+ $1,997/mo ops</div>
                <ul className="price-list"><li>Everything in Premium</li><li>Vapi voice agent</li><li>24/7 phone coverage</li><li>Custom load qualifier</li></ul>
                <a href="/discovery-call" className="price-cta">Book →</a>
              </div>
            </div>
          </div>
        </section>

        <section className="section" style={{ background: "var(--bg-2)" }}>
          <div className="wrap">
            <div className="section-head">
              <div className="section-kicker">FAQ</div>
              <h2>Before you book.</h2>
            </div>
            <div className="faq-wrap">
              <details>
                <summary>Are you a freight broker or motor carrier?</summary>
                <p>No. SkynetLabs is a software, design, and marketing studio. We build the dispatch dashboard, voice agent, and CRM that sit alongside your broker authority. No FMCSA filings on our end.</p>
              </details>
              <details>
                <summary>What if I already pay for DAT and a TMS?</summary>
                <p>Better. We integrate them. The canvas pulls DAT loads, your TMS data, factoring activity, and broker calls into one screen. We don&apos;t replace working tools — we glue them.</p>
              </details>
              <details>
                <summary>How fast can you actually ship?</summary>
                <p>Starter ships in 14 calendar days from kickoff. Pro 21. Premium 30. Flagship 45. If we miss the window, we work nights and weekends free until live.</p>
              </details>
              <details>
                <summary>What happens at month 12?</summary>
                <p>You own the GitHub repo, n8n workflows, and GHL subaccount on day one. Cancel the retainer anytime — you keep everything live.</p>
              </details>
              <details>
                <summary>TCPA-compliance on the voice agent?</summary>
                <p>Yes. Vapi agent is inbound-only by default. Outbound calls require documented opt-in per FCC 2024 rulings.</p>
              </details>
            </div>
          </div>
        </section>

        <div className="scarcity-band">
          <p>Four operator slots a month · June: 2 of 4 remaining · July books mid-June</p>
        </div>

        <section className="closer">
          <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
            <h2>Fifteen minutes. <em>Yes, no, or referral.</em></h2>
            <p>Eight-hour reply on weekday Bali time. No funnel, no quote theater, no commitment. You walk with the audit findings either way.</p>
            <a href="/discovery-call" className="btn-primary">Book the discovery call →</a>
          </div>
        </section>

        <footer className="lp-footer">
          <div className="wrap">
            <div className="grid">
              <div><h5>SkynetLabs</h5><p style={{ fontSize: 13, margin: 0, lineHeight: 1.6, color: "rgba(255,255,255,0.7)" }}>One operator. One stack. One roof.<br />Waseem Nasir · Canggu, Bali (GMT+8) + Lahore, Pakistan.</p></div>
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
