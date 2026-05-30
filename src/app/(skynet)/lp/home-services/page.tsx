import type { Metadata } from "next";
import { MetaPixel, MetaPixelEvents } from "@/components/MetaPixel";
import { SITE } from "@/lib/site";

// Canonical/OG host resolves via SITE.url (env-overridable, defaults to the
// production domain) — same source the rest of the app uses for canonicals.
// Never hardcode the dead `app-eg9h257cv` preview host.
const PAGE_URL = `${SITE.url.replace(/\/+$/, "")}/lp/home-services`;

export const metadata: Metadata = {
  title: "Never Miss a Service Call Again | SkynetLabs",
  description:
    "Texas HVAC & plumbing owners: when crews are on jobs, missed calls go to your competitor. We answer and text back every missed call 24/7. Free missed-call audit.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Every Call You Miss, Your Competitor Answers",
    description:
      "AI answers and texts back every missed call 24/7, plus Google Business Profile and a 1-page site. Free missed-call audit for Texas home-services pros.",
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "SkynetLabs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Every Call You Miss, Your Competitor Answers",
    description:
      "We answer and text back every missed call 24/7 for Texas HVAC & plumbing. Free missed-call audit.",
    images: ["/og-default.png"],
  },
  robots: { index: true, follow: true },
};

