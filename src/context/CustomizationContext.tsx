import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CustomBackgroundConfig {
  imageUrl?: string;
  gradient?: string;
  overlayOpacity: number; // 0 to 100
  patternEnabled: boolean;
}

export interface CustomLogosConfig {
  sigmaLogoUrl?: string;
  ursSealUrl?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Colloquiums' | 'Workshops' | 'Assemblies' | 'Campus Life' | 'Competitions' | 'General';
  imageUrl: string;
  date: string;
  location: string;
  caption: string;
}

export interface CustomizationContextType {
  // Page / Portal Mode
  currentView: 'user' | 'admin';
  setCurrentView: (view: 'user' | 'admin') => void;
  isAdmin: boolean;
  isAuthenticated: boolean;
  loginAdmin: (passcode: string) => boolean;
  logoutAdmin: () => void;

  // Officer Photos
  officerPhotos: Record<string, string>;
  updateOfficerPhoto: (officerId: string, photoUrl: string) => void;
  resetOfficerPhoto: (officerId: string) => void;
  resetAllOfficerPhotos: () => void;
  
  // Background & Theme
  backgroundConfig: CustomBackgroundConfig;
  updateBackground: (config: Partial<CustomBackgroundConfig>) => void;
  resetBackground: () => void;
  
  // Logos
  logosConfig: CustomLogosConfig;
  updateLogos: (config: Partial<CustomLogosConfig>) => void;
  resetLogos: () => void;

  // Home Gallery
  galleryItems: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  updateGalleryItem: (id: string, item: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;
  resetGallery: () => void;
  
  // Modal toggle
  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;
}

const DEFAULT_BACKGROUND: CustomBackgroundConfig = {
  imageUrl: '',
  gradient: 'from-[#1c0205] via-[#2a0409] to-[#140103]',
  overlayOpacity: 35,
  patternEnabled: true
};

const DEFAULT_LOGOS: CustomLogosConfig = {
  sigmaLogoUrl: '',
  ursSealUrl: ''
};

export const INITIAL_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: '1st SIGMA Statistical Colloquium',
    category: 'Colloquiums',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    date: 'February 12, 2026',
    location: 'URS Cainta Audio-Visual Center',
    caption: 'Student researchers and math faculty presenting empirical modeling frameworks and regression analytics during the opening term symposium.'
  },
  {
    id: 'gal-2',
    title: 'Python & R Data Analytics Boot Camp',
    category: 'Workshops',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    date: 'January 28, 2026',
    location: 'Central Computer Laboratory 2, URS Cainta',
    caption: 'Hands-on laboratory workshop on statistical computing, automated exploratory data analysis, and predictive metrics for IT and tech students.'
  },
  {
    id: 'gal-3',
    title: 'Constitutional Assembly & Officer Induction',
    category: 'Assemblies',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    date: 'December 15, 2025',
    location: 'Main University Gymnasium, Cainta Campus',
    caption: 'Induction of the 2026–2027 SIGMA Executive Board, led by President John Rex Louie Villafuerte and Faculty Adviser Prof. Jandee Dolores.'
  },
  {
    id: 'gal-4',
    title: 'Calabarzon Regional Mathematical Challenge',
    category: 'Competitions',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    date: 'March 04, 2026',
    location: 'URS Cainta Multipurpose Hall',
    caption: 'Inter-departmental speed math and algorithmic optimization tournament with participants from BSIT, BIT, and BTLEd programs.'
  },
  {
    id: 'gal-5',
    title: 'Campus Research Analytics Working Group',
    category: 'Campus Life',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    date: 'February 20, 2026',
    location: 'SIGMA Secretariat Hub, URS Cainta',
    caption: 'Collaborative peer review and statistical validation session for thesis candidates and undergraduate researchers.'
  },
  {
    id: 'gal-6',
    title: 'Community Numeracy & Data Literacy Drive',
    category: 'Workshops',
    imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80',
    date: 'November 18, 2025',
    location: 'Cainta Community High School Partner Center',
    caption: 'SIGMA outreach volunteers providing practical statistics workshops and graph interpretation masterclasses for senior high school students.'
  }
];

const CustomizationContext = createContext<CustomizationContextType | undefined>(undefined);

