import type { Metadata } from "next";
import { MetaPixel, MetaPixelEvents } from "@/components/MetaPixel";
import { SITE } from "@/lib/site";

// Canonical/OG host resolves via SITE.url (env-overridable, defaults to the
// production domain) — same source the rest of the app uses for canonicals.
// Never hardcode the dead `app-eg9h257cv` preview host.
const PAGE_URL = `${SITE.url.replace(/\/+$/, "")}/lp/freight`;

export const metadata: Metadata = {
  title: "Stop Losing Loads to Voicemail | AI Voice Agent for Carriers",
  description:
    "Small-fleet carriers & owner-operators: every call you miss while driving, the broker gives to the next truck. An AI voice agent answers every call and load offer 24/7. Free missed-load audit.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "The Broker Calls. You're Driving. The Load Goes to the Next Truck.",
    description:
      "An AI voice agent answers every call and load offer 24/7 so you stop losing freight to voicemail. Free missed-load audit for small-fleet carriers and owner-operators.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "SkynetLabs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Broker Calls. You're Driving. The Load Goes to the Next Truck.",
    description:
      "An AI voice agent answers every call and load offer 24/7 for carriers and owner-operators. Free missed-load audit.",
    images: ["/og-default.png"],
  },
  robots: { index: false, follow: false },
};

