import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Network, GitFork, Dna, Atom, TrendingUp, ArrowRight, X, ExternalLink } from 'lucide-react';
import { RESEARCH_DIVISIONS } from '../data/organizationData';
import { soundFx } from '../utils/sound';

export default function ResearchDivisions() {
  const [selectedDivision, setSelectedDivision] = useState<typeof RESEARCH_DIVISIONS[0] | null>(null);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Network': return Network;
      case 'GitFork': return GitFork;
      case 'Dna': return Dna;
      case 'Atom': return Atom;
      case 'TrendingUp': return TrendingUp;
      default: return Layers;
    }
  };

  const handleCardClick = (div: typeof RESEARCH_DIVISIONS[0]) => {
    soundFx.playBlip(640, 0.03);
    setSelectedDivision(div);
  };

  return (
    <section id="divisions" className="py-20 px-4 max-w-7xl mx-auto relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-[11px] uppercase tracking-widest mb-1.5">
            <Layers className="w-3.5 h-3.5" />
            <span>Academic Specializations · URS Cainta</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            Research Divisions & Thrusts
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
            Five active mathematical disciplines advancing statistical theory, institutional analytics, and regional empirical investigations.
          </p>
        </div>

        <div className="mt-4 md:mt-0 text-xs font-mono text-slate-400">
          <span>Active Tracks: </span>
          <span className="text-cyan-300 font-bold font-mono">19 Collaborative Studies</span>
        </div>
      </div>

      {/* Grid of Division Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {RESEARCH_DIVISIONS.map((div, idx) => {
          const Icon = getIcon(div.icon);
          return (
            <motion.div
              key={div.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -3 }}
              onClick={() => handleCardClick(div)}
              className="group cursor-pointer rounded-xl bg-slate-900/30 border border-white/[0.08] hover:border-cyan-500/40 p-5 flex flex-col justify-between transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="p-2 rounded-lg bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 group-hover:border-cyan-400/40 group-hover:text-cyan-300 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-[11px] text-slate-500 font-medium">
                    {div.code}
                  </span>
                </div>

                <h3 className="text-base font-display font-bold text-white mb-2 group-hover:text-cyan-200 transition-colors">
                  {div.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed mb-4 font-sans line-clamp-3">
                  {div.description}
                </p>
              </div>

              <div>
                {/* Mathematical Formula Preview */}
                <div className="p-2 rounded-lg bg-black/40 border border-white/[0.06] font-mono text-[11px] text-cyan-300/90 mb-3 overflow-x-auto truncate">
                  {div.formula}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-[11px] font-mono text-slate-400">
                  <span className="truncate max-w-[170px]">{div.lead}</span>
                  <span className="flex items-center gap-1 text-cyan-400 group-hover:translate-x-0.5 transition-transform shrink-0">
                    <span>Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Division Detail Modal */}
      <AnimatePresence>
        {selectedDivision && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative w-full max-w-xl rounded-2xl bg-[#070b16] border border-cyan-500/30 p-6 sm:p-7 shadow-2xl text-left"
            >
              <button
                onClick={() => {
                  setSelectedDivision(null);
                  soundFx.playBlip(400, 0.03);
                }}
                className="absolute top-5 right-5 p-1.5 rounded-lg bg-slate-900 border border-white/[0.08] text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-400 mb-1">
                <span>{selectedDivision.code}</span>
                <span>·</span>
                <span>SIGMA · URS Cainta</span>
              </div>

              <h3 className="text-xl font-display font-bold text-white mb-2.5">
                {selectedDivision.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5 font-sans">
                {selectedDivision.description}
              </p>

              <div className="p-3.5 rounded-xl bg-black/50 border border-white/[0.08] font-mono mb-5">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1">
                  Core Invariant & Theoretical Formulation
                </span>
                <span className="text-xs sm:text-sm text-cyan-300 font-semibold block overflow-x-auto py-1">
                  {selectedDivision.formula}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5 mb-5 font-mono text-xs">
                <div className="p-2.5 rounded-lg bg-slate-900/40 border border-white/[0.06]">
                  <span className="text-slate-500 block text-[9px] uppercase">Research Unit</span>
                  <span className="text-white font-medium text-[11px] truncate block">{selectedDivision.lead}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/40 border border-white/[0.06]">
                  <span className="text-slate-500 block text-[9px] uppercase">Active Studies</span>
                  <span className="text-cyan-400 font-bold text-[11px]">{selectedDivision.activeProjects} Projects</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/40 border border-white/[0.06]">
                  <span className="text-slate-500 block text-[9px] uppercase">Publications</span>
                  <span className="text-emerald-400 font-bold text-[11px]">{selectedDivision.papersCount} Papers</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/[0.06]">
                <button
                  onClick={() => {
                    setSelectedDivision(null);
                    const el = document.getElementById('publications');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <span>Explore Associated Papers</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
