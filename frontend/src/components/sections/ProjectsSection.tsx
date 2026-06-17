import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import ProjectFilterBar from "./ProjectFilterBar";
import ProjectCard from "./ProjectCard";
import { projects } from "../../lib/profile";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeading subtitle="6+ projects spanning AI/ML, GenAI, cybersecurity, and systems — built to solve real problems, not just assignments.">
          Projects &amp; Builds
        </SectionHeading>
      </motion.div>

      <ProjectFilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-8 sm:grid-cols-2"
        key={activeFilter}
      >
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>
    </section>
  );
}
