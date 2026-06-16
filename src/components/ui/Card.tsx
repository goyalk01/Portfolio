import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -6, scale: 1.02 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`glass-card rounded-xl p-6 transition-shadow duration-300 ${
        hover ? "hover:border-primary/40 hover:shadow-[0_10px_40px_rgba(0,0,0,0.4),0_0_20px_var(--color-glow)]" : ""
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}
