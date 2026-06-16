import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import TimelineItem from "./TimelineItem";
import { timelineEntries } from "../../lib/profile";

export default function TimelineSection() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeading>My Journey</SectionHeading>
      </motion.div>

      <div className="relative ml-4 border-l-2 border-gradient-to-b from-primary to-secondary md:ml-0 md:border-l-0">
        {/* Vertical gradient line for desktop */}
        <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-primary to-secondary shadow-[0_0_10px_var(--color-glow)] md:block" />
        {/* Vertical gradient line for mobile */}
        <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-primary to-secondary shadow-[0_0_10px_var(--color-glow)] md:hidden" />

        <div className="space-y-12">
          {timelineEntries.map((entry, index) => (
            <TimelineItem key={entry.phase} entry={entry} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
