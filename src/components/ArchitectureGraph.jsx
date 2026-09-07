import { memo, useCallback, useMemo, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
} from '@xyflow/react';
import { getComponentById, getOwner, architectureNodes, architectureEdges } from '../data/projectData';

function CustomNode({ data, selected }) {
  const owner = data.ownerId ? getOwner(data.ownerId) : null;
  const isHighlighted = data.highlighted;
  const isDimmed = data.dimmed;

  return (
    <div
      className="px-3 py-2 min-w-[128px] text-left cursor-pointer"
      style={{
        border: `1px solid ${selected || isHighlighted ? 'var(--accent)' : 'var(--border-color)'}`,
        background: 'var(--bg-elevated)',
        borderLeft: `3px solid ${owner?.color || 'var(--rail)'}`,
        opacity: isDimmed ? 0.28 : 1,
      }}
    >
      <Handle type="target" position={Position.Top} className="!bg-[var(--accent)] !w-1.5 !h-1.5 !border-0" />
      <p className="mono text-[9px] uppercase tracking-wider text-[var(--text-muted)]">{data.layer}</p>
      <p className="display text-sm text-[var(--text-primary)]">{data.label}</p>
      {owner && (
        <p className="mono text-[10px] mt-0.5" style={{ color: owner.color }}>{owner.name}</p>
      )}
      <Handle type="source" position={Position.Bottom} className="!bg-[var(--accent)] !w-1.5 !h-1.5 !border-0" />
    </div>
  );
}

const nodeTypes = { custom: CustomNode };

function buildNodes(highlightedId, connectedIds) {
  return architectureNodes.map((node) => {
    const comp = getComponentById(node.id);
    return {
      ...node,
      data: {
        label: comp?.shortName || node.id,
        layer: comp?.layer || '',
        ownerId: comp?.owner,
        highlighted: connectedIds.has(node.id),
        dimmed: highlightedId && !connectedIds.has(node.id) && highlightedId !== node.id,
      },
    };
  });
}

function buildEdges(highlightedId, connectedIds) {
  return architectureEdges.map((edge) => {
    const on = connectedIds.has(edge.source) && connectedIds.has(edge.target);
    return {
      ...edge,
      style: {
        stroke: on ? '#f25c05' : '#8b9198',
        strokeWidth: on ? 2 : 1,
        opacity: highlightedId && !on ? 0.2 : 0.85,
      },
      animated: edge.animated && (!highlightedId || on),
    };
  });
}

function ArchitectureGraph({ onNodeClick, selectedId, className = '' }) {
  const connectedIds = useMemo(() => {
    if (!selectedId) return new Set();
    const ids = new Set([selectedId]);
    architectureEdges.forEach((e) => {
      if (e.source === selectedId) ids.add(e.target);
      if (e.target === selectedId) ids.add(e.source);
    });
    return ids;
  }, [selectedId]);

  const initialNodes = useMemo(() => buildNodes(selectedId, connectedIds), [selectedId, connectedIds]);
  const initialEdges = useMemo(() => buildEdges(selectedId, connectedIds), [selectedId, connectedIds]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes(buildNodes(selectedId, connectedIds));
    setEdges(buildEdges(selectedId, connectedIds));
  }, [selectedId, connectedIds, setNodes, setEdges]);

  const handleNodeClick = useCallback((_, node) => {
    onNodeClick?.(node.id);
  }, [onNodeClick]);

  return (
    <div className={`w-full h-full min-h-[500px] ${className}`}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        proOptions={{ hideAttribution: true }}
        minZoom={0.3}
        maxZoom={1.5}
      >
        <Background color="#2a3548" gap={24} size={1} />
        <Controls />
        <MiniMap
          nodeColor={(n) => {
            const owner = n.data?.ownerId ? getOwner(n.data.ownerId) : null;
            return owner?.color || '#8b9198';
          }}
        />
      </ReactFlow>
    </div>
  );
}

export default memo(ArchitectureGraph);
