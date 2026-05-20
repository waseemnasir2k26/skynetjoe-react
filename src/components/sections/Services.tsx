import Link from "next/link";
import * as Icons from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/site";

type IconCmp = React.ComponentType<{ className?: string }>;

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="container-x">
        <div className="max-w-3xl mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-skynet-primary-light font-semibold mb-3">
            What we ship
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            16 services. One operator. <span className="gradient-text">Zero excuses.</span>
          </h2>
          <p className="text-lg text-gray-300">
            Built and run by Waseem Nasir — no agency layers, no offshored juniors,
            no waiting on a project manager. You talk directly to the person doing the work.
          </p>
        </div>

        <div className="space-y-12">
          {SERVICE_CATEGORIES.map((cat) => (
            <div key={cat.name}>
              <h3 className="text-xs uppercase tracking-[0.2em] text-skynet-primary-light font-semibold mb-5 flex items-center gap-3">
                <span className="w-8 h-px bg-skynet-primary/40" />
                {cat.name}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {cat.services.map((svc) => {
                  const Icon = ((Icons as unknown) as Record<string, IconCmp>)[svc.icon] ?? ((Icons as unknown) as Record<string, IconCmp>).Bot;
                  return (
                    <Link
                      key={svc.slug}
                      href={`/services/${svc.slug}`}
                      className="group relative p-6 rounded-2xl bg-skynet-surface/60 border border-white/5 hover:border-skynet-primary/40 transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="w-10 h-10 rounded-lg bg-skynet-primary/10 flex items-center justify-center mb-4 group-hover:bg-skynet-primary/20 transition-colors">
                        <Icon className="w-5 h-5 text-skynet-primary-light" />
                      </div>
                      <h4 className="text-base font-semibold text-white mb-2">{svc.label}</h4>
                      <p className="text-sm text-gray-400 leading-relaxed">{svc.desc}</p>
                      <Icons.ArrowUpRight className="absolute top-5 right-5 w-4 h-4 text-gray-600 group-hover:text-skynet-primary-light transition-colors" />
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
