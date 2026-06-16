import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import Card from "../ui/Card";
import { certifications } from "../../lib/profile";
import { Award, ShieldCheck, BadgeCheck } from "lucide-react";

const badgeIcons = {
  elite: Award,
  professional: ShieldCheck,
  verified: BadgeCheck,
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function CertificationsSection() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeading subtitle="Industry-recognized credentials from leading cloud and AI platforms.">
          Certifications
        </SectionHeading>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {certifications.map((cert) => {
          const BadgeIcon = badgeIcons[cert.badge ?? "verified"];
          return (
            <motion.div key={cert.title} variants={itemVariants}>
              <Card className="flex h-full items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20">
                  <BadgeIcon className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">
                    {cert.title}
                  </h3>
                  <p className="mt-1 text-sm text-text-muted">
                    {cert.issuer} &middot; {cert.year}
                  </p>
                  {cert.badge === "elite" && (
                    <span className="mt-2 inline-block rounded-full bg-primary/15 px-3 py-0.5 text-xs font-semibold text-primary">
                      Elite
                    </span>
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
