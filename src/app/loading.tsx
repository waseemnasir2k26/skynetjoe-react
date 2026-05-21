export default function Loading() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background:
          "linear-gradient(135deg, #061827 0%, #0a2d4a 45%, #073846 100%)",
      }}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-cyan-400/20 border-t-cyan-400 animate-spin" />
          <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-r-teal-300 animate-spin" style={{ animationDuration: "1.5s", animationDirection: "reverse" }} />
        </div>
        <div className="text-sm uppercase tracking-[0.22em] text-cyan-300 font-semibold">
          Loading
        </div>
      </div>
    </div>
  );
}
