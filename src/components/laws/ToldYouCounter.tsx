import { useEffect, useState } from "react";

const KEY = "told-you-so-count";

/** Persistent "I told you so" counter — localStorage. */
const ToldYouCounter = () => {
  const [n, setN] = useState(0);
  const [pop, setPop] = useState(false);

  useEffect(() => {
    try {
      const v = Number(localStorage.getItem(KEY) ?? 0);
      if (!Number.isNaN(v)) setN(v);
    } catch {
      /* ignore */
    }
  }, []);

  const bump = () => {
    setN((c) => {
      const next = c + 1;
      try { localStorage.setItem(KEY, String(next)); } catch { /* ignore */ }
      return next;
    });
    setPop(true);
    window.setTimeout(() => setPop(false), 320);
  };

  return (
    <div className="paper-soft rounded-lg p-4 text-center">
      <p className="font-grotesk text-[11px] font-bold uppercase tracking-wider ink-faint">
        “I told you so” counter
      </p>
      <p className={`mt-1 font-display text-5xl ${pop ? "count-pop" : ""}`}>{n}</p>
      <p className="font-marker text-lg text-warn">times you were right</p>
      <button
        onClick={bump}
        className="shake-on-click jiggle mt-2 rounded-md border-2 border-ink bg-acid px-3 py-1.5 font-grotesk text-xs font-bold uppercase tracking-wider"
      >
        +1 I told you so
      </button>
    </div>
  );
};

export default ToldYouCounter;
