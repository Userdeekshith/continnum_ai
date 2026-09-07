import { teamMembers, getComponentById } from '../data/projectData';

export default function TeamOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Object.values(teamMembers).map((member) => (
        <div
          key={member.id}
          className="glass-card p-5 hover:scale-[1.02] transition-transform duration-300"
          style={{ borderColor: `${member.color}30` }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold"
              style={{ background: `${member.color}25`, color: member.color }}
            >
              {member.avatar}
            </div>
            <div>
              <h3 className="font-bold text-[var(--text-primary)]" style={{ color: member.color }}>
                {member.name}
              </h3>
              <p className="text-xs text-[var(--text-muted)]">{member.role}</p>
            </div>
          </div>

          <div className="space-y-1.5">
            <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-2">Owns</p>
            {member.components.map((compId) => {
              const comp = getComponentById(compId);
              return (
                <div
                  key={compId}
                  className="flex items-center gap-2 pl-3 py-1.5 rounded-md text-sm border-l-2"
                  style={{ borderColor: member.color, background: `${member.color}08` }}
                >
                  <span className="text-[var(--text-secondary)]">{comp?.shortName || compId}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
