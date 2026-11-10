import Reveal from "@/components/home/Reveal";

/**
 * How it works — three steps. Every timeline and term here is already
 * published on the site:
 *   - 48-hour one-page scope, 50% deposit, fixed price / no hourly creep,
 *     5–7 day Starter and 10–14 day Pro ship — HOME_FAQS
 *     (src/components/sections/FAQHome.tsx) + contact page.
 *   - Loom walkthrough / team handover, monitoring + alerting, 1 new flow a
 *     month on retainer — src/lib/service-pricing.ts.
 *   - 8-hour weekday reply — src/app/(skynet)/contact/page.tsx.
 */
const STEPS = [
  {
    k: "Step 01",
    title: "Chat",
    body: "Message on WhatsApp. We look at your setup together — not a pitch — and send a one-page scope within 48 hours: deliverables, price, ship date.",
    when: "Reply within 8h on weekdays",
  },
  {
    k: "Step 02",
    title: "Build",
    body: "A 50% deposit starts the build at a fixed price, no hourly creep. Starter scopes ship in about 5–7 days; larger Pro builds in 10–14.",
    when: "5–14 days from kickoff",
  },
  {
    k: "Step 03",
    title: "Live + handover",
    body: "You get a Loom walkthrough so your team can run it. Optional monthly retainer for monitoring, alerts and new flows as the business grows.",
    when: "Yours to keep",
  },
] as const;

export default function Steps() {
  return (
    <section
      className="hv2-section hv2-steps"
      id="how-it-works"
      aria-labelledby="steps-h"
    >
      <div className="hv2-wrap">
        <Reveal className="hv2-head">
          <div>
            <div className="hv2-eyebrow">How it works</div>
            <h2 id="steps-h" className="hv2-h2">
              From first message to live <em>in three steps.</em>
            </h2>
          </div>
          <p className="hv2-lede">
            No discovery-call maze. One chat, one scope, one fixed price, and a
            ship date you can hold us to.
          </p>
        </Reveal>

        <ol className="hv2-steps-grid">
          {STEPS.map((s, i) => (
            <li key={s.k} className="hv2-step">
              <Reveal delay={i * 0.1}>
                <div className="k">{s.k}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <span className="when">{s.when}</span>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
