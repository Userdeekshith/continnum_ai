import { useState } from 'react';
import { Search } from 'lucide-react';
import { components, getOwner } from '../data/projectData';
import StatusBadge from '../components/StatusBadge';
import { useApp } from '../context/AppContext';

export default function ComponentsPage() {
  const [search, setSearch] = useState('');
  const { setSelectedComponent } = useApp();

  const filtered = components.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.shortName.toLowerCase().includes(search.toLowerCase()) ||
      c.technology.some((t) => t.toLowerCase().includes(search.toLowerCase())),
  );

  return (
    <div className="px-6 lg:px-16 py-8">
      <h1 className="display text-4xl">Components</h1>
      <p className="text-sm text-[var(--text-muted)] mt-1 mb-6">{components.length} subsystems</p>

      <div className="relative max-w-md mb-8">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="w-full pl-9 pr-4 py-2 bg-[var(--bg-elevated)] border border-[var(--border-color)] text-sm"
        />
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="mono text-[10px] uppercase tracking-wider text-[var(--text-muted)] border-b border-[var(--border-color)]">
            <th className="py-2 font-normal">Name</th>
            <th className="py-2 font-normal">Layer</th>
            <th className="py-2 font-normal">Owner</th>
            <th className="py-2 font-normal">Status</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((comp) => {
            const owner = getOwner(comp.owner);
            return (
              <tr
                key={comp.id}
                onClick={() => setSelectedComponent(comp.id)}
                className="border-b border-[var(--border-color)] cursor-pointer hover:bg-[var(--bg-elevated)]"
              >
                <td className="py-3 display">{comp.shortName}</td>
                <td className="py-3 mono text-xs text-[var(--text-muted)]">{comp.layer}</td>
                <td className="py-3 text-sm" style={{ color: owner?.color }}>{owner?.name || '—'}</td>
                <td className="py-3"><StatusBadge status={comp.status} /></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
