import Reveal from "@/components/home/Reveal";

/**
 * Problem / agitation — qualitative only. No statistics (none are sourced
 * in this repo for missed-call or follow-up rates), just the three leaks a
 * service-business owner recognises on sight.
 */
const LEAKS = [
  {
    n: "01",
    title: "The enquiry you didn't see in time",
    body: "A lead messages at 10pm, or while you're on a job. By the time you reply tomorrow, they've booked whoever answered first.",
  },
  {
    n: "02",
    title: "Follow-up that lives in your head",
    body: "Quotes go out, nobody chases. Reminders are a sticky note. Good leads go quiet because the follow-up depended on you remembering.",
  },
  {
    n: "03",
    title: "Admin that eats the evening",
    body: "Names copied into spreadsheets, confirmations typed by hand, the same five questions answered fifty times a week.",
  },
] as const;

export default function Problem() {
  return (
    <section
      className="hv2-section hv2-problem"
      id="problem"
      aria-labelledby="problem-h"
    >
      <div className="hv2-wrap">
        <Reveal className="hv2-head">
          <div>
            <div className="hv2-eyebrow">Where leads leak</div>
            <h2 id="problem-h" className="hv2-h2">
              Leads don&rsquo;t wait. <em>Your inbox makes them.</em>
            </h2>
          </div>
          <p className="hv2-lede">
            You&rsquo;re not losing work because you&rsquo;re bad at it.
            You&rsquo;re losing it in the gaps between the job, the phone and
            the admin.
          </p>
        </Reveal>

        <ol className="hv2-leaks">
          {LEAKS.map((l, i) => (
            <li key={l.n} className="hv2-leak">
              <Reveal delay={i * 0.08}>
                <div className="num" aria-hidden>
                  {l.n}
                </div>
                <h3>{l.title}</h3>
                <p>{l.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal>
          <p className="hv2-problem-foot">
            Every one of these is a <strong>system problem</strong>, not a
            people problem. Systems are what we build.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
