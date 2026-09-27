import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Images, 
  Plus, 
  Trash2, 
  Edit3, 
  Calendar, 
  MapPin, 
  X, 
  Sparkles, 
  Upload, 
  Check, 
  ZoomIn,
  RotateCcw,
  ShieldAlert
} from 'lucide-react';
import { useCustomization, GalleryItem } from '../context/CustomizationContext';
import { soundFx } from '../utils/sound';

const CATEGORIES: Array<GalleryItem['category'] | 'All'> = [
  'All',
  'Colloquiums',
  'Workshops',
  'Assemblies',
  'Campus Life',
  'Competitions'
];

export default function HomeGallery() {
  const { 
    galleryItems, 
    addGalleryItem, 
    updateGalleryItem, 
    deleteGalleryItem, 
    resetGallery,
    isAdmin,
    currentView 
  } = useCustomization();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  // Admin Edit / Add modal state
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formValues, setFormValues] = useState<{
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

  const canEdit = currentView === 'admin' && isAdmin;

  const filteredItems = selectedCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === selectedCategory);

  const handleOpenAdd = () => {
    soundFx.playBlip(750, 0.02);
    setFormValues({
      title: '',
      category: 'Workshops',
      imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      location: 'URS Cainta Campus',
      caption: ''
    });
    setIsAddingNew(true);
  };

  const handleOpenEdit = (item: GalleryItem, e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playBlip(700, 0.02);
    setEditingItem(item);
    setFormValues({
      title: item.title,
      category: item.category,
      imageUrl: item.imageUrl,
      date: item.date,
      location: item.location,
      caption: item.caption
    });
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this photo from the gallery?')) {
      soundFx.playBlip(400, 0.03);
      deleteGalleryItem(id);
    }
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValues.title || !formValues.imageUrl) return;

    soundFx.playChime();
    if (isAddingNew) {
      addGalleryItem(formValues);
      setIsAddingNew(false);
    } else if (editingItem) {
      updateGalleryItem(editingItem.id, formValues);
      setEditingItem(null);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setFormValues((prev) => ({ ...prev, imageUrl: result }));
          soundFx.playBlip(800, 0.02);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="gallery" className="py-20 px-4 max-w-7xl mx-auto relative scroll-mt-20">
      {/* Section Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-amber-500/20 pb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-mono text-[11px] uppercase tracking-widest mb-1.5 font-bold">
            <Images className="w-3.5 h-3.5" />
            <span>Campus Life & Events</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight flex items-center gap-3 flex-wrap">
            <span>Home Gallery</span>
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-amber-400 text-slate-950 shadow-sm">
              URS Cainta Chapter
            </span>
          </h2>
          <p className="text-rose-100/80 text-xs sm:text-sm mt-1 max-w-2xl font-sans">
            Showcasing statistical research symposiums, mathematical olympiads, data analytics workshops, and student society assemblies.
          </p>
        </div>

        {/* Admin controls: Add Photo & Reset */}
        {canEdit && (
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg transition-all hover:scale-105 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Photo (Admin)</span>
            </button>

            <button
              onClick={() => {
                if (window.confirm('Reset gallery to official default photos?')) {
                  resetGallery();
                  soundFx.playBlip(500, 0.02);
                }
              }}
              className="p-2 rounded-xl bg-black/40 hover:bg-black/60 border border-amber-500/30 text-rose-200 hover:text-white transition-colors cursor-pointer"
              title="Reset Gallery to Default"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none font-mono text-xs">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              soundFx.playBlip(600, 0.01);
              setSelectedCategory(cat);
            }}
            className={`px-3.5 py-1.5 rounded-xl border transition-all duration-200 whitespace-nowrap cursor-pointer ${
              selectedCategory === cat
                ? 'bg-amber-400 text-slate-950 font-extrabold border-amber-400 shadow-md shadow-amber-950/40 scale-105'
                : 'bg-[#210408] border-amber-500/20 text-rose-200/90 hover:border-amber-400/50 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {filteredItems.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-black/40 border border-amber-500/20 text-rose-200 font-mono text-xs">
          No photos found in category "{selectedCategory}".
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              onClick={() => {
                soundFx.playBlip(750, 0.015);
                setActiveLightboxItem(item);
              }}
              className="group relative rounded-2xl bg-gradient-to-b from-[#28040a] to-[#170104] border border-amber-500/30 hover:border-amber-400 shadow-xl overflow-hidden cursor-pointer flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image with zoom on hover */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-950/85 border border-amber-400/60 text-amber-300 font-mono text-[10px] font-bold shadow-md">
                    {item.category}
                  </span>
                </div>

                {/* Lightbox Zoom Icon Hint */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-2.5 rounded-full bg-amber-400 text-slate-950 shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>

                {/* Admin Quick Actions Overlay */}
                {canEdit && (
                  <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => handleOpenEdit(item, e)}
                      className="p-1.5 rounded-lg bg-black/80 hover:bg-black text-amber-300 border border-amber-400/50 shadow-md transition-colors"
                      title="Edit photo details"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => handleDelete(item.id, e)}
                      className="p-1.5 rounded-lg bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-500/50 shadow-md transition-colors"
                      title="Delete photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Content Card Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-display font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-rose-100/80 font-sans mt-1.5 line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-amber-500/15 flex items-center justify-between text-[10.5px] font-mono text-rose-300/70">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-amber-400" />
                    <span>{item.date}</span>
                  </span>
                  <span className="flex items-center gap-1 truncate max-w-[140px]">
                    <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Lightbox Modal (For All Users) */}
      <AnimatePresence>
        {activeLightboxItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-[#1d0206] border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col"
            >
              {/* Lightbox Header */}
              <div className="p-4 bg-gradient-to-r from-[#2e050c] to-[#1f0206] border-b border-amber-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-amber-400 text-slate-950 font-mono text-xs font-bold">
                    {activeLightboxItem.category}
                  </span>
                  <h3 className="text-sm sm:text-base font-display font-bold text-white truncate max-w-md">
                    {activeLightboxItem.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveLightboxItem(null)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-rose-200 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Lightbox Image Preview */}
              <div className="relative bg-black flex items-center justify-center max-h-[60vh] overflow-hidden">
                <img
                  src={activeLightboxItem.imageUrl}
                  alt={activeLightboxItem.title}
                  className="max-h-[60vh] w-auto object-contain mx-auto"
                />
              </div>

              {/* Lightbox Details */}
              <div className="p-5 space-y-2 bg-[#170104]">
                <p className="text-xs sm:text-sm text-rose-100 font-sans leading-relaxed">
                  {activeLightboxItem.caption}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-amber-300/90 pt-2 border-t border-amber-500/20">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>{activeLightboxItem.date}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{activeLightboxItem.location}</span>
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Admin Add / Edit Modal */}
      <AnimatePresence>
        {(isAddingNew || editingItem) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-[#240307] border-2 border-amber-400/60 rounded-2xl shadow-2xl overflow-hidden p-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-amber-500/25 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-400/20 border border-amber-400 flex items-center justify-center text-amber-400">
                    <Images className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-display font-bold text-white">
                    {isAddingNew ? 'Add New Gallery Photo' : 'Edit Gallery Photo'}
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setIsAddingNew(false);
                    setEditingItem(null);
                  }}
                  className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-rose-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveForm} className="space-y-4 text-xs font-mono">
                <div>
                  <label className="block text-amber-300 font-bold mb-1">Event / Photo Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2nd Statistical Hackathon 2026"
                    value={formValues.title}
                    onChange={(e) => setFormValues({ ...formValues, title: e.target.value })}
                    className="w-full bg-[#160204] border border-amber-500/30 rounded-xl px-3 py-2 text-white placeholder-rose-400/40 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-amber-300 font-bold mb-1">Category *</label>
                    <select
                      value={formValues.category}
                      onChange={(e) => setFormValues({ ...formValues, category: e.target.value as any })}
                      className="w-full bg-[#160204] border border-amber-500/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Colloquiums">Colloquiums</option>
                      <option value="Workshops">Workshops</option>
                      <option value="Assemblies">Assemblies</option>
                      <option value="Campus Life">Campus Life</option>
                      <option value="Competitions">Competitions</option>
                      <option value="General">General</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-amber-300 font-bold mb-1">Date</label>
                    <input
                      type="text"
                      placeholder="e.g. March 15, 2026"
                      value={formValues.date}
                      onChange={(e) => setFormValues({ ...formValues, date: e.target.value })}
                      className="w-full bg-[#160204] border border-amber-500/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    >
                    </input>
                  </div>
                </div>

                <div>
                  <label className="block text-amber-300 font-bold mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. URS Cainta Central Lab"
                    value={formValues.location}
                    onChange={(e) => setFormValues({ ...formValues, location: e.target.value })}
                    className="w-full bg-[#160204] border border-amber-500/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-amber-300 font-bold mb-1">Image URL or Local Upload *</label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      required
                      placeholder="https://images.unsplash.com/..."
                      value={formValues.imageUrl}
                      onChange={(e) => setFormValues({ ...formValues, imageUrl: e.target.value })}
                      className="flex-1 bg-[#160204] border border-amber-500/30 rounded-xl px-3 py-2 text-white placeholder-rose-400/40 focus:outline-none focus:border-amber-400 text-[11px]"
                    />
                    <label className="px-3 py-2 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/50 text-amber-300 cursor-pointer flex items-center justify-center shrink-0">
                      <Upload className="w-4 h-4" />
                      <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                    </label>
                  </div>
                </div>

                {/* Preview Thumbnail */}
                {formValues.imageUrl && (
                  <div className="aspect-[16/8] rounded-xl overflow-hidden border border-amber-500/30 bg-black">
                    <img src={formValues.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}

                <div>
                  <label className="block text-amber-300 font-bold mb-1">Caption / Description</label>
                  <textarea
                    rows={2}
                    placeholder="Describe the research project, workshop activity, or assembly milestones..."
                    value={formValues.caption}
                    onChange={(e) => setFormValues({ ...formValues, caption: e.target.value })}
                    className="w-full bg-[#160204] border border-amber-500/30 rounded-xl px-3 py-2 text-white placeholder-rose-400/40 focus:outline-none focus:border-amber-400 font-sans text-xs"
                  />
                </div>

                <div className="pt-3 border-t border-amber-500/20 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingNew(false);
                      setEditingItem(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-rose-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 font-extrabold flex items-center gap-1.5 shadow-md"
                  >
                    <Check className="w-4 h-4" />
                    <span>Save Photo</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
