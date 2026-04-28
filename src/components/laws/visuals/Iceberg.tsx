/** LAW 01 — Iceberg of Attribution. Last-click is the tip; the whole iceberg is below water. */
const Iceberg = () => (
  <div className="relative mx-auto w-full max-w-[520px]">
    <svg viewBox="0 0 400 320" className="h-auto w-full">
      {/* waterline */}
      <line x1="0" y1="120" x2="400" y2="120" stroke="hsl(var(--pop))" strokeWidth="1.5" strokeDasharray="6 6" />
      <text x="8" y="114" className="font-mono" fontSize="11" fill="hsl(var(--pop))">CMO eye-line</text>

      {/* tip */}
      <polygon points="160,120 240,120 200,60" fill="hsl(var(--paper))" stroke="hsl(var(--ink))" strokeWidth="2" className="anim-pop" style={{ ['--rot' as never]: '0deg' }} />
      <text x="200" y="92" textAnchor="middle" className="font-grotesk" fontWeight={700} fontSize="11" fill="hsl(var(--ink))">LAST CLICK</text>

      {/* underwater body */}
      <polygon
        points="80,120 320,120 290,300 110,300"
        fill="hsl(var(--ink) / 0.06)"
        stroke="hsl(var(--ink))"
        strokeWidth="2"
        className="anim-draw"
        style={{ ['--dash' as never]: 1100 }}
      />

      {[
        { y: 145, t: "Brand search you didn’t pay for" },
        { y: 170, t: "Podcast they heard 7 months ago" },
        { y: 195, t: "Founder’s LinkedIn shitpost" },
        { y: 220, t: "Slack DM from a friend" },
        { y: 245, t: "That one banner ad in 2022" },
        { y: 270, t: "Vibes" },
      ].map((r, i) => (
        <text key={i} x="200" y={r.y} textAnchor="middle" className="font-grotesk" fontSize="11" fill="hsl(var(--ink) / 0.75)">
          {r.t}
        </text>
      ))}

      {/* arrow */}
      <path d="M340 60 Q 320 80 270 90" stroke="hsl(var(--ink))" strokeWidth="1.5" fill="none" markerEnd="url(#ar)" />
      <defs>
        <marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="hsl(var(--ink))" />
        </marker>
      </defs>
      <text x="345" y="56" className="font-marker" fontSize="20" fill="hsl(var(--warn))">100% credit lol</text>
    </svg>
  </div>
);

export default Iceberg;
