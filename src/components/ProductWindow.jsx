import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getComponentById, getOwner, uniqueFeatures } from '../data/projectData';
import { PrototypeBadge } from './StatusBadge';
import { useApp } from '../context/AppContext';

const SCREENS = [
  { id: 'login', label: 'Login' },
  { id: 'operations', label: 'Operations' },
  { id: 'fleet', label: 'Fleet' },
  { id: 'disruptions', label: 'Disruptions' },
  { id: 'route', label: 'Route' },
];

const HOTSPOTS = {
  signin: 'auth',
  chrome: 'frontend',
  fleet: 'telemetry-sim',
  signal: 'signal-repair',
  disruptions: 'nlp-engine',
  risk: 'knowledge-graph',
  generate: 'ddpg-agent',
  eval: 'eval-harness',
  store: 'lancedb',
};

function Chip({ componentId }) {
  const comp = getComponentById(componentId);
  const owner = getOwner(comp?.owner);
  if (!comp || !owner) return null;
  return (
    <p className="mono text-[10px] uppercase tracking-wider" style={{ color: owner.color }}>
      {owner.name} — {owner.workstream}
    </p>
  );
}

function Hotspot({ id, componentId, hovered, pinned, onHover, onPin, children, className = '' }) {
  const active = hovered === id || pinned === id;
  return (
    <div
      role="button"
      tabIndex={0}
      data-hotspot={id}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
      onClick={(e) => {
        e.stopPropagation();
        onPin(id);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onPin(id);
      }}
      className={`text-left cursor-pointer transition-colors ${className} ${active ? 'ring-1 ring-[var(--accent)]' : ''}`}
    >
      {children}
    </div>
  );
}

function LoginInner({ onNavigate, hovered, pinned, onHover, onPin }) {
  return (
    <div className="flex items-center justify-center h-full p-8">
      <Hotspot id="signin" componentId={HOTSPOTS.signin} hovered={hovered} pinned={pinned} onHover={onHover} onPin={onPin} className="w-full max-w-xs p-6 plate">
        <p className="display text-xl tracking-[0.12em] mb-1">CONTINUUM AI</p>
        <p className="mono text-[10px] uppercase tracking-wider text-[var(--text-muted)] mb-6">Control Tower</p>
        <input placeholder="Email" className="w-full mb-3 px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-color)] text-sm" />
        <input type="password" placeholder="Password" className="w-full mb-4 px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-color)] text-sm" />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate('operations');
          }}
          className="w-full py-2 bg-[var(--accent)] text-[var(--bg-primary)] display tracking-wider uppercase text-sm"
        >
          Sign in
        </button>
        {hovered === 'signin' && (
          <div className="mt-3">
            <Chip componentId={HOTSPOTS.signin} />
          </div>
        )}
      </Hotspot>
    </div>
  );
}

function OperationsInner({ hovered, pinned, onHover, onPin }) {
  return (
    <div className="h-full p-4 grid grid-cols-12 gap-3">
      <Hotspot id="chrome" componentId={HOTSPOTS.chrome} hovered={hovered} pinned={pinned} onHover={onHover} onPin={onPin} className="col-span-12 plate p-3 flex justify-between items-center">
        <span className="display tracking-wider">Operations</span>
        <span className="mono text-[10px] text-[var(--text-muted)]">System Health Index — planned</span>
        {hovered === 'chrome' && <Chip componentId={HOTSPOTS.chrome} />}
      </Hotspot>
      <Hotspot id="risk" componentId={HOTSPOTS.risk} hovered={hovered} pinned={pinned} onHover={onHover} onPin={onPin} className="col-span-8 plate p-4 min-h-[180px]">
        <p className="mono text-[10px] uppercase tracking-wider text-[var(--text-muted)] mb-3">Hub plot</p>
        <svg viewBox="0 0 320 140" className="w-full h-36">
          <path d="M20 110 L80 70 L150 90 L230 40 L300 65" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="4 3" />
          {['DXB', 'BOM', 'SIN'].map((hub, i) => (
            <g key={hub} transform={`translate(${80 + i * 90}, ${70 - i * 10})`}>
              <rect x="-18" y="-10" width="36" height="20" fill="var(--bg-secondary)" stroke="var(--border-color)" />
              <text x="0" y="4" textAnchor="middle" fill="var(--text-primary)" fontSize="9" fontFamily="IBM Plex Mono">{hub}</text>
            </g>
          ))}
        </svg>
        {hovered === 'risk' && <Chip componentId={HOTSPOTS.risk} />}
      </Hotspot>
      <Hotspot id="store" componentId={HOTSPOTS.store} hovered={hovered} pinned={pinned} onHover={onHover} onPin={onPin} className="col-span-4 plate p-4">
        <p className="mono text-[10px] uppercase tracking-wider text-[var(--text-muted)] mb-2">Stored routes</p>
        <p className="display text-2xl">LanceDB</p>
        <p className="text-xs text-[var(--text-secondary)] mt-2">Amazon Last-Mile baselines</p>
        {hovered === 'store' && <Chip componentId={HOTSPOTS.store} />}
      </Hotspot>
    </div>
  );
}

