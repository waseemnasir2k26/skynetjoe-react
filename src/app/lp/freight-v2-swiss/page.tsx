import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Big-Broker Tech, Owner-Op Price — SkynetLabs",
  description:
    "Marketing site + dispatch dashboard + AI voice agent under one roof. 14 days, public pricing, for US carriers running 5–50 trucks.",
  alternates: { canonical: "/lp/freight-v2-swiss" },
  robots: { index: false, follow: false },
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap');
.lp-v2 { --bone:#fafaf7; --bone-alt:#f0eee5; --ink:#111; --ink-soft:#2a2a2a; --ink-faint:#6a6a6a; --orange:#ff4a1c; --orange-pale:rgba(255,74,28,0.08); --rule:rgba(17,17,17,0.10); --rule-strong:rgba(17,17,17,0.22); background:var(--bone); color:var(--ink); font-family:'Inter',sans-serif; line-height:1.5; min-height:100vh; }
.lp-v2 *,.lp-v2 *::before,.lp-v2 *::after { box-sizing:border-box; }
.lp-v2 a { color:inherit; text-decoration:none; }
.lp-v2 img { max-width:100%; height:auto; display:block; }
.lp-v2 ::selection { background:var(--orange); color:var(--bone); }
.lp-v2 .grid12 { max-width:1440px; margin:0 auto; padding:0 24px; display:grid; grid-template-columns:repeat(12,1fr); gap:16px; }
.lp-v2 .mono { font-family:'JetBrains Mono',monospace; font-feature-settings:'tnum'; }
.lp-v2 .tight { font-family:'Inter Tight',sans-serif; letter-spacing:-0.02em; }
.lp-v2 .nav { position:sticky; top:0; z-index:50; background:var(--bone); border-bottom:1px solid var(--rule); }
.lp-v2 .nav-inner { display:flex; align-items:center; justify-content:space-between; padding:16px 24px; max-width:1440px; margin:0 auto; }
.lp-v2 .brand { font-family:'Inter Tight',sans-serif; font-weight:800; font-size:18px; letter-spacing:-0.02em; text-transform:uppercase; }
.lp-v2 .brand span { color:var(--orange); }
.lp-v2 .nav-meta { font-family:'JetBrains Mono',monospace; font-size:11px; color:var(--ink-faint); letter-spacing:0.04em; display:none; }
@media (min-width:768px) { .lp-v2 .nav-meta { display:block; } }
.lp-v2 .nav-cta { font-family:'Inter Tight',sans-serif; font-size:12px; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; padding:10px 18px; background:var(--ink); color:var(--bone); transition:background 0.18s; }
.lp-v2 .nav-cta:hover { background:var(--orange); }
.lp-v2 .hero { padding:64px 0 80px; border-bottom:1px solid var(--ink); position:relative; overflow:hidden; }
.lp-v2 .hero .grid12 { row-gap:32px; }
.lp-v2 .hero-eyebrow { grid-column:1 / -1; font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:0.14em; color:var(--orange); display:flex; align-items:center; gap:16px; text-transform:uppercase; }
.lp-v2 .hero-eyebrow::before { content:''; width:32px; height:1px; background:var(--orange); }
.lp-v2 .hero-stat { grid-column:1 / -1; }
@media (min-width:768px) { .lp-v2 .hero-stat { grid-column:1 / 7; } }
.lp-v2 .hero-num { font-family:'Inter Tight',sans-serif; font-size:clamp(120px,18vw,240px); line-height:0.84; letter-spacing:-0.06em; font-weight:800; color:var(--ink); }
.lp-v2 .hero-num small { font-size:0.18em; letter-spacing:0; color:var(--ink-faint); font-weight:400; display:block; margin-top:8px; font-family:'JetBrains Mono',monospace; }
.lp-v2 .orange-slash { display:inline-block; background:var(--orange); color:var(--bone); padding:2px 14px 6px; font-weight:700; transform:skewX(-8deg); margin:0 4px; }
.lp-v2 .hero-pitch { grid-column:1 / -1; }
@media (min-width:768px) { .lp-v2 .hero-pitch { grid-column:7 / -1; align-self:end; } }
.lp-v2 .hero-pitch h1 { font-family:'Inter Tight',sans-serif; font-size:clamp(28px,3.6vw,48px); line-height:1.05; font-weight:700; letter-spacing:-0.02em; margin-bottom:20px; }
.lp-v2 .hero-pitch p { font-size:16px; color:var(--ink-soft); line-height:1.6; margin-bottom:28px; max-width:50ch; }
.lp-v2 .cta-row { display:flex; flex-wrap:wrap; gap:12px; }
.lp-v2 .btn { font-family:'Inter Tight',sans-serif; font-size:13px; font-weight:600; letter-spacing:0.06em; padding:14px 24px; text-transform:uppercase; transition:background 0.18s,color 0.18s,transform 0.18s; display:inline-block; }
.lp-v2 .btn-ink { background:var(--ink); color:var(--bone); }
.lp-v2 .btn-ink:hover { background:var(--orange); transform:translateY(-2px); }
.lp-v2 .btn-line { border:1.5px solid var(--ink); color:var(--ink); }
.lp-v2 .btn-line:hover { background:var(--ink); color:var(--bone); }
.lp-v2 .btn-orange { background:var(--orange); color:var(--bone); }
.lp-v2 .hero-img-wrap { grid-column:1 / -1; margin-top:32px; position:relative; overflow:hidden; }
.lp-v2 .hero-img-wrap::before { content:''; position:absolute; top:0; left:0; bottom:0; width:8px; background:var(--orange); z-index:2; }
.lp-v2 .hero-img { width:100%; aspect-ratio:21/9; object-fit:cover; filter:grayscale(1) contrast(1.18) brightness(0.98); transition:filter 0.4s; }
.lp-v2 .hero-img-wrap:hover .hero-img { filter:grayscale(0.4) contrast(1.05); }
.lp-v2 .hero-caption { position:absolute; bottom:18px; right:18px; background:var(--orange); color:var(--bone); font-family:'JetBrains Mono',monospace; font-size:11px; padding:6px 12px; letter-spacing:0.06em; }
.lp-v2 .section { padding:96px 0; border-bottom:1px solid var(--ink); }
.lp-v2 .section-h { grid-column:1 / -1; margin-bottom:16px; }
.lp-v2 .kicker { font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:0.14em; color:var(--orange); text-transform:uppercase; margin-bottom:16px; display:flex; align-items:center; gap:12px; }
.lp-v2 .kicker::before { content:''; width:24px; height:1px; background:var(--orange); }
.lp-v2 .section-h h2 { font-family:'Inter Tight',sans-serif; font-size:clamp(36px,5vw,64px); line-height:1; font-weight:700; letter-spacing:-0.025em; max-width:22ch; }
.lp-v2 .section-h p { font-size:18px; color:var(--ink-soft); max-width:60ch; margin-top:24px; line-height:1.55; }
.lp-v2 .problem-row { grid-column:1 / -1; display:grid; grid-template-columns:1fr; gap:16px; padding:32px 0; border-top:1px solid var(--rule); }
@media (min-width:768px) { .lp-v2 .problem-row { grid-template-columns:80px 1fr 1fr; gap:32px; } }
.lp-v2 .problem-num { font-family:'JetBrains Mono',monospace; font-size:13px; color:var(--orange); letter-spacing:0.06em; font-weight:700; }
.lp-v2 .problem-row h3 { font-family:'Inter Tight',sans-serif; font-size:22px; font-weight:600; line-height:1.2; letter-spacing:-0.01em; }
.lp-v2 .problem-row p { color:var(--ink-faint); font-size:16px; line-height:1.6; }
.lp-v2 .features { grid-column:1 / -1; display:grid; grid-template-columns:1fr; gap:1px; background:var(--ink); border:1px solid var(--ink); margin-top:40px; }
@media (min-width:768px) { .lp-v2 .features { grid-template-columns:repeat(2,1fr); } }
@media (min-width:1024px) { .lp-v2 .features { grid-template-columns:repeat(4,1fr); } }
.lp-v2 .feature { background:var(--bone); padding:32px 24px; transition:background 0.18s; border-top:4px solid transparent; }
.lp-v2 .feature:hover { background:var(--bone-alt); border-top-color:var(--orange); }
.lp-v2 .feature-id { font-family:'JetBrains Mono',monospace; font-size:11px; color:var(--orange); letter-spacing:0.1em; margin-bottom:14px; }
.lp-v2 .feature h4 { font-family:'Inter Tight',sans-serif; font-size:19px; font-weight:600; letter-spacing:-0.015em; line-height:1.25; margin-bottom:12px; }
.lp-v2 .feature p { color:var(--ink-faint); font-size:14px; line-height:1.55; }
.lp-v2 .mockup { grid-column:1 / -1; margin-top:48px; background:var(--ink); color:var(--bone); padding:16px; border:1px solid var(--ink); font-family:'JetBrains Mono',monospace; font-size:12px; position:relative; }
.lp-v2 .mockup-bar { display:flex; align-items:center; gap:8px; padding-bottom:16px; border-bottom:1px solid rgba(255,255,255,0.12); margin-bottom:16px; }
.lp-v2 .mockup-dot { width:10px; height:10px; border-radius:50%; background:var(--orange); }
.lp-v2 .mockup-dot.amber { background:#ffb000; }
.lp-v2 .mockup-dot.green { background:#00ff9c; }
.lp-v2 .mockup-label { color:var(--bone); opacity:0.4; margin-left:12px; letter-spacing:0.06em; }
.lp-v2 .mockup-body { display:grid; grid-template-columns:1fr; gap:12px; }
@media (min-width:768px) { .lp-v2 .mockup-body { grid-template-columns:2fr 1fr 1fr; } }
.lp-v2 .mockup-block { padding:16px; background:rgba(255,255,255,0.04); }
.lp-v2 .mockup-key { color:rgba(255,255,255,0.5); margin-bottom:4px; font-size:10px; letter-spacing:0.08em; text-transform:uppercase; }
.lp-v2 .mockup-val { font-size:24px; color:var(--bone); font-weight:500; }
.lp-v2 .mockup-val.orange { color:var(--orange); }
.lp-v2 .mockup-val.green { color:#00ff9c; }
.lp-v2 .mockup-list { font-size:11px; line-height:1.7; color:rgba(255,255,255,0.7); }
.lp-v2 .mockup-list span { color:var(--orange); }
.lp-v2 .compare-wrap { grid-column:1 / -1; margin-top:40px; overflow-x:auto; }
.lp-v2 .compare-tbl { width:100%; border-collapse:collapse; min-width:700px; }
.lp-v2 .compare-tbl thead th { background:var(--ink); color:var(--bone); padding:18px 16px; text-align:left; font-size:11px; font-family:'JetBrains Mono',monospace; letter-spacing:0.1em; text-transform:uppercase; font-weight:600; }
.lp-v2 .compare-tbl thead th:first-child { background:var(--orange); }
.lp-v2 .compare-tbl tbody td { padding:18px 16px; border-bottom:1px solid var(--rule); font-size:14px; vertical-align:top; }
.lp-v2 .compare-tbl tbody td:first-child { font-weight:500; font-family:'Inter Tight',sans-serif; letter-spacing:-0.005em; }
.lp-v2 .compare-tbl tbody tr:hover { background:var(--orange-pale); }
.lp-v2 .check { color:var(--orange); font-weight:700; font-family:'JetBrains Mono',monospace; }
.lp-v2 .x { color:var(--ink-faint); font-family:'JetBrains Mono',monospace; }
.lp-v2 .pricing-row { grid-column:1 / -1; display:grid; grid-template-columns:1fr; gap:0; margin-top:40px; border:1px solid var(--ink); }
@media (min-width:768px) { .lp-v2 .pricing-row { grid-template-columns:repeat(2,1fr); } }
@media (min-width:1024px) { .lp-v2 .pricing-row { grid-template-columns:repeat(4,1fr); } }
.lp-v2 .tier { padding:32px 24px; border-right:1px solid var(--rule); border-bottom:1px solid var(--rule); background:var(--bone); transition:background 0.18s; position:relative; }
.lp-v2 .tier:hover { background:var(--bone-alt); }
.lp-v2 .tier.featured { background:var(--ink); color:var(--bone); }
.lp-v2 .tier-id { font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:0.14em; color:var(--orange); text-transform:uppercase; margin-bottom:8px; }
.lp-v2 .tier-name { font-family:'Inter Tight',sans-serif; font-size:28px; font-weight:700; letter-spacing:-0.02em; margin-bottom:4px; }
.lp-v2 .tier-meta { font-family:'JetBrains Mono',monospace; font-size:11px; color:var(--ink-faint); letter-spacing:0.05em; margin-bottom:24px; }
.lp-v2 .tier.featured .tier-meta { color:rgba(255,255,255,0.55); }
.lp-v2 .tier-price { font-family:'Inter Tight',sans-serif; font-size:42px; font-weight:700; letter-spacing:-0.025em; line-height:1; margin-bottom:6px; }
.lp-v2 .tier-price small { font-family:'JetBrains Mono',monospace; font-size:13px; font-weight:500; color:var(--orange); letter-spacing:0; display:block; margin-top:6px; }
.lp-v2 .tier-feat { list-style:none; margin:24px 0 0; padding:24px 0 0; border-top:1px solid var(--rule); }
.lp-v2 .tier.featured .tier-feat { border-top-color:rgba(255,255,255,0.18); }
.lp-v2 .tier-feat li { font-size:13px; padding:6px 0; color:var(--ink-soft); display:flex; gap:8px; align-items:flex-start; }
.lp-v2 .tier.featured .tier-feat li { color:rgba(255,255,255,0.8); }
.lp-v2 .tier-feat li::before { content:'+'; color:var(--orange); font-weight:700; }
.lp-v2 .tier-tag { position:absolute; top:-1px; right:-1px; background:var(--orange); color:var(--bone); font-family:'JetBrains Mono',monospace; font-size:10px; padding:4px 12px; letter-spacing:0.1em; }
.lp-v2 .founder { grid-column:1 / -1; display:grid; grid-template-columns:1fr; gap:32px; margin-top:24px; }
@media (min-width:768px) { .lp-v2 .founder { grid-template-columns:4fr 8fr; gap:48px; } }
.lp-v2 .founder-photo { aspect-ratio:4/5; overflow:hidden; position:relative; }
.lp-v2 .founder-photo::after { content:''; position:absolute; bottom:0; left:0; right:0; height:6px; background:var(--orange); }
.lp-v2 .founder-photo img { width:100%; height:100%; object-fit:cover; filter:grayscale(1) contrast(1.05); }
.lp-v2 .founder-text h3 { font-family:'Inter Tight',sans-serif; font-size:30px; font-weight:700; letter-spacing:-0.02em; line-height:1.1; margin-bottom:20px; }
.lp-v2 .founder-text p { font-size:16px; color:var(--ink-soft); line-height:1.65; margin-bottom:16px; max-width:60ch; }
.lp-v2 .founder-text mark { background:var(--orange); color:var(--bone); padding:0 4px; font-weight:500; }
.lp-v2 .founder-stats { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-top:28px; border-top:1px solid var(--rule); padding-top:20px; }
.lp-v2 .stat-v { font-family:'Inter Tight',sans-serif; font-size:32px; font-weight:700; letter-spacing:-0.025em; color:var(--orange); }
.lp-v2 .stat-l { font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:0.1em; color:var(--ink-faint); text-transform:uppercase; }
.lp-v2 .builds-row { grid-column:1 / -1; display:grid; grid-template-columns:1fr; gap:1px; background:var(--rule-strong); border:1px solid var(--rule-strong); margin-top:40px; }
@media (min-width:768px) { .lp-v2 .builds-row { grid-template-columns:repeat(3,1fr); } }
.lp-v2 .b-row { background:var(--bone); padding:24px; transition:background 0.18s,border-left 0.18s; border-left:3px solid transparent; }
.lp-v2 .b-row:hover { background:var(--bone-alt); border-left-color:var(--orange); }
.lp-v2 .b-row-meta { font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:0.12em; color:var(--orange); text-transform:uppercase; margin-bottom:8px; }
.lp-v2 .b-row h4 { font-family:'Inter Tight',sans-serif; font-size:20px; font-weight:600; letter-spacing:-0.015em; margin-bottom:6px; }
.lp-v2 .b-row p { font-size:13px; color:var(--ink-faint); line-height:1.55; }
.lp-v2 .lifestyle { padding:0; border-bottom:1px solid var(--ink); position:relative; overflow:hidden; }
.lp-v2 .lifestyle img { width:100%; aspect-ratio:21/8; object-fit:cover; filter:grayscale(0.6) contrast(1.08); }
.lp-v2 .lifestyle-quote { position:absolute; left:24px; bottom:24px; right:24px; max-width:30ch; padding:16px; background:var(--orange); color:var(--bone); }
.lp-v2 .lifestyle-quote q { font-family:'Inter Tight',sans-serif; font-size:clamp(18px,2.4vw,28px); line-height:1.2; font-weight:600; letter-spacing:-0.01em; quotes:'"' '"'; }
.lp-v2 .lifestyle-quote cite { display:block; margin-top:8px; font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:0.06em; font-style:normal; opacity:0.85; }
.lp-v2 .faq-list { grid-column:1 / -1; margin-top:32px; }
.lp-v2 details.faq-item { border-top:1px solid var(--rule); padding:20px 0; }
.lp-v2 details.faq-item:last-child { border-bottom:1px solid var(--rule); }
.lp-v2 details.faq-item summary { list-style:none; font-family:'Inter Tight',sans-serif; font-size:18px; font-weight:600; letter-spacing:-0.01em; display:flex; justify-content:space-between; align-items:center; gap:16px; cursor:pointer; }
.lp-v2 details.faq-item summary::-webkit-details-marker { display:none; }
.lp-v2 details.faq-item summary::after { content:'+'; color:var(--orange); font-family:'JetBrains Mono',monospace; font-size:24px; font-weight:400; }
.lp-v2 details.faq-item[open] summary::after { content:'−'; }
.lp-v2 details.faq-item p { margin-top:12px; font-size:15px; color:var(--ink-soft); line-height:1.65; max-width:70ch; }
.lp-v2 .closer { background:var(--ink); color:var(--bone); padding:112px 24px; text-align:center; }
.lp-v2 .closer h2 { font-family:'Inter Tight',sans-serif; font-size:clamp(36px,6vw,72px); line-height:1; font-weight:700; letter-spacing:-0.03em; margin-bottom:24px; max-width:18ch; margin-left:auto; margin-right:auto; }
.lp-v2 .closer h2 span { color:var(--orange); }
.lp-v2 .closer p { font-size:17px; color:rgba(255,255,255,0.7); max-width:48ch; margin:0 auto 32px; line-height:1.55; }
.lp-v2 footer.lp { background:var(--bone-alt); padding:64px 24px 40px; border-top:1px solid var(--ink); }
.lp-v2 footer.lp .inner { max-width:1440px; margin:0 auto; display:grid; grid-template-columns:1fr; gap:32px; }
@media (min-width:768px) { .lp-v2 footer.lp .inner { grid-template-columns:2fr 1fr 1fr 1fr; } }
.lp-v2 footer.lp h5 { font-family:'Inter Tight',sans-serif; font-weight:700; font-size:12px; letter-spacing:0.14em; text-transform:uppercase; margin-bottom:14px; color:var(--orange); }
.lp-v2 footer.lp a { display:block; padding:4px 0; font-size:13px; color:var(--ink-soft); }
.lp-v2 footer.lp a:hover { color:var(--orange); }
.lp-v2 footer.lp p { font-size:13px; color:var(--ink-faint); line-height:1.55; }
.lp-v2 .disclaimer { max-width:1440px; margin:40px auto 0; padding-top:24px; border-top:1px solid var(--rule); font-family:'JetBrains Mono',monospace; font-size:10px; line-height:1.7; color:var(--ink-faint); letter-spacing:0.02em; }
.lp-v2 .wa-sticky { position:fixed; bottom:24px; right:24px; z-index:60; background:var(--orange); color:var(--bone); font-family:'Inter Tight',sans-serif; font-size:12px; font-weight:600; letter-spacing:0.08em; padding:14px 20px; text-transform:uppercase; box-shadow:0 12px 32px rgba(255,74,28,0.32); display:inline-flex; align-items:center; gap:8px; transition:transform 0.18s; text-decoration:none; }
.lp-v2 .wa-sticky:hover { transform:translateY(-3px); }
.lp-v2 .wa-sticky svg { width:16px; height:16px; fill:currentColor; }
`;

const WA_ICON = "M17.5 14c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.1-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.7-.9-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 2 .6 3.9 1.7 5.5L2 22l4.6-1.2c1.5.8 3.3 1.3 5.4 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2z";

export default function V2Swiss() {
  return (
    <div className="lp-v2">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <header className="nav">
        <div className="nav-inner">
          <a href="#" className="brand">Skynet<span>Labs</span></a>
          <span className="nav-meta">v.2026.06.01 · solo build · public price</span>
          <a href="https://cal.com/skynetjoe/audit" className="nav-cta">Book Audit →</a>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="grid12">
            <div className="hero-eyebrow">SkynetLabs / Q3 · Launch 2026-06-01 / Carriers 5–50 trucks</div>
            <div className="hero-stat">
              <div className="hero-num">14<span className="orange-slash">d</span><small>Ship-window · public price · source-controlled</small></div>
            </div>
            <div className="hero-pitch">
              <h1>Big-broker tech,<br />owner-op price.</h1>
              <p>One operator. One stack. Marketing site + dispatch dashboard + AI voice agent — built under one roof in 14 days. Public pricing visible below. No retainer. No mystery quote.</p>
              <div className="cta-row">
                <a href="https://cal.com/skynetjoe/audit" className="btn btn-ink">Book 15-min audit →</a>
                <a href="https://wa.me/923001001957?text=COMMAND" className="btn btn-line">WhatsApp &quot;Command&quot;</a>
              </div>
            </div>
            <figure className="hero-img-wrap">
              <img src="/lp/freight/v2/hero.jpg" alt="Waseem Nasir — solo builder, Bali" className="hero-img" loading="eager" />
              <figcaption className="hero-caption">FOUNDER · WASEEM NASIR</figcaption>
            </figure>
          </div>
        </section>

        <section className="section">
          <div className="grid12">
            <header className="section-h">
              <div className="kicker">01 · The math your stack hides</div>
              <h2>Six broken tools. Eight hundred dollars. Zero throughput.</h2>
              <p>The average 12-truck operator runs DAT + Truckstop + QuickBooks + ELD + a paper dispatch sheet + WhatsApp. None of them talk. All of them charge.</p>
            </header>
            <div className="problem-row">
              <div className="problem-num">— 01</div>
              <div><h3>The six-tab tax</h3><p>Every load means switching between six tools. Every switch loses 90 seconds. Twenty loads a week, two hours of mouse-movement, not dispatch.</p></div>
              <div><p style={{ color: "var(--ink-faint)", fontSize: 14, paddingTop: 4 }}><strong style={{ color: "var(--orange)" }}>$847/mo</strong>&nbsp;avg tool spend (DAT + Truckstop + ELD + QB + GHL + Twilio, source: SkynetLabs intake 2026)</p></div>
            </div>
            <div className="problem-row">
              <div className="problem-num">— 02</div>
              <div><h3>The phone you can&apos;t put down</h3><p>Broker calls at 11pm. You miss the 2am rate confirmation. By 6am load is reassigned. Not a routing problem — an attention problem disguised as one.</p></div>
              <div><p style={{ color: "var(--ink-faint)", fontSize: 14 }}><strong style={{ color: "var(--orange)" }}>11.4%</strong> of inbound load offers lost to call-window mismatch alone, per ATA 2025 small-fleet survey.</p></div>
            </div>
            <div className="problem-row">
              <div className="problem-num">— 03</div>
              <div><h3>&quot;Custom quote&quot; theater</h3><p>Agencies don&apos;t build software. Dev shops don&apos;t build brand. Both want a six-month retainer and a discovery call before they&apos;ll quote a price.</p></div>
              <div><p style={{ color: "var(--ink-faint)", fontSize: 14 }}><strong style={{ color: "var(--orange)" }}>$1,497–$9,500</strong> SkynetLabs public-pricing range, all tiers visible below.</p></div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="grid12">
            <header className="section-h">
              <div className="kicker">02 · The wedge</div>
              <h2>One operator. One stack. One roof.</h2>
              <p>SkynetLabs is the only category-of-one in this segment that ships marketing site + dispatch dashboard + AI voice agent in a single 14-day cycle at public pricing.</p>
            </header>
            <div className="features">
              <div className="feature"><div className="feature-id">F01 · BUILD</div><h4>Marketing site, conversion-tuned.</h4><p>Next.js or Framer. Schema-marked. &lt;2s on 4G. Public-pricing visible. CRM-connected out of the box.</p></div>
              <div className="feature"><div className="feature-id">F02 · CRM</div><h4>Dispatch dashboard, one screen.</h4><p>GHL + n8n. Pulls DAT, Truckstop, ELD, QB. Single SMS/WA/email inbox. Factoring integrated.</p></div>
              <div className="feature"><div className="feature-id">F03 · AI</div><h4>Voice agent, 24/7 inbound.</h4><p>Vapi or Retell. Qualifies brokers, captures load details, books rate confirmations while you sleep.</p></div>
              <div className="feature"><div className="feature-id">F04 · OWN</div><h4>Source-controlled, no lock-in.</h4><p>Everything in your GitHub + n8n. I leave the keys on launch. Walk anytime with what&apos;s built.</p></div>
            </div>
            <div className="mockup">
              <div className="mockup-bar"><span className="mockup-dot"></span><span className="mockup-dot amber"></span><span className="mockup-dot green"></span><span className="mockup-label">dispatch.skynetlabs.io · live</span></div>
              <div className="mockup-body">
                <div className="mockup-block"><div className="mockup-key">ACTIVE LOADS</div><div className="mockup-val">14 <span style={{ color: "var(--orange)", fontSize: 14 }}>+3 today</span></div><div className="mockup-list"><span>→</span> ORD → DFW · $2,840 · pending RC<br /><span>→</span> CHI → ATL · $3,120 · in transit<br /><span>→</span> LAX → PHX · $1,950 · delivered</div></div>
                <div className="mockup-block"><div className="mockup-key">AI VOICE AGENT</div><div className="mockup-val green">ONLINE</div><div className="mockup-list" style={{ marginTop: 8 }}><span>→</span> Calls handled: 47<br /><span>→</span> Loads qualified: 22<br /><span>→</span> Avg wait: 1.2s</div></div>
                <div className="mockup-block"><div className="mockup-key">FACTORING</div><div className="mockup-val orange">$48,210</div><div className="mockup-list" style={{ marginTop: 8 }}><span>→</span> TBS · synced<br /><span>→</span> Pending: $12,400<br /><span>→</span> Cleared today: $8,900</div></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="grid12">
            <header className="section-h"><div className="kicker">03 · Where the others stop</div><h2>The 5-line map.</h2></header>
            <div className="compare-wrap">
              <table className="compare-tbl">
                <thead><tr><th>Capability</th><th>SkynetLabs</th><th>Brand agency</th><th>Dev shop</th><th>AI product</th></tr></thead>
                <tbody>
                  <tr><td>Conversion-tuned marketing site</td><td><span className="check">✓ in 14d</span></td><td><span className="check">✓ in 60d</span></td><td><span className="x">— scope</span></td><td><span className="x">— template</span></td></tr>
                  <tr><td>Custom dispatch dashboard</td><td><span className="check">✓ included</span></td><td><span className="x">— sub-contracted</span></td><td><span className="check">✓ 180d</span></td><td><span className="x">— their UI</span></td></tr>
                  <tr><td>AI voice agent, branded</td><td><span className="check">✓ Vapi/Retell</span></td><td><span className="x">—</span></td><td><span className="x">—</span></td><td><span className="check">✓ their voice</span></td></tr>
                  <tr><td>Public, fixed pricing</td><td><span className="check">✓ visible</span></td><td><span className="x">— custom quote</span></td><td><span className="x">— T&amp;M</span></td><td><span className="check">✓ but not bespoke</span></td></tr>
                  <tr><td>Source-controlled hand-off</td><td><span className="check">✓ your GitHub</span></td><td><span className="x">— hostage data</span></td><td><span className="check">✓ partial</span></td><td><span className="x">— vendor lock</span></td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="grid12">
            <header className="section-h">
              <div className="kicker">04 · Public pricing</div>
              <h2>Four tiers. Pick one. Done.</h2>
              <p>Half on signature. Half on launch. Cancel anytime, walk with what&apos;s built. No retainer required.</p>
            </header>
            <div className="pricing-row">
              <div className="tier"><div className="tier-id">T01 · STARTER</div><div className="tier-name">Starter</div><div className="tier-meta">14d · site + CRM + WA</div><div className="tier-price">$1,497<small>flat · no monthly</small></div><ul className="tier-feat"><li>5-page Next.js / Framer site</li><li>GHL CRM + pipelines</li><li>WhatsApp Business inbox</li><li>Meta Pixel + CAPI</li><li>2 revision rounds</li></ul></div>
              <div className="tier"><div className="tier-id">T02 · PRO</div><div className="tier-name">Pro</div><div className="tier-meta">21d · + dispatch + factoring</div><div className="tier-price">$3,997<small>+ $497/mo</small></div><ul className="tier-feat"><li>Everything in Starter</li><li>Custom dispatch dashboard</li><li>TBS / OTR factoring</li><li>SMS + email automation</li><li>Monthly opt call</li></ul></div>
              <div className="tier featured"><span className="tier-tag">★ MOST LAND HERE</span><div className="tier-id">T03 · PREMIUM</div><div className="tier-name">Premium</div><div className="tier-meta">30d · + ad ops + lead gen</div><div className="tier-price">$7,997<small>+ $997/mo</small></div><ul className="tier-feat"><li>Everything in Pro</li><li>Meta + LinkedIn ad build</li><li>Lead gen ops (cold + warm)</li><li>UGC content batch monthly</li><li>Weekly review</li></ul></div>
              <div className="tier"><div className="tier-id">T04 · FLAGSHIP</div><div className="tier-name">Flagship</div><div className="tier-meta">45d · AI Dispatcher Agent™</div><div className="tier-price">$9,500<small>+ $1,997/mo</small></div><ul className="tier-feat"><li>Everything in Premium</li><li>Vapi / Retell voice agent</li><li>Inbound load qualification</li><li>24/7 phone coverage</li><li>Auto-pipeline population</li></ul></div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="grid12">
            <header className="section-h"><div className="kicker">05 · The operator</div><h2>Yes solo. Yes Bali. Here&apos;s why that&apos;s your edge.</h2></header>
            <div className="founder">
              <figure className="founder-photo"><img src="/lp/freight/v2/feature.jpg" alt="Waseem Nasir, founder" loading="lazy" /></figure>
              <div className="founder-text">
                <h3>Waseem Nasir — solo builder, Canggu, Bali.</h3>
                <p>Not a 12-person agency. One operator with Claude as second seat, writing this from Liberty Market in Lahore (visa window) and shipping from Crate Cafe in Canggu the rest of the year. Iced latte: 35,000 IDR. Wi-Fi faster than Manhattan.</p>
                <p>The reason that&apos;s <mark>your edge</mark> — not paying eight account managers and a creative director. Lights stay on because every week I ship something that makes a small-fleet owner more money.</p>
                <p>Past clients I&apos;ll name: Vow Sanctuary (Asheville NC), Wellness DNA (DTC supplements), GutReno (functional medicine), Pretty Potty (home services), TimeLapse Renovation (construction tracker), SkynetJoe (the WP theme this whole site evolved from).</p>
                <div className="founder-stats">
                  <div><div className="stat-v">9+</div><div className="stat-l">Shipped builds</div></div>
                  <div><div className="stat-v">14d</div><div className="stat-l">Ship window</div></div>
                  <div><div className="stat-v">$0</div><div className="stat-l">Audit fee</div></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="grid12">
            <header className="section-h"><div className="kicker">06 · Named builds</div><h2>Shipped. Named. Still running.</h2></header>
            <div className="builds-row">
              <div className="b-row"><div className="b-row-meta">WELLNESS · ASHEVILLE NC</div><h4>Vow Sanctuary</h4><p>Next.js flagship. Lighthouse 98. 3-day ship. $7K MRR pipeline within 30 days.</p></div>
              <div className="b-row"><div className="b-row-meta">HEALTH · DTC</div><h4>Wellness DNA</h4><p>Shopify + n8n. Subscription + WA post-purchase. 28% LTV lift.</p></div>
              <div className="b-row"><div className="b-row-meta">MEDICINE · USA</div><h4>GutReno</h4><p>WordPress + GHL. 12% landing→consult. $4K/mo lead value.</p></div>
              <div className="b-row"><div className="b-row-meta">HOME · USA</div><h4>Pretty Potty</h4><p>Lead-gen + GHL + SMS reminders. Booked-consult rate 4×.</p></div>
              <div className="b-row"><div className="b-row-meta">CONSTRUCTION · USA</div><h4>TimeLapse Renovation</h4><p>Custom progress tracker + portal. Replaces 3 paid SaaS tools.</p></div>
              <div className="b-row"><div className="b-row-meta">INTERNAL · OPEN SOURCE</div><h4>SkynetJoe theme</h4><p>The premium WP theme this entire stack evolved from. Public on GitHub.</p></div>
            </div>
          </div>
        </section>

        <section className="lifestyle">
          <img src="/lp/freight/v2/lifestyle.jpg" alt="Poolside nomad workstation, Bali" loading="lazy" />
          <div className="lifestyle-quote"><q>I run this from a pool deck.<br />You can run your fleet from a phone.</q><cite>— Poolside · Canggu · 2026-05-12</cite></div>
        </section>

        <section className="section">
          <div className="grid12">
            <header className="section-h"><div className="kicker">07 · Questions first</div><h2>No, you&apos;re not too small.</h2></header>
            <div className="faq-list">
              <details className="faq-item"><summary>I only have 5 trucks. Is this overkill?</summary><p>Starter ($1,497) is for 5–10. Site + CRM + WhatsApp in 14 days. No retainer. Cancel anytime.</p></details>
              <details className="faq-item"><summary>FMCSA / TCPA compliance?</summary><p>SkynetLabs provides software, design, marketing services. Not a freight broker or motor carrier. All voice flows inbound-only, TCPA-compliant.</p></details>
              <details className="faq-item"><summary>Why Bali if I&apos;m in the US?</summary><p>Time-zone arbitrage. While you sleep, I ship. While dispatcher takes calls, I&apos;m on WhatsApp evenings + weekends.</p></details>
              <details className="faq-item"><summary>Burned $20K with an agency before. Why different?</summary><p>Public pricing fixes that. 14-day ship fixes that. Source-controlled hand-off fixes that. Miss window, you keep what&apos;s built, we re-scope free.</p></details>
              <details className="faq-item"><summary>What does the audit cover?</summary><p>15 min Cal.com. Review stack, flag 2-3 biggest gaps, yes/no/referral. No commitment. Fit = fixed scope in 48h.</p></details>
              <details className="faq-item"><summary>Can I do AI agent without dashboard?</summary><p>Flagship is the only tier with the voice agent. Agent needs the dashboard to feed real load data. Phase Pro now, upgrade Flagship month 3.</p></details>
            </div>
          </div>
        </section>

        <section className="closer">
          <h2>4 builds per month. <span>2 left for June.</span></h2>
          <p>Eight-hour reply window. Yes / no / referral. No retainer. No &quot;custom quote&quot; theater. Submit the brief, get a real answer.</p>
          <div className="cta-row" style={{ justifyContent: "center" }}>
            <a href="https://cal.com/skynetjoe/audit" className="btn btn-orange">Book 15-min audit →</a>
            <a href="https://wa.me/923001001957?text=COMMAND" className="btn" style={{ border: "1.5px solid var(--bone)", color: "var(--bone)" }}>WhatsApp &quot;Command&quot;</a>
          </div>
        </section>

        <footer className="lp">
          <div className="inner">
            <div><h5>SkynetLabs</h5><p>One operator. One stack. One roof. Built by Waseem Nasir from Canggu, Bali (GMT+8) + Lahore, Pakistan.</p></div>
            <div><h5>Pages</h5><a href="/services">Services</a><a href="/portfolio">Work</a><a href="/pricing">Pricing</a><a href="/about">About</a></div>
            <div><h5>Reach</h5><a href="https://cal.com/skynetjoe/audit">Book audit</a><a href="https://wa.me/923001001957?text=COMMAND">WhatsApp</a><a href="mailto:waseem@skynetjoe.com">Email</a></div>
            <div><h5>Elsewhere</h5><a href="https://www.linkedin.com/in/waseemnasir2k26">LinkedIn</a><a href="https://github.com/waseemnasir2k26">GitHub</a><a href="https://youtube.com/@skynetlabs">YouTube</a></div>
          </div>
          <p className="disclaimer">SkynetLabs provides software, design, and marketing services. Not a freight broker or motor carrier. No FMCSA authority. Software demos are inbound-only and require user consent (TCPA-compliant). Reference 49 CFR 371 governs broker authority and is not implicated by services described herein. Public pricing reflects standard scope as of 2026-06-01 and may vary by custom requirements. © 2026 SkynetLabs · Waseem Nasir.</p>
        </footer>
      </main>

      <a href="https://wa.me/923001001957?text=COMMAND" className="wa-sticky">
        <svg viewBox="0 0 24 24"><path d={WA_ICON} /></svg>WhatsApp
      </a>
    </div>
  );
}
