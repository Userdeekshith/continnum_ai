import { useState } from 'react';
import { Link } from 'react-router-dom';
import { teamMembers, projectInfo, problemCopy } from '../data/projectData';
import HoverLetters from '../components/HoverLetters';
import ProductWindow, { FeaturePlates } from '../components/ProductWindow';

export default function Overview() {
  const [active, setActive] = useState(null);
  const [pinned, setPinned] = useState(null);
  const shown = teamMembers[pinned] || teamMembers[active];

  return (
    <div>
      <section id="title-card" className="stage flex flex-col justify-center px-6 lg:px-16 plot-track">
        <p className="mono text-[11px] uppercase tracking-[0.35em] text-[var(--text-muted)] mb-4">Capstone · VIT</p>
        <h1 className="display font-bold leading-[0.85] text-[clamp(4.5rem,14vw,11rem)] text-[var(--text-primary)]">
          CONTINUUM
          <br />
          AI
        </h1>
        <p className="mt-6 display text-xl md:text-2xl tracking-[0.08em] text-[var(--text-secondary)]">
          {projectInfo.subtitle}
        </p>

        <div className="mt-16 flex flex-wrap gap-x-8 gap-y-3">
          {Object.values(teamMembers).map((m) => (
            <button
              key={m.id}
              onMouseEnter={() => setActive(m.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(m.id)}
              onBlur={() => setActive(null)}
              onClick={() => setPinned(pinned === m.id ? null : m.id)}
              className="display text-lg md:text-xl tracking-wide border-b border-transparent hover:border-[var(--accent)]"
              style={{ color: shown?.id === m.id ? 'var(--accent)' : 'var(--text-primary)' }}
            >
              {m.name}
            </button>
          ))}
        </div>

        <p className="mt-6 min-h-[1.5rem] mono text-sm text-[var(--text-secondary)]">
          {shown ? `${shown.name} — ${shown.workstream}` : '\u00a0'}
        </p>

        <Link
          to="/team"
          className="mt-8 self-start display text-sm uppercase tracking-[0.2em] text-[var(--accent)] border-b border-[var(--accent)]"
        >
          Expand
        </Link>
      </section>

      <section id="problem" className="stage px-6 lg:px-16 py-16 flex flex-col justify-center">
        <p className="mono text-[10px] uppercase tracking-[0.25em] text-[var(--text-muted)] mb-2">From the portfolio</p>
        <h2 className="display text-5xl md:text-7xl mb-6">{problemCopy.headline}</h2>
        <p className="max-w-2xl text-[var(--text-secondary)] leading-relaxed mb-12">{problemCopy.body}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {problemCopy.stats.map((s) => (
            <div key={s.figure}>
              <HoverLetters text={s.figure} className="text-5xl md:text-6xl font-bold" />
              {s.planned && (
                <p className="mono text-[10px] uppercase tracking-wider text-[var(--warn)] mt-2">Planned</p>
              )}
              <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">{s.line}</p>
            </div>
          ))}
        </div>

        <ul className="flex flex-wrap gap-x-8 gap-y-2">
          {problemCopy.failures.map((f) => (
            <li key={f} className="mono text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
              {f}
            </li>
          ))}
        </ul>
      </section>

      <section id="features" className="stage px-6 lg:px-16 py-16 flex flex-col justify-center">
        <p className="mono text-[10px] uppercase tracking-[0.25em] text-[var(--text-muted)] mb-2">Differentiators</p>
        <h2 className="display text-5xl md:text-6xl mb-8">What this system does differently</h2>
        <FeaturePlates />
      </section>

      <section id="product" className="px-6 lg:px-16 py-16">
        <p className="mono text-[10px] uppercase tracking-[0.25em] text-[var(--text-muted)] mb-2">End product</p>
        <h2 className="display text-4xl md:text-5xl mb-6">Control Tower</h2>
        <p className="text-sm text-[var(--text-secondary)] mb-6 max-w-xl">
          Visual prototype of the planned interface. Hover a control for ownership. Click to pin the documented build plan.
        </p>
        <ProductWindow />
      </section>
    </div>
  );
}
