import type { Metadata } from "next";
import LetterArticle from "@/components/letter/LetterArticle";
import JsonLd from "@/components/JsonLd";
import { articleSchema } from "@/lib/schema";
import { getArticle, relatedFor } from "@/lib/news";
import { SITE } from "@/lib/site";

const SLUG = "public-pricing-ai-builds";
const article = getArticle(SLUG)!;

export const metadata: Metadata = {
  title: `${article.title} | SkynetLabs`,
  description: article.description,
  alternates: { canonical: `/news/${SLUG}` },
  openGraph: {
    title: article.title,
    description: article.description,
    url: `/news/${SLUG}`,
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
    image: `${SITE.url}${article.heroImage}`,
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
        signatureMeta="— Bali rooftop · 2026-05-15"
        related={related}
      >
        <p>
          Every agency owner I know hides their pricing. The reasoning is
          always one of three things: <em>&quot;our projects are bespoke,&quot;
          &quot;we don&apos;t want to anchor low,&quot; or &quot;our competitors
          will undercut us.&quot;</em> All three are wrong, and the last one is
          a tell that the founder hasn&apos;t thought about it for more than
          ten seconds.
        </p>
        <p>
          SkynetLabs publishes four tiers, top of the pricing page,
          permanent URL. Starter $1,497. Pro $3,997 plus $497/mo. Premium
          $7,997 plus $997/mo. Flagship $9,500 plus $1,997/mo. The numbers
          are the same numbers a client sees in the contract. There&apos;s
          no &quot;starting at&quot; theatre. No &quot;contact for quote.&quot;
          No discovery-call upsell where the number doubles because they
          mentioned they have $40k in budget.
        </p>
        <p>
          Eighteen months in, public pricing has been the single highest-leverage
          decision I made for the shop. Here&apos;s the strategic case, and
          the one tier I refused to publish because nobody ever needed it.
        </p>

        <h2>What public pricing actually does</h2>
        <p>
          The benefit isn&apos;t &quot;transparency,&quot; whatever that
          marketing word means. The benefit is operational. <mark>Public
          pricing kills the worst-fit clients before they ever reach the
          call.</mark>
        </p>
        <p>
          When a brand-new wellness brand with $800 in their account
          messages me on WhatsApp, they see &quot;Starter $1,497&quot; on
          the pricing page and self-deselect. They don&apos;t book a
          call. They don&apos;t waste 45 minutes of mine. They don&apos;t
          email back three times asking if I have a smaller package.
          They simply move on. Net result: I take roughly 60% fewer
          discovery calls than I did when pricing was &quot;starts
          around $X depending on scope.&quot;
        </p>
        <p>
          The other side of the same effect: when a 14-truck fleet
          operator messages me, they see the Pro tier at $3,997 plus
          $497/mo and they know — before the call — that this is
          a price they can actually pay. The call becomes about scope
          and fit, not negotiation. The close rate on calls went from
          roughly 32% (pre-public pricing) to 71% (after). Same lead
          quality on the wire; fundamentally different conversation in
          the meeting.
        </p>
        <div className="margin-note">the call gets to do its real job</div>

        <h2>The three objections, and why each is wrong</h2>

        <h3>&quot;Our projects are bespoke&quot;</h3>
        <p>
          The agency owner says this and means &quot;we customize.&quot;
          Customers hear &quot;we charge whatever the market will bear,
          which is a way of saying we&apos;ll charge you more.&quot; The
          industries that successfully sell bespoke work — lawyers,
          consultants, custom home builders — almost always publish a
          floor: <em>&quot;starting at $X.&quot;</em>
        </p>
        <p>
          The fix: publish tiers that capture 80% of the bespoke variations
          you actually do. The other 20% can be &quot;Flagship — call us&quot;
          and that&apos;s honest. Three tiers covers the modal customer.
          Four tiers covers the wealthy customer. You don&apos;t need
          twelve.
        </p>

        <h3>&quot;We don&apos;t want to anchor low&quot;</h3>
        <p>
          The fear: customers see a $1,497 Starter and think the agency
          is cheap. The reality: customers see a $1,497 Starter and a
          $9,500 Flagship and now they have a range that makes the
          middle tiers look reasonable. The Premium tier at $7,997 is
          the most-sold tier <em>because</em> the Starter tier exists.
          Pricing is comparative; one number alone has no meaning.
        </p>

        <h3>&quot;Competitors will undercut us&quot;</h3>
        <p>
          They were going to compete on price regardless. The race-to-
          the-bottom shops aren&apos;t pricing off your published rate;
          they&apos;re pricing off whatever the customer told them last
          agency quoted. Your published price actually <em>protects</em>
          you from race-to-the-bottom dynamics because customers can see
          you stand behind your number.
        </p>
        <p>
          The competitors who matter — the ones serving the same
          tier of customer — usually publish similar ranges. The ones
          who don&apos;t are either much more expensive (and the
          customer self-deselects toward you) or much cheaper (and the
          customer was never going to pay you anyway).
        </p>

        <h2>The thing public pricing forces you to do</h2>
        <p>
          Hold prices steady. The discipline isn&apos;t publishing the
          number; it&apos;s the inability to quietly raise the number
          for the next customer just because you can. Public pricing
          ties your hands in exactly the way that makes you
          trustworthy.
        </p>
        <p>
          I&apos;ve raised SkynetLabs prices three times in 18 months —
          each time with 30 days notice on the pricing page, each time
          honored at the old rate for any in-flight quotes. That kind of
          movement is what builds the &quot;these people are
          straightforward&quot; reputation that closes deals.
        </p>
        <blockquote>
          What I love about your pricing is that I can send it to my
          business partner without scheduling a call first. Half the
          agencies we&apos;ve talked to make you sit through a 45-minute
          sales pitch before they&apos;ll even tell you the number.
          <cite>— Karachi dental client, post-close</cite>
        </blockquote>

        <h2>The one tier I refused to publish</h2>
        <p>
          There used to be a fifth tier. Internally I called it
          &quot;Enterprise.&quot; Quote-based, no fixed price, &quot;contact
          us.&quot; Started at $25,000 and went up. I put it on the
          pricing page for two weeks in late 2024.
        </p>
        <p>
          Zero inquiries. Not a single email. I removed it.
        </p>
        <p>
          The lesson: a tier nobody asks for is a tier you don&apos;t
          need on the page. The Flagship tier at $9,500 was, in practice,
          the ceiling of what my actual customer base would buy. Adding
          a higher tier was vanity, not strategy.
        </p>
        <p>
          When the Flagship tier&apos;s utilization hits something like
          80% of slots month-over-month, I&apos;ll re-introduce a higher
          tier with a real number on it. Until then, the menu stops at
          $9,500 and the page is calmer for it.
        </p>

        <h2>What I still negotiate, even with public pricing</h2>
        <p>
          Public pricing isn&apos;t inflexible pricing. Three things still
          move:
        </p>
        <ol>
          <li>
            <strong>Payment terms.</strong> Default is 50/50. I&apos;ll do
            25/25/50 (signature, midpoint, launch) for a client who
            asks. Not a discount, just a different schedule.
          </li>
          <li>
            <strong>Scope swaps.</strong> If the Pro tier includes a
            feature you don&apos;t need, I&apos;ll usually trade it for
            something else inside the tier. The total stays the same.
          </li>
          <li>
            <strong>Retainer commitment.</strong> If a client commits
            to 6 months on a retainer upfront, the monthly rate drops
            ~10%. The discount is real; it&apos;s in exchange for
            cashflow predictability.
          </li>
        </ol>
        <p>
          What does <em>not</em> move: the total project cost. The
          tiers are the tiers. If you need a tier larger than Flagship,
          we have a different conversation, and I&apos;ll quote based
          on the actual hours. But I&apos;ll quote in writing, on the
          first reply, not after a discovery call where I&apos;ve felt
          out your wallet.
        </p>

        <h2>The metric I track</h2>
        <p>
          The numbers I watch on the pricing page:
        </p>
        <ul>
          <li>Bounce rate on the pricing page (was 71%, now 58%)</li>
          <li>Click-through from pricing to discovery-call form (was 4%, now 11%)</li>
          <li>Close rate on discovery calls (was 32%, now 71%)</li>
          <li>Average deal size (was $2,800, now $5,400)</li>
        </ul>
        <p>
          The third metric is the prize. Tripling the close rate on
          discovery calls means I run fewer calls, sleep more, and
          take more scooter rides up to Ubud. That&apos;s the actual
          quality-of-life payoff of public pricing — not the
          philosophical victory, the reclaimed hours.
        </p>
        <p>
          If you&apos;re an agency owner reading this with a &quot;pricing
          available upon request&quot; page, the experiment to run is
          obvious. Publish the numbers for 60 days. Measure the four
          metrics above. If you don&apos;t see a lift in the third one,
          take them down. You won&apos;t.
        </p>
      </LetterArticle>
    </>
  );
}
