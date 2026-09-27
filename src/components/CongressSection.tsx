import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, MapPin, Users, Send, CheckCircle, X, Sparkles } from 'lucide-react';
import { KEYNOTE_SPEAKERS } from '../data/organizationData';
import { soundFx } from '../utils/sound';

export default function CongressSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 142,
    hours: 18,
    minutes: 44,
    seconds: 20
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [abstractForm, setAbstractForm] = useState({
    title: '',
    author: '',
    email: '',
    domain: 'High-Dimensional Inference',
    abstract: ''
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmitAbstract = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playChime();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setModalOpen(false);
      setAbstractForm({
        title: '',
        author: '',
        email: '',
        domain: 'High-Dimensional Inference',
        abstract: ''
      });
    }, 2800);
  };

  return (
    <section id="congress" className="py-20 px-4 max-w-7xl mx-auto relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-[11px] uppercase tracking-widest mb-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>Academic Colloquium & Annual Gathering</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            SIGMA Research Symposium 2027
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
            The flagship convention in statistical innovation, mathematical advancement, and student-faculty research presentations at URS Cainta.
          </p>
        </div>

        <div className="mt-4 md:mt-0">
          <button
            onClick={() => {
              setModalOpen(true);
              soundFx.playBlip(620, 0.03);
            }}
            className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Abstract / Call for Papers</span>
          </button>
        </div>
      </div>

      {/* Assembly Banner */}
      <div className="relative rounded-2xl bg-slate-900/30 border border-white/[0.08] p-6 sm:p-7 mb-10 overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono text-cyan-400 mb-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>URS Cainta Campus Auditorium & Hybrid Stream</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>March 12–14, 2027</span>
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2">
              Statistical Mechanics, Data Science & Regional Impact
            </h3>

            <p className="text-xs text-slate-400 max-w-xl font-sans leading-relaxed">
              Featuring student capstone defense showcases, plenary sessions with distinguished statisticians, workshops in R & Python, and the SIGMA Young Researcher Medal.
            </p>
          </div>

          {/* Minimalist Countdown Timer */}
          <div className="flex items-center gap-2 font-mono">
            {[
              { val: timeLeft.days, label: 'Days' },
              { val: timeLeft.hours, label: 'Hours' },
              { val: timeLeft.minutes, label: 'Mins' },
              { val: timeLeft.seconds, label: 'Secs' }
            ].map((unit, i) => (
              <div key={i} className="flex flex-col items-center p-2.5 rounded-lg bg-black/50 border border-white/[0.08] min-w-[56px] sm:min-w-[64px]">
                <span className="text-xl sm:text-2xl font-bold font-display text-white">
                  {unit.val.toString().padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase text-cyan-400/80 tracking-widest mt-0.5">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Keynote Speakers Lineup */}
      <div>
        <h4 className="text-[11px] uppercase font-mono tracking-wider text-slate-400 mb-4 flex items-center gap-2">
          <Users className="w-3.5 h-3.5 text-cyan-400" />
          <span>Distinguished Colloquium Speakers & Mentors</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {KEYNOTE_SPEAKERS.map((spk, idx) => (
            <motion.div
              key={spk.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="rounded-xl bg-slate-900/30 border border-white/[0.06] hover:border-cyan-500/30 p-4 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={spk.avatar}
                    alt={spk.name}
                    className="w-10 h-10 rounded-lg object-cover border border-white/[0.1] group-hover:border-cyan-400 transition-colors"
                  />
                  <div>
                    <h5 className="font-display font-bold text-white text-xs sm:text-sm group-hover:text-cyan-200 transition-colors">
                      {spk.name}
                    </h5>
                    <span className="text-[10px] font-mono text-cyan-400 block">{spk.field}</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 font-mono mb-2.5">
                  {spk.title}, <span className="text-slate-300">{spk.organization}</span>
                </p>

                <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.06] mb-2.5">
                  <span className="text-[9px] uppercase font-mono text-slate-500 block mb-0.5">
                    Colloquium Keynote
                  </span>
                  <span className="text-[11px] text-white font-medium line-clamp-2">
                    "{spk.talkTitle}"
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/[0.06] text-[10px] font-mono text-slate-500 flex justify-between">
                <span>Plenary</span>
                <span className="text-cyan-400 font-medium">{spk.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Abstract Submission Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative w-full max-w-lg rounded-2xl bg-[#070b16] border border-cyan-500/30 p-6 sm:p-7 shadow-2xl text-left"
            >
              <button
                onClick={() => {
                  setModalOpen(false);
                  soundFx.playBlip(400, 0.03);
                }}
                className="absolute top-5 right-5 p-1.5 rounded-lg bg-slate-900 border border-white/[0.08] text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-400 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SIGMA 2027 Scientific Committee · URS Cainta</span>
              </div>

              <h3 className="text-xl font-display font-bold text-white mb-1.5">
                Submit Research Abstract
              </h3>

              <p className="text-xs text-slate-400 font-sans mb-5">
                Submissions are reviewed by the URS Cainta SIGMA Research Advisory Council for oral and poster presentation.
              </p>

              {submitted ? (
                <div className="p-6 text-center rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-emerald-200">
                  <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <h4 className="text-sm font-bold font-mono mb-1">Abstract Registered</h4>
                  <p className="text-xs text-slate-300 font-sans">
                    Tracking ID: <strong className="font-mono text-cyan-300">SIGMA-URS-{Math.floor(1000 + Math.random() * 9000)}</strong>. Notice of acceptance will be issued via university email.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitAbstract} className="space-y-3 font-mono text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1 text-[11px]">Paper / Thesis Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Statistical Evaluation of Flood Inundation Runoff in Cainta Valley"
                      value={abstractForm.title}
                      onChange={(e) => setAbstractForm({ ...abstractForm, title: e.target.value })}
                      className="w-full bg-slate-900/60 border border-white/[0.08] rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-slate-400 mb-1 text-[11px]">Researcher & Program / College</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Student / Faculty (URS Cainta)"
                        value={abstractForm.author}
                        onChange={(e) => setAbstractForm({ ...abstractForm, author: e.target.value })}
                        className="w-full bg-slate-900/60 border border-white/[0.08] rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 text-[11px]">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="researcher@urs.edu.ph"
                        value={abstractForm.email}
                        onChange={(e) => setAbstractForm({ ...abstractForm, email: e.target.value })}
                        className="w-full bg-slate-900/60 border border-white/[0.08] rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 text-[11px]">Research Track</label>
                    <select
                      value={abstractForm.domain}
                      onChange={(e) => setAbstractForm({ ...abstractForm, domain: e.target.value })}
                      className="w-full bg-slate-900/60 border border-white/[0.08] rounded-lg p-2 text-cyan-300 focus:outline-none focus:border-cyan-500"
                    >
                      <option>High-Dimensional Inference & Data Science</option>
                      <option>Causal Discovery & Econometric Modeling</option>
                      <option>Educational Psychometrics & Institutional Analytics</option>
                      <option>Stochastic Processes & Mathematical Modeling</option>
                      <option>Spatial Hydrology & Environmental Statistics</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 text-[11px]">Abstract Summary (Max 250 words)</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Summarize mathematical statement, dataset used, statistical methodology, and conclusions..."
                      value={abstractForm.abstract}
                      onChange={(e) => setAbstractForm({ ...abstractForm, abstract: e.target.value })}
                      className="w-full bg-slate-900/60 border border-white/[0.08] rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500 font-sans"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setModalOpen(false)}
                      className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-white/[0.08] text-slate-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-colors"
                    >
                      Submit Abstract
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
