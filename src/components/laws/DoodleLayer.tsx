import { useEffect, useRef } from "react";

/**
 * Ambient doodles scattered behind content — arrows, squiggles, stars.
 * Subtle scroll parallax, hidden from assistive tech, does not block clicks.
 */
const DoodleLayer = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const el = ref.current;
        if (el) {
          const nodes = el.querySelectorAll<HTMLElement>("[data-speed]");
          nodes.forEach((n) => {
            const s = Number(n.dataset.speed ?? 0);
            n.style.transform = `translate3d(0, ${y * s}px, 0)`;
          });
        }
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Arrow 1 — near hero, points to “no email gate” */}
      <svg
        className="doodle doodle-warn anim-float"
        data-speed="-0.04"
        style={{ top: "18%", right: "4%", width: 90, ['--rot' as never]: '-8deg' }}
        viewBox="0 0 120 80"
      >
        <path d="M5 60 Q 40 10 95 25" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M80 12 L 100 22 L 82 35" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      {/* Squiggle */}
      <svg
        className="doodle doodle-pop"
        data-speed="0.08"
        style={{ top: "62%", left: "3%", width: 110 }}
        viewBox="0 0 140 40"
      >
        <path d="M2 20 Q 15 2 30 20 T 60 20 T 90 20 T 120 20 T 138 20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>

      {/* Star */}
      <svg
        className="doodle anim-spin-slow"
        data-speed="-0.06"
        style={{ top: "34%", left: "6%", width: 42 }}
        viewBox="0 0 40 40"
      >
        <path d="M20 3 L23 16 L37 18 L26 27 L30 40 L20 32 L10 40 L14 27 L3 18 L17 16 Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>

      {/* Loopy circle */}
      <svg
        className="doodle doodle-acid"
        data-speed="0.05"
        style={{ top: "90%", right: "7%", width: 70 }}
        viewBox="0 0 80 80"
      >
        <path d="M40 8 Q 68 18 70 40 T 42 72 T 10 44 T 40 10 L 44 14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>

      {/* Zigzag */}
      <svg
        className="doodle doodle-warn"
        data-speed="-0.03"
        style={{ top: "140%", left: "8%", width: 80 }}
        viewBox="0 0 80 20"
      >
        <polyline points="2,18 12,2 22,18 32,2 42,18 52,2 62,18 72,2 78,12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      {/* Spiral */}
      <svg
        className="doodle doodle-pop anim-spin-slow"
        data-speed="0.07"
        style={{ top: "175%", right: "5%", width: 64 }}
        viewBox="0 0 60 60"
      >
        <path d="M30 30 m-2 0 a 2 2 0 1 1 4 0 a 6 6 0 1 1 -12 0 a 10 10 0 1 1 20 0 a 14 14 0 1 1 -28 0" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      </svg>

      {/* Big arrow curling across */}
      <svg
        className="doodle"
        data-speed="-0.05"
        style={{ top: "215%", left: "10%", width: 160, ['--rot' as never]: '12deg' }}
        viewBox="0 0 160 60"
      >
        <path d="M4 40 Q 50 4 100 28 T 150 44" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeDasharray="3 5" />
        <path d="M138 34 L 154 44 L 140 54" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      {/* Exclamation doodle */}
      <svg
        className="doodle doodle-warn anim-float"
        data-speed="0.04"
        style={{ top: "260%", right: "8%", width: 36 }}
        viewBox="0 0 30 60"
      >
        <path d="M15 4 L 15 38" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="15" cy="50" r="3.5" fill="currentColor" />
      </svg>

      {/* Another squiggle */}
      <svg
        className="doodle"
        data-speed="0.06"
        style={{ top: "305%", left: "4%", width: 120 }}
        viewBox="0 0 140 40"
      >
        <path d="M2 20 Q 20 0 40 20 T 80 20 T 120 20 T 138 20" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      </svg>

      {/* Scribble eye */}
      <svg
        className="doodle doodle-pop"
        data-speed="-0.04"
        style={{ top: "350%", right: "6%", width: 60 }}
        viewBox="0 0 60 40"
      >
        <path d="M4 20 Q 30 -4 56 20 Q 30 44 4 20 Z" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="30" cy="20" r="5" fill="currentColor" />
      </svg>
    </div>
  );
};

export default DoodleLayer;
