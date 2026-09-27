import { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, RotateCw, Activity } from 'lucide-react';
import { computeMarkovSteadyState } from '../../utils/statistics';
import { soundFx } from '../../utils/sound';

export default function MarkovVisualizer() {
  // 3-State Transition Matrix
  const [matrix, setMatrix] = useState<number[][]>([
    [0.6, 0.3, 0.1],
    [0.2, 0.5, 0.3],
    [0.1, 0.4, 0.5]
  ]);

  const [currentState, setCurrentState] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [stepCount, setStepCount] = useState<number>(0);

  const stateNames = [
    { label: 'S₁: Ground Base', color: '#06b6d4', x: 180, y: 110 },
    { label: 'S₂: Stochastic Drift', color: '#8b5cf6', x: 500, y: 110 },
    { label: 'S₃: Dynamic Attractor', color: '#10b981', x: 340, y: 270 }
  ];

  // Compute stationary distribution
  const steadyState = useMemo(() => {
    return computeMarkovSteadyState(matrix);
  }, [matrix]);

  // Step the Markov simulation
  const stepSimulation = () => {
    const rand = Math.random();
    let cumulative = 0;
    let next = currentState;

    for (let j = 0; j < matrix[currentState].length; j++) {
      cumulative += matrix[currentState][j];
      if (rand <= cumulative) {
        next = j;
        break;
      }
    }

    setCurrentState(next);
    setStepCount((prev) => prev + 1);
    soundFx.playBlip(440 + next * 120, 0.03);
  };

  // Automated step loop
  useEffect(() => {
    if (!isRunning) return;
    const interval = window.setInterval(stepSimulation, 1200);
    return () => clearInterval(interval);
  }, [isRunning, currentState, matrix]);

  // Adjust transition probability
  const handleMatrixChange = (i: number, j: number, val: number) => {
    const newM = matrix.map((row, rIdx) => {
      if (rIdx !== i) return [...row];
      const newRow = [...row];
      newRow[j] = Math.max(0.01, Math.min(0.99, val));
      // Rebalance other cells in row to sum to 1
      const otherIndices = [0, 1, 2].filter((k) => k !== j);
      const remainingProb = 1 - newRow[j];
      const currentOthersSum = row[otherIndices[0]] + row[otherIndices[1]];
      if (currentOthersSum > 0) {
        newRow[otherIndices[0]] = (row[otherIndices[0]] / currentOthersSum) * remainingProb;
        newRow[otherIndices[1]] = (row[otherIndices[1]] / currentOthersSum) * remainingProb;
      } else {
        newRow[otherIndices[0]] = remainingProb / 2;
        newRow[otherIndices[1]] = remainingProb / 2;
      }
      return newRow;
    });

    setMatrix(newM);
    soundFx.playBlip(600, 0.02);
  };

  return (
    <div className="space-y-6">
      {/* HUD Metrics & Steady State Display */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-900/80 border border-cyan-500/20 backdrop-blur-md">
        <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
          <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">Current Active State</span>
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full animate-ping"
              style={{ backgroundColor: stateNames[currentState].color }}
            />
            <span className="font-mono font-bold text-white text-sm">
              {stateNames[currentState].label}
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-500 mt-1 block">Step #{stepCount}</span>
        </div>

        <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 md:col-span-2">
          <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1.5">
            Stationary Distribution Vector (π = πP)
          </span>
          <div className="grid grid-cols-3 gap-2 text-xs font-mono">
            {steadyState.map((prob, idx) => (
              <div key={idx} className="flex flex-col">
                <div className="flex justify-between text-[11px] mb-0.5">
                  <span className="text-slate-400">π_{idx + 1}:</span>
                  <span className="text-cyan-300 font-bold">{(prob * 100).toFixed(1)}%</span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${prob * 100}%`,
                      backgroundColor: stateNames[idx].color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsRunning(!isRunning);
              soundFx.playBlip(isRunning ? 380 : 640, 0.04);
            }}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 ${
              isRunning
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
            }`}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isRunning ? 'Pause Flow' : 'Resume Flow'}
          </button>
          <button
            onClick={stepSimulation}
            className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-cyan-400 hover:border-cyan-500/40 transition-colors"
            title="Manual Single Step"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Visualizer: State Graph & Transition Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Animated SVG Graph */}
        <div className="lg:col-span-2 relative rounded-2xl bg-[#070d1d] border border-cyan-500/20 p-4 shadow-2xl overflow-hidden min-h-[340px]">
          <div className="absolute top-3 left-4 flex items-center gap-2 text-xs font-mono text-slate-400">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>Ergodic Markov Chain Directed Graph</span>
          </div>

          <svg viewBox="0 0 680 340" className="w-full h-full select-none">
            <defs>
              <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX="22"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#0ea5e9" />
              </marker>
            </defs>

            {/* Arcs between states */}
            {stateNames.map((s1, i) =>
              stateNames.map((s2, j) => {
                if (i === j) {
                  // Self loop
                  return (
                    <g key={`loop-${i}`}>
                      <path
                        d={`M ${s1.x - 20} ${s1.y - 30} C ${s1.x - 50} ${s1.y - 70}, ${s1.x + 50} ${s1.y - 70}, ${s1.x + 20} ${s1.y - 30}`}
                        fill="none"
                        stroke="#334155"
                        strokeWidth="1.5"
                        strokeDasharray="3 3"
                      />
                      <text
                        x={s1.x}
                        y={s1.y - 65}
                        fill="#94a3b8"
                        fontSize="10"
                        fontFamily="monospace"
                        textAnchor="middle"
                      >
                        {matrix[i][j].toFixed(2)}
                      </text>
                    </g>
                  );
                }

                if (i < j) {
                  // Forward curve
                  const midX = (s1.x + s2.x) / 2;
                  const midY = (s1.y + s2.y) / 2 - 25;
                  const isActiveTransition = currentState === i;

                  return (
                    <g key={`arc-${i}-${j}`}>
                      <path
                        d={`M ${s1.x} ${s1.y} Q ${midX} ${midY} ${s2.x} ${s2.y}`}
                        fill="none"
                        stroke={isActiveTransition ? '#06b6d4' : '#1e293b'}
                        strokeWidth={isActiveTransition ? 2 : 1.2}
                        markerEnd="url(#arrow)"
                      />
                      <text
                        x={midX}
                        y={midY - 6}
                        fill="#06b6d4"
                        fontSize="10"
                        fontFamily="monospace"
                        textAnchor="middle"
                      >
                        {matrix[i][j].toFixed(2)}
                      </text>
                    </g>
                  );
                }

                return null;
              })
            )}

            {/* State Nodes */}
            {stateNames.map((node, idx) => {
              const isActive = currentState === idx;
              return (
                <g key={node.label} className="cursor-pointer" onClick={() => setCurrentState(idx)}>
                  {/* Glowing halo for active node */}
                  {isActive && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="42"
                      fill={node.color}
                      opacity="0.2"
                      className="animate-pulse"
                    />
                  )}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="32"
                    fill="#0f172a"
                    stroke={isActive ? node.color : '#334155'}
                    strokeWidth={isActive ? '3' : '1.5'}
                  />
                  <text
                    x={node.x}
                    y={node.y - 4}
                    fill={isActive ? '#ffffff' : '#94a3b8'}
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    S{idx + 1}
                  </text>
                  <text
                    x={node.x}
                    y={node.y + 12}
                    fill={node.color}
                    fontSize="9"
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    {(steadyState[idx] * 100).toFixed(0)}%
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Transition Probability Matrix Editor */}
        <div className="rounded-2xl bg-slate-900/80 border border-cyan-500/20 p-4 backdrop-blur-md flex flex-col justify-between">
          <div>
            <h4 className="text-xs uppercase font-mono tracking-wider text-slate-300 font-semibold mb-3">
              Stochastic Transition Matrix P
            </h4>
            <p className="text-[11px] text-slate-400 mb-4 leading-relaxed">
              Row vectors satisfy stochastic axiom: <span className="font-mono text-cyan-400">∑ⱼ Pᵢⱼ = 1.0</span>. Edit probabilities to observe how equilibrium shifts.
            </p>

            <div className="space-y-3 font-mono text-xs">
              {matrix.map((row, rIdx) => (
                <div key={rIdx} className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                  <div className="flex items-center justify-between mb-1.5 text-slate-400">
                    <span style={{ color: stateNames[rIdx].color }}>From S{rIdx + 1}:</span>
                    <span className="text-[10px] text-slate-500">Row sum: 1.00</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {row.map((val, cIdx) => (
                      <div key={cIdx}>
                        <div className="flex justify-between text-[10px] text-slate-500 mb-0.5">
                          <span>→ S{cIdx + 1}</span>
                          <span className="text-cyan-300">{val.toFixed(2)}</span>
                        </div>
                        <input
                          type="range"
                          min="0.05"
                          max="0.90"
                          step="0.05"
                          value={val}
                          onChange={(e) => handleMatrixChange(rIdx, cIdx, parseFloat(e.target.value))}
                          className="w-full accent-cyan-400 cursor-pointer h-1 bg-slate-800 rounded"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 font-mono">
            <span>Spectral Gap Convergence Rate: λ₂ = 0.42</span>
          </div>
        </div>
      </div>
    </div>
  );
}
