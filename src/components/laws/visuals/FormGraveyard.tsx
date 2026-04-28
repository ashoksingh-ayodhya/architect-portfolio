/** CONVERSION 03 — Form Field Graveyard. Every required field kills a lead. */
const FormGraveyard = () => (
  <div className="relative mx-auto w-full max-w-[520px]">
    <svg viewBox="0 0 400 300" className="h-auto w-full">
      {/* Ground */}
      <path d="M0 240 Q 100 235, 200 240 Q 300 245, 400 240 L 400 300 L 0 300 Z" fill="hsl(var(--ink) / 0.04)" stroke="hsl(var(--ink) / 0.15)" strokeWidth="1" />

      {/* Tombstones */}
      {[
        { x: 60, label: "Fax number", y: 210, tilt: -3 },
        { x: 140, label: "Dept", y: 200, tilt: 2 },
        { x: 220, label: "Budget", y: 215, tilt: -2 },
        { x: 300, label: "Timeline", y: 205, tilt: 4 },
        { x: 360, label: "Referrer", y: 220, tilt: -1 },
      ].map((t, i) => (
        <g key={i} transform={`rotate(${t.tilt}, ${t.x}, ${t.y})`} className="anim-pop" style={{ ['--rot' as never]: `${t.tilt}deg`, animationDelay: `${i * 100}ms` }}>
          <rect x={t.x - 28} y={t.y - 50} width="56" height="60" rx="4" fill="hsl(var(--paper))" stroke="hsl(var(--ink) / 0.4)" strokeWidth="1.5" />
          <path d={`M${t.x - 20} ${t.y - 42} L${t.x + 20} ${t.y - 42}`} stroke="hsl(var(--ink) / 0.2)" strokeWidth="1" />
          <path d={`M${t.x - 20} ${t.y - 32} L${t.x + 20} ${t.y - 32}`} stroke="hsl(var(--ink) / 0.2)" strokeWidth="1" />
          <text x={t.x} y={t.y - 10} textAnchor="middle" className="font-grotesk" fontWeight={700} fontSize="9" fill="hsl(var(--ink) / 0.6)">RIP</text>
          <text x={t.x} y={t.y + 6} textAnchor="middle" className="font-mono" fontSize="8" fill="hsl(var(--ink) / 0.5)">{t.label}</text>
        </g>
      ))}

      {/* Ghost leads floating away */}
      {[
        { x: 80, y: 100, label: "12 leads" },
        { x: 180, y: 70, label: "8 leads" },
        { x: 280, y: 90, label: "19 leads" },
      ].map((g, i) => (
        <g key={i} className="anim-fade" style={{ animationDelay: `${i * 200 + 300}ms` }}>
          <path d={`M${g.x} ${g.y + 30} Q ${g.x + 10} ${g.y + 10}, ${g.x} ${g.y}`} stroke="hsl(var(--ink) / 0.15)" strokeWidth="1" strokeDasharray="4 4" fill="none" />
          <text x={g.x} y={g.y - 4} textAnchor="middle" className="font-marker" fontSize="14" fill="hsl(var(--ink) / 0.35)">{g.label}</text>
        </g>
      ))}

      {/* Title */}
      <text x="200" y="30" textAnchor="middle" className="font-grotesk" fontWeight={700} fontSize="12" fill="hsl(var(--ink) / 0.6)">THE FIELD GRAVEYARD</text>
    </svg>
  </div>
);

export default FormGraveyard;
