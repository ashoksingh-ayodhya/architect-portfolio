import { useEffect } from "react";

/**
 * Tiny highlighter-yellow dot trail that follows the cursor on desktop.
 * Disabled on touch + reduced-motion.
 */
const CursorMarker = () => {
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const N = 8;
    const dots: HTMLSpanElement[] = [];
    for (let i = 0; i < N; i++) {
      const d = document.createElement("span");
      d.className = "marker-dot";
      d.style.opacity = String(1 - i / N);
      d.style.width = `${12 - i}px`;
      d.style.height = `${12 - i}px`;
      document.body.appendChild(d);
      dots.push(d);
    }

    const pts = Array.from({ length: N }, () => ({ x: -100, y: -100 }));
    let mx = -100, my = -100, raf = 0;

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const tick = () => {
      pts[0].x += (mx - pts[0].x) * 0.35;
      pts[0].y += (my - pts[0].y) * 0.35;
      for (let i = 1; i < N; i++) {
        pts[i].x += (pts[i - 1].x - pts[i].x) * 0.35;
        pts[i].y += (pts[i - 1].y - pts[i].y) * 0.35;
      }
      for (let i = 0; i < N; i++) {
        dots[i].style.transform = `translate(${pts[i].x}px, ${pts[i].y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      dots.forEach((d) => d.remove());
    };
  }, []);

  return null;
};

export default CursorMarker;
