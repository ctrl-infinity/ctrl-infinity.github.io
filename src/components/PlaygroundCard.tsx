import { motion } from 'motion/react';

export interface PlaygroundCardProps {
  title: string;
  description: string;
  tags: string[];
  type: string;
  slug: string;
  link?: string;
}

const typeLabels: Record<string, string> = {
  interactive: '✦ Interactive',
  demo: '▶ Demo',
  snippet: '{ } Snippet',
  external: '↗ External',
};

export function PlaygroundCard({ title, description, tags, type, slug, link }: PlaygroundCardProps) {
  const href = type === 'external' && link ? link : `/playground/${slug}`;
  const isExternal = type === 'external';

  return (
    <motion.a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col gap-4 p-6 border border-black/5 hover:border-black/15 transition-colors duration-300 bg-white"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
          {typeLabels[type] || type}
        </span>
      </div>

      <h3 className="text-xl font-medium text-foreground group-hover:text-accent transition-colors duration-300">
        {title}
      </h3>

      <p className="text-sm text-gray-600 leading-relaxed">
        {description}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto pt-2">
        {tags.map((tag) => (
          <span key={tag} className="px-2 py-0.5 bg-black/5 text-xs text-foreground/70 font-mono">
            {tag}
          </span>
        ))}
      </div>
    </motion.a>
  );
}
