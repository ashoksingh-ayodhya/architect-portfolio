/** STACK 03 — Sales Funnel vs Reality. The CRM says 90% close rate. The calendar says otherwise. */
const SalesReality = () => (
  <div className="relative mx-auto w-full max-w-[520px]">
    <svg viewBox="0 0 400 300" className="h-auto w-full">
      {/* CRM Funnel (left) — lies */}
      <text x="80" y="24" textAnchor="middle" className="font-grotesk" fontWeight={700} fontSize="10" fill="hsl(var(--ink) / 0.5)">CRM SAYS</text>
      {[
        { y: 50, w: 140, label: "Prospects 500", color: "pop" },
        { y: 90, w: 110, label: "MQLs 420", color: "pop" },
        { y: 130, w: 90, label: "SQLs 380", color: "pop" },
        { y: 170, w: 70, label: "Opp 350", color: "pop" },
        { y: 210, w: 60, label: "Won 340", color: "good" },
      ].map((s, i) => (
        <g key={i}>
          <polygon
            points={`${80 - s.w / 2},${s.y} ${80 + s.w / 2},${s.y} ${80 + s.w / 2 + 8},${s.y + 30} ${80 - s.w / 2 - 8},${s.y + 30}`}
            fill={`hsl(var(--${s.color}) / 0.15)`}
            stroke={`hsl(var(--${s.color}))`}
            strokeWidth="1.5"
            className="anim-pop"
            style={{ ['--rot' as never]: '0deg', animationDelay: `${i * 80}ms` }}
          />
          <text x="80" y={s.y + 20} textAnchor="middle" className="font-grotesk" fontWeight={700} fontSize="9" fill={`hsl(var(--${s.color}))`}>{s.label}</text>
        </g>
      ))}

      {/* Arrow between */}
      <path d="M150 150 L 200 150" stroke="hsl(var(--ink) / 0.2)" strokeWidth="1.5" strokeDasharray="6 4" />
      <text x="175" y="142" textAnchor="middle" className="font-marker" fontSize="14" fill="hsl(var(--ink) / 0.35)">vs</text>

      {/* Reality Funnel (right) — truth */}
      <text x="300" y="24" textAnchor="middle" className="font-grotesk" fontWeight={700} fontSize="10" fill="hsl(var(--ink) / 0.5)">REALITY</text>
      {[
        { y: 50, w: 140, label: "Prospects 500", color: "pop" },
        { y: 90, w: 90, label: "MQLs 180", color: "warn" },
        { y: 130, w: 50, label: "SQLs 60", color: "warn" },
        { y: 170, w: 30, label: "Opp 22", color: "warn" },
        { y: 210, w: 14, label: "Won 7", color: "warn" },
      ].map((s, i) => (
        <g key={i}>
          <polygon
            points={`${300 - s.w / 2},${s.y} ${300 + s.w / 2},${s.y} ${300 + s.w / 2 + (i === 4 ? 4 : 10)},${s.y + 30} ${300 - s.w / 2 - (i === 4 ? 4 : 10)},${s.y + 30}`}
            fill={`hsl(var(--${s.color}) / 0.12)`}
            stroke={`hsl(var(--${s.color}))`}
            strokeWidth="1.5"
            className="anim-pop"
            style={{ ['--rot' as never]: '0deg', animationDelay: `${i * 80 + 400}ms` }}
          />
          <text x="300" y={s.y + 20} textAnchor="middle" className="font-grotesk" fontWeight={700} fontSize="9" fill={`hsl(var(--${s.color}))`}>{s.label}</text>
        </g>
      ))}

      {/* Bottom annotation */}
      <text x="200" y="280" textAnchor="middle" className="font-marker" fontSize="18" fill="hsl(var(--warn))">your pipeline is a participation trophy</text>
    </svg>
  </div>
);

export default SalesReality;
