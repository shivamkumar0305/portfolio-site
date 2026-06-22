"use client";

import React from "react";
import { Server, Database, Layers, Smartphone, RefreshCw } from "lucide-react";

interface Node {
  id: string;
  label: string;
  type: "client" | "service" | "database" | "cache" | "queue";
}

interface Edge {
  from: string;
  to: string;
  label?: string;
}

interface ArchitectureCanvasProps {
  projectId: string;
  nodes: Node[];
  edges: Edge[];
}

const coordinatesMap: Record<string, Record<string, { x: number; y: number }>> = {
  "financeflow": {
    client: { x: 70, y: 100 },
    api: { x: 240, y: 100 },
    auth: { x: 240, y: 35 },
    db: { x: 480, y: 100 }
  },
  "ticketflow": {
    client: { x: 70, y: 100 },
    django: { x: 220, y: 100 },
    db: { x: 360, y: 35 },
    broker: { x: 360, y: 155 },
    celery: { x: 510, y: 155 }
  },
  "recipe-api": {
    client: { x: 70, y: 100 },
    api: { x: 240, y: 100 },
    s3: { x: 480, y: 45 },
    db: { x: 480, y: 155 }
  }
};

export function ArchitectureCanvas({ projectId, nodes, edges }: ArchitectureCanvasProps) {
  const coords = coordinatesMap[projectId] || {};

  const getNodeIcon = (type: Node["type"]) => {
    switch (type) {
      case "client":
        return <Smartphone size={10} className="shrink-0" />;
      case "database":
        return <Database size={10} className="shrink-0" />;
      case "cache":
        return <RefreshCw size={10} className="shrink-0" />;
      case "queue":
        return <Layers size={10} className="shrink-0" />;
      default:
        return <Server size={10} className="shrink-0" />;
    }
  };

  const getNodeColor = (type: Node["type"]) => {
    switch (type) {
      case "client":
        return "border-stone-800 bg-[#0C0A09]/85 text-stone-300";
      case "database":
        return "border-orange-500/30 bg-orange-950/40 text-orange-350";
      case "cache":
        return "border-stone-800 bg-[#0C0A09]/85 text-stone-300";
      case "queue":
        return "border-stone-800 bg-[#0C0A09]/85 text-stone-300";
      default:
        return "border-stone-750 bg-stone-900/85 text-stone-200";
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-stone-850 bg-[#141211] p-4 max-w-[460px] mx-auto">
      <div className="absolute top-3 left-4 text-[8px] font-mono uppercase tracking-widest text-stone-500 font-bold">
        System Topology
      </div>
      
      <div className="aspect-[3/1] w-full min-w-[460px] mt-4">
        <svg viewBox="0 0 600 200" className="h-full w-full">
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 6 5 L 0 8.5 z" fill="#625d59" />
            </marker>
          </defs>

          {/* Draw Connection Edges */}
          {edges.map((edge, index) => {
            const start = coords[edge.from];
            const end = coords[edge.to];
            if (!start || !end) return null;

            const isCurve = Math.abs(start.y - end.y) > 20 && Math.abs(start.x - end.x) > 100;
            const midX = (start.x + end.x) / 2;
            const midY = (start.y + end.y) / 2;
            
            const pathData = isCurve
              ? `M ${start.x} ${start.y} Q ${midX} ${midY - 15} ${end.x} ${end.y}`
              : `M ${start.x} ${start.y} L ${end.x} ${end.y}`;

            return (
              <g key={index}>
                <path
                  d={pathData}
                  fill="none"
                  stroke="#57524e"
                  strokeWidth="1.2"
                  strokeDasharray="3 3"
                  markerEnd="url(#arrow)"
                />
                {edge.label && (
                  <text
                    x={midX}
                    y={isCurve ? midY - 12 : midY - 6}
                    textAnchor="middle"
                    fill="#87807b"
                    fontSize="7"
                    fontFamily="monospace"
                    letterSpacing="0.05em"
                  >
                    {edge.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* Draw Nodes */}
          {nodes.map((node) => {
            const pos = coords[node.id];
            if (!pos) return null;

            return (
              <foreignObject
                key={node.id}
                x={pos.x - 52}
                y={pos.y - 14}
                width="104"
                height="28"
              >
                <div
                  className={`flex h-full w-full items-center justify-center gap-1.5 rounded border px-1.5 py-0.5 text-center font-mono text-[8px] uppercase tracking-wider backdrop-blur-sm ${getNodeColor(
                    node.type
                  )}`}
                >
                  {getNodeIcon(node.type)}
                  <span className="truncate">{node.label}</span>
                </div>
              </foreignObject>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
