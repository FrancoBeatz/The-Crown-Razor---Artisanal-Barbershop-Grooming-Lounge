import React, { useState, useEffect } from 'react';
import { Scissors, Menu, X, Calendar, Clock, Phone } from 'lucide-react';
import { SHOP_INFO } from '../data/barberData';

interface HeaderProps {
  onOpenBooking: (serviceId?: string, barberId?: string) => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Master Barbers', href: '#barbers' },
    { label: 'Lookbook', href: '#lookbook' },
    { label: 'Experience', href: '#experience' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0D0F12]/95 backdrop-blur-md border-b border-[#232733] py-3.5 shadow-xl shadow-black/40'
            : 'bg-gradient-to-b from-[#0D0F12]/90 via-[#0D0F12]/50 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Zone 1: Single element Brand Wordmark */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-white group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
          >
            <div className="w-9 h-9 rounded-sm bg-[#1A1E26] border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059] group-hover:border-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-[#0D0F12] transition-colors">
              <Scissors className="w-4 h-4" />
            </div>
            <span className="font-serif text-lg sm:text-xl font-bold tracking-wider text-[#F3F4F6] group-hover:text-[#C5A059] transition-colors">
              THE CROWN & RAZOR
            </span>
          </a>

          {/* Zone 2: Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs tracking-widest uppercase font-medium text-[#9CA3AF]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#C5A059] transition-colors py-1 relative group focus-visible:outline-none focus-visible:text-[#C5A059]"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C5A059] transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href={`tel:${SHOP_INFO.phone}`}
              className="hidden xl:flex items-center gap-1.5 text-xs text-[#9CA3AF] hover:text-[#C5A059] transition-colors font-mono"
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
              {SHOP_INFO.phone}
            </a>

            <button
              onClick={() => onOpenBooking()}
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-[#0D0F12] bg-gradient-to-r from-[#C5A059] to-[#DFBA73] hover:from-[#DFBA73] hover:to-[#C5A059] rounded-sm transition-all shadow-md hover:shadow-[#C5A059]/20 active:scale-[0.98] cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reserve Chair</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => onOpenBooking()}
              className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#0D0F12] bg-[#C5A059] rounded-sm"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-2 text-[#9CA3AF] hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed right-0 top-0 bottom-0 w-4/5 max-w-sm bg-[#12151B] border-l border-[#262B37] p-6 flex flex-col justify-between shadow-2xl z-50">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#262B37]">
                <div className="flex items-center gap-2 text-white">
                  <Scissors className="w-5 h-5 text-[#C5A059]" />
                  <span className="font-serif font-bold text-sm tracking-wider">THE CROWN & RAZOR</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-[#9CA3AF] hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="py-6 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-medium text-[#D1D5DB] hover:text-[#C5A059] transition-colors py-2 border-b border-[#1E232E]"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="space-y-3 pt-2 text-xs text-[#9CA3AF]">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#C5A059]" />
                  <span>Mon-Sat: 8:00 AM – 8:00 PM</span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <Phone className="w-4 h-4 text-[#C5A059]" />
                  <span>{SHOP_INFO.phone}</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3.5 text-center text-xs font-bold uppercase tracking-widest text-[#0D0F12] bg-[#C5A059] hover:bg-[#DFBA73] rounded-sm transition-all shadow-lg"
              >
                Book Appointment Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
