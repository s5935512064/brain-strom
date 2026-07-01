import type { Edge, Node } from "@xyflow/react";
import { MarkerType } from "@xyflow/react";
import type { MindMapData } from "./types";
import { layoutTree } from "./layout";

/** Colour palette keyed by depth from the central node. */
const PALETTE = [
  { bg: "#4f46e5", ring: "#4f46e5", text: "#ffffff" }, // 0 – central (indigo)
  { bg: "#059669", ring: "#059669", text: "#ffffff" }, // 1 – emerald
  { bg: "#0284c7", ring: "#0284c7", text: "#ffffff" }, // 2 – sky
  { bg: "#d97706", ring: "#d97706", text: "#ffffff" }, // 3 – amber
  { bg: "#db2777", ring: "#db2777", text: "#ffffff" }, // 4+ – pink
];

export interface MindMapNodeData extends Record<string, unknown> {
  label: string;
  emoji?: string;
  depth: number;
  color: (typeof PALETTE)[number];
}

function paletteFor(depth: number) {
  return PALETTE[Math.min(depth, PALETTE.length - 1)];
}

/**
 * Converts the flat AI response into positioned React Flow nodes and edges.
 * Nodes with an unknown or missing parent are re-parented to the root so we
 * never drop content, and cycles are ignored while computing depth.
 */
export function toFlow(data: MindMapData): { nodes: Node[]; edges: Edge[] } {
  const parentOf = new Map<string, string | null>();
  parentOf.set("root", null);

  // Register every node id first so we can validate parent references.
  const ids = new Set<string>(["root"]);
  data.nodes.forEach((n) => ids.add(n.id));

  data.nodes.forEach((n) => {
    const parent = n.parentId && ids.has(n.parentId) && n.parentId !== n.id ? n.parentId : "root";
    parentOf.set(n.id, parent);
  });

  const depthCache = new Map<string, number>();
  const depthOf = (id: string): number => {
    let depth = 0;
    let current: string | null | undefined = id;
    const seen = new Set<string>();
    while (current && current !== "root") {
      if (seen.has(current)) break; // guard against cycles
      seen.add(current);
      if (depthCache.has(current)) {
        depth += depthCache.get(current)!;
        break;
      }
      depth += 1;
      current = parentOf.get(current) ?? "root";
    }
    depthCache.set(id, depth);
    return depth;
  };

  const nodes: Node[] = [];
  const edges: Edge[] = [];

  nodes.push({
    id: "root",
    type: "mindmap",
    position: { x: 0, y: 0 },
    data: {
      label: data.root || "Idea",
      emoji: "💡",
      depth: 0,
      color: paletteFor(0),
    } satisfies MindMapNodeData,
  });

  data.nodes.forEach((n) => {
    const depth = depthOf(n.id);
    const color = paletteFor(depth);
    nodes.push({
      id: n.id,
      type: "mindmap",
      position: { x: 0, y: 0 },
      data: {
        label: n.label,
        emoji: n.emoji,
        depth,
        color,
      } satisfies MindMapNodeData,
    });

    const source = parentOf.get(n.id) ?? "root";
    edges.push({
      id: `e-${source}-${n.id}`,
      source,
      target: n.id,
      type: "smoothstep",
      animated: false,
      style: { stroke: color.ring, strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: color.ring, width: 16, height: 16 },
    });
  });

  return layoutTree(nodes, edges, "LR");
}
