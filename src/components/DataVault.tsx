import { useState } from 'react';
import { motion } from 'motion/react';
import { Database, Download, Table, ChevronRight, BarChart2 } from 'lucide-react';
import { RESEARCH_DATASETS } from '../data/organizationData';
import { ResearchDataset } from '../types';
import { soundFx } from '../utils/sound';

export default function DataVault() {
  const [selectedDataset, setSelectedDataset] = useState<ResearchDataset>(RESEARCH_DATASETS[0]);

  const handleSelect = (ds: ResearchDataset) => {
    setSelectedDataset(ds);
    soundFx.playBlip(600, 0.02);
  };

  const exportCSV = (ds: ResearchDataset) => {
    soundFx.playComputePulse();
    let csv = `Index,X_Coordinate,Y_Coordinate,Density,Cluster_Category\n`;
    ds.sampleData.forEach((row) => {
      csv += `${row.index},${row.x},${row.y},${row.density},${row.category}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${ds.name}-samples.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="datasets" className="py-20 px-4 max-w-7xl mx-auto relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-[11px] uppercase tracking-widest mb-1.5">
            <Database className="w-3.5 h-3.5" />
            <span>Open Science Data Infrastructure · URS Cainta</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            Empirical Datasets Vault
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
            Curated, anonymized institutional and regional datasets for testing statistical models, spatial time series, and educational psychometrics.
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center gap-2 text-xs font-mono text-slate-400">
          <span>Licensing: </span>
          <span className="text-cyan-400 font-medium">Open Data Commons ODbL</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Dataset Selector Column */}
        <div className="space-y-2.5">
          {RESEARCH_DATASETS.map((ds) => {
            const isSelected = selectedDataset.id === ds.id;
            return (
              <div
                key={ds.id}
                onClick={() => handleSelect(ds)}
                className={`cursor-pointer p-4 rounded-xl border transition-all text-left ${
                  isSelected
                    ? 'bg-slate-900/60 border-cyan-500/40 shadow-sm'
                    : 'bg-slate-900/20 border-white/[0.06] hover:bg-slate-900/40 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span className={isSelected ? 'text-cyan-400 font-semibold' : 'text-slate-500'}>
                    {ds.category}
                  </span>
                  <span className="text-slate-500">{ds.fileSize}</span>
                </div>
                <h4 className={`text-xs font-mono font-bold mb-1 ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                  {ds.name}
                </h4>
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>{ds.rows.toLocaleString()} Rows · {ds.columns} Cols</span>
                  {isSelected && <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Dataset Details & Summary Stats */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/30 border border-white/[0.08]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-white/[0.06]">
              <div>
                <h3 className="text-base sm:text-lg font-display font-bold text-white mb-1 font-mono">
                  {selectedDataset.name}
                </h3>
                <p className="text-xs text-slate-400 font-sans max-w-xl">
                  {selectedDataset.description}
                </p>
              </div>

              <button
                onClick={() => exportCSV(selectedDataset)}
                className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5 shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV Matrix</span>
              </button>
            </div>

            {/* Summary Statistics Grid */}
            <div className="mb-5">
              <span className="text-[11px] uppercase font-mono tracking-wider text-slate-400 block mb-2.5">
                Descriptive Statistical Moments
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 font-mono text-xs">
                <div className="p-2 rounded-lg bg-black/40 border border-white/[0.06]">
                  <span className="text-slate-500 block text-[9px]">Mean (x̄)</span>
                  <span className="text-white font-bold">{selectedDataset.metrics.mean}</span>
                </div>
                <div className="p-2 rounded-lg bg-black/40 border border-white/[0.06]">
                  <span className="text-slate-500 block text-[9px]">Std Dev (s)</span>
                  <span className="text-cyan-300 font-bold">{selectedDataset.metrics.stdDev}</span>
                </div>
                <div className="p-2 rounded-lg bg-black/40 border border-white/[0.06]">
                  <span className="text-slate-500 block text-[9px]">Skewness</span>
                  <span className="text-indigo-300 font-bold">{selectedDataset.metrics.skewness}</span>
                </div>
                <div className="p-2 rounded-lg bg-black/40 border border-white/[0.06]">
                  <span className="text-slate-500 block text-[9px]">Kurtosis</span>
                  <span className="text-amber-300 font-bold">{selectedDataset.metrics.kurtosis}</span>
                </div>
                <div className="p-2 rounded-lg bg-black/40 border border-white/[0.06]">
                  <span className="text-slate-500 block text-[9px]">Median</span>
                  <span className="text-white font-bold">{selectedDataset.metrics.median}</span>
                </div>
                <div className="p-2 rounded-lg bg-black/40 border border-white/[0.06]">
                  <span className="text-slate-500 block text-[9px]">IQR Spread</span>
                  <span className="text-emerald-300 font-bold">{selectedDataset.metrics.iqr}</span>
                </div>
              </div>
            </div>

            {/* Sample Observation Matrix Table */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] uppercase font-mono tracking-wider text-slate-400">
                  Data Sample Inspection
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  Normalized: {selectedDataset.lastUpdated}
                </span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-white/[0.06] bg-black/40">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="bg-slate-900/60 text-slate-400 border-b border-white/[0.06]">
                    <tr>
                      <th className="py-2 px-3 text-[10px]">#</th>
                      <th className="py-2 px-3 text-[10px]">Dim 1 (X)</th>
                      <th className="py-2 px-3 text-[10px]">Dim 2 (Y)</th>
                      <th className="py-2 px-3 text-[10px]">Density</th>
                      <th className="py-2 px-3 text-[10px]">Category Label</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04] text-slate-300">
                    {selectedDataset.sampleData.map((row) => (
                      <tr key={row.index} className="hover:bg-slate-900/30 transition-colors">
                        <td className="py-1.5 px-3 text-slate-500 text-[11px]">{row.index}</td>
                        <td className="py-1.5 px-3 text-cyan-300 font-medium text-[11px]">{row.x.toFixed(1)}</td>
                        <td className="py-1.5 px-3 text-slate-200 text-[11px]">{row.y.toFixed(1)}</td>
                        <td className="py-1.5 px-3 text-[11px]">{(row.density * 100).toFixed(0)}%</td>
                        <td className="py-1.5 px-3 text-slate-400 text-[11px]">{row.category}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
