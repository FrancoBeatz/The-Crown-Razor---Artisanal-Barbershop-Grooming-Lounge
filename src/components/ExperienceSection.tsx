import React from 'react';
import { Sparkles, Coffee, Shield, Compass, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { SHOP_ASSETS, SHOP_INFO } from '../data/barberData';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 bg-[#0A0C0F] relative border-t border-[#1C202B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Story & Rituals */}
          <div className="space-y-6">
            <div className="text-xs tracking-[0.25em] uppercase font-bold text-[#C5A059]">
              The Atelier Experience
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              More than a haircut. <br />
              A sanctuary of quiet distinction.
            </h2>
            
            <p className="text-sm sm:text-base text-[#94A3B8] font-light leading-relaxed">
              Founded in 2018, <strong className="text-white font-medium">The Crown & Razor</strong> was conceived as an antidote to rush-job chain salons and sterile waiting rooms. We resurrected the golden era of gentleman's grooming lounges: custom Italian leather chairs, artisan straight razors stropped by hand, hot eucalyptus towel rituals, and bespoke hospitality.
            </p>

            {/* Core Values / Inclusions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="bg-[#12151D] border border-[#202534] p-4 rounded-sm space-y-2">
                <div className="w-8 h-8 rounded-sm bg-[#1A1F2C] text-[#C5A059] flex items-center justify-center">
                  <Coffee className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-serif font-bold text-white">Private Scotch & Espresso Lounge</h4>
                <p className="text-xs text-[#8492A6]">
                  Enjoy complimentary single malt whiskies, cold-brew roasts, or San Pellegrino before your service.
                </p>
              </div>

              <div className="bg-[#12151D] border border-[#202534] p-4 rounded-sm space-y-2">
                <div className="w-8 h-8 rounded-sm bg-[#1A1F2C] text-[#C5A059] flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-serif font-bold text-white">Organic Small-Batch Apothecary</h4>
                <p className="text-xs text-[#8492A6]">
                  We formulate our styling clays, beard tonics, and soothing aftershaves with organic botanicals.
                </p>
              </div>

              <div className="bg-[#12151D] border border-[#202534] p-4 rounded-sm space-y-2">
                <div className="w-8 h-8 rounded-sm bg-[#1A1F2C] text-[#C5A059] flex items-center justify-center">
                  <Shield className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-serif font-bold text-white">Hospital-Grade Sterilization</h4>
                <p className="text-xs text-[#8492A6]">
                  Every blade is single-use surgical steel, and all metal implements undergo medical autoclave sanitization.
                </p>
              </div>

              <div className="bg-[#12151D] border border-[#202534] p-4 rounded-sm space-y-2">
                <div className="w-8 h-8 rounded-sm bg-[#1A1F2C] text-[#C5A059] flex items-center justify-center">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-serif font-bold text-white">100% Satisfaction Guarantee</h4>
                <p className="text-xs text-[#8492A6]">
                  If your cut or beard shape is anything less than immaculate, we make it right with zero hesitation.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase */}
          <div className="relative">
            <div className="relative rounded-sm overflow-hidden border border-[#262C3D] shadow-2xl bg-[#141720]">
              <img
                src={SHOP_ASSETS.apothecary}
                alt="Crown and Razor Apothecary collection"
                className="w-full aspect-[4/3] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F12] via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-6 left-6 right-6 p-5 bg-[#12151E]/90 backdrop-blur-md border border-[#282F40] rounded-sm">
                <div className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold mb-1">
                  The Crown Grooming Guarantee
                </div>
                <div className="text-sm font-serif font-bold text-white mb-2">
                  "No rush. No cutting corners. Just unwavering dedication to the craft."
                </div>
                <div className="text-xs text-[#94A3B8]">
                  — Marcus Vance, Founder & Master Craftsman
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
