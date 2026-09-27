import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Images, 
  Users, 
  Palette, 
  ArrowLeft, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit3, 
  Upload, 
  Check, 
  RotateCcw, 
  Camera, 
  Eye,
  Lock,
  Sparkles,
  Sliders
} from 'lucide-react';
import { useCustomization, GalleryItem } from '../context/CustomizationContext';
import { SIGMA_OFFICERS_DATA } from '../data/organizationData';
import SigmaOfficialLogo from './SigmaOfficialLogo';
import UrsOfficialSeal from './UrsOfficialSeal';
import { soundFx } from '../utils/sound';

export default function AdminPage() {
  const {
    setCurrentView,
    isAdmin,
    loginAdmin,
    logoutAdmin,
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
    galleryItems,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    resetGallery
  } = useCustomization();

  const [activeTab, setActiveTab] = useState<'gallery' | 'officers' | 'theme'>('gallery');
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Gallery item form state inside admin page
  const [isAddingGallery, setIsAddingGallery] = useState(false);
  const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null);
  const [galleryForm, setGalleryForm] = useState<{
    title: string;
    category: GalleryItem['category'];
    imageUrl: string;
    date: string;
    location: string;
    caption: string;
  }>({
    title: '',
    category: 'Workshops',
    imageUrl: '',
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    location: 'URS Cainta Campus',
    caption: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(passcode);
    if (success) {
      soundFx.playChime();
      setLoginError(false);
      setPasscode('');
    } else {
      soundFx.playBlip(300, 0.04);
      setLoginError(true);
    }
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setGalleryForm((prev) => ({ ...prev, imageUrl: result }));
          soundFx.playBlip(800, 0.02);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveGalleryItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryForm.title || !galleryForm.imageUrl) return;

    soundFx.playChime();
    if (editingGalleryId) {
      updateGalleryItem(editingGalleryId, galleryForm);
      setEditingGalleryId(null);
    } else {
      addGalleryItem(galleryForm);
      setIsAddingGallery(false);
    }
  };

  const handleOfficerPhotoUpload = (officerId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          updateOfficerPhoto(officerId, result);
          soundFx.playChime();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // If not authenticated as Admin, display passcode access screen
  if (!isAdmin) {
    return (
      <div className="min-h-screen py-20 px-4 flex items-center justify-center relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md p-8 rounded-3xl bg-gradient-to-br from-[#28040a] via-[#350610] to-[#1a0104] border-2 border-amber-400/60 shadow-2xl"
        >
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-amber-400/20 border border-amber-400 flex items-center justify-center text-amber-400 mb-3 shadow-lg">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-display font-black text-white">
              SIGMA Admin Portal
            </h2>
            <p className="text-xs text-rose-200/80 font-sans mt-1">
              Protected administration interface for Executive Board members and Advisers.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 font-mono text-xs">
            <div>
              <label className="block text-amber-300 font-bold mb-1.5 uppercase tracking-wider">
                Admin Security Passcode
              </label>
              <input
                type="password"
                required
                autoFocus
                placeholder="Enter passcode (e.g. sigma2026)"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setLoginError(false);
                }}
                className="w-full bg-[#160204] border border-amber-500/40 rounded-xl px-4 py-3 text-white placeholder-rose-400/40 focus:outline-none focus:border-amber-400 transition-colors"
              />
              {loginError && (
                <p className="text-rose-400 text-[11px] mt-1.5 font-sans">
                  Invalid passcode. Authorized passcode is <code className="text-amber-300 font-mono">sigma2026</code>.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold shadow-lg transition-all hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Authenticate & Access Admin</span>
            </button>

            <div className="pt-3 border-t border-amber-500/20 text-center">
              <button
                type="button"
                onClick={() => setCurrentView('user')}
                className="text-rose-300/80 hover:text-amber-300 transition-colors flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Public User Website</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 max-w-7xl mx-auto relative text-slate-100">
      {/* Top Admin Navigation Header */}
      <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-[#2c0409] via-[#3a0711] to-[#1f0206] border-2 border-amber-400/50 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-400/20 border border-amber-400 flex items-center justify-center text-amber-400 shadow-md">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-display font-extrabold text-white">
                SIGMA Administration Portal
              </h1>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-400 text-slate-950">
                ACTIVE
              </span>
            </div>
            <p className="text-xs text-rose-200/80 font-sans mt-0.5">
              Customize Home Gallery photos, officer portraits, and visual branding for URS Cainta chapter.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Switch to User Public Page */}
          <button
            onClick={() => {
              soundFx.playBlip(600, 0.02);
              setCurrentView('user');
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 font-mono text-xs font-extrabold flex items-center gap-2 shadow-lg transition-all hover:scale-105 cursor-pointer"
          >
            <Eye className="w-4 h-4 text-slate-950" />
            <span>View User Page</span>
          </button>

          {/* Logout Admin */}
          <button
            onClick={() => {
              soundFx.playBlip(400, 0.02);
              logoutAdmin();
            }}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-rose-200 hover:text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Log out of Admin mode"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Admin Module Tabs */}
      <div className="flex items-center gap-2 mb-8 border-b border-amber-500/20 pb-4 font-mono text-xs overflow-x-auto scrollbar-none">
        <button
          onClick={() => {
            soundFx.playBlip(700, 0.015);
            setActiveTab('gallery');
          }}
          className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'gallery'
              ? 'bg-amber-400 text-slate-950 font-extrabold shadow-md'
              : 'bg-[#200408] text-rose-200 hover:text-white border border-amber-500/20'
          }`}
        >
          <Images className="w-4 h-4" />
          <span>Home Gallery Manager ({galleryItems.length})</span>
        </button>

        <button
          onClick={() => {
            soundFx.playBlip(700, 0.015);
            setActiveTab('officers');
          }}
          className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'officers'
              ? 'bg-amber-400 text-slate-950 font-extrabold shadow-md'
              : 'bg-[#200408] text-rose-200 hover:text-white border border-amber-500/20'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Officer Portraits ({SIGMA_OFFICERS_DATA.length})</span>
        </button>

        <button
          onClick={() => {
            soundFx.playBlip(700, 0.015);
            setActiveTab('theme');
          }}
          className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'theme'
              ? 'bg-amber-400 text-slate-950 font-extrabold shadow-md'
              : 'bg-[#200408] text-rose-200 hover:text-white border border-amber-500/20'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>Theme & Background</span>
        </button>
      </div>

      {/* ============================================================== */}
      {/* TAB 1: HOME GALLERY MANAGER */}
      {/* ============================================================== */}
      {activeTab === 'gallery' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#230408] border border-amber-500/30">
            <div>
              <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
                <span>Campus Life & Events Gallery Manager</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40">
                  Live on User Page
                </span>
              </h3>
              <p className="text-xs text-rose-200/80 font-sans mt-0.5">
                Upload event photos, set captions, edit dates, and organize by categories.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  soundFx.playBlip(750, 0.02);
                  setGalleryForm({
                    title: '',
                    category: 'Workshops',
                    imageUrl: '',
                    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                    location: 'URS Cainta Campus',
                    caption: ''
                  });
                  setEditingGalleryId(null);
                  setIsAddingGallery(true);
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 font-mono text-xs font-extrabold flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Upload New Photo</span>
              </button>

              <button
                onClick={() => {
                  if (window.confirm('Reset gallery to official defaults?')) {
                    resetGallery();
                    soundFx.playBlip(500, 0.02);
                  }
                }}
                className="p-2 rounded-xl bg-black/40 hover:bg-black/60 border border-amber-500/30 text-rose-200"
                title="Reset Gallery"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Add / Edit Form Card inside Admin */}
          {isAddingGallery && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-[#2a0409] border-2 border-amber-400 shadow-2xl"
            >
              <h4 className="text-base font-display font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{editingGalleryId ? 'Edit Gallery Photo' : 'Add New Photo to Gallery'}</span>
              </h4>

              <form onSubmit={handleSaveGalleryItem} className="space-y-4 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-amber-300 font-bold mb-1">Event / Photo Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 2nd Statistical Modeling Colloquium"
                      value={galleryForm.title}
                      onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                      className="w-full bg-[#160204] border border-amber-500/30 rounded-xl px-3 py-2 text-white focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-amber-300 font-bold mb-1">Category *</label>
                    <select
                      value={galleryForm.category}
                      onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value as any })}
                      className="w-full bg-[#160204] border border-amber-500/30 rounded-xl px-3 py-2 text-white focus:border-amber-400"
                    >
                      <option value="Colloquiums">Colloquiums</option>
                      <option value="Workshops">Workshops</option>
                      <option value="Assemblies">Assemblies</option>
                      <option value="Campus Life">Campus Life</option>
                      <option value="Competitions">Competitions</option>
                      <option value="General">General</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-amber-300 font-bold mb-1">Date</label>
                    <input
                      type="text"
                      value={galleryForm.date}
                      onChange={(e) => setGalleryForm({ ...galleryForm, date: e.target.value })}
                      className="w-full bg-[#160204] border border-amber-500/30 rounded-xl px-3 py-2 text-white focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-amber-300 font-bold mb-1">Location</label>
                    <input
                      type="text"
                      value={galleryForm.location}
                      onChange={(e) => setGalleryForm({ ...galleryForm, location: e.target.value })}
                      className="w-full bg-[#160204] border border-amber-500/30 rounded-xl px-3 py-2 text-white focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-amber-300 font-bold mb-1">Image URL or Local Upload *</label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      required
                      placeholder="https://..."
                      value={galleryForm.imageUrl}
                      onChange={(e) => setGalleryForm({ ...galleryForm, imageUrl: e.target.value })}
                      className="flex-1 bg-[#160204] border border-amber-500/30 rounded-xl px-3 py-2 text-white focus:border-amber-400 text-[11px]"
                    />
                    <label className="px-3 py-2 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/50 text-amber-300 cursor-pointer flex items-center justify-center shrink-0">
                      <Upload className="w-4 h-4" />
                      <input type="file" accept="image/*" onChange={handleGalleryUpload} className="hidden" />
                    </label>
                  </div>
                </div>

                {galleryForm.imageUrl && (
                  <div className="aspect-[16/7] max-w-sm rounded-xl overflow-hidden border border-amber-500/30 bg-black">
                    <img src={galleryForm.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}

                <div>
                  <label className="block text-amber-300 font-bold mb-1">Caption / Description</label>
                  <textarea
                    rows={2}
                    placeholder="Describe the research project, workshop activity, or assembly milestones..."
                    value={galleryForm.caption}
                    onChange={(e) => setGalleryForm({ ...galleryForm, caption: e.target.value })}
                    className="w-full bg-[#160204] border border-amber-500/30 rounded-xl px-3 py-2 text-white focus:border-amber-400 font-sans text-xs"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingGallery(false);
                      setEditingGalleryId(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-rose-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-amber-400 text-slate-950 font-extrabold flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Save to Gallery</span>
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Gallery Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl bg-[#1f0307] border border-amber-500/30 overflow-hidden shadow-lg flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] bg-black">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-amber-300 font-mono text-[10px] font-bold">
                    {item.category}
                  </span>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-display font-bold text-white text-sm line-clamp-1">{item.title}</h4>
                    <p className="text-xs text-rose-100/80 font-sans mt-1 line-clamp-2">{item.caption}</p>
                    <div className="text-[10px] font-mono text-amber-300/80 mt-2">
                      {item.date} · {item.location}
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 mt-3 border-t border-amber-500/20 font-mono text-xs">
                    <button
                      onClick={() => {
                        soundFx.playBlip(700, 0.02);
                        setGalleryForm({
                          title: item.title,
                          category: item.category,
                          imageUrl: item.imageUrl,
                          date: item.date,
                          location: item.location,
                          caption: item.caption
                        });
                        setEditingGalleryId(item.id);
                        setIsAddingGallery(true);
                      }}
                      className="px-3 py-1 rounded-lg bg-black/50 hover:bg-black text-amber-300 border border-amber-400/40 flex items-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => {
                        if (window.confirm(`Delete "${item.title}"?`)) {
                          deleteGalleryItem(item.id);
                        }
                      }}
                      className="px-3 py-1 rounded-lg bg-rose-950/50 hover:bg-rose-900 text-rose-300 border border-rose-500/40 flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: OFFICER PORTRAITS */}
      {/* ============================================================== */}
      {activeTab === 'officers' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#230408] border border-amber-500/30">
            <div>
              <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
                <span>Executive Officers & Advisers Headshot Customizer</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40">
                  {SIGMA_OFFICERS_DATA.length} Profiles
                </span>
              </h3>
              <p className="text-xs text-rose-200/80 font-sans mt-0.5">
                Upload real headshots for officers and faculty advisers.
              </p>
            </div>

            <button
              onClick={() => {
                if (window.confirm('Reset all officer photos to official defaults?')) {
                  resetAllOfficerPhotos();
                  soundFx.playBlip(500, 0.02);
                }
              }}
              className="px-3.5 py-2 rounded-xl bg-black/40 hover:bg-black/60 border border-amber-500/30 text-rose-200 text-xs font-mono flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Photos</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SIGMA_OFFICERS_DATA.map((officer) => {
              const currentPhoto = officerPhotos[officer.id] || officer.avatarUrl;
              const hasCustom = Boolean(officerPhotos[officer.id]);

              return (
                <div
                  key={officer.id}
                  className="p-5 rounded-2xl bg-[#1f0307] border border-amber-500/30 flex flex-col justify-between shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-amber-400/70 bg-black shrink-0">
                      <img src={currentPhoto} alt={officer.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block">
                        {officer.category}
                      </span>
                      <h4 className="font-display font-bold text-white text-sm truncate">{officer.name}</h4>
                      <p className="text-xs text-rose-200 font-mono mt-0.5 truncate">{officer.role}</p>
                      <p className="text-[11px] text-rose-300/70 font-sans mt-1">{officer.programOrDept}</p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-amber-500/20 flex items-center justify-between gap-2 font-mono text-xs">
                    <label className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 font-bold flex items-center gap-1.5 cursor-pointer shadow-sm">
                      <Camera className="w-3.5 h-3.5" />
                      <span>Change Headshot</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleOfficerPhotoUpload(officer.id, e)}
                        className="hidden"
                      />
                    </label>

                    {hasCustom && (
                      <button
                        onClick={() => resetOfficerPhoto(officer.id)}
                        className="px-2.5 py-1.5 rounded-lg bg-black/40 hover:bg-black text-rose-300 text-[11px] border border-rose-500/30"
                        title="Reset this officer photo"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: THEME & BACKGROUND */}
      {/* ============================================================== */}
      {activeTab === 'theme' && (
        <div className="space-y-6 max-w-2xl">
          <div className="p-6 rounded-2xl bg-[#230408] border border-amber-500/30 space-y-5 font-mono text-xs">
            <div>
              <h3 className="text-base font-display font-bold text-white mb-1">
                Visual Theme & Custom Background
              </h3>
              <p className="text-xs text-rose-200/80 font-sans">
                Customize wallpaper, opacity overlay, and ambient patterns.
              </p>
            </div>

            <div>
              <label className="block text-amber-300 font-bold mb-1.5">Custom Background Image URL</label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={backgroundConfig.imageUrl || ''}
                onChange={(e) => updateBackground({ imageUrl: e.target.value })}
                className="w-full bg-[#160204] border border-amber-500/30 rounded-xl px-3 py-2.5 text-white focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-amber-300 font-bold mb-1.5">
                Overlay Tint Opacity ({backgroundConfig.overlayOpacity}%)
              </label>
              <input
                type="range"
                min="0"
                max="90"
                value={backgroundConfig.overlayOpacity}
                onChange={(e) => updateBackground({ overlayOpacity: parseInt(e.target.value, 10) })}
                className="w-full accent-amber-400"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="patternCheck"
                checked={backgroundConfig.patternEnabled}
                onChange={(e) => updateBackground({ patternEnabled: e.target.checked })}
                className="w-4 h-4 accent-amber-400 rounded"
              />
              <label htmlFor="patternCheck" className="text-rose-100 cursor-pointer font-sans text-xs">
                Enable mathematical coordinate grid pattern overlay
              </label>
            </div>

            <div className="pt-4 border-t border-amber-500/20 flex justify-end">
              <button
                type="button"
                onClick={resetBackground}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-rose-200 text-xs flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Theme</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