function FleetInner({ hovered, pinned, onHover, onPin }) {
  const rows = [
    { id: 'VH-001', route: 'Dubai → Mumbai', status: 'In Transit', hotspot: 'fleet' },
    { id: 'VH-002', route: 'London → Dubai', status: 'Loading', hotspot: 'fleet' },
    { id: 'VH-004', route: 'Mumbai → Singapore', status: 'Signal Drop', hotspot: 'signal' },
  ];
  return (
    <div className="p-4 space-y-2">
      {rows.map((v) => (
        <Hotspot key={v.id} id={v.hotspot + v.id} componentId={HOTSPOTS[v.hotspot]} hovered={hovered} pinned={pinned} onHover={onHover} onPin={onPin} className="plate p-3 flex justify-between">
          <div>
            <p className="mono text-sm">{v.id}</p>
            <p className="text-xs text-[var(--text-muted)]">{v.route}</p>
            {hovered === v.hotspot + v.id && <Chip componentId={HOTSPOTS[v.hotspot]} />}
          </div>
          <p className="mono text-xs" style={{ color: v.status === 'Signal Drop' ? 'var(--accent)' : 'var(--ok)' }}>{v.status}</p>
        </Hotspot>
      ))}
    </div>
  );
}

function DisruptionsInner({ hovered, pinned, onHover, onPin, filter, setFilter }) {
  const alerts = [
    { title: 'Vessel berthing delayed due to high winds and mechanical crane maintenance', severity: 'high' },
    { title: 'Weather alert: Arabian Sea', severity: 'medium' },
    { title: 'Customs delay at Singapore', severity: 'low' },
  ];
  const shown = filter === 'all' ? alerts : alerts.filter((a) => a.severity === filter);
  return (
    <div className="p-4">
      <div className="flex gap-2 mb-3">
        {['all', 'high', 'medium', 'low'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`mono text-[10px] uppercase px-2 py-1 border ${filter === f ? 'border-[var(--accent)] text-[var(--accent)]' : 'border-[var(--border-color)] text-[var(--text-muted)]'}`}
          >
            {f}
          </button>
        ))}
      </div>
      <Hotspot id="disruptions" componentId={HOTSPOTS.disruptions} hovered={hovered} pinned={pinned} onHover={onHover} onPin={onPin} className="space-y-2">
        {shown.map((a) => (
          <div key={a.title} className="plate p-3">
            <p className="text-sm">{a.title}</p>
            <p className="mono text-[10px] uppercase mt-1 text-[var(--text-muted)]">{a.severity}</p>
          </div>
        ))}
        {hovered === 'disruptions' && <div className="pt-2"><Chip componentId={HOTSPOTS.disruptions} /></div>}
      </Hotspot>
    </div>
  );
}

function RouteInner({ hovered, pinned, onHover, onPin, generating, done, onGenerate }) {
  return (
    <div className="p-6 h-full flex flex-col items-center justify-center gap-4">
      <p className="display text-xl">Dubai → Singapore</p>
      <p className="mono text-xs text-[var(--text-muted)]">via DDPG agent</p>
      <Hotspot id="generate" componentId={HOTSPOTS.generate} hovered={hovered} pinned={pinned} onHover={onHover} onPin={onPin} className="p-2">
        {!generating && !done && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onGenerate();
            }}
            className="px-5 py-2 border border-[var(--accent)] text-[var(--accent)] display uppercase tracking-wider text-sm"
          >
            Generate optimized route
          </button>
        )}
        {generating && <p className="mono text-sm text-[var(--accent)]">Generating route…</p>}
        {done && <p className="mono text-sm" style={{ color: 'var(--ok)' }}>Dubai → Mumbai → Singapore</p>}
        {hovered === 'generate' && <div className="mt-2"><Chip componentId={HOTSPOTS.generate} /></div>}
      </Hotspot>
      {done && (
        <Hotspot id="eval" componentId={HOTSPOTS.eval} hovered={hovered} pinned={pinned} onHover={onHover} onPin={onPin} className="plate p-3">
          <p className="mono text-xs">EvalHarness: approved (distance and cost bounds)</p>
          {hovered === 'eval' && <Chip componentId={HOTSPOTS.eval} />}
        </Hotspot>
      )}
    </div>
  );
}

