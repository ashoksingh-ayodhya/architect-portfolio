/** CONVERSION 02 — Heatmap delusion. Everyone clicks the X. */
const HeatmapParody = () => {
  const hotZones = [
    { x: 340, y: 30, r: 28, label: "CLOSE" },
    { x: 180, y: 120, r: 22, label: "NO" },
    { x: 80, y: 200, r: 18, label: "SKIP" },
  ];

  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      <svg viewBox="0 0 400 280" className="h-auto w-full">
        {/* Page background */}
        <rect x="20" y="10" width="360" height="260" rx="6" fill="hsl(var(--paper))" stroke="hsl(var(--ink))" strokeWidth="2" />

        {/* Fake page content lines */}
        {Array.from({ length: 8 }).map((_, i) => (
          <rect key={i} x="40" y={32 + i * 26} width={260 - i * 20} height="10" rx="3" fill="hsl(var(--ink) / 0.06)" />
        ))}

        {/* CTA button nobody clicks */}
        <rect x="40" y="230" width="140" height="24" rx="4" fill="hsl(var(--acid) / 0.3)" stroke="hsl(var(--ink) / 0.2)" strokeWidth="1" />
        <text x="110" y="246" textAnchor="middle" className="font-grotesk" fontWeight={700} fontSize="10" fill="hsl(var(--ink) / 0.4)">BOOK A DEMO</text>

        {/* Heatmap hotspots */}
        {hotZones.map((z, i) => (
          <g key={i}>
            <circle cx={z.x} cy={z.y} r={z.r} fill="hsl(var(--warn) / 0.25)" className="anim-pop" style={{ ['--rot' as never]: '0deg', animationDelay: `${i * 150}ms` }} />
            <circle cx={z.x} cy={z.y} r={z.r * 0.5} fill="hsl(var(--warn) / 0.45)" className="anim-pop" style={{ ['--rot' as never]: '0deg', animationDelay: `${i * 150 + 80}ms` }} />
            <text x={z.x} y={z.y + 4} textAnchor="middle" className="font-grotesk" fontWeight={700} fontSize="11" fill="hsl(var(--warn))">{z.label}</text>
          </g>
        ))}

        {/* Modal popup being closed */}
        <rect x="100" y="60" width="200" height="120" rx="6" fill="hsl(var(--paper))" stroke="hsl(var(--ink))" strokeWidth="2" className="anim-pop" />
        <rect x="120" y="80" width="160" height="8" rx="3" fill="hsl(var(--ink) / 0.08)" />
        <rect x="120" y="96" width="120" height="8" rx="3" fill="hsl(var(--ink) / 0.08)" />
        <rect x="120" y="120" width="100" height="24" rx="4" fill="hsl(var(--acid))" stroke="hsl(var(--ink))" strokeWidth="1.5" />
        <text x="170" y="136" textAnchor="middle" className="font-grotesk" fontWeight={700} fontSize="10" fill="hsl(var(--ink))">YES PLS</text>
        <text x="330" y="76" className="font-grotesk" fontWeight={700} fontSize="14" fill="hsl(var(--ink))">✕</text>

        {/* Caption */}
        <text x="200" y="270" textAnchor="middle" className="font-marker" fontSize="18" fill="hsl(var(--warn))">your "hottest" zone is the exit</text>
      </svg>
    </div>
  );
};

export default HeatmapParody;
