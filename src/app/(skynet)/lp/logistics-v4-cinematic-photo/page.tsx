import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "After midnight, the loads don't wait. Neither does the dispatcher. — SkynetLabs",
  description:
    "Cinematic landing for small-fleet operators who lose loads after 8 pm. AI voice intake, 14-day ship, public pricing.",
  alternates: { canonical: "/lp/logistics-v4-cinematic-photo" },
  robots: { index: false, follow: false },
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600;700&display=swap');
.lp-log-v4 { --bg:#08090b; --bg-2:#0e1014; --ink:#ededf0; --ink-2:rgba(237,237,240,0.62); --ink-3:rgba(237,237,240,0.32); --accent:#ff8a3d; --accent-2:#ffb45a; --rule:rgba(237,237,240,0.08); --border:rgba(237,237,240,0.14); background:var(--bg); color:var(--ink); font-family:'Inter',system-ui,sans-serif; min-height:100vh; overflow-x:hidden; }
.lp-log-v4 *,.lp-log-v4 *::before,.lp-log-v4 *::after { box-sizing:border-box; }
.lp-log-v4 a { color:var(--ink); text-decoration:none; }
.lp-log-v4 .wrap { max-width:1180px; margin:0 auto; padding:0 24px; }
.lp-log-v4 ::selection { background:var(--accent); color:var(--bg); }
.lp-log-v4 .serif { font-family:'DM Serif Display',serif; }

.lp-log-v4 .ribbon { background:var(--accent); color:var(--bg); padding:9px 24px; text-align:center; font-size:12px; letter-spacing:0.06em; font-weight:500; }

.lp-log-v4 .nav { padding:18px 0; position:fixed; top:32px; left:0; right:0; z-index:50; background:rgba(8,9,11,0.7); backdrop-filter:blur(16px); border-bottom:1px solid var(--rule); }
.lp-log-v4 .nav-inner { max-width:1180px; margin:0 auto; padding:0 24px; display:flex; align-items:center; justify-content:space-between; }
.lp-log-v4 .brand { font-family:'DM Serif Display',serif; font-size:22px; letter-spacing:-0.01em; }
.lp-log-v4 .brand em { color:var(--accent); font-style:italic; }
.lp-log-v4 .nav-cta { font-size:13px; font-weight:500; padding:9px 18px; background:var(--accent); color:var(--bg); border-radius:0; letter-spacing:0.02em; transition:transform 0.18s; }
.lp-log-v4 .nav-cta:hover { transform:translateY(-1px); background:var(--accent-2); }

.lp-log-v4 .hero { position:relative; min-height:100vh; padding:120px 0 80px; display:flex; flex-direction:column; justify-content:center; overflow:hidden; }
.lp-log-v4 .hero-photo { position:absolute; inset:0; z-index:0; }
.lp-log-v4 .hero-photo img { width:100%; height:100%; object-fit:cover; filter:grayscale(1) contrast(1.08) brightness(0.55); }
.lp-log-v4 .hero-photo::after { content:''; position:absolute; inset:0; background:linear-gradient(180deg,rgba(8,9,11,0.75) 0%,rgba(8,9,11,0.4) 35%,rgba(8,9,11,0.85) 100%),radial-gradient(circle at 70% 30%,rgba(255,138,61,0.18) 0%,transparent 50%); }
.lp-log-v4 .hero-inner { position:relative; z-index:1; text-align:center; padding:0 24px; }
.lp-log-v4 .hero-kicker { display:inline-block; font-size:11px; font-weight:500; letter-spacing:0.32em; text-transform:uppercase; color:var(--accent); margin-bottom:36px; }
.lp-log-v4 .hero-kicker::before { content:'— '; }
.lp-log-v4 .hero-kicker::after { content:' —'; }
.lp-log-v4 h1 { font-family:'DM Serif Display',serif; font-weight:400; font-size:clamp(40px,7vw,100px); line-height:0.98; letter-spacing:-0.025em; margin:0 auto 28px; max-width:18ch; color:var(--ink); }
.lp-log-v4 h1 em { color:var(--accent); font-style:italic; }
.lp-log-v4 .hero-sub { font-size:20px; line-height:1.5; color:var(--ink-2); max-width:48ch; margin:0 auto 44px; font-family:'Inter',sans-serif; font-weight:400; }
.lp-log-v4 .cta-row { display:flex; gap:18px; justify-content:center; flex-wrap:wrap; align-items:center; }
.lp-log-v4 .btn-primary { font-size:14px; font-weight:600; padding:16px 32px; background:var(--accent); color:var(--bg); border-radius:0; letter-spacing:0.06em; text-transform:uppercase; display:inline-flex; align-items:center; gap:10px; transition:background 0.2s,transform 0.2s; }
.lp-log-v4 .btn-primary:hover { background:var(--accent-2); transform:translateY(-2px); }
.lp-log-v4 .btn-link { font-size:13px; font-weight:500; color:var(--ink-2); letter-spacing:0.04em; border-bottom:1px solid var(--ink-3); padding-bottom:3px; }
.lp-log-v4 .btn-link:hover { color:var(--accent); border-color:var(--accent); }
.lp-log-v4 .hero-trust { position:absolute; bottom:36px; left:0; right:0; z-index:1; display:flex; gap:36px; justify-content:center; flex-wrap:wrap; font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:var(--ink-3); }
.lp-log-v4 .hero-trust span strong { color:var(--ink-2); font-weight:500; }

.lp-log-v4 .section { padding:120px 0; position:relative; }
.lp-log-v4 .section-head { max-width:780px; margin-bottom:64px; }
.lp-log-v4 .section-kicker { font-size:11px; letter-spacing:0.32em; text-transform:uppercase; color:var(--accent); margin-bottom:18px; }
.lp-log-v4 h2 { font-family:'DM Serif Display',serif; font-weight:400; font-size:clamp(32px,5vw,60px); line-height:1.02; letter-spacing:-0.02em; margin:0 0 20px; }
.lp-log-v4 h2 em { color:var(--accent); font-style:italic; }
.lp-log-v4 .section-sub { font-size:19px; line-height:1.5; color:var(--ink-2); max-width:56ch; }

.lp-log-v4 .pain-grid { display:grid; grid-template-columns:1fr; gap:1px; background:var(--border); border:1px solid var(--border); }
@media (min-width:768px) { .lp-log-v4 .pain-grid { grid-template-columns:repeat(2,1fr); } }
.lp-log-v4 .pain-cell { padding:48px 36px; background:var(--bg); }
.lp-log-v4 .pain-stat { font-family:'DM Serif Display',serif; font-size:72px; font-style:italic; color:var(--accent); line-height:1; margin-bottom:18px; letter-spacing:-0.02em; }
.lp-log-v4 .pain-line { font-size:18px; color:var(--ink); font-weight:500; line-height:1.45; max-width:36ch; }
.lp-log-v4 .pain-src { font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:var(--ink-3); margin-top:18px; }

.lp-log-v4 .feature-list { display:grid; grid-template-columns:1fr; gap:1px; background:var(--border); border:1px solid var(--border); }
.lp-log-v4 .feat-row { padding:56px 48px; background:var(--bg); display:grid; grid-template-columns:120px 1fr; gap:48px; align-items:start; }
@media (max-width:768px) { .lp-log-v4 .feat-row { grid-template-columns:1fr; gap:18px; padding:40px 24px; } }
.lp-log-v4 .feat-num { font-family:'DM Serif Display',serif; font-style:italic; font-size:64px; color:var(--accent); line-height:1; letter-spacing:-0.02em; }
.lp-log-v4 .feat-title { font-family:'DM Serif Display',serif; font-size:28px; font-weight:400; letter-spacing:-0.015em; margin-bottom:14px; line-height:1.1; }
.lp-log-v4 .feat-body { font-size:16px; line-height:1.6; color:var(--ink-2); max-width:60ch; }

.lp-log-v4 .testi-section { background:var(--bg-2); }
.lp-log-v4 .testi-grid { display:grid; grid-template-columns:1fr; gap:32px; }
@media (min-width:880px) { .lp-log-v4 .testi-grid { grid-template-columns:repeat(2,1fr); } }
.lp-log-v4 .testi-card { padding:48px 40px; background:var(--bg); border:1px solid var(--border); position:relative; }
.lp-log-v4 .testi-card::before { content:'"'; position:absolute; top:-8px; left:24px; font-family:'DM Serif Display',serif; font-size:140px; color:var(--accent); line-height:1; pointer-events:none; }
.lp-log-v4 .testi-quote { font-family:'DM Serif Display',serif; font-style:italic; font-size:22px; line-height:1.4; color:var(--ink); margin-bottom:28px; position:relative; z-index:1; letter-spacing:-0.005em; padding-top:32px; }
.lp-log-v4 .testi-meta { display:flex; align-items:center; gap:14px; padding-top:20px; border-top:1px solid var(--rule); }
.lp-log-v4 .testi-avatar { width:46px; height:46px; border-radius:0; background:var(--accent); color:var(--bg); display:flex; align-items:center; justify-content:center; font-family:'DM Serif Display',serif; font-size:18px; font-weight:400; }
.lp-log-v4 .testi-name { font-weight:600; font-size:15px; }
.lp-log-v4 .testi-role { font-size:12px; letter-spacing:0.06em; color:var(--ink-2); margin-top:2px; }

.lp-log-v4 .pricing-row { display:grid; grid-template-columns:1fr; gap:1px; background:var(--border); border:1px solid var(--border); }
@media (min-width:768px) { .lp-log-v4 .pricing-row { grid-template-columns:repeat(2,1fr); } }
@media (min-width:1100px) { .lp-log-v4 .pricing-row { grid-template-columns:repeat(4,1fr); } }
.lp-log-v4 .price-cell { padding:40px 32px; background:var(--bg); position:relative; }
.lp-log-v4 .price-cell.featured { background:var(--bg-2); border-top:3px solid var(--accent); margin-top:-2px; }
.lp-log-v4 .price-badge { position:absolute; top:0; right:24px; transform:translateY(-50%); font-size:10px; font-weight:600; padding:5px 12px; background:var(--accent); color:var(--bg); letter-spacing:0.16em; text-transform:uppercase; }
.lp-log-v4 .price-tier { font-family:'DM Serif Display',serif; font-size:24px; font-weight:400; letter-spacing:-0.01em; margin-bottom:4px; }
.lp-log-v4 .price-window { font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:var(--ink-3); margin-bottom:24px; }
.lp-log-v4 .price-amount { font-family:'DM Serif Display',serif; font-size:42px; font-weight:400; font-style:italic; color:var(--accent); letter-spacing:-0.02em; line-height:1; }
.lp-log-v4 .price-recur { font-size:12px; color:var(--ink-2); margin:8px 0 22px; }
.lp-log-v4 .price-list { list-style:none; padding:0; margin:0 0 28px; font-size:13px; color:var(--ink-2); }
.lp-log-v4 .price-list li { padding:8px 0; border-bottom:1px solid var(--rule); line-height:1.5; }
.lp-log-v4 .price-list li:last-child { border-bottom:0; }
.lp-log-v4 .price-cta { display:block; text-align:center; font-size:12px; font-weight:600; padding:13px; border:1px solid var(--accent); color:var(--accent); letter-spacing:0.12em; text-transform:uppercase; transition:all 0.18s; }
.lp-log-v4 .price-cta:hover { background:var(--accent); color:var(--bg); }
.lp-log-v4 .price-cell.featured .price-cta { background:var(--accent); color:var(--bg); }
.lp-log-v4 .price-cell.featured .price-cta:hover { background:var(--accent-2); border-color:var(--accent-2); }

.lp-log-v4 .faq-wrap { max-width:820px; margin:0 auto; }
.lp-log-v4 details { padding:28px 0; border-bottom:1px solid var(--border); }
.lp-log-v4 summary { font-family:'DM Serif Display',serif; font-size:22px; cursor:pointer; list-style:none; display:flex; justify-content:space-between; align-items:center; letter-spacing:-0.01em; }
.lp-log-v4 summary::-webkit-details-marker { display:none; }
.lp-log-v4 summary::after { content:'+'; font-size:28px; transition:transform 0.18s; color:var(--accent); font-family:'Inter',sans-serif; font-weight:300; }
.lp-log-v4 details[open] summary::after { transform:rotate(45deg); }
.lp-log-v4 details p { margin:16px 0 0; color:var(--ink-2); font-size:15px; line-height:1.65; max-width:60ch; }

.lp-log-v4 .scarcity-band { background:var(--accent); color:var(--bg); padding:20px; text-align:center; }
.lp-log-v4 .scarcity-band p { margin:0; font-size:14px; font-weight:600; letter-spacing:0.06em; text-transform:uppercase; }

.lp-log-v4 .closer { padding:140px 0; text-align:center; background:var(--bg-2); border-top:1px solid var(--border); border-bottom:1px solid var(--border); }
.lp-log-v4 .closer h2 { font-size:clamp(40px,6vw,72px); margin:0 auto 22px; max-width:18ch; }
.lp-log-v4 .closer p { font-size:18px; color:var(--ink-2); max-width:54ch; margin:0 auto 40px; line-height:1.5; font-family:'Inter',sans-serif; }

.lp-log-v4 .lp-footer { padding:48px 0 32px; background:var(--bg); }
.lp-log-v4 .lp-footer .grid { display:grid; gap:24px; grid-template-columns:1fr; }
@media (min-width:768px) { .lp-log-v4 .lp-footer .grid { grid-template-columns:2fr 1fr 1fr; } }
.lp-log-v4 .lp-footer h5 { font-size:11px; margin:0 0 12px; font-weight:500; letter-spacing:0.24em; text-transform:uppercase; color:var(--accent); }
.lp-log-v4 .lp-footer a { display:block; padding:3px 0; color:var(--ink-2); font-size:13px; }
.lp-log-v4 .lp-footer a:hover { color:var(--accent); }
.lp-log-v4 .disclaimer { margin-top:36px; padding-top:28px; border-top:1px solid var(--rule); font-size:11px; line-height:1.7; color:var(--ink-3); max-width:88ch; }
`;

export default function LogisticsV4Cinematic() {
  return (
    <div className="lp-log-v4">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div className="ribbon">June dispatch cohort · 2 of 4 slots left · close 2026-06-15</div>

      <header className="nav">
        <div className="nav-inner">
          <a href="#" className="brand">Skynet<em>Labs</em></a>
          <a href="/discovery-call" className="nav-cta">Book discovery</a>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-photo">
            <img src="/lp/logistics/v4/hero.jpg" alt="Late-night operations" />
          </div>
          <div className="hero-inner">
            <div className="hero-kicker">For small-fleet operators · 2026</div>
            <h1>After midnight, the loads <em>don&apos;t wait.</em><br/>Neither does the dispatcher.</h1>
            <p className="hero-sub">An AI voice agent that picks up at 2 am. A dispatch canvas that doesn&apos;t need six browser tabs. One operator from Bali who ships in 14 days and hands you the GitHub repo on day one.</p>
            <div className="cta-row">
              <a href="/discovery-call" className="btn-primary">Book a 15-min discovery call →</a>
              <a href="/portfolio" className="btn-link">See live builds</a>
            </div>
          </div>
          <div className="hero-trust">
            <span><strong>Vow Sanctuary</strong> · Asheville</span>
            <span><strong>GutReno</strong> · USA</span>
            <span><strong>Pretty Potty</strong> · USA</span>
            <span><strong>Wellness DNA</strong> · DTC</span>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-head">
              <div className="section-kicker">The cost of waiting</div>
              <h2>Every voicemail is a <em>load that paid your competitor.</em></h2>
              <p className="section-sub">Small-fleet dispatch is the last operations function still glued together with browser tabs, voicemail boxes, and a dispatcher who works two phones. Here&apos;s what shows up in the audit.</p>
            </div>
            <div className="pain-grid">
              <div className="pain-cell">
                <div className="pain-stat">31%</div>
                <div className="pain-line">of off-hours broker calls roll to voicemail — and a third of those calls never re-route.</div>
                <div className="pain-src">SkynetLabs audits · Q1 2026 · n=8</div>
              </div>
              <div className="pain-cell">
                <div className="pain-stat">$847</div>
                <div className="pain-line">avg monthly SaaS bill across DAT, TruckingOffice, RingCentral, Calendly, Zapier add-ons.</div>
                <div className="pain-src">5–12 truck operators</div>
              </div>
              <div className="pain-cell">
                <div className="pain-stat">17 days</div>
                <div className="pain-line">avg invoice → factoring → cash settlement without widget integration.</div>
                <div className="pain-src">SkynetLabs ops research</div>
              </div>
              <div className="pain-cell">
                <div className="pain-stat">Zero</div>
                <div className="pain-line">of those tools talk to each other. The dispatcher is the integration layer — every shift.</div>
                <div className="pain-src">Every audit, no exceptions</div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section-head">
              <div className="section-kicker">The stack</div>
              <h2>Four modules. <em>Yours on day one.</em></h2>
            </div>
            <div className="feature-list">
              <div className="feat-row">
                <div className="feat-num">01</div>
                <div>
                  <div className="feat-title">Vapi AI dispatcher agent</div>
                  <div className="feat-body">Inbound load calls qualified in eight seconds. Route, rate, broker contact, dispatcher notes pushed to your CRM before the second ring. 24/7 phone coverage without a graveyard-shift dispatcher.</div>
                </div>
              </div>
              <div className="feat-row">
                <div className="feat-num">02</div>
                <div>
                  <div className="feat-title">Live dispatch canvas</div>
                  <div className="feat-body">DAT feed, your truck inventory, the repeat-broker pipeline, and factoring activity on a single screen. Tabs replaced with focus. Built like Linear, not Salesforce.</div>
                </div>
              </div>
              <div className="feat-row">
                <div className="feat-num">03</div>
                <div>
                  <div className="feat-title">Factoring widget</div>
                  <div className="feat-body">Direct Triumph, Apex, RTS integration. Same-day settle on qualifying loads. Fee-aware ranking, auto invoice attach, push to QuickBooks ledger.</div>
                </div>
              </div>
              <div className="feat-row">
                <div className="feat-num">04</div>
                <div>
                  <div className="feat-title">Ad ops + lead-gen</div>
                  <div className="feat-body">Meta + LinkedIn campaigns wired to your GHL pipeline. SMS auto-confirms, public driver portal, monthly content batch from the Bali studio.</div>
                </div>
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
                <p className="testi-quote">I get more done in eight hours than my last agency got done in eight weeks. He sends Loom walkthroughs at 3 am his time. That&apos;s the actual founder — and it shows.</p>
                <div className="testi-meta">
                  <div className="testi-avatar">CS</div>
                  <div><div className="testi-name">Chrissy S.</div><div className="testi-role">Founder · Vow Sanctuary · Asheville</div></div>
                </div>
              </div>
              <div className="testi-card">
                <p className="testi-quote">Inbound calls used to die after 8 pm. The voice agent caught seventeen loads in week one — three I&apos;d have lost. The stack paid for itself the first month.</p>
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
              <h2>Four tiers. <em>No custom-quote theater.</em></h2>
              <p className="section-sub">Half on signature. Half on launch. Walk anytime with what&apos;s built.</p>
            </div>
            <div className="pricing-row">
              <div className="price-cell">
                <div className="price-tier">Starter</div>
                <div className="price-window">14d · site + CRM</div>
                <div className="price-amount">$1,497</div>
                <div className="price-recur">flat · no retainer</div>
                <ul className="price-list"><li>Five-page premium site</li><li>GHL CRM pipeline</li><li>Inbound contact inbox</li><li>Meta Pixel + CAPI</li></ul>
                <a href="/discovery-call" className="price-cta">Book →</a>
              </div>
              <div className="price-cell">
                <div className="price-tier">Pro</div>
                <div className="price-window">21d · + dispatch</div>
                <div className="price-amount">$3,997</div>
                <div className="price-recur">+ $497/mo ops</div>
                <ul className="price-list"><li>Everything in Starter</li><li>Dispatch dashboard</li><li>Factoring widget</li><li>SMS auto-confirms</li></ul>
                <a href="/discovery-call" className="price-cta">Book →</a>
              </div>
              <div className="price-cell featured">
                <div className="price-badge">Pick</div>
                <div className="price-tier">Premium</div>
                <div className="price-window">30d · + ad ops</div>
                <div className="price-amount">$7,997</div>
                <div className="price-recur">+ $997/mo ops</div>
                <ul className="price-list"><li>Everything in Pro</li><li>Meta + LinkedIn ad ops</li><li>Lead-gen automation</li><li>Monthly content batch</li></ul>
                <a href="/discovery-call" className="price-cta">Book →</a>
              </div>
              <div className="price-cell">
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

        <section className="section">
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
                <p>Starter ships in 14 calendar days from kickoff. Pro 21. Premium 30. Flagship 45. If we miss the window, we work nights and weekends free until live — written into the SOW.</p>
              </details>
              <details>
                <summary>What happens at month 12?</summary>
                <p>You own the GitHub repo, n8n workflows, and GHL subaccount on day one. Cancel the retainer anytime — you keep everything live.</p>
              </details>
              <details>
                <summary>TCPA-compliance on the voice agent?</summary>
                <p>Yes. The Vapi agent is inbound-only by default. Outbound calls require documented opt-in per FCC 2024 rulings. We write the compliance flow into your funnel.</p>
              </details>
            </div>
          </div>
        </section>

        <div className="scarcity-band">
          <p>Four operator slots a month · June: 2 of 4 remaining</p>
        </div>

        <section className="closer">
          <div className="wrap">
            <h2>Fifteen minutes. <em>Yes, no, or referral.</em></h2>
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
