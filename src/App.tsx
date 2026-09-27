import { CustomizationProvider, useCustomization } from './context/CustomizationContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import MissionVisionSection from './components/MissionVisionSection';
import OfficersSection from './components/OfficersSection';
import HomeGallery from './components/HomeGallery';
import MembershipApplicationSection from './components/MembershipApplicationSection';
import Footer from './components/Footer';
import AdminPage from './components/AdminPage';
import AdminModal from './components/AdminModal';

function MainLayout() {
  const { backgroundConfig, currentView } = useCustomization();

  const customBgStyle = backgroundConfig.imageUrl
    ? {
        backgroundImage: `url(${backgroundConfig.imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }
    : undefined;

  return (
    <div 
      className={`min-h-screen bg-gradient-to-br ${backgroundConfig.gradient || 'from-[#1c0205] via-[#2a0409] to-[#140103]'} text-slate-100 relative selection:bg-amber-400 selection:text-slate-950 overflow-x-hidden`}
      style={customBgStyle}
    >
      {/* Dark Overlay Tint */}
      {backgroundConfig.imageUrl && (
        <div 
          className="fixed inset-0 pointer-events-none z-0 bg-black"
          style={{ opacity: (backgroundConfig.overlayOpacity ?? 35) / 100 }}
        />
      )}

      {/* Grid Pattern */}
      {backgroundConfig.patternEnabled && (
        <div className="fixed inset-0 bg-grid-pattern opacity-25 pointer-events-none z-0" />
      )}

      {/* Fixed Navigation */}
      <Navbar />

      {/* Page Routing / View Switching */}
      {currentView === 'admin' ? (
        <main className="relative z-10 pt-16">
          <AdminPage />
        </main>
      ) : (
        <main className="relative z-10">
          {/* Hero Section */}
          <HeroSection />

          {/* 1. About Us: SIGMA Charter, Principles & Acronym Meaning at URS Cainta */}
          <AboutSection />

          {/* 2 & 3. Mission & Vision of SIGMA URS Cainta */}
          <MissionVisionSection />

          {/* 4. The Officers: Interactive Animated Diamond Carousel (Read-Only) */}
          <OfficersSection />

          {/* 5. Home Gallery: Interactive Campus Life & Event Showcase */}
          <HomeGallery />

          {/* 6. Membership Application: Admissions Form & PDF Download (Post-Submission) */}
          <MembershipApplicationSection />
        </main>
      )}

      {/* Institutional URS Cainta Footer */}
      <Footer />

      {/* Admin Quick Customizer Modal */}
      <AdminModal />
    </div>
  );
}

export default function App() {
  return (
    <CustomizationProvider>
      <MainLayout />
    </CustomizationProvider>
  );
}
