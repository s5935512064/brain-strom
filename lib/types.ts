// Flat representation returned by the AI. We keep it flat (rather than a nested
// tree) because it is easier for the model to produce reliably and easier to
// validate.
export interface RawNode {
  /** Stable id, e.g. "n1". The central node always has id "root". */
  id: string;
  /** Short label shown inside the node. */
  label: string;
  /** Parent node id. Top-level branches point at "root". */
  parentId: string;
  /** Optional emoji rendered as the node's icon. */
  emoji?: string;
}

export interface MindMapData {
  /** Label for the central node. */
  root: string;
  /** All non-root nodes. */
  nodes: RawNode[];
}

export function isMindMapData(value: unknown): value is MindMapData {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  if (typeof v.root !== "string") return false;
  if (!Array.isArray(v.nodes)) return false;
  return v.nodes.every((n) => {
    if (!n || typeof n !== "object") return false;
    const node = n as Record<string, unknown>;
    return (
      typeof node.id === "string" &&
      typeof node.label === "string" &&
      typeof node.parentId === "string"
    );
  });
}
