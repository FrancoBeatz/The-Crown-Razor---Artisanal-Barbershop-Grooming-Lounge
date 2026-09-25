import React, { useState } from 'react';
import { LOOKBOOK_ITEMS, SERVICES_LIST } from '../data/barberData';
import { LookbookItem, BarberService } from '../types/barber';
import { Clock, Scissors, ArrowRight } from 'lucide-react';

interface LookbookSectionProps {
  onSelectService: (service: BarberService) => void;
}

export const LookbookSection: React.FC<LookbookSectionProps> = ({ onSelectService }) => {
  const [filter, setFilter] = useState<string>('all');

  const filterTabs = [
    { id: 'all', label: 'All Styles' },
    { id: 'fades', label: 'Skin Fades & Crops' },
    { id: 'beards', label: 'Beards & Tapers' },
    { id: 'ritual', label: 'Straight-Razor Shaves' },
  ];

  const items = filter === 'all'
    ? LOOKBOOK_ITEMS
    : LOOKBOOK_ITEMS.filter(item => item.category === filter);

  const handleBookMatching = (item: LookbookItem) => {
    // Find matching service
    if (item.category === 'fades') {
      onSelectService(SERVICES_LIST[1]); // Skin fade
    } else if (item.category === 'ritual') {
      onSelectService(SERVICES_LIST[2]); // Royal shave
    } else if (item.category === 'beards') {
      onSelectService(SERVICES_LIST[3]); // Beard sculpt
    } else {
      onSelectService(SERVICES_LIST[0]); // Signature cut
    }
  };

  return (
    <section id="lookbook" className="py-24 bg-[#0D0F12] relative border-t border-[#1C202B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs tracking-[0.25em] uppercase font-bold text-[#C5A059]">
              Craft Portfolio & Lookbook
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
              Selected Signature Works
            </h2>
            <p className="text-sm text-[#94A3B8] font-light">
              Explore recent cuts and grooming rituals completed in our chairs. Every style is engineered specifically to flatter individual bone structure.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all cursor-pointer ${
                  filter === tab.id
                    ? 'bg-[#C5A059] text-[#0D0F12]'
                    : 'bg-[#151922] text-[#94A3B8] hover:text-white border border-[#262C3D]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Lookbook Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-[#12151D] border border-[#202534] rounded-sm overflow-hidden flex flex-col justify-between group hover:border-[#C5A059]/50 transition-all duration-300"
            >
              <div>
                <div className="relative aspect-[4/3] overflow-hidden bg-[#181C26]">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12151D] via-transparent to-transparent" />
                  
                  {/* Barber Credit Tag */}
                  <div className="absolute bottom-2.5 left-3 text-[11px] uppercase tracking-wider font-semibold text-[#DFBA73] bg-[#0D0F12]/80 backdrop-blur-sm px-2 py-0.5 rounded-sm">
                    Crafted by {item.barberName}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-serif font-bold text-white group-hover:text-[#C5A059] transition-colors leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    {item.description}
                  </p>

                  {/* Clean unboxed tags with dot separators */}
                  <div className="flex items-center gap-1.5 text-[11px] text-[#C5A059] flex-wrap pt-1 font-mono">
                    {item.tags.map((tag, idx) => (
                      <React.Fragment key={tag}>
                        <span>#{tag}</span>
                        {idx < item.tags.length - 1 && <span className="text-[#475569]">·</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => handleBookMatching(item)}
                  className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-[#D1D5DB] hover:text-[#0D0F12] bg-[#1A1F2B] hover:bg-[#C5A059] border border-[#2A3142] hover:border-[#C5A059] rounded-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Book This Look</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
