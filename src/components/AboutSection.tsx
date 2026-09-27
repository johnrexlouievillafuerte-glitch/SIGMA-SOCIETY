import { motion } from 'motion/react';
import { Compass, GraduationCap, CheckCircle2, Shield, Target, Sparkles, Cpu, Binary, Layers } from 'lucide-react';
import { PRINCIPLES_AND_OBJECTIVES } from '../data/organizationData';
import SigmaOfficialLogo from './SigmaOfficialLogo';
import { soundFx } from '../utils/sound';

export default function AboutSection() {
  const { principles, generalObjectives, specificObjectives } = PRINCIPLES_AND_OBJECTIVES;

  const dataBlocks = [
    {
      id: 'SYS.01',
      code: 'ETHOS-VAL',
      tag: 'Core Principles',
      section: principles.section,
      icon: Shield,
      badge: 'Values & Charter',
      items: principles.items,
      accent: 'amber',
      borderGlow: 'hover:border-amber-400/80 hover:shadow-[0_0_25px_rgba(250,204,21,0.25)]'
    },
    {
      id: 'SYS.02',
      code: 'STRAT-GOAL',
      tag: 'General Objectives',
      section: generalObjectives.section,
      icon: Target,
      badge: 'Institutional Goals',
      items: generalObjectives.items,
      accent: 'rose',
      borderGlow: 'hover:border-rose-400/80 hover:shadow-[0_0_25px_rgba(244,63,94,0.25)]'
    },
    {
      id: 'SYS.03',
      code: 'EXEC-PROG',
      tag: 'Specific Objectives',
      section: specificObjectives.section,
      icon: CheckCircle2,
      badge: 'Operational Action',
      items: specificObjectives.items,
      accent: 'emerald',
      borderGlow: 'hover:border-emerald-400/80 hover:shadow-[0_0_25px_rgba(52,211,153,0.25)]'
    }
  ];

  return (
    <section id="about-us" className="py-20 px-4 max-w-7xl mx-auto relative scroll-mt-20">
      <div id="about" className="absolute -top-24 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 mb-12 border-b border-amber-500/20 pb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-mono text-[11px] uppercase tracking-widest mb-1.5 font-bold">
            <Compass className="w-3.5 h-3.5" />
            <span>Charter & Identity</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
            About Us · SIGMA Society
          </h2>
          <p className="text-rose-100/80 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
            Statistical Innovation and Growth in Mathematical Advancement Society · University of Rizal System – Cainta Campus.
          </p>
        </div>
      </div>

      {/* Society Overview Card + Acronym Meaning */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <div className="lg:col-span-2 p-7 sm:p-8 rounded-2xl bg-gradient-to-br from-[#2c0409]/90 to-[#1e0307]/90 border border-amber-500/30 backdrop-blur-md shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-amber-400 font-bold mb-2">
              <GraduationCap className="w-4 h-4" />
              <span>Official Student Organization · URS Cainta</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-3 leading-snug">
              Promoting Excellence in Statistics, Mathematics, Data Analytics & Research
            </h3>

            <p className="text-xs sm:text-sm text-rose-100 leading-relaxed font-sans mb-4">
              The <strong>Statistical Innovation and Growth in Mathematical Advancement (SIGMA) Society</strong> is the official academic and professional student organization at the <strong>University of Rizal System – Cainta Campus</strong>.
            </p>

            <p className="text-xs sm:text-sm text-rose-200/90 leading-relaxed font-sans">
              Dedicated to academic excellence, student leadership, and collaborative learning, the Society provides platforms for intellectual growth while directly supporting the educational objectives of the College across Information Technology, Industrial Technology, and Teacher Education programs.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-6 mt-6 border-t border-amber-500/20 text-xs font-mono">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Institution</span>
              <span className="text-white font-semibold">URS Cainta</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Core Fields</span>
              <span className="text-amber-300 font-semibold">Math & Analytics</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Academic Year</span>
              <span className="text-emerald-400 font-semibold">2026–2027</span>
            </div>
          </div>
        </div>

        {/* Acronym Expansion Breakdown */}
        <div className="p-6 rounded-2xl bg-[#230408] border border-amber-500/30 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-amber-500/20">
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-bold block">
                The S.I.G.M.A. Meaning
              </span>
              <SigmaOfficialLogo size={28} variant="full" />
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-start gap-3">
                <span className="text-amber-400 font-black text-sm w-4">S</span>
                <div>
                  <strong className="text-white block font-sans text-xs">Statistical</strong>
                  <span className="text-[11px] text-rose-200/70 font-sans">Data science & empirical analysis</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-amber-400 font-black text-sm w-4">I</span>
                <div>
                  <strong className="text-white block font-sans text-xs">Innovation</strong>
                  <span className="text-[11px] text-rose-200/70 font-sans">Modern methods & computational tools</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-amber-400 font-black text-sm w-4">G</span>
                <div>
                  <strong className="text-white block font-sans text-xs">Growth</strong>
                  <span className="text-[11px] text-rose-200/70 font-sans">Academic & leadership development</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-amber-400 font-black text-sm w-4">M</span>
                <div>
                  <strong className="text-white block font-sans text-xs">Mathematical</strong>
                  <span className="text-[11px] text-rose-200/70 font-sans">Rigorous quantitative foundations</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-amber-400 font-black text-sm w-4">A</span>
                <div>
                  <strong className="text-white block font-sans text-xs">Advancement</strong>
                  <span className="text-[11px] text-rose-200/70 font-sans">Service to campus & society</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-amber-500/20 text-[10px] font-mono text-amber-300/80">
            Recognized Student Organization · URS Cainta
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* CSS-DRIVEN ADAPTIVE GRID: PRINCIPLES AND OBJECTIVES */}
      {/* Seamless transition: 1 column on mobile -> multi-column futuristic data blocks on desktop */}
      {/* ============================================================== */}
      <div className="relative z-10">
        {/* Futuristic Section Sub-Header with telemetry tags */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-2 border-b border-amber-500/20">
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-widest font-bold">
            <Cpu className="w-4 h-4" />
            <span>{PRINCIPLES_AND_OBJECTIVES.title}</span>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono text-rose-300/70">
            <Binary className="w-3.5 h-3.5 text-amber-400/80" />
            <span>ADAPTIVE_MATRIX // 3_NODES_ONLINE</span>
          </div>
        </div>

        {/* Adaptive CSS Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 auto-rows-fr">
          {dataBlocks.map((block, idx) => {
            const Icon = block.icon;
            return (
              <motion.div
                key={block.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                onMouseEnter={() => soundFx.playBlip(650 + idx * 50, 0.015)}
                className={`group relative p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-[#28040a]/95 via-[#1f0307]/95 to-[#160104]/98 border border-amber-500/25 ${block.borderGlow} transition-all duration-300 flex flex-col justify-between shadow-xl hover:-translate-y-1`}
              >
                {/* Futuristic Tech Corner Brackets */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-amber-400/50 group-hover:border-amber-300 transition-colors pointer-events-none" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-amber-400/50 group-hover:border-amber-300 transition-colors pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-amber-400/50 group-hover:border-amber-300 transition-colors pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-amber-400/50 group-hover:border-amber-300 transition-colors pointer-events-none" />

                {/* Subtle Ambient Scanline Glow on Hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-amber-400/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />

                <div className="relative z-10">
                  {/* Telemetry Header Strip */}
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-amber-500/20 text-[10px] font-mono">
                    <div className="flex items-center gap-2">
                      <span className="text-amber-400 font-extrabold tracking-wider bg-black/50 px-2 py-0.5 rounded border border-amber-500/30">
                        {block.id}
                      </span>
                      <span className="text-rose-300/80 uppercase font-semibold">
                        {block.code}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                      ACTIVE
                    </span>
                  </div>

                  {/* Title & Icon Header */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-400/15 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0 group-hover:scale-110 group-hover:border-amber-300 transition-all duration-300 shadow-md">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-amber-400 tracking-wider font-bold block">
                        {block.tag}
                      </span>
                      <h4 className="text-base sm:text-lg font-display font-bold text-white tracking-tight leading-snug group-hover:text-amber-200 transition-colors">
                        {block.section}
                      </h4>
                    </div>
                  </div>

                  {/* Items List as Structured Futuristic Data Rows */}
                  <ul className="space-y-2.5 text-xs text-rose-100/90 font-sans my-4">
                    {block.items.map((item, itemIdx) => (
                      <li
                        key={itemIdx}
                        className="flex items-start gap-2.5 p-2 rounded-lg bg-black/30 border border-white/[0.04] group-hover:border-amber-500/20 transition-colors"
                      >
                        <span className="text-amber-400 font-mono font-bold text-xs mt-0.5 shrink-0 select-none">
                          ›
                        </span>
                        <span className="leading-relaxed text-[11.5px] sm:text-xs">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Footer Telemetry */}
                <div className="relative z-10 pt-3 mt-2 border-t border-amber-500/20 flex items-center justify-between text-[10px] font-mono text-rose-300/70">
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3 h-3 text-amber-400" />
                    <span>{block.badge}</span>
                  </span>
                  <span className="text-amber-300/80">
                    {block.items.length} Directives
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
