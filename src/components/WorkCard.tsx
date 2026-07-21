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
    <>
      {image && (
        <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
          />
        </div>
      )}

      <div className="flex flex-col gap-3">
        <div className="flex items-baseline gap-3">
          <h3 className="text-2xl font-medium tracking-tight text-foreground group-hover:text-accent transition-colors duration-300">
            {title}
          </h3>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-500">
          <span>{role}</span>
          {client && (
            <>
              <span className="text-gray-300">·</span>
              <span>{client}</span>
            </>
          )}
          {duration && (
            <>
              <span className="text-gray-300">·</span>
              <span className="font-mono text-xs">{duration}</span>
            </>
          )}
        </div>

        <p className="text-gray-600 leading-relaxed max-w-[60ch]">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-black/5 text-xs text-foreground/80 font-mono"
            >
              {tag}
            </span>
          ))}
        </div>

        {hasDetail && slug && (
          <span className="text-sm font-mono text-gray-400 group-hover:text-accent transition-colors duration-300 mt-1">
            Case study →
          </span>
        )}
      </div>
    </>
  );

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col gap-6"
    >
      {hasDetail && slug ? (
        <a href={`/work/${slug}`} className="flex flex-col gap-6">
          {content}
        </a>
      ) : (
        content
      )}
    </motion.article>
  );
}
