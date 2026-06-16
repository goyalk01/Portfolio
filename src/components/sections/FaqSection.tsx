import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import FaqAccordionItem from "./FaqAccordionItem";
import { faqItems } from "../../lib/profile";

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeading>Frequently Asked Questions</SectionHeading>
      </motion.div>

      <div className="space-y-0">
        {faqItems.map((item, index) => (
          <FaqAccordionItem
            key={index}
            question={item.question}
            answer={item.answer}
            isActive={activeIndex === index}
            onToggle={() => toggle(index)}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
