import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { normalPDF, normalCDF, studentTPDF, probit } from '../../utils/statistics';
import { soundFx } from '../../utils/sound';

export default function DistributionStudio() {
  const [distType, setDistType] = useState<'normal' | 'studentT'>('normal');
  const [mean, setMean] = useState<number>(0);
  const [stdDev, setStdDev] = useState<number>(1);
  const [df, setDf] = useState<number>(5);
  const [alpha, setAlpha] = useState<number>(0.05); // significance level
  const [testStat, setTestStat] = useState<number>(1.96);
  const [hoverX, setHoverX] = useState<number | null>(null);

  // SVG coordinate dimensions
  const width = 720;
  const height = 300;
  const padding = { top: 30, right: 30, bottom: 40, left: 40 };

  const xMin = -4.5;
  const xMax = 4.5;

  // Calculate critical values based on alpha (two-tailed)
  const zCrit = useMemo(() => {
    return Math.abs(probit(1 - alpha / 2));
  }, [alpha]);

  // Compute curve points
  const points = useMemo(() => {
    const pts: Array<{ x: number; y: number; pdfVal: number }> = [];
    const steps = 180;
    const stepSize = (xMax - xMin) / steps;

    for (let i = 0; i <= steps; i++) {
      const xVal = xMin + i * stepSize;
      let pdfVal = 0;

      if (distType === 'normal') {
        pdfVal = normalPDF(xVal, mean, stdDev);
      } else {
        pdfVal = studentTPDF(xVal, df);
      }

      // Map to SVG coordinates
      const svgX = padding.left + ((xVal - xMin) / (xMax - xMin)) * (width - padding.left - padding.right);
      const maxY = distType === 'normal' ? (0.45 / Math.min(1.5, Math.max(0.4, stdDev))) : 0.45;
      const svgY = height - padding.bottom - (pdfVal / maxY) * (height - padding.top - padding.bottom);

      pts.push({ x: svgX, y: Math.max(padding.top, svgY), pdfVal });
    }
    return pts;
  }, [distType, mean, stdDev, df, width, height, padding.bottom, padding.left, padding.right, padding.top]);

  // Generate SVG path string
  const linePath = useMemo(() => {
    if (points.length === 0) return '';
    return points.reduce((acc, pt, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`, '');
  }, [points]);

  // Two-tailed p-value for test statistic
  const pValue = useMemo(() => {
    const absVal = Math.abs(testStat);
    if (distType === 'normal') {
      const rightTail = 1 - normalCDF(absVal);
      return Math.min(1, Math.max(0.00001, rightTail * 2));
    } else {
      // Approximation for t distribution tail
      const zEquivalent = absVal * Math.sqrt((df - 2) / Math.max(1, df));
      const rightTail = 1 - normalCDF(zEquivalent);
      return Math.min(1, Math.max(0.00001, rightTail * 2));
    }
  }, [testStat, distType, df]);

  const isSignificant = pValue < alpha;

  const handleSliderChange = () => {
    soundFx.playBlip(620, 0.02);
  };

  return (
    <div className="space-y-6">
      {/* Control Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-900/80 border border-cyan-500/20 shadow-lg backdrop-blur-md">
        <div>
          <label className="text-xs uppercase tracking-wider text-slate-400 font-mono block mb-2">
            Family Distribution
          </label>
          <div className="flex rounded-lg bg-slate-950 p-1 border border-slate-800">
            <button
              onClick={() => {
                setDistType('normal');
                soundFx.playBlip(540, 0.03);
              }}
              className={`flex-1 py-1.5 text-xs font-mono rounded transition-colors ${
                distType === 'normal'
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Normal N(μ, σ²)
            </button>
            <button
              onClick={() => {
                setDistType('studentT');
                soundFx.playBlip(540, 0.03);
              }}
              className={`flex-1 py-1.5 text-xs font-mono rounded transition-colors ${
                distType === 'studentT'
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Student's t(ν)
            </button>
          </div>
        </div>

        {distType === 'normal' ? (
          <>
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-slate-400">Mean (μ):</span>
                <span className="text-cyan-300">{mean.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-2"
                max="2"
                step="0.05"
                value={mean}
                onChange={(e) => {
                  setMean(parseFloat(e.target.value));
                  handleSliderChange();
                }}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-slate-400">Std Dev (σ):</span>
                <span className="text-cyan-300">{stdDev.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.05"
                value={stdDev}
                onChange={(e) => {
                  setStdDev(parseFloat(e.target.value));
                  handleSliderChange();
                }}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>
          </>
        ) : (
          <div className="md:col-span-2">
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-400">Degrees of Freedom (ν):</span>
              <span className="text-cyan-300">{df}</span>
            </div>
            <input
              type="range"
              min="1"
              max="40"
              step="1"
              value={df}
              onChange={(e) => {
                setDf(parseInt(e.target.value));
                handleSliderChange();
              }}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>
        )}

        <div>
          <div className="flex justify-between text-xs font-mono mb-1">
            <span className="text-slate-400">Significance Level (α):</span>
            <span className="text-cyan-300">{(alpha * 100).toFixed(0)}%</span>
          </div>
          <select
            value={alpha}
            onChange={(e) => {
              setAlpha(parseFloat(e.target.value));
              soundFx.playBlip(700, 0.04);
            }}
            className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
          >
            <option value={0.10}>α = 0.10 (90% Conf.)</option>
            <option value={0.05}>α = 0.05 (95% Conf.)</option>
            <option value={0.01}>α = 0.01 (99% Conf.)</option>
            <option value={0.001}>α = 0.001 (99.9% Conf.)</option>
          </select>
        </div>
      </div>

      {/* SVG Interactive Canvas */}
      <div className="relative rounded-2xl bg-[#070d1d] border border-cyan-500/20 p-4 overflow-hidden shadow-2xl">
        <div className="absolute top-3 left-4 flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>Continuous Probability Density Dynamic Wave</span>
        </div>

        <div className="absolute top-3 right-4 flex items-center gap-4 text-xs font-mono">
          <span className="text-slate-400">
            Critical Threshold: <span className="text-amber-400 font-semibold">±{zCrit.toFixed(3)}</span>
          </span>
          <span className="text-slate-400">
            Two-Tailed p: <span className={isSignificant ? 'text-emerald-400 font-bold' : 'text-slate-300 font-semibold'}>{pValue.toFixed(4)}</span>
          </span>
        </div>

        <div className="w-full overflow-x-auto pt-6">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-auto max-h-[340px] select-none"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const svgX = ((e.clientX - rect.left) / rect.width) * width;
              const mappedX = xMin + ((svgX - padding.left) / (width - padding.left - padding.right)) * (xMax - xMin);
              setHoverX(Math.max(xMin, Math.min(xMax, mappedX)));
            }}
            onMouseLeave={() => setHoverX(null)}
          >
            <defs>
              <linearGradient id="curveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="rejectionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* Grid Lines */}
            {[-3, -2, -1, 0, 1, 2, 3].map((val) => {
              const xPos = padding.left + ((val - xMin) / (xMax - xMin)) * (width - padding.left - padding.right);
              return (
                <g key={val}>
                  <line
                    x1={xPos}
                    y1={padding.top}
                    x2={xPos}
                    y2={height - padding.bottom}
                    stroke="#1e293b"
                    strokeDasharray="3 3"
                    strokeWidth="1"
                  />
                  <text
                    x={xPos}
                    y={height - padding.bottom + 20}
                    fill="#64748b"
                    fontSize="11"
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    {val > 0 ? `+${val}σ` : val === 0 ? '0' : `${val}σ`}
                  </text>
                </g>
              );
            })}

            {/* Baseline */}
            <line
              x1={padding.left}
              y1={height - padding.bottom}
              x2={width - padding.right}
              y2={height - padding.bottom}
              stroke="#334155"
              strokeWidth="1.5"
            />

            {/* Curve Fill Area */}
            {points.length > 0 && (
              <path
                d={`${linePath} L ${points[points.length - 1].x} ${height - padding.bottom} L ${points[0].x} ${height - padding.bottom} Z`}
                fill="url(#curveGradient)"
              />
            )}

            {/* Main Animated Stroke */}
            <motion.path
              d={linePath}
              fill="none"
              stroke="#06b6d4"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />

            {/* Critical Rejection Regions */}
            {(() => {
              const leftCritX = padding.left + ((-zCrit - xMin) / (xMax - xMin)) * (width - padding.left - padding.right);
              const rightCritX = padding.left + ((zCrit - xMin) / (xMax - xMin)) * (width - padding.left - padding.right);
              return (
                <>
                  {/* Left rejection line */}
                  <line
                    x1={leftCritX}
                    y1={padding.top}
                    x2={leftCritX}
                    y2={height - padding.bottom}
                    stroke="#ef4444"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                  />
                  {/* Right rejection line */}
                  <line
                    x1={rightCritX}
                    y1={padding.top}
                    x2={rightCritX}
                    y2={height - padding.bottom}
                    stroke="#ef4444"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                  />
                  <text
                    x={leftCritX - 6}
                    y={padding.top + 16}
                    fill="#ef4444"
                    fontSize="10"
                    fontFamily="monospace"
                    textAnchor="end"
                  >
                    -z(α/2)
                  </text>
                  <text
                    x={rightCritX + 6}
                    y={padding.top + 16}
                    fill="#ef4444"
                    fontSize="10"
                    fontFamily="monospace"
                    textAnchor="start"
                  >
                    +z(α/2)
                  </text>
                </>
              );
            })()}

            {/* Current Test Statistic Point */}
            {(() => {
              const statX = padding.left + ((testStat - xMin) / (xMax - xMin)) * (width - padding.left - padding.right);
              return (
                <g>
                  <line
                    x1={statX}
                    y1={padding.top + 10}
                    x2={statX}
                    y2={height - padding.bottom}
                    stroke="#38bdf8"
                    strokeWidth="2"
                  />
                  <circle cx={statX} cy={padding.top + 14} r="4" fill="#38bdf8" />
                  <text
                    x={statX}
                    y={padding.top}
                    fill="#38bdf8"
                    fontSize="10"
                    fontFamily="monospace"
                    textAnchor="middle"
                    fontWeight="bold"
                  >
                    z = {testStat.toFixed(2)}
                  </text>
                </g>
              );
            })()}

            {/* Hover Tooltip Indicator */}
            {hoverX !== null && (() => {
              const hoverSvgX = padding.left + ((hoverX - xMin) / (xMax - xMin)) * (width - padding.left - padding.right);
              const pdf = distType === 'normal' ? normalPDF(hoverX, mean, stdDev) : studentTPDF(hoverX, df);
              const maxY = distType === 'normal' ? (0.45 / Math.min(1.5, Math.max(0.4, stdDev))) : 0.45;
              const hoverSvgY = height - padding.bottom - (pdf / maxY) * (height - padding.top - padding.bottom);

              return (
                <g>
                  <line
                    x1={hoverSvgX}
                    y1={padding.top}
                    x2={hoverSvgX}
                    y2={height - padding.bottom}
                    stroke="#94a3b8"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                  <circle cx={hoverSvgX} cy={hoverSvgY} r="5" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />
                </g>
              );
            })()}
          </svg>
        </div>

        {/* Dynamic Interactive Test Stat Drag Bar */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1 w-full">
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-400">Drag Empirical Test Statistic (z*):</span>
              <span className="text-cyan-300 font-bold">{testStat.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="-4.0"
              max="4.0"
              step="0.05"
              value={testStat}
              onChange={(e) => {
                setTestStat(parseFloat(e.target.value));
                handleSliderChange();
              }}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className={`px-4 py-2 rounded-lg border text-xs font-mono flex items-center gap-2 ${
              isSignificant
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-slate-800/50 border-slate-700 text-slate-300'
            }`}>
              <div className={`w-2 h-2 rounded-full ${isSignificant ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
              <span>
                {isSignificant ? 'REJECT H₀ : Statistically Significant' : 'FAIL TO REJECT H₀ : Insufficient Evidence'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
