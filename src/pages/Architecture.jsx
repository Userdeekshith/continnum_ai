import ArchitectureGraph from '../components/ArchitectureGraph';
import ComponentDetails from '../components/ComponentDetails';
import { useApp } from '../context/AppContext';

export default function Architecture() {
  const { selectedComponent, setSelectedComponent } = useApp();

  return (
    <div className="flex h-[calc(100vh-92px)]">
      <div className="flex-1 min-w-0">
        <div className="px-6 pt-4 pb-2 flex items-end justify-between">
          <div>
            <h1 className="display text-3xl">Architecture</h1>
            <p className="text-sm text-[var(--text-muted)]">Click a plate to highlight connections.</p>
          </div>
        </div>
        <ArchitectureGraph
          onNodeClick={setSelectedComponent}
          selectedId={selectedComponent}
          className="h-[calc(100%-64px)]"
        />
      </div>
      {selectedComponent && (
        <ComponentDetails
          docked
          componentId={selectedComponent}
          onClose={() => setSelectedComponent(null)}
        />
      )}
    </div>
  );
}
