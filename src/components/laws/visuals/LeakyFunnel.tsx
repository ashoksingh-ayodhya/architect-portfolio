/** LAW 08 — The Funnel Lie: leaks at every stage drawn as a sieve. */
const LeakyFunnel = () => {
  const stages = [
    { label: "Impression", count: "1,000,000", drop: "98%" },
    { label: "Click",      count: "20,000",    drop: "85%" },
    { label: "Lead",       count: "3,000",     drop: "70%" },
    { label: "MQL",        count: "900",       drop: "50%" },
    { label: "SQL",        count: "450",       drop: "60%" },
    { label: "Closed Won", count: "180",       drop: "—" },
  ];
  return (
    <div className="mx-auto w-full max-w-[520px]">
      <div className="space-y-2">
        {stages.map((s, i) => {
          const widthPct = 100 - i * 14;
          const isLast = i === stages.length - 1;
          return (
            <div key={s.label} className="anim-slide" style={{ animationDelay: `${i * 90}ms` }}>
              <div className="flex items-center gap-3">
                <div
                  className={`relative flex h-11 items-center justify-between rounded-md border-2 border-ink px-3 font-mono text-xs sm:text-sm ${
                    isLast ? "bg-acid" : "bg-paper"
                  }`}
                  style={{ width: `${widthPct}%`, marginLeft: `${(100 - widthPct) / 2}%` }}
                >
                  <span className="font-grotesk font-bold uppercase">{s.label}</span>
                  <span className="font-display text-base">{s.count}</span>
                  {!isLast && (
                    <span className="absolute -right-2 -top-3 rotate-12 font-marker text-base text-warn">
                      −{s.drop}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-5 text-center font-marker text-2xl text-warn">that’s not a funnel, that’s a colander.</p>
    </div>
  );
};

export default LeakyFunnel;
