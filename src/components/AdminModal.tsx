import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Upload, 
  Image as ImageIcon, 
  RefreshCw, 
  Check, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  Sparkles, 
  Layers, 
  Sliders, 
  Trash2,
  ExternalLink,
  Download,
  FileCode,
  CheckCircle2,
  Users
} from 'lucide-react';
import { useCustomization } from '../context/CustomizationContext';
import { SIGMA_OFFICERS_DATA } from '../data/organizationData';
import { soundFx } from '../utils/sound';

export default function AdminModal() {
  const {
    officerPhotos,
    updateOfficerPhoto,
    resetOfficerPhoto,
    resetAllOfficerPhotos,
    backgroundConfig,
    updateBackground,
    resetBackground,
    logosConfig,
    updateLogos,
    resetLogos,
    isAdminModalOpen,
    setIsAdminModalOpen,
    isAuthenticated,
    loginAdmin,
    logoutAdmin
  } = useCustomization();

  const [activeTab, setActiveTab] = useState<'officers' | 'background' | 'logos' | 'backup'>('officers');
  const [passcode, setPasscode] = useState('');
  const [passError, setPassError] = useState(false);
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  if (!isAdminModalOpen) return null;

  const showNotification = (msg: string) => {
    soundFx.playChime();
    setSavedNotice(msg);
    setTimeout(() => setSavedNotice(null), 2500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = loginAdmin(passcode);
    if (ok) {
      soundFx.playChime();
      setPassError(false);
      setPasscode('');
    } else {
      soundFx.playBlip(300, 0.05);
      setPassError(true);
    }
  };

  // Convert File to base64 Data URL
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>, 
    onSuccess: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image file size is too large. Please select an image under 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onSuccess(result);
        showNotification('Image uploaded and applied!');
      }
    };
    reader.readAsDataURL(file);
  };

  const PRESET_BACKGROUNDS = [
    {
      name: 'Deep Crimson & Maroon (Official)',
      gradient: 'from-[#1c0205] via-[#2a0409] to-[#140103]',
      imageUrl: '',
      overlayOpacity: 35
    },
    {
      name: 'Royal Academic Gold & Obsidian',
      gradient: 'from-[#150a04] via-[#291708] to-[#0d0502]',
      imageUrl: '',
      overlayOpacity: 30
    },
    {
      name: 'Modern Cyber Constellation',
      gradient: 'from-[#0b0314] via-[#1c062c] to-[#07010e]',
      imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1920&q=80',
      overlayOpacity: 55
    },
    {
      name: 'Mathematical Blueprint Grid',
      gradient: 'from-[#1e0307] via-[#2c050d] to-[#160205]',
      imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1920&q=80',
      overlayOpacity: 65
    }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-4xl bg-gradient-to-br from-[#230408] via-[#2f060f] to-[#190205] border-2 border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Top Bar */}
          <div className="p-4 sm:p-5 border-b border-amber-500/25 bg-[#170104] flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-display font-bold text-white flex items-center gap-2">
                  <span>SIGMA Admin Control Panel</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-bold">
                    Customizer
                  </span>
                </h3>
                <p className="text-xs text-rose-200/80 font-sans">
                  Manage officer pictures, background visuals, and official logos with instant live updates.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isAuthenticated && (
                <button
                  onClick={() => {
                    logoutAdmin();
                    soundFx.playBlip(500, 0.02);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-black/40 hover:bg-black/60 text-xs font-mono text-rose-200 border border-amber-500/20 flex items-center gap-1.5"
                  title="Lock Admin Panel"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Lock Panel</span>
                </button>
              )}

              <button
                onClick={() => {
                  soundFx.playBlip(500, 0.02);
                  setIsAdminModalOpen(false);
                }}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-rose-200 hover:text-white transition-colors"
                title="Close Admin Panel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Toast Notification */}
          {savedNotice && (
            <div className="bg-amber-400 text-slate-950 font-mono text-xs px-4 py-2 flex items-center justify-between font-bold animate-fadeIn">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{savedNotice}</span>
              </span>
            </div>
          )}

          {/* Authentication Barrier */}
          {!isAuthenticated ? (
            <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center space-y-6 flex-1">
              <div className="w-16 h-16 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-xl">
                <Lock className="w-8 h-8" />
              </div>
              <div className="max-w-md">
                <h4 className="text-xl font-display font-bold text-white mb-2">
                  Admin Passcode Required
                </h4>
                <p className="text-xs text-rose-200/80 font-sans">
                  Enter your admin passcode to customize officer photos, background assets, and society logos.
                  <br />
                  <span className="text-[11px] font-mono text-amber-300/80 mt-1 block">
                    (Default Passcode: <code className="bg-black/40 px-1 py-0.5 rounded text-amber-300">sigma2026</code> or <code className="bg-black/40 px-1 py-0.5 rounded text-amber-300">admin</code>)
                  </span>
                </p>
              </div>

              <form onSubmit={handleLogin} className="w-full max-w-sm space-y-3">
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Enter admin passcode..."
                    value={passcode}
                    onChange={(e) => {
                      setPasscode(e.target.value);
                      setPassError(false);
                    }}
                    className={`w-full bg-black/50 border rounded-xl px-4 py-2.5 text-sm font-mono text-white placeholder-rose-400/40 focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                      passError ? 'border-red-500' : 'border-amber-500/30'
                    }`}
                    autoFocus
                  />
                </div>
                {passError && (
                  <p className="text-xs font-mono text-red-400">
                    Incorrect passcode. Try <span className="font-bold">sigma2026</span>.
                  </p>
                )}
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold font-mono text-xs shadow-lg transition-all"
                  >
                    Unlock Admin Panel
                  </button>
                  <button
                    type="button"
                    onClick={() => loginAdmin('sigma2026')}
                    className="px-3 py-2.5 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-mono font-bold hover:bg-amber-400/30 transition-all"
                    title="Quick 1-Click Access"
                  >
                    Quick Unlock
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Authenticated Admin Workspace */
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Tabs Navigation */}
              <div className="flex items-center px-4 pt-3 bg-black/40 border-b border-amber-500/20 overflow-x-auto gap-2">
                <button
                  onClick={() => {
                    setActiveTab('officers');
                    soundFx.playBlip(600, 0.015);
                  }}
                  className={`px-4 py-2.5 rounded-t-xl text-xs font-mono font-bold flex items-center gap-2 border-t border-x transition-all ${
                    activeTab === 'officers'
                      ? 'bg-[#2b050c] border-amber-400 text-amber-300 shadow-md'
                      : 'border-transparent text-rose-200/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Officer Pictures ({SIGMA_OFFICERS_DATA.length})</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('background');
                    soundFx.playBlip(600, 0.015);
                  }}
                  className={`px-4 py-2.5 rounded-t-xl text-xs font-mono font-bold flex items-center gap-2 border-t border-x transition-all ${
                    activeTab === 'background'
                      ? 'bg-[#2b050c] border-amber-400 text-amber-300 shadow-md'
                      : 'border-transparent text-rose-200/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Background & Theme</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('logos');
                    soundFx.playBlip(600, 0.015);
                  }}
                  className={`px-4 py-2.5 rounded-t-xl text-xs font-mono font-bold flex items-center gap-2 border-t border-x transition-all ${
                    activeTab === 'logos'
                      ? 'bg-[#2b050c] border-amber-400 text-amber-300 shadow-md'
                      : 'border-transparent text-rose-200/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>Logos & Seals</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('backup');
                    soundFx.playBlip(600, 0.015);
                  }}
                  className={`px-4 py-2.5 rounded-t-xl text-xs font-mono font-bold flex items-center gap-2 border-t border-x transition-all ${
                    activeTab === 'backup'
                      ? 'bg-[#2b050c] border-amber-400 text-amber-300 shadow-md'
                      : 'border-transparent text-rose-200/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <FileCode className="w-4 h-4" />
                  <span>Backup & Reset</span>
                </button>
              </div>

              {/* Tab Contents */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                {/* TAB 1: OFFICERS PICTURES */}
                {activeTab === 'officers' && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-amber-500/20">
                      <div>
                        <h4 className="text-sm font-display font-bold text-white flex items-center gap-2">
                          <span>Change Officer Profile Pictures</span>
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                            Live Auto-Save
                          </span>
                        </h4>
                        <p className="text-xs text-rose-200/80 font-sans">
                          Upload new pictures from your phone/computer or paste an image web URL for any officer.
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          if (confirm('Reset all officer pictures back to original defaults?')) {
                            resetAllOfficerPhotos();
                            showNotification('All officer photos restored to defaults.');
                          }
                        }}
                        className="px-3 py-1.5 rounded-lg bg-black/40 hover:bg-red-950/60 text-rose-300 border border-amber-500/20 text-xs font-mono flex items-center gap-1.5 self-start sm:self-auto"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Reset All to Defaults</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {SIGMA_OFFICERS_DATA.map((officer, idx) => {
                        const currentPhoto = officerPhotos[officer.id] || officer.avatarUrl;
                        const isCustom = Boolean(officerPhotos[officer.id]);

                        return (
                          <div
                            key={officer.id}
                            className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                              isCustom
                                ? 'bg-[#35070f]/90 border-amber-400 shadow-md ring-1 ring-amber-400/40'
                                : 'bg-[#220409]/70 border-amber-500/20'
                            }`}
                          >
                            <div className="flex items-start gap-3 mb-3">
                              {/* Diamond Avatar Preview */}
                              <div className="relative w-14 h-14 rotate-45 overflow-hidden border-2 border-amber-400 rounded-lg shadow-md shrink-0 my-1 ml-1 bg-black">
                                <img
                                  src={currentPhoto}
                                  alt={officer.name}
                                  className="w-full h-full -rotate-45 scale-[1.45] object-cover"
                                />
                              </div>

                              <div className="flex-1 min-w-0 pl-1">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="text-[10px] font-mono text-amber-300 font-bold">
                                    #{idx + 1}
                                  </span>
                                  <span className="text-[10px] font-mono text-slate-300 bg-black/40 px-1.5 py-0.5 rounded">
                                    {officer.category}
                                  </span>
                                  {isCustom && (
                                    <span className="text-[9px] font-mono text-emerald-300 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-500/30">
                                      Custom Photo Active
                                    </span>
                                  )}
                                </div>
                                <h5 className="text-sm font-display font-bold text-white truncate mt-0.5">
                                  {officer.name}
                                </h5>
                                <p className="text-xs text-amber-400/90 font-mono truncate">
                                  {officer.role}
                                </p>
                              </div>
                            </div>

                            {/* Actions: File Upload & URL Input */}
                            <div className="space-y-2 pt-2 border-t border-amber-500/15">
                              {/* Upload from file button */}
                              <div className="flex items-center gap-2">
                                <input
                                  type="file"
                                  accept="image/*"
                                  ref={(el) => { fileInputRefs.current[officer.id] = el; }}
                                  onChange={(e) =>
                                    handleFileUpload(e, (url) => updateOfficerPhoto(officer.id, url))
                                  }
                                  className="hidden"
                                />

                                <button
                                  type="button"
                                  onClick={() => fileInputRefs.current[officer.id]?.click()}
                                  className="flex-1 py-1.5 px-3 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold font-mono text-[11px] flex items-center justify-center gap-1.5 cursor-pointer shadow"
                                >
                                  <Upload className="w-3.5 h-3.5" />
                                  <span>Upload New Photo</span>
                                </button>

                                {isCustom && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      resetOfficerPhoto(officer.id);
                                      showNotification(`Restored ${officer.name}'s default photo.`);
                                    }}
                                    className="p-1.5 rounded-lg bg-black/40 hover:bg-red-950 text-rose-300 border border-amber-500/20 text-[10px] font-mono flex items-center gap-1"
                                    title="Reset to default photo"
                                  >
                                    <Trash2 className="w-3.5 h-3.5 text-red-400" />
                                    <span>Reset</span>
                                  </button>
                                )}
                              </div>

                              {/* Paste image URL */}
                              <div className="relative">
                                <input
                                  type="url"
                                  placeholder="Or paste image URL (https://...)"
                                  value={officerPhotos[officer.id] || ''}
                                  onChange={(e) => {
                                    if (e.target.value.trim()) {
                                      updateOfficerPhoto(officer.id, e.target.value.trim());
                                    } else {
                                      resetOfficerPhoto(officer.id);
                                    }
                                  }}
                                  className="w-full bg-black/40 border border-amber-500/25 rounded-lg px-2.5 py-1 text-[11px] font-mono text-white placeholder-rose-300/40 focus:outline-none focus:border-amber-400"
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* TAB 2: BACKGROUND & THEME */}
                {activeTab === 'background' && (
                  <div className="space-y-6">
                    <div className="pb-3 border-b border-amber-500/20">
                      <h4 className="text-sm font-display font-bold text-white">
                        Background Visuals & Overlay
                      </h4>
                      <p className="text-xs text-rose-200/80 font-sans">
                        Customize the website wallpaper, color overlay opacity, or select curated academic presets.
                      </p>
                    </div>

                    {/* Presets Grid */}
                    <div>
                      <span className="text-xs font-mono font-bold text-amber-400 block mb-3 uppercase">
                        Quick Preset Themes
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {PRESET_BACKGROUNDS.map((preset) => (
                          <button
                            key={preset.name}
                            type="button"
                            onClick={() => {
                              updateBackground({
                                gradient: preset.gradient,
                                imageUrl: preset.imageUrl,
                                overlayOpacity: preset.overlayOpacity
                              });
                              showNotification(`Applied preset: ${preset.name}`);
                            }}
                            className="p-3.5 rounded-xl border border-amber-500/25 hover:border-amber-400 bg-black/40 text-left transition-all hover:scale-[1.01] flex flex-col justify-between group"
                          >
                            <div>
                              <strong className="text-xs font-display font-bold text-white block group-hover:text-amber-300">
                                {preset.name}
                              </strong>
                              <span className="text-[10px] font-mono text-rose-300/70 block mt-1">
                                {preset.imageUrl ? 'Photo Wallpaper + Dark Gradient' : 'Deep Atmospheric Gradient'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-3 pt-2 border-t border-amber-500/15 text-[10px] font-mono text-amber-300">
                              <span>Apply Theme</span>
                              <Sparkles className="w-3 h-3" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Custom Background Image Upload */}
                    <div className="p-5 rounded-2xl bg-[#28040a]/80 border border-amber-500/25 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-amber-300 uppercase">
                          Custom Wallpaper / Background Image
                        </span>
                        {backgroundConfig.imageUrl && (
                          <button
                            onClick={() => {
                              updateBackground({ imageUrl: '' });
                              showNotification('Background image cleared.');
                            }}
                            className="text-xs font-mono text-red-300 hover:text-red-200 flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove Image</span>
                          </button>
                        )}
                      </div>

                      {/* File upload or URL */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            id="bg-file-upload"
                            onChange={(e) =>
                              handleFileUpload(e, (url) => updateBackground({ imageUrl: url }))
                            }
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => document.getElementById('bg-file-upload')?.click()}
                            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 font-bold font-mono text-xs flex items-center justify-center gap-2 cursor-pointer shadow"
                          >
                            <Upload className="w-4 h-4" />
                            <span>Upload Background File</span>
                          </button>
                        </div>

                        <div>
                          <input
                            type="url"
                            placeholder="Or paste background image URL..."
                            value={backgroundConfig.imageUrl || ''}
                            onChange={(e) => updateBackground({ imageUrl: e.target.value })}
                            className="w-full bg-black/50 border border-amber-500/30 rounded-xl px-3 py-2 text-xs font-mono text-white placeholder-rose-300/40 focus:outline-none focus:border-amber-400"
                          />
                        </div>
                      </div>

                      {/* Dark Overlay Opacity Slider */}
                      <div className="space-y-1.5 pt-2">
                        <div className="flex items-center justify-between text-xs font-mono text-rose-200">
                          <span>Dark Tint / Contrast Overlay:</span>
                          <span className="text-amber-300 font-bold">
                            {backgroundConfig.overlayOpacity}%
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="95"
                          value={backgroundConfig.overlayOpacity}
                          onChange={(e) =>
                            updateBackground({ overlayOpacity: parseInt(e.target.value, 10) })
                          }
                          className="w-full accent-amber-400 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: LOGOS & SEALS */}
                {activeTab === 'logos' && (
                  <div className="space-y-6">
                    <div className="pb-3 border-b border-amber-500/20">
                      <h4 className="text-sm font-display font-bold text-white">
                        Custom Society Logos & Institutional Seals
                      </h4>
                      <p className="text-xs text-rose-200/80 font-sans">
                        Upload custom SVG/PNG seals or replace the default SIGMA Society and URS emblems.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* SIGMA Logo Customizer */}
                      <div className="p-5 rounded-2xl bg-[#28040a]/80 border border-amber-500/30 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-amber-300 uppercase">
                            Official SIGMA Seal / Logo
                          </span>
                          {logosConfig.sigmaLogoUrl && (
                            <button
                              onClick={() => {
                                updateLogos({ sigmaLogoUrl: '' });
                                showNotification('SIGMA logo restored to default vector.');
                              }}
                              className="text-xs font-mono text-red-300 hover:text-red-200 flex items-center gap-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Reset</span>
                            </button>
                          )}
                        </div>

                        {/* File Upload */}
                        <input
                          type="file"
                          accept="image/*"
                          id="sigma-logo-upload"
                          onChange={(e) =>
                            handleFileUpload(e, (url) => updateLogos({ sigmaLogoUrl: url }))
                          }
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => document.getElementById('sigma-logo-upload')?.click()}
                          className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-mono font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Custom SIGMA Logo</span>
                        </button>

                        <input
                          type="url"
                          placeholder="Or paste Logo URL..."
                          value={logosConfig.sigmaLogoUrl || ''}
                          onChange={(e) => updateLogos({ sigmaLogoUrl: e.target.value })}
                          className="w-full bg-black/50 border border-amber-500/30 rounded-xl px-3 py-2 text-xs font-mono text-white placeholder-rose-300/40 focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      {/* URS Seal Customizer */}
                      <div className="p-5 rounded-2xl bg-[#28040a]/80 border border-amber-500/30 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-amber-300 uppercase">
                            University of Rizal System Seal
                          </span>
                          {logosConfig.ursSealUrl && (
                            <button
                              onClick={() => {
                                updateLogos({ ursSealUrl: '' });
                                showNotification('URS seal restored to default vector.');
                              }}
                              className="text-xs font-mono text-red-300 hover:text-red-200 flex items-center gap-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Reset</span>
                            </button>
                          )}
                        </div>

                        {/* File Upload */}
                        <input
                          type="file"
                          accept="image/*"
                          id="urs-seal-upload"
                          onChange={(e) =>
                            handleFileUpload(e, (url) => updateLogos({ ursSealUrl: url }))
                          }
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => document.getElementById('urs-seal-upload')?.click()}
                          className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-mono font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Custom URS Seal</span>
                        </button>

                        <input
                          type="url"
                          placeholder="Or paste URS Seal URL..."
                          value={logosConfig.ursSealUrl || ''}
                          onChange={(e) => updateLogos({ ursSealUrl: e.target.value })}
                          className="w-full bg-black/50 border border-amber-500/30 rounded-xl px-3 py-2 text-xs font-mono text-white placeholder-rose-300/40 focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 4: BACKUP & CONFIG */}
                {activeTab === 'backup' && (
                  <div className="space-y-6">
                    <div className="pb-3 border-b border-amber-500/20">
                      <h4 className="text-sm font-display font-bold text-white">
                        Backup & Configuration Management
                      </h4>
                      <p className="text-xs text-rose-200/80 font-sans">
                        Export your full customizations as a backup file or reset everything to brand new state.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-5 rounded-2xl bg-black/40 border border-amber-500/20 space-y-3">
                        <strong className="text-xs font-mono text-amber-300 block uppercase">
                          Export Settings (JSON)
                        </strong>
                        <p className="text-xs text-rose-200/80 font-sans">
                          Download a complete JSON file with all your officer photos and theme settings.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            const config = {
                              officerPhotos,
                              backgroundConfig,
                              logosConfig,
                              exportedAt: new Date().toISOString()
                            };
                            const blob = new Blob([JSON.stringify(config, null, 2)], {
                              type: 'application/json'
                            });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `sigma-society-custom-config-${Date.now()}.json`;
                            a.click();
                            showNotification('Configuration exported successfully.');
                          }}
                          className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-mono font-bold text-xs flex items-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          <span>Export Config (JSON)</span>
                        </button>
                      </div>

                      <div className="p-5 rounded-2xl bg-black/40 border border-red-500/30 space-y-3">
                        <strong className="text-xs font-mono text-red-400 block uppercase">
                          Factory Master Reset
                        </strong>
                        <p className="text-xs text-rose-200/80 font-sans">
                          Restore all officer photos, wallpapers, and logos back to factory defaults.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm('Are you sure you want to reset all customizations to factory defaults?')) {
                              resetAllOfficerPhotos();
                              resetBackground();
                              resetLogos();
                              showNotification('All settings reset to factory defaults.');
                            }
                          }}
                          className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono font-bold text-xs flex items-center gap-2"
                        >
                          <RefreshCw className="w-4 h-4" />
                          <span>Reset Everything</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Bar */}
              <div className="p-4 bg-[#140103] border-t border-amber-500/25 flex items-center justify-between text-xs font-mono text-rose-300/80">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Admin Session Active</span>
                </span>

                <button
                  onClick={() => setIsAdminModalOpen(false)}
                  className="px-4 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold transition-colors"
                >
                  Done & Close
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
