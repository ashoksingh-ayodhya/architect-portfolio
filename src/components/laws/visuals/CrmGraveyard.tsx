/** STACK 01 — CRM Data Graveyard. 40% of contacts are job-changers and duplicates. */
const CrmGraveyard = () => (
  <div className="relative mx-auto w-full max-w-[520px]">
    <svg viewBox="0 0 400 280" className="h-auto w-full">
      {/* CRM table header */}
      <rect x="20" y="20" width="360" height="36" rx="4" fill="hsl(var(--ink))" />
      {["Name", "Company", "Last Activity", "Owner"].map((h, i) => (
        <text key={h} x={40 + i * 90} y="42" className="font-grotesk" fontWeight={700} fontSize="10" fill="hsl(var(--paper))">{h}</text>
      ))}

      {/* CRM rows — dead records */}
      {[
        { name: "john@oldco.com", comp: "Left 2023", act: "Never", owner: "SDR #3", color: "warn" },
        { name: " duplicate #4", comp: "Acme Inc", act: "2022", owner: "???", color: "warn" },
        { name: "+1 (000) 000-0", comp: "Fake", act: "Bounced", owner: "Nobody", color: "warn" },
        { name: "test@test.com", comp: "Test", act: "Never", owner: "Intern", color: "warn" },
        { name: "unsubscribe", comp: "Gone", act: "2019", owner: "Ghost", color: "ink" },
      ].map((r, i) => (
        <g key={i} transform={`translate(0, ${62 + i * 36})`}>
          <rect x="20" y="0" width="360" height="32" rx="2" fill={i % 2 === 0 ? "hsl(var(--paper))" : "hsl(var(--background))"} stroke="hsl(var(--ink) / 0.1)" strokeWidth="1" />
          <text x="32" y="20" className="font-mono" fontSize="9" fill={r.color === "warn" ? "hsl(var(--warn))" : "hsl(var(--ink) / 0.3)"}>
            {r.name}
          </text>
          <text x="130" y="20" className="font-mono" fontSize="9" fill="hsl(var(--ink) / 0.45)">{r.comp}</text>
          <text x="220" y="20" className="font-mono" fontSize="9" fill="hsl(var(--ink) / 0.45)">{r.act}</text>
          <text x="310" y="20" className="font-mono" fontSize="9" fill="hsl(var(--ink) / 0.45)">{r.owner}</text>
        </g>
      ))}

      {/* Annotation */}
      <path d="M390 80 Q 410 60, 390 40" stroke="hsl(var(--warn))" strokeWidth="1.5" fill="none" markerEnd="url(#arr3)" />
      <text x="395" y="30" className="font-marker" fontSize="16" fill="hsl(var(--warn))">40% dead</text>

      <defs>
        <marker id="arr3" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="hsl(var(--warn))" />
        </marker>
      </defs>
    </svg>
  </div>
);

export default CrmGraveyard;
