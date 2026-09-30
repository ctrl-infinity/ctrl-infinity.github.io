import { ProjectVisual, type ProjectVisualKind } from './work/ProjectVisual';

export interface WorkCardProps {
  title: string;
  description: string;
  summary?: string;
  contribution?: string;
  outcome?: string;
  visual?: ProjectVisualKind;
  status?: 'production' | 'built' | 'experiment';
  role: string;
  category: string;
  tags: string[];
  image?: string;
  client?: string;
  duration?: string;
  slug?: string;
  hasDetail?: boolean;
}

export function WorkCard(project: WorkCardProps) {
  const href = project.hasDetail && project.slug ? `/work/${project.slug}` : undefined;
  const visual = project.visual
    ? <ProjectVisual kind={project.visual} compact />
    : project.image
      ? <img src={project.image} alt={project.title} loading="lazy" width="800" height="450" />
      : null;

  return (
    <article className="work-card editorial-card">
      {visual && (href ? <a href={href} aria-label={`Explore ${project.title}`}>{visual}</a> : visual)}
      <div className="project-story">
        <div className="metadata">
          {project.status && <span>{project.status === 'production' ? 'In production' : project.status === 'built' ? 'Built for the team' : 'Experiment'}</span>}
          {project.duration && <span>{project.duration}</span>}
        </div>
        <h2 className="project-title">{href ? <a href={href}>{project.title}</a> : project.title}</h2>
        <p>{project.summary ?? project.description}</p>
        <p className="project-outcome">{project.contribution ?? project.role}</p>
        <div className="metadata" aria-label="Technologies">{project.tags.slice(0, 3).join(' / ')}</div>
        {href && <a className="text-link" href={href}>Inside the project &rarr;</a>}
      </div>
    </article>
  );
}
