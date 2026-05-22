import { BRANDS_TRUSTED } from "@/lib/site";

export default function Brands() {
  return (
    <section className="py-12 border-y border-white/5 bg-skynet-darker/50">
      <div className="container-x px-6">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-gray-500 mb-8">
          Paid out, deployed on, shipped with — the boring stacks I actually use
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 items-center">
          {BRANDS_TRUSTED.map((b) => (
            <div
              key={b.name}
              className="flex items-center justify-center text-gray-500 hover:text-gray-200 transition-colors text-sm font-semibold tracking-wide"
            >
              {b.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
