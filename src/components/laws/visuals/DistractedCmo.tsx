/** LAW 03 — Distracted CMO meme (distracted-boyfriend layout). */
const DistractedCmo = () => (
  <div className="mx-auto w-full max-w-[520px]">
    <div className="relative grid grid-cols-3 items-end gap-3">
      {/* CMO */}
      <div className="anim-pop paper-soft relative flex flex-col items-center rounded-lg p-3" style={{ ['--rot' as never]: '-3deg' }}>
        <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-ink bg-paper text-4xl">👨🏽‍💼</div>
        <p className="mt-2 text-center font-grotesk text-xs font-bold">CMO</p>
        <p className="text-center font-marker text-base text-warn -rotate-3">looking →</p>
      </div>

      {/* Shiny new thing */}
      <div className="anim-pop relative rounded-lg border-2 border-ink bg-acid p-3" style={{ ['--rot' as never]: '2deg', animationDelay: '120ms' }}>
        <div className="flex h-20 items-center justify-center rounded-md bg-paper text-3xl">🤖</div>
        <p className="mt-2 text-center font-grotesk text-[11px] font-bold uppercase">AI agentic GTM platform</p>
        <p className="text-center font-marker text-base">demo today??</p>
      </div>

      {/* Boring thing that works */}
      <div className="anim-pop paper-soft relative flex flex-col items-center rounded-lg p-3 opacity-80" style={{ ['--rot' as never]: '-1deg', animationDelay: '240ms' }}>
        <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-ink bg-paper text-3xl">📊</div>
        <p className="mt-2 text-center font-grotesk text-[11px] font-bold">A working dashboard</p>
        <p className="text-center font-marker text-base ink-faint">3 yrs married</p>
      </div>
    </div>

    <div className="mt-5 rounded-md border-2 border-ink bg-paper p-3 sm:p-4">
      <p className="font-grotesk text-xs ink-faint">QUARTERLY ROADMAP</p>
      <ul className="mt-2 space-y-1.5 font-mono text-[12px]">
        <li className="flex items-baseline justify-between gap-3"><span>Rebrand</span><span className="font-marker text-warn">again</span></li>
        <li className="flex items-baseline justify-between gap-3"><span>New martech vendor</span><span className="font-marker text-warn">3rd this year</span></li>
        <li className="flex items-baseline justify-between gap-3"><span>Fix lead routing from 2021</span><span className="font-marker ink-faint">next quarter</span></li>
      </ul>
    </div>
  </div>
);

export default DistractedCmo;
