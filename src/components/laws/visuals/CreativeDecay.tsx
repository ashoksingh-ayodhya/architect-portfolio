/** LAW 11 — Decay curve: ad creative half-life. */
const CreativeDecay = () => {
  const N = 30;
  const pts = Array.from({ length: N }).map((_, i) => {
    const x = (i / (N - 1)) * 360 + 20;
    const y = 30 + 130 * (1 - Math.exp(-i / 4)); // CPM rises = perf decays
    return [x, y];
  });
  const d = "M " + pts.map(p => p.join(",")).join(" L ");
  return (
    <div className="mx-auto w-full max-w-[560px]">
      <svg viewBox="0 0 400 200" className="h-auto w-full">
        <line x1="20" y1="180" x2="380" y2="180" stroke="hsl(var(--ink))" strokeWidth="1.5" />
        <line x1="20" y1="180" x2="20"  y2="20"  stroke="hsl(var(--ink))" strokeWidth="1.5" />

        {/* Day markers */}
        {[0, 7, 14, 21, 28].map((d, i) => {
          const x = 20 + (i / 4) * 360;
          return (
            <g key={d}>
              <line x1={x} y1="180" x2={x} y2="184" stroke="hsl(var(--ink))" strokeWidth="1" />
              <text x={x} y="196" textAnchor="middle" className="font-mono" fontSize="9" fill="hsl(var(--ink-faint))">D{d}</text>
            </g>
          );
        })}

        <path d={d} stroke="hsl(var(--warn))" strokeWidth="2.5" fill="none" className="anim-draw" style={{ ['--dash' as never]: 600 }} />

        {/* Honeymoon zone */}
        <rect x="20" y="20" width="86" height="160" fill="hsl(var(--acid) / 0.25)" />
        <text x="63" y="38" textAnchor="middle" className="font-grotesk" fontWeight="700" fontSize="10" fill="hsl(var(--ink))">HONEYMOON</text>
        <text x="63" y="50" textAnchor="middle" className="font-mono" fontSize="9" fill="hsl(var(--ink-soft))">CPA = chef’s kiss</text>

        {/* Halfway: "boss says scale" */}
        <line x1="200" y1="20" x2="200" y2="180" stroke="hsl(var(--ink))" strokeWidth="1" strokeDasharray="4 4" />
        <text x="200" y="14" textAnchor="middle" className="font-marker" fontSize="14" fill="hsl(var(--ink))">boss says SCALE</text>

        {/* End: "boss says it stopped working" */}
        <text x="378" y="34" textAnchor="end" className="font-marker" fontSize="14" fill="hsl(var(--warn))">it stopped working??</text>

        <text x="14" y="22" textAnchor="end" className="font-mono" fontSize="9" fill="hsl(var(--ink-faint))">CPA</text>
      </svg>

      <p className="mt-3 font-marker text-xl">creative is yogurt. it expires.</p>
    </div>
  );
};

export default CreativeDecay;
