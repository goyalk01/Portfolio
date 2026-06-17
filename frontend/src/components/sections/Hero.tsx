import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Button from "../ui/Button";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-4 font-mono text-sm tracking-widest text-secondary"
        >
          HELLO, I&apos;M
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="gradient-text mb-6 text-6xl font-extrabold leading-tight tracking-tight md:text-8xl lg:text-9xl"
        >
          Krish Goyal
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mb-10 text-lg font-light tracking-[0.2em] text-text-muted md:text-xl"
        >
          Software Engineer &bull; AI/ML &bull; Cloud &bull; Systems
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Button to="/about">Explore My Journey</Button>
          <Button to="/projects" variant="outline">
            View Projects
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#welcome"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-10 z-10 animate-bounce text-text-muted transition-colors hover:text-secondary"
        aria-label="Scroll down"
      >
        <ArrowDown size={24} />
      </motion.a>
    </section>
  );
}
