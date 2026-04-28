import { useEffect, useRef, useState } from "react";

const HighlightSweep = ({ text, className = "" }: { text: string; className?: string }) => {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <span ref={ref} className={`relative inline ${className}`}>
      <span
        className="absolute inset-0 -mx-1 origin-left rounded-sm transition-transform duration-700 ease-out"
        style={{
          background: "hsl(var(--acid))",
          transform: active ? "scaleX(1)" : "scaleX(0)",
          zIndex: -1,
        }}
      />
      <span className="relative z-10">{text}</span>
    </span>
  );
};

export default HighlightSweep;
