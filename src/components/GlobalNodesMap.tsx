import { useState } from 'react';
import { motion } from 'motion/react';
import { Globe, Radio } from 'lucide-react';
import { GLOBAL_NODES } from '../data/organizationData';
import { GlobalResearchNode } from '../types';
import { soundFx } from '../utils/sound';

export default function GlobalNodesMap() {
  const [activeNode, setActiveNode] = useState<GlobalResearchNode>(GLOBAL_NODES[0]);

  const handleNodeClick = (node: GlobalResearchNode) => {
    setActiveNode(node);
    soundFx.playBlip(550, 0.02);
  };

  return (
    <section id="nodes" className="py-20 px-4 max-w-7xl mx-auto relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-[11px] uppercase tracking-widest mb-1.5">
            <Globe className="w-3.5 h-3.5" />
            <span>Computing Mesh & Multi-Campus Telemetry</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            Research Compute Nodes & Clusters
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
            Connected computational servers running Monte Carlo simulations, high-dimensional covariance estimation, and hydrological forecasting across URS campuses and academic partners.
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center gap-2 text-xs font-mono text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Host Node: URS Cainta Operational</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* World Map Container */}
        <div className="lg:col-span-2 relative rounded-2xl bg-black/40 border border-white/[0.08] p-5 overflow-hidden min-h-[320px] flex items-center justify-center">
          <div className="relative w-full h-[280px] select-none">
            <svg viewBox="0 0 100 65" className="w-full h-full">
              <defs>
                <pattern id="nodeDotClean" width="2.5" height="2.5" patternUnits="userSpaceOnUse">
                  <circle cx="1.25" cy="1.25" r="0.35" fill="#334155" opacity="0.4" />
                </pattern>
              </defs>
              <rect width="100" height="65" fill="url(#nodeDotClean)" />

              {/* Data connections between nodes */}
              {GLOBAL_NODES.map((n1, idx) => {
                const nextNode = GLOBAL_NODES[(idx + 1) % GLOBAL_NODES.length];
                const isConnected = activeNode.id === n1.id || activeNode.id === nextNode.id;

                return (
                  <path
                    key={`line-${idx}`}
                    d={`M ${n1.x} ${n1.y} Q ${(n1.x + nextNode.x) / 2} ${(n1.y + nextNode.y) / 2 - 6} ${nextNode.x} ${nextNode.y}`}
                    fill="none"
                    stroke={isConnected ? '#06b6d4' : '#1e293b'}
                    strokeWidth={isConnected ? '0.5' : '0.15'}
                    strokeDasharray={isConnected ? '1 0.5' : 'none'}
                    className="transition-colors duration-200"
                  />
                );
              })}

              {/* Nodes */}
              {GLOBAL_NODES.map((node) => {
                const isSelected = activeNode.id === node.id;
                return (
                  <g
                    key={node.id}
                    className="cursor-pointer"
                    onClick={() => handleNodeClick(node)}
                  >
                    {isSelected && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="3"
                        fill="none"
                        stroke="#06b6d4"
                        strokeWidth="0.25"
                        className="animate-ping"
                      />
                    )}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isSelected ? '1.8' : '1.1'}
                      fill={isSelected ? '#06b6d4' : '#475569'}
                      stroke={isSelected ? '#ffffff' : '#0ea5e9'}
                      strokeWidth="0.3"
                    />
                    <text
                      x={node.x}
                      y={node.y - 2.2}
                      fill={isSelected ? '#38bdf8' : '#64748b'}
                      fontSize="2.1"
                      fontFamily="monospace"
                      textAnchor="middle"
                      fontWeight={isSelected ? 'bold' : 'normal'}
                    >
                      {node.city}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="absolute bottom-2.5 left-4 text-[10px] font-mono text-slate-500">
            Select node on map to inspect active telemetry
          </div>
        </div>

        {/* Node Telemetry Card */}
        <div className="rounded-2xl bg-slate-900/30 border border-white/[0.08] p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
              <span className="text-cyan-400 font-medium flex items-center gap-1.5 text-[11px]">
                <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
                <span>TELEMETRY STREAM</span>
              </span>
              <span className="text-slate-500 text-[10px]">{activeNode.country}</span>
            </div>

            <h3 className="text-xl font-display font-bold text-white mb-0.5">
              {activeNode.city}
            </h3>

            <p className="text-xs text-slate-400 mb-4 font-mono">
              Lead: <span className="text-slate-200">{activeNode.leadFellow}</span>
            </p>

            <div className="space-y-2.5 font-mono text-xs">
              <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.06]">
                <span className="text-[9px] uppercase text-slate-500 block mb-0.5">
                  Research Specialization
                </span>
                <span className="text-white font-medium text-[11px] block">
                  {activeNode.specialization}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.06]">
                  <span className="text-[9px] uppercase text-slate-500 block mb-0.5">
                    Active Jobs
                  </span>
                  <span className="text-cyan-300 font-bold text-sm">
                    {activeNode.activeSimulations.toLocaleString()}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.06]">
                  <span className="text-[9px] uppercase text-slate-500 block mb-0.5">
                    Mesh Latency
                  </span>
                  <span className="text-emerald-400 font-bold text-sm">
                    {activeNode.latencyMs} ms
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-white/[0.06] mt-4 flex items-center justify-between text-[10px] font-mono text-slate-500">
            <span>Mesh: Encrypted WireGuard</span>
            <span className="text-cyan-400 font-medium">Synchronized</span>
          </div>
        </div>
      </div>
    </section>
  );
}
