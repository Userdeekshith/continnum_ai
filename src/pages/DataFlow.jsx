import DataFlow from '../components/DataFlow';
import GlobeVisualization from '../components/GlobeVisualization';
import DependencyGraph from '../components/DependencyGraph';
import SecurityFlow from '../components/SecurityFlow';
import { useApp } from '../context/AppContext';

export default function DataFlowPage() {
  const { setSelectedComponent } = useApp();

  return (
    <div className="px-6 lg:px-16 py-8 space-y-12">
      <div>
        <h1 className="display text-4xl">Data Flow</h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">How a request is planned to move through Continuum AI</p>
      </div>
      <DataFlow />
      <section id="globe-section">
        <GlobeVisualization />
      </section>
      <section>
        <h2 className="display text-2xl mb-2">Dependencies</h2>
        <p className="text-sm text-[var(--text-muted)] mb-4">Click a plate to highlight what it depends on.</p>
        <DependencyGraph onNodeClick={setSelectedComponent} selectedId={null} />
      </section>
      <SecurityFlow />
    </div>
  );
}
