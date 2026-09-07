import ProductWindow from '../components/ProductWindow';
import { PrototypeBadge } from '../components/StatusBadge';

export default function Demo() {
  return (
    <div className="px-6 lg:px-16 py-8">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="display text-4xl">Control Tower</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Planned product window. Visual only.</p>
        </div>
        <PrototypeBadge />
      </div>
      <ProductWindow />
    </div>
  );
}
