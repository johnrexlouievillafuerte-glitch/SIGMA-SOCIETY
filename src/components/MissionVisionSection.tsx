import { motion } from 'motion/react';
import { Target, Eye, CheckCircle2, Milestone, ArrowRight, ShieldCheck } from 'lucide-react';
import { MISSION_VISION_DATA } from '../data/organizationData';
import SigmaOfficialLogo from './SigmaOfficialLogo';
import { soundFx } from '../utils/sound';

export default function MissionVisionSection() {
  const { mission, vision, coreValues } = MISSION_VISION_DATA;

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto space-y-20 relative">
      {/* ===================== MISSION SECTION ===================== */}
      <section id="mission" className="scroll-mt-24 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-amber-500/20 pb-5">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-mono text-[11px] uppercase tracking-widest mb-1.5 font-bold">
              <Target className="w-3.5 h-3.5" />
              <span>Institutional Purpose</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight flex items-center gap-3">
              <span>Our Mission</span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-400 text-slate-950 shadow-sm">
                URS Cainta
              </span>
            </h2>
            <p className="text-rose-100/80 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
              Advancing empirical inquiry and quantitative reasoning across computing, education, and sciences.
            </p>
          </div>

          <div className="mt-4 md:mt-0 text-xs font-mono text-rose-300/70">
            Charter Ref: URS-CT-SIGMA-M26
          </div>
        </div>

        {/* Mission Statement Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="relative p-7 sm:p-9 rounded-2xl bg-gradient-to-br from-[#2c0409]/90 via-[#3d0711]/80 to-[#1e0307]/95 border border-amber-500/30 shadow-xl overflow-hidden mb-8"
        >
          {/* Subtle geometric watermark */}
          <div className="absolute right-4 -bottom-6 text-white/[0.03] font-display font-bold text-9xl pointer-events-none select-none">
            MISSION
          </div>

          <div className="relative z-10 max-w-4xl">
            <span className="inline-block text-[10px] font-mono uppercase tracking-widest text-amber-300 bg-amber-400/20 border border-amber-400/40 px-2.5 py-1 rounded mb-4 font-bold">
              Official Society Mission Statement
            </span>
            <p className="text-base sm:text-lg text-slate-100 font-sans leading-relaxed font-normal">
              "{mission.statement}"
            </p>
          </div>
        </motion.div>

        {/* Strategic Commitments */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {mission.commitments.map((c, idx) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              onMouseEnter={() => soundFx.playBlip(700, 0.015)}
              className="p-5 rounded-xl bg-[#28040a]/70 border border-amber-500/20 hover:border-amber-400/60 transition-all flex flex-col justify-between group shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded border border-amber-400/30 font-bold">
                    {c.tag}
                  </span>
                  <span className="text-[11px] font-mono text-rose-300/70">0{idx + 1}</span>
                </div>
                <h3 className="text-sm font-display font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                  {c.title}
                </h3>
                <p className="text-xs text-rose-100/80 leading-relaxed font-sans">
                  {c.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-amber-500/10 flex items-center text-[11px] font-mono text-rose-300/70 group-hover:text-amber-300 transition-colors">
                <span>Commitment In Action</span>
                <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===================== VISION SECTION ===================== */}
      <section id="vision" className="scroll-mt-24 pt-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-amber-500/20 pb-5">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-mono text-[11px] uppercase tracking-widest mb-1.5 font-bold">
              <Eye className="w-3.5 h-3.5" />
              <span>Future Strategic Horizon</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight flex items-center gap-3">
              <span>Our Vision</span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-400 text-slate-950 shadow-sm">
                CALABARZON Region
              </span>
            </h2>
            <p className="text-rose-100/80 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
              Establishing University of Rizal System – Cainta Campus as an epicenter for mathematical rigor and empirical research.
            </p>
          </div>

          <div className="mt-4 md:mt-0 text-xs font-mono text-rose-300/70">
            Horizon Target: 2027 – 2030
          </div>
        </div>

        {/* Vision Statement Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="relative p-7 sm:p-9 rounded-2xl bg-gradient-to-br from-[#2c0409]/90 via-[#3d0711]/80 to-[#1e0307]/95 border border-amber-500/30 shadow-xl overflow-hidden mb-8"
        >
          {/* Geometric watermark */}
          <div className="absolute right-4 -bottom-6 text-white/[0.03] font-display font-bold text-9xl pointer-events-none select-none">
            VISION
          </div>

          <div className="relative z-10 max-w-4xl">
            <span className="inline-block text-[10px] font-mono uppercase tracking-widest text-amber-300 bg-amber-400/20 border border-amber-400/40 px-2.5 py-1 rounded mb-4 font-bold">
              Official Society Vision Statement
            </span>
            <p className="text-base sm:text-lg text-slate-100 font-sans leading-relaxed font-normal">
              "{vision.statement}"
            </p>
          </div>
        </motion.div>

        {/* Strategic Horizons Roadmap */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {vision.horizons.map((h, idx) => (
            <motion.div
              key={h.target}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="p-5 rounded-xl bg-[#28040a]/70 border border-amber-500/20 hover:border-amber-400/60 transition-all flex flex-col justify-between shadow-md"
            >
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <Milestone className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-xs font-mono font-bold text-amber-300">
                    {h.year}
                  </span>
                </div>
                <h3 className="text-sm font-display font-bold text-white mb-2">
                  {h.target}
                </h3>
                <p className="text-xs text-rose-100/80 leading-relaxed font-sans">
                  {h.description}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-amber-500/10 text-[10px] font-mono text-emerald-400 flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-3 h-3" />
                <span>Strategic Roadmap Phase 0{idx + 1}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Core Values Strip */}
        <div className="p-5 rounded-xl bg-[#230408]/80 border border-amber-500/20 shadow-md">
          <div className="flex items-center gap-2 text-[11px] font-mono text-amber-400 font-bold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Foundational Core Values of SIGMA URS Cainta</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-sans">
            {coreValues.map((val) => (
              <div key={val.name} className="p-3.5 rounded-lg bg-black/40 border border-amber-500/15">
                <strong className="text-amber-300 block font-display text-sm mb-0.5">{val.name}</strong>
                <p className="text-[11px] text-rose-100/80 leading-normal">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
