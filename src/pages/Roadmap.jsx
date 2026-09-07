import Roadmap from '../components/Roadmap';

export default function RoadmapPage() {
  return (
    <div className="px-6 lg:px-16 py-8">
      <h1 className="display text-4xl">Roadmap</h1>
      <p className="text-sm text-[var(--text-muted)] mt-1 mb-8">Six phases from architecture to demo</p>
      <Roadmap />
    </div>
  );
}
