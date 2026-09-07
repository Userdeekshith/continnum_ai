import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { kpiData, chartData, activityTimeline } from '../data/projectData';
import { DemoBadge } from './StatusBadge';
import { Activity, Zap, Users, CheckCircle } from 'lucide-react';

const kpiIcons = { Activity, Zap, Users, CheckCircle };

export default function Analytics({ compact = false }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold">System Performance</h3>
        <DemoBadge />
      </div>

      <div className={`grid gap-4 ${compact ? 'grid-cols-2' : 'grid-cols-2 lg:grid-cols-4'}`}>
        {kpiData.map((kpi) => {
          const Icon = kpiIcons[kpi.icon] || Activity;
          return (
            <div key={kpi.label} className="glass-card p-4">
              <div className="flex items-center justify-between mb-2">
                <Icon size={18} className="text-cyan-400" />
                <span className="text-xs text-emerald-400 font-mono">{kpi.change}</span>
              </div>
              <p className="text-2xl font-bold text-[var(--text-primary)]">{kpi.value}</p>
              <p className="text-xs text-[var(--text-muted)] mt-1">{kpi.label}</p>
            </div>
          );
        })}
      </div>

      <div className={`grid gap-6 ${compact ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
        <div className="glass-card p-4">
          <h4 className="text-sm font-semibold mb-4 text-[var(--text-secondary)]">API Requests & Latency</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData.line}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="time" tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, fontSize: 12 }}
              />
              <Line type="monotone" dataKey="requests" stroke="#22d3ee" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="latency" stroke="#a78bfa" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-4">
          <h4 className="text-sm font-semibold mb-4 text-[var(--text-secondary)]">Service Uptime</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData.bar}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="service" tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis domain={[95, 100]} tick={{ fill: '#64748b', fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, fontSize: 12 }}
              />
              <Bar dataKey="uptime" fill="#34d399" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-4">
          <h4 className="text-sm font-semibold mb-4 text-[var(--text-secondary)]">Delivery Status Distribution</h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={chartData.donut}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name} ${value}%`}
              >
                {chartData.donut.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, fontSize: 12 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export function ActivityTimeline() {
  const typeColors = { route: '#22d3ee', risk: '#a78bfa', nlp: '#fbbf24', telemetry: '#fb7185', rl: '#60a5fa', data: '#34d399' };

  return (
    <div className="glass-card p-4">
      <h4 className="text-sm font-semibold mb-4 text-[var(--text-secondary)]">Activity Timeline</h4>
      <div className="space-y-3">
        {activityTimeline.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: typeColors[item.type] || '#94a3b8' }} />
            <div>
              <p className="text-sm text-[var(--text-secondary)]">{item.event}</p>
              <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
