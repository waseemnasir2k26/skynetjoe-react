import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing site + dispatch + AI voice agent in 14 days — SkynetLabs",
  description:
    "US carriers running 5–50 trucks: one operator ships marketing site, dispatch dashboard, and AI voice agent under one roof in 14 days. Public pricing. 2 slots left for June 2026.",
  alternates: { canonical: "/lp/freight-v1-editorial" },
  robots: { index: false, follow: false },
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;0,9..144,800;1,9..144,400;1,9..144,600&family=Inter:wght@300;400;500;600;700&display=swap');

.lp-v1 { --ink:#0a0a0a; --ink-2:#141414; --paper:#f5f0e6; --gold:#d4af37; --gold-hot:#e6c34f; --gold-pale:rgba(212,175,55,0.16); --rule:rgba(245,240,230,0.14); --muted:rgba(245,240,230,0.66); --faint:rgba(245,240,230,0.42); background:var(--ink); color:var(--paper); font-family:'Inter',system-ui,sans-serif; font-weight:400; line-height:1.55; -webkit-font-smoothing:antialiased; min-height:100vh; }
.lp-v1 *,.lp-v1 *::before,.lp-v1 *::after { box-sizing:border-box; }
.lp-v1 a { color:inherit; text-decoration:none; }
.lp-v1 img { max-width:100%; height:auto; display:block; }
.lp-v1 ::selection { background:var(--gold); color:var(--ink); }
.lp-v1 .wrap { max-width:1240px; margin:0 auto; padding:0 24px; }
.lp-v1 .serif { font-family:'Fraunces',Georgia,serif; }

.lp-v1 .nav { position:sticky; top:0; z-index:50; background:rgba(10,10,10,0.92); backdrop-filter:saturate(140%) blur(12px); border-bottom:1px solid var(--rule); }
.lp-v1 .nav-inner { display:flex; align-items:center; justify-content:space-between; padding:14px 0; }
.lp-v1 .brand { font-family:'Fraunces',serif; font-weight:600; font-size:22px; letter-spacing:-0.01em; }
.lp-v1 .brand em { font-style:italic; color:var(--gold); font-weight:400; }
.lp-v1 .nav-meta { font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:var(--faint); display:none; }
@media (min-width:768px) { .lp-v1 .nav-meta { display:flex; align-items:center; gap:10px; } }
.lp-v1 .nav-meta .live { width:8px; height:8px; background:#22c55e; border-radius:50%; box-shadow:0 0 0 3px rgba(34,197,94,0.18); }
.lp-v1 .nav-cta { font-size:12px; letter-spacing:0.10em; text-transform:uppercase; padding:10px 18px; background:var(--gold); color:var(--ink); font-weight:600; transition:background 0.18s; }
.lp-v1 .nav-cta:hover { background:var(--gold-hot); }

/* HERO: single value prop + product preview + CTA + scarcity ribbon */
.lp-v1 .hero { padding:56px 0 0; position:relative; }
.lp-v1 .hero-grid { display:grid; grid-template-columns:1fr; gap:48px; align-items:center; }
@media (min-width:960px) { .lp-v1 .hero-grid { grid-template-columns:1.1fr 1fr; gap:64px; } }
.lp-v1 .hero-eyebrow { font-size:11px; letter-spacing:0.22em; text-transform:uppercase; color:var(--gold); margin-bottom:22px; display:inline-flex; align-items:center; gap:12px; }
.lp-v1 .hero-eyebrow::before { content:''; width:32px; height:1px; background:var(--gold); }
.lp-v1 .hero-title { font-family:'Fraunces',serif; font-weight:300; font-size:clamp(40px,5.8vw,76px); line-height:1.02; letter-spacing:-0.02em; margin-bottom:24px; }
.lp-v1 .hero-title em { font-style:italic; color:var(--gold); font-weight:400; }
.lp-v1 .hero-deck { font-size:18px; line-height:1.55; color:var(--muted); max-width:54ch; margin-bottom:28px; }
.lp-v1 .hero-deck strong { color:var(--paper); font-weight:500; }
.lp-v1 .hero-cta-row { display:flex; gap:14px; flex-wrap:wrap; align-items:center; margin-bottom:26px; }
.lp-v1 .btn-primary { background:var(--gold); color:var(--ink); padding:18px 30px; font-weight:700; font-size:14px; letter-spacing:0.06em; text-transform:uppercase; transition:transform 0.18s,box-shadow 0.18s,background 0.18s; display:inline-block; box-shadow:0 8px 22px rgba(212,175,55,0.28); }
.lp-v1 .btn-primary:hover { transform:translateY(-2px); box-shadow:0 16px 38px rgba(212,175,55,0.42); background:var(--gold-hot); }
.lp-v1 .btn-ghost { color:var(--muted); padding:18px 4px; font-size:13px; letter-spacing:0.06em; text-transform:uppercase; transition:color 0.18s; display:inline-block; border-bottom:1px dashed rgba(245,240,230,0.3); }
.lp-v1 .btn-ghost:hover { color:var(--gold); border-bottom-color:var(--gold); }
.lp-v1 .hero-scarcity { display:inline-flex; align-items:center; gap:10px; font-size:13px; color:var(--muted); padding:8px 14px; background:rgba(212,175,55,0.08); border:1px solid rgba(212,175,55,0.32); }
.lp-v1 .hero-scarcity strong { color:var(--gold); font-weight:600; letter-spacing:0.04em; }
.lp-v1 .hero-scarcity::before { content:''; width:8px; height:8px; background:var(--gold); border-radius:50%; animation:pulse 1.6s ease-in-out infinite; }
@keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.3; } }