const css = `
  .hs-wrap { max-width: 760px; margin: 0 auto; padding: 0 20px; }
  .hs-hero { padding: 64px 0 40px; }
  .hs-eyebrow { font-family: var(--font-mono-plex), monospace; font-size: 0.78rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--oxblood); margin: 0 0 16px; font-weight: 600; }
  .hs-hero h1 { font-family: var(--font-serif-fraunces), Georgia, serif; font-size: clamp(2.2rem, 6.5vw, 3.7rem); line-height: 1.02; letter-spacing: -0.02em; color: var(--ink); margin: 0 0 20px; }
  .hs-hero h1 em { font-style: italic; color: #A8501F; }
  .hs-hero .sub { font-size: clamp(1.05rem, 2.4vw, 1.28rem); color: #2a2a2a; max-width: 620px; margin: 0 0 30px; line-height: 1.5; }

  /* Ghost-calls motif */
  .hs-ghost { display: flex; flex-direction: column; gap: 10px; margin: 0 0 34px; }
  .hs-ticket { display: flex; align-items: center; justify-content: space-between; gap: 14px;
    background: rgba(255,255,255,0.55); border: 1px solid rgba(0,0,0,0.10); border-left: 4px solid var(--oxblood);
    border-radius: 10px; padding: 12px 16px; opacity: 0; transform: translateY(8px);
    animation: hs-rise 0.5s ease forwards; }
  .hs-ticket:nth-child(1) { animation-delay: 0.1s; }
  .hs-ticket:nth-child(2) { animation-delay: 0.55s; }
  .hs-ticket:nth-child(3) { animation-delay: 1.0s; }
  .hs-ticket .meta { display: flex; flex-direction: column; gap: 2px; }
  .hs-ticket .label { font-size: 0.92rem; color: var(--ink); font-weight: 600; }
  .hs-ticket .time { font-family: var(--font-mono-plex), monospace; font-size: 0.78rem; color: #555; }
  .hs-ticket .lost { font-family: var(--font-mono-plex), monospace; font-size: 1.15rem; font-weight: 700; color: #A8501F; white-space: nowrap; }
  @keyframes hs-rise { to { opacity: 1; transform: translateY(0); } }

  .hs-btn { display: inline-block; background: #A8501F; color: #fff; padding: 15px 30px; border-radius: 11px;
    font-weight: 700; text-decoration: none; border: none; cursor: pointer; font-size: 1.02rem; font-family: inherit; line-height: 1.1; }
  .hs-btn:hover { background: #8f4318; }
  .hs-btn:focus-visible, .hs-form input:focus-visible, .hs-faq summary:focus-visible {
    outline: 3px solid var(--sage); outline-offset: 2px; }

  .hs-section { padding: 46px 0; border-top: 1px solid rgba(0,0,0,0.09); }
  .hs-section h2 { font-family: var(--font-serif-fraunces), Georgia, serif; font-size: clamp(1.7rem, 4vw, 2.3rem); color: var(--ink); margin: 0 0 8px; letter-spacing: -0.01em; line-height: 1.1; }
  .hs-section .lead { color: #333; font-size: 1.05rem; line-height: 1.55; margin: 0 0 26px; max-width: 600px; }

  .hs-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .hs-stat { background: rgba(255,255,255,0.55); border: 1px solid rgba(0,0,0,0.08); border-radius: 12px; padding: 22px 18px; }
  .hs-stat .num { font-family: var(--font-mono-plex), monospace; font-size: clamp(1.8rem, 5vw, 2.5rem); font-weight: 700; color: #A8501F; display: block; line-height: 1; margin: 0 0 8px; }
  .hs-stat p { color: #333; font-size: 0.92rem; line-height: 1.45; margin: 0; }

  .hs-bundle { display: flex; flex-direction: column; gap: 14px; }
  .hs-step { display: flex; gap: 16px; background: rgba(255,255,255,0.55); border: 1px solid rgba(0,0,0,0.08); border-radius: 12px; padding: 20px; }
  .hs-step .badge { font-family: var(--font-mono-plex), monospace; font-weight: 700; font-size: 1.05rem; color: #fff;
    background: var(--sage); width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .hs-step h3 { font-family: var(--font-serif-fraunces), Georgia, serif; font-size: 1.2rem; margin: 0 0 6px; color: var(--ink); }
  .hs-step p { color: #333; line-height: 1.5; margin: 0; font-size: 0.97rem; }

  .hs-proof { background: var(--ink); color: var(--cream); border-radius: 16px; padding: 34px 28px; text-align: center; }
  .hs-proof h2 { color: var(--cream); }
  .hs-proof p { color: rgba(242,239,230,0.9); font-size: 1.05rem; line-height: 1.55; margin: 0 auto 6px; max-width: 540px; }
  .hs-proof .big { font-family: var(--font-mono-plex), monospace; font-size: clamp(1.6rem, 5vw, 2.2rem); font-weight: 700; color: var(--ochre); }

  .hs-capture { text-align: center; }
  .hs-form { display: flex; flex-direction: column; gap: 12px; max-width: 440px; margin: 0 auto; text-align: left; }
  .hs-form label { font-weight: 600; font-size: 0.9rem; color: var(--ink); }
  .hs-form input { padding: 14px; border-radius: 10px; border: 1px solid rgba(0,0,0,0.2); font-size: 1rem; font-family: inherit; background: #fff; }
  .hs-note { font-size: 0.85rem; color: #444; margin: 14px auto 0; max-width: 440px; }
  .hs-secondary { display: inline-block; margin-top: 18px; color: var(--ink); font-size: 0.92rem; font-weight: 600; text-decoration: underline; }

  .hs-faq { display: flex; flex-direction: column; gap: 10px; }
  .hs-faq details { background: rgba(255,255,255,0.55); border: 1px solid rgba(0,0,0,0.08); border-radius: 10px; padding: 4px 18px; }
  .hs-faq summary { font-family: var(--font-serif-fraunces), Georgia, serif; font-size: 1.05rem; color: var(--ink); cursor: pointer; padding: 14px 0; list-style: none; }
  .hs-faq summary::-webkit-details-marker { display: none; }
  .hs-faq summary::after { content: "+"; float: right; font-family: var(--font-mono-plex), monospace; color: #A8501F; }
  .hs-faq details[open] summary::after { content: "−"; }
  .hs-faq details p { color: #333; line-height: 1.55; margin: 0 0 16px; font-size: 0.96rem; }

  /* Mobile sticky CTA */
  .hs-sticky { position: fixed; left: 0; right: 0; bottom: 0; z-index: 50; display: none;
    background: var(--cream); border-top: 1px solid rgba(0,0,0,0.15); padding: 10px 16px;
    box-shadow: 0 -4px 16px rgba(0,0,0,0.08); }
  .hs-sticky a { display: block; text-align: center; }
  .hs-spacer { height: 0; }

  @media (max-width: 640px) {
    .hs-hero { padding: 44px 0 30px; }
    .hs-stats { grid-template-columns: 1fr; }
    .hs-sticky { display: block; }
    .hs-spacer { height: 76px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .hs-ticket { animation: none; opacity: 1; transform: none; }
  }
`;

