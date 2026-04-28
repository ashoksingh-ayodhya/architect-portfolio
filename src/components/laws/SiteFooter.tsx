const SiteFooter = () => {
  const laws = [
    "01 · Iceberg of Attribution",
    "02 · Drake (CAC vs LTV)",
    "03 · Distracted CMO",
    "04 · Dunning–Kruger of Buyers",
    "05 · Power Law of Creative",
    "06 · Brain of Attribution",
    "07 · ROAS Receipt",
    "08 · Funnel = Colander",
    "09 · Slack DM Theorem",
    "10 · Buzzword Bingo",
    "11 · Creative Half-Life",
    "12 · Two Buttons (Brand vs Perf)",
  ];
  const pages = [
    { href: "/", label: "Home" },
    { href: "/conversion", label: "Conversion Playbook" },
    { href: "/stack", label: "Sales Stack Playbook" },
  ];
  return (
    <footer id="yell" className="relative mt-16 border-t-2 border-ink bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-12 sm:px-8 sm:py-16 md:grid-cols-12 md:gap-12 lg:px-12">
        <div className="md:col-span-7">
          <p className="font-marker text-3xl text-acid">that’s it. that’s the page.</p>
          <h3 className="mt-2 font-display text-balance text-4xl leading-tight sm:text-5xl">
            no PDFs to download.<br />
            no <span className="italic">“5-step framework”</span>.<br />
            just the same twelve points,<br />
            forever.
          </h3>
          <p className="mt-5 max-w-md text-pretty text-paper/75 sm:text-lg">
            If something here was wrong, please yell. If something was right,
            please also yell, ideally on a platform with an algorithm.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#yell" className="sticker-acid inline-flex items-center gap-2 rounded-md px-4 py-2.5 font-grotesk text-sm font-bold uppercase tracking-wider text-ink">
              yell at me ↗
            </a>
            <a href="#top" className="rounded-md border-2 border-paper/60 px-4 py-2.5 font-grotesk text-sm font-bold uppercase tracking-wider text-paper hover:bg-paper hover:text-ink">
              ↑ rewind to law 01
            </a>
          </div>
        </div>

        <div className="md:col-span-5">
          <p className="mb-3 font-grotesk text-[11px] font-bold uppercase tracking-wider text-paper/60">
            playbooks
          </p>
          <ul className="mb-6 grid grid-cols-1 gap-y-1.5 font-mono text-[12px] sm:text-[13px]">
            {pages.map((p) => (
              <li key={p.href}>
                <a href={p.href} className="text-paper/85 transition-colors hover:text-acid">
                  {p.label}
                </a>
              </li>
            ))}
          </ul>

          <p className="mb-3 font-grotesk text-[11px] font-bold uppercase tracking-wider text-paper/60">
            the table of contents
          </p>
          <ul className="grid grid-cols-1 gap-y-1.5 font-mono text-[12px] sm:text-[13px]">
            {laws.map((l, i) => (
              <li key={l}>
                <a
                  href={`#law-${String(i + 1).padStart(2, "0")}`}
                  className="text-paper/85 transition-colors hover:text-acid"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/15 px-5 py-5 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 font-mono text-[10px] uppercase tracking-wider text-paper/55 sm:text-[11px] md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} · the laws of performance marketing</p>
          <p>built in spite of <span className="text-acid">every dashboard</span> i’ve ever seen</p>
          <p>last updated: when something else broke</p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
