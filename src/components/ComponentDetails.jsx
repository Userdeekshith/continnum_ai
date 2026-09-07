import { useNavigate } from 'react-router-dom';
import { getComponentById, getOwner } from '../data/projectData';
import StatusBadge from './StatusBadge';

export default function ComponentDetails({ componentId, onClose, docked = false }) {
  const component = getComponentById(componentId);
  const navigate = useNavigate();
  if (!component) return null;

  const owner = getOwner(component.owner);

  const body = (
    <aside className="h-full overflow-y-auto plate border-l border-[var(--border-color)] bg-[var(--bg-elevated)]">
      <div className="flex items-start justify-between p-5 border-b border-[var(--border-color)]">
        <div>
          <p className="mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-1">Component</p>
          <h2 className="display text-2xl text-[var(--text-primary)]">{component.name}</h2>
        </div>
        <button onClick={onClose} className="mono text-xs uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--accent)]">
          Close
        </button>
      </div>

      <div className="p-5 space-y-6">
        {owner && (
          <div>
            <p className="mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">Owner</p>
            <p className="display text-xl mt-1" style={{ color: owner.color }}>{owner.name}</p>
            <p className="text-sm text-[var(--text-secondary)]">{owner.workstream}</p>
          </div>
        )}

        <StatusBadge status={component.status} size="md" />

        <div>
          <p className="mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-2">Technology</p>
          <div className="flex flex-wrap gap-1.5">
            {component.technology.map((tech) => (
              <span key={tech} className="mono text-[11px] px-2 py-1 border border-[var(--border-color)] text-[var(--text-secondary)]">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-2">Purpose</p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{component.purpose}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-2">Inputs</p>
            <ul className="space-y-1">
              {component.inputs.map((input) => (
                <li key={input} className="text-xs text-[var(--text-secondary)]">{input}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-2">Outputs</p>
            <ul className="space-y-1">
              {component.outputs.map((output) => (
                <li key={output} className="text-xs text-[var(--text-secondary)]">{output}</li>
              ))}
            </ul>
          </div>
        </div>

        {component.dependencies.length > 0 && (
          <div>
            <p className="mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-2">Dependencies</p>
            <div className="flex flex-wrap gap-1.5">
              {component.dependencies.map((depId) => {
                const dep = getComponentById(depId);
                return (
                  <span key={depId} className="mono text-[11px] px-2 py-1 border border-[var(--border-color)]">
                    {dep?.shortName || depId}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        <div>
          <p className="mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-2">Planned implementation</p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed border border-[var(--border-color)] p-3">
            {component.implementation}
          </p>
        </div>

        {!docked && (
          <button
            onClick={() => {
              onClose();
              navigate('/architecture');
            }}
            className="mono text-xs uppercase tracking-wider text-[var(--accent)] border-b border-[var(--accent)]"
          >
            Open on architecture plot
          </button>
        )}
      </div>
    </aside>
  );

  if (docked) {
    return <div className="w-full max-w-md h-full shrink-0">{body}</div>;
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-[var(--bg-primary)]/70" />
      <div className="relative w-full max-w-md h-full" onClick={(e) => e.stopPropagation()}>
        {body}
      </div>
    </div>
  );
}
