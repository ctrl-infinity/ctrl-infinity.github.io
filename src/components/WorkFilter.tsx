import { motion } from 'motion/react';

interface WorkFilterProps {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
}

const categoryLabels: Record<string, string> = {
  all: 'All',
  professional: 'Professional',
  'side-project': 'Side Project',
  'open-source': 'Open Source',
};

export function WorkFilter({ categories, active, onChange }: WorkFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${
            active === category
              ? 'text-foreground'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          {categoryLabels[category] || category}
          {active === category && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 bg-black/5 -z-10"
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
