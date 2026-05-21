import type { Metadata } from "next";
import LetterArticle from "@/components/letter/LetterArticle";
import JsonLd from "@/components/JsonLd";
import { articleSchema } from "@/lib/schema";
import { getArticle, relatedFor } from "@/lib/news";
import { SITE } from "@/lib/site";

const SLUG = "bali-canggu-coworking-economics";
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
        signatureMeta="— Canggu rooftop · 2026-05-19"
        related={related}
      >
        <p>
          Every digital-nomad post about Bali quotes the same fantasy
          number: <em>&quot;live in paradise for $800 a month!&quot;</em>
          That number exists, and the lifestyle attached to it is a
          mosquito-net dorm bed in a hostel a 15-minute scooter ride
          from the nearest decent coffee shop. The actual cost of
          shipping serious client work out of Canggu, for an operator
          who needs reliable internet, a comfortable place to think,
          and the ability to host an occasional client video call
          without a chicken crowing in the background, is a multiple
          of that.
        </p>
        <p>
          Here&apos;s my actual monthly burn, line by line, for the
          last six months in Canggu. Plus a Lahore comparison at the
          bottom so the numbers feel real, because the relevant
          question isn&apos;t &quot;is Bali cheap?&quot; — it&apos;s
          &quot;is Bali cheap <em>relative to wherever you would
          otherwise be?</em>&quot;
        </p>

        <h2>The villa and utilities</h2>
        <ul>
          <li>
            <strong>One-bed villa, Berawa area:</strong> 18,000,000 IDR/month
            (~$1,150 USD). Private pool, walled garden, 5 minutes scooter
            to Crate Cafe. Long-term lease (6 months); short-term Airbnb
            equivalent runs 28-35M IDR.
          </li>
          <li>
            <strong>Electricity (PLN):</strong> ~1,400,000 IDR/month (~$90).
            High because the AC runs 16 hours/day and Bali humidity is
            non-negotiable.
          </li>
          <li>
            <strong>Water:</strong> 200,000 IDR/month (~$13). Borewell on
            the villa; bottled drinking water adds another 100,000 IDR.
          </li>
          <li>
            <strong>Wi-Fi at home:</strong> 800,000 IDR/month (~$51) for
            100/40 Mbps fiber. Reliable 95% of the time. The 5% downtime
            is what the coworking is for.
          </li>
          <li>
            <strong>Cleaner, twice a week:</strong> 1,200,000 IDR/month
            (~$77). Half-day, includes laundry. Non-optional in this
            climate.
          </li>
        </ul>
        <p>
          Villa stack subtotal: <mark>~$1,380 USD/month</mark>.
        </p>

        <h2>The work setup</h2>
        <p>
          The villa Wi-Fi is good, but I do focused build work in cafes
          and the gym. Two reasons: the AC at home gets stifling on
          afternoon work blocks, and the social texture of working
          around other people keeps me honest about screen time.
        </p>
        <ul>
          <li>
            <strong>Coworking day-passes (BWork / Outpost / Genesis):</strong>
            ~600,000 IDR/month (~$38). Use coworking maybe 6-8 days a
            month, mostly for client video calls when the home internet
            misbehaves.
          </li>
          <li>
            <strong>Cafe spend (Crate, Penny Lane, Quince, Ulekan):</strong>
            roughly 4-5 visits/week, 100,000-150,000 IDR per visit
            (latte + smoothie bowl or banh mi). Call it 2,200,000 IDR/month
            (~$140).
          </li>
        </ul>
        <p>
          Work stack subtotal: <mark>~$178 USD/month</mark>.
        </p>
        <p>
          The cafe spend is the line item most digital-nomad blogs hide.
          They&apos;ll tell you &quot;coffee is $2&quot; without mentioning
          you&apos;ll have it five days a week and you&apos;ll add a meal
          most of those days because the cafe is more comfortable than
          your kitchen.
        </p>

        <h2>Transport and visa</h2>
        <ul>
          <li>
            <strong>Scooter rental (Honda Vario 125):</strong> 1,500,000
            IDR/month (~$96). Long-term rate. Daily rate is double.
          </li>
          <li>
            <strong>Petrol:</strong> 300,000 IDR/month (~$19). Fill up
            once a week, around 65,000 IDR per fill.
          </li>
          <li>
            <strong>Visa cost amortized:</strong> $200 USD/month. Visiting
            Visa B211A (60-day) plus one extension runs about $400 total;
            most operators do a visa run every 6 months to reset. KITAS
            (longer-term) is on the roadmap and runs cheaper amortized.
          </li>
        </ul>
        <p>
          Transport + visa subtotal: <mark>~$315 USD/month</mark>.
        </p>

        <h2>Food and life</h2>
        <ul>
          <li>
            <strong>Groceries (Pepito / Frestive):</strong> ~2,500,000
            IDR/month (~$160). Includes fruit, vegetables, the imported
            stuff (olive oil, oats, sourdough). Local-only would halve
            this.
          </li>
          <li>
            <strong>Gym (S2S Gym in Berawa):</strong> 1,400,000 IDR/month
            (~$90). Full-service, AC, decent equipment, 5 minutes from
            the villa.
          </li>
          <li>
            <strong>Phone (Telkomsel SIM):</strong> 150,000 IDR/month
            (~$10). Local data, calls home over Signal.
          </li>
          <li>
            <strong>Going out (dinners, beach clubs occasionally):</strong>
            roughly 3,000,000 IDR/month (~$190). One nice dinner a week
            (450,000-650,000 IDR for two), one weekend beach club outing
            (500,000-1M IDR depending).
          </li>
        </ul>
        <p>
          Food and life subtotal: <mark>~$450 USD/month</mark>.
        </p>

        <h2>Health and admin</h2>
        <ul>
          <li>
            <strong>SafetyWing nomad insurance:</strong> $51 USD/month.
            Travel medical, covers serious illness/accident but not
            dental or vision.
          </li>
          <li>
            <strong>Banking and accounting:</strong> ~$80 USD/month
            amortized — Wise account fees, the bookkeeping VA I share
            with another nomad founder.
          </li>
        </ul>
        <p>
          Health and admin subtotal: <mark>~$131 USD/month</mark>.
        </p>

        <h2>The total</h2>
        <blockquote>
          Total monthly burn, Canggu, comfortable founder lifestyle:
          <strong>~$2,455 USD/month.</strong>
          <cite>— Six-month average, Nov 2025 — May 2026</cite>
        </blockquote>
        <p>
          That number is roughly what a single tech worker in Brooklyn
          pays just for rent on a one-bedroom. In Canggu it buys the
          villa, the scooter, the gym, the cafes, the visa, the food,
          the gym, the insurance, the cleaner, the coworking. The
          delta is meaningful.
        </p>
        <div className="margin-note">the delta is the whole reason</div>

        <h2>The Lahore comparison</h2>
        <p>
          I split time between Canggu and Lahore (where my family is).
          For an apples-to-apples comparison — same comfort level,
          one-bed apartment, gym, car (not scooter), groceries,
          eating out 2-3x a week — Lahore runs roughly $850-1,100/month
          all-in. About 35-40% of the Canggu cost.
        </p>
        <p>
          So why Canggu? Three reasons, and the third is the one that
          actually matters:
        </p>
        <ol>
          <li>
            Timezone (GMT+8): catches the tail of US East Coast workday
            cleanly, plus full overlap with Australia and most of Asia.
          </li>
          <li>
            Internet reliability: Indonesia&apos;s fiber rollout has
            been faster than Pakistan&apos;s for the kind of upload
            speeds you need for client video calls and remote pair
            sessions.
          </li>
          <li>
            <strong>The peer network.</strong> Canggu has a couple hundred
            serious operator-founders running real businesses. The
            conversations at Crate Cafe at 9am on a Wednesday are
            qualitatively different from anywhere I&apos;ve lived. The
            social bandwidth is the real subsidy on the cost.
          </li>
        </ol>

        <h2>What I&apos;d cut if I had to</h2>
        <p>
          Half the cost stack is non-negotiable to ship at the quality
          SkynetLabs ships at. The other half could compress:
        </p>
        <ul>
          <li>Villa → studio: saves $400/month, costs me the pool</li>
          <li>S2S Gym → outdoor running: saves $90, costs me a structured workout</li>
          <li>
            Cafes 5×/week → 2×/week: saves $80, costs me the social
            texture
          </li>
          <li>Coworking → all-cafe: saves $38, marginal lifestyle impact</li>
        </ul>
        <p>
          Floor for a credible work setup in Canggu, in my estimate:
          <strong> $1,750/month</strong>. Anything below that is
          digital-nomad cosplay — backpacker hostels and McDonald&apos;s
          Wi-Fi. You won&apos;t ship client work from that setup.
        </p>

        <h2>The honest part</h2>
        <p>
          The reason Canggu &quot;works&quot; for the SkynetLabs
          economics is that the price point of the agency&apos;s
          deliverables is set against US/EU/AU client budgets. A Pro
          tier build at $3,997 is a reasonable rate in Memphis, in
          Sydney, in Manchester. The same build run from Berlin or
          London at the same price wouldn&apos;t leave a profit margin
          worth getting out of bed for. The geographic arbitrage is
          structural.
        </p>
        <p>
          That arbitrage is also why public pricing works. The numbers
          I publish are sustainable for me at this cost structure and
          competitive for clients at theirs. Everybody wins because
          the supply side (me) and the demand side (them) sit on
          different sides of an underpriced location boundary. The
          internet flattened almost everything; geography of the
          operator is one of the last places real arbitrage still
          exists, and Canggu is where I sit on that line.
        </p>
        <p>
          If you&apos;re considering a move and the question is
          whether you can &quot;afford&quot; it — the answer is
          probably yes, if you&apos;re billing $4,000-9,500 per
          client build and you can hold three retainers. If you&apos;re
          a junior dev billing $40/hour on Upwork, the math is
          rougher and the floor I quoted above ($1,750) is still
          three full work-weeks of revenue. Plan accordingly.
        </p>
      </LetterArticle>
    </>
  );
}
