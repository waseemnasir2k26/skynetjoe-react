import type { Metadata } from "next";
import LetterArticle from "@/components/letter/LetterArticle";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { articleSchema } from "@/lib/schema";
import { getArticle, relatedFor } from "@/lib/news";
import { SITE, twitterFromOpenGraph } from "@/lib/site";

const SLUG = "n8n-vs-zapier-2026-switch";
const article = getArticle(SLUG)!;

export const metadata: Metadata = {
  title: article.title,
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
  twitter: twitterFromOpenGraph({
    title: article.title,
    description: article.description,
    images: [article.heroImage],
  }),
};

export default function Page() {
  const schema = articleSchema({
    title: article.title,
    description: article.description,
    slug: SLUG,
    basePath: "/news",
    type: "NewsArticle",
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
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
        signatureMeta="— Crate Cafe, Canggu · 2026-05-04"
        related={related}
      >
        <p>
          The Zapier invoice that finally broke the camel&apos;s back was $284
          for one client in March. Three Pro seats, two Team seats across other
          accounts, a handful of premium-app surcharges. Nothing fancy — mostly
          Gmail to GoHighLevel to Google Sheets fan-outs, plus a Slack notifier
          on the end. The kind of stack a senior ops person could rebuild in n8n
          in an afternoon.
        </p>
        <p>
          I&apos;d been putting off the switch for eighteen months.
          Zapier&apos;s UI is genuinely better. Their support replies in three
          hours when n8n&apos;s forum sometimes takes three days. The pre-built
          integrations cover edge cases — like Asana&apos;s &quot;task
          moved&quot; trigger that n8n still can&apos;t replicate cleanly — that
          you only notice once you&apos;ve already shipped.
        </p>
        <p>
          But the bill kept climbing. And the worst part was that I
          couldn&apos;t look a client in the eye and explain why their five-step
          Zap cost them $79/month forever when I knew the same flow ran on n8n
          self-hosted for essentially zero marginal cost.
        </p>

        <h2>The math, ugly version</h2>
        <p>
          Here&apos;s what a typical SkynetLabs client stack ran on Zapier in
          2025:
        </p>
        <ul>
          <li>1 × Zapier Pro seat for the client: $79/month</li>
          <li>2 × Premium app surcharges (Signal Cloud, Twilio): $19/month</li>
          <li>Task overage on busy months (5,000 tasks tier): $30–60/month</li>
          <li>
            My internal Team seat to manage their account: $103/seat amortized
          </li>
        </ul>
        <p>
          Call it <mark>$200–$260 per client per month</mark> all-in. Across
          nine active retainers, I was burning $2,100/month on Zapier.
          That&apos;s a flight from Denpasar to Lahore. Every month.
        </p>
        <div className="margin-note">two flights a year is real money</div>
        <p>
          Now compare a single Hostinger KVM2 VPS — 2 vCPU, 8GB RAM, 100GB SSD,
          in their Singapore datacenter — running self-hosted n8n on Docker
          behind an nginx reverse proxy with Let&apos;s Encrypt. The bill:{" "}
          <mark>$7.99/month</mark>. That one box comfortably hosts n8n instances
          for all nine clients on separate subdomains, with PM2 for
          restart-on-crash and a daily backup to a $1.99/mo S3 bucket.
        </p>
        <p>
          The migration math was offensive. Spend two weekends rebuilding flows,
          save $2,000+ a month forever. The only honest reason I&apos;d been
          stalling was that I&apos;d sold clients on Zapier in the contracts and
          I felt weird about pivoting.
        </p>

        <h2>What the switch actually looked like</h2>
        <p>
          Saturday morning, 7am, Crate Cafe. Iced latte (35,000 IDR — about
          $2.20), laptop, scooter parked outside. I started with the smallest
          client first — a wellness brand running three Zaps: form submission →
          GHL contact create → Slack alert. Maybe four trigger nodes total.
        </p>
        <p>
          The first n8n flow took me 40 minutes to rebuild. Mostly because I had
          to remember which side of the n8n HTTP Request node sets the auth
          header versus the JSON body. By the third flow that day, I was running
          about 12 minutes per Zap. By Sunday afternoon I had migrated four
          clients completely.
        </p>
        <blockquote>
          The biggest surprise was that 80% of my Zaps were genuinely
          straightforward HTTP calls with a transform step in the middle. The
          remaining 20% — Stripe webhooks with signature verification, Calendly
          OAuth refresh, Signal Cloud API media handling — took as long as the
          other 80% combined.
          <cite>— Field notes, day 2</cite>
        </blockquote>

        <h2>The three Zaps I kept paying for</h2>
        <p>
          I&apos;m not anti-Zapier. There are three specific flows where I still
          pay the bill because the engineering time to replicate them in n8n
          isn&apos;t worth it.
        </p>
        <p>
          <strong>One: Pipedrive deals to QuickBooks invoices.</strong> The
          Pipedrive-QuickBooks Zap handles tax codes, line items, and customer
          dedupe in a way that took me four hours to half-rebuild before I gave
          up and reinstated the Zap. $19.99/mo. Worth it.
        </p>
        <p>
          <strong>Two: Webflow CMS to Algolia sync.</strong> The Webflow side
          has a quirk where partial updates don&apos;t fire the &quot;item
          updated&quot; webhook reliably. Zapier&apos;s polling-trigger handles
          it. n8n&apos;s equivalent needs a polling cron-job wrapper that ate
          two evenings.
        </p>
        <p>
          <strong>Three: Stripe → Mailchimp.</strong> Honestly, just because
          both sides have so many edge cases (failed payments, refunds, plan
          changes) that the pre-built Zap is battle-tested in ways my custom
          flow isn&apos;t. Run it for a wellness client at $9.99/mo. Done.
        </p>
        <p>
          Everything else — every single client onboarding flow, every Signal
          notifier, every Google Calendar to GHL sync, every form-to-CRM, every
          Slack alerter, every Airtable mirror — runs on n8n now.
        </p>

        <h2>Where n8n actually beats Zapier</h2>
        <p>Three places, in order of importance:</p>
        <p>
          <strong>Branching logic that doesn&apos;t cost extra.</strong> In
          Zapier, every path of an if/then branch is a separate billable task.
          In n8n, branches are free. A 4-way switch with three downstream
          actions costs you 1 execution, not 4. For workflows with heavy
          branching — anything resembling lead scoring or routing — n8n is 5–10×
          cheaper per execution.
        </p>
        <p>
          <strong>Code nodes.</strong> n8n&apos;s native JS/Python code nodes
          mean I can drop in 20 lines of transform logic without going through a
          webhook to a Cloudflare Worker and back. Zapier&apos;s Code by Zapier
          exists but times out at 10 seconds and limits memory. Half the time I
          needed it, I&apos;d hit the limit.
        </p>
        <p>
          <strong>Data ownership.</strong> Client owns the n8n instance, the
          credentials, the workflow JSON exports. When they want to leave
          SkynetLabs one day, they get a USB stick worth of files and a runbook.
          With Zapier they get a login URL and a prayer.
        </p>

        <h2>What I&apos;d still warn you about</h2>
        <p>
          Self-hosted n8n is not free. It&apos;s $8/month plus your time. If
          you&apos;re a solo founder who can&apos;t debug a Docker container at
          2am when n8n&apos;s PostgreSQL fills up because nobody pruned the
          execution history table, stay on Zapier or n8n Cloud.
        </p>
        <p>
          The other footgun: <strong>n8n&apos;s versioning is brittle.</strong>{" "}
          A minor update broke my Slack node twice this year. The fix took 20
          minutes both times but the kind of operator who can&apos;t afford 20
          minutes of downtime should be paying Zapier&apos;s premium for the
          SLA.
        </p>
        <p>
          That&apos;s the honest take. Zapier still wins on polish, support, and
          the bottom 20% of integrations. n8n wins on cost, ownership, and
          flexibility. For a service-business operator with 5+ flows running,
          the math has clearly tipped.
        </p>

        <h2>The 14-day switch — what I&apos;d do today</h2>
        <p>
          If you&apos;re reading this with an open Zapier dashboard and three
          Pro seats burning your card every month, here&apos;s the order
          I&apos;d use:
        </p>
        <ol>
          <li>
            Spin up a Hostinger KVM2 VPS. Install Docker, n8n, nginx, certbot.
            One evening, three hours.
          </li>
          <li>
            Migrate your simplest Zaps first. Build the muscle memory before you
            touch the OAuth-heavy ones.
          </li>
          <li>
            Keep Zapier running in parallel for two weeks. Don&apos;t cancel
            until you&apos;ve confirmed no executions on the Zapier side for a
            full week.
          </li>
          <li>
            Snapshot every n8n workflow JSON into a git repo. This is the
            handoff artifact you give the client.
          </li>
          <li>
            Cancel Zapier seats one by one, on month-end, with a forwarding rule
            in case anything broke silently.
          </li>
        </ol>
        <p>
          That&apos;s the menu. If you want me to do this for you, the
          audit&apos;s free, the eight-hour reply window applies, and the
          migration tier is a flat $1,997 for up to ten workflows including the
          VPS setup.
        </p>
      </LetterArticle>
    </>
  );
}
