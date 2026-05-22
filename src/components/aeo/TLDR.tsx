import { Sparkles } from "lucide-react";

export default function TLDR({ points }: { points: string[] }) {
  return (
    <aside
      className="tldr my-8 p-5 md:p-6 rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 to-teal-500/10"
      data-speakable="true"
      aria-label="Article summary"
    >
      <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3 flex items-center gap-2">
        <Sparkles className="w-3.5 h-3.5" /> TL;DR
      </p>
      <ul className="space-y-2 text-base text-fg leading-relaxed">
        {points.map((p, i) => (
          <li key={i} className="flex gap-2.5">
            <span className="text-cyan-300 font-bold flex-shrink-0">→</span>
            <span itemProp="abstract">{p}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function AnswerBlock({
  question,
  answer,
  evidence,
}: {
  question: string;
  answer: string;
  evidence?: string;
}) {
  return (
    <div
      className="my-7"
      itemScope
      itemType="https://schema.org/Question"
      data-speakable="true"
    >
      <h2
        className="text-2xl md:text-3xl font-bold mb-3 text-fg"
        itemProp="name"
      >
        {question}
      </h2>
      <div
        itemScope
        itemProp="acceptedAnswer"
        itemType="https://schema.org/Answer"
      >
        <p
          className="text-lg text-fg leading-relaxed font-semibold mb-3"
          itemProp="text"
        >
          {answer}
        </p>
        {evidence && (
          <p className="text-base text-fg-muted leading-relaxed">{evidence}</p>
        )}
      </div>
    </div>
  );
}

export function Citation({
  source,
  url,
  date,
  children,
}: {
  source: string;
  url?: string;
  date?: string;
  children: React.ReactNode;
}) {
  return (
    <blockquote className="my-5 pl-5 border-l-4 border-cyan-400/60 italic text-fg-muted">
      <span itemProp="citation">{children}</span>
      <footer className="not-italic text-sm text-fg-faint mt-2">
        —{" "}
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="underline hover:text-cyan-300"
          >
            {source}
          </a>
        ) : (
          source
        )}
        {date && `, ${date}`}
      </footer>
    </blockquote>
  );
}

export function Stat({
  value,
  label,
  source,
}: {
  value: string;
  label: string;
  source?: string;
}) {
  return (
    <div
      className="inline-flex flex-col p-4 rounded-xl bg-white/5 border border-cyan-400/20 mr-3 mb-3"
      data-speakable="true"
    >
      <span className="text-3xl font-extrabold text-cyan-300">{value}</span>
      <span className="text-sm text-fg-muted">{label}</span>
      {source && (
        <span className="text-[10px] text-fg-faint mt-1 uppercase tracking-wider">
          {source}
        </span>
      )}
    </div>
  );
}
