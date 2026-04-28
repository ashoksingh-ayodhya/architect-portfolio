import { useState } from "react";
import Confetti from "@/components/laws/Confetti";

/** Click-to-charge gauge. Each click adds to a running "BS detected" count. */
const BullshitMeter = () => {
  const [clicks, setClicks] = useState(0);
  const [pop, setPop] = useState(false);
  const [burst, setBurst] = useState(0);
  const pct = Math.min(100, clicks * 7);

  const handle = () => {
    setClicks((c) => {
      const next = c + 1;
      if (next === 14) setBurst(Date.now());
      return next;
    });
    setPop(true);
    window.setTimeout(() => setPop(false), 320);
  };


  const labels = [
    "calibrating…",
    "mild LinkedIn wheeze",
    "standard webinar vapor",
    "agency pitch deck",
    "keynote at SaaS conf",
    "VC twitter thread",
    "CEO all-hands",
    "ENTERPRISE-GRADE SLOP",
  ];
  const label = labels[Math.min(labels.length - 1, Math.floor(clicks / 2))];

  return (
    <section className="relative px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-grotesk text-[11px] font-bold uppercase tracking-[0.2em] ink-faint">
          interactive break · tap the button
        </p>
        <h2 className="mt-2 font-display text-[2.1rem] leading-none sm:text-5xl">
          the <span className="highlight">bullshit-o-meter</span>
        </h2>
        <p className="mt-3 font-marker text-2xl text-warn">clinically calibrated to LinkedIn, est. 2026</p>

        <div className="relative mx-auto mt-8 max-w-xl paper rounded-xl p-5 sm:p-6">
          <Confetti trigger={burst} />
          <div className="flex items-baseline justify-between">
            <span className="font-grotesk text-xs font-bold uppercase ink-faint">BS detected</span>
            <span className={`font-display text-4xl sm:text-5xl ${pop ? "count-pop" : ""}`}>{clicks}</span>
          </div>

          {/* Gauge */}
          <div className="mt-4 h-4 w-full overflow-hidden rounded-full border-2 border-ink bg-paper">
            <div
              className="h-full bg-warn transition-[width] duration-300 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>

          <p className="mt-3 font-marker text-2xl">
            reading: <span className="text-warn">{label}</span>
          </p>

          <button
            onClick={handle}
            className="jiggle shake-on-click mt-5 inline-flex items-center gap-2 rounded-md sticker-ink px-5 py-3 font-grotesk text-sm font-bold uppercase tracking-wider"
          >
            detect some bullshit
            <span aria-hidden="true">🚨</span>
          </button>

          {clicks >= 14 && (
            <p className="anim-stamp mt-4 inline-block stamp">enterprise-grade slop</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default BullshitMeter;
