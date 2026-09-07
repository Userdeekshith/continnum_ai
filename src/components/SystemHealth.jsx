import { systemHealth, getOwner } from '../data/projectData';
import StatusBadge from './StatusBadge';

export default function SystemHealth({ compact = false }) {
  return (
    <div className="glass-card p-4">
      <h4 className="text-sm font-semibold mb-4 text-[var(--text-secondary)]">System Health</h4>
      <div className={`space-y-2 ${compact ? '' : 'max-h-[400px] overflow-y-auto'}`}>
        {systemHealth.map((item) => {
          const owner = getOwner(item.owner);
          return (
            <div
              key={item.name}
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-2 h-2 rounded-full ${item.status === 'operational' ? 'status-pulse' : ''}`}
                  style={{
                    background: item.status === 'operational' ? '#34d399' : item.status === 'prototype' ? '#22d3ee' : '#fbbf24',
                  }}
                />
                <span className="text-sm text-[var(--text-primary)]">{item.name}</span>
              </div>
              <div className="flex items-center gap-2">
                {owner && (
                  <span className="text-[10px] font-medium" style={{ color: owner.color }}>
                    {owner.name}
                  </span>
                )}
                <StatusBadge status={item.status} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
