import React, { useState } from 'react';
import { Scissors, Check, Clock, Sparkles, ArrowRight } from 'lucide-react';
import { SERVICES_LIST, SHOP_ASSETS } from '../data/barberData';
import { BarberService } from '../types/barber';

interface ServicesSectionProps {
  onSelectService: (service: BarberService) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Rituals & Services' },
    { id: 'haircut', label: 'Precision Haircuts' },
    { id: 'shave', label: 'Shaves & Beard Sculpting' },
    { id: 'combo', label: 'Signature Combos' },
    { id: 'vip', label: 'VIP Lounge Packages' },
  ];

  const filteredServices = activeCategory === 'all'
    ? SERVICES_LIST
    : SERVICES_LIST.filter(s => s.category === activeCategory);

  return (
    <section id="services" className="py-24 bg-[#0D0F12] relative border-t border-[#1F2430]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="text-xs tracking-[0.25em] uppercase font-bold text-[#C5A059]">
            The Grooming Menu
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Artisanal Services & Transparent Pricing
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] font-light">
            Every appointment includes a tailored consultation, hot towel aromatic steam finish, straight razor neck taper, and styling with premium apothecary goods.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-[#C5A059] text-[#0D0F12] shadow-lg shadow-[#C5A059]/20'
                  : 'bg-[#161922] text-[#94A3B8] hover:text-white hover:bg-[#1E2330] border border-[#272D3D]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`relative bg-[#141720] border rounded-sm p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:border-[#C5A059]/60 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/60 group ${
                service.popular ? 'border-[#C5A059]/40 bg-gradient-to-b from-[#181C26] to-[#141720]' : 'border-[#222735]'
              }`}
            >
              <div>
                {/* Header info */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-[#F8FAFC] group-hover:text-[#C5A059] transition-colors leading-snug">
                      {service.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1.5 text-xs text-[#94A3B8] font-mono">
                      <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>{service.durationMinutes} minutes</span>
                      {service.popular && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-[#C5A059] font-sans font-medium flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> Most Requested
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-2xl font-bold font-mono text-[#C5A059] tabular-nums">
                      ${service.price}
                    </div>
                  </div>
                </div>

                {/* Tagline & Description */}
                <p className="text-xs sm:text-sm text-[#CBD5E1] mb-5 leading-relaxed font-light">
                  {service.description}
                </p>

                {/* Inclusions List */}
                <div className="space-y-2 pt-3 pb-6 border-t border-[#222735]">
                  <div className="text-[11px] uppercase tracking-wider font-semibold text-[#8C98A9]">
                    Ritual Inclusions:
                  </div>
                  {service.includes.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#94A3B8]">
                      <Check className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectService(service)}
                className="w-full py-3 px-4 text-xs font-bold uppercase tracking-widest text-[#E2E8F0] group-hover:text-[#0D0F12] bg-[#1C202B] group-hover:bg-[#C5A059] border border-[#2D3446] group-hover:border-[#C5A059] rounded-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <span>Book This Service</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          ))}
        </div>

        {/* Custom Group & Wedding Consultation Callout */}
        <div className="mt-14 p-6 sm:p-8 bg-[#151821] border border-[#262C3C] rounded-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="text-xs uppercase tracking-widest font-bold text-[#C5A059]">
              Groomsmen & Private Buyouts
            </div>
            <h3 className="text-xl font-serif font-bold text-white">
              Planning a Wedding, Milestone, or Executive Private Session?
            </h3>
            <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl">
              Reserve the entire Crown & Razor atelier with tailored grooming packages, open scotch bar, charcuterie, and dedicated master barbers.
            </p>
          </div>
          <button
            onClick={() => onSelectService(SERVICES_LIST[4])}
            className="px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-[#0D0F12] bg-[#C5A059] hover:bg-[#DFBA73] rounded-sm transition-all shrink-0 cursor-pointer"
          >
            Inquire For Private Group
          </button>
        </div>

      </div>
    </section>
  );
};
