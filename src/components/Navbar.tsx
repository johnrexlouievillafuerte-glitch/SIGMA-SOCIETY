import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight, Sparkles, Sliders, Eye, ShieldCheck } from 'lucide-react';
import { useCustomization } from '../context/CustomizationContext';
import { soundFx } from '../utils/sound';
import SigmaOfficialLogo from './SigmaOfficialLogo';

export default function Navbar() {
  const { currentView, setCurrentView, isAdmin } = useCustomization();
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const isNowOn = soundFx.toggle();
    setSoundEnabled(isNowOn);
  };

  const navLinks = [
    { label: 'about us', href: '#about-us' },
    { label: 'mission', href: '#mission' },
    { label: 'vision', href: '#vision' },
    { label: 'the officers', href: '#officers' },
    { label: 'gallery', href: '#gallery' },
    { label: 'membership application', href: '#membership-application' }
  ];

  const handleNavClick = (href: string) => {
    soundFx.playBlip(500, 0.02);
    setMobileMenuOpen(false);
    
    if (currentView === 'admin') {
      setCurrentView('user');
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#1b0205]/92 backdrop-blur-md border-b border-amber-500/30 shadow-lg shadow-black/60 py-2.5'
          : 'bg-transparent py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Brand Logo & Full Acronym Meaning */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (currentView === 'admin') {
              setCurrentView('user');
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
            soundFx.playBlip(600, 0.03);
          }}
          className="flex items-center gap-3 group transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          {/* Official SIGMA Circular Seal */}
          <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-red-950/80 border border-amber-400/60 shadow-md group-hover:border-amber-300 group-hover:shadow-[0_0_12px_rgba(250,204,21,0.5)] transition-all duration-300">
            <SigmaOfficialLogo size={36} variant="full" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-white tracking-wider text-base group-hover:text-amber-300 transition-colors">
                SIGMA
              </span>
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 shadow-sm transition-transform duration-200 group-hover:scale-105">
                URS Cainta
              </span>
              {currentView === 'admin' && (
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-rose-900 border border-rose-400 text-rose-200">
                  ADMIN PORTAL
                </span>
              )}
            </div>
            <span className="text-[10px] font-mono text-rose-200/80 group-hover:text-rose-100 transition-colors hidden sm:inline">
              Statistical Innovation and Growth in Mathematical Advancement Society
            </span>
          </div>
        </a>

        {/* Desktop Navigation (Only in User View or for quick jump) */}
        {currentView === 'user' && (
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-mono font-medium text-rose-100/90">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                onMouseEnter={() => soundFx.playBlip(750, 0.01)}
                className="relative px-3 py-1.5 rounded-lg capitalize transition-all duration-200 ease-out transform hover:scale-105 active:scale-95 text-rose-200/90 hover:text-amber-300 hover:bg-amber-400/10 group cursor-pointer"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-amber-400 to-amber-300 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-250 ease-out origin-center shadow-[0_0_8px_rgba(250,204,21,0.6)]" />
              </button>
            ))}
          </nav>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Admin Page Switcher */}
          {currentView === 'user' ? (
            <button
              onClick={() => {
                soundFx.playBlip(700, 0.02);
                setCurrentView('admin');
              }}
              className="px-3 py-1.5 rounded-lg bg-[#2b050c] border border-amber-500/30 text-amber-300 hover:bg-amber-400/20 hover:border-amber-400 text-xs font-mono transition-all duration-200 ease-out transform hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer shadow-sm hover:shadow-[0_0_10px_rgba(250,204,21,0.3)]"
              title="Admin: Access Executive Portal, Gallery Management & Customization"
            >
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px] font-bold">Admin Portal</span>
            </button>
          ) : (
            <button
              onClick={() => {
                soundFx.playBlip(700, 0.02);
                setCurrentView('user');
              }}
              className="px-3 py-1.5 rounded-lg bg-amber-400 text-slate-950 hover:bg-amber-300 text-xs font-mono font-extrabold transition-all duration-200 ease-out transform hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer shadow-md"
              title="Return to Public User View"
            >
              <Eye className="w-3.5 h-3.5 text-slate-950" />
              <span className="text-[11px]">User View</span>
            </button>
          )}

          {/* Audio Synthesizer Toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-lg border text-xs font-mono transition-all duration-200 ease-out transform hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer ${
              soundEnabled
                ? 'bg-amber-400/20 border-amber-400 text-amber-300 shadow-sm shadow-amber-400/20'
                : 'bg-[#2b050c] border-amber-500/20 text-rose-200 hover:text-white hover:border-amber-500/40'
            }`}
            title={soundEnabled ? 'Disable UI audio feedback' : 'Enable futuristic UI audio feedback'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-amber-400" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline text-[11px]">{soundEnabled ? 'Audio On' : 'Muted'}</span>
          </button>

          {/* Quick CTA to Membership Application (In User Mode) */}
          {currentView === 'user' && (
            <button
              onClick={() => handleNavClick('#membership-application')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-mono text-xs font-extrabold transition-all duration-200 ease-out transform hover:scale-105 active:scale-95 shadow-md shadow-amber-950/40 hover:shadow-[0_0_15px_rgba(250,204,21,0.4)] cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Join SIGMA</span>
              <span className="sm:hidden">Join</span>
              <ArrowUpRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          )}

          {/* Mobile Menu Button */}
          {currentView === 'user' && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#2b050c] border border-amber-500/30 text-rose-200 hover:text-white transition-all duration-200 hover:scale-105 active:scale-95"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && currentView === 'user' && (
        <div className="lg:hidden bg-[#1a0205]/98 border-b border-amber-500/30 px-4 py-4 backdrop-blur-xl animate-fadeIn">
          <div className="text-[11px] font-mono text-amber-400 font-bold mb-2 pb-2 border-b border-white/[0.08]">
            Statistical Innovation and Growth in Mathematical Advancement Society · URS Cainta
          </div>
          <div className="flex flex-col space-y-1.5 font-mono text-xs">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-left text-rose-100 hover:text-amber-300 py-2 px-3 rounded-lg border-b border-rose-950/40 capitalize font-medium transition-all duration-200 hover:scale-[1.02] hover:bg-amber-400/10 hover:translate-x-1"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setCurrentView('admin');
              }}
              className="mt-2 py-2 px-3 rounded-lg bg-[#2b050c] border border-amber-500/30 text-amber-300 font-bold text-xs flex items-center justify-center gap-2"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Admin Portal Access</span>
            </button>
            <button
              onClick={() => handleNavClick('#membership-application')}
              className="mt-2 w-full py-2.5 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Apply for Membership
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
