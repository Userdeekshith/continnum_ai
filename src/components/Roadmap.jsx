import { roadmapPhases, getOwner } from '../data/projectData';
import StatusBadge from './StatusBadge';

export default function Roadmap() {
  return (
    <div className="space-y-0">
      {roadmapPhases.map((phase) => (
        <article key={phase.phase} className="flex gap-6 border-t border-[var(--border-color)] py-6">
          <p className="display text-4xl text-[var(--accent)] w-12 shrink-0">{String(phase.phase).padStart(2, '0')}</p>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="display text-2xl">{phase.title}</h3>
              <StatusBadge status={phase.status} />
            </div>
            <p className="text-sm text-[var(--text-secondary)] mb-3">{phase.description}</p>
            <div className="flex flex-wrap gap-3">
              {phase.owners.map((ownerId) => {
                const owner = getOwner(ownerId);
                if (!owner) return null;
                return (
                  <span key={ownerId} className="mono text-xs" style={{ color: owner.color }}>
                    {owner.name}
                  </span>
                );
              })}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
