import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { BarbersSection } from './components/BarbersSection';
import { LookbookSection } from './components/LookbookSection';
import { ExperienceSection } from './components/ExperienceSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { WelcomeModal } from './components/WelcomeModal';
import { TermsModal } from './components/TermsModal';
import { PrivacyModal } from './components/PrivacyModal';
import { BarberService, BarberProfile } from './types/barber';
import { Calendar, Tag, Sparkles } from 'lucide-react';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>(undefined);
  const [preselectedBarberId, setPreselectedBarberId] = useState<string | undefined>(undefined);
  
  const [welcomeModalOpen, setWelcomeModalOpen] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [activePromoCode, setActivePromoCode] = useState<string>('');

  // Subtle timed offer trigger after 7 seconds for new visitors (if not dismissed before)
  useEffect(() => {
    const hasSeenOffer = sessionStorage.getItem('cr_seen_welcome_offer');
    if (!hasSeenOffer) {
      const timer = setTimeout(() => {
        setWelcomeModalOpen(true);
        sessionStorage.setItem('cr_seen_welcome_offer', 'true');
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleOpenBooking = (serviceId?: string, barberId?: string) => {
    setPreselectedServiceId(serviceId);
    setPreselectedBarberId(barberId);
    setBookingModalOpen(true);
  };

  const handleSelectService = (service: BarberService) => {
    handleOpenBooking(service.id, undefined);
  };

  const handleSelectBarber = (barber: BarberProfile) => {
    handleOpenBooking(undefined, barber.id);
  };

  const handleClaimOffer = (code: string) => {
    setActivePromoCode(code);
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0D0F12] text-[#E2E8F0] selection:bg-[#C5A059] selection:text-[#0D0F12]">
      {/* Top sticky Navigation */}
      <Header onOpenBooking={() => handleOpenBooking()} activeSection="home" />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onOpenOffer={() => setWelcomeModalOpen(true)}
        />

        {/* 2. Services & Pricing Menu */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* 3. Master Barbers */}
        <BarbersSection onSelectBarber={handleSelectBarber} />

        {/* 4. Lookbook & Portfolio */}
        <LookbookSection onSelectService={handleSelectService} />

        {/* 5. The Atelier Experience & Craft */}
        <ExperienceSection />

        {/* 6. Reviews, Acclaim & FAQ */}
        <TestimonialsSection />

        {/* 7. Contact, Location & Hours */}
        <ContactSection />
      </main>

      {/* Complete Professional Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenTerms={() => setTermsModalOpen(true)}
        onOpenPrivacy={() => setPrivacyModalOpen(true)}
      />

      {/* Floating Offer Pill Trigger */}
      <div className="fixed bottom-5 left-5 z-30 hidden sm:block">
        <button
          onClick={() => setWelcomeModalOpen(true)}
          className="px-3.5 py-2 bg-[#171B26]/95 hover:bg-[#202636] border border-[#C5A059]/40 hover:border-[#C5A059] text-xs text-[#DFBA73] font-medium rounded-sm backdrop-blur-md shadow-xl flex items-center gap-2 cursor-pointer transition-all group"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059] group-hover:rotate-12 transition-transform" />
          <span>First Visit: <strong>15% Off Code</strong></span>
        </button>
      </div>

      {/* Interactive Booking Engine Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedServiceId={preselectedServiceId}
        preselectedBarberId={preselectedBarberId}
        promoCodeApplied={activePromoCode}
      />

      {/* First-time Privilege Modal */}
      <WelcomeModal
        isOpen={welcomeModalOpen}
        onClose={() => setWelcomeModalOpen(false)}
        onClaimOffer={handleClaimOffer}
      />

      {/* Legal: Terms & Conditions Modal */}
      <TermsModal
        isOpen={termsModalOpen}
        onClose={() => setTermsModalOpen(false)}
      />

      {/* Legal: Privacy Policy Modal */}
      <PrivacyModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />
    </div>
  );
}