export function CustomizationProvider({ children }: { children: React.ReactNode }) {
  const [currentView, setCurrentView] = useState<'user' | 'admin'>('user');
  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem('sigma_admin_auth') === 'true';
  });

  const [officerPhotos, setOfficerPhotos] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('sigma_custom_officer_photos');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [backgroundConfig, setBackgroundConfig] = useState<CustomBackgroundConfig>(() => {
    try {
      const saved = localStorage.getItem('sigma_custom_background');
      return saved ? { ...DEFAULT_BACKGROUND, ...JSON.parse(saved) } : DEFAULT_BACKGROUND;
    } catch {
      return DEFAULT_BACKGROUND;
    }
  });

  const [logosConfig, setLogosConfig] = useState<CustomLogosConfig>(() => {
    try {
      const saved = localStorage.getItem('sigma_custom_logos');
      return saved ? { ...DEFAULT_LOGOS, ...JSON.parse(saved) } : DEFAULT_LOGOS;
    } catch {
      return DEFAULT_LOGOS;
    }
  });

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem('sigma_custom_gallery');
      return saved ? JSON.parse(saved) : INITIAL_GALLERY_ITEMS;
    } catch {
      return INITIAL_GALLERY_ITEMS;
    }
  });

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Save to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('sigma_custom_officer_photos', JSON.stringify(officerPhotos));
    } catch (e) {
      console.warn('Could not save officer photos to localStorage', e);
    }
  }, [officerPhotos]);

  useEffect(() => {
    try {
      localStorage.setItem('sigma_custom_background', JSON.stringify(backgroundConfig));
    } catch (e) {
      console.warn('Could not save background to localStorage', e);
    }
  }, [backgroundConfig]);

  useEffect(() => {
    try {
      localStorage.setItem('sigma_custom_logos', JSON.stringify(logosConfig));
    } catch (e) {
      console.warn('Could not save logos to localStorage', e);
    }
  }, [logosConfig]);

  useEffect(() => {
    try {
      localStorage.setItem('sigma_custom_gallery', JSON.stringify(galleryItems));
    } catch (e) {
      console.warn('Could not save gallery to localStorage', e);
    }
  }, [galleryItems]);

  const updateOfficerPhoto = (officerId: string, photoUrl: string) => {
    setOfficerPhotos((prev) => ({
      ...prev,
      [officerId]: photoUrl
    }));
  };

  const resetOfficerPhoto = (officerId: string) => {
    setOfficerPhotos((prev) => {
      const next = { ...prev };
      delete next[officerId];
      return next;
    });
  };

  const resetAllOfficerPhotos = () => {
    setOfficerPhotos({});
    localStorage.removeItem('sigma_custom_officer_photos');
  };

  const updateBackground = (config: Partial<CustomBackgroundConfig>) => {
    setBackgroundConfig((prev) => ({
      ...prev,
      ...config
    }));
  };

  const resetBackground = () => {
    setBackgroundConfig(DEFAULT_BACKGROUND);
    localStorage.removeItem('sigma_custom_background');
  };

  const updateLogos = (config: Partial<CustomLogosConfig>) => {
    setLogosConfig((prev) => ({
      ...prev,
      ...config
    }));
  };

  const resetLogos = () => {
    setLogosConfig(DEFAULT_LOGOS);
    localStorage.removeItem('sigma_custom_logos');
  };

  // Gallery CRUD
  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...item,
      id: `gal-${Date.now()}`
    };
    setGalleryItems((prev) => [newItem, ...prev]);
  };

  const updateGalleryItem = (id: string, updated: Partial<GalleryItem>) => {
    setGalleryItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  const deleteGalleryItem = (id: string) => {
    setGalleryItems((prev) => prev.filter((item) => item.id !== id));
  };

  const resetGallery = () => {
    setGalleryItems(INITIAL_GALLERY_ITEMS);
    localStorage.removeItem('sigma_custom_gallery');
  };

  const loginAdmin = (passcode: string): boolean => {
    // Default master passcode for SIGMA Executive Board: "sigma2026" or "admin"
    const cleaned = passcode.trim().toLowerCase();
    if (cleaned === 'sigma2026' || cleaned === 'admin' || cleaned === 'urs2026') {
      setIsAdmin(true);
      sessionStorage.setItem('sigma_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('sigma_admin_auth');
    setCurrentView('user');
  };

  return (
    <CustomizationContext.Provider
      value={{
        currentView,
        setCurrentView,
        isAdmin,
        isAuthenticated: isAdmin,
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
        resetGallery,
        isAdminModalOpen,
        setIsAdminModalOpen
      }}
    >
      {children}
    </CustomizationContext.Provider>
  );
}

export function useCustomization() {
  const context = useContext(CustomizationContext);
  if (!context) {
    throw new Error('useCustomization must be used within a CustomizationProvider');
  }
  return context;
}
