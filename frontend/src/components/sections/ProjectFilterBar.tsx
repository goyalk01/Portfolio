import { projectCategories } from "../../lib/profile";

interface ProjectFilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function ProjectFilterBar({ activeFilter, onFilterChange }: ProjectFilterBarProps) {
  return (
    <div className="mb-12 flex flex-wrap justify-center gap-3">
      {projectCategories.map((cat) => (
        <button
          key={cat.key}
          onClick={() => onFilterChange(cat.key)}
          className={`rounded-full border px-6 py-2 text-sm font-medium transition-all duration-300 ${
            activeFilter === cat.key
              ? "border-primary bg-primary text-white shadow-[0_0_15px_var(--color-glow)]"
              : "border-border text-text-muted hover:border-primary/50 hover:text-text-primary"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
