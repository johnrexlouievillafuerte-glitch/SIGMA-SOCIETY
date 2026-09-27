import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { PlusCircle, RotateCcw, Sparkles, Trash2 } from 'lucide-react';
import { computeOLS } from '../../utils/statistics';
import { soundFx } from '../../utils/sound';

interface Point {
  id: string;
  x: number;
  y: number;
}

export default function RegressionSandbox() {
  const [points, setPoints] = useState<Point[]>([
    { id: '1', x: 1.5, y: 2.2 },
    { id: '2', x: 2.8, y: 3.6 },
    { id: '3', x: 3.9, y: 4.1 },
    { id: '4', x: 5.2, y: 6.4 },
    { id: '5', x: 6.5, y: 6.9 },
    { id: '6', x: 7.8, y: 8.5 },
    { id: '7', x: 8.9, y: 9.1 }
  ]);

  const [showResiduals, setShowResiduals] = useState<boolean>(true);
  const [showConfidenceBand, setShowConfidenceBand] = useState<boolean>(true);

  // SVG Coordinate space
  const svgWidth = 680;
  const svgHeight = 360;
  const pad = { top: 25, right: 30, bottom: 45, left: 45 };

  const xDomain = { min: 0, max: 10 };
  const yDomain = { min: 0, max: 12 };

  // Convert data coords to SVG pixels
  const toSvgX = (x: number) => pad.left + ((x - xDomain.min) / (xDomain.max - xDomain.min)) * (svgWidth - pad.left - pad.right);
  const toSvgY = (y: number) => svgHeight - pad.bottom - ((y - yDomain.min) / (yDomain.max - yDomain.min)) * (svgHeight - pad.top - pad.bottom);

  // Convert SVG pixels back to data coords
  const toDataCoords = (svgX: number, svgY: number) => {
    const x = xDomain.min + ((svgX - pad.left) / (svgWidth - pad.left - pad.right)) * (xDomain.max - xDomain.min);
    const y = yDomain.min + ((svgHeight - pad.bottom - svgY) / (svgHeight - pad.top - pad.bottom)) * (yDomain.max - yDomain.min);
    return {
      x: Math.max(xDomain.min, Math.min(xDomain.max, Number(x.toFixed(2)))),
      y: Math.max(yDomain.min, Math.min(yDomain.max, Number(y.toFixed(2))))
    };
  };

  // Compute OLS
  const ols = useMemo(() => {
    return computeOLS(points);
  }, [points]);

  // Handle canvas click to add point
  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * svgWidth;
    const svgY = ((e.clientY - rect.top) / rect.height) * svgHeight;

    if (
      svgX >= pad.left &&
      svgX <= svgWidth - pad.right &&
      svgY >= pad.top &&
      svgY <= svgHeight - pad.bottom
    ) {
      const dataPt = toDataCoords(svgX, svgY);
      setPoints((prev) => [...prev, { id: Math.random().toString(), ...dataPt }]);
      soundFx.playBlip(750, 0.03);
    }
  };

  // Remove individual point
  const removePoint = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPoints((prev) => prev.filter((p) => p.id !== id));
    soundFx.playBlip(320, 0.03);
  };

  // Presets
  const loadPreset = (type: 'linear' | 'outlier' | 'anscombe' | 'random') => {
    soundFx.playComputePulse();
    if (type === 'linear') {
      const pts: Point[] = [];
      for (let i = 1; i <= 8; i++) {
        pts.push({
          id: i.toString(),
          x: i,
          y: Number((1.2 * i + 0.8 + (Math.random() - 0.5) * 0.9).toFixed(2))
        });
      }
      setPoints(pts);
    } else if (type === 'outlier') {
      const pts: Point[] = [
        { id: '1', x: 1.5, y: 2.0 },
        { id: '2', x: 2.5, y: 2.8 },
        { id: '3', x: 3.5, y: 3.9 },
        { id: '4', x: 4.5, y: 5.1 },
        { id: '5', x: 5.5, y: 5.9 },
        { id: '6', x: 9.2, y: 1.2 } // High leverage outlier
      ];
      setPoints(pts);
    } else if (type === 'anscombe') {
      // Anscombe Quartet #2 - Quadratic curve
      const pts: Point[] = [
        { id: '1', x: 1.0, y: 3.14 },
        { id: '2', x: 2.5, y: 5.76 },
        { id: '3', x: 4.0, y: 7.71 },
        { id: '4', x: 5.5, y: 8.84 },
        { id: '5', x: 7.0, y: 8.47 },
        { id: '6', x: 8.5, y: 7.04 },
        { id: '7', x: 9.5, y: 5.25 }
      ];
      setPoints(pts);
    } else {
      const pts: Point[] = [];
      for (let i = 0; i < 9; i++) {
        pts.push({
          id: i.toString(),
          x: Number((Math.random() * 8 + 1).toFixed(2)),
          y: Number((Math.random() * 9 + 1).toFixed(2))
        });
      }
      setPoints(pts);
    }
  };

  // Generate confidence band paths
  const confidenceBandPath = useMemo(() => {
    if (points.length < 3 || !showConfidenceBand) return '';
    const topPts: string[] = [];
    const botPts: string[] = [];
    const meanX = points.reduce((acc, p) => acc + p.x, 0) / points.length;
    const sxx = points.reduce((acc, p) => acc + Math.pow(p.x - meanX, 2), 0) || 1;
    const n = points.length;

    for (let x = 0; x <= 10; x += 0.5) {
      const yFit = ols.slope * x + ols.intercept;
      // Standard error of regression estimate
      const seFit = Math.sqrt(ols.mse * (1 / n + Math.pow(x - meanX, 2) / sxx));
      const margin = 1.96 * seFit;

      const px = toSvgX(x);
      const pyTop = toSvgY(yFit + margin);
      const pyBot = toSvgY(yFit - margin);

      topPts.push(`${px.toFixed(1)},${pyTop.toFixed(1)}`);
      botPts.unshift(`${px.toFixed(1)},${pyBot.toFixed(1)}`);
    }

    return `M ${topPts.join(' L ')} L ${botPts.join(' L ')} Z`;
  }, [points, ols, showConfidenceBand]);

  return (
    <div className="space-y-6">
      {/* HUD Metrics & Formula Display */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-900/80 border border-cyan-500/20 backdrop-blur-md">
        <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
          <span className="text-[10px] uppercase font-mono text-slate-400 block">Fitted OLS Model</span>
          <span className="text-cyan-400 font-mono font-bold text-sm">
            ŷ = {ols.intercept >= 0 ? '' : '-'}{Math.abs(ols.intercept).toFixed(2)} {ols.slope >= 0 ? '+' : '-'} {Math.abs(ols.slope).toFixed(2)}x
          </span>
        </div>

        <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
          <span className="text-[10px] uppercase font-mono text-slate-400 block">R² Determination</span>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-mono font-bold text-sm">{(ols.r2 * 100).toFixed(1)}%</span>
            <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-400 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, Math.max(0, ols.r2 * 100))}%` }}
              />
            </div>
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
          <span className="text-[10px] uppercase font-mono text-slate-400 block">Pearson r Correlation</span>
          <span className={`font-mono font-bold text-sm ${ols.r >= 0 ? 'text-cyan-300' : 'text-rose-400'}`}>
            {ols.r >= 0 ? '+' : ''}{ols.r.toFixed(3)}
          </span>
        </div>

        <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
          <span className="text-[10px] uppercase font-mono text-slate-400 block">Significance (p-value)</span>
          <span className="text-amber-400 font-mono font-bold text-sm">
            {ols.pValue < 0.001 ? 'p < 0.001' : `p = ${ols.pValue.toFixed(3)}`}
          </span>
        </div>
      </div>

      {/* Preset Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Presets:</span>
          <button
            onClick={() => loadPreset('linear')}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            Clean Linear
          </button>
          <button
            onClick={() => loadPreset('outlier')}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 transition-colors"
          >
            Leverage Outlier
          </button>
          <button
            onClick={() => loadPreset('anscombe')}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-purple-300 transition-colors"
          >
            Anscombe Curve
          </button>
          <button
            onClick={() => loadPreset('random')}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 transition-colors"
          >
            Random Dispersion
          </button>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1.5 cursor-pointer text-slate-300">
            <input
              type="checkbox"
              checked={showResiduals}
              onChange={(e) => setShowResiduals(e.target.checked)}
              className="accent-cyan-400 rounded"
            />
            Residual Stems
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer text-slate-300">
            <input
              type="checkbox"
              checked={showConfidenceBand}
              onChange={(e) => setShowConfidenceBand(e.target.checked)}
              className="accent-cyan-400 rounded"
            />
            95% Confidence Envelope
          </label>
          <button
            onClick={() => {
              setPoints([]);
              soundFx.playBlip(300, 0.05);
            }}
            className="p-1.5 rounded text-rose-400 hover:bg-rose-500/10 transition-colors"
            title="Clear all points"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Cartesian Grid */}
      <div className="relative rounded-2xl bg-[#070d1d] border border-cyan-500/20 p-4 shadow-2xl overflow-hidden">
        <div className="absolute top-3 left-4 flex items-center gap-2 text-xs font-mono text-slate-400 pointer-events-none">
          <PlusCircle className="w-3.5 h-3.5 text-cyan-400" />
          <span>Click anywhere in coordinate plane to plot empirical observations ({points.length} points active)</span>
        </div>

        <div className="w-full pt-6">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-auto cursor-crosshair select-none"
            onClick={handleSvgClick}
          >
            <defs>
              <linearGradient id="bandGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* Grid Lines */}
            {[0, 2, 4, 6, 8, 10].map((gx) => (
              <g key={`x-${gx}`}>
                <line
                  x1={toSvgX(gx)}
                  y1={pad.top}
                  x2={toSvgX(gx)}
                  y2={svgHeight - pad.bottom}
                  stroke="#1e293b"
                  strokeDasharray="2 2"
                />
                <text
                  x={toSvgX(gx)}
                  y={svgHeight - pad.bottom + 18}
                  fill="#64748b"
                  fontSize="10"
                  fontFamily="monospace"
                  textAnchor="middle"
                >
                  {gx}
                </text>
              </g>
            ))}

            {[0, 3, 6, 9, 12].map((gy) => (
              <g key={`y-${gy}`}>
                <line
                  x1={pad.left}
                  y1={toSvgY(gy)}
                  x2={svgWidth - pad.right}
                  y2={toSvgY(gy)}
                  stroke="#1e293b"
                  strokeDasharray="2 2"
                />
                <text
                  x={pad.left - 10}
                  y={toSvgY(gy) + 4}
                  fill="#64748b"
                  fontSize="10"
                  fontFamily="monospace"
                  textAnchor="end"
                >
                  {gy}
                </text>
              </g>
            ))}

            {/* Confidence Band Polygon */}
            {confidenceBandPath && (
              <path d={confidenceBandPath} fill="url(#bandGrad)" />
            )}

            {/* Residual Stems (Vertical Lines from Points to Regression Line) */}
            {showResiduals && points.length >= 2 && points.map((p) => {
              const fittedY = ols.slope * p.x + ols.intercept;
              const px = toSvgX(p.x);
              const py = toSvgY(p.y);
              const pFittedY = toSvgY(fittedY);

              return (
                <line
                  key={`res-${p.id}`}
                  x1={px}
                  y1={py}
                  x2={px}
                  y2={pFittedY}
                  stroke="#f43f5e"
                  strokeWidth="1.2"
                  strokeDasharray="2 2"
                  opacity="0.8"
                />
              );
            })}

            {/* OLS Regression Line */}
            {points.length >= 2 && (() => {
              const xStart = 0;
              const yStart = ols.slope * xStart + ols.intercept;
              const xEnd = 10;
              const yEnd = ols.slope * xEnd + ols.intercept;

              return (
                <line
                  x1={toSvgX(xStart)}
                  y1={toSvgY(yStart)}
                  x2={toSvgX(xEnd)}
                  y2={toSvgY(yEnd)}
                  stroke="#06b6d4"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              );
            })()}

            {/* Data Points */}
            {points.map((p) => {
              const px = toSvgX(p.x);
              const py = toSvgY(p.y);

              return (
                <g key={p.id} className="cursor-pointer group" onClick={(e) => removePoint(p.id, e)}>
                  <circle
                    cx={px}
                    cy={py}
                    r="8"
                    fill="transparent"
                  />
                  <circle
                    cx={px}
                    cy={py}
                    r="5"
                    fill="#38bdf8"
                    stroke="#0284c7"
                    strokeWidth="1.5"
                    className="group-hover:scale-125 transition-transform duration-150"
                  />
                </g>
              );
            })}
          </svg>
        </div>

        <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>Click any point to delete it</span>
          <span>Standard Error of Estimate: {ols.mse.toFixed(3)}</span>
        </div>
      </div>
    </div>
  );
}
