import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Freight ops, on a single bill — SkynetLabs",
  description:
    "Bold premium SaaS LP for small-fleet carriers. AI dispatch, factoring widget, CRM. 14-day ship. Public pricing, no retainer trap.",
  alternates: { canonical: "/lp/logistics-v2-gradient" },
  robots: { index: false, follow: false },
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700&display=swap');
.lp-log-v2 { --bg:#0a0612; --ink:#fdf8ff; --ink-2:rgba(253,248,255,0.72); --grad-a:#a855f7; --grad-b:#ec4899; --grad-c:#fb923c; --border:rgba(255,255,255,0.12); --rule:rgba(255,255,255,0.07); background:var(--bg); color:var(--ink); font-family:'Manrope',system-ui,sans-serif; min-height:100vh; overflow-x:hidden; }
.lp-log-v2 *,.lp-log-v2 *::before,.lp-log-v2 *::after { box-sizing:border-box; }
.lp-log-v2 a { color:inherit; text-decoration:none; }
.lp-log-v2 .wrap { max-width:1180px; margin:0 auto; padding:0 24px; position:relative; }
.lp-log-v2 ::selection { background:var(--grad-b); color:#fff; }

.lp-log-v2 .ribbon { background:linear-gradient(90deg,var(--grad-a),var(--grad-b),var(--grad-c)); color:#0a0612; font-weight:600; padding:9px 24px; text-align:center; font-size:12px; letter-spacing:0.04em; }

.lp-log-v2 .nav { padding:20px 0; position:sticky; top:0; z-index:50; background:rgba(10,6,18,0.78); backdrop-filter:blur(18px); border-bottom:1px solid var(--border); }
.lp-log-v2 .nav-inner { display:flex; align-items:center; justify-content:space-between; max-width:1180px; margin:0 auto; padding:0 24px; }
.lp-log-v2 .brand { font-family:'Sora',sans-serif; font-weight:700; font-size:20px; letter-spacing:-0.02em; }
.lp-log-v2 .brand em { background:linear-gradient(90deg,var(--grad-a),var(--grad-c)); -webkit-background-clip:text; background-clip:text; color:transparent; font-style:normal; }
.lp-log-v2 .nav-cta { font-family:'Sora',sans-serif; font-size:13px; font-weight:600; padding:10px 18px; background:#fdf8ff; color:#0a0612; border-radius:24px; transition:transform 0.18s; }
.lp-log-v2 .nav-cta:hover { transform:translateY(-1px); }

.lp-log-v2 .hero { padding:96px 0 80px; text-align:center; position:relative; overflow:hidden; }
.lp-log-v2 .hero::before { content:''; position:absolute; top:-200px; left:50%; transform:translateX(-50%); width:1100px; height:900px; background:radial-gradient(ellipse at center,rgba(168,85,247,0.4) 0%,rgba(236,72,153,0.28) 30%,rgba(251,146,60,0.16) 50%,transparent 70%); pointer-events:none; z-index:0; }
.lp-log-v2 .hero-inner { position:relative; z-index:1; }
.lp-log-v2 .hero-kicker { display:inline-block; font-family:'Sora',sans-serif; font-size:12px; font-weight:600; letter-spacing:0.18em; text-transform:uppercase; padding:8px 16px; background:rgba(253,248,255,0.08); border:1px solid var(--border); border-radius:24px; margin-bottom:32px; backdrop-filter:blur(10px); }
.lp-log-v2 .hero-kicker span { background:linear-gradient(90deg,var(--grad-a),var(--grad-c)); -webkit-background-clip:text; background-clip:text; color:transparent; }
.lp-log-v2 h1 { font-family:'Sora',sans-serif; font-weight:700; font-size:clamp(44px,7vw,84px); line-height:1.02; letter-spacing:-0.035em; margin:0 auto 26px; max-width:18ch; }
.lp-log-v2 h1 em { background:linear-gradient(120deg,var(--grad-a) 0%,var(--grad-b) 50%,var(--grad-c) 100%); -webkit-background-clip:text; background-clip:text; color:transparent; font-style:normal; }
.lp-log-v2 .hero-sub { font-size:20px; line-height:1.5; color:var(--ink-2); max-width:60ch; margin:0 auto 40px; }
.lp-log-v2 .cta-row { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; align-items:center; margin-bottom:48px; }
.lp-log-v2 .btn-primary { font-family:'Sora',sans-serif; font-size:16px; font-weight:600; padding:18px 32px; background:linear-gradient(135deg,var(--grad-a),var(--grad-b) 60%,var(--grad-c)); color:#fff; border-radius:48px; display:inline-flex; align-items:center; gap:10px; transition:transform 0.18s,box-shadow 0.18s; box-shadow:0 16px 48px rgba(236,72,153,0.32); }
.lp-log-v2 .btn-primary:hover { transform:translateY(-3px); box-shadow:0 22px 64px rgba(236,72,153,0.48); }
.lp-log-v2 .btn-link { font-family:'Sora',sans-serif; font-size:14px; font-weight:500; color:var(--ink-2); border-bottom:1px solid var(--border); padding-bottom:2px; transition:color 0.18s,border-color 0.18s; }
.lp-log-v2 .btn-link:hover { color:var(--ink); border-color:var(--ink); }

.lp-log-v2 .trust-strip { display:flex; gap:36px; justify-content:center; flex-wrap:wrap; padding:24px 0; opacity:0.8; }
.lp-log-v2 .trust-pill { font-family:'Sora',sans-serif; font-size:13px; font-weight:600; letter-spacing:0.04em; color:var(--ink-2); padding:8px 14px; border:1px solid var(--rule); border-radius:18px; }
.lp-log-v2 .trust-pill strong { background:linear-gradient(90deg,var(--grad-a),var(--grad-c)); -webkit-background-clip:text; background-clip:text; color:transparent; }

.lp-log-v2 .counter-row { display:grid; grid-template-columns:repeat(2,1fr); gap:24px; max-width:880px; margin:64px auto 0; }
@media (min-width:768px) { .lp-log-v2 .counter-row { grid-template-columns:repeat(4,1fr); } }
.lp-log-v2 .counter { text-align:center; padding:28px 16px; border:1px solid var(--border); border-radius:18px; background:linear-gradient(180deg,rgba(168,85,247,0.07),rgba(255,255,255,0.02)); position:relative; }
.lp-log-v2 .counter .num { font-family:'Sora',sans-serif; font-size:44px; font-weight:700; letter-spacing:-0.025em; background:linear-gradient(135deg,var(--grad-a),var(--grad-c)); -webkit-background-clip:text; background-clip:text; color:transparent; }
.lp-log-v2 .counter .lbl { font-size:13px; color:var(--ink-2); margin-top:6px; font-weight:500; }

.lp-log-v2 .section { padding:96px 0; position:relative; }
.lp-log-v2 .section-head { text-align:center; margin-bottom:64px; max-width:780px; margin-left:auto; margin-right:auto; }
.lp-log-v2 .section-kicker { font-family:'Sora',sans-serif; font-size:12px; letter-spacing:0.2em; text-transform:uppercase; margin-bottom:14px; background:linear-gradient(90deg,var(--grad-a),var(--grad-c)); -webkit-background-clip:text; background-clip:text; color:transparent; font-weight:600; }
.lp-log-v2 h2 { font-family:'Sora',sans-serif; font-weight:700; font-size:clamp(32px,5vw,56px); line-height:1.05; letter-spacing:-0.03em; margin:0 0 18px; }
.lp-log-v2 .section-sub { font-size:18px; line-height:1.55; color:var(--ink-2); }

.lp-log-v2 .pain-grid { display:grid; grid-template-columns:1fr; gap:20px; max-width:980px; margin:0 auto; }
@media (min-width:768px) { .lp-log-v2 .pain-grid { grid-template-columns:repeat(3,1fr); } }
.lp-log-v2 .pain-card { padding:32px 24px; border:1px solid var(--border); border-radius:20px; background:rgba(255,255,255,0.025); text-align:center; }
.lp-log-v2 .pain-stat { font-family:'Sora',sans-serif; font-size:54px; font-weight:700; letter-spacing:-0.03em; background:linear-gradient(135deg,var(--grad-a),var(--grad-b),var(--grad-c)); -webkit-background-clip:text; background-clip:text; color:transparent; line-height:1; margin-bottom:14px; }
.lp-log-v2 .pain-line { font-size:15px; color:var(--ink); font-weight:500; line-height:1.45; }
.lp-log-v2 .pain-src { font-size:11px; color:var(--ink-2); margin-top:10px; letter-spacing:0.04em; }

.lp-log-v2 .feature-grid { display:grid; grid-template-columns:1fr; gap:20px; }
@media (min-width:768px) { .lp-log-v2 .feature-grid { grid-template-columns:repeat(2,1fr); } }
.lp-log-v2 .feat-card { padding:36px 32px; border:1px solid var(--border); border-radius:24px; background:linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01)); transition:transform 0.22s,border-color 0.22s; position:relative; overflow:hidden; }
.lp-log-v2 .feat-card::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,var(--grad-a),var(--grad-b),var(--grad-c)); opacity:0; transition:opacity 0.22s; }
.lp-log-v2 .feat-card:hover { transform:translateY(-4px); border-color:var(--grad-b); }
.lp-log-v2 .feat-card:hover::before { opacity:1; }
.lp-log-v2 .feat-num { font-family:'Sora',sans-serif; font-size:12px; font-weight:600; letter-spacing:0.16em; background:linear-gradient(90deg,var(--grad-a),var(--grad-c)); -webkit-background-clip:text; background-clip:text; color:transparent; margin-bottom:14px; }
.lp-log-v2 .feat-title { font-family:'Sora',sans-serif; font-size:24px; font-weight:600; letter-spacing:-0.015em; margin-bottom:12px; }
.lp-log-v2 .feat-body { font-size:15px; line-height:1.6; color:var(--ink-2); }

.lp-log-v2 .testi-grid { display:grid; grid-template-columns:1fr; gap:24px; max-width:1000px; margin:0 auto; }
@media (min-width:768px) { .lp-log-v2 .testi-grid { grid-template-columns:repeat(2,1fr); } }
.lp-log-v2 .testi-card { padding:36px; border:1px solid var(--border); border-radius:24px; background:linear-gradient(160deg,rgba(168,85,247,0.06),rgba(251,146,60,0.04)); }
.lp-log-v2 .testi-quote { font-family:'Sora',sans-serif; font-size:20px; line-height:1.5; color:var(--ink); margin-bottom:24px; font-weight:500; letter-spacing:-0.01em; }
.lp-log-v2 .testi-meta { display:flex; align-items:center; gap:14px; padding-top:18px; border-top:1px solid var(--rule); }
.lp-log-v2 .testi-avatar { width:48px; height:48px; border-radius:50%; background:linear-gradient(135deg,var(--grad-a),var(--grad-c)); display:flex; align-items:center; justify-content:center; font-family:'Sora',sans-serif; font-weight:700; color:#fff; font-size:17px; }
.lp-log-v2 .testi-name { font-family:'Sora',sans-serif; font-weight:600; font-size:15px; }
.lp-log-v2 .testi-role { font-size:12px; color:var(--ink-2); margin-top:2px; }

.lp-log-v2 .pricing-grid { display:grid; grid-template-columns:1fr; gap:18px; }
@media (min-width:768px) { .lp-log-v2 .pricing-grid { grid-template-columns:repeat(2,1fr); } }
@media (min-width:1100px) { .lp-log-v2 .pricing-grid { grid-template-columns:repeat(4,1fr); } }
.lp-log-v2 .price-card { padding:32px 26px; border:1px solid var(--border); border-radius:24px; background:rgba(255,255,255,0.02); transition:transform 0.22s; }
.lp-log-v2 .price-card.featured { background:linear-gradient(160deg,rgba(168,85,247,0.18),rgba(236,72,153,0.14) 60%,rgba(251,146,60,0.1)); border-color:transparent; box-shadow:0 0 0 1px rgba(236,72,153,0.4),0 20px 56px rgba(168,85,247,0.18); transform:scale(1.02); }
.lp-log-v2 .price-badge { display:inline-block; font-family:'Sora',sans-serif; font-size:11px; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; padding:4px 10px; background:linear-gradient(90deg,var(--grad-a),var(--grad-c)); color:#fff; border-radius:14px; margin-bottom:18px; }
.lp-log-v2 .price-tier { font-family:'Sora',sans-serif; font-size:22px; font-weight:600; letter-spacing:-0.015em; margin-bottom:4px; }
.lp-log-v2 .price-window { font-size:12px; color:var(--ink-2); margin-bottom:22px; letter-spacing:0.03em; }
.lp-log-v2 .price-amount { font-family:'Sora',sans-serif; font-size:42px; font-weight:700; letter-spacing:-0.025em; line-height:1; }
.lp-log-v2 .price-recur { font-size:12px; color:var(--ink-2); margin:6px 0 22px; }
.lp-log-v2 .price-list { list-style:none; padding:0; margin:0 0 26px; font-size:13px; color:var(--ink-2); }
.lp-log-v2 .price-list li { padding:8px 0 8px 20px; position:relative; line-height:1.45; border-bottom:1px solid var(--rule); }
.lp-log-v2 .price-list li:last-child { border-bottom:0; }
.lp-log-v2 .price-list li::before { content:'→'; position:absolute; left:0; top:8px; background:linear-gradient(90deg,var(--grad-a),var(--grad-c)); -webkit-background-clip:text; background-clip:text; color:transparent; font-weight:700; }
.lp-log-v2 .price-cta { display:block; text-align:center; font-family:'Sora',sans-serif; font-size:13px; font-weight:600; padding:12px; border-radius:24px; background:rgba(255,255,255,0.06); border:1px solid var(--border); color:var(--ink); transition:all 0.18s; }
.lp-log-v2 .price-cta:hover { background:linear-gradient(135deg,var(--grad-a),var(--grad-c)); border-color:transparent; color:#fff; }
.lp-log-v2 .price-card.featured .price-cta { background:#fdf8ff; color:#0a0612; border-color:transparent; }
.lp-log-v2 .price-card.featured .price-cta:hover { background:#0a0612; color:#fdf8ff; }

.lp-log-v2 .faq-wrap { max-width:780px; margin:0 auto; }
.lp-log-v2 details { padding:22px 24px; border:1px solid var(--border); border-radius:18px; margin-bottom:12px; background:rgba(255,255,255,0.02); }
.lp-log-v2 details[open] { border-color:var(--grad-b); background:rgba(236,72,153,0.05); }
.lp-log-v2 summary { font-family:'Sora',sans-serif; font-weight:600; font-size:16px; cursor:pointer; list-style:none; display:flex; justify-content:space-between; align-items:center; letter-spacing:-0.005em; }
.lp-log-v2 summary::-webkit-details-marker { display:none; }
.lp-log-v2 summary::after { content:'+'; font-size:24px; transition:transform 0.18s; background:linear-gradient(90deg,var(--grad-a),var(--grad-c)); -webkit-background-clip:text; background-clip:text; color:transparent; }
.lp-log-v2 details[open] summary::after { transform:rotate(45deg); }
.lp-log-v2 details p { margin:14px 0 0; color:var(--ink-2); font-size:14px; line-height:1.65; }

.lp-log-v2 .scarcity-band { background:linear-gradient(90deg,var(--grad-a),var(--grad-b),var(--grad-c)); padding:24px; text-align:center; }
.lp-log-v2 .scarcity-band p { margin:0; font-family:'Sora',sans-serif; font-size:16px; color:#0a0612; font-weight:600; letter-spacing:0.01em; }

.lp-log-v2 .closer { padding:140px 0; text-align:center; position:relative; overflow:hidden; }
.lp-log-v2 .closer::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at center,rgba(168,85,247,0.16),transparent 60%); pointer-events:none; }
.lp-log-v2 .closer h2 { font-size:clamp(40px,6vw,72px); margin:0 auto 24px; max-width:18ch; position:relative; z-index:1; }
.lp-log-v2 .closer h2 em { background:linear-gradient(135deg,var(--grad-a),var(--grad-b),var(--grad-c)); -webkit-background-clip:text; background-clip:text; color:transparent; font-style:normal; }
.lp-log-v2 .closer p { font-size:18px; color:var(--ink-2); max-width:56ch; margin:0 auto 40px; line-height:1.5; position:relative; z-index:1; }

.lp-log-v2 .lp-footer { padding:48px 0 32px; border-top:1px solid var(--border); }
.lp-log-v2 .lp-footer .grid { display:grid; gap:24px; grid-template-columns:1fr; }
@media (min-width:768px) { .lp-log-v2 .lp-footer .grid { grid-template-columns:2fr 1fr 1fr; } }
.lp-log-v2 .lp-footer h5 { font-family:'Sora',sans-serif; font-size:13px; margin:0 0 12px; font-weight:600; background:linear-gradient(90deg,var(--grad-a),var(--grad-c)); -webkit-background-clip:text; background-clip:text; color:transparent; }
.lp-log-v2 .lp-footer a { display:block; padding:3px 0; color:var(--ink-2); font-size:13px; }
.lp-log-v2 .lp-footer a:hover { color:var(--ink); }
.lp-log-v2 .disclaimer { margin-top:32px; padding-top:24px; border-top:1px solid var(--rule); font-size:11px; line-height:1.7; color:var(--ink-2); max-width:88ch; }
`;

export default function LogisticsV2Gradient() {
  return (
    <div className="lp-log-v2">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div className="ribbon">June dispatch cohort · 2 of 4 slots left · close 2026-06-15</div>

      <header className="nav">
        <div className="nav-inner">
          <a href="#" className="brand">Skynet<em>Labs</em></a>
          <a href="/discovery-call" className="nav-cta">Book discovery call</a>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="wrap">
            <div className="hero-inner">
              <div className="hero-kicker">Now booking · <span>June 2026 cohort</span></div>
              <h1>Built for fleets that <em>refuse to lose</em> another midnight load.</h1>
              <p className="hero-sub">SkynetLabs builds the AI dispatch stack for 5–25 truck small-fleet operators. Voice agent, factoring widget, GHL CRM, public pricing, 14-day ship. One operator, one bill, no retainer trap.</p>
              <div className="cta-row">
                <a href="/discovery-call" className="btn-primary">Book a 15-min discovery call →</a>
                <a href="/portfolio" className="btn-link">See live client builds</a>
              </div>

              <div className="trust-strip">
                <div className="trust-pill"><strong>Vow Sanctuary</strong> · Asheville NC</div>
                <div className="trust-pill"><strong>GutReno</strong> · Functional Med</div>
                <div className="trust-pill"><strong>Wellness DNA</strong> · DTC Shopify</div>
                <div className="trust-pill"><strong>Pretty Potty</strong> · Lead-gen ops</div>
              </div>

              <div className="counter-row">
                <div className="counter"><div className="num">14</div><div className="lbl">day ship window</div></div>
                <div className="counter"><div className="num">8.2s</div><div className="lbl">qualify time</div></div>
                <div className="counter"><div className="num">$847</div><div className="lbl">SaaS cost saved/mo</div></div>
                <div className="counter"><div className="num">9/9</div><div className="lbl">repos live + owned</div></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-head">
              <div className="section-kicker">The problem</div>
              <h2>You don&apos;t need <em>another</em> SaaS subscription. You need one operator who fits them together.</h2>
              <p className="section-sub">Small-fleet operators run six paid tools, none of which talk. Dispatchers are the integration layer — and they cost more than the software.</p>
            </div>
            <div className="pain-grid">
              <div className="pain-card">
                <div className="pain-stat">31%</div>
                <div className="pain-line">of off-hours broker calls go to voicemail when nobody&apos;s manning the phone.</div>
                <div className="pain-src">Source: SkynetLabs audits, Q1 2026</div>
              </div>
              <div className="pain-card">
                <div className="pain-stat">$847</div>
                <div className="pain-line">avg monthly SaaS bill across 6 disconnected dispatch + back-office tools.</div>
                <div className="pain-src">Source: 5–12 truck operators</div>
              </div>
              <div className="pain-card">
                <div className="pain-stat">17 days</div>
                <div className="pain-line">avg invoice → factoring → cash when the widgets aren&apos;t wired.</div>
                <div className="pain-src">Source: SkynetLabs ops research</div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-head">
              <div className="section-kicker">The solution</div>
              <h2>One operator. One stack. <em>Yours to keep.</em></h2>
              <p className="section-sub">Every module ships in your GitHub repo. Every retainer is opt-out. Every Loom walkthrough sent by the actual founder.</p>
            </div>
            <div className="feature-grid">
              <div className="feat-card">
                <div className="feat-num">01 / VOICE</div>
                <div className="feat-title">Vapi AI dispatcher agent</div>
                <div className="feat-body">Inbound load calls qualified in eight seconds. Route, rate, contact, notes pushed to GHL. 24/7 phone coverage without a graveyard-shift dispatcher.</div>
              </div>
              <div className="feat-card">
                <div className="feat-num">02 / OPS</div>
                <div className="feat-title">Live dispatch dashboard</div>
                <div className="feat-body">DAT feed + your truck inventory + repeat-broker pipeline + factoring activity on one screen. Tabs replaced with focus.</div>
              </div>
              <div className="feat-card">
                <div className="feat-num">03 / CASH</div>
                <div className="feat-title">Factoring widget</div>
                <div className="feat-body">Triumph, Apex, RTS direct integration. Same-day settlement on qualifying loads. Fee-aware ranking, auto invoice attach.</div>
              </div>
              <div className="feat-card">
                <div className="feat-num">04 / FUNNEL</div>
                <div className="feat-title">Ad ops + lead-gen</div>
                <div className="feat-body">Meta + LinkedIn campaigns wired to GHL pipeline. SMS auto-confirms, public driver portal, monthly content batch.</div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-head">
              <div className="section-kicker">Operators on the stack</div>
              <h2>Named clients. <em>Real testimonials.</em></h2>
            </div>
            <div className="testi-grid">
              <div className="testi-card">
                <p className="testi-quote">&quot;I get more done in eight hours than my last agency got done in eight weeks. He sends Loom walkthroughs at 3 am his time. That&apos;s the actual founder, not a project manager.&quot;</p>
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

        <section className="section">
          <div className="wrap">
            <div className="section-head">
              <div className="section-kicker">The menu, public</div>
              <h2>Four tiers. <em>No custom quote theater.</em></h2>
              <p className="section-sub">Half on signature. Half on launch. Walk anytime with what&apos;s built. The audit comes first — pricing matters only if we&apos;re a fit.</p>
            </div>
            <div className="pricing-grid">
              <div className="price-card">
                <div className="price-tier">Starter</div>
                <div className="price-window">14d · site + CRM + inbox</div>
                <div className="price-amount">$1,497</div>
                <div className="price-recur">flat · no retainer</div>
                <ul className="price-list"><li>Five-page premium site</li><li>GHL CRM pipeline</li><li>Inbound contact inbox</li><li>Meta Pixel + CAPI</li></ul>
                <a href="/discovery-call" className="price-cta">Book discovery →</a>
              </div>
              <div className="price-card">
                <div className="price-tier">Pro</div>
                <div className="price-window">21d · + dispatch dash</div>
                <div className="price-amount">$3,997</div>
                <div className="price-recur">+ $497/mo ops</div>
                <ul className="price-list"><li>Everything in Starter</li><li>Dispatch dashboard</li><li>Factoring widget</li><li>SMS auto-confirms</li></ul>
                <a href="/discovery-call" className="price-cta">Book discovery →</a>
              </div>
              <div className="price-card featured">
                <div className="price-badge">Most picked</div>
                <div className="price-tier">Premium</div>
                <div className="price-window">30d · + ad ops + lead gen</div>
                <div className="price-amount">$7,997</div>
                <div className="price-recur">+ $997/mo ops</div>
                <ul className="price-list"><li>Everything in Pro</li><li>Meta + LinkedIn ad ops</li><li>Lead-gen automation</li><li>Monthly content batch</li></ul>
                <a href="/discovery-call" className="price-cta">Book discovery →</a>
              </div>
              <div className="price-card">
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
            <div className="section-head">
              <div className="section-kicker">FAQ</div>
              <h2>Questions, before you book.</h2>
            </div>
            <div className="faq-wrap">
              <details>
                <summary>Are you a freight broker or motor carrier?</summary>
                <p>No. SkynetLabs is a software, design, and marketing studio. We build the dispatch dashboard, voice agent, and CRM that sit alongside your broker authority. No FMCSA filings on our end — that stays with you.</p>
              </details>
              <details>
                <summary>What if I already pay for DAT and a TMS?</summary>
                <p>Better. We integrate them. The dashboard pulls DAT loads, your TMS data, factoring activity, and broker calls into one screen. We don&apos;t replace working tools — we glue them together.</p>
              </details>
              <details>
                <summary>How fast can you actually ship?</summary>
                <p>Starter ships in 14 calendar days from kickoff. Pro 21. Premium 30. Flagship 45. If we miss the window, we work nights and weekends free until live — written into the SOW.</p>
              </details>
              <details>
                <summary>What happens at month 12?</summary>
                <p>You own the GitHub repo, n8n workflows, and GHL subaccount on day one. Cancel the retainer anytime — you keep everything live. We just stop monthly ops.</p>
              </details>
              <details>
                <summary>TCPA-compliance on the voice agent?</summary>
                <p>Yes. Vapi agent is inbound-only by default. Outbound calls require documented opt-in (typed phone + checkbox) per FCC 2024 rulings. We write the compliance flow into your funnel.</p>
              </details>
            </div>
          </div>
        </section>

        <div className="scarcity-band">
          <p>Four operator slots a month · June: 2 of 4 remaining · July books in mid-June</p>
        </div>

        <section className="closer">
          <div className="wrap">
            <h2>Fifteen minutes. <em>One operator.</em><br />Yes, no, or referral.</h2>
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
