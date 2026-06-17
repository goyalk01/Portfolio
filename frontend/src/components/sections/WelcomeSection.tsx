import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import Card from "../ui/Card";
import { focusAreas } from "../../lib/profile";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function WelcomeSection() {
  return (
    <section id="welcome" className="mx-auto max-w-6xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeading subtitle="I'm Krish — a Computer Science student at VIT Bhopal building at the intersection of AI, Cloud, and Systems. I turn complex problems into intelligent, scalable solutions.">
          Welcome
        </SectionHeading>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mt-16 grid gap-8 md:grid-cols-3"
      >
        {focusAreas.map((area) => (
          <motion.div key={area.title} variants={itemVariants}>
            <Card className="text-center h-full">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20">
                <area.icon className="h-7 w-7 text-secondary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-text-primary">
                {area.title}
              </h3>
              <p className="text-sm leading-relaxed text-text-muted">
                {area.description}
              </p>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
