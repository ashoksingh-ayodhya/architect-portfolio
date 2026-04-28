/** CONVERSION 01 — Leaky Checkout. Every field is an exit door. */
const LeakyCheckout = () => (
  <div className="relative mx-auto w-full max-w-[520px]">
    <svg viewBox="0 0 400 320" className="h-auto w-full">
      {/* Browser chrome */}
      <rect x="20" y="20" width="360" height="280" rx="8" fill="hsl(var(--paper))" stroke="hsl(var(--ink))" strokeWidth="2" />
      <rect x="20" y="20" width="360" height="32" rx="8" fill="hsl(var(--ink) / 0.06)" />
      <circle cx="40" cy="36" r="4" fill="hsl(var(--warn))" />
      <circle cx="56" cy="36" r="4" fill="hsl(var(--acid))" />
      <circle cx="72" cy="36" r="4" fill="hsl(var(--good))" />
      <rect x="90" y="30" width="200" height="12" rx="4" fill="hsl(var(--ink) / 0.08)" />

      {/* Form fields */}
      {[
        { y: 72, label: "Full legal name", leak: true },
        { y: 108, label: "Work email", leak: true },
        { y: 144, label: "Phone (+ country code)", leak: true },
        { y: 180, label: "Job title", leak: false },
        { y: 216, label: "Company size", leak: true },
      ].map((f, i) => (
        <g key={i}>
          <rect x="48" y={f.y} width="240" height="26" rx="4" fill="hsl(var(--paper))" stroke="hsl(var(--ink) / 0.25)" strokeWidth="1.5" />
          <text x="58" y={f.y + 17} className="font-mono" fontSize="10" fill="hsl(var(--ink-faint))">{f.label}</text>
          {f.leak && (
            <>
              <path d={`M${48 + i * 12} ${f.y + 32} L${48 + i * 12} ${f.y + 55}`} stroke="hsl(var(--warn))" strokeWidth="1.5" strokeDasharray="3 3" className="anim-draw" style={{ ['--dash' as never]: 30 }} />
              <text x={48 + i * 12 + 6} y={f.y + 68} className="font-marker" fontSize="14" fill="hsl(var(--warn))">bye</text>
            </>
          )}
        </g>
      ))}

      {/* Submit button */}
      <rect x="48" y="256" width="120" height="28" rx="4" fill="hsl(var(--acid))" stroke="hsl(var(--ink))" strokeWidth="1.5" />
      <text x="108" y="274" textAnchor="middle" className="font-grotesk" fontWeight={700} fontSize="11" fill="hsl(var(--ink))">START FREE TRIAL</text>

      {/* Arrow annotation */}
      <path d="M300 100 Q 340 140 320 200" stroke="hsl(var(--pop))" strokeWidth="1.5" fill="none" markerEnd="url(#arr2)" />
      <text x="330" y="96" className="font-marker" fontSize="18" fill="hsl(var(--warn))">5 fields = 5 exits</text>

      <defs>
        <marker id="arr2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="hsl(var(--pop))" />
        </marker>
      </defs>
    </svg>
  </div>
);

export default LeakyCheckout;
