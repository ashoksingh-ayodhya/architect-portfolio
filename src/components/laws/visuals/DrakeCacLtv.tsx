/** LAW 02 — Drake meme: CAC vs LTV. */
const DrakeCacLtv = () => (
  <div className="mx-auto w-full max-w-[520px]">
    <div className="grid grid-cols-[88px_1fr] gap-3 sm:grid-cols-[110px_1fr] sm:gap-4">
      {/* Drake "no" panel */}
      <div className="paper-soft anim-pop relative flex aspect-square items-center justify-center rounded-lg" style={{ ['--rot' as never]: '-1deg' }}>
        <span className="text-5xl">🙅🏽‍♂️</span>
        <span className="absolute -right-2 -top-2 sticker-warn rounded-md px-2 py-0.5 font-grotesk text-[10px] font-bold">NO</span>
      </div>
      <div className="anim-slide flex items-center rounded-lg border-2 border-ink bg-warn/15 px-3 py-2 sm:px-4">
        <p className="font-display text-lg leading-tight sm:text-2xl">
          “What is our <span className="font-marker text-warn">CAC</span> this week?”
        </p>
      </div>

      {/* Drake "yes" panel */}
      <div className="paper-soft anim-pop relative flex aspect-square items-center justify-center rounded-lg" style={{ ['--rot' as never]: '2deg', animationDelay: '120ms' }}>
        <span className="text-5xl">😎👉</span>
        <span className="absolute -right-2 -top-2 sticker-acid rounded-md px-2 py-0.5 font-grotesk text-[10px] font-bold">YES</span>
      </div>
      <div className="anim-slide flex items-center rounded-lg border-2 border-ink bg-acid/40 px-3 py-2 sm:px-4" style={{ animationDelay: '180ms' }}>
        <p className="font-display text-lg leading-tight sm:text-2xl">
          “What is our <span className="highlight font-marker">payback period</span> by cohort?”
        </p>
      </div>
    </div>

    <div className="mt-5 grid grid-cols-3 gap-2 font-mono text-[11px] sm:gap-3">
      {[
        ["CAC", "$420", "vanity"],
        ["LTV", "$3,140", "fanfic"],
        ["Payback", "8.4 mo", "the only one that pays rent"],
      ].map(([k, v, note]) => (
        <div key={k} className="paper-soft rounded-md p-2.5">
          <p className="ink-faint">{k}</p>
          <p className="mt-0.5 font-display text-xl">{v}</p>
          <p className="mt-0.5 font-marker text-base text-warn">{note}</p>
        </div>
      ))}
    </div>
  </div>
);

export default DrakeCacLtv;