function AuditForm({ id }: { id?: string }) {
  return (
    <form className="hs-form" action="/api/leads" method="POST" id={id}>
      <input type="hidden" name="source" value="lp-home-services" />
      <label htmlFor="hs-email">Your email</label>
      <input
        id="hs-email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="you@yourcompany.com"
      />
      <button type="submit" className="hs-btn" data-meta-event="Lead">
        Get my free missed-call audit
      </button>
    </form>
  );
}

export default function HomeServicesLandingPage() {
  return (
    <main className="hs-wrap">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <MetaPixel />
      <MetaPixelEvents />

      <section className="hs-hero">
        <p className="hs-eyebrow">For Texas HVAC &amp; Plumbing Owners</p>
        <h1>
          Every call you miss, <em>your competitor answers.</em>
        </h1>
        <p className="sub">
          When your crew is on a job, the phone keeps ringing. The caller hangs up
          and dials the next guy. We answer and text back every missed call 24/7,
          so the job stays yours.
        </p>

        <div className="hs-ghost" aria-label="Examples of missed calls and the revenue lost">
          <div className="hs-ticket">
            <span className="meta">
              <span className="label">Missed call &mdash; AC out, no cooling</span>
              <span className="time">Tue 2:14 PM &middot; crew on a job</span>
            </span>
            <span className="lost">&minus;$1,200</span>
          </div>
          <div className="hs-ticket">
            <span className="meta">
              <span className="label">Missed call &mdash; burst pipe</span>
              <span className="time">Sat 8:41 PM &middot; after hours</span>
            </span>
            <span className="lost">&minus;$850</span>
          </div>
          <div className="hs-ticket">
            <span className="meta">
              <span className="label">Missed call &mdash; water heater</span>
              <span className="time">Mon 7:03 AM &middot; voicemail full</span>
            </span>
            <span className="lost">&minus;$275</span>
          </div>
        </div>

        <a href="#audit" className="hs-btn" data-meta-event="Lead">
          Get my free missed-call audit
        </a>
      </section>

      <section className="hs-section" id="leak">
        <h2>The leak is the phone</h2>
        <p className="lead">
          You are great at the work. The money walks out the door before you ever
          pick up. Here is what the numbers say about home-services calls.
        </p>
        <div className="hs-stats">
          <div className="hs-stat">
            <span className="num">62%</span>
            <p>of calls to home-services go unanswered when crews are on jobs.</p>
          </div>
          <div className="hs-stat">
            <span className="num">85%</span>
            <p>of callers who hit voicemail never call back. They just move on.</p>
          </div>
          <div className="hs-stat">
            <span className="num">78%</span>
            <p>of customers hire whoever answers first, not the cheapest bid.</p>
          </div>
        </div>
      </section>

      <section className="hs-section" id="bundle">
        <h2>What you get</h2>
        <p className="lead">
          One simple setup. Plain English. No apps to learn, no new phone, nothing
          for you to babysit.
        </p>
        <div className="hs-bundle">
          <div className="hs-step">
            <span className="badge" aria-hidden="true">1</span>
            <div>
              <h3>We answer when you can&apos;t</h3>
              <p>
                Miss a call and the caller instantly gets a friendly text: &ldquo;Sorry
                we missed you &mdash; what do you need?&rdquo; It books the job while you
                are still on the ladder. Works 24/7, weekends and nights too.
              </p>
            </div>
          </div>
          <div className="hs-step">
            <span className="badge" aria-hidden="true">2</span>
            <div>
              <h3>Your Google listing, fixed</h3>
              <p>
                We clean up your Google Business Profile so you show up when someone
                searches &ldquo;plumber near me&rdquo; at 9pm &mdash; with photos, hours,
                and a button that calls you.
              </p>
            </div>
          </div>
          <div className="hs-step">
            <span className="badge" aria-hidden="true">3</span>
            <div>
              <h3>A simple 1-page site</h3>
              <p>
                A clean, fast page that says what you do, where you work, and how to
                reach you. Built to turn a click into a call. No bloat.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="hs-section" id="how">
        <h2>Up and running in one week</h2>
        <div className="hs-bundle">
          <div className="hs-step">
            <span className="badge" aria-hidden="true">1</span>
            <div>
              <h3>Day 1 &mdash; the audit</h3>
              <p>We show you exactly how many calls slipped last month and what they were worth.</p>
            </div>
          </div>
          <div className="hs-step">
            <span className="badge" aria-hidden="true">2</span>
            <div>
              <h3>Days 2&ndash;5 &mdash; we build</h3>
              <p>We set up the missed-call text-back, fix your Google listing, and build your page. You keep working.</p>
            </div>
          </div>
          <div className="hs-step">
            <span className="badge" aria-hidden="true">3</span>
            <div>
              <h3>Day 7 &mdash; you go live</h3>
              <p>Every missed call now gets answered. You see each new lead the moment it lands.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="hs-section">
        <div className="hs-proof">
          <h2>Do the math</h2>
          <p>
            One missed call a day at $275 to $1,200 each adds up to
          </p>
          <p className="big">$45,000&ndash;$120,000 a year</p>
          <p>
            slipping to the contractor who picked up. Plugging that leak costs less
            than the price of one missed job a month.
          </p>
        </div>
      </section>

      <section className="hs-section hs-capture" id="audit">
        <h2>See what you missed last month</h2>
        <p className="lead" style={{ margin: "0 auto 24px" }}>
          Free missed-call audit. No call required. We show you exactly how many
          leads slipped &mdash; and what they were worth &mdash; before you decide
          anything.
        </p>
        <AuditForm id="audit-form" />
        <p className="hs-note">
          One email. No sales call to get the report. We do not share your info.
        </p>
        <a href="https://calendly.com/skynetlabs" className="hs-secondary" data-meta-event="Schedule">
          Prefer to talk it through? Book a 15-min call instead
        </a>
      </section>

      <section className="hs-section">
        <h2>Quick questions</h2>
        <div className="hs-faq">
          <details>
            <summary>Do I need a new phone or number?</summary>
            <p>No. We work with the number you already use. Nothing changes for your callers except that they finally get a reply.</p>
          </details>
          <details>
            <summary>Is this hard to set up?</summary>
            <p>Not for you. We do the whole setup. You answer a few quick questions and keep running your business. It is live within a week.</p>
          </details>
          <details>
            <summary>What does the free audit actually show me?</summary>
            <p>How many calls you missed last month, when they came in, and a dollar estimate of the work that likely walked away. No strings.</p>
          </details>
          <details>
            <summary>What if I am too busy to deal with this right now?</summary>
            <p>That is exactly when calls get missed the most. The audit takes you two minutes to request and we handle the rest.</p>
          </details>
        </div>
      </section>

      <div className="hs-spacer" aria-hidden="true" />
      <div className="hs-sticky">
        <a href="#audit" className="hs-btn" data-meta-event="Lead">
          Get my free missed-call audit
        </a>
      </div>
    </main>
  );
}
