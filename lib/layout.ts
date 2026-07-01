import Dagre from "@dagrejs/dagre";
import type { Edge, Node } from "@xyflow/react";

const NODE_WIDTH = 230;
const NODE_HEIGHT = 56;

/**
 * Runs a dagre layout so the mindmap flows left-to-right, like the reference
 * image. Returns the same nodes with computed positions.
 */
export function layoutTree(
  nodes: Node[],
  edges: Edge[],
  direction: "LR" | "TB" = "LR"
): { nodes: Node[]; edges: Edge[] } {
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: direction, nodesep: 24, ranksep: 110, marginx: 40, marginy: 40 });

  nodes.forEach((node) => {
    g.setNode(node.id, {
      width: node.measured?.width ?? NODE_WIDTH,
      height: node.measured?.height ?? NODE_HEIGHT,
    });
  });

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));

  Dagre.layout(g);

  const laidOut = nodes.map((node) => {
    const pos = g.node(node.id);
    const width = node.measured?.width ?? NODE_WIDTH;
    const height = node.measured?.height ?? NODE_HEIGHT;
    return {
      ...node,
      // dagre positions are centers; React Flow expects top-left corners.
      position: { x: pos.x - width / 2, y: pos.y - height / 2 },
    };
  });

  return { nodes: laidOut, edges };
}
