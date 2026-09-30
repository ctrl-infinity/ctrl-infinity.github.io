import { useEffect, useState } from 'react';
import { WorkCard, type WorkCardProps } from './WorkCard';
import { WorkFilter } from './WorkFilter';

interface WorkPageProps {
  projects: WorkCardProps[];
}

export function WorkPage({ projects }: WorkPageProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const categories = ['all', ...new Set(projects.map((project) => project.category))];
  const filtered = activeCategory === 'all' ? projects : projects.filter((project) => project.category === activeCategory);

  return (
    <section className="site-shell page-content">
      <header className="page-heading">
        <h1>Useful ideas.<br />Working systems.</h1>
        <p>Tools for developers. Systems for teams. A closer look at the problems, the decisions, and my part in making them work.</p>
      </header>
      <WorkFilter categories={categories} active={activeCategory} onChange={setActiveCategory} disabled={!ready} />
      <p className="work-count" role="status" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'project' : 'projects'}</p>
      <div className="work-gallery">
        {filtered.map((project) => <WorkCard key={project.slug ?? project.title} {...project} />)}
      </div>
    </section>
  );
}
