import { motion } from "framer-motion";
import type { TimelineEntry } from "../../lib/profile";

interface TimelineItemProps {
  entry: TimelineEntry;
  index: number;
}

export default function TimelineItem({ entry, index }: TimelineItemProps) {
  const isEven = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? 40 : -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative pl-8 md:pl-0 md:w-1/2 ${
        isEven ? "md:ml-auto md:pl-12" : "md:pr-12"
      }`}
    >
      {/* Desktop dot */}
      <div
        className={`absolute top-6 hidden h-4 w-4 rounded-full border-[3px] border-primary bg-dark md:block ${
          isEven ? "md:-left-2" : "md:left-auto md:-right-2"
        }`}
        style={{ transform: "translateX(-50%)" }}
      />
      {/* Mobile dot */}
      <div className="absolute left-0 top-6 h-4 w-4 -translate-x-1/2 rounded-full border-[3px] border-primary bg-dark md:hidden" />

      <div className="glass-card rounded-xl p-6">
        <span className="mb-2 block font-mono text-xs font-semibold tracking-wider text-primary">
          {entry.phase}
        </span>
        <h4 className="mb-2 text-lg font-semibold text-text-primary">
          {entry.title}
        </h4>
        <p className="text-sm leading-relaxed text-text-muted">
          {entry.description}
        </p>
      </div>
    </motion.div>
  );
}
