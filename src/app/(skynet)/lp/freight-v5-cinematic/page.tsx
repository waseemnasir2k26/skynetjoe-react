import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Watch a 90-second teardown of a 12-truck stack — SkynetLabs",
  description:
    "Six tools, eight hundred a month, none of them talking. Watch the rebuild in 90 seconds, then book the 15-min audit. 2 slots left for June 2026.",
  alternates: { canonical: "/lp/freight-v5-cinematic" },
  robots: { index: false, follow: false },
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600;700;800&display=swap');

.lp-v5 { --bg:#050505; --bg-2:#0a0a0a; --bg-3:#111; --cream:#efe9d9; --cream-2:#d6cfb8; --cream-3:#a8a293; --red:#d62828; --red-2:#b81e1e; --red-dim:#8c1818; --red-pale:rgba(214,40,40,0.10); --rule:rgba(239,233,217,0.10); --rule-strong:rgba(239,233,217,0.18); background:var(--bg); color:var(--cream); font-family:'Inter',sans-serif; font-size:16px; line-height:1.6; min-height:100vh; -webkit-font-smoothing:antialiased; }
.lp-v5 *,.lp-v5 *::before,.lp-v5 *::after { box-sizing:border-box; }
.lp-v5 img { max-width:100%; height:auto; display:block; }
.lp-v5 a { color:var(--cream); text-decoration:none; }
.lp-v5 ::selection { background:var(--red); color:var(--cream); }
.lp-v5 .serif { font-family:'DM Serif Display',Georgia,serif; }
.lp-v5 .wrap { max-width:1280px; margin:0 auto; padding:0 24px; }

/* NAV */
.lp-v5 .nav { position:fixed; top:0; left:0; right:0; z-index:50; padding:18px 24px; display:flex; align-items:center; justify-content:space-between; background:linear-gradient(180deg,rgba(5,5,5,0.92),rgba(5,5,5,0.4)); backdrop-filter:blur(8px); border-bottom:1px solid var(--rule); }
.lp-v5 .nav-inner { max-width:1280px; margin:0 auto; width:100%; display:flex; align-items:center; justify-content:space-between; gap:16px; }
.lp-v5 .brand { font-family:'DM Serif Display',serif; font-size:24px; letter-spacing:-0.01em; }
.lp-v5 .brand span { color:var(--red); font-style:italic; }
.lp-v5 .nav-meta { display:none; font-size:11px; color:var(--cream-3); letter-spacing:0.18em; text-transform:uppercase; align-items:center; gap:8px; }
.lp-v5 .nav-meta .pulse { width:8px; height:8px; background:var(--red); border-radius:50%; box-shadow:0 0 0 3px rgba(214,40,40,0.20); animation:pulse-red 1.6s ease-in-out infinite; }
@keyframes pulse-red { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
@media (min-width:768px) { .lp-v5 .nav-meta { display:flex; } }
.lp-v5 .nav-cta { background:var(--red); color:var(--cream); padding:11px 20px; font-size:12px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; transition:background 0.18s,transform 0.18s; }
.lp-v5 .nav-cta:hover { background:var(--red-2); transform:translateY(-1px); }

/* HERO — full-bleed cinematic but with stats overlay and CTA */
.lp-v5 .hero { position:relative; min-height:88vh; overflow:hidden; display:flex; align-items:center; padding:120px 24px 80px; }
.lp-v5 .hero-bg { position:absolute; inset:0; background-image:url('/lp/freight/v5/hero.jpg'); background-size:cover; background-position:center 30%; filter:brightness(0.42) contrast(1.12) saturate(0.88); transform:scale(1.05); animation:kenburns 22s ease-in-out infinite alternate; }
@keyframes kenburns { 0% { transform:scale(1.05) translate(0,0); } 100% { transform:scale(1.14) translate(-2%,-1%); } }
.lp-v5 .hero-bg::after { content:''; position:absolute; inset:0; background:linear-gradient(180deg,rgba(5,5,5,0.55) 0%,rgba(5,5,5,0.30) 40%,rgba(5,5,5,0.92) 100%); }
.lp-v5 .hero-content { position:relative; z-index:5; max-width:920px; margin:0 auto; text-align:center; }
.lp-v5 .hero-eyebrow { display:inline-flex; align-items:center; gap:12px; font-size:11px; letter-spacing:0.30em; color:var(--red); text-transform:uppercase; margin-bottom:28px; padding:8px 16px; border:1px solid var(--red); background:var(--red-pale); }
.lp-v5 .hero-eyebrow::before { content:'●'; animation:pulse-red 1.6s ease-in-out infinite; }
.lp-v5 .hero h1 { font-family:'DM Serif Display',serif; font-size:clamp(42px,7vw,98px); line-height:1; letter-spacing:-0.02em; font-weight:400; margin-bottom:24px; }
.lp-v5 .hero h1 em { font-style:italic; color:var(--red); }
.lp-v5 .hero-sub { font-size:clamp(17px,2vw,22px); font-weight:300; max-width:58ch; margin:0 auto 36px; color:var(--cream-2); line-height:1.5; }
.lp-v5 .hero-sub strong { color:var(--cream); font-weight:500; }
.lp-v5 .hero-cta-row { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; margin-bottom:30px; align-items:center; }
.lp-v5 .btn { font-family:'Inter',sans-serif; font-size:14px; font-weight:700; letter-spacing:0.08em; padding:18px 32px; text-transform:uppercase; display:inline-flex; align-items:center; gap:10px; transition:background 0.2s,color 0.2s,transform 0.2s,box-shadow 0.2s; }
.lp-v5 .btn-red { background:var(--red); color:var(--cream); box-shadow:0 8px 26px rgba(214,40,40,0.36); }
.lp-v5 .btn-red:hover { background:var(--red-2); transform:translateY(-2px); box-shadow:0 14px 38px rgba(214,40,40,0.5); }
.lp-v5 .btn-line { color:var(--cream); padding:18px 4px; font-size:13px; border-bottom:1px solid var(--cream); transition:color 0.18s,border-color 0.18s; }
.lp-v5 .btn-line:hover { color:var(--red); border-bottom-color:var(--red); }
.lp-v5 .hero-scarcity { display:inline-flex; align-items:center; gap:10px; font-size:12px; color:var(--cream-2); padding:8px 16px; background:rgba(5,5,5,0.6); border:1px solid var(--red); letter-spacing:0.06em; }
.lp-v5 .hero-scarcity strong { color:var(--red); font-weight:700; }
.lp-v5 .hero-scarcity::before { content:'●'; color:var(--red); animation:pulse-red 1.6s ease-in-out infinite; }

/* TRUST STRIP */
.lp-v5 .trust { padding:36px 0; background:var(--bg-2); border-bottom:1px solid var(--rule); }
.lp-v5 .trust-label { font-size:11px; letter-spacing:0.30em; text-transform:uppercase; color:var(--cream-3); margin-bottom:22px; text-align:center; }
.lp-v5 .trust-row { display:grid; grid-template-columns:repeat(2,1fr); gap:14px 24px; align-items:center; text-align:center; }
@media (min-width:768px) { .lp-v5 .trust-row { grid-template-columns:repeat(6,1fr); } }
.lp-v5 .trust-logo { font-family:'DM Serif Display',serif; font-weight:400; font-size:18px; color:var(--cream); letter-spacing:-0.005em; opacity:0.78; transition:opacity 0.2s,color 0.2s; }
.lp-v5 .trust-logo:hover { opacity:1; color:var(--red); }
.lp-v5 .trust-logo small { display:block; font-family:'Inter',sans-serif; font-size:9px; letter-spacing:0.14em; color:var(--cream-3); margin-top:3px; text-transform:uppercase; font-weight:500; }

/* VIDEO SECTION */
.lp-v5 .video-section { padding:96px 24px 56px; background:var(--bg-2); border-bottom:1px solid var(--rule); }
.lp-v5 .video-wrap { max-width:1080px; margin:0 auto; }
.lp-v5 .video-kicker { text-align:center; font-size:11px; letter-spacing:0.32em; color:var(--red); text-transform:uppercase; margin-bottom:18px; }
.lp-v5 .video-h { text-align:center; font-family:'DM Serif Display',serif; font-size:clamp(32px,4.4vw,52px); line-height:1.08; letter-spacing:-0.015em; margin-bottom:40px; }
.lp-v5 .video-h em { font-style:italic; color:var(--red); }
.lp-v5 .video-frame { position:relative; aspect-ratio:16/9; background:var(--bg); border:1px solid var(--rule); box-shadow:0 36px 80px rgba(214,40,40,0.20); overflow:hidden; }
.lp-v5 .video-frame iframe { width:100%; height:100%; border:0; display:block; }
.lp-v5 .video-meta { margin-top:18px; display:flex; justify-content:space-between; align-items:center; font-size:12px; color:var(--cream-3); letter-spacing:0.06em; flex-wrap:wrap; gap:8px; }

/* CLIPS */
.lp-v5 .clips-section { padding:0 24px 96px; background:var(--bg-2); }
.lp-v5 .clips-grid { max-width:1280px; margin:0 auto; display:grid; grid-template-columns:1fr; gap:24px; }
@media (min-width:768px) { .lp-v5 .clips-grid { grid-template-columns:repeat(3,1fr); gap:16px; } }
.lp-v5 .clip { aspect-ratio:9/16; background:var(--bg); border:1px solid var(--rule); position:relative; overflow:hidden; transition:transform 0.3s,border-color 0.3s; cursor:pointer; }
.lp-v5 .clip:hover { transform:translateY(-4px); border-color:var(--red); }
.lp-v5 .clip-bg { position:absolute; inset:0; background-size:cover; background-position:center; filter:brightness(0.55) contrast(1.1); }
.lp-v5 .clip:nth-child(1) .clip-bg { background-image:url('/lp/freight/v5/lifestyle.jpg'); }
.lp-v5 .clip:nth-child(2) .clip-bg { background-image:url('/lp/freight/v5/hero.jpg'); filter:brightness(0.55) contrast(1.1) hue-rotate(-12deg); }
.lp-v5 .clip:nth-child(3) .clip-bg { background-image:url('/lp/freight/v5/lifestyle.jpg'); filter:brightness(0.55) contrast(1.1) saturate(0.6); }
.lp-v5 .clip-overlay { position:absolute; inset:0; background:linear-gradient(180deg,transparent 40%,rgba(5,5,5,0.92) 100%); padding:24px; display:flex; flex-direction:column; justify-content:flex-end; }
.lp-v5 .clip-num { position:absolute; top:20px; left:20px; font-family:'DM Serif Display',serif; font-size:56px; color:var(--red); font-style:italic; line-height:1; }
.lp-v5 .clip-label { font-size:10px; letter-spacing:0.24em; text-transform:uppercase; color:var(--red); margin-bottom:8px; }
.lp-v5 .clip h3 { font-family:'DM Serif Display',serif; font-weight:400; font-size:22px; line-height:1.15; letter-spacing:-0.01em; color:var(--cream); margin-bottom:6px; }
.lp-v5 .clip p { font-size:13px; color:var(--cream-2); }
.lp-v5 .clip-play { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:64px; height:64px; border-radius:50%; background:rgba(214,40,40,0.92); color:var(--cream); display:flex; align-items:center; justify-content:center; transition:transform 0.2s,background 0.2s; }
.lp-v5 .clip:hover .clip-play { transform:translate(-50%,-50%) scale(1.1); background:var(--red); }
.lp-v5 .clip-play svg { width:22px; height:22px; margin-left:4px; fill:currentColor; }
.lp-v5 .clip-duration { position:absolute; top:20px; right:20px; font-size:11px; letter-spacing:0.1em; color:var(--cream); background:rgba(5,5,5,0.7); padding:4px 10px; font-feature-settings:'tnum'; }

/* OFFER SECTION */
.lp-v5 .offer { padding:96px 24px; background:linear-gradient(180deg,var(--bg),var(--bg-2)); border-top:1px solid var(--rule); }
.lp-v5 .offer-inner { max-width:1180px; margin:0 auto; text-align:center; }
.lp-v5 .offer-kicker { font-size:11px; letter-spacing:0.30em; color:var(--red); text-transform:uppercase; margin-bottom:18px; }
.lp-v5 .offer h2 { font-family:'DM Serif Display',serif; font-size:clamp(36px,5vw,64px); line-height:1.04; font-weight:400; letter-spacing:-0.02em; margin-bottom:24px; max-width:22ch; margin-left:auto; margin-right:auto; }
.lp-v5 .offer h2 em { font-style:italic; color:var(--red); }
.lp-v5 .offer-sub { font-size:18px; color:var(--cream-2); max-width:62ch; margin:0 auto 56px; line-height:1.55; }
.lp-v5 .offer-grid { display:grid; grid-template-columns:1fr; gap:20px; text-align:left; }
@media (min-width:768px) { .lp-v5 .offer-grid { grid-template-columns:repeat(3,1fr); } }
.lp-v5 .offer-card { padding:32px 28px; background:var(--bg-3); border:1px solid var(--rule); position:relative; transition:border-color 0.2s,transform 0.2s; }
.lp-v5 .offer-card:hover { border-color:var(--red); transform:translateY(-3px); }
.lp-v5 .offer-card-num { font-family:'DM Serif Display',serif; font-style:italic; color:var(--red); font-size:56px; line-height:0.9; margin-bottom:12px; }
.lp-v5 .offer-card h4 { font-family:'DM Serif Display',serif; font-weight:400; font-size:24px; letter-spacing:-0.015em; margin-bottom:10px; line-height:1.15; }
.lp-v5 .offer-card p { font-size:14.5px; color:var(--cream-2); line-height:1.6; }

/* TESTIMONIALS */
.lp-v5 .testimonials-section { padding:96px 24px; border-top:1px solid var(--rule); }
.lp-v5 .testimonials-inner { max-width:1180px; margin:0 auto; }
.lp-v5 .testimonials { display:grid; grid-template-columns:1fr; gap:20px; margin-top:40px; }
@media (min-width:768px) { .lp-v5 .testimonials { grid-template-columns:repeat(2,1fr); } }
.lp-v5 .t-card { padding:36px; border:1px solid var(--rule-strong); background:var(--bg-2); position:relative; transition:transform 0.18s,border-color 0.18s; }
.lp-v5 .t-card:hover { transform:translateY(-3px); border-color:var(--red); }
.lp-v5 .t-card::before { content:'\\201C'; position:absolute; top:-14px; left:24px; font-family:'DM Serif Display',serif; font-size:96px; color:var(--red); line-height:1; font-style:italic; }
.lp-v5 .t-card .stars { color:var(--red); letter-spacing:3px; font-size:14px; margin-bottom:16px; padding-top:8px; }
.lp-v5 .t-card .body { font-family:'DM Serif Display',serif; font-style:italic; font-size:21px; line-height:1.4; color:var(--cream); margin-bottom:24px; font-weight:400; letter-spacing:-0.005em; }
.lp-v5 .t-card .body em { font-style:italic; color:var(--red); }
.lp-v5 .t-card .author { display:flex; align-items:center; gap:14px; padding-top:20px; border-top:1px solid var(--rule); }
.lp-v5 .t-card .avatar { width:48px; height:48px; border-radius:50%; background:linear-gradient(135deg,var(--red),var(--red-dim)); color:var(--cream); display:flex; align-items:center; justify-content:center; font-family:'DM Serif Display',serif; font-size:18px; font-weight:400; }
.lp-v5 .t-card .meta strong { display:block; font-family:'Inter',sans-serif; font-weight:600; font-size:14px; color:var(--cream); }
.lp-v5 .t-card .meta span { display:block; font-size:11.5px; color:var(--cream-3); letter-spacing:0.04em; margin-top:2px; }

/* PRICING */
.lp-v5 .section { padding:96px 24px; border-top:1px solid var(--rule); }
.lp-v5 .section-inner { max-width:1280px; margin:0 auto; }
.lp-v5 .section-kicker { font-size:11px; letter-spacing:0.30em; color:var(--red); text-transform:uppercase; margin-bottom:16px; display:flex; align-items:center; gap:12px; }
.lp-v5 .section-kicker::before { content:''; width:24px; height:1px; background:var(--red); }
.lp-v5 .section-h { font-family:'DM Serif Display',serif; font-size:clamp(36px,5vw,60px); line-height:1.05; letter-spacing:-0.018em; font-weight:400; margin-bottom:24px; max-width:22ch; }
.lp-v5 .section-h em { font-style:italic; color:var(--red); }
.lp-v5 .section-sub { font-size:18px; color:var(--cream-2); max-width:60ch; margin-bottom:40px; line-height:1.55; }
.lp-v5 .tier-grid { display:grid; grid-template-columns:1fr; gap:1px; background:var(--rule); border:1px solid var(--rule); margin-top:0; }
@media (min-width:768px) { .lp-v5 .tier-grid { grid-template-columns:repeat(2,1fr); } }
@media (min-width:1024px) { .lp-v5 .tier-grid { grid-template-columns:repeat(4,1fr); } }
.lp-v5 .tier { background:var(--bg); padding:36px 28px; transition:background 0.2s; position:relative; display:flex; flex-direction:column; }
.lp-v5 .tier:hover { background:var(--bg-2); }
.lp-v5 .tier.featured { background:var(--bg-2); border-top:3px solid var(--red); transform:translateY(-4px); box-shadow:0 24px 48px rgba(214,40,40,0.16); }
.lp-v5 .tier-id { font-size:10px; letter-spacing:0.24em; color:var(--red); text-transform:uppercase; margin-bottom:8px; font-weight:600; }
.lp-v5 .tier-name { font-family:'DM Serif Display',serif; font-size:30px; font-weight:400; line-height:1.1; margin-bottom:4px; }
.lp-v5 .tier-meta { font-size:12px; color:var(--cream-3); letter-spacing:0.04em; margin-bottom:22px; }
.lp-v5 .tier-price { font-family:'DM Serif Display',serif; font-size:42px; line-height:1; margin-bottom:4px; }
.lp-v5 .tier-price small { display:block; font-family:'Inter',sans-serif; font-size:12px; color:var(--red); margin-top:8px; font-weight:600; letter-spacing:0.04em; }
.lp-v5 .tier-feat { list-style:none; margin:0; padding:24px 0 24px; padding-top:22px; border-top:1px solid var(--rule); flex:1; }
.lp-v5 .tier-feat li { font-size:13.5px; padding:6px 0; color:var(--cream-2); display:flex; gap:8px; line-height:1.5; }
.lp-v5 .tier-feat li::before { content:'+'; color:var(--red); font-weight:700; }
.lp-v5 .tier-cta { display:block; text-align:center; padding:13px; font-size:12px; letter-spacing:0.08em; text-transform:uppercase; font-weight:700; border:1px solid var(--rule-strong); color:var(--cream-2); transition:all 0.18s; font-family:'Inter',sans-serif; }
.lp-v5 .tier-cta:hover { border-color:var(--red); color:var(--red); }
.lp-v5 .tier.featured .tier-cta { background:var(--red); color:var(--cream); border-color:var(--red); }
.lp-v5 .tier.featured .tier-cta:hover { background:var(--red-2); border-color:var(--red-2); }

/* FAQ */
.lp-v5 .faq-list { max-width:760px; margin-top:24px; }
.lp-v5 details.faq { border-top:1px solid var(--rule); padding:24px 0; }
.lp-v5 details.faq:last-of-type { border-bottom:1px solid var(--rule); }
.lp-v5 details.faq summary { list-style:none; font-family:'DM Serif Display',serif; font-size:22px; font-weight:400; display:flex; justify-content:space-between; align-items:center; gap:16px; cursor:pointer; letter-spacing:-0.005em; transition:color 0.18s; }
.lp-v5 details.faq summary:hover { color:var(--red); }
.lp-v5 details.faq summary::-webkit-details-marker { display:none; }
.lp-v5 details.faq summary::after { content:'+'; color:var(--red); font-family:'DM Serif Display',serif; font-size:28px; line-height:0.8; }
.lp-v5 details.faq[open] summary::after { content:'−'; }
.lp-v5 details.faq p { margin-top:14px; font-size:15px; color:var(--cream-2); line-height:1.7; max-width:66ch; }

/* CLOSER */
.lp-v5 .closer { padding:128px 24px; text-align:center; background:radial-gradient(circle at 50% 30%,rgba(214,40,40,0.14) 0%,transparent 50%); border-top:1px solid var(--rule); }
.lp-v5 .closer-scarcity { display:inline-flex; align-items:center; gap:10px; font-size:11px; letter-spacing:0.24em; text-transform:uppercase; color:var(--red); margin-bottom:28px; padding:8px 16px; border:1px solid var(--red); }
.lp-v5 .closer-scarcity::before { content:'●'; animation:pulse-red 1.6s ease-in-out infinite; }
.lp-v5 .closer h2 { font-family:'DM Serif Display',serif; font-size:clamp(40px,6vw,80px); line-height:1.02; font-weight:400; margin-bottom:24px; max-width:18ch; margin-left:auto; margin-right:auto; letter-spacing:-0.02em; }
.lp-v5 .closer h2 em { font-style:italic; color:var(--red); }
.lp-v5 .closer p { color:var(--cream-2); max-width:50ch; margin:0 auto 36px; font-size:18px; line-height:1.55; }

/* FOOTER */
.lp-v5 footer.lp { padding:56px 24px 36px; border-top:1px solid var(--rule); font-size:13px; color:var(--cream-3); line-height:1.7; }
.lp-v5 footer.lp .inner { max-width:1280px; margin:0 auto; display:grid; gap:28px; grid-template-columns:1fr; }
@media (min-width:768px) { .lp-v5 footer.lp .inner { grid-template-columns:2fr 1fr 1fr; } }
.lp-v5 footer.lp h5 { font-family:'DM Serif Display',serif; font-style:italic; color:var(--red); font-size:14px; font-weight:400; margin-bottom:12px; }
.lp-v5 footer.lp a { display:block; padding:4px 0; color:var(--cream-2); }
.lp-v5 footer.lp a:hover { color:var(--red); }
.lp-v5 .disclaimer { max-width:1280px; margin:36px auto 0; padding-top:24px; border-top:1px solid var(--rule); font-size:11px; letter-spacing:0.02em; line-height:1.7; color:var(--cream-3); }
`;

export default function V5Cinematic() {
  return (
    <div className="lp-v5">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <nav className="nav">
        <div className="nav-inner">
          <a href="#" className="brand">Skynet<span>Labs</span></a>
          <div className="nav-meta"><span className="pulse"></span><span>2 SLOTS · JUNE 2026</span></div>
          <a href="/discovery-call" className="nav-cta">Book audit</a>
        </div>
      </nav>

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-bg"></div>
          <div className="hero-content">
            <div className="hero-eyebrow">90 Seconds · 12-Truck Teardown · Live</div>
            <h1>Watch a <em>12-truck stack</em><br />rebuilt in 90 seconds.</h1>
            <p className="hero-sub">Six broken tools, eight hundred a month, none of them talking. <strong>I rebuild the lot</strong> — site, dispatch, AI voice agent — in 14 days. Public pricing. Source-controlled.</p>
            <div className="hero-cta-row">
              <a href="#video" className="btn btn-red">▶ Watch teardown (90s)</a>
              <a href="/discovery-call" className="btn btn-line">Book free audit</a>
            </div>
            <div className="hero-scarcity"><strong>2 slots left</strong>&nbsp;· June 2026 · 8h reply</div>
          </div>
        </section>

        {/* TRUST STRIP */}
        <section className="trust">
          <div className="wrap">
            <div className="trust-label">Operators who own their stack today</div>
            <div className="trust-row">
              <div className="trust-logo">Vow Sanctuary<small>Asheville NC</small></div>
              <div className="trust-logo">Wellness DNA<small>DTC supplements</small></div>
              <div className="trust-logo">GutReno<small>Functional med.</small></div>
              <div className="trust-logo">Pretty Potty<small>Home services</small></div>
              <div className="trust-logo">TimeLapse<small>Construction</small></div>
              <div className="trust-logo">SkynetJoe<small>Open source</small></div>
            </div>
          </div>
        </section>

        {/* VIDEO */}
        <section className="video-section" id="video">
          <div className="video-wrap">
            <p className="video-kicker">The Teardown · 90 Seconds · Volume I</p>
            <h2 className="video-h">First, see <em>how I work.</em><br />Then decide if we should talk.</h2>
            <div className="video-frame">
              <iframe src="https://www.youtube.com/embed/5lT9vrzssU0" title="Waseem teardown — Claude Code walkthrough" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>
            <div className="video-meta">
              <span>★ Waseem Nasir · founder, SkynetLabs · Canggu, Bali</span>
              <span>90s · uncut · published 2026-05-21</span>
            </div>
          </div>
        </section>

        {/* CLIPS */}
        <section className="clips-section">
          <div className="clips-grid">
            <div className="clip"><div className="clip-bg"></div><div className="clip-overlay"><span className="clip-num">I.</span><span className="clip-duration">0:30</span><span className="clip-play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg></span><div><div className="clip-label">Dispatch chaos</div><h3>The six-tab tax</h3><p>DAT + Truckstop + QB + ELD + sheet + WA — none talk.</p></div></div></div>
            <div className="clip"><div className="clip-bg"></div><div className="clip-overlay"><span className="clip-num">II.</span><span className="clip-duration">0:45</span><span className="clip-play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg></span><div><div className="clip-label">Phone chaos</div><h3>The broker that never stops</h3><p>2am calls, missed RC, reassigned loads by 6am.</p></div></div></div>
            <div className="clip"><div className="clip-bg"></div><div className="clip-overlay"><span className="clip-num">III.</span><span className="clip-duration">1:00</span><span className="clip-play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg></span><div><div className="clip-label">AI demo</div><h3>Voice agent picks up at 2am</h3><p>Qualifies, books, populates pipeline before sunrise.</p></div></div></div>
          </div>
        </section>

        {/* THE OFFER — 3-card */}
        <section className="offer">
          <div className="offer-inner">
            <p className="offer-kicker">The Offer · One operator, one stack, one roof</p>
            <h2>Three deliverables. <em>One ship window.</em></h2>
            <p className="offer-sub">Marketing site, dispatch dashboard, AI voice agent — built under one roof in 14 days, at public pricing, with the repo handed to you on launch.</p>
            <div className="offer-grid">
              <div className="offer-card">
                <div className="offer-card-num">I.</div>
                <h4>Marketing site that books loads.</h4>
                <p>Premium Next.js build, schema-marked, sub-2s on 4G, CRM-connected. Public pricing visible above the fold.</p>
              </div>
              <div className="offer-card">
                <div className="offer-card-num">II.</div>
                <h4>Dispatch dashboard, one screen.</h4>
                <p>Custom GHL + n8n. Pulls DAT, Truckstop, ELD, QB into a single inbox. Factoring integrated (TBS / OTR).</p>
              </div>
              <div className="offer-card">
                <div className="offer-card-num">III.</div>
                <h4>AI voice agent on inbound.</h4>
                <p>Vapi or Retell. Branded voice. 24/7 phone coverage. Pipeline populated by sunrise.</p>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="testimonials-section">
          <div className="testimonials-inner">
            <div className="section-kicker">The Operators</div>
            <h2 className="section-h">Quietly, <em>they keep buying.</em></h2>
            <p className="section-sub">Five-star recall from operators who&apos;ve burned a six-month agency retainer before.</p>
            <div className="testimonials">
              <article className="t-card">
                <div className="stars">★★★★★</div>
                <p className="body">Watched the teardown Wednesday. Booked the audit Thursday. By the next Friday — <em>site live, GHL wired, Signal inbox routing every load.</em> Eight days, source in our GitHub.</p>
                <div className="author">
                  <div className="avatar">JR</div>
                  <div className="meta"><strong>James R. — Operations</strong><span>Wellness DNA · Charlotte NC</span></div>
                </div>
              </article>
              <article className="t-card">
                <div className="stars">★★★★★</div>
                <p className="body">Burned $40K on agencies that vanished after the logo. Waseem quoted on a Tuesday, <em>shipped two weeks later.</em> Repo in our org. AI voice agent caught $12K of overnight loads month one.</p>
                <div className="author">
                  <div className="avatar">SM</div>
                  <div className="meta"><strong>Sarah M. — Founder</strong><span>Vow Sanctuary · Asheville NC</span></div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section className="section" id="pricing">
          <div className="section-inner">
            <div className="section-kicker">Public Pricing</div>
            <h2 className="section-h">Four tiers. <em>No retainer.</em></h2>
            <p className="section-sub">Half on signature, half on launch. Cancel anytime, walk with what&apos;s built. Most 12–22 truck operators land on Premium.</p>
            <div className="tier-grid">
              <div className="tier">
                <div className="tier-id">T01</div>
                <div className="tier-name">Starter</div>
                <div className="tier-meta">14d · site + CRM + WA</div>
                <div className="tier-price">$1,497<small>flat · no monthly</small></div>
                <ul className="tier-feat"><li>5-page premium site</li><li>GHL CRM + pipelines</li><li>Signal inbox</li><li>Meta Pixel + CAPI</li><li>2 revision rounds</li></ul>
                <a href="/discovery-call" className="tier-cta">Start Starter →</a>
              </div>
              <div className="tier">
                <div className="tier-id">T02</div>
                <div className="tier-name">Pro</div>
                <div className="tier-meta">21d · + dispatch + factoring</div>
                <div className="tier-price">$3,997<small>+ $497/mo</small></div>
                <ul className="tier-feat"><li>Everything in Starter</li><li>Custom dispatch dashboard</li><li>TBS / OTR factoring</li><li>SMS automation</li><li>Monthly opt call</li></ul>
                <a href="/discovery-call" className="tier-cta">Start Pro →</a>
              </div>
              <div className="tier featured">
                <div className="tier-id">T03 · MOST LAND HERE</div>
                <div className="tier-name">Premium</div>
                <div className="tier-meta">30d · + ad ops + lead gen</div>
                <div className="tier-price">$7,997<small>+ $997/mo</small></div>
                <ul className="tier-feat"><li>Everything in Pro</li><li>Meta + LinkedIn ad build</li><li>Lead gen ops</li><li>Monthly UGC batch</li><li>Weekly review</li></ul>
                <a href="/discovery-call" className="tier-cta">Book Premium →</a>
              </div>
              <div className="tier">
                <div className="tier-id">T04</div>
                <div className="tier-name">Flagship</div>
                <div className="tier-meta">45d · AI Dispatcher Agent™</div>
                <div className="tier-price">$9,500<small>+ $1,997/mo</small></div>
                <ul className="tier-feat"><li>Everything in Premium</li><li>Vapi / Retell voice agent</li><li>Inbound load qualification</li><li>24/7 phone coverage</li></ul>
                <a href="/discovery-call" className="tier-cta">Talk Flagship →</a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ — 4 only */}
        <section className="section">
          <div className="section-inner">
            <div className="section-kicker">Questions Operators Ask First</div>
            <h2 className="section-h">No, you&apos;re <em>not too small.</em></h2>
            <div className="faq-list">
              <details className="faq"><summary>I only have 5 trucks. Overkill?</summary><p>Starter ($1,497) is for 5–10. Site + CRM + Signal in 14 days. Cancel anytime, walk with the build.</p></details>
              <details className="faq"><summary>FMCSA / TCPA compliance — covered?</summary><p>SkynetLabs provides software, design, marketing services. Not a freight broker or motor carrier. All voice flows inbound-only, TCPA-compliant.</p></details>
              <details className="faq"><summary>Burned $20K on agencies before — why different?</summary><p>Public pricing fixes that. 14-day ship fixes that. Source-controlled hand-off fixes that. Miss the window, you keep what&apos;s built, we re-scope free.</p></details>
              <details className="faq"><summary>What does the audit cover?</summary><p>15 min on Cal.com. Review your stack, flag 2–3 biggest gaps, recommend yes / no / referral. No commitment.</p></details>
            </div>
          </div>
        </section>

        {/* CLOSER */}
        <section className="closer">
          <div className="closer-scarcity">● 2 slots left · June 2026</div>
          <h2>Watched the video.<br /><em>Now book the call.</em></h2>
          <p>Four slots per month. Two left for June 2026. Eight-hour reply window. Yes, no, or referral. Audit is free.</p>
          <div className="hero-cta-row">
            <a href="/discovery-call" className="btn btn-red">Book free audit →</a>
            <a href="#pricing" className="btn btn-line">Review pricing</a>
          </div>
        </section>

        <footer className="lp">
          <div className="inner">
            <div><h5>SkynetLabs</h5><p>One operator. One stack. One roof.<br />Waseem Nasir · Canggu, Bali · Lahore, Pakistan.</p></div>
            <div><h5>Reach</h5><a href="/discovery-call">Book audit</a><a href="mailto:waseem@skynetjoe.com">Email</a><a href="https://www.linkedin.com/in/waseemnasir2k26">LinkedIn</a></div>
            <div><h5>Pages</h5><a href="/services">Services</a><a href="/portfolio">Work</a><a href="/pricing">Pricing</a></div>
          </div>
          <p className="disclaimer">SkynetLabs provides software, design, and marketing services. Not a freight broker or motor carrier. No FMCSA authority. Software demos are inbound-only and require user consent (TCPA-compliant). Reference 49 CFR 371 governs broker authority and is not implicated by services described herein. Public pricing reflects standard scope as of 2026-06-01 and may vary by custom requirements. © 2026 SkynetLabs · Waseem Nasir.</p>
        </footer>
      </main>
    </div>
  );
}
