/** LAW 10 — Bingo card of marketing buzzwords. */
const BuzzwordBingo = () => {
  const tiles = [
    "synergize", "AI-native", "category creation", "pipeline gen",
    "intent data", "PLG motion", "10x ROAS", "FREE",
    "thought leader", "growth loop", "north-star metric", "ICP refresh",
    "vibe shift", "first-party", "brand-led", "agentic",
  ];
  return (
    <div className="mx-auto w-full max-w-[480px]">
      <div className="grid grid-cols-4 gap-1.5 rounded-lg border-2 border-ink bg-paper p-2 sm:gap-2 sm:p-3">
        {tiles.map((t, i) => {
          const stamped = [0, 3, 5, 6, 8, 11, 12, 15].includes(i);
          return (
            <div
              key={i}
              className={`anim-pop relative flex aspect-square items-center justify-center rounded-md border border-ink p-1 text-center font-grotesk text-[10px] font-bold uppercase leading-tight sm:text-[11px] ${
                t === "FREE" ? "bg-acid" : "bg-paper"
              }`}
              style={{ ['--rot' as never]: `${(i % 3) - 1}deg`, animationDelay: `${i * 40}ms` }}
            >
              {t}
              {stamped && t !== "FREE" && (
                <span className="absolute inset-0 flex items-center justify-center text-3xl text-warn/80">✕</span>
              )}
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-center font-marker text-xl text-warn">
        BINGO. now do the work.
      </p>
    </div>
  );
};

export default BuzzwordBingo;
