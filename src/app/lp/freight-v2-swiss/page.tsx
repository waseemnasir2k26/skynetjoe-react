import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Big-broker tech, owner-op price — SkynetLabs Freight",
  description:
    "Marketing site + dispatch dashboard + AI voice agent in 14 days, public pricing. For US carriers running 5–50 trucks. 2 slots left for June 2026.",
  alternates: { canonical: "/lp/freight-v2-swiss" },
  robots: { index: false, follow: false },
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap');

.lp-v2 { --bone:#fafaf7; --bone-2:#f0eee5; --bone-3:#e6e3d4; --ink:#0a0a0a; --ink-soft:#222; --ink-faint:#5e5e5e; --ink-mute:#888; --orange:#ff4a1c; --orange-2:#e63d12; --orange-pale:rgba(255,74,28,0.08); --orange-hot:rgba(255,74,28,0.16); --rule:rgba(10,10,10,0.10); --rule-strong:rgba(10,10,10,0.22); --green:#00a86b; background:var(--bone); color:var(--ink); font-family:'Inter',sans-serif; line-height:1.5; min-height:100vh; -webkit-font-smoothing:antialiased; }
.lp-v2 *,.lp-v2 *::before,.lp-v2 *::after { box-sizing:border-box; }
.lp-v2 a { color:inherit; text-decoration:none; }
.lp-v2 img { max-width:100%; height:auto; display:block; }
.lp-v2 ::selection { background:var(--orange); color:var(--bone); }
.lp-v2 .wrap { max-width:1280px; margin:0 auto; padding:0 24px; }
.lp-v2 .mono { font-family:'JetBrains Mono',monospace; font-feature-settings:'tnum'; }
.lp-v2 .tight { font-family:'Inter Tight',sans-serif; letter-spacing:-0.02em; }

/* NAV */
.lp-v2 .nav { position:sticky; top:0; z-index:50; background:rgba(250,250,247,0.96); backdrop-filter:blur(10px); border-bottom:1px solid var(--rule); }
.lp-v2 .nav-inner { display:flex; align-items:center; justify-content:space-between; padding:14px 24px; max-width:1280px; margin:0 auto; }
.lp-v2 .brand { font-family:'Inter Tight',sans-serif; font-weight:800; font-size:18px; letter-spacing:-0.02em; }
.lp-v2 .brand span { color:var(--orange); }
.lp-v2 .nav-meta { font-family:'JetBrains Mono',monospace; font-size:11px; color:var(--ink-faint); letter-spacing:0.06em; display:none; align-items:center; gap:8px; }
.lp-v2 .nav-meta .pulse { width:8px; height:8px; background:var(--green); border-radius:50%; box-shadow:0 0 0 3px rgba(0,168,107,0.18); }
@media (min-width:768px) { .lp-v2 .nav-meta { display:flex; } }
.lp-v2 .nav-cta { font-family:'Inter Tight',sans-serif; font-size:12px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; padding:11px 20px; background:var(--orange); color:var(--bone); transition:background 0.18s,transform 0.18s; }
.lp-v2 .nav-cta:hover { background:var(--orange-2); transform:translateY(-1px); }

/* HERO — Stripe/Linear pattern: tight headline + sub + CTA + product preview */
.lp-v2 .hero { padding:72px 0 64px; border-bottom:1px solid var(--rule); position:relative; overflow:hidden; }
.lp-v2 .hero-eyebrow { display:inline-flex; align-items:center; gap:10px; font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:0.14em; color:var(--orange); text-transform:uppercase; margin-bottom:28px; padding:6px 12px; background:var(--orange-pale); border:1px solid var(--orange); }
.lp-v2 .hero-eyebrow .pulse { width:6px; height:6px; background:var(--orange); border-radius:50%; animation:pulse-orange 1.4s ease-in-out infinite; }
@keyframes pulse-orange { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
.lp-v2 .hero h1 { font-family:'Inter Tight',sans-serif; font-size:clamp(40px,6.4vw,82px); line-height:1; font-weight:700; letter-spacing:-0.03em; margin-bottom:22px; max-width:18ch; }
.lp-v2 .hero h1 span.hl { color:var(--orange); }
.lp-v2 .hero h1 span.slash { display:inline-block; background:var(--ink); color:var(--bone); padding:2px 14px 8px; transform:skewX(-8deg); margin:0 4px; }
.lp-v2 .hero-sub { font-size:20px; color:var(--ink-soft); max-width:56ch; line-height:1.55; margin-bottom:32px; }
.lp-v2 .hero-sub strong { color:var(--ink); font-weight:600; }
.lp-v2 .cta-row { display:flex; flex-wrap:wrap; gap:14px; align-items:center; margin-bottom:24px; }
.lp-v2 .btn { font-family:'Inter Tight',sans-serif; font-size:14px; font-weight:700; letter-spacing:0.06em; padding:16px 28px; text-transform:uppercase; transition:background 0.18s,color 0.18s,transform 0.18s,box-shadow 0.18s; display:inline-block; }
.lp-v2 .btn-orange { background:var(--orange); color:var(--bone); box-shadow:0 8px 20px rgba(255,74,28,0.28); }
.lp-v2 .btn-orange:hover { background:var(--orange-2); transform:translateY(-2px); box-shadow:0 14px 32px rgba(255,74,28,0.4); }
.lp-v2 .btn-line { color:var(--ink); padding:16px 4px; font-size:13px; border-bottom:1px solid var(--ink); transition:color 0.18s,border-color 0.18s; }
.lp-v2 .btn-line:hover { color:var(--orange); border-bottom-color:var(--orange); }
.lp-v2 .hero-scarcity { display:inline-flex; align-items:center; gap:10px; font-family:'JetBrains Mono',monospace; font-size:12px; color:var(--ink-soft); letter-spacing:0.04em; padding:8px 14px; background:var(--bone-2); border:1px solid var(--rule); }
.lp-v2 .hero-scarcity strong { color:var(--orange); font-weight:700; }
.lp-v2 .hero-scarcity::before { content:'●'; color:var(--orange); animation:pulse-orange 1.4s ease-in-out infinite; }

/* PRODUCT PREVIEW UNDER HERO */
.lp-v2 .preview { margin-top:48px; background:#0d0d0d; color:var(--bone); border:1px solid var(--ink); padding:14px; box-shadow:0 36px 80px rgba(10,10,10,0.32); }
.lp-v2 .preview-bar { display:flex; align-items:center; gap:8px; padding:10px 14px 14px; border-bottom:1px solid rgba(255,255,255,0.10); margin-bottom:18px; }
.lp-v2 .preview-bar .dot { width:11px; height:11px; border-radius:50%; }
.lp-v2 .preview-bar .dot.r { background:#ff5f56; }
.lp-v2 .preview-bar .dot.a { background:#ffbd2e; }
.lp-v2 .preview-bar .dot.g { background:#27c93f; }
.lp-v2 .preview-bar .label { font-family:'JetBrains Mono',monospace; font-size:11px; color:rgba(255,255,255,0.5); margin-left:12px; letter-spacing:0.06em; }
.lp-v2 .preview-bar .badge { margin-left:auto; font-family:'JetBrains Mono',monospace; font-size:10px; color:var(--orange); letter-spacing:0.12em; }
.lp-v2 .preview-body { display:grid; grid-template-columns:1fr; gap:14px; padding:8px 14px 20px; }
@media (min-width:768px) { .lp-v2 .preview-body { grid-template-columns:1.4fr 1fr 1fr; gap:16px; } }
.lp-v2 .preview-card { padding:18px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.06); }
.lp-v2 .preview-card .k { font-family:'JetBrains Mono',monospace; font-size:10px; color:rgba(255,255,255,0.5); letter-spacing:0.10em; text-transform:uppercase; margin-bottom:10px; }
.lp-v2 .preview-card .v { font-family:'Inter Tight',sans-serif; font-size:30px; font-weight:700; letter-spacing:-0.025em; line-height:1; }
.lp-v2 .preview-card .v.o { color:var(--orange); }
.lp-v2 .preview-card .v.g { color:#27c93f; }
.lp-v2 .preview-card .v small { font-family:'JetBrains Mono',monospace; font-size:11px; color:rgba(255,255,255,0.45); font-weight:400; letter-spacing:0.04em; display:block; margin-top:8px; }
.lp-v2 .preview-list { font-family:'JetBrains Mono',monospace; font-size:11.5px; color:rgba(255,255,255,0.7); line-height:1.85; margin-top:12px; }
.lp-v2 .preview-list span { color:var(--orange); margin-right:6px; }
.lp-v2 .preview-list em { color:var(--bone); font-style:normal; }

/* TRUST STRIP */
.lp-v2 .trust { padding:32px 0; border-bottom:1px solid var(--rule); background:var(--bone-2); }
.lp-v2 .trust-label { font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:0.20em; text-transform:uppercase; color:var(--ink-faint); margin-bottom:18px; text-align:center; }
.lp-v2 .trust-row { display:grid; grid-template-columns:repeat(2,1fr); gap:14px; align-items:center; }
@media (min-width:768px) { .lp-v2 .trust-row { grid-template-columns:repeat(6,1fr); gap:24px; } }
.lp-v2 .trust-logo { font-family:'Inter Tight',sans-serif; font-weight:700; font-size:18px; color:var(--ink); letter-spacing:-0.01em; opacity:0.75; transition:opacity 0.2s,color 0.2s; text-align:center; }
.lp-v2 .trust-logo:hover { opacity:1; color:var(--orange); }
.lp-v2 .trust-logo small { display:block; font-family:'JetBrains Mono',monospace; font-size:9px; letter-spacing:0.12em; color:var(--ink-mute); text-transform:uppercase; font-weight:500; margin-top:3px; }

/* SECTIONS */
.lp-v2 .section { padding:96px 0; border-bottom:1px solid var(--rule); }
.lp-v2 .section.dark { background:var(--ink); color:var(--bone); border-bottom-color:transparent; }
.lp-v2 .kicker { font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:0.14em; color:var(--orange); text-transform:uppercase; margin-bottom:18px; display:flex; align-items:center; gap:12px; }
.lp-v2 .kicker::before { content:''; width:24px; height:1px; background:var(--orange); }
.lp-v2 .section-h h2 { font-family:'Inter Tight',sans-serif; font-size:clamp(36px,5vw,60px); line-height:1.02; font-weight:700; letter-spacing:-0.025em; max-width:22ch; margin-bottom:20px; }
.lp-v2 .section.dark .section-h h2 { color:var(--bone); }
.lp-v2 .section-h p { font-size:18px; color:var(--ink-soft); max-width:60ch; line-height:1.55; }
.lp-v2 .section.dark .section-h p { color:rgba(250,250,247,0.7); }

/* FEATURE GRID — 2x2 with screenshot card */
.lp-v2 .features { display:grid; grid-template-columns:1fr; gap:1px; background:var(--rule-strong); border:1px solid var(--rule-strong); margin-top:40px; }
@media (min-width:768px) { .lp-v2 .features { grid-template-columns:repeat(2,1fr); } }
.lp-v2 .feature { background:var(--bone); padding:36px 28px; transition:background 0.18s; border-top:4px solid transparent; position:relative; }
.lp-v2 .feature:hover { background:var(--bone-2); border-top-color:var(--orange); }
.lp-v2 .feature-id { font-family:'JetBrains Mono',monospace; font-size:11px; color:var(--orange); letter-spacing:0.10em; margin-bottom:14px; font-weight:600; }
.lp-v2 .feature h4 { font-family:'Inter Tight',sans-serif; font-size:24px; font-weight:700; letter-spacing:-0.02em; line-height:1.15; margin-bottom:12px; }
.lp-v2 .feature p { color:var(--ink-faint); font-size:15px; line-height:1.6; margin-bottom:16px; }
.lp-v2 .feature ul { list-style:none; padding:0; margin:0; }
.lp-v2 .feature li { font-size:13px; padding:5px 0; color:var(--ink-soft); display:flex; align-items:flex-start; gap:8px; }
.lp-v2 .feature li::before { content:'→'; color:var(--orange); font-weight:700; flex-shrink:0; }

/* TESTIMONIALS — 2 quotes side by side */
.lp-v2 .testimonials { display:grid; grid-template-columns:1fr; gap:24px; margin-top:40px; }
@media (min-width:768px) { .lp-v2 .testimonials { grid-template-columns:repeat(2,1fr); } }
.lp-v2 .t-card { padding:32px; border:1px solid var(--rule-strong); background:var(--bone); position:relative; transition:transform 0.18s,box-shadow 0.18s; }
.lp-v2 .t-card:hover { transform:translateY(-4px); box-shadow:0 20px 40px rgba(10,10,10,0.10); }
.lp-v2 .t-card .stars { font-family:'JetBrains Mono',monospace; color:var(--orange); letter-spacing:3px; font-size:14px; margin-bottom:18px; }
.lp-v2 .t-card .body { font-family:'Inter Tight',sans-serif; font-size:21px; font-weight:500; letter-spacing:-0.015em; line-height:1.4; color:var(--ink); margin-bottom:24px; }
.lp-v2 .t-card .body em { color:var(--orange); font-style:normal; }
.lp-v2 .t-card .author { display:flex; align-items:center; gap:14px; padding-top:20px; border-top:1px solid var(--rule); }
.lp-v2 .t-card .avatar { width:48px; height:48px; background:var(--ink); color:var(--bone); display:flex; align-items:center; justify-content:center; font-family:'Inter Tight',sans-serif; font-weight:700; font-size:18px; letter-spacing:-0.01em; }
.lp-v2 .t-card .meta strong { display:block; font-family:'Inter Tight',sans-serif; font-weight:700; font-size:14px; color:var(--ink); }
.lp-v2 .t-card .meta span { display:block; font-family:'JetBrains Mono',monospace; font-size:11px; color:var(--ink-faint); letter-spacing:0.04em; margin-top:2px; }

/* COMPARISON TABLE (dark section) */
.lp-v2 .compare-wrap { margin-top:40px; overflow-x:auto; }
.lp-v2 .compare-tbl { width:100%; border-collapse:collapse; min-width:760px; }
.lp-v2 .compare-tbl thead th { background:var(--orange); color:var(--bone); padding:18px 16px; text-align:left; font-size:11px; font-family:'JetBrains Mono',monospace; letter-spacing:0.10em; text-transform:uppercase; font-weight:700; }
.lp-v2 .compare-tbl thead th:not(:first-child) { background:rgba(250,250,247,0.04); color:var(--bone); }
.lp-v2 .compare-tbl tbody td { padding:18px 16px; border-bottom:1px solid rgba(250,250,247,0.10); font-size:14px; vertical-align:top; }
.lp-v2 .compare-tbl tbody td:first-child { font-weight:500; font-family:'Inter Tight',sans-serif; letter-spacing:-0.005em; color:var(--bone); }
.lp-v2 .compare-tbl tbody td:nth-child(2) { color:var(--bone); }
.lp-v2 .compare-tbl tbody td:not(:first-child):not(:nth-child(2)) { color:rgba(250,250,247,0.6); }
.lp-v2 .check { color:var(--orange); font-weight:700; font-family:'JetBrains Mono',monospace; }
.lp-v2 .check.bone { color:var(--bone); }
.lp-v2 .x { color:rgba(250,250,247,0.32); font-family:'JetBrains Mono',monospace; }

/* PRICING */
.lp-v2 .pricing-row { display:grid; grid-template-columns:1fr; gap:0; margin-top:40px; border:1px solid var(--ink); }
@media (min-width:768px) { .lp-v2 .pricing-row { grid-template-columns:repeat(2,1fr); } }
@media (min-width:1024px) { .lp-v2 .pricing-row { grid-template-columns:repeat(4,1fr); } }
.lp-v2 .tier { padding:36px 24px; border-right:1px solid var(--rule); border-bottom:1px solid var(--rule); background:var(--bone); transition:background 0.18s; position:relative; display:flex; flex-direction:column; }
.lp-v2 .tier:hover { background:var(--bone-2); }
.lp-v2 .tier.featured { background:var(--ink); color:var(--bone); transform:scale(1.02); z-index:2; box-shadow:0 24px 48px rgba(10,10,10,0.20); }
.lp-v2 .tier-id { font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:0.14em; color:var(--orange); text-transform:uppercase; margin-bottom:8px; font-weight:600; }
.lp-v2 .tier-name { font-family:'Inter Tight',sans-serif; font-size:30px; font-weight:700; letter-spacing:-0.025em; margin-bottom:4px; }
.lp-v2 .tier-meta { font-family:'JetBrains Mono',monospace; font-size:11px; color:var(--ink-faint); letter-spacing:0.04em; margin-bottom:24px; }
.lp-v2 .tier.featured .tier-meta { color:rgba(250,250,247,0.55); }
.lp-v2 .tier-price { font-family:'Inter Tight',sans-serif; font-size:48px; font-weight:700; letter-spacing:-0.03em; line-height:1; margin-bottom:6px; }
.lp-v2 .tier-price small { font-family:'JetBrains Mono',monospace; font-size:13px; font-weight:500; color:var(--orange); letter-spacing:0; display:block; margin-top:8px; }
.lp-v2 .tier-feat { list-style:none; margin:24px 0; padding:24px 0 0; border-top:1px solid var(--rule); flex:1; }
.lp-v2 .tier.featured .tier-feat { border-top-color:rgba(250,250,247,0.18); }
.lp-v2 .tier-feat li { font-size:13.5px; padding:6px 0; color:var(--ink-soft); display:flex; gap:10px; align-items:flex-start; line-height:1.5; }
.lp-v2 .tier.featured .tier-feat li { color:rgba(250,250,247,0.78); }
.lp-v2 .tier-feat li::before { content:'+'; color:var(--orange); font-weight:700; flex-shrink:0; }
.lp-v2 .tier-cta { display:block; text-align:center; padding:14px; font-family:'Inter Tight',sans-serif; font-size:12px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; border:1px solid var(--ink); color:var(--ink); transition:all 0.18s; }
.lp-v2 .tier-cta:hover { background:var(--ink); color:var(--bone); }
.lp-v2 .tier.featured .tier-cta { background:var(--orange); color:var(--bone); border-color:var(--orange); }
.lp-v2 .tier.featured .tier-cta:hover { background:var(--orange-2); border-color:var(--orange-2); }
.lp-v2 .tier-tag { position:absolute; top:-12px; right:-1px; background:var(--orange); color:var(--bone); font-family:'JetBrains Mono',monospace; font-size:10px; padding:5px 14px; letter-spacing:0.12em; font-weight:700; }

/* FOUNDER */
.lp-v2 .founder { display:grid; grid-template-columns:1fr; gap:32px; margin-top:24px; }
@media (min-width:768px) { .lp-v2 .founder { grid-template-columns:4fr 8fr; gap:56px; } }
.lp-v2 .founder-photo { aspect-ratio:4/5; overflow:hidden; position:relative; }
.lp-v2 .founder-photo::after { content:''; position:absolute; bottom:0; left:0; right:0; height:6px; background:var(--orange); }
.lp-v2 .founder-photo img { width:100%; height:100%; object-fit:cover; filter:grayscale(0.9) contrast(1.05); }
.lp-v2 .founder-text h3 { font-family:'Inter Tight',sans-serif; font-size:28px; font-weight:700; letter-spacing:-0.02em; line-height:1.1; margin-bottom:20px; }
.lp-v2 .founder-text p { font-size:16.5px; color:var(--ink-soft); line-height:1.65; margin-bottom:16px; max-width:60ch; }
.lp-v2 .founder-text mark { background:var(--orange); color:var(--bone); padding:0 4px; font-weight:600; }
.lp-v2 .founder-stats { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-top:28px; border-top:1px solid var(--rule); padding-top:20px; }
.lp-v2 .stat-v { font-family:'Inter Tight',sans-serif; font-size:38px; font-weight:700; letter-spacing:-0.025em; color:var(--orange); }
.lp-v2 .stat-l { font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:0.10em; color:var(--ink-faint); text-transform:uppercase; }

/* FAQ */
.lp-v2 .faq-list { margin-top:24px; max-width:760px; }
.lp-v2 details.faq-item { border-top:1px solid var(--rule); padding:22px 0; }
.lp-v2 details.faq-item:last-child { border-bottom:1px solid var(--rule); }
.lp-v2 details.faq-item summary { list-style:none; font-family:'Inter Tight',sans-serif; font-size:19px; font-weight:600; letter-spacing:-0.015em; display:flex; justify-content:space-between; align-items:center; gap:16px; cursor:pointer; transition:color 0.18s; }
.lp-v2 details.faq-item summary:hover { color:var(--orange); }
.lp-v2 details.faq-item summary::-webkit-details-marker { display:none; }
.lp-v2 details.faq-item summary::after { content:'+'; color:var(--orange); font-family:'JetBrains Mono',monospace; font-size:24px; font-weight:400; }
.lp-v2 details.faq-item[open] summary::after { content:'−'; }
.lp-v2 details.faq-item p { margin-top:12px; font-size:15px; color:var(--ink-soft); line-height:1.65; max-width:68ch; }

/* CLOSER */
.lp-v2 .closer { background:var(--ink); color:var(--bone); padding:120px 24px; text-align:center; }
.lp-v2 .closer-scarcity { display:inline-flex; align-items:center; gap:10px; font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:var(--orange); margin-bottom:26px; padding:8px 16px; border:1px solid var(--orange); }
.lp-v2 .closer-scarcity::before { content:'●'; animation:pulse-orange 1.4s ease-in-out infinite; }
.lp-v2 .closer h2 { font-family:'Inter Tight',sans-serif; font-size:clamp(40px,6vw,80px); line-height:0.98; font-weight:700; letter-spacing:-0.035em; margin-bottom:24px; max-width:18ch; margin-left:auto; margin-right:auto; }
.lp-v2 .closer h2 span { color:var(--orange); }
.lp-v2 .closer p { font-size:18px; color:rgba(250,250,247,0.7); max-width:48ch; margin:0 auto 36px; line-height:1.55; }

/* FOOTER */
.lp-v2 footer.lp { background:var(--bone-2); padding:56px 24px 36px; border-top:1px solid var(--ink); }
.lp-v2 footer.lp .inner { max-width:1280px; margin:0 auto; display:grid; grid-template-columns:1fr; gap:28px; }
@media (min-width:768px) { .lp-v2 footer.lp .inner { grid-template-columns:2fr 1fr 1fr; } }
.lp-v2 footer.lp h5 { font-family:'Inter Tight',sans-serif; font-weight:700; font-size:12px; letter-spacing:0.12em; text-transform:uppercase; margin-bottom:14px; color:var(--orange); }
.lp-v2 footer.lp a { display:block; padding:4px 0; font-size:13px; color:var(--ink-soft); }
.lp-v2 footer.lp a:hover { color:var(--orange); }
.lp-v2 footer.lp p { font-size:13px; color:var(--ink-faint); line-height:1.55; }
.lp-v2 .disclaimer { max-width:1280px; margin:36px auto 0; padding-top:24px; border-top:1px solid var(--rule); font-family:'JetBrains Mono',monospace; font-size:10px; line-height:1.7; color:var(--ink-faint); letter-spacing:0.02em; }
`;

export default function V2Swiss() {
  return (
    <div className="lp-v2">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <header className="nav">
        <div className="nav-inner">
          <a href="#" className="brand">Skynet<span>Labs</span></a>
          <div className="nav-meta"><span className="pulse"></span><span>2 SLOTS LEFT · JUNE 2026</span></div>
          <a href="/discovery-call" className="nav-cta">Book audit →</a>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="wrap">
            <div className="hero-eyebrow"><span className="pulse"></span>US carriers · 5–50 trucks · launch 2026-06-01</div>
            <h1>Big-broker tech, <span className="hl">owner-op</span> price.</h1>
            <p className="hero-sub">Marketing site, dispatch dashboard, and AI voice agent — built under one roof in <strong>14 days</strong>, at <strong>public pricing</strong>, with the repo handed to you on launch. No retainer. No mystery quote.</p>
            <div className="cta-row">
              <a href="/discovery-call" className="btn btn-orange">Book 15-min audit →</a>
              <a href="#pricing" className="btn btn-line">See pricing</a>
            </div>
            <div className="hero-scarcity"><strong>2 slots remaining</strong>&nbsp;· June 2026 · 8h reply</div>
          </div>

          {/* PRODUCT PREVIEW */}
          <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
            <div className="preview">
              <div className="preview-bar">
                <span className="dot r"></span><span className="dot a"></span><span className="dot g"></span>
                <span className="label">dispatch.yourcarrier.io · /loads/active</span>
                <span className="badge">● LIVE</span>
              </div>
              <div className="preview-body">
                <div className="preview-card">
                  <div className="k">ACTIVE LOADS · TODAY</div>
                  <div className="v">14 <small>+3 booked overnight by AI agent</small></div>
                  <div className="preview-list">
                    <div><span>→</span> ORD → DFW · <em>$2,840</em> · pending RC</div>
                    <div><span>→</span> CHI → ATL · <em>$3,120</em> · in transit</div>
                    <div><span>→</span> DEN → SLC · <em>$3,120</em> · auto-booked 02:14</div>
                  </div>
                </div>
                <div className="preview-card">
                  <div className="k">AI VOICE AGENT</div>
                  <div className="v g">ONLINE</div>
                  <div className="preview-list">
                    <div><span>→</span> Calls handled: <em>47</em></div>
                    <div><span>→</span> Loads qualified: <em>22</em></div>
                    <div><span>→</span> Avg wait: <em>1.2s</em></div>
                  </div>
                </div>
                <div className="preview-card">
                  <div className="k">FACTORING · TBS SYNC</div>
                  <div className="v o">$48,210</div>
                  <div className="preview-list">
                    <div><span>→</span> Pending: <em>$12,400</em></div>
                    <div><span>→</span> Cleared today: <em>$8,900</em></div>
                    <div><span>→</span> Net days: <em>1.4</em></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST STRIP */}
        <section className="trust">
          <div className="wrap">
            <div className="trust-label">Operators who own their stack today</div>
            <div className="trust-row">
              <div className="trust-logo">Vow Sanctuary<small>Asheville · wellness</small></div>
              <div className="trust-logo">Wellness DNA<small>DTC · supplements</small></div>
              <div className="trust-logo">GutReno<small>Functional med.</small></div>
              <div className="trust-logo">Pretty Potty<small>Home services</small></div>
              <div className="trust-logo">TimeLapse<small>Construction</small></div>
              <div className="trust-logo">SkynetJoe<small>Open source</small></div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="section">
          <div className="wrap">
            <header className="section-h">
              <div className="kicker">01 · One roof</div>
              <h2>The only stack that ships marketing, dispatch, and AI in 14 days.</h2>
              <p>Agencies build brand and sub-contract software. Dev shops build software but won&apos;t touch brand. AI products lock you into their UI. SkynetLabs does all three — under one operator, in one cycle, with the keys handed over.</p>
            </header>
            <div className="features">
              <div className="feature">
                <div className="feature-id">F01 · BUILD</div>
                <h4>Marketing site that books loads.</h4>
                <p>Premium Next.js or Framer build. Schema-marked. Sub-2s on 4G. CRM-connected out of the box.</p>
                <ul><li>5-page premium site, mobile-first</li><li>Meta Pixel + Conversion API</li><li>Public pricing visible</li><li>SEO + AEO base in 14 days</li></ul>
              </div>
              <div className="feature">
                <div className="feature-id">F02 · OPS</div>
                <h4>Dispatch dashboard, one screen.</h4>
                <p>Custom GHL + n8n build. Pulls DAT, Truckstop, ELD, QuickBooks into a single inbox + load board.</p>
                <ul><li>Single SMS / WA / email inbox</li><li>Factoring integrated (TBS / OTR)</li><li>POD upload + auto-invoice</li><li>Driver SMS automation</li></ul>
              </div>
              <div className="feature">
                <div className="feature-id">F03 · AI</div>
                <h4>Voice agent on inbound 24/7.</h4>
                <p>Vapi or Retell. Branded voice. Answers at 2am, qualifies brokers, books rate confirmations.</p>
                <ul><li>Inbound-only, TCPA-compliant</li><li>Pipeline populated by sunrise</li><li>Auto-routed to driver SMS</li><li>Sub-second answer time</li></ul>
              </div>
              <div className="feature">
                <div className="feature-id">F04 · OWN</div>
                <h4>Source-controlled, no lock-in.</h4>
                <p>Everything lives in your GitHub + n8n on launch day. Keys handed over. Walk anytime.</p>
                <ul><li>Your repo, your org</li><li>n8n workflows portable</li><li>No vendor hostage data</li><li>Hand-off in 24h post-ship</li></ul>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="section">
          <div className="wrap">
            <header className="section-h">
              <div className="kicker">02 · The operators</div>
              <h2>Quietly, they keep buying.</h2>
              <p>Five-star recall from operators who&apos;ve burned a six-month agency retainer before. Public pricing + 14-day ship + source-controlled hand-off — that&apos;s the unlock.</p>
            </header>
            <div className="testimonials">
              <article className="t-card">
                <div className="stars">★★★★★</div>
                <p className="body">We were paying three agencies and a freelancer for less than this one operator <em>shipped in eight days.</em> Repo in our org by Friday.</p>
                <div className="author">
                  <div className="avatar">JR</div>
                  <div className="meta"><strong>James R.</strong><span>Operations · Wellness DNA · Charlotte</span></div>
                </div>
              </article>
              <article className="t-card">
                <div className="stars">★★★★★</div>
                <p className="body">Public pricing is the unlock. Burned $40K on agencies that vanished after the logo. Waseem quoted Tuesday, shipped <em>two weeks later</em>, source in GitHub.</p>
                <div className="author">
                  <div className="avatar">SM</div>
                  <div className="meta"><strong>Sarah M.</strong><span>Founder · Vow Sanctuary · Asheville</span></div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* COMPARISON (DARK) */}
        <section className="section dark">
          <div className="wrap">
            <header className="section-h">
              <div className="kicker">03 · The 5-line map</div>
              <h2>Where the others stop, SkynetLabs begins.</h2>
              <p>Brand agencies. Dev shops. AI products. None of them ship all three in 14 days at public price. Here&apos;s the comparison, line by line.</p>
            </header>
            <div className="compare-wrap">
              <table className="compare-tbl">
                <thead><tr><th>Capability</th><th>SkynetLabs</th><th>Brand agency</th><th>Dev shop</th><th>AI product</th></tr></thead>
                <tbody>
                  <tr><td>Conversion-tuned marketing site</td><td><span className="check bone">✓ 14 days</span></td><td><span className="check">✓ 60 days</span></td><td><span className="x">— scope</span></td><td><span className="x">— template</span></td></tr>
                  <tr><td>Custom dispatch dashboard</td><td><span className="check bone">✓ included</span></td><td><span className="x">— sub-contracted</span></td><td><span className="check">✓ 180 days</span></td><td><span className="x">— their UI only</span></td></tr>
                  <tr><td>AI voice agent, your brand</td><td><span className="check bone">✓ Vapi / Retell</span></td><td><span className="x">—</span></td><td><span className="x">—</span></td><td><span className="check">✓ their voice</span></td></tr>
                  <tr><td>Public, fixed pricing</td><td><span className="check bone">✓ visible above</span></td><td><span className="x">— custom quote</span></td><td><span className="x">— T&amp;M</span></td><td><span className="check">✓ but not bespoke</span></td></tr>
                  <tr><td>Source-controlled hand-off</td><td><span className="check bone">✓ your GitHub</span></td><td><span className="x">— hostage data</span></td><td><span className="check">✓ partial</span></td><td><span className="x">— vendor lock</span></td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section className="section" id="pricing">
          <div className="wrap">
            <header className="section-h">
              <div className="kicker">04 · Public pricing</div>
              <h2>Four tiers. Pick one. Done.</h2>
              <p>Half on signature. Half on launch. Cancel anytime, walk with what&apos;s built. Most 12–22 truck operators land on Premium.</p>
            </header>
            <div className="pricing-row">
              <div className="tier">
                <div className="tier-id">T01</div>
                <div className="tier-name">Starter</div>
                <div className="tier-meta">14d · site + CRM + WA</div>
                <div className="tier-price">$1,497<small>flat · no monthly</small></div>
                <ul className="tier-feat"><li>5-page Next.js / Framer site</li><li>GHL CRM + pipelines</li><li>WhatsApp Business inbox</li><li>Meta Pixel + CAPI</li><li>2 revision rounds</li></ul>
                <a href="/discovery-call" className="tier-cta">Start Starter →</a>
              </div>
              <div className="tier">
                <div className="tier-id">T02</div>
                <div className="tier-name">Pro</div>
                <div className="tier-meta">21d · + dispatch + factoring</div>
                <div className="tier-price">$3,997<small>+ $497/mo</small></div>
                <ul className="tier-feat"><li>Everything in Starter</li><li>Custom dispatch dashboard</li><li>TBS / OTR factoring</li><li>SMS + email automation</li><li>Monthly opt call</li></ul>
                <a href="/discovery-call" className="tier-cta">Start Pro →</a>
              </div>
              <div className="tier featured">
                <span className="tier-tag">★ MOST LAND HERE</span>
                <div className="tier-id">T03</div>
                <div className="tier-name">Premium</div>
                <div className="tier-meta">30d · + ad ops + lead gen</div>
                <div className="tier-price">$7,997<small>+ $997/mo</small></div>
                <ul className="tier-feat"><li>Everything in Pro</li><li>Meta + LinkedIn ad build</li><li>Lead gen ops (cold + warm)</li><li>UGC content batch monthly</li><li>Weekly review</li></ul>
                <a href="/discovery-call" className="tier-cta">Book Premium audit →</a>
              </div>
              <div className="tier">
                <div className="tier-id">T04</div>
                <div className="tier-name">Flagship</div>
                <div className="tier-meta">45d · AI Dispatcher Agent™</div>
                <div className="tier-price">$9,500<small>+ $1,997/mo</small></div>
                <ul className="tier-feat"><li>Everything in Premium</li><li>Vapi / Retell voice agent</li><li>Inbound load qualification</li><li>24/7 phone coverage</li><li>Auto-pipeline population</li></ul>
                <a href="/discovery-call" className="tier-cta">Talk Flagship →</a>
              </div>
            </div>
          </div>
        </section>

        {/* FOUNDER */}
        <section className="section">
          <div className="wrap">
            <header className="section-h">
              <div className="kicker">05 · The operator</div>
              <h2>Yes solo. Yes Bali. Here&apos;s why that&apos;s your edge.</h2>
            </header>
            <div className="founder">
              <figure className="founder-photo"><img src="/lp/freight/v2/feature.jpg" alt="Waseem Nasir, founder" loading="lazy" /></figure>
              <div className="founder-text">
                <h3>Waseem Nasir — solo builder, Canggu, Bali.</h3>
                <p>Not a 12-person agency. One operator with Claude as second seat, writing this from Liberty Market in Lahore (visa window) and shipping from Crate Cafe in Canggu the rest of the year. Iced latte: 35,000 IDR. Wi-Fi faster than Manhattan.</p>
                <p>Reason that&apos;s <mark>your edge</mark> — not paying eight account managers and a creative director. Lights stay on because I ship something every week that makes a small-fleet owner more money.</p>
                <p>Past clients I&apos;ll name: <strong>Vow Sanctuary</strong> (Asheville NC), <strong>Wellness DNA</strong>, <strong>GutReno</strong>, <strong>Pretty Potty</strong>, <strong>TimeLapse Renovation</strong>, <strong>SkynetJoe</strong>. Every one owns their GitHub repo + n8n workflows the day we hand off.</p>
                <div className="founder-stats">
                  <div><div className="stat-v">9+</div><div className="stat-l">Shipped builds</div></div>
                  <div><div className="stat-v">14d</div><div className="stat-l">Ship window</div></div>
                  <div><div className="stat-v">$0</div><div className="stat-l">Audit fee</div></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section">
          <div className="wrap">
            <header className="section-h">
              <div className="kicker">06 · Questions first</div>
              <h2>No, you&apos;re not too small.</h2>
            </header>
            <div className="faq-list">
              <details className="faq-item"><summary>I only have 5 trucks. Is this overkill?</summary><p>Starter ($1,497) is for 5–10. Site + CRM + WhatsApp inbox in 14 days. No retainer. Cancel anytime, walk with what&apos;s built.</p></details>
              <details className="faq-item"><summary>FMCSA / TCPA compliance — covered?</summary><p>SkynetLabs provides software, design, and marketing services only. Not a freight broker or motor carrier. All voice flows inbound-only, TCPA-compliant consent.</p></details>
              <details className="faq-item"><summary>Burned $20K with an agency before — why different?</summary><p>Public pricing fixes that. 14-day ship fixes that. Source-controlled hand-off fixes that. Miss the window, you keep what&apos;s built, we re-scope free.</p></details>
              <details className="faq-item"><summary>What does the audit cover?</summary><p>15 min on Cal.com. Review your current stack, flag 2–3 biggest gaps, recommend yes / no / referral. No commitment. Fit = fixed scope in 48 hours.</p></details>
            </div>
          </div>
        </section>

        {/* CLOSER */}
        <section className="closer">
          <div className="closer-scarcity">● 2 slots left · June 2026</div>
          <h2>Four builds a month. <span>Two left for June.</span></h2>
          <p>Eight-hour reply window. Yes / no / referral. No retainer. No &quot;custom quote&quot; theater. Submit the brief, get a real answer.</p>
          <a href="/discovery-call" className="btn btn-orange">Book 15-min audit →</a>
        </section>

        <footer className="lp">
          <div className="inner">
            <div><h5>SkynetLabs</h5><p>One operator. One stack. One roof. Built by Waseem Nasir from Canggu, Bali (GMT+8) + Lahore, Pakistan.</p></div>
            <div><h5>Pages</h5><a href="/services">Services</a><a href="/portfolio">Work</a><a href="/pricing">Pricing</a><a href="/about">About</a></div>
            <div><h5>Reach</h5><a href="/discovery-call">Book audit</a><a href="mailto:waseem@skynetjoe.com">Email</a><a href="https://www.linkedin.com/in/waseemnasir2k26">LinkedIn</a></div>
          </div>
          <p className="disclaimer">SkynetLabs provides software, design, and marketing services. Not a freight broker or motor carrier. No FMCSA authority. Software demos are inbound-only and require user consent (TCPA-compliant). Reference 49 CFR 371 governs broker authority and is not implicated by services described herein. Public pricing reflects standard scope as of 2026-06-01 and may vary by custom requirements. © 2026 SkynetLabs · Waseem Nasir.</p>
        </footer>
      </main>
    </div>
  );
}
