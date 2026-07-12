import type { Metadata } from "next";
import Link from "next/link";
import LetterArticle from "@/components/letter/LetterArticle";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { articleSchema } from "@/lib/schema";
import { getArticle, relatedFor } from "@/lib/news";
import { SITE } from "@/lib/site";

const SLUG = "weekend-with-claude-code";
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
        signatureMeta="— Lahore weekend · 2026-05-17"
        related={related}
        cta={article.cta}
      >
        <p>
          I spent the long weekend at my parents&apos; place in Lahore and
          decided to rebuild the SkynetJoe theme site in Next.js 16 using
          nothing but Claude Code in the terminal. No Cursor. No VS Code
          Copilot. No Windsurf. Just a TUI agent with full repo context, a
          project memory file, and the ability to run shell commands directly.
        </p>
        <p>
          Friday night to Sunday afternoon. Forty-six hours of wall-clock, maybe
          22 hours of actual hands-on time once you subtract sleep, biryani
          breaks, and a four-hour Saturday morning where I rode out to a wedding
          in DHA Phase 8 and came back to find the tests had been running in a
          background process the whole time.
        </p>
        <p>
          The outcome: a working, deployed site with about 60 routes, better
          Lighthouse scores than the v5.5 WordPress version it replaced, and a
          noticeably different mental model of what &quot;programming&quot;
          means in 2026. Here&apos;s what changed, what didn&apos;t, and where
          Claude Code still leaves me doing things by hand.
        </p>

        <h2>The new shape of work</h2>
        <p>
          The biggest shift isn&apos;t speed — though it&apos;s faster. The
          shift is{" "}
          <strong>
            that I stopped writing code and started writing prompts that
            describe code.
          </strong>{" "}
          The artifact I produce is a paragraph that says &quot;build me a
          LetterArticle component that accepts these props, uses this CSS
          string, and renders a hero with caption, body, signature, and related
          cards.&quot; The artifact Claude Code produces is the file.
        </p>
        <p>
          The intermediate step — where I would have hand-typed the TypeScript
          interface, then the JSX, then the conditional rendering — is just
          gone. I review the diff, request changes in English, and merge.
        </p>
        <p>
          The implications take a while to settle. The first one is that the
          bottleneck in shipping became <em>reading</em>, not writing. Claude
          Code can produce diffs faster than I can carefully review them. The
          discipline is reading what it produced and pushing back when it&apos;s
          subtly wrong.
        </p>
        <div className="margin-note">reading is the new typing</div>

        <h3>The five things that got dramatically faster</h3>

        <p>
          <strong>One: refactoring across many files.</strong> The single place
          Claude Code crushes a human is multi-file refactors. I asked it to
          rename a prop across 47 React components, update the consumer types,
          and run the type-check. Three minutes, one diff, zero typos. The same
          task in VS Code with find-replace would have taken me 25 minutes and
          produced two typos that would have shipped to staging.
        </p>

        <p>
          <strong>Two: schema markup.</strong> Every page on the site needed
          JSON-LD schema — BlogPosting, FAQPage, Service. I had a vague mental
          model of what each schema needs and would have spent 90 minutes per
          type cross-referencing schema.org docs. Claude wrote the entire
          schema.ts helper module in under five minutes with accurate field
          coverage and the right conditional logic for optional properties.
        </p>

        <p>
          <strong>Three: the boring parts of design system migration.</strong>
          Pulling the v5.5 WordPress theme&apos;s CSS variables into a Tailwind
          config, mapping the color names, translating the spacing tokens —
          Claude did all of this in one pass after I pasted the SCSS and asked
          for the Tailwind equivalent. The translation was 95% correct; I fixed
          the remaining 5% by eye.
        </p>

        <p>
          <strong>Four: scaffolding new routes.</strong> Adding a new page in
          Next.js 16&apos;s App Router involves a directory, a page.tsx, a
          metadata export, optionally a loading.tsx and an error.tsx. Claude
          generates the whole scaffold from a one-sentence brief and gets the
          metadata canonical and OG tags right by inferring from neighboring
          routes.
        </p>

        <p>
          <strong>Five: writing tests.</strong> Specifically the mechanical ones
          — render tests, prop-shape tests, snapshot tests. Claude writes these
          from the component file alone in seconds. The tests aren&apos;t
          world-class but they&apos;re better than the zero tests I would have
          shipped otherwise.
        </p>

        <h3>The five places it still doesn&apos;t help</h3>

        <p>
          <strong>One: deciding what to build.</strong> Claude Code is a build
          tool, not a product manager. The question of whether this page should
          exist, what its three sections are, and which CTA goes at the bottom —
          that&apos;s still my job. The agent will happily build whatever I ask.
          Asking for the wrong thing fluently is the new failure mode.
        </p>

        <p>
          <strong>Two: design decisions with no precedent.</strong> When I asked
          Claude to design the V3 letter aesthetic from scratch, the result was
          generic — competent typography, safe color palette, no soul. Once I
          gave it a reference (the WSJ&apos;s longform format, mixed with a
          Substack-style serif body), it could match the reference well, but it
          couldn&apos;t invent the reference.
        </p>

        <p>
          <strong>
            Three: anything involving real client data or production
            credentials.
          </strong>{" "}
          I won&apos;t let an agent touch production database credentials,
          Stripe keys, or live API tokens. The tradeoff is that anything
          requiring those needs a human in the loop, every time, and that human
          is the slowest part of the workflow.
        </p>

        <p>
          <strong>Four: debugging weird runtime behavior.</strong>
          Compile-time errors get fixed beautifully. Runtime weirdness — the
          page that renders fine on desktop but blank on mobile Safari —
          requires me to open the actual browser, reproduce the bug, screenshot
          it, paste it back. The agent doesn&apos;t have eyes on the running
          app. The debugging loop is still mostly mine.
        </p>

        <p>
          <strong>
            Five: the parts that require judgment about what &quot;good
            enough&quot; means.
          </strong>{" "}
          Claude will keep polishing forever if I let it. Knowing when to stop —
          when a component is 80% done and shipping is more valuable than the
          remaining 20% — is a judgment call that lives outside the agent.
        </p>

        <h2>The mental model shift</h2>
        <p>
          Programming used to be a craft skill where the bottleneck was your
          typing speed and your knowledge of APIs. The deep skills were knowing
          the language idioms cold and being able to hold the project&apos;s
          structure in your head.
        </p>
        <p>
          With Claude Code in the loop, the bottleneck moves up the stack. The
          deep skills now are:
        </p>
        <ul>
          <li>
            <strong>Writing precise specifications.</strong> The difference
            between &quot;build a navbar&quot; and &quot;build a navbar
            that&apos;s sticky on scroll, has a 16px-to-12px shrink animation,
            uses these three colors, and matches the rest of the design
            system&quot; is the difference between shipping and not shipping.
          </li>
          <li>
            <strong>Reading diffs critically.</strong> The agent will introduce
            subtle regressions. The discipline of actually reading every line of
            every diff — not just scrolling past — is the new core skill.
          </li>
          <li>
            <strong>Architecture decisions.</strong> Should this be a client
            component or a server component? Should this state live in a context
            or a URL parameter? These are questions the agent can suggest
            answers to but can&apos;t make for you. Choosing wrong cascades.
          </li>
          <li>
            <strong>Knowing the codebase you didn&apos;t write.</strong>
            Claude builds it; you own it. If a client raises a bug six months
            from now, you need to actually understand the code well enough to
            diagnose. The temptation to ship code you don&apos;t deeply
            understand is real and has to be resisted.
          </li>
        </ul>

        <blockquote>
          The Saturday morning I rode out to that wedding and came back to find
          a test suite I&apos;d set running with a single background-process
          instruction — that was the moment it clicked. The agent ran my entire
          test suite while I was at a wedding. I didn&apos;t have to be at the
          keyboard for 22-hour worth of work to advance by 30 minutes of agent
          time.
          <cite>— Field note, Sunday morning</cite>
        </blockquote>

        <h2>Cost math</h2>
        <p>
          The 22 hands-on hours produced what would have been 3-4 days of
          conventional dev work for me. Call it a 2.5× speedup on a familiar
          codebase. The Anthropic API cost for the weekend was around $140 —
          meaningful, but trivial compared to the time saved.
        </p>
        <p>
          For{" "}
          <Link href="/services/vibe-coded-sites">SkynetLabs client work</Link>,
          where the build is $4,000–$9,500 and the timeline is 14–45 days, the
          speedup collapses into earlier delivery and the ability to handle more
          concurrent retainers without adding headcount. The math isn&apos;t
          &quot;Claude Code replaces a developer.&quot; It&apos;s &quot;Claude
          Code lets one operator credibly deliver what used to require
          three.&quot;
        </p>

        <h2>What I&apos;m changing about how I sell</h2>
        <p>
          Two specific changes to the SkynetLabs offer based on the weekend:
        </p>
        <p>
          First, the <Link href="/pricing">Starter tier</Link> ship window drops
          from 14 days to 10 days, same price. The math is honest — the work
          that used to take 14 days now takes 10 because the agent compresses
          the boring middle. I&apos;m passing the savings on as faster ship
          rather than lower price, because faster ship is what clients actually
          want.
        </p>
        <p>
          Second, I&apos;m adding a &quot;take-home repo&quot; clause to every
          contract. The Claude Code workflow produces extremely well-documented,
          well-typed code by default because that&apos;s what the agent emits.
          Clients now get a repo they could realistically hire any senior dev to
          maintain without a six-month ramp.
        </p>
        <p>
          That second change is the bigger one. The vendor lock-in that&apos;s
          plagued agency work for two decades — &quot;you can have the code but
          nobody will be able to read it&quot; — finally has a structural
          answer. Agents produce code that a fresh human can read in an
          afternoon. That&apos;s a real shift.
        </p>
      </LetterArticle>
    </>
  );
}
