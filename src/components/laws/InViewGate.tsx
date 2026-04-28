import type { ReactNode } from "react";
import { useInView } from "@/hooks/use-in-view";

interface InViewGateProps {
  children: ReactNode;
  className?: string;
}

const InViewGate = ({ children, className = "" }: InViewGateProps) => {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={`scene-gate ${inView ? "is-active" : ""} ${className}`}>
      {children}
    </div>
  );
};

export default InViewGate;
