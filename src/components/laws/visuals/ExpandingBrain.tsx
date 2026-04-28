/** LAW 06 — Expanding-brain meme: attribution maturity. */
const ExpandingBrain = () => {
  const stages = [
    { brain: "🧠",   label: "Last-click in GA",    sub: "“Email did it all 🎉”", tone: "ink-faint" },
    { brain: "🧠✨", label: "Linear / time-decay", sub: "okay, calmer now",       tone: "ink-soft"  },
    { brain: "🧠🌟", label: "Markov + holdouts",   sub: "now we’re cooking",      tone: "ink"      },
    { brain: "🧠🌌", label: "Geo-lift + MMM",      sub: "we measure the ad we did NOT run", tone: "text-warn font-marker text-2xl" },
  ];
  return (
    <div className="mx-auto w-full max-w-[520px] space-y-3">
      {stages.map((s, i) => (
        <div
          key={i}
          className="anim-slide flex items-center gap-3 rounded-lg border-2 border-ink bg-paper p-3 sm:gap-4 sm:p-4"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full border-2 border-ink bg-acid/30 text-2xl sm:h-14 sm:w-14 sm:text-3xl">
            {s.brain}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-grotesk text-xs font-bold uppercase tracking-wider">{s.label}</p>
            <p className={`mt-0.5 ${s.tone === "text-warn font-marker text-2xl" ? s.tone : "font-marker text-lg " + s.tone}`}>
              {s.sub}
            </p>
          </div>
          <span className="sticker-ink hidden rounded px-2 py-0.5 font-mono text-[10px] sm:inline-block">LVL {i + 1}</span>
        </div>
      ))}
    </div>
  );
};

export default ExpandingBrain;
