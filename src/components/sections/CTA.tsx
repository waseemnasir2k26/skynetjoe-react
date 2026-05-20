import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site";

export default function CTA() {
  return (
    <section className="section">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-3xl p-12 md:p-16 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-skynet-primary/20 via-skynet-secondary/15 to-transparent" />
          <div className="orb w-[400px] h-[400px] bg-skynet-primary/30 -top-32 -left-32" />
          <div className="orb w-[400px] h-[400px] bg-skynet-secondary/20 -bottom-32 -right-32" style={{ animationDelay: "-5s" }} />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              Stop trading hours for dollars.
              <br />
              <span className="gradient-text">Start trading systems for revenue.</span>
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Free 20-min audit. We&apos;ll Loom you the leak in your funnel and the 1 automation that closes it.
              No deck. No pitch. Pure signal.
            </p>
            <Link
              href={`https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}`}
              className="btn-primary text-base px-8 py-4"
            >
              Book your free audit
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-xs text-gray-500 mt-4">
              Replies within 6 hours · Bali timezone (GMT+8) · 9 countries served
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
