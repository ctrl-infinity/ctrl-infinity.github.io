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
