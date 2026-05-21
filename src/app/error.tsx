"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home, MessageCircle } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app error]", error);
  }, [error]);

  return (
    <section
      className="relative overflow-hidden min-h-[80vh] flex items-center pt-24 pb-16"
      style={{
        background:
          "linear-gradient(135deg, #061827 0%, #0a2d4a 45%, #073846 100%)",
      }}
    >
      <span className="orb" style={{ width: 540, height: 540, background: "#1E88E5", top: -90, left: -130, opacity: 0.5 }} />

      <div className="container-x px-6 relative z-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 bg-rose-500/10 border border-rose-400/40 text-rose-200">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span className="text-xs font-medium tracking-wider uppercase">Something broke</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
            Our bad.
          </h1>
          <p className="text-lg text-gray-300 mb-2">
            Something on this page crashed. We&apos;ve been notified automatically.
          </p>
          {error.digest && (
            <p className="text-xs text-gray-500 font-mono mb-8">
              Error ID: {error.digest}
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-slate-900"
              style={{ background: "linear-gradient(135deg, #7ee4ff 0%, #5eead4 100%)" }}
            >
              <RotateCcw className="w-4 h-4" />
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-white border border-white/20 hover:border-white/40"
            >
              <Home className="w-4 h-4" />
              Go home
            </Link>
            <Link
              href="/discovery-call"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-white border border-white/20 hover:border-white/40"
            >
              <MessageCircle className="w-4 h-4" />
              Tell us about it
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
