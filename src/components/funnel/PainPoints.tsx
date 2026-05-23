import { Clock, MessageSquareWarning, FileX2 } from "lucide-react";

const PAINS = [
  {
    icon: Clock,
    pain: "Leads ghost you after 1 hour.",
    detail:
      "Studies show 78% of buyers go with the first vendor who replies. If your follow-up is manual, you're losing them while you sleep.",
  },
  {
    icon: MessageSquareWarning,
    pain: "Your pipeline lives in WhatsApp screenshots.",
    detail:
      "You quote, hope, repeat. No dashboard. No follow-up sequence. No idea which deal is alive and which already died.",
  },
  {
    icon: FileX2,
    pain: "Content rots in drafts for weeks.",
    detail:
      "You know you should post. You can't find 6 hours/week. So nothing ships and your competitors own the feed.",
  },
];

export default function PainPoints() {
  return (
    <section className="section bg-bg">
      <div className="container-x">
        <div className="max-w-2xl mb-12 text-center mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-400/10 border border-rose-400/30 text-rose-300 text-xs font-semibold uppercase tracking-[0.18em] mb-5">
            The leaks
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Three reasons your revenue is{" "}
            <span className="bg-gradient-to-r from-rose-300 to-amber-300 bg-clip-text text-transparent">
              already gone
            </span>{" "}
            before you notice.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PAINS.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.pain}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-rose-400/30 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 bg-rose-400/10 border border-rose-400/25">
                  <Icon className="w-5 h-5 text-rose-300" />
                </div>
                <h3 className="text-lg font-bold text-fg mb-2 leading-snug">
                  {p.pain}
                </h3>
                <p className="text-sm text-fg-muted leading-relaxed">
                  {p.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
