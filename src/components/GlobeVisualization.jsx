import { useState } from 'react';
import { globeLocations, globeRoutes } from '../data/projectData';
import { DemoBadge } from './StatusBadge';

export default function GlobeVisualization() {
  const [selectedRoute, setSelectedRoute] = useState(globeRoutes[0]);
  const getLocation = (id) => globeLocations.find((l) => l.id === id);

  const routePoints = (route) => {
    const origin = getLocation(route.origin);
    const dest = getLocation(route.destination);
    const via = route.via.map((v) => getLocation(v)).filter(Boolean);
    return [origin, ...via, dest].filter(Boolean);
  };

  return (
    <div className="plate p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="display text-2xl">Network routing</h3>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-sm text-[var(--text-muted)]">Documented plot, not live routing</p>
            <DemoBadge>MOCK DATA</DemoBadge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <svg viewBox="0 0 100 60" className="w-full h-auto border border-[var(--border-color)] bg-[var(--bg-primary)]">
            {[20, 35, 50, 65, 80].map((x) => (
              <line key={`v${x}`} x1={x} y1="5" x2={x} y2="55" stroke="currentColor" strokeWidth="0.15" opacity="0.2" />
            ))}
            {[15, 30, 45].map((y) => (
              <line key={`h${y}`} x1="5" y1={y} x2="95" y2={y} stroke="currentColor" strokeWidth="0.15" opacity="0.2" />
            ))}

            {globeRoutes.map((route) => {
              const points = routePoints(route);
              if (points.length < 2) return null;
              const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
              const isSelected = selectedRoute.id === route.id;
              return (
                <path
                  key={route.id}
                  d={pathD}
                  fill="none"
                  stroke={isSelected ? '#f25c05' : '#8b9198'}
                  strokeWidth={isSelected ? 0.6 : 0.3}
                  strokeDasharray={isSelected ? '2 1' : 'none'}
                  className="cursor-pointer"
                  onClick={() => setSelectedRoute(route)}
                />
              );
            })}

            {globeLocations.map((loc) => {
              const isOnRoute = routePoints(selectedRoute).some((p) => p?.id === loc.id);
              return (
                <g key={loc.id}>
                  <circle cx={loc.x} cy={loc.y} r="1" fill={isOnRoute ? '#f25c05' : '#8b9198'} />
                  <text
                    x={loc.x}
                    y={loc.y - 2.5}
                    textAnchor="middle"
                    fill={isOnRoute ? '#e8e2d4' : '#8b9198'}
                    fontSize="2.5"
                    fontFamily="IBM Plex Mono"
                  >
                    {loc.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="space-y-3">
          {[
            { label: 'Origin', value: getLocation(selectedRoute.origin)?.name },
            { label: 'Destination', value: getLocation(selectedRoute.destination)?.name },
            {
              label: 'Selected Route',
              value: [getLocation(selectedRoute.origin)?.name, ...selectedRoute.via.map((v) => getLocation(v)?.name), getLocation(selectedRoute.destination)?.name].filter(Boolean).join(' → '),
            },
            { label: 'Estimated Latency', value: selectedRoute.latency },
            { label: 'Route Status', value: selectedRoute.status },
          ].map((item) => (
            <div key={item.label} className="p-3 border border-[var(--border-color)]">
              <p className="mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">{item.label}</p>
              <p className="text-sm mt-1">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
