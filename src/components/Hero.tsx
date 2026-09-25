import React from 'react';
import { Calendar, ChevronRight, Star, Award, ShieldCheck, Clock } from 'lucide-react';
import { SHOP_ASSETS, SHOP_INFO } from '../data/barberData';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenOffer: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenOffer }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Image with Cinematic Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={SHOP_ASSETS.hero}
          alt="The Crown and Razor luxury heritage barbershop interior"
          className="w-full h-full object-cover object-center scale-105 transform motion-safe:transition-transform motion-safe:duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0F12] via-[#0D0F12]/85 to-[#0D0F12]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F12] via-transparent to-[#0D0F12]/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
        <div className="max-w-3xl space-y-7">
          {/* Subtle Editorial Kicker */}
          <div className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase font-semibold text-[#C5A059]">
            <span>Artisanal Grooming Lounge</span>
            <span aria-hidden="true" className="text-[#64748B]">·</span>
            <span>Est. 2018</span>
            <span aria-hidden="true" className="text-[#64748B]">·</span>
            <span>San Francisco</span>
          </div>

          {/* Master Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#F8FAFC] tracking-tight leading-[1.1] text-balance">
            Precision Cuts. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DFBA73] via-[#C5A059] to-[#99732E]">
              Timeless Rituals.
            </span> <br />
            Modern Mastery.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#CBD5E1] max-w-2xl font-light leading-relaxed">
            Experience the pinnacle of gentleman's grooming. Master shear craftsmanship, traditional straight-razor steam lathers, and bespoke facial sculpting in an atmosphere of quiet luxury.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <button
              onClick={onOpenBooking}
              className="px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-widest text-[#0D0F12] bg-gradient-to-r from-[#C5A059] to-[#DFBA73] hover:from-[#DFBA73] hover:to-[#C5A059] rounded-sm transition-all shadow-xl hover:shadow-[#C5A059]/30 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-3 group"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve Your Chair</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <a
              href="#services"
              className="px-7 py-4 text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#E2E8F0] hover:text-white bg-[#1A1E26]/80 hover:bg-[#252A36] border border-[#333A48] rounded-sm transition-all backdrop-blur-sm text-center flex items-center justify-center gap-2"
            >
              <span>Explore Menu & Pricing</span>
            </a>
          </div>

          {/* Proof Adjacency Bar */}
          <div className="pt-8 border-t border-[#262B37]/80 grid grid-cols-2 sm:grid-cols-3 gap-6 text-[#94A3B8]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-sm bg-[#1A1E26] border border-[#2F3646] flex items-center justify-center text-[#C5A059] shrink-0">
                <Star className="w-5 h-5 fill-[#C5A059]" />
              </div>
              <div>
                <div className="text-sm font-bold text-white font-mono">4.98 / 5.0</div>
                <div className="text-xs text-[#94A3B8]">1,400+ Verified Clients</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-sm bg-[#1A1E26] border border-[#2F3646] flex items-center justify-center text-[#C5A059] shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white font-serif">Master Barbers</div>
                <div className="text-xs text-[#94A3B8]">10+ Yrs Craftsmanship</div>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 flex items-center gap-3">
              <div className="w-10 h-10 rounded-sm bg-[#1A1E26] border border-[#2F3646] flex items-center justify-center text-[#C5A059] shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Full Calendar Sync</div>
                <div className="text-xs text-[#94A3B8]">Instant Google & Apple (.ics)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
