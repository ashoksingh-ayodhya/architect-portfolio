import type { ReactNode } from "react";
import InViewGate from "@/components/laws/InViewGate";
import { usePersona, PERSONA_LABEL } from "@/components/laws/PersonaContext";
import { PERSONA_COPY } from "@/components/laws/personaCopy";

interface LawSectionProps {
  id?: string;
  number: string;
  kicker: string;
  title: ReactNode;
  tldr: string;
  body: ReactNode;
  receipt?: string;
  visual: ReactNode;
  reverse?: boolean;
}

const LawSection = ({
  id,
  number,
  kicker,
  title,
  tldr,
  body,
  receipt,
  visual,
  reverse = false,
}: LawSectionProps) => {
  const { persona } = usePersona();
  const override = id ? PERSONA_COPY[id as keyof typeof PERSONA_COPY]?.[persona] : undefined;
  const finalTldr = override?.tldr ?? tldr;
  const finalBody = override?.body ?? body;
  const finalReceipt = override?.receipt ?? receipt;

  return (
    <section
      id={id}
      className="relative scroll-mt-20 px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
    >
      {/* Giant watermark numeral */}
      <p
        aria-hidden="true"
        className={`watermark absolute top-2 text-[28vw] sm:text-[20vw] lg:text-[14rem] ${
          reverse ? "right-2 sm:right-6" : "left-2 sm:left-6"
        }`}
      >
        {number}
      </p>

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
        {/* COPY */}
        <div className={`order-2 lg:col-span-5 ${reverse ? "lg:order-2 lg:col-start-8" : "lg:order-1"}`}>
          <div className="flex flex-wrap items-center gap-2">
            <span className="sticker-ink rounded-md px-2.5 py-1 font-mono text-[10px] tracking-[0.18em] sm:text-[11px]">
              {kicker}
            </span>
            <span className="font-marker text-2xl ink-faint">/</span>
            <span key={`tldr-${persona}`} className="anim-pop font-marker text-2xl text-warn">{finalTldr}</span>
            {override && (
              <span className="ml-auto rounded-full border border-ink px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider ink-soft">
                for {PERSONA_LABEL[persona]}
              </span>
            )}
          </div>

          <h2 className="mt-4 font-display text-balance text-[2.1rem] sm:mt-5 sm:text-[2.6rem] md:text-5xl lg:text-[3.4rem]">
            {title}
          </h2>

          <div key={`body-${persona}`} className="anim-fade mt-5 space-y-3 text-pretty text-base leading-relaxed ink-soft sm:mt-6 sm:text-[17px]">
            {finalBody}
          </div>
        </div>

        {/* VISUAL */}
        <div className={`order-1 lg:col-span-7 ${reverse ? "lg:order-1 lg:col-start-1 lg:row-start-1" : "lg:order-2"}`}>
          <InViewGate>
            <div className="paper relative overflow-hidden rounded-xl p-4 sm:p-6">
              {/* Tape strip in the corner */}
              <span className={`tape ${reverse ? "right-3 -top-2" : "left-3 -top-2"}`} aria-hidden="true" />
              <div className="relative">{visual}</div>
              {finalReceipt && (
                <p key={`r-${persona}`} className="anim-fade mt-4 border-t hairline pt-3 font-mono text-[10px] tracking-wider ink-faint sm:text-[11px]">
                  {finalReceipt}
                </p>
              )}
            </div>
          </InViewGate>
        </div>
      </div>
    </section>
  );
};

export default LawSection;
