import { memo, useCallback, useMemo, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
} from '@xyflow/react';
import { getComponentById, getOwner, dependencyNodes, dependencyEdges } from '../data/projectData';

function DepNode({ data, selected }) {
  const owner = data.ownerId ? getOwner(data.ownerId) : null;
  return (
    <div
      className="px-3 py-2 min-w-[110px] text-left cursor-pointer"
      style={{
        border: `1px solid ${selected || data.highlighted ? 'var(--accent)' : 'var(--border-color)'}`,
        background: 'var(--bg-elevated)',
        borderLeft: `3px solid ${owner?.color || 'var(--rail)'}`,
        opacity: data.dimmed ? 0.25 : 1,
      }}
    >
      <Handle type="target" position={Position.Top} className="!bg-transparent !border-0" />
      <p className="text-xs font-semibold text-[var(--text-primary)]">{data.label}</p>
      <Handle type="source" position={Position.Bottom} className="!bg-transparent !border-0" />
    </div>
  );
}

const nodeTypes = { custom: DepNode };

function getDependencies(nodeId, edges, visited = new Set()) {
  edges.forEach((e) => {
    if (e.source === nodeId && !visited.has(e.target)) {
      visited.add(e.target);
      getDependencies(e.target, edges, visited);
    }
  });
  return visited;
}

function DependencyGraph({ onNodeClick, selectedId }) {
  const depIds = useMemo(() => {
    if (!selectedId) return new Set();
    const deps = getDependencies(selectedId, dependencyEdges);
    deps.add(selectedId);
    return deps;
  }, [selectedId]);

  const initialNodes = useMemo(
    () =>
      dependencyNodes.map((node) => {
        const comp = getComponentById(node.id);
        return {
          ...node,
          data: {
            label: comp?.shortName || node.id,
            ownerId: comp?.owner,
            highlighted: depIds.has(node.id),
            dimmed: selectedId && !depIds.has(node.id),
          },
        };
      }),
    [selectedId, depIds],
  );

  const initialEdges = useMemo(
    () =>
      dependencyEdges.map((edge) => ({
        ...edge,
        style: {
          stroke: depIds.has(edge.source) && depIds.has(edge.target) ? '#f25c05' : '#8b9198',
          strokeWidth: depIds.has(edge.source) && depIds.has(edge.target) ? 2.5 : 1,
          opacity: selectedId && !(depIds.has(edge.source) && depIds.has(edge.target)) ? 0.15 : 0.8,
        },
        animated: depIds.has(edge.source) && depIds.has(edge.target),
      })),
    [selectedId, depIds],
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  const handleNodeClick = useCallback((_, node) => onNodeClick?.(node.id), [onNodeClick]);

  return (
    <div className="w-full h-[450px] rounded-xl border border-[var(--border-color)] overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#475569" gap={20} size={1} />
        <Controls className="!bg-[var(--glass-bg)] !border-[var(--border-color)]" />
      </ReactFlow>
    </div>
  );
}

export default memo(DependencyGraph);
