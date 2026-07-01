"use client";

import { useEffect, useMemo } from "react";
import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { MindMapData } from "@/lib/types";
import { toFlow, type MindMapNodeData } from "@/lib/mindmap";
import { MindMapNode } from "./MindMapNode";

const nodeTypes = { mindmap: MindMapNode };

function Canvas({ data }: { data: MindMapData }) {
  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => toFlow(data), [data]);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { fitView } = useReactFlow();

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    // Fit after the new graph is committed.
    const t = setTimeout(() => fitView({ padding: 0.2, duration: 400 }), 60);
    return () => clearTimeout(t);
  }, [initialNodes, initialEdges, setNodes, setEdges, fitView]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      fitView
      minZoom={0.2}
      maxZoom={2}
      proOptions={{ hideAttribution: false }}
    >
      <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#cbd5e1" />
      <MiniMap
        pannable
        zoomable
        nodeColor={(n) => (n.data as MindMapNodeData).color?.ring ?? "#94a3b8"}
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      />
      <Controls showInteractive={false} />
    </ReactFlow>
  );
}

export function MindMap({ data }: { data: MindMapData }) {
  return (
    <ReactFlowProvider>
      <Canvas data={data} />
    </ReactFlowProvider>
  );
}