function BuildPlan({ componentId, onClose }) {
  const comp = getComponentById(componentId);
  const owner = getOwner(comp?.owner);
  const navigate = useNavigate();
  if (!comp) return null;
  return (
    <aside className="w-full lg:w-80 shrink-0 plate p-5 h-full overflow-y-auto">
      <div className="flex justify-between items-start mb-4">
        <p className="mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">Build plan</p>
        <button onClick={onClose} className="mono text-[10px] uppercase text-[var(--text-muted)] hover:text-[var(--accent)]">Clear</button>
      </div>
      <h3 className="display text-xl mb-1">{comp.shortName}</h3>
      {owner && (
        <>
          <p className="display text-lg" style={{ color: owner.color }}>{owner.name}</p>
          <p className="text-sm text-[var(--text-secondary)] mb-4">{owner.workstream}</p>
        </>
      )}
      <p className="mono text-[10px] uppercase tracking-wider text-[var(--text-muted)] mb-1">Technology</p>
      <p className="text-sm text-[var(--text-secondary)] mb-4">{comp.technology.join(', ')}</p>
      <p className="mono text-[10px] uppercase tracking-wider text-[var(--text-muted)] mb-1">Planned implementation</p>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">{comp.implementation}</p>
      <p className="mono text-xs uppercase mb-4">Status: {comp.status}</p>
      <button
        onClick={() => navigate('/architecture')}
        className="mono text-xs uppercase tracking-wider text-[var(--accent)] border-b border-[var(--accent)]"
      >
        Open on architecture plot
      </button>
    </aside>
  );
}

export default function ProductWindow() {
  const [screen, setScreen] = useState('login');
  const [hovered, setHovered] = useState(null);
  const [pinned, setPinned] = useState(null);
  const [filter, setFilter] = useState('all');
  const [generating, setGenerating] = useState(false);
  const [done, setDone] = useState(false);

  const hotspotToComponent = (hid) => {
    if (!hid) return null;
    if (hid.startsWith('signal')) return HOTSPOTS.signal;
    if (hid.startsWith('fleet')) return HOTSPOTS.fleet;
    return HOTSPOTS[hid] || null;
  };

  const pinnedComponent = hotspotToComponent(pinned);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setPinned(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const onGenerate = () => {
    setGenerating(true);
    setDone(false);
    setTimeout(() => {
      setGenerating(false);
      setDone(true);
    }, 2200);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-full min-h-[520px]">
      <div className="flex-1 plate flex flex-col overflow-hidden min-h-[480px]">
        <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--border-color)] bg-[var(--bg-secondary)]">
          <p className="mono text-xs">Continuum AI — Control Tower</p>
          <PrototypeBadge />
        </div>
        <div className="flex gap-1 px-3 py-2 border-b border-[var(--border-color)]">
          {SCREENS.map((s) => (
            <button
              key={s.id}
              onClick={() => setScreen(s.id)}
              className={`mono text-[10px] uppercase px-2 py-1 ${screen === s.id ? 'text-[var(--accent)] border-b border-[var(--accent)]' : 'text-[var(--text-muted)]'}`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-auto bg-[var(--bg-primary)]">
          {screen === 'login' && <LoginInner onNavigate={setScreen} hovered={hovered} pinned={pinned} onHover={setHovered} onPin={setPinned} />}
          {screen === 'operations' && <OperationsInner hovered={hovered} pinned={pinned} onHover={setHovered} onPin={setPinned} />}
          {screen === 'fleet' && <FleetInner hovered={hovered} pinned={pinned} onHover={setHovered} onPin={setPinned} />}
          {screen === 'disruptions' && (
            <DisruptionsInner hovered={hovered} pinned={pinned} onHover={setHovered} onPin={setPinned} filter={filter} setFilter={setFilter} />
          )}
          {screen === 'route' && (
            <RouteInner
              hovered={hovered}
              pinned={pinned}
              onHover={setHovered}
              onPin={setPinned}
              generating={generating}
              done={done}
              onGenerate={onGenerate}
            />
          )}
        </div>
      </div>
      {pinnedComponent ? (
        <BuildPlan componentId={pinnedComponent} onClose={() => setPinned(null)} />
      ) : (
        <aside className="w-full lg:w-80 shrink-0 plate p-5 text-[var(--text-muted)] text-sm">
          <p className="mono text-[10px] uppercase tracking-[0.2em] mb-3">Build plan</p>
          <p>Hover a control for the owner. Click to pin how it will be built.</p>
        </aside>
      )}
    </div>
  );
}

export function FeaturePlates() {
  const navigate = useNavigate();
  const { setSelectedComponent } = useApp();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border-color)] border border-[var(--border-color)]">
      {uniqueFeatures.map((f) => (
        <button
          key={f.id}
          onClick={() => {
            setSelectedComponent(f.componentId);
            navigate('/architecture');
          }}
          className="text-left p-6 bg-[var(--bg-elevated)] hover:bg-[var(--bg-secondary)] transition-colors"
        >
          <h3 className="display text-xl mb-2">{f.title}</h3>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{f.body}</p>
        </button>
      ))}
    </div>
  );
}
