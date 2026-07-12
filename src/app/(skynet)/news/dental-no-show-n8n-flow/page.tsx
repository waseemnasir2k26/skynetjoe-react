import type { Metadata } from "next";
import Link from "next/link";
import LetterArticle from "@/components/letter/LetterArticle";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { articleSchema } from "@/lib/schema";
import { getArticle, relatedFor } from "@/lib/news";
import { SITE } from "@/lib/site";

const SLUG = "dental-no-show-n8n-flow";
const article = getArticle(SLUG)!;

export const metadata: Metadata = {
  title: article.seoTitle ?? article.title,
  description: article.description,
  alternates: { canonical: `${SITE.url}/news/${SLUG}` },
  openGraph: {
    title: article.title,
    description: article.description,
    url: `${SITE.url}/news/${SLUG}`,
    type: "article",
    publishedTime: article.publishedAt,
    authors: [SITE.founder],
    tags: article.tags,
    images: [{ url: article.heroImage }],
  },
};

export default function Page() {
  const schema = articleSchema({
    title: article.title,
    description: article.description,
    slug: SLUG,
    datePublished: article.publishedAt,
    image: `${SITE.assetsUrl}${article.heroImage}`,
    keywords: article.tags,
  });

  const related = relatedFor(SLUG, 3).map((r) => ({
    slug: r.slug,
    title: r.title,
    category: r.category,
    deck: r.deck,
  }));

  return (
    <>
      <JsonLd data={schema} />
      <Breadcrumbs
        offsetTop
        items={[
          { label: "Home", href: "/" },
          { label: "News", href: "/news" },
          { label: article.title },
        ]}
      />
      <LetterArticle
        eyebrow={article.eyebrow}
        title={article.title}
        deck={article.deck}
        heroImage={article.heroImage}
        heroCaption={article.heroCaption}
        datePublished={article.publishedAt}
        readingTime={article.readingTime}
        category={article.category}
        signatureMeta="— Lahore desk · 2026-05-09"
        related={related}
        cta={article.cta}
      >
        <p>
          The dental practice owner sat across from me at a kebab spot near
          Liberty Market in Lahore and said two things back-to-back: my no-show
          rate is 32 percent, and I&apos;m about to fire my front-desk
          coordinator. The second sentence was the real problem. The front desk
          wasn&apos;t the cause of the no-shows — they were drowning in
          confirmation calls and the no-shows kept climbing anyway.
        </p>
        <p>
          A Karachi dental flagship (six chairs, three dentists, full cosmetic
          and orthodontic suite) was losing roughly PKR 480,000 per month —
          about $1,720 USD at the current rate — to people who booked,
          confirmed, and then ghosted on the day. The owner had tried two things
          before me: SMS reminders through a Pakistani telco bulk-SMS service
          (response rate near zero), and asking the coordinator to call every
          patient twice (burnout in three months).
        </p>
        <p>
          I sketched the flow on a paper napkin that night. Eleven days later it
          was in production. Six months later the cancellation rate sat at{" "}
          <mark>under 10%, sometimes dipping to 7%</mark> on weeks the Signal
          engagement was high. Here&apos;s the entire graph, every node, every
          decision, every fallback.
        </p>

        <h2>The architecture in one paragraph</h2>
        <p>
          <Link href="/services/gohighlevel">GoHighLevel</Link> holds the
          appointment calendar and patient records. n8n watches for appointment
          creation, schedules four touch points across the booking window, sends
          each one through Signal Cloud API, listens for the patient&apos;s
          reply, branches based on the response, and writes the outcome back to
          GHL. The front desk gets one daily Slack digest at 8am: who confirmed,
          who cancelled, who we need to call.
        </p>

        <h2>The four touch points</h2>
        <p>
          Timing is the entire game. Too early and patients forget. Too late and
          they don&apos;t reply in time. The schedule we settled on after three
          iterations:
        </p>
        <ol>
          <li>
            <strong>T-7 days, 10am local:</strong> &quot;Hi [Name], confirming
            your appointment with Dr. [X] on [date] at [time]. Reply YES to
            confirm or RESCHEDULE to pick a new slot.&quot;
          </li>
          <li>
            <strong>T-48 hours, 11am local:</strong> short version with location
            pin and a reminder that confirmed slots open up if they tap
            RESCHEDULE.
          </li>
          <li>
            <strong>T-24 hours, 6pm local:</strong> only fires if the patient
            has not yet replied YES. Tone shifts to &quot;we&apos;ve held this
            chair for you — quick yes/no?&quot; with the cancellation fee policy
            mentioned.
          </li>
          <li>
            <strong>T-3 hours:</strong> &quot;See you at [time]. Reply LATE if
            you&apos;re running behind — we hold chairs 10 minutes past
            start.&quot;
          </li>
        </ol>
        <p>
          The 6pm timing on T-24 was a hard-won choice. We tested 10am, 2pm, and
          6pm. 6pm crushed the others because that&apos;s when people are home,
          settled, and actually checking Signal.
        </p>
        <div className="margin-note">10am replies looked like spam to them</div>

        <h2>The n8n graph — node by node</h2>

        <h3>Trigger: GoHighLevel webhook</h3>
        <p>
          GHL fires a webhook on <code>appointment.created</code>. The n8n
          webhook node receives it, normalizes the patient&apos;s phone (we
          strip leading zeros and prepend +92 for local numbers), and passes the
          appointment ID and start time downstream.
        </p>

        <h3>Schedule fan-out</h3>
        <p>
          Four parallel branches each compute the send time for one touch point.
          Branch 1 calculates appointment_time minus 7 days. Branch 2 minus 48
          hours. Branch 3 minus 24 hours. Branch 4 minus 3 hours. Each branch
          enqueues a job to n8n&apos;s built-in <code>Wait</code> node.
        </p>
        <p>
          We hold the appointment data in a Postgres table I added to the VPS so
          that if n8n restarts mid-wait, we don&apos;t lose pending sends. The
          Postgres row gets marked <code>sent_t7=true</code> as each touch-point
          fires, so resends after a restart can pick up where they left off.
        </p>

        <h3>Signal Cloud API send</h3>
        <p>
          Each touch point lands in a Signal template message. Signal requires
          templates be pre-approved for messages sent outside the 24-hour
          customer-initiated window — which dental appointments mostly are. We
          submitted four templates:
        </p>
        <ul>
          <li>
            <code>dental_confirm_t7</code> — opt-in to confirm
          </li>
          <li>
            <code>dental_remind_t48</code> — location + reminder
          </li>
          <li>
            <code>dental_urgent_t24</code> — fee policy + last chance
          </li>
          <li>
            <code>dental_arrive_t3</code> — see you today
          </li>
        </ul>
        <p>
          Three of four passed Meta&apos;s review on first submission. The
          <code> dental_urgent_t24</code> got rejected twice for
          &quot;promotional tone&quot; before we softened the fee language and
          it passed.
        </p>

        <h3>Reply listener</h3>
        <p>
          Signal Cloud sends incoming messages to a different webhook. We parse
          the patient reply against a regex bank:
        </p>
        <pre>
          <code>{`YES|HAA|HAANJI|OK|CONFIRM    -> confirmed
NO|CANCEL|NAHIN|CANT          -> cancel + reopen slot
RESCHEDULE|CHANGE|SHIFT       -> reschedule flow
LATE|RUNNING LATE             -> notify front desk only
(any other text)              -> route to human queue`}</code>
        </pre>
        <p>
          The dental practice serves both English-speakers and Urdu/Hindko
          speakers, so the regex bank had to cover Romanized Urdu words (haa,
          nahin, theek hai). Took two iterations after the front desk pointed
          out we&apos;d been mis-classifying &quot;ji haan&quot; as
          &quot;no.&quot;
        </p>

        <h3>The reschedule sub-flow</h3>
        <p>
          When someone replies RESCHEDULE, we don&apos;t try to do this in chat.
          We send a follow-up with a Cal.com link scoped to the dentist
          they&apos;re booked with, showing only their available slots for the
          next 21 days. The patient picks a new time, Cal.com writes back to
          GHL, GHL fires <code>appointment.updated</code>, and the four-touch
          schedule starts over.
        </p>

        <h3>The daily digest</h3>
        <p>
          Every morning at 8am Karachi time, a separate n8n cron flow queries
          the previous 24 hours of replies and posts a summary to the front-desk
          Slack channel:
        </p>
        <pre>
          <code>{`Daily appointment digest — 2026-05-09
─────────────────────────────────────
Confirmed:    23
Cancelled:     2  (Dr. Salman 11am, Dr. Aisha 4pm — slots reopened)
Rescheduled:   4
No reply:      6  (call list below)
Late warning:  1

Call list (T-24 no reply):
1. Faisal Akhtar — 03212345678 — Dr. Khalid 3pm tomorrow
2. ...`}</code>
        </pre>
        <p>
          The front desk now calls 6 patients a day instead of 60. The calls
          they do make are the ones that statistically matter — the T-24 silent
          ones — and conversion on those calls is around 75%.
        </p>

        <h2>The cost math</h2>
        <p>Before:</p>
        <ul>
          <li>32% no-show rate on ~120 appointments/week</li>
          <li>Average appointment value: PKR 12,500 ($45)</li>
          <li>Monthly revenue lost to no-shows: PKR 480,000 ($1,720)</li>
        </ul>
        <p>After:</p>
        <ul>
          <li>9% no-show rate (steady-state, post-month 2)</li>
          <li>Monthly revenue lost to no-shows: ~PKR 135,000 ($485)</li>
          <li>
            <strong>Recovered monthly revenue: ~PKR 345,000 ($1,235)</strong>
          </li>
        </ul>
        <p>
          Build cost: $4,200 one-time (11 days), $397/month retainer for ongoing
          template updates, n8n hosting, and the two hours/month I spend on the
          flow. The whole system pays back in under four months and prints money
          after that.
        </p>
        <blockquote>
          The honest part: the n8n flow is maybe 60% of the win. The other 40%
          is that the dental practice now has a credible threat of a
          cancellation fee, because the system makes it impossible to claim
          &quot;I didn&apos;t get a reminder.&quot; That confidence changed how
          the front desk talked to patients about the policy.
          <cite>— Field note, month 3</cite>
        </blockquote>

        <h2>Two things I&apos;d build differently today</h2>
        <p>
          First, I&apos;d skip the Postgres durability layer. n8n now has a
          queue-mode worker setup that survives restarts natively. At the time
          of build, it was new enough that I didn&apos;t trust it. Today
          I&apos;d trust it.
        </p>
        <p>
          Second, I&apos;d add a Vapi voice agent for the T-24 no-reply group.
          Right now those go to the front desk. A voice agent that calls, says
          &quot;hi this is Sara from the dental office, just confirming your
          appointment tomorrow&quot; and handles a yes/no reply would probably
          cut the human call list from 6/day to 2/day. The economics on Vapi at
          $0.07/minute mean each prevented no-show is a 600× ROI on the agent
          call.
        </p>

        <h2>If you want this for your practice</h2>
        <p>
          The <Link href="/services/n8n-automation">n8n flow</Link> ports
          cleanly to any single-location practice with appointment-based
          revenue: dental, chiropractic, dermatology, aesthetics, physiotherapy.
          The base template is now $2,997 for a 10-day ship including Signal
          setup, GHL pipeline mapping, four template approvals, the n8n graph,
          and a handoff Loom for your front desk.
        </p>
        <p>
          The audit&apos;s free. Eight-hour reply. Yes, no, or referral. If
          you&apos;re losing more than $1,000/month to no-shows, the math works.
        </p>
      </LetterArticle>
    </>
  );
}
