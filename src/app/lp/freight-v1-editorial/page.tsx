import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Quiet Operator's Edge — SkynetLabs",
  description:
    "One operator. One stack. Marketing site + dispatch dashboard + AI voice agent under one roof — 14 days, public pricing, for US carriers running 5–50 trucks.",
  alternates: { canonical: "/lp/freight-v1-editorial" },
  robots: { index: false, follow: false },
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;0,9..144,800;1,9..144,400;1,9..144,600&family=Inter:wght@300;400;500;600;700&display=swap');

.lp-v1 { --ink:#0a0a0a; --paper:#f5f0e6; --gold:#d4af37; --gold-pale:rgba(212,175,55,0.16); --rule:rgba(245,240,230,0.14); --muted:rgba(245,240,230,0.65); --faint:rgba(245,240,230,0.42); background:var(--ink); color:var(--paper); font-family:'Inter',system-ui,sans-serif; font-weight:400; line-height:1.55; -webkit-font-smoothing:antialiased; min-height:100vh; }
.lp-v1 *,.lp-v1 *::before,.lp-v1 *::after { box-sizing:border-box; }
.lp-v1 a { color:inherit; text-decoration:none; }
.lp-v1 img { max-width:100%; height:auto; display:block; }
.lp-v1 ::selection { background:var(--gold); color:var(--ink); }
.lp-v1 .wrap { max-width:1280px; margin:0 auto; padding:0 24px; }
.lp-v1 .serif { font-family:'Fraunces',Georgia,serif; }
.lp-v1 .nav { position:sticky; top:0; z-index:50; background:rgba(10,10,10,0.85); backdrop-filter:saturate(140%) blur(12px); border-bottom:1px solid var(--rule); }
.lp-v1 .nav-inner { display:flex; align-items:center; justify-content:space-between; padding:16px 0; }
.lp-v1 .brand { font-family:'Fraunces',serif; font-weight:600; font-size:22px; letter-spacing:-0.01em; }
.lp-v1 .brand em { font-style:italic; color:var(--gold); font-weight:400; }
.lp-v1 .nav-cta { font-size:12px; letter-spacing:0.12em; text-transform:uppercase; padding:10px 18px; border:1px solid var(--gold); color:var(--gold); transition:background 0.18s,color 0.18s; }
.lp-v1 .nav-cta:hover { background:var(--gold); color:var(--ink); }
.lp-v1 .hero { padding:64px 0 56px; position:relative; overflow:hidden; }
.lp-v1 .hero-eyebrow { font-size:11px; letter-spacing:0.22em; text-transform:uppercase; color:var(--gold); margin-bottom:28px; display:inline-flex; align-items:center; gap:12px; }
.lp-v1 .hero-eyebrow::before { content:''; width:36px; height:1px; background:var(--gold); }
.lp-v1 .hero-title { font-family:'Fraunces',serif; font-weight:300; font-size:clamp(48px,7vw,96px); line-height:0.98; letter-spacing:-0.02em; margin-bottom:28px; }
.lp-v1 .hero-title em { font-style:italic; color:var(--gold); font-weight:400; }
.lp-v1 .hero-deck { font-family:'Fraunces',serif; font-weight:400; font-style:italic; font-size:clamp(18px,2vw,24px); line-height:1.4; color:var(--muted); max-width:62ch; margin-bottom:32px; }
.lp-v1 .hero-byline { font-size:13px; letter-spacing:0.05em; color:var(--faint); margin-bottom:40px; display:flex; align-items:center; gap:14px; flex-wrap:wrap; }
.lp-v1 .hero-byline strong { color:var(--paper); font-weight:600; }
.lp-v1 .hero-byline .dot { width:4px; height:4px; background:var(--gold); border-radius:50%; }
.lp-v1 .hero-cta-row { display:flex; gap:16px; flex-wrap:wrap; }
.lp-v1 .btn-primary { background:var(--gold); color:var(--ink); padding:16px 28px; font-weight:600; font-size:14px; letter-spacing:0.06em; text-transform:uppercase; transition:transform 0.18s,box-shadow 0.18s; border:1px solid var(--gold); display:inline-block; }
.lp-v1 .btn-primary:hover { transform:translateY(-2px); box-shadow:0 14px 38px rgba(212,175,55,0.32); }
.lp-v1 .btn-ghost { border:1px solid var(--rule); color:var(--paper); padding:16px 28px; font-size:14px; letter-spacing:0.06em; text-transform:uppercase; transition:border-color 0.18s,color 0.18s; display:inline-block; }
.lp-v1 .btn-ghost:hover { border-color:var(--gold); color:var(--gold); }
.lp-v1 .hero-image-wrap { position:relative; margin-top:56px; aspect-ratio:16/10; overflow:hidden; border:1px solid var(--rule); }
.lp-v1 .hero-image { width:100%; height:100%; object-fit:cover; object-position:center 30%; filter:contrast(1.04) brightness(0.82) sepia(0.18) saturate(0.85) hue-rotate(-8deg); transition:transform 8s ease; }
.lp-v1 .hero-image-wrap:hover .hero-image { transform:scale(1.04); }
.lp-v1 .hero-image-wrap::after { content:''; position:absolute; inset:0; background:linear-gradient(135deg,transparent 40%,rgba(212,175,55,0.18) 100%); pointer-events:none; }
.lp-v1 .hero-caption { position:absolute; bottom:18px; left:18px; right:18px; font-size:12px; letter-spacing:0.08em; text-transform:uppercase; color:rgba(245,240,230,0.78); }
.lp-v1 .trust { padding:28px 0; border-top:1px solid var(--rule); border-bottom:1px solid var(--rule); margin-top:56px; }
.lp-v1 .trust-inner { display:grid; grid-template-columns:1fr; gap:18px; font-size:13px; color:var(--faint); letter-spacing:0.04em; }
.lp-v1 .trust-row { display:flex; align-items:center; gap:12px; }
.lp-v1 .trust-num { font-family:'Fraunces',serif; font-size:28px; color:var(--gold); font-weight:300; min-width:56px; }
.lp-v1 .trust-row strong { color:var(--paper); font-weight:500; }
.lp-v1 .pullquote-section { padding:96px 0 56px; }
.lp-v1 .pullquote { font-family:'Fraunces',serif; font-style:italic; font-weight:300; font-size:clamp(28px,4vw,48px); line-height:1.2; max-width:22ch; margin:0 auto; text-align:center; color:var(--paper); }
.lp-v1 .pullquote em { color:var(--gold); font-style:italic; }
.lp-v1 .pullquote-attrib { text-align:center; margin-top:32px; font-size:12px; letter-spacing:0.18em; text-transform:uppercase; color:var(--faint); }
.lp-v1 .section { padding:96px 0; border-top:1px solid var(--rule); }
.lp-v1 .kicker { font-size:11px; letter-spacing:0.22em; text-transform:uppercase; color:var(--gold); margin-bottom:20px; display:inline-flex; align-items:center; gap:12px; }
.lp-v1 .kicker::before { content:''; width:24px; height:1px; background:var(--gold); }
.lp-v1 .section-h { font-family:'Fraunces',serif; font-weight:300; font-size:clamp(36px,5vw,60px); line-height:1.05; margin-bottom:32px; letter-spacing:-0.02em; max-width:22ch; }
.lp-v1 .section-h em { font-style:italic; color:var(--gold); font-weight:400; }
.lp-v1 .problem-grid { display:grid; grid-template-columns:1fr; gap:36px; margin-top:48px; }
.lp-v1 .problem { border-top:1px solid var(--rule); padding-top:24px; }
.lp-v1 .problem-num { font-family:'Fraunces',serif; font-size:14px; color:var(--gold); letter-spacing:0.06em; margin-bottom:12px; }
.lp-v1 .problem h3 { font-family:'Fraunces',serif; font-weight:400; font-size:24px; line-height:1.2; margin-bottom:14px; letter-spacing:-0.01em; }
.lp-v1 .problem p { color:var(--muted); font-size:16px; line-height:1.65; }
.lp-v1 .wedge { background:var(--paper); color:var(--ink); padding:96px 0; }
.lp-v1 .wedge .kicker { color:#8a6f1f; }
.lp-v1 .wedge .kicker::before { background:#8a6f1f; }
.lp-v1 .wedge-h { font-family:'Fraunces',serif; font-weight:300; font-size:clamp(40px,5.5vw,72px); line-height:1; margin-bottom:32px; letter-spacing:-0.025em; }
.lp-v1 .wedge-h em { font-style:italic; color:#8a6f1f; font-weight:400; }
.lp-v1 .wedge p { font-size:18px; line-height:1.65; color:#2a2a2a; max-width:64ch; }
.lp-v1 .wedge-grid { display:grid; grid-template-columns:1fr; gap:48px; margin-top:56px; }
.lp-v1 .wedge-card { padding:32px; border:1px solid rgba(10,10,10,0.14); background:rgba(255,255,255,0.5); }
.lp-v1 .wedge-card-num { font-family:'Fraunces',serif; font-style:italic; font-size:56px; color:#8a6f1f; font-weight:300; line-height:1; margin-bottom:12px; }
.lp-v1 .wedge-card h4 { font-family:'Fraunces',serif; font-weight:500; font-size:22px; margin-bottom:12px; letter-spacing:-0.01em; }
.lp-v1 .wedge-card p { font-size:15px; line-height:1.6; color:#4a4a4a; }
.lp-v1 .compare-tbl { width:100%; border-collapse:collapse; margin-top:40px; }
.lp-v1 .compare-tbl th,.lp-v1 .compare-tbl td { padding:18px 12px; text-align:left; border-bottom:1px solid var(--rule); font-size:14px; }
.lp-v1 .compare-tbl th { font-size:11px; letter-spacing:0.16em; text-transform:uppercase; color:var(--gold); font-weight:600; border-bottom:1px solid var(--gold); }
.lp-v1 .compare-tbl td:first-child { color:var(--paper); font-weight:500; }
.lp-v1 .compare-tbl td:not(:first-child) { color:var(--muted); }
.lp-v1 .compare-tbl tr:hover td { background:rgba(212,175,55,0.04); }
.lp-v1 .yes { color:var(--gold); font-weight:600; }
.lp-v1 .no { color:rgba(245,240,230,0.3); }
.lp-v1 .tier-grid { display:grid; grid-template-columns:1fr; gap:24px; margin-top:48px; }
.lp-v1 .tier { padding:36px 32px; border:1px solid var(--rule); background:rgba(245,240,230,0.02); transition:border-color 0.2s,background 0.2s; }
.lp-v1 .tier:hover { border-color:var(--gold); background:rgba(212,175,55,0.04); }
.lp-v1 .tier-name { font-family:'Fraunces',serif; font-style:italic; font-weight:400; font-size:14px; letter-spacing:0.06em; color:var(--gold); margin-bottom:12px; }
.lp-v1 .tier-price { font-family:'Fraunces',serif; font-weight:300; font-size:44px; line-height:1; letter-spacing:-0.025em; margin-bottom:8px; }
.lp-v1 .tier-price small { font-size:14px; color:var(--muted); font-weight:400; letter-spacing:0; }
.lp-v1 .tier-ship { font-size:12px; letter-spacing:0.12em; text-transform:uppercase; color:var(--faint); margin-bottom:20px; }
.lp-v1 .tier ul { list-style:none; padding:0; margin:0; }
.lp-v1 .tier li { font-size:14px; padding:8px 0; color:var(--muted); border-top:1px solid var(--rule); display:flex; align-items:flex-start; gap:10px; }
.lp-v1 .tier li::before { content:'—'; color:var(--gold); }
.lp-v1 .tier-flag { display:inline-block; padding:4px 10px; border:1px solid var(--gold); color:var(--gold); font-size:10px; letter-spacing:0.16em; text-transform:uppercase; margin-bottom:12px; }
.lp-v1 .founder-grid { display:grid; grid-template-columns:1fr; gap:40px; align-items:start; margin-top:32px; }
.lp-v1 .founder-photo { aspect-ratio:4/5; overflow:hidden; border:1px solid var(--rule); background:var(--ink); }
.lp-v1 .founder-photo img { width:100%; height:100%; object-fit:cover; filter:brightness(0.85) sepia(0.2) saturate(0.85); }
.lp-v1 .founder-text p { font-family:'Fraunces',serif; font-weight:400; font-size:18px; line-height:1.65; color:var(--muted); margin-bottom:18px; }
.lp-v1 .founder-text p:first-letter { font-family:'Fraunces',serif; font-weight:300; font-size:64px; color:var(--gold); float:left; line-height:0.85; margin:6px 8px 0 0; }
.lp-v1 .founder-text em { color:var(--gold); font-style:italic; }
.lp-v1 .founder-sig { font-family:'Fraunces',serif; font-style:italic; font-weight:400; font-size:28px; color:var(--gold); margin-top:24px; }
.lp-v1 .builds-grid { display:grid; grid-template-columns:1fr; gap:1px; background:var(--rule); border:1px solid var(--rule); margin-top:48px; }
.lp-v1 .build { background:var(--ink); padding:32px 24px; border-left:3px solid transparent; transition:border-color 0.2s,background 0.2s; }
.lp-v1 .build:hover { border-left-color:var(--gold); background:rgba(212,175,55,0.04); }
.lp-v1 .build-meta { font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:var(--gold); margin-bottom:10px; }
.lp-v1 .build h4 { font-family:'Fraunces',serif; font-weight:400; font-size:22px; margin-bottom:8px; letter-spacing:-0.01em; }
.lp-v1 .build p { font-size:14px; color:var(--muted); line-height:1.55; }
.lp-v1 .lifestyle { padding:0; border-top:1px solid var(--rule); position:relative; overflow:hidden; }
.lp-v1 .lifestyle-img { width:100%; aspect-ratio:21/9; object-fit:cover; filter:brightness(0.5) sepia(0.3) hue-rotate(-10deg); }
.lp-v1 .lifestyle-overlay { position:absolute; inset:0; display:flex; align-items:center; padding:0 24px; background:linear-gradient(90deg,rgba(10,10,10,0.85) 0%,transparent 70%); }
.lp-v1 .lifestyle-overlay blockquote { font-family:'Fraunces',serif; font-style:italic; font-weight:300; font-size:clamp(20px,3vw,36px); line-height:1.25; max-width:32ch; color:var(--paper); margin:0; }
.lp-v1 .lifestyle-overlay cite { display:block; margin-top:16px; font-size:12px; letter-spacing:0.18em; text-transform:uppercase; color:var(--gold); font-style:normal; }
.lp-v1 details.faq-item { border-top:1px solid var(--rule); padding:24px 0; cursor:pointer; }
.lp-v1 details.faq-item summary { font-family:'Fraunces',serif; font-weight:400; font-size:20px; list-style:none; display:flex; justify-content:space-between; align-items:center; gap:24px; letter-spacing:-0.005em; }
.lp-v1 details.faq-item summary::-webkit-details-marker { display:none; }
.lp-v1 details.faq-item summary::after { content:'+'; font-family:'Fraunces',serif; font-size:32px; color:var(--gold); font-weight:300; }
.lp-v1 details.faq-item[open] summary::after { content:'–'; }
.lp-v1 details.faq-item p { margin-top:16px; font-size:16px; color:var(--muted); line-height:1.7; max-width:68ch; }
.lp-v1 .closer { padding:112px 24px; text-align:center; border-top:1px solid var(--rule); background:radial-gradient(circle at 50% 30%,rgba(212,175,55,0.08) 0%,transparent 60%); }
.lp-v1 .closer h2 { font-family:'Fraunces',serif; font-weight:300; font-size:clamp(40px,6vw,80px); line-height:1; letter-spacing:-0.025em; margin-bottom:24px; max-width:16ch; margin-left:auto; margin-right:auto; }
.lp-v1 .closer h2 em { font-style:italic; color:var(--gold); font-weight:400; }
.lp-v1 .closer p { font-family:'Fraunces',serif; font-style:italic; font-size:20px; color:var(--muted); max-width:48ch; margin:0 auto 40px; line-height:1.5; }
.lp-v1 .closer-cta-row { display:flex; gap:16px; justify-content:center; flex-wrap:wrap; }
.lp-v1 footer.lp { padding:64px 0 40px; border-top:1px solid var(--rule); font-size:13px; color:var(--faint); line-height:1.7; }
.lp-v1 footer.lp .grid { display:grid; grid-template-columns:1fr; gap:32px; margin-bottom:40px; }
.lp-v1 footer.lp h5 { font-family:'Fraunces',serif; font-size:14px; font-style:italic; color:var(--gold); font-weight:400; margin-bottom:14px; }
.lp-v1 footer.lp a { color:var(--muted); display:block; padding:4px 0; }
.lp-v1 footer.lp a:hover { color:var(--gold); }
.lp-v1 .disclaimer { padding-top:32px; border-top:1px solid var(--rule); font-size:11px; line-height:1.7; color:var(--faint); max-width:90ch; }
.lp-v1 .wa-sticky { position:fixed; bottom:24px; right:24px; z-index:60; background:var(--gold); color:var(--ink); padding:14px 22px; font-size:13px; font-weight:600; letter-spacing:0.06em; text-transform:uppercase; box-shadow:0 12px 32px rgba(212,175,55,0.32); display:inline-flex; align-items:center; gap:8px; transition:transform 0.18s; text-decoration:none; }
.lp-v1 .wa-sticky:hover { transform:translateY(-3px); }
.lp-v1 .wa-sticky svg { width:16px; height:16px; fill:currentColor; }
@media (min-width:768px) { .lp-v1 .trust-inner { grid-template-columns:repeat(2,1fr); gap:28px; } .lp-v1 .problem-grid { grid-template-columns:repeat(2,1fr); gap:56px; } .lp-v1 .wedge-grid { grid-template-columns:repeat(2,1fr); } .lp-v1 .tier-grid { grid-template-columns:repeat(2,1fr); } .lp-v1 .founder-grid { grid-template-columns:5fr 7fr; gap:56px; } .lp-v1 .builds-grid { grid-template-columns:repeat(2,1fr); } .lp-v1 footer.lp .grid { grid-template-columns:2fr 1fr 1fr 1fr; } }
@media (min-width:1024px) { .lp-v1 .trust-inner { grid-template-columns:repeat(4,1fr); } .lp-v1 .wedge-grid { grid-template-columns:repeat(4,1fr); } .lp-v1 .tier-grid { grid-template-columns:repeat(4,1fr); gap:16px; } .lp-v1 .builds-grid { grid-template-columns:repeat(3,1fr); } }
@media (prefers-reduced-motion:reduce) { .lp-v1 *,.lp-v1 *::before,.lp-v1 *::after { animation:none !important; transition:none !important; } }
`;

const WA_ICON = "M17.5 14c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.1-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.7-.9-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 2 .6 3.9 1.7 5.5L2 22l4.6-1.2c1.5.8 3.3 1.3 5.4 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2z";

export default function V1Editorial() {
  return (
    <div className="lp-v1">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <header className="nav">
        <div className="wrap nav-inner">
          <a href="#" className="brand">Skynet<em>Labs</em></a>
          <a href="https://cal.com/skynetjoe/audit" className="nav-cta">Book Audit</a>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="wrap">
            <div className="hero-eyebrow">Vol. I · Issue No. 6 · 2026-06-01</div>
            <h1 className="hero-title">The Quiet<br /><em>Operator&apos;s</em> Edge.</h1>
            <p className="hero-deck">One operator. One stack. I ship your marketing site, dispatch dashboard, and AI voice agent under one roof — in 14 days, at public pricing, for US carriers running 5–50 trucks.</p>
            <div className="hero-byline">
              <strong>Waseem Nasir</strong><span className="dot"></span><span>Solo builder · Bali based</span><span className="dot"></span><span>9 shipped client wins</span><span className="dot"></span><span>GHL · n8n · AI</span>
            </div>
            <div className="hero-cta-row">
              <a href="https://cal.com/skynetjoe/audit" className="btn-primary">Book free 15-min audit →</a>
              <a href="https://wa.me/923001001957?text=COMMAND" className="btn-ghost">WhatsApp: DM &quot;Command&quot;</a>
            </div>

            <figure className="hero-image-wrap">
              <img src="/lp/freight/v1/hero.jpg" alt="Waseem Nasir at Crate Cafe in Canggu, Bali" className="hero-image" loading="eager" />
              <figcaption className="hero-caption">Above — Canggu, Bali. Iced latte: 35,000 IDR. Scooter parked outside. Dispatch demo runs while I eat nasi goreng.</figcaption>
            </figure>

            <div className="trust">
              <div className="trust-inner">
                <div className="trust-row"><span className="trust-num">9</span><span>Shipped client wins<br /><strong>SkynetJoe · Vow Sanctuary · Wellness DNA</strong></span></div>
                <div className="trust-row"><span className="trust-num">14d</span><span>Standard ship window<br /><strong>50% deposit, balance on launch</strong></span></div>
                <div className="trust-row"><span className="trust-num">1</span><span>Operator. No account managers.<br /><strong>You message me. I build.</strong></span></div>
                <div className="trust-row"><span className="trust-num">$0</span><span>For the audit call.<br /><strong>Yes/no/referral in 8 hours.</strong></span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="pullquote-section wrap">
          <blockquote className="pullquote">&quot;Six paid tools. Eight hundred a month. <em>Nothing talks to anything.</em>&quot;</blockquote>
          <p className="pullquote-attrib">— Every 12-truck dispatcher, every Monday morning</p>
        </section>

        <section className="section">
          <div className="wrap">
            <span className="kicker">The Operator&apos;s Lament</span>
            <h2 className="section-h">Your stack <em>costs you twice.</em></h2>
            <p style={{ fontFamily: "'Fraunces',serif", fontSize: 20, color: "var(--muted)", maxWidth: "60ch", lineHeight: 1.55 }}>Once in subscription fees. Once in lost loads. Most small-fleet owners pay $800+ per month across six broken tools — and still write dispatch on a paper sheet at 2am because no two systems talk.</p>
            <div className="problem-grid">
              <div className="problem"><div className="problem-num">No. 01</div><h3>DAT + Truckstop + QuickBooks + ELD + dispatch sheet + WhatsApp</h3><p>Six logins. Three tabs always open. None of them know the others exist. Your CSV exports are held together by hope.</p></div>
              <div className="problem"><div className="problem-num">No. 02</div><h3>The phone never stops, the loads still slip.</h3><p>You answer at 11pm. Miss the 2am rate confirmation. By 6am the broker reassigned. Not a routing problem — an attention problem dressed as one.</p></div>
              <div className="problem"><div className="problem-num">No. 03</div><h3>Every agency wants a 6-month retainer for a logo.</h3><p>You need a dashboard that books loads while you eat dinner. Agencies don&apos;t build software. Dev shops don&apos;t build brand. Nobody ships both in 14 days for a price you can quote.</p></div>
              <div className="problem"><div className="problem-num">No. 04</div><h3>Big-broker tech costs $40K/yr you don&apos;t have.</h3><p>Their TMS does everything. So does ours. Except mine costs $3,997 + $497/mo because I&apos;m one person who refuses to bill like 12.</p></div>
            </div>
          </div>
        </section>

        <section className="wedge">
          <div className="wrap">
            <span className="kicker">The Wedge</span>
            <h2 className="wedge-h">One <em>operator.</em><br />One <em>stack.</em><br />One <em>roof.</em></h2>
            <p>The only category-of-one in small-fleet freight that ships <strong>marketing site + dispatch dashboard + AI voice agent</strong> in a single 14-day cycle, billed at one transparent price.</p>
            <div className="wedge-grid">
              <div className="wedge-card"><div className="wedge-card-num">I.</div><h4>Marketing site that books loads.</h4><p>Premium Next.js or Framer build. Schema-marked. &lt;2s on 4G. CRM-connected. Public pricing visible.</p></div>
              <div className="wedge-card"><div className="wedge-card-num">II.</div><h4>Dispatch dashboard, one screen.</h4><p>Custom GHL + n8n build. Pulls DAT, Truckstop, ELD, QB. Single SMS/WA/email inbox. Factoring integrated.</p></div>
              <div className="wedge-card"><div className="wedge-card-num">III.</div><h4>AI voice agent on inbound.</h4><p>Vapi or Retell. Answers phone at 2am. Qualifies brokers. Books rate confirmations. Pipeline populated by sunrise.</p></div>
              <div className="wedge-card"><div className="wedge-card-num">IV.</div><h4>Public pricing. 14 days. Source.</h4><p>Every deliverable in your GitHub. Every workflow in your n8n. You own the stack. I leave the keys.</p></div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <span className="kicker">The 5-Line Map</span>
            <h2 className="section-h">Where the others stop, <em>I begin.</em></h2>
            <table className="compare-tbl">
              <thead><tr><th></th><th>SkynetLabs</th><th>Brand agency</th><th>Dev shop</th><th>AI product</th></tr></thead>
              <tbody>
                <tr><td>Marketing site, conversion-tuned</td><td><span className="yes">●</span> Included</td><td><span className="yes">●</span> Included</td><td><span className="no">○</span> Out of scope</td><td><span className="no">○</span> Generic template</td></tr>
                <tr><td>Custom dispatch dashboard</td><td><span className="yes">●</span> Built in 14d</td><td><span className="no">○</span> Sub-contracted</td><td><span className="yes">●</span> 6-month build</td><td><span className="no">○</span> Their UI only</td></tr>
                <tr><td>AI voice agent on inbound</td><td><span className="yes">●</span> Vapi/Retell, branded</td><td><span className="no">○</span></td><td><span className="no">○</span></td><td><span className="yes">●</span> Their voice, not yours</td></tr>
                <tr><td>Public pricing, fixed scope</td><td><span className="yes">●</span> Visible above</td><td><span className="no">○</span> &quot;Custom quote&quot;</td><td><span className="no">○</span> Time + materials</td><td><span className="yes">●</span> But not bespoke</td></tr>
                <tr><td>Source-controlled deliverable</td><td><span className="yes">●</span> Your GitHub, your keys</td><td><span className="no">○</span> Hostage data</td><td><span className="yes">●</span> Some</td><td><span className="no">○</span> Vendor lock-in</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <span className="kicker">Public Pricing</span>
            <h2 className="section-h">Four tiers. <em>No retainer required.</em></h2>
            <p style={{ fontFamily: "'Fraunces',serif", fontStyle: "italic", color: "var(--muted)", fontSize: 18, maxWidth: "56ch" }}>Half on signature. Half on launch. Cancel anytime, walk with what&apos;s built.</p>
            <div className="tier-grid">
              <div className="tier"><div className="tier-name">Starter</div><div className="tier-price">$1,497<small> · 14 days</small></div><div className="tier-ship">Site + CRM + WhatsApp inbox</div><ul><li>5-page premium site</li><li>GHL CRM, pipelines wired</li><li>WhatsApp Business inbox</li><li>Meta Pixel + CAPI</li><li>2 revision rounds</li></ul></div>
              <div className="tier"><div className="tier-name">Pro</div><div className="tier-price">$3,997<small> + $497/mo · 21 days</small></div><div className="tier-ship">+ Dispatch dashboard + factoring</div><ul><li>Everything in Starter</li><li>Custom dispatch dashboard</li><li>Factoring integration (TBS/OTR)</li><li>SMS + email automation</li><li>Monthly opt call</li></ul></div>
              <div className="tier" style={{ borderColor: "var(--gold)" }}><div className="tier-flag">Most operators land here</div><div className="tier-name">Premium</div><div className="tier-price">$7,997<small> + $997/mo · 30 days</small></div><div className="tier-ship">+ Meta/LinkedIn ads + lead gen</div><ul><li>Everything in Pro</li><li>Meta + LinkedIn ad build</li><li>Lead gen ops (cold + warm)</li><li>Monthly UGC content batch</li><li>Weekly review</li></ul></div>
              <div className="tier"><div className="tier-name">Flagship</div><div className="tier-price">$9,500<small> + $1,997/mo · 45 days</small></div><div className="tier-ship">AI Dispatcher Agent™</div><ul><li>Everything in Premium</li><li>Vapi or Retell AI voice agent</li><li>Inbound load qualification</li><li>24/7 phone coverage</li><li>Auto-populated pipeline</li></ul></div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <span className="kicker">A Letter From the Builder</span>
            <div className="founder-grid">
              <figure className="founder-photo"><img src="/lp/freight/v1/about.jpg" alt="Waseem Nasir on a Bali rooftop" loading="lazy" /></figure>
              <div className="founder-text">
                <p>Yes, I&apos;m solo. Yes, Pakistan-based, currently writing this from Crate Cafe in Canggu, Bali. Scooter parked outside. Iced latte 35,000 IDR — about $2.20. Wi-Fi faster than half of Manhattan.</p>
                <p>Most operators looking at this page will ask the question — answer is: yes, one person. The reason that&apos;s <em>your edge</em> is I&apos;m not paying eight account managers, three sales pods, a creative director. Lights stay on because I ship something every week that makes a small-fleet owner more money.</p>
                <p>Clients I&apos;ve shipped — Vow Sanctuary (Asheville), Wellness DNA, GutReno, Pretty Potty, SkynetJoe, TimeLapse Renovation — every one owns their repo and workflows the day we hand off.</p>
                <p>If that lines up, book the audit. If not, I&apos;ll send a referral. <em>Either way you get a real answer in eight hours.</em></p>
                <p className="founder-sig">— Waseem</p>
              </div>
            </div>
          </div>
        </section>

        <section className="lifestyle">
          <img src="/lp/freight/v1/lifestyle.jpg" alt="Crate Cafe, Canggu" className="lifestyle-img" loading="lazy" />
          <div className="lifestyle-overlay wrap">
            <blockquote>&quot;I run this from a cafe in Bali. <em>You can run your fleet from a phone.</em>&quot;<cite>Crate Cafe · Canggu · 2026-05-01</cite></blockquote>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <span className="kicker">Recent Builds</span>
            <h2 className="section-h">Named, shipped, <em>still running.</em></h2>
            <div className="builds-grid">
              <div className="build"><div className="build-meta">Wellness · Asheville NC</div><h4>Vow Sanctuary</h4><p>Next.js flagship. Lighthouse 98. 3-day ship. $7K MRR pipeline within 30 days.</p></div>
              <div className="build"><div className="build-meta">Functional medicine · USA</div><h4>GutReno</h4><p>WordPress + GHL funnel. 12% landing→consult conversion. $4K/mo lead value.</p></div>
              <div className="build"><div className="build-meta">DTC · multi-region</div><h4>Wellness DNA</h4><p>Shopify + n8n. Subscription + WhatsApp post-purchase. 28% LTV lift.</p></div>
              <div className="build"><div className="build-meta">Home services · USA</div><h4>Pretty Potty</h4><p>Lead-gen + GHL + SMS reminders. Booked-consult rate 4×.</p></div>
              <div className="build"><div className="build-meta">Construction · USA</div><h4>TimeLapse Renovation</h4><p>Custom progress tracker + portal. Replaces 3 paid SaaS tools.</p></div>
              <div className="build"><div className="build-meta">SkynetLabs internal</div><h4>SkynetJoe theme</h4><p>The premium WP theme this stack evolved from. Public on GitHub.</p></div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <span className="kicker">Questions Most Owners Ask First</span>
            <h2 className="section-h">No, you&apos;re not <em>too small.</em></h2>
            <details className="faq-item"><summary>What if I only have 5 trucks?</summary><p>Sweet spot. Starter ($1,497) is for 5–10. Site + CRM + WhatsApp in 14 days. Cancel anytime, walk with the build.</p></details>
            <details className="faq-item"><summary>What about FMCSA / TCPA compliance?</summary><p>SkynetLabs provides software, design, marketing services. Not a freight broker or motor carrier. No FMCSA authority. Voice flows inbound-only, TCPA-compliant consent.</p></details>
            <details className="faq-item"><summary>Why are you in Bali if your clients are US?</summary><p>Time zone arbitrage. While your team sleeps, I ship. While your dispatcher answers US-hours, I&apos;m on WhatsApp evenings + weekends.</p></details>
            <details className="faq-item"><summary>I tried an agency — got a logo and a dead site.</summary><p>Public pricing fixes that. 14-day ship fixes that. Source-controlled hand-off fixes that. Miss the window, you keep what&apos;s built and we re-scope free.</p></details>
            <details className="faq-item"><summary>What&apos;s the audit?</summary><p>Free 15 min on Cal.com. I review your stack, flag 2–3 biggest gaps, recommend yes/no/referral. No commitment. Fit = fixed scope in 48 hours.</p></details>
          </div>
        </section>

        <section className="closer">
          <div className="wrap">
            <h2>The audit is <em>free.</em> The clock is mine.</h2>
            <p>Four slots per month. Two left for June. Eight-hour reply window. Not a fit? You walk with a referral and the findings.</p>
            <div className="closer-cta-row">
              <a href="https://cal.com/skynetjoe/audit" className="btn-primary">Book free 15-min audit →</a>
              <a href="https://wa.me/923001001957?text=COMMAND" className="btn-ghost">WhatsApp &quot;Command&quot;</a>
            </div>
          </div>
        </section>

        <footer className="lp">
          <div className="wrap">
            <div className="grid">
              <div><h5>SkynetLabs</h5><p>One operator. One stack. One roof. Built by Waseem Nasir — Canggu, Bali (GMT+8) and Lahore, Pakistan.</p></div>
              <div><h5>Pages</h5><a href="/services">Services</a><a href="/portfolio">Work</a><a href="/pricing">Pricing</a><a href="/about">About</a></div>
              <div><h5>Reach</h5><a href="https://cal.com/skynetjoe/audit">Book audit</a><a href="https://wa.me/923001001957?text=COMMAND">WhatsApp</a><a href="mailto:waseem@skynetjoe.com">waseem@skynetjoe.com</a></div>
              <div><h5>Elsewhere</h5><a href="https://www.linkedin.com/in/waseemnasir2k26">LinkedIn</a><a href="https://github.com/waseemnasir2k26">GitHub</a><a href="https://youtube.com/@skynetlabs">YouTube</a></div>
            </div>
            <p className="disclaimer">SkynetLabs provides software, design, and marketing services. Not a freight broker or motor carrier. No FMCSA authority. Software demos are inbound-only and require user consent (TCPA-compliant). Reference 49 CFR 371 governs broker authority and is not implicated by services described herein. Public pricing reflects standard scope as of 2026-06-01 and may vary by custom requirements. © 2026 SkynetLabs · Waseem Nasir.</p>
          </div>
        </footer>
      </main>

      <a href="https://wa.me/923001001957?text=COMMAND" className="wa-sticky">
        <svg viewBox="0 0 24 24"><path d={WA_ICON} /></svg>
        WhatsApp
      </a>
    </div>
  );
}
