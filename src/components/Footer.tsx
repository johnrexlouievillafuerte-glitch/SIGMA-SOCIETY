import { useState } from 'react';
import { Send, CheckCircle2, MapPin, Sliders } from 'lucide-react';
import { useCustomization } from '../context/CustomizationContext';
import SigmaOfficialLogo from './SigmaOfficialLogo';
import UrsOfficialSeal from './UrsOfficialSeal';
import { soundFx } from '../utils/sound';

export default function Footer() {
  const { setIsAdminModalOpen } = useCustomization();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    soundFx.playChime();
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#140103] border-t border-amber-500/25 pt-14 pb-10 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Institutional Branding */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <UrsOfficialSeal size={40} />
              <SigmaOfficialLogo size={40} variant="full" />
              <div>
                <span className="font-display font-black text-white text-lg tracking-wider block">
                  SIGMA SOCIETY
                </span>
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block">
                  URS Cainta Chapter
                </span>
              </div>
            </div>

            <p className="text-xs text-amber-200/90 font-mono font-medium">
              Statistical Innovation and Growth in Mathematical Advancement Society
            </p>

            <p className="text-xs text-rose-100/80 font-sans leading-relaxed max-w-sm">
              An academic society and computational research collective operating at the University of Rizal System – Cainta Campus, dedicated to rigorous mathematical modeling, empirical inference, and reproducible science.
            </p>

            <div className="flex items-center gap-1.5 text-[11px] font-mono text-rose-300/80 pt-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>University of Rizal System, Cainta Campus · Cainta, Rizal, Philippines</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-2.5 font-mono text-xs">
            <span className="text-amber-400 font-bold block uppercase tracking-wider text-[11px]">Society Navigation</span>
            <ul className="space-y-1.5 text-rose-200/80">
              <li><a href="#about-us" className="hover:text-amber-300 transition-colors">About Us</a></li>
              <li><a href="#mission" className="hover:text-amber-300 transition-colors">Mission</a></li>
              <li><a href="#vision" className="hover:text-amber-300 transition-colors">Vision</a></li>
              <li><a href="#officers" className="hover:text-amber-300 transition-colors">The Officers</a></li>
              <li><a href="#membership-application" className="hover:text-amber-300 transition-colors">Membership Application</a></li>
            </ul>
          </div>

          {/* Bulletin Subscription */}
          <div className="space-y-2.5">
            <span className="text-amber-400 font-bold font-mono text-xs block uppercase tracking-wider text-[11px]">
              Campus Colloquium Dispatches
            </span>
            <p className="text-xs text-rose-100/80 font-sans">
              Receive updates on URS Cainta research workshops, dataset releases, and statistical symposiums.
            </p>

            {subscribed ? (
              <div className="p-2.5 rounded-lg bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Subscribed to Colloquium Dispatches</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-1.5">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="student@urs.edu.ph"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#1c0205] border border-amber-500/30 rounded-lg px-3 py-1.5 text-xs font-mono text-white placeholder-rose-400/40 focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-2.5 rounded bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </div>
                <span className="text-[10px] text-rose-300/60 font-mono block">Zero spam. Official URS academic notices.</span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-rose-300/60 gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span>© 2026–2027 SIGMA Society · University of Rizal System (Cainta Campus)</span>
            <span>·</span>
            <span>Statistical Innovation and Growth in Mathematical Advancement Society</span>
          </div>

          <div className="flex items-center gap-4 text-rose-200">
            <button
              onClick={() => {
                soundFx.playBlip(700, 0.02);
                setIsAdminModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-bold transition-colors cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Admin Customizer</span>
            </button>
            <span>·</span>
            <span>14.5800° N, 121.1219° E</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
