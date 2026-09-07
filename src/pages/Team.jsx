import { Link } from 'react-router-dom';
import { teamMembers, getComponentById } from '../data/projectData';

export default function Team() {
  return (
    <div className="stage px-6 lg:px-16 py-12">
      <Link to="/" className="mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--accent)]">
        Back
      </Link>
      <h1 className="display text-5xl mt-6 mb-2">Continuum AI — ownership</h1>
      <p className="text-[var(--text-secondary)] mb-12">Workstreams from the project distribution document.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
        {Object.values(teamMembers).map((m) => (
          <article key={m.id} className="border-t border-[var(--border-color)] pt-4">
            <h2 className="display text-3xl" style={{ color: m.color }}>{m.name}</h2>
            <p className="mono text-sm mt-1 text-[var(--text-secondary)]">{m.workstream}</p>
            <ul className="mt-4 space-y-1">
              {m.components.map((id) => {
                const c = getComponentById(id);
                return (
                  <li key={id} className="text-sm text-[var(--text-primary)]">
                    {c?.shortName || id}
                    <span className="text-[var(--text-muted)]"> · {c?.technology?.slice(0, 3).join(', ')}</span>
                  </li>
                );
              })}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
