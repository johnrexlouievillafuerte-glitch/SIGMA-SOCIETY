import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, AlertTriangle, Play, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { normalCDF, calculateDescriptiveStats } from '../utils/statistics';
import { soundFx } from '../utils/sound';

type TestType = 'ttest' | 'chisquare';

export default function HypothesisTestingConsole() {
  const [testType, setTestType] = useState<TestType>('ttest');
  const [alpha, setAlpha] = useState<number>(0.05);

  // Group 1 & Group 2 numeric data strings
  const [groupA, setGroupA] = useState<string>('78.5, 82.1, 79.8, 84.0, 81.2, 77.9, 83.5, 80.4');
  const [groupB, setGroupB] = useState<string>('86.2, 89.4, 88.0, 91.5, 87.8, 90.2, 88.9, 89.1');

  // Contingency matrix for Chi-Square: [[O11, O12], [O21, O22]]
  const [chiData, setChiData] = useState<number[][]>([
    [64, 22],
    [18, 76]
  ]);

  // Presets
  const loadPreset = (preset: 'academic' | 'hydrology' | 'sme') => {
    soundFx.playComputePulse();
    if (preset === 'academic') {
      setTestType('ttest');
      setGroupA('74.2, 76.5, 71.8, 75.0, 73.4, 78.1, 72.9, 75.8');
      setGroupB('84.5, 87.2, 82.9, 88.1, 85.0, 89.4, 86.2, 87.0');
    } else if (preset === 'hydrology') {
      setTestType('ttest');
      setGroupA('14.2, 16.5, 12.8, 15.0, 18.4, 13.9, 17.1, 15.5');
      setGroupB('34.8, 42.1, 38.5, 45.0, 39.2, 48.4, 41.0, 44.2');
    } else {
      setTestType('chisquare');
      setChiData([
        [92, 28],
        [24, 86]
      ]);
    }
  };

  // Perform Calculations
  const result = useMemo(() => {
    if (testType === 'ttest') {
      const parseNums = (str: string) =>
        str
          .split(/[,;\s]+/)
          .map((v) => parseFloat(v.trim()))
          .filter((v) => !isNaN(v));

      const numsA = parseNums(groupA);
      const numsB = parseNums(groupB);

      if (numsA.length < 2 || numsB.length < 2) {
        return { valid: false, message: 'Provide at least 2 numerical observations per group.' };
      }

      const statsA = calculateDescriptiveStats(numsA);
      const statsB = calculateDescriptiveStats(numsB);

      const n1 = numsA.length;
      const n2 = numsB.length;
      const s1Sq = Math.pow(statsA.stdDev, 2);
      const s2Sq = Math.pow(statsB.stdDev, 2);

      // Welch's t-test standard error
      const seDiff = Math.sqrt(s1Sq / n1 + s2Sq / n2);
      const tStat = seDiff > 0 ? (statsA.mean - statsB.mean) / seDiff : 0;

      // Welch-Satterthwaite degrees of freedom
      const numDf = Math.pow(s1Sq / n1 + s2Sq / n2, 2);
      const denDf = Math.pow(s1Sq / n1, 2) / (n1 - 1) + Math.pow(s2Sq / n2, 2) / (n2 - 1);
      const df = denDf > 0 ? Math.round(numDf / denDf) : 1;

      // Approximate two-tailed p-value
      const pVal = Math.max(0.00001, 2 * (1 - normalCDF(Math.abs(tStat))));

      // Cohen's d effect size
      const pooledSd = Math.sqrt(((n1 - 1) * s1Sq + (n2 - 1) * s2Sq) / (n1 + n2 - 2));
      const cohensD = pooledSd > 0 ? Math.abs(statsA.mean - statsB.mean) / pooledSd : 0;

      return {
        valid: true,
        testName: "Welch's Two-Sample t-Test",
        statLabel: 't-Statistic',
        statVal: tStat,
        df,
        pVal,
        alpha,
        effectSize: cohensD,
        effectLabel: "Cohen's d",
        statsA,
        statsB,
        reject: pVal < alpha
      };
    } else {
      // Chi-Square Test of Independence
      const o = chiData;
      const r1 = o[0][0] + o[0][1];
      const r2 = o[1][0] + o[1][1];
      const c1 = o[0][0] + o[1][0];
      const c2 = o[0][1] + o[1][1];
      const n = r1 + r2;

      if (n === 0) return { valid: false, message: 'Total observations must be > 0.' };

      const e11 = (r1 * c1) / n;
      const e12 = (r1 * c2) / n;
      const e21 = (r2 * c1) / n;
      const e22 = (r2 * c2) / n;

      let chiSq = 0;
      chiSq += Math.pow(o[0][0] - e11, 2) / (e11 || 1);
      chiSq += Math.pow(o[0][1] - e12, 2) / (e12 || 1);
      chiSq += Math.pow(o[1][0] - e21, 2) / (e21 || 1);
      chiSq += Math.pow(o[1][1] - e22, 2) / (e22 || 1);

      const df = 1;
      const zEquivalent = Math.sqrt(chiSq);
      const pVal = Math.max(0.00001, 2 * (1 - normalCDF(zEquivalent)));
      const phi = Math.sqrt(chiSq / n);

      return {
        valid: true,
        testName: 'Pearson’s Chi-Square Test (2×2)',
        statLabel: 'χ² Statistic',
        statVal: chiSq,
        df,
        pVal,
        alpha,
        effectSize: phi,
        effectLabel: 'Cramer’s V',
        reject: pVal < alpha
      };
    }
  }, [testType, groupA, groupB, chiData, alpha]);

  const runEvaluation = () => {
    soundFx.playComputePulse();
    if (result.valid && result.reject) {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.75 },
        colors: ['#06b6d4', '#38bdf8', '#10b981']
      });
    }
  };

  return (
    <section id="hypothesis" className="py-20 px-4 max-w-7xl mx-auto relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-[11px] uppercase tracking-widest mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Inference Engine · URS Cainta</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            Scientific Hypothesis Console
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
            Execute real-time Welch's t-tests and Chi-Square independence tests with asymptotic power estimation and automated rejection verdict.
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-400">Significance Level:</span>
          <select
            value={alpha}
            onChange={(e) => {
              setAlpha(parseFloat(e.target.value));
              soundFx.playBlip(600, 0.02);
            }}
            className="bg-black/50 border border-white/[0.08] rounded px-2 py-1 text-cyan-300 font-mono text-xs focus:outline-none focus:border-cyan-500"
          >
            <option value={0.05}>α = 0.05 (Standard)</option>
            <option value={0.01}>α = 0.01 (Stringent)</option>
            <option value={0.001}>α = 0.001 (SIGMA Tier)</option>
          </select>
        </div>
      </div>

      {/* Main Console */}
      <div className="rounded-2xl bg-slate-900/30 border border-white/[0.08] p-5 sm:p-6 backdrop-blur-md">
        {/* Preset Selector & Test Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
          <div className="flex rounded-lg bg-black/40 p-1 border border-white/[0.06]">
            <button
              onClick={() => {
                setTestType('ttest');
                soundFx.playBlip(540, 0.02);
              }}
              className={`py-1 px-3 rounded text-xs font-mono transition-colors ${
                testType === 'ttest'
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Welch's t-Test
            </button>
            <button
              onClick={() => {
                setTestType('chisquare');
                soundFx.playBlip(540, 0.02);
              }}
              className={`py-1 px-3 rounded text-xs font-mono transition-colors ${
                testType === 'chisquare'
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Chi-Square (2×2)
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono">
            <span className="text-slate-500 text-[11px]">URS Presets:</span>
            <button
              onClick={() => loadPreset('academic')}
              className="px-2 py-1 rounded bg-black/40 hover:bg-black/60 text-slate-300 border border-white/[0.06] text-[11px] transition-colors"
            >
              STEM Diagnostic
            </button>
            <button
              onClick={() => loadPreset('hydrology')}
              className="px-2 py-1 rounded bg-black/40 hover:bg-black/60 text-cyan-300 border border-white/[0.06] text-[11px] transition-colors"
            >
              Cainta Rainfall
            </button>
            <button
              onClick={() => loadPreset('sme')}
              className="px-2 py-1 rounded bg-black/40 hover:bg-black/60 text-purple-300 border border-white/[0.06] text-[11px] transition-colors"
            >
              Rizal SME Survey
            </button>
          </div>
        </div>

        {/* Inputs vs Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
          {/* Data Inputs */}
          <div className="space-y-3.5">
            <h4 className="text-[11px] uppercase font-mono tracking-wider text-slate-400">
              Observation Data Stream
            </h4>

            {testType === 'ttest' ? (
              <>
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-cyan-400 font-semibold">Group A (Baseline / Pre-Test):</span>
                    <span className="text-slate-500 text-[10px]">Values</span>
                  </div>
                  <textarea
                    rows={2}
                    value={groupA}
                    onChange={(e) => setGroupA(e.target.value)}
                    className="w-full bg-slate-900/60 border border-white/[0.08] rounded-lg p-2 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
                  />
                  {result.valid && 'statsA' in result && result.statsA && (
                    <div className="flex gap-3 mt-1.5 text-[10px] font-mono text-slate-400">
                      <span>x̄_A = {result.statsA.mean}</span>
                      <span>s_A = {result.statsA.stdDev}</span>
                      <span>n_A = {groupA.split(',').length}</span>
                    </div>
                  )}
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-indigo-400 font-semibold">Group B (Treatment / Post-Test):</span>
                    <span className="text-slate-500 text-[10px]">Values</span>
                  </div>
                  <textarea
                    rows={2}
                    value={groupB}
                    onChange={(e) => setGroupB(e.target.value)}
                    className="w-full bg-slate-900/60 border border-white/[0.08] rounded-lg p-2 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
                  />
                  {result.valid && 'statsB' in result && result.statsB && (
                    <div className="flex gap-3 mt-1.5 text-[10px] font-mono text-slate-400">
                      <span>x̄_B = {result.statsB.mean}</span>
                      <span>s_B = {result.statsB.stdDev}</span>
                      <span>n_B = {groupB.split(',').length}</span>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
                <span className="text-xs font-mono text-slate-300 block mb-2.5 font-semibold">
                  2×2 Observed Contingency Matrix:
                </span>
                <div className="grid grid-cols-2 gap-2.5 font-mono text-xs max-w-xs">
                  <div>
                    <span className="text-[9px] text-slate-500 block mb-0.5">Cell (1, 1)</span>
                    <input
                      type="number"
                      value={chiData[0][0]}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 0;
                        setChiData([[val, chiData[0][1]], [chiData[1][0]], [chiData[1][1]]]);
                      }}
                      className="w-full bg-slate-900/80 border border-white/[0.08] rounded p-1.5 text-white text-center font-bold"
                    />
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 block mb-0.5">Cell (1, 2)</span>
                    <input
                      type="number"
                      value={chiData[0][1]}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 0;
                        setChiData([[chiData[0][0], val], [chiData[1][0]], [chiData[1][1]]]);
                      }}
                      className="w-full bg-slate-900/80 border border-white/[0.08] rounded p-1.5 text-white text-center font-bold"
                    />
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 block mb-0.5">Cell (2, 1)</span>
                    <input
                      type="number"
                      value={chiData[1][0]}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 0;
                        setChiData([[chiData[0][0], chiData[0][1]], [val, chiData[1][1]]]);
                      }}
                      className="w-full bg-slate-900/80 border border-white/[0.08] rounded p-1.5 text-white text-center font-bold"
                    />
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 block mb-0.5">Cell (2, 2)</span>
                    <input
                      type="number"
                      value={chiData[1][1]}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 0;
                        setChiData([[chiData[0][0], chiData[0][1]], [chiData[1][0], val]]);
                      }}
                      className="w-full bg-slate-900/80 border border-white/[0.08] rounded p-1.5 text-white text-center font-bold"
                    />
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={runEvaluation}
              className="w-full py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs transition-all flex items-center justify-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Evaluate Invariant Test</span>
            </button>
          </div>

          {/* Results Display */}
          <div className="flex flex-col justify-between p-4 sm:p-5 rounded-xl bg-black/40 border border-white/[0.06]">
            {result.valid ? (
              <div className="space-y-3.5">
                <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.06] text-xs font-mono">
                  <span className="text-slate-400 font-semibold">{result.testName}</span>
                  <span className="text-cyan-400">df = {result.df}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-900/40 border border-white/[0.06]">
                    <span className="text-slate-500 block text-[9px] uppercase">{result.statLabel}</span>
                    <span className="text-white font-bold text-sm">{result.statVal?.toFixed(3)}</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900/40 border border-white/[0.06]">
                    <span className="text-slate-500 block text-[9px] uppercase">p-Value</span>
                    <span className={`font-bold text-sm ${result.reject ? 'text-emerald-400' : 'text-slate-300'}`}>
                      {result.pVal !== undefined && result.pVal < 0.0001 ? '< 0.0001' : result.pVal?.toFixed(4)}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900/40 border border-white/[0.06]">
                    <span className="text-slate-500 block text-[9px] uppercase">{result.effectLabel}</span>
                    <span className="text-cyan-300 font-bold text-sm">{result.effectSize?.toFixed(3)}</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900/40 border border-white/[0.06]">
                    <span className="text-slate-500 block text-[9px] uppercase">Alpha</span>
                    <span className="text-amber-400 font-bold text-sm">α = {alpha}</span>
                  </div>
                </div>

                {/* Verdict Banner */}
                <div
                  className={`p-3.5 rounded-xl border flex items-start gap-2.5 ${
                    result.reject
                      ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                      : 'bg-slate-900/30 border-white/[0.08] text-slate-300'
                  }`}
                >
                  {result.reject ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h5 className="font-mono font-bold text-xs mb-0.5">
                      {result.reject ? 'REJECT NULL HYPOTHESIS (H₀)' : 'FAIL TO REJECT NULL HYPOTHESIS (H₀)'}
                    </h5>
                    <p className="text-[11px] font-sans leading-relaxed text-slate-300">
                      {result.reject
                        ? `Evidence is statistically significant at α = ${alpha} (p = ${result.pVal !== undefined && result.pVal < 0.0001 ? '< 0.0001' : result.pVal?.toFixed(4)}). The observed difference is improbable under the null invariant model.`
                        : `Evidence is insufficient to reject the null hypothesis at α = ${alpha} (p = ${result.pVal?.toFixed(4)}).`}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 text-slate-400 font-mono text-xs">
                {result.message}
              </div>
            )}

            <div className="pt-2.5 border-t border-white/[0.06] text-[10px] font-mono text-slate-500 flex justify-between">
              <span>SIGMA Inference Module</span>
              <span>URS Cainta</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
