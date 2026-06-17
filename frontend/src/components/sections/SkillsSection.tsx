import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import { skills, skillCategories } from "../../lib/profile";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
};

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeading subtitle="28+ technologies across AI, cloud, web, and systems. Click any skill to learn more.">
          Technical Arsenal
        </SectionHeading>
      </motion.div>

      {/* Category filters */}
      <div className="mb-10 flex flex-wrap justify-center gap-3">
        {skillCategories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`rounded-full border px-5 py-2 text-xs font-semibold tracking-wide transition-all duration-300 ${
              activeCategory === cat.key
                ? "border-primary bg-primary text-white shadow-[0_0_15px_var(--color-glow)]"
                : "border-border text-text-muted hover:border-primary/50 hover:text-text-primary"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        key={activeCategory}
      >
        {filteredSkills.map((skill) => (
          <motion.a
            key={skill.name}
            variants={itemVariants}
            whileHover={{ y: -4, scale: 1.05 }}
            href={`https://en.wikipedia.org/wiki/${skill.wikiSlug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card flex items-center justify-center rounded-lg px-4 py-5 text-center text-sm font-medium text-text-primary transition-all duration-300 hover:border-primary/50 hover:text-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.3),0_0_15px_var(--color-glow)]"
          >
            {skill.name}
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
