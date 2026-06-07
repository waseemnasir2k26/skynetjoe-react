"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  Check,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  GitBranch,
  PhoneCall,
  ShieldCheck,
  SlidersHorizontal,
  Truck,
  Zap,
} from "lucide-react";

type PanelKey = "intake" | "dispatch" | "cash" | "growth";

const panels: Record<
  PanelKey,
  {
    label: string;
    eyebrow: string;
    title: string;
    body: string;
    metrics: [string, string, string][];
    rows: [string, string, string][];
  }
> = {
  intake: {
    label: "Voice intake",
    eyebrow: "After-hours broker call",
    title: "AI qualifies the offer before your dispatcher opens the laptop.",
    body: "Route, rate, equipment, callback, broker, and notes are captured in the CRM. Low-margin offers get countered or filtered.",
    metrics: [
      ["47", "calls today", "+22 qualified"],
      ["8.2s", "avg response", "-72% wait"],
      ["17", "after-hours saves", "week one"],
    ],
    rows: [
      ["Maverick", "Dallas -> Phoenix", "$2,840 booked"],
      ["CRST", "Atlanta -> Charlotte", "$1,120 routed"],
      ["Landstar", "Chicago -> Indy", "$890 accepted"],
    ],
  },
  dispatch: {
    label: "Dispatch board",
    eyebrow: "Live operating layer",
    title:
      "Loads, drivers, lanes, and broker context stay in one command view.",
    body: "The dashboard is built around your current tools: DAT, TMS, QuickBooks, driver comms, and GHL pipeline.",
    metrics: [
      ["12", "active loads", "4 need review"],
      ["9", "trucks live", "2 available"],
      ["3.41", "$/mi avg", "+0.22 today"],
    ],
    rows: [
      ["Alvin C.", "ATL -> CLT", "ETA 18:42"],
      ["Diego R.", "DAL -> PHX", "POD pending"],
      ["Sarah W.", "Memphis TN", "Available"],
    ],
  },
  cash: {
    label: "Cash flow",
    eyebrow: "Factoring visibility",
    title:
      "Invoices stop disappearing between factoring portals and accounting.",
    body: "Triumph, Apex, RTS, or your current factoring process can be surfaced beside load status and broker history.",
    metrics: [
      ["$28.6K", "settled today", "4 invoices"],
      ["1.4d", "cash-to-day", "-15.6d"],
      ["$4.8K", "fees saved", "YTD"],
    ],
    rows: [
      ["INV-4291", "Maverick", "Settled"],
      ["INV-4288", "Landstar", "Settled"],
      ["INV-4279", "ArcBest", "Pending"],
    ],
  },
  growth: {
    label: "Meta funnel",
    eyebrow: "Paid traffic layer",
    title: "Cold ad clicks get a teardown first, then a qualified audit path.",
    body: "Lead magnet, Pixel, CAPI, CRM stages, retargeting audiences, and booking handoff are wired into one funnel.",
    metrics: [
      ["12-tab", "teardown", "lead magnet"],
      ["CAPI", "server events", "day one"],
      ["8hr", "reply window", "weekday"],
    ],
    rows: [
      ["Cold click", "PDF teardown", "Lead captured"],
      ["Warm retarget", "Dashboard demo", "Audit booked"],
      ["Qualified", "Pricing route", "SOW sent"],
    ],
  },
};

const modules = [
  [
    "Voice intake",
    "Inbound broker calls qualified 24/7 with route, rate, equipment, and callback captured.",
  ],
  [
    "Dispatch canvas",
    "Driver status, broker context, lane economics, and exceptions in one focused board.",
  ],
  [
    "Cash visibility",
    "Factoring and invoice state surfaced before the load becomes an accounting problem.",
  ],
  [
    "Ad funnel",
    "Meta lead magnet, Pixel/CAPI, CRM routing, and booking path built as one system.",
  ],
];

