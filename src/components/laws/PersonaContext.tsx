import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Persona = "cmo" | "marketer" | "founder" | "agency";

const STORAGE_KEY = "laws.persona";

interface Ctx {
  persona: Persona;
  setPersona: (p: Persona) => void;
}

const PersonaCtx = createContext<Ctx>({ persona: "marketer", setPersona: () => {} });

export const PersonaProvider = ({ children }: { children: ReactNode }) => {
  const [persona, setPersonaState] = useState<Persona>("marketer");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Persona | null;
      if (saved && ["cmo", "marketer", "founder", "agency"].includes(saved)) {
        setPersonaState(saved);
      }
    } catch {}
  }, []);

  const setPersona = (p: Persona) => {
    setPersonaState(p);
    try { localStorage.setItem(STORAGE_KEY, p); } catch {}
  };

  return <PersonaCtx.Provider value={{ persona, setPersona }}>{children}</PersonaCtx.Provider>;
};

export const usePersona = () => useContext(PersonaCtx);

export const PERSONA_LABEL: Record<Persona, string> = {
  cmo: "CMO",
  marketer: "marketer",
  founder: "founder",
  agency: "agency",
};
