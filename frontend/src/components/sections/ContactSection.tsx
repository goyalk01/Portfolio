import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import { Mail, Linkedin, Github, Code } from "lucide-react";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "krishaggarwal1452@gmail.com",
    href: "mailto:krishaggarwal1452@gmail.com",
    external: false,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/krish-goyal-b58a31320",
    href: "https://www.linkedin.com/in/krish-goyal-b58a31320",
    external: true,
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/goyalk01",
    href: "https://github.com/goyalk01",
    external: true,
  },
  {
    icon: Code,
    label: "LeetCode",
    value: "leetcode.com/u/Goyalk",
    href: "https://leetcode.com/u/Goyalk",
    external: true,
  },
];

export default function ContactSection() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeading subtitle="Looking for an ambitious intern or collaborator? Whether it's AI/ML, cloud architecture, or full-stack development — let's build something impactful together.">
          Let&apos;s Connect
        </SectionHeading>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="glass-card mx-auto max-w-lg rounded-2xl p-10"
      >
        <h3 className="mb-2 text-center text-2xl font-semibold text-text-primary">
          Get In Touch
        </h3>
        <p className="mb-8 text-center text-text-muted">
          Open to internships, collaborations, and interesting conversations.
        </p>

        <div className="flex flex-col gap-4">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="glass-card flex items-center gap-4 rounded-xl px-6 py-4 text-text-primary transition-all duration-300 hover:border-secondary/50 hover:bg-white/5 hover:text-white"
            >
              <link.icon size={20} className="shrink-0 text-secondary" />
              <div className="flex flex-col">
                <span className="text-xs font-medium uppercase tracking-wider text-text-muted">
                  {link.label}
                </span>
                <span className="font-medium">{link.value}</span>
              </div>
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
