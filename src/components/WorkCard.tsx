import { ProjectVisual, type ProjectVisualKind } from './work/ProjectVisual';
import { formatWorkStatus, type WorkStatus } from '../lib/work';

export interface WorkCardProps {
  title: string;
  description: string;
  summary?: string;
  contribution?: string;
  outcome?: string;
  evidence?: string;
  visual?: ProjectVisualKind;
  status?: WorkStatus;
  role: string;
  category: string;
  tags: string[];
  image?: string;
  client?: string;
  duration?: string;
  slug?: string;
  hasDetail?: boolean;
  featured?: boolean;
  earlier?: boolean;
  compact?: boolean;
}

export function WorkCard(project: WorkCardProps) {
  const href = project.hasDetail && project.slug ? `/work/${project.slug}` : undefined;
  const visual = project.visual
    ? <ProjectVisual kind={project.visual} compact />
    : project.image
      ? <img src={project.image} alt={project.title} loading="lazy" width="800" height="450" />
      : null;

  return (
    <article className={`work-card editorial-card${project.compact ? ' work-card--compact' : ''}`}>
      {visual && (href ? <a href={href}>{visual}</a> : visual)}
      <div className="project-story">
        <div className="metadata">
          {project.client && <span>{project.client}</span>}
          {project.status ? <span>{formatWorkStatus(project.status, project.duration)}</span> : project.duration && <span>{project.duration}</span>}
        </div>
        <h2 className="project-title">{href ? <a href={href}>{project.title}</a> : project.title}</h2>
        <p>{project.summary ?? project.description}</p>
        <p className="project-contribution">{project.contribution ?? project.role}</p>
        {project.outcome && <p className="project-outcome">{project.outcome}</p>}
        {project.evidence && <p className="project-evidence">{project.evidence}</p>}
        <div className="metadata" aria-label="Technologies">{project.tags.slice(0, 3).join(' / ')}</div>
        {href && <a className="text-link" href={href}>Inside the project &rarr;</a>}
      </div>
    </article>
  );
}
