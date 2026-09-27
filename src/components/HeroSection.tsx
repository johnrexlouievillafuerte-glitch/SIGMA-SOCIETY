import { motion } from 'motion/react';
import { ArrowRight, MapPin } from 'lucide-react';
import ParticleCanvas from './ParticleCanvas';
import SigmaOfficialLogo from './SigmaOfficialLogo';
import UrsOfficialSeal from './UrsOfficialSeal';
import { soundFx } from '../utils/sound';

export default function HeroSection() {
  const scrollTo = (id: string) => {
    soundFx.playBlip(620, 0.03);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 px-4 overflow-hidden">
      {/* Interactive Particle Flow Canvas */}
      <ParticleCanvas />

      {/* Subtle Maroon & Gold Warm Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-rose-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[500px] h-[300px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Hero Title Matching the Official Banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-6"
        >
          {/* Prominent SIGMA Headline */}
          <span className="block text-6xl sm:text-8xl font-serif font-black text-white tracking-tight leading-none mb-3 drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
            SIGMA
          </span>

          {/* Golden Yellow Divider Bar: — S O C I E T Y — */}
          <div className="flex items-center justify-center gap-3 my-3">
            <div className="h-[2px] w-12 sm:w-20 bg-amber-400 shadow-[0_0_8px_rgba(250,204,21,0.8)]" />
            <span className="font-sans font-black tracking-[0.35em] text-amber-400 text-sm sm:text-xl uppercase drop-shadow">
              S O C I E T Y
            </span>
            <div className="h-[2px] w-12 sm:w-20 bg-amber-400 shadow-[0_0_8px_rgba(250,204,21,0.8)]" />
          </div>

          {/* Expanded Acronym Subtitle */}
          <h1 className="text-xs sm:text-sm font-mono font-bold text-white tracking-widest uppercase leading-relaxed max-w-2xl mx-auto mt-3">
            STATISTICAL &nbsp;|&nbsp; INNOVATION &nbsp;|&nbsp; AND GROWTH &nbsp;|&nbsp; IN MATHEMATICAL &nbsp;|&nbsp; ADVANCEMENT
          </h1>
        </motion.div>

        {/* Concise Description */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xs sm:text-sm text-rose-100/90 max-w-2xl mx-auto mb-8 leading-relaxed font-sans"
        >
          The official academic student organization for statistics, mathematics, data analytics, and research at University of Rizal System – Cainta Campus. Dedicated to academic excellence, student leadership, and collaborative learning.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          <button
            onClick={() => scrollTo('membership-application')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold font-mono text-xs transition-all shadow-lg shadow-amber-950/50 flex items-center gap-2 cursor-pointer"
          >
            <span>Membership Application</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => scrollTo('officers')}
            className="px-5 py-2.5 rounded-xl bg-[#2a040a]/80 border border-amber-400/40 text-amber-200 font-mono text-xs hover:text-white hover:border-amber-400 transition-all cursor-pointer shadow-md"
          >
            The Officers
          </button>

          <button
            onClick={() => scrollTo('about-us')}
            className="px-5 py-2.5 rounded-xl bg-[#2a040a]/80 border border-white/[0.12] text-rose-200 font-mono text-xs hover:text-white hover:border-amber-500/40 transition-all cursor-pointer"
          >
            Principles & Objectives
          </button>

          <button
            onClick={() => scrollTo('mission')}
            className="px-5 py-2.5 rounded-xl bg-[#2a040a]/80 border border-white/[0.12] text-rose-200 font-mono text-xs hover:text-white hover:border-amber-500/40 transition-all cursor-pointer"
          >
            Mission & Vision
          </button>
        </motion.div>

        {/* Institutional Metrics Strip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-amber-500/20 text-left"
        >
          <div className="p-2">
            <span className="block text-xl sm:text-2xl font-display font-bold text-white mb-0.5">
              13 Officers
            </span>
            <span className="block text-[11px] font-mono text-rose-300/80">
              Executive & Committees
            </span>
          </div>

          <div className="p-2">
            <span className="block text-xl sm:text-2xl font-display font-bold text-amber-400 mb-0.5">
              5 Committees
            </span>
            <span className="block text-[11px] font-mono text-rose-300/80">
              Article VI Bylaws
            </span>
          </div>

          <div className="p-2">
            <span className="block text-xl sm:text-2xl font-display font-bold text-white mb-0.5">
              Regular Member
            </span>
            <span className="block text-[11px] font-mono text-rose-300/80">
              Open Admissions
            </span>
          </div>

          <div className="p-2">
            <span className="block text-xl sm:text-2xl font-display font-bold text-amber-300 mb-0.5">
              URS Cainta
            </span>
            <span className="block text-[11px] font-mono text-rose-300/80">
              Cainta Campus, Rizal
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