const css = `
  .lp-frt-wrap { max-width: 780px; margin: 0 auto; padding: 0 20px; }

  /* HERO — phone-ringing-in-the-cab motif, distinct from both other LPs */
  .lp-frt-hero { padding: 60px 0 38px; }
  .lp-frt-eyebrow { font-family: var(--font-mono-plex), monospace; font-size: 0.76rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--oxblood); margin: 0 0 18px; font-weight: 600; }
  .lp-frt-hero h1 { font-family: var(--font-serif-fraunces), Georgia, serif; font-size: clamp(2.2rem, 6.6vw, 3.8rem); line-height: 1.0; letter-spacing: -0.022em; color: var(--ink); margin: 0 0 18px; }
  .lp-frt-hero h1 em { font-style: italic; color: var(--terracotta); }
  .lp-frt-hero .sub { font-size: clamp(1.06rem, 2.4vw, 1.3rem); color: #2a2a2a; max-width: 640px; margin: 0 0 28px; line-height: 1.5; }

  /* Ringing phone-in-cab card — pure CSS, the unique hero device */
  .lp-frt-cab { display: flex; align-items: center; gap: 18px; background: var(--ink); color: var(--cream);
    border-radius: 16px; padding: 22px 24px; margin: 0 0 22px; border: 1px solid rgba(0,0,0,0.2); }
  .lp-frt-phone { position: relative; flex-shrink: 0; width: 54px; height: 54px; border-radius: 50%;
    background: var(--terracotta); display: flex; align-items: center; justify-content: center; }
  .lp-frt-phone span { display: block; width: 22px; height: 22px; border-radius: 5px;
    border: 3px solid var(--cream); border-top: none; border-right: none; transform: rotate(-45deg); }
  .lp-frt-phone::before, .lp-frt-phone::after { content: ""; position: absolute; inset: -6px; border-radius: 50%;
    border: 2px solid var(--terracotta); opacity: 0; animation: lp-frt-ring 1.8s ease-out infinite; }
  .lp-frt-phone::after { animation-delay: 0.9s; }
  @keyframes lp-frt-ring { 0% { transform: scale(1); opacity: 0.7; } 100% { transform: scale(1.55); opacity: 0; } }
  .lp-frt-cab .caller { display: flex; flex-direction: column; gap: 3px; }
  .lp-frt-cab .who { font-weight: 700; font-size: 1.02rem; color: var(--cream); }
  .lp-frt-cab .what { font-family: var(--font-mono-plex), monospace; font-size: 0.82rem; color: rgba(242,239,230,0.75); }
  .lp-frt-cab .status { margin-left: auto; font-family: var(--font-mono-plex), monospace; font-size: 0.8rem; font-weight: 700;
    color: var(--ochre); text-align: right; white-space: nowrap; }

  /* Missed-load ticket stack */
  .lp-frt-loads { display: flex; flex-direction: column; gap: 9px; margin: 0 0 32px; }
  .lp-frt-load { display: flex; align-items: center; justify-content: space-between; gap: 14px;
    background: rgba(255,255,255,0.55); border: 1px solid rgba(0,0,0,0.10); border-left: 4px solid var(--oxblood);
    border-radius: 10px; padding: 12px 16px; opacity: 0; transform: translateX(-10px);
    animation: lp-frt-slide 0.5s ease forwards; }
  .lp-frt-load:nth-child(1) { animation-delay: 0.1s; }
  .lp-frt-load:nth-child(2) { animation-delay: 0.5s; }
  .lp-frt-load:nth-child(3) { animation-delay: 0.9s; }
  .lp-frt-load .lane { display: flex; flex-direction: column; gap: 2px; }
  .lp-frt-load .route { font-size: 0.94rem; color: var(--ink); font-weight: 600; }
  .lp-frt-load .when { font-family: var(--font-mono-plex), monospace; font-size: 0.77rem; color: #4a4a4a; }
  .lp-frt-load .gone { font-family: var(--font-mono-plex), monospace; font-size: 1.1rem; font-weight: 700; color: var(--oxblood); white-space: nowrap; }
  @keyframes lp-frt-slide { to { opacity: 1; transform: translateX(0); } }

  .lp-frt-btn { display: inline-block; background: var(--terracotta); color: #fff; padding: 15px 30px; border-radius: 11px;
    font-weight: 700; text-decoration: none; border: none; cursor: pointer; font-size: 1.02rem; font-family: inherit; line-height: 1.1; }
  .lp-frt-btn:hover { background: #a8541f; }
  .lp-frt-btn:focus-visible, .lp-frt-form input:focus-visible, .lp-frt-faq summary:focus-visible {
    outline: 3px solid var(--sage); outline-offset: 2px; }

  /* Sections — boxed/banded rhythm (different from home-services' rule-line rhythm) */
  .lp-frt-section { padding: 44px 0; border-top: 1px solid rgba(0,0,0,0.09); }
  .lp-frt-section h2 { font-family: var(--font-serif-fraunces), Georgia, serif; font-size: clamp(1.7rem, 4vw, 2.35rem); color: var(--ink); margin: 0 0 8px; letter-spacing: -0.01em; line-height: 1.08; }
  .lp-frt-section .lead { color: #333; font-size: 1.05rem; line-height: 1.55; margin: 0 0 26px; max-width: 620px; }

  .lp-frt-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .lp-frt-stat { background: rgba(255,255,255,0.55); border: 1px solid rgba(0,0,0,0.08); border-radius: 12px; padding: 22px 18px; }
  .lp-frt-stat .num { font-family: var(--font-mono-plex), monospace; font-size: clamp(1.8rem, 5vw, 2.5rem); font-weight: 700; color: var(--terracotta); display: block; line-height: 1; margin: 0 0 8px; }
  .lp-frt-stat p { color: #333; font-size: 0.92rem; line-height: 1.45; margin: 0; }

  /* "What you get" — voice agent featured first, add-ons in a row of chips */
  .lp-frt-hero-card { background: var(--ink); color: var(--cream); border-radius: 16px; padding: 28px 26px; margin: 0 0 16px; }
  .lp-frt-hero-card .tag { font-family: var(--font-mono-plex), monospace; font-size: 0.74rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ochre); font-weight: 700; margin: 0 0 10px; }
  .lp-frt-hero-card h3 { font-family: var(--font-serif-fraunces), Georgia, serif; font-size: 1.5rem; color: var(--cream); margin: 0 0 10px; line-height: 1.12; }
  .lp-frt-hero-card p { color: rgba(242,239,230,0.9); line-height: 1.55; margin: 0 0 14px; font-size: 1rem; }
  .lp-frt-hero-card ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
  .lp-frt-hero-card li { display: flex; gap: 10px; align-items: flex-start; color: rgba(242,239,230,0.92); font-size: 0.96rem; line-height: 1.45; }
  .lp-frt-hero-card li::before { content: "›"; color: var(--ochre); font-family: var(--font-mono-plex), monospace; font-weight: 700; flex-shrink: 0; }

  .lp-frt-addons { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .lp-frt-addon { background: rgba(255,255,255,0.55); border: 1px solid rgba(0,0,0,0.08); border-radius: 12px; padding: 18px; }
  .lp-frt-addon .pill { font-family: var(--font-mono-plex), monospace; font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--sage); font-weight: 700; }
  .lp-frt-addon h4 { font-family: var(--font-serif-fraunces), Georgia, serif; font-size: 1.08rem; margin: 6px 0 6px; color: var(--ink); }
  .lp-frt-addon p { color: #333; font-size: 0.9rem; line-height: 1.45; margin: 0; }

  /* Steps */
  .lp-frt-steps { display: flex; flex-direction: column; gap: 14px; }
  .lp-frt-step { display: flex; gap: 16px; background: rgba(255,255,255,0.55); border: 1px solid rgba(0,0,0,0.08); border-radius: 12px; padding: 20px; }
  .lp-frt-step .badge { font-family: var(--font-mono-plex), monospace; font-weight: 700; font-size: 1.05rem; color: #fff;
    background: var(--sage); width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .lp-frt-step h3 { font-family: var(--font-serif-fraunces), Georgia, serif; font-size: 1.2rem; margin: 0 0 6px; color: var(--ink); }
  .lp-frt-step p { color: #333; line-height: 1.5; margin: 0; font-size: 0.97rem; }

  /* Do-the-math panel */
  .lp-frt-math { background: var(--oxblood); color: var(--cream); border-radius: 16px; padding: 34px 28px; text-align: center; }
  .lp-frt-math h2 { color: var(--cream); }
  .lp-frt-math p { color: rgba(242,239,230,0.92); font-size: 1.05rem; line-height: 1.55; margin: 0 auto 6px; max-width: 560px; }
  .lp-frt-math .big { font-family: var(--font-mono-plex), monospace; font-size: clamp(1.6rem, 5vw, 2.25rem); font-weight: 700; color: var(--ochre); }

  /* Capture */
  .lp-frt-capture { text-align: center; }
  .lp-frt-form { display: flex; flex-direction: column; gap: 12px; max-width: 440px; margin: 0 auto; text-align: left; }
  .lp-frt-form label { font-weight: 600; font-size: 0.9rem; color: var(--ink); }
  .lp-frt-form input { padding: 14px; border-radius: 10px; border: 1px solid rgba(0,0,0,0.2); font-size: 1rem; font-family: inherit; background: #fff; }
  .lp-frt-note { font-size: 0.85rem; color: #444; margin: 14px auto 0; max-width: 440px; }
  .lp-frt-secondary { display: inline-block; margin-top: 18px; color: var(--ink); font-size: 0.92rem; font-weight: 600; text-decoration: underline; }

  /* FAQ */
  .lp-frt-faq { display: flex; flex-direction: column; gap: 10px; }
  .lp-frt-faq details { background: rgba(255,255,255,0.55); border: 1px solid rgba(0,0,0,0.08); border-radius: 10px; padding: 4px 18px; }
  .lp-frt-faq summary { font-family: var(--font-serif-fraunces), Georgia, serif; font-size: 1.05rem; color: var(--ink); cursor: pointer; padding: 14px 0; list-style: none; }
  .lp-frt-faq summary::-webkit-details-marker { display: none; }
  .lp-frt-faq summary::after { content: "+"; float: right; font-family: var(--font-mono-plex), monospace; color: var(--terracotta); }
  .lp-frt-faq details[open] summary::after { content: "−"; }
  .lp-frt-faq details p { color: #333; line-height: 1.55; margin: 0 0 16px; font-size: 0.96rem; }

  /* Mobile sticky CTA */
  .lp-frt-sticky { position: fixed; left: 0; right: 0; bottom: 0; z-index: 50; display: none;
    background: var(--cream); border-top: 1px solid rgba(0,0,0,0.15); padding: 10px 16px;
    box-shadow: 0 -4px 16px rgba(0,0,0,0.08); }
  .lp-frt-sticky a { display: block; text-align: center; }
  .lp-frt-spacer { height: 0; }

  @media (max-width: 640px) {
    .lp-frt-hero { padding: 42px 0 28px; }
    .lp-frt-stats { grid-template-columns: 1fr; }
    .lp-frt-addons { grid-template-columns: 1fr; }
    .lp-frt-cab { flex-wrap: wrap; }
    .lp-frt-cab .status { margin-left: 0; width: 100%; text-align: left; }
    .lp-frt-sticky { display: block; }
    .lp-frt-spacer { height: 76px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .lp-frt-load { animation: none; opacity: 1; transform: none; }
    .lp-frt-phone::before, .lp-frt-phone::after { animation: none; opacity: 0; }
  }
`;

