import { type ReactNode } from "react";
import { Heading } from "@/components/ui/Heading";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-bg-secondary p-8 rounded-3xl border border-border-secondary shadow-xl">
        <div className="text-center">
          <Heading size="xl">{title}</Heading>
          {subtitle && (
            <p className="mt-2 text-sm text-text-tertiary">
              {subtitle}
            </p>
          )}
        </div>
        
        {children}
      </div>
    </div>
  );
};
