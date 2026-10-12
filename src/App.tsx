import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { MissionSection } from './components/MissionSection';
import { ChildrenGallery } from './components/ChildrenGallery';
import { FacilitiesShowcase } from './components/FacilitiesShowcase';
import { NeedSection } from './components/NeedSection';
import { DonationCards } from './components/DonationCards';
import { ProgramsSection } from './components/ProgramsSection';
import { AboutPage } from './components/AboutPage';
import { ChildrenPage } from './components/ChildrenPage';
import { FacilitiesPage } from './components/FacilitiesPage';
import { ImpactPage } from './components/ImpactPage';
import { VolunteerPage } from './components/VolunteerPage';
import { ContactPage } from './components/ContactPage';
import { DonationPage } from './components/DonationPage';
import { AdminDashboard } from './components/AdminDashboard';
import { Lightbox } from './components/Lightbox';
import { ReceiptModal } from './components/ReceiptModal';
import { PolicyModals } from './components/PolicyModals';
import { ToastContainer } from './components/ToastContainer';

const MainContent: React.FC = () => {
  const { currentPage } = useApp();

  const renderCurrentView = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage />;
      case 'children':
        return <ChildrenPage />;
      case 'facilities':
        return <FacilitiesPage />;
      case 'programs':
        return (
          <div className="pt-6">
            <ProgramsSection />
            <DonationCards />
          </div>
        );
      case 'impact':
        return <ImpactPage />;
      case 'volunteer':
        return <VolunteerPage />;
      case 'contact':
        return <ContactPage />;
      case 'donate':
        return <DonationPage />;
      case 'admin':
        return <AdminDashboard />;
      case 'safeguarding-policy':
      case 'privacy-policy':
        return <AboutPage />;
      case 'home':
      default:
        return (
          <main>
            {/* The First Five Seconds */}
            <Hero />
            {/* Introducing Our Mission */}
            <MissionSection />
            {/* Our Children & Magazine Gallery */}
            <ChildrenGallery />
            {/* Our Buildings and Facilities */}
            <FacilitiesShowcase />
            {/* The Need We Address */}
            <NeedSection />
            {/* How Donations Help */}
            <DonationCards />
            {/* Our Programs */}
            <ProgramsSection />
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#263238]">
      <Header />
      <div className="flex-1">{renderCurrentView()}</div>
      <Footer />
      {/* Modals & Overlays */}
      <Lightbox />
      <ReceiptModal />
      <PolicyModals />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
