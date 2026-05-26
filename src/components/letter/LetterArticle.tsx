import Link from "next/link";
import type { ReactNode } from "react";

export const LETTER_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Caveat:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');
.lp-v3 { --paper:#F2EFE6; --paper-2:#EDE8DC; --navy:#1A1A1A; --navy-2:#3A3A36; --ink:#1A1A1A; --gold:#C66B3F; --rule:rgba(26,26,26,0.12); background:var(--paper); color:var(--ink); font-family:'Lora',Georgia,serif; font-size:18px; line-height:1.7; min-height:100vh; }
.lp-v3 *,.lp-v3 *::before,.lp-v3 *::after { box-sizing:border-box; }
.lp-v3 img { max-width:100%; height:auto; display:block; }
.lp-v3 a { color:var(--gold); text-decoration:underline; text-underline-offset:4px; text-decoration-thickness:1px; }
.lp-v3 a:hover { color:var(--ink); }
.lp-v3 ::selection { background:var(--gold); color:var(--paper); }
.lp-v3 .wrap { max-width:720px; margin:0 auto; padding:0 24px; }
.lp-v3 .wide { max-width:1100px; margin:0 auto; padding:0 24px; }
.lp-v3 .hand { font-family:'Caveat',cursive; color:var(--gold); font-weight:500; }
.lp-v3 .nav { border-bottom:1px solid var(--rule); padding:16px 0; background:var(--paper); position:sticky; top:0; z-index:50; backdrop-filter:blur(8px); }
.lp-v3 .nav-inner { max-width:1100px; margin:0 auto; padding:0 24px; display:flex; align-items:center; justify-content:space-between; }
.lp-v3 .brand { font-family:'Lora',serif; font-weight:600; font-size:19px; letter-spacing:0.01em; text-decoration:none; }
.lp-v3 .brand em { color:var(--gold); font-style:italic; font-weight:500; }
.lp-v3 .nav-cta { font-family:'Inter',sans-serif; font-size:13px; font-weight:500; padding:9px 18px; background:var(--navy); color:var(--paper); text-decoration:none; border-radius:2px; transition:background 0.18s; }
.lp-v3 .nav-cta:hover { background:var(--gold); color:var(--ink); }
.lp-v3 .hero { padding:80px 0 56px; position:relative; }
.lp-v3 .hero-mark { text-align:center; margin-bottom:32px; font-family:'Inter',sans-serif; font-size:11px; letter-spacing:0.24em; text-transform:uppercase; color:var(--gold); }
.lp-v3 .hero-mark::before,.lp-v3 .hero-mark::after { content:'·'; margin:0 12px; opacity:0.6; }
.lp-v3 .hero h1 { font-family:'Lora',serif; font-weight:500; font-size:clamp(34px,5vw,56px); line-height:1.15; letter-spacing:-0.015em; text-align:center; max-width:22ch; margin:0 auto 32px; }
.lp-v3 .hero h1 em { color:var(--gold); font-style:italic; font-weight:500; }
.lp-v3 .hero-sub { text-align:center; font-style:italic; font-size:19px; color:var(--navy-2); max-width:50ch; margin:0 auto 48px; }
.lp-v3 .hero-photo-wrap { max-width:620px; margin:0 auto 56px; border:1px solid var(--rule); padding:12px; background:var(--paper-2); transform:rotate(-0.6deg); box-shadow:0 18px 48px rgba(26,37,64,0.16); }
.lp-v3 .hero-photo { width:100%; aspect-ratio:16/10; object-fit:cover; filter:sepia(0.08) saturate(0.95) brightness(1.02); }
.lp-v3 .hero-photo-cap { margin-top:12px; text-align:center; font-family:'Caveat',cursive; font-size:22px; color:var(--gold); }
.lp-v3 .meta-line { text-align:center; margin-bottom:48px; font-family:'Inter',sans-serif; font-size:12px; letter-spacing:0.08em; color:var(--navy-2); text-transform:uppercase; }
.lp-v3 .meta-line span { margin:0 10px; }
.lp-v3 .meta-line span.dot { color:var(--gold); }
.lp-v3 .letter { padding:32px 0 96px; }
.lp-v3 .letter p { margin-bottom:24px; font-size:19px; color:var(--ink); max-width:64ch; }
.lp-v3 .letter > .wrap > p:first-of-type::first-letter { font-family:'Lora',serif; font-style:italic; font-size:72px; float:left; line-height:0.8; margin:12px 12px 0 0; color:var(--navy); font-weight:600; }
.lp-v3 .letter h2 { font-family:'Lora',serif; font-weight:600; font-style:italic; font-size:32px; line-height:1.2; letter-spacing:-0.01em; color:var(--navy); margin:56px 0 24px; }
.lp-v3 .letter h2::before { content:'— '; color:var(--gold); }
.lp-v3 .letter h3 { font-family:'Lora',serif; font-weight:600; font-size:22px; color:var(--navy); margin:36px 0 14px; }
.lp-v3 .letter ul, .lp-v3 .letter ol { margin:0 0 24px; padding-left:24px; max-width:64ch; }
.lp-v3 .letter li { margin-bottom:10px; font-size:18px; }
.lp-v3 .letter blockquote { margin:32px 0; padding:4px 32px; border-left:3px solid var(--gold); font-style:italic; font-size:22px; line-height:1.55; color:var(--navy); }
.lp-v3 .letter blockquote cite { display:block; margin-top:12px; font-family:'Inter',sans-serif; font-style:normal; font-size:13px; letter-spacing:0.06em; color:var(--navy-2); text-transform:uppercase; }
.lp-v3 .letter mark { background:linear-gradient(to bottom,transparent 60%,rgba(201,152,90,0.4) 60%); padding:0 2px; }
.lp-v3 .letter code { font-family:'JetBrains Mono','Courier New',monospace; font-size:15px; background:var(--paper-2); padding:2px 6px; border:1px solid var(--rule); border-radius:2px; }
.lp-v3 .letter pre { background:var(--paper-2); color:var(--ink); padding:20px; border:1px solid var(--rule); border-radius:2px; overflow-x:auto; margin:24px 0; font-size:14px; line-height:1.5; max-width:64ch; }
.lp-v3 .letter pre code { background:transparent; border:0; color:inherit; padding:0; }
.lp-v3 .margin-note { position:relative; padding:16px 0 16px 24px; font-family:'Caveat',cursive; font-size:22px; color:var(--gold); line-height:1.3; border-left:2px solid var(--gold); margin:28px 0 28px 16px; transform:rotate(-0.4deg); }
.lp-v3 .margin-note::before { content:'← '; font-size:24px; }
.lp-v3 .signature { text-align:center; margin:72px 0 32px; }
.lp-v3 .signature-text { font-family:'Caveat',cursive; font-size:56px; color:var(--navy); line-height:1; }
.lp-v3 .signature-meta { margin-top:12px; font-family:'Inter',sans-serif; font-size:13px; color:var(--navy-2); letter-spacing:0.04em; }
.lp-v3 .related { background:var(--paper-2); padding:64px 0; border-top:1px solid var(--rule); border-bottom:1px solid var(--rule); }
.lp-v3 .related-kicker { text-align:center; font-family:'Inter',sans-serif; font-size:11px; letter-spacing:0.24em; text-transform:uppercase; color:var(--gold); margin-bottom:14px; }
.lp-v3 .related-h { font-family:'Lora',serif; font-weight:500; font-style:italic; font-size:clamp(26px,3.5vw,38px); text-align:center; color:var(--navy); margin-bottom:36px; letter-spacing:-0.01em; }
.lp-v3 .related-grid { display:grid; grid-template-columns:1fr; gap:18px; max-width:1000px; margin:0 auto; }
@media (min-width:768px) { .lp-v3 .related-grid { grid-template-columns:repeat(3,1fr); } }
.lp-v3 .related-card { background:var(--paper); padding:24px; border:1px solid var(--rule); transition:border-color 0.2s,transform 0.2s; text-decoration:none; display:block; color:inherit; }
.lp-v3 .related-card:hover { border-color:var(--gold); transform:translateY(-3px); }
.lp-v3 .related-card-meta { font-family:'Inter',sans-serif; font-size:11px; letter-spacing:0.1em; text-transform:uppercase; color:var(--gold); margin-bottom:10px; }
.lp-v3 .related-card-title { font-family:'Lora',serif; font-weight:600; font-size:19px; color:var(--navy); margin-bottom:8px; line-height:1.3; }
.lp-v3 .related-card-deck { font-size:14px; color:var(--navy-2); line-height:1.5; font-style:italic; }
.lp-v3 .closer { background:var(--paper-2); color:var(--ink); padding:96px 24px; text-align:center; border-top:1px solid var(--rule); border-bottom:1px solid var(--rule); }
.lp-v3 .closer h2 { font-family:'Lora',serif; font-style:italic; font-weight:500; font-size:clamp(32px,5vw,52px); margin-bottom:24px; letter-spacing:-0.015em; max-width:24ch; margin-left:auto; margin-right:auto; color:var(--ink); }
.lp-v3 .closer h2 em { color:var(--gold); font-style:italic; }
.lp-v3 .closer p { font-style:italic; color:var(--navy-2); max-width:50ch; margin:0 auto 36px; font-size:19px; line-height:1.55; }
.lp-v3 .closer-cta-row { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }
.lp-v3 .btn { font-family:'Inter',sans-serif; font-size:14px; font-weight:600; letter-spacing:0.04em; padding:14px 24px; text-decoration:none; border-radius:2px; transition:background 0.18s,transform 0.18s,color 0.18s; display:inline-flex; align-items:center; gap:8px; }
.lp-v3 .btn-gold { background:var(--gold); color:var(--paper); }
.lp-v3 .btn-gold:hover { background:var(--ink); color:var(--paper); transform:translateY(-2px); }
.lp-v3 .btn-paper { background:transparent; color:var(--ink); border:1.5px solid var(--ink); }
.lp-v3 .btn-paper:hover { background:var(--ink); color:var(--paper); }
.lp-v3 .news-foot { padding:48px 0 32px; background:var(--paper-2); border-top:1px solid var(--rule); font-family:'Inter',sans-serif; font-size:13px; color:var(--navy-2); text-align:center; }
.lp-v3 .news-foot a { color:var(--navy-2); margin:0 12px; }
.lp-v3 .news-foot a:hover { color:var(--gold); }
.lp-v3 .index-hero { padding:96px 0 48px; text-align:center; }
.lp-v3 .index-hero h1 { font-family:'Lora',serif; font-weight:500; font-size:clamp(40px,6vw,68px); line-height:1.1; letter-spacing:-0.015em; max-width:22ch; margin:0 auto 24px; }
.lp-v3 .index-hero h1 em { color:var(--gold); font-style:italic; font-weight:500; }
.lp-v3 .index-hero p { font-style:italic; color:var(--navy-2); font-size:20px; max-width:60ch; margin:0 auto; line-height:1.55; }
.lp-v3 .index-grid { padding:48px 0 96px; }
.lp-v3 .card-list { display:grid; grid-template-columns:1fr; gap:24px; max-width:1100px; margin:0 auto; padding:0 24px; }
@media (min-width:768px) { .lp-v3 .card-list { grid-template-columns:repeat(2,1fr); } }
@media (min-width:1024px) { .lp-v3 .card-list { grid-template-columns:repeat(3,1fr); } }
.lp-v3 .card { background:var(--paper); border:1px solid var(--rule); padding:0; transition:border-color 0.2s,transform 0.2s; text-decoration:none; color:inherit; display:flex; flex-direction:column; }
.lp-v3 .card:hover { border-color:var(--gold); transform:translateY(-4px); }
.lp-v3 .card-photo { width:100%; aspect-ratio:16/10; overflow:hidden; background:var(--paper-2); }
.lp-v3 .card-photo img { width:100%; height:100%; object-fit:cover; filter:sepia(0.08) saturate(0.94); transition:transform 0.4s; }
.lp-v3 .card:hover .card-photo img { transform:scale(1.03); }
.lp-v3 .card-body { padding:24px; flex:1; display:flex; flex-direction:column; }
.lp-v3 .card-meta { font-family:'Inter',sans-serif; font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:var(--gold); margin-bottom:10px; }
.lp-v3 .card-title { font-family:'Lora',serif; font-weight:600; font-size:22px; color:var(--navy); margin-bottom:10px; line-height:1.25; }
.lp-v3 .card-deck { font-style:italic; color:var(--navy-2); font-size:15px; line-height:1.5; margin-bottom:18px; flex:1; }
.lp-v3 .card-read { font-family:'Caveat',cursive; color:var(--gold); font-size:20px; }
.lp-v3 .wa-sticky { position:fixed; bottom:24px; right:24px; z-index:60; background:var(--gold); color:var(--ink); font-family:'Inter',sans-serif; font-size:13px; font-weight:600; padding:14px 20px; border-radius:32px; text-decoration:none; box-shadow:0 12px 28px rgba(201,152,90,0.32); display:inline-flex; align-items:center; gap:8px; transition:transform 0.18s; }
.lp-v3 .wa-sticky:hover { transform:translateY(-3px); }
.lp-v3 .wa-sticky svg { width:16px; height:16px; fill:currentColor; }
`;

export type RelatedItem = {
  slug: string;
  title: string;
  category: string;
  deck: string;
};

export type LetterArticleProps = {
  eyebrow: string;
  title: ReactNode;
  deck: string;
  heroImage: string;
  heroCaption: string;
  datePublished: string;
  readingTime: number;
  category: string;
  children: ReactNode;
  signature?: string;
  signatureMeta?: string;
  related?: RelatedItem[];
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export function LetterShell({ children }: { children: ReactNode }) {
  return (
    <div className="lp-v3">
      <style dangerouslySetInnerHTML={{ __html: LETTER_CSS }} />

      {children}
    </div>
  );
}

export default function LetterArticle({
  eyebrow,
  title,
  deck,
  heroImage,
  heroCaption,
  datePublished,
  readingTime,
  category,
  children,
  signature = "Waseem",
  signatureMeta,
  related,
}: LetterArticleProps) {
  return (
    <LetterShell>
      <main>
        <section className="hero">
          <div className="wrap">
            <div className="hero-mark">{eyebrow}</div>
            <h1>{title}</h1>
            <p className="hero-sub">{deck}</p>
            <figure className="hero-photo-wrap">
              <img src={heroImage} alt={heroCaption} className="hero-photo" loading="eager" />
              <figcaption className="hero-photo-cap">— {heroCaption}</figcaption>
            </figure>
            <div className="meta-line">
              <span>{formatDate(datePublished)}</span>
              <span className="dot">·</span>
              <span>{readingTime} min read</span>
              <span className="dot">·</span>
              <span>{category}</span>
            </div>
          </div>
        </section>

        <section className="letter">
          <div className="wrap">
            {children}
            <div className="signature">
              <div className="signature-text">{signature}</div>
              <div className="signature-meta">
                {signatureMeta || `— Canggu, Bali · ${formatDate(datePublished)}`}
              </div>
            </div>
          </div>
        </section>

        {related && related.length > 0 && (
          <section className="related">
            <div className="wide">
              <p className="related-kicker">Keep reading</p>
              <h2 className="related-h">More from the journal</h2>
              <div className="related-grid">
                {related.map((r) => (
                  <Link key={r.slug} href={`/news/${r.slug}`} className="related-card">
                    <div className="related-card-meta">{r.category}</div>
                    <div className="related-card-title">{r.title}</div>
                    <p className="related-card-deck">{r.deck}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="closer">
          <h2>
            Reading isn&apos;t shipping. <em>Send the brief.</em>
          </h2>
          <p>
            Eight-hour reply on weekday Bali time. Yes, no, or referral. Audit&apos;s free.
            Either way you walk with findings.
          </p>
          <div className="closer-cta-row">
            <a href="/discovery-call" className="btn btn-gold">
              Apply for a call →
            </a>
          </div>
        </section>

        <footer className="news-foot">
          <div className="wide">
            <Link href="/news">← All articles</Link>
            <Link href="/blog">Long-form journal</Link>
            <Link href="/services">Services</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/about">About</Link>
          </div>
        </footer>
      </main>
    </LetterShell>
  );
}
