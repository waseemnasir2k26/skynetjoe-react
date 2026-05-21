import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Watch me teardown a 12-truck stack — SkynetLabs",
  description:
    "90 seconds of dispatch chaos, deconstructed. Then a 14-day build offer. Public pricing. US carriers 5–50 trucks.",
  alternates: { canonical: "/lp/freight-v5-cinematic" },
  robots: { index: false, follow: false },
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600;700;800&display=swap');
.lp-v5 { --bg:#050505; --bg-2:#0a0a0a; --cream:#efe9d9; --cream-2:#d6cfb8; --red:#d62828; --red-dim:#8c1818; --rule:rgba(239,233,217,0.10); background:var(--bg); color:var(--cream); font-family:'Inter',sans-serif; font-size:16px; line-height:1.6; min-height:100vh; }
.lp-v5 *,.lp-v5 *::before,.lp-v5 *::after { box-sizing:border-box; }
.lp-v5 img { max-width:100%; height:auto; display:block; }
.lp-v5 a { color:var(--cream); text-decoration:none; }
.lp-v5 ::selection { background:var(--red); color:var(--cream); }
.lp-v5 .serif { font-family:'DM Serif Display',Georgia,serif; }
.lp-v5 .nav { position:fixed; top:0; left:0; right:0; z-index:50; padding:20px 24px; display:flex; align-items:center; justify-content:space-between; background:linear-gradient(180deg,rgba(5,5,5,0.85),transparent); }
.lp-v5 .brand { font-family:'DM Serif Display',serif; font-size:24px; letter-spacing:-0.01em; }
.lp-v5 .brand span { color:var(--red); font-style:italic; }
.lp-v5 .nav-cta { background:var(--red); color:var(--cream); padding:10px 18px; font-size:12px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; transition:background 0.18s; }
.lp-v5 .nav-cta:hover { background:var(--cream); color:var(--bg); }
.lp-v5 .hero { position:relative; height:100vh; min-height:600px; overflow:hidden; display:flex; align-items:center; justify-content:center; text-align:center; padding:0 24px; }
.lp-v5 .hero-bg { position:absolute; inset:0; background-image:url('/lp/freight/v5/hero.jpg'); background-size:cover; background-position:center 30%; filter:brightness(0.45) contrast(1.1) saturate(0.85); transform:scale(1.05); animation:kenburns 22s ease-in-out infinite alternate; }
@keyframes kenburns { 0% { transform:scale(1.05) translate(0,0); } 100% { transform:scale(1.15) translate(-2%,-1%); } }
.lp-v5 .hero-bg::after { content:''; position:absolute; inset:0; background:linear-gradient(180deg,rgba(5,5,5,0.5) 0%,rgba(5,5,5,0.2) 50%,rgba(5,5,5,0.92) 100%); }
.lp-v5 .hero-letterbox::before,.lp-v5 .hero-letterbox::after { content:''; position:absolute; left:0; right:0; height:80px; background:var(--bg); z-index:4; }
.lp-v5 .hero-letterbox::before { top:0; }
.lp-v5 .hero-letterbox::after { bottom:0; }
.lp-v5 .hero-content { position:relative; z-index:5; max-width:900px; }
.lp-v5 .hero-eyebrow { display:inline-flex; align-items:center; gap:12px; font-size:11px; letter-spacing:0.32em; color:var(--red); text-transform:uppercase; margin-bottom:28px; }
.lp-v5 .hero-eyebrow::before,.lp-v5 .hero-eyebrow::after { content:''; width:36px; height:1px; background:var(--red); }
.lp-v5 .hero h1 { font-family:'DM Serif Display',serif; font-size:clamp(40px,7vw,96px); line-height:1.02; letter-spacing:-0.015em; font-weight:400; margin-bottom:24px; }
.lp-v5 .hero h1 em { font-style:italic; color:var(--red); }
.lp-v5 .hero-sub { font-size:clamp(16px,2vw,22px); font-weight:300; max-width:56ch; margin:0 auto 40px; color:var(--cream-2); line-height:1.5; }
.lp-v5 .hero-cta-row { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }
.lp-v5 .btn { font-family:'Inter',sans-serif; font-size:13px; font-weight:600; letter-spacing:0.08em; padding:16px 28px; text-transform:uppercase; display:inline-flex; align-items:center; gap:10px; transition:background 0.2s,color 0.2s,transform 0.2s; }
.lp-v5 .btn-red { background:var(--red); color:var(--cream); }
.lp-v5 .btn-red:hover { background:var(--cream); color:var(--red); transform:translateY(-2px); }
.lp-v5 .btn-line { border:1px solid var(--cream); color:var(--cream); }
.lp-v5 .btn-line:hover { background:var(--cream); color:var(--bg); }
.lp-v5 .hero-scroll { position:absolute; bottom:100px; left:50%; transform:translateX(-50%); z-index:5; font-size:11px; letter-spacing:0.24em; color:var(--cream-2); opacity:0.7; display:flex; flex-direction:column; align-items:center; gap:12px; }
.lp-v5 .hero-scroll::after { content:''; width:1px; height:32px; background:var(--cream); animation:scroll-pulse 2s ease-in-out infinite; }
@keyframes scroll-pulse { 0%,100% { opacity:0.4; height:24px; } 50% { opacity:1; height:32px; } }
.lp-v5 .video-section { padding:96px 24px 64px; background:var(--bg-2); }
.lp-v5 .video-wrap { max-width:1080px; margin:0 auto; }
.lp-v5 .video-kicker { text-align:center; font-size:11px; letter-spacing:0.32em; color:var(--red); text-transform:uppercase; margin-bottom:16px; }
.lp-v5 .video-h { text-align:center; font-family:'DM Serif Display',serif; font-size:clamp(28px,4vw,48px); line-height:1.1; letter-spacing:-0.01em; margin-bottom:40px; }
.lp-v5 .video-h em { font-style:italic; color:var(--red); }
.lp-v5 .video-frame { position:relative; aspect-ratio:16/9; background:var(--bg); border:1px solid var(--rule); box-shadow:0 32px 80px rgba(214,40,40,0.18); overflow:hidden; }
.lp-v5 .video-frame iframe { width:100%; height:100%; border:0; display:block; }
.lp-v5 .video-meta { margin-top:16px; display:flex; justify-content:space-between; align-items:center; font-size:12px; color:var(--cream-2); opacity:0.7; letter-spacing:0.06em; flex-wrap:wrap; gap:8px; }
.lp-v5 .clips-section { padding:64px 24px 96px; background:var(--bg-2); }
.lp-v5 .clips-grid { max-width:1280px; margin:0 auto; display:grid; grid-template-columns:1fr; gap:24px; }
@media (min-width:768px) { .lp-v5 .clips-grid { grid-template-columns:repeat(3,1fr); gap:16px; } }
.lp-v5 .clip { aspect-ratio:9/16; background:var(--bg); border:1px solid var(--rule); position:relative; overflow:hidden; transition:transform 0.3s,border-color 0.3s; }
.lp-v5 .clip:hover { transform:translateY(-4px); border-color:var(--red); }
.lp-v5 .clip-bg { position:absolute; inset:0; background-size:cover; background-position:center; filter:brightness(0.55) contrast(1.1); }
.lp-v5 .clip:nth-child(1) .clip-bg { background-image:url('/lp/freight/v5/lifestyle.jpg'); }
.lp-v5 .clip:nth-child(2) .clip-bg { background-image:url('/lp/freight/v5/hero.jpg'); filter:brightness(0.55) contrast(1.1) hue-rotate(-12deg); }
.lp-v5 .clip:nth-child(3) .clip-bg { background-image:url('/lp/freight/v5/lifestyle.jpg'); filter:brightness(0.55) contrast(1.1) saturate(0.6); }
.lp-v5 .clip-overlay { position:absolute; inset:0; background:linear-gradient(180deg,transparent 40%,rgba(5,5,5,0.92) 100%); padding:24px; display:flex; flex-direction:column; justify-content:flex-end; }
.lp-v5 .clip-num { position:absolute; top:20px; left:20px; font-family:'DM Serif Display',serif; font-size:56px; color:var(--red); font-style:italic; line-height:1; }
.lp-v5 .clip-label { font-size:10px; letter-spacing:0.24em; text-transform:uppercase; color:var(--red); margin-bottom:8px; }
.lp-v5 .clip h3 { font-family:'DM Serif Display',serif; font-weight:400; font-size:22px; line-height:1.15; letter-spacing:-0.01em; color:var(--cream); margin-bottom:6px; }
.lp-v5 .clip p { font-size:13px; color:var(--cream-2); opacity:0.85; }
.lp-v5 .clip-play { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:64px; height:64px; border-radius:50%; background:rgba(214,40,40,0.92); color:var(--cream); display:flex; align-items:center; justify-content:center; transition:transform 0.2s,background 0.2s; cursor:pointer; }
.lp-v5 .clip:hover .clip-play { transform:translate(-50%,-50%) scale(1.1); background:var(--red); }
.lp-v5 .clip-play svg { width:22px; height:22px; margin-left:4px; fill:currentColor; }
.lp-v5 .clip-duration { position:absolute; top:20px; right:20px; font-size:11px; letter-spacing:0.1em; color:var(--cream); background:rgba(5,5,5,0.7); padding:4px 10px; font-feature-settings:'tnum'; }
.lp-v5 .section { padding:96px 24px; border-top:1px solid var(--rule); }
.lp-v5 .section-inner { max-width:1180px; margin:0 auto; }
.lp-v5 .section-kicker { font-size:11px; letter-spacing:0.32em; color:var(--red); text-transform:uppercase; margin-bottom:16px; display:flex; align-items:center; gap:12px; }
.lp-v5 .section-kicker::before { content:''; width:24px; height:1px; background:var(--red); }
.lp-v5 .section-h { font-family:'DM Serif Display',serif; font-size:clamp(36px,5vw,60px); line-height:1.05; letter-spacing:-0.015em; font-weight:400; margin-bottom:32px; max-width:22ch; }
.lp-v5 .section-h em { font-style:italic; color:var(--red); }
.lp-v5 .tier-grid { display:grid; grid-template-columns:1fr; gap:1px; background:var(--rule); border:1px solid var(--rule); margin-top:48px; }
@media (min-width:768px) { .lp-v5 .tier-grid { grid-template-columns:repeat(2,1fr); } }
@media (min-width:1024px) { .lp-v5 .tier-grid { grid-template-columns:repeat(4,1fr); } }
.lp-v5 .tier { background:var(--bg); padding:32px 24px; transition:background 0.2s; position:relative; }
.lp-v5 .tier:hover { background:var(--bg-2); }
.lp-v5 .tier.featured { background:var(--bg-2); border-top:3px solid var(--red); }
.lp-v5 .tier-id { font-size:10px; letter-spacing:0.24em; color:var(--red); text-transform:uppercase; margin-bottom:8px; }
.lp-v5 .tier-name { font-family:'DM Serif Display',serif; font-size:28px; font-weight:400; line-height:1.1; margin-bottom:4px; }
.lp-v5 .tier-meta { font-size:12px; color:var(--cream-2); opacity:0.65; letter-spacing:0.04em; margin-bottom:20px; }
.lp-v5 .tier-price { font-family:'DM Serif Display',serif; font-size:40px; line-height:1; margin-bottom:4px; }
.lp-v5 .tier-price small { display:block; font-family:'Inter',sans-serif; font-size:12px; color:var(--red); margin-top:6px; font-weight:500; letter-spacing:0.04em; }
.lp-v5 .tier-feat { list-style:none; margin:0; padding:24px 0 0; padding-top:20px; border-top:1px solid var(--rule); }
.lp-v5 .tier-feat li { font-size:13px; padding:6px 0; color:var(--cream-2); display:flex; gap:8px; }
.lp-v5 .tier-feat li::before { content:'+'; color:var(--red); font-weight:700; }
.lp-v5 .founder-strip { display:grid; grid-template-columns:1fr; gap:32px; align-items:center; }
@media (min-width:768px) { .lp-v5 .founder-strip { grid-template-columns:5fr 7fr; gap:56px; } }
.lp-v5 .founder-img-wrap { aspect-ratio:4/5; overflow:hidden; border:1px solid var(--rule); position:relative; }
.lp-v5 .founder-img-wrap img { width:100%; height:100%; object-fit:cover; filter:brightness(0.85) contrast(1.05) saturate(0.9); }
.lp-v5 .founder-img-wrap::after { content:'— Waseem · 2026'; position:absolute; bottom:12px; left:16px; font-size:11px; color:var(--cream); letter-spacing:0.12em; }
.lp-v5 .founder-body h3 { font-family:'DM Serif Display',serif; font-weight:400; font-size:clamp(28px,4vw,40px); line-height:1.1; letter-spacing:-0.015em; margin-bottom:20px; }
.lp-v5 .founder-body h3 em { font-style:italic; color:var(--red); }
.lp-v5 .founder-body p { font-size:16px; color:var(--cream-2); line-height:1.65; margin-bottom:16px; max-width:58ch; }
.lp-v5 .founder-body strong { color:var(--cream); font-weight:600; }
.lp-v5 .builds-grid { display:grid; grid-template-columns:1fr; gap:24px; margin-top:48px; }
@media (min-width:768px) { .lp-v5 .builds-grid { grid-template-columns:repeat(3,1fr); } }
.lp-v5 .build { padding:24px; border:1px solid var(--rule); transition:border-color 0.2s,transform 0.2s; }
.lp-v5 .build:hover { border-color:var(--red); transform:translateY(-2px); }
.lp-v5 .build-meta { font-size:10px; letter-spacing:0.24em; color:var(--red); text-transform:uppercase; margin-bottom:8px; }
.lp-v5 .build h4 { font-family:'DM Serif Display',serif; font-size:22px; font-weight:400; line-height:1.1; margin-bottom:6px; }
.lp-v5 .build p { font-size:14px; color:var(--cream-2); line-height:1.55; }
.lp-v5 details.faq { border-top:1px solid var(--rule); padding:24px 0; }
.lp-v5 details.faq:last-of-type { border-bottom:1px solid var(--rule); }
.lp-v5 details.faq summary { list-style:none; font-family:'DM Serif Display',serif; font-size:22px; font-weight:400; display:flex; justify-content:space-between; align-items:center; gap:16px; cursor:pointer; }
.lp-v5 details.faq summary::-webkit-details-marker { display:none; }
.lp-v5 details.faq summary::after { content:'+'; color:var(--red); font-family:'DM Serif Display',serif; font-size:28px; line-height:0.8; }
.lp-v5 details.faq[open] summary::after { content:'−'; }
.lp-v5 details.faq p { margin-top:14px; font-size:15px; color:var(--cream-2); line-height:1.7; max-width:70ch; }
.lp-v5 .closer { padding:112px 24px; text-align:center; background:radial-gradient(circle at 50% 30%,rgba(214,40,40,0.12) 0%,transparent 50%); border-top:1px solid var(--rule); }
.lp-v5 .closer h2 { font-family:'DM Serif Display',serif; font-size:clamp(36px,6vw,76px); line-height:1.05; font-weight:400; margin-bottom:24px; max-width:18ch; margin-left:auto; margin-right:auto; letter-spacing:-0.02em; }
.lp-v5 .closer h2 em { font-style:italic; color:var(--red); }
.lp-v5 .closer p { color:var(--cream-2); opacity:0.8; max-width:48ch; margin:0 auto 36px; font-size:17px; line-height:1.55; }
.lp-v5 footer.lp { padding:48px 24px 32px; border-top:1px solid var(--rule); font-size:12px; color:var(--cream-2); opacity:0.7; line-height:1.7; }
.lp-v5 footer.lp .inner { max-width:1280px; margin:0 auto; display:grid; gap:24px; grid-template-columns:1fr; }
@media (min-width:768px) { .lp-v5 footer.lp .inner { grid-template-columns:2fr 1fr 1fr 1fr; } }
.lp-v5 footer.lp h5 { font-family:'DM Serif Display',serif; font-style:italic; color:var(--red); font-size:14px; font-weight:400; margin-bottom:10px; }
.lp-v5 footer.lp a { display:block; padding:3px 0; color:var(--cream-2); }
.lp-v5 footer.lp a:hover { color:var(--red); }
.lp-v5 .disclaimer { max-width:1280px; margin:32px auto 0; padding-top:24px; border-top:1px solid var(--rule); font-size:10px; letter-spacing:0.02em; line-height:1.7; }
.lp-v5 .wa-sticky { position:fixed; bottom:24px; right:24px; z-index:60; background:var(--red); color:var(--cream); font-size:12px; font-weight:600; letter-spacing:0.08em; padding:14px 20px; text-transform:uppercase; box-shadow:0 12px 28px rgba(214,40,40,0.4); display:inline-flex; align-items:center; gap:8px; transition:transform 0.2s; }
.lp-v5 .wa-sticky:hover { transform:translateY(-3px); }
.lp-v5 .wa-sticky svg { width:16px; height:16px; fill:currentColor; }
`;

const WA_ICON = "M17.5 14c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.1-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.7-.9-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 2 .6 3.9 1.7 5.5L2 22l4.6-1.2c1.5.8 3.3 1.3 5.4 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2z";

export default function V5Cinematic() {
  return (
    <div className="lp-v5">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <nav className="nav">
        <a href="#" className="brand">Skynet<span>Labs</span></a>
        <a href="https://cal.com/skynetjoe/audit" className="nav-cta">Book audit</a>
      </nav>

      <main>
        <section className="hero hero-letterbox">
          <div className="hero-bg"></div>
          <div className="hero-content">
            <div className="hero-eyebrow">90 Seconds · 12-Truck Teardown · Live</div>
            <h1>Watch me teardown<br />a <em>12-truck stack</em><br />in 90 seconds.</h1>
            <p className="hero-sub">Six broken tools, eight hundred a month, none of them talking. I rebuild the lot — site, dispatch, AI voice agent — in 14 days. Public pricing. Source-controlled.</p>
            <div className="hero-cta-row">
              <a href="#video" className="btn btn-red">▶ Watch the teardown</a>
              <a href="https://cal.com/skynetjoe/audit" className="btn btn-line">Book free audit</a>
            </div>
          </div>
          <div className="hero-scroll">Scroll</div>
        </section>

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

        <section className="clips-section">
          <div className="clips-grid">
            <div className="clip"><div className="clip-bg"></div><div className="clip-overlay"><span className="clip-num">I.</span><span className="clip-duration">0:30</span><span className="clip-play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg></span><div><div className="clip-label">Dispatch chaos</div><h3>The six-tab tax</h3><p>DAT + Truckstop + QB + ELD + sheet + WA — none talk.</p></div></div></div>
            <div className="clip"><div className="clip-bg"></div><div className="clip-overlay"><span className="clip-num">II.</span><span className="clip-duration">0:45</span><span className="clip-play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg></span><div><div className="clip-label">WhatsApp chaos</div><h3>The broker that never stops</h3><p>2am calls, missed RC, reassigned loads by 6am.</p></div></div></div>
            <div className="clip"><div className="clip-bg"></div><div className="clip-overlay"><span className="clip-num">III.</span><span className="clip-duration">1:00</span><span className="clip-play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg></span><div><div className="clip-label">AI demo</div><h3>Voice agent picks up at 2am</h3><p>Qualifies, books, populates pipeline before sunrise.</p></div></div></div>
          </div>
        </section>

        <section className="section">
          <div className="section-inner">
            <div className="section-kicker">The Wedge</div>
            <h2 className="section-h">One operator. One stack.<br /><em>One roof.</em></h2>
            <p style={{ fontSize: 18, color: "var(--cream-2)", lineHeight: 1.65, maxWidth: "62ch" }}>SkynetLabs is the only category-of-one in this segment that ships marketing site + dispatch dashboard + AI voice agent in a single 14-day cycle, billed at one transparent price. Agencies build brand, not software. Dev shops build software, not brand. Nobody else does all three for $1,497–$9,500 with public pricing visible.</p>

            <div className="tier-grid">
              <div className="tier"><div className="tier-id">T01</div><div className="tier-name">Starter</div><div className="tier-meta">14d · site + CRM + WA</div><div className="tier-price">$1,497<small>flat · no monthly</small></div><ul className="tier-feat"><li>5-page premium site</li><li>GHL CRM + pipelines</li><li>WhatsApp Business inbox</li><li>Meta Pixel + CAPI</li><li>2 revision rounds</li></ul></div>
              <div className="tier"><div className="tier-id">T02</div><div className="tier-name">Pro</div><div className="tier-meta">21d · + dispatch + factoring</div><div className="tier-price">$3,997<small>+ $497/mo</small></div><ul className="tier-feat"><li>Everything in Starter</li><li>Custom dispatch dashboard</li><li>TBS / OTR factoring</li><li>SMS automation</li><li>Monthly opt call</li></ul></div>
              <div className="tier featured"><div className="tier-id">T03 · MOST LAND HERE</div><div className="tier-name">Premium</div><div className="tier-meta">30d · + ad ops + lead gen</div><div className="tier-price">$7,997<small>+ $997/mo</small></div><ul className="tier-feat"><li>Everything in Pro</li><li>Meta + LinkedIn ad build</li><li>Lead gen ops</li><li>Monthly UGC batch</li><li>Weekly review</li></ul></div>
              <div className="tier"><div className="tier-id">T04</div><div className="tier-name">Flagship</div><div className="tier-meta">45d · AI Dispatcher Agent™</div><div className="tier-price">$9,500<small>+ $1,997/mo</small></div><ul className="tier-feat"><li>Everything in Premium</li><li>Vapi / Retell voice agent</li><li>Inbound load qualification</li><li>24/7 phone coverage</li></ul></div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-inner founder-strip">
            <figure className="founder-img-wrap"><img src="/lp/freight/v5/lifestyle.jpg" alt="Waseem Nasir, founder, garden workspace" loading="lazy" /></figure>
            <div className="founder-body">
              <div className="section-kicker">The Operator</div>
              <h3>Yes solo. Yes Bali. <em>Here&apos;s why that&apos;s your edge.</em></h3>
              <p>I&apos;m <strong>Waseem Nasir</strong>. I run SkynetLabs from Crate Cafe in Canggu, Bali (visa-flexible) and Liberty Market in Lahore. <strong>One operator + Claude as second seat</strong> — no account managers, no creative directors, no $400/hr T&amp;M billing.</p>
              <p>The 90-second teardown above was recorded in one take. Reason I can ship that fast is the reason your 12-truck operation will benefit from working with me: zero hand-offs, zero meetings between people who aren&apos;t the builder, zero stakeholders who don&apos;t know the codebase.</p>
              <p>Named clients: <strong>Vow Sanctuary</strong> (Asheville NC), <strong>Wellness DNA</strong>, <strong>GutReno</strong>, <strong>Pretty Potty</strong>, <strong>TimeLapse Renovation</strong>, <strong>SkynetJoe</strong>. Every one owns their GitHub repo and n8n workflows the day I hand off.</p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-inner">
            <div className="section-kicker">Named Builds</div>
            <h2 className="section-h">Shipped, named, <em>still running.</em></h2>
            <div className="builds-grid">
              <article className="build"><div className="build-meta">Wellness · Asheville NC</div><h4>Vow Sanctuary</h4><p>Next.js flagship. Lighthouse 98. 3-day ship. $7K MRR pipeline within 30 days.</p></article>
              <article className="build"><div className="build-meta">DTC · multi-region</div><h4>Wellness DNA</h4><p>Shopify + n8n + WhatsApp post-purchase flow. 28% LTV lift in 90 days.</p></article>
              <article className="build"><div className="build-meta">Functional medicine · USA</div><h4>GutReno</h4><p>WordPress + GHL funnel. 12% landing→consult. $4K/mo lead value.</p></article>
              <article className="build"><div className="build-meta">Home services · USA</div><h4>Pretty Potty</h4><p>Lead-gen + GHL + SMS reminders. 4× booked-consult rate.</p></article>
              <article className="build"><div className="build-meta">Construction · USA</div><h4>TimeLapse Renovation</h4><p>Custom progress tracker + portal. Replaces 3 paid SaaS tools.</p></article>
              <article className="build"><div className="build-meta">Open source · GitHub</div><h4>SkynetJoe theme</h4><p>The premium WP theme this stack evolved from. Public, MIT-licensed.</p></article>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-inner">
            <div className="section-kicker">Questions Operators Ask First</div>
            <h2 className="section-h">No, you&apos;re not <em>too small.</em></h2>
            <details className="faq"><summary>I only have 5 trucks. Overkill?</summary><p>Starter ($1,497) is for 5–10. Site + CRM + WhatsApp in 14 days. Cancel anytime, walk with the build.</p></details>
            <details className="faq"><summary>FMCSA / TCPA compliance?</summary><p>SkynetLabs provides software, design, marketing services. Not a freight broker or motor carrier. All voice flows inbound-only, TCPA-compliant consent.</p></details>
            <details className="faq"><summary>Why Bali?</summary><p>Time zone arbitrage. While you sleep, I ship. Your dispatcher takes calls US hours, I&apos;m on WhatsApp evenings + weekends.</p></details>
            <details className="faq"><summary>Burned $20K with an agency before.</summary><p>Public pricing fixes that. 14-day ship fixes that. Source-controlled hand-off fixes that. Miss window, you keep what&apos;s built, re-scope free.</p></details>
            <details className="faq"><summary>What&apos;s the audit?</summary><p>15 min on Cal.com. Review stack, flag 2–3 biggest gaps, recommend yes/no/referral. No commitment.</p></details>
          </div>
        </section>

        <section className="closer">
          <h2>Watched the video.<br /><em>Now book the call.</em></h2>
          <p>Four slots per month. Two left for June 2026. Eight-hour reply on weekday Bali time. Yes, no, or referral. Audit is free.</p>
          <div className="hero-cta-row">
            <a href="https://cal.com/skynetjoe/audit" className="btn btn-red">Book free audit →</a>
            <a href="https://wa.me/923001001957?text=COMMAND" className="btn btn-line">WhatsApp &quot;Command&quot;</a>
          </div>
        </section>

        <footer className="lp">
          <div className="inner">
            <div><h5>SkynetLabs</h5><p>One operator. One stack. One roof.<br />Waseem Nasir · Canggu, Bali · Lahore, Pakistan.</p></div>
            <div><h5>Pages</h5><a href="/services">Services</a><a href="/portfolio">Work</a><a href="/pricing">Pricing</a></div>
            <div><h5>Reach</h5><a href="https://cal.com/skynetjoe/audit">Book audit</a><a href="https://wa.me/923001001957?text=COMMAND">WhatsApp</a><a href="mailto:waseem@skynetjoe.com">Email</a></div>
            <div><h5>Elsewhere</h5><a href="https://www.linkedin.com/in/waseemnasir2k26">LinkedIn</a><a href="https://github.com/waseemnasir2k26">GitHub</a><a href="https://youtube.com/@skynetlabs">YouTube</a></div>
          </div>
          <p className="disclaimer">SkynetLabs provides software, design, and marketing services. Not a freight broker or motor carrier. No FMCSA authority. Software demos are inbound-only and require user consent (TCPA-compliant). Reference 49 CFR 371 governs broker authority and is not implicated by services described herein. Public pricing reflects standard scope as of 2026-06-01 and may vary by custom requirements. © 2026 SkynetLabs · Waseem Nasir.</p>
        </footer>
      </main>

      <a href="https://wa.me/923001001957?text=COMMAND" className="wa-sticky">
        <svg viewBox="0 0 24 24"><path d={WA_ICON} /></svg>WA
      </a>
    </div>
  );
}
