/** LAW 04 — Dunning–Kruger of media buyers. */
const DunningKruger = () => {
  const path = "M20,180 Q60,40 110,40 T180,150 Q220,180 260,160 T380,40";
  const stages = [
    { x: 60, y: 40,  label: "Week 2",      sub: "“ROAS is easy.”" },
    { x: 150, y: 152,sub: "“why is it 0.4”", label: "Week 6" },
    { x: 240, y: 165,sub: "“I’m not the audience”", label: "Month 3" },
    { x: 360, y: 50, sub: "“creative > targeting”", label: "Year 2" },
  ];
  return (
    <div className="mx-auto w-full max-w-[560px]">
      <svg viewBox="0 0 400 220" className="h-auto w-full">
        {/* axes */}
        <line x1="20" y1="200" x2="390" y2="200" stroke="hsl(var(--ink))" strokeWidth="1.5" />
        <line x1="20" y1="200" x2="20"  y2="20"  stroke="hsl(var(--ink))" strokeWidth="1.5" />
        <text x="200" y="216" textAnchor="middle" className="font-mono" fontSize="10" fill="hsl(var(--ink-faint))">EXPERIENCE →</text>
        <text x="14"  y="22"  textAnchor="end"     className="font-mono" fontSize="10" fill="hsl(var(--ink-faint))">CONFIDENCE</text>

        <path d={path} stroke="hsl(var(--ink))" strokeWidth="2.5" fill="none" className="anim-draw" style={{ ['--dash' as never]: 700 }} />

        {stages.map((s, i) => (
          <g key={i}>
            <circle cx={s.x} cy={s.y} r="6" fill="hsl(var(--acid))" stroke="hsl(var(--ink))" strokeWidth="2" />
            <text x={s.x} y={s.y - 14} textAnchor="middle" className="font-grotesk" fontWeight="700" fontSize="10" fill="hsl(var(--ink))">{s.label}</text>
          </g>
        ))}
      </svg>

      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {stages.map((s, i) => (
          <div key={i} className="paper-soft rounded-md p-2.5">
            <p className="font-grotesk text-[10px] font-bold ink-faint">{s.label}</p>
            <p className="mt-1 font-marker text-base leading-tight">{s.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DunningKruger;
