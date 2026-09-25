import React from 'react';
import { Star, Award, Calendar, Scissors, Sparkles } from 'lucide-react';
import { BARBERS_LIST } from '../data/barberData';
import { BarberProfile } from '../types/barber';

interface BarbersSectionProps {
  onSelectBarber: (barber: BarberProfile) => void;
}

export const BarbersSection: React.FC<BarbersSectionProps> = ({ onSelectBarber }) => {
  return (
    <section id="barbers" className="py-24 bg-[#0A0C0F] relative border-t border-[#1C202B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="text-xs tracking-[0.25em] uppercase font-bold text-[#C5A059]">
            The Master Craftsmen
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Artisans of the Blade & Shear
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] font-light">
            Every barber at The Crown & Razor has completed rigorous classical apprenticeship and possesses at least a decade of technical mastery in anatomical proportion and classic grooming.
          </p>
        </div>

        {/* Barbers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BARBERS_LIST.map((barber) => (
            <div
              key={barber.id}
              className="bg-[#12151C] border border-[#222734] rounded-sm overflow-hidden flex flex-col justify-between group hover:border-[#C5A059]/60 transition-all duration-300 hover:shadow-2xl hover:shadow-black/70"
            >
              <div>
                {/* Photo Frame */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#181C26]">
                  <img
                    src={barber.avatar}
                    alt={`${barber.name} - ${barber.title}`}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12151C] via-transparent to-transparent" />
                  
                  {/* Rating Overlay */}
                  <div className="absolute top-3 right-3 bg-[#0D0F12]/90 backdrop-blur-md border border-[#2D3446] px-2.5 py-1 rounded-sm flex items-center gap-1.5 text-xs text-white font-mono">
                    <Star className="w-3.5 h-3.5 text-[#C5A059] fill-[#C5A059]" />
                    <span>{barber.rating}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-white group-hover:text-[#C5A059] transition-colors">
                      {barber.name}
                    </h3>
                    <div className="text-xs uppercase tracking-wider text-[#C5A059] font-medium mt-0.5">
                      {barber.title}
                    </div>
                  </div>

                  {/* Specialty callout */}
                  <div className="text-xs bg-[#171B24] border border-[#252B3A] p-3 rounded-sm text-[#CBD5E1]">
                    <span className="font-semibold text-white block mb-0.5">Primary Specialty:</span>
                    {barber.specialty}
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-[#94A3B8] leading-relaxed font-light">
                    {barber.bio}
                  </p>

                  {/* Stats & Schedule */}
                  <div className="pt-3 border-t border-[#202533] space-y-1.5 text-xs text-[#828F9F]">
                    <div className="flex items-center justify-between">
                      <span>Experience:</span>
                      <span className="font-mono text-white">{barber.experienceYears}+ Years</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Career Services:</span>
                      <span className="font-mono text-white">{barber.cutsDelivered}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>In-Chair Days:</span>
                      <span className="text-[#C5A059] text-[11px]">{barber.availableDays.join(', ')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking CTA Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => onSelectBarber(barber)}
                  className="w-full py-3 text-xs font-bold uppercase tracking-widest text-[#0D0F12] bg-[#C5A059] hover:bg-[#DFBA73] rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-[0.98]"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book with {barber.name.split(' ')[0]}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
