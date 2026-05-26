import type { Metadata } from "next";
import LetterArticle from "@/components/letter/LetterArticle";
import JsonLd from "@/components/JsonLd";
import { articleSchema } from "@/lib/schema";
import { getArticle, relatedFor } from "@/lib/news";
import { SITE } from "@/lib/site";

const SLUG = "8-hour-reply-rule";
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
      <LetterArticle
        eyebrow={article.eyebrow}
        title={article.title}
        deck={article.deck}
        heroImage={article.heroImage}
        heroCaption={article.heroCaption}
        datePublished={article.publishedAt}
        readingTime={article.readingTime}
        category={article.category}
        signatureMeta="— Canggu rooftop · 2026-05-07"
        related={related}
      >
        <p>
          When clients sign on, the first thing I tell them is: you&apos;ll hear
          back within eight hours, weekday Bali time. That&apos;s the deal.
          That&apos;s the entire customer-success program. There&apos;s no
          dashboard, no monthly check-in call, no &quot;account executive&quot;
          who pretends to know your account. Just a Signal thread and an eight-hour
          reply window.
        </p>
        <p>
          Eight hours sounds aggressive — most agencies promise 24–48. But
          eight is actually the laziest number I could pick, because of how
          Bali&apos;s timezone works. GMT+8 means I wake up at 6am as US East
          Coast is going to sleep. By the time New York opens at 9am EST
          (8pm Bali), I&apos;ve already had a full work day, ridden the scooter
          home, eaten, and am on the second coffee block. Any Signal from a
          US client that lands in their morning gets a reply before I sleep.
          That&apos;s structurally 8 hours. Sometimes 3.
        </p>

        <h2>Why I built the shop around reply time</h2>
        <p>
          Because the single complaint I heard from every client who&apos;d been
          burned by an agency was the same: <em>&quot;I had to chase them.&quot;</em>
        </p>
        <p>
          Not a technical complaint. Not a deliverable complaint. Not a price
          complaint. They had to chase. They&apos;d send a Signal on Tuesday
          asking about a checkout bug, get a reply Friday saying &quot;great
          question, let me check with the dev team,&quot; and another week
          would pass before anyone touched it. By the time it was fixed, the
          client had lost trust in the shop and the bug had cost them four-figure
          revenue.
        </p>
        <div className="margin-note">they chased — that&apos;s the whole pain</div>
        <p>
          So I made the eight-hour reply the headline promise. Not the
          deliverable, not the price, not the tech stack — the reply. Because if
          you can guarantee a reply, the client&apos;s nervous-system relaxes
          and everything downstream gets easier.
        </p>

        <h2>The stack that runs the eight-hour rule</h2>
        <p>
          It&apos;s embarrassingly simple. People expect me to show a custom
          Notion build with five views and a Zapier hub. Here&apos;s what it
          actually is:
        </p>
        <ul>
          <li>
            <strong>Signal (one number)</strong> — every active client
            in one app. Pinned threads at the top. Star-emoji on threads that
            need a reply today.
          </li>
          <li>
            <strong>Notion board, four columns</strong> — Today, This week,
            Blocked, Done. Every active build is a card. Edit on the scooter
            ride home.
          </li>
          <li>
            <strong>Cal.com</strong> — only available slots, two days out, 15
            and 30 minute options. No back-and-forth scheduling.
          </li>
          <li>
            <strong>Loom</strong> — when something can&apos;t be explained in a
            paragraph, I record a 90-second walkthrough instead of asking for a
            call.
          </li>
        </ul>
        <p>
          That&apos;s the entire ops stack. Total cost: $35/month for Notion
          Plus and a Loom seat. Signal and Cal.com are free.
        </p>

        <h2>The weekly rhythm</h2>
        <p>
          Mondays in Bali are slow. US clients are still in their weekend, EU
          clients are in their Monday morning. I use Monday for deep build
          work — the hard stuff that needs a 4-hour uninterrupted block. No
          calls, no meetings, no Signal checks until 4pm.
        </p>
        <p>
          Tuesdays through Thursdays are reactive. I check Signal at 7am
          (over the first coffee at Crate or Penny Lane), 12pm (lunch break),
          and 4pm (end of the work block). Three checks. That&apos;s the
          whole loop. Anything urgent inside that window gets handled in
          under an hour because it&apos;s already on my phone.
        </p>
        <p>
          Fridays I write — newsletters, this kind of essay, content batches
          for LinkedIn. The build work is mostly wrapped, the inbox is mostly
          quiet, and writing requires the kind of attention you can&apos;t
          fake on a noisy week.
        </p>
        <blockquote>
          The hard part isn&apos;t answering — it&apos;s the discipline of
          not answering immediately. If you reply in 90 seconds you train
          clients to expect 90 seconds. Eight hours is the right number
          because it&apos;s humane in both directions.
          <cite>— operating note, March 2026</cite>
        </blockquote>

        <h2>How I handle four builds at once without dropping any</h2>
        <p>
          The trick that actually works: <mark>one build per day, max.</mark> I
          don&apos;t context-switch between two active builds on the same day.
          Monday is Client A. Tuesday is Client B. Wednesday is back to A if
          they unblocked me overnight, otherwise C. Each day has a single
          dominant build. The other three are in maintenance mode — answer
          Signal, ship the small ticket, push to staging, don&apos;t start
          anything new.
        </p>
        <p>
          This sounds inefficient. It&apos;s actually the opposite. Context
          switching kills 30–60 minutes per swap. Two swaps a day is an hour
          burned for nothing. One dominant build per day means I&apos;m shipping
          4–6 hours of focused work, every day, on the right thing.
        </p>
        <p>
          The other discipline: <strong>I close every build inside the contracted
          window or I refund the slot.</strong> I&apos;ve refunded twice in 18
          months. Both times I let the client pick a future slot at the original
          price and they did, but I shipped on time after that because the
          public humiliation of a refund is a stronger forcing function than
          any project-management tool.
        </p>

        <h2>What burns me out — and what doesn&apos;t</h2>
        <p>
          People assume the solo-from-Bali setup must lead to burnout. The
          opposite has been true. What actually burns operators out, in my
          experience watching agency founders blow up, is:
        </p>
        <ol>
          <li>Calls you didn&apos;t need to take</li>
          <li>Clients you shouldn&apos;t have signed</li>
          <li>Scope you couldn&apos;t define</li>
          <li>Money conversations you avoided</li>
        </ol>
        <p>
          None of those are reply-volume issues. They&apos;re front-of-funnel
          issues. The eight-hour reply window is downstream of a tight audit
          process, public pricing, fixed scope, and the willingness to say
          &quot;not a fit, here&apos;s a referral&quot; on the first call.
        </p>
        <p>
          The week I shipped the GutReno funnel and the Wellness DNA Shopify
          stack — both inside the same 10-day window in February — I worked
          maybe 35 hours total. Eight-hour replies, focused build blocks,
          no calls past 5pm Bali time. The week after I took five days off
          and rode the scooter up to Ubud. Nothing dropped.
        </p>

        <h2>The honest version of why this works</h2>
        <p>
          It works because the scope is small. Four builds a month, max. Nine
          retainers, max. One operator. If I tried to run twenty retainers and
          forty builds, the eight-hour rule would collapse inside a week and
          I&apos;d be the next agency founder writing &quot;I burned out&quot;
          tweets at 2am.
        </p>
        <p>
          The growth path isn&apos;t more clients. It&apos;s higher-tier clients.
          The Flagship tier ($9,500 + $1,997/mo) means one client can pay for
          three Starter tiers. The math means I&apos;d rather close one Flagship
          than eight Starters. And the eight-hour rule scales fine at four
          retainers; it would break at fifteen.
        </p>
        <p>
          That&apos;s the trade. Public pricing, tight scope, eight-hour reply,
          ceiling on volume. If you want a 40-person agency with a CSM and a
          weekly status call, the answer is to hire one. If you want one
          operator who&apos;ll reply in under eight hours and ship in under
          three weeks, that&apos;s the menu.
        </p>
      </LetterArticle>
    </>
  );
}
