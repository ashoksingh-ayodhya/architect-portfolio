import { useEffect, useState } from "react";

/** Tiny one-shot confetti burst. Renders ~24 paper bits that fall + fade. */
const COLORS = ["bg-acid", "bg-warn", "bg-pop", "bg-ink"];

const Confetti = ({ trigger }: { trigger: number }) => {
  const [bits, setBits] = useState<number[]>([]);

  useEffect(() => {
    if (!trigger) return;
    const id = trigger;
    setBits((b) => [...b, id]);
    const t = window.setTimeout(() => {
      setBits((b) => b.filter((x) => x !== id));
    }, 1600);
    return () => window.clearTimeout(t);
  }, [trigger]);

  if (!bits.length) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {bits.map((id) =>
        Array.from({ length: 24 }).map((_, i) => {
          const left = (i * 37) % 100;
          const delay = (i % 8) * 30;
          const dur = 900 + ((i * 53) % 600);
          const rot = ((i * 47) % 360) - 180;
          const color = COLORS[i % COLORS.length];
          return (
            <span
              key={`${id}-${i}`}
              className={`confetti-bit absolute top-0 ${color}`}
              style={{
                left: `${left}%`,
                animationDelay: `${delay}ms`,
                animationDuration: `${dur}ms`,
                ['--r' as never]: `${rot}deg`,
              }}
            />
          );
        })
      )}
    </div>
  );
};

export default Confetti;
