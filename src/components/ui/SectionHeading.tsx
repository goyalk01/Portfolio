import { type ReactNode } from "react";

interface SectionHeadingProps {
  children: ReactNode;
  subtitle?: string;
}

export default function SectionHeading({ children, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-16 text-center">
      <h2 className="relative inline-block text-4xl font-bold text-text-primary md:text-5xl">
        {children}
        <span className="absolute -bottom-3 left-1/2 h-0.5 w-16 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary shadow-[0_0_10px_var(--color-glow)]" />
      </h2>
      {subtitle && (
        <p className="mx-auto mt-8 max-w-2xl text-lg text-text-muted">{subtitle}</p>
      )}
    </div>
  );
}
