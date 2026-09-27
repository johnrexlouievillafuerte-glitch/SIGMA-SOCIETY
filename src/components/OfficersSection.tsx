import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Crown, 
  Award, 
  Camera
} from 'lucide-react';
import { SIGMA_OFFICERS_DATA, OfficerData } from '../data/organizationData';
import { useCustomization } from '../context/CustomizationContext';
import { soundFx } from '../utils/sound';

export default function OfficersSection() {
  const { officerPhotos, setIsAdminModalOpen, currentView, isAdmin } = useCustomization();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const totalOfficers = SIGMA_OFFICERS_DATA.length;
  const activeOfficer: OfficerData = SIGMA_OFFICERS_DATA[currentIndex];

  const getPhoto = (officer: OfficerData) => {
    return officerPhotos[officer.id] || officer.avatarUrl;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  const handleNext = () => {
    soundFx.playBlip(750, 0.02);
    setCurrentIndex((prev) => (prev + 1) % totalOfficers);
  };

  const handlePrev = () => {
    soundFx.playBlip(600, 0.02);
    setCurrentIndex((prev) => (prev - 1 + totalOfficers) % totalOfficers);
  };

  const handleSelectOfficerByIndex = (index: number) => {
    soundFx.playBlip(620, 0.02);
    setCurrentIndex(index);
  };

  // Calculate indices for surrounding diamonds in carousel
  const prevIndex = (currentIndex - 1 + totalOfficers) % totalOfficers;
  const nextIndex = (currentIndex + 1) % totalOfficers;
  const prevOfficer = SIGMA_OFFICERS_DATA[prevIndex];
  const nextOfficer = SIGMA_OFFICERS_DATA[nextIndex];

  return (
    <section id="officers" className="py-20 px-4 max-w-7xl mx-auto relative scroll-mt-20">
      {/* Section Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-amber-500/20 pb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-mono text-[11px] uppercase tracking-widest mb-1.5 font-bold">
            <Users className="w-3.5 h-3.5" />
            <span>Governance & Leadership</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight flex items-center gap-3">
            <span>The Officers</span>
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-amber-400 text-slate-950 shadow-sm">
              A.Y. 2026–2027
            </span>
          </h2>
          <p className="text-rose-100/80 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
            Executive Board, Committee Heads, and Faculty Advisers of the SIGMA Society at University of Rizal System – Cainta Campus.
          </p>
        </div>

        {/* Carousel Control Buttons */}
        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="p-2.5 rounded-xl bg-[#28040a] hover:bg-[#3d0812] border border-amber-500/30 text-amber-300 hover:text-white transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
            title="Previous Officer (Left Arrow)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="font-mono text-xs px-3 py-1.5 rounded-xl bg-black/40 border border-amber-500/20 text-amber-300 font-bold min-w-[70px] text-center">
            {currentIndex + 1} / {totalOfficers}
          </div>
          <button
            onClick={handleNext}
            className="p-2.5 rounded-xl bg-[#28040a] hover:bg-[#3d0812] border border-amber-500/30 text-amber-300 hover:text-white transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
            title="Next Officer (Right Arrow)"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Category Quick Filter Chips */}
      <div className="relative z-10 flex items-center gap-2 overflow-x-auto pb-4 mb-6 font-mono text-xs scrollbar-none">
        {['All', 'Executive Leadership', 'Elected Officers', 'Committee Heads', 'Faculty Advisers'].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveFilter(cat);
              soundFx.playBlip(650, 0.015);
              if (cat !== 'All') {
                const targetIdx = SIGMA_OFFICERS_DATA.findIndex((o) => o.category === cat);
                if (targetIdx !== -1) setCurrentIndex(targetIdx);
              }
            }}
            className={`px-3.5 py-1.5 rounded-xl border transition-all duration-200 whitespace-nowrap cursor-pointer ${
              activeFilter === cat
                ? 'bg-amber-400 text-slate-950 font-extrabold border-amber-400 shadow-md shadow-amber-950/40 scale-105'
                : 'bg-[#210408] border-amber-500/20 text-rose-200/90 hover:border-amber-400/50 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ============================================================== */}
      {/* Interactive Diamond Carousel Viewport */}
      {/* ============================================================== */}
      <div className="relative z-10 p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#240307]/95 via-[#340610]/90 to-[#190205]/95 border-2 border-amber-500/30 backdrop-blur-md shadow-2xl overflow-hidden">
        {/* Main Stage Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Diamond Carousel Cluster */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center py-6 sm:py-8">
            <div className="relative flex items-center justify-center gap-4 sm:gap-8 my-6">
              {/* Previous Diamond (Clickable Preview) */}
              <div
                onClick={handlePrev}
                className="relative w-16 h-16 sm:w-24 sm:h-24 rotate-45 overflow-hidden border border-amber-500/40 rounded-lg opacity-50 hover:opacity-85 hover:scale-105 cursor-pointer transition-all duration-300 shrink-0 shadow-lg group hidden xs:block"
                title={`Previous: ${prevOfficer.name} (${prevOfficer.role})`}
              >
                <img
                  src={getPhoto(prevOfficer)}
                  alt={prevOfficer.name}
                  className="w-full h-full -rotate-45 scale-[1.45] object-cover filter grayscale contrast-125"
                />
                <div className="absolute inset-0 -rotate-45 bg-[#2a0409]/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronLeft className="w-5 h-5 text-amber-300 drop-shadow" />
                </div>
              </div>

              {/* Active Center Diamond (Highlighted with Holographic Halo) */}
              <div className="relative group">
                {/* Glowing Aura */}
                <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/30 via-rose-500/20 to-amber-400/30 rounded-3xl blur-xl animate-pulse" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeOfficer.id}
                    initial={{ scale: 0.85, opacity: 0, rotate: 35 }}
                    animate={{ scale: 1, opacity: 1, rotate: 45 }}
                    exit={{ scale: 0.85, opacity: 0, rotate: 55 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="relative w-36 h-36 sm:w-48 sm:h-48 overflow-hidden border-4 border-yellow-300 rounded-2xl shadow-[0_0_35px_rgba(250,204,21,0.85)] ring-4 ring-amber-400/50 bg-[#160205]"
                  >
                    <img
                      src={getPhoto(activeOfficer)}
                      alt={activeOfficer.name}
                      className="w-full h-full -rotate-45 scale-[1.42] object-cover group-hover:scale-[1.50] transition-transform duration-300"
                    />
                    <div className="absolute inset-0 -rotate-45 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                </AnimatePresence>

                {/* Rank Badge attached to diamond */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
                  <span className="px-3 py-1 rounded-full bg-slate-950 border border-amber-400 text-amber-300 font-mono text-[10px] font-extrabold tracking-wider shadow-lg flex items-center gap-1.5">
                    <Crown className="w-3 h-3 text-amber-400" />
                    <span>#{currentIndex + 1} · {activeOfficer.category.toUpperCase()}</span>
                  </span>
                </div>
              </div>

              {/* Next Diamond (Clickable Preview) */}
              <div
                onClick={handleNext}
                className="relative w-16 h-16 sm:w-24 sm:h-24 rotate-45 overflow-hidden border border-amber-500/40 rounded-lg opacity-50 hover:opacity-85 hover:scale-105 cursor-pointer transition-all duration-300 shrink-0 shadow-lg group hidden xs:block"
                title={`Next: ${nextOfficer.name} (${nextOfficer.role})`}
              >
                <img
                  src={getPhoto(nextOfficer)}
                  alt={nextOfficer.name}
                  className="w-full h-full -rotate-45 scale-[1.45] object-cover filter grayscale contrast-125"
                />
                <div className="absolute inset-0 -rotate-45 bg-[#2a0409]/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="w-5 h-5 text-amber-300 drop-shadow" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-3">
              <span className="text-[10px] font-mono text-amber-300/80 text-center">
                Constitutional Officers & Committee Heads ({totalOfficers})
              </span>
              {currentView === 'admin' && isAdmin && (
                <button
                  type="button"
                  onClick={() => setIsAdminModalOpen(true)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/40 hover:bg-black/60 border border-amber-400/40 text-[10px] font-mono text-amber-300 transition-all hover:scale-105 cursor-pointer"
                  title="Admin: Change photo or theme"
                >
                  <Camera className="w-3 h-3" />
                  <span>Edit Photos</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Dynamic Officer Profile Card */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeOfficer.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="space-y-4"
              >
                {/* Header Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-amber-400 text-slate-950 shadow-sm">
                    {activeOfficer.category}
                  </span>
                  <span className="text-xs font-mono text-amber-300 bg-black/40 px-2.5 py-0.5 rounded border border-amber-500/30">
                    {activeOfficer.term}
                  </span>
                  {activeOfficer.statsMetric && (
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      {activeOfficer.statsMetric}
                    </span>
                  )}
                </div>

                {/* Name & Role */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight leading-tight">
                    {activeOfficer.name}
                  </h3>
                  <div className="text-sm sm:text-base font-mono text-amber-400 font-bold mt-1">
                    {activeOfficer.role}
                  </div>
                  <p className="text-xs text-rose-200 mt-1 font-sans">
                    {activeOfficer.programOrDept} {activeOfficer.yearLevel ? `· ${activeOfficer.yearLevel}` : ''}
                  </p>
                </div>

                {/* Article VI Mandate Pill */}
                {activeOfficer.bylawFunction && (
                  <div className="p-3 rounded-xl bg-black/45 border border-amber-500/30 shadow-md">
                    <span className="text-[10px] font-mono uppercase text-amber-300 font-bold block mb-1">
                      Article VI Constitutional Mandate:
                    </span>
                    <p className="text-xs text-amber-100 font-medium italic leading-relaxed">
                      "{activeOfficer.bylawFunction}"
                    </p>
                  </div>
                )}

                {/* Article VII Duties and Responsibilities */}
                <div className="pt-2 border-t border-amber-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">
                      Article VII Duties & Responsibilities ({activeOfficer.responsibilities.length}):
                    </span>
                    <span className="text-[9px] font-mono text-amber-300/80 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                      {activeOfficer.category === 'Committee Heads' ? 'Section 1' : activeOfficer.category === 'Elected Officers' ? 'Section 2' : 'Advisory Role'}
                    </span>
                  </div>
                  <ul className="grid grid-cols-1 gap-1.5 text-xs text-rose-100 font-sans max-h-48 overflow-y-auto pr-1">
                    {activeOfficer.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2 bg-black/30 p-1.5 rounded-lg border border-amber-500/15">
                        <span className="text-amber-400 font-bold text-xs mt-0.5 shrink-0">✓</span>
                        <span className="leading-snug text-[11px] sm:text-xs">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Official Academic Department & Specialization (Cleaned up, no custom email editing) */}
                <div className="pt-3 border-t border-amber-500/20 text-xs font-mono flex items-center justify-between text-rose-200/80 text-[11px]">
                  <span>Field: <strong className="text-amber-300 font-sans">{activeOfficer.specialization}</strong></span>
                  <span className="text-slate-400">URS Cainta Executive Directorate</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom: Miniature Diamond Navigation Strip (All 13 Officers in Order) */}
        <div className="mt-8 pt-6 border-t border-amber-500/25">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono uppercase text-amber-300 font-bold tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Sequential Officer Diamond Roster (Click to Jump):</span>
            </span>
            <span className="text-[10px] font-mono text-rose-300/70">
              Constitutional Order: #1 to #{totalOfficers}
            </span>
          </div>

          {/* Horizontal Scrollable Mini-Diamonds */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-3 pt-2 scrollbar-thin">
            {SIGMA_OFFICERS_DATA.map((officer, idx) => {
              const isActive = currentIndex === idx;
              return (
                <button
                  key={officer.id}
                  onClick={() => handleSelectOfficerByIndex(idx)}
                  className={`relative flex-shrink-0 flex flex-col items-center p-2 rounded-xl border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-400/20 border-amber-400 scale-105 shadow-md ring-1 ring-amber-400'
                      : 'bg-black/30 border-amber-500/20 hover:border-amber-400/60 hover:bg-black/50 opacity-75 hover:opacity-100'
                  }`}
                  style={{ minWidth: '95px' }}
                >
                  <div className="relative w-10 h-10 rotate-45 overflow-hidden rounded-md border border-amber-400/60 my-1 bg-black">
                    <img
                      src={getPhoto(officer)}
                      alt={officer.name}
                      className="w-full h-full -rotate-45 scale-[1.4] object-cover"
                    />
                  </div>
                  <span className="text-[9px] font-mono font-bold text-amber-300 text-center truncate w-full mt-1.5">
                    {officer.role.split(' ')[0]}
                  </span>
                  <span className="text-[8px] font-sans text-rose-200/70 text-center truncate w-full">
                    {officer.name.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
