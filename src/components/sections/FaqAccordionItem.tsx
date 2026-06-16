import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

interface FaqAccordionItemProps {
  question: string;
  answer: string;
  isActive: boolean;
  onToggle: () => void;
  index: number;
}

export default function FaqAccordionItem({
  question,
  answer,
  isActive,
  onToggle,
  index,
}: FaqAccordionItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="border-b border-border"
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-6 text-left"
      >
        <span className="pr-4 text-lg font-medium text-text-primary">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isActive ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 text-primary"
        >
          <Plus size={20} />
        </motion.span>
      </button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 leading-relaxed text-text-muted">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
