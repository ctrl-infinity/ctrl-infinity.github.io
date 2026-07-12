import { motion } from 'motion/react';

export interface NowEntryProps {
  title: string;
  description: string;
  tags: string[];
  startDate?: string;
  link?: string;
}

export function NowEntry({ title, description, tags, startDate, link }: NowEntryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-2 py-6"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-lg font-medium text-foreground">
          {link ? (
            <a href={link} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors duration-300">
              {title} ↗
            </a>
          ) : (
            title
          )}
        </h3>
        {startDate && (
          <span className="text-xs font-mono text-gray-400 shrink-0">
            {startDate}
          </span>
        )}
      </div>

      <p className="text-gray-600 leading-relaxed max-w-[60ch]">
        {description}
      </p>

      <div className="flex flex-wrap gap-2 mt-1">
        {tags.map((tag) => (
          <span key={tag} className="px-2 py-0.5 bg-black/5 text-xs text-foreground/70 font-mono">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
