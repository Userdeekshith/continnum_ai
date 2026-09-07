import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LogIn, LayoutDashboard, Radio, AlertTriangle, Route, User, Settings, FileText, Shield,
  Truck, MapPin, Activity, Bell, ChevronRight, Loader2,
} from 'lucide-react';
import { PrototypeBadge } from './StatusBadge';

const screens = [
  { id: 'login', label: 'Login', icon: LogIn },
  { id: 'dashboard', label: 'Operations Dashboard', icon: LayoutDashboard },
  { id: 'telemetry', label: 'Live Fleet', icon: Radio },
  { id: 'disruptions', label: 'Disruption Inbox', icon: AlertTriangle },
  { id: 'routes', label: 'Route Optimization', icon: Route },
  { id: 'profile', label: 'User Profile', icon: User },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'admin', label: 'Administration', icon: Shield },
];

function LoginScreen({ onNavigate }) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="w-full max-w-sm glass-card p-8">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold gradient-text">Continuum AI</h2>
          <p className="text-xs text-[var(--text-muted)] mt-1">Control Tower Login</p>
          <div className="mt-2"><PrototypeBadge /></div>
        </div>
        <div className="space-y-4">
          <input placeholder="Email" className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]" />
          <input type="password" placeholder="Password" className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]" />
          <button
            onClick={() => onNavigate('dashboard')}
            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

function DashboardScreen() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'System Health', value: '94.2%', icon: Activity, color: '#34d399' },
          { label: 'Active Fleets', value: '47', icon: Truck, color: '#22d3ee' },
          { label: 'Disruptions', value: '3', icon: AlertTriangle, color: '#fbbf24' },
          { label: 'Routes Optimized', value: '128', icon: Route, color: '#a78bfa' },
        ].map((kpi) => (
          <div key={kpi.label} className="glass-card p-4">
            <kpi.icon size={18} style={{ color: kpi.color }} />
            <p className="text-xl font-bold mt-2">{kpi.value}</p>
            <p className="text-xs text-[var(--text-muted)]">{kpi.label}</p>
          </div>
        ))}
      </div>
      <div className="glass-card p-4 h-48 flex items-center justify-center">
        <div className="text-center">
          <MapPin size={32} className="text-cyan-400 mx-auto mb-2" />
          <p className="text-sm text-[var(--text-muted)]">Live fleet map visualization</p>
          <p className="text-xs text-[var(--text-muted)] mt-1">Planned for integration phase</p>
        </div>
      </div>
    </div>
  );
}

