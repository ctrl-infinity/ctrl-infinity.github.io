interface WorkFilterProps {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
  disabled: boolean;
}

const categoryLabels: Record<string, string> = {
  all: 'All work',
  professional: 'Professional',
  'side-project': 'Side projects',
  'open-source': 'Open source',
};

export function WorkFilter({ categories, active, onChange, disabled }: WorkFilterProps) {
  return (
    <div className="work-filters" role="group" aria-label="Filter projects by category">
      {categories.map((category) => (
        <button key={category} type="button" disabled={disabled} aria-pressed={active === category} onClick={() => onChange(category)}>
          {categoryLabels[category] ?? category}
        </button>
      ))}
    </div>
  );
}
