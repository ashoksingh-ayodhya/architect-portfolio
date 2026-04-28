import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const StickerSlap = ({
  text,
  tone = "warn",
  className = "",
  children,
}: {
  text?: string;
  tone?: "warn" | "acid" | "ink";
  className?: string;
  children?: React.ReactNode;
}) => {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const toneMap = {
    warn: "bg-warn text-ink",
    acid: "bg-acid text-ink",
    ink: "bg-ink text-paper",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "inline-block rounded-md px-3 py-1.5 font-grotesk text-xs font-bold uppercase tracking-wider transition-all duration-300",
        toneMap[tone],
        active ? "scale-100 rotate-0 opacity-100" : "scale-150 -rotate-6 opacity-0",
        className
      )}
    >
      {text || children}
    </div>
  );
};

export default StickerSlap;
