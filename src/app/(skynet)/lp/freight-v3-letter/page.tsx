import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Freight ops, one roof — site + dispatch + AI voice | SkynetLabs",
  description:
    "One operator, one stack, one roof. For US small-fleet carriers running 5–50 trucks. 14-day ship window, public pricing, source-controlled deliverables. A founder letter from Canggu, Bali.",
  alternates: { canonical: "/lp/freight" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Freight ops, one roof — site + dispatch + AI voice | SkynetLabs",
    description:
      "One operator, one stack, one roof. US small-fleet carriers. 14-day ship, public pricing.",
    url: "/lp/freight",
    type: "website",
  },
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Caveat:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');
.lp-v3 { --paper:#f7f3ec; --paper-2:#efe9da; --navy:#1a2540; --navy-2:#2b3a5e; --ink:#1a1a1a; --gold:#c9985a; --rule:rgba(26,37,64,0.16); background:var(--paper); background-image:radial-gradient(circle at 20% 10%,rgba(201,152,90,0.05) 0%,transparent 40%),radial-gradient(circle at 80% 80%,rgba(26,37,64,0.04) 0%,transparent 50%); color:var(--ink); font-family:'Lora',Georgia,serif; font-size:18px; line-height:1.7; min-height:100vh; }
.lp-v3 *,.lp-v3 *::before,.lp-v3 *::after { box-sizing:border-box; }
.lp-v3 img { max-width:100%; height:auto; display:block; }
.lp-v3 a { color:var(--navy); text-decoration:underline; text-underline-offset:4px; text-decoration-thickness:1px; }
.lp-v3 a:hover { color:var(--gold); }
.lp-v3 ::selection { background:var(--gold); color:var(--paper); }
.lp-v3 .wrap { max-width:720px; margin:0 auto; padding:0 24px; }
.lp-v3 .wide { max-width:1100px; margin:0 auto; padding:0 24px; }
.lp-v3 .hand { font-family:'Caveat',cursive; color:var(--gold); font-weight:500; }
.lp-v3 .nav { border-bottom:1px solid var(--rule); padding:16px 0; background:var(--paper); position:sticky; top:0; z-index:50; backdrop-filter:blur(8px); }
.lp-v3 .nav-inner { max-width:1100px; margin:0 auto; padding:0 24px; display:flex; align-items:center; justify-content:space-between; }
.lp-v3 .brand { font-family:'Lora',serif; font-weight:600; font-size:19px; letter-spacing:0.01em; text-decoration:none; }
.lp-v3 .brand em { color:var(--gold); font-style:italic; font-weight:500; }
.lp-v3 .nav-cta { font-family:'Inter',sans-serif; font-size:13px; font-weight:500; padding:9px 18px; background:var(--navy); color:var(--paper); text-decoration:none; border-radius:2px; transition:background 0.18s; }
.lp-v3 .nav-cta:hover { background:var(--gold); color:var(--ink); }
.lp-v3 .hero { padding:80px 0 56px; position:relative; }
.lp-v3 .hero-mark { text-align:center; margin-bottom:32px; font-family:'Inter',sans-serif; font-size:11px; letter-spacing:0.24em; text-transform:uppercase; color:var(--gold); }
.lp-v3 .hero-mark::before,.lp-v3 .hero-mark::after { content:'·'; margin:0 12px; opacity:0.6; }
.lp-v3 .hero h1 { font-family:'Lora',serif; font-weight:500; font-size:clamp(34px,5vw,56px); line-height:1.15; letter-spacing:-0.015em; text-align:center; max-width:22ch; margin:0 auto 32px; }
.lp-v3 .hero h1 em { color:var(--gold); font-style:italic; font-weight:500; }
.lp-v3 .hero-sub { text-align:center; font-style:italic; font-size:19px; color:var(--navy-2); max-width:50ch; margin:0 auto 48px; }
.lp-v3 .hero-photo-wrap { max-width:520px; margin:0 auto 56px; border:1px solid var(--rule); padding:12px; background:var(--paper-2); transform:rotate(-1deg); box-shadow:0 18px 48px rgba(26,37,64,0.16); }
.lp-v3 .hero-photo { width:100%; aspect-ratio:4/5; object-fit:cover; filter:sepia(0.18) saturate(0.92) brightness(1.02); }
.lp-v3 .hero-photo-cap { margin-top:12px; text-align:center; font-family:'Caveat',cursive; font-size:22px; color:var(--gold); }
.lp-v3 .letter { padding:56px 0 96px; }
.lp-v3 .letter p { margin-bottom:24px; font-size:19px; color:var(--ink); max-width:64ch; }
.lp-v3 .letter p:first-of-type::first-letter { font-family:'Lora',serif; font-style:italic; font-size:72px; float:left; line-height:0.8; margin:12px 12px 0 0; color:var(--navy); font-weight:600; }
.lp-v3 .letter h2 { font-family:'Lora',serif; font-weight:600; font-style:italic; font-size:32px; line-height:1.2; letter-spacing:-0.01em; color:var(--navy); margin:56px 0 24px; }
.lp-v3 .letter h2::before { content:'— '; color:var(--gold); }
.lp-v3 .letter blockquote { margin:32px 0; padding:4px 32px; border-left:3px solid var(--gold); font-style:italic; font-size:22px; line-height:1.55; color:var(--navy); }
.lp-v3 .letter blockquote cite { display:block; margin-top:12px; font-family:'Inter',sans-serif; font-style:normal; font-size:13px; letter-spacing:0.06em; color:var(--navy-2); text-transform:uppercase; }
.lp-v3 .letter mark { background:linear-gradient(to bottom,transparent 60%,rgba(201,152,90,0.4) 60%); padding:0 2px; }
.lp-v3 .margin-note { position:relative; padding:16px 0 16px 24px; font-family:'Caveat',cursive; font-size:22px; color:var(--gold); line-height:1.3; border-left:2px solid var(--gold); margin:28px 0 28px 16px; transform:rotate(-0.4deg); }
.lp-v3 .margin-note::before { content:'← '; font-size:24px; }
.lp-v3 .video-wrap { max-width:720px; margin:48px auto; border:1px solid var(--rule); padding:8px; background:var(--paper-2); position:relative; }
.lp-v3 .video-wrap::after { content:'watch the 90-sec teardown'; position:absolute; top:-14px; left:16px; background:var(--paper); padding:0 8px; font-family:'Caveat',cursive; font-size:18px; color:var(--gold); }
.lp-v3 .video-iframe { width:100%; aspect-ratio:16/9; border:0; display:block; }
.lp-v3 .proof-section { background:var(--paper-2); padding:80px 0; border-top:1px solid var(--rule); border-bottom:1px solid var(--rule); }
.lp-v3 .proof-kicker { text-align:center; font-family:'Inter',sans-serif; font-size:11px; letter-spacing:0.24em; text-transform:uppercase; color:var(--gold); margin-bottom:16px; }
.lp-v3 .proof-h { font-family:'Lora',serif; font-weight:500; font-style:italic; font-size:clamp(28px,4vw,44px); text-align:center; color:var(--navy); margin-bottom:48px; letter-spacing:-0.01em; }
.lp-v3 .proof-grid { display:grid; grid-template-columns:1fr; gap:16px; }
@media (min-width:768px) { .lp-v3 .proof-grid { grid-template-columns:repeat(2,1fr); } }
@media (min-width:1024px) { .lp-v3 .proof-grid { grid-template-columns:repeat(3,1fr); } }
.lp-v3 .proof-card { background:var(--paper); padding:24px; border:1px solid var(--rule); transition:border-color 0.2s,transform 0.2s; }
.lp-v3 .proof-card:hover { border-color:var(--gold); transform:translateY(-3px); }
.lp-v3 .proof-card-name { font-family:'Lora',serif; font-weight:600; font-size:19px; color:var(--navy); margin-bottom:6px; }
.lp-v3 .proof-card-meta { font-family:'Inter',sans-serif; font-size:11px; letter-spacing:0.1em; text-transform:uppercase; color:var(--gold); margin-bottom:12px; }
.lp-v3 .proof-card-body { font-size:15px; color:var(--ink); line-height:1.55; }
.lp-v3 .pricing { padding:80px 0; }
.lp-v3 .pricing h2 { text-align:center; font-family:'Lora',serif; font-style:italic; font-size:clamp(28px,4vw,44px); margin-bottom:16px; color:var(--navy); letter-spacing:-0.01em; }
.lp-v3 .pricing h2 em { font-style:italic; color:var(--gold); }
.lp-v3 .pricing-note { text-align:center; font-style:italic; color:var(--navy-2); margin-bottom:48px; font-size:18px; max-width:56ch; margin-left:auto; margin-right:auto; }
.lp-v3 .tiers-list { list-style:none; border-top:1px solid var(--rule); margin:0 auto; max-width:720px; padding:0; }
.lp-v3 .tiers-list li { padding:28px 0; border-bottom:1px solid var(--rule); display:grid; grid-template-columns:1fr 1fr; gap:24px; align-items:baseline; }
@media (min-width:768px) { .lp-v3 .tiers-list li { grid-template-columns:1fr 180px 1fr; } }
.lp-v3 .tier-row-name { font-family:'Lora',serif; font-weight:600; font-size:24px; color:var(--navy); }
.lp-v3 .tier-row-name small { display:block; font-family:'Inter',sans-serif; font-weight:400; font-size:12px; letter-spacing:0.08em; text-transform:uppercase; color:var(--gold); margin-top:4px; }
.lp-v3 .tier-row-price { font-family:'Lora',serif; font-weight:600; font-size:28px; color:var(--ink); text-align:right; }
@media (min-width:768px) { .lp-v3 .tier-row-price { text-align:center; } }
.lp-v3 .tier-row-price small { display:block; font-family:'Inter',sans-serif; font-weight:400; font-size:12px; color:var(--navy-2); margin-top:2px; }
.lp-v3 .tier-row-desc { font-style:italic; color:var(--navy-2); font-size:16px; line-height:1.55; grid-column:1 / -1; }
@media (min-width:768px) { .lp-v3 .tier-row-desc { grid-column:auto; } }
.lp-v3 .closer { background:var(--navy); color:var(--paper); padding:96px 24px; text-align:center; }
.lp-v3 .closer h2 { font-family:'Lora',serif; font-style:italic; font-weight:500; font-size:clamp(32px,5vw,52px); margin-bottom:24px; letter-spacing:-0.015em; max-width:24ch; margin-left:auto; margin-right:auto; }
.lp-v3 .closer h2 em { color:var(--gold); font-style:italic; }
.lp-v3 .closer p { font-style:italic; opacity:0.85; max-width:50ch; margin:0 auto 36px; font-size:19px; line-height:1.55; }
.lp-v3 .closer-cta-row { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }
.lp-v3 .btn { font-family:'Inter',sans-serif; font-size:14px; font-weight:600; letter-spacing:0.04em; padding:14px 24px; text-decoration:none; border-radius:2px; transition:background 0.18s,transform 0.18s,color 0.18s; display:inline-flex; align-items:center; gap:8px; }
.lp-v3 .btn-gold { background:var(--gold); color:var(--ink); }
.lp-v3 .btn-gold:hover { background:var(--paper); transform:translateY(-2px); }
.lp-v3 .btn-paper { background:transparent; color:var(--paper); border:1.5px solid var(--paper); }
.lp-v3 .btn-paper:hover { background:var(--paper); color:var(--navy); }
.lp-v3 .signature { text-align:center; margin:56px 0; }
.lp-v3 .signature-text { font-family:'Caveat',cursive; font-size:56px; color:var(--navy); line-height:1; }
.lp-v3 .signature-meta { margin-top:12px; font-family:'Inter',sans-serif; font-size:13px; color:var(--navy-2); letter-spacing:0.04em; }
.lp-v3 .signature-photo { display:inline-block; width:80px; height:80px; border-radius:50%; overflow:hidden; border:2px solid var(--gold); margin-bottom:16px; }
.lp-v3 .signature-photo img { width:100%; height:100%; object-fit:cover; filter:sepia(0.15); }
.lp-v3 footer.lp { padding:56px 0 32px; background:var(--paper-2); border-top:1px solid var(--rule); font-family:'Inter',sans-serif; font-size:13px; color:var(--navy-2); }
.lp-v3 footer.lp .grid { display:grid; gap:24px; grid-template-columns:1fr; margin-bottom:32px; }
@media (min-width:768px) { .lp-v3 footer.lp .grid { grid-template-columns:2fr 1fr 1fr 1fr; } }
.lp-v3 footer.lp h5 { font-family:'Lora',serif; font-style:italic; font-weight:500; font-size:14px; color:var(--gold); margin-bottom:10px; }
.lp-v3 footer.lp a { display:block; padding:3px 0; color:var(--navy-2); text-decoration:none; }
.lp-v3 footer.lp a:hover { color:var(--gold); }
.lp-v3 .disclaimer { padding-top:24px; border-top:1px solid var(--rule); font-size:11px; line-height:1.65; color:var(--navy-2); max-width:90ch; }
.lp-v3 .audit-sticky { position:fixed; bottom:24px; right:24px; z-index:60; background:var(--gold); color:var(--ink); font-family:'Inter',sans-serif; font-size:13px; font-weight:600; padding:14px 22px; border-radius:32px; text-decoration:none; box-shadow:0 12px 28px rgba(201,152,90,0.32); display:inline-flex; align-items:center; gap:8px; transition:transform 0.18s; letter-spacing:0.02em; }
.lp-v3 .audit-sticky:hover { transform:translateY(-3px); background:var(--paper); color:var(--navy); }
`;

export default function V3Letter() {
  return (
    <div className="lp-v3">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <header className="nav">
        <div className="nav-inner">
          <a href="#" className="brand">Skynet<em>Labs</em></a>
          <a href="https://calendly.com/skynetlabs/schedule-a-free-consultation" className="nav-cta">Book audit</a>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="wrap">
            <div className="hero-mark">A founder letter · Volume I · 2026</div>
            <h1>I run a one-operator freight ops shop from a cafe in <em>Bali</em>.</h1>
            <p className="hero-sub">Here&apos;s what your $800/mo stack is missing — and why the eight-hour reply window matters more than the logo.</p>
            <figure className="hero-photo-wrap">
              <img src="/lp/freight/v3/hero.jpg" alt="Waseem Nasir, founder, casual portrait" className="hero-photo" loading="eager" />
              <figcaption className="hero-photo-cap">— Waseem · rooftop · Canggu</figcaption>
            </figure>
          </div>
        </section>

        <section className="letter">
          <div className="wrap">
            <p>Dear small-fleet operator,</p>
            <p>My name is Waseem. I&apos;m writing this from Crate Cafe in Canggu, Bali. Scooter parked outside. Iced latte cost 35,000 IDR — about $2.20. Wi-Fi faster than half of Manhattan. In the last 18 months I&apos;ve shipped nine production sites and automation systems for clients across nine countries, never met any of them in person.</p>
            <p>Telling you this because the first question you&apos;re going to ask: <em>&quot;solo guy from Pakistan, running this from a cafe in Bali — can I trust him with a $4,000 build for my 12-truck operation?&quot;</em></p>
            <p>Right question. Let me answer it the way I&apos;d want it answered.</p>

            <h2>The reason solo works in your favor</h2>
            <p>No account managers. No sales pod. No creative director. When you message me on Signal, you reach <mark>the person who will write the code, design the dashboard, and ship the AI agent</mark>. Not a project coordinator. Not a junior. Me.</p>
            <div className="margin-note">this is the part most agencies skip</div>
            <p>When you tell me &quot;the broker keeps calling at 2am and I miss every load,&quot; I don&apos;t relay that to three other people. I open Vapi, write the qualifying flow, test it on a burner number tonight, you see a working demo on Signal in 48 hours. Cycle time from your pain to a working prototype is faster than any 12-person agency can run a standup.</p>
            <blockquote>&quot;I get more done in eight hours than my last agency got done in eight weeks. And I know it&apos;s actually him, because he sends me Loom walkthroughs at 3am his time.&quot;<cite>— Vow Sanctuary, Asheville NC (real client)</cite></blockquote>

            <h2>Why I named the page &quot;one operator, one stack, one roof&quot;</h2>
            <p>The small-fleet market has three flavors of vendor right now:</p>
            <p>— <strong>Brand agencies</strong> build pretty marketing sites but can&apos;t ship software. You&apos;ll get a logo and a Webflow site that loads in 4 seconds.<br />— <strong>Dev shops</strong> build software but won&apos;t touch your brand or your funnel. You&apos;ll get a $40K dashboard in six months that nobody knows about.<br />— <strong>AI products</strong> (FleetWorks, HappyRobot, Bubba, Numeo) are generic SaaS. Their UI, their voice, their lock-in.</p>
            <p>Nobody ships all three. Because to ship all three you need a single operator who&apos;s comfortable in design <em>and</em> code <em>and</em> AI. That&apos;s an empty tier — and that&apos;s me.</p>

            <h2>What the audit actually does</h2>
            <p>You book a 15-minute Cal.com slot. I review your stack. I tell you the two or three biggest gaps. Recommend yes, no, or referral. Yes = fixed scope in 48 hours. No = I tell you why and point you somewhere right. <strong>If we don&apos;t talk about money in the first call, it&apos;s because we shouldn&apos;t be talking yet.</strong></p>

            <div className="video-wrap">
              <iframe className="video-iframe" src="https://www.youtube.com/embed/5lT9vrzssU0" title="Waseem teardown — Claude Code WordPress build" allowFullScreen></iframe>
            </div>

            <h2>What I&apos;ve already built — by name</h2>
            <p>I cite clients because I can. Vow Sanctuary in Asheville NC. Wellness DNA. GutReno. Pretty Potty. TimeLapse Renovation System. SkynetJoe. Every one owns their GitHub repo and their n8n workflows the day we hand off. No vendor lock-in. No mystery retainer.</p>

            <h2>Why I&apos;m here</h2>
            <p>Because the freight market is the last market where six paid tools cost $800/mo and don&apos;t talk. Because every dispatcher I&apos;ve shown a working AI voice agent to has cried, laughed, or asked &quot;how much, today, can I sign right now.&quot; Because I can ship faster than the agencies, more bespoke than the products, at owner-op pricing — and somebody should.</p>
            <p>That&apos;s the menu. Audit&apos;s free. Eight-hour reply. Yes / no / referral. Walk anytime.</p>

            <div className="signature">
              <div className="signature-photo"><img src="/lp/freight/v3/signature.jpg" alt="Waseem Nasir" /></div>
              <div className="signature-text">Waseem</div>
              <div className="signature-meta">— Crate Cafe · Canggu, Bali · 2026-06-01</div>
            </div>
          </div>
        </section>

        <section className="proof-section">
          <div className="wide">
            <p className="proof-kicker">Named builds, public references</p>
            <h2 className="proof-h">Nine clients. Nine GitHubs. All running.</h2>
            <div className="proof-grid">
              <article className="proof-card"><div className="proof-card-meta">Wellness · Asheville NC</div><div className="proof-card-name">Vow Sanctuary</div><p className="proof-card-body">Next.js flagship · Lighthouse 98 · 3-day ship · $7K MRR pipeline within 30 days.</p></article>
              <article className="proof-card"><div className="proof-card-meta">Functional medicine · USA</div><div className="proof-card-name">GutReno</div><p className="proof-card-body">WordPress + GHL funnel · 12% landing→consult · $4K/mo lead value.</p></article>
              <article className="proof-card"><div className="proof-card-meta">DTC supplements · multi-region</div><div className="proof-card-name">Wellness DNA</div><p className="proof-card-body">Shopify + n8n + Signal post-purchase · 28% LTV lift in 90 days.</p></article>
              <article className="proof-card"><div className="proof-card-meta">Home services · USA</div><div className="proof-card-name">Pretty Potty</div><p className="proof-card-body">Lead-gen + GHL + SMS reminders · 4× booked-consult rate.</p></article>
              <article className="proof-card"><div className="proof-card-meta">Construction · USA</div><div className="proof-card-name">TimeLapse Renovation</div><p className="proof-card-body">Progress tracker + client portal · replaces 3 paid SaaS subs.</p></article>
              <article className="proof-card"><div className="proof-card-meta">Internal · open-source</div><div className="proof-card-name">SkynetJoe theme</div><p className="proof-card-body">The premium WordPress theme this whole stack evolved from. Public on GitHub.</p></article>
            </div>
          </div>
        </section>

        <section className="pricing">
          <div className="wide">
            <p className="proof-kicker" style={{ textAlign: "center" }}>The menu, public</p>
            <h2><em>Four tiers.</em> No &quot;custom quote&quot; theater.</h2>
            <p className="pricing-note">Half on signature, half on launch. Walk anytime with what&apos;s built. Audit comes first — pricing only matters if we&apos;re a fit.</p>
            <ul className="tiers-list">
              <li><div className="tier-row-name">Starter <small>14d · site + CRM + WA</small></div><div className="tier-row-price">$1,497 <small>flat</small></div><div className="tier-row-desc">Five-page premium site, GHL CRM, Signal inbox, Meta Pixel + CAPI, 2 revision rounds.</div></li>
              <li><div className="tier-row-name">Pro <small>21d · + dispatch + factoring</small></div><div className="tier-row-price">$3,997 <small>+ $497/mo</small></div><div className="tier-row-desc">Everything in Starter, plus custom dispatch dashboard, factoring integration, SMS automation, monthly opt call.</div></li>
              <li><div className="tier-row-name">Premium <small>30d · + ad ops + lead gen</small></div><div className="tier-row-price">$7,997 <small>+ $997/mo</small></div><div className="tier-row-desc">Everything in Pro, plus Meta + LinkedIn ad ops, cold + warm lead-gen flows, monthly content batch, weekly review.</div></li>
              <li><div className="tier-row-name">Flagship <small>45d · AI Dispatcher Agent™</small></div><div className="tier-row-price">$9,500 <small>+ $1,997/mo</small></div><div className="tier-row-desc">Everything in Premium, plus Vapi / Retell AI voice agent, inbound load qualification, 24/7 phone coverage.</div></li>
            </ul>
          </div>
        </section>

        <section className="closer">
          <h2>Four slots a month. <em>Two left for June.</em><br />The audit takes fifteen minutes.</h2>
          <p>Eight-hour reply on weekday Bali time. Yes, no, or referral. No commitment. No funnel. Either way you walk with the audit findings.</p>
          <div className="closer-cta-row">
            <a href="https://calendly.com/skynetlabs/schedule-a-free-consultation" className="btn btn-gold">Book the audit →</a>
            <a href="/discovery-call" className="btn btn-paper">Apply for a call</a>
          </div>
        </section>

        <footer className="lp">
          <div className="wide">
            <div className="grid">
              <div><h5>SkynetLabs</h5><p>One operator. One stack. One roof.<br />Waseem Nasir · Canggu, Bali (GMT+8) + Lahore, Pakistan.</p></div>
              <div><h5>Pages</h5><a href="/services">Services</a><a href="/portfolio">Work</a><a href="/pricing">Pricing</a></div>
              <div><h5>Reach</h5><a href="https://calendly.com/skynetlabs/schedule-a-free-consultation">Book audit</a><a href="/discovery-call">Signal</a><a href="mailto:waseem@skynetjoe.com">Email</a></div>
              <div><h5>Elsewhere</h5><a href="https://www.linkedin.com/in/waseemnasir2k26">LinkedIn</a><a href="https://github.com/waseemnasir2k26">GitHub</a><a href="https://youtube.com/@skynetlabs">YouTube</a></div>
            </div>
            <p className="disclaimer">SkynetLabs provides software, design, and marketing services. Not a freight broker or motor carrier. No FMCSA authority. Software demos are inbound-only and require user consent (TCPA-compliant). Reference 49 CFR 371 governs broker authority and is not implicated by services described herein. Public pricing reflects standard scope as of 2026-06-01 and may vary by custom requirements. © 2026 SkynetLabs · Waseem Nasir.</p>
          </div>
        </footer>
      </main>

      <a href="https://cal.com/skynetjoe/audit" className="audit-sticky">Book audit →</a>
    </div>
  );
}
