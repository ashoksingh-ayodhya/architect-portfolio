import InViewGate from "@/components/laws/InViewGate";

const Hero = () => (
  <section
    id="top"
    className="relative overflow-hidden px-5 pb-16 pt-12 sm:px-8 sm:pb-24 sm:pt-16 lg:px-12 lg:pt-20"
  >
    {/* Tiny topbar */}
    <div className="mb-10 flex items-center justify-between sm:mb-14">
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full border-2 border-ink bg-acid" />
        <span className="font-grotesk text-xs font-bold uppercase tracking-wider">
          The Laws of Performance Marketing
        </span>
      </div>
      <span className="hidden font-mono text-[11px] ink-faint sm:inline">
        v.2026 · still mad
      </span>
    </div>

    <InViewGate>
      <div className="mx-auto max-w-5xl">
        <p className="anim-slide font-marker text-3xl text-warn sm:text-4xl">
          a portfolio of opinions, mostly correct,
        </p>

        <h1 className="mt-2 font-display text-balance text-[3.2rem] leading-[0.9] sm:text-[4.6rem] md:text-[5.6rem] lg:text-[7rem]">
          twelve <span className="highlight">laws</span> of performance marketing,
          <br className="hidden sm:inline" />{" "}
          shouted into <span className="italic">the void</span> of LinkedIn.
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed ink-soft sm:mt-8 sm:text-lg">
          Not a deck. Not a course. Not a “let’s hop on a quick call.” Just twelve
          things we keep watching teams pay tuition for, illustrated mostly with
          memes because, frankly, the spreadsheet didn’t convince anyone last time
          either.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10">
          <a href="#law-01" className="sticker-ink inline-flex items-center gap-2 rounded-md px-4 py-2.5 font-grotesk text-sm font-bold uppercase tracking-wider">
            start scrolling
            <span aria-hidden="true">↓</span>
          </a>
          <a href="#law-12" className="sticker inline-flex items-center gap-2 rounded-md px-4 py-2.5 font-grotesk text-sm font-bold uppercase tracking-wider">
            skip to the punchline
          </a>
          <span className="font-marker text-2xl text-warn">no email gate, relax</span>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:grid-cols-4">
          {[
            ["12",  "laws",          "ish"],
            ["0",   "case studies",  "by design"],
            ["0",   "“book a demo”", "promise"],
            ["∞",   "spicy takes",   "tap to read"],
          ].map(([n, l, sub]) => (
            <div key={l} className="paper-soft anim-pop rounded-md p-3 sm:p-4" style={{ ['--rot' as never]: `${(Math.random()*4-2).toFixed(1)}deg` }}>
              <p className="font-display text-3xl sm:text-4xl">{n}</p>
              <p className="font-grotesk text-xs font-bold uppercase ink-soft">{l}</p>
              <p className="font-marker text-base text-warn">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </InViewGate>
  </section>
);

export default Hero;
