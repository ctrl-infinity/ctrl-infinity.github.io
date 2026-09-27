export type ProjectVisualKind = 'review' | 'workflow' | 'orchestration' | 'retrieval';

interface Props {
  kind: ProjectVisualKind;
  compact?: boolean;
}

const flows = {
  workflow: {
    caption: 'Conceptual workflow',
    steps: ['Refined story', 'Coding workflow', 'Pull request'],
    notes: ['Small, defined task', 'Implementation', 'For developer review'],
    conclusion: 'Automate the repetitive part. Make room for human judgment.',
  },
  retrieval: {
    caption: 'Conceptual retrieval pipeline',
    steps: ['Question', 'Relevant context', 'Grounded answer'],
    notes: ['Technical query', 'Custom document index', 'Prompt orchestration'],
    conclusion: 'Connect a question to the documentation that can answer it.',
  },
};

export function ProjectVisual({ kind, compact = false }: Props) {
  if (kind === 'review') {
    return (
      <figure className={`project-visual conversation ${compact ? 'visual-compact' : ''}`}>
        <figcaption>Illustrative exchange <span>Not a real PR</span></figcaption>
        <div className="exchange">
          <span className="speaker">Review agent</span>
          <p>This retry could create a duplicate payment if the response to a successful request was lost.</p>
        </div>
        <div className="exchange">
          <span className="speaker">Developer</span>
          <p>Could we reuse the same idempotency key for every attempt?</p>
        </div>
        <div className="exchange">
          <span className="speaker">Review agent</span>
          <p>Yes, if the API guarantees deduplication. Generate the key once per payment and test the timeout-retry case.</p>
        </div>
      </figure>
    );
  }

  if (kind === 'orchestration') {
    return (
      <figure className={`project-visual system-visual ${compact ? 'visual-compact' : ''}`}>
        <figcaption>Conceptual architecture <span>Agent2Agent protocol</span></figcaption>
        <div className="agent-map">
          <div className="system-node">Client<small>AG-UI stream</small></div>
          <span className="flow-arrow" aria-hidden="true">&rarr;</span>
          <div className="system-node system-hub">Orchestrator<small>Discover / route</small></div>
          <span className="flow-arrow" aria-hidden="true">&rarr;</span>
          <div className="domain-agents">
            <div className="system-node">Domain agent A</div>
            <div className="system-node">Domain agent B</div>
            <div className="system-node system-new">New domain agent</div>
          </div>
        </div>
        <p className="visual-note">Different teams. One protocol. No hardcoded handoffs.</p>
      </figure>
    );
  }

  const flow = flows[kind];
  return (
    <figure className={`project-visual flow-visual ${compact ? 'visual-compact' : ''}`}>
      <figcaption>{flow.caption}</figcaption>
      <ol className="workflow-steps">
        {flow.steps.map((step, index) => (
          <li key={step}>
            <span className="step-marker" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <strong>{step}</strong>
            <small>{flow.notes[index]}</small>
          </li>
        ))}
      </ol>
      <p className="visual-note">{flow.conclusion}</p>
    </figure>
  );
}
