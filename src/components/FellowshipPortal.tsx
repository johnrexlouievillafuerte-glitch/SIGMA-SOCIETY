import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, CheckCircle2, X } from 'lucide-react';
import { soundFx } from '../utils/sound';

export default function FellowshipPortal() {
  const [applicantType, setApplicantType] = useState<'undergrad' | 'thesis' | 'faculty'>('thesis');
  const [durationMonths, setDurationMonths] = useState<number>(6);
  const [computeTier, setComputeTier] = useState<'standard' | 'high'>('high');
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Compute grant allocation estimation in Philippine Pesos (PHP) and compute hours
  const grantEstimate = useMemo(() => {
    let baseStipend = 25000;
    if (applicantType === 'undergrad') baseStipend = 12000;
    if (applicantType === 'faculty') baseStipend = 45000;

    const proratedStipend = (baseStipend / 6) * durationMonths;
    let computeCredits = computeTier === 'high' ? 8000 : 3000;
    const totalFunding = proratedStipend + computeCredits;

    return {
      stipend: Math.round(proratedStipend),
      computeCredits,
      totalFunding: Math.round(totalFunding)
    };
  }, [applicantType, durationMonths, computeTier]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playChime();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setModalOpen(false);
    }, 2600);
  };

  return (
    <section id="fellowship" className="py-20 px-4 max-w-7xl mx-auto relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-[11px] uppercase tracking-widest mb-1.5">
            <Award className="w-3.5 h-3.5" />
            <span>Academic Grants & Student Support · URS Cainta</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            Research Fellowship & Membership Portal
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
            SIGMA provides research grants, statistical consulting, and high-performance computing allocations to undergraduate, capstone, and faculty researchers at URS Cainta.
          </p>
        </div>

        <div className="mt-4 md:mt-0">
          <button
            onClick={() => {
              setModalOpen(true);
              soundFx.playBlip(620, 0.03);
            }}
            className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold transition-all"
          >
            Apply for SIGMA Fellowship
          </button>
        </div>
      </div>

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 p-5 sm:p-6 rounded-2xl bg-slate-900/30 border border-white/[0.08] space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] uppercase font-mono text-slate-400 block mb-2">
                Applicant Academic Category
              </label>
              <div className="flex flex-col gap-2 font-mono text-xs">
                {[
                  { id: 'undergrad' as const, label: 'Undergraduate Junior Researcher' },
                  { id: 'thesis' as const, label: 'Senior Capstone / Thesis Candidate' },
                  { id: 'faculty' as const, label: 'Faculty Research Investigator' }
                ].map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => {
                      setApplicantType(tier.id);
                      soundFx.playBlip(540, 0.02);
                    }}
                    className={`p-2.5 rounded-lg border text-left transition-colors ${
                      applicantType === tier.id
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-semibold'
                        : 'bg-black/30 border-white/[0.06] text-slate-400 hover:text-white'
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[11px] uppercase font-mono text-slate-400 block mb-2">
                Statistical Software & Compute Resource
              </label>
              <div className="flex flex-col gap-2 font-mono text-xs">
                {[
                  { id: 'standard' as const, label: 'Standard R/Python Workstation Pod' },
                  { id: 'high' as const, label: 'High-Performance Cluster (GPU Boost)' }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setComputeTier(t.id);
                      soundFx.playBlip(540, 0.02);
                    }}
                    className={`p-2.5 rounded-lg border text-left transition-colors ${
                      computeTier === t.id
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-semibold'
                        : 'bg-black/30 border-white/[0.06] text-slate-400 hover:text-white'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-2">
              <span className="text-slate-400">Research Term Duration:</span>
              <span className="text-cyan-300 font-bold">{durationMonths} Months</span>
            </div>
            <input
              type="range"
              min="3"
              max="12"
              step="3"
              value={durationMonths}
              onChange={(e) => {
                setDurationMonths(parseInt(e.target.value));
                soundFx.playBlip(600, 0.02);
              }}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
              <span>1 Semester (3 Mo)</span>
              <span>Academic Year (6 Mo)</span>
              <span>Extended Multi-Phase (12 Mo)</span>
            </div>
          </div>
        </div>

        {/* Output Estimation Card */}
        <div className="rounded-2xl bg-slate-900/40 border border-cyan-500/30 p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 block mb-1">
              Estimated Grant Allocation
            </span>
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-white mb-3">
              ₱{grantEstimate.totalFunding.toLocaleString()} <span className="text-xs text-slate-400 font-normal">PHP Value</span>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <div className="flex justify-between pb-1.5 border-b border-white/[0.06]">
                <span className="text-slate-400">Research Grant / Materials:</span>
                <span className="text-white font-medium">₱{grantEstimate.stipend.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-white/[0.06]">
                <span className="text-slate-400">Compute / Server Hours:</span>
                <span className="text-cyan-300 font-medium">₱{grantEstimate.computeCredits.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-white/[0.06]">
                <span className="text-slate-400">Faculty Advising Sessions:</span>
                <span className="text-emerald-400 font-medium">Included</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setModalOpen(true);
              soundFx.playBlip(640, 0.03);
            }}
            className="mt-5 w-full py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold transition-colors"
          >
            Submit Application Dossier
          </button>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative w-full max-w-md rounded-2xl bg-[#070b16] border border-cyan-500/30 p-6 shadow-2xl text-left"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-5 right-5 p-1.5 rounded-lg bg-slate-900 border border-white/[0.08] text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="text-lg font-display font-bold text-white mb-1">
                SIGMA Fellowship Dossier
              </h3>
              <p className="text-xs text-slate-400 font-sans mb-4">
                Open to bona fide students and faculty of University of Rizal System – Cainta Campus.
              </p>

              {submitted ? (
                <div className="p-6 text-center rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-emerald-200">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <h4 className="text-sm font-bold font-mono mb-1">Application Submitted</h4>
                  <p className="text-xs text-slate-300 font-sans">
                    Ref ID: <strong className="font-mono text-cyan-300">SIGMA-APP-{Math.floor(1000 + Math.random() * 9000)}</strong>. The URS Cainta SIGMA Executive Council will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 font-mono text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1 text-[11px]">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maria Santos"
                      className="w-full bg-slate-900/60 border border-white/[0.08] rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 text-[11px]">URS Student / Employee ID</label>
                    <input
                      type="text"
                      required
                      placeholder="202X-XXXXX-CT"
                      className="w-full bg-slate-900/60 border border-white/[0.08] rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 text-[11px]">Degree Program / Department</label>
                    <input
                      type="text"
                      required
                      placeholder="BS Information Technology / Engineering"
                      className="w-full bg-slate-900/60 border border-white/[0.08] rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 text-[11px]">Research / Thesis Objective</label>
                    <textarea
                      rows={2}
                      required
                      placeholder="Briefly state mathematical or statistical methodology..."
                      className="w-full bg-slate-900/60 border border-white/[0.08] rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500 font-sans"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setModalOpen(false)}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 border border-white/[0.08] text-slate-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-colors"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