const pricing = [
  [
    "Starter",
    "$1,497",
    "14 days",
    "Site + CRM + intake",
    [
      "5-page premium site",
      "GHL pipeline",
      "Inbound contact inbox",
      "Pixel + CAPI",
    ],
  ],
  [
    "Pro",
    "$3,997",
    "21 days",
    "+ dispatch canvas",
    [
      "Everything in Starter",
      "Dispatch dashboard",
      "Factoring widget",
      "SMS confirms",
    ],
  ],
  [
    "Premium",
    "$7,997",
    "30 days",
    "+ ad ops",
    [
      "Everything in Pro",
      "Meta + LinkedIn ads",
      "Lead-gen flows",
      "Monthly content batch",
    ],
  ],
  [
    "Flagship",
    "$9,500",
    "45 days",
    "+ AI dispatcher",
    [
      "Everything in Premium",
      "Branded voice agent",
      "24/7 coverage",
      "Custom load qualifier",
    ],
  ],
];

const css = `
.fo {
  --bg:#f6f3ea;
  --panel:#fffdf7;
  --panel-2:#eee7d9;
  --ink:#141512;
  --muted:#5a5c54;
  --soft:#878477;
  --line:rgba(20,21,18,.12);
  --line-2:rgba(20,21,18,.22);
  --accent:#c7663d;
  --accent-2:#9e4b2c;
  --gold:#b99657;
  --green:#3d7050;
  --black:#181914;
  background:
    radial-gradient(circle at 12% 0%, rgba(199,102,61,.12), transparent 28%),
    linear-gradient(180deg,#fbf8f0 0%, var(--bg) 48%, #ebe2d4 100%);
  color:var(--ink);
  font-family:var(--font-sans), Inter, system-ui, sans-serif;
  min-height:100vh;
  overflow-x:hidden;
}
.fo * { box-sizing:border-box; }
.fo a { color:inherit; text-decoration:none; }
.fo button,.fo input { font:inherit; }
.fo .wrap { width:min(1180px, calc(100% - 40px)); margin:0 auto; }
.fo .top {
  background:var(--black);
  color:#fff8ed;
  font-size:12px;
  font-weight:800;
  letter-spacing:.08em;
  text-align:center;
  text-transform:uppercase;
  padding:9px 16px;
}
.fo .top b { color:var(--gold); }
.fo .nav {
  position:sticky;
  top:0;
  z-index:40;
  background:rgba(246,243,234,.86);
  backdrop-filter:blur(18px);
  border-bottom:1px solid var(--line);
}
.fo .navin { height:70px; display:flex; align-items:center; justify-content:space-between; gap:20px; }
.fo .brand { display:flex; align-items:center; gap:11px; font-weight:950; font-size:20px; letter-spacing:-.04em; }
.fo .brand i { width:13px; height:13px; border-radius:3px; background:var(--accent); display:block; }
.fo .brand span span { color:var(--accent); }
.fo .navlinks { display:flex; align-items:center; gap:22px; color:var(--muted); font-weight:800; font-size:13px; }
.fo .navlinks a:hover { color:var(--accent); }
.fo .navbtn {
  display:inline-flex;
  align-items:center;
  gap:8px;
  background:var(--ink);
  color:#fff8ed;
  padding:12px 16px;
  border-radius:8px;
}
.fo .hero { padding:54px 0 32px; }
.fo .heroGrid { display:grid; grid-template-columns:minmax(0,.9fr) minmax(520px,1.1fr); gap:42px; align-items:center; }
.fo .kicker {
  display:inline-flex;
  align-items:center;
  gap:9px;
  width:max-content;
  max-width:100%;
  color:var(--accent-2);
  background:rgba(199,102,61,.08);
  border:1px solid rgba(199,102,61,.2);
  border-radius:999px;
  padding:8px 12px;
  font-size:11px;
  font-weight:950;
  letter-spacing:.1em;
  text-transform:uppercase;
}
.fo .kicker:before { content:""; width:7px; height:7px; border-radius:50%; background:var(--accent); box-shadow:0 0 0 5px rgba(199,102,61,.13); }
.fo h1,.fo h2,.fo h3 { margin:0; letter-spacing:-.045em; line-height:1.02; }
.fo h1 { margin-top:20px; font-size:clamp(48px,6.5vw,84px); max-width:10.7ch; }
.fo h1 em,.fo h2 em { color:var(--accent); font-style:normal; }
.fo .lead { margin:22px 0 0; max-width:620px; color:var(--muted); font-size:19px; line-height:1.56; }
.fo .actions { display:flex; flex-wrap:wrap; gap:12px; margin-top:28px; }
.fo .btn {
  min-height:54px;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:10px;
  border:1px solid transparent;
  border-radius:10px;
  padding:15px 19px;
  font-size:14px;
  font-weight:950;
  cursor:pointer;
  transition:transform .18s ease, box-shadow .18s ease, background .18s ease;
}
.fo .btn:hover { transform:translateY(-2px); box-shadow:0 14px 28px rgba(20,21,18,.12); }
.fo .btnPrimary { background:var(--accent); color:#fff8ed; }
.fo .btnDark { background:var(--ink); color:#fff8ed; }
.fo .btnGhost { background:var(--panel); border-color:var(--line-2); color:var(--ink); }
.fo .trust { display:flex; flex-wrap:wrap; gap:12px; margin-top:20px; color:var(--muted); font-size:13px; font-weight:800; }
.fo .trust span { display:flex; align-items:center; gap:7px; }
.fo .trust svg { color:var(--accent); }
.fo .lab {
  position:relative;
  background:linear-gradient(180deg,#252620,#151612);
  color:#fff8ed;
  border-radius:24px;
  padding:14px;
  box-shadow:0 34px 90px rgba(20,21,18,.22);
  border:1px solid rgba(255,255,255,.1);
}
.fo .lab:before {
  content:"";
  position:absolute;
  inset:-1px;
  border-radius:24px;
  padding:1px;
  background:linear-gradient(135deg,rgba(199,102,61,.9),rgba(185,150,87,.22),rgba(255,255,255,.18));
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
  -webkit-mask-composite:xor;
  mask-composite:exclude;
  pointer-events:none;
}
.fo .labTop { display:flex; align-items:center; justify-content:space-between; padding:12px 12px 16px; }
.fo .dots { display:flex; gap:7px; }
.fo .dots i { width:10px; height:10px; border-radius:50%; background:var(--accent); display:block; }
.fo .dots i:nth-child(2){ background:var(--gold); }
.fo .dots i:nth-child(3){ background:var(--green); }
.fo .url { color:rgba(255,248,237,.58); font:800 11px var(--font-mono-plex),monospace; }
.fo .panelPicker { display:grid; grid-template-columns:repeat(4,1fr); gap:8px; margin-bottom:10px; }
.fo .tab {
  border:1px solid rgba(255,255,255,.1);
  background:rgba(255,255,255,.06);
  color:rgba(255,248,237,.66);
  border-radius:12px;
  padding:11px 9px;
  font-size:12px;
  font-weight:900;
  cursor:pointer;
}
.fo .tabActive { background:#fff8ed; color:var(--ink); }
.fo .screen {
  background:#fff8ed;
  color:var(--ink);
  border-radius:16px;
  display:grid;
  grid-template-columns:190px 1fr;
  min-height:500px;
  overflow:hidden;
}
.fo .rail { background:#eee6d7; border-right:1px solid var(--line); padding:18px 12px; }
.fo .rail b { display:block; color:var(--soft); font-size:10px; letter-spacing:.14em; text-transform:uppercase; padding:7px 9px; }
.fo .rail span { display:flex; align-items:center; justify-content:space-between; color:var(--muted); font-size:13px; font-weight:850; margin:4px 0; padding:10px 9px; border-radius:9px; }
.fo .rail .on { background:var(--panel); color:var(--ink); box-shadow:inset 0 0 0 1px var(--line); }
.fo .workspace { padding:24px; }
.fo .workspaceHead { display:flex; justify-content:space-between; gap:18px; align-items:flex-start; }
.fo .workspaceHead small { color:var(--accent-2); text-transform:uppercase; letter-spacing:.12em; font-weight:950; font-size:11px; }
.fo .workspaceHead h2 { margin-top:8px; font-size:30px; max-width:600px; }
.fo .workspaceHead p { color:var(--muted); max-width:560px; margin:12px 0 0; }
.fo .pulse {
  display:flex;
  align-items:center;
  gap:8px;
  color:var(--green);
  font-size:11px;
  font-weight:950;
  text-transform:uppercase;
  letter-spacing:.12em;
}
.fo .pulse:before { content:""; width:8px; height:8px; border-radius:50%; background:var(--green); box-shadow:0 0 0 6px rgba(61,112,80,.12); }
.fo .metrics { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin:22px 0; }
.fo .metric { background:#f6efe2; border:1px solid var(--line); border-radius:14px; padding:15px; }
.fo .metric strong { display:block; font:950 28px var(--font-mono-plex),monospace; letter-spacing:-.04em; }
.fo .metric span { display:block; color:var(--muted); font-size:12px; font-weight:850; }
.fo .metric small { color:var(--green); font-size:11px; font-weight:900; }
.fo .rows { display:grid; gap:8px; }
.fo .row { display:grid; grid-template-columns:1fr 1.2fr auto; gap:10px; align-items:center; border:1px solid var(--line); border-radius:12px; padding:12px; background:var(--panel); }
.fo .row b { font-size:13px; }
.fo .row span { color:var(--muted); font-size:13px; }
.fo .row strong { color:var(--green); font-size:13px; }
.fo .sim { margin-top:12px; background:#151612; color:#fff8ed; border-radius:14px; padding:16px; }
.fo .simLine { display:grid; grid-template-columns:repeat(4,1fr); gap:8px; }
.fo .simStep { border:1px solid rgba(255,255,255,.12); border-radius:12px; padding:12px; color:rgba(255,248,237,.68); }
.fo .simStepActive { background:rgba(199,102,61,.18); border-color:rgba(199,102,61,.5); color:#fff8ed; }
.fo .simStep b { display:block; font-size:12px; }
.fo .simStep small { font-size:11px; color:inherit; }
.fo .section { padding:86px 0; }
.fo .sectionAlt { background:rgba(238,231,217,.66); border-top:1px solid var(--line); border-bottom:1px solid var(--line); }
.fo .head { display:grid; grid-template-columns:.95fr .75fr; gap:40px; align-items:end; margin-bottom:36px; }
.fo h2 { font-size:clamp(34px,4.6vw,58px); max-width:12ch; }
.fo .head p { color:var(--muted); font-size:18px; margin:0; }
.fo .calcGrid { display:grid; grid-template-columns:.9fr 1.1fr; gap:18px; align-items:stretch; }
.fo .calc,.fo .result,.fo .card,.fo .price {
  background:var(--panel);
  border:1px solid var(--line);
  border-radius:18px;
  box-shadow:0 12px 32px rgba(20,21,18,.04);
}
.fo .calc { padding:24px; }
.fo .field { margin:18px 0; }
.fo .field label { display:flex; justify-content:space-between; color:var(--muted); font-weight:900; font-size:13px; }
.fo input[type=range] { width:100%; accent-color:var(--accent); }
.fo .result { padding:28px; display:grid; align-content:center; }
.fo .bigMoney { font-size:clamp(44px,7vw,82px); font-weight:950; letter-spacing:-.07em; line-height:1; color:var(--accent); }
.fo .result p { color:var(--muted); max-width:540px; }
.fo .moduleGrid { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; }
.fo .card { padding:22px; }
.fo .card svg { color:var(--accent); }
.fo .card h3 { font-size:22px; margin:14px 0 8px; }
.fo .card p { color:var(--muted); }
.fo .pricing { display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:var(--line); border:1px solid var(--line-2); border-radius:18px; overflow:hidden; }
.fo .price { border:0; border-radius:0; padding:24px; display:flex; flex-direction:column; }
.fo .priceFeatured { background:linear-gradient(180deg,rgba(199,102,61,.13),var(--panel)); }
.fo .price h3 { font-size:25px; }
.fo .price .amount { font-size:42px; font-weight:950; letter-spacing:-.06em; margin:14px 0 2px; }
.fo .price p { color:var(--accent-2); font-weight:900; margin:0 0 18px; }
.fo .price ul { list-style:none; padding:0; margin:0 0 22px; flex:1; }
.fo .price li { border-top:1px solid var(--line); padding:9px 0; color:var(--muted); font-size:14px; }
.fo .faq { max-width:820px; margin:0 auto; border-top:1px solid var(--line); }
.fo details { border-bottom:1px solid var(--line); padding:20px 0; }
.fo summary { cursor:pointer; font-size:20px; font-weight:950; list-style:none; }
.fo summary::-webkit-details-marker { display:none; }
.fo details p { color:var(--muted); max-width:65ch; }
.fo .closer { text-align:center; padding:90px 0; background:radial-gradient(circle at 50% 0%,rgba(199,102,61,.14),transparent 42%); }
.fo .closer h2 { margin:14px auto 0; }
.fo .closer p { color:var(--muted); max-width:620px; margin:18px auto 0; font-size:18px; }
.fo footer { background:var(--black); color:rgba(255,248,237,.72); padding:42px 0; font-size:13px; }
.fo .foot { display:grid; grid-template-columns:2fr 1fr 1fr 1fr; gap:28px; }
.fo footer h3 { color:#fff8ed; margin:0 0 10px; }
.fo footer a { display:block; margin:5px 0; }
@media (max-width:1040px) {
  .fo .heroGrid,.fo .head,.fo .calcGrid { grid-template-columns:1fr; }
  .fo .hero { padding-top:48px; }
  .fo .screen { grid-template-columns:1fr; }
  .fo .rail { display:none; }
  .fo .moduleGrid,.fo .pricing { grid-template-columns:repeat(2,1fr); }
}
@media (max-width:720px) {
  .fo .wrap { width:min(100% - 28px,1180px); }
  .fo .top { font-size:10px; line-height:1.5; }
  .fo .navin { height:64px; }
  .fo .brand { font-size:18px; }
  .fo .navlinks a:not(.navbtn) { display:none; }
  .fo .hero { padding-top:38px; }
  .fo h1 { font-size:40px; max-width:10ch; }
  .fo .lead { font-size:16px; }
  .fo .actions .btn { width:100%; }
  .fo .lab { border-radius:18px; padding:10px; }
  .fo .panelPicker { grid-template-columns:repeat(2,1fr); }
  .fo .workspace { padding:18px; }
  .fo .workspaceHead { display:block; }
  .fo .workspaceHead h2 { font-size:25px; }
  .fo .metrics,.fo .simLine,.fo .moduleGrid,.fo .pricing,.fo .foot { grid-template-columns:1fr; }
  .fo .row { grid-template-columns:1fr; }
  .fo .section { padding:64px 0; }
  .fo h2 { font-size:38px; }
}
`;

