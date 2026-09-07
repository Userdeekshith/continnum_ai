import clsx from 'clsx';
import { statusColors, statusLabels } from '../data/projectData';

export default function StatusBadge({ status, size = 'sm' }) {
  const color = statusColors[status] || '#8b9198';
  const label = statusLabels[status] || status;

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 font-mono uppercase tracking-wider',
        size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-1 text-xs',
      )}
      style={{ color, border: `1px solid ${color}` }}
    >
      <span className={clsx('rounded-full', size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2')} style={{ background: color }} />
      {label}
    </span>
  );
}

export function DemoBadge({ children = 'DEMO DATA' }) {
  return (
    <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-[var(--warn)] border border-[var(--warn)]">
      {children}
    </span>
  );
}

export function PrototypeBadge() {
  return (
    <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-[var(--accent)] border border-[var(--accent)]">
      Prototype
    </span>
  );
}
