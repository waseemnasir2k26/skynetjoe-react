import type { Metadata } from "next";
import { SITE } from "@/lib/site";

// Meta-ads companion page for the HVAC AI Speed-to-Lead system
// ($2,500 setup + $395/mo). This is an ILLUSTRATION page, not a demo:
// the Instant Form thank-you button and the 15-min sales call both land here.
// Claims discipline (CLAIMS-WHITELIST.md rules apply): no statistics, no
// client names/counts, no testimonials, no guarantees, no asserted reply-time
// numbers. The SMS walkthrough below is fictional and is labeled
// "Simulated demonstration" as its FIRST visible element (hard rule).
const PAGE_URL = `${SITE.url.replace(/\/+$/, "")}/lp/speed-to-lead`;
const WHATSAPP_URL =
  "https://wa.me/6281316077185?text=Hi%20Waseem%20—%20saw%20the%20HVAC%20speed-to-lead%20page.";
const INSTAGRAM_URL = "https://instagram.com/waseemnasir009";

export const metadata: Metadata = {
  title: "HVAC Missed-Call Rescue — AI Speed-to-Lead System | SkynetLabs",
  description:
    "For HVAC owner-operators running 1–5 trucks. When a call rings out, the system texts the homeowner back, qualifies the job (AC repair, heating, emergency call-outs) and books it onto your calendar while you stay on the tools.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "HVAC Missed-Call Rescue — AI Speed-to-Lead",
    description:
      "Missed HVAC calls become booked jobs. AI texts the caller back, qualifies, and books — while you stay on the tools.",
    url: PAGE_URL,
    type: "website",
    images: [
      { url: "/og-default.png", width: 1200, height: 630, alt: "SkynetLabs" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HVAC Missed-Call Rescue — AI Speed-to-Lead",
    description:
      "Missed HVAC calls become booked jobs. AI texts back, qualifies, books.",
    images: ["/og-default.png"],
  },
};

const css = `
  .s2l-wrap { max-width: 780px; margin: 0 auto; padding: 0 20px;
    --s2l-ink: #1a1a1a; --s2l-cream: #f2efe6; --s2l-rust: #c66b3f; }

  .s2l-hero { padding: 58px 0 26px; }
  .s2l-eyebrow { font-family: var(--font-mono-plex), monospace; font-size: 0.76rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--s2l-rust); margin: 0 0 18px; font-weight: 600; }
  .s2l-hero h1 { font-weight: 800; font-size: clamp(2.2rem, 6.6vw, 3.7rem); line-height: 1.04; letter-spacing: -0.028em; color: var(--s2l-ink); margin: 0 0 18px; }
  .s2l-hero h1 em { font-style: normal; color: var(--s2l-rust); }
  .s2l-hero .sub { font-size: clamp(1.05rem, 2.4vw, 1.25rem); color: #2a2a2a; max-width: 660px; margin: 0 0 24px; line-height: 1.55; }

  .s2l-spec { display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap;
    border-top: 2px solid var(--s2l-ink); border-bottom: 2px solid var(--s2l-ink);
    padding: 14px 2px; margin: 0 0 10px;
    font-family: var(--font-mono-plex), monospace; font-size: 0.84rem; font-weight: 700; letter-spacing: 0.06em; color: var(--s2l-ink); }

  .s2l-sec { padding: 36px 0 8px; }
  .s2l-sec h2 { font-size: clamp(1.5rem, 3.6vw, 2rem); letter-spacing: -0.02em; color: var(--s2l-ink); margin: 0 0 6px; font-weight: 800; }
  .s2l-sec .lead { color: #444; margin: 0 0 22px; font-size: 1rem; }

  /* Workflow diagram */
  .s2l-flow { display: flex; flex-direction: column; gap: 0; }
  .s2l-step { display: flex; gap: 16px; align-items: flex-start; }
  .s2l-step .icon { flex-shrink: 0; width: 52px; height: 52px; border-radius: 14px; background: var(--s2l-ink); color: var(--s2l-cream); display: flex; align-items: center; justify-content: center; font-size: 1.4rem; }
  .s2l-step.hot .icon { background: var(--s2l-rust); }
  .s2l-step .txt h3 { margin: 4px 0 4px; font-size: 1.05rem; }
  .s2l-step .txt p { margin: 0; color: #444; font-size: 0.95rem; line-height: 1.5; }
  .s2l-conn { width: 3px; height: 26px; background: rgba(26,26,26,0.25); margin: 6px 0 6px 24px; border-radius: 2px; }

  /* Simulated SMS demo */
  .s2l-phone { background: var(--s2l-ink); border-radius: 22px; padding: 16px 14px 18px; max-width: 400px; margin: 0 auto; box-shadow: 0 12px 40px rgba(26,26,26,0.25); }
  .s2l-sim-ribbon { display: block; text-align: center; font-family: var(--font-mono-plex), monospace; font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--s2l-ink); background: #f4c26b; border-radius: 8px; padding: 6px 10px; margin: 0 0 12px; font-weight: 700; }
  .s2l-bubbles { display: flex; flex-direction: column; gap: 8px; }
  .s2l-b { max-width: 82%; padding: 10px 13px; border-radius: 16px; font-size: 0.92rem; line-height: 1.42; }
  .s2l-b.sys { background: #3b3b3b; color: var(--s2l-cream); align-self: flex-start; border-bottom-left-radius: 4px; }
  .s2l-b.cust { background: var(--s2l-rust); color: var(--s2l-cream); align-self: flex-end; border-bottom-right-radius: 4px; }
  .s2l-b .who { display: block; font-size: 0.68rem; opacity: 0.65; margin-bottom: 3px; font-family: var(--font-mono-plex), monospace; letter-spacing: 0.08em; text-transform: uppercase; }
  .s2l-phone .cap { text-align: center; color: rgba(242,239,230,0.55); font-size: 0.74rem; margin: 12px 0 0; }

  /* Pain checklist */
  .s2l-pain { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
  .s2l-pain li { background: var(--s2l-cream); border: 1px solid rgba(26,26,26,0.16); border-radius: 12px; padding: 14px 16px; font-size: 1rem; display: flex; gap: 12px; align-items: flex-start; }
  .s2l-pain li b { color: var(--s2l-rust); }
  .s2l-pain .tick { flex-shrink: 0; }

  /* Price + contact */
  .s2l-price-card { background: var(--s2l-ink); color: var(--s2l-cream); border-radius: 16px; padding: 28px 26px; margin: 8px 0 16px; }
  .s2l-price-card h2 { color: var(--s2l-cream); margin: 0 0 6px; font-size: 1.4rem; }
  .s2l-price-row { display: flex; gap: 24px; flex-wrap: wrap; margin: 16px 0 8px; }
  .s2l-price-row .p { font-family: var(--font-mono-plex), monospace; }
  .s2l-price-row .p .n { font-size: 2rem; font-weight: 800; color: var(--s2l-cream); }
  .s2l-price-row .p .l { display: block; font-size: 0.78rem; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(242,239,230,0.6); margin-top: 2px; }
  .s2l-price-card .fine { font-size: 0.88rem; color: rgba(242,239,230,0.72); margin: 10px 0 0; }

  .s2l-contact { display: flex; gap: 12px; flex-wrap: wrap; margin: 18px 0 8px; }
  .s2l-cbtn { display: inline-flex; align-items: center; gap: 8px; text-decoration: none; font-weight: 800; font-size: 1rem; padding: 14px 20px; border-radius: 12px; }
  .s2l-cbtn.wa { background: #25d366; color: #10391f; }
  .s2l-cbtn.ig { background: transparent; color: var(--s2l-cream); border: 2px solid rgba(242,239,230,0.5); }
  .s2l-founder { font-size: 0.92rem; color: rgba(242,239,230,0.85); margin: 14px 0 0; line-height: 1.5; }

  .s2l-foot-note { color: #6b6b6b; font-size: 0.84rem; margin: 26px 0 60px; }
`;

const flow = [
  {
    icon: "📞",
    hot: true,
    h: "A homeowner calls. You're on the tools.",
    p: "Mid-install, on a roof, elbow-deep in a condenser — the call rings out. Today, that homeowner dials the next HVAC company on the list.",
  },
  {
    icon: "💬",
    hot: false,
    h: "The system texts them back",
    p: "The moment the call rings out, an AI assistant opens a real text conversation with the caller — as your business, in plain English.",
  },
  {
    icon: "❓",
    hot: false,
    h: "It qualifies the job",
    p: "No cooling? Furnace out? Emergency call-out or routine AC service? It asks the questions your office would ask, and politely filters the tyre-kickers.",
  },
  {
    icon: "📅",
    hot: false,
    h: "It books the job onto your calendar",
    p: "The caller picks a slot you actually have free. Confirmation goes to them, notification goes to you.",
  },
  {
    icon: "🔔",
    hot: true,
    h: "You finish the job in front of you",
    p: "You climb down the ladder to a booked appointment, not a missed-call log. That's the whole machine.",
  },
];

export default function SpeedToLeadPage() {
  return (
    <div className="s2l-wrap">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <section className="s2l-hero">
        <p className="s2l-eyebrow">HVAC · AI Speed-to-Lead · SkynetLabs</p>
        <h1>
          Your missed calls are <em>your competitor&apos;s</em> best salesman.
        </h1>
        <p className="sub">
          Built for HVAC owner-operators running 1–5 trucks. When you can&apos;t
          answer — after-hours, on a roof, mid-repair — this system texts the
          caller back, qualifies the job and books it onto your calendar while
          you stay on the tools.
        </p>
        <div className="s2l-spec">
          <span>HVAC · AC REPAIR · HEATING</span>
          <span>DONE-FOR-YOU BUILD</span>
          <span>YOU OWN THE CALENDAR</span>
        </div>
      </section>

      <section className="s2l-sec">
        <h2>How the machine works</h2>
        <p className="lead">
          One flow, five moves. I build and wire the whole thing for you.
        </p>
        <div className="s2l-flow">
          {flow.map((s, i) => (
            <div key={s.h}>
              <div className={`s2l-step${s.hot ? " hot" : ""}`}>
                <div className="icon">{s.icon}</div>
                <div className="txt">
                  <h3>{s.h}</h3>
                  <p>{s.p}</p>
                </div>
              </div>
              {i < flow.length - 1 && <div className="s2l-conn" />}
            </div>
          ))}
        </div>
      </section>

      <section className="s2l-sec">
        <h2>What the homeowner sees</h2>
        <p className="lead">
          A walkthrough of the kind of conversation the system holds. This is a
          scripted illustration, not a recording of a real customer.
        </p>
        <div className="s2l-phone">
          <span className="s2l-sim-ribbon">
            Simulated demonstration — fictional conversation
          </span>
          <div className="s2l-bubbles">
            <div className="s2l-b sys">
              <span className="who">Your business</span>
              Hi, this is the assistant for [Your HVAC Co] — sorry we missed
              your call, the techs are on jobs. What&apos;s going on with your
              system?
            </div>
            <div className="s2l-b cust">
              <span className="who">Homeowner</span>
              AC stopped blowing cold this afternoon. It&apos;s 97 out.
            </div>
            <div className="s2l-b sys">
              <span className="who">Your business</span>
              That&apos;s rough in this heat. Is the unit running but blowing
              warm, or not turning on at all?
            </div>
            <div className="s2l-b cust">
              <span className="who">Homeowner</span>
              Running but warm air.
            </div>
            <div className="s2l-b sys">
              <span className="who">Your business</span>
              Got it — sounds like a service call. We have tomorrow 8:30 AM or
              1:00 PM open. Which works?
            </div>
            <div className="s2l-b cust">
              <span className="who">Homeowner</span>
              8:30.
            </div>
            <div className="s2l-b sys">
              <span className="who">Your business</span>
              Booked ✔ You&apos;ll get a confirmation text now, and the tech
              gets your address and notes. See you at 8:30.
            </div>
          </div>
          <p className="cap">
            Illustration of the flow — wording is tailored to your company.
          </p>
        </div>
      </section>

      <section className="s2l-sec">
        <h2>Sound familiar?</h2>
        <p className="lead">If any of these are your week, this is the fix.</p>
        <ul className="s2l-pain">
          <li>
            <span className="tick">🔧</span>
            <span>
              <b>After-hours rings out.</b> Evening and weekend emergency calls
              — the highest-value HVAC work there is — go to voicemail.
            </span>
          </li>
          <li>
            <span className="tick">🪜</span>
            <span>
              <b>You&apos;re the office.</b> You quote, dispatch, invoice and
              answer the phone — from the attic, on a ladder, in a crawlspace.
            </span>
          </li>
          <li>
            <span className="tick">📵</span>
            <span>
              <b>Voicemail box nobody uses.</b> Homeowners with a dead AC
              don&apos;t leave messages. They call the next company.
            </span>
          </li>
          <li>
            <span className="tick">💸</span>
            <span>
              <b>Paying an answering service</b> that takes a message and books
              nothing.
            </span>
          </li>
        </ul>
      </section>

      <section className="s2l-sec">
        <div className="s2l-price-card">
          <h2>Straight pricing</h2>
          <div className="s2l-price-row">
            <div className="p">
              <span className="n">$2,500</span>
              <span className="l">one-time build</span>
            </div>
            <div className="p">
              <span className="n">$395/mo</span>
              <span className="l">to run it</span>
            </div>
          </div>
          <p className="fine">
            Done-for-you: I build it, wire it to your phone line and calendar,
            and tune the conversation to how you actually book jobs. I&apos;m
            Waseem Nasir, founder of SkynetLabs — I build these systems myself.
          </p>
          <div className="s2l-contact">
            <a
              className="s2l-cbtn wa"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 WhatsApp me directly
            </a>
            <a
              className="s2l-cbtn ig"
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              📷 @waseemnasir009
            </a>
          </div>
          <p className="s2l-founder">
            Fastest route: WhatsApp <b>+62 813-1607-7185</b> — message me
            &quot;HVAC&quot; and I&apos;ll reply personally. Or fill the form in
            the ad and watch how fast you hear from me: that speed is the
            product.
          </p>
        </div>
        <p className="s2l-foot-note">
          SkynetLabs builds operations automation — lead routing, booking flows,
          follow-up systems. The walkthrough above is a simulated demonstration;
          your build is configured for your company, your service area and your
          calendar before anything goes live.
        </p>
      </section>
    </div>
  );
}
