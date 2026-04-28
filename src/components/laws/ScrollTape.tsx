import { useEffect, useState } from "react";

/** Slim acid-yellow scroll progress bar at the top of the page. */
const ScrollTape = () => {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrollable = h.scrollHeight - h.clientHeight;
      setPct(scrollable > 0 ? Math.min(1, h.scrollTop / scrollable) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className="scroll-tape w-full"
      style={{ transform: `scaleX(${pct})` }}
      aria-hidden="true"
    />
  );
};

export default ScrollTape;
