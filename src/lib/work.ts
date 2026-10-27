export const WORK_STATUSES = ['production', 'built', 'experiment', 'active-use', 'uat'] as const;
export type WorkStatus = (typeof WORK_STATUSES)[number];

const statusLabels: Record<WorkStatus, string> = {
  production: 'In production',
  built: 'Built for the team',
  experiment: 'Experiment',
  'active-use': 'Active team use',
  uat: 'In UAT',
};

export function formatWorkStatus(status: WorkStatus, duration?: string): string {
  const label = statusLabels[status];
  if (!duration) return label;
  return status === 'active-use' || status === 'uat'
    ? `${label} since ${duration}`
    : `${label} (${duration})`;
}

export function partitionWork<T extends { category: string; featured?: boolean; earlier?: boolean }>(
  projects: T[],
  category: string,
): { featured: T[]; remaining: T[]; earlier: T[]; count: number } {
  const result: { featured: T[]; remaining: T[]; earlier: T[]; count: number } = {
    featured: [], remaining: [], earlier: [], count: 0,
  };
  for (const project of projects) {
    if (category !== 'all' && project.category !== category) continue;
    result.count++;
    if (project.earlier) result.earlier.push(project);
    else if (project.featured) result.featured.push(project);
    else result.remaining.push(project);
  }
  return result;
}
