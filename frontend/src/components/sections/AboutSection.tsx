import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import { GraduationCap, Award, Briefcase } from "lucide-react";

const highlights = [
  { icon: GraduationCap, label: "B.Tech CSE", sub: "VIT Bhopal (2024–2028)" },
  { icon: Award, label: "Top 3% GSSoC", sub: "Open Source Contributor" },
  { icon: Briefcase, label: "Google Cloud", sub: "GenAI Virtual Intern" },
];

export default function AboutSection() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeading>About Me</SectionHeading>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="space-y-6"
      >
        <p className="text-center text-lg leading-relaxed text-text-muted">
          I&apos;m{" "}
          <span className="font-semibold text-white">Krish Goyal</span>, a curious
          B.Tech Computer Science student at{" "}
          <span className="font-semibold text-secondary">VIT Bhopal University</span>,
          passionate about building intelligent systems and practical software solutions.
          Rather than focusing on a single specialization, I actively explore multiple domains including
          AI/ML, cloud computing, cybersecurity, and full-stack development.
        </p>
        <p className="text-center text-lg leading-relaxed text-text-muted">
          I thrive on hands-on experimentation. From a{" "}
          <span className="font-semibold text-secondary">Google Cloud GenAI Internship</span>{" "}
          to ranking in the{" "}
          <span className="font-semibold text-secondary">Top 3% of GSSoC '26</span> and leading a team to the{" "}
          <span className="font-semibold text-secondary">Top 45 at Smart India Hackathon</span>,
          I believe in learning by building real systems.
        </p>
      </motion.div>

      {/* Quick highlights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="mt-14 grid gap-6 sm:grid-cols-3"
      >
        {highlights.map((h) => (
          <div
            key={h.label}
            className="glass-card flex flex-col items-center rounded-xl p-6 text-center"
          >
            <h.icon className="mb-3 h-8 w-8 text-secondary" />
            <span className="text-lg font-semibold text-text-primary">{h.label}</span>
            <span className="mt-1 text-sm text-text-muted">{h.sub}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
