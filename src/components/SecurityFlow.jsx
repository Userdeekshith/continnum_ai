import { useState } from 'react';
import { securitySteps } from '../data/projectData';
import { PrototypeBadge } from './StatusBadge';

export default function SecurityFlow() {
  const [selected, setSelected] = useState(null);
  const step = securitySteps.find((s) => s.id === selected);

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="display text-2xl">Security architecture</h3>
        <PrototypeBadge />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="plate p-6">
          <div className="flex flex-col">
            {securitySteps.map((s, i) => (
              <div key={s.id}>
                <button
                  onClick={() => setSelected(selected === s.id ? null : s.id)}
                  className="w-full text-left px-4 py-3 border"
                  style={{
                    borderColor: selected === s.id ? 'var(--accent)' : 'var(--border-color)',
                  }}
                >
                  <span className="display tracking-wide">{s.label}</span>
                </button>
                {i < securitySteps.length - 1 && <div className="h-3 w-px bg-[var(--border-color)] ml-6" />}
              </div>
            ))}
          </div>
        </div>
        <div className="plate p-6">
          {step ? (
            <div>
              <h4 className="display text-xl mb-3">{step.label}</h4>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{step.description}</p>
              <p className="mt-4 text-xs text-[var(--warn)]">Planned. Owner: Sreenand. JWT and tenant-scoped PostgreSQL schemas.</p>
            </div>
          ) : (
            <p className="text-sm text-[var(--text-muted)]">Select a stage.</p>
          )}
        </div>
      </div>
    </div>
  );
}
