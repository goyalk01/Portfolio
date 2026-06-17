import { motion } from "framer-motion";
import Card from "../ui/Card";
import { ExternalLink } from "lucide-react";
import type { UIProject as Project } from "../../lib/profile";

interface ProjectCardProps {
  project: Project;
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div variants={itemVariants} layout>
      <Card className="flex h-full flex-col justify-between">
        <div>
          <h3 className="mb-3 text-xl font-semibold text-text-primary">
            {project.title}
          </h3>
          <p className="mb-5 text-sm leading-relaxed text-text-muted">
            {project.description}
          </p>
          <div className="mb-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-secondary transition-colors hover:text-white"
          >
            View on GitHub <ExternalLink size={14} />
          </a>
        )}
      </Card>
    </motion.div>
  );
}