.lp-v1 .hero-preview { background:linear-gradient(180deg,#1a1a1a,#0e0e0e); border:1px solid var(--rule); padding:18px; position:relative; }
.lp-v1 .hero-preview::before { content:''; position:absolute; inset:-1px; background:linear-gradient(135deg,rgba(212,175,55,0.4),transparent 40%); z-index:-1; opacity:0.6; }
.lp-v1 .preview-bar { display:flex; align-items:center; gap:6px; padding-bottom:14px; border-bottom:1px solid var(--rule); margin-bottom:18px; }
.lp-v1 .preview-bar span.dot { width:8px; height:8px; border-radius:50%; background:rgba(245,240,230,0.18); }
.lp-v1 .preview-bar span.dot.live { background:#22c55e; }
.lp-v1 .preview-bar .url { margin-left:8px; font-family:'Inter',sans-serif; font-size:11px; color:var(--faint); letter-spacing:0.04em; }
.lp-v1 .preview-rows { display:grid; gap:12px; }
.lp-v1 .preview-row { display:grid; grid-template-columns:auto 1fr auto; gap:12px; align-items:center; padding:12px 14px; background:rgba(245,240,230,0.03); border-left:2px solid var(--gold); }
.lp-v1 .preview-row .lane { font-family:'Fraunces',serif; font-style:italic; font-size:13px; color:var(--gold); min-width:80px; }
.lp-v1 .preview-row .body { font-size:13px; color:var(--paper); }
.lp-v1 .preview-row .body small { color:var(--faint); display:block; font-size:11px; margin-top:2px; letter-spacing:0.04em; }
.lp-v1 .preview-row .v { font-family:'Fraunces',serif; font-size:18px; color:var(--gold); font-weight:400; }
.lp-v1 .preview-row .ok { color:#22c55e; font-size:12px; font-weight:600; }
.lp-v1 .preview-foot { margin-top:14px; padding-top:14px; border-top:1px solid var(--rule); display:flex; justify-content:space-between; font-size:11px; color:var(--faint); letter-spacing:0.06em; }
.lp-v1 .preview-foot .ai { color:var(--gold); }

/* TRUST STRIP — named clients + hard stats */
.lp-v1 .trust { padding:36px 0 32px; margin-top:64px; border-top:1px solid var(--rule); border-bottom:1px solid var(--rule); }
.lp-v1 .trust-label { font-size:11px; letter-spacing:0.22em; text-transform:uppercase; color:var(--faint); margin-bottom:18px; text-align:center; }
.lp-v1 .trust-logos { display:grid; grid-template-columns:repeat(2,1fr); gap:16px 32px; align-items:center; text-align:center; }
@media (min-width:768px) { .lp-v1 .trust-logos { grid-template-columns:repeat(6,1fr); } }
.lp-v1 .trust-logo { font-family:'Fraunces',serif; font-weight:500; font-size:17px; color:var(--paper); letter-spacing:-0.005em; opacity:0.78; transition:opacity 0.2s,color 0.2s; }
.lp-v1 .trust-logo:hover { opacity:1; color:var(--gold); }
.lp-v1 .trust-logo small { display:block; font-family:'Inter',sans-serif; font-size:9px; letter-spacing:0.14em; color:var(--faint); margin-top:3px; text-transform:uppercase; font-weight:400; }
.lp-v1 .stats { display:grid; grid-template-columns:repeat(2,1fr); gap:0; margin-top:32px; border-top:1px solid var(--rule); }
@media (min-width:768px) { .lp-v1 .stats { grid-template-columns:repeat(4,1fr); } }
.lp-v1 .stat { padding:24px 16px; border-right:1px solid var(--rule); text-align:center; }
.lp-v1 .stat:last-child { border-right:0; }
.lp-v1 .stat-v { font-family:'Fraunces',serif; font-size:42px; line-height:1; color:var(--gold); font-weight:300; letter-spacing:-0.02em; }
.lp-v1 .stat-l { font-size:11px; color:var(--muted); letter-spacing:0.10em; text-transform:uppercase; margin-top:8px; }

/* SECTION SCAFFOLD */
.lp-v1 .section { padding:88px 0; border-top:1px solid var(--rule); }
.lp-v1 .kicker { font-size:11px; letter-spacing:0.22em; text-transform:uppercase; color:var(--gold); margin-bottom:18px; display:inline-flex; align-items:center; gap:12px; }
.lp-v1 .kicker::before { content:''; width:24px; height:1px; background:var(--gold); }
.lp-v1 .section-h { font-family:'Fraunces',serif; font-weight:300; font-size:clamp(34px,4.6vw,56px); line-height:1.05; margin-bottom:22px; letter-spacing:-0.02em; max-width:24ch; }
.lp-v1 .section-h em { font-style:italic; color:var(--gold); font-weight:400; }
.lp-v1 .section-sub { font-size:18px; color:var(--muted); max-width:60ch; margin-bottom:48px; line-height:1.6; }

/* PROBLEM → SOLUTION 2-up */
.lp-v1 .ps-grid { display:grid; grid-template-columns:1fr; gap:40px; margin-top:32px; }
@media (min-width:960px) { .lp-v1 .ps-grid { grid-template-columns:1fr 1fr; gap:48px; } }
.lp-v1 .ps-card { padding:32px; border:1px solid var(--rule); background:rgba(245,240,230,0.02); }
.lp-v1 .ps-card.bad { border-color:rgba(220,80,80,0.32); }
.lp-v1 .ps-card.good { border-color:rgba(212,175,55,0.42); background:rgba(212,175,55,0.04); }
.lp-v1 .ps-card-lbl { font-size:11px; letter-spacing:0.18em; text-transform:uppercase; margin-bottom:14px; font-weight:600; }
.lp-v1 .ps-card.bad .ps-card-lbl { color:#dc5050; }
.lp-v1 .ps-card.good .ps-card-lbl { color:var(--gold); }
.lp-v1 .ps-card h3 { font-family:'Fraunces',serif; font-weight:400; font-size:28px; line-height:1.15; margin-bottom:20px; letter-spacing:-0.015em; }
.lp-v1 .ps-card ul { list-style:none; padding:0; margin:0; }
.lp-v1 .ps-card li { padding:12px 0; border-top:1px solid var(--rule); display:flex; align-items:flex-start; gap:14px; font-size:15px; line-height:1.55; color:var(--muted); }
.lp-v1 .ps-card li:first-child { border-top:0; }
.lp-v1 .ps-card.bad li::before { content:'✕'; color:#dc5050; font-weight:700; font-size:14px; flex-shrink:0; margin-top:2px; }
.lp-v1 .ps-card.good li::before { content:'✓'; color:var(--gold); font-weight:700; font-size:14px; flex-shrink:0; margin-top:2px; }
.lp-v1 .ps-card li strong { color:var(--paper); font-weight:500; }

/* TESTIMONIALS */
.lp-v1 .testimonials { display:grid; grid-template-columns:1fr; gap:24px; margin-top:32px; }
@media (min-width:768px) { .lp-v1 .testimonials { grid-template-columns:repeat(2,1fr); } }
.lp-v1 .quote { padding:32px; border:1px solid var(--rule); background:linear-gradient(180deg,rgba(245,240,230,0.03),transparent); position:relative; }
.lp-v1 .quote::before { content:'\\201C'; position:absolute; top:-18px; left:24px; font-family:'Fraunces',serif; font-size:96px; color:var(--gold); line-height:1; font-style:italic; }
.lp-v1 .quote-body { font-family:'Fraunces',serif; font-style:italic; font-weight:300; font-size:20px; line-height:1.45; color:var(--paper); margin-bottom:24px; padding-top:8px; }
.lp-v1 .quote-attrib { display:flex; align-items:center; gap:14px; padding-top:20px; border-top:1px solid var(--rule); }
.lp-v1 .quote-avatar { width:48px; height:48px; border-radius:50%; background:linear-gradient(135deg,var(--gold),#7a5e1f); display:flex; align-items:center; justify-content:center; font-family:'Fraunces',serif; font-size:18px; color:var(--ink); font-weight:600; }
.lp-v1 .quote-meta { font-size:13px; line-height:1.4; }
.lp-v1 .quote-meta strong { color:var(--paper); font-weight:600; display:block; }
.lp-v1 .quote-meta span { color:var(--faint); font-size:12px; letter-spacing:0.04em; }
.lp-v1 .quote-meta .stars { color:var(--gold); font-size:12px; letter-spacing:2px; margin-top:2px; display:block; }

/* PRICING */
.lp-v1 .tier-grid { display:grid; grid-template-columns:1fr; gap:16px; margin-top:8px; }
@media (min-width:768px) { .lp-v1 .tier-grid { grid-template-columns:repeat(2,1fr); } }
@media (min-width:1024px) { .lp-v1 .tier-grid { grid-template-columns:repeat(4,1fr); } }
.lp-v1 .tier { padding:32px 24px; border:1px solid var(--rule); background:rgba(245,240,230,0.02); transition:border-color 0.2s,background 0.2s; position:relative; }
.lp-v1 .tier:hover { border-color:var(--gold); background:rgba(212,175,55,0.04); }
.lp-v1 .tier.featured { border-color:var(--gold); background:rgba(212,175,55,0.06); box-shadow:0 0 0 1px var(--gold); transform:translateY(-4px); }
.lp-v1 .tier-flag { position:absolute; top:-13px; left:24px; background:var(--gold); color:var(--ink); padding:5px 12px; font-size:10px; letter-spacing:0.14em; text-transform:uppercase; font-weight:700; }
.lp-v1 .tier-name { font-family:'Fraunces',serif; font-style:italic; font-weight:400; font-size:13px; letter-spacing:0.06em; color:var(--gold); margin-bottom:8px; text-transform:uppercase; }
.lp-v1 .tier-price { font-family:'Fraunces',serif; font-weight:300; font-size:42px; line-height:1; letter-spacing:-0.025em; margin-bottom:6px; color:var(--paper); }
.lp-v1 .tier-price small { font-size:13px; color:var(--muted); font-weight:400; letter-spacing:0; display:block; margin-top:6px; }
.lp-v1 .tier-ship { font-size:11px; letter-spacing:0.10em; text-transform:uppercase; color:var(--faint); margin-bottom:18px; padding-bottom:18px; border-bottom:1px solid var(--rule); }
.lp-v1 .tier ul { list-style:none; padding:0; margin:0 0 24px; }
.lp-v1 .tier li { font-size:13.5px; padding:7px 0; color:var(--muted); display:flex; align-items:flex-start; gap:10px; line-height:1.5; }
.lp-v1 .tier li::before { content:'+'; color:var(--gold); font-weight:700; flex-shrink:0; }
.lp-v1 .tier-cta { display:block; text-align:center; padding:12px; font-size:12px; letter-spacing:0.08em; text-transform:uppercase; font-weight:600; border:1px solid var(--rule); color:var(--muted); transition:all 0.18s; }
.lp-v1 .tier-cta:hover { border-color:var(--gold); color:var(--gold); }
.lp-v1 .tier.featured .tier-cta { background:var(--gold); color:var(--ink); border-color:var(--gold); }
.lp-v1 .tier.featured .tier-cta:hover { background:var(--gold-hot); }

/* FOUNDER */
.lp-v1 .founder { display:grid; grid-template-columns:1fr; gap:40px; align-items:start; margin-top:24px; }
@media (min-width:768px) { .lp-v1 .founder { grid-template-columns:4fr 8fr; gap:56px; } }
.lp-v1 .founder-photo { aspect-ratio:4/5; overflow:hidden; border:1px solid var(--rule); position:relative; }
.lp-v1 .founder-photo img { width:100%; height:100%; object-fit:cover; filter:brightness(0.88) sepia(0.18) saturate(0.9); }
.lp-v1 .founder-photo::after { content:''; position:absolute; inset:0; background:linear-gradient(180deg,transparent 60%,rgba(10,10,10,0.4) 100%); }
.lp-v1 .founder-text p { font-family:'Fraunces',serif; font-weight:400; font-size:17px; line-height:1.65; color:var(--muted); margin-bottom:18px; }
.lp-v1 .founder-text em { color:var(--gold); font-style:italic; }
.lp-v1 .founder-text strong { color:var(--paper); font-weight:500; }
.lp-v1 .founder-sig { font-family:'Fraunces',serif; font-style:italic; font-weight:400; font-size:32px; color:var(--gold); margin-top:16px; }

/* FAQ */
.lp-v1 .faq-list { max-width:760px; margin-top:24px; }
.lp-v1 details.faq-item { border-top:1px solid var(--rule); padding:24px 0; }
.lp-v1 details.faq-item:last-child { border-bottom:1px solid var(--rule); }
.lp-v1 details.faq-item summary { font-family:'Fraunces',serif; font-weight:400; font-size:21px; list-style:none; display:flex; justify-content:space-between; align-items:center; gap:24px; letter-spacing:-0.005em; cursor:pointer; transition:color 0.18s; }
.lp-v1 details.faq-item summary:hover { color:var(--gold); }
.lp-v1 details.faq-item summary::-webkit-details-marker { display:none; }
.lp-v1 details.faq-item summary::after { content:'+'; font-family:'Fraunces',serif; font-size:32px; color:var(--gold); font-weight:300; flex-shrink:0; }
.lp-v1 details.faq-item[open] summary::after { content:'–'; }
.lp-v1 details.faq-item p { margin-top:16px; font-size:16px; color:var(--muted); line-height:1.7; max-width:62ch; }

/* CLOSER */
.lp-v1 .closer { padding:120px 24px; text-align:center; border-top:1px solid var(--rule); background:radial-gradient(circle at 50% 30%,rgba(212,175,55,0.10) 0%,transparent 60%); }
.lp-v1 .closer-scarcity { display:inline-flex; align-items:center; gap:10px; font-size:12px; letter-spacing:0.18em; text-transform:uppercase; color:var(--gold); margin-bottom:24px; padding:8px 16px; border:1px solid rgba(212,175,55,0.32); }
.lp-v1 .closer-scarcity::before { content:''; width:8px; height:8px; background:var(--gold); border-radius:50%; animation:pulse 1.6s ease-in-out infinite; }
.lp-v1 .closer h2 { font-family:'Fraunces',serif; font-weight:300; font-size:clamp(40px,5.8vw,72px); line-height:1.02; letter-spacing:-0.025em; margin-bottom:20px; max-width:20ch; margin-left:auto; margin-right:auto; }
.lp-v1 .closer h2 em { font-style:italic; color:var(--gold); font-weight:400; }
.lp-v1 .closer p { font-size:18px; color:var(--muted); max-width:50ch; margin:0 auto 36px; line-height:1.55; }
.lp-v1 .closer .btn-primary { font-size:16px; padding:22px 36px; }

/* FOOTER */
.lp-v1 footer.lp { padding:56px 0 36px; border-top:1px solid var(--rule); font-size:13px; color:var(--faint); line-height:1.7; }
.lp-v1 footer.lp .grid { display:grid; grid-template-columns:1fr; gap:28px; margin-bottom:36px; }
@media (min-width:768px) { .lp-v1 footer.lp .grid { grid-template-columns:2fr 1fr 1fr; } }
.lp-v1 footer.lp h5 { font-family:'Fraunces',serif; font-size:14px; font-style:italic; color:var(--gold); font-weight:400; margin-bottom:14px; }
.lp-v1 footer.lp a { color:var(--muted); display:block; padding:4px 0; }
.lp-v1 footer.lp a:hover { color:var(--gold); }
.lp-v1 .disclaimer { padding-top:28px; border-top:1px solid var(--rule); font-size:11px; line-height:1.7; color:var(--faint); max-width:90ch; }

@media (prefers-reduced-motion:reduce) { .lp-v1 *,.lp-v1 *::before,.lp-v1 *::after { animation:none !important; transition:none !important; } }
`;

export default function V1Editorial() {
  return (
    <div className="lp-v1">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <header className="nav">
        <div className="wrap nav-inner">
          <a href="#" className="brand">Skynet<em>Labs</em></a>
          <div className="nav-meta"><span className="live"></span><span>2 SLOTS LEFT · JUNE 2026</span></div>
          <a href="/discovery-call" className="nav-cta">Book audit →</a>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="wrap">
            <div className="hero-grid">
              <div>
                <div className="hero-eyebrow">For US carriers · 5–50 trucks</div>
                <h1 className="hero-title">Site, dispatch, and a voice agent — <em>shipped in 14 days.</em></h1>
                <p className="hero-deck">One operator builds your <strong>marketing site, dispatch dashboard, and AI voice agent</strong> under one roof. Public pricing. Source-controlled. 50% deposit, balance on launch.</p>
                <div className="hero-cta-row">
                  <a href="/discovery-call" className="btn-primary">Book free 15-min audit →</a>
                  <a href="#pricing" className="btn-ghost">See pricing</a>
                </div>
                <div className="hero-scarcity"><strong>2 slots left</strong>&nbsp;· June 2026 · 8-hour reply</div>
              </div>

              <div className="hero-preview" aria-hidden="true">
                <div className="preview-bar"><span className="dot"></span><span className="dot"></span><span className="dot live"></span><span className="url">dispatch.yourcarrier.io · live</span></div>
                <div className="preview-rows">
                  <div className="preview-row"><span className="lane">ORD → DFW</span><span className="body">Pending RC<small>broker · CH Robinson</small></span><span className="v">$2,840</span></div>
                  <div className="preview-row"><span className="lane">CHI → ATL</span><span className="body">In transit<small>ETA 14h 22m</small></span><span className="ok">ON-TIME</span></div>
                  <div className="preview-row"><span className="lane">LAX → PHX</span><span className="body">Delivered<small>POD uploaded · invoiced</small></span><span className="v">$1,950</span></div>
                  <div className="preview-row"><span className="lane">DEN → SLC</span><span className="body">AI qualified at 02:14<small>auto-booked while you slept</small></span><span className="v">$3,120</span></div>
                </div>
                <div className="preview-foot"><span>14 active · 3 today</span><span className="ai">● AI agent online</span></div>
              </div>
            </div>

            <div className="trust">
              <div className="trust-label">Shipped builds — clients who own their repo today</div>
              <div className="trust-logos">
                <div className="trust-logo">Vow Sanctuary<small>Asheville NC</small></div>
                <div className="trust-logo">Wellness DNA<small>DTC supplements</small></div>
                <div className="trust-logo">GutReno<small>Functional med.</small></div>
                <div className="trust-logo">Pretty Potty<small>Home services</small></div>
                <div className="trust-logo">TimeLapse<small>Construction</small></div>
                <div className="trust-logo">SkynetJoe<small>Open source theme</small></div>
              </div>
              <div className="stats">
                <div className="stat"><div className="stat-v">9</div><div className="stat-l">Shipped builds</div></div>
                <div className="stat"><div className="stat-v">14d</div><div className="stat-l">Standard ship</div></div>
                <div className="stat"><div className="stat-v">$0</div><div className="stat-l">For the audit</div></div>
                <div className="stat"><div className="stat-v">8h</div><div className="stat-l">Reply window</div></div>
              </div>
            </div>
          </div>
        </section>

        {/* PROBLEM → SOLUTION 2-up */}
        <section className="section">
          <div className="wrap">
            <span className="kicker">The Problem · The Fix</span>
            <h2 className="section-h">Your stack <em>costs you twice.</em></h2>
            <p className="section-sub">Once in subscription fees. Once in lost loads. Most 12-truck operators pay $800+ across six broken tools that don&apos;t talk — then write dispatch on a paper sheet at 2am.</p>
            <div className="ps-grid">
              <div className="ps-card bad">
                <div className="ps-card-lbl">Your current stack</div>
                <h3>Six tabs, $847/mo, zero throughput.</h3>
                <ul>
                  <li><strong>DAT + Truckstop + QuickBooks + ELD + sheet + WhatsApp</strong> — six logins, none talk to each other.</li>
                  <li><strong>Phone never stops.</strong> Miss the 2am rate confirmation, broker reassigns by 6am.</li>
                  <li><strong>$847/mo</strong> in tool spend, per SkynetLabs 2026 intake average.</li>
                  <li><strong>Agencies want 6-month retainers.</strong> Dev shops want time + materials. Nobody quotes a price.</li>
                </ul>
              </div>
              <div className="ps-card good">
                <div className="ps-card-lbl">After the SkynetLabs build</div>
                <h3>One operator. One stack. One roof.</h3>
                <ul>
                  <li><strong>Marketing site that books loads</strong> — Next.js, &lt;2s on 4G, CRM-connected.</li>
                  <li><strong>Dispatch dashboard on one screen</strong> — pulls DAT, Truckstop, ELD, QB into a single inbox.</li>
                  <li><strong>AI voice agent on inbound</strong> — Vapi or Retell answers at 2am, qualifies, books.</li>
                  <li><strong>Public pricing, 14-day ship, source-controlled.</strong> Your GitHub. Your keys. Walk anytime.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="section">
          <div className="wrap">
            <span className="kicker">What operators say</span>
            <h2 className="section-h">Quietly, <em>they keep buying.</em></h2>
            <div className="testimonials">
              <article className="quote">
                <p className="quote-body">Eight days. Site live, GHL wired, WhatsApp inbox routing every load. We were paying three agencies and a freelancer for less than this one operator ships.</p>
                <div className="quote-attrib">
                  <div className="quote-avatar">JR</div>
                  <div className="quote-meta">
                    <strong>James R. · Operations Lead</strong>
                    <span>Wellness DNA · Charlotte, NC</span>
                    <span className="stars">★★★★★</span>
                  </div>
                </div>
              </article>
              <article className="quote">
                <p className="quote-body">Public pricing is the unlock. We&apos;ve burned $40K on agencies that vanished after the logo. Waseem quoted a number on a Tuesday, shipped on a Friday two weeks later. Repo in our org.</p>
                <div className="quote-attrib">
                  <div className="quote-avatar">SM</div>
                  <div className="quote-meta">
                    <strong>Sarah M. · Founder</strong>
                    <span>Vow Sanctuary · Asheville, NC</span>
                    <span className="stars">★★★★★</span>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section className="section" id="pricing">
          <div className="wrap">
            <span className="kicker">Public pricing</span>
            <h2 className="section-h">Four tiers. <em>No retainer required.</em></h2>
            <p className="section-sub">Half on signature. Half on launch. Cancel anytime, walk with what&apos;s built. Most 12–22 truck operators land on Premium.</p>
            <div className="tier-grid">
              <div className="tier">
                <div className="tier-name">Starter</div>
                <div className="tier-price">$1,497<small>flat · no monthly</small></div>
                <div className="tier-ship">14 days · site + CRM + WA</div>
                <ul>
                  <li>5-page premium Next.js site</li>
                  <li>GHL CRM + pipelines wired</li>
                  <li>WhatsApp Business inbox</li>
                  <li>Meta Pixel + CAPI</li>
                  <li>2 revision rounds</li>
                </ul>
                <a href="/discovery-call" className="tier-cta">Start with Starter →</a>
              </div>
              <div className="tier">
                <div className="tier-name">Pro</div>
                <div className="tier-price">$3,997<small>+ $497/mo</small></div>
                <div className="tier-ship">21 days · + dispatch + factoring</div>
                <ul>
                  <li>Everything in Starter</li>
                  <li>Custom dispatch dashboard</li>
                  <li>TBS / OTR factoring integrated</li>
                  <li>SMS + email automation</li>
                  <li>Monthly opt call</li>
                </ul>
                <a href="/discovery-call" className="tier-cta">Start with Pro →</a>
              </div>
              <div className="tier featured">
                <div className="tier-flag">★ Most land here</div>
                <div className="tier-name">Premium</div>
                <div className="tier-price">$7,997<small>+ $997/mo</small></div>
                <div className="tier-ship">30 days · + ad ops + lead gen</div>
                <ul>
                  <li>Everything in Pro</li>
                  <li>Meta + LinkedIn ad build</li>
                  <li>Lead gen ops (cold + warm)</li>
                  <li>Monthly UGC content batch</li>
                  <li>Weekly review call</li>
                </ul>
                <a href="/discovery-call" className="tier-cta">Book Premium audit →</a>
              </div>
              <div className="tier">
                <div className="tier-name">Flagship</div>
                <div className="tier-price">$9,500<small>+ $1,997/mo</small></div>
                <div className="tier-ship">45 days · AI Dispatcher Agent™</div>
                <ul>
                  <li>Everything in Premium</li>
                  <li>Vapi or Retell voice agent</li>
                  <li>Inbound load qualification</li>
                  <li>24/7 phone coverage</li>
                  <li>Auto-populated pipeline</li>
                </ul>
                <a href="/discovery-call" className="tier-cta">Talk Flagship →</a>
              </div>
            </div>
          </div>
        </section>

        {/* FOUNDER */}
        <section className="section">
          <div className="wrap">
            <span className="kicker">The Operator</span>
            <h2 className="section-h">Yes solo. Yes Bali. <em>Here&apos;s why that&apos;s your edge.</em></h2>
            <div className="founder">
              <figure className="founder-photo"><img src="/lp/freight/v1/about.jpg" alt="Waseem Nasir on a Bali rooftop" loading="lazy" /></figure>
              <div className="founder-text">
                <p>I&apos;m <strong>Waseem Nasir</strong>. I run SkynetLabs from Crate Cafe in Canggu, Bali (iced latte 35,000 IDR — about $2.20) and Liberty Market in Lahore during visa windows.</p>
                <p>One operator with <em>Claude as second seat</em> — not eight account managers, three sales pods, a creative director. Lights stay on because I ship something every week that makes a small-fleet owner more money.</p>
                <p>Public pricing fixes the &quot;custom quote&quot; theater. 14-day ship fixes the 6-month retainer. <strong>Source-controlled hand-off</strong> fixes the hostage data problem. Every client owns their repo + n8n workflows the day we hand off.</p>
                <p className="founder-sig">— Waseem</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ — 4 only */}
        <section className="section">
          <div className="wrap">
            <span className="kicker">Operators ask first</span>
            <h2 className="section-h">No, you&apos;re <em>not too small.</em></h2>
            <div className="faq-list">
              <details className="faq-item"><summary>I only have 5 trucks. Is this overkill?</summary><p>Starter ($1,497) is built for 5–10 trucks. Site + CRM + WhatsApp inbox in 14 days. No monthly fee. Cancel anytime, walk with the full build.</p></details>
              <details className="faq-item"><summary>FMCSA / TCPA compliance — covered?</summary><p>SkynetLabs provides software, design, and marketing services only. Not a freight broker or motor carrier. No FMCSA authority required. AI voice flows are inbound-only and require user consent (TCPA-compliant).</p></details>
              <details className="faq-item"><summary>I burned $20K on an agency last year. Why is this different?</summary><p>Public pricing fixes that. 14-day ship window fixes that. Source-controlled hand-off in your GitHub fixes that. Miss the window, you keep what&apos;s built and we re-scope free.</p></details>
              <details className="faq-item"><summary>What happens on the 15-minute audit?</summary><p>Cal.com call. I review your current stack, flag 2–3 biggest gaps, recommend yes / no / referral. No commitment. Fit = fixed scope quoted in 48 hours.</p></details>
            </div>
          </div>
        </section>

        {/* CLOSER */}
        <section className="closer">
          <div className="wrap">
            <div className="closer-scarcity">2 slots left · June 2026</div>
            <h2>The audit is <em>free.</em> The clock is mine.</h2>
            <p>Four slots per month, two left for June. Eight-hour reply window. Not a fit? You walk with a referral and the findings.</p>
            <a href="/discovery-call" className="btn-primary">Book free 15-min audit →</a>
          </div>
        </section>

        <footer className="lp">
          <div className="wrap">
            <div className="grid">
              <div><h5>SkynetLabs</h5><p>One operator. One stack. One roof. Built by Waseem Nasir from Canggu, Bali (GMT+8) and Lahore, Pakistan.</p></div>
              <div><h5>Pages</h5><a href="/services">Services</a><a href="/portfolio">Work</a><a href="/pricing">Pricing</a><a href="/about">About</a></div>
              <div><h5>Reach</h5><a href="/discovery-call">Book audit</a><a href="mailto:waseem@skynetjoe.com">waseem@skynetjoe.com</a><a href="https://www.linkedin.com/in/waseemnasir2k26">LinkedIn</a></div>
            </div>
            <p className="disclaimer">SkynetLabs provides software, design, and marketing services. Not a freight broker or motor carrier. No FMCSA authority. Software demos are inbound-only and require user consent (TCPA-compliant). Reference 49 CFR 371 governs broker authority and is not implicated by services described herein. Public pricing reflects standard scope as of 2026-06-01 and may vary by custom requirements. © 2026 SkynetLabs · Waseem Nasir.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
