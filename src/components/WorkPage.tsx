import { useEffect, useState } from 'react';
import { WorkCard, type WorkCardProps } from './WorkCard';
import { WorkFilter } from './WorkFilter';
import { partitionWork } from '../lib/work';

interface WorkPageProps {
  projects: WorkCardProps[];
  earlierLinks: Array<{ title: string; href: string }>;
}

export function WorkPage({ projects, earlierLinks }: WorkPageProps) {
  const [activeCategory, setActiveCategory] = useState('professional');
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const categories = ['all', 'professional', 'side-project', 'open-source'];
  const groups = partitionWork(projects, activeCategory);
  const links = activeCategory === 'all' ? earlierLinks : [];

  return (
    <section className="site-shell page-content">
      <header className="page-heading">
        <h1>Useful ideas.<br />Working systems.</h1>
        <p>Tools for developers. Systems for teams. A closer look at the problems, the decisions, and my part in making them work.</p>
      </header>
      <WorkFilter categories={categories} active={activeCategory} onChange={setActiveCategory} disabled={!ready} />
      <p className="work-count" role="status" aria-live="polite" aria-atomic="true">{groups.count} {groups.count === 1 ? 'project' : 'projects'}</p>
      {groups.count === 0 && <p>No projects in this category.</p>}
      {groups.featured.length > 0 && <div className="work-gallery work-featured">
        {groups.featured.map((project) => <WorkCard key={project.slug ?? project.title} {...project} />)}
      </div>}
      {groups.remaining.length > 0 && <div className="work-gallery work-remaining">
        {groups.remaining.map((project) => <WorkCard key={project.slug ?? project.title} {...project} compact />)}
      </div>}
      {(groups.earlier.length > 0 || links.length > 0) && <details className="earlier-work" key={activeCategory}>
        <summary>Earlier / academic ({groups.earlier.length})</summary>
        <div className="work-gallery">
          {groups.earlier.map((project) => <WorkCard key={project.slug ?? project.title} {...project} compact />)}
        </div>
        {links.length > 0 && <p className="earlier-links">Also on GitHub: {links.map(link => (
          <a key={link.href} className="text-link" href={link.href} target="_blank" rel="noopener noreferrer">{link.title} &nearr;</a>
        ))}</p>}
      </details>}
    </section>
  );
}
