import { usePersona, type Persona, PERSONA_LABEL } from "./PersonaContext";

const OPTIONS: { id: Persona; emoji: string; sub: string }[] = [
  { id: "cmo",      emoji: "🎩", sub: "I sign the POs" },
  { id: "marketer", emoji: "🛠️", sub: "I push the buttons" },
  { id: "founder",  emoji: "🔥", sub: "I am the budget" },
  { id: "agency",   emoji: "🧾", sub: "I bill in retainers" },
];

interface Props {
  variant?: "hero" | "sticky";
}

const PersonaPicker = ({ variant = "hero" }: Props) => {
  const { persona, setPersona } = usePersona();

  if (variant === "sticky") {
    return (
      <div className="paper-soft fixed bottom-3 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-full border-2 border-ink px-2 py-1.5 shadow-sticker sm:bottom-4">
        <span className="hidden font-mono text-[10px] uppercase tracking-wider ink-faint sm:inline px-1">reading as</span>
        {OPTIONS.map(o => (
          <button
            key={o.id}
            onClick={() => setPersona(o.id)}
            aria-pressed={persona === o.id}
            className={`rounded-full px-2.5 py-1 font-grotesk text-[11px] font-bold uppercase tracking-wider transition-colors ${
              persona === o.id ? "bg-ink text-paper" : "ink-soft hover:bg-secondary"
            }`}
          >
            <span className="mr-1" aria-hidden>{o.emoji}</span>{PERSONA_LABEL[o.id]}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="paper relative mt-10 rounded-xl border-2 border-ink p-4 sm:p-5">
      <span className="tape -top-2 left-4" aria-hidden />
      <p className="font-grotesk text-[11px] font-bold uppercase tracking-wider ink-faint">
        before you scroll · pick your poison
      </p>
      <p className="mt-1 font-marker text-2xl text-warn">
        I’m a…
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {OPTIONS.map(o => {
          const active = persona === o.id;
          return (
            <button
              key={o.id}
              onClick={() => setPersona(o.id)}
              aria-pressed={active}
              className={`group relative rounded-md border-2 border-ink p-3 text-left transition-transform hover:-translate-y-0.5 ${
                active ? "bg-ink text-paper" : "bg-paper-soft"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl" aria-hidden>{o.emoji}</span>
                {active && (
                  <span className="font-mono text-[10px] uppercase tracking-wider">✓ you</span>
                )}
              </div>
              <p className="mt-2 font-display text-xl leading-none">{PERSONA_LABEL[o.id]}</p>
              <p className={`mt-1 font-marker text-base ${active ? "text-acid" : "text-warn"}`}>{o.sub}</p>
            </button>
          );
        })}
      </div>
      <p className="mt-3 font-mono text-[10px] ink-faint">
        changes the examples below. saved locally. nobody is emailed. promise.
      </p>
    </div>
  );
};

export default PersonaPicker;
