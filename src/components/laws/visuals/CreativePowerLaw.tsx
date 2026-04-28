/** LAW 05 — Power law of creative. */
const CreativePowerLaw = () => {
  const bars = Array.from({ length: 20 }).map((_, i) => Math.pow(i + 1, -0.95));
  const max = bars[0];
  return (
    <div className="mx-auto w-full max-w-[560px]">
      <div className="relative h-44 sm:h-52">
        <div className="absolute inset-0 flex items-end gap-1.5">
          {bars.map((v, i) => {
            const h = (v / max) * 100;
            const isHero = i === 0;
            const isWinner = i < 3;
            return (
              <div
                key={i}
                className="anim-bar relative flex-1 rounded-t-sm border border-ink"
                style={{
                  height: `${Math.max(4, h)}%`,
                  background: isHero ? "hsl(var(--acid))" : isWinner ? "hsl(var(--acid) / 0.55)" : "hsl(var(--ink) / 0.12)",
                  animationDelay: `${i * 35}ms`,
                }}
              >
                {isHero && (
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 font-marker text-base text-warn">
                    THIS one
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 border-t-2 border-ink" />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px]">
        <span className="ink-faint">20 ads tested</span>
        <span className="sticker-acid rounded px-2 py-1 font-grotesk text-[10px] font-bold">1 ad → 78% of spend</span>
        <span className="ink-faint">17 ads → 0% of LinkedIn brag</span>
      </div>

      <p className="mt-4 font-marker text-xl text-warn">
        “but the brand guidelines—” the brand guidelines are losing money.
      </p>
    </div>
  );
};

export default CreativePowerLaw;