function TelemetryScreen() {
  const vehicles = [
    { id: 'VH-001', route: 'Dubai → Mumbai', status: 'In Transit', speed: '62 km/h' },
    { id: 'VH-002', route: 'London → Dubai', status: 'Loading', speed: '0 km/h' },
    { id: 'VH-003', route: 'Singapore → NYC', status: 'In Transit', speed: '45 km/h' },
    { id: 'VH-004', route: 'Mumbai → Singapore', status: 'Signal Drop', speed: '—' },
  ];
  return (
    <div className="space-y-2">
      {vehicles.map((v) => (
        <div key={v.id} className="glass-card p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Truck size={16} className="text-cyan-400" />
            <div>
              <p className="text-sm font-semibold">{v.id}</p>
              <p className="text-xs text-[var(--text-muted)]">{v.route}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium" style={{ color: v.status === 'Signal Drop' ? '#fb7185' : '#34d399' }}>{v.status}</p>
            <p className="text-[10px] text-[var(--text-muted)]">{v.speed}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function DisruptionsScreen() {
  const alerts = [
    { title: 'Port congestion at Mumbai', severity: 'high', time: '12 min ago' },
    { title: 'Weather alert: Arabian Sea', severity: 'medium', time: '45 min ago' },
    { title: 'Customs delay at Singapore', severity: 'low', time: '2 hr ago' },
  ];
  const colors = { high: '#fb7185', medium: '#fbbf24', low: '#60a5fa' };
  return (
    <div className="space-y-2">
      {alerts.map((a) => (
        <div key={a.title} className="glass-card p-3 flex items-center gap-3">
          <Bell size={16} style={{ color: colors[a.severity] }} />
          <div className="flex-1">
            <p className="text-sm font-medium">{a.title}</p>
            <p className="text-[10px] text-[var(--text-muted)]">{a.time}</p>
          </div>
          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded" style={{ color: colors[a.severity], background: `${colors[a.severity]}20` }}>
            {a.severity}
          </span>
        </div>
      ))}
    </div>
  );
}

function RoutesScreen() {
  const [generating, setGenerating] = useState(false);
  const [done, setDone] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setDone(false);
    setTimeout(() => {
      setGenerating(false);
      setDone(true);
    }, 3000);
  };

  return (
    <div className="glass-card p-6 text-center">
      <Route size={32} className="text-violet-400 mx-auto mb-4" />
      <h3 className="font-semibold mb-2">Route Optimization</h3>
      <p className="text-sm text-[var(--text-muted)] mb-4">Dubai → Singapore via DDPG agent</p>
      {!generating && !done && (
        <button
          onClick={handleGenerate}
          className="px-6 py-2.5 rounded-lg bg-violet-500/20 text-violet-400 border border-violet-500/30 hover:bg-violet-500/30 transition-colors text-sm font-semibold"
        >
          Generate Optimized Route
        </button>
      )}
      {generating && (
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={24} className="text-violet-400 animate-spin" />
          <p className="text-sm text-violet-300">Generating report...</p>
          <div className="w-48 h-1.5 rounded-full bg-slate-700 overflow-hidden">
            <motion.div
              className="h-full bg-violet-400 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 3 }}
            />
          </div>
        </div>
      )}
      {done && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          <p className="text-sm text-emerald-400 font-semibold">Route optimized — Confidence 94.2%</p>
          <p className="text-xs text-[var(--text-muted)]">Dubai → Mumbai → Singapore · 42ms latency</p>
          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 mt-4">
            <p className="text-xs text-amber-400">
              Demo Mode: This functionality will be implemented during the integration phase.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function ProfileScreen() {
  return (
    <div className="glass-card p-6 max-w-sm mx-auto text-center">
      <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xl font-bold mx-auto mb-3">SC</div>
      <h3 className="font-bold">Supply Chain Director</h3>
      <p className="text-sm text-[var(--text-muted)]">director@continuum.ai</p>
      <div className="mt-4 space-y-2 text-left">
        {['Global Operations', 'Financial Risk Tracking', 'Optimization Log'].map((r) => (
          <div key={r} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <ChevronRight size={14} className="text-cyan-400" /> {r}
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsScreen() {
  const settings = ['Notifications', 'Theme', 'API Keys', 'Tenant Config', 'WebSocket Interval'];
  return (
    <div className="space-y-2 max-w-md mx-auto">
      {settings.map((s) => (
        <div key={s} className="glass-card p-3 flex items-center justify-between">
          <span className="text-sm">{s}</span>
          <div className="w-8 h-4 rounded-full bg-slate-700 relative">
            <div className="w-3 h-3 rounded-full bg-cyan-400 absolute top-0.5 right-0.5" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ReportsScreen() {
  return (
    <div className="space-y-2">
      {['Weekly Delivery Performance', 'Risk Assessment Summary', 'Route Optimization Log', 'Telemetry Coverage Report'].map((r) => (
        <div key={r} className="glass-card p-3 flex items-center justify-between hover:bg-white/5 cursor-pointer transition-colors">
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-cyan-400" />
            <span className="text-sm">{r}</span>
          </div>
          <span className="text-[10px] text-[var(--text-muted)]">PDF · Demo</span>
        </div>
      ))}
    </div>
  );
}

function AdminScreen() {
  return (
    <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto">
      {['User Management', 'Tenant Schemas', 'API Rate Limits', 'Model Versions', 'System Logs', 'Deployment Status'].map((a) => (
        <div key={a} className="glass-card p-4 text-center hover:bg-white/5 cursor-pointer transition-colors">
          <Shield size={20} className="text-violet-400 mx-auto mb-2" />
          <p className="text-xs font-medium">{a}</p>
        </div>
      ))}
    </div>
  );
}

const screenComponents = {
  login: LoginScreen,
  dashboard: DashboardScreen,
  telemetry: TelemetryScreen,
  disruptions: DisruptionsScreen,
  routes: RoutesScreen,
  profile: ProfileScreen,
  settings: SettingsScreen,
  reports: ReportsScreen,
  admin: AdminScreen,
};

export default function MockScreens() {
  const [activeScreen, setActiveScreen] = useState('login');
  const Screen = screenComponents[activeScreen];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        {screens.map((s) => {
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              onClick={() => setActiveScreen(s.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                activeScreen === s.id
                  ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
                  : 'bg-transparent text-[var(--text-muted)] border-[var(--border-color)] hover:bg-white/5'
              }`}
            >
              <Icon size={14} />
              {s.label}
            </button>
          );
        })}
      </div>

      <div className="glass-card p-4 min-h-[400px]">
        <Screen onNavigate={setActiveScreen} />
      </div>
    </div>
  );
}
