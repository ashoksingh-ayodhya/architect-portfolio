/** LAW 12 — Two-buttons meme: Brand vs Performance. */
const TwoButtons = () => (
  <div className="mx-auto w-full max-w-[480px]">
    <div className="paper relative rounded-xl p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <p className="font-grotesk text-xs font-bold uppercase ink-faint">Q4 Planning · choose one</p>
        <p className="font-mono text-[10px] ink-faint">cmo.exe v8.2</p>
      </div>

      <div className="flex flex-col items-stretch gap-3 sm:flex-row">
        <button className="anim-pop sticker rounded-lg p-4 text-left transition-transform hover:-rotate-1" style={{ ['--rot' as never]: '-1deg' }}>
          <span className="block font-grotesk text-[10px] font-bold uppercase tracking-wider ink-faint">Button A</span>
          <span className="mt-1 block font-display text-2xl">Build the brand</span>
          <span className="mt-1 block font-marker text-base">no number this quarter</span>
        </button>
        <button className="anim-pop sticker rounded-lg p-4 text-left transition-transform hover:rotate-1" style={{ ['--rot' as never]: '1deg', animationDelay: '120ms' }}>
          <span className="block font-grotesk text-[10px] font-bold uppercase tracking-wider ink-faint">Button B</span>
          <span className="mt-1 block font-display text-2xl">Hit the number</span>
          <span className="mt-1 block font-marker text-base">no brand by Q3</span>
        </button>
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        <span className="text-4xl">🥵</span>
        <p className="font-display text-lg leading-tight">
          The CMO, sweating, choosing<br />
          <span className="font-marker text-warn text-2xl">— neither, badly —</span>
        </p>
      </div>

      <p className="mt-4 text-center text-sm ink-soft">
        It’s a 60 / 40 split, Binet & Field said it twenty years ago, please read.
      </p>
    </div>
  </div>
);

export default TwoButtons;
