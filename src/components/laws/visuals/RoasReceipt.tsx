/** LAW 07 — ROAS Receipt. The "blended vs platform" gap. */
const RoasReceipt = () => {
  const lines = [
    ["Meta dashboard ROAS",    "5.4x", "ink-faint" ],
    ["Google Ads ROAS",        "4.1x", "ink-faint" ],
    ["TikTok ROAS",            "9.8x", "ink-faint" ],
    ["—— vibes subtotal ——",   "19.3x","ink"        ],
    ["Blended ROAS (reality)", "1.9x", "text-warn"  ],
    ["Incremental MER",        "1.3x", "text-warn"  ],
  ];
  return (
    <div className="mx-auto w-full max-w-[400px]">
      <div className="paper relative anim-pop rounded-md p-5 font-mono text-[12px] sm:text-[13px]" style={{ ['--rot' as never]: '-1deg' }}>
        {/* Receipt jagged top/bottom */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-2 h-3"
          style={{
            background:
              "repeating-linear-gradient(45deg, transparent 0 6px, hsl(var(--background)) 6px 12px), hsl(var(--paper))",
            maskImage: "linear-gradient(180deg, hsl(var(--paper)) 50%, transparent 50%)",
          }}
        />
        <p className="font-display text-lg">CHANNEL ATTRIBUTION CO.</p>
        <p className="ink-faint">order #420 · self-reported</p>
        <hr className="my-3 border-dashed hairline" />
        <ul className="space-y-1.5">
          {lines.map(([k, v, c]) => (
            <li key={k} className="flex items-baseline justify-between gap-3">
              <span className={c}>{k}</span>
              <span className={`font-bold ${c}`}>{v}</span>
            </li>
          ))}
        </ul>
        <hr className="my-3 border-dashed hairline" />
        <div className="flex items-baseline justify-between">
          <span>TOTAL</span>
          <span className="font-display text-xl">$ feelings</span>
        </div>
        <p className="mt-2 ink-faint">tip not included · neither is incrementality</p>

        <span className="stamp absolute -right-2 bottom-6">double counted</span>
      </div>
    </div>
  );
};

export default RoasReceipt;