function CheckList({ items }: { items: string[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item}>
          <Check size={15} aria-hidden="true" /> {item}
        </li>
      ))}
    </ul>
  );
}

export default function FreightOpsInteractive() {
  const [panel, setPanel] = useState<PanelKey>("intake");
  const [step, setStep] = useState(1);
  const [trucks, setTrucks] = useState(9);
  const [missedCalls, setMissedCalls] = useState(7);
  const [loadValue, setLoadValue] = useState(620);
  const active = panels[panel];

  const leak = useMemo(() => {
    const bookRate = 0.28;
    return Math.round(missedCalls * bookRate * loadValue * 4);
  }, [missedCalls, loadValue]);

  return (
    <div className="fo">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="top">
        June dispatch cohort - <b>interactive audit open</b> - four operator
        builds available
      </div>
      <header className="nav">
        <div className="wrap navin">
          <Link className="brand" href="/">
            <i aria-hidden="true" />
            <span>
              SkynetLabs <span>FreightOps</span>
            </span>
          </Link>
          <nav className="navlinks" aria-label="Page navigation">
            <a href="#demo">Demo</a>
            <a href="#calculator">Calculator</a>
            <a href="#pricing">Pricing</a>
            <Link className="navbtn" href="/discovery-call">
              Book audit <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" id="demo">
          <div className="wrap heroGrid">
            <div>
              <div className="kicker">For US carriers with 5-25 trucks</div>
              <h1>
                Your dispatch stack should feel <em>alive.</em>
              </h1>
              <p className="lead">
                SkynetLabs builds an interactive FreightOps command center: AI
                call intake, dispatch visibility, factoring status, and
                Meta-ready lead flow in 14 days.
              </p>
              <div className="actions">
                <Link className="btn btnPrimary" href="/discovery-call">
                  <CalendarDays size={18} aria-hidden="true" /> Book a 15-min
                  audit
                </Link>
                <a className="btn btnGhost" href="#calculator">
                  <SlidersHorizontal size={18} aria-hidden="true" /> Run
                  missed-load calculator
                </a>
              </div>
              <div className="trust">
                <span>
                  <Clock3 size={15} /> 14-day Starter
                </span>
                <span>
                  <GitBranch size={15} /> You own the repo
                </span>
                <span>
                  <ShieldCheck size={15} /> Inbound-only voice by default
                </span>
              </div>
            </div>

            <div className="lab" aria-label="Interactive FreightOps demo">
              <div className="labTop">
                <div className="dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </div>
                <div className="url">freightops.skynetlabs.app/live</div>
              </div>
              <div className="panelPicker">
                {(Object.keys(panels) as PanelKey[]).map((key) => (
                  <button
                    key={key}
                    className={`tab ${panel === key ? "tabActive" : ""}`}
                    type="button"
                    onClick={() => setPanel(key)}
                  >
                    {panels[key].label}
                  </button>
                ))}
              </div>
              <div className="screen">
                <aside className="rail">
                  <b>Workspace</b>
                  <span className={panel === "intake" ? "on" : ""}>
                    Voice intake <ChevronRight size={14} />
                  </span>
                  <span className={panel === "dispatch" ? "on" : ""}>
                    Dispatch board <ChevronRight size={14} />
                  </span>
                  <span className={panel === "cash" ? "on" : ""}>
                    Cash flow <ChevronRight size={14} />
                  </span>
                  <span className={panel === "growth" ? "on" : ""}>
                    Meta funnel <ChevronRight size={14} />
                  </span>
                  <b>Agents</b>
                  <span>Rate qualifier</span>
                  <span>SMS confirm</span>
                </aside>
                <div className="workspace">
                  <div className="workspaceHead">
                    <div>
                      <small>{active.eyebrow}</small>
                      <h2>{active.title}</h2>
                      <p>{active.body}</p>
                    </div>
                    <div className="pulse">live</div>
                  </div>
                  <div className="metrics">
                    {active.metrics.map(([value, label, note]) => (
                      <div className="metric" key={label}>
                        <strong>{value}</strong>
                        <span>{label}</span>
                        <small>{note}</small>
                      </div>
                    ))}
                  </div>
                  <div className="rows">
                    {active.rows.map(([a, b, c]) => (
                      <div className="row" key={`${a}-${b}`}>
                        <b>{a}</b>
                        <span>{b}</span>
                        <strong>{c}</strong>
                      </div>
                    ))}
                  </div>
                  <div className="sim">
                    <div className="simLine">
                      {[
                        ["1", "Call captured"],
                        ["2", "Rate qualified"],
                        ["3", "Dispatcher routed"],
                        ["4", "Invoice tracked"],
                      ].map(([num, label], index) => (
                        <button
                          className={`simStep ${step === index + 1 ? "simStepActive" : ""}`}
                          key={num}
                          type="button"
                          onClick={() => setStep(index + 1)}
                        >
                          <b>Step {num}</b>
                          <small>{label}</small>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section sectionAlt" id="calculator">
          <div className="wrap">
            <div className="head">
              <div>
                <div className="kicker">Interactive audit</div>
                <h2>Estimate the leak before you book.</h2>
              </div>
              <p>
                This is not a perfect financial model. It is a simple way to
                show why missed calls, slow response, and manual routing become
                expensive for a small fleet.
              </p>
            </div>
            <div className="calcGrid">
              <div className="calc">
                <div className="field">
                  <label>
                    Trucks in fleet <b>{trucks}</b>
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="25"
                    value={trucks}
                    onChange={(e) => setTrucks(Number(e.target.value))}
                  />
                </div>
                <div className="field">
                  <label>
                    Missed broker calls per week <b>{missedCalls}</b>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={missedCalls}
                    onChange={(e) => setMissedCalls(Number(e.target.value))}
                  />
                </div>
                <div className="field">
                  <label>
                    Estimated net per booked load <b>${loadValue}</b>
                  </label>
                  <input
                    type="range"
                    min="250"
                    max="1500"
                    step="25"
                    value={loadValue}
                    onChange={(e) => setLoadValue(Number(e.target.value))}
                  />
                </div>
              </div>
              <div className="result">
                <div className="bigMoney">${leak.toLocaleString()}</div>
                <p>
                  Estimated monthly opportunity sitting inside missed calls and
                  slow follow-up for a {trucks}-truck fleet. The audit maps
                  exactly where the leak is coming from.
                </p>
                <Link className="btn btnDark" href="/discovery-call">
                  Book the audit <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="head">
              <div>
                <div className="kicker">Modules</div>
                <h2>Built like a product, scoped like a project.</h2>
              </div>
              <p>
                The page no longer sells abstract automation. It shows the
                operating system: intake, dispatch, cash, and growth.
              </p>
            </div>
            <div className="moduleGrid">
              {[PhoneCall, Truck, CircleDollarSign, Zap].map((Icon, index) => (
                <article className="card" key={modules[index][0]}>
                  <Icon size={28} aria-hidden="true" />
                  <h3>{modules[index][0]}</h3>
                  <p>{modules[index][1]}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section sectionAlt" id="pricing">
          <div className="wrap">
            <div className="head">
              <div>
                <div className="kicker">Public pricing</div>
                <h2>Clear paths after the audit.</h2>
              </div>
              <p>
                Half on signature, half on launch. You own the GitHub repo,
                workflows, and GHL account on day one.
              </p>
            </div>
            <div className="pricing">
              {pricing.map(([tier, amount, days, desc, list], index) => (
                <article
                  className={`price ${index === 2 ? "priceFeatured" : ""}`}
                  key={tier as string}
                >
                  <h3>{tier}</h3>
                  <small>{days}</small>
                  <div className="amount">{amount}</div>
                  <p>{desc}</p>
                  <CheckList items={list as string[]} />
                  <Link
                    className={index === 2 ? "btn btnPrimary" : "btn btnGhost"}
                    href="/discovery-call"
                  >
                    Book discovery <ArrowRight size={16} />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="head">
              <div>
                <div className="kicker">Questions</div>
                <h2>Answer the objections before the call.</h2>
              </div>
              <p>
                Small carriers need clarity: existing tools, compliance,
                ownership, and what happens if the build is not a fit.
              </p>
            </div>
            <div className="faq">
              <details open>
                <summary>Are you replacing DAT or my TMS?</summary>
                <p>
                  No. The strongest build connects around the tools you already
                  use. FreightOps becomes the operating layer between them.
                </p>
              </details>
              <details>
                <summary>Are you a broker or motor carrier?</summary>
                <p>
                  No. SkynetLabs provides software, design, and marketing
                  systems. Broker authority stays with you.
                </p>
              </details>
              <details>
                <summary>What if I only run 5 trucks?</summary>
                <p>
                  Starter is built for 5-10 trucks and ships in 14 days: site,
                  CRM, inbound inbox, Pixel, and CAPI.
                </p>
              </details>
              <details>
                <summary>What if I am not ready to book?</summary>
                <p>
                  Use the teardown path first. The page is designed for Meta
                  traffic, so the audit is not the only conversion.
                </p>
              </details>
            </div>
          </div>
        </section>

        <section className="closer">
          <div className="wrap">
            <div className="kicker" style={{ margin: "0 auto" }}>
              Fifteen-minute audit
            </div>
            <h2>See the leak. Then decide.</h2>
            <p>
              No quote theater. No generic automation pitch. You walk away with
              the dispatch-stack findings either way.
            </p>
            <div className="actions" style={{ justifyContent: "center" }}>
              <Link className="btn btnPrimary" href="/discovery-call">
                <CalendarDays size={18} /> Book the discovery call
              </Link>
              <a className="btn btnGhost" href="#demo">
                <BarChart3 size={18} /> Replay the demo
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap foot">
          <div>
            <h3>SkynetLabs FreightOps</h3>
            <p>
              One operator. One stack. One roof. Waseem Nasir - Canggu, Bali and
              Lahore.
            </p>
          </div>
          <div>
            <h3>Build</h3>
            <Link href="/services">Services</Link>
            <Link href="/portfolio">Work</Link>
          </div>
          <div>
            <h3>Convert</h3>
            <Link href="/discovery-call">Book audit</Link>
            <a href="#calculator">Calculator</a>
          </div>
          <div>
            <h3>Trust</h3>
            <a href="mailto:info@skynetjoe.com">Email</a>
            <a href="https://www.linkedin.com/in/waseemnasir2k26">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
