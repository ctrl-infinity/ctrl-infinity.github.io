import { motion } from 'motion/react';

export interface WorkCardProps {
  title: string;
  description: string;
  role: string;
  category: string;
  tags: string[];
  image?: string;
  client?: string;
  duration?: string;
  slug?: string;
  hasDetail?: boolean;
}

export function WorkCard({ title, description, role, tags, image, client, duration, slug, hasDetail }: WorkCardProps) {
  const content = (
    <div className="bento-tile p-6 sm:p-8 rounded-[20px] flex flex-col gap-6 h-full transition-all duration-300">
      {image && (
        <div className="relative aspect-[16/9] overflow-hidden rounded-[12px] bg-gray-100">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
          />
        </div>
      )}

      <div className="flex flex-col gap-3">
        <div className="flex items-baseline gap-3">
          <h3 className="text-2xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors duration-300">
            {title}
          </h3>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-500">
          <span className="font-medium text-gray-700">{role}</span>
          {client && (
            <>
              <span className="text-gray-300">·</span>
              <span>{client}</span>
            </>
          )}
          {duration && (
            <>
              <span className="text-gray-300">·</span>
              <span className="font-mono text-xs text-gray-500">{duration}</span>
            </>
          )}
        </div>

        <p className="text-gray-600 leading-relaxed max-w-[65ch]">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="chip"
            >
              {tag}
            </span>
          ))}
        </div>

        {hasDetail && slug && (
          <span className="text-sm font-mono font-medium text-gray-600 group-hover:text-accent transition-colors duration-300 mt-2 inline-flex items-center gap-1">
            Read Case Study →
          </span>
        )}
      </div>
    </div>
  );

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group block"
    >
      {hasDetail && slug ? (
        <a href={`/work/${slug}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-[20px]">
          {content}
        </a>
      ) : (
        content
      )}
    </motion.article>
  );
}
