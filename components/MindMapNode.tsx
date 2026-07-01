"use client";

import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { MindMapNodeData } from "@/lib/mindmap";

function MindMapNodeComponent({ data }: NodeProps) {
  const { label, emoji, depth, color } = data as MindMapNodeData;
  const isRoot = depth === 0;

  return (
    <div
      className="flex items-center gap-2 rounded-xl border shadow-sm transition-shadow hover:shadow-md"
      style={{
        background: isRoot ? color.bg : "#ffffff",
        borderColor: color.ring,
        borderWidth: isRoot ? 0 : 1.5,
        color: isRoot ? color.text : "#0f172a",
        padding: isRoot ? "12px 18px" : "9px 14px",
        maxWidth: 230,
        fontWeight: isRoot ? 700 : 500,
        fontSize: isRoot ? 15 : 13,
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: color.ring, width: 8, height: 8, border: "none" }}
      />
      {emoji ? (
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-base"
          style={{ background: isRoot ? "rgba(255,255,255,0.2)" : `${color.ring}1a` }}
        >
          {emoji}
        </span>
      ) : null}
      <span className="leading-snug">{label}</span>
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: color.ring, width: 8, height: 8, border: "none" }}
      />
    </div>
  );
}

export const MindMapNode = memo(MindMapNodeComponent);
