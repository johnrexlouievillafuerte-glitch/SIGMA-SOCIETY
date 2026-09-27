import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'motion/react';
import { Play, RotateCcw, Zap } from 'lucide-react';
import { soundFx } from '../../utils/sound';
import { normalPDF } from '../../utils/statistics';

type ParentDist = 'uniform' | 'exponential' | 'bimodal';

export default function MonteCarloCLT() {
  const [parentType, setParentType] = useState<ParentDist>('exponential');
  const [sampleSizeN, setSampleSizeN] = useState<number>(10);
  const [sampleMeans, setSampleMeans] = useState<number[]>([]);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const streamRef = useRef<number | null>(null);

  // Generate a single random number from parent distribution
  const sampleFromParent = (type: ParentDist): number => {
    if (type === 'uniform') {
      return Math.random();
    } else if (type === 'exponential') {
      // Inverse CDF: -ln(1 - U) / lambda, normalized to [0, 1] range approx
      const lambda = 2.0;
      return Math.min(1, -Math.log(1 - Math.random() * 0.98) / lambda);
    } else {
      // Bimodal mixture of two Gaussians around 0.25 and 0.75
      const branch = Math.random() > 0.5 ? 0.25 : 0.75;
      const u1 = Math.random();
      const u2 = Math.random();
      const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
      return Math.max(0, Math.min(1, branch + z * 0.08));
    }
  };

  // Draw one sample mean of size N
  const drawSampleMean = (type: ParentDist, n: number): number => {
    let sum = 0;
    for (let i = 0; i < n; i++) {
      sum += sampleFromParent(type);
    }
    return sum / n;
  };

  // Add batch of samples
  const addSamples = (count: number) => {
    const newMeans: number[] = [];
    for (let i = 0; i < count; i++) {
      newMeans.push(drawSampleMean(parentType, sampleSizeN));
    }
    setSampleMeans((prev) => [...prev, ...newMeans].slice(-4000));
    soundFx.playComputePulse();
  };

  // Streaming loop
  useEffect(() => {
    if (isStreaming) {
      const interval = window.setInterval(() => {
        const batch: number[] = [];
        for (let i = 0; i < 25; i++) {
          batch.push(drawSampleMean(parentType, sampleSizeN));
        }
        setSampleMeans((prev) => [...prev, ...batch].slice(-4000));
      }, 50);
      streamRef.current = interval;
    } else if (streamRef.current) {
      clearInterval(streamRef.current);
      streamRef.current = null;
    }

    return () => {
      if (streamRef.current) clearInterval(streamRef.current);
    };
  }, [isStreaming, parentType, sampleSizeN]);

  // Compute histogram bins (24 bins across [0, 1])
  const numBins = 24;
  const bins = useMemo(() => {
    const counts = new Array(numBins).fill(0);
    sampleMeans.forEach((m) => {
      const binIdx = Math.min(numBins - 1, Math.max(0, Math.floor(m * numBins)));
      counts[binIdx]++;
    });
    return counts;
  }, [sampleMeans, numBins]);

  const maxBinCount = Math.max(1, ...bins);

  // Statistics
  const totalCount = sampleMeans.length;
  const empiricalMean = useMemo(() => {
    if (totalCount === 0) return 0;
    return sampleMeans.reduce((a, b) => a + b, 0) / totalCount;
  }, [sampleMeans, totalCount]);

  const empiricalStd = useMemo(() => {
    if (totalCount < 2) return 0;
    const variance = sampleMeans.reduce((acc, v) => acc + Math.pow(v - empiricalMean, 2), 0) / (totalCount - 1);
    return Math.sqrt(variance);
  }, [sampleMeans, empiricalMean, totalCount]);

  // Reset
  const handleReset = () => {
    setIsStreaming(false);
    setSampleMeans([]);
    soundFx.playBlip(380, 0.05);
  };

  return (
    <div className="space-y-6">
      {/* Parameters Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-900/80 border border-cyan-500/20 backdrop-blur-md">
        <div>
          <label className="text-xs uppercase tracking-wider text-slate-400 font-mono block mb-2">
            Parent Population
          </label>
          <div className="flex rounded-lg bg-slate-950 p-1 border border-slate-800">
            <button
              onClick={() => {
                setParentType('uniform');
                setSampleMeans([]);
                soundFx.playBlip(500, 0.02);
              }}
              className={`flex-1 py-1 text-xs font-mono rounded ${
                parentType === 'uniform' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-400'
              }`}
            >
              Uniform
            </button>
            <button
              onClick={() => {
                setParentType('exponential');
                setSampleMeans([]);
                soundFx.playBlip(500, 0.02);
              }}
              className={`flex-1 py-1 text-xs font-mono rounded ${
                parentType === 'exponential' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-400'
              }`}
            >
              Skewed Exp
            </button>
            <button
              onClick={() => {
                setParentType('bimodal');
                setSampleMeans([]);
                soundFx.playBlip(500, 0.02);
              }}
              className={`flex-1 py-1 text-xs font-mono rounded ${
                parentType === 'bimodal' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-400'
              }`}
            >
              Bimodal
            </button>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-mono mb-1">
            <span className="text-slate-400">Sample Size per Draw (N):</span>
            <span className="text-cyan-300 font-bold">{sampleSizeN}</span>
          </div>
          <input
            type="range"
            min="1"
            max="40"
            value={sampleSizeN}
            onChange={(e) => {
              setSampleSizeN(parseInt(e.target.value));
              setSampleMeans([]);
              soundFx.playBlip(600, 0.02);
            }}
            className="w-full accent-cyan-400 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>N=1 (Parent)</span>
            <span>N=10</span>
            <span>N=40 (Gaussian Limit)</span>
          </div>
        </div>

        <div className="flex items-center gap-2 md:pt-4">
          <button
            onClick={() => addSamples(100)}
            className="flex-1 py-2 px-3 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/60 text-xs font-mono transition-all flex items-center justify-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5" />
            +100 Draws
          </button>
          <button
            onClick={() => addSamples(500)}
            className="flex-1 py-2 px-3 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/60 text-xs font-mono transition-all flex items-center justify-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5" />
            +500 Draws
          </button>
        </div>

        <div className="flex items-center gap-2 md:pt-4">
          <button
            onClick={() => {
              setIsStreaming(!isStreaming);
              soundFx.playBlip(isStreaming ? 400 : 700, 0.04);
            }}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono font-medium transition-all flex items-center justify-center gap-1.5 ${
              isStreaming
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 animate-pulse'
                : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-bold'
            }`}
          >
            <Play className={`w-3.5 h-3.5 ${isStreaming ? 'animate-spin' : ''}`} />
            {isStreaming ? 'Halt Stream' : 'Live Stream'}
          </button>

          <button
            onClick={handleReset}
            className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Reset distribution"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Dynamic Animated Histogram Visualizer */}
      <div className="relative rounded-2xl bg-[#070d1d] border border-cyan-500/20 p-5 shadow-2xl overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800/80 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="text-slate-400">Total Sample Draws:</span>
            <span className="text-cyan-400 font-bold text-sm">{totalCount.toLocaleString()}</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-slate-400">
              Mean x̄: <span className="text-white font-semibold">{totalCount > 0 ? empiricalMean.toFixed(3) : '—'}</span>
            </span>
            <span className="text-slate-400">
              Std Error s_x̄: <span className="text-white font-semibold">{totalCount > 1 ? empiricalStd.toFixed(3) : '—'}</span>
            </span>
            <span className="text-slate-400 hidden sm:inline">
              Theoretical SE: <span className="text-amber-400 font-semibold">{totalCount > 0 ? (0.28 / Math.sqrt(sampleSizeN)).toFixed(3) : '—'}</span>
            </span>
          </div>
        </div>

        {/* SVG Histogram */}
        <div className="w-full h-64 relative">
          <svg className="w-full h-full" viewBox="0 0 720 260">
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* Grid */}
            {[0, 0.25, 0.5, 0.75, 1].map((pct) => (
              <g key={pct}>
                <line
                  x1={40 + pct * 640}
                  y1={20}
                  x2={40 + pct * 640}
                  y2={220}
                  stroke="#1e293b"
                  strokeDasharray="2 2"
                />
                <text
                  x={40 + pct * 640}
                  y={242}
                  fill="#64748b"
                  fontSize="11"
                  fontFamily="monospace"
                  textAnchor="middle"
                >
                  {pct.toFixed(2)}
                </text>
              </g>
            ))}

            {/* Baseline */}
            <line x1={30} y1={220} x2={690} y2={220} stroke="#334155" strokeWidth="1.5" />

            {/* Histogram Bars */}
            {bins.map((count, i) => {
              const barWidth = 640 / numBins - 2;
              const barHeight = totalCount > 0 ? (count / maxBinCount) * 190 : 0;
              const xPos = 40 + i * (640 / numBins);
              const yPos = 220 - barHeight;

              return (
                <rect
                  key={i}
                  x={xPos}
                  y={yPos}
                  width={Math.max(2, barWidth)}
                  height={barHeight}
                  fill="url(#barGradient)"
                  rx="2"
                  className="transition-all duration-150"
                />
              );
            })}

            {/* Overlaid Theoretical Normal Curve when count > 50 */}
            {totalCount > 50 && empiricalStd > 0 && (() => {
              const curvePoints: Array<{ x: number; y: number }> = [];
              for (let xVal = 0; xVal <= 1; xVal += 0.01) {
                const pdf = normalPDF(xVal, empiricalMean, empiricalStd);
                // Scale factor for histogram height
                const scaledHeight = (pdf * (empiricalStd * 2.5)) * 170;
                const svgX = 40 + xVal * 640;
                const svgY = Math.max(20, 220 - scaledHeight);
                curvePoints.push({ x: svgX, y: svgY });
              }
              const dPath = curvePoints.reduce((acc, pt, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`, '');

              return (
                <path
                  d={dPath}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2.5"
                  strokeDasharray="4 2"
                  opacity="0.9"
                />
              );
            })()}
          </svg>
        </div>

        {/* Informational Explanation Strip */}
        <div className="mt-3 p-3 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <p className="font-mono">
            <span className="text-cyan-400 font-semibold">Central Limit Theorem Guarantee:</span> Regardless of how skewed the parent distribution is (e.g., Exponential), as N grows (N ≥ 30), the distribution of the sample mean X̄ₙ converges in distribution to the Gaussian normal: X̄ₙ ~ N(μ, σ²/n).
          </p>
        </div>
      </div>
    </div>
  );
}
