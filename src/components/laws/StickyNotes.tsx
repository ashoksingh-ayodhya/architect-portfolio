import { useRef, useState } from "react";

type Note = {
  id: string;
  x: number;         // % of container
  y: number;         // px from top
  rot: number;
  tone: "acid" | "acid2" | "paper" | "warn";
  text: string;
  who: string;
};

const NOTES: Note[] = [
  { id: "n1", x: 6,  y: 20,  rot: -4, tone: "acid2", text: "ROAS is a feelings journal", who: "— me, to the CFO" },
  { id: "n2", x: 72, y: 10,  rot: 3,  tone: "acid",  text: "kill the 7 losing ads. today.", who: "— every account" },
  { id: "n3", x: 40, y: 150, rot: -2, tone: "paper", text: "MMM ≠ magic\nMMM = regression + therapy", who: "— attribution lead, tired" },
  { id: "n4", x: 14, y: 210, rot: 5,  tone: "warn",  text: "if it fits in one number\nit is lying to you", who: "— law 02, still" },
  { id: "n5", x: 62, y: 230, rot: -6, tone: "paper", text: "nobody clicked the CTA because nobody understood the page.", who: "— CRO, week 1" },
];

const toneCls = (t: Note["tone"]) => {
  switch (t) {
    case "acid":  return "is-acid";
    case "warn":  return "is-warn";
    case "paper": return "is-paper";
    default:      return "";
  }
};

const StickyNotes = () => {
  const box = useRef<HTMLDivElement>(null);
  const [notes, setNotes] = useState(NOTES);
  const drag = useRef<{ id: string; dx: number; dy: number } | null>(null);

  const onPointerDown = (e: React.PointerEvent, id: string) => {
    const target = e.currentTarget as HTMLElement;
    target.setPointerCapture(e.pointerId);
    const rect = target.getBoundingClientRect();
    drag.current = { id, dx: e.clientX - rect.left, dy: e.clientY - rect.top };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current || !box.current) return;
    const b = box.current.getBoundingClientRect();
    const nx = ((e.clientX - drag.current.dx - b.left) / b.width) * 100;
    const ny = e.clientY - drag.current.dy - b.top;
    setNotes((ns) =>
      ns.map((n) =>
        n.id === drag.current!.id
          ? { ...n, x: Math.max(0, Math.min(88, nx)), y: Math.max(-10, Math.min(b.height - 40, ny)) }
          : n
      )
    );
  };
  const onPointerUp = (e: React.PointerEvent) => {
    try { (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); } catch {}
    drag.current = null;
  };

  return (
    <section className="relative px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-grotesk text-[11px] font-bold uppercase tracking-[0.2em] ink-faint">
              stuff on the fridge · drag them around
            </p>
            <h2 className="mt-2 font-display text-[2rem] leading-none sm:text-5xl">
              the <span className="highlight">sticky-note</span> appendix
            </h2>
          </div>
          <p className="font-marker text-2xl text-warn">yes, on mobile too</p>
        </div>

        <div
          ref={box}
          className="relative h-[380px] overflow-hidden rounded-xl border-2 border-ink bg-paper sm:h-[340px]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--ink) / 0.04) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--ink) / 0.04) 1px, transparent 1px)",
            backgroundSize: "24px 24px, 24px 24px",
          }}
        >
          {notes.map((n) => (
            <div
              key={n.id}
              className={`stickynote absolute text-xl sm:text-2xl ${toneCls(n.tone)}`}
              style={{
                left: `${n.x}%`,
                top: n.y,
                transform: `rotate(${n.rot}deg)`,
                width: "min(62vw, 220px)",
                whiteSpace: "pre-line",
              }}
              onPointerDown={(e) => onPointerDown(e, n.id)}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            >
              {n.text}
              <p className="mt-2 font-grotesk text-[10px] font-bold uppercase tracking-wider opacity-70">
                {n.who}
              </p>
              {/* Push-pin */}
              <span
                aria-hidden="true"
                className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-ink bg-warn"
              />
            </div>
          ))}
        </div>
        <p className="mt-3 font-mono text-[11px] ink-faint">
          no state is saved. rearrange to your taste, reload when you’re over it.
        </p>
      </div>
    </section>
  );
};

export default StickyNotes;
