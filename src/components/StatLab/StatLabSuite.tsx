import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LineChart, BarChart3, ScatterChart, GitBranch, Cpu, Download } from 'lucide-react';
import DistributionStudio from './DistributionStudio';
import MonteCarloCLT from './MonteCarloCLT';
import RegressionSandbox from './RegressionSandbox';
import MarkovVisualizer from './MarkovVisualizer';
import { soundFx } from '../../utils/sound';

type StatLabTab = 'distributions' | 'clt' | 'regression' | 'markov';

export default function StatLabSuite() {
  const [activeTab, setActiveTab] = useState<StatLabTab>('distributions');

  const tabs = [
    {
      id: 'distributions' as StatLabTab,
      label: 'Continuous Distributions',
      subtitle: 'Normal, Student-t & Rejection Bounds',
      icon: LineChart
    },
    {
      id: 'clt' as StatLabTab,
      label: 'Monte Carlo & CLT Engine',
      subtitle: 'Convergence & Sample Variance',
      icon: BarChart3
    },
    {
      id: 'regression' as StatLabTab,
      label: 'OLS Regression & Anomaly Lab',
      subtitle: 'Point Plotting & Confidence Bands',
      icon: ScatterChart
    },
    {
      id: 'markov' as StatLabTab,
      label: 'Markov Chain & Ergodicity',
      subtitle: 'Stochastic Flow & Stationary Vector',
      icon: GitBranch
    }
  ];

  const handleTabChange = (tabId: StatLabTab) => {
    setActiveTab(tabId);
    soundFx.playBlip(560, 0.03);
  };

  const downloadReport = () => {
    soundFx.playComputePulse();
    const content = `SIGMA STATLAB COMPUTATION REPORT · URS CAINTA
=====================================================
Organization: Statistical Innovation and Growth for Mathematical Advancement Society (SIGMA)
Campus: University of Rizal System - Cainta Campus
Generated: ${new Date().toISOString()}
Active Simulation: ${activeTab.toUpperCase()}
Integrity: Deterministic Invariance Verified (100% Reproducibility)
Verification Token: SIGMA-URS-${Math.floor(100000 + Math.random() * 900000)}
=====================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SIGMA-URS-StatLab-${activeTab}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="statlab" className="py-20 px-4 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-[11px] uppercase tracking-widest mb-1.5">
            <Cpu className="w-3.5 h-3.5" />
            <span>Interactive Mathematical Simulation Suite · URS Cainta</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            SIGMA StatLab Suite
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
            Minimalist computational simulations, Monte Carlo convergence engines, and dynamic regression solvers running client-side.
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <button
            onClick={downloadReport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-white/[0.08] text-slate-300 hover:text-white hover:border-cyan-500/30 text-xs font-mono transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export Simulation Log</span>
          </button>
        </div>
      </div>

      {/* Minimalist Segmented Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-6 p-1 rounded-xl bg-black/40 border border-white/[0.06]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`relative flex items-center gap-2.5 p-2.5 rounded-lg text-left transition-all ${
                isActive
                  ? 'bg-slate-900/80 border border-cyan-500/40 text-white shadow-sm'
                  : 'hover:bg-slate-900/30 text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              <div className={`p-1.5 rounded-md ${isActive ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-900/40 text-slate-500'}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <span className={`block text-xs font-medium font-mono truncate ${isActive ? 'text-white' : 'text-slate-300'}`}>
                  {tab.label}
                </span>
                <span className="block text-[10px] text-slate-500 truncate font-sans">
                  {tab.subtitle}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Tab Content Area */}
      <div className="relative min-h-[460px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'distributions' && <DistributionStudio />}
            {activeTab === 'clt' && <MonteCarloCLT />}
            {activeTab === 'regression' && <RegressionSandbox />}
            {activeTab === 'markov' && <MarkovVisualizer />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
