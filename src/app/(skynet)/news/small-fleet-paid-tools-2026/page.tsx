import type { Metadata } from "next";
import LetterArticle from "@/components/letter/LetterArticle";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { articleSchema } from "@/lib/schema";
import { getArticle, relatedFor } from "@/lib/news";
import { SITE } from "@/lib/site";

const SLUG = "small-fleet-paid-tools-2026";
const article = getArticle(SLUG)!;

export const metadata: Metadata = {
  title: `${article.title} | SkynetLabs`,
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
        signatureMeta="— Canggu desk · 2026-05-13"
        related={related}
      >
        <p>
          A 14-truck operator out of Memphis sent me his stack list last
          month — the full SaaS receipt. Twelve subscriptions. $1,184 a
          month. Six of those tools were genuinely necessary. Six were
          either redundant, abandoned, or quietly billing him because he
          forgot to cancel after a trial.
        </p>
        <p>
          He&apos;s not unusual. After auditing twelve small-fleet
          operators in the first quarter of 2026 — anywhere from 6 trucks
          to 22 — the average paid SaaS bill landed at roughly $890/month
          and the average percentage of that bill genuinely being used
          was about 55%. That&apos;s $400/month, every month, going to
          tools that should have been deleted six months ago.
        </p>
        <p>
          Here&apos;s the honest breakdown — which six tools every small
          fleet actually needs, which four can usually go, and what
          replaces them.
        </p>

        <h2>The six tools that genuinely earn their bill</h2>

        <h3>One: ELD (e-log device service)</h3>
        <p>
          Federally mandated, not optional. The question isn&apos;t whether
          you pay; it&apos;s which provider. For small fleets the price
          difference between the cheap providers and the premium ones is
          meaningful: somewhere between $20 and $45 per truck per month.
        </p>
        <p>
          The honest take: if your drivers are settled and you don&apos;t
          need fancy analytics, the $25/truck tier of any FMCSA-compliant
          provider is fine. If you&apos;re dealing with driver turnover or
          insurance audits, the $40/truck tier with the better reporting
          stack pays for itself.
        </p>

        <h3>Two: Load board access</h3>
        <p>
          DAT or Truckstop. Pick one based on the lanes you run, don&apos;t
          subscribe to both unless you have a dedicated dispatcher running
          both windows. The premium tier with broker credit-score data
          is worth the extra $20/month. The triple-premium with rate
          analytics is usually not — you can get the same data free out
          of conversations with other operators.
        </p>

        <h3>Three: Factoring portal</h3>
        <p>
          Whoever your factoring company is, the portal is bundled. This
          isn&apos;t a separate decision; it&apos;s a feature of the
          factoring relationship. The point is to use the portal&apos;s
          invoice tracking instead of running a parallel spreadsheet.
          About a third of the operators I audited were running a
          spreadsheet and ignoring the portal. That&apos;s 4-6 hours a
          week of bookkeeping for free.
        </p>

        <h3>Four: Maintenance & DVIR tool</h3>
        <p>
          For fleets above 5 trucks, a real maintenance log is non-optional
          because the alternative is missed PMs and roadside inspections
          you don&apos;t want. The category leaders charge $15-25/truck/month.
          The cheap option ($8/truck) usually works fine if your shop is
          good at logging in.
        </p>

        <h3>Five: Accounting (QuickBooks or equivalent)</h3>
        <p>
          QuickBooks Online at the Plus tier (around $90/month) is the
          default for a reason. The integrations with factoring portals,
          fuel cards, and tax software justify the cost. The cheaper tiers
          choke on the volume by year-end.
        </p>

        <h3>Six: One communication channel</h3>
        <p>
          Signal (free), a Slack workspace (free for under 90
          days of history), or Microsoft Teams (often bundled with
          QuickBooks accounts). One. Not three. If your drivers are
          texting to one number and your office is on Teams and your
          dispatcher is on Signal, that&apos;s an organizational problem,
          not a tooling problem.
        </p>

        <h2>The four tools that usually need to go</h2>

        <h3>One: The second CRM</h3>
        <p>
          Eight of twelve operators I audited were running two CRMs.
          Usually it&apos;s HubSpot from when the office manager three
          years ago set it up, plus Pipedrive that the current sales
          rep prefers, plus a Google Sheet that&apos;s where the leads
          actually live.
        </p>
        <p>
          Pick one. Delete the others. The right one for small fleets
          is usually GoHighLevel (because it&apos;s priced for SMB and
          handles SMS+Signal natively) or a stripped-down Pipedrive.
          HubSpot is too expensive for under 100 contacts in your
          pipeline.
        </p>
        <div className="margin-note">the second CRM is where leads die</div>

        <h3>Two: The standalone dispatch tool you never use</h3>
        <p>
          Three operators had a paid dispatch SaaS sitting alongside
          their ELD provider&apos;s dispatch module. The standalone tool
          was a leftover from a previous setup and nobody opened it.
          Cost: $79–$199/month, gone.
        </p>
        <p>
          The ELD provider&apos;s dispatch module is usually 80% good
          enough. The premium dispatch SaaS only earns its bill if
          you&apos;re running 15+ trucks across multi-stop dispatch with
          live broker integrations.
        </p>

        <h3>Three: The marketing SaaS</h3>
        <p>
          Mailchimp, Constant Contact, Buffer, Hootsuite, Canva Pro —
          most operators don&apos;t actually market enough to justify
          these. They send a quarterly email and post to LinkedIn twice
          a month. That doesn&apos;t need a $30/month tool.
        </p>
        <p>
          The replacement: Gmail&apos;s native send capability for the
          quarterly note (free), LinkedIn&apos;s built-in scheduler
          (free), and Canva&apos;s free tier (covers 90% of the design
          you actually do). If you have a marketing person who really
          uses Mailchimp, keep it. If the senior dispatcher is the
          person sending emails, delete it.
        </p>

        <h3>Four: The receipt-tracking app</h3>
        <p>
          Expensify, Shoeboxed, the niche fuel-receipt scanners — these
          mostly duplicate what QuickBooks Online already does, plus a
          phone camera. The exception: if you have drivers submitting
          receipts and they&apos;re refusing to use the QBO app, a
          dedicated driver-friendly tool can be worth $10/driver/month.
          But most of the time, the receipt app is a 2021 trial that
          never got cancelled.
        </p>

        <h2>The audit framework I use</h2>
        <p>
          When I run a stack audit, the four questions:
        </p>
        <ol>
          <li>
            <strong>Has someone on your team logged into this tool in
            the last 30 days?</strong> If not, cancel. (Half the savings
            comes from this question alone.)
          </li>
          <li>
            <strong>Does this tool talk to your CRM?</strong> If no, and
            it generates customer data, that data is dying in a silo.
            Either integrate it or replace it.
          </li>
          <li>
            <strong>Is the price tier matching your usage?</strong> Half
            of small fleets are on Plus or Pro tiers when they only need
            Starter. The annual save from downgrading is usually $200–$800.
          </li>
          <li>
            <strong>Is this tool&apos;s value going up or down for you?</strong>
            Tools have lifecycles. The dispatch SaaS that was great when
            you had 8 trucks may be the wrong fit now you have 18.
            Re-audit annually.
          </li>
        </ol>

        <h2>The math, on one real audit</h2>
        <blockquote>
          14-truck Memphis operator, before/after audit (April 2026):
          <br />Before — $1,184/month, 12 tools<br />After — $612/month,
          6 tools<br />Annual savings — $6,864<br />Time spent — 90
          minutes on a Zoom call
          <cite>— Real client, anonymized at request</cite>
        </blockquote>

        <h2>What I&apos;d add — not delete — for a growing fleet</h2>
        <p>
          The flip side: there are two things most small fleets are
          <em> not</em> spending on that they should be. Both are AI-driven
          and both pay back in months.
        </p>
        <p>
          <strong>A voice agent for inbound load qualification.</strong>
          Vapi or Retell, around $200–$400/month for the volumes a 10-truck
          fleet sees. The agent answers after-hours broker calls, qualifies
          the load (rate, lane, weight, pickup window), and texts the
          dispatcher only if it&apos;s worth chasing. Stops the 2am
          broker calls from costing you a driver.
        </p>
        <p>
          <strong>A Signal inbox for owner-operator communication.</strong>
          Most small fleets use SMS or email. Your drivers are on Signal.
          A Signal inbox (free) plus a $97/month GoHighLevel
          seat to route the messages saves about 4 hours/week of
          back-and-forth.
        </p>
        <p>
          Both of those are SkynetLabs builds. The audit&apos;s free
          regardless — we&apos;ll tell you what to delete even if you
          don&apos;t buy anything from us.
        </p>
      </LetterArticle>
    </>
  );
}
