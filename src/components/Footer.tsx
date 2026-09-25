import React from 'react';
import { Scissors, MapPin, Phone, Mail, Instagram, Clock, ArrowUp, Calendar } from 'lucide-react';
import { SHOP_INFO } from '../data/barberData';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  onOpenTerms,
  onOpenPrivacy,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#08090C] text-[#94A3B8] border-t border-[#1B1F2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Top 4-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#1A1E29]">
          
          {/* Column 1: Brand & Ethos */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-8 h-8 rounded-sm bg-[#161A24] border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059]">
                <Scissors className="w-4 h-4" />
              </div>
              <span className="font-serif text-lg font-bold tracking-wider text-white">
                THE CROWN & RAZOR
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#7C889B]">
              Artisanal grooming lounge and apothecary. Dedicated to reviving timeless gentleman's rituals through precision shear craft and hospitality.
            </p>
            <div className="pt-1">
              <button
                onClick={onOpenBooking}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#0D0F12] bg-[#C5A059] hover:bg-[#DFBA73] rounded-sm transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Reserve Chair Online</span>
              </button>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-[#C5A059] transition-colors">
                  Services & Pricing Menu
                </a>
              </li>
              <li>
                <a href="#barbers" className="hover:text-[#C5A059] transition-colors">
                  Master Craftsmen Barbers
                </a>
              </li>
              <li>
                <a href="#lookbook" className="hover:text-[#C5A059] transition-colors">
                  Style Portfolio & Lookbook
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-[#C5A059] transition-colors">
                  The Lounge & Apothecary
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#C5A059] transition-colors">
                  Client Reviews & FAQ
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#C5A059] transition-colors">
                  Location & Concierge
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Hours of Craft */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-white">
              Chair Hours
            </h4>
            <ul className="space-y-1.5 text-xs text-[#CBD5E1]">
              <li className="flex justify-between">
                <span>Mon – Thu:</span>
                <span className="font-mono text-[#C5A059]">9:00 AM – 8:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Friday:</span>
                <span className="font-mono text-[#C5A059]">8:30 AM – 8:30 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday:</span>
                <span className="font-mono text-[#C5A059]">8:00 AM – 6:30 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span>
                <span className="font-mono text-[#C5A059]">10:00 AM – 5:00 PM</span>
              </li>
            </ul>
            <div className="pt-2 text-[11px] text-[#6B7789]">
              Walk-ins subject to chair availability.
            </div>
          </div>

          {/* Column 4: Contact & Social */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-white">
              Atelier Location
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                <span>
                  {SHOP_INFO.address}<br />
                  {SHOP_INFO.city}
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono">
                <Phone className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                <a href={`tel:${SHOP_INFO.phone}`} className="hover:text-[#C5A059] transition-colors">
                  {SHOP_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                <a href={`mailto:${SHOP_INFO.email}`} className="hover:text-[#C5A059] transition-colors">
                  {SHOP_INFO.email}
                </a>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram profile"
                className="w-8 h-8 rounded-sm bg-[#141822] border border-[#242A38] text-[#94A3B8] hover:text-[#C5A059] hover:border-[#C5A059] flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <div>
            © {new Date().getFullYear()} {SHOP_INFO.name}. All rights reserved.
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-6">
            <button
              onClick={onOpenTerms}
              className="hover:text-[#C5A059] transition-colors underline-offset-4 hover:underline cursor-pointer"
            >
              Terms & Conditions
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={onOpenPrivacy}
              className="hover:text-[#C5A059] transition-colors underline-offset-4 hover:underline cursor-pointer"
            >
              Privacy Policy
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
