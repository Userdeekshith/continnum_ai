import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Sun, Moon, Presentation, Maximize2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { projectInfo } from '../data/projectData';
import { PrototypeBadge } from './StatusBadge';
import PresentationMode from './PresentationMode';
import ComponentDetails from './ComponentDetails';

const navItems = [
  { to: '/', label: 'Overview', end: true },
  { to: '/architecture', label: 'Architecture' },
  { to: '/components', label: 'Components' },
  { to: '/data-flow', label: 'Data Flow' },
  { to: '/team', label: 'Team' },
  { to: '/roadmap', label: 'Roadmap' },
  { to: '/demo', label: 'Product' },
];

export default function AppShell() {
  const {
    theme,
    toggleTheme,
    presentationMode,
    togglePresentation,
    toggleFullscreen,
    selectedComponent,
    setSelectedComponent,
  } = useApp();
  const location = useLocation();
  const dockedInspector = location.pathname === '/architecture';

  return (
    <div className={`min-h-screen flex flex-col plot-grid ${presentationMode ? 'presentation-mode' : ''}`}>
      <header className="sticky top-0 z-40 border-b border-[var(--border-color)] bg-[var(--bg-primary)]">
        <div className="px-5 lg:px-8">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center gap-3 min-w-0">
              <span className="display text-lg tracking-[0.18em] text-[var(--text-primary)]">CONTINUUM AI</span>
              <span className="hidden sm:inline mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                Plot
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden md:inline mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                {projectInfo.status}
              </span>
              <PrototypeBadge />
              <button onClick={toggleTheme} className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--accent)]" title="Toggle theme">
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <button
                onClick={togglePresentation}
                className={`p-1.5 ${presentationMode ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)] hover:text-[var(--accent)]'}`}
                title="Presentation Mode"
              >
                <Presentation size={16} />
              </button>
              <button onClick={toggleFullscreen} className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--accent)]" title="Fullscreen">
                <Maximize2 size={16} />
              </button>
            </div>
          </div>

          {!presentationMode && (
            <nav className="flex gap-5 overflow-x-auto pb-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `display text-sm uppercase tracking-[0.14em] whitespace-nowrap pb-1 border-b-2 ${
                      isActive
                        ? 'text-[var(--accent)] border-[var(--accent)]'
                        : 'text-[var(--text-muted)] border-transparent hover:text-[var(--text-primary)]'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          )}
        </div>
      </header>

      <main className={`flex-1 w-full ${presentationMode ? 'pb-28' : ''}`}>
        <Outlet />
      </main>

      <PresentationMode />

      {selectedComponent && !dockedInspector && (
        <ComponentDetails componentId={selectedComponent} onClose={() => setSelectedComponent(null)} />
      )}
    </div>
  );
}
