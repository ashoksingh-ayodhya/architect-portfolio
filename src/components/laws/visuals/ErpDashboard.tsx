/** STACK 02 — ERP Dashboard of Lies. Every chart is aPowerPoint in a tracksuit. */
const ErpDashboard = () => (
  <div className="relative mx-auto w-full max-w-[520px]">
    <svg viewBox="0 0 400 280" className="h-auto w-full">
      {/* Dashboard background */}
      <rect x="10" y="10" width="380" height="260" rx="8" fill="hsl(var(--paper))" stroke="hsl(var(--ink))" strokeWidth="2" />

      {/* Chart 1: Up-and-to-the-right */}
      <rect x="28" y="28" width="164" height="100" rx="4" fill="hsl(var(--background))" stroke="hsl(var(--ink) / 0.15)" strokeWidth="1" />
      <text x="40" y="44" className="font-grotesk" fontWeight={700} fontSize="9" fill="hsl(var(--ink) / 0.5)">REVENUE (forecast)</text>
      <path d="M40 100 L 60 95 L 80 85 L 100 90 L 120 70 L 140 60 L 160 45 L 180 30" stroke="hsl(var(--good))" strokeWidth="2" fill="none" />
      <circle cx="180" cy="30" r="4" fill="hsl(var(--good))" className="anim-pop" />

      {/* Chart 2: Reality */}
      <rect x="208" y="28" width="164" height="100" rx="4" fill="hsl(var(--background))" stroke="hsl(var(--ink) / 0.15)" strokeWidth="1" />
      <text x="220" y="44" className="font-grotesk" fontWeight={700} fontSize="9" fill="hsl(var(--ink) / 0.5)">REVENITY (actual)</text>
      <path d="M220 100 L 240 98 L 260 102 L 280 96 L 300 100 L 320 94 L 340 98 L 360 96" stroke="hsl(var(--warn))" strokeWidth="2" fill="none" />
      <text x="290" y="78" textAnchor="middle" className="font-marker" fontSize="14" fill="hsl(var(--warn))">flat</text>

      {/* Chart 3: Pie chart of blame */}
      <rect x="28" y="142" width="164" height="110" rx="4" fill="hsl(var(--background))" stroke="hsl(var(--ink) / 0.15)" strokeWidth="1" />
      <text x="40" y="158" className="font-grotesk" fontWeight={700} fontSize="9" fill="hsl(var(--ink) / 0.5)">WHY WE MISSED</text>
      <circle cx="110" cy="210" r="32" fill="hsl(var(--warn) / 0.2)" stroke="hsl(var(--warn))" strokeWidth="2" />
      <text x="110" y="206" textAnchor="middle" className="font-grotesk" fontWeight={700} fontSize="10" fill="hsl(var(--warn))">MARKET</text>
          <text x="110" y="220" textAnchor="middle" className="font-grotesk" fontWeight={700} fontSize="10" fill="hsl(var(--warn))">HEADWINDS</text>

      {/* Chart 4: Refresh spinner */}
      <rect x="208" y="142" width="164" height="110" rx="4" fill="hsl(var(--background))" stroke="hsl(var(--ink) / 0.15)" strokeWidth="1" />
      <text x="220" y="158" className="font-grotesk" fontWeight={700} fontSize="9" fill="hsl(var(--ink) / 0.5)">LIVE SYNC STATUS</text>
      <circle cx="290" cy="200" r="24" fill="none" stroke="hsl(var(--ink) / 0.1)" strokeWidth="4" />
      <path d="M290 176 A 24 24 0 0 1 314 200" fill="none" stroke="hsl(var(--pop))" strokeWidth="4" strokeLinecap="round" className="anim-draw" style={{ ['--dash' as never]: 80 }} />
      <text x="290" y="242" textAnchor="middle" className="font-mono" fontSize="9" fill="hsl(var(--ink) / 0.4)">syncing since march</text>
    </svg>
  </div>
);

export default ErpDashboard;
