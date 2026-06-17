import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import { achievements } from "../../lib/profile";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function AchievementsSection() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeading subtitle="Numbers that reflect the hustle.">
          Achievements
        </SectionHeading>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
      >
        {achievements.map((item) => (
          <motion.div
            key={item.label}
            variants={itemVariants}
            whileHover={{ y: -6, scale: 1.03 }}
            className="glass-card rounded-xl p-8 text-center transition-shadow duration-300 hover:border-primary/40 hover:shadow-[0_10px_40px_rgba(0,0,0,0.4),0_0_20px_var(--color-glow)]"
          >
            <span className="gradient-text block text-4xl font-extrabold md:text-5xl">
              {item.metric}
            </span>
            <h3 className="mt-3 text-lg font-semibold text-text-primary">
              {item.label}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              {item.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
