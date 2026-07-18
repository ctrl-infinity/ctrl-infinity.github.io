import { NowEntry, type NowEntryProps } from './NowEntry';

interface NowGroupProps {
  status: string;
  entries: NowEntryProps[];
}

const statusConfig: Record<string, { icon: string; label: string }> = {
  active: { icon: '⚡', label: 'Currently Active' },
  exploring: { icon: '🔭', label: 'Exploring' },
  paused: { icon: '💤', label: 'Paused' },
};

export function NowGroup({ status, entries }: NowGroupProps) {
  if (entries.length === 0) return null;

  const config = statusConfig[status] || { icon: '•', label: status };

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-2 pb-4 border-b border-black/10">
        <span className="text-lg">{config.icon}</span>
        <h2 className="text-sm font-mono uppercase tracking-[0.15em] text-gray-500">
          {config.label}
        </h2>
      </div>

      <div className="flex flex-col divide-y divide-black/5">
        {entries.map((entry) => (
          <NowEntry key={entry.title} {...entry} />
        ))}
      </div>
    </div>
  );
}