function AuditForm({ id }: { id?: string }) {
  return (
    <form className="lp-frt-form" action="/api/leads" method="POST" id={id}>
      <input type="hidden" name="source" value="lp-freight" />
      <label htmlFor="lp-frt-email">Your email</label>
      <input
        id="lp-frt-email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="you@yourcarrier.com"
      />
      <button type="submit" className="lp-frt-btn" data-meta-event="Lead">
        Get my free missed-load audit
      </button>
    </form>
  );
}

export default function FreightVoiceLandingPage() {
  return (
    <main className="lp-frt-wrap">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <MetaPixel />
      <MetaPixelEvents />

      <section className="lp-frt-hero">
        <p className="lp-frt-eyebrow">For Owner-Operators &amp; Small Fleets (5&ndash;25 Trucks)</p>
        <h1>
          The broker calls. You&apos;re driving. <em>The load goes to the next truck.</em>
        </h1>
        <p className="sub">
          You can&apos;t answer the phone with your hands on the wheel. So the broker
          hangs up and books the next carrier in minutes. We put an AI voice agent
          on your line that answers every call and load offer 24/7 &mdash; so you
          stop losing freight to voicemail.
        </p>

        <div className="lp-frt-cab" aria-label="A load offer ringing in while you are driving">
          <div className="lp-frt-phone" aria-hidden="true"><span /></div>
          <div className="caller">
            <span className="who">Broker calling &mdash; load offer</span>
            <span className="what">Dallas &rarr; Houston &middot; reefer &middot; today</span>
          </div>
          <div className="status">YOU&apos;RE DRIVING<br />goes to voicemail</div>
        </div>

        <div className="lp-frt-loads" aria-label="Examples of missed load offers and the revenue lost">
          <div className="lp-frt-load">
            <span className="lane">
              <span className="route">Load missed &mdash; Dallas &rarr; Houston</span>
              <span className="when">Tue 1:12 PM &middot; you were under a load</span>
            </span>
            <span className="gone">&minus;$1,850</span>
          </div>
          <div className="lp-frt-load">
            <span className="lane">
              <span className="route">Broker callback &mdash; OKC &rarr; Memphis</span>
              <span className="when">11:48 PM &middot; went to the next truck</span>
            </span>
            <span className="gone">&minus;$2,400</span>
          </div>
          <div className="lp-frt-load">
            <span className="lane">
              <span className="route">Backhaul offer &mdash; Laredo &rarr; San Antonio</span>
              <span className="when">Sat 6:30 AM &middot; voicemail full</span>
            </span>
            <span className="gone">&minus;$900</span>
          </div>
        </div>

        <a href="#audit" className="lp-frt-btn" data-meta-event="Lead">
          Get my free missed-load audit
        </a>
      </section>

      <section className="lp-frt-section" id="leak">
        <h2>Voicemail is a leak in your revenue</h2>
        <p className="lead">
          You run a tight truck. But the loads you never hear about don&apos;t show up
          in your settlements &mdash; they just quietly go to someone else. Here is
          what the phone is doing while you drive.
        </p>
        <div className="lp-frt-stats">
          <div className="lp-frt-stat">
            <span className="num">60%+</span>
            <p>of calls to a busy operator go unanswered. You can&apos;t pick up and drive.</p>
          </div>
          <div className="lp-frt-stat">
            <span className="num">80%</span>
            <p>of callers who hit voicemail never call back. They just dial the next carrier.</p>
          </div>
          <div className="lp-frt-stat">
            <span className="num">5 min</span>
            <p>is all it takes for a broker to cover a load with the truck that answered.</p>
          </div>
        </div>
      </section>

      <section className="lp-frt-section" id="get">
        <h2>What you get</h2>
        <p className="lead">
          One simple setup on the number you already use. No new app, no new phone,
          nothing for you to babysit on the road.
        </p>

        <div className="lp-frt-hero-card">
          <p className="tag">The core &mdash; AI voice agent</p>
          <h3>It answers every call and load offer 24/7</h3>
          <p>
            When you can&apos;t pick up, the agent does &mdash; in a real voice, day or
            night. It greets the broker, takes the load details, and hands you a clean
            note the second you&apos;re parked. The load stays in play instead of going
            to the next truck.
          </p>
          <ul>
            <li>Answers in seconds, even at 2 AM or mid-haul</li>
            <li>Captures the lane, rate, pickup, and callback &mdash; no scribbling</li>
            <li>Texts or emails you the load details right away</li>
            <li>Sounds like a person, not a robocall menu</li>
          </ul>
        </div>

        <div className="lp-frt-addons">
          <div className="lp-frt-addon">
            <span className="pill">Also included</span>
            <h4>Text-back on missed calls</h4>
            <p>A quick reply goes out so the broker knows you&apos;re on it. (SMS rolling out as carrier numbers clear A2P registration.)</p>
          </div>
          <div className="lp-frt-addon">
            <span className="pill">Also included</span>
            <h4>A simple 1-page site</h4>
            <p>One clean page with your authority, lanes, and equipment &mdash; so brokers and shippers can check you out and call.</p>
          </div>
          <div className="lp-frt-addon">
            <span className="pill">Coming</span>
            <h4>Get found on Google</h4>
            <p>We set up your business listing so shippers searching for a carrier in your area actually find you.</p>
          </div>
        </div>
      </section>

      <section className="lp-frt-section" id="how">
        <h2>Live in days, not months</h2>
        <div className="lp-frt-steps">
          <div className="lp-frt-step">
            <span className="badge" aria-hidden="true">1</span>
            <div>
              <h3>Day 1 &mdash; the audit</h3>
              <p>We show you how many calls and load offers slipped to voicemail last month &mdash; and roughly what they were worth.</p>
            </div>
          </div>
          <div className="lp-frt-step">
            <span className="badge" aria-hidden="true">2</span>
            <div>
              <h3>Days 2&ndash;4 &mdash; we set it up</h3>
              <p>We put the voice agent on your existing number, tune it to how you take loads, and wire up the text/email handoff. You keep rolling.</p>
            </div>
          </div>
          <div className="lp-frt-step">
            <span className="badge" aria-hidden="true">3</span>
            <div>
              <h3>Day 5 &mdash; you go live</h3>
              <p>Every call now gets answered. You see each load offer the moment it lands, even when you were behind the wheel.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="lp-frt-section">
        <div className="lp-frt-math">
          <h2>Do the math</h2>
          <p>One load a week you never heard about, at $900 to $2,400 each, adds up to</p>
          <p className="big">$47,000&ndash;$125,000 a year</p>
          <p>
            rolling away to the carrier who answered. Plugging that leak costs less
            than one missed load a month.
          </p>
        </div>
      </section>

      <section className="lp-frt-section lp-frt-capture" id="audit">
        <h2>See what slipped last month</h2>
        <p className="lead" style={{ margin: "0 auto 24px" }}>
          Free missed-load audit. No call required. We show you exactly how many
          calls and load offers went to voicemail &mdash; and what they were likely
          worth &mdash; before you decide anything.
        </p>
        <AuditForm id="audit-form" />
        <p className="lp-frt-note">
          One email. No sales call to get the report. We don&apos;t share your info.
        </p>
        <a
          href="https://calendly.com/skynetlabs/schedule-a-free-consultation"
          className="lp-frt-secondary"
          data-meta-event="Schedule"
        >
          Or book a 15-min call instead
        </a>
      </section>

      <section className="lp-frt-section">
        <h2>Quick questions</h2>
        <div className="lp-frt-faq">
          <details>
            <summary>Do I need a new phone or number?</summary>
            <p>No. The agent works with the number brokers already call. Nothing changes on your end except that the phone finally gets answered when you can&apos;t.</p>
          </details>
          <details>
            <summary>Will it sound like a robot and scare brokers off?</summary>
            <p>No. It answers in a natural voice, greets the caller, and takes the load details like a competent dispatcher would. Brokers get a real response instead of a full voicemail box.</p>
          </details>
          <details>
            <summary>How fast do I see a load offer?</summary>
            <p>Right away. The agent captures the lane, rate, and callback and sends it to you by text or email the moment the call ends, so you can lock it in when you pull over.</p>
          </details>
          <details>
            <summary>What does the free audit actually show me?</summary>
            <p>How many calls and load offers you missed last month, when they came in, and a dollar estimate of the freight that likely went to another truck. No strings.</p>
          </details>
          <details>
            <summary>I run 8 trucks &mdash; is this overkill or not enough?</summary>
            <p>It fits 1 truck or 25. Every driver who can&apos;t answer mid-haul is a line the agent covers. The audit shows you exactly where your loads are leaking first.</p>
          </details>
        </div>
      </section>

      <div className="lp-frt-spacer" aria-hidden="true" />
      <div className="lp-frt-sticky">
        <a href="#audit" className="lp-frt-btn" data-meta-event="Lead">
          Get my free missed-load audit
        </a>
      </div>
    </main>
  );
}
