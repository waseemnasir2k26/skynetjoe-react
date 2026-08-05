import type { Metadata } from "next";
import { MetaPixel, MetaPixelEvents } from "@/components/MetaPixel";
import { SITE } from "@/lib/site";
import LeadCaptureForm from "@/components/cta/LeadCaptureForm";

// Meta-ads destination LP for the 48-Hour Ops Audit ($497).
// Claims discipline: every factual assertion on this page must exist in
// meta-ads-au-launch/CODEX-CREATIVE-HANDOFF/CLAIMS-WHITELIST.md (offer
// mechanics + unquantified capability statements only). No testimonials,
// no counts, no percentages, no outcomes, no guarantees, no scarcity.
// The ad creative promises exactly: $497 · 48 hours · scored audit with a
// prioritised fix list · no retainer. This page must keep saying exactly that.
const PAGE_URL = `${SITE.url.replace(/\/+$/, "")}/lp/ops-audit`;

export const metadata: Metadata = {
  title: "48-Hour Ops Audit — $497 | SkynetLabs",
  description:
    "One flat fee. I audit how work actually moves through your business — inbox, handoffs, follow-up, tooling — and you get a scored audit with a prioritised fix list inside 48 hours. No retainer.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "48-Hour Ops Audit — $497",
    description:
      "A scored audit of your inbox, handoffs, follow-up and tooling, with a prioritised fix list, delivered inside 48 hours. Fixed fee. No retainer.",
    url: PAGE_URL,
    type: "website",
    images: [
      { url: "/og-default.png", width: 1200, height: 630, alt: "SkynetLabs" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "48-Hour Ops Audit — $497",
    description:
      "A scored audit of how work moves through your business, with a prioritised fix list, inside 48 hours. Fixed fee. No retainer.",
    images: ["/og-default.png"],
  },
  robots: { index: false, follow: false },
};

const css = `
  .lp-ops-wrap { max-width: 780px; margin: 0 auto; padding: 0 20px;
    --ops-ink: #1a1a1a; --ops-cream: #f2efe6; --ops-rust: #c66b3f; }

  /* HERO — mirrors the ad set: big sans headline, rust accent word, mono spec strip */
  .lp-ops-hero { padding: 58px 0 30px; }
  .lp-ops-eyebrow { font-family: var(--font-mono-plex), monospace; font-size: 0.76rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ops-rust); margin: 0 0 18px; font-weight: 600; }
  .lp-ops-hero h1 { font-family: var(--font-sans, system-ui), sans-serif; font-weight: 800; font-size: clamp(2.3rem, 7vw, 4rem); line-height: 1.02; letter-spacing: -0.028em; color: var(--ops-ink); margin: 0 0 18px; }
  .lp-ops-hero h1 em { font-style: normal; color: var(--ops-rust); }
  .lp-ops-hero .sub { font-size: clamp(1.05rem, 2.4vw, 1.28rem); color: #2a2a2a; max-width: 640px; margin: 0 0 26px; line-height: 1.55; }

  .lp-ops-spec { display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap;
    border-top: 2px solid var(--ops-ink); border-bottom: 2px solid var(--ops-ink);
    padding: 14px 2px; margin: 0 0 26px;
    font-family: var(--font-mono-plex), monospace; font-size: 0.86rem; font-weight: 700; letter-spacing: 0.06em; color: var(--ops-ink); }

  .lp-ops-form-card { background: var(--ops-ink); color: var(--ops-cream); border-radius: 16px; padding: 26px 26px 22px; margin: 0 0 14px; }
  .lp-ops-form-card h2 { font-size: 1.18rem; margin: 0 0 4px; color: var(--ops-cream); }
  .lp-ops-form-card .fine { font-size: 0.86rem; color: rgba(242,239,230,0.72); margin: 0 0 16px; }
  .lp-ops-form { display: flex; flex-direction: column; gap: 10px; }
  .lp-ops-form label { font-family: var(--font-mono-plex), monospace; font-size: 0.74rem; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(242,239,230,0.72); }
  .lp-ops-input { padding: 13px 14px; border-radius: 10px; border: 1px solid rgba(242,239,230,0.35);
    background: rgba(242,239,230,0.06); color: var(--ops-cream); font-size: 1rem; }
  .lp-ops-input::placeholder { color: rgba(242,239,230,0.4); }
  .lp-ops-btn { padding: 14px 18px; border-radius: 10px; border: 0; cursor: pointer;
    background: var(--ops-rust); color: var(--ops-cream); font-weight: 800; font-size: 1.02rem; }
  .lp-ops-btn:disabled { opacity: 0.6; cursor: default; }
  .lp-ops-privacy { font-size: 0.78rem; color: #6b6b6b; margin: 0 0 8px; }
  .lp-ops-privacy a { color: inherit; }
  .lp-ops-book { display: inline-block; margin-top: 12px; background: var(--ops-rust); color: var(--ops-cream);
    font-weight: 700; padding: 10px 16px; border-radius: 10px; text-decoration: none; font-size: 0.95rem; }

  .lp-ops-sec { padding: 34px 0 8px; }
  .lp-ops-sec h2 { font-size: clamp(1.5rem, 3.6vw, 2rem); letter-spacing: -0.02em; color: var(--ops-ink); margin: 0 0 16px; font-weight: 800; }

  /* Report structure — mirrors ad concept C (structure preview, greeked bars) */
  .lp-ops-report { background: var(--ops-cream); border: 1px solid rgba(26,26,26,0.18); border-radius: 14px; padding: 24px 26px; box-shadow: 0 8px 32px rgba(26,26,26,0.1); }
  .lp-ops-report .doc-title { font-family: var(--font-mono-plex), monospace; font-weight: 700; font-size: 0.82rem; letter-spacing: 0.14em; border-bottom: 2px solid var(--ops-ink); padding-bottom: 10px; margin: 0 0 18px; display: flex; justify-content: space-between; gap: 10px; flex-wrap: wrap; }
  .lp-ops-report .doc-title .tag { color: rgba(26,26,26,0.55); font-weight: 500; }
  .lp-ops-report h3 { font-size: 1.02rem; margin: 14px 0 8px; }
  .lp-ops-bar { height: 10px; border-radius: 5px; background: rgba(26,26,26,0.12); filter: blur(2px); margin: 0 0 8px; }
  .lp-ops-fixrow { display: flex; align-items: center; gap: 10px; margin: 0 0 8px; }
  .lp-ops-tick { width: 12px; height: 12px; background: var(--ops-rust); flex-shrink: 0; }
  .lp-ops-fixrow .lp-ops-bar { flex: 1; margin: 0; }

  /* Three steps — mirrors ad concept D (no printed step numerals) */
  .lp-ops-flow { display: flex; flex-direction: column; gap: 0; }
  .lp-ops-block { border-radius: 12px; padding: 18px 22px; font-family: var(--font-mono-plex), monospace; font-weight: 700; letter-spacing: 0.08em; font-size: 0.95rem; }
  .lp-ops-block.fill { background: var(--ops-ink); color: var(--ops-cream); }
  .lp-ops-block.line { border: 2px solid var(--ops-ink); color: var(--ops-ink); }
  .lp-ops-block .d { display: block; font-family: inherit; font-weight: 400; letter-spacing: 0; text-transform: none; font-size: 0.88rem; margin-top: 6px; opacity: 0.8; font-family: var(--font-sans, system-ui), sans-serif; }
  .lp-ops-chev { text-align: left; padding: 6px 0 6px 26px; color: var(--ops-rust); font-size: 1.1rem; line-height: 1; }

  /* Not-list — mirrors ad concept E */
  .lp-ops-not { list-style: none; margin: 0; padding: 0; }
  .lp-ops-not li { font-size: clamp(1.2rem, 3vw, 1.6rem); font-weight: 800; color: rgba(26,26,26,0.55); margin: 0 0 10px; position: relative; width: max-content; max-width: 100%; }
  .lp-ops-not li s { text-decoration-color: var(--ops-rust); text-decoration-thickness: 4px; }
  .lp-ops-not li.is { color: var(--ops-ink); margin-top: 18px; }

  .lp-ops-founder { display: flex; gap: 16px; align-items: flex-start; background: rgba(26,26,26,0.04); border-radius: 14px; padding: 20px 22px; }
  .lp-ops-founder p { margin: 0 0 10px; line-height: 1.6; color: #2a2a2a; }
  .lp-ops-founder p:last-child { margin: 0; }
  .lp-ops-founder .sig { font-family: var(--font-mono-plex), monospace; font-size: 0.8rem; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(26,26,26,0.6); }

  .lp-ops-faq dt { font-weight: 700; margin: 18px 0 6px; }
  .lp-ops-faq dd { margin: 0; color: #2a2a2a; line-height: 1.6; }

  .lp-ops-final { padding: 30px 0 70px; }
`;

function OpsAuditForm({ id }: { id?: string }) {
  return (
    <LeadCaptureForm
      id={id}
      source="lp-ops-audit"
      formClassName="lp-ops-form"
      buttonClassName="lp-ops-btn"
      inputClassName="lp-ops-input"
      buttonMetaEvent="Lead"
      emailId="lp-ops-email"
      emailLabel="Your work email"
      emailPlaceholder="you@yourbusiness.com"
      buttonLabel="Start my 48-hour audit — $497"
      submittingLabel="Sending…"
      successHeading="Got it — you're in the queue."
      successBody="I'll reply personally with the intake checklist (what access to send, nothing invasive). Your 48 hours start when access arrives. Want to talk first?"
      successCta={
        <a className="lp-ops-book" href="/discovery-call">
          Book the consult call
        </a>
      }
    />
  );
}

export default function OpsAuditLandingPage() {
  return (
    <main className="lp-ops-wrap">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <MetaPixel />
      <MetaPixelEvents />

      <section className="lp-ops-hero">
        <p className="lp-ops-eyebrow">
          For owner-operators of small service businesses &amp; agencies
        </p>
        <h1>
          Your inbox is the <em>bottleneck.</em>
        </h1>
        <p className="sub">
          Most small operations don&apos;t have a tools problem — they have a
          handoff problem. Quotes that never went out, leads nobody followed up,
          work that only moves when you personally push it. I audit how work
          actually moves through your business and hand you a scored report with
          a prioritised fix list — inside 48 hours.
        </p>

        <div className="lp-ops-spec">
          <span>48-HOUR OPS AUDIT — $497</span>
          <span>FIXED FEE · NO RETAINER</span>
        </div>

        <div className="lp-ops-form-card">
          <h2>Start the audit</h2>
          <p className="fine">
            Drop your email. You&apos;ll get the intake checklist, then the
            clock starts the moment you send access.
          </p>
          <OpsAuditForm id="ops-audit-form" />
        </div>
        <p className="lp-ops-privacy">
          Your email goes to me, nowhere else.{" "}
          <a href="/privacy-policy">Privacy policy</a>.
        </p>
      </section>

      <section className="lp-ops-sec">
        <h2>This is what you get.</h2>
        <div className="lp-ops-report" aria-label="Example report structure">
          <p className="doc-title">
            <span>OPS AUDIT</span>
            <span className="tag">EXAMPLE REPORT STRUCTURE</span>
          </p>
          <h3>Inbox &amp; follow-up</h3>
          <div className="lp-ops-bar" style={{ width: "84%" }} />
          <div className="lp-ops-bar" style={{ width: "62%" }} />
          <h3>Handoffs &amp; tooling</h3>
          <div className="lp-ops-bar" style={{ width: "76%" }} />
          <h3>Prioritised fix list</h3>
          <div className="lp-ops-fixrow">
            <span className="lp-ops-tick" />
            <div className="lp-ops-bar" style={{ width: "100%" }} />
          </div>
          <div className="lp-ops-fixrow">
            <span className="lp-ops-tick" />
            <div className="lp-ops-bar" style={{ width: "88%" }} />
          </div>
          <div className="lp-ops-fixrow">
            <span className="lp-ops-tick" />
            <div className="lp-ops-bar" style={{ width: "74%" }} />
          </div>
        </div>
      </section>

      <section className="lp-ops-sec">
        <h2>Three steps. One flat fee.</h2>
        <div className="lp-ops-flow">
          <div className="lp-ops-block fill">
            YOU SEND ACCESS
            <span className="d">
              A short intake checklist tells you exactly what to share —
              read-only where possible.
            </span>
          </div>
          <div className="lp-ops-chev" aria-hidden="true">
            ▼
          </div>
          <div className="lp-ops-block line">
            48 HOURS
            <span className="d">
              I go through your inbox flow, handoffs, follow-up and tooling
              personally.
            </span>
          </div>
          <div className="lp-ops-chev" aria-hidden="true">
            ▼
          </div>
          <div className="lp-ops-block fill">
            SCORED AUDIT + PRIORITISED FIX LIST
            <span className="d">
              Then a consult call to walk through it. What you do with the list
              — fix it yourself, hire anyone, or hire me — is up to you.
            </span>
          </div>
        </div>
      </section>

      <section className="lp-ops-sec">
        <h2>What this is not.</h2>
        <ul className="lp-ops-not">
          <li>
            <s>A retainer.</s>
          </li>
          <li>
            <s>A discovery call that turns into a pitch.</s>
          </li>
          <li>
            <s>A six-week engagement.</s>
          </li>
          <li className="is">One audit. 48 hours. $497. Done.</li>
        </ul>
      </section>

      <section className="lp-ops-sec">
        <h2>Who&apos;s actually doing the audit.</h2>
        <div className="lp-ops-founder">
          <div>
            <p>
              I&apos;m Waseem Nasir, founder of SkynetLabs. I build operations
              automation — email triage, lead routing, booking flows, follow-up
              sequences — so I know which automations actually hold up, because
              I&apos;ve been the person maintaining the workflow after the
              consultant left.
            </p>
            <p>
              Every audit is done by me personally. No junior, no template, no
              handoff.
            </p>
            <p className="sig">— WASEEM NASIR · SKYNETLABS</p>
          </div>
        </div>
      </section>

      <section className="lp-ops-sec">
        <h2>Questions you&apos;d ask anyway.</h2>
        <dl className="lp-ops-faq">
          <dt>What does the $497 actually buy?</dt>
          <dd>
            A scored audit of how work moves through your business — inbox,
            handoffs, follow-up, tooling — plus a prioritised fix list,
            delivered inside 48 hours of you sending access, and a consult call
            to walk through it. That&apos;s the whole product. No lock-in, no
            minimum term.
          </dd>
          <dt>What access do I have to send?</dt>
          <dd>
            The intake checklist keeps it minimal and read-only where the
            platform allows it. If something feels too sensitive to share, we
            scope around it on the call.
          </dd>
          <dt>When does the 48 hours start?</dt>
          <dd>
            When your access arrives — not when you pay. You control the clock.
          </dd>
          <dt>Do I have to hire you afterwards?</dt>
          <dd>
            No. The fix list is written so you can act on it with your own
            people or anyone you trust. If you want my help implementing, we
            talk about that on the call — only if you ask.
          </dd>
        </dl>
      </section>

      <section className="lp-ops-final">
        <div className="lp-ops-form-card">
          <h2>Ready when you are.</h2>
          <p className="fine">
            48-hour ops audit · $497 · fixed fee · no retainer.
          </p>
          <OpsAuditForm />
        </div>
      </section>
    </main>
  );
}
