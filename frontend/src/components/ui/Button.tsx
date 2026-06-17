import { type ReactNode } from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  onClick?: () => void;
}

export default function Button({
  children,
  to,
  href,
  variant = "primary",
  className = "",
  onClick,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 font-semibold transition-all duration-300 text-sm tracking-wide";

  const variants = {
    primary:
      "bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-[0_0_30px_var(--color-glow)] hover:-translate-y-0.5",
    outline:
      "border border-primary text-primary hover:bg-primary hover:text-white hover:shadow-[0_0_25px_var(--color-glow)] hover:-translate-y-0.5",
    ghost:
      "text-secondary hover:text-white hover:bg-white/5",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
