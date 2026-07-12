import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { WorkCard, type WorkCardProps } from './WorkCard';
import { WorkFilter } from './WorkFilter';

interface WorkPageProps {
  projects: WorkCardProps[];
}

export function WorkPage({ projects }: WorkPageProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', ...new Set(projects.map((p) => p.category))];

  const filtered =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section className="px-6 md:px-12 max-w-7xl mx-auto py-24">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
          Things I've Built
        </h1>
        <p className="text-gray-500 max-w-[50ch] mb-8">
          A mix of professional work, side projects, and open source.
        </p>
        <WorkFilter
          categories={categories}
          active={activeCategory}
          onChange={setActiveCategory}
        />
      </div>

      <div className="flex flex-col gap-16">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <WorkCard key={project.title} {...project} />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
