import { ReactNode } from "react";

interface AdminLabelProps {
  children: ReactNode;
  htmlFor?: string;
  className?: string;
}

export function AdminLabel({ children, htmlFor, className = "" }: AdminLabelProps) {
  return (
    <label 
      htmlFor={htmlFor}
      className={`block text-[10px] font-bold text-text-tertiary uppercase tracking-wider mb-1 ${className}`}
    >
      {children}
    </label>
  );
}
